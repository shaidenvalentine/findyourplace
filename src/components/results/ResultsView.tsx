"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { PRICE_CENTS, CURRENCY } from "@/lib/pricing";
import { loadRunLocal, type FreeRun, type RankedPlace } from "@/lib/run";
import type { AnnualCircuit } from "@/lib/circuitGenerator";
import { PersonalityProfile } from "./PersonalityProfile";
import { CategoryBars } from "./CategoryBars";
import { CurrentCityFitCard } from "./CurrentCityFitCard";
import { LifeChangeCompare } from "./LifeChangeCompare";
import { TaxProfile } from "./TaxProfile";
import { LockedTopMatch } from "./LockedTopMatch";
import { DeepenMatch } from "./DeepenMatch";
import { Paywall } from "./Paywall";
import { PaidReveal } from "./PaidReveal";
import { ShareSlides } from "./ShareSlides";
import { RelocationToolkit } from "@/components/affiliates/RelocationToolkit";
import { Loader2, ArrowLeft } from "lucide-react";

type Locked = { ranking: RankedPlace[]; circuit: AnnualCircuit | null };

export function ResultsView({ runId }: { runId: string }) {
  const [free, setFree] = useState<FreeRun | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [locked, setLocked] = useState<Locked | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const purchaseFired = useRef(false);

  // Fire the Purchase conversion exactly once, only on the post-checkout redirect
  // (?unlocked=1). The deterministic event_id dedups with the webhook's server CAPI copy.
  useEffect(() => {
    if (!unlocked || purchaseFired.current) return;
    const fresh = new URLSearchParams(window.location.search).get("unlocked") === "1";
    if (!fresh) return;
    purchaseFired.current = true;
    track("purchase", {
      value: PRICE_CENTS / 100,
      currency: CURRENCY.toUpperCase(),
      eventId: `purchase_${runId}`,
    });
  }, [unlocked, runId]);

  const refresh = useCallback(async () => {
    // Instant paint from cache, then reconcile with the server (source of truth for the gate).
    const cached = loadRunLocal(runId);
    if (cached) setFree(cached);
    try {
      // POST with the client's cached inputs as a cold-lambda fallback so any server
      // instance can rebuild the run deterministically. No more 404s on first try.
      const res = await fetch(`/api/result/${runId}`, {
        method: "POST",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs: cached?.inputs ?? null }),
      });
      if (res.status === 404) {
        // Fall back to the locally cached free surface (e.g. server restarted in dev).
        const localRun = loadRunLocal(runId);
        if (localRun) {
          setFree(localRun);
        } else {
          setNotFound(true);
        }
        return;
      }
      const data = await res.json();
      setFree(data.free);
      setUnlocked(Boolean(data.unlocked));
      setLocked(data.locked ?? null);
    } finally {
      setLoading(false);
    }
  }, [runId]);

  useEffect(() => {
    // Fetch-on-mount + revalidate; refresh() owns all state writes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  if (loading && !free) {
    return (
      <div className="grid min-h-dvh place-items-center">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (notFound || !free) {
    return (
      <div className="grid min-h-dvh place-items-center px-4 text-center">
        <div>
          <p className="text-lg font-semibold">This result has expired.</p>
          <p className="mt-1 text-sm text-muted-foreground">Runs are temporary in this build. Take the quiz again.</p>
          <Button asChild variant="gradient" className="mt-4">
            <Link href="/start">Start over</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-xl px-4 pb-20">
      <header className="flex h-14 items-center justify-between">
        <Link href="/">
          <Logo withWordmark={false} />
        </Link>
        <Button asChild variant="ghost" size="sm">
          <Link href="/start">
            <ArrowLeft className="size-4" /> Redo
          </Link>
        </Button>
      </header>

      <h1 className="animate-fade-up mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
        Your results are in.
      </h1>
      <p className="text-sm text-muted-foreground">
        Here&apos;s what the engine read — and the place that fits you best.
      </p>

      <div className="mt-5 flex flex-col gap-5">
        <PersonalityProfile read={free.personality} />
        <CategoryBars items={free.categoryAverages} title="Your category fit (top matches)" />
        <CurrentCityFitCard city={free.currentCity} fit={free.currentCityFit} />
        <LifeChangeCompare city={free.currentCity} lifeChange={free.lifeChange} />
        <TaxProfile free={free} onRefined={setFree} />

        {unlocked && locked ? (
          <>
            <PaidReveal ranking={locked.ranking} circuit={locked.circuit} />
            <RelocationToolkit run={free} />
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="mb-3 text-center text-sm font-medium">Show the world where you belong.</p>
              <ShareSlides free={free} variant="reveal" />
            </div>
          </>
        ) : (
          <>
            {/* Raise confidence FIRST, so the peak reveal shows the sharpest number. */}
            <DeepenMatch free={free} onRefined={setFree} />
            {/* The peak — uninterrupted, then straight to the gate. Nothing between. */}
            <LockedTopMatch
              score={free.topTease.score}
              continent={free.topTease.continent}
              region={free.topTease.region}
              confidence={free.confidence}
              currentScore={free.lifeChange.currentScore}
              fitDelta={free.lifeChange.overallDelta}
              annualTaxSavings={free.taxComparison?.annualSavings ?? null}
            />
            <Paywall runId={runId} onUnlocked={refresh} />
            {/* Share lives AFTER the offer decision — never between tension and gate. */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="mb-1 text-center text-sm font-medium">Pull your friends in 👀</p>
              <p className="mb-3 text-center text-xs text-muted-foreground">
                Share your slides — your archetype, your gap, and the mystery of where you belong.
              </p>
              <ShareSlides free={free} variant="teaser" />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
