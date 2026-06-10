"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { loadDraft } from "@/lib/draft";
import { useScoreSubmit } from "@/lib/useScoreSubmit";
import type { OnboardingData } from "@/types/onboarding";
import { ArrowRight, Loader2, PenLine, Pencil } from "lucide-react";

type Readback = { key: string; label: string; value: string };

const PROMPTS = [
  "Where you live now and how you really feel about it",
  "The climate and pace of life you're drawn to",
  "Your work, your budget, and what \"living well\" costs you",
  "Your top non-negotiables — and your hard deal-breakers",
];

/**
 * The consent-based open-text path. The user writes about themselves in their own words;
 * we parse it server-side (same normalizer as the AI-profile path) into structured
 * scoring signal and read it back for confirmation. No uploads, no images, no scraping —
 * fully on-guardrail (CLAUDE.md: identity signal from consent-based input only).
 */
export default function WordsPage() {
  const [stage, setStage] = useState<"write" | "confirm">("write");
  const [text, setText] = useState("");
  const [reading, setReading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [inputs, setInputs] = useState<OnboardingData>({});
  const [readback, setReadback] = useState<Readback[]>([]);
  const { submit, submitting, error } = useScoreSubmit();

  async function read() {
    setReading(true);
    setErr(null);
    try {
      const draft = loadDraft();
      const res = await fetch("/api/normalize-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileText: text, currentCity: draft.currentCity ?? "" }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || "Couldn't read that yet");
      setInputs({ ...draft, ...d.inputs });
      setReadback(d.readback ?? []);
      setStage("confirm");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setReading(false);
    }
  }

  return (
    <main className="flex min-h-dvh flex-col">
      <header className="mx-auto flex h-14 w-full max-w-xl items-center justify-between px-4">
        <Link href="/start">
          <Logo withWordmark={false} />
        </Link>
        <Badge variant="primary">
          <PenLine className="size-3" /> In your words
        </Badge>
      </header>

      <div className="mx-auto w-full max-w-xl flex-1 px-4 pb-24 pt-2">
        {stage === "write" ? (
          <div className="animate-fade-up">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Tell us about you</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              A few honest sentences are all we need. The more real, the sharper your match. Touch on:
            </p>
            <ul className="mt-3 flex flex-col gap-1.5">
              {PROMPTS.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {p}
                </li>
              ))}
            </ul>

            <Textarea
              className="mt-4"
              rows={9}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="I'm in Chicago and the winters are wearing me down. I work remotely in tech, I'd love to be near the ocean and somewhere warm, I want my money to stretch further, and safety matters a lot…"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              🔒 Processed privately on our server to read your preferences. We never store or log the
              text.
            </p>
            {err && <p className="mt-2 text-sm text-destructive">{err}</p>}

            <Button
              className="mt-4 w-full"
              size="lg"
              variant="gradient"
              disabled={text.trim().length < 40 || reading}
              onClick={read}
            >
              {reading ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Reading what you wrote…
                </>
              ) : (
                <>
                  Read my answer <ArrowRight className="size-4" />
                </>
              )}
            </Button>
            <p className="mt-3 text-center text-sm">
              <Link href="/start/ai" className="text-muted-foreground underline underline-offset-4">
                Rather have your own AI write it?
              </Link>
            </p>
          </div>
        ) : (
          <div className="animate-fade-up">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Here&apos;s what we picked up</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Fix anything that&apos;s off before we score — this is what your match is built on.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              {readback.length === 0 ? (
                <p className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
                  We couldn&apos;t pull much signal yet — go back and add a little more, or just score it.
                </p>
              ) : (
                readback.map((r) => (
                  <div
                    key={r.key}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3"
                  >
                    <span className="text-sm text-muted-foreground">{r.label}</span>
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      {r.value}
                      <Pencil className="size-3 text-muted-foreground" />
                    </span>
                  </div>
                ))
              )}
            </div>
            {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
            <div className="mt-6 flex flex-col gap-2">
              <Button size="lg" variant="gradient" disabled={submitting} onClick={() => submit(inputs, "ai-profile")}>
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Scoring the best places on Earth…
                  </>
                ) : (
                  <>
                    Looks right — find my place <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
              <button
                onClick={() => setStage("write")}
                className="text-center text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                ← Edit what I wrote
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
