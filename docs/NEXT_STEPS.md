# Engineering review and next milestones

## Current boundary
KIN is a synthetic, consent-first family-discovery demonstration, not a DNA, geolocation, identity, or secure messaging service. Do not upload real genetic or family data.

## Review priorities
1. Trace the entire discovery -> mutual consent -> identity reveal path. Confirm the UI cannot bypass the consent policy.
2. Add negative tests for revoked consent, one-sided consent, blocked users, stale matches and state reset.
3. Check that mock identities cannot leak through search results, logs, URLs or error messages.
4. Verify lint, unit tests and production build from the actual application directory; record commands and results.
5. Document threat model: sensitive kinship inference, stalking, re-identification, minors and coercion.

## Before a real pilot
Server-enforced authorization, privacy impact assessment, verified consent, abuse reporting, data deletion, security review and independent legal review are required.

## Contributor starter task
Create a test matrix for consent transitions and implement one regression test per forbidden reveal scenario. Never use real DNA or personal data in tests.
