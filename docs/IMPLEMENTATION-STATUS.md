# KIN — Implementation Status

Last reviewed: 2026-11-24  
Canonical development branch: `main`  
Baseline: six-day Lovable sprint completed 2026-11-06

This document separates the current prototype from the intended product. It is a handover snapshot, not a production-readiness certification.

## Product direction

The intended product is **origin discovery first**:

1. My Origins
2. Origin Map
3. Migration Stories
4. My Family Story
5. Optional DNA Discovery
6. KIN Radar as a secondary social-discovery feature

## Repository source of truth

The active application is the repository-root application. The directory `demo/lovable-mvp/` preserves an earlier Radar-first prototype and is not the current product source of truth. New development should target the root application on `main`, unless a task explicitly establishes another branch.

## Current prototype capabilities

The root application contains origin-focused journeys and supporting demo experiences. Some screens use synthetic fixtures; some user-created origin/story content is stored locally in the browser. Refer to the code and tests for the exact implementation of each screen.

| Capability | Current status |
|---|---|
| 18+ self-confirmation | Demo gate only; not age or identity verification |
| My Origins | Frontend/local demo experience |
| Origin Map | Prototype visualization; not a verified geographic record |
| Migration Stories | User-entered/demo content; not independently verified |
| My Family Story | Prototype/personal-story experience; not a verified family record |
| DNA Discovery | Concept/UI only; no DNA analysis or provider integration |
| KIN Radar | Secondary demo feature; no production location matching |
| Matching | Synthetic/demo logic; not a real kinship inference engine |
| Consent and reveal | Demonstration flow; not server-enforced security |
| Chat | Demo interaction; not production messaging |
| Accounts/authentication | Not production implemented |
| Backend/database | No production backend |
| Moderation/block/report | Not a production enforcement or response service |

## Quality and CI

GitHub Actions is configured to run tests, lint and build checks for both the active root application and the retained legacy demo. Check the Actions tab for the current commit's actual result. A green legacy-demo check does not replace a green active-app check.

The six-day sprint's reported checks and the subsequent GitHub CI configuration are evidence of a buildable prototype, not proof of production security, scalability, data integrity or readiness for real users.

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

A new technical contributor should first run the root app locally, review `src/lib/kin/`, map the primary user journey, run the CI checks and agree a backend/domain architecture before starting a large rewrite.
