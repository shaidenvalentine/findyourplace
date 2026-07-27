import "server-only";
import { BREEDS, BREED_COUNT } from "@/data/breeds";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { Breed } from "@/lib/scoring";

/**
 * Content Studio — the admin's content machine for Instagram carousels + Meta ads.
 *
 * Two engines, one output shape:
 *  - DATA engine (always available): composes carousels straight from the breed
 *    dataset — real names, real trait scores. On-brand by construction: the scoring
 *    data IS the product, so "7 breeds that thrive in apartments" is both content
 *    and demo.
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
  /** For breeds: `country` carries the breed group (shape kept for the slide renderer). */
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
  "#findyourdog", "#dogbreeds", "#adoptdontshop", "#dogsofinstagram", "#puppylove",
  "#rescuedog", "#doglife", "#futuredogparent", "#whichbreed", "#shelterdog",
];

const CTA_LINE = "Take the 60-second quiz → findyourdog.app";

// ─────────────────────────────────────────────────────────────────────────────
// Data-driven angles — each turns a slice of the dataset into a ranked carousel.
// ─────────────────────────────────────────────────────────────────────────────

type Angle = {
  id: string;
  label: string;
  hook: { kicker: string; title: string; body: string };
  statLabel: string;
  stat: (b: Breed) => string;
  pick: () => Breed[];
  insight: string;
};

const byScore = (key: keyof Breed, filter?: (b: Breed) => boolean) => () =>
  [...BREEDS]
    .filter((b) => (filter ? filter(b) : true) && typeof b[key] === "number")
    .sort((a, b) => (b[key] as number) - (a[key] as number))
    .slice(0, 7);

export const ANGLES: Angle[] = [
  {
    id: "apartment-stars",
    label: "Best breeds for apartments",
    hook: {
      kicker: "small space, big love",
      title: "7 breeds that thrive in apartments",
      body: "No yard needed. Scored on real bark, energy, and space data — not vibes.",
    },
    statLabel: "apartment score",
    stat: (b) => `${b.apartment_friendly}/100`,
    pick: byScore("apartment_friendly", (b) => (b.barking_level ?? 100) <= 60),
    insight: "The wrong breed in the wrong home fails both of you. Fit is measurable — we measure it.",
  },
  {
    id: "first-time",
    label: "Breeds that forgive beginner mistakes",
    hook: {
      kicker: "first dog?",
      title: "The breeds built for first-time owners",
      body: "Forgiving, trainable, eager to meet you halfway. Start here, not with the hardest dog on Instagram.",
    },
    statLabel: "beginner-friendly",
    stat: (b) => `${b.novice_friendly}/100`,
    pick: byScore("novice_friendly"),
    insight: "Most 'bad dogs' are just mismatched dogs. The right first breed makes you a dog person for life.",
  },
  {
    id: "busy-people",
    label: "Dogs that handle your 9-to-5",
    hook: {
      kicker: "for full schedules",
      title: "Dogs that don't fall apart when you leave",
      body: "Separation anxiety is the #1 silent dealbreaker. These breeds genuinely cope with alone time.",
    },
    statLabel: "OK alone",
    stat: (b) => `${b.alone_tolerance}/100`,
    pick: byScore("alone_tolerance", (b) => (b.exercise_needs ?? 100) <= 65),
    insight: "A dog's needs don't pause for your job. Match the dog to the life you actually live.",
  },
  {
    id: "hypoallergenic",
    label: "Allergy-friendly breeds that barely shed",
    hook: {
      kicker: "achoo-proof",
      title: "Allergic? These breeds still want you.",
      body: "Hypoallergenic coats, near-zero shedding. Sneezing is not a reason to stay dogless.",
    },
    statLabel: "shedding",
    stat: (b) => `${b.shedding_level}/100`,
    pick: () =>
      [...BREEDS]
        .filter((b) => b.hypoallergenic && typeof b.shedding_level === "number")
        .sort((a, b) => (a.shedding_level ?? 99) - (b.shedding_level ?? 99))
        .slice(0, 7),
    insight: "There's a coat type for almost every immune system. The right match exists — find it before you settle.",
  },
  {
    id: "family-dogs",
    label: "The great family dogs",
    hook: {
      kicker: "kid-tested",
      title: "The breeds that adore your kids",
      body: "Patient, sturdy, gentle — scored on real kid-friendliness data, not marketing.",
    },
    statLabel: "kid-friendly",
    stat: (b) => `${b.kid_friendly}/100`,
    pick: byScore("kid_friendly", (b) => (b.affection_level ?? 0) >= 60),
    insight: "A childhood dog shapes a whole life. Pick the one that was built for the chaos of yours.",
  },
  {
    id: "shelter-gems",
    label: "Breeds you can adopt this weekend",
    hook: {
      kicker: "adopt, don't shop",
      title: "These dogs are in a shelter near you right now",
      body: "The most common shelter breeds and mixes — amazing dogs, waiting, at a fraction of breeder prices.",
    },
    statLabel: "shelter availability",
    stat: (b) => `${b.shelter_availability}/100`,
    pick: byScore("shelter_availability"),
    insight: "Your perfect dog might already be waiting in a kennel 15 minutes away. Look there first.",
  },
  {
    id: "budget-friendly",
    label: "Great dogs that don't break the bank",
    hook: {
      kicker: "real cost data",
      title: "The best dogs under $120/month",
      body: "Food, grooming, insurance, routine vet — the honest monthly number nobody tells you before you commit.",
    },
    statLabel: "monthly cost",
    stat: (b) => `$${b.monthly_cost_usd}/mo`,
    pick: () =>
      [...BREEDS]
        .filter((b) => typeof b.monthly_cost_usd === "number" && (b.monthly_cost_usd ?? 999) <= 120 && (b.novice_friendly ?? 0) >= 55)
        .sort((a, b) => (b.novice_friendly ?? 0) - (a.novice_friendly ?? 0))
        .slice(0, 7),
    insight: "A dog is a 12-year budget line. Know the number before the number knows you.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Deterministic generators (no LLM required).
// ─────────────────────────────────────────────────────────────────────────────

function angleToCarousel(angle: Angle): CarouselPayload {
  const breeds = angle.pick();
  const slides: Slide[] = [
    { kind: "hook", kicker: angle.hook.kicker, title: angle.hook.title, body: angle.hook.body },
    ...breeds.slice(0, 6).map((b, i) => ({
      kind: "list" as const,
      rank: i + 1,
      title: b.name,
      body: (b.vibe_summary ?? b.description ?? "").split(" — ")[0].slice(0, 110),
      place: { name: b.name, country: `${b.group} group`, stat: angle.stat(b), statLabel: angle.statLabel },
    })),
    { kind: "insight", kicker: "the point", title: angle.insight },
    {
      kind: "cta",
      kicker: "your turn",
      title: "Your dog is out there. Find your breed.",
      body: `We score you against ${BREED_COUNT} breeds on ${"10 dimensions"} of your real life and show you your #1. ${CTA_LINE}`,
    },
  ];
  const caption = [
    angle.hook.title,
    "",
    angle.hook.body,
    "",
    breeds.slice(0, 6).map((b, i) => `${i + 1}. ${b.name} — ${angle.stat(b)} ${angle.statLabel}`).join("\n"),
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
    { kind: "hook", kicker: "find your dog", title: "You weren't built for every dog.", body: "But one breed was built for you." },
    { kind: "insight", kicker: "the problem", title: "Most people choose a breed by accident.", body: "Saw it in a movie. Neighbor had one. It was cute on Instagram. Then real life starts." },
    { kind: "insight", kicker: "the cost", title: "The wrong dog taxes everything.", body: "Your schedule, your apartment, your sleep, your budget — and the dog pays the biggest price." },
    { kind: "insight", kicker: "the fix", title: `We scored ${BREED_COUNT} breeds on 10 dimensions of you.`, body: "Space, schedule, energy, kids, allergies, budget — matched to how you actually live." },
    { kind: "cta", kicker: "your turn", title: "60 seconds to your #1 breed.", body: CTA_LINE },
  ];
  return {
    slides,
    caption: `You weren't built for every dog — but one breed was built for you.\n\nWe score you against ${BREED_COUNT} breeds on 10 dimensions and reveal your #1.\n\n${CTA_LINE}`,
    hashtags: HASHTAGS.slice(0, 8),
  };
}

function fallbackAd(topic: string): AdPayload {
  return {
    variants: [
      {
        angle: "Identity",
        primaryText:
          "The dog you choose shapes the next 12 years of your life — your mornings, your apartment, your weekends. Most people pick a breed on looks and hope. We built a 60-second quiz that scores you against 170 dog breeds and shows you the one that actually fits your life.",
        headline: "Find the breed that fits you",
        description: "60-second quiz · 170 breeds scored · your #1 revealed",
      },
      {
        angle: "Data / proof",
        primaryText:
          `We scored ${BREED_COUNT} breeds on 10 dimensions — energy, space, schedule, kids, allergies, budget, grooming. Answer a few questions and see your top match, plus an honest score for the breed you think you want. The result feels like being read by someone who knows you.`,
        headline: "170 breeds. One is yours.",
        description: "Take the quiz — see your dream breed's honest score",
      },
      {
        angle: `Curiosity${topic && topic !== "default" ? ` · ${topic}` : ""}`,
        primaryText:
          "There's a dog that fits your apartment, your work hours, and your energy — and it's probably not the breed you've been picturing. It has a name. Our matching engine found it for thousands of people — many ended up adopting theirs from a shelter nearby.",
        headline: "Your #1 breed has a name",
        description: "Find it in 60 seconds",
      },
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// LLM engine — brand-voiced generation, JSON-constrained, data-grounded.
// ─────────────────────────────────────────────────────────────────────────────

const BRAND_VOICE = `You write for "Find Your Dog" (findyourdog.app) — a quiz that scores people against ${BREED_COUNT} dog breeds across 10 dimensions of their real life and reveals their #1 match behind a one-time unlock, then points them at shelter adoption first.
Voice: confident, specific, warm but never saccharine; second person; short lines; zero corporate speak, zero emoji spam (max 1 per caption, none on slides). The audience is 20–35, mobile, found us through reels/ads about choosing the right dog.
Core narrative: the dog you choose shapes the next decade; most people choose on looks; the fit between you and a breed is measurable; your #1 exists — and it might be in a shelter near you.`;

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
  const scored = BREEDS.map((b) => {
    const hay = `${b.name} ${b.group} ${b.size} ${(b.tags ?? []).join(" ")} ${b.vibe_summary ?? ""}`.toLowerCase();
    const score = t.reduce((s, w) => s + (hay.includes(w) ? 1 : 0), 0);
    return { b, score };
  })
    .sort((a, b) => b.score - a.score)
    .slice(0, 24)
    .map(({ b }) =>
      `${b.name} (${b.group}, ${b.size}) | energy:${b.energy_level} apartment:${b.apartment_friendly} beginner:${b.novice_friendly} kids:${b.kid_friendly} alone:${b.alone_tolerance} shed:${b.shedding_level} bark:${b.barking_level} cost:$${b.monthly_cost_usd}/mo shelter:${b.shelter_availability} | ${(b.vibe_summary ?? "").slice(0, 90)}`,
    );
  return scored.join("\n");
}

async function llmCarousel(topic: string): Promise<CarouselPayload | null> {
  const raw = await callClaude(
    BRAND_VOICE +
      `\nReturn ONLY JSON matching: {"slides":[{"kind":"hook|list|insight|cta","kicker":string,"title":string,"body":string,"rank":number?,"place":{"name":string,"country":string,"stat":string,"statLabel":string}?}],"caption":string,"hashtags":string[]}.
Rules: 6–8 slides. Slide 1 kind "hook" with a scroll-stopping title under 60 chars. Middle slides: either "list" slides ranking REAL breeds from the provided dataset (use their real stats — never invent numbers; put the breed group in the "country" field) or "insight" slides advancing the narrative. Last slide kind "cta" pointing to the 60-second quiz at findyourdog.app. Caption: hook line, line breaks, the list if any, one insight, then "${CTA_LINE}". 6–9 hashtags.`,
    `Topic for this carousel: "${topic}".\n\nDataset (real breeds + real stats you may cite):\n${datasetContext(topic)}`,
  );
  const parsed = parseJson<CarouselPayload>(raw);
  if (!parsed || !Array.isArray(parsed.slides) || parsed.slides.length < 3 || !parsed.caption) return null;
  return { slides: parsed.slides.slice(0, 8), caption: parsed.caption, hashtags: (parsed.hashtags ?? HASHTAGS).slice(0, 10) };
}

async function llmAd(topic: string): Promise<AdPayload | null> {
  const raw = await callClaude(
    BRAND_VOICE +
      `\nReturn ONLY JSON matching: {"variants":[{"angle":string,"primaryText":string,"headline":string,"description":string}]}.
Rules: exactly 4 variants, each a genuinely different psychological angle (e.g. identity, data/proof, loss-aversion, curiosity, adopt-first). primaryText 40–90 words, mobile-first, first line must stop the scroll. headline ≤ 38 chars. description ≤ 60 chars. Never invent statistics; you may cite the real dataset numbers provided.`,
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
