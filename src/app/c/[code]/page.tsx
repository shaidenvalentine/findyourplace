import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { LiveCounter } from "@/components/marketing/LiveCounter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCreatorStore } from "@/lib/creators/store";
import { normalizeCode } from "@/lib/creators/attribution";
import { RecordClick } from "@/components/portal/RecordClick";
import { ArrowRight, Sparkles } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  const c = await getCreatorStore().getCreatorByCode(normalizeCode(code));
  if (!c) return { title: "Creator not found" };
  const title = `${c.displayName} × Find Your Place`;
  const description = `${c.displayName} sent you. Take the quiz that finds the one place on Earth that actually fits you.`;
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
  };
}

export default async function CreatorLanding({ params }: { params: Promise<{ code: string }> }) {
  const { code: raw } = await params;
  const code = normalizeCode(raw);
  const c = await getCreatorStore().getCreatorByCode(code);
  if (!c || c.status !== "active") notFound();

  // Cookie is set by middleware. Record the click on mount.
  return (
    <main className="flex min-h-dvh flex-col">
      <RecordClick code={code} source="landing" />
      <header className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
        <Link href="/">
          <Logo />
        </Link>
      </header>

      <section className="bg-aurora relative overflow-hidden">
        <div className="mx-auto w-full max-w-3xl px-4 pb-20 pt-16 sm:pt-24">
          <div className="flex flex-col items-center text-center">
            <Badge variant="primary" className="mb-6">
              <Sparkles className="size-3" /> {c.displayName} sent you
            </Badge>

            <h1 className="animate-fade-up text-balance text-5xl font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-7xl">
              The biggest decision
              <br />
              you <span className="text-gradient">haven&apos;t made yet.</span>
            </h1>

            <p className="animate-fade-up mt-8 max-w-xl text-pretty text-lg text-muted-foreground sm:text-xl">
              {c.bio ? (
                <>{c.bio}</>
              ) : (
                <>
                  Where you live decides your money, your people, your health. We find the one place
                  on Earth that actually fits you.
                </>
              )}
            </p>

            <Button asChild size="lg" variant="gradient" className="mt-10">
              <Link href="/start">
                Take the quiz <ArrowRight className="size-4" />
              </Link>
            </Button>

            <p className="mt-4 text-sm text-muted-foreground">
              60 seconds · free to start · <LiveCounter /> matched
            </p>
          </div>
        </div>
      </section>

      <footer className="mt-auto border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row">
          <Logo />
          <p>© {new Date().getFullYear()} findyourplace.app</p>
        </div>
      </footer>
    </main>
  );
}
