// Provider-neutral origin model. Every item carries its provenance so self-reported,
// documented and DNA-derived information are never mixed or shown as fact.
export type Provenance = "self_reported" | "documented" | "dna_estimate";
export type ConsentCategory =
  "origins_profile" | "radar_visibility" | "dna_processing" | "dna_matching" | "contact";

export interface OriginPlace {
  id: string;
  name: string;
  region: string;
  country: string;
  /** Approximate only (rounded), for drawing a stylised map. */
  approx: { lat: number; lng: number };
  synthetic: true;
}
export interface OriginClaim {
  id: string;
  placeId: string;
  era?: string;
  provenance: Provenance;
  source?: string;
  /** Only meaningful for dna_estimate; a coarse band, never a percentage. */
  confidence?: "low" | "medium" | "high";
  synthetic: true;
}
export interface MigrationLeg {
  fromPlaceId: string;
  toPlaceId: string;
  period: string;
  provenance: Provenance;
  note: string;
}
export interface MigrationStory {
  id: string;
  title: string;
  legs: MigrationLeg[];
  synthetic: true;
}
export interface FamilyPerson {
  id: string;
  displayName: string;
  /** Entered by the user; KIN never infers relationships. */
  relation: string;
  events: { year?: string; placeId?: string; text: string; provenance: Provenance }[];
}
export interface ConsentRecord {
  category: ConsentCategory;
  granted: boolean;
  updatedAt: number;
}
export type Consents = Record<ConsentCategory, ConsentRecord>;
/** Interface only. No provider is connected; raw files are not the same as a partner API. */
export interface DnaProvider {
  id: string;
  kind: "partner_api" | "raw_file";
  status: "not_available";
}
/** KIN is strictly 18+. Only an explicit attestation unlocks anything. */
export type AgeBand = "unconfirmed" | "18_plus";

export const PROVENANCE_LABEL: Record<Provenance, string> = {
  self_reported: "You added this",
  documented: "From a document",
  dna_estimate: "DNA estimate",
};

/** All sensitive categories start off. */
export function defaultConsents(now = 0): Consents {
  const cats: ConsentCategory[] = [
    "origins_profile",
    "radar_visibility",
    "dna_processing",
    "dna_matching",
    "contact",
  ];
  return Object.fromEntries(
    cats.map((category) => [category, { category, granted: false, updatedAt: now }]),
  ) as Consents;
}
export function setConsent(
  consents: Consents,
  category: ConsentCategory,
  granted: boolean,
  age: AgeBand,
  now = Date.now(),
): Consents {
  if (granted && !isCategoryAllowedForAge(category, age)) return consents;
  return { ...consents, [category]: { category, granted, updatedAt: now } };
}
/** KIN is 18+ only: nothing can be granted without the adult attestation. */
export function isCategoryAllowedForAge(_category: ConsentCategory, age: AgeBand) {
  return age === "18_plus";
}
/** Claims the user may see now: DNA estimates disappear when DNA consent is withdrawn. */
export function visibleClaims(claims: OriginClaim[], consents: Consents) {
  return claims.filter((c) => c.provenance !== "dna_estimate" || consents.dna_processing.granted);
}
/** Display text for a claim; DNA results always read as an estimate. */
export function claimLabel(claim: OriginClaim, place: OriginPlace) {
  const base = `${place.name}, ${place.country}`;
  return claim.provenance === "dna_estimate"
    ? `${base} — DNA estimate${claim.confidence ? ` (${claim.confidence} confidence)` : ""}`
    : base;
}
export function canUseRadar(consents: Consents, age: AgeBand) {
  return age === "18_plus" && consents.radar_visibility.granted;
}