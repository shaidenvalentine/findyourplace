"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OptionButton } from "@/components/entry/OptionButton";
import { BUDGET_BANDS, formatMoney } from "@/lib/cost";
import { topInsurancePartner } from "@/lib/affiliates";
import { AffiliateCard } from "@/components/affiliates/AffiliateCard";
import { saveRunLocal, type FreeRun } from "@/lib/run";
import { Coins, Loader2, ArrowRight, Pencil, TriangleAlert, Sparkles, Scissors } from "lucide-react";

/**
 * The cost-of-ownership hook. Collects the monthly budget band, re-scores the run, and
 * shows what the #1 match actually costs to live with — monthly vs budget, first-year
 * adopted vs breeder, and the adoption savings. The breed NAME stays locked (only the
 * numbers are free). A strong, specific pay/share motivator: adopting saves real money.
 */
export function CostProfile({ free, onRefined }: { free: FreeRun; onRefined: (u: FreeRun) => void }) {
  const cc = free.costComparison;
  const [editing, setEditing] = useState(!cc);
  const [band, setBand] = useState(free.inputs.budgetRange ?? "");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(false);

  async function submit() {
    if (!band) return;
    setBusy(true);
    setErr(false);
    try {
      const res = await fetch("/api/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          runId: free.runId,
          inputs: free.inputs, // cold-lambda rebuild fallback — never dead-end
          additionalInputs: {
            budgetRange: band,
          },
        }),
      });
      if (!res.ok) throw new Error("refine failed");
      const { free: updated } = (await res.json()) as { free: FreeRun };
      saveRunLocal(updated);
      onRefined(updated);
      setEditing(false);
    } catch {
      setErr(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Coins className="size-4 text-accent" /> What your dog will cost
        </CardTitle>
      </CardHeader>
      <CardContent>
        {editing || !cc ? (
          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-2 text-sm font-medium">Roughly what can you spend a month?</p>
              <p className="mb-2 text-xs text-muted-foreground">Food, grooming, insurance, routine vet.</p>
              <div className="grid grid-cols-1 gap-2">
                {BUDGET_BANDS.map((b) => (
                  <OptionButton key={b.value} label={b.label} selected={band === b.value} onClick={() => setBand(b.value)} />
                ))}
              </div>
            </div>
            <Button variant="gradient" size="lg" disabled={busy || !band} onClick={submit}>
              {busy ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
              See my cost picture
            </Button>
            {err && (
              <p className="text-center text-xs text-destructive">
                Couldn&apos;t crunch that just now — tap to try again.
              </p>
            )}
            <p className="text-[11px] text-muted-foreground">
              Estimate only — real costs vary by city, insurer, and the individual dog.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Headline — the adoption savings, the number worth sharing */}
            {cc.adoptionSavings > 0 ? (
              <div className="rounded-xl border border-success/30 bg-success/10 p-4 text-center">
                <div className="text-3xl font-extrabold text-success">~{formatMoney(cc.adoptionSavings)} saved</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  adopting your #1 match instead of buying from a breeder
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-surface p-4 text-center text-sm text-muted-foreground">
                Adoption and breeder routes cost about the same up front for your #1 match — the numbers below show
                the full picture.
              </div>
            )}

            {/* First-year row: adopted vs breeder */}
            <div className="flex items-center justify-between gap-3 rounded-lg bg-muted/40 px-4 py-3 text-sm">
              <span className="text-muted-foreground">
                Year 1 adopted: <span className="font-semibold text-foreground">{formatMoney(cc.firstYearAdopted)}</span>
              </span>
              <ArrowRight className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                via breeder: <span className="font-semibold text-foreground">{formatMoney(cc.firstYearBreeder)}</span>
              </span>
            </div>

            {/* Monthly vs budget */}
            <div className="flex items-center justify-between gap-3 rounded-lg bg-muted/40 px-4 py-3 text-sm">
              <span className="text-muted-foreground">
                Monthly: <span className="font-semibold text-foreground">{formatMoney(cc.monthlyCost)}/mo</span>
                {cc.dreamBreedMonthly !== null && cc.dreamBreedMonthly !== cc.monthlyCost && (
                  <> (your dream breed: {formatMoney(cc.dreamBreedMonthly)}/mo)</>
                )}
              </span>
              {cc.fitsBudget !== null && (
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                    cc.fitsBudget ? "bg-success/15 text-success" : "bg-accent/15 text-accent"
                  }`}
                >
                  {cc.fitsBudget ? "fits your budget" : "stretches your budget"}
                </span>
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              Over a typical {cc.lifespanYears}-year life, that&apos;s roughly{" "}
              <span className="font-semibold text-foreground">{formatMoney(cc.lifetimeCost)}</span> of care — worth
              knowing before you fall in love.
            </p>

            {cc.needsProGrooming && (
              <div className="flex items-start gap-2 rounded-lg border border-secondary/30 bg-secondary/10 p-3 text-xs">
                <Scissors className="mt-0.5 size-4 shrink-0 text-secondary" />
                <span className="text-muted-foreground">
                  Your #1 match likely needs <strong className="text-foreground">professional grooming</strong> — the
                  silent budget line most owners forget. We&apos;ve baked it into the monthly number.
                </span>
              </div>
            )}

            {cc.insuranceRecommended && (
              <div className="flex items-start gap-2 rounded-lg border border-accent/30 bg-accent/10 p-3 text-xs">
                <TriangleAlert className="mt-0.5 size-4 shrink-0 text-accent" />
                <span className="text-muted-foreground">
                  This breed has <strong className="text-foreground">known health sensitivities</strong> — pet
                  insurance from day one is strongly worth it. One surgery can cost more than a decade of premiums.
                </span>
              </div>
            )}

            {!cc.insuranceRecommended && cc.adoptionSavings > 0 && (
              <div className="flex items-start gap-2 rounded-lg border border-secondary/30 bg-secondary/10 p-3 text-xs">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-secondary" />
                <span className="text-muted-foreground">
                  Shelter fees usually <strong className="text-foreground">include spay/neuter, first shots, and a
                  microchip</strong> — hundreds of dollars of vet work already done.
                </span>
              </div>
            )}

            <button
              onClick={() => setEditing(true)}
              className="flex items-center justify-center gap-1 text-xs text-muted-foreground underline-offset-4 hover:underline"
            >
              <Pencil className="size-3" /> Edit my budget
            </button>
            <p className="text-[11px] text-muted-foreground">
              Directional estimate using typical national costs — your city and your dog will vary.
            </p>

            {/* Highest-intent affiliate placement: they just saw a vet-bill number — give them the cover. */}
            {(() => {
              const partner = topInsurancePartner(free);
              return partner ? (
                <div className="mt-1">
                  <p className="mb-2 text-xs font-semibold text-muted-foreground">Cover the big bills before they exist</p>
                  <AffiliateCard partner={partner} runId={free.runId} placement="cost-card" />
                </div>
              ) : null;
            })()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
