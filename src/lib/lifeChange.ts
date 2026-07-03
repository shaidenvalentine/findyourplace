import type { CategoryScore, CurrentCityScore } from "@/lib/scoring";
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
  /** True when the #1 match IS the user's current city — celebrate, don't fake a jump. */
  alreadyHome: boolean;
  /** In alreadyHome mode: the best score anywhere ELSE on Earth (the closest challenger). */
  runnerUpScore: number | null;
}

/**
 * "How your life could change" — the free, share-worthy comparison between the user's
 * CURRENT city and their #1 match. Never names the place (that stays paid).
 *
 * The HEADLINE uses the real overall fit scores (both produced by the same spread
 * function, so they're directly comparable). The per-category breakdown collapses the
 * 10 scoring dimensions into the same four buckets scoreCurrentCity() exposes, sorted
 * so the biggest gains lead. Some categories can be a trade-off (e.g. leaving a big
 * city for a cheaper coastal town) — we frame those honestly rather than hiding them.
 */

// The same 6-bucket partition of the 10 scoring categories that scoreCurrentCity()
// exposes — the two sides of every row MUST be computed identically or the comparison
// is meaningless.
const BUCKETS: { label: string; parts: string[]; note: (d: number) => string }[] = [
  {
    label: "Cost & Value",
    parts: ["cost"],
    note: (d) => (d > 0 ? "your money goes a lot further" : "you'd pay a bit more for what you get"),
  },
  {
    label: "Lifestyle Fit",
    parts: ["lifestyle", "wellness"],
    note: (d) => (d > 0 ? "days that actually feel like you" : "a fair trade for the bigger picture"),
  },
  {
    label: "Community Fit",
    parts: ["community", "culture"],
    note: (d) => (d > 0 ? "you'll find your people faster" : "you'd trade a little of your current scene"),
  },
  {
    label: "Nature & Environment",
    parts: ["nature", "climate"],
    note: (d) => (d > 0 ? "the outdoors at your door" : "a small trade for everything else"),
  },
  {
    label: "Safety & Stability",
    parts: ["safety"],
    note: (d) => (d > 0 ? "more peace of mind, day to day" : "a small dip in how secure things feel"),
  },
  {
    label: "Career & Opportunity",
    parts: ["career", "travel"],
    note: (d) => (d > 0 ? "a bigger stage for your work" : "a fair trade for fit and cost"),
  },
];

function bucketScore(categoryScores: CategoryScore[], parts: string[]): number {
  const byCat = new Map(categoryScores.map((c) => [c.category, c]));
  // Weight-normalized bucket average using the USER's weights (identical formula to
  // scoreCurrentCity's tiles), then the shared display transform — so the "best" side of
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
  currentCityFit: CurrentCityScore,
  topMatchCategoryScores: CategoryScore[],
  bestTotalScore: number,
  opts?: { alreadyHome?: boolean; runnerUpScore?: number | null }
): LifeChange {
  const alreadyHome = Boolean(opts?.alreadyHome);
  const runnerUpScore = opts?.runnerUpScore ?? null;
  const currentByLabel = new Map(currentCityFit.categoryScores.map((c) => [c.label, c.score]));

  const categories: LifeChangeCategory[] = BUCKETS.map((b) => {
    const current = currentByLabel.get(b.label) ?? 50;
    const best = bucketScore(topMatchCategoryScores, b.parts);
    const delta = best - current;
    // A near-zero delta is a tie, not a trade — never spin a direction that isn't there.
    const note = Math.abs(delta) <= 2 ? "dead even here" : b.note(delta);
    return { label: b.label, current, best, delta, note };
  }).sort((a, b) => b.delta - a.delta); // biggest gains lead

  // Headline uses the real overall fit scores (same scale), not the bucket average.
  const currentScore = currentCityFit.score;
  // One place, one number: when the #1 match IS the current city, both sides of the
  // comparison are the same city and must show the same honest score.
  const bestScore = alreadyHome ? currentScore : bestTotalScore;
  const overallDelta = bestScore - currentScore;

  const topGain = categories[0];
  // Only name a "biggest leap" when a category actually leaps.
  const hasLeap = topGain.delta >= 3;
  const headline = alreadyHome
    ? `You might already be living in your place.`
    : overallDelta >= 8
      ? hasLeap
        ? `Your fit jumps +${overallDelta} — biggest leap: ${topGain.label.toLowerCase()}.`
        : `Your fit jumps +${overallDelta} over where you are now.`
      : overallDelta > 0
        ? hasLeap
          ? `A real step up — especially ${topGain.label.toLowerCase()}.`
          : `A real step up from where you are now.`
        : overallDelta === 0
          ? `A dead heat on fit — the difference is in the details.`
          : `You're already in a strong-fit city — but there's an even better match.`;

  return { currentScore, bestScore, overallDelta, categories, headline, alreadyHome, runnerUpScore };
}
