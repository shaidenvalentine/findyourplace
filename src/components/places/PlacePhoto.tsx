import type { Location } from "@/lib/scoring";
import { cn } from "@/lib/utils";

/**
 * Place photo with a graceful gradient fallback (for the rare location with no image).
 * Uses a plain <img> so the browser loads the Wikimedia FilePath URL directly — no
 * server-side optimizer dependency (Next's optimizer is blocked by Wikimedia's
 * User-Agent policy, so next/image would 403 these in production).
 *
 * To avoid shipping 1200px originals into small slots, we rewrite Wikimedia's
 * `Special:FilePath?width=` param to the slot's real size and add a 2x srcset for retina.
 * Same host/endpoint the browser already fetches successfully — just a smaller number.
 */
function sizedWikimedia(url: string, w: number): string {
  try {
    const u = new URL(url);
    if (/(^|\.)wik(imedia|ipedia)\.org$/.test(u.hostname) && u.pathname.includes("Special:FilePath")) {
      u.searchParams.set("width", String(Math.round(w)));
      return u.toString();
    }
  } catch {
    /* not a parseable URL — fall through */
  }
  return url;
}

export function PlacePhoto({
  location,
  className,
  w = 800,
  priority = false,
  scrim = false,
  rounded = "rounded-xl",
  decorative = false,
}: {
  location?: Pick<Location, "name" | "image_url"> | null;
  className?: string;
  /** Intrinsic display width (px) of the slot — drives the requested Wikimedia size. */
  w?: number;
  priority?: boolean;
  scrim?: boolean;
  rounded?: string;
  /** Purely-visual usage (e.g. hero backdrop): empty alt, no letter fallback. */
  decorative?: boolean;
}) {
  const raw = location?.image_url ?? null;
  const src = raw ? sizedWikimedia(raw, w) : null;
  const src2x = raw ? sizedWikimedia(raw, w * 2) : null;
  return (
    <div className={cn("relative overflow-hidden bg-muted", rounded, className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          srcSet={src2x ? `${src} 1x, ${src2x} 2x` : undefined}
          alt={decorative ? "" : location?.name ? `${location.name}` : ""}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : decorative ? null : (
        <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(135deg,hsl(var(--muted)),hsl(var(--surface)))]">
          <span className="text-2xl font-bold text-muted-foreground">{location?.name?.[0] ?? "?"}</span>
        </div>
      )}
      {scrim && <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />}
    </div>
  );
}
