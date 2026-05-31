import { ImageResponse } from "next/og";
import { BrandIcon } from "@/lib/brandIcon";

/**
 * Brand icon generator → PNG at any size.
 *   /api/icon            → 512×512
 *   /api/icon?size=1080  → Instagram profile picture
 */
export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const size = Math.max(48, Math.min(2048, Number(url.searchParams.get("size")) || 512));
  return new ImageResponse(<BrandIcon size={size} />, { width: size, height: size });
}
