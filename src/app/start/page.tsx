"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { saveDraft, loadDraft } from "@/lib/draft";
import { track } from "@/lib/analytics";
import { ArrowRight, Sparkles, Compass, MapPin, PenLine } from "lucide-react";

export default function StartPage() {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [loved, setLoved] = useState("");
  const [step, setStep] = useState<"city" | "loved" | "path">("city");

  // Meta "ViewContent" — funnel entry. This is the page ads point to, so it marks the
  // top of the measured quiz funnel for optimization + cost-per-result reporting.
  useEffect(() => {
    track("quiz_start");
  }, []);

  function commitCity() {
    saveDraft({ currentCity: city.trim() });
    setStep("loved");
  }

  function commitLoved() {
    const places = loved
      .split(/[,\n]/)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 5);
    saveDraft({ lovedPlaces: places });
    setStep("path");
  }

  function choose(path: "ai" | "words" | "quiz") {
    // ensure city persisted even if user edited then jumped
    if (city.trim()) saveDraft({ currentCity: city.trim() });
    else if (!loadDraft().currentCity) saveDraft({ currentCity: "" });
    const route = path === "ai" ? "/start/ai" : path === "words" ? "/start/words" : "/quiz";
    router.push(route);
  }

  return (
    <main className="bg-aurora flex min-h-dvh flex-col">
      <header className="mx-auto flex h-14 w-full max-w-xl items-center justify-between px-4">
        <Link href="/">
          <Logo />
        </Link>
      </header>

      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-4 pb-16">
        {step === "city" ? (
          <div className="animate-fade-up">
            <Badge variant="primary" className="mb-4">
              <MapPin className="size-3" /> Step 1
            </Badge>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Where do you live right now?
            </h1>
            <p className="mt-2 text-muted-foreground">
              We&apos;ll score how well your current city already fits you — your honest baseline.
            </p>
            <form
              className="mt-6 flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                commitCity();
              }}
            >
              <Input
                autoFocus
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Austin, Lisbon, Bali…"
                aria-label="Current city"
              />
              <Button type="submit" size="lg" variant="gradient" disabled={!city.trim()}>
                Continue <ArrowRight className="size-4" />
              </Button>
              <button
                type="button"
                onClick={commitCity}
                className="text-center text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                I&apos;d rather not say
              </button>
            </form>
          </div>
        ) : step === "loved" ? (
          <div className="animate-fade-up">
            <Badge variant="primary" className="mb-4">
              <MapPin className="size-3" /> Step 2
            </Badge>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Where have you felt most at home?
            </h1>
            <p className="mt-2 text-muted-foreground">
              Anywhere you&apos;ve loved — lived, traveled, or just couldn&apos;t stop thinking about.
              This is the strongest signal for finding your place. (Optional.)
            </p>
            <form
              className="mt-6 flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                commitLoved();
              }}
            >
              <Input
                autoFocus
                value={loved}
                onChange={(e) => setLoved(e.target.value)}
                placeholder="e.g. Bali, Lisbon, Mexico City…"
                aria-label="Places you've loved"
              />
              <Button type="submit" size="lg" variant="gradient">
                Continue <ArrowRight className="size-4" />
              </Button>
              <button
                type="button"
                onClick={() => setStep("path")}
                className="text-center text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                Skip — I&apos;m not sure
              </button>
            </form>
          </div>
        ) : (
          <div className="animate-fade-up">
            <Badge variant="primary" className="mb-4">
              <Sparkles className="size-3" /> Step 3 — choose your path
            </Badge>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              How should we get to know you?
            </h1>
            <p className="mt-2 text-muted-foreground">All three lead to the same scored result.</p>

            <div className="mt-6 flex flex-col gap-4">
              <button
                onClick={() => choose("ai")}
                className="group rounded-2xl border border-primary/40 bg-card p-5 text-left transition-all hover:border-primary active:scale-[0.99]"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="grid size-9 place-items-center rounded-lg bg-primary/15 text-primary">
                    <Sparkles className="size-5" />
                  </span>
                  <Badge variant="primary">Recommended</Badge>
                </div>
                <h2 className="text-lg font-semibold">Let your own AI describe you</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Copy a prompt into your ChatGPT or Claude, paste back what it writes. The most
                  accurate read — it already knows you.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Use my AI <ArrowRight className="size-4" />
                </span>
              </button>

              <button
                onClick={() => choose("words")}
                className="group rounded-2xl glass p-5 text-left transition-all hover:border-accent/60 active:scale-[0.99]"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="grid size-9 place-items-center rounded-lg bg-accent/15 text-accent">
                    <PenLine className="size-5" />
                  </span>
                </div>
                <h2 className="text-lg font-semibold">Describe yourself in your own words</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Write a few sentences about your life and what you want. We read it for the signal
                  that drives your match — nothing else.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Write it out <ArrowRight className="size-4" />
                </span>
              </button>

              <button
                onClick={() => choose("quiz")}
                className="group rounded-2xl glass p-5 text-left transition-all hover:border-secondary/60 active:scale-[0.99]"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="grid size-9 place-items-center rounded-lg bg-secondary/15 text-secondary">
                    <Compass className="size-5" />
                  </span>
                </div>
                <h2 className="text-lg font-semibold">Take the quick quiz</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ten fast taps. No app-switching. Great if you&apos;d just rather tap than paste.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-secondary">
                  Start quiz <ArrowRight className="size-4" />
                </span>
              </button>
            </div>

            <button
              onClick={() => setStep("loved")}
              className="mt-6 text-center text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              ← Back
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
