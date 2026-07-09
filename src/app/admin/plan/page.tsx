import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin/session";
import { getCreatorStore } from "@/lib/creators/store";
import { AdminShell } from "@/components/admin/AdminShell";
import { PlanChecklist } from "@/components/admin/PlanChecklist";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  PLAN,
  PHASES,
  CHANNEL_MIX,
  NORTH_STAR_CENTS,
  FUNNEL,
  unitEconomics,
  planProgress,
} from "@/lib/admin/growthPlan";
import { Target, TrendingUp, Users, Megaphone, Share2, Flag } from "lucide-react";

export const dynamic = "force-dynamic";

function money(cents: number): string {
  const dollars = cents / 100;
  return `$${dollars.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

const CHANNEL_ICON: Record<string, React.ReactNode> = {
  creators: <Users className="size-4" />,
  founder: <Share2 className="size-4" />,
  ads: <Megaphone className="size-4" />,
};

export default async function PlanPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const store = getCreatorStore();
  const stats = await store.getGlobalStats();
  const econ = unitEconomics();
  const progress = planProgress(stats.last30RevenueCents);

  return (
    <AdminShell>
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Target className="size-4 text-accent" />
          Growth Plan
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">The road to $30k / month</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          A 12-month ladder from launch to the goal, built on the three engines already wired into this
          app — the creator program, the share loop, and Meta ads. Targets are a guide; your live numbers
          below show where you actually are.
        </p>

        {/* North Star */}
        <Card className="mt-6 overflow-hidden">
          <CardContent className="p-5 sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Last 30 days</div>
                <div className="mt-1 text-4xl font-extrabold tabular-nums text-gradient sm:text-5xl">
                  {money(stats.last30RevenueCents)}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  of <span className="font-semibold text-foreground">{money(NORTH_STAR_CENTS)}</span> goal
                  {" · "}
                  {progress.salesToGoal.toLocaleString()} sales to go
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">You are here</div>
                <div className="mt-1 text-2xl font-bold tabular-nums">
                  {progress.reachedMonth === 0 ? "Pre-launch" : `Month ${progress.reachedMonth}`}
                </div>
                <div className="mt-1 text-sm text-accent">Focus: Month {progress.focusMonth}</div>
              </div>
            </div>
            <div className="mt-5">
              <Progress value={progress.pctToGoal} className="h-3" />
              <div className="mt-1.5 flex justify-between text-xs text-muted-foreground tabular-nums">
                <span>{progress.pctToGoal.toFixed(1)}% to goal</span>
                <span>{money(NORTH_STAR_CENTS)}/mo</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Unit economics */}
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">The math to $30k</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Stat label="Price" value={money(econ.priceCents)} sub={`~${money(econ.netPerSaleCents)} net`} />
                <Stat label="Sales / month" value={econ.salesForNorthStar.toLocaleString()} sub={`~${econ.salesPerDay}/day`} />
                <Stat
                  label="Runs / month"
                  value={econ.completesNeeded.toLocaleString()}
                  sub={`at ${(FUNNEL.completeToPurchase * 100).toFixed(0)}% buy`}
                />
                <Stat
                  label="Landing views"
                  value={econ.landingViewsNeeded.toLocaleString()}
                  sub={`~${econ.landingViewsPerDay.toLocaleString()}/day`}
                />
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Funnel assumed: {(FUNNEL.landingToStart * 100).toFixed(0)}% of landings start a run,{" "}
                {(FUNNEL.startToComplete * 100).toFixed(0)}% of those finish, {(FUNNEL.completeToPurchase * 100).toFixed(0)}% of
                finishers buy. Every point you add to buy-rate cuts the traffic you need — that&apos;s why the paywall and the
                locked #1 get the most design love.
              </p>
            </CardContent>
          </Card>

          {/* Channel mix */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Channel mix at $30k</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {CHANNEL_MIX.map((c) => (
                <div key={c.key}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium">
                      {CHANNEL_ICON[c.key]}
                      {c.label}
                    </span>
                    <span className="tabular-nums text-muted-foreground">{c.sharePct}%</span>
                  </div>
                  <Progress value={c.sharePct} className="mt-1.5" />
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{c.note}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Phases + monthly roadmap */}
        <div className="mt-10">
          <h2 className="text-xl font-bold tracking-tight">The 12-month roadmap</h2>
          <p className="mt-1 text-sm text-muted-foreground">Four phases. Tick the steps as you go.</p>
        </div>

        {PHASES.map((phase) => {
          const months = PLAN.filter((m) => m.phaseKey === phase.key);
          return (
            <section key={phase.key} className="mt-6">
              <div className="rounded-2xl glass p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-bold">{phase.label}</h3>
                  <Badge variant="outline">{phase.window}</Badge>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{phase.summary}</p>
              </div>

              <div className="mt-3 flex flex-col gap-3">
                {months.map((m) => {
                  const cleared = progress.reachedMonth >= m.month;
                  const isFocus = progress.focusMonth === m.month && !cleared;
                  return (
                    <Card
                      key={m.month}
                      className={isFocus ? "border-accent/60 ring-1 ring-accent/30" : undefined}
                    >
                      <CardHeader>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary tabular-nums">
                              {m.month}
                            </div>
                            <div>
                              <CardTitle className="text-base">{m.theme}</CardTitle>
                              <div className="mt-0.5 text-xs text-muted-foreground">{m.lever}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {cleared && <Badge variant="success">cleared</Badge>}
                            {isFocus && <Badge variant="accent">you&apos;re here</Badge>}
                            <div className="text-right">
                              <div className="flex items-center gap-1 text-sm font-bold tabular-nums text-success">
                                <TrendingUp className="size-3.5" />
                                {money(m.revenueTargetCents)}
                              </div>
                              <div className="text-[11px] text-muted-foreground">rolling 30d target</div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4 flex items-start gap-2 rounded-xl bg-accent/5 p-3 text-sm">
                          <Flag className="mt-0.5 size-4 shrink-0 text-accent" />
                          <span>
                            <span className="font-semibold">Milestone: </span>
                            <span className="text-muted-foreground">{m.milestone}</span>
                          </span>
                        </div>
                        <PlanChecklist steps={m.steps} />
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </AdminShell>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-xl font-extrabold tabular-nums sm:text-2xl">{value}</div>
      {sub && <div className="text-[11px] text-muted-foreground">{sub}</div>}
    </div>
  );
}
