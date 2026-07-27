import type { OnboardingData } from "@/types/onboarding";
import { rankBreedsV2, scoreDreamBreedV2, fitCategories } from "@/lib/match/engine";
import { BREEDS } from "@/data/breeds";

export interface Breed {
  id: string; // slug, e.g. "labrador-retriever"
  name: string;
  /** Breed group — the tease shows this, never the name. e.g. "Herding", "Sporting", "Mixed & Rescue". */
  group: string;
  /** "Toy" | "Small" | "Medium" | "Large" | "Giant" */
  size: string;
  weight_lbs: number | null; // typical adult midpoint
  lifespan_years: number | null; // midpoint
  image_url: string | null;
  description: string | null;
  vibe_summary: string | null;
  tags: string[];
  hypoallergenic: boolean;

  // Trait scores 0–100
  energy_level: number | null;
  exercise_needs: number | null;
  playfulness: number | null;
  apartment_friendly: number | null;
  novice_friendly: number | null;
  trainability: number | null;
  intelligence: number | null;
  grooming_needs: number | null;
  shedding_level: number | null;
  drooling_level: number | null;
  kid_friendly: number | null;
  affection_level: number | null;
  independence: number | null;
  alone_tolerance: number | null;
  dog_friendly: number | null;
  cat_friendly: number | null;
  stranger_friendly: number | null;
  protectiveness: number | null;
  watchdog_alertness: number | null;
  barking_level: number | null;
  heat_tolerance: number | null;
  cold_tolerance: number | null;
  health_robustness: number | null;

  // Cost & meta
  monthly_cost_usd: number | null; // food + grooming + insurance + routine vet, typical
  popularity: number | null; // 0–100 — tiebreak toward well-known, well-supported breeds
  shelter_availability: number | null; // 0–100 — how often this breed (or close mixes) shows up in shelters/rescue
}

export interface CategoryScore {
  category: string;
  score: number;
  weight: number;
  label: string;
}

export interface MatchResult {
  breed: Breed;
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
 * Public scoring API. The IP lives in `lib/match/engine` (fit-based matching, not
 * trait-maximization) + `lib/match/resolve` (fuzzy breed resolution). These functions
 * keep stable signatures so the rest of the app never touches engine internals.
 */

export function calculateTotalScore(categoryScores: CategoryScore[]): number {
  const weightedSum = categoryScores.reduce((sum, cat) => sum + cat.score * cat.weight, 0);
  const totalWeight = categoryScores.reduce((sum, cat) => sum + cat.weight, 0) || 1;
  return Math.round((weightedSum / totalWeight) * 100) / 100;
}

/** Per-category FIT (0–100) against the user's expressed preferences. */
export function calculateCategoryScores(breed: Breed, preferences: OnboardingData): CategoryScore[] {
  return fitCategories(breed, preferences, BREEDS);
}

export function scoreBreeds(breeds: Breed[], preferences: OnboardingData): MatchResult[] {
  return rankBreedsV2(breeds, preferences).map((r) => ({
    breed: r.breed,
    totalScore: r.displayScore,
    displayScore: r.displayScore,
    categoryScores: r.categoryScores,
    reasons: generateReasons(r.breed, r.categoryScores),
    tradeoffs: generateTradeoffs(r.breed, r.categoryScores),
    rank: r.rank,
  }));
}

export interface DreamBreedScore {
  score: number;
  categoryScores: {
    label: string;
    score: number;
  }[];
  breedFound: boolean;
  /** The breed we actually scored (a curated match, or a synthesized estimate). */
  resolvedName?: string;
  /** True when the score was synthesized from group/global data, not a curated breed. */
  estimated?: boolean;
  /** Curated breed id the input resolved to (null when synthesized). */
  resolvedId?: string | null;
  /** True when a hard deal-breaker penalty lowered the composite (UI explains it). */
  constraintPenalty?: boolean;
}

export function scoreDreamBreed(
  dreamBreedName: string,
  breeds: Breed[],
  preferences: OnboardingData
): DreamBreedScore {
  const r = scoreDreamBreedV2(dreamBreedName, breeds, preferences);
  return {
    score: r.score,
    categoryScores: r.categoryScores,
    breedFound: r.breedFound,
    resolvedName: r.resolvedName,
    estimated: r.estimated,
    resolvedId: r.resolvedId,
    constraintPenalty: r.constraintPenalty,
  };
}

export function generateReasons(breed: Breed, categoryScores: CategoryScore[]): string[] {
  const reasons: string[] = [];
  // Lead with the categories that matter MOST TO THIS USER and where the breed delivers —
  // impact = fit × expressed importance (weight). This surfaces "you wanted X, and this
  // breed nails it" instead of just whatever the breed is generically known for.
  const topCategories = [...categoryScores].sort((a, b) => b.score * b.weight - a.score * a.weight).slice(0, 5);

  for (const cat of topCategories) {
    switch (cat.category) {
      case "energy":
        if (breed.energy_level !== null && breed.energy_level > 80) {
          reasons.push("Built to keep up — a genuine training and adventure partner");
        } else if (breed.energy_level !== null && breed.energy_level < 40) {
          reasons.push("A calm, low-key energy that fits a relaxed home");
        } else if (cat.score > 75) {
          reasons.push("An exercise appetite that matches the life you described");
        }
        break;
      case "home":
        if (breed.apartment_friendly !== null && breed.apartment_friendly > 80) {
          reasons.push("Thrives in smaller spaces — a natural apartment dog");
        } else if (cat.score > 75) {
          reasons.push("Space needs that line up with your home setup");
        }
        break;
      case "training":
        if (breed.trainability !== null && breed.trainability > 85) {
          reasons.push("Highly trainable — picks things up in a handful of reps");
        } else if (breed.novice_friendly !== null && breed.novice_friendly > 80) {
          reasons.push("Famously forgiving for first-time owners");
        }
        break;
      case "grooming":
        if (breed.hypoallergenic) {
          reasons.push("Low-allergen coat — one of the safer picks for allergies");
        } else if (breed.shedding_level !== null && breed.shedding_level < 30) {
          reasons.push("Barely sheds — your lint roller stays in the drawer");
        }
        break;
      case "family":
        if (breed.kid_friendly !== null && breed.kid_friendly > 85) {
          reasons.push("A proven family dog — patient and gentle with kids");
        }
        break;
      case "social":
        if (breed.dog_friendly !== null && breed.dog_friendly > 80) {
          reasons.push("Gets along easily with other dogs");
        } else if (breed.cat_friendly !== null && breed.cat_friendly > 75) {
          reasons.push("One of the better breeds for a home with cats");
        }
        break;
      case "protection":
        if (breed.protectiveness !== null && breed.protectiveness > 80) {
          reasons.push("A natural guardian — real presence and real loyalty");
        } else if (breed.watchdog_alertness !== null && breed.watchdog_alertness > 80) {
          reasons.push("An alert watchdog that lets you know what's happening");
        }
        break;
      case "noise":
        if (breed.barking_level !== null && breed.barking_level < 30) {
          reasons.push("One of the quietest breeds — neighbors will never know");
        }
        break;
      case "independence":
        if (breed.alone_tolerance !== null && breed.alone_tolerance > 70) {
          reasons.push("Handles alone time better than most — fits a working schedule");
        }
        break;
      case "temperament":
        if (breed.affection_level !== null && breed.affection_level > 85) {
          reasons.push("A true velcro dog — affection is the whole personality");
        } else if (cat.score > 75) {
          reasons.push("The affection style you asked for, not too much or too little");
        }
        break;
    }
  }

  // Tag-based reasons
  if (breed.tags?.includes("family-favorite")) {
    reasons.push("A beloved family favorite with decades of track record");
  }
  if (breed.shelter_availability !== null && breed.shelter_availability > 70) {
    reasons.push("Commonly available through shelters and rescues — adoption is realistic");
  }

  return reasons.slice(0, 5);
}

export function generateTradeoffs(breed: Breed, categoryScores: CategoryScore[]): string[] {
  const tradeoffs: string[] = [];
  const sortedScores = [...categoryScores].sort((a, b) => a.score - b.score);
  const weakCategories = sortedScores.slice(0, 3);

  for (const cat of weakCategories) {
    if (cat.score < 60) {
      switch (cat.category) {
        case "energy":
          if (breed.exercise_needs !== null && breed.exercise_needs > 80) {
            tradeoffs.push("Needs serious daily exercise — an under-walked one invents its own jobs");
          } else if (breed.energy_level !== null && breed.energy_level < 35) {
            tradeoffs.push("More of a stroller than a running partner");
          }
          break;
        case "grooming":
          if (breed.grooming_needs !== null && breed.grooming_needs > 75) {
            tradeoffs.push("A real grooming commitment — budget time or a groomer");
          } else if (breed.shedding_level !== null && breed.shedding_level > 70) {
            tradeoffs.push("Sheds heavily — fur becomes a lifestyle");
          }
          break;
        case "training":
          if (breed.novice_friendly !== null && breed.novice_friendly < 45) {
            tradeoffs.push("Not a beginner breed — benefits from an experienced hand");
          }
          break;
        case "noise":
          if (breed.barking_level !== null && breed.barking_level > 70) {
            tradeoffs.push("Vocal — expect commentary on squirrels, doorbells, and wind");
          }
          break;
        case "independence":
          if (breed.alone_tolerance !== null && breed.alone_tolerance < 35) {
            tradeoffs.push("Hates being left alone — long solo days are hard on this breed");
          }
          break;
        case "home":
          if (breed.apartment_friendly !== null && breed.apartment_friendly < 40) {
            tradeoffs.push("Really wants space to move — apartments are a stretch");
          }
          break;
        case "family":
          if (breed.kid_friendly !== null && breed.kid_friendly < 50) {
            tradeoffs.push("Better suited to adult households than young kids");
          }
          break;
      }
    }
  }

  if (breed.drooling_level !== null && breed.drooling_level > 70) {
    tradeoffs.push("A drooler — keep a towel by the couch");
  }
  if (breed.health_robustness !== null && breed.health_robustness < 45) {
    tradeoffs.push("Known health sensitivities — pet insurance is strongly worth it");
  }
  if (breed.monthly_cost_usd !== null && breed.monthly_cost_usd > 180) {
    tradeoffs.push("On the pricier side to feed and care for");
  }

  return tradeoffs.slice(0, 3);
}
