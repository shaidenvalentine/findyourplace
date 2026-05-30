import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Compass } from "lucide-react";

export const metadata = { title: "Your runs" };

/**
 * Dashboard shell — lists a signed-in user's past runs (from Supabase `onboarding_runs`,
 * RLS owner-scoped) once auth + persistence land. Empty state for now.
 */
export default function DashboardPage() {
  return (
    <main className="mx-auto w-full max-w-xl px-4">
      <header className="flex h-14 items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <Button asChild variant="ghost" size="sm">
          <Link href="/login">Sign in</Link>
        </Button>
      </header>
      <h1 className="mt-2 text-2xl font-bold tracking-tight">Your runs</h1>
      <Card className="mt-5">
        <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
          <span className="grid size-12 place-items-center rounded-xl bg-primary/15 text-primary">
            <Compass className="size-6" />
          </span>
          <p className="text-sm text-muted-foreground">No runs yet. Find your place to get started.</p>
          <Button asChild variant="gradient">
            <Link href="/start">Take the quiz</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
