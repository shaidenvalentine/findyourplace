import { describe, it, expect } from "vitest";
import { BREEDS } from "@/data/breeds";
import { scoreBreeds, scoreDreamBreed } from "@/lib/scoring";
import { buildScoredRun } from "@/lib/buildRun";
import type { OnboardingData } from "@/types/onboarding";

/**
 * Accuracy verification — locks the most consequential facts so we catch any drift:
 *   1. Well-known breed facts are right (the audience WILL notice a wrong Husky)
 *   2. The dataset is sane (no missing critical fields, coherent trait pairings)
 *   3. The scoring produces sensible #1s for canonical user archetypes
 */

function breed(name: string) {
  const b = BREEDS.find((x) => x.name.toLowerCase() === name.toLowerCase());
  expect(b, name).toBeDefined();
  return b!;
}

describe("breed facts — the ones every dog person would catch", () => {
  it("huskies shed heavily and are not hypoallergenic", () => {
    const h = breed("Siberian Husky");
    expect(h.shedding_level).toBeGreaterThanOrEqual(80);
    expect(h.hypoallergenic).toBe(false);
    expect(h.cold_tolerance).toBeGreaterThanOrEqual(80);
  });

  it("poodles are hypoallergenic, smart, and highly trainable", () => {
    const p = breed("Standard Poodle");
    expect(p.hypoallergenic).toBe(true);
    expect(p.shedding_level).toBeLessThanOrEqual(15);
    expect(p.trainability).toBeGreaterThanOrEqual(85);
  });

  it("border collies are elite-energy working dogs, not first-timer dogs", () => {
    const bc = breed("Border Collie");
    expect(bc.energy_level).toBeGreaterThanOrEqual(90);
    expect(bc.novice_friendly).toBeLessThanOrEqual(50);
  });

  it("golden retrievers and labs are kid-friendly family anchors", () => {
    for (const n of ["Golden Retriever", "Labrador Retriever"]) {
      const b = breed(n);
      expect(b.kid_friendly, n).toBeGreaterThanOrEqual(85);
      expect(b.novice_friendly, n).toBeGreaterThanOrEqual(70);
    }
  });

  it("guardians guard: rottweiler, GSD, doberman, great pyrenees", () => {
    for (const n of ["Rottweiler", "German Shepherd", "Doberman Pinscher", "Great Pyrenees"]) {
      expect(breed(n).protectiveness, n).toBeGreaterThanOrEqual(80);
    }
  });

  it("brachycephalic breeds are heat-fragile with known health issues", () => {
    for (const n of ["French Bulldog", "English Bulldog", "Pug"]) {
      const b = breed(n);
      expect(b.heat_tolerance, n).toBeLessThanOrEqual(35);
      expect(b.health_robustness, n).toBeLessThanOrEqual(50);
    }
  });

  it("basenjis barely bark; beagles are famously vocal", () => {
    expect(breed("Basenji").barking_level).toBeLessThanOrEqual(20);
    expect(breed("Beagle").barking_level).toBeGreaterThanOrEqual(70);
  });

  it("giant breeds cost giant money and have shorter lifespans", () => {
    for (const n of ["Great Dane", "Irish Wolfhound", "English Mastiff"]) {
      const b = breed(n);
      expect(b.monthly_cost_usd, n).toBeGreaterThanOrEqual(180);
      expect(b.lifespan_years, n).toBeLessThanOrEqual(10);
    }
  });

  it("the shelter staples are marked available: pit mixes, chihuahuas, lab mixes", () => {
    for (const n of ["Pit Bull Mix", "Chihuahua Mix", "Labrador Mix", "All-Star Rescue Mutt"]) {
      expect(breed(n).shelter_availability, n).toBeGreaterThanOrEqual(85);
    }
  });
});

describe("scoring sanity — canonical archetypes produce sensible #1s", () => {
  it("apartment + allergies → a low-shedding breed wins, never a husky/GSD", () => {
    const top5 = scoreBreeds(BREEDS, {
      homeType: "apartment",
      allergies: true,
      activityLevel: "moderate",
      experienceLevel: "first-time",
      affectionStyle: "balanced",
      mustHaves: ["hypoallergenic", "apartment-ok"],
    }).slice(0, 5);
    for (const r of top5) {
      expect(r.breed.hypoallergenic || (r.breed.shedding_level ?? 50) <= 40, r.breed.name).toBe(true);
      expect(["siberian husky", "german shepherd", "alaskan malamute"]).not.toContain(r.breed.name.toLowerCase());
    }
  });

  it("athlete wanting a running partner → a genuinely high-energy top pick", () => {
    const top = scoreBreeds(BREEDS, {
      homeType: "house-big-yard",
      activityLevel: "athlete",
      experienceLevel: "experienced",
      mustHaves: ["jogging-partner"],
    })[0];
    expect(top.breed.energy_level ?? 0).toBeGreaterThanOrEqual(75);
  });

  it("security-minded rural household → a protective breed, not a toy companion", () => {
    const top = scoreBreeds(BREEDS, {
      homeType: "rural",
      guardingImportance: "top-priority",
      experienceLevel: "experienced",
      sizePreference: "large",
      mustHaves: ["protective"],
    })[0];
    expect(top.breed.protectiveness ?? 0).toBeGreaterThanOrEqual(70);
    expect(top.breed.size).not.toBe("Toy");
  });

  it("when the #1 match IS the dream breed, every surface shows one honest number", () => {
    // A Golden person who loves Goldens: the loved-breed boost ranks it #1, but the
    // displayed numbers must not fork — no "+9 jump" over itself.
    const run = buildScoredRun({
      runId: "test-home",
      createdAt: 0,
      inputs: {
        currentCity: "Denver",
        dreamBreed: "Golden Retriever",
        lovedBreeds: ["Golden Retriever"],
        homeType: "house-big-yard",
        activityLevel: "active",
        hoursAlone: "half-day",
        experienceLevel: "had-dogs",
        hasKids: true,
        kidsAges: "school-age",
        affectionStyle: "velcro",
        budgetRange: "mid-range",
        mustHaves: ["good-with-kids"],
      },
      source: "quiz",
    });
    expect(run.ranking[0].name.toLowerCase()).toBe("golden retriever");
    expect(run.lifeChange.alreadyHome).toBe(true);
    expect(run.lifeChange.overallDelta).toBe(0);
    expect(run.lifeChange.bestScore).toBe(run.dreamBreedFit.score);
    // The locked tease and the paid ranking's #1 show the same honest fit as the
    // dream-breed card — one breed, one number.
    expect(run.topTease.score).toBe(run.dreamBreedFit.score);
    expect(run.ranking[0].totalScore).toBe(run.dreamBreedFit.score);
  });

  it("dream-breed fit distinguishes a mediocre pick from a terrible one", () => {
    // For an allergic apartment first-timer: a Husky (terrible) must score clearly WORSE
    // than a Cavalier (mediocre-to-decent), and the decent option must not be pinned to
    // the display floor.
    const profile: OnboardingData = {
      homeType: "apartment",
      allergies: true,
      activityLevel: "relaxed",
      experienceLevel: "first-time",
      barkTolerance: "low",
    };
    const husky = scoreDreamBreed("Siberian Husky", BREEDS, profile).score;
    const cavalier = scoreDreamBreed("Cavalier King Charles Spaniel", BREEDS, profile).score;
    const poodle = scoreDreamBreed("Toy Poodle", BREEDS, profile).score;
    expect(husky).toBeLessThan(cavalier); // terrible < mediocre
    expect(cavalier).toBeLessThan(poodle); // mediocre < ideal
    expect(cavalier).toBeGreaterThan(35); // not stuck at the floor
  });

  it("a full run exposes the free/locked split correctly", () => {
    const run = buildScoredRun({
      runId: "test-gate",
      createdAt: 0,
      inputs: { ...{ homeType: "apartment", activityLevel: "moderate" }, currentCity: "Chicago", dreamBreed: "corgi" },
      source: "ai-profile",
    });
    // Tease shows shape (group + size + score), never the name.
    expect(run.topTease.group.length).toBeGreaterThan(0);
    expect(run.topTease.size.length).toBeGreaterThan(0);
    expect(run.ranking.length).toBe(BREEDS.length);
    // The adoption plan exists and points near the user.
    expect(run.adoptionPlan).not.toBeNull();
    expect(run.adoptionPlan!.sources[0].url).toContain("Chicago");
  });
});
