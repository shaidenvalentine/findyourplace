import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { sendEmail, resultsLinkHtml } from "@/lib/server/email";
import { enforceRateLimit } from "@/lib/server/rateLimit";

/**
 * Email gate capture — the nurture asset for the ~90% who don't buy on the spot.
 *
 * 1. Persist to `email_captures` (service role; RLS has no client policies). The run_id
 *    FK is best-effort: if the referenced run row isn't in the DB (local dev without
 *    Supabase writes), we retry without it rather than lose the address.
 * 2. Fire-and-forget a "your results link" email via Resend when configured, so the
 *    runner can always find their way back to this run from any device.
 *
 * Never blocks or fails the paywall flow beyond basic validation.
 */
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // This sends a (Resend) email per call — cap it so it can't be turned into a mail
  // cannon that burns quota and sender reputation.
  const limited = enforceRateLimit(req, "capture-email", 15, 300);
  if (limited) return limited;

  let body: { email?: string; runId?: string; stage?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const email = (body.email ?? "").trim().toLowerCase();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!valid) return NextResponse.json({ error: "Invalid email" }, { status: 422 });

  const runId = body.runId ?? null;
  const stage = (body.stage ?? "paywall").slice(0, 40);

  const db = getSupabaseAdmin();
  if (db) {
    const { error } = await db.from("email_captures").insert({ email, run_id: runId, stage });
    if (error) {
      // FK miss (run not persisted) or transient — keep the address, drop the reference.
      const retry = await db.from("email_captures").insert({ email, run_id: null, stage });
      if (retry.error) console.error("[capture-email] persist failed:", retry.error.message);
    }
  }

  // Best-effort results link (no await on the response path beyond this call's timeout).
  if (runId) {
    const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://findyourplace.app";
    void sendEmail({
      to: email,
      subject: "Your results are saved — Find Your Place",
      html: resultsLinkHtml(`${origin}/results/${runId}`),
    });
  }

  return NextResponse.json({ ok: true });
}
