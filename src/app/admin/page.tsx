import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "@/lib/admin/session";
import { getCreatorStore } from "@/lib/creators/store";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Users, TrendingUp, Wallet, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

function money(cents: number): string {
  return `$${(cents / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default async function AdminOverview() {
  if (!(await isAdmin())) redirect("/admin/login");
  const store = getCreatorStore();
  const stats = await store.getGlobalStats();
  const pending = await store.listPendingByCreator();
  const recent = await store.listAllConversions(15);
  const allCreators = await store.listCreators();
  const topCreators = await Promise.all(
    allCreators.slice(0, 50).map(async (c) => ({
      creator: c,
      earned: await store.sumCreatorCut(c.id),
      conversions: await store.countConversions(c.id),
    }))
  );
  const top5 = topCreators
    .filter((t) => t.conversions > 0)
    .sort((a, b) => b.earned - a.earned)
    .slice(0, 5);

  return (
    <AdminShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">Business at a glance.</p>

        {/* Top metrics */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Metric
            icon={<DollarSign className="size-4" />}
            label="Total revenue"
            value={money(stats.totalRevenueCents)}
            accent
          />
          <Metric
            icon={<TrendingUp className="size-4" />}
            label="Last 30 days"
            value={money(stats.last30RevenueCents)}
            sub={`${stats.last30Conversions} sales`}
          />
          <Metric
            icon={<Wallet className="size-4" />}
            label="Pending payouts"
            value={money(stats.pendingPayoutCents)}
            sub="owed to creators"
          />
          <Metric
            icon={<Users className="size-4" />}
            label="Creators"
            value={stats.creatorCount.toLocaleString()}
            sub={`${stats.activeCreatorCount} active`}
          />
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {/* Top creators */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Top creators</CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/creators">
                  All <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {top5.length === 0 ? (
                <p className="text-sm text-muted-foreground">No conversions yet across any creator.</p>
              ) : (
                <div className="flex flex-col">
                  {top5.map((t, i) => (
                    <Link
                      key={t.creator.id}
                      href={`/admin/creators/${t.creator.id}`}
                      className="grid grid-cols-12 items-center gap-3 border-b border-border py-3 last:border-0 hover:bg-muted/30"
                    >
                      <span className="col-span-1 text-sm font-bold text-muted-foreground">#{i + 1}</span>
                      <span className="col-span-5 truncate font-medium">{t.creator.displayName}</span>
                      <span className="col-span-2 truncate text-xs text-muted-foreground">{t.creator.code}</span>
                      <span className="col-span-2 text-right text-sm tabular-nums">{t.conversions}</span>
                      <span className="col-span-2 text-right text-sm font-bold tabular-nums text-success">
                        {money(t.earned)}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pending payouts */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Owed this period</CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/payouts">
                  Pay out <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {pending.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nothing pending — all caught up.</p>
              ) : (
                <div className="flex flex-col">
                  {pending.slice(0, 8).map((p) => (
                    <Link
                      key={p.creator.id}
                      href={`/admin/creators/${p.creator.id}`}
                      className="flex items-center justify-between gap-3 border-b border-border py-2.5 last:border-0 hover:bg-muted/30"
                    >
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">{p.creator.displayName}</div>
                        <div className="text-xs text-muted-foreground">{p.pendingCount} sales</div>
                      </div>
                      <div className="shrink-0 text-sm font-bold tabular-nums text-success">{money(p.pendingCents)}</div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent activity */}
        <Card className="mt-5">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent conversions</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/conversions">
                All <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recent.length === 0 ? (
              <p className="text-sm text-muted-foreground">No conversions yet.</p>
            ) : (
              <div className="flex flex-col">
                {recent.map((c) => (
                  <div key={c.id} className="grid grid-cols-12 items-center gap-3 border-b border-border py-2.5 last:border-0">
                    <span className="col-span-3 text-sm font-medium tabular-nums">{money(c.amountCents)}</span>
                    <span className="col-span-3 truncate text-xs text-muted-foreground">{c.email ?? "—"}</span>
                    <span className="col-span-3 truncate text-xs text-muted-foreground">
                      {new Date(c.createdAt).toLocaleString()}
                    </span>
                    <span className="col-span-1">
                      <Badge variant={c.status === "paid" ? "success" : c.status === "refunded" ? "outline" : "default"}>
                        {c.status}
                      </Badge>
                    </span>
                    <span className="col-span-2 text-right text-sm font-bold tabular-nums text-success">
                      +{money(c.creatorCutCents)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}

function Metric({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center gap-1.5 text-muted-foreground">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <div className={accent ? "text-2xl font-extrabold tabular-nums text-gradient sm:text-3xl" : "text-2xl font-extrabold tabular-nums sm:text-3xl"}>
        {value}
      </div>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}
