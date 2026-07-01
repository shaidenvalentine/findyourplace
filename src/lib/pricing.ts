/** One-time unlock pricing. Test value ~$29, anchored above with a $39 strike. */
export const PRICE_CENTS = 2900;
export const ANCHOR_CENTS = 3900;
export const CURRENCY = "usd";

export const PRICE_LABEL = "$29";
export const ANCHOR_LABEL = "$39";

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function isLemonSqueezyConfigured(): boolean {
  // Require the webhook secret too: without it, checkout would succeed but the
  // order_created webhook returns 503 and NO ONE gets unlocked. Treating the rail as
  // "unconfigured" until the webhook secret is present prevents shipping a config that
  // charges customers but can never unlock them.
  return Boolean(
    process.env.LEMONSQUEEZY_API_KEY &&
      process.env.LEMONSQUEEZY_STORE_ID &&
      process.env.LEMONSQUEEZY_VARIANT_ID &&
      process.env.LEMONSQUEEZY_WEBHOOK_SECRET,
  );
}

/** True when ANY real payment rail is live — used to refuse the dev-unlock bypass. */
export function isPaymentConfigured(): boolean {
  return isStripeConfigured() || isLemonSqueezyConfigured();
}

export type PaymentProvider = "lemonsqueezy" | "stripe" | "dev";

/**
 * Which rail handles checkout. Lemon Squeezy is the launch default (the Stripe account
 * is locked behind 2FA), but the two stay fully decoupled so either can run alone. Set
 * PAYMENT_PROVIDER to force one; otherwise prefer LS, then Stripe, then the dev unlock.
 */
export function activePaymentProvider(): PaymentProvider {
  const forced = process.env.PAYMENT_PROVIDER?.toLowerCase();
  if (forced === "lemonsqueezy") return isLemonSqueezyConfigured() ? "lemonsqueezy" : "dev";
  if (forced === "stripe") return isStripeConfigured() ? "stripe" : "dev";
  if (isLemonSqueezyConfigured()) return "lemonsqueezy";
  if (isStripeConfigured()) return "stripe";
  return "dev";
}
