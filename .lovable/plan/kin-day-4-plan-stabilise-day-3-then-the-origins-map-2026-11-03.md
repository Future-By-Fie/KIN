# KIN Day 4 plan: stabilise Day 3, then the Origins map

Budget: 4 build credits. Credit 1 is for stabilising and checking. Credits 2–3 are the Origins map. Credit 4 is held back for fixes and the final checks.

## 1. Diagnosis (from the current source)

**Type error (confirmed).** `tsconfig.json` sets `noUncheckedIndexedAccess: true`, so `loadOrigins(s)[0]` has the type `OriginEntry | undefined`, and `.place` on line 36 of `origins-store.test.ts` fails the type check. Fix: `expect(loadOrigins(s)[0]?.place).toBe("Lund")`. This changes nothing at runtime.

**Continue stays disabled (not confirmed yet).** The wiring in the source looks right: `welcome.tsx` uses a `<label htmlFor={id}>` that wraps the Radix `Checkbox id={id}`, with `onCheckedChange={(v) => setChecked(v === true)}`, and the Checkbox passes its props through. Clicking the label sends one click to the Radix button, so it should not toggle twice. The most likely cause is that the browser script clicked before the page had hydrated. The page is server-rendered, so the checkbox shows up before React attaches its click handler. Either the click was lost, or the script read the button's state too early. A second possible cause is a label that wraps a control and also names it with `htmlFor`, which could toggle the box twice in some browsers.
Step 1 is to reproduce the problem in Playwright: wait for hydration, then click the checkbox itself, then click the label text, and record `aria-checked` and `disabled` after each click. Only after that will I change any code. If the label is the cause, I'll drop the `htmlFor` and keep the wrapping label. If the cause is hydration timing, I'll only change the test script, unless a real user could also hit the problem.

**A gap I found:** Settings "Reset demo" only calls `resetDemo()`, which resets the demo connections. The 18+ confirmation (`kin.attested18.v1`), the saved origins (`kin.origins.v1`) and the KIN Day dismissal all stay. The Day 3 plan promised a full reset.

## 2. Stabilisation (credit 1)
1. Make the one-line type fix.
2. Reproduce the Continue problem and fix it as described above.
3. Make "Reset demo" also clear the 18+ confirmation, saved origins and KIN Day dismissal, then return to `/welcome`. Add a `resetLocalDemo(storage)` helper next to `age-gate.ts`, with a unit test.
4. Browser checklist at 390×844, with screenshots:
   - Opening `/origins` directly sends you to `/welcome`.
   - Tick the box and Continue becomes active. Untick it and Continue goes back to disabled.
   - Continue takes you to `/origins`. After a reload you are still on `/origins`.
   - Add an origin, edit it, reload, and it is still there. Remove it, confirm, reload, and it is gone.
   - A blank place shows an error and nothing is saved.
   - Dismiss the KIN Day card and it stays dismissed after a reload. `/kin-day` does not turn on Radar.
   - "I'm under 18 — leave" shows the adults-only screen and saves nothing.
   - Settings → Reset demo, then `/origins` sends you back to `/welcome` and the list is empty.
   - The console shows no errors.

## 3. The product step: Origins map (credits 2–3)
This turns My Origins into a visual picture of where your story comes from, using only the places you entered yourself.

- **Map view** at the top of `/origins`, with a toggle between Map and List. The map is a stylised SVG, not a real map tile service. It uses a small, fixed, bundled list of about 60 regions and countries with rough coordinates (for example Skåne, Sweden; Norway; Punjab, India). It is not a geocoding service and makes no network calls.
- Each origin shows as a glowing point. Yellow means "You added this". The muted signal colour means "Documented (not verified by KIN)". Places that aren't on the list go into a "Not on the map" row. KIN never guesses where they are.
- **Journey line:** if origins have an era, you can switch on "Show as a journey". This draws thin lines between your places in the order of their era, labelled "Your order, not verified". Origins without an era are left out of the line.
- Tapping a point opens that origin's card, with Edit and Remove.
- The place field suggests names from the fixed list, but you can still type anything.
- If you have no origins yet, you see an empty map with "Add your first place", plus a note that nothing is shared.
- With reduced motion turned on, the points don't pulse.
- Nothing is invented. No relationships, matches, percentages or "verified" wording.

## 4. Files likely to change
- New: `src/lib/kin/places.ts` (the fixed region list plus `locate(place, country)`), `src/lib/kin/places.test.ts`, `src/components/kin/origins-map.tsx`.
- Changed: `src/lib/kin/origins-store.test.ts`, `src/routes/welcome.tsx` (only if the cause is proven), `src/routes/settings.tsx`, `src/lib/kin/age-gate.ts`, `src/routes/origins.tsx`, `src/styles.css` (point and line styles, no new colours), `roadmap.md`, `README.md`.
- Unchanged: Radar, match, reveal, chat, the service layer, and the Day 2 consent rules.

## 5. Acceptance criteria
- The type check is clean. `vitest run` passes all 28 existing tests plus the new ones. `eslint .` shows 0 errors. `vite build` succeeds.
- Tests: `locate` returns nothing for unknown places, so KIN never guesses. The journey order is by era and leaves out origins without one. Reset clears all three saved items. Map labels never say "verified".
- Everything in the browser checklist passes, plus: an added origin shows as a point on the map and stays after a reload.

## 6. Risks
- If the Continue problem is not the hydration timing, finding the cause could take more of credit 1.
- The SVG map has to stay readable on a 390 px wide screen. Labels need to stay short, and points that overlap need a small offset.
- Users may read the era order as a fact, so the journey line keeps the "Your order, not verified" label.

## 7. Cut order if over budget
Journey line → place suggestions → Map/List toggle (show the map above the list instead). Stabilisation and the basic map are never cut.

## 8. Deferred
Migration stories (moved to Day 5), real map tiles or geocoding, a DNA explainer, the consent centre, moving Radar under Connect, a backend, accounts, app packaging, any GitHub changes.