import { NextRequest, NextResponse } from "next/server";

/**
 * Email gate capture. Phase 4 forwards these to an ESP (Resend/Loops/ConvertKit)
 * to drive the non-buyer nurture sequence. For now it validates and acknowledges;
 * if RESEND_API_KEY (or similar) is configured later, forward here.
 */
export async function POST(req: NextRequest) {
  let body: { email?: string; runId?: string; stage?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const email = (body.email ?? "").trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!valid) return NextResponse.json({ error: "Invalid email" }, { status: 422 });

  // TODO(Phase 4): upsert into Supabase `email_captures` + push to ESP audience.
  return NextResponse.json({ ok: true });
}
