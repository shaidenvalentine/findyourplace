import { NextRequest, NextResponse } from "next/server";
import { markUnlocked } from "@/lib/server/runStore";

/**
 * Stripe webhook — the SERVER-VERIFIED source of truth for unlocks. On a verified
 * `checkout.session.completed`, we unlock the run named in the session metadata.
 * Never trust a client flag; this is the only unlock path in production.
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
      // TODO(Phase 4): also upsert `unlocked_results` row in Supabase here.
      markUnlocked(runId);
    }
  }

  return NextResponse.json({ received: true });
}
