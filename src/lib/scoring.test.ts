import { describe, it, expect } from "vitest";
import {
  scoreBreeds,
  scoreDreamBreed,
  calculateCategoryScores,
  calculateTotalScore,
  type Breed,
} from "./scoring";
import { buildAdoptionPlan } from "./adoptionPlan";
import { computeLifeChange } from "./lifeChange";
import { computeConfidence } from "./confidence";
import { computeCostComparison } from "./cost";
import { BREEDS } from "@/data/breeds";
import type { OnboardingData } from "@/types/onboarding";

// Fixed, representative preference profiles. These lock scoring behavior:
// any change to the algorithm OR the dataset that alters output will fail here.
const PROFILES: Record<string, OnboardingData> = {
  activeFamilyHouse: {
    homeType: "house-big-yard",
    activityLevel: "active",
    hoursAlone: "half-day",
    experienceLevel: "had-dogs",
    hasKids: true,
    kidsAges: "school-age",
    sizePreference: "large",
    affectionStyle: "velcro",
    trainingAppetite: "basics",
    budgetRange: "mid-range",
    mustHaves: ["good-with-kids"],
    adoptPreference: "adopt",
  },
  apartmentAllergic: {
    homeType: "apartment",
    activityLevel: "moderate",
    hoursAlone: "full-day",
    experienceLevel: "first-time",
    hasKids: false,
    sizePreference: "small",
    allergies: true,
    barkTolerance: "low",
    groomingTolerance: "moderate",
    affectionStyle: "balanced",
    budgetRange: "mid-range",
    mustHaves: ["hypoallergenic", "quiet", "apartment-ok"],
    dealBreakers: ["constant-barking"],
  },
  guardianRural: {
    homeType: "rural",
    activityLevel: "moderate",
    hoursAlone: "half-day",
    experienceLevel: "experienced",
    guardingImportance: "top-priority",
    sizePreference: "giant",
    affectionStyle: "independent",
    climate: "cold",
    budgetRange: "no-ceiling",
    mustHaves: ["protective"],
  },
};

function topN(profile: OnboardingData, n = 10) {
  return scoreBreeds(BREEDS, profile)
    .slice(0, n)
    .map((r) => ({ rank: r.rank, name: r.breed.name, group: r.breed.group, score: r.totalScore }));
}

describe("dataset integrity", () => {
  it("has 160+ unique curated breeds", () => {
    expect(BREEDS.length).toBeGreaterThanOrEqual(160);
    expect(new Set(BREEDS.map((b) => b.id)).size).toBe(BREEDS.length);
    expect(new Set(BREEDS.map((b) => b.name)).size).toBe(BREEDS.length);
  });

  it("every breed has all trait fields populated and in range", () => {
    const score100Fields: (keyof Breed)[] = [
      "energy_level",
      "exercise_needs",
      "playfulness",
      "apartment_friendly",
      "novice_friendly",
      "trainability",
      "intelligence",
      "grooming_needs",
      "shedding_level",
      "drooling_level",
      "kid_friendly",
      "affection_level",
      "independence",
      "alone_tolerance",
      "dog_friendly",
      "cat_friendly",
      "stranger_friendly",
      "protectiveness",
      "watchdog_alertness",
      "barking_level",
      "heat_tolerance",
      "cold_tolerance",
      "health_robustness",
    ];
    const groups = new Set(["Sporting", "Hound", "Working", "Terrier", "Toy", "Non-Sporting", "Herding", "Mixed & Rescue"]);
    const sizes = new Set(["Toy", "Small", "Medium", "Large", "Giant"]);
    for (const b of BREEDS) {
      for (const f of score100Fields) {
        const v = b[f] as number;
        expect(typeof v, `${b.name}.${String(f)}`).toBe("number");
        expect(v, `${b.name}.${String(f)}`).toBeGreaterThanOrEqual(0);
        expect(v, `${b.name}.${String(f)}`).toBeLessThanOrEqual(100);
      }
      expect(groups.has(b.group), `${b.name} group=${b.group}`).toBe(true);
      expect(sizes.has(b.size), `${b.name} size=${b.size}`).toBe(true);
      expect(b.tags.length, `${b.name} tags`).toBeGreaterThanOrEqual(2);
      expect(b.monthly_cost_usd, `${b.name} cost`).toBeGreaterThan(40);
      expect(b.lifespan_years, `${b.name} lifespan`).toBeGreaterThanOrEqual(6);
      // Hypoallergenic claims must be coherent with the coat data.
      if (b.hypoallergenic) expect(b.shedding_level, `${b.name} hypoallergenic but sheds`).toBeLessThanOrEqual(25);
    }
  });

  it("the shelter layer has enough supply: 20+ breeds commonly available in shelters", () => {
    const common = BREEDS.filter((b) => (b.shelter_availability ?? 0) >= 60);
    expect(common.length).toBeGreaterThanOrEqual(20);
  });
});

describe("scoreBreeds is deterministic and well-formed", () => {
  it("ranks all breeds contiguously", () => {
    const results = scoreBreeds(BREEDS, PROFILES.activeFamilyHouse);
    expect(results.length).toBe(BREEDS.length);
    expect(results.map((r) => r.rank)).toEqual(Array.from({ length: BREEDS.length }, (_, i) => i + 1));
    // sorted descending by score
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].totalScore).toBeGreaterThanOrEqual(results[i].totalScore);
    }
  });

  it("produces identical output across repeated runs (pure function)", () => {
    const a = scoreBreeds(BREEDS, PROFILES.apartmentAllergic).map((r) => [r.breed.id, r.totalScore]);
    const b = scoreBreeds(BREEDS, PROFILES.apartmentAllergic).map((r) => [r.breed.id, r.totalScore]);
    expect(a).toEqual(b);
  });

  it("totalScore stays within the spread bounds [28,99]", () => {
    for (const r of scoreBreeds(BREEDS, PROFILES.guardianRural)) {
      expect(r.totalScore).toBeGreaterThanOrEqual(28);
      expect(r.totalScore).toBeLessThanOrEqual(99);
    }
  });

  // Locks the display curve against regressing to a "wall of identical floor scores".
  // For every representative profile: a genuinely strong #1 (>=85), and the ranking must
  // NOT pile up at the floor (fewer than 25% of breeds at the minimum displayed score).
  it("produces a believable display distribution (no floor pileup)", () => {
    for (const profile of Object.values(PROFILES)) {
      const results = scoreBreeds(BREEDS, profile);
      expect(results[0].totalScore).toBeGreaterThanOrEqual(85);
      const min = Math.min(...results.map((r) => r.totalScore));
      const atFloor = results.filter((r) => r.totalScore === min).length;
      expect(atFloor / results.length).toBeLessThan(0.25);
    }
  });

  // Characterization snapshots — the actual behavior lock.
  it("active family / big yard top-10 is locked", () => {
    expect(topN(PROFILES.activeFamilyHouse)).toMatchSnapshot();
  });
  it("apartment / allergic / first-time top-10 is locked", () => {
    expect(topN(PROFILES.apartmentAllergic)).toMatchSnapshot();
  });
  it("guardian / rural / experienced top-10 is locked", () => {
    expect(topN(PROFILES.guardianRural)).toMatchSnapshot();
  });
});

describe("fit, not trait-maximization", () => {
  it("the allergic apartment profile never surfaces a heavy shedder in the top 10", () => {
    const top10 = scoreBreeds(BREEDS, PROFILES.apartmentAllergic).slice(0, 10);
    for (const r of top10) {
      expect(r.breed.hypoallergenic || (r.breed.shedding_level ?? 50) <= 40, r.breed.name).toBe(true);
      expect((r.breed.barking_level ?? 50) <= 75, `${r.breed.name} barks`).toBe(true);
    }
  });

  it("a relaxed first-timer in an apartment is not handed an elite working dog", () => {
    const relaxed: OnboardingData = {
      homeType: "apartment",
      activityLevel: "relaxed",
      experienceLevel: "first-time",
      hoursAlone: "half-day",
      affectionStyle: "velcro",
    };
    const top8 = scoreBreeds(BREEDS, relaxed).slice(0, 8).map((r) => r.breed.name.toLowerCase());
    for (const hot of ["belgian malinois", "border collie", "australian cattle dog", "dutch shepherd"]) {
      expect(top8, `top-8 should not contain ${hot}`).not.toContain(hot);
    }
  });

  it("revealed preference pulls a loved breed to #1 ('I always knew')", () => {
    const p: OnboardingData = { ...PROFILES.activeFamilyHouse, lovedBreeds: ["Golden Retriever"] };
    const results = scoreBreeds(BREEDS, p);
    expect(results[0].breed.name.toLowerCase()).toBe("golden retriever");
  });

  it("guarding demand actually surfaces guardians", () => {
    const top10 = scoreBreeds(BREEDS, PROFILES.guardianRural).slice(0, 10);
    const guardiany = top10.filter((r) => (r.breed.protectiveness ?? 0) >= 70);
    expect(guardiany.length).toBeGreaterThanOrEqual(6);
  });
});

describe("category scoring", () => {
  it("returns 10 categories whose weights sum to ~1", () => {
    const cats = calculateCategoryScores(BREEDS[0], PROFILES.activeFamilyHouse);
    expect(cats.length).toBe(10);
    const wsum = cats.reduce((s, c) => s + c.weight, 0);
    expect(wsum).toBeCloseTo(1, 5);
    expect(calculateTotalScore(cats)).toBeGreaterThan(0);
  });
});

describe("scoreDreamBreed", () => {
  it("finds a known breed case-insensitively and returns a stable, found result", () => {
    const a = scoreDreamBreed("Golden Retriever", BREEDS, PROFILES.activeFamilyHouse);
    const b = scoreDreamBreed("golden retriever", BREEDS, PROFILES.activeFamilyHouse);
    expect(a.breedFound).toBe(true);
    expect(a.score).toBe(b.score);
    expect(a.categoryScores.length).toBe(6);
  });

  it("resolves nicknames, abbreviations, and phrasing to a curated breed", () => {
    expect(scoreDreamBreed("lab", BREEDS, PROFILES.activeFamilyHouse).resolvedName).toBe("Labrador Retriever");
    expect(scoreDreamBreed("GSD", BREEDS, PROFILES.activeFamilyHouse).resolvedName).toBe("German Shepherd");
    expect(scoreDreamBreed("my childhood golden retriever", BREEDS, PROFILES.activeFamilyHouse).breedFound).toBe(true);
    expect(scoreDreamBreed("frenchie", BREEDS, PROFILES.apartmentAllergic).resolvedName).toBe("French Bulldog");
  });

  it("grounds an unlisted breed in a real estimate (no random hash)", () => {
    const a = scoreDreamBreed("Estrela Mountain Dog", BREEDS, PROFILES.guardianRural);
    const b = scoreDreamBreed("Estrela Mountain Dog", BREEDS, PROFILES.guardianRural);
    expect(a.breedFound).toBe(false);
    expect(a.estimated).toBe(true);
    expect(a.score).toBe(b.score); // deterministic
    expect(a.score).toBeGreaterThanOrEqual(28);
    expect(a.score).toBeLessThanOrEqual(99);
  });
});

describe("computeLifeChange", () => {
  it("returns 6 dream-vs-best buckets with deltas, biggest gains first", () => {
    const fit = scoreDreamBreed("Siberian Husky", BREEDS, PROFILES.apartmentAllergic);
    const top = scoreBreeds(BREEDS, PROFILES.apartmentAllergic)[0];
    const lc = computeLifeChange(fit, top.categoryScores, top.displayScore);
    expect(lc.categories.map((c) => c.label).sort()).toEqual([
      "Care & Training",
      "Energy & Exercise",
      "Family & Social",
      "Guarding & Noise",
      "Home & Alone-Time",
      "Temperament",
    ]);
    for (let i = 1; i < lc.categories.length; i++) {
      expect(lc.categories[i - 1].delta).toBeGreaterThanOrEqual(lc.categories[i].delta);
    }
    for (const c of lc.categories) {
      expect(c.delta).toBe(c.best - c.current);
      expect(typeof c.note).toBe("string");
    }
    // headline overall uses the HONEST display score (same formula both sides)
    expect(lc.bestScore).toBe(top.displayScore);
    expect(lc.overallDelta).toBe(lc.bestScore - lc.currentScore);
    expect(lc.headline.length).toBeGreaterThan(0);
  });
});

describe("computeConfidence", () => {
  it("climbs as more dimensions are answered, within [40,98]", () => {
    const few: OnboardingData = { homeType: "apartment", activityLevel: "moderate" };
    const many: OnboardingData = {
      ...PROFILES.apartmentAllergic,
      trainingAppetite: "basics",
      climate: "temperate",
      travelFrequency: "rarely",
      otherPets: ["cat"],
      adoptPreference: "adopt",
      sheddingTolerance: "low",
      lovedBreeds: ["Poodle"],
    };
    const cFew = computeConfidence(few, scoreBreeds(BREEDS, few));
    const cMany = computeConfidence(many, scoreBreeds(BREEDS, many));
    expect(cFew).toBeGreaterThanOrEqual(40);
    expect(cMany).toBeLessThanOrEqual(98);
    expect(cMany).toBeGreaterThan(cFew + 10);
  });
});

describe("cost of ownership", () => {
  it("adoption saves real money vs a breeder, and lifetime math is coherent", () => {
    const top = scoreBreeds(BREEDS, PROFILES.activeFamilyHouse)[0].breed;
    const cost = computeCostComparison(PROFILES.activeFamilyHouse, top, null);
    expect(cost.adoptionSavings).toBeGreaterThan(0);
    expect(cost.firstYearBreeder).toBe(cost.firstYearAdopted + cost.adoptionSavings);
    expect(cost.lifetimeCost).toBe(cost.monthlyCost * 12 * cost.lifespanYears);
  });
});

describe("adoption plan", () => {
  it("builds shelter-first sources for the #1 match near the user", () => {
    const matches = scoreBreeds(BREEDS, PROFILES.activeFamilyHouse);
    const plan = buildAdoptionPlan(matches[0].breed, matches, {
      ...PROFILES.activeFamilyHouse,
      currentCity: "Austin, TX",
    });
    expect(plan.sources.length).toBeGreaterThanOrEqual(3);
    expect(plan.sources[0].url).toContain("petfinder.com");
    expect(plan.sources[0].url).toContain("Austin");
    expect(plan.checklist.length).toBeGreaterThanOrEqual(5);
    // adopt preference → no breeder notes
    expect(plan.breederNotes).toEqual([]);
    // alternates are shelter-common, exclude the #1, and keep their ranking order
    for (const alt of plan.shelterAlternates) {
      expect(alt.id).not.toBe(matches[0].breed.id);
      expect(alt.shelterAvailability).toBeGreaterThanOrEqual(60);
    }
  });
});
