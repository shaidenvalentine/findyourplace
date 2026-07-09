import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/server";

/**
 * Admin runs browser — a read-only window over onboarding_runs + unlocked_results for
 * /admin/runs. Service-role, so it can see anonymous runs across all instances. This is
 * inherently a persisted-data view: with no Supabase configured (local dev) it returns
 * an empty list rather than reaching into the ephemeral in-memory run store.
 */

export type AdminRunRow = {
  id: string;
  source: string;
  currentCity: string | null;
  topMatch: string | null;
  topScore: number | null;
  unlocked: boolean;
  amountCents: number | null;
  createdAt: string;
};

export async function listRuns(limit = 100): Promise<AdminRunRow[]> {
  const db = getSupabaseAdmin();
  if (!db) return [];

  const { data: runs } = await db
    .from("onboarding_runs")
    .select("id, source, current_city, ranking_json, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (!runs || runs.length === 0) return [];

  const ids = runs.map((r) => r.id as string);
  const { data: unlocks } = await db
    .from("unlocked_results")
    .select("run_id, amount_cents")
    .in("run_id", ids);
  const unlockMap = new Map((unlocks ?? []).map((u) => [u.run_id as string, u.amount_cents as number | null]));

  return runs.map((r) => {
    const top = Array.isArray(r.ranking_json)
      ? (r.ranking_json[0] as { name?: string; totalScore?: number } | undefined)
      : undefined;
    return {
      id: r.id as string,
      source: (r.source as string) ?? "quiz",
      currentCity: (r.current_city as string | null) ?? null,
      topMatch: top?.name ?? null,
      topScore: typeof top?.totalScore === "number" ? Math.round(top.totalScore) : null,
      unlocked: unlockMap.has(r.id as string),
      amountCents: unlockMap.get(r.id as string) ?? null,
      createdAt: r.created_at as string,
    };
  });
}
