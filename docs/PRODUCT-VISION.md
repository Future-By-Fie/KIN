# KIN — Master Product Vision

**Discover where you come from. Connect with where you belong.**

## Position

KIN is a mobile-first, visual and social discovery platform connecting personal origins, family history and human connection. It is not a conventional digital family tree or genealogy app with a younger visual skin.

**Discovery is the product.** DNA can enrich KIN, but it is never required.

## Product pillars

### 1. Visual Origin Discovery — the core
- **My Origins:** a personal view of origins and family background.
- **Origin Map:** an interactive geographic view of places connected to the user's story.
- **Migration Stories:** journeys and narratives across places and generations.
- **My Family Story:** a personal collection of family narratives, memories and sources.

Clearly distinguish user-reported information, documented records and estimates. Do not present an unverified story as fact.

### 2. DNA Discovery — optional enrichment

DNA is an optional enrichment path and potential partnership opportunity. KIN must work without a DNA test. Provider integrations require a negotiated agreement and verified technical access; no API, SDK or partnership is assumed. DNA-derived estimates must be clearly labelled and require explicit informed consent.

### 3. Social Connection — KIN Radar retained as secondary

KIN Radar is a playful add-on for discovering potential KIN connections. It is not the main product and must not define the core experience. Use user-controlled visibility and mutual consent before identity reveal or contact. Proximity, shared origins or probabilistic signals are not proof of kinship.

## Experience architecture

**Primary journey:** My Origins → Origin Map → Migration Stories → My Family Story → optional DNA Discovery.

**Secondary journey:** KIN Radar → Discover People → Connections → Privacy & Visibility.

The primary journey should provide value even when the user has no DNA test, no existing family-tree data and no nearby KIN users.

## Partner strategy

Potential partners—not confirmed partners:
- **MyHeritage:** family history, genealogy and DNA.
- **Ancestry:** family history, genealogy and DNA.
- **Snapchat:** possible future social/place-based interaction opportunity connected to Radar.

KIN aims to be a complementary experience layer. No partnership, endorsement, API access, SDK access, investment or integration is currently confirmed. Any partner reference in public materials must be framed as a possibility, not an existing relationship.

## Business model hypotheses

Potential models include provider referrals or affiliate arrangements, co-marketing, premium discovery/storytelling features and strategic co-development. Pricing, demand, partner willingness and unit economics remain unvalidated.

## Trust and privacy

- DNA is optional and requires explicit informed consent.
- Distinguish user-reported origins, documented genealogy and DNA-derived estimates.
- Do not store raw DNA files by default; investigate provider-mediated approaches.
- No automatic public exposure of identity, DNA or family connections.
- Provide user-controlled visibility, consent withdrawal, blocking and reporting.
- Never present proximity or an estimate as proof of biological relationship.
- Label synthetic demo data clearly.
- Real genetic or precise-location features require specialist privacy, security and legal review.

## Current development baseline

The active development baseline is the repository-root application, aligned with the six-day Lovable sprint completed on 6 November 2026. The earlier Radar-first prototype under `demo/lovable-mvp/` is retained for historical reference and is not the active product source of truth.

The current build is an exploratory frontend prototype. It uses demo/synthetic content and browser-local state in parts of the experience. It is not production-ready and does not provide production accounts, a production backend, real DNA analysis, verified genealogy, live kinship matching or server-enforced consent.

## Product principle

**Origins give KIN substance. Radar gives it playfulness. DNA creates a strategic partnership opportunity.**
