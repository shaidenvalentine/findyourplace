import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScoreRing } from "./ScoreRing";
import type { CurrentCityScore } from "@/lib/scoring";
import { titleCase } from "@/lib/utils";
import { MapPin } from "lucide-react";

export function CurrentCityFitCard({ city, fit }: { city: string; fit: CurrentCityScore }) {
  const displayCity = city?.trim() ? titleCase(city.trim()) : "where you live now";
  const verdict =
    fit.score >= 80 ? "You're already living a great fit." : fit.score >= 60 ? "A decent fit — but not your best." : "There's a better fit out there for you.";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MapPin className="size-3.5 text-muted-foreground" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Current city
          </span>
        </div>
        <h2 className="text-2xl font-light tracking-[-0.02em]">How {displayCity} fits you</h2>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
        <ScoreRing score={fit.score} size={120} label="fit" />
        <div className="min-w-0 flex-1">
          <p className="mb-3 text-sm font-medium">{verdict}</p>
          <div className="grid grid-cols-2 gap-2">
            {fit.categoryScores.map((c) => (
              <div key={c.label} className="rounded-xl bg-muted/50 px-3 py-2.5">
                <div className="truncate text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {c.label}
                </div>
                <div className="mt-0.5 text-xl font-light tabular-nums tracking-tight">{c.score}</div>
              </div>
            ))}
          </div>
          {fit.estimated && (
            <p className="mt-2 text-xs text-muted-foreground">
              Estimated from regional data — we read {fit.resolvedName ? titleCase(fit.resolvedName) : "your area"} from
              the area around it, so this is a close approximation rather than an exact score.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
