import { describe, it, expect } from "vitest";
import { lemonOrderUnlocks, stripeSessionUnlocks } from "@/lib/unlockDecision";

/**
 * Gate-decision characterization — the paywall unlock is decided here, so lock the
 * behavior: paid orders unlock, $0 promo-code orders unlock, everything else stays
 * locked. Regression tests for the "place100 (100% off) redirected back without
 * unlocking" bug.
 */

describe("lemonOrderUnlocks", () => {
  it("unlocks a normal paid order", () => {
    expect(lemonOrderUnlocks({ status: "paid", total: 2900 })).toBe(true);
  });

  it("unlocks a $0 order from a 100% discount code (reported as pending)", () => {
    expect(lemonOrderUnlocks({ status: "pending", total: 0 })).toBe(true);
  });

  it("unlocks a $0 order reported as paid", () => {
    expect(lemonOrderUnlocks({ status: "paid", total: 0 })).toBe(true);
  });

  it("never unlocks a pending order that still owes money", () => {
    expect(lemonOrderUnlocks({ status: "pending", total: 2900 })).toBe(false);
    expect(lemonOrderUnlocks({ status: "pending", total: 1 })).toBe(false);
  });

  it("never unlocks failed, refunded, or fraudulent orders — even at $0", () => {
    for (const status of ["failed", "refunded", "partial_refund", "fraudulent"]) {
      expect(lemonOrderUnlocks({ status, total: 0 }), status).toBe(false);
      expect(lemonOrderUnlocks({ status, total: 2900 }), status).toBe(false);
    }
  });

  it("never unlocks on missing/malformed attributes", () => {
    expect(lemonOrderUnlocks(undefined)).toBe(false);
    expect(lemonOrderUnlocks({})).toBe(false);
    expect(lemonOrderUnlocks({ status: "pending" })).toBe(false); // no total → not provably $0
  });
});

describe("stripeSessionUnlocks", () => {
  it("unlocks a paid session", () => {
    expect(stripeSessionUnlocks("paid")).toBe(true);
  });

  it("unlocks a $0 session from a 100% promotion code", () => {
    expect(stripeSessionUnlocks("no_payment_required")).toBe(true);
  });

  it("never unlocks unpaid or missing payment status", () => {
    expect(stripeSessionUnlocks("unpaid")).toBe(false);
    expect(stripeSessionUnlocks(null)).toBe(false);
    expect(stripeSessionUnlocks(undefined)).toBe(false);
  });
});
