# Dashboard V22 — Team Workspace

Next.js 14 (App Router) · Tailwind CSS · Motion · GSAP · TypeScript

A recreation of the reference dashboard: logo intro → circular reveal → staggered content,
with three routed pages (Home `/`, Profile `/profile`, Saved `/saved`).

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## How the pixel-matching works
The UI is authored on a fixed **1440×810 stage** (`src/lib/layout.ts`) and uniformly scaled to fit any
viewport, so every measurement (taken from the reference frames) holds at every size. The shell,
sidebar, cards and page content all use stage px.

## Animation map
| Layer | Tool | File |
|---|---|---|
| Logo draw-in → flies to sidebar slot → circular clip-path reveal from the logo | GSAP timeline | `components/shell/Intro.tsx` |
| Skeleton cards → content fill, char-typing headline, odometer counters, bar growth, tick fill, avatar pops | GSAP, attribute-driven | `lib/entrance.ts` |
| Sliding mint orb + notch (squash & stretch), hover tooltips, icon springs | Motion | `components/shell/Sidebar.tsx` |
| Toggle pills (`layoutId`), calendar day, tabs, hover lifts, draggable video rail, filter + remove with layout animation | Motion | `components/home/*`, `components/saved/*` |
| Page exit (fade/rise) before route push; entrance on mount | GSAP | `Sidebar.tsx` + `usePageEntrance` |

Intro timeline (s): `0` logo draws · `0.55` flies to sidebar · `1.0` circle reveal · `1.25` pages start entrance · `1.9` intro removed.
Tweak timings in `Intro.tsx`; entrance choreography in `playEntrance()`.

### Marking up elements for the entrance engine
`data-skel` (card) · `data-fill` (content) · `data-split` via `<Split>` · `data-pop` · `data-grow="x|y"` · `<Roll value="10,4h"/>` · `data-tick`/`data-on`

## Assets
* **Avatars** — put `<name-slug>.jpg` in `public/avatars/` (see the README there). Fallback: gradient initials.
* **Video thumbnails** — `components/ui/Thumb.tsx` renders a procedural 3D-style blob. Swap for `<Image>` with your renders.
* Fonts are bundled via `@fontsource` (Inter, Hanken Grotesk, Instrument Serif) — no network needed at build.

## Structure
```
src/
  app/            layout.tsx · page.tsx · profile/ · saved/ · globals.css
  components/
    shell/        AppShell · Stage · Shell · Sidebar · Intro · Logo
    home/         HomeView · Cards (banner, members, data, impact, stats, brainstorm, upgrade) · RightColumn
    profile/      ProfileView
    saved/        SavedView
    ui/           Card · Roll · Split · Avatar · Thumb
  lib/            layout · entrance · intro-context · data · cn
```
