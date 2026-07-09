import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-6 text-center">
      <div className="flex flex-col items-center">
        <Link href="/" aria-label="Find Your Place — home" className="mb-8">
          <Logo />
        </Link>
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">404</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">This page wandered off.</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          The link may be incomplete or point somewhere that no longer exists. Your place is still out
          there — it only takes about a minute to find it.
        </p>
        <Button asChild variant="gradient" size="lg" className="mt-7">
          <Link href="/start">Find my place</Link>
        </Button>
      </div>
    </main>
  );
}
