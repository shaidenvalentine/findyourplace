import type { Location } from "@/lib/scoring";
import { cn } from "@/lib/utils";

/**
 * Place photo with a graceful gradient fallback (for the rare location with no image).
 * Uses a plain <img> so the browser loads the (already resized) Wikimedia FilePath URL
 * directly — no server-side optimizer dependency. Optional bottom scrim for legibility.
 */
export function PlacePhoto({
  location,
  className,
  priority = false,
  scrim = false,
  rounded = "rounded-xl",
}: {
  location?: Pick<Location, "name" | "image_url"> | null;
  className?: string;
  sizes?: string;
  priority?: boolean;
  scrim?: boolean;
  rounded?: string;
}) {
  const src = location?.image_url ?? null;
  return (
    <div className={cn("relative overflow-hidden bg-muted", rounded, className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={location?.name ?? "place"}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(135deg,hsl(var(--muted)),hsl(var(--surface)))]">
          <span className="text-2xl font-bold text-muted-foreground">{location?.name?.[0] ?? "?"}</span>
        </div>
      )}
      {scrim && <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />}
    </div>
  );
}
