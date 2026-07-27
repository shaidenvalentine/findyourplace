import { recommendToolkit } from "@/lib/affiliates";
import type { FreeRun } from "@/lib/run";
import { AffiliateCard } from "./AffiliateCard";
import { PawPrint } from "lucide-react";

/**
 * The hero affiliate surface (paid reveal): a personalized new-dog toolkit, ordered by
 * the user's situation so it reads as concierge advice. Every link is tracked + disclosed.
 */
export function DogToolkit({ run }: { run: FreeRun }) {
  const sections = recommendToolkit(run);
  if (sections.length === 0) return null;

  return (
    <div className="rounded-2xl glass p-5">
      <div className="mb-1 flex items-center gap-2">
        <span className="grid size-8 place-items-center rounded-lg bg-accent/15 text-accent">
          <PawPrint className="size-4" />
        </span>
        <h2 className="text-lg font-bold tracking-tight">Your new-dog toolkit</h2>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">
        The exact services to set your dog up right — hand-picked for your situation.
      </p>

      <div className="flex flex-col gap-5">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-sm font-semibold">{section.title}</h3>
            <p className="mb-2 text-xs text-muted-foreground">{section.subtitle}</p>
            <div className="flex flex-col gap-2">
              {section.items.map((p) => (
                <AffiliateCard key={p.id} partner={p} runId={run.runId} placement={`toolkit:${section.title}`} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[11px] text-muted-foreground">
        Some links are partner links — if you sign up, we may earn a commission at no cost to you. We only list
        services we&apos;d use with our own dogs.
      </p>
    </div>
  );
}
