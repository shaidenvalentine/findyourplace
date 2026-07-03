import type { AffiliatePartner, AffCategory } from "@/lib/affiliates";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Coins,
  ShieldCheck,
  Wallet,
  FileCheck,
  Plane,
  Home,
  Smartphone,
  Lock,
  Truck,
  Briefcase,
  Languages,
  Laptop,
  Building2,
  KeyRound,
  Mailbox,
  ArrowUpRight,
  ChevronDown,
  TriangleAlert,
} from "lucide-react";

const ICONS: Record<AffCategory, React.ComponentType<{ className?: string }>> = {
  "remote-jobs": Laptop,
  business: Building2,
  tax: Coins,
  insurance: ShieldCheck,
  banking: Wallet,
  visa: FileCheck,
  flights: Plane,
  stay: Home,
  housing: KeyRound,
  mail: Mailbox,
  esim: Smartphone,
  vpn: Lock,
  moving: Truck,
  coworking: Briefcase,
  language: Languages,
};

/**
 * A concierge-guide card: scannable hook up top, "why this matters" behind a native
 * disclosure (zero-JS server component), a loss-aversion skip line, and one obvious CTA.
 * The whole card is advice-first — the persuasion is the specificity, not the styling.
 */
export function AffiliateCard({
  partner,
  runId,
  placement,
}: {
  partner: AffiliatePartner;
  runId: string;
  placement: string;
}) {
  const Icon = ICONS[partner.category];
  const href = `/go/${partner.id}?run=${encodeURIComponent(runId)}&p=${encodeURIComponent(placement)}`;
  return (
    <div className="rounded-xl glass p-4 transition-colors hover:border-primary/40">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
          <Icon className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-semibold">{partner.name}</span>
            {partner.essential && (
              <Badge variant="accent" className="px-1.5 py-0 text-[10px] uppercase tracking-wide">
                Essential
              </Badge>
            )}
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">{partner.blurb}</p>
        </div>
      </div>

      <details className="group mt-2.5">
        <summary className="flex cursor-pointer list-none items-center gap-1 text-xs font-semibold text-secondary [&::-webkit-details-marker]:hidden">
          Why this matters for your move
          <ChevronDown className="size-3 transition-transform group-open:rotate-180" />
        </summary>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{partner.why}</p>
      </details>

      <p className="mt-2.5 flex items-start gap-1.5 text-xs text-muted-foreground">
        <TriangleAlert className="mt-0.5 size-3.5 shrink-0 text-destructive/70" />
        <span>
          <span className="font-medium text-foreground/80">If you skip it:</span> {partner.skipCost}
        </span>
      </p>

      <Button asChild size="sm" className="mt-3 w-full">
        <a href={href} target="_blank" rel="sponsored nofollow noopener">
          {partner.cta}
          <ArrowUpRight className="size-3.5" />
        </a>
      </Button>
    </div>
  );
}
