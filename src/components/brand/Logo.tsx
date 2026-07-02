import { cn } from "@/lib/utils";
import { BrandMark } from "@/lib/brandIcon";

export function Logo({ className, withWordmark = true }: { className?: string; withWordmark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-semibold tracking-tight", className)}>
      <span className="grid size-7 place-items-center rounded-[0.55rem] bg-[radial-gradient(120%_120%_at_30%_20%,#21271a,#0d0f0a)] shadow-sm shadow-black/20">
        <BrandMark size={18} />
      </span>
      {withWordmark && <span>Find Your Place</span>}
    </span>
  );
}
