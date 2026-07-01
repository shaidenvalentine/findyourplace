import type { OnboardingData } from "@/types/onboarding";
import { rankLocationsV2, scoreCurrentCityV2, fitCategories } from "@/lib/match/engine";
import { LOCATIONS } from "@/data/locations";

export interface Location {
  id: string;
  name: string;
  region: string | null;
  country: string;
  continent: string;
  latitude: number | null;
  longitude: number | null;
  population: number | null;
  image_url: string | null;
  description: string | null;
  vibe_summary: string | null;
  tags: string[];
  cost_of_living_score: number | null;
  rent_score: number | null;
  safety_score: number | null;
  healthcare_score: number | null;
  climate_score: number | null;
  avg_temp_summer: number | null;
  avg_temp_winter: number | null;
  humidity_level: number | null;
  sunshine_days: number | null;
  beach_access_score: number | null;
  mountain_access_score: number | null;
  outdoor_score: number | null;
  nightlife_score: number | null;
  wellness_score: number | null;
  dating_scene_score: number | null;
  community_score: number | null;
  english_friendliness_score: number | null;
  visa_friendliness_score: number | null;
  tax_friendliness_score: number | null;
  airport_connectivity_score: number | null;
  internet_quality_score: number | null;
  walkability_score: number | null;
  transit_score: number | null;
  culture_openness_score: number | null;
  startup_ecosystem_score: number | null;
  bureaucracy_score: number | null;
  // Tax columns
  personal_income_tax_rate: number | null;
  corporate_tax_rate: number | null;
  capital_gains_tax_rate: number | null;
  tax_notes: string | null;
  // Image (sourced) + attribution
  image_source?: string | null;
  image_credit?: string | null;
  // Depth content (the "this app really knows this place" layer)
  lowdown?: string | null;
  scene?: string | null;
  best_for?: string[];
  not_for?: string[];
  monthly_budget_usd?: number | null;
  rent_1br_usd?: number | null;
  neighborhoods?: string[];
}

export interface CategoryScore {
  category: string;
  score: number;
  weight: number;
  label: string;
}

export interface MatchResult {
  location: Location;
  /** Ranking score (fit + revealed-preference resonance), spread for display. */
  totalScore: number;
  /** Honest display score — identical to totalScore so bars and rank never disagree. */
  displayScore: number;
  categoryScores: CategoryScore[];
  reasons: string[];
  tradeoffs: string[];
  rank: number;
}

/**
 * Public scoring API. The IP now lives in `lib/match/engine` (fit-based matching, not
 * amenity-maximization) + `lib/match/resolve` (worldwide current-city resolution). These
 * functions keep the original signatures so the rest of the app is unchanged.
 */

export function calculateTotalScore(categoryScores: CategoryScore[]): number {
  const weightedSum = categoryScores.reduce((sum, cat) => sum + cat.score * cat.weight, 0);
  const totalWeight = categoryScores.reduce((sum, cat) => sum + cat.weight, 0) || 1;
  return Math.round((weightedSum / totalWeight) * 100) / 100;
}

/** Per-category FIT (0–100) against the user's expressed preferences. */
export function calculateCategoryScores(location: Location, preferences: OnboardingData): CategoryScore[] {
  return fitCategories(location, preferences, LOCATIONS);
}

export function scoreLocations(locations: Location[], preferences: OnboardingData): MatchResult[] {
  return rankLocationsV2(locations, preferences).map((r) => ({
    location: r.location,
    totalScore: r.displayScore,
    displayScore: r.displayScore,
    categoryScores: r.categoryScores,
    reasons: generateReasons(r.location, r.categoryScores),
    tradeoffs: generateTradeoffs(r.location, r.categoryScores),
    rank: r.rank,
  }));
}

export interface CurrentCityScore {
  score: number;
  categoryScores: {
    label: string;
    score: number;
  }[];
  cityFound: boolean;
  /** The place we actually scored (a curated match, or a synthesized estimate). */
  resolvedName?: string;
  /** True when the score was synthesized from country/global data, not a curated place. */
  estimated?: boolean;
}

export function scoreCurrentCity(
  currentCityName: string,
  locations: Location[],
  preferences: OnboardingData
): CurrentCityScore {
  const r = scoreCurrentCityV2(currentCityName, locations, preferences);
  return {
    score: r.score,
    categoryScores: r.categoryScores,
    cityFound: r.cityFound,
    resolvedName: r.resolvedName,
    estimated: r.estimated,
  };
}

export function generateReasons(location: Location, categoryScores: CategoryScore[]): string[] {
  const reasons: string[] = [];
  // Lead with the categories that matter MOST TO THIS USER and where the place delivers —
  // impact = fit × expressed importance (weight). This surfaces "you wanted X, and it's
  // strong here" instead of just whatever the place happens to be objectively good at.
  const topCategories = [...categoryScores].sort((a, b) => b.score * b.weight - a.score * a.weight).slice(0, 5);

  for (const cat of topCategories) {
    switch (cat.category) {
      case "climate":
        if (location.sunshine_days && location.sunshine_days > 250) {
          reasons.push(`${location.sunshine_days}+ sunny days per year for excellent weather`);
        } else if (location.climate_score && location.climate_score > 75) {
          reasons.push("Ideal climate conditions matching your preferences");
        }
        break;
      case "nature":
        if (location.beach_access_score && location.beach_access_score > 85) {
          reasons.push("Outstanding beach access and coastal lifestyle");
        } else if (location.mountain_access_score && location.mountain_access_score > 80) {
          reasons.push("Excellent mountain access for outdoor adventures");
        } else if (location.outdoor_score && location.outdoor_score > 80) {
          reasons.push("Top-tier outdoor activities and nature access");
        }
        break;
      case "community":
        if (location.english_friendliness_score && location.english_friendliness_score > 80) {
          reasons.push("English-friendly with easy integration for expats");
        } else if (location.community_score && location.community_score > 75) {
          reasons.push("Welcoming community with strong social connections");
        }
        break;
      case "career":
        if (location.startup_ecosystem_score && location.startup_ecosystem_score > 80) {
          reasons.push("Thriving startup and tech ecosystem");
        } else if (location.internet_quality_score && location.internet_quality_score > 85) {
          reasons.push("Excellent internet infrastructure for remote work");
        }
        break;
      case "cost":
        if (location.cost_of_living_score && location.cost_of_living_score > 70) {
          reasons.push("Affordable cost of living with excellent value");
        } else if (location.tax_friendliness_score && location.tax_friendliness_score > 80) {
          reasons.push("Favorable tax environment");
        }
        break;
      case "safety":
        if (location.safety_score && location.safety_score > 85) {
          reasons.push("Exceptionally safe with low crime rates");
        } else if (location.healthcare_score && location.healthcare_score > 85) {
          reasons.push("World-class healthcare system");
        }
        break;
      case "wellness":
        if (location.wellness_score && location.wellness_score > 80) {
          reasons.push("Strong wellness culture with gyms, yoga, and health focus");
        }
        break;
      case "travel":
        if (location.airport_connectivity_score && location.airport_connectivity_score > 85) {
          reasons.push("Major international hub with easy global travel");
        }
        break;
      case "culture":
        if (location.culture_openness_score && location.culture_openness_score > 80) {
          reasons.push("Open, diverse, and culturally progressive");
        } else if (location.nightlife_score && location.nightlife_score > 80) {
          reasons.push("Vibrant nightlife and entertainment scene");
        }
        break;
      case "lifestyle":
        if (cat.score > 70) {
          if (location.walkability_score && location.walkability_score > 80) {
            reasons.push("Highly walkable — daily life on foot, not behind a wheel");
          } else if (location.nightlife_score && location.nightlife_score > 80) {
            reasons.push("A lively scene with plenty going on after dark");
          } else {
            reasons.push("The everyday pace and energy fit the life you described");
          }
        }
        break;
    }
  }

  // Add tag-based reasons
  if (location.tags?.includes("digital-nomad")) {
    reasons.push("Established digital nomad community and coworking spaces");
  }
  if (location.tags?.includes("foodie")) {
    reasons.push("World-renowned food scene and culinary culture");
  }

  return reasons.slice(0, 5);
}

export function generateTradeoffs(location: Location, categoryScores: CategoryScore[]): string[] {
  const tradeoffs: string[] = [];
  const sortedScores = [...categoryScores].sort((a, b) => a.score - b.score);
  const weakCategories = sortedScores.slice(0, 3);

  for (const cat of weakCategories) {
    if (cat.score < 60) {
      switch (cat.category) {
        case "climate":
          if (location.humidity_level && location.humidity_level > 75) {
            tradeoffs.push("High humidity levels may take adjustment");
          } else if (location.avg_temp_winter && location.avg_temp_winter < 5) {
            tradeoffs.push("Cold winters require preparation");
          }
          break;
        case "cost":
          if (location.cost_of_living_score && location.cost_of_living_score < 40) {
            tradeoffs.push("Higher cost of living than average");
          }
          break;
        case "safety":
          if (location.safety_score && location.safety_score < 65) {
            tradeoffs.push("Safety considerations in some areas");
          }
          break;
        case "travel":
          if (location.airport_connectivity_score && location.airport_connectivity_score < 60) {
            tradeoffs.push("Limited international flight connections");
          }
          break;
        case "community":
          if (location.english_friendliness_score && location.english_friendliness_score < 60) {
            tradeoffs.push("Local language skills helpful for full integration");
          }
          break;
        case "career":
          if (location.startup_ecosystem_score && location.startup_ecosystem_score < 50) {
            tradeoffs.push("Limited local job market in some industries");
          }
          break;
      }
    }
  }

  // Add bureaucracy tradeoff
  if (location.bureaucracy_score && location.bureaucracy_score < 55) {
    tradeoffs.push("Bureaucracy can be challenging and slow");
  }

  // Add visa tradeoff
  if (location.visa_friendliness_score && location.visa_friendliness_score < 60) {
    tradeoffs.push("Visa requirements may need planning");
  }

  return tradeoffs.slice(0, 3);
}
