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
 * Rows mirror profileNormalizer's buildReadback (homeType → adoptPreference, plus the
 * openers) so edits and the engine speak the same language. hasKids/allergies are
 * booleans on OnboardingData, so those rows coerce "true"/"false" chips ↔ boolean.
 */

type Opt = { v: string; l: string };

type Field =
  | { kind: "text"; key: keyof OnboardingData; label: string; placeholder: string }
  | { kind: "single"; key: keyof OnboardingData; label: string; options: Opt[] }
  | { kind: "bool"; key: keyof OnboardingData; label: string; options: [Opt, Opt] }
  | { kind: "multi"; key: keyof OnboardingData; label: string; options: Opt[]; max?: number };

const FIELDS: Field[] = [
  { kind: "text", key: "currentCity", label: "Lives in", placeholder: "Your city" },
  { kind: "text", key: "dreamBreed", label: "Breed you want", placeholder: "e.g. golden, lab…" },
  {
    kind: "single",
    key: "homeType",
    label: "Home",
    options: [
      { v: "apartment", l: "Apartment" },
      { v: "house-small-yard", l: "House, small yard" },
      { v: "house-big-yard", l: "House, big yard" },
      { v: "rural", l: "Rural / acreage" },
    ],
  },
  {
    kind: "single",
    key: "activityLevel",
    label: "Activity",
    options: [
      { v: "relaxed", l: "Walks & couch" },
      { v: "moderate", l: "Moderately active" },
      { v: "active", l: "Runs & hikes" },
      { v: "athlete", l: "Training partner" },
    ],
  },
  {
    kind: "single",
    key: "hoursAlone",
    label: "Dog alone",
    options: [
      { v: "rarely", l: "Rarely" },
      { v: "half-day", l: "A few hours" },
      { v: "full-day", l: "Full workday" },
    ],
  },
  {
    kind: "single",
    key: "experienceLevel",
    label: "Experience",
    options: [
      { v: "first-time", l: "First dog" },
      { v: "had-dogs", l: "Had dogs before" },
      { v: "experienced", l: "Very experienced" },
    ],
  },
  {
    kind: "bool",
    key: "hasKids",
    label: "Kids",
    options: [
      { v: "true", l: "Yes" },
      { v: "false", l: "No" },
    ],
  },
  {
    kind: "multi",
    key: "otherPets",
    label: "Other pets",
    options: [
      { v: "dog", l: "Another dog" },
      { v: "cat", l: "Cat(s)" },
      { v: "small-pets", l: "Small pets" },
    ],
  },
  {
    kind: "bool",
    key: "allergies",
    label: "Allergies",
    options: [
      { v: "true", l: "Yes — low-allergen" },
      { v: "false", l: "None" },
    ],
  },
  {
    kind: "single",
    key: "affectionStyle",
    label: "Wants",
    options: [
      { v: "velcro", l: "A velcro dog" },
      { v: "balanced", l: "Affectionate but chill" },
      { v: "independent", l: "An independent dog" },
    ],
  },
  {
    kind: "single",
    key: "guardingImportance",
    label: "Protection",
    options: [
      { v: "top-priority", l: "Wants a guardian" },
      { v: "nice-to-have", l: "Watchdog is a plus" },
      { v: "not-needed", l: "Companion only" },
    ],
  },
  {
    kind: "single",
    key: "budgetRange",
    label: "Budget",
    options: [
      { v: "budget", l: "Lean (~$100/mo)" },
      { v: "mid-range", l: "Comfortable" },
      { v: "no-ceiling", l: "No ceiling" },
    ],
  },
  {
    kind: "single",
    key: "adoptPreference",
    label: "Source",
    options: [
      { v: "adopt", l: "Adopt / rescue" },
      { v: "breeder", l: "Breeder" },
      { v: "either", l: "Open to either" },
    ],
  },
  {
    kind: "multi",
    key: "mustHaves",
    label: "Non-negotiables",
    max: 3,
    options: [
      { v: "good-with-kids", l: "Great with kids" },
      { v: "apartment-ok", l: "Apartment-friendly" },
      { v: "hypoallergenic", l: "Hypoallergenic" },
      { v: "low-shedding", l: "Low shedding" },
      { v: "quiet", l: "Quiet" },
      { v: "easy-training", l: "Easy to train" },
      { v: "jogging-partner", l: "Running partner" },
      { v: "protective", l: "Protective" },
    ],
  },
  {
    kind: "multi",
    key: "dealBreakers",
    label: "Deal-breakers",
    options: [
      { v: "heavy-shedding", l: "Heavy shedding" },
      { v: "drooling", l: "Drooling" },
      { v: "constant-barking", l: "Constant barking" },
      { v: "high-energy", l: "Hyper energy" },
      { v: "stubborn", l: "Stubborn to train" },
      { v: "fragile-health", l: "Fragile health" },
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
        // Selected values, normalized to strings ("bool" rows read the boolean field).
        const raw = value[f.key];
        const selected =
          f.kind === "multi"
            ? Array.isArray(raw)
              ? (raw as string[])
              : []
            : f.kind === "bool"
              ? typeof raw === "boolean"
                ? [String(raw)]
                : []
              : typeof raw === "string"
                ? [raw as string]
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
                          // "bool" rows write real booleans back onto OnboardingData.
                          const next = on ? undefined : f.kind === "bool" ? o.v === "true" : o.v;
                          setField(f.key, next);
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
