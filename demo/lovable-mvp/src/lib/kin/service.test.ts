import { beforeEach, describe, expect, it } from "vitest";
import {
  getNearbyKin,
  getKinMatch,
  requestConnection,
  acceptConnection,
  getRevealedConnection,
  sendMessage,
  getMessages,
  blockMatch,
  cancelConnection,
  resetDemo,
} from "./service";
import { syntheticUsers } from "./mock-data";
describe("Synthetic KIN consent rules", () => {
  beforeEach(resetDemo);
  it("keeps all discovery identities hidden", async () => {
    const nearby = await getNearbyKin();
    expect(nearby).toHaveLength(3);
    for (const match of nearby) {
      expect(match).not.toHaveProperty("name");
      expect(match).not.toHaveProperty("user");
      expect(match.synthetic).toBe(true);
    }
  });
  it("uses the specified fictional primary match", async () => {
    expect(await getKinMatch("maja")).toMatchObject({
      relationship: "2nd cousin",
      distance: "420 m",
      confidence: 87,
      synthetic: true,
    });
    expect(Object.values(syntheticUsers).map((user) => user.name)).toEqual([
      "Maja L.",
      "Erik N.",
      "Sara K.",
      "Leo A.",
    ]);
    expect(Object.values(syntheticUsers).every((user) => user.synthetic)).toBe(true);
  });
  it("never reveals with one-sided consent", async () => {
    expect(await getRevealedConnection("maja")).toBeNull();
    const request = await requestConnection("maja");
    expect(request.recipientConsent).toBe(false);
    expect(await getRevealedConnection("maja")).toBeNull();
  });
  it("requires a request before simulated recipient acceptance", async () => {
    await expect(acceptConnection("maja")).rejects.toThrow("Both sides must opt in");
  });
  it("reveals Maja only with both consents", async () => {
    await requestConnection("maja");
    const result = await acceptConnection("maja");
    expect(result.request).toMatchObject({
      requesterConsent: true,
      recipientConsent: true,
      status: "accepted",
    });
    expect(result.user.name).toBe("Maja L.");
  });
  it("blocks chat until mutual consent", async () => {
    await requestConnection("maja");
    await expect(sendMessage("maja", "Hello")).rejects.toThrow("Connect mutually");
    await acceptConnection("maja");
    expect(await sendMessage("maja", "Hello")).toMatchObject({ text: "Hello", sender: "you" });
  });
  it("does not expose messages without mutual consent", async () => {
    await expect(getMessages("maja")).rejects.toThrow("Connect mutually");
    await requestConnection("maja");
    await expect(getMessages("maja")).rejects.toThrow("Connect mutually");
    await acceptConnection("maja");
    await sendMessage("maja", "private hello");
    const history = await getMessages("maja");
    expect(history).toHaveLength(1);
    history[0].text = "modified locally";
    expect((await getMessages("maja"))[0].text).toBe("private hello");
    await blockMatch("maja");
    await expect(getMessages("maja")).rejects.toThrow("Connect mutually");
  });
  it("cancellation removes consent and requires a fresh handshake", async () => {
    await requestConnection("maja");
    await acceptConnection("maja");
    await cancelConnection("maja");
    expect(await getRevealedConnection("maja")).toBeNull();
    await expect(acceptConnection("maja")).rejects.toThrow("Both sides");
  });
});