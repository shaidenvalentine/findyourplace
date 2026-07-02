import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocationById, LOCATIONS } from "@/data/locations";
import type { Location } from "@/lib/scoring";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlacePhoto } from "@/components/places/PlacePhoto";
import { PlaceProfile } from "@/components/places/PlaceProfile";
import { AffiliateCard } from "@/components/affiliates/AffiliateCard";
import { getPartner } from "@/lib/affiliates";
import { getCountryTaxRecord } from "@/lib/tax";
import { ArrowRight, Coins, Globe2 } from "lucide-react";

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const loc = getLocationById(id);
  if (!loc) return { title: "Place not found" };
  const title = `Living in ${loc.name}, ${loc.country}`;
  const description = loc.vibe_summary || loc.lowdown?.slice(0, 150) || `What it's like to live in ${loc.name}.`;
  return {
    title,
    description,
    alternates: { canonical: `/places/${loc.id}` },
    openGraph: { title, description, type: "article", images: loc.image_url ? [loc.image_url] : [] },
    twitter: { card: "summary_large_image", title, description, images: loc.image_url ? [loc.image_url] : [] },
  };
}

const SCORE_FIELDS: { key: keyof Location; label: string }[] = [
  { key: "safety_score", label: "Safety" },
  { key: "cost_of_living_score", label: "Affordability" },
  { key: "internet_quality_score", label: "Internet" },
  { key: "climate_score", label: "Climate" },
  { key: "nightlife_score", label: "Nightlife" },
  { key: "wellness_score", label: "Wellness" },
  { key: "walkability_score", label: "Walkability" },
  { key: "english_friendliness_score", label: "English-friendly" },
  { key: "visa_friendliness_score", label: "Visa ease" },
  { key: "tax_friendliness_score", label: "Tax-friendly" },
];

export default async function PlacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const loc = getLocationById(id);
  if (!loc) notFound();

  return (
    <main className="mx-auto w-full max-w-2xl px-4 pb-20">
      <header className="flex h-14 items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <Button asChild variant="ghost" size="sm">
          <Link href="/places">All places</Link>
        </Button>
      </header>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl">
        <PlacePhoto location={loc} className="h-64 w-full sm:h-80" w={720} priority scrim />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {loc.tags?.slice(0, 4).map((t) => (
              <Badge key={t} variant="primary">
                {t}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow sm:text-4xl">{loc.name}</h1>
          <p className="text-sm text-white/80">
            {loc.region ? `${loc.region} · ` : ""}
            {loc.country} · {loc.continent}
          </p>
        </div>
      </div>

      {loc.vibe_summary && <p className="mt-5 text-lg font-medium leading-snug">{loc.vibe_summary}</p>}

      <div className="mt-5">
        <PlaceProfile location={loc} />
      </div>

      {/* Scores */}
      <h2 className="mt-8 text-lg font-bold tracking-tight">The scorecard</h2>
      <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        {SCORE_FIELDS.map((f) => {
          const v = (loc[f.key] as number) ?? 50;
          return (
            <div key={f.label}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{f.label}</span>
                <span className="font-semibold tabular-nums">{v}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,hsl(var(--secondary)),hsl(var(--primary)))]"
                  style={{ width: `${Math.max(3, Math.min(100, v))}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Tax snapshot — accurate country data (PwC/KPMG-sourced) */}
      {(() => {
        const ct = getCountryTaxRecord(loc.country);
        const incomeV = ct?.income ?? loc.personal_income_tax_rate;
        const corpV = ct?.corporate ?? loc.corporate_tax_rate;
        const cgV = ct?.capitalGains ?? loc.capital_gains_tax_rate;
        return (
          <div className="mt-6 rounded-xl glass p-5">
            <h3 className="flex items-center gap-2 text-base font-semibold">
              <Coins className="size-4 text-accent" /> Tax in {loc.country}
            </h3>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <TaxStat label="Income (typical)" v={incomeV} />
              <TaxStat label="Capital gains" v={cgV} />
              <TaxStat label="Corporate" v={corpV} />
            </div>
            {ct && (
              <div className="mt-3 flex flex-wrap gap-2">
                {ct.territorial && (
                  <Badge variant="secondary">
                    <Globe2 className="size-3" /> Territorial — foreign income often untaxed
                  </Badge>
                )}
                {ct.vat ? <Badge variant="outline">VAT {ct.vat}%</Badge> : null}
                {ct.residencyDays ? <Badge variant="outline">{ct.residencyDays}-day residency rule</Badge> : null}
              </div>
            )}
            {ct?.specialRegime && (
              <p className="mt-3 text-sm">
                <span className="font-semibold text-secondary">Special regime:</span>{" "}
                <span className="text-muted-foreground">{ct.specialRegime}</span>
              </p>
            )}
            {ct?.notes && <p className="mt-2 text-sm text-muted-foreground">{ct.notes}</p>}
            <p className="mt-2 text-[11px] text-muted-foreground">
              Representative estimate — not tax advice.
              {ct?.source ? (
                <>
                  {" · "}
                  <a href={ct.source} target="_blank" rel="noopener noreferrer" className="underline">
                    source
                  </a>
                </>
              ) : null}
            </p>
          </div>
        );
      })()}

      {/* Make the move — contextual affiliate CTAs */}
      <h2 className="mt-8 text-lg font-bold tracking-tight">Make the move to {loc.name}</h2>
      <div className="mt-3 flex flex-col gap-2">
        {["booking", "skyscanner", "safetywing", "airalo"].map((pid) => {
          const partner = getPartner(pid);
          return partner ? (
            <AffiliateCard key={pid} partner={partner} runId="" placement={`place:${loc.id}`} />
          ) : null;
        })}
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">
        Some links are partner links — we may earn a commission at no cost to you.
      </p>

      {/* CTA */}
      <div className="bg-aurora mt-8 rounded-2xl border border-primary/30 p-6 text-center">
        <h3 className="text-xl font-bold tracking-tight">Is {loc.name} your place?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Take the 60-second quiz and see how well it actually fits you — and what beats it.
        </p>
        <Button asChild variant="gradient" size="lg" className="mt-4">
          <Link href="/start">
            Find my place <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      {loc.image_credit && (
        <p className="mt-4 text-center text-[11px] text-muted-foreground">
          Photo via {loc.image_credit}
          {loc.image_source ? (
            <>
              {" · "}
              <a href={loc.image_source} target="_blank" rel="noopener noreferrer" className="underline">
                source
              </a>
            </>
          ) : null}
        </p>
      )}
    </main>
  );
}

function TaxStat({ label, v }: { label: string; v: number | null }) {
  return (
    <div className="rounded-lg bg-muted/50 p-3">
      <div className="text-lg font-bold tabular-nums">{v === null || v === undefined ? "—" : `${v}%`}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}
