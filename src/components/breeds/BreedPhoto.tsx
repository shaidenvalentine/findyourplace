import type { Breed } from "@/lib/scoring";
import { cn } from "@/lib/utils";

/**
 * Breed photo with an elegant token-colored placeholder. Every breed in the current
 * dataset has image_url = null, so the placeholder IS the default look for now — it
 * must feel designed, not broken. The <img> path stays fully wired so real photos
 * light up the moment the dataset gains image URLs, with zero component changes.
 */
export function BreedPhoto({
  breed,
  className,
  priority = false,
  scrim = false,
  rounded = "rounded-xl",
  decorative = false,
}: {
  breed?: Pick<Breed, "name" | "image_url"> | null;
  className?: string;
  priority?: boolean;
  scrim?: boolean;
  rounded?: string;
  /** Purely-visual usage (e.g. hero backdrop): empty alt, quieter placeholder. */
  decorative?: boolean;
}) {
  const src = breed?.image_url ?? null;
  return (
    <div className={cn("relative overflow-hidden bg-muted", rounded, className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={decorative ? "" : breed?.name ?? ""}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center bg-[linear-gradient(135deg,hsl(var(--primary)/0.16),hsl(var(--muted))_45%,hsl(var(--secondary)/0.14))]"
        >
          {!decorative && <span className="select-none text-3xl opacity-70 sm:text-4xl">🐾</span>}
        </div>
      )}
      {scrim && <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />}
    </div>
  );
}
