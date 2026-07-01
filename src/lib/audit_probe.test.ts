import { describe, it } from "vitest";
import { scoreLocations, scoreCurrentCity } from "./scoring";
import { LOCATIONS } from "@/data/locations";
import type { OnboardingData } from "@/types/onboarding";

describe("AUDIT PROBE", () => {
  it("empty input {}", () => {
    const top = scoreLocations(LOCATIONS, {} as OnboardingData).slice(0, 10);
    console.log("\n=== EMPTY INPUT {} top 10 ===");
    for (const r of top) console.log(r.rank, r.location.name, r.location.country, "disp", r.displayScore, "raw", r.totalScore.toFixed(2));
    // score distribution
    const all = scoreLocations(LOCATIONS, {} as OnboardingData);
    const scores = all.map(r => r.displayScore);
    console.log("empty dist: min", Math.min(...scores), "max", Math.max(...scores), "uniqueTop", new Set(scores).size);
  });

  it("only currentCity", () => {
    const p = { currentCity: "London" } as OnboardingData;
    const top = scoreLocations(LOCATIONS, p).slice(0, 5);
    console.log("\n=== ONLY currentCity=London top 5 ===");
    for (const r of top) console.log(r.rank, r.location.name, "disp", r.displayScore);
  });

  it("bali person reasons", () => {
    const baliPerson: OnboardingData = {
      currentCity: "Bali", lifestyleMode: "nomadic", beachMountain: "beach", preferredClimate: "tropical",
      noiseTolerance: "medium", workStyle: "remote", communityVibes: ["digital-nomad", "startup"],
      budgetRange: "mid-range", taxSensitivity: "somewhat", safetyPriority: "important",
      wellnessImportance: "high", outdoorUrban: "balanced", industries: ["creative", "tech"], mustHaves: ["beach", "nature"],
    };
    const top3 = scoreLocations(LOCATIONS, baliPerson).slice(0, 3);
    console.log("\n=== BALI PERSON top 3 with reasons/tradeoffs ===");
    for (const r of top3) {
      console.log(r.rank, r.location.name, "disp", r.displayScore);
      console.log("  reasons:", JSON.stringify(r.reasons));
      console.log("  tradeoffs:", JSON.stringify(r.tradeoffs));
    }
  });

  it("score distribution for a real profile", () => {
    const baliPerson: OnboardingData = {
      lifestyleMode: "nomadic", beachMountain: "beach", preferredClimate: "tropical",
      workStyle: "remote", budgetRange: "budget", mustHaves: ["beach", "affordable"],
    } as OnboardingData;
    const all = scoreLocations(LOCATIONS, baliPerson);
    const scores = all.map(r => r.displayScore);
    console.log("\n=== REAL PROFILE dist ===");
    console.log("min", Math.min(...scores), "max", Math.max(...scores), "median", scores[Math.floor(scores.length/2)]);
    const buckets={};
    for(const s of scores){const b=Math.floor(s/10)*10;buckets[b]=(buckets[b]||0)+1;}
    console.log("buckets:", JSON.stringify(buckets));
    console.log("top5 disp:", all.slice(0,5).map(r=>r.displayScore));
  });

  it("current city fit absurdity checks", () => {
    console.log("\n=== CURRENT CITY FIT ===");
    const p = { preferredClimate: "tropical", beachMountain: "beach", budgetRange: "budget" } as OnboardingData;
    for (const city of ["Reykjavik", "Dubai", "Chengdu", "Pyongyang", "asdfghjkl", "Antarctica", "Lagos, Nigeria", "Portugal", "USA"]) {
      const f = scoreCurrentCity(city, LOCATIONS, p);
      console.log(city, "->", f.resolvedName, "found", f.cityFound, "est", f.estimated, "score", f.score);
    }
  });

  it("loved place boost that isn't in universe", () => {
    const p = { lovedPlaces: ["Atlantis", "Narnia"], beachMountain: "beach" } as OnboardingData;
    const top = scoreLocations(LOCATIONS, p).slice(0, 3);
    console.log("\n=== LOVED nonexistent places top 3 ===");
    for (const r of top) console.log(r.rank, r.location.name, r.displayScore);
  });
});
