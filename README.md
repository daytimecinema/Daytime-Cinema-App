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

## Design

The UI follows the Letterboxd design language: ink `#14181c` background, slate `#2c3440` panels, `#9ab` body text, the orange/green/blue accent dots, poster-first 2:3 grids, and green ★ scores.

## Real movie data (TMDB)

Open Settings (⚙︎) and paste a free API key from [themoviedb.org](https://www.themoviedb.org/settings/api) — the same database Letterboxd is built on. With a key set, the app fetches real poster art for the whole catalog (cached in `localStorage`) and Discover gains full TMDB search, so any movie ever made can be queued, watched, and collected. The key never leaves the browser. Without a key, the app falls back to its bundled CSS poster art.

## Letterboxd

Letterboxd's API is approval-only (apply at [letterboxd.com/api-beta](https://letterboxd.com/api-beta/)), so true "Sign in with Letterboxd" OAuth requires being granted access first. Until then, Settings supports the official export path: Letterboxd → Settings → Data → Export, then upload `watchlist.csv` (→ queue) or `watched.csv` (→ watched + cards) here.

## Layout

```
src/
  data/        catalog (33 films & stage captures), theaters & showtimes, puzzles, rewards
  state/       ClubProvider — points ledger, queue, binder, tickets, stubs, streaks
  pages/       Marquee · Matinees · Discover · Six Frames · Collection · Rewards
  components/  Poster (CSS poster art) & rarity badges
```
