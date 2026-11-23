# Minor Key

A brand identity and landing page for **Minor Key**, a concept jazz lounge and cocktail bar in Beacon Hill, Boston.

**Live site:** https://setloth.github.io/MinorKey/
**Brand sheet:** https://setloth.github.io/MinorKey/#brand

> Minor Key is a fictional brand created as a design exercise. Performer names, cocktails and the Instagram handle are invented.

## What's here

- **Landing page:** hero, the room, tonight's sets, a playable record player, the cocktail menu and a guest-list signup.
- **Brand sheet** (`/#brand`): the mark, color palette, typefaces, voice and sample components, all rendered from the same tokens the site uses.
- **Generated music:** the record player plays a ii–V–i jazz loop in C minor that is synthesized live in the browser with the Web Audio API. No audio files are used. See [`src/lib/loungeLoop.ts`](src/lib/loungeLoop.ts).
- **Analytics hooks:** CTA clicks, record plays, signups and section views are pushed to `window.dataLayer`, ready for Google Tag Manager / GA4.

## Brand at a glance

| Token | Hex | Role |
| --- | --- | --- |
| Midnight | `#0e1320` | Background |
| Ink | `#161c2c` | Raised surfaces |
| Brass | `#c9a45c` | Primary accent |
| Cream | `#f3e9d2` | Primary text |
| Oxblood | `#7a1f2b` | Rare highlight |

Type: **Poiret One** (wordmark and labels), **Playfair Display** (headlines), **DM Sans** (body).

The mark is three flats (♭♭♭), the key signature of C minor.

## Project structure

```
src/
  brand/        tokens.css (design tokens) and brand.ts (copy, palette, sets, menu)
  components/   page sections: Hero, Room, Tonight, RecordPlayer, Menu, GuestList…
  lib/          analytics, scroll reveal, and the generated jazz loop
  pages/        BrandSheet
  styles/       landing.css, brand-sheet.css
public/images/  hero photos
```

To change copy, set lists or the menu, edit `src/brand/brand.ts`. To change colors or type, edit `src/brand/tokens.css`; the brand sheet updates with it.

## Running locally

Requires Node 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

## Deployment

Every push to `main` builds and deploys to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

## Built with

React 19, TypeScript and Vite. Designed and built by Seth Weintraub with AI assistance (Claude).
