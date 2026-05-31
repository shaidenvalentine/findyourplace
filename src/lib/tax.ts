import type { Location } from "@/lib/scoring";
import { LOCATIONS } from "@/data/locations";
import countryTaxData from "@/data/countryTax.json";
import type { OnboardingData } from "@/types/onboarding";

export interface CountryTax {
  income: number;
  topMarginal: number;
  capitalGains: number;
  corporate: number;
  vat: number;
  territorial: boolean;
  residencyDays: number;
  specialRegime: string;
  notes: string;
  source: string;
}

const COUNTRY_TAX = countryTaxData as Record<string, CountryTax>;

/** Full researched tax record for a country (PwC/KPMG/OECD-sourced), or null. */
export function getCountryTaxRecord(country: string): CountryTax | null {
  if (!country) return null;
  return COUNTRY_TAX[country.trim()] ?? null;
}

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
  destCorporateRate: number;
  destTerritorial: boolean;
  destSpecialRegime: string; // e.g. "Act 60", "IFICI 20% flat" — the wizard touch
  currentSpecialRegime: string;
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

// Dataset-derived country averages — last-resort fallback for any country not in the
// researched table (should be rare; the table covers all destination countries).
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
  const rec = getCountryTaxRecord(country);
  if (rec) return { income: rec.income, capitalGains: rec.capitalGains };
  return datasetCountryTax(country.trim());
}

export function computeTaxComparison(inputs: OnboardingData, dest: Location): TaxComparison | null {
  const country = (inputs.taxResidenceCountry ?? "").trim();
  const mid = incomeMidpoint(inputs.annualIncomeBand);
  if (!country || mid === null) return null; // need both to compare

  const current = getCountryTax(country);
  const currentRec = getCountryTaxRecord(country);
  // Prefer accurate researched country data for the destination; fall back to the
  // location's own field only if the country isn't in the table.
  const destRec = getCountryTaxRecord(dest.country);
  const destRate = destRec?.income ?? dest.personal_income_tax_rate ?? 0;
  const destCg = destRec?.capitalGains ?? dest.capital_gains_tax_rate ?? 0;
  const currentRate = current?.income ?? null;
  const annualSavings = currentRate === null ? 0 : Math.round((mid * (currentRate - destRate)) / 100);

  return {
    currentCountry: country,
    currentRate,
    currentKnown: current !== null,
    destRate,
    destCapitalGainsRate: destCg,
    destCorporateRate: destRec?.corporate ?? dest.corporate_tax_rate ?? 0,
    destTerritorial: destRec?.territorial ?? false,
    destSpecialRegime: destRec?.specialRegime ?? "",
    currentSpecialRegime: currentRec?.specialRegime ?? "",
    incomeBand: inputs.annualIncomeBand ?? "",
    incomeMidpoint: mid,
    annualSavings,
    isUsCitizen: Boolean(inputs.isUsCitizen),
    hasInvestmentIncome: Boolean(inputs.hasInvestmentIncome),
  };
}

/** Country names for the tax-residence picker (dataset countries + common home countries). */
export const COUNTRY_OPTIONS: string[] = Array.from(
  new Set([...LOCATIONS.map((l) => l.country), ...Object.keys(COUNTRY_TAX)])
).sort((a, b) => a.localeCompare(b));

export function formatMoney(n: number): string {
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (abs >= 1000) return `${sign}$${Math.round(abs / 1000)}k`;
  return `${sign}$${abs}`;
}
