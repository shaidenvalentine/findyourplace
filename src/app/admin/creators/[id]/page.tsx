import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "@/lib/admin/session";
import { getCreatorStore } from "@/lib/creators/store";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreatorAdminControls } from "@/components/admin/CreatorAdminControls";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

function money(cents: number): string {
  return `$${(cents / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default async function AdminCreatorDetail({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) redirect("/admin/login");
  const { id } = await params;
  const store = getCreatorStore();
  const creator = await store.getCreatorById(id);
  if (!creator) notFound();

  const stats = await store.getStats(id);
  const conversions = await store.listConversions(id, 100);
  const payouts = await store.listPayouts(id);

  return (
    <AdminShell>
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
        <Link href="/admin/creators" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> All creators
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{creator.displayName}</h1>
          <Badge variant={creator.status === "active" ? "success" : "outline"}>{creator.status}</Badge>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {creator.code} · {creator.email} · {creator.revSharePct}% rev share · joined{" "}
          {new Date(creator.createdAt).toLocaleDateString()}
        </p>
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
          {creator.instagramHandle && <span>IG {creator.instagramHandle}</span>}
          {creator.tiktokHandle && <span>TikTok {creator.tiktokHandle}</span>}
          {creator.youtubeHandle && <span>YT {creator.youtubeHandle}</span>}
          {creator.payoutEmail && <span>Wise: {creator.payoutEmail}</span>}
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Metric label="Total earned" value={money(stats.totalEarningsCents)} accent />
          <Metric label="Pending" value={money(stats.pendingEarningsCents)} />
          <Metric label="Clicks" value={stats.lifetimeClicks.toLocaleString()} />
          <Metric label="Conversions" value={`${stats.lifetimeConversions} (${stats.conversionRatePct}%)`} />
        </div>

        {/* Admin controls */}
        <Card className="mt-5">
          <CardHeader>
            <CardTitle className="text-base">Manage</CardTitle>
          </CardHeader>
          <CardContent>
            <CreatorAdminControls
              creatorId={creator.id}
              status={creator.status}
              revSharePct={creator.revSharePct}
              pendingCents={stats.pendingEarningsCents}
            />
          </CardContent>
        </Card>

        {/* Conversions */}
        <Card className="mt-5">
          <CardHeader>
            <CardTitle className="text-base">Conversions ({conversions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {conversions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No conversions yet.</p>
            ) : (
              <div className="flex flex-col">
                {conversions.map((c) => (
                  <div key={c.id} className="grid grid-cols-12 items-center gap-3 border-b border-border py-2.5 last:border-0">
                    <span className="col-span-3 text-sm tabular-nums">{money(c.amountCents)}</span>
                    <span className="col-span-4 truncate text-xs text-muted-foreground">{c.email ?? "—"}</span>
                    <span className="col-span-3 truncate text-xs text-muted-foreground">
                      {new Date(c.createdAt).toLocaleString()}
                    </span>
                    <span className="col-span-1">
                      <Badge variant={c.status === "paid" ? "success" : "default"}>{c.status}</Badge>
                    </span>
                    <span className="col-span-1 text-right text-sm font-bold tabular-nums text-success">
                      {money(c.creatorCutCents)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payouts */}
        <Card className="mt-5">
          <CardHeader>
            <CardTitle className="text-base">Payouts ({payouts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {payouts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No payouts yet.</p>
            ) : (
              <div className="flex flex-col">
                {payouts.map((p) => (
                  <div key={p.id} className="grid grid-cols-12 items-center gap-3 border-b border-border py-2.5 last:border-0">
                    <span className="col-span-6 text-sm">
                      {p.periodStart} → {p.periodEnd}
                      <span className="ml-2 text-xs text-muted-foreground">({p.conversionCount} sales)</span>
                    </span>
                    <span className="col-span-3">
                      <Badge variant={p.status === "paid" ? "success" : "outline"}>{p.status}</Badge>
                    </span>
                    <span className="col-span-3 text-right text-sm font-bold tabular-nums">{money(p.totalCents)}</span>
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

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-2xl glass p-4">
      <div className="mb-2 text-xs text-muted-foreground">{label}</div>
      <div className={accent ? "text-xl font-extrabold tabular-nums text-gradient sm:text-2xl" : "text-xl font-extrabold tabular-nums sm:text-2xl"}>
        {value}
      </div>
    </div>
  );
}
