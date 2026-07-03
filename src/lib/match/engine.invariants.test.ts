import { describe, it, expect } from "vitest";
import { scoreLocations, scoreCurrentCity } from "@/lib/scoring";
import { LOCATIONS } from "@/data/locations";
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
 *  4. The current-city composite is the weighted average of its six displayed
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
    currentCity: pick(["Bali", "London", "Lisbon", "Chengdu", "New York", "Cape Town", "unknown"]),
    lifestyleMode: pick(["rooted", "nomadic", undefined]),
    preferredClimate: pick(["tropical", "mediterranean", "temperate", "cold", undefined]),
    beachMountain: pick(["beach", "mountains", "either", undefined]),
    budgetRange: pick(["budget", "mid-range", "luxury", undefined]),
    workStyle: pick(["remote", "hybrid", "local", undefined]),
    taxSensitivity: pick(["very-sensitive", "somewhat", "not-sensitive", undefined]),
    safetyPriority: pick(["top-priority", "important", "flexible", undefined]),
    wellnessImportance: pick(["high", "medium", "low", undefined]),
    airportImportance: pick(["essential", "important", "flexible", undefined]),
    cultureTolerance: pick(["important", "somewhat", "not-important", undefined]),
    noiseTolerance: pick(["high", "medium", "low", undefined]),
    peopleDensity: pick(["dense", "mid", "spacious", undefined]),
    outdoorUrban: pick(["urban", "balanced", "outdoor", undefined]),
    riskTolerance: pick(["high", "medium", "low", undefined]),
    communityVibes: maybe(["digital-nomad", "expat"]),
    industries: maybe(["tech"]),
    mustHaves: maybe(["beach", "affordable"]),
    dealBreakers: maybe(["high-crime"]),
    lovedPlaces: rnd() < 0.5 ? [pick(["Bali", "Lisbon", "Mexico City", "Tokyo", "Tbilisi"])!] : undefined,
  };
  return p;
}

const rnd = mulberry32(20260703);
const PROFILES = Array.from({ length: 12 }, () => randomProfile(rnd));

describe("engine invariants (seeded profile sweep)", () => {
  it("ranking is contiguous, monotone in displayed score, and within the display band", () => {
    for (const p of PROFILES) {
      const results = scoreLocations(LOCATIONS, p);
      expect(results.length).toBe(LOCATIONS.length);
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

  it("current-city composite sits inside the span of its displayed dimensions", () => {
    for (const p of PROFILES) {
      const fit = scoreCurrentCity(p.currentCity || "unknown", LOCATIONS, p);
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
      const a = scoreLocations(LOCATIONS, p).map((r) => [r.location.id, r.totalScore, r.rank]);
      const b = scoreLocations(LOCATIONS, p).map((r) => [r.location.id, r.totalScore, r.rank]);
      expect(a).toEqual(b);
      const fa = scoreCurrentCity(p.currentCity || "unknown", LOCATIONS, p);
      const fb = scoreCurrentCity(p.currentCity || "unknown", LOCATIONS, p);
      expect(fa).toEqual(fb);
    }
  });

  it("a loved place rises to #1 without breaking display monotonicity", () => {
    const p: OnboardingData = {
      currentCity: "Bali",
      lifestyleMode: "nomadic",
      beachMountain: "beach",
      preferredClimate: "tropical",
      workStyle: "remote",
      budgetRange: "mid-range",
      taxSensitivity: "somewhat",
      wellnessImportance: "high",
      communityVibes: ["digital-nomad"],
      mustHaves: ["beach", "nature"],
      lovedPlaces: ["Bali"],
    };
    const results = scoreLocations(LOCATIONS, p);
    expect(results[0].location.name.toLowerCase()).toBe("bali");
    for (let i = 1; i < results.length; i++) {
      expect(results[i].totalScore).toBeLessThanOrEqual(results[i - 1].totalScore);
    }
  });
});
