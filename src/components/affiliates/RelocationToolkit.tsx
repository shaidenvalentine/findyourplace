import { recommendToolkit } from "@/lib/affiliates";
import type { FreeRun } from "@/lib/run";
import { AffiliateCard } from "./AffiliateCard";
import { Briefcase } from "lucide-react";

/**
 * The hero affiliate surface (paid reveal): a personalized move plan rendered as a
 * numbered checklist — a plan you work through, not an ad rail you scroll past.
 * Every link is tracked + disclosed.
 */
export function RelocationToolkit({ run }: { run: FreeRun }) {
  const sections = recommendToolkit(run);
  if (sections.length === 0) return null;

  return (
    <div className="rounded-2xl glass p-5">
      <div className="mb-1 flex items-center gap-2">
        <span className="grid size-8 place-items-center rounded-lg bg-accent/15 text-accent">
          <Briefcase className="size-4" />
        </span>
        <h2 className="text-lg font-bold tracking-tight">Your move plan</h2>
      </div>
      <p className="mb-5 text-sm text-muted-foreground">
        Work through these in order — this is the exact sequence we&apos;d follow for your situation.
      </p>

      <ol className="flex flex-col gap-6">
        {sections.map((section, i) => (
          <li key={section.title} className="relative pl-9">
            <span className="absolute left-0 top-0 grid size-6 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">
              {i + 1}
            </span>
            {i < sections.length - 1 && (
              <span aria-hidden className="absolute bottom-[-1.5rem] left-3 top-8 w-px bg-border" />
            )}
            <h3 className="text-sm font-semibold">{section.title}</h3>
            <p className="mb-2 text-xs text-muted-foreground">{section.subtitle}</p>
            <div className="flex flex-col gap-2">
              {section.items.map((p) => (
                <AffiliateCard key={p.id} partner={p} runId={run.runId} placement={`toolkit:${section.title}`} />
              ))}
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-5 text-[11px] text-muted-foreground">
        Some links are partner links — if you sign up, we may earn a commission at no cost to you. We only list
        services we&apos;d use ourselves.
      </p>
    </div>
  );
}
