"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    code: "",
    displayName: "",
    email: "",
    bio: "",
    instagramHandle: "",
    tiktokHandle: "",
    youtubeHandle: "",
    twitterHandle: "",
    website: "",
    payoutEmail: "",
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function update(k: keyof typeof form, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/creators/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      router.push("/portal");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
      setBusy(false);
    }
  }

  return (
    <main className="bg-aurora flex min-h-dvh flex-col">
      <header className="mx-auto flex h-14 w-full max-w-xl items-center justify-between px-4">
        <Link href="/creators">
          <Logo />
        </Link>
        <Link href="/portal/login" className="text-sm text-muted-foreground hover:text-foreground">
          Sign in
        </Link>
      </header>

      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 pb-16 pt-6">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Become a creator</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Open program. No application — claim your code and start sharing.
        </p>

        <form onSubmit={submit} className="mt-6 flex flex-col gap-5">
          <Field label="Your code" hint="findyourplace.app/c/YOUR-CODE — letters/numbers only, 3+ chars">
            <Input
              required
              value={form.code}
              onChange={(e) => update("code", e.target.value)}
              placeholder="e.g. octaviusra"
              autoCapitalize="none"
              autoCorrect="off"
            />
          </Field>

          <Field label="Your name (or brand name)">
            <Input required value={form.displayName} onChange={(e) => update("displayName", e.target.value)} placeholder="e.g. Octavius Ra" />
          </Field>

          <Field label="Email" hint="Used to sign in.">
            <Input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" />
          </Field>

          <Field label="Payout email (Wise)" hint="Where we'll send your monthly earnings. Defaults to your sign-in email.">
            <Input type="email" value={form.payoutEmail} onChange={(e) => update("payoutEmail", e.target.value)} placeholder="(optional)" />
          </Field>

          <Field label="One-line bio" hint="Shown at the top of your co-branded landing page. Skip if you want our default.">
            <Textarea rows={3} value={form.bio} onChange={(e) => update("bio", e.target.value)} placeholder="e.g. I moved to Bali at 22. Here's the quiz I wish I'd had." />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Input value={form.instagramHandle} onChange={(e) => update("instagramHandle", e.target.value)} placeholder="Instagram @handle" />
            <Input value={form.tiktokHandle} onChange={(e) => update("tiktokHandle", e.target.value)} placeholder="TikTok @handle" />
            <Input value={form.youtubeHandle} onChange={(e) => update("youtubeHandle", e.target.value)} placeholder="YouTube @handle" />
            <Input value={form.twitterHandle} onChange={(e) => update("twitterHandle", e.target.value)} placeholder="X @handle" />
          </div>
          <Input value={form.website} onChange={(e) => update("website", e.target.value)} placeholder="Website (optional)" />

          {err && <p className="text-sm text-destructive">{err}</p>}

          <Button type="submit" size="lg" variant="gradient" disabled={busy}>
            {busy ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
            Create my account
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            By signing up you agree to a 50% rev share on every $29 unlock attributed to your code,
            paid monthly via Wise. Refunds reverse the cut.
          </p>
        </form>
      </div>
    </main>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
