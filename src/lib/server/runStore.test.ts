import { beforeEach, afterEach, expect, it, vi } from "vitest";
import type { ScoredRun } from "@/lib/run";
const mocks = vi.hoisted(() => ({ admin: vi.fn(), paid: vi.fn(), upsert: vi.fn(), read: vi.fn() }));
vi.mock("server-only", () => ({}));
vi.mock("@/lib/supabase/server", () => ({ getSupabaseAdmin: mocks.admin }));
vi.mock("@/lib/pricing", () => ({ isPaymentConfigured: mocks.paid }));
import { putRun, getRun, markUnlocked, isUnlocked } from "./runStore";
beforeEach(() => {
  vi.resetAllMocks();
  mocks.admin.mockReturnValue({ from: () => ({ upsert: mocks.upsert, select: () => ({ eq: () => ({ maybeSingle: mocks.read }) }) }) });
  mocks.upsert.mockResolvedValue({ error: null });
  mocks.read.mockResolvedValue({ data: null, error: null });
});
afterEach(() => vi.unstubAllEnvs());
it("rejects failed unlock persistence and allows a successful retry", async () => {
  mocks.upsert.mockResolvedValueOnce({ error: { message: "offline" } });
  await expect(markUnlocked("retry", { providerRef: "ls_123", amountCents: 2900 })).rejects.toThrow("persist unlock");
  await expect(isUnlocked("retry")).resolves.toBe(false);
  await markUnlocked("retry", { providerRef: "ls_123", amountCents: 2900 });
  expect(mocks.upsert).toHaveBeenLastCalledWith({ run_id: "retry", stripe_session_id: "ls_123", amount_cents: 2900 }, { onConflict: "run_id" });
  mocks.read.mockResolvedValue({ data: { run_id: "retry" }, error: null });
  await expect(isUnlocked("retry")).resolves.toBe(true);
});
it("never lets a cached unlock bypass database verification", async () => {
  await markUnlocked("cached");
  await expect(isUnlocked("cached")).resolves.toBe(false);
  mocks.read.mockResolvedValue({ data: null, error: { message: "offline" } });
  await expect(isUnlocked("cached")).rejects.toThrow("verify persisted unlock");
});
it("refuses memory-only paid unlocks", async () => {
  mocks.admin.mockReturnValue(null); mocks.paid.mockReturnValue(true);
  await expect(markUnlocked("paid-no-db")).rejects.toThrow("not configured");
  await expect(isUnlocked("paid-no-db")).resolves.toBe(false);
});
it("refuses memory-only production unlocks even without a payment key", async () => {
  mocks.admin.mockReturnValue(null); vi.stubEnv("NODE_ENV", "production");
  await expect(markUnlocked("prod-no-db")).rejects.toThrow("not configured");
});
it("preserves local development unlocks", async () => {
  mocks.admin.mockReturnValue(null); vi.stubEnv("NODE_ENV", "development");
  await markUnlocked("local"); await expect(isUnlocked("local")).resolves.toBe(true);
});
it("propagates result write failures", async () => {
  mocks.upsert.mockResolvedValue({ error: { message: "offline" } });
  await expect(putRun({ runId: "failed", inputs: {}, ranking: [], circuit: null } as unknown as ScoredRun)).rejects.toThrow("persist results");
});
it("never returns memory-only results when a database is configured", async () => {
  mocks.admin.mockReturnValueOnce(null);
  await putRun({ runId: "memory" } as ScoredRun);
  await expect(getRun("memory")).resolves.toBeUndefined();
  mocks.read.mockResolvedValue({ data: null, error: { message: "offline" } });
  await expect(getRun("memory")).rejects.toThrow("read persisted results");
});
it("reassembles persisted results", async () => {
  const ranking = [{ id: "bali" }];
  mocks.read.mockResolvedValue({ data: { free_json: { runId: "persisted" }, ranking_json: ranking, circuit_json: null }, error: null });
  await expect(getRun("persisted")).resolves.toEqual({ runId: "persisted", ranking, circuit: null });
});
