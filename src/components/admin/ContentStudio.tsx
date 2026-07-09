"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { CarouselPayload, AdPayload, ContentItem, Slide } from "@/lib/admin/contentStudio";
import { Sparkles, Loader2, Copy, Check, Download, Trash2, Images, Megaphone } from "lucide-react";

/**
 * Content Studio client — generate, preview, copy, download.
 *
 * Slides are rendered as real DOM at a fixed 270×337.5 design size (4:5) and exported
 * at pixelRatio 4 → 1080×1350 PNGs via html-to-image. Everything is styled with the
 * site's own tokens so the content IS the brand.
 */

type Kind = "carousel" | "ad";

export function ContentStudio() {
  const [kind, setKind] = useState<Kind>("carousel");
  const [topic, setTopic] = useState("");
  const [angles, setAngles] = useState<{ id: string; label: string }[]>([]);
  const [llm, setLlm] = useState(false);
  const [items, setItems] = useState<ContentItem[]>([]);
  const [current, setCurrent] = useState<ContentItem | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/content");
      if (!res.ok) return;
      const data = await res.json();
      setItems(data.items ?? []);
      setAngles(data.angles ?? []);
      setLlm(Boolean(data.llm));
      if (!current && data.items?.length) setCurrent(data.items[0]);
    } catch {
      /* list is non-critical */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Fetch-on-mount + revalidate; load() owns all state writes (same pattern as ResultsView).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  async function generate(t?: string) {
    const useTopic = (t ?? topic).trim();
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, topic: useTopic }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setCurrent(data.item);
      setItems((prev) => [data.item, ...prev]);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (current?.id === id) setCurrent(null);
    await fetch(`/api/admin/content?id=${id}`, { method: "DELETE" }).catch(() => {});
  }

  return (
    <div className="mt-6">
      {/* Kind toggle + topic + generate */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-1 self-start rounded-lg border border-border p-1">
          {(
            [
              { k: "carousel" as const, label: "Carousels", icon: Images },
              { k: "ad" as const, label: "Ads", icon: Megaphone },
            ]
          ).map(({ k, label, icon: Icon }) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                kind === k ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted",
              )}
            >
              <Icon className="size-4" /> {label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={
              kind === "carousel"
                ? "Topic or angle — e.g. 'best places for surfers on a budget'…"
                : "Ad emphasis — e.g. 'cost of living', 'founder story', 'tax savings'…"
            }
            className="sm:max-w-md"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !busy) generate();
            }}
          />
          <Button onClick={() => generate()} disabled={busy} variant="gradient" className="shrink-0">
            {busy ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            {busy ? "Generating…" : "Generate"}
          </Button>
        </div>

        {kind === "carousel" && angles.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {angles.map((a) => (
              <button
                key={a.id}
                onClick={() => {
                  setTopic(a.label);
                  generate(a.label);
                }}
                disabled={busy}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
              >
                {a.label}
              </button>
            ))}
          </div>
        )}

        {!llm && (
          <p className="text-xs text-muted-foreground">
            Running on the data engine (real dataset rankings). Add <code className="rounded bg-muted px-1">ANTHROPIC_API_KEY</code>{" "}
            for AI-written hooks, captions and ad variants on any freeform topic.
          </p>
        )}
        {err && <p className="text-sm text-destructive">{err}</p>}
      </div>

      {/* Preview */}
      {current && (
        <div className="mt-8">
          {current.kind === "carousel" ? (
            <CarouselPreview item={current} payload={current.payload as CarouselPayload} />
          ) : (
            <AdPreview payload={current.payload as AdPayload} />
          )}
        </div>
      )}

      {/* History */}
      {items.length > 0 && (
        <div className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">History</h2>
          <div className="mt-3 flex flex-col">
            {items.map((i) => (
              <div key={i.id} className="flex items-center gap-3 border-b border-border py-2.5 text-sm last:border-0">
                <Badge variant={i.kind === "carousel" ? "primary" : "outline"}>{i.kind}</Badge>
                <button
                  onClick={() => setCurrent(i)}
                  className={cn(
                    "min-w-0 flex-1 truncate text-left hover:underline focus-visible:outline-none focus-visible:underline",
                    current?.id === i.id && "font-semibold",
                  )}
                >
                  {i.topic === "default" ? "Brand narrative" : i.topic}
                </button>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {new Date(i.createdAt).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                </span>
                <button
                  onClick={() => remove(i.id)}
                  aria-label="Delete"
                  className="shrink-0 rounded p-1 text-muted-foreground hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Carousel preview + PNG export
// ─────────────────────────────────────────────────────────────────────────────

function CarouselPreview({ item, payload }: { item: ContentItem; payload: CarouselPayload }) {
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  async function copyCaption() {
    const text = `${payload.caption}\n\n${payload.hashtags.join(" ")}`;
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  async function downloadAll() {
    setDownloading(true);
    try {
      const { toPng } = await import("html-to-image");
      for (let i = 0; i < payload.slides.length; i++) {
        const node = slideRefs.current[i];
        if (!node) continue;
        // 270px design → 1080px export.
        const dataUrl = await toPng(node, { pixelRatio: 4, cacheBust: true });
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `fyp-${item.id.slice(0, 6)}-slide-${i + 1}.png`;
        a.click();
        await new Promise((r) => setTimeout(r, 250));
      }
    } catch {
      /* per-slide failures are visible by absence */
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Button size="sm" variant="outline" onClick={copyCaption}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} {copied ? "Copied" : "Copy caption"}
        </Button>
        <Button size="sm" variant="outline" onClick={downloadAll} disabled={downloading}>
          {downloading ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
          {downloading ? "Exporting…" : `Download ${payload.slides.length} slides (1080×1350)`}
        </Button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-3">
        {payload.slides.map((s, i) => (
          <div
            key={i}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="shrink-0"
          >
            <SlideCard slide={s} index={i} total={payload.slides.length} />
          </div>
        ))}
      </div>

      <details className="mt-3">
        <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
          Caption preview
        </summary>
        <pre className="mt-2 whitespace-pre-wrap rounded-xl border border-border bg-surface/50 p-4 text-sm text-muted-foreground">
          {payload.caption}
          {"\n\n"}
          {payload.hashtags.join(" ")}
        </pre>
      </details>
    </div>
  );
}

/** One 4:5 slide at 270×337.5 design size — exported at 4x for 1080×1350. */
function SlideCard({ slide, index, total }: { slide: Slide; index: number; total: number }) {
  return (
    <div
      className="relative flex h-[338px] w-[270px] flex-col overflow-hidden p-5 text-white"
      style={{
        background:
          "radial-gradient(70% 60% at 75% 15%, hsl(38 70% 62% / 0.45), transparent 60%), radial-gradient(80% 80% at 15% 95%, hsl(186 46% 28% / 0.6), transparent 65%), linear-gradient(150deg, hsl(188 26% 18%), hsl(210 30% 12%) 55%, hsl(250 22% 14%))",
      }}
    >
      {/* top hairline sheen */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_40%_at_30%_0%,hsl(0_0%_100%/0.08),transparent_60%)]" />

      <div className="relative flex-1">
        {slide.kicker && (
          <div className="mb-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-accent">{slide.kicker}</div>
        )}

        {slide.kind === "list" && slide.place ? (
          <>
            <div className="text-[44px] font-light leading-none text-white/25">{slide.rank ?? index}</div>
            <div className="mt-2 text-[26px] font-light leading-[1.05] tracking-tight">{slide.title}</div>
            <div className="mt-1 text-[12px] text-white/60">{slide.place.country}</div>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 backdrop-blur-sm">
              <span className="text-[13px] font-semibold text-accent">{slide.place.stat}</span>
              <span className="text-[9px] uppercase tracking-wider text-white/60">{slide.place.statLabel}</span>
            </div>
            {slide.body && <p className="mt-3 text-[11px] leading-relaxed text-white/70">{slide.body}</p>}
          </>
        ) : (
          <>
            <div className={cn("font-light tracking-tight", slide.kind === "hook" ? "text-[30px] leading-[1.04]" : "text-[24px] leading-[1.1]")}>
              {slide.title}
            </div>
            {slide.body && <p className="mt-3 text-[12px] leading-relaxed text-white/70">{slide.body}</p>}
          </>
        )}
      </div>

      {/* footer brand strip */}
      <div className="relative flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-tight text-white/80">findyourplace.app</span>
        <span className="flex items-center gap-1">
          {Array.from({ length: total }).map((_, d) => (
            <span key={d} className={cn("size-1 rounded-full", d === index ? "bg-accent" : "bg-white/25")} />
          ))}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Ad preview
// ─────────────────────────────────────────────────────────────────────────────

function AdPreview({ payload }: { payload: AdPayload }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {payload.variants.map((v, i) => (
        <AdVariantCard key={i} v={v} />
      ))}
    </div>
  );
}

function AdVariantCard({ v }: { v: AdPayload["variants"][number] }) {
  const [copied, setCopied] = useState(false);
  async function copyAll() {
    await navigator.clipboard
      .writeText(`PRIMARY TEXT:\n${v.primaryText}\n\nHEADLINE:\n${v.headline}\n\nDESCRIPTION:\n${v.description}`)
      .catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }
  return (
    <div className="rounded-2xl glass p-5">
      <div className="flex items-center justify-between gap-2">
        <Badge variant="primary">{v.angle}</Badge>
        <button
          onClick={copyAll}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-semibold hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />} {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="mt-3 text-sm leading-relaxed">{v.primaryText}</p>
      <div className="mt-4 rounded-xl border border-border bg-surface/60 p-3">
        <div className="text-sm font-bold">{v.headline}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{v.description}</div>
        <div className="mt-2 inline-block rounded-md bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          Take the quiz
        </div>
      </div>
    </div>
  );
}
