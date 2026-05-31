import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin/session";
import { getCreatorStore } from "@/lib/creators/store";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const patch: Record<string, unknown> = {};
  if (typeof body.status === "string" && (body.status === "active" || body.status === "suspended")) {
    patch.status = body.status;
  }
  if (typeof body.revSharePct === "number" && body.revSharePct >= 0 && body.revSharePct <= 100) {
    patch.revSharePct = Math.round(body.revSharePct);
  }
  if (typeof body.approved === "boolean") patch.approved = body.approved;
  const updated = await getCreatorStore().updateCreator(id, patch);
  if (!updated) return NextResponse.json({ error: "Creator not found" }, { status: 404 });
  return NextResponse.json({ creator: updated });
}
