import { scoreLocations, scoreCurrentCity } from "@/lib/scoring";
import { generateAnnualCircuit } from "@/lib/circuitGenerator";
import { LOCATIONS } from "@/data/locations";
import { buildPersonalityRead } from "@/lib/personality";
import { computeLifeChange } from "@/lib/lifeChange";
import { computeConfidence } from "@/lib/confidence";
import { computeTaxComparison } from "@/lib/tax";
import { toRankedPlace, type ScoredRun } from "@/lib/run";
import type { OnboardingData } from "@/types/onboarding";

/**
 * Single source of truth for turning inputs into a fully ScoredRun. Used by /api/score
 * (fresh run) and /api/refine (re-score after the deeper quiz), so the two never drift.
 */
export function buildScoredRun(opts: {
  runId: string;
  createdAt: number;
  inputs: OnboardingData;
  source: "quiz" | "ai-profile";
}): ScoredRun {
  const { runId, createdAt, inputs, source } = opts;
  const currentCity = (inputs.currentCity ?? "").trim();

  const matches = scoreLocations(LOCATIONS, inputs);
  const top = matches[0];
  const currentCityFit = scoreCurrentCity(currentCity || "unknown", LOCATIONS, inputs);
  const circuit = generateAnnualCircuit(LOCATIONS, inputs);

  const topSlice = matches.slice(0, 10);
  const labels = top.categoryScores.map((c) => c.label);
  const categoryAverages = labels.map((label, i) => ({
    label,
    score: Math.round(topSlice.reduce((s, m) => s + (m.categoryScores[i]?.score ?? 0), 0) / topSlice.length),
  }));

  return {
    runId,
    createdAt,
    currentCity,
    inputs,
    source,
    personality: buildPersonalityRead(inputs),
    currentCityFit,
    categoryAverages,
    lifeChange: computeLifeChange(currentCityFit, top.categoryScores, top.totalScore),
    confidence: computeConfidence(inputs, matches),
    taxComparison: computeTaxComparison(inputs, top.location),
    topTease: { score: top.totalScore, continent: top.location.continent, region: top.location.region },
    ranking: matches.map(toRankedPlace),
    circuit,
    topCount: matches.length,
  };
}
