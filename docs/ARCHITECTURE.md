# KIN — Architecture

## Prototype

The clickable MVP is a mobile-first React/TypeScript/Tailwind experience built in Lovable, using synthetic local data and an API-ready structure.

## Core entities

- **User** — identity, approximate location, profile and privacy settings.
- **KinMatch** — possible relationship, distance band, connection confidence and status.
- **RelationshipSignal** — synthetic reason a connection is considered possible.
- **ConnectionRequest** — sender, recipient, consent and reveal state.
- **Message** — conversation, sender, content and timestamp.

## Mock service boundary

The prototype is structured around functions equivalent to `getCurrentUser()`, `getNearbyKin()`, `getKinMatch()`, `requestConnection()`, `acceptConnection()` and `sendMessage()`.

## Future boundaries

A production implementation should separate identity, location, relationship/ancestry signals, matching, consent, reveal and messaging. Avoid unnecessary combinations of identity, precise location and sensitive ancestry data.

## Prototype boundary

No real DNA provider, ancestry database or biological matching is used. A production implementation would require substantial privacy, security, legal and safety work.
