/**
 * Patches images for places whose Wikipedia fallback grabbed something irrelevant
 * (portraits, stamps, historical charts). Uses a curated mapping of place → better
 * Wikipedia article title and re-fetches the lead image via Special:FilePath.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.join(__dirname, "../src/data/locations.json");
const UA = { "user-agent": "FindYourPlace/1.0 (relocation matcher; image patch)" };

// Place name → better Wikipedia article title (city/island that has a clean lead photo).
const OVERRIDES = {
  Mauritius: "Port Louis",
  Seychelles: "Victoria, Seychelles",
  Barbados: "Bridgetown",
  Fiji: "Viti Levu",
  Tahiti: "Papeete",
  "Bora Bora": "Bora Bora",
  "French Polynesia": "Papeete",
  Curaçao: "Willemstad",
  "Hong Kong": "Hong Kong",
  "Greek Islands": "Santorini",
  Crete: "Heraklion",
  "Amalfi Coast": "Amalfi",
  Puglia: "Lecce",
  "Lake Como": "Como",
  "Lake Bled": "Bled",
  "Canary Islands": "Tenerife",
  "Montenegro Coast": "Kotor",
  Madeira: "Funchal",
  Algarve: "Faro, Portugal",
  Ericeira: "Ericeira",
  Goa: "Panaji",
  "Lake Atitlan": "Panajachel",
  Roatan: "Coxen Hole",
  Antigua: "Antigua Guatemala",
  Palawan: "Puerto Princesa",
  Lombok: "Mataram",
  "Koh Samui": "Ko Samui",
  "Koh Phangan": "Ko Pha-ngan",
  Phuket: "Phuket City",
  Krabi: "Krabi (city)",
  Pai: "Pai District",
  Langkawi: "Langkawi",
  Aqaba: "Aqaba",
  Zanzibar: "Zanzibar City",
  Diani: "Diani Beach",
  "Diani Beach": "Diani Beach",
  Dahab: "Dahab",
  Taghazout: "Taghazout",
  Chefchaouen: "Chefchaouen",
  Essaouira: "Essaouira",
  Hurghada: "Hurghada",
  Sharjah: "Sharjah",
  "Ras Al Khaimah": "Ras Al Khaimah (city)",
  "Nosara": "Nosara",
  "Sayulita": "Sayulita",
  "Punta Cana": "Punta Cana",
  "Santo Domingo": "Santo Domingo",
  "San Juan": "San Juan, Puerto Rico",
  "Cabo San Lucas": "Cabo San Lucas",
  "Playa del Carmen": "Playa del Carmen",
  Tulum: "Tulum",
  Mérida: "Mérida, Yucatán",
  Oaxaca: "Oaxaca City",
  "Tamarindo": "Tamarindo, Costa Rica",
  Cusco: "Cusco",
  Cuenca: "Cuenca, Ecuador",
  Montanita: "Montañita, Ecuador",
  "Santa Marta": "Santa Marta",
  "Bariloche": "San Carlos de Bariloche",
  Mendoza: "Mendoza, Argentina",
  Florianópolis: "Florianópolis",
  Valparaíso: "Valparaíso",
  Cordoba: "Córdoba, Argentina",
  Asuncion: "Asunción",
  "Hoi An": "Hội An",
  Charleston: "Charleston, South Carolina",
  Portland: "Portland, Oregon",
};

const UP = (u) => {
  if (!u) return null;
  u = u.replace(/^\/\//, "https://");
  if (!/upload\.wikimedia\.org/.test(u)) return u;
  let base = u;
  if (base.includes("/thumb/")) base = base.replace("/thumb/", "/").replace(/\/[^/]+$/, "");
  const file = base.substring(base.lastIndexOf("/") + 1);
  const project = base.includes("/wikipedia/en/") ? "en.wikipedia.org" : "commons.wikimedia.org";
  return `https://${project}/wiki/Special:FilePath/${file}?width=1200`;
};

const BAD =
  /\bmap\b|locator|\bflag\b|\bseal\b|coat[-_ ]of[-_ ]arms|orthographic|\bletter\b|manuscript|banknote|\bcoin\b|\blogo\b|emblem|\.svg|signature|portrait|painting|fresco|engraving|armada|livro|\bprince\b|\bsultan\b|stamp|coronation|warrior|descripcion|mascarenhas|cardona/i;

function fnameOk(u) {
  if (!u) return false;
  const f = decodeURIComponent((u.split("/").pop() || "").split("?")[0]);
  return /\.(jpe?g)$/i.test(f) && !BAD.test(f);
}

async function fetchImage(title) {
  try {
    const r = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`, { headers: UA });
    if (!r.ok) return null;
    const s = await r.json();
    const lead = s.originalimage?.source || s.thumbnail?.source;
    if (fnameOk(lead)) return UP(s.thumbnail?.source || lead);
    return null;
  } catch {
    return null;
  }
}

async function main() {
  const locs = JSON.parse(fs.readFileSync(DATA, "utf8"));
  let patched = 0;
  let stillBad = [];
  for (const [name, title] of Object.entries(OVERRIDES)) {
    const loc = locs.find((l) => l.name === name);
    if (!loc) continue;
    const newUrl = await fetchImage(title);
    if (newUrl && newUrl !== loc.image_url) {
      loc.image_url = newUrl;
      patched++;
      console.log(`  ✓ ${name.padEnd(22)} → ${title}`);
    } else if (!newUrl) {
      stillBad.push({ name, title });
      console.log(`  ✗ ${name.padEnd(22)} → ${title} (no clean image)`);
    }
    await new Promise((r) => setTimeout(r, 600));
  }
  fs.writeFileSync(DATA, JSON.stringify(locs, null, 2));
  console.log(`\npatched: ${patched}, still bad: ${stillBad.length}`);
  if (stillBad.length) console.log("still need work:", stillBad.map((x) => x.name).join(", "));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
