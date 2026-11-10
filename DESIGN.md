---
name: Workspace Studio
description: Deep emerald forest depth with luminescent mint telemetry and calm, organic precision
colors:
  forest-deep: "#071914"
  forest-surface: "#0b2b23"
  forest-card-dark: "#102e26"
  mint-primary: "#7fe0c0"
  mint-bright: "#b4f0db"
  mint-deep: "#1f8a6c"
  peach-accent: "#f3a877"
  paper-stage: "#f3f3f3"
  card-light: "#ffffff"
  ink-light: "#10302a"
  ink-dark: "#ecf8f4"
  muted-light: "#7d8d88"
  muted-dark: "#8ca89f"
typography:
  display:
    fontFamily: '"Hanken Grotesk Variable", "Inter Variable", sans-serif'
    fontSize: "2.25rem"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  serif-accent:
    fontFamily: '"Instrument Serif", Georgia, serif'
    fontSize: "2.5rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: '"Hanken Grotesk Variable", "Inter Variable", sans-serif'
    fontSize: "1.625rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: '"Inter Variable", system-ui, sans-serif'
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: '"Inter Variable", system-ui, sans-serif'
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0em"
  label:
    fontFamily: '"Inter Variable", system-ui, sans-serif'
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.02em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  card: "20px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "14px"
  lg: "20px"
  xl: "28px"
components:
  button-primary:
    backgroundColor: "{colors.mint-primary}"
    textColor: "{colors.forest-surface}"
    rounded: "{rounded.full}"
    padding: "8px 18px"
  button-primary-hover:
    backgroundColor: "{colors.mint-bright}"
  button-forest:
    backgroundColor: "{colors.forest-surface}"
    textColor: "{colors.card-light}"
    rounded: "{rounded.full}"
    padding: "8px 18px"
  card-container:
    backgroundColor: "{colors.card-light}"
    rounded: "{rounded.card}"
    padding: "20px"
  chip-filter:
    backgroundColor: "{colors.mint-deep}"
    textColor: "{colors.card-light}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
---

# Design System: Workspace Studio

## Overview

**Creative North Star: "The Obsidian Studio"**

Workspace Studio marries the deep optical quiet of an obsidian forest with the laser-etched clarity of surgical and clinical instrumentation. High-density data feeds, video waveforms, and real-time collaboration tools sit upon a tranquil, tinted glass plane that shifts seamlessly from luminous morning parchment to abyssal emerald night.

The design eliminates visual noise and brutalist aggression in favor of gentle biological radiuses, organic pill contours, and spring-grounded motion physics. Every state change feels physically anchored, responding synchronously to user intent with zero perceptible hesitation.

**Key Characteristics:**
- **Atmospheric Palette**: Deep pine greens and cool parchment grounded by luminescent mint indicators and warm peach highlights.
- **Fluid & Tactile Geometry**: Generous 20px squircle containers and fully-radiused pill controls that invite tactile manipulation.
- **Synchronized Kinetic Physics**: Motion communicates state and direction via unified spring dynamics (`stiffness: 440, damping: 32`), completely eliminating static jump cuts.
- **Dual-Mode Luminosity**: Seamless transition between light parchment glass and dark obsidian depth with guaranteed contrast parity.

## Colors

The palette balances clinical precision with an organic sanctuary feel, pairing deep chlorophyll forest tones with high-visibility mint and restorative peach accents.

### Primary
- **Mint Luminescence** (`#7fe0c0` / `rgb(127, 224, 192)`): The signature telemetry and interaction signal. Used for the active sidebar orb, primary CTAs, active progress meters, and selected status badges.
- **Mint Bright** (`#b4f0db`): Elevated hover state for primary triggers and selection highlights.
- **Mint Deep** (`#1f8a6c`): High-contrast textual label and secondary badge tint in light mode.

### Secondary
- **Peach Radiance** (`#f3a877` / `#f2b784`): Warm humanizing accent. Used selectively for collaborative actions ("Add member", "Upgrade plan"), live online presence pings, and secondary chart segments.

### Tertiary
- **Pine Forest Dark** (`#143b31`): Used for elevated dark-mode cards, secondary button bodies, and dark navigation containers.

### Neutral
- **Deep Forest Ink** (`#10302a` in Light / `#ecf8f4` in Dark): The primary reading ink, engineered for razor-sharp legibility against both white cards and dark obsidian surfaces.
- **Sage Muted** (`#7d8d88` in Light / `#8ca89f` in Dark): Secondary timestamps, category labels, icons, and subtle metadata.
- **Parchment Stage** (`#f3f3f3` in Light / `#071914` in Dark): The outer viewport canvas that houses the floating workspace shell.
- **Card Glass** (`rgba(255, 255, 255, 0.92)` in Light / `rgba(16, 46, 38, 0.88)` in Dark): Frosted glass card surfaces.

### Named Rules
**The Rarity of Mint Rule.** Mint luminescence (`#7fe0c0`) must never exceed 10% of any viewport's surface area. Its purpose is navigational telemetry and urgent orientation; overuse dilutes its signal value.
**The Dual-Surface Parity Rule.** Every interactive component must declare both light and dark styling explicitly; neither mode may rely on unverified opacity inheritances.

## Typography

**Display Font:** `Hanken Grotesk Variable` (fallback: `Inter Variable`, `sans-serif`)  
**Body Font:** `Inter Variable` (fallback: `system-ui`, `sans-serif`)  
**Serif Accent:** `Instrument Serif` (fallback: `Georgia`, `serif`)

**Character:** A harmonious pairing of European modernist grotesque geometry with humanistic calligraphic warmth, punctuated by delicate serif italic accents on key emotional words.

### Hierarchy
- **Display** (Regular 400, `2.25rem` / `36px`, line-height `1.1`, letter-spacing `-0.03em`): Top-level hero titles and major section greetings (`<Split>` animated).
- **Serif Accent** (Italic 400, `2.5rem` / `40px`, line-height `1.0`): Emphasized conversational phrases inside display titles (e.g., *better*, *potential*).
- **Headline** (Medium 500, `1.625rem` / `26px`, line-height `1.2`, letter-spacing `-0.02em`): Metric rolls, modal headers, and column titles.
- **Title** (Medium 500, `1rem` / `16px`, line-height `1.3`, letter-spacing `-0.01em`): Card headers, video titles, and channel names.
- **Body** (Regular 400, `0.875rem` / `14px`, line-height `1.5`): Explanatory descriptions, chat message threads, and profile biographies. Max line length: 65ch.
- **Label** (Medium 500 / Semi-bold 600, `0.6875rem` - `0.75rem` / `11px` - `12px`, letter-spacing `0.02em`): Navigation item labels, duration pills, time badges, and metadata tags.

### Named Rules
**The Typographic Blur Rule.** All major headlines entering the screen must utilize character-level stagger with blur resolution (`0.45em` slide + `filter: blur(4px) -> blur(0px)`).

## Layout

Workspace Studio operates as an adaptive edge-to-edge canvas with an internal fixed sidebar and a responsive multi-column flow:
- **Root Shell**: `fixed inset-0 overflow-hidden` with a smooth radial-gradient backdrop.
- **Sidebar Anchor**: Fixed anchor at `x: 24px, y: 24px, width: 57px, height: 705px`, automatically scaling down if the viewport height drops below 750px (`scale(0.65 - 1.0)`).
- **Content Gutter**: Left padding of `110px` uniformly reserved across all pages to guarantee generous clearance from the floating sidebar.
- **Responsive Flex Grids**: Two-column split on desktop (`flex-1` main stage vs. `380px` - `400px` right auxiliary column) collapsing into an elegant single-column stacked layout on viewports `< 1280px`.
- **Card Sizing**: Components use flexible minimums (`flex-1 min-w-[240px]`) rather than rigid pixel lockouts, expanding to fill widescreen layouts without empty margins.

## Elevation & Depth

Workspace Studio avoids heavy, opaque drop shadows in favor of ambient tonal layering and luminous rim highlights. Depth is communicated through frosted glass transparency and soft perimeter light leaks.

### Shadow Vocabulary
- **Card Rest (Light)** (`box-shadow: 0 1px 0 rgba(255,255,255,.95) inset, 0 0 0 1px rgba(255,255,255,.55), 0 14px 34px -16px rgba(18,70,56,.28)`): Soft light bevel on top, subtle hairline border, and deep diffuse organic shadow.
- **Card Rest (Dark)** (`box-shadow: 0 1px 0 rgba(255,255,255,.08) inset, 0 0 0 1px rgba(127,224,192,.12), 0 14px 34px -16px rgba(0,0,0,.7)`): Mint tinted rim glow with deep black ambient elevation.
- **Mint Indicator Glow** (`box-shadow: 0 0 22px rgba(127,224,192,.55), inset 0 1px 0 rgba(255,255,255,.7)`): Radial luminescent aura behind active navigation indicators.
- **Floating Pill Depth** (`box-shadow: 0 8px 20px -6px rgba(4,32,24,.5)`): Tooltip and action button elevation.

### Named Rules
**The Inner Rim Rule.** Every glass card must feature a 1px inner rim (`inset 0 1px 0 rgba(...)`) representing light catching the polished top edge of the panel.

## Shapes

- **Containers & Cards**: Consistent `20px` border-radius (`rounded-[20px]`). Creates a friendly, ergonomic squircle silhouette.
- **Buttons, Badges & Pills**: `9999px` full pill radius (`rounded-full`). Used for buttons, search inputs, avatars, filter tabs, and active indicators.
- **Inner Asset Tiles**: `10px` to `14px` border-radius (`rounded-[10px]` - `rounded-[14px]`).
- **Sidebar Shell**: Seamless capsule pill (`rounded-full`) enclosing the navigation stack.

## Components

### Buttons
- **Shape**: Full pill radius (`rounded-full`).
- **Primary Mint Button**: Background `{colors.mint-primary}`, text `{colors.forest-surface}`, font weight 500, padding `8px 18px`. Hover: brightness `1.05`, tap scale `0.95`.
- **Peach Accent Button**: Background `{colors.peach-accent}`, text `{colors.forest-surface}`, font weight 500. Used for collaborative triggers.
- **Ghost / Neutral Pill**: Background `rgba(0,0,0,.04)` (Light) / `rgba(255,255,255,.08)` (Dark), text ink.

### Cards / Containers
- **Corner Style**: `20px` radius.
- **Background**: Frosted semi-translucent glass (`bg-white/90` in Light, `bg-[#102e26]/85` in Dark).
- **Padding**: `16px` to `24px` standard internal breathing room.

### Navigation Sidebar
- **Floating Capsule**: 57px wide capsule containing circular logo, 8 core destination icons, and 3 utility icons (Search, Theme, Logout).
- **Active Highlight Indicator**: 46px mint radial orb coupled in lockstep with a 14px right-edge notch. Both animate simultaneously with unified spring physics (`type: "spring", stiffness: 440, damping: 32, mass: 0.72`).
- **Tooltip**: Black forest pill (`rounded-[8px]`, text size `10px`) positioned at `left: SIDEBAR.w + 22px`.

### Command Palette (SearchModal)
- **Modal Surface**: Floating centered panel (`max-w-[560px]`, `rounded-[20px]`) with backdrop blur (`backdrop-blur-sm`).
- **Trigger**: Global shortcut `Cmd+K` / `Ctrl+K` or sidebar search icon click.
- **Results**: Real-time filtered navigation and action items with icon badges.

### Odometer Rolls (`<Roll/>`)
- **Mechanism**: Vertical digit reel moving through 0-9 revolutions and settling smoothly on target numerical metrics with easing `power3.inOut`.

## Do's and Don'ts

### Do:
- **Do** use `rounded-full` for all action buttons, status pills, and toggle indicators.
- **Do** apply `rounded-[20px]` to all surface cards and modal overlays.
- **Do** prefetch all navigation routes on hover and mount to maintain instant client-side switching.
- **Do** use `stiffness: 440, damping: 32` for all interactive spring transitions.
- **Do** maintain strict color contrast ratios across both Light and Dark themes.

### Don't:
- **Don't** use sharp square corners (`rounded-none` or `rounded-sm`) for interactive controls or cards.
- **Don't** use harsh saturated pure black (`#000000`) or pure white (`#ffffff`) backgrounds in dark mode; use deep obsidian greens (`#071914`, `#102e26`).
- **Don't** introduce artificial delays or blocking timeouts on navigation indicators.
- **Don't** use generic default blue accents (`#0070f3`); honor the committed mint (`#7fe0c0`) and peach (`#f3a877`) identity.

