import { NextRequest, NextResponse } from "next/server";
import { checkAdminPassword, setAdminSession } from "@/lib/admin/session";
import { enforceRateLimit } from "@/lib/server/rateLimit";

export async function POST(req: NextRequest) {
  // Throttle password guessing — the admin gate protects payouts and buyer PII.
  const limited = enforceRateLimit(req, "admin-login", 8, 300);
  if (limited) return limited;

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!checkAdminPassword(body.password ?? "")) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }
  await setAdminSession();
  return NextResponse.json({ ok: true });
}
