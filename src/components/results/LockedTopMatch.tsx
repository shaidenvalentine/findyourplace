import { ScoreRing } from "./ScoreRing";
import { formatMoney } from "@/lib/tax";
import { Lock, Globe2, TrendingUp } from "lucide-react";

/**
 * The peak moment before the gate: we prove the #1 match EXISTS — its score, its
 * continent, the shape of the answer — but never its name. Rendered as the dark
 * "stage" card (the same rich surface as the landing hero) so the reveal reads as
 * the dramatic high right before the paywall, with the gap dollarized to make the
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
    <div className="hero-stage relative overflow-hidden rounded-2xl p-6 text-center text-white shadow-[0_24px_64px_hsl(210_40%_16%/0.28)]">
      {/* soft top highlight so the dark surface reads as lit glass, not a flat fill */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_30%_0%,hsl(0_0%_100%/0.10),transparent_60%)]" />

      <div className="relative">
        <div className="mb-5 flex items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-[hsl(172_76%_60%)]" /> Your #1 match
          </span>
          {typeof confidence === "number" && (
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">
              {confidence}% confidence
            </span>
          )}
        </div>

        <div className="mx-auto w-fit">
          <ScoreRing score={score} size={150} label="match" tone="dark" />
        </div>

        {/* Blurred name plate */}
        <div className="relative mx-auto mt-6 max-w-xs">
          <div className="rounded-xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-md">
            <div className="select-none text-2xl font-light tracking-tight blur-md" aria-hidden>
              ███████
            </div>
            <div className="mt-1 flex items-center justify-center gap-1.5 text-sm text-white/70">
              <Globe2 className="size-4" />
              <span>
                {continent}
                {region ? ` · ${region}` : ""}
              </span>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <span className="grid size-10 place-items-center rounded-full bg-white text-[hsl(220_16%_13%)] shadow-lg">
              <Lock className="size-5" />
            </span>
          </div>
        </div>

        {/* Dollarized / quantified gap — the cost of NOT knowing */}
        {(hasFitGain || hasTax) && (
          <div className="mx-auto mt-5 flex max-w-xs flex-wrap items-center justify-center gap-2">
            {hasFitGain && (
              <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-medium text-[hsl(172_76%_66%)] backdrop-blur-sm">
                <TrendingUp className="size-3.5" /> +{fitDelta} fit vs your {currentScore}
              </span>
            )}
            {hasTax && (
              <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-medium text-white/85 backdrop-blur-sm">
                ≈ {formatMoney(annualTaxSavings!)}/yr in tax alone
              </span>
            )}
          </div>
        )}

        <p className="mx-auto mt-5 max-w-sm text-sm text-white/65">
          We found the place that fits you best — it scored{" "}
          <span className="font-semibold text-white">{score}/100</span>
          {hasFitGain ? (
            <>
              , a <span className="font-semibold text-white">+{fitDelta}-point</span> jump over
              where you live now.
            </>
          ) : fitDelta === 0 ? (
            <> — matching where you live now, point for point.</>
          ) : (
            <>.</>
          )}{" "}
          Unlock to see which one it is.
        </p>
      </div>
    </div>
  );
}
