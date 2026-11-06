# KIN

**Discover where you come from. Connect with where you belong.**

KIN is a mobile-first product concept exploring a more visual, accessible and social way to discover personal origins, family history and meaningful human connections.

KIN is not a conventional digital family tree. The product direction is **origin discovery first**: personal origins, maps, migration stories and a personal family story. DNA is an optional enrichment path. KIN Radar remains a playful, secondary social-discovery feature.

> **Origins give KIN substance. Radar gives it playfulness. DNA creates a strategic partnership opportunity.**

<p align="center">
  <a href="https://id-preview--3f3b6825-eb35-41bb-87e2-874a0e652f85.lovable.app"><strong>Open the live prototype</strong></a>
  ·
  <a href="docs/PRODUCT-VISION.md">Product vision</a>
  ·
  <a href="docs/IMPLEMENTATION-STATUS.md">Implementation status</a>
  ·
  <a href="docs/DEVELOPER-GUIDE.md">Developer guide</a>
</p>

## At a glance

| Area | Direction |
|---|---|
| Core experience | Visual origin discovery |
| Key experiences | My Origins, Origin Map, Migration Stories |
| DNA | Optional, provider-neutral enrichment |
| Social | Consent-first connection; Radar is secondary |
| Current maturity | Clickable prototype / proof of concept |
| Production status | **Not production-ready** |

## Try KIN

**Live demo:** [Open KIN](https://id-preview--3f3b6825-eb35-41bb-87e2-874a0e652f85.lovable.app)

The prototype is intended for product exploration and feedback. Use fictional/demo information only. Do not enter real genetic, medical, identity or sensitive family data.

## What is implemented

The active application at the repository root includes the current origin-first direction and prototype journeys for:

- 18+ self-confirmation gate (not identity or age verification).
- My Origins and user-entered origin information.
- Origin map and migration-story experiences.
- Optional DNA discovery concept screens (not a DNA integration).
- Secondary Radar/discovery, consent/reveal and chat demo flows.
- Local demo state and automated unit/component tests.

The repository also contains `demo/lovable-mvp/`, an earlier Radar-first prototype retained for historical comparison. **The repository-root application is the active development target.** The legacy demo is not the product source of truth.

## Important: prototype limitations

This is an exploratory frontend prototype, not a production service. Depending on the feature, data is synthetic, user-entered or stored locally in the browser. It does not provide:

- Real DNA analysis, verified genealogy or biological kinship inference.
- Confirmed partnerships, provider APIs, SDKs or live DNA integrations.
- Production user accounts, authentication or a production backend.
- Secure server-side consent enforcement or a production matching engine.
- Real-time location matching, identity verification or production moderation.
- A production-grade privacy, security or legal framework.

A visual match, shared place, estimate or proximity must never be interpreted as proof of family relationship.

## Technology

The active application uses:

- React 19 and TypeScript
- TanStack Start / TanStack Router
- Vite
- Tailwind CSS
- Vitest and Testing Library

The exact dependency versions and scripts are defined in the root `package.json` and `bun.lock`.

## Run locally

Requirements: Git and [Bun](https://bun.sh/) (use a current Bun 1.x release).

```bash
git clone https://github.com/Future-By-Fie/KIN.git
cd KIN

# The active application is at the repository root.
bun install --frozen-lockfile
bun run dev
```

Then open the local URL printed by Vite.

Useful checks:

```bash
bun run test
bun run lint
bun run build
```

For setup details, repository layout and troubleshooting, see the [Developer guide](docs/DEVELOPER-GUIDE.md).

## Repository map

```text
KIN/
├── .github/                 # CI and contribution templates
├── docs/                    # Product, architecture and engineering notes
├── src/
│   ├── components/          # Shared and product UI
│   ├── lib/kin/              # Domain logic, demo services and tests
│   └── routes/               # TanStack file-based routes
├── public/                  # Static assets
├── demo/lovable-mvp/        # Earlier Radar-first prototype (legacy)
├── package.json
└── bun.lock
```

## Product and engineering documentation

- [Product vision](docs/PRODUCT-VISION.md) — what KIN is intended to become.
- [Implementation status](docs/IMPLEMENTATION-STATUS.md) — what exists today vs. what remains.
- [Developer guide](docs/DEVELOPER-GUIDE.md) — setup, scripts and code orientation.
- [Architecture](docs/ARCHITECTURE.md) — current technical boundaries and future seams.
- [Roadmap](docs/ROADMAP.md) — proposed product sequence, not a delivery promise.
- [Privacy principles](docs/PRIVACY.md) — principles and known prototype limitations.
- [Next engineering steps](docs/NEXT_STEPS.md) — concrete technical review priorities.

## Partnership direction

KIN may explore future discussions with companies in genealogy, DNA and social technology, including MyHeritage, Ancestry and Snapchat. These are **prospective ideas only**. No partnership, endorsement, investment, API access, SDK access or integration is currently implied or claimed.

## Contributing and project rights

This repository is public for product and technical evaluation, but **it is not currently distributed under an open-source license**. Public visibility does not grant permission to reuse, redistribute or commercially exploit the code. If you are interested in contributing, collaborating or helping take KIN further, please read [CONTRIBUTING.md](CONTRIBUTING.md) and contact the project owner before submitting substantial work.

KIN is an independent project by **Future by Fie**, Malmö, Sweden.

---

*The demo is a conversation starter, not a claim of production readiness. We welcome thoughtful engineering feedback, product critique and collaboration proposals.*
