import type { MatchResult } from "@/lib/scoring";
import type { OnboardingData } from "@/types/onboarding";

/**
 * Match confidence (0–100). Two ingredients:
 *  - COVERAGE: how many high-signal scoring dimensions we actually know about the user.
 *  - SEPARATION: how decisively the #1 match beats the chasing pack (a clear winner =
 *    higher confidence than a near-tie).
 *
 * This powers the "sharpen your match" lever: a quick read lands ~65–75%, and answering
 * the deep quiz climbs it toward ~95%. The climb is the psychological engine — investment
 * before the paywall — so the number must move meaningfully as dimensions fill in.
 */

export const HIGH_SIGNAL_DIMENSIONS: (keyof OnboardingData)[] = [
  "preferredClimate",
  "beachMountain",
  "budgetRange",
  "taxSensitivity",
  "safetyPriority",
  "workStyle",
  "communityVibes",
  "noiseTolerance",
  "wellnessImportance",
  "lifestyleMode",
  "mustHaves",
  "healthcarePriority",
  "airportImportance",
  "outdoorUrban",
  "dailyRoutine",
  "riskTolerance",
  "cultureTolerance",
  "peopleDensity",
  "familyProximity",
  "industries",
];

export function answeredDimensionCount(inputs: OnboardingData): number {
  return HIGH_SIGNAL_DIMENSIONS.filter((k) => {
    const v = inputs[k];
    if (v === undefined || v === null) return false;
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === "string") return v.trim().length > 0;
    return true;
  }).length;
}

export function computeConfidence(inputs: OnboardingData, matches: MatchResult[]): number {
  const answered = answeredDimensionCount(inputs);
  const coverage = Math.min(1, answered / HIGH_SIGNAL_DIMENSIONS.length); // 0..1

  // Concave climb: early answers move the needle the most, then it tapers toward a
  // ceiling — so it always feels like you're "almost there" (the Zeigarnik pull).
  const base = 54;
  const ceiling = 96;
  const curved = ceiling - (ceiling - base) * Math.pow(1 - coverage, 1.35);

  // Small bonus when #1 decisively beats the chasing pack (a clear winner, not a tie).
  let separation = 0;
  if (matches.length >= 5) {
    separation = Math.min(3, (matches[0].totalScore - matches[4].totalScore) / 5);
  }

  return Math.max(40, Math.min(98, Math.round(curved + separation)));
}
