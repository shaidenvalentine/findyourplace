import type { Location } from "@/lib/scoring";
import { LOCATIONS } from "@/data/locations";
import type { OnboardingData } from "@/types/onboarding";

/**
 * Tax-savings comparison: current tax residence vs the user's #1 match.
 *
 * IMPORTANT — this is a directional ESTIMATE, not tax advice. We use representative
 * national income-tax rates (and capital-gains rates for investors/founders). Real
 * liability depends on brackets, deductions, special regimes, and residency rules.
 * US citizens are taxed on worldwide income wherever they live — we flag that loudly.
 */

export interface TaxComparison {
  currentCountry: string;
  currentRate: number | null; // representative income-tax %, null if unknown
  currentKnown: boolean;
  destRate: number; // #1 match income-tax % (place name stays locked)
  destCapitalGainsRate: number;
  incomeBand: string;
  incomeMidpoint: number;
  /** Naive annual income-tax savings at the midpoint (can be negative = costs more). */
  annualSavings: number;
  isUsCitizen: boolean;
  hasInvestmentIncome: boolean;
}

export const INCOME_BANDS: { value: string; label: string; midpoint: number }[] = [
  { value: "<50k", label: "Under $50k", midpoint: 35_000 },
  { value: "50-100k", label: "$50k–$100k", midpoint: 75_000 },
  { value: "100-200k", label: "$100k–$200k", midpoint: 150_000 },
  { value: "200-500k", label: "$200k–$500k", midpoint: 325_000 },
  { value: "500k+", label: "$500k+", midpoint: 750_000 },
];

export function incomeMidpoint(band?: string): number | null {
  return INCOME_BANDS.find((b) => b.value === band)?.midpoint ?? null;
}

// Representative income-tax rates for common tax-residence countries (effective-ish for
// a well-paid professional, not top marginal). Overrides the dataset for credibility on
// the countries most users actually live in. Everything else falls back to dataset data.
const COUNTRY_TAX_OVERRIDE: Record<string, { income: number; capitalGains: number }> = {
  "United States": { income: 32, capitalGains: 20 },
  "United Kingdom": { income: 38, capitalGains: 20 },
  Canada: { income: 38, capitalGains: 25 },
  Australia: { income: 37, capitalGains: 23 },
  Germany: { income: 42, capitalGains: 26 },
  France: { income: 41, capitalGains: 30 },
  Netherlands: { income: 40, capitalGains: 31 },
  Ireland: { income: 40, capitalGains: 33 },
  Sweden: { income: 45, capitalGains: 30 },
  Norway: { income: 42, capitalGains: 37 },
  Denmark: { income: 45, capitalGains: 42 },
  Spain: { income: 37, capitalGains: 26 },
  Italy: { income: 38, capitalGains: 26 },
  Switzerland: { income: 25, capitalGains: 0 },
  Singapore: { income: 18, capitalGains: 0 },
  "Hong Kong": { income: 15, capitalGains: 0 },
  UAE: { income: 0, capitalGains: 0 },
  Qatar: { income: 0, capitalGains: 0 },
  Monaco: { income: 0, capitalGains: 0 },
  "New Zealand": { income: 33, capitalGains: 0 },
  Japan: { income: 33, capitalGains: 20 },
  Portugal: { income: 35, capitalGains: 28 },
};

// Dataset-derived country averages (covers every destination + most home countries).
let datasetByCountry: Map<string, { income: number; capitalGains: number }> | null = null;
function datasetCountryTax(country: string): { income: number; capitalGains: number } | null {
  if (!datasetByCountry) {
    const acc = new Map<string, { inc: number; cg: number; n: number }>();
    for (const l of LOCATIONS) {
      const cur = acc.get(l.country) ?? { inc: 0, cg: 0, n: 0 };
      cur.inc += l.personal_income_tax_rate ?? 0;
      cur.cg += l.capital_gains_tax_rate ?? 0;
      cur.n += 1;
      acc.set(l.country, cur);
    }
    datasetByCountry = new Map();
    for (const [country, v] of acc) {
      datasetByCountry.set(country, { income: Math.round(v.inc / v.n), capitalGains: Math.round(v.cg / v.n) });
    }
  }
  return datasetByCountry.get(country) ?? null;
}

export function getCountryTax(country: string): { income: number; capitalGains: number } | null {
  if (!country) return null;
  const key = country.trim();
  return COUNTRY_TAX_OVERRIDE[key] ?? datasetCountryTax(key);
}

export function computeTaxComparison(inputs: OnboardingData, dest: Location): TaxComparison | null {
  const country = (inputs.taxResidenceCountry ?? "").trim();
  const mid = incomeMidpoint(inputs.annualIncomeBand);
  if (!country || mid === null) return null; // need both to compare

  const current = getCountryTax(country);
  const destRate = dest.personal_income_tax_rate ?? 0;
  const destCg = dest.capital_gains_tax_rate ?? 0;
  const currentRate = current?.income ?? null;
  const annualSavings = currentRate === null ? 0 : Math.round((mid * (currentRate - destRate)) / 100);

  return {
    currentCountry: country,
    currentRate,
    currentKnown: current !== null,
    destRate,
    destCapitalGainsRate: destCg,
    incomeBand: inputs.annualIncomeBand ?? "",
    incomeMidpoint: mid,
    annualSavings,
    isUsCitizen: Boolean(inputs.isUsCitizen),
    hasInvestmentIncome: Boolean(inputs.hasInvestmentIncome),
  };
}

/** Country names for the tax-residence picker (dataset countries + common home countries). */
export const COUNTRY_OPTIONS: string[] = Array.from(
  new Set([...LOCATIONS.map((l) => l.country), ...Object.keys(COUNTRY_TAX_OVERRIDE)])
).sort((a, b) => a.localeCompare(b));

export function formatMoney(n: number): string {
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (abs >= 1000) return `${sign}$${Math.round(abs / 1000)}k`;
  return `${sign}$${abs}`;
}
