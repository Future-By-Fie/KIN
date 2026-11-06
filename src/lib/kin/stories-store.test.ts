import { describe, expect, it } from "vitest";
import {
  loadStories,
  moveStep,
  newPlacesFrom,
  removeStory,
  saveStory,
  SOURCE_LABEL,
  STORIES_KEY,
  type StoryStep,
} from "./stories-store";
import { loadOrigins } from "./origins-store";
import { LOCAL_DEMO_KEYS, resetLocalDemo } from "./age-gate";

function mem() {
  const m = new Map<string, string>();
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, v),
    removeItem: (k: string) => void m.delete(k),
  };
}
const step = (id: string, from: string, to: string, when = ""): StoryStep => ({
  id,
  from,
  to,
  when,
  note: "",
  source: "family_story",
});
const story = {
  title: "Grandma's road",
  about: "Grandma",
  steps: [step("a", "Sicily", "Göteborg", "1960s"), step("b", "Göteborg", "Lund", "1950s")],
};

describe("Migration stories store", () => {
  it("adds, edits, reorders and removes, surviving a reload", () => {
    const s = mem();
    saveStory(s, story, "x");
    expect(loadStories(s)).toHaveLength(1);
    saveStory(s, { ...story, steps: moveStep(story.steps, 0, 1) }, "x");
    expect(loadStories(s)[0]?.steps.map((x) => x.id)).toEqual(["b", "a"]);
    removeStory(s, "x");
    expect(loadStories(s)).toEqual([]);
  });
  it("keeps step order as entered, never sorting by date", () => {
    const s = mem();
    saveStory(s, story, "x");
    expect(loadStories(s)[0]?.steps.map((x) => x.when)).toEqual(["1960s", "1950s"]);
  });
  it("rejects empty title, 0 or 9 steps, long notes, and DNA or unknown sources", () => {
    const s = mem();
    expect(() => saveStory(s, { ...story, title: " " })).toThrow();
    expect(() => saveStory(s, { ...story, steps: [] })).toThrow();
    expect(() =>
      saveStory(s, {
        ...story,
        steps: Array.from({ length: 9 }, (_, i) => step(`${i}`, "A", "B")),
      }),
    ).toThrow();
    expect(() =>
      saveStory(s, { ...story, steps: [{ ...step("a", "A", "B"), note: "x".repeat(301) }] }),
    ).toThrow();
    for (const bad of ["dna_estimate", "verified"])
      expect(() =>
        saveStory(s, { ...story, steps: [{ ...step("a", "A", "B"), source: bad as never }] }),
      ).toThrow();
    expect(loadStories(s)).toEqual([]);
  });
  it("never labels sources as verified", () => {
    expect(SOURCE_LABEL.recollection).not.toMatch(/verified/i);
    expect(SOURCE_LABEL.family_story).not.toMatch(/verified/i);
    expect(SOURCE_LABEL.documented).toMatch(/not verified/i);
  });
  it("saving a story does not touch My Origins; new places are only suggested", () => {
    const s = mem();
    saveStory(s, story, "x");
    expect(loadOrigins(s)).toEqual([]);
    expect(newPlacesFrom(story, [])).toEqual(["Sicily", "Göteborg", "Lund"]);
  });
  it("Reset demo clears stories", () => {
    const s = mem();
    saveStory(s, story, "x");
    expect(LOCAL_DEMO_KEYS).toContain(STORIES_KEY);
    resetLocalDemo(s);
    expect(loadStories(s)).toEqual([]);
  });
});