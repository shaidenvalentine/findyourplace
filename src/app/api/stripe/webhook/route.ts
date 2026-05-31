import { NextRequest, NextResponse } from "next/server";
import { getRun, markUnlocked } from "@/lib/server/runStore";
import { getCreatorStore } from "@/lib/creators/store";

/**
 * Stripe webhook — the SERVER-VERIFIED source of truth for unlocks.
 *
 * On a verified `checkout.session.completed`:
 *   1. Mark the run unlocked
 *   2. If the run was attributed to a creator, record the conversion (50% cut by default)
 *      — using the Stripe session ID as the idempotency key so webhook retries don't
 *      double-credit.
 *
 * Set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET, and point a Stripe webhook at
 * /api/stripe/webhook.
 */
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !webhookSecret) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  const payload = await req.text();
  const { default: Stripe } = await import("stripe");
  const stripe = new Stripe(secret);

  let event: import("stripe").Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as import("stripe").Stripe.Checkout.Session;
    const runId = session.metadata?.runId;
    if (runId && session.payment_status === "paid") {
      markUnlocked(runId);

      // Record the creator conversion (50% cut by default).
      const run = getRun(runId);
      if (run?.creatorId) {
        const store = getCreatorStore();
        const creator = await store.getCreatorById(run.creatorId);
        if (creator && session.id) {
          const amountCents = session.amount_total ?? 1900;
          await store.recordConversion({
            creatorId: creator.id,
            runId,
            stripeSessionId: session.id, // idempotency key — webhook retries are safe
            email: session.customer_details?.email ?? null,
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
