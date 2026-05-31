"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Check } from "lucide-react";

function money(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function CreatorAdminControls({
  creatorId,
  status,
  revSharePct,
  pendingCents,
}: {
  creatorId: string;
  status: "active" | "suspended";
  revSharePct: number;
  pendingCents: number;
}) {
  const router = useRouter();
  const [pct, setPct] = useState(String(revSharePct));
  const [busy, setBusy] = useState<string | null>(null);
  const [reference, setReference] = useState("");

  async function patch(body: Record<string, unknown>, tag: string) {
    setBusy(tag);
    try {
      await fetch(`/api/admin/creators/${creatorId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  async function payout() {
    setBusy("payout");
    try {
      // Fetch this creator's pending conversion IDs, then create a payout.
      const res = await fetch(`/api/admin/payout-preview?creatorId=${creatorId}`);
      const { conversionIds } = await res.json();
      if (!conversionIds?.length) return;
      await fetch("/api/admin/payouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creatorId, conversionIds, reference, markPaid: true }),
      });
      setReference("");
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Status */}
      <Row label="Status">
        <Button
          variant={status === "active" ? "outline" : "gradient"}
          size="sm"
          disabled={busy !== null}
          onClick={() => patch({ status: status === "active" ? "suspended" : "active" }, "status")}
        >
          {busy === "status" ? <Loader2 className="size-4 animate-spin" /> : null}
          {status === "active" ? "Suspend creator" : "Reactivate creator"}
        </Button>
      </Row>

      {/* Rev share */}
      <Row label="Rev share %">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min={0}
            max={100}
            value={pct}
            onChange={(e) => setPct(e.target.value)}
            className="h-9 w-24"
          />
          <Button
            variant="outline"
            size="sm"
            disabled={busy !== null || Number(pct) === revSharePct}
            onClick={() => patch({ revSharePct: Number(pct) }, "pct")}
          >
            {busy === "pct" ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
            Save
          </Button>
        </div>
      </Row>

      {/* Payout */}
      <Row label={`Pay out (${money(pendingCents)} pending)`}>
        <div className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
          <Input
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="Wise transfer ID (optional)"
            className="h-9"
          />
          <Button variant="gradient" size="sm" disabled={busy !== null || pendingCents <= 0} onClick={payout} className="shrink-0">
            {busy === "payout" ? <Loader2 className="size-4 animate-spin" /> : null}
            Mark {money(pendingCents)} paid
          </Button>
        </div>
      </Row>
      <p className="text-xs text-muted-foreground">
        Marking paid records the payout and flips all pending conversions to &quot;paid&quot;. Send the actual Wise
        transfer separately to their payout email.
      </p>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </div>
  );
}
