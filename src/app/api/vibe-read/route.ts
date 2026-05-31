import { NextRequest, NextResponse } from "next/server";
import { buildReadback } from "@/lib/profileNormalizer";
import type { OnboardingData } from "@/types/onboarding";

/**
 * "Vibe read" — the user uploads a screenshot of their OWN Instagram profile (consent-
 * based input, NOT scraping) and we extract lifestyle signal from it.
 *
 * COMPLIANCE (CLAUDE.md): we read ONLY vibe/scene/caption/aesthetic/interest signal and
 * EXPLICITLY ignore faces, appearance, and identity — no facial analysis, no biometrics.
 * The image is processed in memory, never stored or logged, and the path is explicit opt-in.
 * Requires a vision-capable Anthropic key; without it we return 503 (no silent fallback,
 * since a heuristic can't read an image).
 */
export const runtime = "nodejs";

const EXTRACT_KEYS = `lifestyleMode(rooted|nomadic), preferredClimate(tropical|mediterranean|temperate|cold), beachMountain(beach|mountains|either), noiseTolerance(low|medium|high), outdoorUrban(urban|outdoor), workStyle(remote|hybrid|onsite), industries(array of tech|creative|finance), communityVibes(array of digital-nomad|startup|expat|local), budgetRange(budget|mid-range|luxury), wellnessImportance(high|medium|low), gymCulture(important|neutral), mustHaves(array of affordable|safety|nature|nightlife|beach)`;

const SYSTEM = `You extract relocation-preference signal from a screenshot of a person's own Instagram profile.

CRITICAL RULES:
- Read ONLY: visible captions/bio text, the settings and activities shown (beaches, mountains, gyms, cafes, nightlife, nature, art, travel, cities), aesthetic/mood, and stated interests.
- DO NOT analyze, describe, or infer anything from any person's face, body, or physical appearance. Ignore people entirely as individuals. This is a hard rule.
- Infer lifestyle preferences only from places, activities, aesthetics, and text.

Return ONLY a JSON object whose keys are a subset of: ${EXTRACT_KEYS}. Omit any field you can't infer. No prose, no markdown.`;

export async function POST(req: NextRequest) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "The Instagram vibe read needs our AI connected. Try the AI profile or the quick quiz." },
      { status: 503 }
    );
  }

  let body: { imageBase64?: string; mediaType?: string; currentCity?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const imageBase64 = body.imageBase64 ?? "";
  const mediaType = body.mediaType || "image/png";
  const currentCity = (body.currentCity ?? "").trim();
  if (!imageBase64 || imageBase64.length < 100) {
    return NextResponse.json({ error: "No image received." }, { status: 422 });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001",
        max_tokens: 800,
        system: SYSTEM,
        messages: [
          {
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: mediaType, data: imageBase64 } },
              { type: "text", text: "Extract my lifestyle/relocation preferences from this. Remember: ignore faces and appearance entirely." },
            ],
          },
        ],
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Couldn't read that image. Try a clearer screenshot." }, { status: 502 });
    }
    const data = await res.json();
    const raw = data?.content?.[0]?.text ?? "";
    const jsonStr = raw.replace(/```json\n?|\n?```/g, "").trim();
    const parsed = JSON.parse(jsonStr) as OnboardingData;
    const inputs: OnboardingData = { ...parsed, currentCity };
    // Return only structured signal — never echo the image back.
    return NextResponse.json({ inputs, readback: buildReadback(inputs) });
  } catch {
    return NextResponse.json({ error: "Couldn't read that image. Try a clearer screenshot." }, { status: 502 });
  }
}
