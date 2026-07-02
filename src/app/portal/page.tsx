import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentCreator } from "@/lib/creators/session";
import { getCreatorStore } from "@/lib/creators/store";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Eye, ShoppingCart, ExternalLink } from "lucide-react";
import { CopyLinkButton } from "@/components/portal/CopyLinkButton";

export const dynamic = "force-dynamic";

function money(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function PortalDashboard() {
  const creator = await getCurrentCreator();
  if (!creator) redirect("/portal/login");
  const stats = await getCreatorStore().getStats(creator.id);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://findyourplace.app";
  const refLink = `${siteUrl}/c/${creator.code}`;
  const queryLink = `${siteUrl}?ref=${creator.code}`;

  return (
    <PortalShell>
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
        <div className="mb-2 flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Hey, {creator.displayName.split(" ")[0]}.</h1>
        </div>
        <p className="mb-8 text-sm text-muted-foreground">
          Your code: <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-semibold">{creator.code}</code> · {creator.revSharePct}% rev share
        </p>

        {/* Top stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Metric icon={<DollarSign className="size-4" />} label="Total earned" value={money(stats.totalEarningsCents)} accent />
          <Metric icon={<DollarSign className="size-4" />} label="Pending payout" value={money(stats.pendingEarningsCents)} />
          <Metric icon={<Eye className="size-4" />} label="Lifetime clicks" value={stats.lifetimeClicks.toLocaleString()} />
          <Metric icon={<ShoppingCart className="size-4" />} label="Conversions" value={stats.lifetimeConversions.toLocaleString()} />
        </div>

        {/* Last 30 + share card */}
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {/* 30-day card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Last 30 days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                <SmallStat label="Clicks" value={stats.last30.clicks.toLocaleString()} />
                <SmallStat label="Sales" value={stats.last30.conversions.toLocaleString()} />
                <SmallStat label="Earned" value={money(stats.last30.earningsCents)} accent />
              </div>
              <div className="mt-5">
                <DayBars data={stats.last30.byDay} />
              </div>
            </CardContent>
          </Card>

          {/* Share kit */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Your link</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Co-branded</p>
                <LinkRow href={refLink}>{refLink}</LinkRow>
              </div>
              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Short link</p>
                <LinkRow href={queryLink}>{queryLink}</LinkRow>
              </div>
              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Promo code</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 rounded-md border border-border bg-surface px-3 py-2 font-mono text-sm tracking-wider">
                    {creator.code.toUpperCase()}
                  </code>
                  <CopyLinkButton text={creator.code.toUpperCase()} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Use when links aren&apos;t allowed (TikTok bios, etc).</p>
              </div>
              <Button asChild variant="outline" className="w-full" size="sm">
                <Link href="/portal/links">Open share kit <ExternalLink className="size-3.5" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent conversions */}
        <Card className="mt-5">
          <CardHeader>
            <CardTitle className="text-base">Recent sales</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentConversions.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border bg-surface/40 p-6 text-center">
                <p className="text-sm font-medium">No sales yet.</p>
                <p className="mt-1 text-xs text-muted-foreground">Share your link — your first conversion shows up here in real time.</p>
              </div>
            ) : (
              <div className="flex flex-col">
                {stats.recentConversions.map((c) => (
                  <div key={c.id} className="flex items-center justify-between gap-3 border-b border-border py-3 last:border-0">
                    <div>
                      <div className="text-sm font-medium tabular-nums">{money(c.amountCents)} unlock</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(c.createdAt).toLocaleString()}
                        {c.email && ` · ${c.email}`}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={c.status === "paid" ? "success" : "outline"}>{c.status}</Badge>
                      <span className="text-sm font-bold tabular-nums text-success">+{money(c.creatorCutCents)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  );
}

function Metric({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-2xl glass p-4">
      <div className="mb-3 flex items-center gap-1.5 text-muted-foreground">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <div className={accent ? "text-2xl font-extrabold tabular-nums text-gradient sm:text-3xl" : "text-2xl font-extrabold tabular-nums sm:text-3xl"}>{value}</div>
    </div>
  );
}

function SmallStat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg bg-muted/40 p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={accent ? "mt-1 text-xl font-bold tabular-nums text-success" : "mt-1 text-xl font-bold tabular-nums"}>{value}</div>
    </div>
  );
}

function LinkRow({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <code className="flex-1 truncate rounded-md border border-border bg-surface px-3 py-2 font-mono text-xs">{children}</code>
      <CopyLinkButton text={href} />
      <Button asChild variant="outline" size="icon">
        <a href={href} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="size-4" />
        </a>
      </Button>
    </div>
  );
}

function DayBars({ data }: { data: { date: string; clicks: number; conversions: number }[] }) {
  if (data.length === 0) {
    return <p className="text-xs text-muted-foreground">No activity in the last 30 days yet.</p>;
  }
  const maxClicks = Math.max(1, ...data.map((d) => d.clicks));
  return (
    <div className="flex h-32 items-end gap-1.5">
      {data.map((d) => {
        const clickH = (d.clicks / maxClicks) * 100;
        const convH = d.clicks ? (d.conversions / d.clicks) * 100 * (d.clicks / maxClicks) : 0;
        return (
          <div key={d.date} className="flex flex-1 flex-col items-center justify-end" title={`${d.date}: ${d.clicks} clicks, ${d.conversions} conversions`}>
            <div className="relative w-full rounded-sm bg-muted/60" style={{ height: `${Math.max(2, clickH)}%` }}>
              {convH > 0 && (
                <div
                  className="absolute inset-x-0 bottom-0 rounded-sm bg-[linear-gradient(180deg,hsl(var(--accent)),hsl(var(--primary)))]"
                  style={{ height: `${Math.max(8, (d.conversions / d.clicks) * 100)}%` }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

