import { scoreBreeds, scoreDreamBreed } from "@/lib/scoring";
import { buildAdoptionPlan } from "@/lib/adoptionPlan";
import { BREEDS, getBreedById } from "@/data/breeds";
import { buildPersonalityRead } from "@/lib/personality";
import { computeLifeChange } from "@/lib/lifeChange";
import { computeConfidence } from "@/lib/confidence";
import { computeCostComparison } from "@/lib/cost";
import { toRankedBreed, type ScoredRun, type RunSource } from "@/lib/run";
import { displayFit } from "@/lib/match/engine";
import type { OnboardingData } from "@/types/onboarding";

/**
 * Single source of truth for turning inputs into a fully ScoredRun. Used by /api/score
 * (fresh run) and /api/refine (re-score after the deeper quiz), so the two never drift.
 */
export function buildScoredRun(opts: {
  runId: string;
  createdAt: number;
  inputs: OnboardingData;
  source: RunSource;
}): ScoredRun {
  const { runId, createdAt, inputs, source } = opts;
  const currentCity = (inputs.currentCity ?? "").trim();
  const dreamBreed = (inputs.dreamBreed ?? "").trim();

  const matches = scoreBreeds(BREEDS, inputs);
  const top = matches[0];
  const dreamBreedFit = scoreDreamBreed(dreamBreed || "unknown", BREEDS, inputs);

  // One breed, one number. When the #1 match IS the breed the user came in wanting (the
  // loved-breed boost makes this common for people who already know their dog), every
  // surface must show the same honest fit — otherwise the free page compares the breed
  // to itself with two different scores.
  const alreadyHome = Boolean(dreamBreedFit.resolvedId && top.breed.id === dreamBreedFit.resolvedId);
  if (alreadyHome) top.displayScore = dreamBreedFit.score;

  const adoptionPlan = buildAdoptionPlan(top.breed, matches, inputs);

  const topSlice = matches.slice(0, 10);
  const labels = top.categoryScores.map((c) => c.label);
  // Displayed next to spread() composites (rings, tease) — so they pass through the
  // same display transform. Raw category math is untouched.
  const categoryAverages = labels.map((label, i) => ({
    label,
    score: displayFit(topSlice.reduce((s, m) => s + (m.categoryScores[i]?.score ?? 0), 0) / topSlice.length),
  }));

  const dreamBreedResolved = dreamBreedFit.resolvedId ? (getBreedById(dreamBreedFit.resolvedId) ?? null) : null;

  return {
    runId,
    createdAt,
    currentCity,
    dreamBreed,
    inputs,
    source,
    personality: buildPersonalityRead(inputs),
    dreamBreedFit,
    categoryAverages,
    // Comparison + tease use the HONEST displayScore (same formula as dreamBreedFit),
    // so the headline number is consistent with the bucket breakdown the user sees.
    // The internal ranking (top.totalScore) still uses the alignment bonus to pick #1.
    lifeChange: computeLifeChange(dreamBreedFit, top.categoryScores, top.displayScore, {
      alreadyHome,
      // In home mode, the story is "no other breed beat your instinct" — the closest
      // challenger is the best-scoring OTHER breed.
      runnerUpScore: alreadyHome ? (matches[1]?.displayScore ?? null) : null,
    }),
    confidence: computeConfidence(inputs, matches),
    costComparison: computeCostComparison(inputs, top.breed, dreamBreedResolved),
    topTease: { score: top.displayScore, group: top.breed.group, size: top.breed.size },
    ranking: matches.map(toRankedBreed),
    adoptionPlan,
    topCount: matches.length,
  };
}
