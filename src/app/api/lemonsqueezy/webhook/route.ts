import { NextRequest, NextResponse } from "next/server";
import { getRun, markUnlocked } from "@/lib/server/runStore";
import { getCreatorStore } from "@/lib/creators/store";
import { verifyLemonSignature } from "@/lib/server/lemonsqueezy";
import { PRICE_CENTS, CURRENCY } from "@/lib/pricing";
import { sendCapiEvent } from "@/lib/server/metaCapi";

/**
 * Lemon Squeezy webhook — the SERVER-VERIFIED source of truth for unlocks on the LS rail.
 *
 * On a signature-verified, PAID `order_created`:
 *   1. Mark the run unlocked (runId arrives in `meta.custom_data.run_id`).
 *   2. If attributed to a creator, record the conversion using the LS order id as the
 *      idempotency key so webhook retries don't double-credit.
 *
 * Set LEMONSQUEEZY_WEBHOOK_SECRET and point an LS webhook (order_created) at
 * /api/lemonsqueezy/webhook.
 */
export const runtime = "nodejs";

type LemonEvent = {
  meta?: { event_name?: string; custom_data?: { run_id?: string } };
  data?: {
    id?: string;
    attributes?: { status?: string; total?: number; user_email?: string | null };
  };
};

export async function POST(req: NextRequest) {
  if (!process.env.LEMONSQUEEZY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Lemon Squeezy not configured" }, { status: 503 });
  }

  const raw = await req.text();
  if (!verifyLemonSignature(raw, req.headers.get("x-signature"))) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let event: LemonEvent;
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const attrs = event.data?.attributes;
  if (event.meta?.event_name === "order_created" && attrs?.status === "paid") {
    const runId = event.meta?.custom_data?.run_id;
    if (runId) {
      await markUnlocked(runId, {
        providerRef: event.data?.id ? `ls_${event.data.id}` : null,
        amountCents: attrs.total ?? PRICE_CENTS,
      });

      // Server-verified Purchase → Meta CAPI (deduped with the client copy by event_id).
      await sendCapiEvent({
        event: "purchase",
        eventId: `purchase_${runId}`,
        value: (attrs.total ?? PRICE_CENTS) / 100,
        currency: CURRENCY.toUpperCase(),
        email: attrs.user_email ?? null,
      });

      // Record the creator conversion (50% cut by default).
      const run = await getRun(runId);
      const orderId = event.data?.id;
      if (run?.creatorId && orderId) {
        const store = getCreatorStore();
        const creator = await store.getCreatorById(run.creatorId);
        if (creator) {
          const amountCents = attrs.total ?? PRICE_CENTS; // LS `total` is in cents
          await store.recordConversion({
            creatorId: creator.id,
            runId,
            stripeSessionId: `ls_${orderId}`, // provider ref → idempotency key
            email: attrs.user_email ?? null,
            amountCents,
            creatorCutCents: Math.round((amountCents * creator.revSharePct) / 100),
            status: "pending",
          });
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
