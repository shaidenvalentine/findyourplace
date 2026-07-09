import "server-only";
import { LOCATIONS, LOCATION_COUNT } from "@/data/locations";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { Location } from "@/lib/scoring";

/**
 * Content Studio — the admin's content machine for Instagram carousels + Meta ads.
 *
 * Two engines, one output shape:
 *  - DATA engine (always available): composes carousels straight from the 250-place
 *    dataset — real names, real scores. On-brand by construction: the scoring data IS
 *    the product, so "7 places where $2k/mo lives like $6k" is both content and demo.
 *  - LLM engine (when ANTHROPIC_API_KEY is set): writes hooks/captions/ad copy in the
 *    brand voice, constrained to JSON, with the data engine as hard fallback so the
 *    studio never errors into a blank screen.
 *
 * Output is structured JSON that the /admin/content page renders as branded 4:5 slides
 * (downloadable as PNGs) — no external image service, everything in the site's system.
 */

export type Slide = {
  kind: "hook" | "list" | "insight" | "cta";
  kicker?: string;
  title: string;
  body?: string;
  rank?: number;
  place?: { name: string; country: string; stat: string; statLabel: string };
};

export type CarouselPayload = {
  slides: Slide[];
  caption: string;
  hashtags: string[];
};

export type AdVariant = {
  angle: string;
  primaryText: string;
  headline: string;
  description: string;
};

export type AdPayload = { variants: AdVariant[] };

export type ContentItem = {
  id: string;
  kind: "carousel" | "ad";
  topic: string;
  payload: CarouselPayload | AdPayload;
  createdAt: string;
};

const HASHTAGS = [
  "#findyourplace", "#wheretolive", "#relocation", "#digitalnomad", "#movingabroad",
  "#expatlife", "#costofliving", "#travel2026", "#lifedesign", "#geoarbitrage",
];

const CTA_LINE = "Take the 60-second quiz → findyourplace.app";

// ─────────────────────────────────────────────────────────────────────────────
// Data-driven angles — each turns a slice of the dataset into a ranked carousel.
// ─────────────────────────────────────────────────────────────────────────────

type Angle = {
  id: string;
  label: string;
  hook: { kicker: string; title: string; body: string };
  statLabel: string;
  stat: (l: Location) => string;
  pick: () => Location[];
  insight: string;
};

const byScore = (key: keyof Location, filter?: (l: Location) => boolean) => () =>
  [...LOCATIONS]
    .filter((l) => (filter ? filter(l) : true) && typeof l[key] === "number")
    .sort((a, b) => (b[key] as number) - (a[key] as number))
    .slice(0, 7);

export const ANGLES: Angle[] = [
  {
    id: "cheap-paradise",
    label: "Beach towns your budget already affords",
    hook: {
      kicker: "cost of living",
      title: "7 beach towns where $2k/mo lives like $6k",
      body: "Real places, scored on real cost data. Your money is worth 3x somewhere.",
    },
    statLabel: "affordability",
    stat: (l) => `${l.cost_of_living_score}/100`,
    pick: byScore("cost_of_living_score", (l) => (l.beach_access_score ?? 0) >= 60),
    insight: "The city you're in silently decides your savings rate, your stress, your dating pool — everything.",
  },
  {
    id: "tax-friendly",
    label: "Places that barely tax you",
    hook: {
      kicker: "keep what you earn",
      title: "The places that tax you least",
      body: "Same income. Wildly different take-home. Tax residency is a choice most people never realize they have.",
    },
    statLabel: "income tax",
    stat: (l) => `${l.personal_income_tax_rate ?? 0}%`,
    pick: () =>
      [...LOCATIONS]
        .filter((l) => typeof l.personal_income_tax_rate === "number" && (l.safety_score ?? 0) >= 55)
        .sort((a, b) => (a.personal_income_tax_rate ?? 99) - (b.personal_income_tax_rate ?? 99))
        .slice(0, 7),
    insight: "Moving well can be worth more than a raise — and it compounds every single year.",
  },
  {
    id: "sunshine",
    label: "The sunniest places on Earth to live",
    hook: {
      kicker: "climate",
      title: "320+ days of sun. Every year.",
      body: "Seasonal sadness is optional. These places basically don't have winter.",
    },
    statLabel: "sunny days/yr",
    stat: (l) => `${l.sunshine_days ?? 0}`,
    pick: byScore("sunshine_days"),
    insight: "Sunlight is the cheapest antidepressant ever invented. Some places just have more of it.",
  },
  {
    id: "nomad-capitals",
    label: "Digital nomad capitals with real community",
    hook: {
      kicker: "community",
      title: "Where you won't be the only one",
      body: "The places where remote workers actually build a life — fast wifi, deep community, easy visas.",
    },
    statLabel: "community",
    stat: (l) => `${l.community_score ?? 0}/100`,
    pick: byScore("community_score", (l) => (l.tags ?? []).includes("digital-nomad") && (l.internet_quality_score ?? 0) >= 60),
    insight: "Loneliness kills more relocations than money ever will. Pick a place with your people already in it.",
  },
  {
    id: "safe-and-cheap",
    label: "Safe AND affordable (yes, both exist)",
    hook: {
      kicker: "the unicorns",
      title: "Safe and cheap. Pick both.",
      body: "“You get what you pay for” is a lie in geography. These places break the tradeoff.",
    },
    statLabel: "safety",
    stat: (l) => `${l.safety_score}/100`,
    pick: byScore("safety_score", (l) => (l.cost_of_living_score ?? 0) >= 65),
    insight: "The gap between where you are and where you fit is measurable. We measure it.",
  },
  {
    id: "nightlife",
    label: "Cities that never bore you",
    hook: {
      kicker: "energy",
      title: "Cities that never run out of nights",
      body: "For the ones whose battery charges in a crowd.",
    },
    statLabel: "nightlife",
    stat: (l) => `${l.nightlife_score ?? 0}/100`,
    pick: byScore("nightlife_score"),
    insight: "Fit isn't one-size. A perfect city for someone else can be a slow leak on your life.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Deterministic generators (no LLM required).
// ─────────────────────────────────────────────────────────────────────────────

function angleToCarousel(angle: Angle): CarouselPayload {
  const places = angle.pick();
  const slides: Slide[] = [
    { kind: "hook", kicker: angle.hook.kicker, title: angle.hook.title, body: angle.hook.body },
    ...places.slice(0, 6).map((l, i) => ({
      kind: "list" as const,
      rank: i + 1,
      title: l.name,
      body: (l.vibe_summary ?? l.description ?? "").split(" — ")[0].slice(0, 110),
      place: { name: l.name, country: l.country, stat: angle.stat(l), statLabel: angle.statLabel },
    })),
    { kind: "insight", kicker: "the point", title: angle.insight },
    {
      kind: "cta",
      kicker: "your turn",
      title: "Your place is on this planet. Find it.",
      body: `We score you against ${LOCATION_COUNT} places on ${"10 dimensions"} and show you your #1. ${CTA_LINE}`,
    },
  ];
  const caption = [
    angle.hook.title,
    "",
    angle.hook.body,
    "",
    places.slice(0, 6).map((l, i) => `${i + 1}. ${l.name}, ${l.country} — ${angle.stat(l)} ${angle.statLabel}`).join("\n"),
    "",
    `${angle.insight}`,
    "",
    CTA_LINE,
  ].join("\n");
  return { slides, caption, hashtags: HASHTAGS.slice(0, 8) };
}

function fallbackCarousel(topic: string): CarouselPayload {
  // Freeform topic without an LLM: match an angle by keyword, else the brand narrative.
  const t = topic.toLowerCase();
  const matched = ANGLES.find((a) => a.id.includes(t) || a.label.toLowerCase().includes(t) || t.includes(a.hook.kicker));
  if (matched) return angleToCarousel(matched);
  const slides: Slide[] = [
    { kind: "hook", kicker: "find your place", title: "You weren't built for everywhere.", body: "But somewhere on Earth was built for you." },
    { kind: "insight", kicker: "the problem", title: "Most people choose where they live by accident.", body: "Born there. Studied there. Followed a job. Stayed." },
    { kind: "insight", kicker: "the cost", title: "The wrong city taxes everything.", body: "Your savings rate, your friendships, your health, your odds of meeting someone." },
    { kind: "insight", kicker: "the fix", title: `We scored ${LOCATION_COUNT} places on 10 dimensions of you.`, body: "Climate, money, community, pace, risk — matched to how you actually live." },
    { kind: "cta", kicker: "your turn", title: "60 seconds to your #1 place.", body: CTA_LINE },
  ];
  return {
    slides,
    caption: `You weren't built for everywhere — but somewhere was built for you.\n\nWe score you against ${LOCATION_COUNT} places on 10 dimensions and reveal your #1.\n\n${CTA_LINE}`,
    hashtags: HASHTAGS.slice(0, 8),
  };
}

function fallbackAd(topic: string): AdPayload {
  return {
    variants: [
      {
        angle: "Identity",
        primaryText:
          "The city you live in quietly decides who you become — your savings rate, your friendships, your energy. Most people never chose theirs. We built a 60-second quiz that scores you against 250 of the best places on Earth and shows you the one that actually fits.",
        headline: "Find the place that fits you",
        description: "60-second quiz · 250 places scored · your #1 revealed",
      },
      {
        angle: "Data / proof",
        primaryText:
          `We scored ${LOCATION_COUNT} places on 10 dimensions — cost, climate, community, tax, safety, pace. Answer a few questions and see your top match, plus how well your current city really fits you. The result feels like being read by someone who knows you.`,
        headline: "250 places. One is yours.",
        description: "Take the quiz — see your current city's honest score",
      },
      {
        angle: `Curiosity${topic && topic !== "default" ? ` · ${topic}` : ""}`,
        primaryText:
          "There's a city where your rent is halved, your winters are warm, and your people already live. It has a name. Our matching engine found it for thousands of people — most had never considered their #1 before seeing it.",
        headline: "Your #1 place has a name",
        description: "Find it in 60 seconds",
      },
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// LLM engine — brand-voiced generation, JSON-constrained, data-grounded.
// ─────────────────────────────────────────────────────────────────────────────

const BRAND_VOICE = `You write for "Find Your Place" (findyourplace.app) — a quiz that scores people against ${LOCATION_COUNT} of the best places on Earth across 10 dimensions and reveals their #1 match behind a one-time unlock.
Voice: confident, specific, a little cinematic; second person; short lines; zero corporate speak, zero emoji spam (max 1 per caption, none on slides). The audience is 20–35, mobile, found us through reels/ads about choosing where to live.
Core narrative: where you live decides who you become; most people never chose it; the fit between you and a place is measurable; your #1 exists.`;

async function callClaude(system: string, user: string, maxTokens = 2000): Promise<string | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 25000);
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001",
        max_tokens: maxTokens,
        system,
        messages: [{ role: "user", content: user }],
      }),
      signal: ctrl.signal,
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.content?.[0]?.text ?? null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function parseJson<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw.replace(/```json\n?|\n?```/g, "").trim()) as T;
  } catch {
    return null;
  }
}

/** A compact, LLM-readable slice of the dataset relevant to a topic (keyword scored). */
function datasetContext(topic: string): string {
  const t = topic.toLowerCase().split(/\s+/);
  const scored = LOCATIONS.map((l) => {
    const hay = `${l.name} ${l.country} ${l.continent} ${(l.tags ?? []).join(" ")} ${l.vibe_summary ?? ""}`.toLowerCase();
    const score = t.reduce((s, w) => s + (hay.includes(w) ? 1 : 0), 0);
    return { l, score };
  })
    .sort((a, b) => b.score - a.score)
    .slice(0, 24)
    .map(({ l }) =>
      `${l.name}, ${l.country} | cost:${l.cost_of_living_score} safety:${l.safety_score} sun:${l.sunshine_days}d tax:${l.personal_income_tax_rate}% nightlife:${l.nightlife_score} community:${l.community_score} beach:${l.beach_access_score} | ${(l.vibe_summary ?? "").slice(0, 90)}`,
    );
  return scored.join("\n");
}

async function llmCarousel(topic: string): Promise<CarouselPayload | null> {
  const raw = await callClaude(
    BRAND_VOICE +
      `\nReturn ONLY JSON matching: {"slides":[{"kind":"hook|list|insight|cta","kicker":string,"title":string,"body":string,"rank":number?,"place":{"name":string,"country":string,"stat":string,"statLabel":string}?}],"caption":string,"hashtags":string[]}.
Rules: 6–8 slides. Slide 1 kind "hook" with a scroll-stopping title under 60 chars. Middle slides: either "list" slides ranking REAL places from the provided dataset (use their real stats — never invent numbers) or "insight" slides advancing the narrative. Last slide kind "cta" pointing to the 60-second quiz at findyourplace.app. Caption: hook line, line breaks, the list if any, one insight, then "${CTA_LINE}". 6–9 hashtags.`,
    `Topic for this carousel: "${topic}".\n\nDataset (real places + real stats you may cite):\n${datasetContext(topic)}`,
  );
  const parsed = parseJson<CarouselPayload>(raw);
  if (!parsed || !Array.isArray(parsed.slides) || parsed.slides.length < 3 || !parsed.caption) return null;
  return { slides: parsed.slides.slice(0, 8), caption: parsed.caption, hashtags: (parsed.hashtags ?? HASHTAGS).slice(0, 10) };
}

async function llmAd(topic: string): Promise<AdPayload | null> {
  const raw = await callClaude(
    BRAND_VOICE +
      `\nReturn ONLY JSON matching: {"variants":[{"angle":string,"primaryText":string,"headline":string,"description":string}]}.
Rules: exactly 4 variants, each a genuinely different psychological angle (e.g. identity, data/proof, loss-aversion, curiosity, founder-story). primaryText 40–90 words, mobile-first, first line must stop the scroll. headline ≤ 38 chars. description ≤ 60 chars. Never invent statistics; you may cite the real dataset numbers provided.`,
    `Topic/angle emphasis: "${topic}".\n\nDataset context (real numbers you may cite):\n${datasetContext(topic)}`,
  );
  const parsed = parseJson<AdPayload>(raw);
  if (!parsed || !Array.isArray(parsed.variants) || parsed.variants.length < 2) return null;
  return { variants: parsed.variants.slice(0, 4) };
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API — generate + persist (Supabase when configured, memory otherwise).
// ─────────────────────────────────────────────────────────────────────────────

const g = globalThis as unknown as { __fypContent?: ContentItem[] };
const mem: ContentItem[] = (g.__fypContent ??= []);

export async function generateContent(kind: "carousel" | "ad", topic: string): Promise<ContentItem> {
  const cleanTopic = topic.trim().slice(0, 140) || "default";
  const payload =
    kind === "carousel"
      ? (await llmCarousel(cleanTopic)) ?? fallbackCarousel(cleanTopic)
      : (await llmAd(cleanTopic)) ?? fallbackAd(cleanTopic);

  const item: ContentItem = {
    id: crypto.randomUUID(),
    kind,
    topic: cleanTopic,
    payload,
    createdAt: new Date().toISOString(),
  };

  const db = getSupabaseAdmin();
  if (db) {
    const { error } = await db.from("content_items").insert({ id: item.id, kind, topic: cleanTopic, payload });
    if (error) console.error("[contentStudio] persist failed:", error.message);
  }
  mem.unshift(item);
  if (mem.length > 50) mem.length = 50;
  return item;
}

export async function listContent(limit = 30): Promise<ContentItem[]> {
  const db = getSupabaseAdmin();
  if (db) {
    const { data } = await db
      .from("content_items")
      .select("id, kind, topic, payload, created_at")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (data) {
      return data.map((r) => ({
        id: r.id as string,
        kind: r.kind as "carousel" | "ad",
        topic: r.topic as string,
        payload: r.payload as CarouselPayload | AdPayload,
        createdAt: r.created_at as string,
      }));
    }
  }
  return mem.slice(0, limit);
}

export async function deleteContent(id: string): Promise<void> {
  const db = getSupabaseAdmin();
  if (db) await db.from("content_items").delete().eq("id", id);
  const i = mem.findIndex((m) => m.id === id);
  if (i >= 0) mem.splice(i, 1);
}

export function suggestedAngles(): { id: string; label: string }[] {
  return ANGLES.map((a) => ({ id: a.id, label: a.label }));
}

export function isLlmAvailable(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}
