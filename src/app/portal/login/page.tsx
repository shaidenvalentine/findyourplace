"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/creators/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      router.push("/portal");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
      setBusy(false);
    }
  }

  return (
    <main className="bg-aurora grid min-h-dvh place-items-center px-4">
      <div className="w-full max-w-sm">
        <Link href="/creators" className="mb-6 flex justify-center">
          <Logo />
        </Link>
        <div className="rounded-2xl glass p-6">
          <h1 className="text-xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your creator portal.</p>
          <form onSubmit={submit} className="mt-5 flex flex-col gap-3">
            <Input
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Your code (e.g. octaviusra)"
              autoCapitalize="none"
            />
            <Input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
            />
            {err && <p className="text-sm text-destructive">{err}</p>}
            <Button type="submit" variant="gradient" size="lg" disabled={busy}>
              {busy ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
              Sign in
            </Button>
          </form>
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          New here? <Link href="/portal/signup" className="underline">Become a creator</Link>
        </p>
      </div>
    </main>
  );
}
