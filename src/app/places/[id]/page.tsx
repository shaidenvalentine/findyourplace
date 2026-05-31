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
import { ArrowRight, Coins } from "lucide-react";

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
    openGraph: { title, description, images: loc.image_url ? [loc.image_url] : [] },
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
        <PlacePhoto location={loc} className="h-64 w-full sm:h-80" sizes="700px" priority scrim />
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

      {/* Tax snapshot */}
      <div className="mt-6 rounded-xl border border-border bg-card p-5">
        <h3 className="flex items-center gap-2 text-base font-semibold">
          <Coins className="size-4 text-accent" /> Tax snapshot
        </h3>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <TaxStat label="Income" v={loc.personal_income_tax_rate} />
          <TaxStat label="Corporate" v={loc.corporate_tax_rate} />
          <TaxStat label="Capital gains" v={loc.capital_gains_tax_rate} />
        </div>
        {loc.tax_notes && <p className="mt-3 text-sm text-muted-foreground">{loc.tax_notes}</p>}
        <p className="mt-2 text-[11px] text-muted-foreground">Estimate — not tax advice.</p>
      </div>

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
