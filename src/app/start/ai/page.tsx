"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AI_PROFILE_PROMPT } from "@/lib/aiPrompt";
import { loadDraft } from "@/lib/draft";
import { useScoreSubmit } from "@/lib/useScoreSubmit";
import type { OnboardingData } from "@/types/onboarding";
import { ArrowRight, Copy, Check, Loader2, Sparkles, Pencil } from "lucide-react";

type Readback = { key: string; label: string; value: string };

export default function AiProfilePage() {
  const [stage, setStage] = useState<"prompt" | "confirm">("prompt");
  const [copied, setCopied] = useState(false);
  const [profile, setProfile] = useState("");
  const [normalizing, setNormalizing] = useState(false);
  const [normErr, setNormErr] = useState<string | null>(null);
  const [inputs, setInputs] = useState<OnboardingData>({});
  const [readback, setReadback] = useState<Readback[]>([]);
  const [usedModel, setUsedModel] = useState(false);
  const { submit, submitting, error } = useScoreSubmit();

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(AI_PROFILE_PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  }

  async function normalize() {
    setNormalizing(true);
    setNormErr(null);
    try {
      const draft = loadDraft();
      const res = await fetch("/api/normalize-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileText: profile, currentCity: draft.currentCity ?? "" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't read that profile");
      setInputs({ ...draft, ...data.inputs });
      setReadback(data.readback ?? []);
      setUsedModel(Boolean(data.usedModel));
      setStage("confirm");
    } catch (e) {
      setNormErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setNormalizing(false);
    }
  }

  return (
    <main className="flex min-h-dvh flex-col">
      <header className="mx-auto flex h-14 w-full max-w-xl items-center justify-between px-4">
        <Link href="/start">
          <Logo withWordmark={false} />
        </Link>
        <Badge variant="primary">
          <Sparkles className="size-3" /> AI profile
        </Badge>
      </header>

      <div className="mx-auto w-full max-w-xl flex-1 px-4 pb-24 pt-2">
        {stage === "prompt" ? (
          <div className="animate-fade-up">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Step 1 — copy this into your AI
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Paste it into your own ChatGPT or Claude. It writes an honest profile of you. Then
              copy what it says and paste it below.
            </p>

            <div className="relative mt-4 rounded-xl border border-border bg-card p-4">
              <pre className="max-h-56 overflow-auto whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">
                {AI_PROFILE_PROMPT}
              </pre>
              <Button
                size="sm"
                variant={copied ? "secondary" : "muted"}
                className="absolute right-3 top-3"
                onClick={copyPrompt}
              >
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>

            <h2 className="mt-8 text-lg font-semibold">Step 2 — paste what it wrote</h2>
            <Textarea
              className="mt-2"
              rows={7}
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
              placeholder="Paste the full profile your AI generated here…"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              🔒 Processed privately on our server to read your preferences. We never store or log
              the text.
            </p>
            {normErr && <p className="mt-2 text-sm text-destructive">{normErr}</p>}

            <Button
              className="mt-4 w-full"
              size="lg"
              variant="gradient"
              disabled={profile.trim().length < 40 || normalizing}
              onClick={normalize}
            >
              {normalizing ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Reading your profile…
                </>
              ) : (
                <>
                  Read my profile <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </div>
        ) : (
          <ConfirmStep
            readback={readback}
            usedModel={usedModel}
            submitting={submitting}
            error={error}
            onBack={() => setStage("prompt")}
            onConfirm={() => submit(inputs, "ai-profile")}
          />
        )}
      </div>
    </main>
  );
}

function ConfirmStep({
  readback,
  usedModel,
  submitting,
  error,
  onBack,
  onConfirm,
}: {
  readback: Readback[];
  usedModel: boolean;
  submitting: boolean;
  error: string | null;
  onBack: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Here&apos;s what we picked up</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {usedModel ? "Read by our AI." : "Read from your profile."} Fix anything that&apos;s off
        before we score — this is what your match is built on.
      </p>

      <div className="mt-5 flex flex-col gap-2">
        {readback.length === 0 ? (
          <p className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
            We couldn&apos;t pull much signal — you can still score, or go back and paste a fuller
            profile.
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
        <Button size="lg" variant="gradient" disabled={submitting} onClick={onConfirm}>
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Scoring 250 places…
            </>
          ) : (
            <>
              Looks right — find my place <ArrowRight className="size-4" />
            </>
          )}
        </Button>
        <button
          onClick={onBack}
          className="text-center text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          ← Re-paste profile
        </button>
      </div>
    </div>
  );
}
