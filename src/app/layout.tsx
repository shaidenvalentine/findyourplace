import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import "./globals.css";

// Space Grotesk — clean, futuristic, geometric. The display face for the whole app.
const sans = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE = {
  name: "Find Your Place",
  tagline: "Find the place that actually fits you.",
  description:
    "Where you live shapes your income, your relationships, your health — who you become. Most people choose it by accident. We match you against 250 of the best places on Earth and show you the one that fits you best.",
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://findyourplace.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    type: "website",
    url: SITE_URL,
    siteName: SITE.name,
  },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description },
};

export const viewport: Viewport = {
  themeColor: "#10161d",
  width: "device-width",
  initialScale: 1,
  // Extend under the notch/home-indicator so env(safe-area-inset-*) resolves to real
  // values — the quiz's fixed footer CTA uses it to clear the iPhone home indicator.
  viewportFit: "cover",
  // No maximumScale — users must be able to pinch-zoom (WCAG 1.4.4).
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
