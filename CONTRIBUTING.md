# Contributing to KIN

Thank you for your interest in KIN. We welcome thoughtful product feedback, technical reviews and collaboration proposals.

## Before you start

This repository is public for evaluation but is **not currently open source** and has no permissive open-source license. Do not assume that public access grants rights to reuse, redistribute or commercially exploit the code.

Before investing substantial time or submitting significant code, contact the project owner to agree on scope, contribution terms, attribution and intellectual-property ownership. A pull request alone does not create an agreement or transfer rights.

## Good ways to help

- Review the current prototype and identify confusing or fragile flows.
- Suggest improvements to accessibility, mobile usability and performance.
- Review consent, privacy and safety boundaries.
- Add or improve tests using synthetic data only.
- Propose architecture for a future backend without introducing unapproved providers or services.
- Help distinguish implemented functionality from roadmap ideas.

## Development setup

The active application is at the repository root. See [the Developer guide](docs/DEVELOPER-GUIDE.md).

```bash
bun install --frozen-lockfile
bun run dev
bun run test
bun run lint
bun run build
```

The earlier Radar-first prototype in `demo/lovable-mvp/` is retained for reference; do not treat it as the active application.

## Pull request expectations

For an agreed contribution:

1. Keep the change focused and explain the user or engineering problem.
2. Include tests for changed behaviour where practical.
3. Use synthetic fixtures; never add real personal, genetic or family data.
4. Do not add secrets, API keys, credentials or private user data.
5. Update documentation when behaviour, setup or limitations change.
6. State what you tested and include any known limitations.
7. Do not claim a prototype feature is production-secure or production-ready.

## Reporting a security or privacy concern

Do not publish exploitable details or sensitive data in a public issue. Contact the project owner privately and include only the minimum information needed to understand the concern.
