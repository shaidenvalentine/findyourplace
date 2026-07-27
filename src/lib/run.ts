import type { MatchResult, DreamBreedScore } from "@/lib/scoring";
import { displayFit } from "@/lib/match/engine";
import type { AdoptionPlan } from "@/lib/adoptionPlan";
import type { LifeChange } from "@/lib/lifeChange";
import type { CostComparison } from "@/lib/cost";
import type { OnboardingData } from "@/types/onboarding";

/** How the run was created — used for analytics/attribution, never for gating. */
export type RunSource = "quiz" | "ai-profile" | "words";

/** A fully scored run. The FREE surface uses everything except the locked fields. */
export interface ScoredRun {
  runId: string;
  createdAt: number;
  /** Where the user lives — powers the local adoption layer, shown on free surface. */
  currentCity: string;
  /** The breed the user came in wanting (free-text, as typed). */
  dreamBreed: string;
  inputs: OnboardingData;
  source: RunSource;
  /** Creator who referred this run (attribution cookie). Set when run is created. */
  creatorId?: string | null;
  personality: PersonalityRead;
  /** Honest fit score for the breed they thought they wanted — the trust-builder. */
  dreamBreedFit: DreamBreedScore;
  /** Category bars for the user's profile (averaged across the top matches). */
  categoryAverages: { label: string; score: number }[];
  /** Dream breed vs #1 match — the free "what you'd actually get" comparison. */
  lifeChange: LifeChange;
  /** 0–100 match confidence; climbs as the user answers the deeper quiz. */
  confidence: number;
  /** Cost-of-ownership estimate for the #1 match (numbers only — no breed name). */
  costComparison: CostComparison | null;
  /** The locked #1 tease — shape of the answer, never the name (free surface). */
  topTease: {
    score: number;
    group: string;
    size: string;
  };
  /** Full ranking — gated. The results page only sends this to unlocked clients. */
  ranking: RankedBreed[];
  /** Where to actually get this dog (shelter-first) — gated with the ranking. */
  adoptionPlan: AdoptionPlan | null;
  topCount: number;
}

export interface RankedBreed {
  rank: number;
  id: string;
  name: string;
  group: string;
  size: string;
  totalScore: number;
  reasons: string[];
  tradeoffs: string[];
  categoryScores: { category: string; label: string; score: number }[];
}

export interface PersonalityRead {
  archetype: string;
  blurb: string;
  traits: string[];
}

/**
 * The FREE surface — safe to send to any client. It proves the engine is smart
 * (owner profile, category bars, dream-breed fit) and teases the #1 match's SHAPE
 * (score, breed group, size) without ever naming it. The locked fields
 * (`ranking`, `adoptionPlan`, the #1 name) live only on the server until unlocked.
 */
export type FreeRun = Omit<ScoredRun, "ranking" | "adoptionPlan">;

export function toFreeRun(run: ScoredRun): FreeRun {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ranking, adoptionPlan, ...free } = run;
  return free;
}

export function toRankedBreed(r: MatchResult): RankedBreed {
  return {
    rank: r.rank,
    id: r.breed.id,
    name: r.breed.name,
    group: r.breed.group,
    size: r.breed.size,
    // The DISPLAYED score uses the same honest formula as the dream-breed fit, so the
    // bucket breakdown and the headline number tell the same story. Rank order is still
    // based on the alignment-bonused score internally.
    totalScore: r.displayScore,
    reasons: r.reasons,
    tradeoffs: r.tradeoffs,
    // Display scale (same transform as every other user-visible fit number).
    categoryScores: r.categoryScores.map((c) => ({ category: c.category, label: c.label, score: displayFit(c.score) })),
  };
}

const STORAGE_PREFIX = "fyd:run:";

/** Caches the FREE surface client-side for instant results render (non-sensitive). */
export function saveRunLocal(run: FreeRun) {
  try {
    sessionStorage.setItem(STORAGE_PREFIX + run.runId, JSON.stringify(run));
  } catch {
    /* ignore quota / private mode */
  }
}

export function loadRunLocal(runId: string): FreeRun | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_PREFIX + runId);
    return raw ? (JSON.parse(raw) as FreeRun) : null;
  } catch {
    return null;
  }
}
