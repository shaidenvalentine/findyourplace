import "server-only";
import type { ScoredRun } from "@/lib/run";

/**
 * Server-side run store + unlock ledger.
 *
 * ⚠️ SUPABASE SWAP POINT (Phase 0/4). This in-memory implementation keeps the
 * architecture correct TODAY — the full ranking and unlock state live ONLY on the
 * server, so the paywall gate cannot be bypassed from the client — but it does not
 * persist across server restarts or scale across serverless instances. Replace the
 * bodies below with Supabase queries against `onboarding_runs` / `match_results`
 * (RLS: owner-scoped) and `unlocked_results` (server-verified by the Stripe webhook).
 */

type Store = { runs: Map<string, ScoredRun>; unlocked: Set<string> };

const g = globalThis as unknown as { __fypStore?: Store };
const store: Store = (g.__fypStore ??= { runs: new Map(), unlocked: new Set() });

export function putRun(run: ScoredRun): void {
  store.runs.set(run.runId, run);
}

export function getRun(runId: string): ScoredRun | undefined {
  return store.runs.get(runId);
}

export function isUnlocked(runId: string): boolean {
  return store.unlocked.has(runId);
}

/** Called ONLY from server-verified payment confirmation (Stripe webhook/verify). */
export function markUnlocked(runId: string): void {
  store.unlocked.add(runId);
}
