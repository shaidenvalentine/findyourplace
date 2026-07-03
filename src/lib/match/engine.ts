import type { Location } from "@/lib/scoring";
import type { OnboardingData } from "@/types/onboarding";
import { resolvePlace } from "./resolve";

/**
 * The matching engine (v2) — FIT, not amenity-maximization.
 *
 * The old model summed normalized amenity scores, which floated generically high-stat
 * metros (LA, Miami) and tax havens to the top regardless of who the person was, and
 * silently blended tax-friendliness into everyone's cost. This model instead scores each
 * place by how well it matches the axes the user ACTUALLY expressed:
 *
 *  - Unexpressed axes contribute neutrally (50), so a place's strength on something the
 *    user never asked about can't inflate its rank. (Kills amenity-max + the tax leak.)
 *  - Hard constraints (deal-breakers / must-haves) filter, they don't softly nudge.
 *  - Revealed preference ("places you've loved") blends place-character similarity, and a
 *    loved place that's in-universe and clears constraints is pulled toward #1 — the
 *    "I always knew" result.
 *
 * Category fits map onto the SAME 10 labels the UI already uses, and the ranking score is
 * derived from those same fits, so what users see (bars) and what we rank by never drift.
 */

export const CATEGORY_LABELS: Record<string, string> = {
  climate: "Climate Fit",
  nature: "Nature & Outdoors",
  community: "Community & Social",
  career: "Career & Work",
  cost: "Cost & Value",
  safety: "Safety & Stability",
  wellness: "Health & Wellness",
  travel: "Travel & Connectivity",
  culture: "Culture & Openness",
  lifestyle: "Lifestyle Match",
};
export const CATEGORY_ORDER = Object.keys(CATEGORY_LABELS);

const NEUTRAL = 50;
const clamp = (n: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, n));
const num = (v: number | null | undefined, fallback: number) => (typeof v === "number" ? v : fallback);

// ── Country aggregates (offline) — average dataset fields per country, used to impute
// missing place data AND to synthesize a vector for an unlisted current city. ───────────
type Agg = Record<string, { sum: number; n: number }>;
let countryAgg: Map<string, Record<string, number>> | null = null;
const AGG_FIELDS = [
  "cost_of_living_score", "rent_score", "safety_score", "healthcare_score", "climate_score",
  "avg_temp_summer", "avg_temp_winter", "humidity_level", "sunshine_days", "beach_access_score",
  "mountain_access_score", "outdoor_score", "nightlife_score", "wellness_score", "community_score",
  "english_friendliness_score", "tax_friendliness_score", "airport_connectivity_score",
  "internet_quality_score", "walkability_score", "transit_score", "culture_openness_score",
  "startup_ecosystem_score",
] as const;

function buildAggregates(locations: Location[]) {
  if (countryAgg) return countryAgg;
  const byCountry = new Map<string, Agg>();
  for (const l of locations) {
    const a = byCountry.get(l.country) ?? {};
    for (const f of AGG_FIELDS) {
      const v = l[f] as number | null;
      if (typeof v === "number") {
        a[f] = a[f] ?? { sum: 0, n: 0 };
        a[f].sum += v;
        a[f].n += 1;
      }
    }
    byCountry.set(l.country, a);
  }
  countryAgg = new Map();
  for (const [country, a] of byCountry) {
    const out: Record<string, number> = {};
    for (const f of AGG_FIELDS) if (a[f]) out[f] = a[f].sum / a[f].n;
    countryAgg.set(country, out);
  }
  return countryAgg;
}

/** A place value with imputation: real field → else country average → else a neutral prior. */
function field(loc: Location, key: (typeof AGG_FIELDS)[number], prior: number, locations: Location[]): number {
  const v = loc[key] as number | null;
  if (typeof v === "number") return v;
  const agg = buildAggregates(locations).get(loc.country);
  if (agg && typeof agg[key] === "number") return agg[key];
  return prior;
}

// ── The user's ideal: per category, a target (for target-match axes) or a "want" weight
// (for more-is-better axes). Importance 0 ⇒ the user didn't express it ⇒ neutral. ────────
interface CategoryIdeal {
  /** more-is-better importance 0..1 (0 = unexpressed → neutral, no bias) */
  want: number;
  /** for target-match axes (climate, lifestyle): desired level 0..100, else null */
  target: number | null;
  /** tolerance for target-match (how fast fit falls off from target) */
  tol: number;
}
type Ideal = Record<string, CategoryIdeal>;

function buildIdeal(p: OnboardingData): Ideal {
  const has = (v: unknown) => v !== undefined && v !== null && (Array.isArray(v) ? v.length > 0 : String(v).trim() !== "");
  const ideal: Ideal = {};
  for (const c of CATEGORY_ORDER) ideal[c] = { want: 0, target: null, tol: 25 };

  // Climate — target-match on warmth.
  if (p.preferredClimate) {
    const target = p.preferredClimate === "tropical" ? 95 : p.preferredClimate === "mediterranean" ? 78
      : p.preferredClimate === "temperate" ? 55 : 30; // cold
    ideal.climate = { want: 1, target, tol: 22 };
  }

  // Nature — beach/mountain/outdoor (more-is-better when wanted).
  if (p.beachMountain || p.mustHaves?.includes("nature") || p.mustHaves?.includes("beach") || p.wellnessImportance === "high") {
    ideal.nature.want = 1;
    if (p.mustHaves?.includes("nature") || p.mustHaves?.includes("beach")) ideal.nature.want = 1.3;
  }

  // Community.
  if (has(p.communityVibes) || p.familyProximity) ideal.community.want = 1;

  // Career.
  if (p.workStyle === "remote" || has(p.industries)) ideal.career.want = p.workStyle === "remote" ? 1 : 0.8;

  // Cost — only as strong as the user signals; tax folds in ONLY if tax-sensitive.
  if (p.budgetRange === "budget" || p.mustHaves?.includes("affordable")) ideal.cost.want = 1.2;
  else if (p.budgetRange === "mid-range") ideal.cost.want = 0.7;
  else if (p.budgetRange === "luxury") ideal.cost.want = 0.2;

  // Safety.
  if (p.safetyPriority === "top-priority" || p.riskTolerance === "low" || p.mustHaves?.includes("safety") || p.dealBreakers?.includes("high-crime")) {
    ideal.safety.want = p.safetyPriority === "top-priority" ? 1.3 : 1;
  } else if (p.safetyPriority === "important") ideal.safety.want = 0.7;

  // Wellness.
  if (p.wellnessImportance === "high" || p.gymCulture === "important") ideal.wellness.want = 1;
  else if (p.wellnessImportance === "medium") ideal.wellness.want = 0.5;

  // Travel/connectivity.
  if (p.airportImportance === "essential" || p.airportConnectivity === "important" || p.travelFrequency === "frequent") ideal.travel.want = 1;
  else if (p.airportImportance === "important") ideal.travel.want = 0.6;

  // Culture openness.
  if (p.cultureTolerance === "important" || p.lgbtqFriendliness === "essential") ideal.culture.want = 1;
  else if (p.cultureTolerance === "somewhat") ideal.culture.want = 0.5;

  // Lifestyle — target-match on urban energy / noise.
  if (p.noiseTolerance || p.peopleDensity || p.outdoorUrban) {
    const fromNoise = p.noiseTolerance === "high" ? 90 : p.noiseTolerance === "medium" ? 60 : p.noiseTolerance === "low" ? 25 : null;
    const fromDensity = p.peopleDensity === "dense" ? 90 : p.peopleDensity === "mid" ? 55 : p.peopleDensity === "spacious" ? 20 : null;
    const fromUrban = p.outdoorUrban === "urban" ? 85 : p.outdoorUrban === "balanced" ? 55 : p.outdoorUrban === "outdoor" ? 25 : null;
    const vals = [fromNoise, fromDensity, fromUrban].filter((v): v is number => v !== null);
    if (vals.length) ideal.lifestyle = { want: 1, target: vals.reduce((s, v) => s + v, 0) / vals.length, tol: 24 };
  }

  return ideal;
}

// ── Place attribute extraction per category (0..100, imputed). ───────────────────────────
function placeAttrs(loc: Location, p: OnboardingData, locations: Location[]): Record<string, number> {
  const f = (k: (typeof AGG_FIELDS)[number], prior: number) => field(loc, k, prior, locations);

  // climate warmth proxy: combine winter/summer temp into a 0..100 warmth scale.
  const warmth = clamp(((num(loc.avg_temp_winter, 12) + num(loc.avg_temp_summer, 24)) / 2 - 2) * 3.0);

  // nature: pick the terrain the user cares about; else overall outdoor.
  let nature = f("outdoor_score", 55);
  if (p.beachMountain === "beach") nature = Math.max(f("beach_access_score", 40), (nature + f("beach_access_score", 40)) / 2);
  else if (p.beachMountain === "mountains") nature = Math.max(f("mountain_access_score", 40), (nature + f("mountain_access_score", 40)) / 2);
  else if (p.beachMountain === "either") nature = Math.max(f("beach_access_score", 40), f("mountain_access_score", 40), f("outdoor_score", 55));

  const community = clamp(0.5 * f("community_score", 55) + 0.25 * f("english_friendliness_score", 60) + 0.25 * f("culture_openness_score", 60)
    + (loc.tags?.includes("digital-nomad") && (p.communityVibes?.includes("digital-nomad")) ? 12 : 0)
    + (loc.tags?.includes("expat") && p.communityVibes?.includes("expat") ? 8 : 0));

  const career = clamp(0.55 * f("startup_ecosystem_score", 50) + 0.45 * f("internet_quality_score", 70));

  // cost: affordability; fold tax friendliness in ONLY for tax-sensitive users.
  let cost = (f("cost_of_living_score", 50) + f("rent_score", 50)) / 2;
  if (p.taxSensitivity === "very-sensitive") cost = cost * 0.55 + f("tax_friendliness_score", 50) * 0.45;
  else if (p.taxSensitivity === "somewhat") cost = cost * 0.85 + f("tax_friendliness_score", 50) * 0.15;

  const safety = clamp(0.7 * f("safety_score", 65) + 0.3 * f("healthcare_score", 65));
  const wellness = clamp(0.7 * f("wellness_score", 55) + 0.3 * f("outdoor_score", 55));
  const travel = clamp(0.7 * f("airport_connectivity_score", 50) + 0.3 * f("transit_score", 50));
  const culture = f("culture_openness_score", 60);

  // lifestyle urban-energy level (matched against target).
  const lifestyle = clamp(0.45 * f("walkability_score", 55) + 0.3 * f("nightlife_score", 50) + 0.25 * f("transit_score", 50));

  return { climate: warmth, nature, community, career, cost, safety, wellness, travel, culture, lifestyle };
}

// ── Per-category fit 0..100 given the user's ideal. ─────────────────────────────────────
function categoryFit(cat: string, placeValue: number, id: CategoryIdeal): number {
  if (id.target !== null) {
    // target-match: full marks at the target, falling off by distance.
    if (id.want <= 0) return NEUTRAL;
    return clamp(100 - Math.abs(placeValue - id.target) * (100 / (id.tol * 2)) * 0.9, 10);
  }
  // more-is-better only when wanted; unexpressed ⇒ neutral (no amenity-max bias).
  if (id.want <= 0) return NEUTRAL;
  return clamp(placeValue);
}

export interface CategoryScoreV2 { category: string; label: string; score: number; weight: number }

export function fitCategories(loc: Location, p: OnboardingData, locations: Location[]): CategoryScoreV2[] {
  buildAggregates(locations);
  const ideal = buildIdeal(p);
  const attrs = placeAttrs(loc, p, locations);
  const raw = CATEGORY_ORDER.map((cat) => {
    const id = ideal[cat];
    const fit = categoryFit(cat, attrs[cat], id);
    // expressed importance drives weight; unexpressed categories get a small floor so the
    // overall number stays sensible but they can't decide the ranking.
    const weight = id.want > 0 ? id.want : 0.15;
    return { category: cat, label: CATEGORY_LABELS[cat], score: Math.round(fit), weight };
  });
  // Normalize weights to sum to 1 (display contract; ranking is invariant to scale).
  const total = raw.reduce((s, c) => s + c.weight, 0) || 1;
  return raw.map((c) => ({ ...c, weight: c.weight / total }));
}

// ── Hard constraints: a place that fails a non-negotiable is filtered down, hard. ────────
function constraintMultiplier(loc: Location, p: OnboardingData, locations: Location[]): number {
  let m = 1;
  const f = (k: (typeof AGG_FIELDS)[number], prior: number) => field(loc, k, prior, locations);
  if ((p.safetyPriority === "top-priority" || p.dealBreakers?.includes("high-crime")) && f("safety_score", 65) < 55) m *= 0.55;
  if (p.beachMountain === "beach" && p.mustHaves?.includes("beach") && f("beach_access_score", 0) < 35) m *= 0.55;
  if (p.beachMountain === "mountains" && f("mountain_access_score", 0) < 30) m *= 0.7;
  if (p.preferredClimate === "tropical" && num(loc.avg_temp_winter, 10) < 14) m *= 0.6;
  if (p.preferredClimate === "cold" && num(loc.avg_temp_summer, 25) > 30) m *= 0.65;
  if ((p.budgetRange === "budget" || p.dealBreakers?.includes("expensive")) && f("cost_of_living_score", 50) < 40) m *= 0.6;
  return m;
}

function weightedFit(cats: CategoryScoreV2[]): number {
  const w = cats.reduce((s, c) => s + c.weight, 0) || 1;
  return cats.reduce((s, c) => s + c.score * c.weight, 0) / w;
}

// Map the raw fit/resonance score (which, because unexpressed axes sit at neutral, tends
// to cluster in the ~10..75 band) into a believable display range. This is a MONOTONIC
// affine transform — it never changes rank order, only the displayed numbers. The old
// curve (center 64, gain 1.6) pushed the bulk below its floor, so a real ranking read as a
// wall of identical "35"s. This one (slope 0.95, intercept 22, floor 28) gives a genuine
// #1 ~90+ and a smooth gradient down the list, with almost nothing pinned to the floor.
// Tuned empirically against representative profiles; a distribution test locks it.
function spread(v: number): number {
  return clamp(Math.round(22 + v * 0.95), 28, 99);
}

/**
 * The ONE display transform, exported for every surface that shows a fit number.
 *
 * Composite scores (ranking displayScore, current-city ring) already pass through
 * spread(). Category/dimension numbers shown next to them MUST use the same transform,
 * or the math visibly breaks: spread() lifts the composite (~+22), so a "90" ring next
 * to raw bars topping out at 82 reads as a weighted average exceeding its parts.
 * Because spread is affine and category weights sum to 1, spread(weighted avg of raw)
 * === weighted avg of spread(raw) (mod clamps/rounding) — so displaying every number
 * through this function makes the composite provably sit inside the span of its parts.
 * Internal math stays raw; this is presentation only and never affects rank order.
 */
export const displayFit = spread;

// ── Revealed preference: cosine similarity of a candidate to the user's loved places. ────
const SIM_FIELDS = [
  "climate_score", "beach_access_score", "mountain_access_score", "outdoor_score", "cost_of_living_score",
  "safety_score", "nightlife_score", "walkability_score", "community_score", "wellness_score",
  "culture_openness_score", "startup_ecosystem_score",
] as const;
function vec(loc: Location, locations: Location[]): number[] {
  return SIM_FIELDS.map((k) => field(loc, k, 50, locations) / 100);
}
function cosine(a: number[], b: number[]): number {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; }
  return na && nb ? dot / (Math.sqrt(na) * Math.sqrt(nb)) : 0;
}

function lovedVectors(p: OnboardingData, locations: Location[]): { ids: Set<string>; vecs: number[][] } {
  const ids = new Set<string>();
  const vecs: number[][] = [];
  for (const raw of p.lovedPlaces ?? []) {
    const r = resolvePlace(raw, locations);
    // Always let the loved place's CHARACTER influence resonance — resolvePlace returns a
    // real vector even when the exact name isn't in our curated set (it synthesizes one
    // from the country). Only an exact curated match gets pinned toward #1 (via ids), so an
    // unresolved "Oaxaca"/"Tbilisi" still shapes the blend instead of silently no-op'ing.
    vecs.push(vec(r.location, locations));
    if (r.matched) ids.add(r.matched.id);
  }
  return { ids, vecs };
}

export interface RankedMatch {
  location: Location;
  totalScore: number;
  displayScore: number;
  categoryScores: CategoryScoreV2[];
  rank: number;
}

export function rankLocationsV2(locations: Location[], p: OnboardingData): RankedMatch[] {
  buildAggregates(locations);
  const loved = lovedVectors(p, locations);
  const hasLoved = loved.vecs.length > 0;

  const scored = locations.map((loc) => {
    const cats = fitCategories(loc, p, locations);
    const base = weightedFit(cats) * constraintMultiplier(loc, p, locations);

    let resonance = 0;
    if (hasLoved) {
      const v = vec(loc, locations);
      const c = Math.max(...loved.vecs.map((lv) => cosine(v, lv))); // similarity to nearest loved place
      // Cosines between all-positive city vectors cluster in ~[0.86, 1], so the raw value
      // barely differentiates — rescale it so resonance separates candidates instead of
      // uniformly inflating every score.
      resonance = Math.max(0, Math.min(1, (c - 0.86) / 0.14));
    }
    // Blend fit with resonance; a place the user explicitly loves is pulled to the top.
    let blended = hasLoved ? base * 0.7 + resonance * 100 * 0.3 : base;
    if (loved.ids.has(loc.id)) blended = Math.max(blended, 96);

    // The DISPLAYED score is always the honest fit — the exact formula the current-city
    // card uses — so one place shows one number everywhere. Resonance and the loved pin
    // shape RANK ORDER only; letting them into the display made a Bali resident who loves
    // Bali see "90 fit" and "99 match" for the same city on the same page.
    const display = spread(base);
    return { location: loc, totalScore: blended, displayScore: display, categoryScores: cats, rank: 0 };
  });

  // Primary: fit/resonance. Tie-break: a bigger, safer city — so a near-tie (and the
  // degenerate all-neutral case of an empty profile) resolves to a sensible, notable place
  // instead of whatever happens to sit first in the dataset.
  scored.sort(
    (a, b) =>
      b.totalScore - a.totalScore ||
      num(b.location.population, 0) - num(a.location.population, 0) ||
      num(b.location.safety_score, 0) - num(a.location.safety_score, 0),
  );
  scored.forEach((s, i) => (s.rank = i + 1));

  // A ranked list must read monotonically. Rank comes from the blended score (fit +
  // revealed-preference resonance), display from honest fit — so without this cap a
  // user who loves Bali could see "#1 Bali 90" sitting above "#9 Dubai 95", which reads
  // as broken math. Revealed preference PROMOTES what you love; it never inflates a
  // number — so every place's displayed score is capped by the one ranked above it.
  // For profiles with no loved places, blended === fit and this is a no-op.
  let cap = 99;
  for (const s of scored) {
    s.displayScore = Math.min(s.displayScore, cap);
    cap = s.displayScore;
  }
  return scored;
}

// ── Current-city: resolve ANY input to a real vector and score it on the same engine. ────
export interface CurrentCityFit {
  score: number;
  categoryScores: { label: string; score: number }[];
  cityFound: boolean;
  resolvedName: string;
  estimated: boolean;
  /** Curated location id the input resolved to (null when synthesized). Lets callers
   *  detect "the #1 match IS the user's current city" and keep one number for one place. */
  resolvedId: string | null;
  /** True when a hard deal-breaker penalty pulled the composite below the dimension
   *  average — the UI explains it so the lower ring doesn't read as broken math. */
  constraintPenalty: boolean;
}

export function scoreCurrentCityV2(input: string, locations: Location[], p: OnboardingData): CurrentCityFit {
  buildAggregates(locations);
  const r = resolvePlace(input, locations);
  const loc = r.location; // always a real Location (dataset match or country-synthesized)
  const cats = fitCategories(loc, p, locations);
  const m = constraintMultiplier(loc, p, locations);
  const score = spread(weightedFit(cats) * m);

  // Dimension tiles shown NEXT TO the composite ring. Two rules make the math read
  // correctly to a skeptical eye:
  //  1. Same display scale (spread) as the ring — raw tiles next to a spread ring made
  //     "90 fit" float above tiles topping out at 82.
  //  2. The six tiles are weight-normalized averages over a PARTITION of all 10
  //     categories, using the user's own weights. That makes the ring EXACTLY the
  //     weighted average of the tiles (spread is affine, so it commutes with convex
  //     combinations): the composite provably sits inside [min tile, max tile] (±1
  //     rounding), minus only the explicit deal-breaker penalty.
  const bucket = (...names: string[]) => {
    let sum = 0;
    let wsum = 0;
    for (const n of names) {
      const c = cats.find((x) => x.category === n);
      const score = c?.score ?? NEUTRAL;
      const weight = c?.weight ?? 0.15;
      sum += score * weight;
      wsum += weight;
    }
    return spread(sum / (wsum || 1));
  };
  const simplified = [
    { label: "Cost & Value", score: bucket("cost") },
    { label: "Lifestyle Fit", score: bucket("lifestyle", "wellness") },
    { label: "Community Fit", score: bucket("community", "culture") },
    { label: "Nature & Environment", score: bucket("nature", "climate") },
    { label: "Safety & Stability", score: bucket("safety") },
    { label: "Career & Opportunity", score: bucket("career", "travel") },
  ];
  return {
    score,
    categoryScores: simplified,
    cityFound: r.matched !== null,
    resolvedName: r.resolvedName,
    estimated: r.estimated,
    resolvedId: r.matched?.id ?? null,
    constraintPenalty: m < 1,
  };
}
