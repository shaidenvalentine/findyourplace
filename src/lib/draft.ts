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
