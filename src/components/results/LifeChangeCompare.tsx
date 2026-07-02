import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { LifeChange } from "@/lib/lifeChange";
import { titleCase } from "@/lib/utils";
import { TrendingUp, ArrowRight } from "lucide-react";

/**
 * The free, share-worthy peak: how the user's life could change between their current
 * city and their (still-unnamed) #1 match — overall and by category.
 */
export function LifeChangeCompare({ city, lifeChange }: { city: string; lifeChange: LifeChange }) {
  const here = city?.trim() ? titleCase(city.trim()) : "where you live now";

  // The #1 match IS their current city — that's a validation moment, not a "jump".
  // Comparing a city to itself with directional trade-off notes reads as broken math.
  if (lifeChange.alreadyHome) {
    const runnerUp = lifeChange.runnerUpScore;
    const heldTheTop = runnerUp === null || runnerUp <= lifeChange.currentScore;
    return (
      <Card className="overflow-hidden">
        <CardHeader>
          <Badge variant="accent" className="w-fit">
            <TrendingUp className="size-3" /> Plot twist
          </Badge>
          <CardTitle className="text-lg">{lifeChange.headline}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 rounded-xl border border-border bg-surface p-5 text-center">
            <div className="text-4xl font-light tabular-nums tracking-tight">{lifeChange.currentScore}</div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              {here} — your fit today
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            {heldTheTop ? (
              <>
                We scored all 250 places against you, and the top of the list looks{" "}
                <span className="font-semibold text-foreground">very familiar</span>
                {typeof runnerUp === "number" ? (
                  <> — the closest challenger anywhere reached {runnerUp}.</>
                ) : (
                  <>.</>
                )}
              </>
            ) : (
              <>
                One place matched your raw stats slightly harder ({runnerUp}) — but on the things
                you said actually matter, the top of your ranking looks{" "}
                <span className="font-semibold text-foreground">very familiar</span>.
              </>
            )}{" "}
            Unlock to confirm your #1 — and see how the other 249 stack up.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <Badge variant="accent" className="w-fit">
          <TrendingUp className="size-3" /> How your life could change
        </Badge>
        <CardTitle className="text-lg">{lifeChange.headline}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Overall current → best */}
        <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4">
          <div className="flex-1 text-center">
            <div className="text-3xl font-extrabold tabular-nums text-muted-foreground">
              {lifeChange.currentScore}
            </div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">{here}</div>
          </div>
          <div className="flex flex-col items-center text-success">
            <ArrowRight className="size-5" />
            {lifeChange.overallDelta > 0 && (
              <span className="text-xs font-bold tabular-nums">+{lifeChange.overallDelta}</span>
            )}
          </div>
          <div className="flex-1 text-center">
            <div className="text-3xl font-extrabold tabular-nums text-gradient">{lifeChange.bestScore}</div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">your best-fit place</div>
          </div>
        </div>

        {/* Per-category deltas */}
        <div className="flex flex-col gap-3">
          {lifeChange.categories.map((c) => (
            <div key={c.label}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{c.label}</span>
                <span className="flex items-center gap-2 tabular-nums">
                  <span className="text-muted-foreground">{c.current}</span>
                  <ArrowRight className="size-3 text-muted-foreground" />
                  <span className="font-semibold">{c.best}</span>
                  {c.delta > 0 && (
                    <span className="rounded-full bg-success/15 px-1.5 text-xs font-semibold text-success">
                      +{c.delta}
                    </span>
                  )}
                </span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                {/* best fill (the achievable) */}
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,hsl(var(--secondary)),hsl(var(--primary)))]"
                  style={{ width: `${Math.max(2, Math.min(100, c.best))}%` }}
                />
                {/* current-city tick, drawn on top so the gap to "best" is always visible
                    (and reads correctly even when the current city is the stronger one) */}
                <div
                  className="absolute inset-y-0 w-0.5 bg-foreground/80"
                  style={{ left: `${Math.max(0, Math.min(99, c.current))}%` }}
                  aria-hidden
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{c.note}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
