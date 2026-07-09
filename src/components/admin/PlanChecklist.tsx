"use client";

import { useSyncExternalStore } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlanStep } from "@/lib/admin/growthPlan";

const STORAGE_KEY = "fyp.plan.done.v1";
const CHANGE_EVENT = "fyp-plan-done-change";
const EMPTY: Record<string, boolean> = {};

// getSnapshot must return a referentially-stable value between changes, so we cache the
// parsed object and only re-parse when the raw string actually changes.
let cache: Record<string, boolean> = EMPTY;
let cacheRaw = "";

function getSnapshot(): Record<string, boolean> {
  const raw = (typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY)) || "{}";
  if (raw !== cacheRaw) {
    cacheRaw = raw;
    try {
      cache = JSON.parse(raw) as Record<string, boolean>;
    } catch {
      cache = EMPTY;
    }
  }
  return cache;
}

function getServerSnapshot(): Record<string, boolean> {
  return EMPTY;
}

function subscribe(cb: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CHANGE_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

function toggleStep(id: string) {
  const current = getSnapshot();
  const next = { ...current, [id]: !current[id] };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* private mode / storage full — the guide still works for the session */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/**
 * Tickable step list for a plan month. State lives in localStorage — this is a
 * single-founder guide, not shared data, so it needs no table (and no RLS surface).
 */
export function PlanChecklist({ steps }: { steps: PlanStep[] }) {
  const done = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const completed = steps.filter((s) => done[s.id]).length;

  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="tabular-nums">
          {completed}/{steps.length} steps
        </span>
        {completed === steps.length && <span className="font-semibold text-success">✓ month cleared</span>}
      </div>
      <ul className="flex flex-col gap-2">
        {steps.map((s) => {
          const checked = !!done[s.id];
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => toggleStep(s.id)}
                className="flex w-full items-start gap-3 rounded-xl border border-border bg-surface/30 p-3 text-left transition-colors hover:bg-muted/30"
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                    checked ? "border-success bg-success text-black" : "border-border text-transparent"
                  )}
                >
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      "block text-sm font-semibold transition-colors",
                      checked && "text-muted-foreground line-through"
                    )}
                  >
                    {s.title}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{s.detail}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
