import type { Location } from "./scoring";
import type { OnboardingData } from "@/types/onboarding";

export interface CircuitStop {
  location: Location;
  months: string[];
  startMonth: number; // 0-11
  endMonth: number; // 0-11
  reasons: string[];
  activities: string[];
  seasonScore: number;
}

export interface AnnualCircuit {
  stops: CircuitStop[];
  totalLocations: number;
  lifestyleMode: "nomadic";
  primaryClimate: string;
  totalCountries: number;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Northern hemisphere: summer Jun-Aug, winter Dec-Feb
// Southern hemisphere: summer Dec-Feb, winter Jun-Aug
function isSouthernHemisphere(location: Location): boolean {
  return (location.latitude ?? 0) < 0;
}

// Get ideal temperature for a month at a location
function getMonthlyTemp(location: Location, month: number): number {
  const isSouthern = isSouthernHemisphere(location);
  const summerTemp = location.avg_temp_summer ?? 25;
  const winterTemp = location.avg_temp_winter ?? 10;

  // Summer months (local)
  const summerMonths = isSouthern ? [11, 0, 1] : [5, 6, 7]; // Dec-Feb or Jun-Aug
  const winterMonths = isSouthern ? [5, 6, 7] : [11, 0, 1];

  if (summerMonths.includes(month)) return summerTemp;
  if (winterMonths.includes(month)) return winterTemp;

  // Shoulder season - interpolate
  return (summerTemp + winterTemp) / 2;
}

// Score a location for a specific month based on preferences
function scoreLocationForMonth(location: Location, month: number, preferences: OnboardingData): number {
  let score = 50;
  const temp = getMonthlyTemp(location, month);

  // Ideal temp range is 20-28°C
  const idealMin = 20;
  const idealMax = 28;

  if (temp >= idealMin && temp <= idealMax) {
    score += 30;
  } else if (temp >= 15 && temp <= 32) {
    score += 15;
  } else if (temp < 10 || temp > 35) {
    score -= 20;
  }

  // Beach preference bonus in summer months
  if (preferences.beachMountain === "beach" && location.beach_access_score) {
    const isSouthern = isSouthernHemisphere(location);
    const summerMonths = isSouthern ? [11, 0, 1, 2] : [5, 6, 7, 8];
    if (summerMonths.includes(month)) {
      score += (location.beach_access_score - 50) * 0.3;
    }
  }

  // Mountain/snowboarding in winter
  if (preferences.beachMountain === "mountains" && location.mountain_access_score) {
    const isSouthern = isSouthernHemisphere(location);
    // Northern-hemisphere winter is Dec–Mar; month indices are 0–11 (11 = December).
    const winterMonths = isSouthern ? [6, 7, 8] : [11, 0, 1, 2];
    if (winterMonths.includes(month)) {
      score += (location.mountain_access_score - 50) * 0.3;
    }
  }

  // Add other location quality scores
  if (location.wellness_score) score += (location.wellness_score - 50) * 0.1;
  if (location.safety_score) score += (location.safety_score - 50) * 0.1;
  if (location.cost_of_living_score) score += (location.cost_of_living_score - 50) * 0.1;

  return Math.max(0, Math.min(100, score));
}

// Generate activities based on location and season
function generateActivities(location: Location, months: number[]): string[] {
  const activities: string[] = [];
  const isSummerMonth = months.some((m) =>
    isSouthernHemisphere(location) ? [11, 0, 1].includes(m) : [5, 6, 7].includes(m)
  );

  if (location.beach_access_score && location.beach_access_score > 70 && isSummerMonth) {
    activities.push("Beach & water sports");
  }
  if (location.mountain_access_score && location.mountain_access_score > 70) {
    if (!isSummerMonth) {
      activities.push("Skiing & snowboarding");
    } else {
      activities.push("Hiking & mountain trails");
    }
  }
  if (location.wellness_score && location.wellness_score > 70) {
    activities.push("Wellness & yoga retreats");
  }
  if (location.nightlife_score && location.nightlife_score > 75) {
    activities.push("Vibrant nightlife");
  }
  if (location.outdoor_score && location.outdoor_score > 75) {
    activities.push("Outdoor adventures");
  }
  if (location.startup_ecosystem_score && location.startup_ecosystem_score > 70) {
    activities.push("Coworking & networking");
  }

  return activities.slice(0, 3);
}

// Generate reasons for choosing this location at this time
function generateSeasonReasons(location: Location, months: number[]): string[] {
  const reasons: string[] = [];
  const temp = getMonthlyTemp(location, months[0]);
  const isSouthern = isSouthernHemisphere(location);

  // Temperature reason
  if (temp >= 20 && temp <= 28) {
    reasons.push(`Perfect ${temp}°C average temperature`);
  } else if (temp >= 15 && temp <= 32) {
    reasons.push(`Pleasant ${temp}°C weather`);
  }

  // Season-specific
  const summerMonths = isSouthern ? [11, 0, 1, 2] : [5, 6, 7, 8];
  const isLocalSummer = months.some((m) => summerMonths.includes(m));

  if (isLocalSummer && location.beach_access_score && location.beach_access_score > 75) {
    reasons.push("Peak beach season");
  }

  if (!isLocalSummer && location.mountain_access_score && location.mountain_access_score > 80) {
    reasons.push("Excellent ski conditions");
  }

  if (location.sunshine_days && location.sunshine_days > 250) {
    reasons.push(`${location.sunshine_days}+ sunny days/year`);
  }

  if (location.cost_of_living_score && location.cost_of_living_score > 70) {
    reasons.push("Great value for money");
  }

  if (location.visa_friendliness_score && location.visa_friendliness_score > 75) {
    reasons.push("Easy visa access");
  }

  return reasons.slice(0, 3);
}

// Main circuit generation function
export function generateAnnualCircuit(locations: Location[], preferences: OnboardingData): AnnualCircuit | null {
  const lifestyleMode = preferences.lifestyleMode;

  // Only generate circuit for nomadic users
  if (lifestyleMode !== "nomadic") {
    return null;
  }

  // Determine number of stops based on preferences
  let targetStops = 3; // Default for seasonal
  if (preferences.locationChangesPerYear === "4-6") targetStops = 5;
  if (preferences.locationChangesPerYear === "6+") targetStops = 6;
  if (lifestyleMode === "nomadic" && !preferences.locationChangesPerYear) targetStops = 4;

  // Score each location for each month
  const monthlyScores: Map<string, number[]> = new Map();

  for (const location of locations) {
    const scores = MONTHS.map((_, monthIndex) => scoreLocationForMonth(location, monthIndex, preferences));
    monthlyScores.set(location.id, scores);
  }

  // Divide year into segments
  const monthsPerStop = Math.floor(12 / targetStops);
  const stops: CircuitStop[] = [];
  const usedLocationIds = new Set<string>();

  for (let i = 0; i < targetStops; i++) {
    const startMonth = i * monthsPerStop;
    const endMonth = i === targetStops - 1 ? 11 : startMonth + monthsPerStop - 1;
    const monthRange = Array.from({ length: endMonth - startMonth + 1 }, (_, idx) => startMonth + idx);

    // Find best location for this period (not already used)
    let bestLocation: Location | null = null;
    let bestScore = -1;

    for (const location of locations) {
      if (usedLocationIds.has(location.id)) continue;

      const scores = monthlyScores.get(location.id) || [];
      const avgScore = monthRange.reduce((sum, m) => sum + (scores[m] || 50), 0) / monthRange.length;

      // Bonus for airport connectivity (easier travel between stops)
      const connectivityBonus = (location.airport_connectivity_score || 50) * 0.1;
      const finalScore = avgScore + connectivityBonus;

      if (finalScore > bestScore) {
        bestScore = finalScore;
        bestLocation = location;
      }
    }

    if (bestLocation) {
      usedLocationIds.add(bestLocation.id);

      stops.push({
        location: bestLocation,
        months: monthRange.map((m) => MONTHS[m]),
        startMonth,
        endMonth,
        reasons: generateSeasonReasons(bestLocation, monthRange),
        activities: generateActivities(bestLocation, monthRange),
        seasonScore: Math.round(bestScore),
      });
    }
  }

  // Count unique countries
  const countries = new Set(stops.map((s) => s.location.country));

  // Determine primary climate
  let primaryClimate = "varied";
  if (preferences.preferredClimate) {
    primaryClimate = preferences.preferredClimate;
  }

  return {
    stops,
    totalLocations: stops.length,
    lifestyleMode,
    primaryClimate,
    totalCountries: countries.size,
  };
}

// Get month abbreviation
export function getMonthAbbrev(month: string): string {
  return month.slice(0, 3);
}

// Get month color based on season
export function getSeasonColor(monthIndex: number): string {
  if ([11, 0, 1].includes(monthIndex)) return "from-blue-400 to-cyan-400"; // Winter (N) / Summer (S)
  if ([2, 3, 4].includes(monthIndex)) return "from-green-400 to-emerald-400"; // Spring
  if ([5, 6, 7].includes(monthIndex)) return "from-amber-400 to-orange-400"; // Summer (N) / Winter (S)
  return "from-orange-400 to-red-400"; // Fall
}
