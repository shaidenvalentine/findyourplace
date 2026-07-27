import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScoreRing } from "./ScoreRing";
import type { DreamBreedScore } from "@/lib/scoring";
import { titleCase } from "@/lib/utils";
import { Heart } from "lucide-react";

/**
 * The free trust-builder: an honest fit score for the breed the user came in wanting,
 * scored against their real life. The accurate read on the dog they already had in mind
 * is what earns the sale.
 */
export function DreamBreedFitCard({ breed, fit }: { breed: string; fit: DreamBreedScore }) {
  const displayBreed = fit.resolvedName
    ? titleCase(fit.resolvedName)
    : breed?.trim()
      ? titleCase(breed.trim())
      : "the breed you had in mind";
  const verdict =
    fit.score >= 80
      ? "Your instinct is a genuinely great fit."
      : fit.score >= 60
        ? "A decent fit — but not your best."
        : "There's a better dog out there for you.";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Heart className="size-3.5 text-muted-foreground" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            The breed you had in mind
          </span>
        </div>
        <h2 className="text-2xl font-light tracking-[-0.02em]">
          {displayBreed} — {fit.score} fit
        </h2>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
        <ScoreRing score={fit.score} size={120} label="fit" />
        <div className="min-w-0 flex-1">
          <p className="mb-3 text-sm font-medium">
            {verdict} Here&apos;s what that&apos;s built on:
          </p>
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
          <p className="mt-2 text-xs text-muted-foreground">
            {fit.constraintPenalty
              ? "The overall fit weighs your priorities more heavily — and includes a penalty where this breed hits one of your deal-breakers."
              : "The overall fit weighs the dimensions by how much you said each one matters."}
          </p>
          {fit.estimated && (
            <p className="mt-2 text-xs text-muted-foreground">
              Estimated from breed-group data — we read{" "}
              {fit.resolvedName ? titleCase(fit.resolvedName) : "that breed"} from its closest relatives, so this is
              a close approximation rather than an exact score.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
