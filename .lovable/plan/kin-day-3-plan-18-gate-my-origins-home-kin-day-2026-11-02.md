# KIN Day 3 plan: 18+ gate, My Origins home, KIN Day

The goal is one build turn of about 3–4 credits, with 1 credit kept in reserve for fixes.

## What I found in the code
- The age rules from Day 2 (`origins.ts`, `AgeBand`) still allow ages 13–17. They need to become 18+ only.
- Nothing saves today. Preferences live in `demo-context.tsx` memory and reset on reload.
- `/` is the landing page, `/enable` leads to `/discover` (Radar), and the bottom menu is Discover · Connections · Profile.
- There is no teal in `styles.css` yet; only charcoal and yellow. I'll add one muted teal token for the "Documented" badge only and change no other colours. If teal must not be added, say so.

## (a) Build order (one turn)
1. **18+ rules.** `AgeBand` becomes an attestation (`attested18: boolean`). Remove the under-18 branches, update the two Day 2 tests that use teen ages so they assert "not attested means blocked", and keep every other Day 2 test unchanged.
2. **Entry gate.** A new `/welcome` page asks "I am 18 or older" (checkbox plus a Continue button that stays disabled until checked) and offers "Leave". Leaving or not attesting shows a short "KIN is for adults" screen. No date of birth is collected. The attestation is saved in this browser. A `RequireAdult` wrapper in `__root.tsx` redirects every page except `/`, `/welcome`, `/privacy` and `/how-it-works` to `/welcome`. The redirect runs after the page loads, which avoids hydration mismatches.
3. **Origins store.** `src/lib/kin/origins-store.ts` keeps an in-browser list (`kin.origins.v1`) with add, update, remove and a check on what you type (place name 1–80 characters, story up to 500, provenance limited to `self_reported` or `documented`). DNA cannot be chosen. It sits behind the existing `src/lib/kin` adapter so a real API can replace it later.
4. **My Origins home (`/origins`).** Lists your places, each with a provenance badge: "You added this", or "Documented (not verified by KIN)". Add and Edit open the same sheet: place, region/country, optional era, a short story, and a provenance choice. Remove asks for confirmation. The empty state says nothing is shared. A permanent note reads: "Stored only in this browser. Not verified."
5. **Navigation.** The bottom menu becomes Origins · Connect · Profile. Connect points to the existing `/discover`, which stays reachable with its Day 2 consent rules. Landing "Find my KIN" now leads to `/welcome`, then `/origins`. The Wordmark and back links go to `/origins`.
6. **KIN Day (optional).** A dismissible card on `/origins`, plus a `/kin-day` page: "Your 18th birthday. Your first KIN day." It is a moment to reflect and an invitation to add a first origin. It changes no consent, Radar or visibility settings, and a test checks that.
7. **Docs.** Tick Day 3 in `roadmap.md` and add a short README note on the gate, the in-browser storage and its limits.

## (b) Credits, and what gets cut first
- Steps 1–5: about 2.5 credits. Steps 6–7: about 0.5. Check runs and fixes: about 1.
- If the budget runs short, cut in this order: the separate `/kin-day` page (keep only the card) → the Edit flow (keep add and remove) → README text. The gate and the persistent Origins list are never cut.

## (c) Files
- New: `src/routes/welcome.tsx`, `src/routes/origins.tsx`, `src/routes/kin-day.tsx`, `src/lib/kin/origins-store.ts`, `src/lib/kin/origins-store.test.ts`, `src/lib/kin/age-gate.ts`, `src/components/kin/origin-sheet.tsx`.
- Changed: `origins.ts`, `origins.test.ts`, `shell.tsx` (menu and links), `__root.tsx` (gate), `index.tsx` (CTA target), `enable.tsx` (redirect target), `styles.css` (teal token), `roadmap.md`, `README.md`.
- Unchanged: the match, reveal and chat screens and the service layer.

## (d) Tests and acceptance checks
Automated (vitest):
- Without the 18+ attestation, protected pages are blocked. With it, they are allowed. No date of birth field exists.
- Origins store: add, edit and remove persist across a simulated reload. Bad input is rejected. DNA provenance is rejected.
- User-reported entries never carry "verified" wording.
- KIN Day leaves the consents identical to the defaults (all off), and Radar stays off.
- All existing Day 2 tests still pass. The only changes are the teen cases updated to the 18+ rule.

Manual / Playwright at 390×844:
- Opening `/origins` directly sends you to `/welcome`. Attesting lands you on My Origins. After a reload you stay in.
- An origin can be added, edited and removed, and still shows after a reload.
- The KIN Day card can be dismissed and does not switch on Radar.
- `eslint .`, `vitest run` and `vite build` must all pass. Nothing is published or pushed.

## Open decisions (defaults used if you don't answer)
- Teal for the "Documented" badge only: yes.
- The 18+ attestation stays saved after reload, with a "Reset demo" option in Settings: yes.