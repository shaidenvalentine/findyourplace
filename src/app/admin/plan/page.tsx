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
  AD_PLATFORMS,
  AD_PLATFORMS_SKIP,
  META_PLAYBOOK,
  AD_SPEND_CARDS,
  CARD_STRATEGY_RULES,
  CARD_DISCLAIMER,
  POINTS_GOAL_MONTHLY,
  POINTS_STACK,
  POINTS_STACK_SPEND_CENTS,
  POINTS_STACK_TOTAL,
  POINTS_LADDER,
  POINTS_GOAL_NOTES,
} from "@/lib/admin/growthPlan";
import {
  Target,
  TrendingUp,
  Users,
  Megaphone,
  Share2,
  Flag,
  MapPin,
  CreditCard,
  Check,
  Ban,
  Plane,
} from "lucide-react";

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

        {/* ── Paid acquisition playbook ──────────────────────────────────── */}
        <div className="mt-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Megaphone className="size-4 text-accent" />
            Paid acquisition playbook
          </div>
          <h2 className="mt-1 text-xl font-bold tracking-tight">Where to spend, how to run it, and how to earn on it</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            The three levers behind the ~25% paid slice: the right platforms for this product, the current
            Meta playbook, and turning ad spend into card points that rebate your biggest cost.
          </p>
        </div>

        {/* Where to advertise */}
        <Card className="mt-5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="size-4 text-accent" /> Where to advertise this product
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              {AD_PLATFORMS.map((p) => (
                <div
                  key={p.rank}
                  className="grid grid-cols-12 items-start gap-3 border-b border-border py-3 last:border-0"
                >
                  <span className="col-span-1 text-sm font-bold text-muted-foreground tabular-nums">#{p.rank}</span>
                  <div className="col-span-11 sm:col-span-4">
                    <div className="font-semibold">{p.name}</div>
                    <Badge variant={p.role.startsWith("Primary") ? "accent" : "outline"} className="mt-1">
                      {p.role}
                    </Badge>
                  </div>
                  <p className="col-span-12 text-xs leading-relaxed text-muted-foreground sm:col-span-7">{p.why}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-muted/30 p-3 text-xs leading-relaxed text-muted-foreground">
              <Ban className="mt-0.5 size-4 shrink-0 text-destructive" />
              <span>{AD_PLATFORMS_SKIP}</span>
            </div>
          </CardContent>
        </Card>

        {/* Meta playbook */}
        <Card className="mt-5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Megaphone className="size-4 text-accent" /> The Meta playbook — 2026
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {META_PLAYBOOK.map((item) => (
                <div key={item.title} className="rounded-xl border border-border bg-surface/30 p-3">
                  <div className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} />
                    <div>
                      <div className="text-sm font-semibold">{item.title}</div>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Card points */}
        <Card className="mt-5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CreditCard className="size-4 text-accent" /> Ad spend → credit card points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              At scale, ad spend is your biggest line item. The right card rebates 2–8% of it. Best options as of
              mid-2026:
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="py-2 pr-3 font-medium">Card</th>
                    <th className="py-2 pr-3 font-medium">Rate on ads</th>
                    <th className="py-2 pr-3 font-medium">Effective return</th>
                    <th className="py-2 pr-3 font-medium">Cap</th>
                    <th className="py-2 font-medium">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {AD_SPEND_CARDS.map((c) => (
                    <tr key={c.name} className="border-b border-border align-top last:border-0">
                      <td className="py-3 pr-3">
                        <div className="font-semibold">{c.name}</div>
                        <div className="mt-0.5 text-xs text-muted-foreground">{c.note}</div>
                      </td>
                      <td className="py-3 pr-3 font-medium">{c.rate}</td>
                      <td className="py-3 pr-3 font-bold tabular-nums text-success">{c.effectiveReturn}</td>
                      <td className="py-3 pr-3 text-muted-foreground">{c.cap}</td>
                      <td className="py-3 text-muted-foreground">{c.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {CARD_STRATEGY_RULES.map((r) => (
                <div key={r.title} className="rounded-xl border border-border bg-surface/30 p-3">
                  <div className="text-sm font-semibold">{r.title}</div>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{r.detail}</p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">{CARD_DISCLAIMER}</p>
          </CardContent>
        </Card>

        {/* Points goal — 200k/mo → business class for two */}
        <Card className="mt-5 border-accent/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Plane className="size-4 text-accent" /> Points goal — {POINTS_GOAL_MONTHLY.toLocaleString()}/month
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Business class for two, every month. Here&apos;s the honest recipe — and where each stage of the
              business actually lands.
            </p>
          </CardHeader>
          <CardContent>
            {/* The stack */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="py-2 pr-3 font-medium">Card</th>
                    <th className="py-2 pr-3 font-medium">Player</th>
                    <th className="py-2 pr-3 font-medium">Ad spend/mo</th>
                    <th className="py-2 pr-3 font-medium">Rate</th>
                    <th className="py-2 text-right font-medium">Points/mo</th>
                  </tr>
                </thead>
                <tbody>
                  {POINTS_STACK.map((r, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="py-2.5 pr-3 font-medium">{r.card}</td>
                      <td className="py-2.5 pr-3 text-muted-foreground">{r.player}</td>
                      <td className="py-2.5 pr-3 tabular-nums text-muted-foreground">{money(r.monthlySpendCents)}</td>
                      <td className="py-2.5 pr-3 tabular-nums">{r.multiplier}</td>
                      <td className="py-2.5 text-right font-semibold tabular-nums text-success">
                        {r.monthlyPoints.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-border font-bold">
                    <td className="py-2.5 pr-3" colSpan={2}>
                      Total
                    </td>
                    <td className="py-2.5 pr-3 tabular-nums">{money(POINTS_STACK_SPEND_CENTS)}</td>
                    <td className="py-2.5 pr-3" />
                    <td className="py-2.5 text-right tabular-nums text-gradient">
                      {POINTS_STACK_TOTAL.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Ladder — where stages land */}
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {POINTS_LADDER.map((rung) => {
                const isGoal = rung.monthlyPoints === POINTS_STACK_TOTAL;
                return (
                  <div
                    key={rung.label}
                    className={
                      isGoal
                        ? "rounded-xl border border-accent/50 bg-accent/5 p-3"
                        : "rounded-xl border border-border bg-surface/30 p-3"
                    }
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold">{rung.label}</span>
                      <span className="text-sm font-bold tabular-nums text-success">
                        {rung.monthlyPoints.toLocaleString()} pts
                      </span>
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground tabular-nums">
                      {money(rung.monthlyAdSpendCents)}/mo ad spend
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{rung.buys}</p>
                  </div>
                );
              })}
            </div>

            {/* Honest framing */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {POINTS_GOAL_NOTES.map((n) => (
                <div key={n.title} className="rounded-xl border border-border bg-surface/30 p-3">
                  <div className="text-sm font-semibold">{n.title}</div>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{n.detail}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
