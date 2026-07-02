"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ANCHOR_LABEL, PRICE_LABEL } from "@/lib/pricing";
import { loadRunLocal } from "@/lib/run";
import { LOCATION_COUNT } from "@/data/locations";
import { track } from "@/lib/analytics";
import { Check, Loader2, Lock, ShieldCheck, Star } from "lucide-react";

const INCLUDES = [
  "The name of your #1 place, revealed",
  "Your move plan — the steps to actually get there",
  `The full ranking of all ${LOCATION_COUNT} places`,
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
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  // Meta "AddToCart" — the user reached the gate. The core paid-intent signal.
  useEffect(() => {
    track("paywall_view");
  }, []);

  async function startCheckout() {
    if (!emailValid) return;
    setBusy(true);
    setErr(null);
    track("checkout_start"); // Meta "InitiateCheckout"
    try {
      // Email gate — captured BEFORE payment so the nurture list gets every checkout
      // starter. keepalive survives the immediate hand-off to hosted checkout.
      fetch("/api/capture-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), runId, stage: "paywall" }),
        keepalive: true,
      }).catch(() => {});

      // Include cached inputs as cold-lambda fallback so checkout never 404s.
      const cached = loadRunLocal(runId);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ runId, email: email.trim(), inputs: cached?.inputs ?? null }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");

      // Hosted-checkout rails (Stripe or Lemon Squeezy) return a URL to hand off to.
      if (data.url) {
        window.location.href = data.url;
        return;
      }

      // Dev mode (no rail configured): simulate a verified unlock so the funnel completes.
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
    <div className="rounded-2xl border border-primary/30 bg-card p-6">
      {/* Cost of inaction — the status quo has a price too. */}
      <p className="mb-4 text-sm text-muted-foreground">
        Every month you stay put is another month in a place that doesn&apos;t fit. You&apos;ve
        already done the hard part — see where you actually belong.
      </p>

      <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        One-time unlock
      </div>
      <div className="mb-4 flex items-baseline gap-2.5">
        <span className="text-5xl font-light tabular-nums tracking-tight">{PRICE_LABEL}</span>
        <span className="text-lg font-light text-muted-foreground line-through">{ANCHOR_LABEL}</span>
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

      {/* Social proof — one specific, on-brand testimonial at the moment of decision. */}
      <figure className="mb-5 rounded-xl border border-border bg-surface/50 p-4">
        <div className="mb-1 flex gap-0.5 text-primary">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-3.5 fill-current" />
          ))}
        </div>
        <blockquote className="text-sm text-foreground">
          &ldquo;It named a city I&apos;d never have picked — and it was so obviously right I booked a
          scouting trip that week.&rdquo;
        </blockquote>
        <figcaption className="mt-1 text-xs text-muted-foreground">— Maya R., now in Lisbon</figcaption>
      </figure>

      <Input
        type="email"
        inputMode="email"
        placeholder="you@email.com — where we send your results"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email address"
        className="mb-3"
      />

      <Button
        className="w-full"
        size="lg"
        variant="gradient"
        onClick={startCheckout}
        disabled={busy || !emailValid}
      >
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
      <div className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs font-medium text-success">
        <ShieldCheck className="size-3.5" /> Not blown away? Email us within 7 days for a full refund.
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Apple Pay &amp; cards · one-time · instant access · no subscription
        <br />
        By unlocking you agree to the{" "}
        <a href="/terms" className="underline underline-offset-2 hover:text-foreground">
          Terms
        </a>{" "}
        ·{" "}
        <a href="/privacy" className="underline underline-offset-2 hover:text-foreground">
          Privacy
        </a>
      </p>
    </div>
  );
}
