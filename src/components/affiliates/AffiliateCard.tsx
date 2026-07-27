import type { AffiliatePartner, AffCategory } from "@/lib/affiliates";
import {
  ShieldCheck,
  Bone,
  GraduationCap,
  ShoppingBag,
  HeartHandshake,
  Stethoscope,
  ArrowUpRight,
} from "lucide-react";

const ICONS: Record<AffCategory, React.ComponentType<{ className?: string }>> = {
  insurance: ShieldCheck,
  food: Bone,
  training: GraduationCap,
  gear: ShoppingBag,
  care: HeartHandshake,
  health: Stethoscope,
};

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
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener"
      className="group flex items-start gap-3 rounded-xl glass p-4 transition-colors hover:border-primary/40"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
        <Icon className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5 font-semibold">
          {partner.name}
          <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
        <span className="mt-0.5 block text-sm text-muted-foreground">{partner.blurb}</span>
        <span className="mt-2 inline-block text-sm font-semibold text-primary">{partner.cta} →</span>
      </span>
    </a>
  );
}
