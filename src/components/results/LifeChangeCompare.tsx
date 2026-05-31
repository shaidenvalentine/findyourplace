import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { LifeChange } from "@/lib/lifeChange";
import { TrendingUp, ArrowRight } from "lucide-react";

/**
 * The free, share-worthy peak: how the user's life could change between their current
 * city and their (still-unnamed) #1 match — overall and by category.
 */
export function LifeChangeCompare({ city, lifeChange }: { city: string; lifeChange: LifeChange }) {
  const here = city?.trim() || "where you live now";
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
            <div className="mt-0.5 text-[11px] text-muted-foreground">your best-fit place 🔒</div>
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
                {/* current marker */}
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-muted-foreground/40"
                  style={{ width: `${Math.max(2, Math.min(100, c.current))}%` }}
                />
                {/* best fill */}
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,hsl(var(--secondary)),hsl(var(--primary)))]"
                  style={{ width: `${Math.max(2, Math.min(100, c.best))}%`, opacity: 0.85 }}
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
