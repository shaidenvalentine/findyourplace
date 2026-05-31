import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "@/lib/admin/session";
import { getCreatorStore } from "@/lib/creators/store";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

function money(cents: number): string {
  return `$${(cents / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default async function AdminCreators() {
  if (!(await isAdmin())) redirect("/admin/login");
  const store = getCreatorStore();
  const creators = await store.listCreators();
  const rows = await Promise.all(
    creators.map(async (c) => ({
      creator: c,
      earned: await store.sumCreatorCut(c.id),
      pending: await store.sumCreatorCut(c.id, "pending"),
      conversions: await store.countConversions(c.id),
      clicks: await store.countClicks(c.id),
    }))
  );
  rows.sort((a, b) => b.earned - a.earned);

  return (
    <AdminShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Creators</h1>
        <p className="mt-1 text-sm text-muted-foreground">{creators.length} total. Click any to manage.</p>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">All creators</CardTitle>
          </CardHeader>
          <CardContent>
            {rows.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border bg-surface/40 p-8 text-center text-sm text-muted-foreground">
                No creators have signed up yet. Share <code className="rounded bg-muted px-1.5 py-0.5">findyourplace.app/creators</code>.
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="grid grid-cols-12 gap-3 border-b border-border pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <span className="col-span-4">Creator</span>
                  <span className="col-span-2 text-right">Clicks</span>
                  <span className="col-span-1 text-right">Sales</span>
                  <span className="col-span-2 text-right">Pending</span>
                  <span className="col-span-2 text-right">Earned</span>
                  <span className="col-span-1 text-right">Status</span>
                </div>
                {rows.map((r) => (
                  <Link
                    key={r.creator.id}
                    href={`/admin/creators/${r.creator.id}`}
                    className="grid grid-cols-12 items-center gap-3 border-b border-border py-3 last:border-0 hover:bg-muted/30"
                  >
                    <div className="col-span-4 min-w-0">
                      <div className="truncate font-medium">{r.creator.displayName}</div>
                      <div className="truncate text-xs text-muted-foreground">
                        {r.creator.code} · {r.creator.revSharePct}%
                      </div>
                    </div>
                    <span className="col-span-2 text-right text-sm tabular-nums">{r.clicks.toLocaleString()}</span>
                    <span className="col-span-1 text-right text-sm tabular-nums">{r.conversions}</span>
                    <span className="col-span-2 text-right text-sm tabular-nums text-muted-foreground">{money(r.pending)}</span>
                    <span className="col-span-2 text-right text-sm font-bold tabular-nums text-success">{money(r.earned)}</span>
                    <span className="col-span-1 flex justify-end">
                      <Badge variant={r.creator.status === "active" ? "success" : "outline"}>
                        {r.creator.status === "active" ? "live" : "off"}
                      </Badge>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
