import type { CategoryScore, CurrentCityScore } from "@/lib/scoring";

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

const BUCKETS: { label: string; parts: { category: string; weight: number }[]; note: (d: number) => string }[] = [
  {
    label: "Lifestyle Fit",
    parts: [
      { category: "lifestyle", weight: 0.5 },
      { category: "wellness", weight: 0.5 },
    ],
    note: (d) => (d > 0 ? "days that actually feel like you" : "a fair trade for the bigger picture"),
  },
  {
    label: "Community Fit",
    parts: [
      { category: "community", weight: 0.6 },
      { category: "culture", weight: 0.4 },
    ],
    note: (d) => (d > 0 ? "you'll find your people faster" : "you'd trade a little of your current scene"),
  },
  {
    label: "Nature & Environment",
    parts: [
      { category: "nature", weight: 0.6 },
      { category: "climate", weight: 0.4 },
    ],
    note: (d) => (d > 0 ? "the outdoors at your door" : "a small trade for everything else"),
  },
  {
    label: "Career & Opportunity",
    parts: [
      { category: "career", weight: 0.7 },
      { category: "travel", weight: 0.3 },
    ],
    note: (d) => (d > 0 ? "a bigger stage for your work" : "a fair trade for fit and cost"),
  },
];

function bucketScore(categoryScores: CategoryScore[], parts: { category: string; weight: number }[]): number {
  const byCat = new Map(categoryScores.map((c) => [c.category, c.score]));
  return Math.round(parts.reduce((sum, p) => sum + (byCat.get(p.category) ?? 50) * p.weight, 0));
}

export function computeLifeChange(
  currentCityFit: CurrentCityScore,
  topMatchCategoryScores: CategoryScore[],
  bestTotalScore: number
): LifeChange {
  const currentByLabel = new Map(currentCityFit.categoryScores.map((c) => [c.label, c.score]));

  const categories: LifeChangeCategory[] = BUCKETS.map((b) => {
    const current = currentByLabel.get(b.label) ?? 50;
    const best = bucketScore(topMatchCategoryScores, b.parts);
    const delta = best - current;
    return { label: b.label, current, best, delta, note: b.note(delta) };
  }).sort((a, b) => b.delta - a.delta); // biggest gains lead

  // Headline uses the real overall fit scores (same scale), not the bucket average.
  const currentScore = currentCityFit.score;
  const bestScore = bestTotalScore;
  const overallDelta = bestScore - currentScore;

  const topGain = categories[0];
  const headline =
    overallDelta >= 8
      ? `Your fit jumps +${overallDelta} — biggest leap: ${topGain.label.toLowerCase()}.`
      : overallDelta > 0
        ? `A real step up — especially ${topGain.label.toLowerCase()}.`
        : `You're already in a strong-fit city — but there's an even better match.`;

  return { currentScore, bestScore, overallDelta, categories, headline };
}
