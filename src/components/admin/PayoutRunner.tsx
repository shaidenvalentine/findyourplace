"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Check } from "lucide-react";

function money(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function PayoutRunner({ creatorId, amountCents }: { creatorId: string; amountCents: number }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function run() {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/payout-preview?creatorId=${creatorId}`);
      const { conversionIds } = await res.json();
      if (!conversionIds?.length) return;
      await fetch("/api/admin/payouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creatorId, conversionIds, markPaid: true }),
      });
      setDone(true);
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" disabled={busy || done} onClick={run}>
      {busy ? <Loader2 className="size-4 animate-spin" /> : done ? <Check className="size-4" /> : null}
      {done ? "Paid" : `Mark ${money(amountCents)} paid`}
    </Button>
  );
}
