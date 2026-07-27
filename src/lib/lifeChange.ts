import type { CategoryScore, DreamBreedScore } from "@/lib/scoring";
import { displayFit } from "@/lib/match/engine";

export interface LifeChangeCategory {
  label: string;
  current: number;
  best: number;
  delta: number;
  note: string;
}

export interface LifeChange {
  currentScore: number;
  bestScore: number;
  overallDelta: number;
  categories: LifeChangeCategory[];
  headline: string;
  /** True when the #1 match IS the breed the user came in wanting — celebrate, don't fake a jump. */
  alreadyHome: boolean;
  /** In alreadyHome mode: the best score of any OTHER breed (the closest challenger). */
  runnerUpScore: number | null;
}

/**
 * "The breed you thought you wanted vs. your actual match" — the free, share-worthy
 * comparison between the user's DREAM breed and their #1 match. Never names the match
 * (that stays paid).
 *
 * The HEADLINE uses the real overall fit scores (both produced by the same spread
 * function, so they're directly comparable). The per-category breakdown collapses the
 * 10 scoring dimensions into the same six buckets scoreDreamBreed() exposes, sorted
 * so the biggest gains lead. Some categories can be a trade-off (e.g. a calmer breed
 * that's less of a watchdog) — we frame those honestly rather than hiding them.
 */

// The same 6-bucket partition of the 10 scoring categories that scoreDreamBreed()
// exposes — the two sides of every row MUST be computed identically or the comparison
// is meaningless.
const BUCKETS: { label: string; parts: string[]; note: (d: number) => string }[] = [
  {
    label: "Energy & Exercise",
    parts: ["energy"],
    note: (d) => (d > 0 ? "an energy level that actually fits your days" : "a slightly different pace than you pictured"),
  },
  {
    label: "Home & Alone-Time",
    parts: ["home", "independence"],
    note: (d) => (d > 0 ? "a dog built for your space and schedule" : "a fair trade for the bigger picture"),
  },
  {
    label: "Family & Social",
    parts: ["family", "social"],
    note: (d) => (d > 0 ? "an easier fit with your whole household" : "you'd trade a little here"),
  },
  {
    label: "Care & Training",
    parts: ["training", "grooming"],
    note: (d) => (d > 0 ? "less upkeep, faster training wins" : "a small trade for everything else"),
  },
  {
    label: "Guarding & Noise",
    parts: ["protection", "noise"],
    note: (d) => (d > 0 ? "the presence and quiet you asked for" : "a small dip on this front"),
  },
  {
    label: "Temperament",
    parts: ["temperament"],
    note: (d) => (d > 0 ? "an affection style that matches yours" : "a slightly different personality than you pictured"),
  },
];

function bucketScore(categoryScores: CategoryScore[], parts: string[]): number {
  const byCat = new Map(categoryScores.map((c) => [c.category, c]));
  // Weight-normalized bucket average using the USER's weights (identical formula to
  // scoreDreamBreed's tiles), then the shared display transform — so the "best" side of
  // each row is on exactly the same scale as the "current" side and the headline scores.
  let sum = 0;
  let wsum = 0;
  for (const name of parts) {
    const c = byCat.get(name);
    sum += (c?.score ?? 50) * (c?.weight ?? 0.15);
    wsum += c?.weight ?? 0.15;
  }
  return displayFit(sum / (wsum || 1));
}

export function computeLifeChange(
  dreamBreedFit: DreamBreedScore,
  topMatchCategoryScores: CategoryScore[],
  bestTotalScore: number,
  opts?: { alreadyHome?: boolean; runnerUpScore?: number | null }
): LifeChange {
  const alreadyHome = Boolean(opts?.alreadyHome);
  const runnerUpScore = opts?.runnerUpScore ?? null;
  const currentByLabel = new Map(dreamBreedFit.categoryScores.map((c) => [c.label, c.score]));

  const categories: LifeChangeCategory[] = BUCKETS.map((b) => {
    const current = currentByLabel.get(b.label) ?? 50;
    const best = bucketScore(topMatchCategoryScores, b.parts);
    const delta = best - current;
    // A near-zero delta is a tie, not a trade — never spin a direction that isn't there.
    const note = Math.abs(delta) <= 2 ? "dead even here" : b.note(delta);
    return { label: b.label, current, best, delta, note };
  }).sort((a, b) => b.delta - a.delta); // biggest gains lead

  // Headline uses the real overall fit scores (same scale), not the bucket average.
  const currentScore = dreamBreedFit.score;
  // One breed, one number: when the #1 match IS the dream breed, both sides of the
  // comparison are the same dog and must show the same honest score.
  const bestScore = alreadyHome ? currentScore : bestTotalScore;
  const overallDelta = bestScore - currentScore;

  const topGain = categories[0];
  // Only name a "biggest leap" when a category actually leaps.
  const hasLeap = topGain.delta >= 3;
  const headline = alreadyHome
    ? `Your instinct was right — you already knew your dog.`
    : overallDelta >= 8
      ? hasLeap
        ? `Your fit jumps +${overallDelta} — biggest leap: ${topGain.label.toLowerCase()}.`
        : `Your fit jumps +${overallDelta} over the breed you had in mind.`
      : overallDelta > 0
        ? hasLeap
          ? `A real step up — especially ${topGain.label.toLowerCase()}.`
          : `A real step up from the breed you had in mind.`
        : overallDelta === 0
          ? `A dead heat on fit — the difference is in the details.`
          : `The breed you had in mind is a strong fit — but there's an even better match.`;

  return { currentScore, bestScore, overallDelta, categories, headline, alreadyHome, runnerUpScore };
}
