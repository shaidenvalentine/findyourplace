import { describe, it, expect } from "vitest";
import { scoreBreeds, scoreDreamBreed } from "@/lib/scoring";
import { BREEDS } from "@/data/breeds";
import type { OnboardingData } from "@/types/onboarding";

/**
 * Property-style invariant sweep over randomized (but seeded — fully deterministic)
 * profiles. The characterization snapshots in scoring.test.ts lock exact outputs for
 * fixed profiles; this file locks the STRUCTURAL guarantees every profile must satisfy:
 *
 *  1. Ranks are contiguous 1..N.
 *  2. Displayed scores never increase down the ranking (a ranked list must read
 *     monotonically, even when revealed-preference resonance decides the order).
 *  3. Every displayed score lives in the display band [28, 99].
 *  4. The dream-breed composite is the weighted average of its six displayed
 *     dimension tiles (the tiles partition all 10 categories with the user's own
 *     weights and share the affine display transform) — so, absent an explicit
 *     deal-breaker penalty, the ring provably sits inside the tiles' span.
 *  5. Scoring is a pure function: same inputs, same outputs.
 */

// Deterministic PRNG (mulberry32) — the sweep must never flake.
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomProfile(rnd: () => number): OnboardingData {
  const pick = <T,>(arr: (T | undefined)[]): T | undefined => arr[Math.floor(rnd() * arr.length)];
  const maybe = <T,>(v: T): T | undefined => (rnd() < 0.7 ? v : undefined);

  const p: OnboardingData = {
    dreamBreed: pick(["Golden Retriever", "Husky", "lab", "Border Collie", "Frenchie", "some kind of terrier", "unknown"]),
    homeType: pick(["apartment", "house-small-yard", "house-big-yard", "rural", undefined]),
    activityLevel: pick(["relaxed", "moderate", "active", "athlete", undefined]),
    hoursAlone: pick(["rarely", "half-day", "full-day", undefined]),
    experienceLevel: pick(["first-time", "had-dogs", "experienced", undefined]),
    hasKids: pick([true, false, undefined]),
    kidsAges: pick(["toddlers", "school-age", "teens", undefined]),
    sizePreference: pick(["small", "medium", "large", "giant", "open", undefined]),
    groomingTolerance: pick(["minimal", "moderate", "enjoys-grooming", undefined]),
    sheddingTolerance: pick(["low", "medium", "high", undefined]),
    allergies: pick([true, false, undefined]),
    barkTolerance: pick(["low", "medium", "high", undefined]),
    guardingImportance: pick(["top-priority", "nice-to-have", "not-needed", undefined]),
    affectionStyle: pick(["velcro", "balanced", "independent", undefined]),
    trainingAppetite: pick(["love-it", "basics", "minimal", undefined]),
    budgetRange: pick(["budget", "mid-range", "no-ceiling", undefined]),
    climate: pick(["hot", "cold", "temperate", undefined]),
    otherPets: maybe(["cat"]),
    mustHaves: maybe(["good-with-kids", "quiet"]),
    dealBreakers: maybe(["drooling"]),
    lovedBreeds: rnd() < 0.5 ? [pick(["Golden Retriever", "Beagle", "German Shepherd", "Poodle", "farm collie mix"])!] : undefined,
  };
  return p;
}

const rnd = mulberry32(20260716);
const PROFILES = Array.from({ length: 12 }, () => randomProfile(rnd));

describe("engine invariants (seeded profile sweep)", () => {
  it("ranking is contiguous, monotone in displayed score, and within the display band", () => {
    for (const p of PROFILES) {
      const results = scoreBreeds(BREEDS, p);
      expect(results.length).toBe(BREEDS.length);
      results.forEach((r, i) => expect(r.rank).toBe(i + 1));
      for (let i = 0; i < results.length; i++) {
        expect(results[i].totalScore).toBeGreaterThanOrEqual(28);
        expect(results[i].totalScore).toBeLessThanOrEqual(99);
        if (i > 0) {
          // The user-facing list must never show a bigger number below a smaller one.
          expect(results[i].totalScore).toBeLessThanOrEqual(results[i - 1].totalScore);
        }
      }
    }
  });

  it("dream-breed composite sits inside the span of its displayed dimensions", () => {
    for (const p of PROFILES) {
      const fit = scoreDreamBreed(p.dreamBreed || "unknown", BREEDS, p);
      const tiles = fit.categoryScores.map((c) => c.score);
      expect(tiles.length).toBe(6);
      for (const t of tiles) {
        expect(t).toBeGreaterThanOrEqual(28);
        expect(t).toBeLessThanOrEqual(99);
      }
      // The ring is the weighted average of the tiles: never above the best tile, and
      // never below the worst unless an explicit deal-breaker penalty applies (±1 rounding).
      expect(fit.score).toBeLessThanOrEqual(Math.max(...tiles) + 1);
      if (!fit.constraintPenalty) {
        expect(fit.score).toBeGreaterThanOrEqual(Math.min(...tiles) - 1);
      }
    }
  });

  it("scoring is a pure function of its inputs", () => {
    for (const p of PROFILES.slice(0, 3)) {
      const a = scoreBreeds(BREEDS, p).map((r) => [r.breed.id, r.totalScore, r.rank]);
      const b = scoreBreeds(BREEDS, p).map((r) => [r.breed.id, r.totalScore, r.rank]);
      expect(a).toEqual(b);
      const fa = scoreDreamBreed(p.dreamBreed || "unknown", BREEDS, p);
      const fb = scoreDreamBreed(p.dreamBreed || "unknown", BREEDS, p);
      expect(fa).toEqual(fb);
    }
  });

  it("a loved breed rises to #1 without breaking display monotonicity", () => {
    const p: OnboardingData = {
      dreamBreed: "Golden Retriever",
      homeType: "house-big-yard",
      activityLevel: "active",
      hoursAlone: "half-day",
      experienceLevel: "had-dogs",
      hasKids: true,
      kidsAges: "school-age",
      affectionStyle: "velcro",
      mustHaves: ["good-with-kids"],
      lovedBreeds: ["Golden Retriever"],
    };
    const results = scoreBreeds(BREEDS, p);
    expect(results[0].breed.name.toLowerCase()).toBe("golden retriever");
    for (let i = 1; i < results.length; i++) {
      expect(results[i].totalScore).toBeLessThanOrEqual(results[i - 1].totalScore);
    }
  });

  it("hard constraints actually filter: allergies push heavy shedders out of the top 10", () => {
    const p: OnboardingData = {
      allergies: true,
      homeType: "apartment",
      activityLevel: "moderate",
      affectionStyle: "balanced",
    };
    const top10 = scoreBreeds(BREEDS, p).slice(0, 10);
    for (const r of top10) {
      const shed = r.breed.shedding_level ?? 50;
      expect(r.breed.hypoallergenic || shed <= 40).toBe(true);
    }
  });
});
