# Workspace Studio — Modern Dashboard Template

An ultra-refined, fluid, and fully responsive team collaboration dashboard built with **Next.js 14 (App Router)**, **Tailwind CSS**, **Framer Motion**, and **GSAP**.

Designed for enterprise-grade productivity, clinical research, design systems, and modern team operations. Features an edge-to-edge adaptive layout, synchronized theme engine (Light & Dark modes), physics-driven navigation indicators, instant prefetching, and spotlight command search.

---

## ✨ Highlights & Capabilities

- 🎨 **Adaptive Full-Screen Layout**: Fluid edge-to-edge canvas with responsive flex-grid cards that scale naturally to any viewport resolution.
- 🌓 **Dynamic Theme Engine**: Seamless Light & Dark mode toggle with zero flash of unstyled content (FOUC), custom CSS variables, and persistent local storage sync.
- 🚀 **Zero-Glitch Spring Navigation**: Floating sidebar featuring a fluid mint orb indicator and right-edge notch with synchronized Framer Motion physics.
- ⚡ **Instant Route Switching & Prefetching**: Route prefetching on hover and mount, non-blocking layout transitions, and optimized package imports for sub-100ms client route changes.
- 🔍 **Spotlight Command Palette**: Built-in modal search triggered via sidebar or keyboard shortcut (`Cmd+K` / `Ctrl+K`) for workspace exploration and actions.
- 🎬 **Cinematic Entrance Choreography**: Attribute-driven GSAP animation system driving typography character blur-ins (`<Split>`), odometer roll counters (`<Roll>`), and staggered card skeletons (`data-skel`).
- 📱 **Multi-View Suite**:
  - **Home (`/`)**: Workspace banner, team members, live data metrics, impact charts, and scrollable activity feed.
  - **Videos (`/videos`)**: Curated surgical recordings, category pills, duration tags, and interactive player modal.
  - **Cloud (`/cloud`)**: Cloud storage manager with capacity gauge, folders, and file management tables.
  - **Messages (`/chat`)**: Team channel discussion, member presence dots, message reactions, and interactive chat input.
  - **Calls (`/calls`)**: Active video huddle stage with dynamic soundwave indicators, audio/video controls, and scheduled meetings.
  - **Profile (`/profile`)**: User overview, skills badges, activity history, and weekly focus metrics.
  - **Saved (`/saved`)**: Bookmarked assets, filter tabs, and collection restore actions.
  - **Settings (`/settings`)**: Theme controls, notification toggles, device sessions, and account details.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React Server Components)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Animation**: [Motion (Framer Motion 11)](https://motion.dev/) & [GSAP 3](https://greensock.com/gsap/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: `@fontsource-variable/inter`, `@fontsource-variable/hanken-grotesk`, `@fontsource/instrument-serif`
- **Language**: TypeScript 5

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17+ or later
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Manthan-Railkar/dashboard-v1-template.git
   cd dashboard-v1-template
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Build for production:
   ```bash
   npm run build
   npm run start
   ```

---

## 📂 Project Structure

```
dashboard-v1-template/
├── src/
│   ├── app/                    # Next.js App Router pages & metadata
│   │   ├── calls/              # Video huddles & meeting room page
│   │   ├── chat/               # Team channels & direct messaging page
│   │   ├── cloud/              # Cloud drive & file browser page
│   │   ├── profile/            # User profile, skills & stats page
│   │   ├── saved/              # Bookmarked collections page
│   │   ├── settings/           # Workspace preferences & theme toggles
│   │   ├── videos/             # Video library & interactive player page
│   │   ├── globals.css         # Adaptive theme variables, scrollbars & cards
│   │   ├── layout.tsx          # Root HTML layout with inline theme bootstrap
│   │   └── page.tsx            # Home workspace route
│   ├── components/
│   │   ├── calls/              # CallsView component & sound wave visualizers
│   │   ├── chat/               # ChatView, channels sidebar & thread UI
│   │   ├── cloud/              # CloudView, folders grid & recent files list
│   │   ├── home/               # Banner, Cards, RightColumn & statistics
│   │   ├── profile/            # ProfileView & weekly focus bar charts
│   │   ├── saved/              # SavedView & bookmark filter tabs
│   │   ├── settings/           # SettingsView & preference toggles
│   │   ├── shell/              # Shell, Sidebar, Logo, Intro & SearchModal
│   │   ├── ui/                 # Avatar, Card, Roll, Split & procedural Thumb
│   │   └── videos/             # VideosView, category filters & player modal
│   └── lib/
│       ├── cn.ts               # ClassName merge utility (clsx + tailwind-merge)
│       ├── data.ts             # Workspace dataset, videos, notifications & members
│       ├── entrance.ts         # GSAP attribute-driven entrance engine
│       ├── intro-context.tsx   # Intro completion provider
│       ├── layout.ts           # Sidebar dimensions & coordinate anchors
│       ├── search-context.tsx  # Global search palette state provider
│       └── theme-context.tsx   # Light/Dark mode state & localStorage sync
├── next.config.mjs             # Next.js configuration & package optimizations
├── tailwind.config.ts          # Custom color palette, tokens & shadows
└── package.json
```

---

## 🎯 Architecture & Animation Engine

### Synchronized Sidebar Physics
The navigation bar in [`src/components/shell/Sidebar.tsx`](src/components/shell/Sidebar.tsx) tracks user intent with zero-delay optimistic highlights. The mint orb and right-edge notch glide in lockstep using unified spring physics (`stiffness: 440, damping: 32, mass: 0.72`), eliminating jitter or delay.

### Attribute-Driven Entrance Engine
Components define their entrance choreographies declaratively:
- `data-skel`: Container cards scale and fade in first with sequence staggering.
- `data-fill`: Card content fades and slides upward after the card resolves.
- `data-split`: Words and headings split into characters with typographic blur typing.
- `data-pop`: Avatars and icon badges pop with elastic spring physics.
- `data-grow="x|y"`: Progress indicators and bar charts grow from their respective baselines.
- `<Roll value="..."/>`: Numerical odometer rolling effect from 0 to target digits.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
