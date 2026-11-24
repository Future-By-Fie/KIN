# KIN — Current architecture

## Active application

The active application is the repository-root app:

- `src/routes/` — TanStack file-based routes and page composition.
- `src/components/` — shared UI and KIN-specific components.
- `src/lib/kin/` — domain types, local stores, demo services and tests.
- Root `package.json` and `bun.lock` — active app scripts and dependency lockfile.

`demo/lovable-mvp/` is an earlier Radar-first prototype retained for reference. It is not the active source of truth.

## Current data boundaries

### Origins and stories

- `origins-store.ts` stores user-entered origin places in browser `localStorage` under `kin.origins.v1`.
- `stories-store.ts` stores user-authored migration stories in browser `localStorage` under `kin.stories.v1`.
- User-entered or user-labelled documented information is not independently verified by KIN.
- The map uses a bundled list of known places and approximate coordinates; it is not a live geocoder or verified family-history map.

### DNA and provenance

- `origins.ts` defines provider-neutral domain types for self-reported, documented and DNA-estimate provenance, consent categories and an unavailable-provider interface.
- The DNA screen is explanatory UI only. No DNA provider, API, SDK, analysis or matching is connected.
- DNA must remain optional. Do not store raw genetic files by default.

### Social discovery

- `service.ts` and `mock-data.ts` provide synthetic discovery, consent/reveal and messaging behaviour.
- Demo state is in memory and/or browser-local state; it is not a production backend.
- Recipient consent is simulated. Block/report actions are local demo state, not server-enforced safety controls.
- Radar is secondary to the origin-discovery experience. Proximity is not proof of kinship.

## Important distinction

Client-side UI rules are useful for demonstrating a journey but are not security boundaries. A production implementation must enforce authentication, authorization, consent, reveal, blocking, deletion and rate limits on the server.

## Future production boundaries

A future architecture should separately consider:

1. Account and identity lifecycle.
2. Origin claims, provenance and source references.
3. Optional DNA-provider integration and explicit consent.
4. Discovery/matching signals and uncertainty.
5. Consent, reveal and revocation.
6. Messaging and moderation.
7. Audit, deletion, retention and user rights.

Avoid combining identity, precise location and sensitive ancestry data unless a documented product need requires it.
