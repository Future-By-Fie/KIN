// Prototype 18+ gate: a self-attestation stored in this browser only. Not age verification.
export const AGE_KEY = "kin.attested18.v1";
export const PUBLIC_PATHS = ["/", "/welcome", "/privacy", "/how-it-works"];

export function isPublicPath(path: string) {
  return PUBLIC_PATHS.includes(path);
}
export function hasAttested(storage: Pick<Storage, "getItem">) {
  return storage.getItem(AGE_KEY) === "yes";
}
export function setAttested(storage: Pick<Storage, "setItem" | "removeItem">, yes: boolean) {
  if (yes) storage.setItem(AGE_KEY, "yes");
  else storage.removeItem(AGE_KEY);
}
/** Protected pages need the attestation; public pages never do. */
export function canEnter(path: string, attested: boolean) {
  return isPublicPath(path) || attested;
}