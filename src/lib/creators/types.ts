/** Creator portal — shared types across server + client. */

export interface Creator {
  id: string;
  userId: string | null;
  code: string; // url-safe, used in /c/[code] and ?ref=
  displayName: string;
  email: string;
  bio?: string | null;
  instagramHandle?: string | null;
  tiktokHandle?: string | null;
  youtubeHandle?: string | null;
  twitterHandle?: string | null;
  website?: string | null;
  payoutEmail?: string | null;
  revSharePct: number;
  status: "active" | "suspended";
  approved: boolean;
  createdAt: number;
}

export interface CreatorClick {
  id: string;
  creatorId: string;
  source: "link" | "code" | "landing";
  referrer?: string | null;
  createdAt: number;
}

export interface CreatorConversion {
  id: string;
  creatorId: string;
  runId: string | null;
  stripeSessionId?: string | null;
  email?: string | null;
  amountCents: number;
  creatorCutCents: number;
  status: "pending" | "paid" | "refunded";
  paidInPayoutId?: string | null;
  createdAt: number;
}

export interface CreatorPayout {
  id: string;
  creatorId: string;
  periodStart: string; // YYYY-MM-DD
  periodEnd: string;
  totalCents: number;
  conversionCount: number;
  status: "pending" | "paid";
  paidAt: number | null;
  payoutMethod?: string | null;
  reference?: string | null;
  notes?: string | null;
  createdAt: number;
}

/** Aggregated stats for the dashboard. */
export interface CreatorStats {
  totalEarningsCents: number;
  pendingEarningsCents: number;
  paidEarningsCents: number;
  lifetimeClicks: number;
  lifetimeConversions: number;
  conversionRatePct: number;
  last30: {
    clicks: number;
    conversions: number;
    earningsCents: number;
    byDay: { date: string; clicks: number; conversions: number }[];
  };
  recentConversions: CreatorConversion[];
}
