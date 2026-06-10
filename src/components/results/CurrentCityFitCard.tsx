import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <CardTitle className="flex items-center gap-2 text-base">
          <MapPin className="size-4 text-primary" />
          How {displayCity} fits you
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
        <ScoreRing score={fit.score} size={120} label="fit" />
        <div className="flex-1">
          <p className="mb-3 text-sm font-medium">{verdict}</p>
          <div className="grid grid-cols-2 gap-2">
            {fit.categoryScores.map((c) => (
              <div key={c.label} className="rounded-lg bg-muted/50 px-3 py-2">
                <div className="text-[11px] text-muted-foreground">{c.label}</div>
                <div className="text-base font-semibold tabular-nums">{c.score}</div>
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
