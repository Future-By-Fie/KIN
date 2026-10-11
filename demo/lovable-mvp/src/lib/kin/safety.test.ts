import { beforeEach, describe, expect, it } from "vitest";
import {
  acceptConnection,
  blockMatch,
  getKinMatch,
  getNearbyKin,
  getRevealedConnection,
  reportMatch,
  requestConnection,
  resetDemo,
  sendMessage,
  MAX_MESSAGE_LENGTH,
  DemoNotFoundError,
} from "./service";
import { canRequestReveal, initialPreferences, isDiscoveryActive } from "./discovery";

describe("Onboarding and discovery preferences", () => {
  it("discovery is active by default and stops when visibility is turned off", () => {
    expect(isDiscoveryActive(initialPreferences)).toBe(true);
    expect(isDiscoveryActive({ ...initialPreferences, discovery: false })).toBe(false);
  });
  it("turning off location or ancestry signals also pauses discovery", () => {
    expect(isDiscoveryActive({ ...initialPreferences, location: false })).toBe(false);
    expect(isDiscoveryActive({ ...initialPreferences, ancestry: false })).toBe(false);
  });
  it("a reveal cannot start when connection requests are off", () => {
    expect(canRequestReveal({ ...initialPreferences, consent: false })).toBe(false);
    expect(canRequestReveal({ ...initialPreferences, discovery: false })).toBe(false);
    expect(canRequestReveal(initialPreferences)).toBe(true);
  });
});

describe("Local block/report and input validation", () => {
  beforeEach(resetDemo);
  it("blocking hides the match from discovery and removes any reveal", async () => {
    await requestConnection("maja");
    await acceptConnection("maja");
    await blockMatch("maja");
    expect((await getNearbyKin()).map((m) => m.id)).toEqual(["erik", "sara"]);
    expect(await getRevealedConnection("maja")).toBeNull();
    await expect(requestConnection("maja")).rejects.toBeInstanceOf(DemoNotFoundError);
  });
  it("reset clears local blocks", async () => {
    await blockMatch("erik");
    resetDemo();
    expect(await getNearbyKin()).toHaveLength(3);
  });
  it("report is a local flag and never claims server delivery", async () => {
    expect(await reportMatch("maja")).toEqual({ id: "maja", deliveredToServer: false });
  });
  it("rejects malformed and unknown ids", async () => {
    await expect(getKinMatch("../maja")).rejects.toBeInstanceOf(DemoNotFoundError);
    await expect(getKinMatch("nobody")).rejects.toBeInstanceOf(DemoNotFoundError);
  });
  it("rejects blank and over-long messages", async () => {
    await requestConnection("maja");
    await acceptConnection("maja");
    await expect(sendMessage("maja", "   ")).rejects.toThrow("Write a message first");
    await expect(sendMessage("maja", "x".repeat(MAX_MESSAGE_LENGTH + 1))).rejects.toThrow("under");
    expect((await sendMessage("maja", "x".repeat(MAX_MESSAGE_LENGTH))).text).toHaveLength(MAX_MESSAGE_LENGTH);
  });
});