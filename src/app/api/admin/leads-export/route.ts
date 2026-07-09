import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin/session";
import { listLeads } from "@/lib/admin/insights";

/**
 * Admin: export the deduped lead list as CSV — for importing into an ESP
 * (Resend Audiences / Loops / ConvertKit) until a live sync is wired.
 */
export const runtime = "nodejs";

function csvCell(v: string): string {
  return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const leads = await listLeads(5000);
  const rows = [
    "email,stage,bought,captured_at,run_url",
    ...leads.map((l) =>
      [
        csvCell(l.email),
        csvCell(l.stage ?? ""),
        l.bought ? "yes" : "no",
        l.createdAt,
        l.runId ? `https://findyourplace.app/results/${l.runId}` : "",
      ].join(","),
    ),
  ];
  return new NextResponse(rows.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="findyourplace-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
