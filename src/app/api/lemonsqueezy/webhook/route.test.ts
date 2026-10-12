import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
const m = vi.hoisted(() => ({ verify: vi.fn(), unlock: vi.fn(), run: vi.fn(), capi: vi.fn() }));
vi.mock("server-only", () => ({}));
vi.mock("@/lib/server/lemonsqueezy", () => ({ verifyLemonSignature: m.verify }));
vi.mock("@/lib/server/runStore", () => ({ markUnlocked: m.unlock, getRun: m.run }));
vi.mock("@/lib/server/metaCapi", () => ({ sendCapiEvent: m.capi }));
vi.mock("@/lib/creators/store", () => ({ getCreatorStore: vi.fn() }));
import { POST } from "./route";
function request(patch: Record<string, unknown> = {}) {
  return new NextRequest("https://findyourplace.app/api/lemonsqueezy/webhook", {
    method: "POST", body: JSON.stringify({
      meta: { event_name: "order_created", custom_data: { run_id: "run-1" } },
      data: { id: "order-1", attributes: { status: "paid", total: 2900, store_id: 10,
        first_order_item: { variant_id: 20 }, test_mode: false, ...patch } },
    }),
  });
}
beforeEach(() => {
  vi.resetAllMocks();
  vi.stubEnv("LEMONSQUEEZY_WEBHOOK_SECRET", "test-only");
  vi.stubEnv("LEMONSQUEEZY_STORE_ID", "10");
  vi.stubEnv("LEMONSQUEEZY_VARIANT_ID", "20");
  m.verify.mockReturnValue(true); m.run.mockResolvedValue({ runId: "run-1" });
});
afterEach(() => vi.unstubAllEnvs());
it("persists a verified paid order before acknowledging delivery", async () => {
  expect((await POST(request())).status).toBe(200);
  expect(m.unlock).toHaveBeenCalledWith("run-1", { providerRef: "ls_order-1", amountCents: 2900 });
});
it("persists a verified zero-dollar pending order", async () => {
  await POST(request({ status: "pending", total: 0 }));
  expect(m.unlock).toHaveBeenCalledWith("run-1", { providerRef: "ls_order-1", amountCents: 0 });
});
it.each([{ test_mode: true }, { store_id: 99 }, { first_order_item: { variant_id: 99 } }, { total: -1 }, { status: "failed" }])("never unlocks an ineligible order %j", async (patch) => {
  await POST(request(patch)); expect(m.unlock).not.toHaveBeenCalled();
});
it("rejects an unsigned event", async () => {
  m.verify.mockReturnValue(false);
  expect((await POST(request())).status).toBe(400); expect(m.unlock).not.toHaveBeenCalled();
});
it("requests a retry when the result is missing", async () => {
  m.run.mockResolvedValue(undefined);
  expect((await POST(request())).status).toBe(503); expect(m.unlock).not.toHaveBeenCalled();
});
it("does not acknowledge a failed durable unlock", async () => {
  m.unlock.mockRejectedValue(new Error("database unavailable"));
  await expect(POST(request())).rejects.toThrow("database unavailable");
});
