"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveRunLocal, type FreeRun } from "@/lib/run";
import { track } from "@/lib/analytics";
import type { OnboardingData } from "@/types/onboarding";
import type { RunSource } from "@/lib/run";

/** Submits inputs to the authoritative scoring endpoint, caches the run, and routes to results. */
export function useScoreSubmit() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(inputs: OnboardingData, source: RunSource) {
    setSubmitting(true);
    setError(null);

    let runId: string;
    let free: FreeRun;
    try {
      const res = await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs, source }),
      });
      if (!res.ok) throw new Error(`http_${res.status}`);
      ({ runId, free } = (await res.json()) as { runId: string; free: FreeRun });
    } catch {
      // Only a failed/rejected score should trap the user here. Once the run exists we
      // always navigate — see below.
      setError("Something hiccuped while scoring your matches. Tap to try again.");
      setSubmitting(false);
      return;
    }

    // The run now exists server-side. Caching + analytics are best-effort — never let
    // them strand the user on a spinner after a successful score.
    try {
      saveRunLocal(free);
    } catch {
      /* ignore quota / private mode */
    }
    try {
      track("quiz_complete"); // Meta "Lead" — the key pre-purchase optimization event
    } catch {
      /* analytics must never block navigation */
    }

    router.push(`/results/${runId}`);
  }

  return { submit, submitting, error };
}
