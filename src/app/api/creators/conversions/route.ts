import { NextResponse } from "next/server";
import { getCurrentCreator } from "@/lib/creators/session";
import { getCreatorStore } from "@/lib/creators/store";

export async function GET() {
  const creator = await getCurrentCreator();
  if (!creator) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const conversions = await getCreatorStore().listConversions(creator.id, 200);
  const payouts = await getCreatorStore().listPayouts(creator.id);
  return NextResponse.json({ conversions, payouts });
}
