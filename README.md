# KIN v0.1 — "Discovery before identity" (prototype)

KIN is a **clickable proof of concept**, not a production app. It demonstrates a
consent-first way to discover *possible* family connections nearby, where identities
stay hidden until both sides opt in.

**Everything is synthetic.** There is no real DNA analysis, no real relatives, no
device location, no identity verification, no secure matching, no accounts and no
backend. "Lund, Sweden", distances and "connection confidence" are fictional values.

## Run

```sh
npm i
npm run dev     # local dev server
npm run lint    # ESLint + Prettier
npm test        # Vitest (unit + component tests)
npm run build   # production build
```

## Architecture

- **TanStack Start + React 19**, file routes in `src/routes` (one route per screen,
  each with `noindex` metadata).
- **`src/lib/kin/service.ts`** — typed, in-memory demo adapter. All fixtures
  (`mock-data.ts`), matching, consent, messages and block/report state live here so a
  real API can replace it without touching screens. State lives in the browser tab
  only and resets on reload.
- **`src/lib/kin/discovery.ts`** — pure rules for when discovery/reveal is allowed.
- **`src/components/kin/demo-context.tsx`** — session-only preferences (discovery on/off,
  consent) in React context.

## Implemented

- Onboarding → enable (simulated location, no permission requested) → radar → match
  detail → mutual-consent reveal (other side's consent is simulated) → chat.
- Identity-returning methods require both consents; discovery methods never return
  names. Hidden identities are simply not rendered — no blur is used, and nothing in
  the UI should be read as protecting underlying data.
- "Stop discovery" on the radar; privacy and settings toggles; demo reset.
- Block and Report in chat are **local UI state only** — not enforced or sent anywhere.
- Message input is trimmed and length-limited; ids are validated; no raw HTML rendering;
  no secrets in client code.

## Limitations

No persistence, auth, server-side consent enforcement, moderation, real location or
real kinship inference. Consent from the other person is faked with a timer.

## Next steps

1. Define a server API matching `service.ts` and enforce consent/blocks server-side.
2. Add accounts, abuse reporting with a real moderation path, and audit logging.
3. Privacy/legal review (GDPR, special-category data) before any real ancestry or
   location data is considered.
4. End-to-end tests (Playwright) for the full journey.