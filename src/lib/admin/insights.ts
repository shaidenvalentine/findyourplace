import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/server";

/**
 * Admin business insights — read-only, service-role views over the funnel's persisted
 * data (onboarding_runs + unlocked_results + email_captures) for the operator portal.
 * Everything degrades to empty/zero without Supabase so the pages render in dev.
 *
 * These are aggregate operator views, not user-facing data — the API layer + admin auth
 * gate them; no RLS change is made or needed.
 */

const DAY = 86_400_000;

export type RevenueSummary = {
  configured: boolean;
  totalCents: number;
  todayCents: number;
  d7Cents: number;
  d30Cents: number;
  unlocksTotal: number;
  unlocks7: number;
  unlocks30: number;
  aovCents: number;
  runsTotal: number;
  runs30: number;
  leadsTotal: number;
  buyRate30: number; // unlocks30 / runs30, %
};

export async function revenueSummary(): Promise<RevenueSummary> {
  const db = getSupabaseAdmin();
  const empty: RevenueSummary = {
    configured: false,
    totalCents: 0, todayCents: 0, d7Cents: 0, d30Cents: 0,
    unlocksTotal: 0, unlocks7: 0, unlocks30: 0, aovCents: 0,
    runsTotal: 0, runs30: 0, leadsTotal: 0, buyRate30: 0,
  };
  if (!db) return empty;

  const now = Date.now();
  const startToday = new Date(new Date().toISOString().slice(0, 10)).getTime();
  const [{ data: unlocks }, { count: runsTotal }, { count: runs30 }, { count: leadsTotal }] = await Promise.all([
    db.from("unlocked_results").select("amount_cents, unlocked_at").limit(100_000),
    db.from("onboarding_runs").select("id", { count: "exact", head: true }),
    db.from("onboarding_runs").select("id", { count: "exact", head: true }).gte("created_at", new Date(now - 30 * DAY).toISOString()),
    db.from("email_captures").select("id", { count: "exact", head: true }),
  ]);

  let totalCents = 0, todayCents = 0, d7Cents = 0, d30Cents = 0, unlocks7 = 0, unlocks30 = 0;
  const rows = (unlocks ?? []) as { amount_cents: number | null; unlocked_at: string }[];
  for (const r of rows) {
    const cents = r.amount_cents ?? 0;
    const t = Date.parse(r.unlocked_at);
    totalCents += cents;
    if (t >= startToday) todayCents += cents;
    if (t >= now - 7 * DAY) { d7Cents += cents; unlocks7 += 1; }
    if (t >= now - 30 * DAY) { d30Cents += cents; unlocks30 += 1; }
  }
  const unlocksTotal = rows.length;

  return {
    configured: true,
    totalCents, todayCents, d7Cents, d30Cents,
    unlocksTotal, unlocks7, unlocks30,
    aovCents: unlocksTotal > 0 ? Math.round(totalCents / unlocksTotal) : 0,
    runsTotal: runsTotal ?? 0,
    runs30: runs30 ?? 0,
    leadsTotal: leadsTotal ?? 0,
    buyRate30: (runs30 ?? 0) > 0 ? Math.round((unlocks30 / (runs30 ?? 1)) * 1000) / 10 : 0,
  };
}

export type Buyer = {
  runId: string;
  email: string | null;
  amountCents: number | null;
  topMatch: string | null;
  unlockedAt: string;
};

export async function listBuyers(limit = 100): Promise<Buyer[]> {
  const db = getSupabaseAdmin();
  if (!db) return [];
  const { data: unlocks } = await db
    .from("unlocked_results")
    .select("run_id, amount_cents, unlocked_at")
    .order("unlocked_at", { ascending: false })
    .limit(limit);
  if (!unlocks || unlocks.length === 0) return [];

  const ids = unlocks.map((u) => u.run_id as string);
  const [{ data: runs }, { data: emails }] = await Promise.all([
    db.from("onboarding_runs").select("id, ranking_json").in("id", ids),
    db.from("email_captures").select("run_id, email, created_at").in("run_id", ids),
  ]);
  const topById = new Map(
    (runs ?? []).map((r) => {
      const top = Array.isArray(r.ranking_json) ? (r.ranking_json[0] as { name?: string } | undefined) : undefined;
      return [r.id as string, top?.name ?? null];
    }),
  );
  // Latest email captured for each run.
  const emailById = new Map<string, string>();
  for (const e of (emails ?? []).sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at))) {
    if (e.run_id && e.email) emailById.set(e.run_id as string, e.email as string);
  }

  return unlocks.map((u) => ({
    runId: u.run_id as string,
    email: emailById.get(u.run_id as string) ?? null,
    amountCents: (u.amount_cents as number | null) ?? null,
    topMatch: topById.get(u.run_id as string) ?? null,
    unlockedAt: u.unlocked_at as string,
  }));
}

export type Lead = { email: string; runId: string | null; stage: string | null; createdAt: string; bought: boolean };

export async function listLeads(limit = 500): Promise<Lead[]> {
  const db = getSupabaseAdmin();
  if (!db) return [];
  const { data: caps } = await db
    .from("email_captures")
    .select("email, run_id, stage, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (!caps || caps.length === 0) return [];

  const runIds = caps.map((c) => c.run_id).filter(Boolean) as string[];
  const boughtRuns = new Set<string>();
  if (runIds.length) {
    const { data: unlocks } = await db.from("unlocked_results").select("run_id").in("run_id", runIds);
    for (const u of unlocks ?? []) boughtRuns.add(u.run_id as string);
  }

  // De-dup by email, keeping the most recent capture (list is already newest-first).
  const seen = new Set<string>();
  const out: Lead[] = [];
  for (const c of caps) {
    const email = (c.email as string).toLowerCase();
    if (seen.has(email)) continue;
    seen.add(email);
    out.push({
      email: c.email as string,
      runId: (c.run_id as string | null) ?? null,
      stage: (c.stage as string | null) ?? null,
      createdAt: c.created_at as string,
      bought: c.run_id ? boughtRuns.has(c.run_id as string) : false,
    });
  }
  return out;
}

export type ActivityItem = { kind: "purchase" | "lead" | "run"; label: string; detail: string; at: string };

export async function activityFeed(limit = 20): Promise<ActivityItem[]> {
  const db = getSupabaseAdmin();
  if (!db) return [];
  const [{ data: unlocks }, { data: caps }, { data: runs }] = await Promise.all([
    db.from("unlocked_results").select("run_id, amount_cents, unlocked_at").order("unlocked_at", { ascending: false }).limit(limit),
    db.from("email_captures").select("email, stage, created_at").order("created_at", { ascending: false }).limit(limit),
    db.from("onboarding_runs").select("source, current_city, created_at").order("created_at", { ascending: false }).limit(limit),
  ]);

  const items: ActivityItem[] = [];
  for (const u of unlocks ?? [])
    items.push({ kind: "purchase", label: "Purchase", detail: u.amount_cents ? `$${((u.amount_cents as number) / 100).toFixed(0)} unlock` : "Unlock", at: u.unlocked_at as string });
  for (const c of caps ?? [])
    items.push({ kind: "lead", label: "Email captured", detail: `${c.email}${c.stage ? ` · ${c.stage}` : ""}`, at: c.created_at as string });
  for (const r of runs ?? [])
    items.push({ kind: "run", label: "New run", detail: `${r.source ?? "quiz"}${r.current_city ? ` · ${r.current_city}` : ""}`, at: r.created_at as string });

  return items.sort((a, b) => Date.parse(b.at) - Date.parse(a.at)).slice(0, limit);
}
