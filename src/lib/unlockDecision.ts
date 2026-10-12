/**
 * Should a signature-verified payment event unlock the run? Pure decision logic,
 * shared by the Stripe and Lemon Squeezy webhooks and locked by unit tests
 * (src/lib/unlockDecision.test.ts) — this is the paywall gate, so any change here
 * must keep those tests green.
 *
 * The subtlety both rails share: a 100%-off discount code produces a $0 order with
 * no payment to process, and both providers report that differently from a normal
 * paid order. A "status is paid" check silently drops those orders — the buyer is
 * redirected back to the app but never unlocked.
 */

/** Lemon Squeezy `order_created` attributes we decide on. */
export type LemonOrderAttrs = {
  status?: string;
  total?: number;
};

/**
 * Lemon Squeezy: unlock on a normal `paid` order, and on a $0 order (100% discount /
 * free variant) that skipped payment processing and therefore may arrive as `pending`
 * instead of `paid`. The payload is HMAC-verified before this runs, so `total: 0` is
 * Lemon Squeezy's own signed statement that nothing was owed — trusting it does not
 * weaken the gate. Explicitly never unlock failed/refunded/fraudulent orders.
 */
export function lemonOrderUnlocks(attrs: LemonOrderAttrs | undefined): boolean {
  if (!attrs) return false;
  if (attrs.status === "paid") return true;
  return attrs.total === 0 && attrs.status === "pending";
}

/**
 * Stripe: a Checkout Session completed with a 100% promotion code has
 * `payment_status: "no_payment_required"` (no PaymentIntent is created for a $0
 * total) — Stripe's documented value for sessions where nothing was owed.
 */
export function stripeSessionUnlocks(paymentStatus: string | null | undefined): boolean {
  return paymentStatus === "paid" || paymentStatus === "no_payment_required";
}
