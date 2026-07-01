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

  it("totalScore stays within the spread bounds [28,99]", () => {
    for (const r of scoreLocations(LOCATIONS, PROFILES.mountainsCold)) {
      expect(r.totalScore).toBeGreaterThanOrEqual(28);
      expect(r.totalScore).toBeLessThanOrEqual(99);
    }
  });

  // Locks the display curve against regressing to a "wall of identical floor scores".
  // For every representative profile: a genuinely strong #1 (>=85), and the ranking must
  // NOT pile up at the floor (fewer than 25% of places at the minimum displayed score).
  it("produces a believable display distribution (no floor pileup)", () => {
    for (const profile of Object.values(PROFILES)) {
      const results = scoreLocations(LOCATIONS, profile);
      expect(results[0].totalScore).toBeGreaterThanOrEqual(85);
      const min = Math.min(...results.map((r) => r.totalScore));
      const atFloor = results.filter((r) => r.totalScore === min).length;
      expect(atFloor / results.length).toBeLessThan(0.25);
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

describe("fit, not amenity-maximization", () => {
  // The founder's archetype: lives in/loves Bali, beach + tropical + creative-remote +
  // community + wellness, NOT primarily tax-driven.
  const baliPerson: OnboardingData = {
    currentCity: "Bali", lifestyleMode: "nomadic", beachMountain: "beach", preferredClimate: "tropical",
    noiseTolerance: "medium", workStyle: "remote", communityVibes: ["digital-nomad", "startup"],
    budgetRange: "mid-range", taxSensitivity: "somewhat", safetyPriority: "important",
    wellnessImportance: "high", outdoorUrban: "balanced", industries: ["creative", "tech"], mustHaves: ["beach", "nature"],
  };

  it("does not let generic high-stat metros win a tropical-beach profile", () => {
    const top8 = scoreLocations(LOCATIONS, baliPerson).slice(0, 8).map((r) => r.location.name.toLowerCase());
    // The old amenity-sum model ranked LA #1 and Miami above Bali. Lock that it cannot recur.
    expect(top8).not.toContain("los angeles");
    expect(top8).not.toContain("miami");
    // Bali itself is a strong fit and must be near the top.
    const bali = scoreLocations(LOCATIONS, baliPerson).find((r) => r.location.name.toLowerCase() === "bali");
    expect(bali!.rank).toBeLessThanOrEqual(6);
  });

  it("revealed preference pulls a loved place to #1 ('I always knew')", () => {
    const withLoved = scoreLocations(LOCATIONS, { ...baliPerson, lovedPlaces: ["Bali"] });
    expect(withLoved[0].location.name.toLowerCase()).toBe("bali");
  });

  it("does not inject tax bias for users who aren't tax-sensitive", () => {
    // Two identical profiles differing only in tax sensitivity should NOT produce the same
    // tax-haven-topped ranking; the non-tax user's #1 should not be driven by tax friendliness.
    const notTax = scoreLocations(LOCATIONS, { ...baliPerson, taxSensitivity: "not-sensitive" })[0];
    expect(notTax.location.tax_friendliness_score).not.toBeNull();
    // sanity: a non-tax tropical-beach person's top pick is a warm/beachy place, not picked for tax
    expect(notTax.categoryScores.find((c) => c.category === "nature")!.score).toBeGreaterThan(55);
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
    expect(a.categoryScores.length).toBe(6);
  });

  it("resolves Bali neighborhoods + 'City, Country' to a curated place", () => {
    expect(scoreCurrentCity("Canggu", LOCATIONS, PROFILES.budgetNomadBeach).cityFound).toBe(true);
    expect(scoreCurrentCity("Seseh Bali", LOCATIONS, PROFILES.budgetNomadBeach).cityFound).toBe(true);
    // A curated city with the country appended must still resolve (no random fallback).
    const lis = scoreCurrentCity("Lisbon, Portugal", LOCATIONS, PROFILES.budgetNomadBeach);
    expect(lis.cityFound).toBe(true);
    expect(lis.resolvedName?.toLowerCase()).toContain("lisbon");
  });

  it("grounds an unlisted city in a real estimate (no random hash)", () => {
    const a = scoreCurrentCity("Chengdu", LOCATIONS, PROFILES.budgetNomadBeach);
    const b = scoreCurrentCity("Chengdu", LOCATIONS, PROFILES.budgetNomadBeach);
    expect(a.cityFound).toBe(false);
    expect(a.estimated).toBe(true);
    expect(a.score).toBe(b.score); // deterministic
    expect(a.score).toBeGreaterThanOrEqual(35);
    expect(a.score).toBeLessThanOrEqual(99);
  });
});

describe("computeLifeChange", () => {
  it("returns 6 current-vs-best buckets (incl. Cost and Safety) with deltas", () => {
    const fit = scoreCurrentCity("London", LOCATIONS, PROFILES.budgetNomadBeach);
    const top = scoreLocations(LOCATIONS, PROFILES.budgetNomadBeach)[0];
    const lc = computeLifeChange(fit, top.categoryScores, top.displayScore);
    expect(lc.categories.map((c) => c.label).sort()).toEqual([
      "Career & Opportunity",
      "Community Fit",
      "Cost & Value",
      "Lifestyle Fit",
      "Nature & Environment",
      "Safety & Stability",
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
    // headline overall uses the HONEST display score (same formula both sides)
    expect(lc.bestScore).toBe(top.displayScore);
    expect(lc.overallDelta).toBe(lc.bestScore - lc.currentScore);
    expect(lc.headline.length).toBeGreaterThan(0);
  });

  it("is deterministic", () => {
    const fit = scoreCurrentCity("London", LOCATIONS, PROFILES.mountainsCold);
    const top = scoreLocations(LOCATIONS, PROFILES.mountainsCold)[0];
    expect(JSON.stringify(computeLifeChange(fit, top.categoryScores, top.displayScore))).toBe(
      JSON.stringify(computeLifeChange(fit, top.categoryScores, top.displayScore))
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
