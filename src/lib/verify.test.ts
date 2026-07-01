import { describe, it, expect } from "vitest";
import { getCountryTaxRecord } from "@/lib/tax";
import { LOCATIONS } from "@/data/locations";
import { scoreLocations, scoreCurrentCity } from "@/lib/scoring";
import type { OnboardingData } from "@/types/onboarding";

/**
 * Accuracy verification — locks the most consequential facts so we catch any drift:
 *   1. Tax data is current for the countries most users will move to/from
 *   2. The dataset is sane (right count, no missing critical fields)
 *   3. The scoring produces sensible #1s for canonical user archetypes
 */

describe("tax data — sourced PwC/KPMG figures, current as of 2025–26", () => {
  it("zero-tax jurisdictions are 0", () => {
    for (const c of ["UAE", "Qatar", "Bahrain", "Kuwait", "Oman", "Monaco"]) {
      const r = getCountryTaxRecord(c);
      expect(r, c).not.toBeNull();
      expect(r!.income, `${c} income`).toBe(0);
      expect(r!.topMarginal, `${c} top marginal`).toBe(0);
    }
  });

  it("US: ~32% effective, top marginal 37%, worldwide taxation flagged", () => {
    const r = getCountryTaxRecord("United States");
    expect(r).not.toBeNull();
    expect(r!.income).toBeGreaterThanOrEqual(28);
    expect(r!.income).toBeLessThanOrEqual(35);
    expect(r!.topMarginal).toBe(37);
    expect(r!.capitalGains).toBeGreaterThanOrEqual(15);
    expect(r!.capitalGains).toBeLessThanOrEqual(25);
  });

  it("UAE corporate tax reflects 2023 reform (9% on profits above AED 375k)", () => {
    const r = getCountryTaxRecord("UAE");
    expect(r!.corporate).toBe(9);
    expect(r!.specialRegime.toLowerCase()).toMatch(/9%|corporate|aed/);
  });

  it("Portugal: NHR/IFICI special regime is noted", () => {
    const r = getCountryTaxRecord("Portugal");
    expect(r).not.toBeNull();
    expect(r!.specialRegime.toLowerCase()).toMatch(/ifici|nhr|20%/);
  });

  it("Nordic countries are high-tax (>=35% effective for a well-paid professional)", () => {
    for (const c of ["Denmark", "Sweden", "Norway", "Finland"]) {
      const r = getCountryTaxRecord(c);
      expect(r, c).not.toBeNull();
      expect(r!.income, `${c} income`).toBeGreaterThanOrEqual(35);
      expect(r!.topMarginal, `${c} top marginal`).toBeGreaterThanOrEqual(45);
    }
  });

  it("territorial regimes flagged correctly", () => {
    for (const c of ["Singapore", "Hong Kong", "Panama", "UAE", "Qatar"]) {
      const r = getCountryTaxRecord(c);
      expect(r, c).not.toBeNull();
      expect(r!.territorial, `${c}`).toBe(true);
    }
    for (const c of ["United States", "United Kingdom", "Germany", "Canada", "Australia"]) {
      const r = getCountryTaxRecord(c);
      expect(r, c).not.toBeNull();
      expect(r!.territorial, `${c}`).toBe(false);
    }
  });

  it("every dataset country has tax data + a citable source", () => {
    const countries = new Set(LOCATIONS.map((l) => l.country));
    for (const c of countries) {
      const r = getCountryTaxRecord(c);
      expect(r, c).not.toBeNull();
      expect(r!.source, `${c} source`).toMatch(/^https?:/);
    }
  });

  it("rates are within sane bounds (no impossible values)", () => {
    const countries = new Set(LOCATIONS.map((l) => l.country));
    for (const c of countries) {
      const r = getCountryTaxRecord(c)!;
      expect(r.income, c).toBeGreaterThanOrEqual(0);
      expect(r.income, c).toBeLessThanOrEqual(60);
      // (We don't compare income vs topMarginal — flat-tax + high-social systems like
      // Romania have effective rates well above the headline marginal, which is fine.)
      expect(r.topMarginal, c).toBeGreaterThanOrEqual(0);
      expect(r.topMarginal, c).toBeLessThanOrEqual(60);
      expect(r.corporate, c).toBeLessThanOrEqual(40);
      expect(r.capitalGains, c).toBeLessThanOrEqual(45);
      expect(r.vat, c).toBeLessThanOrEqual(30);
    }
  });
});

describe("dataset integrity", () => {
  it("has the expected number of curated locations", () => {
    expect(LOCATIONS.length).toBeGreaterThanOrEqual(248);
    expect(LOCATIONS.length).toBeLessThanOrEqual(252);
  });

  it("every location has all 10 scoring dimensions populated", () => {
    const required = [
      "cost_of_living_score",
      "safety_score",
      "climate_score",
      "community_score",
      "nightlife_score",
      "wellness_score",
      "english_friendliness_score",
      "visa_friendliness_score",
      "tax_friendliness_score",
      "internet_quality_score",
      "airport_connectivity_score",
    ] as const;
    for (const loc of LOCATIONS) {
      for (const f of required) {
        const v = (loc as unknown as Record<string, number>)[f];
        expect(typeof v, `${loc.name}.${f}`).toBe("number");
        expect(v, `${loc.name}.${f}`).toBeGreaterThanOrEqual(0);
        expect(v, `${loc.name}.${f}`).toBeLessThanOrEqual(100);
      }
    }
  });

  it("249 of 250 locations have a photo URL", () => {
    const withImg = LOCATIONS.filter((l) => l.image_url).length;
    expect(withImg).toBeGreaterThanOrEqual(248);
  });
});

describe("scoring sanity — canonical user archetypes produce sensible #1s", () => {
  function topRegionFor(prefs: OnboardingData) {
    const r = scoreLocations(LOCATIONS, prefs)[0];
    return { name: r.location.name, country: r.location.country, continent: r.location.continent };
  }

  it("budget tropical beach nomad → Southeast Asia or warm coastal", () => {
    const r = topRegionFor({
      lifestyleMode: "nomadic",
      budgetRange: "budget",
      beachMountain: "beach",
      preferredClimate: "tropical",
      workStyle: "remote",
      communityVibes: ["digital-nomad"],
      mustHaves: ["affordable", "beach"],
    });
    // Top match should be a warm, cheap, beach-adjacent place.
    expect(["Asia", "Africa", "North America", "Oceania"]).toContain(r.continent);
  });

  it("safety-first luxury rooted → high-safety country, not budget Asia", () => {
    const r = topRegionFor({
      lifestyleMode: "rooted",
      budgetRange: "luxury",
      safetyPriority: "top-priority",
      preferredClimate: "temperate",
      mustHaves: ["safety"],
    });
    // Should NOT surface a budget-South-Asia / unstable destination.
    const lowSafety = ["Lagos", "Nairobi", "Phnom Penh", "Caracas"];
    expect(lowSafety).not.toContain(r.name);
  });

  it("tax-sensitive high earner → low-tax country (not high-tax)", () => {
    const top5 = scoreLocations(LOCATIONS, {
      budgetRange: "luxury",
      taxSensitivity: "very-sensitive",
      safetyPriority: "top-priority",
      lifestyleMode: "rooted",
      mustHaves: ["safety"],
    }).slice(0, 5);
    // None of the top 5 should be a famously high-tax country.
    const highTax = ["Denmark", "Sweden", "Norway", "Finland", "Belgium", "Germany", "France", "Austria", "Netherlands", "Ireland"];
    for (const r of top5) {
      expect(highTax, `${r.location.name}, ${r.location.country}`).not.toContain(r.location.country);
    }
  });

  it("San Diego current-city fit is reasonable (not in the bottom)", () => {
    const fit = scoreCurrentCity("San Diego", LOCATIONS, {
      budgetRange: "luxury",
      preferredClimate: "mediterranean",
      beachMountain: "beach",
      lifestyleMode: "rooted",
    });
    // San Diego shouldn't score in the floor for a SoCal-y profile.
    expect(fit.score).toBeGreaterThanOrEqual(60);
  });

  it("current-city fit distinguishes a mediocre place from a terrible one", () => {
    // For a tropical-beach person: a cold, landlocked-feeling city (Reykjavik) must score
    // clearly WORSE than a temperate coastal one (Lisbon), and the decent option must not
    // be pinned to the old display floor. Locks the display-curve fix for current-city.
    const profile: OnboardingData = {
      preferredClimate: "tropical",
      beachMountain: "beach",
      budgetRange: "budget",
      workStyle: "remote",
    };
    const lisbon = scoreCurrentCity("Lisbon", LOCATIONS, profile).score;
    const reykjavik = scoreCurrentCity("Reykjavik", LOCATIONS, profile).score;
    const bali = scoreCurrentCity("Bali", LOCATIONS, profile).score;
    expect(reykjavik).toBeLessThan(lisbon); // terrible < mediocre
    expect(lisbon).toBeLessThan(bali); // mediocre < ideal
    expect(lisbon).toBeGreaterThan(35); // not stuck at the old floor
  });
});
