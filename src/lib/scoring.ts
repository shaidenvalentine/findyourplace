import type { OnboardingData } from "@/types/onboarding";

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
  totalScore: number;
  categoryScores: CategoryScore[];
  reasons: string[];
  tradeoffs: string[];
  rank: number;
}

// Base weights - will be dynamically adjusted based on user preferences
const BASE_WEIGHTS = {
  climate: 0.1,
  nature: 0.1,
  community: 0.1,
  career: 0.1,
  cost: 0.12,
  safety: 0.1,
  wellness: 0.08,
  travel: 0.08,
  culture: 0.1,
  lifestyle: 0.12,
};

// Calculate dynamic weights based on user preferences
function calculateDynamicWeights(preferences: OnboardingData): typeof BASE_WEIGHTS {
  const weights = { ...BASE_WEIGHTS };

  // Boost weights based on what user cares about most
  if (preferences.taxSensitivity === "very-sensitive" || preferences.taxConsideration === "major-factor") {
    weights.cost *= 1.6;
  }
  if (preferences.airportConnectivity === "important" || preferences.airportImportance === "essential") {
    weights.travel *= 1.5;
  }
  if (preferences.safetyPriority === "top-priority" || preferences.riskTolerance === "low") {
    weights.safety *= 1.5;
  }
  if (preferences.wellnessImportance === "high" || preferences.gymCulture === "important") {
    weights.wellness *= 1.4;
  }
  if (preferences.preferredClimate) {
    weights.climate *= 1.3;
  }
  if (preferences.beachMountain) {
    weights.nature *= 1.4;
  }
  if (preferences.workStyle === "remote" || preferences.industries?.length) {
    weights.career *= 1.3;
  }
  if (preferences.communityVibes?.length) {
    weights.community *= 1.3;
  }

  // Check for must-haves and top priorities
  if (preferences.mustHaves?.includes("safety")) weights.safety *= 1.4;
  if (preferences.mustHaves?.includes("affordable")) weights.cost *= 1.4;
  if (preferences.mustHaves?.includes("nature")) weights.nature *= 1.4;
  if (preferences.mustHaves?.includes("nightlife")) weights.lifestyle *= 1.3;

  if (preferences.topPriorities?.includes("cost")) weights.cost *= 1.3;
  if (preferences.topPriorities?.includes("weather")) weights.climate *= 1.3;
  if (preferences.topPriorities?.includes("safety")) weights.safety *= 1.3;

  // Normalize weights to sum to 1.0
  const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);
  const normalizedWeights = {} as typeof BASE_WEIGHTS;
  for (const key of Object.keys(weights) as Array<keyof typeof weights>) {
    normalizedWeights[key] = weights[key] / totalWeight;
  }

  return normalizedWeights;
}

// Check for deal-breaker conditions that severely penalize score
function calculateDealBreakerMultiplier(location: Location, preferences: OnboardingData): number {
  let multiplier = 1.0;

  // Safety deal-breaker
  if (preferences.safetyPriority === "top-priority" && (location.safety_score || 70) < 50) {
    multiplier *= 0.7;
  }

  // Beach deal-breaker
  if (preferences.beachMountain === "beach" && (location.beach_access_score || 0) < 30) {
    multiplier *= 0.8;
  }

  // Mountain deal-breaker
  if (preferences.beachMountain === "mountains" && (location.mountain_access_score || 0) < 30) {
    multiplier *= 0.8;
  }

  // Climate deal-breaker
  if (preferences.preferredClimate === "tropical" && (location.avg_temp_winter || 10) < 15) {
    multiplier *= 0.75;
  }
  if (preferences.preferredClimate === "cold" && (location.avg_temp_summer || 25) > 30) {
    multiplier *= 0.75;
  }

  // Budget deal-breaker
  if (preferences.budgetRange === "budget" && (location.cost_of_living_score || 50) < 50) {
    multiplier *= 0.75;
  }

  // Tax sensitivity deal-breaker
  if (preferences.taxSensitivity === "very-sensitive" && (location.tax_friendliness_score || 50) < 40) {
    multiplier *= 0.8;
  }

  // Check explicit deal-breakers
  if (preferences.dealBreakers?.includes("high-crime") && (location.safety_score || 70) < 60) {
    multiplier *= 0.65;
  }
  if (preferences.dealBreakers?.includes("expensive") && (location.cost_of_living_score || 50) < 40) {
    multiplier *= 0.7;
  }

  return multiplier;
}

// Calculate alignment bonus - how well location's strengths match user's priorities
function calculateAlignmentBonus(location: Location, preferences: OnboardingData): number {
  let bonus = 0;

  // Get location's top strengths (scores > 80)
  const strengths: string[] = [];
  if ((location.beach_access_score || 0) > 80) strengths.push("beach");
  if ((location.mountain_access_score || 0) > 80) strengths.push("mountains");
  if ((location.safety_score || 0) > 85) strengths.push("safety");
  if ((location.cost_of_living_score || 0) > 75) strengths.push("affordable");
  if ((location.nightlife_score || 0) > 80) strengths.push("nightlife");
  if ((location.wellness_score || 0) > 80) strengths.push("wellness");
  if ((location.startup_ecosystem_score || 0) > 80) strengths.push("career");
  if ((location.airport_connectivity_score || 0) > 85) strengths.push("travel");
  if ((location.tax_friendliness_score || 0) > 80) strengths.push("taxes");

  // Check alignment with user priorities
  const userPriorities = [...(preferences.mustHaves || []), ...(preferences.topPriorities || [])];

  for (const priority of userPriorities) {
    if (strengths.includes(priority)) {
      bonus += 8; // Significant bonus for each aligned priority
    }
  }

  // Specific preference alignments
  if (preferences.beachMountain === "beach" && strengths.includes("beach")) bonus += 12;
  if (preferences.beachMountain === "mountains" && strengths.includes("mountains")) bonus += 12;
  if (preferences.taxSensitivity === "very-sensitive" && strengths.includes("taxes")) bonus += 10;
  if (preferences.budgetRange === "budget" && strengths.includes("affordable")) bonus += 10;
  if (preferences.safetyPriority === "top-priority" && strengths.includes("safety")) bonus += 10;

  return Math.min(bonus, 25); // Cap at 25 points
}

// Transform score to spread the distribution (stretches 65-85 range into 50-95)
function spreadScore(rawScore: number): number {
  const center = 72;
  const spread = 1.8;
  const transformed = center + (rawScore - center) * spread;
  return Math.max(45, Math.min(98, Math.round(transformed)));
}

export function calculateCategoryScores(location: Location, preferences: OnboardingData): CategoryScore[] {
  const scores: CategoryScore[] = [];
  const weights = calculateDynamicWeights(preferences);

  // Climate fit - larger bonuses/penalties
  let climateScore = location.climate_score || 50;
  if (preferences.preferredClimate) {
    if (preferences.preferredClimate === "tropical" && (location.avg_temp_winter || 0) > 20) {
      climateScore += 35;
    } else if (preferences.preferredClimate === "tropical" && (location.avg_temp_winter || 0) < 10) {
      climateScore -= 25;
    }
    if (preferences.preferredClimate === "mediterranean" && location.sunshine_days && location.sunshine_days > 250) {
      climateScore += 30;
    }
    if (
      preferences.preferredClimate === "temperate" &&
      (location.humidity_level || 50) < 70 &&
      (location.avg_temp_summer || 25) < 30
    ) {
      climateScore += 25;
    }
    if (preferences.preferredClimate === "cold" && (location.avg_temp_summer || 25) < 25) {
      climateScore += 30;
    } else if (preferences.preferredClimate === "cold" && (location.avg_temp_summer || 25) > 32) {
      climateScore -= 30;
    }
  }
  scores.push({
    category: "climate",
    score: Math.min(100, Math.max(20, climateScore)),
    weight: weights.climate,
    label: "Climate Fit",
  });

  // Nature fit - stronger differentiation
  let natureScore = location.outdoor_score || 50;
  if (preferences.beachMountain) {
    if (preferences.beachMountain === "beach") {
      if (location.beach_access_score && location.beach_access_score > 80) {
        natureScore = location.beach_access_score + 15;
      } else if (location.beach_access_score && location.beach_access_score > 50) {
        natureScore = (natureScore + location.beach_access_score) / 2 + 10;
      } else {
        natureScore -= 20;
      }
    }
    if (preferences.beachMountain === "mountains") {
      if (location.mountain_access_score && location.mountain_access_score > 80) {
        natureScore = location.mountain_access_score + 15;
      } else if (location.mountain_access_score && location.mountain_access_score > 50) {
        natureScore = (natureScore + location.mountain_access_score) / 2 + 10;
      } else {
        natureScore -= 20;
      }
    }
  }
  if (preferences.outdoorUrban === "urban" && location.walkability_score) {
    natureScore = (natureScore + location.walkability_score) / 2;
  }
  scores.push({
    category: "nature",
    score: Math.min(100, Math.max(25, natureScore)),
    weight: weights.nature,
    label: "Nature & Outdoors",
  });

  // Community fit - stronger bonuses
  let communityScore = location.community_score || 50;
  if (location.english_friendliness_score) communityScore = (communityScore + location.english_friendliness_score) / 2;
  const vibes = preferences.communityVibes || [];
  if (vibes.includes("expat") && location.culture_openness_score && location.culture_openness_score > 70) {
    communityScore += 25;
  }
  if (vibes.includes("local") && (location.english_friendliness_score || 0) < 70) {
    communityScore += 15;
  }
  if (vibes.includes("startup") && (location.startup_ecosystem_score || 0) > 70) {
    communityScore += 20;
  }
  if (vibes.includes("digital-nomad") && location.tags?.includes("digital-nomad")) {
    communityScore += 20;
  }
  scores.push({
    category: "community",
    score: Math.min(100, Math.max(30, communityScore)),
    weight: weights.community,
    label: "Community & Social",
  });

  // Career fit - larger bonuses
  let careerScore = ((location.startup_ecosystem_score || 50) + (location.internet_quality_score || 70)) / 2;
  if (preferences.workStyle === "remote") {
    if ((location.internet_quality_score || 0) > 85) {
      careerScore += 30;
    } else if ((location.internet_quality_score || 0) < 60) {
      careerScore -= 20;
    }
  }
  if (preferences.industries?.includes("tech") && (location.startup_ecosystem_score || 0) > 75) {
    careerScore += 30;
  }
  if (preferences.industries?.includes("creative") && location.tags?.includes("creative")) {
    careerScore += 25;
  }
  if (preferences.industries?.includes("finance") && location.tags?.includes("finance-hub")) {
    careerScore += 25;
  }
  scores.push({
    category: "career",
    score: Math.min(100, Math.max(25, careerScore)),
    weight: weights.career,
    label: "Career & Work",
  });

  // Cost fit - much larger impact
  let costScore = ((location.cost_of_living_score || 50) + (location.rent_score || 50)) / 2;
  if (preferences.budgetRange === "budget") {
    if (costScore > 75) {
      costScore += 30;
    } else if (costScore < 50) {
      costScore -= 25;
    }
  }
  if (preferences.budgetRange === "mid-range") {
    if (costScore > 50 && costScore < 80) costScore += 20;
  }
  if (preferences.budgetRange === "luxury") {
    if ((location.cost_of_living_score || 0) < 40) costScore -= 15;
  }
  // Tax consideration has bigger impact
  if (location.tax_friendliness_score) {
    if (preferences.taxSensitivity === "very-sensitive") {
      if (location.tax_friendliness_score > 80) {
        costScore += 25;
      } else if (location.tax_friendliness_score < 50) {
        costScore -= 20;
      }
    }
    costScore = costScore * 0.6 + location.tax_friendliness_score * 0.4;
  }
  scores.push({
    category: "cost",
    score: Math.min(100, Math.max(20, costScore)),
    weight: weights.cost,
    label: "Cost & Value",
  });

  // Safety fit
  let safetyScore = ((location.safety_score || 70) + (location.healthcare_score || 70)) / 2;
  if (preferences.safetyPriority === "top-priority") {
    if (safetyScore > 85) safetyScore += 15;
    else if (safetyScore < 60) safetyScore -= 25;
  }
  if (preferences.healthcarePriority === "essential" && (location.healthcare_score || 0) > 85) {
    safetyScore += 15;
  }
  scores.push({
    category: "safety",
    score: Math.min(100, Math.max(30, safetyScore)),
    weight: weights.safety,
    label: "Safety & Stability",
  });

  // Wellness fit - stronger differentiation
  let wellnessScore = location.wellness_score || 50;
  if (preferences.gymCulture === "important") {
    if ((location.wellness_score || 0) > 75) wellnessScore += 25;
    else if ((location.wellness_score || 0) < 50) wellnessScore -= 15;
  }
  if (preferences.wellnessImportance === "high") {
    if ((location.outdoor_score || 0) > 75) wellnessScore += 20;
  }
  scores.push({
    category: "wellness",
    score: Math.min(100, Math.max(30, wellnessScore)),
    weight: weights.wellness,
    label: "Health & Wellness",
  });

  // Travel fit - stronger bonuses
  let travelScore = location.airport_connectivity_score || 50;
  if (preferences.airportConnectivity === "important" || preferences.airportImportance === "essential") {
    if ((location.airport_connectivity_score || 0) > 85) {
      travelScore += 30;
    } else if ((location.airport_connectivity_score || 0) < 50) {
      travelScore -= 25;
    }
  }
  if (preferences.travelFrequency === "frequent" && location.transit_score) {
    travelScore = (travelScore + location.transit_score) / 2 + 10;
  }
  scores.push({
    category: "travel",
    score: Math.min(100, Math.max(25, travelScore)),
    weight: weights.travel,
    label: "Travel & Connectivity",
  });

  // Culture fit
  let cultureScore = location.culture_openness_score || 50;
  if (location.nightlife_score && preferences.dailyRoutine === "night-owl") {
    cultureScore = (cultureScore + location.nightlife_score) / 2 + 15;
  }
  if (preferences.cultureTolerance === "important" && (location.culture_openness_score || 0) > 80) {
    cultureScore += 20;
  }
  if (preferences.lgbtqFriendliness === "essential" && (location.culture_openness_score || 0) > 85) {
    cultureScore += 15;
  }
  scores.push({
    category: "culture",
    score: Math.min(100, Math.max(30, cultureScore)),
    weight: weights.culture,
    label: "Culture & Openness",
  });

  // Lifestyle fit - much stronger differentiation
  let lifestyleScore = 50;
  if (preferences.noiseTolerance === "high") {
    if ((location.nightlife_score || 0) > 80) lifestyleScore = 95;
    else if ((location.nightlife_score || 0) > 60) lifestyleScore = 80;
    else lifestyleScore = 55;
  }
  if (preferences.noiseTolerance === "medium") {
    if ((location.walkability_score || 0) > 70 && (location.nightlife_score || 50) < 85) lifestyleScore = 85;
    else lifestyleScore = 65;
  }
  if (preferences.noiseTolerance === "low") {
    if ((location.outdoor_score || 0) > 75 && (location.nightlife_score || 50) < 60) lifestyleScore = 95;
    else if ((location.nightlife_score || 50) > 80) lifestyleScore = 40;
    else lifestyleScore = 70;
  }

  // Lifestyle mode affects score
  if (preferences.lifestyleMode === "nomadic" && location.tags?.includes("digital-nomad")) {
    lifestyleScore += 15;
  }
  if (preferences.lifestyleMode === "rooted" && (location.community_score || 0) > 75) {
    lifestyleScore += 10;
  }

  scores.push({
    category: "lifestyle",
    score: Math.min(100, Math.max(25, lifestyleScore)),
    weight: weights.lifestyle,
    label: "Lifestyle Match",
  });

  return scores;
}

export function generateReasons(location: Location, categoryScores: CategoryScore[]): string[] {
  const reasons: string[] = [];
  const sortedScores = [...categoryScores].sort((a, b) => b.score - a.score);
  const topCategories = sortedScores.slice(0, 5);

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
        reasons.push(`Lifestyle that matches your preferences ${cat.score > 75 ? "perfectly" : "well"}`);
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

export function calculateTotalScore(categoryScores: CategoryScore[]): number {
  const weightedSum = categoryScores.reduce((sum, cat) => sum + cat.score * cat.weight, 0);
  const totalWeight = categoryScores.reduce((sum, cat) => sum + cat.weight, 0);
  return Math.round((weightedSum / totalWeight) * 100) / 100;
}

export function scoreLocations(locations: Location[], preferences: OnboardingData): MatchResult[] {
  const results: MatchResult[] = locations.map((location) => {
    const categoryScores = calculateCategoryScores(location, preferences);
    let totalScore = calculateTotalScore(categoryScores);

    // Apply deal-breaker multiplier
    const dealBreakerMultiplier = calculateDealBreakerMultiplier(location, preferences);
    totalScore *= dealBreakerMultiplier;

    // Apply alignment bonus
    const alignmentBonus = calculateAlignmentBonus(location, preferences);
    totalScore += alignmentBonus;

    // Apply score spreading to get more variation
    totalScore = spreadScore(totalScore);

    const reasons = generateReasons(location, categoryScores);
    const tradeoffs = generateTradeoffs(location, categoryScores);

    return {
      location,
      totalScore,
      categoryScores,
      reasons,
      tradeoffs,
      rank: 0,
    };
  });

  // Sort by total score descending
  results.sort((a, b) => b.totalScore - a.totalScore);

  // Assign ranks
  results.forEach((result, index) => {
    result.rank = index + 1;
  });

  return results;
}

// Score user's current city to show fit comparison
export interface CurrentCityScore {
  score: number;
  categoryScores: {
    label: string;
    score: number;
  }[];
  cityFound: boolean;
}

export function scoreCurrentCity(
  currentCityName: string,
  locations: Location[],
  preferences: OnboardingData
): CurrentCityScore {
  // Try to find matching city in database (case-insensitive)
  const normalizedInput = currentCityName.toLowerCase().trim();

  // First try exact match
  let matchedCity = locations.find((loc) => loc.name.toLowerCase() === normalizedInput);

  // If exact match has no scores, try fuzzy matching or related places
  // E.g., "Canggu" -> "Bali", "Seminyak" -> "Bali", "Ubud" -> "Bali"
  const baliNeighborhoods = ["canggu", "ubud", "seminyak", "kuta", "sanur", "uluwatu", "denpasar", "nusa dua"];
  const isInBali = baliNeighborhoods.some((n) => normalizedInput.includes(n) || n.includes(normalizedInput));

  if ((!matchedCity || !matchedCity.cost_of_living_score) && isInBali) {
    matchedCity = locations.find((loc) => loc.name.toLowerCase() === "bali");
  }

  // Check if the matched city has actual scores (not null)
  const hasScores =
    matchedCity &&
    (matchedCity.cost_of_living_score !== null ||
      matchedCity.climate_score !== null ||
      matchedCity.safety_score !== null);

  if (matchedCity && hasScores) {
    const categoryScores = calculateCategoryScores(matchedCity, preferences);
    let totalScore = calculateTotalScore(categoryScores);

    // Don't apply deal-breaker to current city - user already lives there and is happy
    // Just spread the score normally
    totalScore = spreadScore(totalScore);

    // Simplify to 6 main categories for the UI — covers the dimensions that actually
    // drive most matches (cost and safety are missing from a 4-bucket view and that hides
    // why a #1 is a #1 for tax-sensitive / budget / safety-first users).
    const get = (cat: string) => categoryScores.find((c) => c.category === cat)?.score || 50;
    const simplifiedScores = [
      { label: "Cost & Value", score: Math.round(get("cost")) },
      { label: "Lifestyle Fit", score: Math.round(get("lifestyle") * 0.5 + get("wellness") * 0.5) },
      { label: "Community Fit", score: Math.round(get("community") * 0.6 + get("culture") * 0.4) },
      { label: "Nature & Environment", score: Math.round(get("nature") * 0.6 + get("climate") * 0.4) },
      { label: "Safety & Stability", score: Math.round(get("safety")) },
      { label: "Career & Opportunity", score: Math.round(get("career") * 0.7 + get("travel") * 0.3) },
    ];

    return {
      score: Math.round(totalScore),
      categoryScores: simplifiedScores,
      cityFound: true,
    };
  }

  // Fallback: Generate a DETERMINISTIC estimate for unknown cities
  // Use a hash of the city name to ensure same city always gets same score
  const hashString = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  };

  const cityHash = hashString(currentCityName.toLowerCase());
  const baseScore = 48 + (cityHash % 12); // 48-59 range, deterministic

  return {
    score: baseScore,
    categoryScores: [
      { label: "Cost & Value", score: 48 + ((cityHash * 11) % 18) },
      { label: "Lifestyle Fit", score: 45 + ((cityHash * 7) % 15) },
      { label: "Community Fit", score: 50 + ((cityHash * 13) % 10) },
      { label: "Nature & Environment", score: 40 + ((cityHash * 17) % 20) },
      { label: "Safety & Stability", score: 55 + ((cityHash * 19) % 18) },
      { label: "Career & Opportunity", score: 50 + ((cityHash * 23) % 15) },
    ],
    cityFound: false,
  };
}
