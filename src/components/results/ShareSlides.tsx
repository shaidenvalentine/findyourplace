"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { FreeRun } from "@/lib/run";
import { Share2, Check, Loader2, Download } from "lucide-react";

/**
 * "Wrapped"-style share set — a swipeable deck of stunning 9:16 slides (identity, the
 * 61→94 gap, the tax flex, the place, a CTA). Sharing the SET (not one card) is what pulls
 * friends in. Uses the Web Share API with all images; falls back to downloading them.
 */
export function ShareSlides({ free, variant }: { free: FreeRun; variant: "teaser" | "reveal" }) {
  const runId = free.runId;
  // Decks designed for what people ACTUALLY share. The flagship is the Place DNA card:
  // an identity flex (radar fingerprint + archetype) PLUS a game for the viewer (the
  // redacted coordinates of the #1 place) — a share that starts conversations.
  // Post-unlock swaps in the place reveal; a soft CTA closes the deck.
  const slides = useMemo(() => {
    return variant === "reveal" ? ["dna", "place", "cta"] : ["dna", "place"];
  }, [variant]);

  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const text =
    variant === "reveal"
      ? `I'm ${free.personality.archetype} — and I just found my place. Where's yours?`
      : `I'm ${free.personality.archetype}. My #1 place on Earth scored ${free.topTease.score}/100 — guess where it is.`;
  const resultUrl = typeof window !== "undefined" ? `${window.location.origin}/results/${runId}` : "";

  async function fetchFiles(): Promise<File[]> {
    const files: File[] = [];
    for (const id of slides) {
      const res = await fetch(`/api/share/${runId}?slide=${id}`);
      const blob = await res.blob();
      files.push(new File([blob], `find-your-place-${id}.png`, { type: "image/png" }));
    }
    return files;
  }

  async function share() {
    setBusy(true);
    try {
      const files = await fetchFiles();
      const nav = navigator as Navigator & { canShare?: (d: unknown) => boolean };
      if (nav.share && nav.canShare?.({ files })) {
        await nav.share({ files, text, url: resultUrl });
      } else {
        for (const f of files) {
          const a = document.createElement("a");
          a.href = URL.createObjectURL(f);
          a.download = f.name;
          a.click();
          URL.revokeObjectURL(a.href);
          await new Promise((r) => setTimeout(r, 150));
        }
        try {
          await navigator.clipboard.writeText(resultUrl);
        } catch {
          /* ignore */
        }
      }
      setDone(true);
      setTimeout(() => setDone(false), 2500);
    } catch {
      /* cancelled */
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      {/* Swipeable preview */}
      <div className="-mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-1">
        {slides.map((id, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={id}
            src={`/api/share/${runId}?slide=${id}`}
            alt={`slide ${i + 1}`}
            loading="lazy"
            decoding="async"
            className="aspect-[9/16] w-32 shrink-0 snap-center rounded-lg border border-border object-cover"
          />
        ))}
      </div>
      <Button
        onClick={share}
        disabled={busy}
        variant={variant === "reveal" ? "gradient" : "outline"}
        size="lg"
        className="mt-3 w-full"
      >
        {busy ? (
          <Loader2 className="size-4 animate-spin" />
        ) : done ? (
          <Check className="size-4" />
        ) : navigatorHasShare() ? (
          <Share2 className="size-4" />
        ) : (
          <Download className="size-4" />
        )}
        {done ? "Shared!" : `Share my ${slides.length} slides`}
      </Button>
    </div>
  );
}

function navigatorHasShare(): boolean {
  return typeof navigator !== "undefined" && "share" in navigator;
}
