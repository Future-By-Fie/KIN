import { describe, expect, it } from "vitest";
import { journey, locate, MAP_COPY } from "./places";
import { LOCAL_DEMO_KEYS, resetLocalDemo } from "./age-gate";
import type { OriginEntry } from "./origins-store";

const o = (id: string, place: string, era: string): OriginEntry => ({
  id,
  place,
  country: "",
  era,
  story: "",
  provenance: "self_reported",
});

describe("Origins map", () => {
  it("never guesses unknown places", () => {
    expect(locate("Atlantis")).toBeNull();
    expect(locate("Skån")).toBeNull();
    expect(locate("skåne", "Sweden")?.name).toBe("Skåne");
    expect(locate("Smalltown", "Norway")?.name).toBe("Norway");
  });
  it("orders the journey by era and leaves out entries without one", () => {
    const j = journey([
      o("a", "Minnesota", "1910s"),
      o("b", "Skåne", "1850s"),
      o("c", "Norway", ""),
    ]);
    expect(j.map((x) => x.o.id)).toEqual(["b", "a"]);
  });
  it("labels never claim verification", () => {
    expect(MAP_COPY.journey).toMatch(/not verified/i);
    expect(MAP_COPY.note).not.toMatch(/\bverified\b/i);
  });
});

describe("Reset demo", () => {
  it("clears the 18+ confirmation, origins and KIN Day dismissal", () => {
    const m = new Map(LOCAL_DEMO_KEYS.map((k) => [k, "x"]));
    resetLocalDemo({ removeItem: (k: string) => void m.delete(k) });
    expect(m.size).toBe(0);
    expect(LOCAL_DEMO_KEYS).toEqual([
      "kin.attested18.v1",
      "kin.origins.v1",
      "kin.kinday.dismissed",
    ]);
  });
});