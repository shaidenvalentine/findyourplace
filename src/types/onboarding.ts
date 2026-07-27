export interface OnboardingData {
  // Basics
  name?: string;
  ageRange?: string;
  /** Where the user lives — powers the local shelter/adoption layer, never scoring. */
  currentCity?: string;

  // The trust-builder: the breed they grew up with, or the one they think they want.
  // We score it honestly against their real life — the accurate read earns the sale.
  dreamBreed?: string;

  // Revealed preference — breeds the user has owned/loved. The strongest signal for the
  // "I always knew" match: we surface breeds similar in character, and a loved breed that
  // clears constraints is pulled toward #1.
  lovedBreeds?: string[];

  // Home & lifestyle
  homeType?: "apartment" | "house-small-yard" | "house-big-yard" | "rural";
  homeSetting?: "city" | "suburb" | "rural";
  activityLevel?: "relaxed" | "moderate" | "active" | "athlete";
  hoursAlone?: "rarely" | "half-day" | "full-day";
  travelFrequency?: "rarely" | "sometimes" | "often";

  // Experience & training
  experienceLevel?: "first-time" | "had-dogs" | "experienced";
  trainingAppetite?: "love-it" | "basics" | "minimal";

  // Household
  hasKids?: boolean;
  kidsAges?: "toddlers" | "school-age" | "teens";
  otherPets?: string[]; // "dog" | "cat" | "small-pets"

  // Preferences
  sizePreference?: "small" | "medium" | "large" | "giant" | "open";
  groomingTolerance?: "minimal" | "moderate" | "enjoys-grooming";
  sheddingTolerance?: "low" | "medium" | "high";
  allergies?: boolean;
  barkTolerance?: "low" | "medium" | "high";
  guardingImportance?: "top-priority" | "nice-to-have" | "not-needed";
  affectionStyle?: "velcro" | "balanced" | "independent";
  climate?: "hot" | "cold" | "temperate";

  // Money
  budgetRange?: "budget" | "mid-range" | "no-ceiling";

  // Where the dog comes from — powers the adoption plan (shelter-first by default).
  adoptPreference?: "adopt" | "breeder" | "either";

  // Signals (optional)
  socialTags?: string[];
  chatgptReflection?: string;

  // Priorities
  mustHaves?: string[]; // "hypoallergenic" | "good-with-kids" | "apartment-ok" | "protective" | "low-shedding" | "quiet" | "easy-training" | "jogging-partner"
  dealBreakers?: string[]; // "heavy-shedding" | "drooling" | "constant-barking" | "high-energy" | "stubborn" | "fragile-health"
  topPriorities?: string[];
}
