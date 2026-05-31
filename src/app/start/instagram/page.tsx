"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { loadDraft } from "@/lib/draft";
import { useScoreSubmit } from "@/lib/useScoreSubmit";
import type { OnboardingData } from "@/types/onboarding";
import { ArrowRight, Camera, Loader2, Pencil, Upload, ShieldCheck } from "lucide-react";

type Readback = { key: string; label: string; value: string };

function fileToBase64(file: File): Promise<{ data: string; mediaType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      const comma = result.indexOf(",");
      resolve({ data: result.slice(comma + 1), mediaType: file.type || "image/png" });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function InstagramPage() {
  const [stage, setStage] = useState<"upload" | "confirm">("upload");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [reading, setReading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [inputs, setInputs] = useState<OnboardingData>({});
  const [readback, setReadback] = useState<Readback[]>([]);
  const { submit, submitting, error } = useScoreSubmit();

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setErr(null);
  }

  async function readVibe() {
    if (!file) return;
    setReading(true);
    setErr(null);
    try {
      const { data, mediaType } = await fileToBase64(file);
      const draft = loadDraft();
      const res = await fetch("/api/vibe-read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: data, mediaType, currentCity: draft.currentCity ?? "" }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || "Couldn't read that image");
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
          <Camera className="size-3" /> Instagram vibe
        </Badge>
      </header>

      <div className="mx-auto w-full max-w-xl flex-1 px-4 pb-24 pt-2">
        {stage === "upload" ? (
          <div className="animate-fade-up">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Upload your Instagram</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Screenshot your own profile grid and drop it here. We read your{" "}
              <span className="font-medium text-foreground">vibe</span> — the places, activities, and
              aesthetic — to understand what fits you.
            </p>

            <label className="mt-5 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card p-8 text-center transition-colors hover:border-primary/50">
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="preview" className="max-h-64 rounded-lg object-contain" />
              ) : (
                <>
                  <span className="grid size-12 place-items-center rounded-full bg-primary/15 text-primary">
                    <Upload className="size-6" />
                  </span>
                  <span className="text-sm font-medium">Tap to choose a screenshot</span>
                  <span className="text-xs text-muted-foreground">PNG or JPG</span>
                </>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={onPick} />
            </label>

            <div className="mt-4 flex items-start gap-2 rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" />
              <span>
                We read your <strong>vibe, never your face</strong> — no facial analysis. The image is
                processed privately and never stored. This is opt-in; you can use the quiz instead.
              </span>
            </div>

            {err && <p className="mt-3 text-sm text-destructive">{err}</p>}

            <Button
              className="mt-4 w-full"
              size="lg"
              variant="gradient"
              disabled={!file || reading}
              onClick={readVibe}
            >
              {reading ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Reading your vibe…
                </>
              ) : (
                <>
                  Read my vibe <ArrowRight className="size-4" />
                </>
              )}
            </Button>
            <p className="mt-3 text-center text-sm">
              <Link href="/start/ai" className="text-muted-foreground underline underline-offset-4">
                Rather use your AI or the quiz?
              </Link>
            </p>
          </div>
        ) : (
          <div className="animate-fade-up">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Here&apos;s your vibe</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Fix anything that&apos;s off before we score — this is what your match is built on.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              {readback.length === 0 ? (
                <p className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
                  We couldn&apos;t pull much from that one — try a fuller screenshot, or just score it.
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
                onClick={() => setStage("upload")}
                className="text-center text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                ← Try another screenshot
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
