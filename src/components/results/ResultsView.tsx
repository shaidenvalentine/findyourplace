"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
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
import { ShareToStory } from "./ShareToStory";
import { RelocationToolkit } from "@/components/affiliates/RelocationToolkit";
import { Loader2, ArrowLeft } from "lucide-react";

type Locked = { ranking: RankedPlace[]; circuit: AnnualCircuit | null };

export function ResultsView({ runId }: { runId: string }) {
  const [free, setFree] = useState<FreeRun | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [locked, setLocked] = useState<Locked | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const refresh = useCallback(async () => {
    // Instant paint from cache, then reconcile with the server (source of truth for the gate).
    const cached = loadRunLocal(runId);
    if (cached) setFree(cached);
    try {
      const res = await fetch(`/api/result/${runId}`, { cache: "no-store" });
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
            <div className="rounded-2xl border border-border bg-card p-5 text-center">
              <p className="mb-3 text-sm font-medium">Show the world where you belong.</p>
              <ShareToStory runId={runId} variant="reveal" />
            </div>
          </>
        ) : (
          <>
            <LockedTopMatch
              score={free.topTease.score}
              continent={free.topTease.continent}
              region={free.topTease.region}
              confidence={free.confidence}
            />
            <DeepenMatch free={free} onRefined={setFree} />
            <div className="rounded-2xl border border-border bg-card p-5 text-center">
              <p className="mb-1 text-sm font-medium">Pull your friends in 👀</p>
              <p className="mb-3 text-xs text-muted-foreground">
                Share your card — your match score and the mystery of where you belong.
              </p>
              <ShareToStory runId={runId} variant="teaser" />
            </div>
            <Paywall runId={runId} onUnlocked={refresh} />
          </>
        )}
      </div>
    </main>
  );
}
