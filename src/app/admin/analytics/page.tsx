import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "@/lib/admin/session";
import { getAnalyticsStore } from "@/lib/analytics/store";
import { QUIZ } from "@/lib/quiz";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, TrendingDown, DollarSign, Mail, MapPin, Route } from "lucide-react";

export const dynamic = "force-dynamic";

const WINDOWS = [7, 30, 90] as const;

function money(cents: number): string {
  return `$${(cents / 100).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin/login");

  const sp = await searchParams;
  const days = WINDOWS.includes(Number(sp.days) as (typeof WINDOWS)[number]) ? Number(sp.days) : 30;
  const data = await getAnalyticsStore().overview(days);

  const starts = data.funnel.find((f) => f.name === "quiz_start")?.sessions ?? 0;
  const topPlaceMax = data.topPlaces[0]?.count ?? 1;
  const stepMax = data.quizSteps[0]?.sessions ?? 1;

  return (
    <AdminShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Analytics</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Your own funnel — how far people make it, from landing to purchase.
            </p>
          </div>
          <div className="flex gap-1 rounded-lg border border-border p-1">
            {WINDOWS.map((w) => (
              <Link
                key={w}
                href={`/admin/analytics?days=${w}`}
                className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                  w === days ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {w}d
              </Link>
            ))}
          </div>
        </div>

        {/* Top-line */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Metric icon={<Activity className="size-4" />} label="Quiz starts" value={starts.toLocaleString()} />
          <Metric
            icon={<TrendingDown className="size-4" />}
            label="Start → complete"
            value={`${data.rates.startToComplete}%`}
            sub={`${data.rates.overall}% start → buy`}
          />
          <Metric
            icon={<DollarSign className="size-4" />}
            label="Revenue"
            value={money(data.revenue.totalCents)}
            sub={`${data.revenue.unlocks} unlocks · ${money(data.revenue.aovCents)} AOV`}
            accent
          />
          <Metric
            icon={<Mail className="size-4" />}
            label="Emails captured"
            value={data.emails.total.toLocaleString()}
          />
        </div>

        {/* Funnel */}
        <Card className="mt-5">
          <CardHeader>
            <CardTitle className="text-base">Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            {starts === 0 && data.funnel.every((f) => f.sessions === 0) ? (
              <Empty />
            ) : (
              <div className="flex flex-col gap-2.5">
                {data.funnel.map((f, i) => {
                  const prev = i > 0 ? data.funnel[i - 1].sessions : f.sessions;
                  const width = starts > 0 ? Math.max((f.sessions / Math.max(starts, 1)) * 100, f.sessions > 0 ? 3 : 0) : 0;
                  const stepPct = i === 0 ? 100 : prev > 0 ? Math.round((f.sessions / prev) * 100) : 0;
                  return (
                    <div key={f.name} className="grid grid-cols-12 items-center gap-3">
                      <span className="col-span-4 truncate text-sm sm:col-span-3">{f.label}</span>
                      <div className="col-span-6 sm:col-span-7">
                        <div className="h-6 w-full overflow-hidden rounded-md bg-muted/40">
                          <div
                            className="flex h-full items-center justify-end rounded-md bg-primary/70 px-2 text-xs font-semibold text-primary-foreground"
                            style={{ width: `${width}%` }}
                          >
                            {f.sessions > 0 && width > 12 ? f.sessions.toLocaleString() : ""}
                          </div>
                        </div>
                      </div>
                      <span className="col-span-2 text-right text-sm tabular-nums">
                        {width <= 12 ? f.sessions.toLocaleString() : ""}
                        <span className="ml-1 text-xs text-muted-foreground">{i > 0 ? `${stepPct}%` : ""}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {/* Quiz drop-off */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quiz drop-off by question</CardTitle>
            </CardHeader>
            <CardContent>
              {data.quizSteps.length === 0 ? (
                <Empty />
              ) : (
                <div className="flex flex-col gap-2">
                  {data.quizSteps.map((s) => {
                    const label = QUIZ[s.index]?.title ?? s.key ?? `Q${s.index + 1}`;
                    const width = Math.max((s.sessions / Math.max(stepMax, 1)) * 100, s.sessions > 0 ? 3 : 0);
                    return (
                      <div key={s.index} className="grid grid-cols-12 items-center gap-2">
                        <span className="col-span-1 text-xs tabular-nums text-muted-foreground">{s.index + 1}</span>
                        <span className="col-span-6 truncate text-sm">{label}</span>
                        <div className="col-span-3">
                          <div className="h-4 w-full overflow-hidden rounded bg-muted/40">
                            <div className="h-full rounded bg-primary/60" style={{ width: `${width}%` }} />
                          </div>
                        </div>
                        <span className="col-span-2 text-right text-sm tabular-nums">{s.sessions.toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top matched places */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="size-4" /> Top #1 matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.topPlaces.length === 0 ? (
                <Empty />
              ) : (
                <div className="flex flex-col gap-2">
                  {data.topPlaces.map((p) => {
                    const width = Math.max((p.count / Math.max(topPlaceMax, 1)) * 100, 3);
                    return (
                      <div key={p.name} className="grid grid-cols-12 items-center gap-2">
                        <span className="col-span-5 truncate text-sm">{p.name}</span>
                        <div className="col-span-5">
                          <div className="h-4 w-full overflow-hidden rounded bg-muted/40">
                            <div className="h-full rounded bg-success/60" style={{ width: `${width}%` }} />
                          </div>
                        </div>
                        <span className="col-span-2 text-right text-sm tabular-nums">{p.count.toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {/* Entry paths */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Route className="size-4" /> Entry paths
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.runs.bySource.length === 0 ? (
                <Empty />
              ) : (
                <div className="flex flex-col">
                  {data.runs.bySource.map((s) => (
                    <div key={s.source} className="flex items-center justify-between border-b border-border py-2 text-sm last:border-0">
                      <span className="capitalize">{s.source.replace("-", " ")}</span>
                      <span className="tabular-nums">
                        {s.count.toLocaleString()}
                        <span className="ml-2 text-xs text-muted-foreground">
                          {data.runs.total > 0 ? Math.round((s.count / data.runs.total) * 100) : 0}%
                        </span>
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-2 text-sm font-semibold">
                    <span>Total runs</span>
                    <span className="tabular-nums">{data.runs.total.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Daily activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Daily activity</CardTitle>
            </CardHeader>
            <CardContent>
              {data.byDay.length === 0 ? (
                <Empty />
              ) : (
                <div className="max-h-72 overflow-y-auto">
                  <div className="grid grid-cols-4 gap-2 border-b border-border pb-2 text-xs font-medium text-muted-foreground">
                    <span>Date</span>
                    <span className="text-right">Starts</span>
                    <span className="text-right">Complete</span>
                    <span className="text-right">Buys</span>
                  </div>
                  {[...data.byDay].reverse().map((d) => (
                    <div key={d.date} className="grid grid-cols-4 gap-2 border-b border-border py-1.5 text-sm tabular-nums last:border-0">
                      <span className="text-muted-foreground">{d.date.slice(5)}</span>
                      <span className="text-right">{d.quizStarts}</span>
                      <span className="text-right">{d.completions}</span>
                      <span className="text-right font-semibold text-success">{d.purchases}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}

function Empty() {
  return <p className="text-sm text-muted-foreground">No data yet in this window.</p>;
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
    <div className="rounded-2xl glass p-4">
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
