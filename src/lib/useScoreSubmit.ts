"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveRunLocal, type FreeRun } from "@/lib/run";
import { track } from "@/lib/analytics";
import type { OnboardingData } from "@/types/onboarding";

/** Submits inputs to the authoritative scoring endpoint, caches the run, and routes to results. */
export function useScoreSubmit() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(inputs: OnboardingData, source: "quiz" | "ai-profile") {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs, source }),
      });
      if (!res.ok) throw new Error(`Scoring failed (${res.status})`);
      const { runId, free } = (await res.json()) as { runId: string; free: FreeRun };
      saveRunLocal(free);
      track("quiz_complete"); // Meta "Lead" — the key pre-purchase optimization event
      router.push(`/results/${runId}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  return { submit, submitting, error };
}
