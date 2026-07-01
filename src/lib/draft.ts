"use client";

import type { OnboardingData } from "@/types/onboarding";

/** Cross-screen draft of the in-progress run (current city, quiz answers) before scoring. */
const KEY = "fyp:draft";

export function loadDraft(): OnboardingData {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || "{}") as OnboardingData;
  } catch {
    return {};
  }
}

export function saveDraft(patch: Partial<OnboardingData>) {
  if (typeof window === "undefined") return;
  const next = { ...loadDraft(), ...patch };
  try {
    sessionStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function clearDraft() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

// ── Quiz progress ────────────────────────────────────────────────────────────
// The tap/swipe quiz answers, persisted so a refresh, notification, or app-switch
// on mobile never sends the user back to question 1 with an empty state.
const QUIZ_KEY = "fyp:quiz";

export type QuizProgress = { idx: number; answers: Record<string, string | string[]> };

export function loadQuizProgress(): QuizProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(QUIZ_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as QuizProgress;
    if (!p || typeof p.idx !== "number" || typeof p.answers !== "object") return null;
    return p;
  } catch {
    return null;
  }
}

export function saveQuizProgress(progress: QuizProgress) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(QUIZ_KEY, JSON.stringify(progress));
  } catch {
    /* ignore */
  }
}

export function clearQuizProgress() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(QUIZ_KEY);
  } catch {
    /* ignore */
  }
}
