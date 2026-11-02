import { describe, expect, it } from "vitest";
import {
  canUseRadar,
  claimLabel,
  defaultConsents,
  setConsent,
  visibleClaims,
  type OriginClaim,
  type OriginPlace,
} from "./origins";
import { syntheticMatches } from "./mock-data";

const place: OriginPlace = {
  id: "skane",
  name: "Skåne",
  region: "Skåne",
  country: "Sweden",
  approx: { lat: 55.7, lng: 13.2 },
  synthetic: true,
};
const dna: OriginClaim = {
  id: "d",
  placeId: "skane",
  provenance: "dna_estimate",
  confidence: "medium",
  synthetic: true,
};
const self: OriginClaim = {
  id: "s",
  placeId: "skane",
  provenance: "self_reported",
  synthetic: true,
};

describe("origin rules", () => {
  it("always labels DNA claims as an estimate", () => {
    expect(claimLabel(dna, place)).toContain("DNA estimate");
    expect(claimLabel(self, place)).not.toContain("estimate");
  });
  it("starts with every sensitive consent off", () => {
    expect(Object.values(defaultConsents()).every((c) => !c.granted)).toBe(true);
  });
  it("hides DNA claims without DNA consent and again after withdrawal", () => {
    let c = defaultConsents();
    expect(visibleClaims([dna, self], c)).toEqual([self]);
    c = setConsent(c, "dna_processing", true, "18_plus");
    expect(visibleClaims([dna, self], c)).toHaveLength(2);
    c = setConsent(c, "dna_processing", false, "18_plus");
    expect(visibleClaims([dna, self], c)).toEqual([self]);
  });
  it("keeps Radar off until opted in, and requires the 18+ attestation", () => {
    const c = defaultConsents();
    expect(canUseRadar(c, "18_plus")).toBe(false);
    expect(canUseRadar(setConsent(c, "radar_visibility", true, "18_plus"), "18_plus")).toBe(true);
    const un = setConsent(c, "radar_visibility", true, "unconfirmed");
    expect(un.radar_visibility.granted).toBe(false);
  });
  it("does not allow DNA processing without the 18+ attestation", () => {
    expect(
      setConsent(defaultConsents(), "dna_processing", true, "unconfirmed").dna_processing.granted,
    ).toBe(false);
  });
  it("radar matches carry no relationship, distance or score", () => {
    for (const m of syntheticMatches) {
      expect(m).not.toHaveProperty("relationship");
      expect(m).not.toHaveProperty("distance");
      expect(m).not.toHaveProperty("confidence");
      expect(JSON.stringify(m)).not.toMatch(/cousin|\d+\s?%|\d+(\.\d+)?\s?(m|km)\b/i);
    }
  });
});