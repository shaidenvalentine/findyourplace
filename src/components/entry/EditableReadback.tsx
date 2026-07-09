"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import type { OnboardingData } from "@/types/onboarding";

/**
 * The confirmation read-back — but actually editable. After we normalize a pasted
 * profile (or free-text) into scoring signal, the user taps any dimension to fix what
 * we got wrong or fill a gap we missed, writing straight back into the inputs BEFORE
 * scoring. This is what stops a confident mismatch from landing at the paywall, and the
 * act of correcting it deepens the "it really gets me" effect (BUILD_PLAN Phase 2).
 *
 * Option values mirror the normalizer's extraction enums so edits and the engine speak
 * the same language.
 */

type Opt = { v: string; l: string };

type Field =
  | { kind: "text"; key: keyof OnboardingData; label: string; placeholder: string }
  | { kind: "single"; key: keyof OnboardingData; label: string; options: Opt[] }
  | { kind: "multi"; key: keyof OnboardingData; label: string; options: Opt[]; max?: number };

const FIELDS: Field[] = [
  { kind: "text", key: "currentCity", label: "Lives in", placeholder: "Your city" },
  {
    kind: "single",
    key: "lifestyleMode",
    label: "Lifestyle",
    options: [
      { v: "rooted", l: "Rooted" },
      { v: "nomadic", l: "Nomadic" },
    ],
  },
  {
    kind: "single",
    key: "preferredClimate",
    label: "Climate",
    options: [
      { v: "tropical", l: "Tropical" },
      { v: "mediterranean", l: "Mediterranean" },
      { v: "temperate", l: "Temperate" },
      { v: "cold", l: "Cold" },
    ],
  },
  {
    kind: "single",
    key: "beachMountain",
    label: "Drawn to",
    options: [
      { v: "beach", l: "Beach" },
      { v: "mountains", l: "Mountains" },
      { v: "either", l: "Either" },
    ],
  },
  {
    kind: "single",
    key: "noiseTolerance",
    label: "Daily rhythm",
    options: [
      { v: "low", l: "Quiet & calm" },
      { v: "medium", l: "Walkable buzz" },
      { v: "high", l: "Energy & nightlife" },
    ],
  },
  {
    kind: "single",
    key: "workStyle",
    label: "Work",
    options: [
      { v: "remote", l: "Remote" },
      { v: "hybrid", l: "Hybrid" },
      { v: "onsite", l: "On-site" },
    ],
  },
  {
    kind: "multi",
    key: "communityVibes",
    label: "People",
    max: 3,
    options: [
      { v: "digital-nomad", l: "Digital nomads" },
      { v: "startup", l: "Startup scene" },
      { v: "expat", l: "Expats" },
      { v: "local", l: "Locals" },
    ],
  },
  {
    kind: "single",
    key: "budgetRange",
    label: "Budget",
    options: [
      { v: "budget", l: "Budget" },
      { v: "mid-range", l: "Mid-range" },
      { v: "luxury", l: "Luxury" },
    ],
  },
  {
    kind: "single",
    key: "taxSensitivity",
    label: "Taxes matter",
    options: [
      { v: "very-sensitive", l: "Very" },
      { v: "somewhat", l: "Somewhat" },
      { v: "not-sensitive", l: "Not really" },
    ],
  },
  {
    kind: "single",
    key: "safetyPriority",
    label: "Safety",
    options: [
      { v: "top-priority", l: "Top priority" },
      { v: "important", l: "Important" },
      { v: "flexible", l: "Flexible" },
    ],
  },
  {
    kind: "single",
    key: "wellnessImportance",
    label: "Wellness",
    options: [
      { v: "high", l: "High" },
      { v: "medium", l: "Medium" },
      { v: "low", l: "Low" },
    ],
  },
  {
    kind: "multi",
    key: "mustHaves",
    label: "Non-negotiables",
    max: 3,
    options: [
      { v: "affordable", l: "Affordable" },
      { v: "safety", l: "Safety" },
      { v: "nature", l: "Nature" },
      { v: "nightlife", l: "Nightlife" },
      { v: "beach", l: "Beach" },
    ],
  },
];

export function EditableReadback({
  value,
  onChange,
}: {
  value: OnboardingData;
  onChange: (next: OnboardingData) => void;
}) {
  const [open, setOpen] = useState<string | null>(null);

  function setField(key: keyof OnboardingData, v: unknown) {
    onChange({ ...value, [key]: v });
  }

  function toggleMulti(key: keyof OnboardingData, v: string, max?: number) {
    const arr = Array.isArray(value[key]) ? [...(value[key] as string[])] : [];
    const has = arr.includes(v);
    let next = has ? arr.filter((x) => x !== v) : [...arr, v];
    if (max && next.length > max) next = next.slice(next.length - max);
    setField(key, next);
  }

  return (
    <div className="flex flex-col gap-2">
      {FIELDS.map((f) => {
        if (f.kind === "text") {
          const val = typeof value[f.key] === "string" ? (value[f.key] as string) : "";
          return (
            <div key={String(f.key)} className="rounded-lg glass px-4 py-3">
              <label className="flex items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">{f.label}</span>
                <input
                  value={val}
                  onChange={(e) => setField(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="min-w-0 flex-1 bg-transparent text-right text-base font-semibold text-foreground placeholder:font-normal placeholder:text-muted-foreground/60 focus:outline-none sm:text-sm"
                />
              </label>
            </div>
          );
        }

        const isOpen = open === String(f.key);
        const selected =
          f.kind === "multi"
            ? Array.isArray(value[f.key])
              ? (value[f.key] as string[])
              : []
            : typeof value[f.key] === "string"
              ? [value[f.key] as string]
              : [];
        const display =
          selected.length === 0
            ? f.kind === "multi"
              ? "Tap to add"
              : "Tap to set"
            : f.options
                .filter((o) => selected.includes(o.v))
                .map((o) => o.l)
                .join(", ") || "Tap to set";
        const isSet = selected.length > 0;

        return (
          <div key={String(f.key)} className="overflow-hidden rounded-lg glass">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : String(f.key))}
              aria-expanded={isOpen}
              className="flex min-h-[52px] w-full items-center justify-between gap-3 px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            >
              <span className="text-sm text-muted-foreground">{f.label}</span>
              <span
                className={`flex items-center gap-2 text-sm ${isSet ? "font-semibold text-foreground" : "text-muted-foreground/70"}`}
              >
                {display}
                <ChevronDown
                  className={`size-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </span>
            </button>
            {isOpen && (
              <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
                {f.options.map((o) => {
                  const on = selected.includes(o.v);
                  return (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() => {
                        if (f.kind === "multi") {
                          toggleMulti(f.key, o.v, f.max);
                        } else {
                          // Tap the active option to clear it; otherwise set + collapse.
                          setField(f.key, on ? undefined : o.v);
                          if (!on) setOpen(null);
                        }
                      }}
                      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm transition ${
                        on
                          ? "border-primary bg-primary/15 font-medium text-foreground"
                          : "border-border text-muted-foreground hover:border-muted-foreground"
                      }`}
                    >
                      {o.l}
                      {on && <Check className="size-3" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
