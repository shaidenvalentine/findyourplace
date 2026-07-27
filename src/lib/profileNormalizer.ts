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

  // 1 — home setup
  if (has("apartment", "flat", "condo", "studio", "no yard", "high-rise")) inputs.homeType = "apartment";
  else if (has("big yard", "large yard", "acreage", "farm", "rural", "land")) inputs.homeType = "house-big-yard";
  else if (has("small yard", "townhouse", "patio", "courtyard")) inputs.homeType = "house-small-yard";
  else if (has("house", "backyard", "yard")) inputs.homeType = "house-small-yard";

  // 2 — activity level (honest)
  if (has("marathon", "ultra", "triathlon", "runs daily", "run every day", "very athletic", "trail running", "avid runner", "crossfit")) {
    inputs.activityLevel = "athlete";
  } else if (has("hike", "hiking", "runs ", "running", "jog", "active", "gym", "outdoors a lot")) {
    inputs.activityLevel = "active";
  } else if (has("sedentary", "couch", "not very active", "homebody", "low energy", "doesn't exercise", "rarely exercise")) {
    inputs.activityLevel = "relaxed";
  } else if (has("walks", "walking", "moderately active")) {
    inputs.activityLevel = "moderate";
  }

  // 3 — schedule / alone time
  if (has("work from home", "works from home", "wfh", "remote", "home all day", "rarely alone", "retired")) inputs.hoursAlone = "rarely";
  else if (has("office full", "9-5", "9 to 5", "full workday", "long hours", "away all day", "gone all day")) inputs.hoursAlone = "full-day";
  else if (has("hybrid", "part-time", "few hours", "half day")) inputs.hoursAlone = "half-day";
  if (has("travels often", "travel a lot", "frequent travel", "on the road", "flies often")) inputs.travelFrequency = "often";

  // 4 — experience & training
  if (has("first dog", "first-time", "never had a dog", "never owned")) inputs.experienceLevel = "first-time";
  else if (has("grew up with dogs", "always had dogs", "experienced owner", "trained dogs", "many dogs")) inputs.experienceLevel = "experienced";
  else if (has("had a dog", "had dogs", "previous dog", "used to have")) inputs.experienceLevel = "had-dogs";
  if (has("loves training", "enjoy training", "dog sports", "agility", "obedience", "trick")) inputs.trainingAppetite = "love-it";
  else if (has("minimal training", "not interested in training", "low effort")) inputs.trainingAppetite = "minimal";

  // 5 — household
  if (has("kids", "children", "child", "toddler", "baby", "son", "daughter")) {
    inputs.hasKids = true;
    if (has("toddler", "baby", "infant", "under 5", "under five", "preschool")) inputs.kidsAges = "toddlers";
    else if (has("teen")) inputs.kidsAges = "teens";
    else inputs.kidsAges = "school-age";
  }
  const pets: string[] = [];
  if (has(" cat", "cats ", "a cat")) pets.push("cat");
  if (has("another dog", "other dog", "second dog", "two dogs")) pets.push("dog");
  if (has("rabbit", "hamster", "guinea pig", "bird", "small pets")) pets.push("small-pets");
  if (pets.length) inputs.otherPets = pets;
  if (has("allerg")) inputs.allergies = true;

  // 6 — temperament fit
  if (has("velcro", "cuddly", "cuddle", "lap dog", "affectionate", "attached", "shadow")) inputs.affectionStyle = "velcro";
  else if (has("independent", "aloof", "own space", "not clingy", "roommate")) inputs.affectionStyle = "independent";
  else if (has("balanced", "affectionate but")) inputs.affectionStyle = "balanced";

  // 7 — practical tolerances
  if (has("no shedding", "hates shedding", "can't stand fur", "low-shedding", "low shedding", "hates fur")) inputs.sheddingTolerance = "low";
  if (has("no barking", "quiet", "thin walls", "noise-sensitive", "hates barking")) inputs.barkTolerance = "low";
  if (has("low maintenance", "low-maintenance", "wash and go", "minimal grooming")) inputs.groomingTolerance = "minimal";
  else if (has("enjoys grooming", "loves grooming", "brushing is")) inputs.groomingTolerance = "enjoys-grooming";

  // 8 — protection
  if (has("protection", "protective", "guard", "safety", "security", "watchdog", "lives alone and wants")) {
    inputs.guardingImportance = has("just a companion", "not for protection") ? "nice-to-have" : "top-priority";
  }

  // 9 — money
  if (has("tight budget", "budget-conscious", "frugal", "keep costs", "cheap")) inputs.budgetRange = "budget";
  else if (has("money is no", "whatever it takes", "no budget", "spare no expense")) inputs.budgetRange = "no-ceiling";
  else inputs.budgetRange = "mid-range";

  // 10 — breeds loved / dreamed
  // (dreamBreed and lovedBreeds are captured as explicit inputs in the UI; here we only
  // catch obvious "I've always wanted a X" phrasing via the readback correction step.)

  // adoption preference
  if (has("adopt", "rescue", "shelter")) inputs.adoptPreference = "adopt";
  else if (has("breeder", "purebred puppy")) inputs.adoptPreference = "either";

  // climate
  if (has("hot climate", "very hot", "desert", "florida", "arizona", "texas heat", "tropical")) inputs.climate = "hot";
  else if (has("cold winters", "snowy", "harsh winter", "canada", "minnesota")) inputs.climate = "cold";

  // must-haves
  const mustHaves: string[] = [];
  if (inputs.allergies) mustHaves.push("hypoallergenic");
  if (inputs.hasKids) mustHaves.push("good-with-kids");
  if (inputs.homeType === "apartment") mustHaves.push("apartment-ok");
  if (inputs.barkTolerance === "low") mustHaves.push("quiet");
  if (has("running partner", "jogging partner", "run with me")) mustHaves.push("jogging-partner");
  if (mustHaves.length) inputs.mustHaves = [...new Set(mustHaves)].slice(0, 3);

  // deal-breakers
  const dealBreakers: string[] = [];
  if (has("hates shedding", "can't stand fur", "no shedding")) dealBreakers.push("heavy-shedding");
  if (has("drool", "slobber")) dealBreakers.push("drooling");
  if (has("hates barking", "no barking")) dealBreakers.push("constant-barking");
  if (dealBreakers.length) inputs.dealBreakers = dealBreakers;

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
  push("homeType", "Home", {
    apartment: "Apartment",
    "house-small-yard": "House, small yard",
    "house-big-yard": "House, big yard",
    rural: "Rural / acreage",
  });
  push("activityLevel", "Activity", {
    relaxed: "Walks & couch",
    moderate: "Moderately active",
    active: "Active — runs & hikes",
    athlete: "Athlete — training partner",
  });
  push("hoursAlone", "Dog alone", { rarely: "Rarely", "half-day": "A few hours", "full-day": "Full workday" });
  push("experienceLevel", "Experience", { "first-time": "First dog", "had-dogs": "Had dogs before", experienced: "Very experienced" });
  push("hasKids", "Kids", { true: "Yes", false: "No" });
  push("otherPets", "Other pets");
  push("allergies", "Allergies", { true: "Yes — low-allergen needed", false: "None" });
  push("affectionStyle", "Wants", { velcro: "A velcro dog", balanced: "Affectionate but chill", independent: "An independent dog" });
  push("guardingImportance", "Protection", { "top-priority": "Wants a guardian", "nice-to-have": "Watchdog is a plus", "not-needed": "Companion only" });
  push("budgetRange", "Budget", { budget: "Lean (~$100/mo)", "mid-range": "Comfortable", "no-ceiling": "No ceiling" });
  push("adoptPreference", "Source", { adopt: "Adopt / rescue", breeder: "Breeder", either: "Open to either" });
  push("mustHaves", "Non-negotiables");
  push("dealBreakers", "Deal-breakers");
  return rows;
}

function prettify(s: string): string {
  return s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
