# KIN — Engineering handover priorities

## First hour for a new developer

1. Read the root [README](../README.md), [Developer guide](DEVELOPER-GUIDE.md) and [Implementation status](IMPLEMENTATION-STATUS.md).
2. Run the active root application locally.
3. Run tests, lint and build from the repository root.
4. Review `src/lib/kin/` and trace My Origins, migration stories, DNA information and the secondary Radar flow.
5. Check GitHub Actions for the current branch and commit.

## First technical review

- Map browser-local data: `kin.origins.v1`, `kin.stories.v1`, age-gate and demo preferences.
- Trace provenance labels from input through storage and display.
- Review the consent/reveal flow and document which parts are simulated.
- Add negative tests for forbidden identity reveal, consent withdrawal and blocked users.
- Review map place matching: unknown places must not be guessed or silently geocoded.
- Check accessibility, responsive layout and error states.

## Suggested first contribution

Add an end-to-end test plan for the primary origin journey and implement the highest-value missing test using synthetic data only. Keep the scope small and document what the test does not cover.

## Before a real pilot

Production work requires, at minimum:

- Authentication, authorization and account lifecycle.
- Server-side consent, reveal, block, report and deletion enforcement.
- Secure backend and data-retention design.
- Moderation and abuse-response operations.
- Threat modelling for stalking, re-identification, coercion and sensitive kinship inference.
- Privacy impact, GDPR, legal and independent security review.
- End-to-end tests, monitoring, backups and incident response.

Do not use real DNA, identity, precise location or sensitive family data in this prototype or its tests.
