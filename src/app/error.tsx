"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Surface to Vercel logs; no user data.
    console.error("[app error]", error?.digest ?? error?.message);
  }, [error]);

  return (
    <main className="grid min-h-dvh place-items-center px-6 text-center">
      <div className="flex flex-col items-center">
        <Link href="/" aria-label="Find Your Place — home" className="mb-8">
          <Logo />
        </Link>
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Something broke</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">That didn&apos;t go as planned.</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          A hiccup on our end — not you. Try again, and if it keeps happening you can always start a fresh match.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button variant="gradient" size="lg" onClick={reset}>
            Try again
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/start">Start over</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
