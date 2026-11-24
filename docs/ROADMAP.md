# KIN — Product and engineering roadmap

This roadmap describes intended sequencing, not completed functionality or a delivery commitment.

## Current baseline — clickable prototype

The active repository-root app demonstrates the origin-first direction, including My Origins, map and migration-story experiences, optional DNA concept screens and secondary social-discovery flows. User-entered origin/story data is stored locally in the browser. Some social interactions use synthetic fixtures and simulated state.

The older Radar-first implementation is retained under `demo/lovable-mvp/` for reference.

## Next — make the core experience credible

1. Validate My Origins and migration-story journeys with adult users.
2. Improve source/provenance clarity: user-reported, documented and DNA-derived must remain distinct.
3. Review map behaviour, place matching and accessibility.
4. Add end-to-end tests for the key origin and consent journeys.
5. Remove ambiguity between demo state, local user content and future service capabilities.

## Then — technical foundation

1. Agree domain model and API contracts before implementing a production backend.
2. Design account lifecycle, authentication and durable storage.
3. Enforce consent, reveal, blocking, deletion and rate limits server-side.
4. Define moderation, abuse response, audit and operational monitoring.
5. Complete privacy impact, security and legal review before real genetic or precise location data is processed.

## Optional DNA enrichment

Design provider-neutral flows. DNA is optional for users and no provider integration is currently connected. Any provider relationship requires verified technical access and a direct agreement. Do not assume an API, SDK, partnership or commercial arrangement.

## Secondary social discovery — KIN Radar

Retain Radar as a playful, opt-in extra. Proximity is not proof of kinship. Real location matching, identity reveal and contact require a carefully designed privacy and safety model; demo interactions are not production controls.

## Validation gates

- Users understand the value of KIN without a DNA test.
- Users can distinguish their own stories, documented sources and estimates.
- The origin journey is usable on mobile and accessible.
- Consent and privacy expectations are understood and testable.
- The product has a reviewed threat model and credible backend/security plan before any real-world pilot.
