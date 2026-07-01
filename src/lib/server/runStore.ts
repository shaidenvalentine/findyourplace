import "server-only";
import type { ScoredRun } from "@/lib/run";
import { getSupabaseAdmin } from "@/lib/supabase/server";

/**
 * Server-side run store + unlock ledger — the paywall's source of truth.
 *
 * DURABILITY: when Supabase is configured (production), runs and unlock state persist
 * to Postgres so they survive cold starts AND are shared across every serverless
 * instance. This is what makes the gate actually hold: a Stripe/LS webhook that marks
 * a run unlocked on instance A is visible to the results request on instance B.
 *
 * The run is stored split across the columns the schema already defines:
 *   - free_json    → the FREE surface (safe to send to any client; carries creatorId)
 *   - ranking_json → LOCKED full ranking
 *   - circuit_json → LOCKED annual circuit
 * On read we reassemble the ScoredRun from those columns — no dependency on
 * re-running the (deterministic) engine, and no dependency on LOCATIONS being loaded.
 *
 * FALLBACK: with no Supabase env (local dev / preview without a DB) every function
 * degrades to an in-memory globalThis store, so the funnel still works end-to-end.
 * The in-memory maps also act as a same-instance read cache in production.
 *
 * The service-role client is used deliberately: these are trusted server-only paths
 * (route handlers), and the API layer — not RLS — enforces the free/locked gate.
 */

type Store = { runs: Map<string, ScoredRun>; unlocked: Set<string> };

const g = globalThis as unknown as { __fypStore?: Store };
const mem: Store = (g.__fypStore ??= { runs: new Map(), unlocked: new Set() });

/** Reassemble a ScoredRun from the persisted free/ranking/circuit columns. */
function joinRun(
  free: Record<string, unknown>,
  ranking: unknown,
  circuit: unknown,
): ScoredRun {
  return {
    ...(free as unknown as Omit<ScoredRun, "ranking" | "circuit">),
    ranking: (Array.isArray(ranking) ? ranking : []) as ScoredRun["ranking"],
    circuit: (circuit ?? null) as ScoredRun["circuit"],
  };
}

export async function putRun(run: ScoredRun): Promise<void> {
  mem.runs.set(run.runId, run); // same-instance cache + local-dev store

  const db = getSupabaseAdmin();
  if (!db) return;

  const { ranking, circuit, ...free } = run;
  const { error } = await db.from("onboarding_runs").upsert(
    {
      id: run.runId,
      source: run.source,
      current_city: run.currentCity || null,
      inputs_json: run.inputs ?? {},
      free_json: free,
      ranking_json: ranking,
      circuit_json: circuit,
    },
    { onConflict: "id" },
  );
  if (error) console.error("[runStore] putRun persist failed:", error.message);
}

export async function getRun(runId: string): Promise<ScoredRun | undefined> {
  if (!runId) return undefined;

  const db = getSupabaseAdmin();
  if (db) {
    const { data, error } = await db
      .from("onboarding_runs")
      .select("free_json, ranking_json, circuit_json")
      .eq("id", runId)
      .maybeSingle();
    if (error) console.error("[runStore] getRun read failed:", error.message);
    if (data?.free_json) {
      const run = joinRun(
        data.free_json as Record<string, unknown>,
        data.ranking_json,
        data.circuit_json,
      );
      mem.runs.set(runId, run);
      return run;
    }
  }

  return mem.runs.get(runId);
}

export async function isUnlocked(runId: string): Promise<boolean> {
  if (!runId) return false;
  if (mem.unlocked.has(runId)) return true;

  const db = getSupabaseAdmin();
  if (db) {
    const { data, error } = await db
      .from("unlocked_results")
      .select("run_id")
      .eq("run_id", runId)
      .maybeSingle();
    if (error) console.error("[runStore] isUnlocked read failed:", error.message);
    if (data) {
      mem.unlocked.add(runId);
      return true;
    }
  }

  return false;
}

/**
 * Called ONLY from server-verified payment confirmation (Stripe/LS webhook, or the
 * dev unlock when no rail is configured). Idempotent: upserts on run_id so webhook
 * retries never create duplicates, and records the provider reference for audit.
 */
export async function markUnlocked(
  runId: string,
  meta?: { providerRef?: string | null; amountCents?: number | null },
): Promise<void> {
  mem.unlocked.add(runId);

  const db = getSupabaseAdmin();
  if (!db) return;

  const { error } = await db.from("unlocked_results").upsert(
    {
      run_id: runId,
      stripe_session_id: meta?.providerRef ?? null,
      amount_cents: meta?.amountCents ?? null,
    },
    { onConflict: "run_id" },
  );
  if (error) console.error("[runStore] markUnlocked persist failed:", error.message);
}
