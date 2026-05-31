"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { OptionButton } from "@/components/entry/OptionButton";
import { QUIZ } from "@/lib/quiz";
import { loadDraft } from "@/lib/draft";
import { useScoreSubmit } from "@/lib/useScoreSubmit";
import type { OnboardingData } from "@/types/onboarding";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

export default function QuizPage() {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const { submit, submitting, error } = useScoreSubmit();

  const q = QUIZ[idx];
  const current = answers[q.key as string];
  const isMulti = q.type === "multi";
  const selectedArr = Array.isArray(current) ? current : current ? [current] : [];
  const canAdvance = isMulti ? selectedArr.length > 0 : Boolean(current);
  const progress = ((idx + (canAdvance ? 1 : 0)) / QUIZ.length) * 100;

  function select(value: string) {
    setAnswers((prev) => {
      if (!isMulti) return { ...prev, [q.key]: value };
      const arr = Array.isArray(prev[q.key]) ? [...(prev[q.key] as string[])] : [];
      const has = arr.includes(value);
      let next = has ? arr.filter((v) => v !== value) : [...arr, value];
      if (q.max && next.length > q.max) next = next.slice(next.length - q.max);
      return { ...prev, [q.key]: next };
    });
  }

  function next() {
    if (idx < QUIZ.length - 1) {
      setIdx((i) => i + 1);
    } else {
      finish();
    }
  }

  function finish() {
    const draft = loadDraft();
    const inputs: OnboardingData = { ...draft };
    for (const question of QUIZ) {
      const v = answers[question.key as string];
      if (v === undefined) continue;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (inputs as any)[question.key] = v;
    }
    submit(inputs, "quiz");
  }

  return (
    <main className="flex min-h-dvh flex-col">
      <header className="mx-auto flex h-14 w-full max-w-xl items-center gap-3 px-4">
        <Link href="/">
          <Logo withWordmark={false} />
        </Link>
        <Progress value={progress} className="flex-1" />
        <span className="text-xs tabular-nums text-muted-foreground">
          {idx + 1}/{QUIZ.length}
        </span>
      </header>

      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 pb-28 pt-4">
        <div key={idx} className="animate-fade-up">
          <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{q.title}</h1>
          {q.subtitle && <p className="mt-2 text-sm text-muted-foreground">{q.subtitle}</p>}

          <div className="mt-6 flex flex-col gap-3">
            {q.options.map((opt) => (
              <OptionButton
                key={opt.value}
                label={opt.label}
                emoji={opt.emoji}
                hint={opt.hint}
                selected={selectedArr.includes(opt.value)}
                onClick={() => select(opt.value)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sticky footer nav */}
      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-xl items-center gap-3 px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            disabled={idx === 0 || submitting}
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            aria-label="Back"
          >
            <ArrowLeft className="size-4" />
          </Button>
          <Button
            className="flex-1"
            variant="gradient"
            size="lg"
            disabled={!canAdvance || submitting}
            onClick={next}
          >
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Scoring the best places on Earth…
              </>
            ) : idx === QUIZ.length - 1 ? (
              <>Reveal my matches <ArrowRight className="size-4" /></>
            ) : (
              <>Next <ArrowRight className="size-4" /></>
            )}
          </Button>
        </div>
        {error && <p className="px-4 pb-3 text-center text-sm text-destructive">{error}</p>}
      </div>
    </main>
  );
}
