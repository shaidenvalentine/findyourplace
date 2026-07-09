import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin/session";
import { listLeads } from "@/lib/admin/insights";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const leads = await listLeads(500);
  const buyers = leads.filter((l) => l.bought).length;

  return (
    <AdminShell>
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Leads</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Every email captured at the gate — deduped, newest first. The ~90% who don&apos;t buy
              on the spot are the nurture list.
            </p>
          </div>
          <a
            href="/api/admin/leads-export"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border px-4 text-sm font-semibold hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Download className="size-4" /> Export CSV
          </a>
        </div>

        <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
          <span>
            <span className="font-semibold text-foreground">{leads.length}</span> unique emails
          </span>
          <span>
            <span className="font-semibold text-success">{buyers}</span> became buyers
          </span>
        </div>

        <Card className="mt-4">
          <CardContent className="p-0">
            {leads.length === 0 ? (
              <p className="p-6 text-sm text-muted-foreground">
                No emails captured yet — or Supabase isn&apos;t configured on this environment.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs text-muted-foreground">
                      <th className="px-4 py-3 font-medium">Captured</th>
                      <th className="px-4 py-3 font-medium">Email</th>
                      <th className="px-4 py-3 font-medium">Stage</th>
                      <th className="px-4 py-3 text-right font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((l) => (
                      <tr key={l.email} className="border-b border-border last:border-0 hover:bg-muted/20">
                        <td className="whitespace-nowrap px-4 py-2.5 text-muted-foreground">
                          {new Date(l.createdAt).toLocaleString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="max-w-[240px] truncate px-4 py-2.5">{l.email}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{l.stage ?? "—"}</td>
                        <td className="px-4 py-2.5 text-right">
                          {l.bought ? <Badge variant="success">buyer</Badge> : <Badge variant="outline">lead</Badge>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
