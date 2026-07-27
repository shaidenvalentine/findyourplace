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
import { ArrowRight, Sparkles, Compass, MapPin, PawPrint, Heart, PenLine } from "lucide-react";

export default function StartPage() {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [dream, setDream] = useState("");
  const [loved, setLoved] = useState("");
  const [step, setStep] = useState<"city" | "dream" | "loved" | "path">("city");

  // Meta "ViewContent" — funnel entry. This is the page ads point to, so it marks the
  // top of the measured quiz funnel for optimization + cost-per-result reporting.
  useEffect(() => {
    track("quiz_start");
  }, []);

  function commitCity() {
    saveDraft({ currentCity: city.trim() });
    setStep("dream");
  }

  function commitDream() {
    saveDraft({ dreamBreed: dream.trim() });
    setStep("loved");
  }

  function commitLoved() {
    const breeds = loved
      .split(/[,\n]/)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 5);
    saveDraft({ lovedBreeds: breeds });
    setStep("path");
  }

  function choose(path: "ai" | "words" | "quiz") {
    // ensure openers persisted even if user edited then jumped
    if (city.trim()) saveDraft({ currentCity: city.trim() });
    else if (!loadDraft().currentCity) saveDraft({ currentCity: "" });
    if (dream.trim()) saveDraft({ dreamBreed: dream.trim() });
    const route = path === "ai" ? "/start/ai" : path === "words" ? "/start/words" : "/quiz";
    router.push(route);
  }

  return (
    <main className="bg-aurora flex min-h-dvh flex-col">
      <header className="mx-auto flex h-14 w-full max-w-xl items-center justify-between px-4">
        <Link href="/" aria-label="Find Your Dog — home">
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
              Where do you live?
            </h1>
            <p className="mt-2 text-muted-foreground">
              So once we find your breed, we can find that dog in shelters near you — real,
              adoptable, waiting.
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
                placeholder="e.g. Austin, Chicago, Denver…"
                aria-label="Where you live"
              />
              <Button type="submit" size="lg" variant="gradient" disabled={!city.trim()}>
                Continue <ArrowRight className="size-4" />
              </Button>
              <button
                type="button"
                onClick={commitCity}
                className="inline-flex min-h-11 items-center justify-center text-center text-sm text-muted-foreground underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
              >
                I&apos;d rather not say
              </button>
            </form>
          </div>
        ) : step === "dream" ? (
          <div className="animate-fade-up">
            <Badge variant="primary" className="mb-4">
              <PawPrint className="size-3" /> Step 2
            </Badge>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              What breed do you think you want?
            </h1>
            <p className="mt-2 text-muted-foreground">
              Your gut answer — &ldquo;lab&rdquo;, &ldquo;gsd&rdquo;, &ldquo;frenchie&rdquo; all
              work. We&apos;ll score your instinct honestly against your real life — your baseline
              before the reveal.
            </p>
            <form
              className="mt-6 flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                commitDream();
              }}
            >
              <Input
                autoFocus
                value={dream}
                onChange={(e) => setDream(e.target.value)}
                placeholder="e.g. golden retriever, husky, lab…"
                aria-label="Breed you think you want"
              />
              <Button type="submit" size="lg" variant="gradient" disabled={!dream.trim()}>
                Continue <ArrowRight className="size-4" />
              </Button>
              <button
                type="button"
                onClick={commitDream}
                className="inline-flex min-h-11 items-center justify-center text-center text-sm text-muted-foreground underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
              >
                No idea yet — that&apos;s the point
              </button>
            </form>
          </div>
        ) : step === "loved" ? (
          <div className="animate-fade-up">
            <Badge variant="primary" className="mb-4">
              <Heart className="size-3" /> Step 3
            </Badge>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Any breeds you&apos;ve had or loved?
            </h1>
            <p className="mt-2 text-muted-foreground">
              The dog you grew up with, a friend&apos;s dog you adored, one you dog-sat and never
              forgot. This is the strongest signal for finding yours. (Optional.)
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
                placeholder="e.g. beagle, border collie, corgi…"
                aria-label="Breeds you've had or loved"
              />
              <Button type="submit" size="lg" variant="gradient">
                Continue <ArrowRight className="size-4" />
              </Button>
              <button
                type="button"
                onClick={() => setStep("path")}
                className="inline-flex min-h-11 items-center justify-center text-center text-sm text-muted-foreground underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
              >
                Skip — I&apos;m not sure
              </button>
            </form>
          </div>
        ) : (
          <div className="animate-fade-up">
            <Badge variant="primary" className="mb-4">
              <Sparkles className="size-3" /> Step 4 — choose your path
            </Badge>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              How should we get to know you?
            </h1>
            <p className="mt-2 text-muted-foreground">All three lead to the same scored result.</p>

            <div className="mt-6 flex flex-col gap-4">
              <button
                onClick={() => choose("ai")}
                className="group rounded-2xl border border-primary/40 bg-card p-5 text-left transition-all hover:border-primary active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
                className="group rounded-2xl glass p-5 text-left transition-all hover:border-accent/60 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="grid size-9 place-items-center rounded-lg bg-accent/15 text-accent">
                    <PenLine className="size-5" />
                  </span>
                </div>
                <h2 className="text-lg font-semibold">Describe your life in your own words</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Write a few sentences about your home, schedule, and what you want in a dog. We
                  read it for the signal that drives your match — nothing else.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Write it out <ArrowRight className="size-4" />
                </span>
              </button>

              <button
                onClick={() => choose("quiz")}
                className="group rounded-2xl glass p-5 text-left transition-all hover:border-secondary/60 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
              className="mt-6 inline-flex min-h-11 items-center justify-center text-center text-sm text-muted-foreground underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
            >
              ← Back
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
