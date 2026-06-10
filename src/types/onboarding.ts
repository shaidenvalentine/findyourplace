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

  // Tax & income (for the tax-savings comparison)
  taxResidenceCountry?: string; // where they currently pay tax (may differ from currentCity)
  annualIncomeBand?: string; // "<50k" | "50-100k" | "100-200k" | "200-500k" | "500k+"
  isUsCitizen?: boolean; // US citizens are taxed on worldwide income — flagged in the result
  hasInvestmentIncome?: boolean; // founder/investor: factor capital-gains too

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

  // Revealed preference — places the user has loved / felt most at home. The strongest
  // signal for the "I always knew" match: we surface places similar in character, and a
  // loved place that's in-universe and clears constraints is pulled toward #1.
  lovedPlaces?: string[];

  // Mobility & Lifestyle Mode
  lifestyleMode?: "rooted" | "nomadic";
  locationChangesPerYear?: "3-4" | "4-6" | "6+";
  movementDrivers?: string[];
}
