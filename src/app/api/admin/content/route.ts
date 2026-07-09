import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin/session";
import {
  generateContent,
  listContent,
  deleteContent,
  suggestedAngles,
  isLlmAvailable,
} from "@/lib/admin/contentStudio";

/**
 * Content Studio API — admin-only. GET lists history + suggested angles; POST generates
 * a carousel or ad set (LLM when configured, data engine otherwise); DELETE removes one.
 */
export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = await listContent(30);
  return NextResponse.json({ items, angles: suggestedAngles(), llm: isLlmAvailable() });
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  let body: { kind?: string; topic?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const kind = body.kind === "ad" ? "ad" : body.kind === "carousel" ? "carousel" : null;
  if (!kind) return NextResponse.json({ error: "kind must be 'carousel' or 'ad'" }, { status: 422 });
  const item = await generateContent(kind, body.topic ?? "");
  return NextResponse.json({ item });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 422 });
  await deleteContent(id);
  return NextResponse.json({ ok: true });
}
