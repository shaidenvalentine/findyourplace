"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function OptionButton({
  label,
  emoji,
  hint,
  selected,
  onClick,
}: {
  label: string;
  emoji?: string;
  hint?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "group relative flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all active:scale-[0.99]",
        selected
          ? "border-primary bg-primary/10 ring-1 ring-primary"
          : "border-border bg-card hover:border-primary/40 hover:bg-muted/40"
      )}
    >
      {emoji && <span className="text-2xl">{emoji}</span>}
      <span className="flex-1">
        <span className="block font-semibold leading-tight">{label}</span>
        {hint && <span className="block text-xs text-muted-foreground">{hint}</span>}
      </span>
      <span
        className={cn(
          "grid size-5 shrink-0 place-items-center rounded-full border transition-colors",
          selected ? "border-primary bg-primary text-primary-foreground" : "border-border"
        )}
      >
        {selected && <Check className="size-3.5" strokeWidth={3} />}
      </span>
    </button>
  );
}
