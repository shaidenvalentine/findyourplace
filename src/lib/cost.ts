import type { Breed } from "@/lib/scoring";
import type { OnboardingData } from "@/types/onboarding";

/**
 * Cost-of-ownership comparison: what the #1 match actually costs to live with —
 * monthly, first-year, and over the dog's lifetime — against the user's budget and
 * against the breed they thought they wanted.
 *
 * IMPORTANT — this is a directional ESTIMATE, not a quote. Real costs vary by city,
 * insurer, food choice, and the individual dog. Adoption vs. breeder changes the
 * up-front number dramatically — we show both and let the adoption path shine.
 */

export interface CostComparison {
  /** Monthly running cost of the #1 match (food + grooming + insurance + routine vet). */
  monthlyCost: number;
  /** Dream-breed monthly cost, when we know the breed (null when synthesized/unknown). */
  dreamBreedMonthly: number | null;
  /** First-year total going the ADOPTION route (fee + gear + medical + training + months of care). */
  firstYearAdopted: number;
  /** First-year total going the breeder route. */
  firstYearBreeder: number;
  /** What adopting saves up front vs. a breeder purchase. */
  adoptionSavings: number;
  /** Lifetime running cost (monthly × 12 × expected years). */
  lifetimeCost: number;
  lifespanYears: number;
  /** User's monthly budget band + midpoint, for the fits/stretches verdict. */
  budgetBand: string;
  budgetMidpoint: number | null;
  /** True when the match's monthly cost sits within the stated budget. */
  fitsBudget: boolean | null;
  /** Grooming is the silent budget-killer — flagged when professional grooming is likely. */
  needsProGrooming: boolean;
  /** Insurance urgency: high for breeds with known health sensitivities. */
  insuranceRecommended: boolean;
}

export const BUDGET_BANDS: { value: string; label: string; midpoint: number }[] = [
  { value: "budget", label: "Keep it lean (~$100/mo)", midpoint: 100 },
  { value: "mid-range", label: "Comfortable (~$150–250/mo)", midpoint: 200 },
  { value: "no-ceiling", label: "Whatever they need", midpoint: 400 },
];

export function budgetMidpoint(band?: string): number | null {
  return BUDGET_BANDS.find((b) => b.value === band)?.midpoint ?? null;
}

// Typical purebred purchase price by cost tier of the breed (directional).
function breederPrice(breed: Breed): number {
  const monthly = breed.monthly_cost_usd ?? 140;
  const pop = breed.popularity ?? 50;
  // Popular + expensive-to-keep breeds command higher prices; rare breeds too.
  const base = 900 + monthly * 6;
  const rarity = pop < 25 ? 800 : 0;
  return Math.round((base + rarity) / 50) * 50;
}

const ADOPTION_FEE = 250; // typical shelter/rescue fee incl. spay/neuter + first shots
const FIRST_YEAR_SETUP = 550; // gear: crate, leash, bed, bowls, toys, license
const FIRST_YEAR_MEDICAL = 450; // vaccines, chip, first checkups beyond what's included
const FIRST_YEAR_TRAINING = 200; // group classes

export function computeCostComparison(
  inputs: OnboardingData,
  dest: Breed,
  dreamBreed: Breed | null
): CostComparison {
  const monthly = dest.monthly_cost_usd ?? 140;
  const lifespan = dest.lifespan_years ?? 12;
  const mid = budgetMidpoint(inputs.budgetRange);

  const runningYear = monthly * 12;
  const firstYearAdopted = ADOPTION_FEE + FIRST_YEAR_SETUP + FIRST_YEAR_MEDICAL + FIRST_YEAR_TRAINING + runningYear;
  const firstYearBreeder = breederPrice(dest) + FIRST_YEAR_SETUP + FIRST_YEAR_MEDICAL + FIRST_YEAR_TRAINING + runningYear;

  return {
    monthlyCost: monthly,
    dreamBreedMonthly: dreamBreed?.monthly_cost_usd ?? null,
    firstYearAdopted,
    firstYearBreeder,
    adoptionSavings: firstYearBreeder - firstYearAdopted,
    lifetimeCost: runningYear * lifespan,
    lifespanYears: lifespan,
    budgetBand: inputs.budgetRange ?? "",
    budgetMidpoint: mid,
    fitsBudget: mid === null ? null : monthly <= mid * 1.15,
    needsProGrooming: (dest.grooming_needs ?? 0) > 65,
    insuranceRecommended: (dest.health_robustness ?? 60) < 50,
  };
}

export function formatMoney(n: number): string {
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (abs >= 1000) return `${sign}$${(abs / 1000).toFixed(abs >= 10000 ? 0 : 1).replace(/\.0$/, "")}k`;
  return `${sign}$${abs}`;
}
