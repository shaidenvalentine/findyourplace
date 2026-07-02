import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata = { title: "Sign in" };

/**
 * Auth shell. Wired to Supabase Auth (magic-link / Google) in a later pass — the
 * funnel intentionally does not require an account to take the quiz or see the free
 * read; accounts exist to save runs and return to results.
 */
export default function LoginPage() {
  return (
    <main className="bg-aurora grid min-h-dvh place-items-center px-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-6 flex justify-center">
          <Logo />
        </Link>
        <div className="rounded-2xl glass p-6">
          <h1 className="text-xl font-bold">Save your results</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your email and we&apos;ll send a magic link.
          </p>
          <form className="mt-4 flex flex-col gap-3">
            <Input type="email" placeholder="you@email.com" />
            <Button type="button" variant="gradient" size="lg" disabled>
              Send magic link
            </Button>
          </form>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Auth connects to Supabase once env keys are set.
          </p>
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          <Link href="/start" className="underline underline-offset-4">
            Skip — just take the quiz
          </Link>
        </p>
      </div>
    </main>
  );
}
