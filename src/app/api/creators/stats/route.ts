import { NextResponse } from "next/server";
import { getCurrentCreator } from "@/lib/creators/session";
import { getCreatorStore } from "@/lib/creators/store";

export async function GET() {
  const creator = await getCurrentCreator();
  if (!creator) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const stats = await getCreatorStore().getStats(creator.id);
  return NextResponse.json({ stats });
}
