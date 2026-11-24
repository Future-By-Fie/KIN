# KIN — Product and Engineering Roadmap

This roadmap describes intended sequencing, not completed functionality or a delivery commitment.

## Current baseline — six-day prototype

The active repository-root application is aligned with the six-day Lovable sprint completed on 6 November 2026. It demonstrates the origin-first direction, including My Origins, Origin Map and migration-story experiences, optional DNA concept screens and secondary social-discovery flows.

Some user-entered origin/story information is stored locally in the browser. Some social interactions use synthetic fixtures and simulated state. This is a clickable frontend prototype, not a production service.

The earlier Radar-first implementation under `demo/lovable-mvp/` is retained for historical reference and is not the active development target.

## Next development focus — strengthen the core journey

1. Walk through the complete first-time journey: welcome → My Origins → Origin Map → Migration Stories → My Family Story.
2. Identify confusing, incomplete or placeholder states in that journey before adding new features.
3. Improve source/provenance clarity: user-reported, documented and DNA-derived information must remain distinct.
4. Review map behaviour, place matching, empty states and accessibility.
5. Add or improve end-to-end coverage for the primary origin journey and consent boundaries.
6. Keep Radar secondary; do not expand it at the expense of the core origin experience.

## Then — validate the product

- Test whether users understand the value of KIN without a DNA test.
- Validate whether the map and stories make personal origins easier to explore.
- Test whether users understand the difference between personal stories, sourced records and estimates.
- Gather feedback on the optional social-discovery concept and its privacy expectations.
- Review competitor positioning and the differentiation hypothesis before making novelty or market claims.

## Later — technical foundation for a real service

Before moving beyond a frontend prototype:
1. Agree the domain model and API contracts.
2. Design account lifecycle, authentication and durable storage.
3. Enforce consent, reveal, blocking, deletion and rate limits server-side.
4. Define moderation, abuse response, audit and operational monitoring.
5. Complete privacy impact, security and legal review before processing real genetic or precise-location data.
6. Add end-to-end tests, monitoring, backups and incident response.

## Optional DNA enrichment

Keep DNA provider-neutral and optional. No provider integration is currently connected. Any provider relationship requires verified technical access, explicit user consent and a direct agreement. Do not assume an API, SDK, partnership or commercial arrangement.

## Secondary social discovery — KIN Radar

Retain Radar as a playful, opt-in extra. Proximity is not proof of kinship. Real location matching, identity reveal and contact require a carefully designed privacy and safety model; current demo interactions are not production controls.

## Validation gates

- Users understand the value of KIN without a DNA test.
- The primary origin journey is coherent and usable on mobile.
- Users can distinguish their own stories, documented sources and estimates.
- Consent and privacy expectations are understood and testable.
- The product has a reviewed threat model and credible backend/security plan before any real-world pilot.
