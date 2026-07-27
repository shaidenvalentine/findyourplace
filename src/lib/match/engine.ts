import type { Breed } from "@/lib/scoring";
import type { OnboardingData } from "@/types/onboarding";
import { resolveBreed } from "./resolve";

/**
 * The matching engine (v2) — FIT, not trait-maximization.
 *
 * A naive model sums normalized trait scores, which floats generically "good" breeds
 * (Golden, Lab) to the top regardless of who the person is. This model instead scores
 * each breed by how well it matches the axes the user ACTUALLY expressed:
 *
 *  - Unexpressed axes contribute neutrally (50), so a breed's strength on something the
 *    user never asked about can't inflate its rank. (Kills the "everyone gets a Golden"
 *    failure mode.)
 *  - Hard constraints (deal-breakers / must-haves) filter, they don't softly nudge.
 *  - Revealed preference ("breeds you've loved") blends breed-character similarity, and a
 *    loved breed that clears constraints is pulled toward #1 — the "I always knew" result.
 *
 * Category fits map onto the SAME 10 labels the UI uses, and the ranking score is
 * derived from those same fits, so what users see (bars) and what we rank by never drift.
 */

export const CATEGORY_LABELS: Record<string, string> = {
  energy: "Energy & Exercise",
  home: "Home & Space",
  training: "Training & Smarts",
  grooming: "Grooming & Shedding",
  family: "Kids & Family",
  social: "Dogs & Other Pets",
  protection: "Protection & Watchdog",
  noise: "Barking & Noise",
  independence: "Alone-Time Fit",
  temperament: "Temperament Match",
};
export const CATEGORY_ORDER = Object.keys(CATEGORY_LABELS);

const NEUTRAL = 50;
const clamp = (n: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, n));
const num = (v: number | null | undefined, fallback: number) => (typeof v === "number" ? v : fallback);

/** Numeric size scale (used for size-preference filtering + similarity). */
export function sizeScore(size: string): number {
  switch (size) {
    case "Toy": return 10;
    case "Small": return 30;
    case "Medium": return 55;
    case "Large": return 80;
    case "Giant": return 95;
    default: return 55;
  }
}

// ── Group aggregates (offline) — average dataset fields per breed group, used to impute
// missing breed data AND to synthesize a vector for an unlisted breed name. ──────────────
type Agg = Record<string, { sum: number; n: number }>;
let groupAgg: Map<string, Record<string, number>> | null = null;
const AGG_FIELDS = [
  "energy_level", "exercise_needs", "playfulness", "apartment_friendly", "novice_friendly",
  "trainability", "intelligence", "grooming_needs", "shedding_level", "drooling_level",
  "kid_friendly", "affection_level", "independence", "alone_tolerance", "dog_friendly",
  "cat_friendly", "stranger_friendly", "protectiveness", "watchdog_alertness", "barking_level",
  "heat_tolerance", "cold_tolerance", "health_robustness",
] as const;

function buildAggregates(breeds: Breed[]) {
  if (groupAgg) return groupAgg;
  const byGroup = new Map<string, Agg>();
  for (const b of breeds) {
    const a = byGroup.get(b.group) ?? {};
    for (const f of AGG_FIELDS) {
      const v = b[f] as number | null;
      if (typeof v === "number") {
        a[f] = a[f] ?? { sum: 0, n: 0 };
        a[f].sum += v;
        a[f].n += 1;
      }
    }
    byGroup.set(b.group, a);
  }
  groupAgg = new Map();
  for (const [group, a] of byGroup) {
    const out: Record<string, number> = {};
    for (const f of AGG_FIELDS) if (a[f]) out[f] = a[f].sum / a[f].n;
    groupAgg.set(group, out);
  }
  return groupAgg;
}

/** A breed value with imputation: real field → else group average → else a neutral prior. */
function field(breed: Breed, key: (typeof AGG_FIELDS)[number], prior: number, breeds: Breed[]): number {
  const v = breed[key] as number | null;
  if (typeof v === "number") return v;
  const agg = buildAggregates(breeds).get(breed.group);
  if (agg && typeof agg[key] === "number") return agg[key];
  return prior;
}

// ── The user's ideal: per category, a target (for target-match axes) or a "want" weight
// (for more-is-better axes). Importance 0 ⇒ the user didn't express it ⇒ neutral. ────────
interface CategoryIdeal {
  /** more-is-better importance 0..1 (0 = unexpressed → neutral, no bias) */
  want: number;
  /** for target-match axes (energy, temperament): desired level 0..100, else null */
  target: number | null;
  /** tolerance for target-match (how fast fit falls off from target) */
  tol: number;
}
type Ideal = Record<string, CategoryIdeal>;

function buildIdeal(p: OnboardingData): Ideal {
  const has = (v: unknown) => v !== undefined && v !== null && (Array.isArray(v) ? v.length > 0 : String(v).trim() !== "");
  const ideal: Ideal = {};
  for (const c of CATEGORY_ORDER) ideal[c] = { want: 0, target: null, tol: 25 };

  // Energy — target-match: the dog's drive should MATCH the owner's life, not max it.
  if (p.activityLevel || p.mustHaves?.includes("jogging-partner")) {
    let target = p.activityLevel === "athlete" ? 95 : p.activityLevel === "active" ? 78
      : p.activityLevel === "moderate" ? 55 : 28; // relaxed
    if (p.mustHaves?.includes("jogging-partner")) target = Math.max(target, 85);
    ideal.energy = { want: p.mustHaves?.includes("jogging-partner") ? 1.3 : 1, target, tol: 20 };
  }

  // Home & space — more-is-better on apartment suitability, scaled by how tight the home is.
  if (p.homeType === "apartment" || p.mustHaves?.includes("apartment-ok")) ideal.home.want = 1.3;
  else if (p.homeType === "house-small-yard") ideal.home.want = 0.7;
  // big yard / rural: unexpressed → neutral (space solves itself)

  // Training — first-timers need forgiving, trainable dogs; the must-have hardens it.
  if (p.experienceLevel === "first-time" || p.mustHaves?.includes("easy-training") || p.trainingAppetite === "love-it") {
    ideal.training.want = p.experienceLevel === "first-time" ? 1.2 : 1;
  } else if (p.experienceLevel === "had-dogs") ideal.training.want = 0.5;

  // Grooming & shedding — more-is-better on LOW-maintenance coat when the user cares.
  if (p.allergies || p.mustHaves?.includes("hypoallergenic")) ideal.grooming.want = 1.4;
  else if (p.groomingTolerance === "minimal" || p.sheddingTolerance === "low" || p.mustHaves?.includes("low-shedding") || p.dealBreakers?.includes("heavy-shedding")) {
    ideal.grooming.want = 1.1;
  } else if (p.groomingTolerance === "moderate" || p.sheddingTolerance === "medium") ideal.grooming.want = 0.5;

  // Kids & family.
  if (p.hasKids || p.mustHaves?.includes("good-with-kids")) {
    ideal.family.want = p.kidsAges === "toddlers" || p.mustHaves?.includes("good-with-kids") ? 1.3 : 1;
  }

  // Other dogs & pets.
  if (has(p.otherPets) && !p.otherPets?.includes("none")) ideal.social.want = 1;

  // Protection.
  if (p.guardingImportance === "top-priority" || p.mustHaves?.includes("protective")) ideal.protection.want = 1.3;
  else if (p.guardingImportance === "nice-to-have") ideal.protection.want = 0.6;

  // Barking & noise — more-is-better on quiet when the user needs it.
  if (p.barkTolerance === "low" || p.mustHaves?.includes("quiet") || p.dealBreakers?.includes("constant-barking")) {
    ideal.noise.want = 1.2;
  } else if (p.barkTolerance === "medium") ideal.noise.want = 0.5;

  // Alone-time — more-is-better on independence when the dog will actually be alone.
  if (p.hoursAlone === "full-day" || p.travelFrequency === "often") ideal.independence.want = 1.3;
  else if (p.hoursAlone === "half-day") ideal.independence.want = 0.7;

  // Temperament — target-match on affection level.
  if (p.affectionStyle) {
    const target = p.affectionStyle === "velcro" ? 92 : p.affectionStyle === "balanced" ? 62 : 30;
    ideal.temperament = { want: 1, target, tol: 24 };
  }

  return ideal;
}

// ── Breed attribute extraction per category (0..100, imputed). ───────────────────────────
function breedAttrs(breed: Breed, p: OnboardingData, breeds: Breed[]): Record<string, number> {
  const f = (k: (typeof AGG_FIELDS)[number], prior: number) => field(breed, k, prior, breeds);

  // energy level (matched against the owner's target).
  const energy = clamp(0.6 * f("energy_level", 55) + 0.4 * f("exercise_needs", 55));

  // home: apartment suitability — coat/size/calm composite the field already encodes.
  const home = clamp(0.75 * f("apartment_friendly", 50) + 0.25 * (100 - sizeScore(breed.size)));

  // training: how forgiving + how teachable, tilted by what the user wants from training.
  let training = clamp(0.5 * f("novice_friendly", 55) + 0.5 * f("trainability", 60));
  if (p.trainingAppetite === "love-it") training = clamp(0.3 * f("novice_friendly", 55) + 0.7 * f("trainability", 60));

  // grooming: LOW-maintenance coat scores high; hypoallergenic is a real bonus for allergies.
  let grooming = clamp(100 - (0.45 * f("grooming_needs", 50) + 0.55 * f("shedding_level", 50)));
  if ((p.allergies || p.mustHaves?.includes("hypoallergenic")) && breed.hypoallergenic) grooming = clamp(Math.max(grooming, 88));

  const family = f("kid_friendly", 60);

  // social: weight the species actually in the house.
  const hasDog = p.otherPets?.includes("dog");
  const hasCat = p.otherPets?.includes("cat");
  let social = f("dog_friendly", 60);
  if (hasCat && hasDog) social = 0.5 * f("dog_friendly", 60) + 0.5 * f("cat_friendly", 50);
  else if (hasCat) social = f("cat_friendly", 50);

  const protection = clamp(0.65 * f("protectiveness", 45) + 0.35 * f("watchdog_alertness", 55));
  const noise = clamp(100 - f("barking_level", 50));
  const independence = clamp(0.7 * f("alone_tolerance", 45) + 0.3 * f("independence", 50));
  const temperament = f("affection_level", 65);

  return { energy, home, training, grooming, family, social, protection, noise, independence, temperament };
}

// ── Per-category fit 0..100 given the user's ideal. ─────────────────────────────────────
function categoryFit(cat: string, breedValue: number, id: CategoryIdeal): number {
  if (id.target !== null) {
    // target-match: full marks at the target, falling off by distance.
    if (id.want <= 0) return NEUTRAL;
    return clamp(100 - Math.abs(breedValue - id.target) * (100 / (id.tol * 2)) * 0.9, 10);
  }
  // more-is-better only when wanted; unexpressed ⇒ neutral (no trait-max bias).
  if (id.want <= 0) return NEUTRAL;
  return clamp(breedValue);
}

export interface CategoryScoreV2 { category: string; label: string; score: number; weight: number }

export function fitCategories(breed: Breed, p: OnboardingData, breeds: Breed[]): CategoryScoreV2[] {
  buildAggregates(breeds);
  const ideal = buildIdeal(p);
  const attrs = breedAttrs(breed, p, breeds);
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

// ── Hard constraints: a breed that fails a non-negotiable is filtered down, hard. ────────
function constraintMultiplier(breed: Breed, p: OnboardingData, breeds: Breed[]): number {
  let m = 1;
  const f = (k: (typeof AGG_FIELDS)[number], prior: number) => field(breed, k, prior, breeds);

  // Allergies: hypoallergenic coats pass; heavy shedders are filtered hard.
  if ((p.allergies || p.mustHaves?.includes("hypoallergenic")) && !breed.hypoallergenic) {
    const shed = f("shedding_level", 50);
    if (shed > 40) m *= 0.5;
    else m *= 0.75;
  }

  // Apartment reality check.
  if (p.homeType === "apartment") {
    if (f("apartment_friendly", 50) < 30) m *= 0.5;
    else if (f("apartment_friendly", 50) < 45 || breed.size === "Giant") m *= 0.7;
  }

  // Energy mismatch both directions.
  if (p.activityLevel === "relaxed" && f("exercise_needs", 55) > 80) m *= 0.55;
  if (p.activityLevel === "athlete" && f("energy_level", 55) < 35) m *= 0.7;

  // Kids.
  if (p.hasKids && p.kidsAges === "toddlers" && f("kid_friendly", 60) < 50) m *= 0.5;
  else if (p.hasKids && f("kid_friendly", 60) < 40) m *= 0.6;

  // Alone time.
  if (p.hoursAlone === "full-day" && f("alone_tolerance", 45) < 30) m *= 0.6;

  // Budget.
  if (p.budgetRange === "budget" && num(breed.monthly_cost_usd, 130) > 200) m *= 0.65;

  // Size preference is a filter, not a dimension.
  const s = breed.size;
  if (p.sizePreference === "small" && (s === "Large" || s === "Giant")) m *= 0.55;
  if (p.sizePreference === "medium" && s === "Giant") m *= 0.7;
  if ((p.sizePreference === "large" || p.sizePreference === "giant") && (s === "Toy" || s === "Small")) m *= 0.6;

  // Climate.
  if (p.climate === "hot" && f("heat_tolerance", 55) < 25) m *= 0.7;
  if (p.climate === "cold" && f("cold_tolerance", 55) < 25) m *= 0.8;

  // Cats in the house.
  if (p.otherPets?.includes("cat") && f("cat_friendly", 50) < 30) m *= 0.6;

  // Explicit deal-breakers.
  if (p.dealBreakers?.includes("drooling") && f("drooling_level", 25) > 60) m *= 0.55;
  if (p.dealBreakers?.includes("heavy-shedding") && f("shedding_level", 50) > 70) m *= 0.55;
  if (p.dealBreakers?.includes("constant-barking") && f("barking_level", 50) > 75) m *= 0.6;
  if (p.dealBreakers?.includes("high-energy") && f("energy_level", 55) > 85) m *= 0.6;
  if (p.dealBreakers?.includes("stubborn") && f("trainability", 60) < 40) m *= 0.65;
  if (p.dealBreakers?.includes("fragile-health") && f("health_robustness", 60) < 40) m *= 0.65;

  return m;
}

function weightedFit(cats: CategoryScoreV2[]): number {
  const w = cats.reduce((s, c) => s + c.weight, 0) || 1;
  return cats.reduce((s, c) => s + c.score * c.weight, 0) / w;
}

// Map the raw fit/resonance score (which, because unexpressed axes sit at neutral, tends
// to cluster in the ~10..75 band) into a believable display range. This is a MONOTONIC
// affine transform — it never changes rank order, only the displayed numbers. Tuned so a
// genuine #1 reads ~90+ with a smooth gradient down the list, and almost nothing pinned
// to the floor. A distribution test locks it.
function spread(v: number): number {
  return clamp(Math.round(22 + v * 0.95), 28, 99);
}

/**
 * The ONE display transform, exported for every surface that shows a fit number.
 *
 * Composite scores (ranking displayScore, dream-breed ring) already pass through
 * spread(). Category/dimension numbers shown next to them MUST use the same transform,
 * or the math visibly breaks: spread() lifts the composite (~+22), so a "90" ring next
 * to raw bars topping out at 82 reads as a weighted average exceeding its parts.
 * Because spread is affine and category weights sum to 1, spread(weighted avg of raw)
 * === weighted avg of spread(raw) (mod clamps/rounding) — so displaying every number
 * through this function makes the composite provably sit inside the span of its parts.
 * Internal math stays raw; this is presentation only and never affects rank order.
 */
export const displayFit = spread;

// ── Revealed preference: cosine similarity of a candidate to the user's loved breeds. ────
const SIM_FIELDS = [
  "energy_level", "playfulness", "apartment_friendly", "trainability", "grooming_needs",
  "shedding_level", "kid_friendly", "affection_level", "independence", "protectiveness",
  "barking_level", "stranger_friendly",
] as const;
function vec(breed: Breed, breeds: Breed[]): number[] {
  const v = SIM_FIELDS.map((k) => field(breed, k, 50, breeds) / 100);
  v.push(sizeScore(breed.size) / 100); // size is core to breed character
  return v;
}
function cosine(a: number[], b: number[]): number {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; }
  return na && nb ? dot / (Math.sqrt(na) * Math.sqrt(nb)) : 0;
}

function lovedVectors(p: OnboardingData, breeds: Breed[]): { ids: Set<string>; vecs: number[][] } {
  const ids = new Set<string>();
  const vecs: number[][] = [];
  for (const raw of p.lovedBreeds ?? []) {
    const r = resolveBreed(raw, breeds);
    // Always let the loved breed's CHARACTER influence resonance — resolveBreed returns a
    // real vector even when the exact name isn't in our curated set (it synthesizes one
    // from the breed group). Only an exact curated match gets pinned toward #1 (via ids),
    // so an unresolved "farm collie mix" still shapes the blend instead of no-op'ing.
    vecs.push(vec(r.breed, breeds));
    if (r.matched) ids.add(r.matched.id);
  }
  return { ids, vecs };
}

export interface RankedMatch {
  breed: Breed;
  totalScore: number;
  displayScore: number;
  categoryScores: CategoryScoreV2[];
  rank: number;
}

export function rankBreedsV2(breeds: Breed[], p: OnboardingData): RankedMatch[] {
  buildAggregates(breeds);
  const loved = lovedVectors(p, breeds);
  const hasLoved = loved.vecs.length > 0;

  const scored = breeds.map((breed) => {
    const cats = fitCategories(breed, p, breeds);
    const base = weightedFit(cats) * constraintMultiplier(breed, p, breeds);

    let resonance = 0;
    if (hasLoved) {
      const v = vec(breed, breeds);
      const c = Math.max(...loved.vecs.map((lv) => cosine(v, lv))); // similarity to nearest loved breed
      // Cosines between all-positive trait vectors cluster in ~[0.86, 1], so the raw value
      // barely differentiates — rescale it so resonance separates candidates instead of
      // uniformly inflating every score.
      resonance = Math.max(0, Math.min(1, (c - 0.86) / 0.14));
    }
    // Blend fit with resonance; a breed the user explicitly loves is pulled to the top.
    let blended = hasLoved ? base * 0.7 + resonance * 100 * 0.3 : base;
    if (loved.ids.has(breed.id)) blended = Math.max(blended, 96);

    // The DISPLAYED score is always the honest fit — the exact formula the dream-breed
    // card uses — so one breed shows one number everywhere. Resonance and the loved pin
    // shape RANK ORDER only; letting them into the display would show two different
    // numbers for the same breed on the same page.
    const display = spread(base);
    return { breed, totalScore: blended, displayScore: display, categoryScores: cats, rank: 0 };
  });

  // Primary: fit/resonance. Tie-break: a more popular, more robust breed — so a near-tie
  // (and the degenerate all-neutral case of an empty profile) resolves to a well-known,
  // well-supported breed instead of whatever sits first in the dataset.
  scored.sort(
    (a, b) =>
      b.totalScore - a.totalScore ||
      num(b.breed.popularity, 0) - num(a.breed.popularity, 0) ||
      num(b.breed.health_robustness, 0) - num(a.breed.health_robustness, 0),
  );
  scored.forEach((s, i) => (s.rank = i + 1));

  // A ranked list must read monotonically. Rank comes from the blended score (fit +
  // revealed-preference resonance), display from honest fit — so without this cap a
  // user who loves Huskies could see "#1 Husky 90" sitting above "#9 Poodle 95", which
  // reads as broken math. Revealed preference PROMOTES what you love; it never inflates
  // a number — so every breed's displayed score is capped by the one ranked above it.
  // For profiles with no loved breeds, blended === fit and this is a no-op.
  let cap = 99;
  for (const s of scored) {
    s.displayScore = Math.min(s.displayScore, cap);
    cap = s.displayScore;
  }
  return scored;
}

// ── Dream breed: resolve ANY input to a real vector and score it on the same engine. ─────
export interface DreamBreedFit {
  score: number;
  categoryScores: { label: string; score: number }[];
  breedFound: boolean;
  resolvedName: string;
  estimated: boolean;
  /** Curated breed id the input resolved to (null when synthesized). Lets callers
   *  detect "the #1 match IS the dream breed" and keep one number for one breed. */
  resolvedId: string | null;
  /** True when a hard deal-breaker penalty pulled the composite below the dimension
   *  average — the UI explains it so the lower ring doesn't read as broken math. */
  constraintPenalty: boolean;
}

export function scoreDreamBreedV2(input: string, breeds: Breed[], p: OnboardingData): DreamBreedFit {
  buildAggregates(breeds);
  const r = resolveBreed(input, breeds);
  const breed = r.breed; // always a real Breed (dataset match or group-synthesized)
  const cats = fitCategories(breed, p, breeds);
  const m = constraintMultiplier(breed, p, breeds);
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
    { label: "Energy & Exercise", score: bucket("energy") },
    { label: "Home & Alone-Time", score: bucket("home", "independence") },
    { label: "Family & Social", score: bucket("family", "social") },
    { label: "Care & Training", score: bucket("training", "grooming") },
    { label: "Guarding & Noise", score: bucket("protection", "noise") },
    { label: "Temperament", score: bucket("temperament") },
  ];
  return {
    score,
    categoryScores: simplified,
    breedFound: r.matched !== null,
    resolvedName: r.resolvedName,
    estimated: r.estimated,
    resolvedId: r.matched?.id ?? null,
    constraintPenalty: m < 1,
  };
}
