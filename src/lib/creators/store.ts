import "server-only";
import type { Creator, CreatorClick, CreatorConversion, CreatorPayout, CreatorStats } from "./types";

/**
 * Creator data store — abstract interface so we can swap in-memory ↔ Supabase.
 *
 * Today: an in-memory implementation that lets us build + test the full portal locally.
 * Production: when SUPABASE env keys are set, swap to the Supabase-backed implementation
 * (same shape). All routes consume this interface, so the swap is one file.
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
}

// ─────────────────────────────────────────────────────────────────────────────
// In-memory implementation — works for local dev, lost on lambda recycle.
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

  async getStats(creatorId: string): Promise<CreatorStats> {
    const since30 = Date.now() - 30 * 86_400_000;
    const clicks30 = await this.countClicks(creatorId, since30);
    const conv30 = await this.countConversions(creatorId, since30);
    const totalCut = await this.sumCreatorCut(creatorId);
    const paidCut = await this.sumCreatorCut(creatorId, "paid");
    const pendingCut = await this.sumCreatorCut(creatorId, "pending");
    const lifetimeClicks = await this.countClicks(creatorId);
    const lifetimeConv = await this.countConversions(creatorId);
    const recent = (await this.listConversions(creatorId, 10));
    const conversionRatePct = lifetimeClicks ? (lifetimeConv / lifetimeClicks) * 100 : 0;
    const clicksByDay = await this.clicksByDay(creatorId, 30);
    const convByDay = await this.conversionsByDay(creatorId, 30);
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
      last30: {
        clicks: clicks30,
        conversions: conv30,
        earningsCents: last30EarningsCents,
        byDay,
      },
      recentConversions: recent,
    };
  }
}

// Singleton, kept warm across requests in dev / single lambda instances.
const g = globalThis as unknown as { __fypCreatorStore?: CreatorStore };
export function getCreatorStore(): CreatorStore {
  // TODO: when SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set, return the Supabase impl.
  // For now, in-memory works for local dev and lets the whole portal be built + tested.
  if (!g.__fypCreatorStore) g.__fypCreatorStore = new InMemoryCreatorStore();
  return g.__fypCreatorStore;
}
