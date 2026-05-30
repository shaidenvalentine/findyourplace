/** One-time unlock pricing. Test value ~$19, anchored above with a $29 strike. */
export const PRICE_CENTS = 1900;
export const ANCHOR_CENTS = 2900;
export const CURRENCY = "usd";

export const PRICE_LABEL = "$19";
export const ANCHOR_LABEL = "$29";

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
