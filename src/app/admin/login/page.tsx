"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      router.push("/admin");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
      setBusy(false);
    }
  }

  return (
    <main className="bg-aurora grid min-h-dvh place-items-center px-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-6 flex justify-center">
          <Logo />
        </Link>
        <div className="rounded-2xl glass p-6">
          <div className="mb-3 flex items-center gap-2 text-primary">
            <ShieldCheck className="size-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Admin</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Sign in</h1>
          <form onSubmit={submit} className="mt-5 flex flex-col gap-3">
            <Input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              autoFocus
            />
            {err && <p className="text-sm text-destructive">{err}</p>}
            <Button type="submit" variant="gradient" size="lg" disabled={busy}>
              {busy ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
              Sign in
            </Button>
          </form>
          <p className="mt-4 text-[11px] text-muted-foreground">
            Password is set via <code>ADMIN_PASSWORD</code> env var. If you forgot it, set a new one in Vercel.
          </p>
        </div>
      </div>
    </main>
  );
}
