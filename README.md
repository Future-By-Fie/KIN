# KIN — Visual Origin Discovery & Social Connection

**Discover where you come from. Connect with where you belong.**

KIN is a mobile-first product concept exploring a more visual, accessible and social way to discover personal origins, family history and human connections.

KIN is not a conventional digital family tree. Its primary experience centres on origin discovery: personal origin maps, geography, migration stories and a personal family story. DNA can enrich the experience, but a DNA test is optional. Social discovery is opt-in, with **KIN Radar retained as a secondary feature**.

> **Product principle:** Origins give KIN substance. Radar gives KIN playfulness. DNA creates a strategic partnership opportunity.

## Product pillars

1. **Visual Origin Discovery (core):** My Origins, Interactive Origin Map, Migration Stories and My Family Story.
2. **DNA Discovery (optional):** a central enrichment and partnership path, without making DNA testing a requirement.
3. **Social Connection:** privacy-first discovery, user-controlled visibility and mutual consent. KIN Radar is a secondary, playful nearby-discovery feature.

## KIN Radar

Radar remains part of KIN. It is not the main product or homepage. It may help users discover potential KIN connections nearby, but proximity is not proof of family relationship. Identity disclosure and contact require mutual consent. Demo scores, distances, profiles and matches are synthetic and must never be represented as real.

## Partnership direction — no partnerships currently implied

KIN is designed to be provider-neutral and may explore future strategic discussions with:
- **MyHeritage** — family history, genealogy and DNA services.
- **Ancestry** — family history, genealogy and DNA services.
- **Snapchat** — a possible longer-term social / place-based discovery opportunity related to Radar.

These are prospective partners only. There are no confirmed partnerships, endorsements, APIs, SDKs, integrations, investments or development grants. Any provider integration or commercial arrangement requires direct agreement and verified technical access. A Snapchat reference must be clearly labelled as a future possibility, not an existing integration.

## Prototype status: v0.1

This repository currently documents an exploratory clickable proof of concept centred on consent-first nearby discovery. It uses synthetic data. It is not a production app and does not provide real DNA analysis, verified relatives, real location matching, production authentication, server-enforced consent or a production backend.

The existing prototype is a foundation to evolve. Preserve reusable Radar, consent/privacy flows, routes, components and tests while developing the new primary origin-discovery experience.

## Trust and privacy principles

- DNA is optional and requires explicit, informed consent.
- Do not store raw DNA files by default; investigate provider-mediated options.
- Distinguish user-reported origins, documented genealogy and DNA-derived estimates.
- No automatic public disclosure of identity, DNA results or family connections.
- Provide user-controlled visibility, consent withdrawal, blocking and reporting.
- Never imply that proximity, shared geography or an estimate proves biological kinship.
- Label all synthetic demo data clearly.
- Real genetic or location-based features require specialist privacy, security and legal review before launch.

## Development priorities

1. Build the visual origin-discovery core and a clear first-use journey.
2. Preserve and refine Radar as a secondary feature.
3. Design an optional, provider-neutral DNA discovery journey.
4. Improve privacy, consent and synthetic-data boundaries.
5. Validate the experience with users and prepare a credible partner proposition.

## Run the existing prototype

```sh
npm i
npm run dev
npm run lint
npm test
npm run build
```

## Collaboration & rights

This public repository is available for evaluation; it is **not currently offered under an open-source license**. We welcome thoughtful technical and strategic conversations. Contributions and reuse require prior written agreement. See [Collaboration & intellectual property](COLLABORATION.md) and [Build with us](https://www.future-by-fie.com/#partners).

*Future by Fie · Independent innovation studio · Malmö, Sweden*

## Partner presentation

[View the 10-slide KIN Partner Pitch](https://www.canva.com/d/5lCdTn56vRTGcV5) · [Read the partner brief](docs/partner-pitch.md) · [Open the current demo](https://id-preview--3f3b6825-eb35-41bb-87e2-874a0e652f85.lovable.app)

The presentation introduces the concept and partnership opportunity. The linked prototype is an early frontend-only demo using local browser storage and demo/user-entered content; it is not a production service and does not include live DNA analysis, verified genealogy, live matching or partner integrations.
