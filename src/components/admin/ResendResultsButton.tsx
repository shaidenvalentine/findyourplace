"use client";

import { useState } from "react";
import { Send, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** One-click "resend results link" for a buyer — the admin recovery path. */
export function ResendResultsButton({ email, runId }: { email: string; runId: string }) {
  const [state, setState] = useState<"idle" | "busy" | "sent" | "error">("idle");
  const [msg, setMsg] = useState<string | null>(null);

  async function resend() {
    setState("busy");
    setMsg(null);
    try {
      const res = await fetch("/api/admin/resend-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, runId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Send failed");
      setState("sent");
    } catch (e) {
      setState("error");
      setMsg(e instanceof Error ? e.message : "Send failed");
    }
  }

  return (
    <span className="inline-flex items-center gap-2">
      <button
        onClick={resend}
        disabled={state === "busy" || state === "sent"}
        className={cn(
          "inline-flex min-h-8 items-center gap-1.5 rounded-full border border-border px-3 text-xs font-semibold transition-colors",
          "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          state === "sent" && "border-success/40 text-success",
          state === "error" && "border-destructive/40 text-destructive",
        )}
        title={`Email the results link to ${email}`}
      >
        {state === "busy" ? (
          <Loader2 className="size-3 animate-spin" />
        ) : state === "sent" ? (
          <Check className="size-3" />
        ) : (
          <Send className="size-3" />
        )}
        {state === "sent" ? "Sent" : "Resend link"}
      </button>
      {msg && <span className="text-xs text-destructive">{msg}</span>}
    </span>
  );
}
