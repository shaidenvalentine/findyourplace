import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin/session";
import { sendEmail, resultsLinkHtml, isEmailConfigured } from "@/lib/server/email";

/**
 * Admin: resend a customer's "your results are saved" link. This is the recovery path
 * for "I lost my results" support — look the buyer up in /admin/customers, hit resend.
 */
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isEmailConfigured()) {
    return NextResponse.json({ error: "Email isn't configured — set RESEND_API_KEY first." }, { status: 503 });
  }
  let body: { email?: string; runId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const email = (body.email ?? "").trim().toLowerCase();
  const runId = (body.runId ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !runId) {
    return NextResponse.json({ error: "Valid email + runId required" }, { status: 422 });
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://findyourplace.app";
  const ok = await sendEmail({
    to: email,
    subject: "Your results link — Find Your Place",
    html: resultsLinkHtml(`${origin}/results/${runId}`),
  });
  if (!ok) return NextResponse.json({ error: "Send failed — check Resend dashboard." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
