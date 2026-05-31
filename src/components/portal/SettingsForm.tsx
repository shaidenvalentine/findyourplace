"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import type { Creator } from "@/lib/creators/types";
import { Check, Loader2 } from "lucide-react";

export function SettingsForm({ creator }: { creator: Creator }) {
  const [form, setForm] = useState({
    displayName: creator.displayName,
    bio: creator.bio ?? "",
    instagramHandle: creator.instagramHandle ?? "",
    tiktokHandle: creator.tiktokHandle ?? "",
    youtubeHandle: creator.youtubeHandle ?? "",
    twitterHandle: creator.twitterHandle ?? "",
    website: creator.website ?? "",
    payoutEmail: creator.payoutEmail ?? "",
  });
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
    setSaved(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await fetch("/api/creators/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <Field label="Display name">
        <Input value={form.displayName} onChange={(e) => update("displayName", e.target.value)} />
      </Field>
      <Field label="Bio (one line for your landing page)">
        <Textarea rows={3} value={form.bio} onChange={(e) => update("bio", e.target.value)} placeholder="e.g. I moved to Bali at 22..." />
      </Field>
      <Field label="Payout email (Wise)">
        <Input type="email" value={form.payoutEmail} onChange={(e) => update("payoutEmail", e.target.value)} placeholder="you@email.com" />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Input value={form.instagramHandle} onChange={(e) => update("instagramHandle", e.target.value)} placeholder="Instagram @handle" />
        <Input value={form.tiktokHandle} onChange={(e) => update("tiktokHandle", e.target.value)} placeholder="TikTok @handle" />
        <Input value={form.youtubeHandle} onChange={(e) => update("youtubeHandle", e.target.value)} placeholder="YouTube @handle" />
        <Input value={form.twitterHandle} onChange={(e) => update("twitterHandle", e.target.value)} placeholder="X @handle" />
      </div>
      <Input value={form.website} onChange={(e) => update("website", e.target.value)} placeholder="Website" />
      <Button type="submit" disabled={busy} variant="gradient">
        {busy ? <Loader2 className="size-4 animate-spin" /> : saved ? <Check className="size-4" /> : null}
        {saved ? "Saved" : "Save changes"}
      </Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}
