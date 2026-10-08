import type { KinMatch, User } from './types';

export const currentUser: User = { id: 'you', name: 'Alex', initials: 'A', bio: 'A little curious. A little connected.', synthetic: true };
export const syntheticUsers: Record<string, User> = {
  maja: { id: 'maja', name: 'Maja L.', initials: 'ML', bio: 'Lund local. Coffee, long walks, and unexpected connections.', synthetic: true },
  erik: { id: 'erik', name: 'Erik N.', initials: 'EN', bio: 'Always up for a good story.', synthetic: true },
  sara: { id: 'sara', name: 'Sara K.', initials: 'SK', bio: 'Finding little things in common.', synthetic: true },
  leo: { id: 'leo', name: 'Leo A.', initials: 'LA', bio: 'Collecting stories, not strangers.', synthetic: true },
};
const signals = [
  { id: 'region', label: 'Shared regional roots', description: 'Fictional family histories overlap in the Skåne region of Sweden.', synthetic: true as const },
  { id: 'branch', label: 'Overlapping family branches', description: 'Two invented family-tree branches share a possible ancestor several generations back.', synthetic: true as const },
  { id: 'timeline', label: 'Compatible generation timeline', description: 'Synthetic generation dates suggest a possible extended-family connection. This is not genetic evidence.', synthetic: true as const },
];
export const syntheticMatches: KinMatch[] = [
  { id: 'maja', relationship: '2nd cousin', distance: '420 m', confidence: 87, signals, synthetic: true },
  { id: 'erik', relationship: '3rd cousin', distance: '780 m', confidence: 72, signals: signals.slice(0,2), synthetic: true },
  { id: 'sara', relationship: 'family connection', distance: '1.2 km', confidence: 64, signals: signals.slice(0,1), synthetic: true },
];