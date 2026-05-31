import { NextResponse } from "next/server";
import { getCurrentCreator } from "@/lib/creators/session";

export async function GET() {
  const creator = await getCurrentCreator();
  if (!creator) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  return NextResponse.json({ creator });
}
