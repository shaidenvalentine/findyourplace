"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Meta Pixel base loader. Injects the pixel once and fires a PageView on every client
 * route change (so SPA navigations through the funnel each count). Renders nothing and
 * no-ops entirely when NEXT_PUBLIC_META_PIXEL_ID is unset — the funnel is unaffected.
 *
 * The server-side Conversions API copy is sent separately by lib/analytics `track()`,
 * sharing an event_id with the Pixel so Meta deduplicates the two.
 */
export function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const pathname = usePathname();
  const firstLoad = useRef(true);

  useEffect(() => {
    if (!pixelId) return;
    // The base pixel code already fires the initial PageView on load. Only fire on
    // SUBSEQUENT client route changes so the first page view isn't double-counted.
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
    if (typeof fbq === "function") fbq("track", "PageView");
  }, [pixelId, pathname]);

  if (!pixelId) return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}
