"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OptionButton } from "@/components/entry/OptionButton";
import { INCOME_BANDS, COUNTRY_OPTIONS, formatMoney } from "@/lib/tax";
import { topTaxPartner } from "@/lib/affiliates";
import { AffiliateCard } from "@/components/affiliates/AffiliateCard";
import { saveRunLocal, type FreeRun } from "@/lib/run";
import { Coins, Loader2, ArrowRight, Pencil, TriangleAlert, Sparkles } from "lucide-react";

/**
 * The tax-savings hook. Collects income band + current tax residence (+ US-citizen and
 * investor flags), re-scores the run, and shows how much the user could keep — the
 * place NAME stays locked (only rates + the savings number are free). A strong, specific
 * pay/share motivator for high earners.
 */
export function TaxProfile({ free, onRefined }: { free: FreeRun; onRefined: (u: FreeRun) => void }) {
  const tc = free.taxComparison;
  const [editing, setEditing] = useState(!tc);
  const [band, setBand] = useState(free.inputs.annualIncomeBand ?? "");
  const [country, setCountry] = useState(free.inputs.taxResidenceCountry ?? "");
  const [usCitizen, setUsCitizen] = useState(Boolean(free.inputs.isUsCitizen));
  const [investor, setInvestor] = useState(Boolean(free.inputs.hasInvestmentIncome));
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(false);

  async function submit() {
    if (!band || !country.trim()) return;
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
            annualIncomeBand: band,
            taxResidenceCountry: country.trim(),
            isUsCitizen: usCitizen,
            hasInvestmentIncome: investor,
            taxSensitivity: free.inputs.taxSensitivity ?? "somewhat",
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
          <Coins className="size-4 text-accent" /> Your tax & cost reality
        </CardTitle>
      </CardHeader>
      <CardContent>
        {editing || !tc ? (
          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-2 text-sm font-medium">Where do you pay tax now?</p>
              <Input
                list="fyp-countries"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. United States"
              />
              <datalist id="fyp-countries">
                {COUNTRY_OPTIONS.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">Roughly what do you earn a year?</p>
              <div className="grid grid-cols-2 gap-2">
                {INCOME_BANDS.map((b) => (
                  <OptionButton key={b.value} label={b.label} selected={band === b.value} onClick={() => setBand(b.value)} />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Toggle checked={investor} onChange={setInvestor} label="I have major capital gains / run a business" />
              <Toggle checked={usCitizen} onChange={setUsCitizen} label="I'm a US citizen" />
            </div>
            <Button variant="gradient" size="lg" disabled={busy || !band || !country.trim()} onClick={submit}>
              {busy ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
              See my tax picture
            </Button>
            {err && (
              <p className="text-center text-xs text-destructive">
                Couldn&apos;t crunch that just now — tap to try again.
              </p>
            )}
            <p className="text-[11px] text-muted-foreground">
              Estimate only — not tax advice. We never store your income.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Headline */}
            {tc.currentKnown && tc.annualSavings > 0 ? (
              <div className="rounded-xl border border-success/30 bg-success/10 p-4 text-center">
                <div className="text-3xl font-extrabold text-success">~{formatMoney(tc.annualSavings)}/yr</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  more in your pocket in your #1 match vs {tc.currentCountry}
                </p>
              </div>
            ) : tc.currentKnown && tc.annualSavings < 0 ? (
              <div className="rounded-xl border border-border bg-surface p-4 text-center">
                <div className="text-2xl font-extrabold">~{formatMoney(-tc.annualSavings)}/yr more tax</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  your #1 match taxes more than {tc.currentCountry} — but you may gain elsewhere
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-surface p-4 text-center text-sm text-muted-foreground">
                We don&apos;t have rates for {tc.currentCountry || "your country"} yet — showing the destination only.
              </div>
            )}

            {/* Rate row */}
            <div className="flex items-center justify-between gap-3 rounded-lg bg-muted/40 px-4 py-3 text-sm">
              <span className="text-muted-foreground">
                {tc.currentCountry || "Now"}: <span className="font-semibold text-foreground">{tc.currentRate ?? "—"}%</span>
              </span>
              <ArrowRight className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                Your #1 match: <span className="font-semibold text-foreground">{tc.destRate}%</span> income tax
              </span>
            </div>

            {tc.hasInvestmentIncome && (
              <p className="text-sm text-muted-foreground">
                Capital gains there: <span className="font-semibold text-foreground">{tc.destCapitalGainsRate}%</span>. Worth
                modeling if a big chunk of your income is investments.
              </p>
            )}

            {(tc.destSpecialRegime || tc.destTerritorial) && (
              <div className="flex items-start gap-2 rounded-lg border border-secondary/30 bg-secondary/10 p-3 text-xs">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-secondary" />
                <span className="text-muted-foreground">
                  {tc.destTerritorial && (
                    <>
                      Your #1 match runs a <strong className="text-foreground">territorial</strong> tax system — foreign income
                      is often untaxed for residents.{" "}
                    </>
                  )}
                  {tc.destSpecialRegime && (
                    <>
                      There&apos;s a special regime worth knowing: <strong className="text-foreground">{tc.destSpecialRegime}</strong>.
                    </>
                  )}
                </span>
              </div>
            )}

            {/* US citizen flag */}
            {tc.isUsCitizen && (
              <div className="flex items-start gap-2 rounded-lg border border-accent/30 bg-accent/10 p-3 text-xs">
                <TriangleAlert className="mt-0.5 size-4 shrink-0 text-accent" />
                <span className="text-muted-foreground">
                  As a <strong className="text-foreground">US citizen</strong>, you&apos;re taxed on worldwide income
                  wherever you live. Moving abroad can still cut state tax and shelter ~$130k of earned income (Foreign
                  Earned Income Exclusion) — but it&apos;s rarely a clean 0%. Talk to a cross-border CPA.
                </span>
              </div>
            )}

            <button
              onClick={() => setEditing(true)}
              className="flex items-center justify-center gap-1 text-xs text-muted-foreground underline-offset-4 hover:underline"
            >
              <Pencil className="size-3" /> Edit income / country
            </button>
            <p className="text-[11px] text-muted-foreground">
              Directional estimate using representative national rates — not tax advice.
            </p>

            {/* Highest-intent affiliate placement: they just saw a number — give them the expert. */}
            {(() => {
              const partner = topTaxPartner(free);
              return partner ? (
                <div className="mt-1">
                  <p className="mb-2 text-xs font-semibold text-muted-foreground">Want it done right?</p>
                  <AffiliateCard partner={partner} runId={free.runId} placement="tax-card" />
                </div>
              ) : null;
            })()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 rounded-lg glass px-4 py-3 text-left text-sm transition-colors hover:border-primary/40"
    >
      <span
        className={`grid size-5 shrink-0 place-items-center rounded-md border ${
          checked ? "border-primary bg-primary text-primary-foreground" : "border-border"
        }`}
      >
        {checked && "✓"}
      </span>
      <span>{label}</span>
    </button>
  );
}
