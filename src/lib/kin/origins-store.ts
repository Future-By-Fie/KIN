// Local-only store for the user's own origin places. Replaceable by a real API later.
// User-entered information is never verified by KIN.
export const ORIGINS_KEY = "kin.origins.v1";
export type EntryProvenance = "self_reported" | "documented";
export interface OriginEntry {
  id: string;
  place: string;
  country: string;
  era: string;
  story: string;
  provenance: EntryProvenance;
}
export type OriginInput = Omit<OriginEntry, "id">;
export const LIMITS = { place: 80, country: 60, era: 40, story: 500 };
export const ENTRY_LABEL: Record<EntryProvenance, string> = {
  self_reported: "You added this",
  documented: "Documented (not verified by KIN)",
};

export function validateOrigin(raw: Partial<Record<keyof OriginInput, unknown>>): OriginInput {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const out = {
    place: str(raw.place),
    country: str(raw.country),
    era: str(raw.era),
    story: str(raw.story),
    provenance: raw.provenance as EntryProvenance,
  };
  if (!out.place || out.place.length > LIMITS.place)
    throw new Error("Place needs 1–80 characters.");
  if (out.country.length > LIMITS.country) throw new Error("Country is too long.");
  if (out.era.length > LIMITS.era) throw new Error("Era is too long.");
  if (out.story.length > LIMITS.story) throw new Error("Story can be up to 500 characters.");
  if (out.provenance !== "self_reported" && out.provenance !== "documented")
    throw new Error("Choose where this information comes from.");
  return out;
}

type S = Pick<Storage, "getItem" | "setItem">;
export function loadOrigins(storage: S): OriginEntry[] {
  try {
    const list = JSON.parse(storage.getItem(ORIGINS_KEY) ?? "[]");
    if (!Array.isArray(list)) return [];
    return list.flatMap((e) => {
      try {
        return [{ id: String(e.id), ...validateOrigin(e) }];
      } catch {
        return [];
      }
    });
  } catch {
    return [];
  }
}
const save = (s: S, list: OriginEntry[]) => (s.setItem(ORIGINS_KEY, JSON.stringify(list)), list);
export function addOrigin(s: S, input: Partial<OriginInput>, id = `o-${Date.now()}`) {
  return save(s, [...loadOrigins(s), { id, ...validateOrigin(input) }]);
}
export function updateOrigin(s: S, id: string, input: Partial<OriginInput>) {
  const v = validateOrigin(input);
  return save(
    s,
    loadOrigins(s).map((e) => (e.id === id ? { id, ...v } : e)),
  );
}
export function removeOrigin(s: S, id: string) {
  return save(
    s,
    loadOrigins(s).filter((e) => e.id !== id),
  );
}