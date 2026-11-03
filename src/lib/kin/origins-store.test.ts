import { describe, expect, it } from "vitest";
import { addOrigin, ENTRY_LABEL, loadOrigins, removeOrigin, updateOrigin } from "./origins-store";
import { canEnter } from "./age-gate";
import { defaultConsents, canUseRadar } from "./origins";

function mem() {
  const m = new Map<string, string>();
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, v),
  };
}
const base = {
  place: "Skåne",
  country: "Sweden",
  era: "1900s",
  story: "Grandma's farm.",
  provenance: "self_reported" as const,
};

describe("18+ gate", () => {
  it("blocks protected pages without the attestation and allows them with it", () => {
    expect(canEnter("/origins", false)).toBe(false);
    expect(canEnter("/discover", false)).toBe(false);
    expect(canEnter("/origins", true)).toBe(true);
    expect(canEnter("/welcome", false)).toBe(true);
  });
});

describe("My Origins store", () => {
  it("adds, edits and removes, surviving a reload", () => {
    const s = mem();
    addOrigin(s, base, "a");
    expect(loadOrigins(s)).toHaveLength(1);
    updateOrigin(s, "a", { ...base, place: "Lund" });
    expect(loadOrigins(s)[0]?.place).toBe("Lund");
    removeOrigin(s, "a");
    expect(loadOrigins(s)).toEqual([]);
  });
  it("rejects empty places, long stories and DNA provenance", () => {
    const s = mem();
    expect(() => addOrigin(s, { ...base, place: " " })).toThrow();
    expect(() => addOrigin(s, { ...base, story: "x".repeat(501) })).toThrow();
    expect(() => addOrigin(s, { ...base, provenance: "dna_estimate" as never })).toThrow();
  });
  it("never labels entries as verified", () => {
    expect(ENTRY_LABEL.self_reported).not.toMatch(/verified/i);
    expect(ENTRY_LABEL.documented).toMatch(/not verified/i);
  });
  it("KIN Day grants nothing: consents stay off and Radar stays off", () => {
    const c = defaultConsents();
    expect(Object.values(c).every((x) => !x.granted)).toBe(true);
    expect(canUseRadar(c, "18_plus")).toBe(false);
  });
});