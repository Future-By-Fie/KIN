# Developer guide

## Source of truth

The **active application is at the repository root** (`src/`, root `package.json`, root `bun.lock`). The directory `demo/lovable-mvp/` contains an earlier Radar-first prototype retained for reference. New product work should target the root application unless the project owner explicitly says otherwise.

## Requirements

- Git
- Bun (current 1.x release)
- A supported modern browser

Use the lockfile and frozen install to keep dependency resolution reproducible.

## First run

```bash
git clone https://github.com/Future-By-Fie/KIN.git
cd KIN
bun install --frozen-lockfile
bun run dev
```

Vite prints the local development URL in the terminal.

## Quality checks

Run these from the repository root:

```bash
bun run test
bun run lint
bun run build
```

CI runs the same checks for both the active root application and the retained legacy demo. A green legacy check does not replace a green active-app check.

## Where to look

| Location | Responsibility |
|---|---|
| `src/routes/` | Screen-level routes and page composition |
| `src/components/` | Reusable interface and product components |
| `src/lib/kin/` | KIN domain types, services, rules and tests |
| `src/lib/kin/mock-data.ts` | Synthetic demo fixtures |
| `src/lib/kin/service.ts` | Demo service boundary; future API seam |
| `src/lib/kin/discovery.ts` | Discovery/reveal rules |
| `src/test/` | Application-level tests |
| `docs/` | Product and engineering decisions |

Generated files (for example route-tree output) should generally be changed through their source configuration or route definitions, not edited manually.

## Working principles

- Keep the origin-discovery experience primary; Radar is secondary.
- DNA remains optional and provider-neutral.
- Never represent a user-entered story as verified genealogy.
- Never represent proximity, an estimate or a synthetic match as proof of kinship.
- Keep consent explicit and understandable.
- Do not add real DNA, precise location or identity data to the prototype.
- Keep demo data visibly synthetic.
- Prefer small, reviewable changes with tests.

## Current technical boundary

The prototype is frontend-led and uses local/demo state. It is not a production backend. Authentication, durable data storage, server-enforced authorization, real matching, moderation, audit logging, deletion workflows and production security remain future engineering work.

## Environment variables

No production service credentials or provider integrations are required for the current demo. If a future task introduces environment variables, document each variable, add safe placeholders to an example file and never commit real secrets.

## Troubleshooting

- If install fails, check the Bun version and rerun `bun install --frozen-lockfile`.
- If a route is missing, inspect the route file and generated route tree configuration.
- If tests fail, first determine whether the test targets the active root app or the legacy demo.
- Do not fix a failing check by weakening or deleting a meaningful test without documenting the reason.
