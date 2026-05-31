/**
 * Populates image_url + image_source for every location in src/data/locations.json.
 *
 * PRIMARY: Unsplash (set UNSPLASH_ACCESS_KEY) — curated, stunning travel photography.
 * FALLBACK: Wikipedia/Wikimedia (keyless) — licensed, relevant, but more variable; we
 *           filter out maps, flags, portraits, documents, and historical illustrations.
 *
 * Run:  node scripts/fetch-location-images.mjs            (Wikipedia fallback)
 *       UNSPLASH_ACCESS_KEY=xxx node scripts/fetch-location-images.mjs   (stunning)
 *       node scripts/fetch-location-images.mjs --missing  (only fill blanks)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.join(__dirname, "../src/data/locations.json");
const UA = { "user-agent": "FindYourPlace/1.0 (relocation matcher; data seed)" };
const KEY = process.env.UNSPLASH_ACCESS_KEY;
const onlyMissing = process.argv.includes("--missing");

const BAD =
  /\bmap\b|locator|\bflag\b|\bseal\b|coat[-_ ]of[-_ ]arms|orthographic|\bletter\b|manuscript|banknote|\bcoin\b|\blogo\b|emblem|\.svg|\.ogg|\.webm|\.pdf|signature|portrait|painting|fresco|engraving|armada|livro|\bprince\b|\bsultan\b/i;

// Convert any Wikimedia upload URL (thumb or original) into a stable, auto-resized
// Special:FilePath URL — small, reliable, and not subject to the thumb-service throttle.
const up = (u) => {
  if (!u) return null;
  u = u.replace(/^\/\//, "https://");
  if (!/upload\.wikimedia\.org/.test(u)) return u;
  let base = u;
  if (base.includes("/thumb/")) base = base.replace("/thumb/", "/").replace(/\/[^/]+$/, "");
  const file = base.substring(base.lastIndexOf("/") + 1);
  const project = base.includes("/wikipedia/en/") ? "en.wikipedia.org" : "commons.wikimedia.org";
  return `https://${project}/wiki/Special:FilePath/${file}?width=1200`;
};
function fnameOk(u) {
  if (!u) return false;
  const f = decodeURIComponent((u.split("/").pop() || "").split("?")[0]);
  return /\.(jpe?g)$/i.test(f) && !BAD.test(f);
}

async function fromUnsplash(name, country) {
  const q = encodeURIComponent(`${name} ${country} city skyline landmark`);
  const u = `https://api.unsplash.com/search/photos?query=${q}&orientation=landscape&per_page=1&client_id=${KEY}`;
  const r = await fetch(u, { headers: UA });
  if (!r.ok) return null;
  const j = await r.json();
  const p = j.results?.[0];
  if (!p) return null;
  return { url: `${p.urls.raw}&w=1400&q=80&fit=crop`, source: p.links.html, credit: p.user?.name };
}

async function fromWikipedia(title) {
  try {
    const s = await (
      await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`, { headers: UA })
    ).json();
    const lead = s.originalimage?.source || s.thumbnail?.source;
    const page = s.content_urls?.desktop?.page;
    if (fnameOk(lead)) return { url: up(s.thumbnail?.source || lead), source: page, credit: "Wikimedia Commons" };
    const m = await (
      await fetch(`https://en.wikipedia.org/api/rest_v1/page/media-list/${encodeURIComponent(title)}`, { headers: UA })
    ).json();
    for (const it of m.items || []) {
      if (it.type !== "image") continue;
      const cand = it.srcset?.[0]?.src;
      if (fnameOk(it.title) && cand) return { url: up(cand), source: page, credit: "Wikimedia Commons" };
    }
  } catch {
    /* ignore */
  }
  return null;
}

async function resolve(loc) {
  if (KEY) {
    const u = await fromUnsplash(loc.name, loc.country).catch(() => null);
    if (u) return u;
  }
  // try plain name, then "Name, Country"
  return (await fromWikipedia(loc.name)) || (await fromWikipedia(`${loc.name}, ${loc.country}`)) || null;
}

async function main() {
  const locs = JSON.parse(fs.readFileSync(DATA, "utf8"));
  let done = 0,
    hit = 0,
    miss = 0;
  const BATCH = 2;
  for (let i = 0; i < locs.length; i += BATCH) {
    const slice = locs.slice(i, i + BATCH);
    await Promise.all(
      slice.map(async (loc) => {
        if (onlyMissing && loc.image_url) return;
        let res = null;
        for (let attempt = 0; attempt < 3 && !res; attempt++) {
          if (attempt) await new Promise((r) => setTimeout(r, 700 * attempt));
          res = await resolve(loc);
        }
        if (res) {
          loc.image_url = res.url;
          loc.image_source = res.source || null;
          loc.image_credit = res.credit || null;
          hit++;
        } else {
          miss++;
        }
        done++;
      })
    );
    process.stdout.write(`\r  ${done}/${locs.length}  (hit ${hit}, miss ${miss})`);
    await new Promise((r) => setTimeout(r, 500));
  }
  fs.writeFileSync(DATA, JSON.stringify(locs, null, 2));
  console.log(`\nDone. ${hit} images, ${miss} missing. Source: ${KEY ? "Unsplash" : "Wikipedia (keyless)"}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
