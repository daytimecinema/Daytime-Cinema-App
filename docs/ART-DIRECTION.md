# Art Direction — "The App Is a Theater"

Design north star: opening the app is *arriving at the cinema*. You pass the
box office, the curtains part, and you land in the lobby where our mascot
waits at the concession counter. Every tab is a **room**, not a menu:

| Tab | Room | Mood |
|---|---|---|
| Lobby | Concessions hub, mascot, glowing directory signs | Warm marquee gold on dark — theater at dusk |
| Box Office | Ticket window, showtimes board | Brass + ticket-red |
| Coming Soon | Poster wall corridor | Backlit one-sheets |
| Screening Room | Daily Six Frames puzzle | Near-black, projector beam |
| The Gallery | Card binder as a memorabilia wall | Velvet rope, spotlights |
| Concessions | Watch-to-earn + rewards | Striped awning, popcorn warmth |

The current build fakes all scenery in CSS so real art can drop in without
layout changes. Replace in this priority order:

## 1. Mascot — "Reely" (working name), the film-reel usher
A film reel with a face, white gloves, usher's bow tie. **This is the brand.**
- Style: flat/soft-shaded vector, thick outlines, friendly; reads at 48px.
- Deliver as **layered SVG** (preferred) or transparent PNG 1024×1024 @2x.
- Poses needed (consistent ¾ view):
  1. `welcome` — waving at the counter (Lobby default)
  2. `point-up` — gesturing at the directory board behind him
  3. `popcorn` — holding popcorn bucket (Concessions/rewards)
  4. `think` — chin-scratch, squinting (Six Frames in progress)
  5. `cheer` — both arms up, confetti-ready (puzzle win, pack opening)
  6. `sad-reel` — unspooled film drooping (puzzle lost, empty states)
  7. `ticket` — tearing an ADMIT ONE stub (purchase confirmation)
- Also: head-only mark for the app icon (mascot head inside a marquee circle), 1024×1024.

## 2. Lobby scene (the home screen)
- Wide painted lobby: carpet, concession counter front-center, directory
  board on the back wall with **blank sign plates** (we render text live so
  copy stays editable).
- Deliver as 3 parallax layers, transparent PNGs @2x:
  back wall 2048×1200 · counter mid-layer 2048×800 · foreground props 2048×500.
  Mobile-safe area: keep critical detail in center 1080w.

## 3. Entrance sequence (first open)
Current CSS version: marquee flickers on → ticket prints → curtains part.
Upgrade assets:
- Marquee sign with bulb ring (PNG + a Lottie flicker if possible)
- Ticket stub "ADMIT ONE · MATINEE FILM CLUB" 800×320 (also reused on receipts)
- Red velvet curtain texture, tileable 1024×1024 (left/right panels get mirrored)
- Optional: 3–4s Lottie of the full walk-in for buttery motion

## 4. Room headers (one banner per room, 1600×500 @2x, dark-edge vignette)
- Box office window (brass arch, "BOX OFFICE" sign plate blank)
- Screening room (projector beam from top-left, dust motes)
- Gallery wall (gold empty frames, velvet rope bottom edge)
- Concession close-up (striped awning strip, glass case glow)
- Coming-soon corridor (backlit blank poster light-boxes)

## 5. Odds & ends
- Loading spinner: spinning film reel (Lottie or SVG, 200×200)
- Empty-state spot art: empty seat row, unspooled reel, empty popcorn bucket (512×512 each)
- Card-back design for unopened packs (750×1050, 2:3)
- Favicon/PWA icon set from the mascot head mark

## Palette & type (already in code)
- Ink `#14181c` · slate `#2c3440` · text `#9ab` · headings `#fff`
- Accents: orange `#ff8000` · green `#00e054` · blue `#40bcf4`
- **Marquee gold** `#ffce54` + warm bulb glow — the "theater at dusk" layer on top of the dark UI
- Type: Graphik-style geometric sans (system stack now; license Graphik or use Inter)

## Commissioning notes
- One illustrator for mascot + scenes keeps the world coherent; budget
  roughly: mascot sheet (7 poses + icon), lobby (3 layers), 5 room banners,
  curtain/ticket/odds — quote as a package.
- Ask for source files (AI/Figma) and a no-text version of every sign.
