# KIN v0.2 — Day 1 audit and sprint plan

Audit only. No code has been changed.

## A. Executive audit

KIN v0.1 is a polished, client-only demo with one job: **Radar → anonymous match → mutual reveal → chat.** Every route, headline and data type assumes kinship is found by being near someone. That puts the v0.1 product proposition **directly against the locked vision**:

- The landing page (`src/routes/index.tsx`) shows the Radar art and the CTA "Find my KIN", which goes to `/enable` (location) and then `/discover` (Radar).
- `/discover` is effectively home. Its headline is "You just walked past your cousin." (`src/routes/discover.tsx`).
- The fixtures are made-up relationship claims tied to distance: "2nd cousin, 420 m, 87%" and others (`src/lib/kin/mock-data.ts` `syntheticMatches`). The vision forbids exactly this ("proximity does not imply kinship; no invented relationships, distances or percentages").
- None of pillar 1 exists: no My Origins, no origin map, no migration stories, no family story. Pillar 2 (DNA) also has no foundation: no provenance model and no consent model for sensitive data.

**Biggest gap:** the product's core (Visual Origin Discovery) does not exist, and the feature that should be secondary (Radar) is built on claims the vision bans.

**Correction to your brief:** the current look is **near-black charcoal with electric yellow** (`--background: oklch(0.13 0.003 110)`, `--primary: oklch(0.94 0.195 104)`) plus a teal `--signal`. It is not navy/lime. The navy values in the `.dark` block of `src/styles.css` are unused shadcn defaults.

## B. Functionality matrix

| Area | State | Evidence |
|---|---|---|
| Routing, 11 screens, noindex metadata | Works | `src/routes/*.tsx`, `pageHead()` in `src/lib/kin/queries.ts` |
| Data loading (loader + suspense query) | Works | `discover.tsx`, `queries.ts` |
| Preferences (discovery, location, ancestry, consent, notifications) | Works, session only | `src/components/kin/demo-context.tsx`, `src/lib/kin/discovery.ts` |
| Stop / resume discovery | Works (local) | `discover.tsx` `stopDiscovery` |
| Consent gate on identity | Works in client code only | `service.ts` `getRevealedConnection` requires both consents |
| Other person's consent | Simulated (timer) | `acceptConnection` + `reveal.$id.tsx` |
| Location | Simulated (hard-coded Lund; no permission requested) | `enable.tsx`, `radar.tsx` caption |
| Matches, relationships, distances, confidence | Synthetic and **invented kinship claims** | `mock-data.ts` |
| Ancestry "signals" | Synthetic text, no provenance type | `mock-data.ts` `signals` |
| Chat, quick replies, block, report | Local memory only; reset on reload; not enforced | `chat.$id.tsx`, `service.ts` `blockMatch`/`reportMatch` |
| Auth, database, persistence | Absent (no backend code; `src/server.ts` is only the SSR entry) | grep: no supabase/localStorage/fetch usage |
| Origins, map, migration stories, family story | Absent | — |
| DNA (upload, provider, consent) | Absent (correct for now) | — |
| Age gate / minors handling | Absent | — |
| Tests | 22 cases: service, safety, preference row, routing | `src/lib/kin/*.test.ts`, `src/components/kin/preference-row.test.tsx`, `src/test/app-routing.test.tsx` |

## C. Reuse / refactor / new

- **Reuse as is:** AppShell, Wordmark, PrivacyLine, DemoNote (`shell.tsx`); PreferenceRow; shadcn UI (46 components); design tokens; `pageHead`; the service-adapter pattern; consent and safety tests; the reveal animation; chat; block/report UI.
- **Refactor:**
  - `KinMatch`: drop `relationship`/`distance`/`confidence` and replace them with a "shared origin context" (for example, both people opted in to share roots in Skåne).
  - Radar copy: remove "walked past your cousin" and percentages.
  - Landing CTA and the onboarding order.
  - Bottom nav.
  - `Preferences`: split it into separate consent records.
  - `/enable`: move it to the Radar opt-in instead of onboarding.
- **New build:** origin/provenance types and service; Home ("My Origins"); Origin Map; Migration Story; Family Story (user-entered); DNA placeholder page with no data; consent centre; age gate.
- **Debt:**
  - The 7 fast-refresh lint warnings.
  - Mixed `discovery` / `location` / `ancestry` flags with unclear meaning.
  - Hard-coded "A" avatar in `shell.tsx`.
  - Unused `.dark` theme.
  - README and AGENTS.md describe the v0.1 proposition.

## D. v0.2 experience and navigation

Bottom nav: **Origins · Map · Stories · Connect**. Profile and Settings move to the header.

```text
/            Landing: "Discover where you come from. Connect with where you belong."
/start       Onboarding: age check -> add your roots (self-reported) -> optional skips
/origins     HOME: My Origins (places, eras, provenance badges, demo label)
/map         Interactive Origin Map (stylised SVG of regions, no map provider)
/stories     Migration Stories list -> /stories/$id (timeline journey)
/family      My Family Story (user-entered people and events, provenance per item)
/dna         DNA: "optional, coming with partners" explainer + consent preview; no upload
/connect     Radar (opt-in) -> existing match/reveal/chat flow, retitled
/privacy     Consent centre: separate, revocable toggles per data category
/settings, /profile, /how-it-works  (updated copy)
```

Radar can only be reached through Connect and needs its own opt-in. It is not part of onboarding.

## E. Architecture and data model

Keep `src/lib/kin` as a provider-neutral adapter. Add `origins.ts` (types), `origins-service.ts`, and `origins-fixtures.ts` (labelled demo). Map rendering stays a pure SVG component (no paid map SDK).

```text
Provenance = "self_reported" | "documented" | "dna_estimate"
OriginPlace { id, name, region, country, coords(approx), synthetic }
OriginClaim { id, placeId, era?, provenance, source?, confidence?: "low"|"medium"|"high" (dna only, range text), synthetic }
Person (family story) { id, displayName, relation (user-entered), events[] }
MigrationStory { id, title, legs: { fromPlaceId, toPlaceId, period, provenance, note }[] }
ConsentRecord { category: "origins_profile"|"radar_visibility"|"dna_processing"|"dna_matching"|"contact", granted, updatedAt }
DnaProvider (interface only) { id, kind: "partner_api"|"raw_file", status: "not_available" }
```

Rules (one test each):
- DNA claims never render as fact; they always show "estimate".
- A `dna_estimate` claim cannot exist without `dna_processing` consent.
- Withdrawing consent hides the derived data.
- Radar returns nothing unless `radar_visibility` is granted.
- Identity requires mutual consent (keep the existing rule).
- No ethnicity labels; places and eras only.

There is still no database or auth in v0.2. Lovable Cloud would be a later decision.

## F. Risk register

**Must fix before any pilot:**
1. Remove the invented relationship, distance and percentage claims (`mock-data.ts`, radar, match cards).
2. Age gate. Under 18: block DNA and Radar, with guardian-consent wording flagged for legal review.
3. Separate, withdrawable consents per category, especially DNA processing vs DNA matching vs Radar.
4. A provenance badge on every origin item; DNA shown only as a labelled estimate.
5. No partner names or logos anywhere in the UI. Partners appear only in internal docs as hypotheses.
6. Server-side enforcement of consent and blocks before any real users. Today it is client-only.
7. A demo-data label on every synthetic screen (keep `DemoNote`).

**Later:**
- Real moderation pipeline and audit log.
- GDPR Art. 9 DPIA.
- Raw-file handling policy (prefer not to store).
- Real location handling with coarse buckets.
- Account deletion and export.
- Accessibility audit of the map (keyboard/list alternative is required from day 1).

## G. Six-day plan (about 30 credits, 6 held in reserve)

| Day | Work | Credits | Acceptance / demo outcome |
|---|---|---|---|
| 1 | This audit | ~1 | Plan approved |
| 2 | Origins data model + service + provenance/consent rules + tests; strip kinship claims from Radar fixtures/copy | 5 | Tests pass for the 6 rules; no "cousin/%/m" claims anywhere (grep test) |
| 3 | New nav, landing tagline, onboarding (age check, self-reported roots), `/origins` home with provenance badges | 6 | First screen after onboarding is My Origins; Radar is not in onboarding |
| 4 | `/map` SVG origin map with a keyboard-accessible list alternative; `/stories` + story timeline | 6 | Tapping a region shows its claims; the story shows legs with provenance; works at 390px |
| 5 | `/family` (add people/events locally), `/dna` explainer, consent centre rewrite | 4 | DNA screen shows no data and no partner branding; withdrawing consent hides data |
| 6 | Radar moved under Connect with its own opt-in; README/AGENTS update; lint/test/build; mobile walkthrough | 2 | Full journey clickable; checks pass and are reported |
| — | Reserve | 6 | Fixes |

**Not in this sprint:** auth/database, DNA upload or parsing, provider APIs, real geolocation, map SDKs, AI-generated stories, a genealogy/tree engine, real messaging, publishing.

## H. Open decisions

1. Minimum age: 13+ with DNA/Radar locked under 18, or 18+ only?
2. Keep the Radar → reveal → chat flow intact under Connect, or simplify it?
3. Visual palette: keep charcoal/yellow (current), or move to the navy/lime you described?
4. Demo persona and regions for the fixtures (suggest Skåne → Minnesota emigration plus one other route, all fictional)?
5. Should onboarding-entered roots persist across reload (localStorage), or stay session-only as today?

**Recommended first step (Day 2):** add the provenance and consent data model with its rule tests, and remove the invented relationship/distance/percentage claims from the Radar data and copy. No screen redesign yet.