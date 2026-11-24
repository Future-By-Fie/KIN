# KIN — Implementation status

Last reviewed: 2026-11-06  
Scope: repository branch `backup/lovable-day6-2026-11-06`

This document separates the current prototype from the intended product. It is a handover snapshot, not a production-readiness certification.

## Product direction

The intended product is **origin discovery first**:

1. My Origins
2. Interactive Origin Map
3. Migration Stories
4. My Family Story
5. Optional DNA enrichment
6. KIN Radar as a secondary social-discovery feature

## Current prototype

The active app is the repository-root application. The clickable prototype contains origin-focused journeys and supporting demo experiences. Some screens use synthetic fixtures; some user-created origin content is stored locally in the browser.

The legacy `demo/lovable-mvp/` folder preserves an earlier Radar-first prototype and is not the current source of truth.

## Capability boundaries

| Capability | Current status |
|---|---|
| 18+ self-confirmation | Demo gate only; not age verification |
| My Origins | Frontend/local demo experience |
| Origin map | Prototype visualization; not a verified geographic record |
| Migration stories | User-entered/demo content; not independently verified |
| DNA discovery | Concept/UI only; no DNA analysis or provider integration |
| KIN Radar | Secondary demo feature; no production location matching |
| Matching | Synthetic/demo logic; not a real kinship inference engine |
| Consent and reveal | Demonstration flow; not server-enforced security |
| Chat | Demo interaction; not production messaging |
| Accounts/authentication | Not production implemented |
| Backend/database | No production backend |
| Moderation/block/report | Not a production enforcement or response service |

## Quality evidence

The final Lovable sprint reported passing tests, lint, type checking and production build for its tested project state. These are tool-reported results, not an independent verification of this GitHub branch. GitHub Actions is configured to run tests, lint and build for both the active root app and legacy demo; check the Actions tab for the result of the current commit.

## Critical work before production

- Design and implement authentication and account lifecycle.
- Define backend APIs and durable storage with access controls.
- Enforce consent, reveal, blocking and deletion on the server.
- Threat-model stalking, re-identification, sensitive kinship inference and abuse.
- Design moderation, reporting, audit and incident-response processes.
- Complete privacy impact, GDPR, security and legal reviews before processing genetic or precise location data.
- Add end-to-end tests and operational monitoring.
- Establish data provenance and distinguish user-reported, documented and inferred information.

## Handover recommendation

A new technical lead should first run the root app locally, review `src/lib/kin/`, map the key user journeys, run the CI checks and agree a backend/domain architecture before starting a large rewrite.
