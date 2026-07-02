import { ScoreRing } from "./ScoreRing";
import { Badge } from "@/components/ui/badge";
import { formatMoney } from "@/lib/tax";
import { Lock, Globe2, TrendingUp } from "lucide-react";

/**
 * The peak moment before the gate: we prove the #1 match EXISTS — its score, its
 * continent, the shape of the answer — but never its name. Designed to be the high
 * right before the paywall, so we dollarize the gap (fit points + tax) to make the
 * unnamed answer feel concrete and costly to walk away from.
 */
export function LockedTopMatch({
  score,
  continent,
  region,
  confidence,
  currentScore,
  fitDelta,
  annualTaxSavings,
}: {
  score: number;
  continent: string;
  region: string | null;
  confidence?: number;
  currentScore?: number;
  fitDelta?: number;
  annualTaxSavings?: number | null;
}) {
  const hasFitGain = typeof fitDelta === "number" && fitDelta > 0;
  const hasTax = typeof annualTaxSavings === "number" && annualTaxSavings > 0;

  return (
    <div className="bg-aurora relative overflow-hidden rounded-2xl border border-primary/30 p-6 text-center">
      <div className="mb-4 flex items-center justify-center gap-2">
        <Badge variant="primary" className="w-fit">
          Your #1 match
        </Badge>
        {typeof confidence === "number" && (
          <Badge variant="outline" className="w-fit">
            {confidence}% confidence
          </Badge>
        )}
      </div>

      <div className="relative mx-auto w-fit">
        <ScoreRing score={score} size={150} label="match" />
      </div>

      {/* Blurred name plate */}
      <div className="relative mx-auto mt-5 max-w-xs">
        <div className="rounded-xl glass/70 px-5 py-4 backdrop-blur-sm">
          <div className="select-none text-2xl font-extrabold blur-md" aria-hidden>
            ███████
          </div>
          <div className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <Globe2 className="size-4" />
            <span>
              {continent}
              {region ? ` · ${region}` : ""}
            </span>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg">
            <Lock className="size-5" />
          </span>
        </div>
      </div>

      {/* Dollarized / quantified gap — the cost of NOT knowing */}
      {(hasFitGain || hasTax) && (
        <div className="mx-auto mt-5 flex max-w-xs flex-wrap items-center justify-center gap-2">
          {hasFitGain && (
            <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-3 py-1 text-sm font-semibold text-success">
              <TrendingUp className="size-3.5" /> +{fitDelta} fit vs your {currentScore}
            </span>
          )}
          {hasTax && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-3 py-1 text-sm font-semibold text-primary">
              ≈ {formatMoney(annualTaxSavings!)}/yr in tax alone
            </span>
          )}
        </div>
      )}

      <p className="mx-auto mt-4 max-w-sm text-sm text-muted-foreground">
        We found the place that fits you best — it scored{" "}
        <span className="font-semibold text-foreground">{score}/100</span>
        {hasFitGain ? (
          <>
            , a <span className="font-semibold text-foreground">+{fitDelta}-point</span> jump over
            where you live now.
          </>
        ) : (
          <> — higher than your current city.</>
        )}{" "}
        Unlock to see which one it is.
      </p>
    </div>
  );
}
