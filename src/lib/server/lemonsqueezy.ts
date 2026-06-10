import "server-only";
import crypto from "node:crypto";

/**
 * Lemon Squeezy payment rail (merchant of record — handles global VAT/GST/sales tax).
 *
 * Mirrors the Stripe shape: create a hosted checkout, then unlock from a server-verified
 * webhook. The runId rides along in `checkout_data.custom` and comes back to our webhook
 * as `meta.custom_data.run_id`. The CHARGED price is set by the LS *variant* in the
 * dashboard, not here — keep that variant in sync with PRICE_CENTS.
 */

const LS_CHECKOUTS_URL = "https://api.lemonsqueezy.com/v1/checkouts";

export async function createLemonCheckout(opts: {
  runId: string;
  email?: string;
  redirectUrl: string;
}): Promise<string> {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY!;
  const storeId = process.env.LEMONSQUEEZY_STORE_ID!;
  const variantId = process.env.LEMONSQUEEZY_VARIANT_ID!;

  const res = await fetch(LS_CHECKOUTS_URL, {
    method: "POST",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            email: opts.email || undefined,
            custom: { run_id: opts.runId },
          },
          product_options: { redirect_url: opts.redirectUrl },
        },
        relationships: {
          store: { data: { type: "stores", id: String(storeId) } },
          variant: { data: { type: "variants", id: String(variantId) } },
        },
      },
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Lemon Squeezy checkout failed (${res.status}): ${detail.slice(0, 300)}`);
  }

  const json = (await res.json()) as { data?: { attributes?: { url?: string } } };
  const url = json.data?.attributes?.url;
  if (!url) throw new Error("Lemon Squeezy checkout returned no URL");
  return url;
}

/**
 * Verify a Lemon Squeezy webhook. LS signs the raw request body with HMAC-SHA256 (hex)
 * using the per-webhook signing secret, sent in the `X-Signature` header.
 */
export function verifyLemonSignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const digest = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  const expected = Buffer.from(digest);
  const received = Buffer.from(signature);
  if (expected.length !== received.length) return false;
  return crypto.timingSafeEqual(expected, received);
}
