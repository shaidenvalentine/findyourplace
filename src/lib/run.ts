import type { MatchResult, CurrentCityScore } from "@/lib/scoring";
import type { AnnualCircuit } from "@/lib/circuitGenerator";
import type { LifeChange } from "@/lib/lifeChange";
import type { OnboardingData } from "@/types/onboarding";

/** A fully scored run. The FREE surface uses everything except the locked fields. */
export interface ScoredRun {
  runId: string;
  createdAt: number;
  currentCity: string;
  inputs: OnboardingData;
  source: "quiz" | "ai-profile";
  personality: PersonalityRead;
  currentCityFit: CurrentCityScore;
  /** Category bars for the user's profile (averaged across the top matches). */
  categoryAverages: { label: string; score: number }[];
  /** Current city vs #1 match — the free "how your life could change" comparison. */
  lifeChange: LifeChange;
  /** The locked #1 tease — shape of the answer, never the name (free surface). */
  topTease: {
    score: number;
    continent: string;
    region: string | null;
  };
  /** Full ranking — gated. The results page only sends this to unlocked clients. */
  ranking: RankedPlace[];
  circuit: AnnualCircuit | null;
  topCount: number;
}

export interface RankedPlace {
  rank: number;
  id: string;
  name: string;
  country: string;
  continent: string;
  region: string | null;
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
 * (personality, category bars, current-city fit) and teases the #1 match's SHAPE
 * (score, continent, region) without ever naming it. The locked fields
 * (`ranking`, `circuit`, the #1 name) live only on the server until unlocked.
 */
export type FreeRun = Omit<ScoredRun, "ranking" | "circuit">;

export function toFreeRun(run: ScoredRun): FreeRun {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ranking, circuit, ...free } = run;
  return free;
}

export function toRankedPlace(r: MatchResult): RankedPlace {
  return {
    rank: r.rank,
    id: r.location.id,
    name: r.location.name,
    country: r.location.country,
    continent: r.location.continent,
    region: r.location.region,
    totalScore: r.totalScore,
    reasons: r.reasons,
    tradeoffs: r.tradeoffs,
    categoryScores: r.categoryScores.map((c) => ({ category: c.category, label: c.label, score: Math.round(c.score) })),
  };
}

const STORAGE_PREFIX = "fyp:run:";

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
