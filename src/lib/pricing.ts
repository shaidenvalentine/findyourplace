/** One-time unlock pricing. Test value ~$29, anchored above with a $39 strike. */
export const PRICE_CENTS = 2900;
export const ANCHOR_CENTS = 3900;
export const CURRENCY = "usd";

export const PRICE_LABEL = "$29";
export const ANCHOR_LABEL = "$39";

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
