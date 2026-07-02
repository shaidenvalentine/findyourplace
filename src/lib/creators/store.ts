import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Creator, CreatorClick, CreatorConversion, CreatorPayout, CreatorStats } from "./types";

/**
 * Creator data store — abstract interface with two implementations:
 *
 * - SupabaseCreatorStore (production): persists to the migration-0002 tables via the
 *   service-role client, so clicks/conversions/payouts — including revenue attribution
 *   written by the Stripe/LS webhooks — survive redeploys and are shared across
 *   serverless instances. Same pattern as lib/server/runStore.
 * - InMemoryCreatorStore (dev fallback): lets the whole portal run locally with no DB.
 *
 * All routes consume this interface; the factory picks the right one from env.
 */
export interface CreatorStore {
  // Creators
  upsertCreator(c: Creator): Promise<Creator>;
  getCreatorById(id: string): Promise<Creator | null>;
  getCreatorByCode(code: string): Promise<Creator | null>;
  getCreatorByUserId(userId: string): Promise<Creator | null>;
  listCreators(): Promise<Creator[]>;
  updateCreator(id: string, patch: Partial<Creator>): Promise<Creator | null>;

  // Clicks
  recordClick(click: Omit<CreatorClick, "id" | "createdAt">): Promise<void>;
  countClicks(creatorId: string, since?: number): Promise<number>;
  clicksByDay(creatorId: string, sinceDays: number): Promise<{ date: string; clicks: number }[]>;

  // Conversions
  recordConversion(conv: Omit<CreatorConversion, "id" | "createdAt">): Promise<CreatorConversion | null>;
  getConversionByStripeSession(stripeSessionId: string): Promise<CreatorConversion | null>;
  listConversions(creatorId: string, limit?: number): Promise<CreatorConversion[]>;
  countConversions(creatorId: string, since?: number): Promise<number>;
  sumCreatorCut(creatorId: string, status?: "pending" | "paid"): Promise<number>;
  conversionsByDay(creatorId: string, sinceDays: number): Promise<{ date: string; conversions: number; earningsCents: number }[]>;

  // Payouts
  listPayouts(creatorId: string): Promise<CreatorPayout[]>;

  // Stats helper (composes the above)
  getStats(creatorId: string): Promise<CreatorStats>;

  // ── ADMIN-ONLY queries (cross-creator views) ────────────────────────────────
  listAllConversions(limit?: number): Promise<CreatorConversion[]>;
  listPendingByCreator(): Promise<{ creator: Creator; pendingCents: number; pendingCount: number }[]>;
  getGlobalStats(): Promise<{
    totalRevenueCents: number;
    totalCreatorCutCents: number;
    last30RevenueCents: number;
    last30Conversions: number;
    creatorCount: number;
    activeCreatorCount: number;
    pendingPayoutCents: number;
  }>;
  markConversionsPaid(creatorId: string, conversionIds: string[], payoutId: string): Promise<number>;
  createPayout(payout: Omit<CreatorPayout, "id" | "createdAt">): Promise<CreatorPayout>;
}

/** Dashboard stats composed from the primitive queries — shared by both stores. */
async function composeStats(store: CreatorStore, creatorId: string): Promise<CreatorStats> {
  const since30 = Date.now() - 30 * 86_400_000;
  const clicks30 = await store.countClicks(creatorId, since30);
  const conv30 = await store.countConversions(creatorId, since30);
  const totalCut = await store.sumCreatorCut(creatorId);
  const paidCut = await store.sumCreatorCut(creatorId, "paid");
  const pendingCut = await store.sumCreatorCut(creatorId, "pending");
  const lifetimeClicks = await store.countClicks(creatorId);
  const lifetimeConv = await store.countConversions(creatorId);
  const recent = await store.listConversions(creatorId, 10);
  const conversionRatePct = lifetimeClicks ? (lifetimeConv / lifetimeClicks) * 100 : 0;
  const clicksByDay = await store.clicksByDay(creatorId, 30);
  const convByDay = await store.conversionsByDay(creatorId, 30);
  const dayMap = new Map<string, { clicks: number; conversions: number }>();
  for (const d of clicksByDay) dayMap.set(d.date, { clicks: d.clicks, conversions: 0 });
  for (const d of convByDay) {
    const cur = dayMap.get(d.date) ?? { clicks: 0, conversions: 0 };
    cur.conversions = d.conversions;
    dayMap.set(d.date, cur);
  }
  const byDay = Array.from(dayMap, ([date, v]) => ({ date, ...v })).sort((a, b) => a.date.localeCompare(b.date));
  const last30EarningsCents = convByDay.reduce((s, d) => s + d.earningsCents, 0);
  return {
    totalEarningsCents: totalCut,
    pendingEarningsCents: pendingCut,
    paidEarningsCents: paidCut,
    lifetimeClicks,
    lifetimeConversions: lifetimeConv,
    conversionRatePct: Math.round(conversionRatePct * 100) / 100,
    last30: { clicks: clicks30, conversions: conv30, earningsCents: last30EarningsCents, byDay },
    recentConversions: recent,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Supabase implementation — production. Row ↔ model mappers keep snake_case in SQL
// and camelCase in the app.
// ─────────────────────────────────────────────────────────────────────────────

/* eslint-disable @typescript-eslint/no-explicit-any */
function rowToCreator(r: any): Creator {
  return {
    id: r.id,
    userId: r.user_id ?? null,
    code: r.code,
    displayName: r.display_name,
    email: r.email,
    bio: r.bio ?? null,
    instagramHandle: r.instagram_handle ?? null,
    tiktokHandle: r.tiktok_handle ?? null,
    youtubeHandle: r.youtube_handle ?? null,
    twitterHandle: r.twitter_handle ?? null,
    website: r.website ?? null,
    payoutEmail: r.payout_email ?? null,
    revSharePct: r.rev_share_pct,
    status: r.status,
    approved: r.approved,
    createdAt: Date.parse(r.created_at),
  };
}

function creatorToRow(c: Partial<Creator>): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  if (c.id !== undefined) row.id = c.id;
  if (c.userId !== undefined) row.user_id = c.userId;
  if (c.code !== undefined) row.code = c.code;
  if (c.displayName !== undefined) row.display_name = c.displayName;
  if (c.email !== undefined) row.email = c.email;
  if (c.bio !== undefined) row.bio = c.bio;
  if (c.instagramHandle !== undefined) row.instagram_handle = c.instagramHandle;
  if (c.tiktokHandle !== undefined) row.tiktok_handle = c.tiktokHandle;
  if (c.youtubeHandle !== undefined) row.youtube_handle = c.youtubeHandle;
  if (c.twitterHandle !== undefined) row.twitter_handle = c.twitterHandle;
  if (c.website !== undefined) row.website = c.website;
  if (c.payoutEmail !== undefined) row.payout_email = c.payoutEmail;
  if (c.revSharePct !== undefined) row.rev_share_pct = c.revSharePct;
  if (c.status !== undefined) row.status = c.status;
  if (c.approved !== undefined) row.approved = c.approved;
  return row;
}

function rowToConversion(r: any): CreatorConversion {
  return {
    id: r.id,
    creatorId: r.creator_id,
    runId: r.run_id ?? null,
    stripeSessionId: r.stripe_session_id ?? null,
    email: r.email ?? null,
    amountCents: r.amount_cents,
    creatorCutCents: r.creator_cut_cents,
    status: r.status,
    paidInPayoutId: r.paid_in_payout_id ?? null,
    createdAt: Date.parse(r.created_at),
  };
}

function rowToPayout(r: any): CreatorPayout {
  return {
    id: r.id,
    creatorId: r.creator_id,
    periodStart: r.period_start,
    periodEnd: r.period_end,
    totalCents: r.total_cents,
    conversionCount: r.conversion_count,
    status: r.status,
    paidAt: r.paid_at ? Date.parse(r.paid_at) : null,
    payoutMethod: r.payout_method ?? null,
    reference: r.reference ?? null,
    notes: r.notes ?? null,
    createdAt: Date.parse(r.created_at),
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

function bucketByDay<T>(rows: T[], at: (r: T) => number): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const r of rows) {
    const day = new Date(at(r)).toISOString().slice(0, 10);
    const arr = map.get(day) ?? [];
    arr.push(r);
    map.set(day, arr);
  }
  return map;
}

class SupabaseCreatorStore implements CreatorStore {
  constructor(private db: SupabaseClient) {}

  async upsertCreator(c: Creator): Promise<Creator> {
    const { data, error } = await this.db
      .from("creators")
      .upsert(creatorToRow(c), { onConflict: "id" })
      .select()
      .single();
    if (error || !data) throw new Error(`creator upsert failed: ${error?.message}`);
    return rowToCreator(data);
  }

  async getCreatorById(id: string): Promise<Creator | null> {
    const { data } = await this.db.from("creators").select().eq("id", id).maybeSingle();
    return data ? rowToCreator(data) : null;
  }

  async getCreatorByCode(code: string): Promise<Creator | null> {
    const { data } = await this.db.from("creators").select().eq("code", code).maybeSingle();
    return data ? rowToCreator(data) : null;
  }

  async getCreatorByUserId(userId: string): Promise<Creator | null> {
    const { data } = await this.db.from("creators").select().eq("user_id", userId).maybeSingle();
    return data ? rowToCreator(data) : null;
  }

  async listCreators(): Promise<Creator[]> {
    const { data } = await this.db.from("creators").select().order("created_at", { ascending: false });
    return (data ?? []).map(rowToCreator);
  }

  async updateCreator(id: string, patch: Partial<Creator>): Promise<Creator | null> {
    const row = creatorToRow(patch);
    delete row.id; // never move the primary key
    const { data, error } = await this.db.from("creators").update(row).eq("id", id).select().maybeSingle();
    if (error) return null;
    return data ? rowToCreator(data) : null;
  }

  async recordClick(click: Omit<CreatorClick, "id" | "createdAt">): Promise<void> {
    await this.db.from("creator_clicks").insert({
      creator_id: click.creatorId,
      source: click.source,
      referrer: click.referrer ?? null,
    });
  }

  async countClicks(creatorId: string, since?: number): Promise<number> {
    let q = this.db.from("creator_clicks").select("id", { count: "exact", head: true }).eq("creator_id", creatorId);
    if (since) q = q.gte("created_at", new Date(since).toISOString());
    const { count } = await q;
    return count ?? 0;
  }

  async clicksByDay(creatorId: string, sinceDays: number) {
    const since = new Date(Date.now() - sinceDays * 86_400_000).toISOString();
    const { data } = await this.db
      .from("creator_clicks")
      .select("created_at")
      .eq("creator_id", creatorId)
      .gte("created_at", since);
    const buckets = bucketByDay(data ?? [], (r) => Date.parse(r.created_at));
    return Array.from(buckets, ([date, rows]) => ({ date, clicks: rows.length })).sort((a, b) =>
      a.date.localeCompare(b.date),
    );
  }

  async recordConversion(conv: Omit<CreatorConversion, "id" | "createdAt">): Promise<CreatorConversion | null> {
    const { data, error } = await this.db
      .from("creator_conversions")
      .insert({
        creator_id: conv.creatorId,
        run_id: conv.runId,
        stripe_session_id: conv.stripeSessionId ?? null,
        email: conv.email ?? null,
        amount_cents: conv.amountCents,
        creator_cut_cents: conv.creatorCutCents,
        status: conv.status,
        paid_in_payout_id: conv.paidInPayoutId ?? null,
      })
      .select()
      .single();
    // Unique violation on stripe_session_id = webhook retry → idempotent no-op.
    if (error) return null;
    return rowToConversion(data);
  }

  async getConversionByStripeSession(stripeSessionId: string): Promise<CreatorConversion | null> {
    const { data } = await this.db
      .from("creator_conversions")
      .select()
      .eq("stripe_session_id", stripeSessionId)
      .maybeSingle();
    return data ? rowToConversion(data) : null;
  }

  async listConversions(creatorId: string, limit = 50): Promise<CreatorConversion[]> {
    const { data } = await this.db
      .from("creator_conversions")
      .select()
      .eq("creator_id", creatorId)
      .order("created_at", { ascending: false })
      .limit(limit);
    return (data ?? []).map(rowToConversion);
  }

  async countConversions(creatorId: string, since?: number): Promise<number> {
    let q = this.db
      .from("creator_conversions")
      .select("id", { count: "exact", head: true })
      .eq("creator_id", creatorId);
    if (since) q = q.gte("created_at", new Date(since).toISOString());
    const { count } = await q;
    return count ?? 0;
  }

  async sumCreatorCut(creatorId: string, status?: "pending" | "paid"): Promise<number> {
    let q = this.db
      .from("creator_conversions")
      .select("creator_cut_cents,status")
      .eq("creator_id", creatorId)
      .neq("status", "refunded");
    if (status) q = q.eq("status", status);
    const { data } = await q;
    return (data ?? []).reduce((s, r) => s + (r.creator_cut_cents ?? 0), 0);
  }

  async conversionsByDay(creatorId: string, sinceDays: number) {
    const since = new Date(Date.now() - sinceDays * 86_400_000).toISOString();
    const { data } = await this.db
      .from("creator_conversions")
      .select("created_at,creator_cut_cents,status")
      .eq("creator_id", creatorId)
      .neq("status", "refunded")
      .gte("created_at", since);
    const buckets = bucketByDay(data ?? [], (r) => Date.parse(r.created_at));
    return Array.from(buckets, ([date, rows]) => ({
      date,
      conversions: rows.length,
      earningsCents: rows.reduce((s, r) => s + (r.creator_cut_cents ?? 0), 0),
    })).sort((a, b) => a.date.localeCompare(b.date));
  }

  async listPayouts(creatorId: string): Promise<CreatorPayout[]> {
    const { data } = await this.db
      .from("creator_payouts")
      .select()
      .eq("creator_id", creatorId)
      .order("created_at", { ascending: false });
    return (data ?? []).map(rowToPayout);
  }

  getStats(creatorId: string): Promise<CreatorStats> {
    return composeStats(this, creatorId);
  }

  async listAllConversions(limit = 200): Promise<CreatorConversion[]> {
    const { data } = await this.db
      .from("creator_conversions")
      .select()
      .order("created_at", { ascending: false })
      .limit(limit);
    return (data ?? []).map(rowToConversion);
  }

  async listPendingByCreator() {
    const { data } = await this.db
      .from("creator_conversions")
      .select("creator_id,creator_cut_cents")
      .eq("status", "pending");
    const map = new Map<string, { pendingCents: number; pendingCount: number }>();
    for (const r of data ?? []) {
      const cur = map.get(r.creator_id) ?? { pendingCents: 0, pendingCount: 0 };
      cur.pendingCents += r.creator_cut_cents ?? 0;
      cur.pendingCount += 1;
      map.set(r.creator_id, cur);
    }
    const out: { creator: Creator; pendingCents: number; pendingCount: number }[] = [];
    for (const [creatorId, v] of map) {
      const creator = await this.getCreatorById(creatorId);
      if (creator) out.push({ creator, ...v });
    }
    return out.sort((a, b) => b.pendingCents - a.pendingCents);
  }

  async getGlobalStats() {
    const since30 = Date.now() - 30 * 86_400_000;
    const [{ data: convs }, { data: creators }] = await Promise.all([
      this.db.from("creator_conversions").select("amount_cents,creator_cut_cents,status,created_at"),
      this.db.from("creators").select("status"),
    ]);
    let totalRevenue = 0;
    let totalCut = 0;
    let last30Rev = 0;
    let last30Count = 0;
    let pendingCut = 0;
    for (const c of convs ?? []) {
      if (c.status === "refunded") continue;
      totalRevenue += c.amount_cents ?? 0;
      totalCut += c.creator_cut_cents ?? 0;
      if (c.status === "pending") pendingCut += c.creator_cut_cents ?? 0;
      if (Date.parse(c.created_at) >= since30) {
        last30Rev += c.amount_cents ?? 0;
        last30Count += 1;
      }
    }
    return {
      totalRevenueCents: totalRevenue,
      totalCreatorCutCents: totalCut,
      last30RevenueCents: last30Rev,
      last30Conversions: last30Count,
      creatorCount: (creators ?? []).length,
      activeCreatorCount: (creators ?? []).filter((c) => c.status === "active").length,
      pendingPayoutCents: pendingCut,
    };
  }

  async markConversionsPaid(creatorId: string, conversionIds: string[], payoutId: string): Promise<number> {
    if (conversionIds.length === 0) return 0;
    const { data } = await this.db
      .from("creator_conversions")
      .update({ status: "paid", paid_in_payout_id: payoutId })
      .eq("creator_id", creatorId)
      .eq("status", "pending")
      .in("id", conversionIds)
      .select("id");
    return (data ?? []).length;
  }

  async createPayout(payout: Omit<CreatorPayout, "id" | "createdAt">): Promise<CreatorPayout> {
    const { data, error } = await this.db
      .from("creator_payouts")
      .insert({
        creator_id: payout.creatorId,
        period_start: payout.periodStart,
        period_end: payout.periodEnd,
        total_cents: payout.totalCents,
        conversion_count: payout.conversionCount,
        status: payout.status,
        paid_at: payout.paidAt ? new Date(payout.paidAt).toISOString() : null,
        payout_method: payout.payoutMethod ?? null,
        reference: payout.reference ?? null,
        notes: payout.notes ?? null,
      })
      .select()
      .single();
    if (error || !data) throw new Error(`payout insert failed: ${error?.message}`);
    return rowToPayout(data);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// In-memory implementation — dev fallback, lost on lambda recycle.
// ─────────────────────────────────────────────────────────────────────────────
class InMemoryCreatorStore implements CreatorStore {
  private creators = new Map<string, Creator>();
  private creatorsByCode = new Map<string, string>(); // code → id
  private creatorsByUserId = new Map<string, string>(); // userId → id
  private clicks: CreatorClick[] = [];
  private conversions: CreatorConversion[] = [];
  private payouts: CreatorPayout[] = [];

  async upsertCreator(c: Creator) {
    this.creators.set(c.id, c);
    this.creatorsByCode.set(c.code, c.id);
    if (c.userId) this.creatorsByUserId.set(c.userId, c.id);
    return c;
  }

  async getCreatorById(id: string) {
    return this.creators.get(id) ?? null;
  }

  async getCreatorByCode(code: string) {
    const id = this.creatorsByCode.get(code);
    return id ? (this.creators.get(id) ?? null) : null;
  }

  async getCreatorByUserId(userId: string) {
    const id = this.creatorsByUserId.get(userId);
    return id ? (this.creators.get(id) ?? null) : null;
  }

  async listCreators() {
    return Array.from(this.creators.values()).sort((a, b) => b.createdAt - a.createdAt);
  }

  async updateCreator(id: string, patch: Partial<Creator>) {
    const c = this.creators.get(id);
    if (!c) return null;
    const next = { ...c, ...patch };
    this.creators.set(id, next);
    if (patch.code && patch.code !== c.code) {
      this.creatorsByCode.delete(c.code);
      this.creatorsByCode.set(patch.code, id);
    }
    return next;
  }

  async recordClick(click: Omit<CreatorClick, "id" | "createdAt">) {
    this.clicks.push({ ...click, id: crypto.randomUUID(), createdAt: Date.now() });
  }

  async countClicks(creatorId: string, since?: number) {
    return this.clicks.filter((c) => c.creatorId === creatorId && (!since || c.createdAt >= since)).length;
  }

  async clicksByDay(creatorId: string, sinceDays: number) {
    const since = Date.now() - sinceDays * 86_400_000;
    const map = new Map<string, number>();
    for (const c of this.clicks) {
      if (c.creatorId !== creatorId || c.createdAt < since) continue;
      const day = new Date(c.createdAt).toISOString().slice(0, 10);
      map.set(day, (map.get(day) ?? 0) + 1);
    }
    return Array.from(map, ([date, clicks]) => ({ date, clicks })).sort((a, b) => a.date.localeCompare(b.date));
  }

  async recordConversion(conv: Omit<CreatorConversion, "id" | "createdAt">) {
    if (conv.stripeSessionId) {
      const existing = await this.getConversionByStripeSession(conv.stripeSessionId);
      if (existing) return null; // idempotent
    }
    const created: CreatorConversion = { ...conv, id: crypto.randomUUID(), createdAt: Date.now() };
    this.conversions.push(created);
    return created;
  }

  async getConversionByStripeSession(stripeSessionId: string) {
    return this.conversions.find((c) => c.stripeSessionId === stripeSessionId) ?? null;
  }

  async listConversions(creatorId: string, limit = 50) {
    return this.conversions
      .filter((c) => c.creatorId === creatorId)
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit);
  }

  async countConversions(creatorId: string, since?: number) {
    return this.conversions.filter((c) => c.creatorId === creatorId && (!since || c.createdAt >= since)).length;
  }

  async sumCreatorCut(creatorId: string, status?: "pending" | "paid") {
    return this.conversions
      .filter((c) => c.creatorId === creatorId && c.status !== "refunded" && (!status || c.status === status))
      .reduce((s, c) => s + c.creatorCutCents, 0);
  }

  async conversionsByDay(creatorId: string, sinceDays: number) {
    const since = Date.now() - sinceDays * 86_400_000;
    const map = new Map<string, { conversions: number; earningsCents: number }>();
    for (const c of this.conversions) {
      if (c.creatorId !== creatorId || c.createdAt < since || c.status === "refunded") continue;
      const day = new Date(c.createdAt).toISOString().slice(0, 10);
      const cur = map.get(day) ?? { conversions: 0, earningsCents: 0 };
      cur.conversions += 1;
      cur.earningsCents += c.creatorCutCents;
      map.set(day, cur);
    }
    return Array.from(map, ([date, v]) => ({ date, ...v })).sort((a, b) => a.date.localeCompare(b.date));
  }

  async listPayouts(creatorId: string) {
    return this.payouts.filter((p) => p.creatorId === creatorId).sort((a, b) => b.createdAt - a.createdAt);
  }

  getStats(creatorId: string): Promise<CreatorStats> {
    return composeStats(this, creatorId);
  }

  // ── Admin queries ──────────────────────────────────────────────────────────
  async listAllConversions(limit = 200): Promise<CreatorConversion[]> {
    return [...this.conversions].sort((a, b) => b.createdAt - a.createdAt).slice(0, limit);
  }

  async listPendingByCreator() {
    const map = new Map<string, { pendingCents: number; pendingCount: number }>();
    for (const c of this.conversions) {
      if (c.status !== "pending") continue;
      const cur = map.get(c.creatorId) ?? { pendingCents: 0, pendingCount: 0 };
      cur.pendingCents += c.creatorCutCents;
      cur.pendingCount += 1;
      map.set(c.creatorId, cur);
    }
    const out: { creator: Creator; pendingCents: number; pendingCount: number }[] = [];
    for (const [creatorId, v] of map) {
      const creator = this.creators.get(creatorId);
      if (!creator) continue;
      out.push({ creator, ...v });
    }
    return out.sort((a, b) => b.pendingCents - a.pendingCents);
  }

  async getGlobalStats() {
    const since30 = Date.now() - 30 * 86_400_000;
    let totalRevenue = 0;
    let totalCut = 0;
    let last30Rev = 0;
    let last30Count = 0;
    let pendingCut = 0;
    for (const c of this.conversions) {
      if (c.status === "refunded") continue;
      totalRevenue += c.amountCents;
      totalCut += c.creatorCutCents;
      if (c.status === "pending") pendingCut += c.creatorCutCents;
      if (c.createdAt >= since30) {
        last30Rev += c.amountCents;
        last30Count += 1;
      }
    }
    const creators = Array.from(this.creators.values());
    return {
      totalRevenueCents: totalRevenue,
      totalCreatorCutCents: totalCut,
      last30RevenueCents: last30Rev,
      last30Conversions: last30Count,
      creatorCount: creators.length,
      activeCreatorCount: creators.filter((c) => c.status === "active").length,
      pendingPayoutCents: pendingCut,
    };
  }

  async markConversionsPaid(creatorId: string, conversionIds: string[], payoutId: string): Promise<number> {
    let n = 0;
    for (const c of this.conversions) {
      if (c.creatorId !== creatorId) continue;
      if (!conversionIds.includes(c.id)) continue;
      if (c.status !== "pending") continue;
      c.status = "paid";
      c.paidInPayoutId = payoutId;
      n += 1;
    }
    return n;
  }

  async createPayout(payout: Omit<CreatorPayout, "id" | "createdAt">): Promise<CreatorPayout> {
    const created: CreatorPayout = { ...payout, id: crypto.randomUUID(), createdAt: Date.now() };
    this.payouts.push(created);
    return created;
  }
}

// Singleton per process. Supabase-backed when the service-role env is present (durable,
// shared across serverless instances); in-memory otherwise so local dev needs no DB.
const g = globalThis as unknown as { __fypCreatorStore?: CreatorStore };
export function getCreatorStore(): CreatorStore {
  if (!g.__fypCreatorStore) {
    const db = getSupabaseAdmin();
    g.__fypCreatorStore = db ? new SupabaseCreatorStore(db) : new InMemoryCreatorStore();
  }
  return g.__fypCreatorStore;
}
