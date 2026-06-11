# Matinee Film Club — Working Notes

*The running business/ops doc. Updated as decisions land.*

## Revenue model
1. **Day one:** affiliate commission on chain tickets (Fandango/Atom via Impact).
2. **The moat:** direct ticket sales for independent theaters via Veezi + Stripe —
   club keeps a $1–2 convenience fee per ticket (undercut Fandango's, still out-earn affiliate pennies).
3. Long term: compete with Fandango on the matinee/indie niche they ignore.

## Setup checklist (do in this order)
| # | Task | Where | Status | Unlocks |
|---|---|---|---|---|
| 1 | MovieGlu evaluation key | **api-registration.movieglu.com** (form lives on the developer subdomain, easy to miss from their main site) | ☐ ~10 min | Real showtimes near members (filterable to pre-5PM). Eval tier: free, one country, small request quota — fine for building/demoing. Production is paid (custom pricing, "low prices for startups" — get a quote before launch) |
| 2 | Fandango affiliate application | impact.com | ☐ days to approve | Commission per chain ticket |
| 3 | Atom Tickets affiliate | Impact/CJ | ☐ | Second affiliate stream — A/B against Fandango |
| 4 | AMC vendor key request | developers.amctheatres.com | ☐ weeks, manual | AMC showtimes + ticket URLs |
| 5 | First indie theater partnership | shoe leather | ☐ | Veezi token → **direct sales** |
| 6 | Gracenote / Nielsen | enterprise sales | ☐ later, at scale | Full licensed market feed |

All credentials paste into **Settings → Integrations** in the app (browser-local).
Do NOT commit keys to this public repo. Affiliate IDs are safe to ship as defaults;
MovieGlu/AMC keys should stay per-browser or move behind a small proxy (build when needed).

## Business plumbing before real money
- [ ] LLC + business bank account
- [ ] Stripe account (handles PCI — we never touch card numbers). Checkout stub already in `src/data/checkout.ts`; activates with indie partner #1.
- [ ] Indie partner agreement template: per-ticket fee, settlement schedule, refund policy, who owns the customer record. The fee spread is the business.
- [ ] Swap placeholder partnerships inbox (`partners@matineefilm.club` in `src/data/providers.ts`) for a real one.

## Decisions log
- 2026-06: Letterboxd-style dark UI; TMDB as data backbone (shared public club key, regenerable).
- 2026-06: Letterboxd sign-in not possible publicly (API approval-gated; applied? ☐ apply at letterboxd.com/api-beta). CSV import shipped instead.
- 2026-06: All four data tiers + both affiliates scaffolded as placeholders; indie program featured in-app for relationship building.
- 2026-06: Design direction — "the app is a theater you walk through," mascot-led lobby. See `docs/ART-DIRECTION.md`.

## Open questions
- Mascot name/species final call (working name: **Reely**, the film-reel usher).
- Real partnerships inbox + business name on the pitch one-pager.
- Which city do we seed first? (Pick where the first 2–3 indie matinee houses are.)
