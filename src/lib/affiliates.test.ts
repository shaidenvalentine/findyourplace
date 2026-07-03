import { describe, expect, it } from "vitest";
import { buildOutboundUrl, PARTNERS, recommendToolkit } from "./affiliates";
import type { FreeRun } from "./run";

describe("buildOutboundUrl", () => {
  it("replaces every {CLICK_ID} with the encoded subId", () => {
    expect(buildOutboundUrl("https://x.com/?ref={CLICK_ID}&s={CLICK_ID}", "abc_toolkit:Get there")).toBe(
      "https://x.com/?ref=abc_toolkit%3AGet%20there&s=abc_toolkit%3AGet%20there"
    );
  });

  it("passes templates without the placeholder through untouched", () => {
    expect(buildOutboundUrl("https://x.com/?camref=1101", "abc")).toBe("https://x.com/?camref=1101");
  });
});

describe("partner catalog", () => {
  it("has unique ids and env vars, and guide copy on every partner", () => {
    const ids = new Set(PARTNERS.map((p) => p.id));
    const envs = new Set(PARTNERS.map((p) => p.affEnv));
    expect(ids.size).toBe(PARTNERS.length);
    expect(envs.size).toBe(PARTNERS.length);
    for (const p of PARTNERS) {
      expect(p.why.length, p.id).toBeGreaterThan(40);
      expect(p.skipCost.length, p.id).toBeGreaterThan(10);
      expect(p.affEnv).toMatch(/^AFF_[A-Z0-9]+$/);
    }
  });
});

describe("recommendToolkit", () => {
  const run = {
    runId: "test-run",
    inputs: { lifestyleMode: "nomadic", isUsCitizen: true, taxSensitivity: "very-sensitive" },
  } as unknown as FreeRun;

  it("orders every section by priority, highest first", () => {
    for (const section of recommendToolkit(run)) {
      const priorities = section.items.map((p) => p.priority ?? 0);
      expect(priorities, section.title).toEqual([...priorities].sort((a, b) => b - a));
    }
  });

  it("excludes partners whose conditions fail", () => {
    const rootedRun = { ...run, inputs: { lifestyleMode: "rooted" } } as unknown as FreeRun;
    const items = recommendToolkit(rootedRun).flatMap((s) => s.items.map((p) => p.id));
    expect(items).not.toContain("safetywing");
    expect(items).not.toContain("brighttax");
    expect(items).toContain("sirelo");
  });
});
