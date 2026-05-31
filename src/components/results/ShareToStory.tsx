"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Check, Loader2 } from "lucide-react";

/**
 * Frictionless "share to story" — the growth loop. Uses the Web Share API with the
 * generated card image when available (mobile), and falls back to downloading the
 * card + copying the result link on desktop.
 */
export function ShareToStory({ runId, variant }: { runId: string; variant: "teaser" | "reveal" }) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const resultUrl = typeof window !== "undefined" ? `${window.location.origin}/results/${runId}` : "";
  const cardUrl = `/api/share/${runId}?format=story`;
  const text =
    variant === "reveal"
      ? "I found the place on Earth that actually fits me 🌍"
      : "I found out where I should actually be living 👀";

  async function share() {
    setBusy(true);
    try {
      const res = await fetch(cardUrl);
      const blob = await res.blob();
      const file = new File([blob], "find-your-place.png", { type: "image/png" });

      const nav = navigator as Navigator & { canShare?: (d: unknown) => boolean };
      if (nav.share && nav.canShare?.({ files: [file] })) {
        await nav.share({ files: [file], text, url: resultUrl });
      } else if (nav.share) {
        await nav.share({ title: "Find Your Place", text, url: resultUrl });
      } else {
        // Desktop fallback: download the card + copy the link.
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "find-your-place.png";
        a.click();
        URL.revokeObjectURL(a.href);
        try {
          await navigator.clipboard.writeText(resultUrl);
        } catch {
          /* ignore */
        }
      }
      setDone(true);
      setTimeout(() => setDone(false), 2500);
    } catch {
      /* user cancelled or blocked */
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button
      onClick={share}
      disabled={busy}
      variant={variant === "reveal" ? "gradient" : "outline"}
      size="lg"
      className="w-full"
    >
      {busy ? (
        <Loader2 className="size-4 animate-spin" />
      ) : done ? (
        <Check className="size-4" />
      ) : (
        <Share2 className="size-4" />
      )}
      {done ? "Shared!" : variant === "reveal" ? "Share my place" : "Share to your story"}
    </Button>
  );
}
