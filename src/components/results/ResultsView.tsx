"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { track, logEvent } from "@/lib/analytics";
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
import dynamic from "next/dynamic";
import { Loader2, ArrowLeft } from "lucide-react";

// The paid tree (full ranking, move plan, tax deep-dive, circuit) is only rendered for
// unlocked runs — load it on demand so the ~90% who haven't bought don't download it.
const PaidReveal = dynamic(() => import("./PaidReveal").then((m) => m.PaidReveal), {
  loading: () => (
    <div className="grid place-items-center py-10">
      <Loader2 className="size-5 animate-spin text-primary" />
    </div>
  ),
});
import { ShareSlides } from "./ShareSlides";
import { RelocationToolkit } from "@/components/affiliates/RelocationToolkit";

type Locked = { ranking: RankedPlace[]; circuit: AnnualCircuit | null };

export function ResultsView({ runId }: { runId: string }) {
  const [free, setFree] = useState<FreeRun | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [locked, setLocked] = useState<Locked | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  // True while we're back from checkout (?unlocked=1) but the server hasn't seen the
  // provider's webhook yet — renders the "finishing your unlock" state, not the paywall.
  // Lazy init (false on the server) so SSR HTML is unaffected; at hydration only the
  // loading spinner is rendered, so the differing value can't mismatch.
  const [confirming, setConfirming] = useState(
    () =>
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("unlocked") === "1",
  );
  const [confirmationDelayed, setConfirmationDelayed] = useState(false);
  const purchaseFired = useRef(false);
  const viewFired = useRef(false);

  // First-party "results viewed" — the step between quiz_complete and paywall_view.
  useEffect(() => {
    if (viewFired.current) return;
    viewFired.current = true;
    logEvent("results_view", { runId });
  }, [runId]);

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
      runId,
    });
    // Drop ?unlocked=1 so a manual refresh can't re-enter this branch (Meta's event_id
    // dedups anyway, but this keeps our own analytics clean and the URL shareable).
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("unlocked");
      window.history.replaceState({}, "", url.toString());
    } catch {
      /* ignore */
    }
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
      // Guard: never let a malformed 200 (missing `free`) wipe a good cached view.
      if (data?.free) setFree(data.free);
      setUnlocked(Boolean(data?.unlocked));
      setLocked(data?.locked ?? null);
    } catch {
      // Transient network/500 on the money page: keep whatever we already showed. Only
      // surface the not-found screen if we have nothing at all to render.
      if (!loadRunLocal(runId)) setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [runId]);

  useEffect(() => {
    // Fetch-on-mount + revalidate; refresh() owns all state writes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  // Post-checkout redirect race: the unlock is written by the payment provider's
  // WEBHOOK, which can land seconds after the buyer is redirected back with
  // ?unlocked=1. A single fetch loses that race and re-shows the paywall to someone
  // who just paid — so keep polling the server until the webhook lands (~2 min cap,
  // then fall back to the paywall).
  useEffect(() => {
    if (!confirming || unlocked) return;
    let tries = 0;
    const id = setInterval(() => {
      if (++tries > 40) {
        clearInterval(id);
        setConfirming(false);
        setConfirmationDelayed(true);
      } else {
        refresh();
      }
    }, 3000);
    return () => clearInterval(id);
  }, [confirming, unlocked, refresh]);

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
          <p className="text-lg font-semibold">We couldn&apos;t find that result.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            The link may be incomplete or from another device. It only takes a minute to get a fresh match.
          </p>
          <Button asChild variant="gradient" className="mt-4">
            <Link href="/start">Find my place</Link>
          </Button>
        </div>
      </div>
    );
  }

  const hasCurrentCity = Boolean(free.currentCity?.trim()) && !free.currentCityFit.estimated;

  return (
    <main className="mx-auto w-full max-w-xl px-4 pb-20">
      <header className="flex h-14 items-center justify-between">
        <Link href="/" aria-label="Find Your Place — home">
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
        {hasCurrentCity && <>
          <CurrentCityFitCard city={free.currentCity} fit={free.currentCityFit} />
          <LifeChangeCompare city={free.currentCity} lifeChange={free.lifeChange} />
        </>}
        <TaxProfile free={free} onRefined={setFree} />

        {unlocked && locked ? (
          <>
            <PaidReveal ranking={locked.ranking} circuit={locked.circuit} />
            <RelocationToolkit run={free} />
            <div className="rounded-2xl glass p-5">
              <p className="mb-3 text-center text-sm font-medium">Show the world where you belong.</p>
              {hasCurrentCity && <ShareSlides free={free} variant="reveal" />}
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
              currentScore={hasCurrentCity ? free.lifeChange.currentScore : undefined}
              fitDelta={hasCurrentCity ? free.lifeChange.overallDelta : undefined}
              annualTaxSavings={free.taxComparison?.annualSavings ?? null}
            />
            {confirming ? (
              /* Just returned from checkout — don't flash the paywall at a buyer while
                 the webhook is still in flight. */
              <div className="rounded-2xl border border-border bg-card p-6 text-center">
                <Loader2 className="mx-auto size-5 animate-spin text-primary" />
                <p className="mt-3 text-sm font-medium">Finishing your unlock…</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Confirming your checkout — this usually takes a few seconds. Keep this page open.
                </p>
              </div>
            ) : confirmationDelayed ? (
              <div className="rounded-2xl border border-border bg-card p-6 text-center">
                <p className="font-medium">Your payment confirmation is taking longer than expected.</p>
                <p className="mt-2 text-sm text-muted-foreground">If you completed payment, please don’t pay again. Keep your receipt and this result link.</p>
                <Button className="mt-4" onClick={() => { setConfirmationDelayed(false); setConfirming(true); void refresh(); }}>Check my payment again</Button>
              </div>
            ) : (
              <Paywall runId={runId} onUnlocked={refresh} />
            )}
            {/* Share lives AFTER the offer decision — never between tension and gate. */}
            <div className="rounded-2xl glass p-5">
              <p className="mb-1 text-center text-sm font-medium">Pull your friends in</p>
              <p className="mb-3 text-center text-xs text-muted-foreground">
                Share your slides — your archetype, your gap, and the mystery of where you belong.
              </p>
              {hasCurrentCity && <ShareSlides free={free} variant="teaser" />}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
