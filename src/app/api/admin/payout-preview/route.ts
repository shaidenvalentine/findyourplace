import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin/session";
import { getCreatorStore } from "@/lib/creators/store";

/** Returns the pending conversion IDs + total for a creator, ready to be paid out. */
export async function GET(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const creatorId = req.nextUrl.searchParams.get("creatorId") ?? "";
  if (!creatorId) return NextResponse.json({ error: "creatorId required" }, { status: 422 });
  const conversions = await getCreatorStore().listConversions(creatorId, 1000);
  const pending = conversions.filter((c) => c.status === "pending");
  return NextResponse.json({
    conversionIds: pending.map((c) => c.id),
    totalCents: pending.reduce((s, c) => s + c.creatorCutCents, 0),
    count: pending.length,
  });
}
