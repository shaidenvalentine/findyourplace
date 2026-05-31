import { describe, it, expect } from "vitest";
import {
  scoreLocations,
  scoreCurrentCity,
  calculateCategoryScores,
  calculateTotalScore,
  type Location,
} from "./scoring";
import { generateAnnualCircuit } from "./circuitGenerator";
import { computeLifeChange } from "./lifeChange";
import { computeConfidence } from "./confidence";
import { LOCATIONS } from "@/data/locations";
import type { OnboardingData } from "@/types/onboarding";

// Fixed, representative preference profiles. These lock scoring behavior:
// any change to the algorithm OR the dataset that alters output will fail here.
const PROFILES: Record<string, OnboardingData> = {
  budgetNomadBeach: {
    lifestyleMode: "nomadic",
    budgetRange: "budget",
    beachMountain: "beach",
    preferredClimate: "tropical",
    workStyle: "remote",
    communityVibes: ["digital-nomad", "expat"],
    taxSensitivity: "very-sensitive",
    mustHaves: ["affordable", "beach"],
    topPriorities: ["cost", "weather"],
    noiseTolerance: "medium",
    industries: ["tech"],
  },
  safetyRootedCity: {
    lifestyleMode: "rooted",
    budgetRange: "luxury",
    outdoorUrban: "urban",
    safetyPriority: "top-priority",
    healthcarePriority: "essential",
    riskTolerance: "low",
    preferredClimate: "temperate",
    mustHaves: ["safety"],
    topPriorities: ["safety"],
    noiseTolerance: "low",
    airportImportance: "essential",
  },
  mountainsCold: {
    lifestyleMode: "nomadic",
    locationChangesPerYear: "4-6",
    beachMountain: "mountains",
    preferredClimate: "cold",
    budgetRange: "mid-range",
    gymCulture: "important",
    wellnessImportance: "high",
    noiseTolerance: "low",
  },
};

function topN(profile: OnboardingData, n = 10) {
  return scoreLocations(LOCATIONS, profile)
    .slice(0, n)
    .map((r) => ({ rank: r.rank, name: r.location.name, country: r.location.country, score: r.totalScore }));
}

describe("dataset integrity", () => {
  it("has exactly 250 unique locations", () => {
    expect(LOCATIONS.length).toBe(250);
    expect(new Set(LOCATIONS.map((l) => l.id)).size).toBe(250);
  });

  it("every location has all score fields populated and in range", () => {
    const score100Fields: (keyof Location)[] = [
      "cost_of_living_score",
      "rent_score",
      "safety_score",
      "healthcare_score",
      "climate_score",
      "humidity_level",
      "beach_access_score",
      "mountain_access_score",
      "outdoor_score",
      "nightlife_score",
      "wellness_score",
      "dating_scene_score",
      "community_score",
      "english_friendliness_score",
      "visa_friendliness_score",
      "tax_friendliness_score",
      "airport_connectivity_score",
      "internet_quality_score",
      "walkability_score",
      "transit_score",
      "culture_openness_score",
      "startup_ecosystem_score",
      "bureaucracy_score",
    ];
    for (const loc of LOCATIONS) {
      for (const f of score100Fields) {
        const v = loc[f] as number;
        expect(typeof v, `${loc.name}.${String(f)}`).toBe("number");
        expect(v, `${loc.name}.${String(f)}`).toBeGreaterThanOrEqual(0);
        expect(v, `${loc.name}.${String(f)}`).toBeLessThanOrEqual(100);
      }
      expect(loc.tags.length, `${loc.name} tags`).toBeGreaterThanOrEqual(3);
    }
  });
});

describe("scoreLocations is deterministic and well-formed", () => {
  it("ranks all 250 locations contiguously", () => {
    const results = scoreLocations(LOCATIONS, PROFILES.budgetNomadBeach);
    expect(results.length).toBe(250);
    expect(results.map((r) => r.rank)).toEqual(Array.from({ length: 250 }, (_, i) => i + 1));
    // sorted descending by score
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].totalScore).toBeGreaterThanOrEqual(results[i].totalScore);
    }
  });

  it("produces identical output across repeated runs (pure function)", () => {
    const a = scoreLocations(LOCATIONS, PROFILES.safetyRootedCity).map((r) => [r.location.id, r.totalScore]);
    const b = scoreLocations(LOCATIONS, PROFILES.safetyRootedCity).map((r) => [r.location.id, r.totalScore]);
    expect(a).toEqual(b);
  });

  it("totalScore stays within the spread bounds [45,98]", () => {
    for (const r of scoreLocations(LOCATIONS, PROFILES.mountainsCold)) {
      expect(r.totalScore).toBeGreaterThanOrEqual(45);
      expect(r.totalScore).toBeLessThanOrEqual(98);
    }
  });

  // Characterization snapshots — the actual behavior lock.
  it("budget nomad / beach top-10 is locked", () => {
    expect(topN(PROFILES.budgetNomadBeach)).toMatchSnapshot();
  });
  it("safety-first rooted city top-10 is locked", () => {
    expect(topN(PROFILES.safetyRootedCity)).toMatchSnapshot();
  });
  it("mountains / cold top-10 is locked", () => {
    expect(topN(PROFILES.mountainsCold)).toMatchSnapshot();
  });
});

describe("category scoring", () => {
  it("returns 10 categories whose weights sum to ~1", () => {
    const cats = calculateCategoryScores(LOCATIONS[0], PROFILES.budgetNomadBeach);
    expect(cats.length).toBe(10);
    const wsum = cats.reduce((s, c) => s + c.weight, 0);
    expect(wsum).toBeCloseTo(1, 5);
    expect(calculateTotalScore(cats)).toBeGreaterThan(0);
  });
});

describe("scoreCurrentCity", () => {
  it("finds a known city and returns a stable, found result", () => {
    const a = scoreCurrentCity("Bali", LOCATIONS, PROFILES.budgetNomadBeach);
    const b = scoreCurrentCity("bali", LOCATIONS, PROFILES.budgetNomadBeach);
    expect(a.cityFound).toBe(true);
    expect(a.score).toBe(b.score);
    expect(a.categoryScores.length).toBe(4);
  });

  it("maps Bali neighborhoods to Bali", () => {
    const r = scoreCurrentCity("Canggu", LOCATIONS, PROFILES.budgetNomadBeach);
    expect(r.cityFound).toBe(true);
  });

  it("is deterministic for unknown cities (hash fallback)", () => {
    const a = scoreCurrentCity("Smalltownsville", LOCATIONS, PROFILES.budgetNomadBeach);
    const b = scoreCurrentCity("Smalltownsville", LOCATIONS, PROFILES.budgetNomadBeach);
    expect(a.cityFound).toBe(false);
    expect(a.score).toBe(b.score);
    expect(a.score).toBeGreaterThanOrEqual(48);
    expect(a.score).toBeLessThanOrEqual(59);
  });
});

describe("computeLifeChange", () => {
  it("returns the 4 current-vs-best buckets with deltas", () => {
    const fit = scoreCurrentCity("London", LOCATIONS, PROFILES.budgetNomadBeach);
    const top = scoreLocations(LOCATIONS, PROFILES.budgetNomadBeach)[0];
    const lc = computeLifeChange(fit, top.categoryScores, top.totalScore);
    expect(lc.categories.map((c) => c.label).sort()).toEqual([
      "Career & Opportunity",
      "Community Fit",
      "Lifestyle Fit",
      "Nature & Environment",
    ]);
    // sorted by delta descending (biggest gains first)
    for (let i = 1; i < lc.categories.length; i++) {
      expect(lc.categories[i - 1].delta).toBeGreaterThanOrEqual(lc.categories[i].delta);
    }
    for (const c of lc.categories) {
      expect(c.best).toBeGreaterThanOrEqual(0);
      expect(c.best).toBeLessThanOrEqual(100);
      expect(c.delta).toBe(c.best - c.current);
      expect(typeof c.note).toBe("string");
    }
    // headline overall uses the real fit scores (same scale as the #1 match total)
    expect(lc.bestScore).toBe(top.totalScore);
    expect(lc.overallDelta).toBe(lc.bestScore - lc.currentScore);
    expect(lc.headline.length).toBeGreaterThan(0);
  });

  it("is deterministic", () => {
    const fit = scoreCurrentCity("London", LOCATIONS, PROFILES.mountainsCold);
    const top = scoreLocations(LOCATIONS, PROFILES.mountainsCold)[0];
    expect(JSON.stringify(computeLifeChange(fit, top.categoryScores, top.totalScore))).toBe(
      JSON.stringify(computeLifeChange(fit, top.categoryScores, top.totalScore))
    );
  });
});

describe("computeConfidence", () => {
  it("climbs as more dimensions are answered, within [40,98]", () => {
    const few: OnboardingData = { currentCity: "London", beachMountain: "beach" };
    const many: OnboardingData = {
      ...few,
      preferredClimate: "tropical",
      budgetRange: "budget",
      workStyle: "remote",
      wellnessImportance: "high",
      dailyRoutine: "night-owl",
      airportImportance: "essential",
      riskTolerance: "high",
      industries: ["tech"],
      healthcarePriority: "essential",
      cultureTolerance: "important",
      outdoorUrban: "urban",
      peopleDensity: "dense",
      familyProximity: "close",
      safetyPriority: "top-priority",
      taxSensitivity: "very-sensitive",
      communityVibes: ["digital-nomad"],
      noiseTolerance: "high",
      lifestyleMode: "nomadic",
      mustHaves: ["beach"],
    };
    const cFew = computeConfidence(few, scoreLocations(LOCATIONS, few));
    const cMany = computeConfidence(many, scoreLocations(LOCATIONS, many));
    expect(cFew).toBeGreaterThanOrEqual(40);
    expect(cMany).toBeLessThanOrEqual(98);
    expect(cMany).toBeGreaterThan(cFew + 10);
  });
});

describe("generateAnnualCircuit", () => {
  it("returns null for rooted users", () => {
    expect(generateAnnualCircuit(LOCATIONS, PROFILES.safetyRootedCity)).toBeNull();
  });

  it("builds a 12-month circuit for nomadic users", () => {
    const circuit = generateAnnualCircuit(LOCATIONS, PROFILES.mountainsCold);
    expect(circuit).not.toBeNull();
    expect(circuit!.lifestyleMode).toBe("nomadic");
    // 4-6 changes/year => 5 stops
    expect(circuit!.stops.length).toBe(5);
    // months cover Jan..Dec with no gaps
    const allMonths = circuit!.stops.flatMap((s) => s.months);
    expect(allMonths.length).toBe(12);
    // unique locations per stop
    expect(new Set(circuit!.stops.map((s) => s.location.id)).size).toBe(circuit!.stops.length);
    expect(circuit).toMatchSnapshot();
  });
});
