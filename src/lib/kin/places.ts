// Fixed, bundled list of approximate region centres for the stylised Origins map.
// Not geocoding: unknown places return null and are never guessed.
import type { OriginEntry } from "./origins-store";

export interface KnownPlace {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export const KNOWN_PLACES: KnownPlace[] = [
  { name: "Skåne", country: "Sweden", lat: 55.9, lon: 13.5 },
  { name: "Lund", country: "Sweden", lat: 55.7, lon: 13.2 },
  { name: "Stockholm", country: "Sweden", lat: 59.3, lon: 18.1 },
  { name: "Göteborg", country: "Sweden", lat: 57.7, lon: 12.0 },
  { name: "Norrland", country: "Sweden", lat: 65.0, lon: 18.0 },
  { name: "Sweden", country: "Sweden", lat: 62.0, lon: 15.0 },
  { name: "Norway", country: "Norway", lat: 61.0, lon: 9.0 },
  { name: "Denmark", country: "Denmark", lat: 56.0, lon: 10.0 },
  { name: "Finland", country: "Finland", lat: 63.0, lon: 26.0 },
  { name: "Iceland", country: "Iceland", lat: 64.9, lon: -18.6 },
  { name: "Ireland", country: "Ireland", lat: 53.2, lon: -8.0 },
  { name: "Scotland", country: "United Kingdom", lat: 56.8, lon: -4.2 },
  { name: "England", country: "United Kingdom", lat: 52.5, lon: -1.5 },
  { name: "Germany", country: "Germany", lat: 51.0, lon: 10.0 },
  { name: "Poland", country: "Poland", lat: 52.0, lon: 19.0 },
  { name: "France", country: "France", lat: 46.5, lon: 2.5 },
  { name: "Netherlands", country: "Netherlands", lat: 52.2, lon: 5.3 },
  { name: "Italy", country: "Italy", lat: 42.8, lon: 12.5 },
  { name: "Sicily", country: "Italy", lat: 37.5, lon: 14.1 },
  { name: "Spain", country: "Spain", lat: 40.2, lon: -3.7 },
  { name: "Portugal", country: "Portugal", lat: 39.6, lon: -8.0 },
  { name: "Greece", country: "Greece", lat: 39.0, lon: 22.0 },
  { name: "Ukraine", country: "Ukraine", lat: 49.0, lon: 31.0 },
  { name: "Turkey", country: "Turkey", lat: 39.0, lon: 35.0 },
  { name: "Lebanon", country: "Lebanon", lat: 33.9, lon: 35.8 },
  { name: "Iran", country: "Iran", lat: 32.5, lon: 54.0 },
  { name: "Egypt", country: "Egypt", lat: 26.8, lon: 30.8 },
  { name: "Morocco", country: "Morocco", lat: 31.8, lon: -7.1 },
  { name: "Nigeria", country: "Nigeria", lat: 9.1, lon: 8.7 },
  { name: "Ghana", country: "Ghana", lat: 7.9, lon: -1.0 },
  { name: "Ethiopia", country: "Ethiopia", lat: 9.1, lon: 40.5 },
  { name: "Kenya", country: "Kenya", lat: 0.2, lon: 37.9 },
  { name: "Somalia", country: "Somalia", lat: 5.2, lon: 46.2 },
  { name: "South Africa", country: "South Africa", lat: -30.6, lon: 22.9 },
  { name: "Punjab", country: "India", lat: 31.1, lon: 75.3 },
  { name: "Kerala", country: "India", lat: 10.8, lon: 76.3 },
  { name: "India", country: "India", lat: 22.0, lon: 79.0 },
  { name: "Pakistan", country: "Pakistan", lat: 30.4, lon: 69.3 },
  { name: "Bangladesh", country: "Bangladesh", lat: 23.7, lon: 90.4 },
  { name: "China", country: "China", lat: 35.0, lon: 104.0 },
  { name: "Japan", country: "Japan", lat: 36.2, lon: 138.3 },
  { name: "Korea", country: "South Korea", lat: 36.5, lon: 127.9 },
  { name: "Vietnam", country: "Vietnam", lat: 16.0, lon: 107.8 },
  { name: "Philippines", country: "Philippines", lat: 12.9, lon: 121.8 },
  { name: "Indonesia", country: "Indonesia", lat: -2.5, lon: 118.0 },
  { name: "Australia", country: "Australia", lat: -25.3, lon: 133.8 },
  { name: "New Zealand", country: "New Zealand", lat: -41.0, lon: 174.0 },
  { name: "Canada", country: "Canada", lat: 56.1, lon: -106.3 },
  { name: "United States", country: "United States", lat: 39.8, lon: -98.6 },
  { name: "Minnesota", country: "United States", lat: 46.3, lon: -94.3 },
  { name: "Mexico", country: "Mexico", lat: 23.6, lon: -102.6 },
  { name: "Cuba", country: "Cuba", lat: 21.5, lon: -79.5 },
  { name: "Jamaica", country: "Jamaica", lat: 18.1, lon: -77.3 },
  { name: "Colombia", country: "Colombia", lat: 4.6, lon: -74.3 },
  { name: "Brazil", country: "Brazil", lat: -10.0, lon: -52.0 },
  { name: "Chile", country: "Chile", lat: -33.4, lon: -70.6 },
  { name: "Argentina", country: "Argentina", lat: -34.6, lon: -64.0 },
];

const norm = (s: string) => s.trim().toLocaleLowerCase();

/** Exact (case-insensitive) match on place, then on country. Never fuzzy, never guessed. */
export function locate(place: string, country = ""): KnownPlace | null {
  const p = norm(place);
  const c = norm(country);
  if (!p && !c) return null;
  return (
    KNOWN_PLACES.find((k) => norm(k.name) === p && (!c || norm(k.country) === c)) ??
    KNOWN_PLACES.find((k) => norm(k.name) === p) ??
    (c ? (KNOWN_PLACES.find((k) => norm(k.name) === c) ?? null) : null)
  );
}

/** Equirectangular projection into a 360×180 viewBox. */
export function project(k: KnownPlace) {
  return { x: k.lon + 180, y: 90 - k.lat };
}

/** First 4-digit year in the era text, e.g. "1920s" → 1920. */
export function eraYear(era: string): number | null {
  const m = era.match(/\b(1[0-9]{3}|20[0-9]{2})/);
  return m ? Number(m[1]) : null;
}

/** The user's own ordering by era. Origins without a readable year or map spot are left out. */
export function journey(list: OriginEntry[]) {
  return list
    .map((o) => ({ o, year: eraYear(o.era), at: locate(o.place, o.country) }))
    .filter((j): j is { o: OriginEntry; year: number; at: KnownPlace } => !!j.at && j.year !== null)
    .sort((a, b) => a.year - b.year);
}

export const MAP_COPY = {
  journey: "Your order, not verified",
  unmapped: "Not on the map",
  note: "Approximate region centres. Only places you added.",
};