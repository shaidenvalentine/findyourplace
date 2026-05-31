"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ANCHOR_LABEL, PRICE_LABEL } from "@/lib/pricing";
import { loadRunLocal } from "@/lib/run";
import { Check, Loader2, Lock } from "lucide-react";

const INCLUDES = [
  "The name of your #1 place, revealed",
  "Your move plan — the steps to actually get there",
  "The full ranking of all 250 places",
  "Per-place tax deep-dive + annual circuit",
  "Your shareable result card",
];

export function Paywall({
  runId,
  onUnlocked,
}: {
  runId: string;
  onUnlocked: () => void;
}) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function startCheckout() {
    setBusy(true);
    setErr(null);
    try {
      // Email gate → capture before payment (Phase 4 pushes this to the ESP).
      if (email.trim()) {
        fetch("/api/capture-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim(), runId, stage: "paywall" }),
        }).catch(() => {});
      }

      // Include cached inputs as cold-lambda fallback so checkout never 404s.
      const cached = loadRunLocal(runId);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ runId, email: email.trim(), inputs: cached?.inputs ?? null }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");

      if (data.mode === "stripe" && data.url) {
        window.location.href = data.url; // hand off to Stripe Checkout
        return;
      }

      // Dev mode (no Stripe key): simulate a verified unlock so the funnel completes.
      const unlock = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ runId, inputs: cached?.inputs ?? null }),
      });
      if (!unlock.ok) throw new Error("Unlock failed");
      onUnlocked();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-4 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold">{PRICE_LABEL}</span>
        <span className="text-lg text-muted-foreground line-through">{ANCHOR_LABEL}</span>
        <span className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">
          today only
        </span>
      </div>

      <ul className="mb-5 flex flex-col gap-2">
        {INCLUDES.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 size-4 shrink-0 text-success" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <Input
        type="email"
        inputMode="email"
        placeholder="you@email.com (to save your results)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-3"
      />

      <Button className="w-full" size="lg" variant="gradient" onClick={startCheckout} disabled={busy}>
        {busy ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Unlocking…
          </>
        ) : (
          <>
            <Lock className="size-4" /> Unlock my full results
          </>
        )}
      </Button>
      {err && <p className="mt-2 text-center text-sm text-destructive">{err}</p>}
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Apple Pay &amp; cards · one-time · instant access · no subscription
      </p>
    </div>
  );
}
