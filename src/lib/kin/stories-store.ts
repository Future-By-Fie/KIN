// Local-only migration stories. Every step is the user's own words with a source they chose.
// KIN never infers routes, dates, relationships or history, and never verifies anything.
import type { OriginEntry } from "./origins-store";

export const STORIES_KEY = "kin.stories.v1";
export type StorySource = "recollection" | "family_story" | "documented";
export interface StoryStep {
  id: string;
  from: string;
  to: string;
  when: string;
  note: string;
  source: StorySource;
}
export interface Story {
  id: string;
  title: string;
  about: string;
  steps: StoryStep[];
  updatedAt: number;
}
export type StoryInput = Pick<Story, "title" | "about" | "steps">;
export const STORY_LIMITS = { title: 80, about: 60, place: 80, when: 40, note: 300, steps: 8 };
export const SOURCES: StorySource[] = ["recollection", "family_story", "documented"];
export const SOURCE_LABEL: Record<StorySource, string> = {
  recollection: "I remember this",
  family_story: "Family story",
  documented: "Documented (not verified by KIN)",
};
export const STORY_FOOTER = "Your words. Not verified by KIN.";

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export function validateStory(raw: Partial<Record<keyof StoryInput, unknown>>): StoryInput {
  const title = str(raw.title);
  const about = str(raw.about);
  if (!title || title.length > STORY_LIMITS.title) throw new Error("Title needs 1–80 characters.");
  if (about.length > STORY_LIMITS.about) throw new Error("“About” is too long.");
  const rawSteps = Array.isArray(raw.steps) ? raw.steps : [];
  if (rawSteps.length < 1 || rawSteps.length > STORY_LIMITS.steps)
    throw new Error("A story needs 1–8 steps.");
  const steps = rawSteps.map((s: Partial<Record<keyof StoryStep, unknown>>, i): StoryStep => {
    const step = {
      id: str(s?.id) || `s${i}`,
      from: str(s?.from),
      to: str(s?.to),
      when: str(s?.when),
      note: str(s?.note),
      source: s?.source as StorySource,
    };
    const n = i + 1;
    if (!step.from && !step.to) throw new Error(`Step ${n} needs a From or To place.`);
    if (step.from.length > STORY_LIMITS.place || step.to.length > STORY_LIMITS.place)
      throw new Error(`Step ${n}: place is too long.`);
    if (step.when.length > STORY_LIMITS.when) throw new Error(`Step ${n}: “when” is too long.`);
    if (step.note.length > STORY_LIMITS.note)
      throw new Error(`Step ${n}: note can be up to 300 characters.`);
    if (!SOURCES.includes(step.source)) throw new Error(`Step ${n}: choose where this comes from.`);
    return step;
  });
  return { title, about, steps };
}

type S = Pick<Storage, "getItem" | "setItem">;
export function loadStories(s: S): Story[] {
  try {
    const list = JSON.parse(s.getItem(STORIES_KEY) ?? "[]");
    if (!Array.isArray(list)) return [];
    return list.flatMap((e) => {
      try {
        return [{ id: String(e.id), updatedAt: Number(e.updatedAt) || 0, ...validateStory(e) }];
      } catch {
        return [];
      }
    });
  } catch {
    return [];
  }
}
const save = (s: S, list: Story[]) => (s.setItem(STORIES_KEY, JSON.stringify(list)), list);

/** Adds a new story, or replaces the one with this id. Step order is kept exactly as given. */
export function saveStory(s: S, input: Partial<StoryInput>, id?: string, now = Date.now()) {
  const v = validateStory(input);
  const list = loadStories(s);
  if (id && list.some((x) => x.id === id))
    return save(
      s,
      list.map((x) => (x.id === id ? { id, updatedAt: now, ...v } : x)),
    );
  return save(s, [...list, { id: id ?? `st-${now}`, updatedAt: now, ...v }]);
}
export function removeStory(s: S, id: string) {
  return save(
    s,
    loadStories(s).filter((x) => x.id !== id),
  );
}
/** Swap a step with its neighbour; returns a new array. */
export function moveStep<T>(steps: T[], i: number, dir: -1 | 1): T[] {
  const j = i + dir;
  if (j < 0 || j >= steps.length) return steps;
  const out = [...steps];
  [out[i], out[j]] = [out[j] as T, out[i] as T];
  return out;
}
/** Places typed in a story that are not yet in My Origins. Only used when the user opts in. */
export function newPlacesFrom(story: StoryInput, origins: OriginEntry[]) {
  const have = new Set(origins.map((o) => o.place.toLocaleLowerCase()));
  const out: string[] = [];
  for (const st of story.steps)
    for (const p of [st.from, st.to]) {
      const k = p.toLocaleLowerCase();
      if (p && !have.has(k)) {
        have.add(k);
        out.push(p);
      }
    }
  return out;
}