# KIN — UX Direction

## Product experience principle

**Discovery before identity. Origins first. Radar second.**

KIN should feel like an inviting personal discovery experience, not a genealogy database and not a nearby-people radar with ancestry-themed decoration. The first session must offer a meaningful experience even when the user has no DNA test, no existing family tree and no nearby matches.

## Primary journey — discover your origins

1. **Welcome / 18+ self-confirmation** — introduce KIN and explain the experience. The current gate is self-confirmation only; it is not age or identity verification.
2. **My Origins** — invite the user to add a place, region or family-origin detail that they know or want to explore.
3. **Origin Map** — turn entered origin places into a clear visual overview. Make it obvious which information is user-entered, documented or estimated.
4. **Migration Stories** — help the user explore or record how people and family stories connect places and generations. Never invent a migration route or present an estimate as fact.
5. **My Family Story** — give the user a personal place to bring together memories, narratives and sources.
6. **Optional DNA Discovery** — explain how DNA might enrich the picture, without making a test a prerequisite or implying a live provider integration.

## Secondary journey — social discovery

KIN Radar remains a playful, optional feature:
- Discover potential connections only when the user chooses to participate.
- Keep visibility and location controls understandable and user-controlled.
- Use approximate signals; do not expose another person's precise location.
- Require mutual consent before revealing identities or enabling contact.
- Clearly label all synthetic matches, distances and scores in the prototype.
- Never imply that proximity or a shared origin proves a family relationship.

## Information architecture

**Primary navigation:** My Origins · Origin Map · Migration Stories · My Family Story.

**Secondary navigation / features:** DNA Discovery · KIN Radar · Connections · Privacy & Visibility · Settings.

The exact navigation labels may evolve with usability testing, but the hierarchy must remain clear: origin discovery is the core; DNA is optional; Radar is secondary.

## Content and provenance language

Use clear labels such as:
- **Your information** — entered or described by the user.
- **Documented** — linked to a source or record, with the source visible.
- **Estimated** — inferred or approximate, with uncertainty explained.
- **Demo** — fictional example data used to demonstrate the interface.

Avoid unsupported labels such as “verified relative”, “DNA match” or “87% related” unless a real, validated method and appropriate evidence exist.

## Visual and interaction direction

Retain KIN's modern, mobile-first, visually engaging identity. Use maps, timelines, story cards and progressive disclosure to make complex origin information approachable. Prioritise readability, accessibility, clear empty states and a calm sense of discovery over decorative motion.

The social-discovery surfaces may feel more playful and immediate, but must not take over the primary experience or obscure privacy choices.

## Prototype boundary

The current UI demonstrates journeys; it does not establish production functionality. Browser-local state, synthetic people, simulated matching and demo consent are not production services or security controls. Design copy must not imply otherwise.
