export type Preferences = {
  discovery: boolean;
  location: boolean;
  notifications: boolean;
  ancestry: boolean;
  consent: boolean;
};

export const initialPreferences: Preferences = {
  discovery: true,
  location: true,
  notifications: true,
  ancestry: true,
  consent: true,
};

/** Discovery runs only while visibility, approximate demo location and synthetic signals are all on. */
export function isDiscoveryActive(p: Preferences) {
  return p.discovery && p.location && p.ancestry;
}

/** A reveal can start only when discovery is active and the user allows connection requests. */
export function canRequestReveal(p: Preferences) {
  return isDiscoveryActive(p) && p.consent;
}