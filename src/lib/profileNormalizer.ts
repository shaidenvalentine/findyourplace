import type { OnboardingData } from "@/types/onboarding";

export interface NormalizedProfile {
  inputs: OnboardingData;
  readback: { key: string; label: string; value: string }[];
}

/**
 * Deterministic, dependency-free extractor that maps a freeform AI-written profile
 * into structured scoring inputs. Used as the always-available path and as the
 * fallback when no LLM key is configured. Operates on text only; the caller must
 * never log or persist the raw profile (see CLAUDE.md privacy guardrail).
 */
export function normalizeProfileHeuristic(text: string, currentCity: string): NormalizedProfile {
  const t = ` ${text.toLowerCase()} `;
  const has = (...words: string[]) => words.some((w) => t.includes(w));
  const inputs: OnboardingData = { currentCity };

  // 9 — movement / lifestyle mode
  if (has("nomad", "travel constantly", "always moving", "digital nomad", "roam")) inputs.lifestyleMode = "nomadic";
  else if (has("rooted", "settle", "one place", "home base", "put down roots")) inputs.lifestyleMode = "rooted";

  // 2 — climate
  if (has("tropical", "warm weather", "hot climate", "humid", "beach weather")) inputs.preferredClimate = "tropical";
  else if (has("mediterranean", "mild", "sunny")) inputs.preferredClimate = "mediterranean";
  else if (has("cold", "snow", "winter", "crisp")) inputs.preferredClimate = "cold";
  else if (has("four seasons", "temperate", "moderate climate")) inputs.preferredClimate = "temperate";

  // beach vs mountain
  if (has("beach", "ocean", "coast", "surf", "sea")) inputs.beachMountain = "beach";
  else if (has("mountain", "hiking", "alpine", "ski", "trail")) inputs.beachMountain = "mountains";

  // 3 — rhythm / noise
  if (has("quiet", "slow", "calm", "peaceful", "introvert")) inputs.noiseTolerance = "low";
  else if (has("nightlife", "party", "vibrant", "energy", "buzzing")) inputs.noiseTolerance = "high";
  else inputs.noiseTolerance = "medium";
  if (has("urban", "city life", "walkable")) inputs.outdoorUrban = "urban";

  // 4 — work
  if (has("remote", "work from anywhere", "freelance", "online business")) inputs.workStyle = "remote";
  const industries: string[] = [];
  if (has("tech", "software", "developer", "engineer", "startup")) industries.push("tech");
  if (has("creative", "design", "artist", "writer")) industries.push("creative");
  if (has("finance", "investing", "trading")) industries.push("finance");
  if (industries.length) inputs.industries = industries;

  // 5 — community
  const vibes: string[] = [];
  if (has("nomad", "remote community", "coworking")) vibes.push("digital-nomad");
  if (has("founder", "startup scene", "builders")) vibes.push("startup");
  if (has("expat", "international")) vibes.push("expat");
  if (has("local culture", "locals", "authentic")) vibes.push("local");
  if (vibes.length) inputs.communityVibes = vibes;

  // 6 — money / tax
  if (has("tight budget", "affordable", "cheap", "frugal", "stretch")) inputs.budgetRange = "budget";
  else if (has("luxury", "high budget", "no budget", "premium", "expensive taste")) inputs.budgetRange = "luxury";
  else inputs.budgetRange = "mid-range";
  if (has("tax", "tax-free", "low tax", "tax optimization", "tax sensitive")) inputs.taxSensitivity = "very-sensitive";

  // 7 — temperament
  if (has("risk-averse", "stability", "secure", "cautious")) inputs.riskTolerance = "low";

  // 8 — wellness / health
  if (has("fitness", "gym", "yoga", "wellness", "health-conscious", "active")) {
    inputs.wellnessImportance = "high";
    inputs.gymCulture = "important";
  }
  if (has("healthcare", "medical", "health condition")) inputs.healthcarePriority = "essential";

  // safety
  if (has("safe", "safety", "low crime", "secure")) inputs.safetyPriority = "top-priority";

  // travel connectivity
  if (has("airport", "fly often", "frequent flyer", "connectivity")) inputs.airportImportance = "essential";

  // 10 — non-negotiables
  const mustHaves: string[] = [];
  if (has("must be affordable", "affordability is", "affordable")) mustHaves.push("affordable");
  if (has("must be safe", "safety is non")) mustHaves.push("safety");
  if (has("nature is", "need nature", "access to nature")) mustHaves.push("nature");
  if (inputs.beachMountain === "beach" && has("beach")) mustHaves.push("beach");
  if (mustHaves.length) inputs.mustHaves = [...new Set(mustHaves)].slice(0, 3);

  return { inputs, readback: buildReadback(inputs) };
}

export function buildReadback(inputs: OnboardingData): { key: string; label: string; value: string }[] {
  const rows: { key: string; label: string; value: string }[] = [];
  const push = (key: keyof OnboardingData, label: string, map?: Record<string, string>) => {
    const raw = inputs[key];
    if (raw === undefined || raw === null || (Array.isArray(raw) && raw.length === 0)) return;
    const val = Array.isArray(raw) ? raw.join(", ") : String(raw);
    rows.push({ key: String(key), label, value: map?.[val] ?? prettify(val) });
  };
  push("currentCity", "Lives in");
  push("lifestyleMode", "Lifestyle");
  push("preferredClimate", "Climate");
  push("beachMountain", "Drawn to");
  push("noiseTolerance", "Daily rhythm", { low: "Quiet & calm", medium: "Walkable buzz", high: "Energy & nightlife" });
  push("workStyle", "Work");
  push("communityVibes", "People");
  push("budgetRange", "Budget");
  push("taxSensitivity", "Taxes matter");
  push("safetyPriority", "Safety");
  push("wellnessImportance", "Wellness");
  push("mustHaves", "Non-negotiables");
  return rows;
}

function prettify(s: string): string {
  return s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
