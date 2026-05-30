export interface OnboardingData {
  // Basics
  name?: string;
  ageRange?: string;
  currentCity?: string;
  passports?: string[];
  languages?: string[];

  // Lifestyle
  workStyle?: string;
  incomeLevel?: string;
  relationshipStatus?: string;
  hasKids?: boolean;
  hasPets?: boolean;
  preferredClimate?: string;
  outdoorUrban?: string;
  beachMountain?: string;
  noiseTolerance?: string;
  dailyRoutine?: string;

  // Health & Wellness
  gymCulture?: string;
  wellnessImportance?: string;
  healthcareQuality?: string;
  healthcarePriority?: string;
  fitnessLevel?: string;
  dietaryNeeds?: string[];
  mentalHealthSupport?: string;

  // Career & Growth
  industries?: string[];
  industryFocus?: string;
  networkingImportance?: string;
  entrepreneurialInterest?: string;

  // Social & Community
  communityVibes?: string[]; // Multi-select community vibes
  familyProximity?: string;
  peopleDensity?: string;

  // Safety & Stability
  riskTolerance?: string;
  ruleLawImportance?: string;
  safetyPriority?: string;
  politicalStability?: string;
  lgbtqFriendliness?: string;

  // Cost & Finances
  budgetRange?: string;
  taxSensitivity?: string;
  taxConsideration?: string;
  housingPreference?: string;

  // Travel & Mobility
  airportConnectivity?: string;
  weekendTrips?: string;
  travelFrequency?: string;
  airportImportance?: string;
  publicTransitNeed?: string;

  // Values
  freedomStability?: string;
  noveltyConsistency?: string;
  cultureTolerance?: string;

  // Signals (optional)
  socialTags?: string[];
  instagramHandle?: string;
  chatgptReflection?: string;

  // Priorities
  mustHaves?: string[];
  dealBreakers?: string[];
  topPriorities?: string[];

  // Mobility & Lifestyle Mode
  lifestyleMode?: "rooted" | "nomadic";
  locationChangesPerYear?: "3-4" | "4-6" | "6+";
  movementDrivers?: string[];
}
