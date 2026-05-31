import { NextRequest, NextResponse } from "next/server";
import { checkAdminPassword, setAdminSession } from "@/lib/admin/session";

export async function POST(req: NextRequest) {
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
