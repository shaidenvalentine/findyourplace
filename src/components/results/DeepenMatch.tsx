"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OptionButton } from "@/components/entry/OptionButton";
import { DEEP_QUIZ, type QuizQuestion } from "@/lib/quiz";
import { saveRunLocal, type FreeRun } from "@/lib/run";
import type { OnboardingData } from "@/types/onboarding";
import { Sparkles, ArrowRight, Loader2, Check, Gauge } from "lucide-react";

function hasVal(inputs: OnboardingData, key: keyof OnboardingData): boolean {
  const v = inputs[key];
  if (v === undefined || v === null) return false;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === "string") return v.trim() !== "";
  return true;
}

/**
 * The "sharpen your match" lever — the psychological engine between the free read and
 * the paywall. A live confidence meter climbs as the user answers the deep questions we
 * don't already know, each one re-scoring the run server-side. Investment before the
 * gate = higher willingness to pay, and a sharper, more share-worthy result.
 */
export function DeepenMatch({ free, onRefined }: { free: FreeRun; onRefined: (updated: FreeRun) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [queue, setQueue] = useState<QuizQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [pending, setPending] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [justGained, setJustGained] = useState<number | null>(null);
  const [err, setErr] = useState(false);

  const remaining = DEEP_QUIZ.filter((q) => !hasVal(free.inputs, q.key));
  const confidence = free.confidence;
  const done = remaining.length === 0 || confidence >= 95;

  function start() {
    setQueue(DEEP_QUIZ.filter((q) => !hasVal(free.inputs, q.key)));
    setIdx(0);
    setPending([]);
    setExpanded(true);
  }

  async function commit(q: QuizQuestion, value: string | string[]) {
    setBusy(true);
    setErr(false);
    const before = free.confidence;
    try {
      const res = await fetch("/api/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send cached inputs so any server instance can rebuild the run — no silent 404s.
        body: JSON.stringify({ runId: free.runId, inputs: free.inputs, additionalInputs: { [q.key]: value } }),
      });
      if (!res.ok) throw new Error("refine failed");
      const { free: updated } = (await res.json()) as { free: FreeRun };
      saveRunLocal(updated);
      onRefined(updated);
      const gain = updated.confidence - before;
      if (gain > 0) {
        setJustGained(gain);
        setTimeout(() => setJustGained(null), 1600);
      }
      // Advance only on success, so a dropped answer isn't silently lost.
      setPending([]);
      if (idx + 1 >= queue.length) setExpanded(false);
      else setIdx((i) => i + 1);
    } catch {
      setErr(true); // keep the question up so the user can retry the tap
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-success/30 bg-card p-5 text-center">
        <div className="mx-auto mb-2 flex w-fit items-center gap-2 rounded-full bg-success/15 px-3 py-1 text-sm font-semibold text-success">
          <Check className="size-4" /> Match dialed in — {confidence}% confidence
        </div>
        <p className="text-sm text-muted-foreground">
          We&apos;ve got a sharp read on you. Your #1 is locked and ready below.
        </p>
      </div>
    );
  }

  const q = queue[idx];

  return (
    <div className="rounded-2xl border border-primary/30 bg-card p-5">
      {/* Confidence meter */}
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <Gauge className="size-4 text-primary" /> Match confidence
        </span>
        <span className="flex items-center gap-2 text-sm font-bold tabular-nums">
          {confidence}%
          {justGained !== null && <span className="text-xs font-semibold text-success">+{justGained}</span>}
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,hsl(var(--secondary)),hsl(var(--primary)))] transition-[width] duration-700 ease-out"
          style={{ width: `${confidence}%` }}
        />
      </div>

      {!expanded ? (
        <>
          <p className="mt-3 text-sm text-muted-foreground">
            Your match is <span className="font-semibold text-foreground">{confidence}% dialed in</span>. Answer{" "}
            {remaining.length} quick {remaining.length === 1 ? "question" : "questions"}{" "}
            to sharpen it toward a confident #1 — and a result that&apos;s actually worth sharing.
          </p>
          <Button className="mt-3 w-full" variant="gradient" size="lg" onClick={start}>
            <Sparkles className="size-4" /> Sharpen my match
          </Button>
        </>
      ) : (
        <div className="mt-4">
          <p className="text-xs text-muted-foreground">
            Question {idx + 1} of {queue.length}
          </p>
          <h3 className="mt-1 text-lg font-bold tracking-tight">{q.title}</h3>
          {q.subtitle && <p className="mt-1 text-sm text-muted-foreground">{q.subtitle}</p>}
          <div className="mt-3 flex flex-col gap-2">
            {q.options.map((opt) => {
              const selected = pending.includes(opt.value);
              return (
                <OptionButton
                  key={opt.value}
                  label={opt.label}
                  hint={opt.hint}
                  selected={selected}
                  onClick={() => {
                    if (busy) return;
                    if (q.type === "single") {
                      commit(q, opt.value);
                    } else {
                      setPending((prev) =>
                        prev.includes(opt.value) ? prev.filter((v) => v !== opt.value) : [...prev, opt.value]
                      );
                    }
                  }}
                />
              );
            })}
          </div>
          {q.type === "multi" && (
            <Button
              className="mt-3 w-full"
              variant="gradient"
              disabled={busy || pending.length === 0}
              onClick={() => commit(q, pending)}
            >
              {busy ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
              Next
            </Button>
          )}
          {busy && q.type === "single" && (
            <p className="mt-2 text-center text-xs text-muted-foreground">
              <Loader2 className="mr-1 inline size-3 animate-spin" /> sharpening…
            </p>
          )}
          {err && (
            <p className="mt-2 text-center text-xs text-destructive">
              That didn&apos;t go through — tap your answer again.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
