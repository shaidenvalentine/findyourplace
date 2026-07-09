import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { FUNNEL_STEPS, type AnalyticsEventInput, type AnalyticsEventName } from "./events";

/**
 * First-party analytics store — mirrors the CreatorStore dual pattern:
 *   - SupabaseAnalyticsStore (production): persists to analytics_events (migration 0003)
 *     and composes the admin dashboard from analytics_events + onboarding_runs +
 *     unlocked_results + email_captures via the service role.
 *   - InMemoryAnalyticsStore (dev fallback): funnel derived from recorded events only,
 *     so the whole app still runs locally with no DB.
 *
 * The aggregate `overview()` fetches events within the window and reduces in JS.
 * Volume at launch stage is low; if it ever grows, move the reduction into a Postgres
 * RPC. Counts are DISTINCT-session where a funnel-step count is meant (one visitor
 * answering three questions is one session), and raw-row where a total is meant.
 */

export type FunnelRow = { name: AnalyticsEventName; label: string; sessions: number };
export type QuizStepRow = { index: number; key: string | null; sessions: number };
export type DayRow = { date: string; quizStarts: number; completions: number; purchases: number };

export type AnalyticsOverview = {
  windowDays: number;
  funnel: FunnelRow[];
  quizSteps: QuizStepRow[];
  byDay: DayRow[];
  runs: { total: number; bySource: { source: string; count: number }[] };
  topPlaces: { name: string; count: number }[];
  revenue: { totalCents: number; unlocks: number; aovCents: number };
  emails: { total: number };
  rates: {
    startToComplete: number; // %
    completeToPaywall: number;
    paywallToPurchase: number;
    overall: number; // quiz_start → purchase
  };
};

export interface AnalyticsStore {
  record(event: AnalyticsEventInput): Promise<void>;
  overview(windowDays: number): Promise<AnalyticsOverview>;
}

function pct(numerator: number, denominator: number): number {
  if (denominator <= 0) return 0;
  return Math.round((numerator / denominator) * 1000) / 10;
}

function dayKey(iso: string): string {
  return iso.slice(0, 10);
}

// ─────────────────────────────────────────────────────────────────────────────
// Supabase — production.
// ─────────────────────────────────────────────────────────────────────────────
type EventRow = {
  name: string;
  session_id: string | null;
  step_index: number | null;
  step_key: string | null;
  created_at: string;
};

class SupabaseAnalyticsStore implements AnalyticsStore {
  constructor(private db: SupabaseClient) {}

  async record(e: AnalyticsEventInput): Promise<void> {
    const { error } = await this.db.from("analytics_events").insert({
      name: e.name,
      run_id: e.runId ?? null,
      step_key: e.stepKey ?? null,
      step_index: e.stepIndex ?? null,
      source: e.source ?? null,
      session_id: e.sessionId ?? null,
      path: e.path ?? null,
    });
    if (error) console.error("[analytics] record failed:", error.message);
  }

  async overview(windowDays: number): Promise<AnalyticsOverview> {
    const sinceIso = new Date(Date.now() - windowDays * 86_400_000).toISOString();

    const [events, runs, unlocks, emails] = await Promise.all([
      this.db
        .from("analytics_events")
        .select("name, session_id, step_index, step_key, created_at")
        .gte("created_at", sinceIso)
        .limit(100_000),
      this.db
        .from("onboarding_runs")
        .select("source, ranking_json, created_at")
        .gte("created_at", sinceIso)
        .limit(100_000),
      this.db
        .from("unlocked_results")
        .select("amount_cents, unlocked_at")
        .gte("unlocked_at", sinceIso)
        .limit(100_000),
      this.db
        .from("email_captures")
        .select("id", { count: "exact", head: true })
        .gte("created_at", sinceIso),
    ]);

    const eventRows = (events.data ?? []) as EventRow[];

    // Revenue from the unlock ledger (source of truth for ALL sales, not just
    // creator-attributed ones).
    const unlockRows = (unlocks.data ?? []) as { amount_cents: number | null }[];
    const totalCents = unlockRows.reduce((s, r) => s + (r.amount_cents ?? 0), 0);
    const unlockCount = unlockRows.length;

    // Runs by entry path + top matched places (the #1 of each run's ranking).
    const runRows = (runs.data ?? []) as { source: string | null; ranking_json: unknown }[];
    const bySource = new Map<string, number>();
    const places = new Map<string, number>();
    for (const r of runRows) {
      const src = r.source ?? "quiz";
      bySource.set(src, (bySource.get(src) ?? 0) + 1);
      const top = Array.isArray(r.ranking_json) ? (r.ranking_json[0] as { name?: string } | undefined) : undefined;
      if (top?.name) places.set(top.name, (places.get(top.name) ?? 0) + 1);
    }

    return composeOverview({
      windowDays,
      eventRows,
      totalCents,
      unlockCount,
      runsTotal: runRows.length,
      bySource: [...bySource.entries()].map(([source, count]) => ({ source, count })).sort((a, b) => b.count - a.count),
      topPlaces: [...places.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 10),
      emailTotal: emails.count ?? 0,
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// In-memory — dev fallback (lost on lambda recycle).
// ─────────────────────────────────────────────────────────────────────────────
class InMemoryAnalyticsStore implements AnalyticsStore {
  private events: (AnalyticsEventInput & { at: number })[] = [];

  async record(e: AnalyticsEventInput): Promise<void> {
    this.events.push({ ...e, at: Date.now() });
  }

  async overview(windowDays: number): Promise<AnalyticsOverview> {
    const since = Date.now() - windowDays * 86_400_000;
    const eventRows: EventRow[] = this.events
      .filter((e) => e.at >= since)
      .map((e) => ({
        name: e.name,
        session_id: e.sessionId ?? null,
        step_index: e.stepIndex ?? null,
        step_key: e.stepKey ?? null,
        created_at: new Date(e.at).toISOString(),
      }));
    return composeOverview({
      windowDays,
      eventRows,
      totalCents: 0,
      unlockCount: 0,
      runsTotal: eventRows.filter((e) => e.name === "quiz_complete").length,
      bySource: [],
      topPlaces: [],
      emailTotal: 0,
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared reduction — turns raw event rows + DB aggregates into the dashboard shape.
// ─────────────────────────────────────────────────────────────────────────────
function composeOverview(args: {
  windowDays: number;
  eventRows: EventRow[];
  totalCents: number;
  unlockCount: number;
  runsTotal: number;
  bySource: { source: string; count: number }[];
  topPlaces: { name: string; count: number }[];
  emailTotal: number;
}): AnalyticsOverview {
  const { eventRows } = args;

  // Distinct sessions per funnel event (fall back to row id when no session id).
  const sessionsByEvent = new Map<AnalyticsEventName, Set<string>>();
  // Distinct sessions reaching each quiz step index.
  const sessionsByStep = new Map<number, Set<string>>();
  const stepKeys = new Map<number, string>();
  const dayMap = new Map<string, { quizStarts: Set<string>; completions: Set<string>; purchases: Set<string> }>();

  let anon = 0;
  for (const row of eventRows) {
    const name = row.name as AnalyticsEventName;
    const sid = row.session_id ?? `anon_${anon++}`;

    if (!sessionsByEvent.has(name)) sessionsByEvent.set(name, new Set());
    sessionsByEvent.get(name)!.add(sid);

    if (name === "quiz_step" && row.step_index != null) {
      if (!sessionsByStep.has(row.step_index)) sessionsByStep.set(row.step_index, new Set());
      sessionsByStep.get(row.step_index)!.add(sid);
      if (row.step_key) stepKeys.set(row.step_index, row.step_key);
    }

    const day = dayKey(row.created_at);
    if (!dayMap.has(day)) dayMap.set(day, { quizStarts: new Set(), completions: new Set(), purchases: new Set() });
    const bucket = dayMap.get(day)!;
    if (name === "quiz_start") bucket.quizStarts.add(sid);
    else if (name === "quiz_complete") bucket.completions.add(sid);
    else if (name === "purchase") bucket.purchases.add(sid);
  }

  const funnel: FunnelRow[] = FUNNEL_STEPS.map((s) => ({
    name: s.name,
    label: s.label,
    sessions: sessionsByEvent.get(s.name)?.size ?? 0,
  }));

  const quizSteps: QuizStepRow[] = [...sessionsByStep.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([index, set]) => ({ index, key: stepKeys.get(index) ?? null, sessions: set.size }));

  const byDay: DayRow[] = [...dayMap.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, b]) => ({
      date,
      quizStarts: b.quizStarts.size,
      completions: b.completions.size,
      purchases: b.purchases.size,
    }));

  const starts = sessionsByEvent.get("quiz_start")?.size ?? 0;
  const completes = sessionsByEvent.get("quiz_complete")?.size ?? 0;
  const paywalls = sessionsByEvent.get("paywall_view")?.size ?? 0;
  const purchases = sessionsByEvent.get("purchase")?.size ?? 0;

  return {
    windowDays: args.windowDays,
    funnel,
    quizSteps,
    byDay,
    runs: { total: args.runsTotal, bySource: args.bySource },
    topPlaces: args.topPlaces,
    revenue: {
      totalCents: args.totalCents,
      unlocks: args.unlockCount,
      aovCents: args.unlockCount > 0 ? Math.round(args.totalCents / args.unlockCount) : 0,
    },
    emails: { total: args.emailTotal },
    rates: {
      startToComplete: pct(completes, starts),
      completeToPaywall: pct(paywalls, completes),
      paywallToPurchase: pct(purchases, paywalls),
      overall: pct(purchases, starts),
    },
  };
}

// Singleton per process — Supabase when service-role env is present, else in-memory.
const g = globalThis as unknown as { __fypAnalyticsStore?: AnalyticsStore };
export function getAnalyticsStore(): AnalyticsStore {
  if (!g.__fypAnalyticsStore) {
    const db = getSupabaseAdmin();
    g.__fypAnalyticsStore = db ? new SupabaseAnalyticsStore(db) : new InMemoryAnalyticsStore();
  }
  return g.__fypAnalyticsStore;
}
