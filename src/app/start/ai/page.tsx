"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AI_PROFILE_PROMPT } from "@/lib/aiPrompt";
import { copyText } from "@/lib/utils";
import { loadDraft } from "@/lib/draft";
import { useScoreSubmit } from "@/lib/useScoreSubmit";
import { EditableReadback } from "@/components/entry/EditableReadback";
import type { OnboardingData } from "@/types/onboarding";
import { ArrowRight, Copy, Check, Loader2, Sparkles } from "lucide-react";

export default function AiProfilePage() {
  const [stage, setStage] = useState<"prompt" | "confirm">("prompt");
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [profile, setProfile] = useState("");
  const [normalizing, setNormalizing] = useState(false);
  const [normErr, setNormErr] = useState<string | null>(null);
  const [inputs, setInputs] = useState<OnboardingData>({});
  const [usedModel, setUsedModel] = useState(false);
  const { submit, submitting, error } = useScoreSubmit();
  const promptRef = useRef<HTMLTextAreaElement>(null);

  async function copyPrompt() {
    // Select the on-screen text first: makes the execCommand fallback reliable and
    // leaves the prompt highlighted so the user can copy manually if the API is blocked.
    promptRef.current?.focus();
    promptRef.current?.select();
    const ok = await copyText(AI_PROFILE_PROMPT);
    setCopied(ok);
    setCopyFailed(!ok);
    if (ok) setTimeout(() => setCopied(false), 2200);
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

            <div className="relative mt-4 rounded-xl glass p-4">
              <textarea
                ref={promptRef}
                readOnly
                value={AI_PROFILE_PROMPT}
                onFocus={(e) => e.currentTarget.select()}
                rows={9}
                aria-label="Prompt to copy"
                className="max-h-56 w-full resize-none overflow-auto rounded-md bg-transparent pr-20 font-mono text-xs leading-relaxed text-muted-foreground focus:outline-none"
              />
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

            <Button variant="gradient" className="mt-3 w-full" size="lg" onClick={copyPrompt}>
              {copied ? (
                <>
                  <Check className="size-4" /> Copied — now paste it into ChatGPT or Claude
                </>
              ) : (
                <>
                  <Copy className="size-4" /> Copy the prompt
                </>
              )}
            </Button>
            {copyFailed && (
              <p className="mt-2 text-xs text-muted-foreground">
                Couldn&apos;t auto-copy — the prompt is selected above, long-press to copy it.
              </p>
            )}

            <h2 className="mt-8 text-lg font-semibold">Step 2 — paste what it wrote</h2>
            <Textarea
              className="mt-2"
              rows={7}
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
              placeholder="Paste the full profile your AI generated here…"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Processed privately on our server to read your preferences. We never store or log
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
            inputs={inputs}
            setInputs={setInputs}
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
  inputs,
  setInputs,
  usedModel,
  submitting,
  error,
  onBack,
  onConfirm,
}: {
  inputs: OnboardingData;
  setInputs: (next: OnboardingData) => void;
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
        {usedModel ? "Read by our AI." : "Read from your profile."} Tap any row to fix it — this is
        exactly what your match is built on.
      </p>

      <div className="mt-5">
        <EditableReadback value={inputs} onChange={setInputs} />
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <div className="mt-6 flex flex-col gap-2">
        <Button size="lg" variant="gradient" disabled={submitting} onClick={onConfirm}>
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
          onClick={onBack}
          className="min-h-[44px] text-center text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          ← Re-paste profile
        </button>
      </div>
    </div>
  );
}
