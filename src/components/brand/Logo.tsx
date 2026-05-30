import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

export function Logo({ className, withWordmark = true }: { className?: string; withWordmark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-semibold tracking-tight", className)}>
      <span className="grid size-7 place-items-center rounded-lg bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--accent)))] text-primary-foreground">
        <MapPin className="size-4" strokeWidth={2.5} />
      </span>
      {withWordmark && <span>Find Your Place</span>}
    </span>
  );
}
