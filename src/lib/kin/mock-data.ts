import type { KinMatch, User } from "./types";

export const currentUser: User = {
  id: "you",
  name: "Alex",
  initials: "A",
  bio: "A little curious. A little connected.",
  synthetic: true,
};
export const syntheticUsers: Record<string, User> = {
  maja: {
    id: "maja",
    name: "Maja L.",
    initials: "ML",
    bio: "Lund local. Coffee, long walks, and unexpected connections.",
    synthetic: true,
  },
  erik: {
    id: "erik",
    name: "Erik N.",
    initials: "EN",
    bio: "Always up for a good story.",
    synthetic: true,
  },
  sara: {
    id: "sara",
    name: "Sara K.",
    initials: "SK",
    bio: "Finding little things in common.",
    synthetic: true,
  },
  leo: {
    id: "leo",
    name: "Leo A.",
    initials: "LA",
    bio: "Collecting stories, not strangers.",
    synthetic: true,
  },
};
const signals = [
  {
    id: "place",
    label: "You both added roots here",
    description:
      "Each of you chose to share this origin place. This says nothing about being related.",
    synthetic: true as const,
  },
  {
    id: "era",
    label: "Overlapping time period",
    description: "Your self-reported family stories mention this place in a similar era.",
    synthetic: true as const,
  },
];
export const syntheticMatches: KinMatch[] = [
  { id: "maja", sharedOrigin: "Skåne, Sweden", signals, synthetic: true },
  { id: "erik", sharedOrigin: "Småland, Sweden", signals: signals.slice(0, 1), synthetic: true },
  { id: "sara", sharedOrigin: "Bergen, Norway", signals: signals.slice(0, 1), synthetic: true },
];