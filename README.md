# 🎞️ Matinee Film Club

*Daylight cinema, collected.* A media hub for film and theater maxis that rolls five app ideas into one sunlit clubhouse:

| Inspiration | What it became here |
|---|---|
| Paradiso Cinemas | **Matinee Ticket Portal** — four partner houses, showtimes that all end before 5 PM, a seat picker, and matinee pricing |
| FilmedUp | **Card Binder** — every watch, ticket, and puzzle win drops a collector card; four rarity tiers, duplicate "shine" counts, and point-bought packs |
| Queue | **Discover** — search and filter films *and* filmed stage shows, see where they stream, build a queue, and log watches |
| Framed (framed.wtf) | **Six Frames** — a daily guess-the-film puzzle; each wrong guess reveals the next stylized frame |
| Scrambly | **Watch to Earn** — reel points for tickets bought in the portal, uploaded ticket stubs, logged watches, puzzle wins, and check-in streaks; redeem for popcorn, discounts, and a private screening hour |

Stage is a first-class citizen: the catalog mixes classic films with filmed theater (NT Live, Broadway captures), and The Gilded Curtain screens stage-on-screen exclusively.

## The reel points economy

| Action | Points |
|---|---|
| Buy a matinee ticket in the portal | +200 (plus the film's card) |
| Upload a ticket stub | +150 |
| Log a watch from your queue | +50 (plus the film's card) |
| Win the daily Six Frames | +100, −10 per extra guess (plus the card) |
| Daily check-in streak | +10 × streak day |
| Matinee Pack (3 random cards) | −500 |

## Running it

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build
npm run preview  # serve the production build
```

No backend, no accounts: state lives in `localStorage`, the daily program and puzzle rotate deterministically by date, and the "stills" in Six Frames are CSS-rendered scenes, so no copyrighted imagery ships with the app.

## Layout

```
src/
  data/        catalog (33 films & stage captures), theaters & showtimes, puzzles, rewards
  state/       ClubProvider — points ledger, queue, binder, tickets, stubs, streaks
  pages/       Marquee · Matinees · Discover · Six Frames · Collection · Rewards
  components/  Poster (CSS poster art) & rarity badges
```
