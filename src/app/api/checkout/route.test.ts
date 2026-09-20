import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
const m = vi.hoisted(() => ({ db: vi.fn(), get: vi.fn(), put: vi.fn(), provider: vi.fn(), checkout: vi.fn(), build: vi.fn() }));
vi.mock("server-only", () => ({}));
vi.mock("@/lib/supabase/server", () => ({ getSupabaseAdmin: m.db }));
vi.mock("@/lib/server/runStore", () => ({ getRun: m.get, putRun: m.put }));
vi.mock("@/lib/pricing", () => ({ activePaymentProvider: m.provider, PRICE_CENTS: 2900, CURRENCY: "usd" }));
vi.mock("@/lib/server/lemonsqueezy", () => ({ createLemonCheckout: m.checkout }));
vi.mock("@/lib/buildRun", () => ({ buildScoredRun: m.build }));
import { POST } from "./route";
const request = () => new NextRequest("https://findyourplace.app/api/checkout", { method: "POST", body: JSON.stringify({ runId: "test-run", inputs: {} }) });
beforeEach(() => {
  vi.resetAllMocks(); m.provider.mockReturnValue("lemonsqueezy"); m.db.mockReturnValue({});
  m.get.mockResolvedValue({ runId: "test-run" }); m.checkout.mockResolvedValue("https://checkout.example/test");
});
afterEach(() => vi.unstubAllEnvs());
it("blocks real checkout without durable storage", async () => {
  m.db.mockReturnValue(null);
  expect((await POST(request())).status).toBe(503); expect(m.checkout).not.toHaveBeenCalled();
});
it("blocks checkout on database read failure", async () => {
  m.get.mockRejectedValue(new Error("offline"));
  expect((await POST(request())).status).toBe(503); expect(m.checkout).not.toHaveBeenCalled();
});
it("blocks checkout when rebuilt results cannot be saved", async () => {
  m.get.mockResolvedValue(undefined); m.put.mockRejectedValue(new Error("offline"));
  expect((await POST(request())).status).toBe(503); expect(m.checkout).not.toHaveBeenCalled();
});
it("starts checkout for a persisted result", async () => {
  expect((await POST(request())).status).toBe(200); expect(m.checkout).toHaveBeenCalledOnce();
});
it("disables production dev checkout", async () => {
  m.provider.mockReturnValue("dev"); vi.stubEnv("NODE_ENV", "production");
  expect((await POST(request())).status).toBe(503);
});
