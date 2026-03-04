# CLAUDE.md — Train BJJ Website

This file provides guidance to Claude Code when working on the Train BJJ marketing website.

## Project Overview

Static marketing website for Train BJJ (iOS app). Hosted on GitHub Pages at trainbjjapp.com.

- **Repo**: `trainbjjapp-site`
- **Deployment**: Auto-deploys on push to `main` via GitHub Pages
- **Domain**: trainbjjapp.com (configured via `CNAME` file)
- **No build step** — plain HTML/CSS, no bundler or framework

## Site Structure

| File | Purpose |
|------|---------|
| `index.html` | Main landing page (hero, features, 6 detail sections, pricing, contact) |
| `faq.html` | FAQ page |
| `privacy.html` | Privacy policy |
| `terms.html` | Terms of service |
| `ai-feedback.html` | AI feedback/reporting page |
| `styles.css` | All styles (single file) |
| `script.js` | Accordion toggle, scroll animations, scroll progress bar, parallax glows |
| `CNAME` | GitHub Pages custom domain config |
| `images/` | All screenshots and assets |

## Page Sections (index.html, top to bottom)

1. **Nav** — Fixed at top (`position: fixed; z-index: 100`), glass background, scroll progress bar below. Links: FAQ, Features [dropdown: AI Features, Live Session, Technique Library, Advanced Analytics, Social & Stack Up, Health & Import], AI Feedback, Support
2. **Hero** — Two-column grid: left (app icon, tagline, App Store button), right ("As Seen in the App Store" 3x2 screenshot grid)
3. **Features** ("Everything You Need to Level Up") — 6 belt-themed feature cards (all clickable: AI → #ai, Live → #live-session, Techniques → #techniques, Analytics → #analytics, Social → #social, Health → #health)
4. **AI Features** (#ai) — Indigo/purple themed section. Feature 01 (Coach) always expanded; Features 02-03 (Scanner, Insights) in accordion
5. **Live Session** (#live-session) — Red themed section. Feature 01 (Timer) always expanded; Features 02-04 (Controls, Save, Lock Screen) in accordion
6. **Technique Library** (#techniques) — Blue belt themed section. Feature 01 (Built-In Library) always expanded; Features 02-04 (History, Instructionals, Custom) in accordion
7. **Advanced Analytics** (#analytics) — Brown belt themed section. Feature 01 (Performance Summary) always expanded; Features 02-04 (Position, Trends, Dashboard) in accordion
8. **Social Feed & Stack Up** (#social) — White belt themed section. Feature 01 (Social Feed) always expanded; Features 02-04 (Stack Up, Metrics, Shareable Cards) in accordion
9. **Health Metrics & Data Import** (#health) — Blue belt themed section. Feature 01 (Health Data) always expanded; Features 02-04 (Detection, Import, HealthKit Matching) in accordion
10. **Pricing** — Free vs Premium comparison
11. **Contact/Support** — Email link
12. **Footer** — Copyright, legal links

## CSS Architecture

### Design Tokens (CSS Variables in `:root`)

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-bg` | `#0a0a14` | Page background |
| `--color-bg-card` | `#141428` | Card backgrounds |
| `--color-bg-card-hover` | `#1c1c38` | Card hover backgrounds |
| `--color-text` | `#e8e8ec` | Primary text |
| `--color-text-muted` | `#9898a8` | Secondary text |
| `--color-accent` | `#6366f1` | Indigo accent (buttons, links) |
| `--color-accent-hover` | `#4f46e5` | Accent hover state |
| `--color-accent-glow` | `rgba(99, 102, 241, 0.3)` | Hover glow effects |
| `--color-accent-subtle` | `rgba(99, 102, 241, 0.12)` | Subtle accent tints |
| `--color-border` | `#1e1e36` | Card/image borders |
| `--color-success` | `#22c55e` | Success states |
| `--max-width` | `1080px` | Container max width |
| `--radius` | `12px` | Default border radius |

#### Glass Design Tokens (2026 Redesign)

| Variable | Value | Usage |
|----------|-------|-------|
| `--glass-bg` | `rgba(255, 255, 255, 0.04)` | Glass card backgrounds |
| `--glass-bg-hover` | `rgba(255, 255, 255, 0.07)` | Glass hover state |
| `--glass-border` | `rgba(255, 255, 255, 0.08)` | Glass card borders |
| `--glass-border-hover` | `rgba(255, 255, 255, 0.15)` | Glass border hover |
| `--glass-blur` | `16px` | Backdrop blur amount |
| `--glass-saturate` | `180%` | Backdrop saturate amount |
| `--glass-shadow` | Multi-layer | Glass card shadow (8px blur + 1px white ring) |
| `--glass-shadow-hover` | Multi-layer | Enhanced hover shadow (16px blur + brighter ring) |

**Glass Card Pattern** (applied to feature cards, pricing cards, accordion triggers/panels, ai-steps):
```css
background: var(--glass-bg);
backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
-webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
border: 1px solid var(--glass-border);
box-shadow: var(--glass-shadow);
```

### Ambient Mesh Gradient

The `body` has 3 overlapping radial gradients with `background-attachment: fixed` creating a subtle ambient glow across the page (indigo, purple, blue).

### Phone Frame Component

CSS-only device mockup wrapping all feature section screenshots (~27 images). Hero screenshots use glass borders instead.

| Class | Usage | Padding | Border Radius |
|-------|-------|---------|---------------|
| `.phone-frame` | Standard phone bezel | 12px | 36px outer, 24px inner |
| `.phone-frame.phone-frame-sm` | Scanner grid (smaller) | 8px | 28px outer, 20px inner |

**Features:**
- Gradient bezel: `linear-gradient(145deg, #2a2a3e, #1a1a2e, #2a2a3e)`
- Dynamic Island notch via `::before` pseudo-element
- Float animation: `phoneFloat` (4s infinite) when parent has `.is-visible`
- Section-specific hover glow: `box-shadow` uses section accent color (e.g. indigo for AI, red for Live)
- 3D hover: `translateY(-8px) rotateX(2deg)` on hover

**HTML pattern:**
```html
<div class="phone-frame">
    <img src="images/screenshot.png" alt="..." width="220" loading="lazy" decoding="async">
</div>
```

### CSS Animations

| Animation | Duration | Element | Effect |
|-----------|----------|---------|--------|
| `heroGlow` | 8s alternate | `.hero::before` | Pulsing radial gradient orb behind hero |
| `iconGlow` | 4s alternate | `.hero-icon` | Breathing glow on app icon |
| `ctaPulse` | 3s infinite | `.app-store-btn` | Expanding ring glow on CTA button |
| `phoneFloat` | 4s infinite | `.phone-frame` | Gentle Y-axis float on visible phones |

All animations disabled under `@media (prefers-reduced-motion: reduce)`.

### Parallax Background Glows

JS-driven parallax on section `::before` glow layers. On scroll, each section gets a `--parallax-y` CSS custom property that shifts the glow subtly. Disabled for reduced-motion users (both JS and CSS).

### Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| `768px` | Tablet — grids collapse to 1-2 columns, sections get less padding |
| `480px` | Mobile — single column, smaller fonts, tighter spacing |

### Section Theming Pattern

Feature detail sections follow a consistent pattern with themed accents:

**AI Section** (indigo/purple):
- Badge: `rgba(99, 102, 241, 0.2)` background, `#a5b4fc` text
- Background glow: `rgba(99, 102, 241, 0.10)` radial gradients
- Feature numbers: `var(--color-accent)`
- Divider line: `var(--color-accent)`

**Live Session Section** (red/warm):
- Badge: `rgba(220, 38, 38, 0.2)` background, `#fca5a5` text
- Background glow: `rgba(220, 38, 38, 0.08)` radial gradients
- Feature numbers: `#dc2626`
- Divider line: `#dc2626`

**Technique Library Section** (blue belt):
- Badge: `rgba(46, 115, 174, 0.2)` background, `#7EC8E3` text
- Background glow: `rgba(46, 115, 174, 0.08)` radial gradients
- Feature numbers: `#2E73AE`
- Divider line: `#2E73AE`

**Advanced Analytics Section** (brown belt):
- Badge: `rgba(177, 111, 66, 0.2)` background, `#D4A574` text
- Background glow: `rgba(177, 111, 66, 0.08)` radial gradients
- Feature numbers: `#B16F42`
- Divider line: `#B16F42`

**Social Feed & Stack Up Section** (white belt):
- Badge: `rgba(147, 148, 157, 0.2)` background, `#C8C9CE` text
- Background glow: `rgba(147, 148, 157, 0.08)` radial gradients
- Feature numbers: `#93949D`
- Divider line: `#93949D`

**Health Metrics & Data Import Section** (blue belt):
- Badge: `rgba(46, 115, 174, 0.2)` background, `#7EC8E3` text
- Background glow: `rgba(46, 115, 174, 0.08)` radial gradients
- Feature numbers: `#2E73AE`
- Divider: `#2E73AE`

**Section Dividers** are 80px soft gradient mesh zones (not thin lines). Each uses the section's accent color fading from transparent → accent 40% → accent 60% → transparent via `::after` pseudo-element.

### Feature Detail Section Structure

Each section follows this layout. Feature 01 is always expanded; Features 02+ are wrapped in accordion items:
```
section.{prefix}-section.fade-in-section
  div.container
    div.{prefix}-header          — Badge + title + subtitle (centered, gradient text)

    div.{prefix}-feature         — Feature 01: always visible, Grid: 1.2fr content | 1fr screenshots
      div.{prefix}-feature-content  — Number + h3 + lead text + bullet list
      div.{prefix}-feature-screenshots — Phone image(s) with caption

    div.accordion-item[data-expanded="false"]        — Features 02+ wrapped in accordion
      button.accordion-trigger[aria-expanded="false"]
        span.accordion-number "02"
        span.accordion-title "Feature Title"
        svg.accordion-chevron
      div.accordion-panel[role="region"]
        div.accordion-panel-inner
          div.{prefix}-feature       — Existing feature content (unchanged)
```

CSS class prefix: `ai-` for AI section, `live-` for Live Session section, `tech-` for Technique Library section, `stat-` for Advanced Analytics section, `social-` for Social Feed & Stack Up section, `health-` for Health Metrics & Data Import section.

### Alternating Layout

Odd features: text left, screenshot right (default grid).
Even features: text right, screenshot left (`.{prefix}-feature-reverse` with `direction: rtl`).
At tablet breakpoint: `direction: ltr` restores natural order (text above screenshot).

### Belt-Themed Feature Cards

Feature cards use `<a>` tags with class `feature-card feature-card-link feature-card-{prefix}`. Each card has a themed border, gradient background, icon glow, hover effects, and colored title matching its section's BJJ belt color.

| Card Class | Theme | Border Color | Title Color |
|------------|-------|-------------|-------------|
| `.feature-card-ai` | Indigo/purple | `rgba(99, 102, 241, 0.25)` | `#a5b4fc` |
| `.feature-card-live` | Red | `rgba(220, 38, 38, 0.25)` | `#fca5a5` |
| `.feature-card-tech` | Blue belt | `rgba(46, 115, 174, 0.25)` | `#7EC8E3` |
| `.feature-card-stat` | Brown belt | `rgba(177, 111, 66, 0.25)` | `#D4A574` |
| `.feature-card-social` | White belt/grey | `rgba(147, 148, 157, 0.25)` | `#C8C9CE` |
| `.feature-card-health` | Blue belt | `rgba(46, 115, 174, 0.25)` | `#7EC8E3` |

Currently clickable: AI Training Coach → `#ai`, Live Session Tracking → `#live-session`, 150+ Technique Library → `#techniques`, Advanced Analytics → `#analytics`, Social Feed & Training Partners → `#social`, Health Metrics & Data Import → `#health`.

## Image Conventions

### Naming

| Prefix | Section | Example |
|--------|---------|---------|
| `01-06.png` | Hero screenshot showcase | `01.png`, `02.png` |
| `ai-chat-` | AI Coach screenshots | `ai-chat-1.png`, `ai-chat-2.png` |
| `ai-scan-` | Notebook Scanner screenshots | `ai-scan-1.png` through `ai-scan-4.png` |
| `ai-session-` | Post-Session Insights | `ai-session-analysis.png` |
| `live-session-` | Live Session screenshots | `live-session-1.png` through `live-session-4.png` |
| `tech-` | Technique Library screenshots | `tech-01.png` through `tech-04.png` |
| `analytics-` | Advanced Analytics screenshots | `analytics-01.png` through `analytics-04.png` |
| `social-` | Social Feed & Stack Up screenshots | `social-01.png` through `social-04.png` |
| `health-` | Health Metrics & Data Import screenshots | `health-01.png` through `health-04.png` |

### Sizing (HTML width attributes as failsafe)

| Context | `width` attr | CSS `max-width` |
|---------|-------------|-----------------|
| AI Coach phones | `190` | `190px` |
| Scanner grid | `170` | `170px` |
| Insights single | `220` | `220px` |
| Live Session phones | `220` | `220px` |
| Analytics phones | `220` | `220px` |
| Social phones | `220` | `220px` |
| Health phones | `220` | `220px` |
| Hero showcase | (none) | `260px` |

### Cache Busting (REQUIRED after CSS/JS changes)

**CRITICAL**: After ANY change to `styles.css` or `script.js`, you MUST bump the `?v=N` cache buster query string in ALL HTML files that reference the changed file. Browsers aggressively cache these files — without bumping, users will not see changes on the live site.

**Files to update** (all 5 HTML files reference `styles.css`):
- `index.html`
- `faq.html`
- `privacy.html`
- `terms.html`
- `ai-feedback.html`

**Current version**: `styles.css?v=10`, `script.js?v=2`

**How to bump**: Increment the number (e.g. `?v=9` → `?v=10`) in every `<link>` and `<script>` tag across all HTML files.

**For images**: When replacing images with the same filename, add `?v=N` to the `<img>` src:
```html
<img src="images/ai-scan-1.png?v=3" ...>
```

## Nav Bar

- **Fixed positioning**: `position: fixed; top: 0; z-index: 100` with glass background (`rgba(10, 10, 20, 0.88)` + `backdrop-filter: blur(16px)`)
- **Height**: 64px (set on `.nav .container`)
- **Bottom border**: `1px solid var(--color-border)` — scroll progress bar runs along this line
- **IMPORTANT**: The gi-texture overlay rule (`.hero, .section, ...`) must NOT include `.nav` — it sets `position: relative; z-index: 1` which would override the fixed positioning
- Links use `white-space: nowrap` to prevent wrapping
- At 480px: font shrinks to `0.72rem`, gap to `8px`
- **Features dropdown**: `li.nav-dropdown` with nested `ul.nav-dropdown-menu` containing "AI Features", "Live Session", "Technique Library", "Advanced Analytics", "Social & Stack Up", and "Health & Import"
- Dropdown is CSS-only (hover to reveal), with chevron arrow that flips on hover
- Invisible `::before` bridge (8px) prevents hover gap between link and dropdown menu
- Dropdown styled with `var(--color-bg-card)` background, `backdrop-filter: blur(16px)`, accent hover highlight

## Key Patterns

### Accordion System

Feature sections use a collapsible accordion pattern to reduce scroll depth. Feature 01 is always visible; Features 02+ are collapsed by default.

**Animation**: CSS Grid `grid-template-rows: 0fr → 1fr` with `transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1)`. The `.accordion-panel-inner` has `min-height: 0` to allow collapsing to zero height.

**State**: `data-expanded` attribute on `.accordion-item` drives CSS state. `aria-expanded` on `.accordion-trigger` for accessibility.

**JS behavior** (`script.js`):
- Click handler toggles `data-expanded` and `aria-expanded`
- Multiple items can be open simultaneously
- On page load, checks `window.location.hash` and auto-expands any accordion containing the target ID

**Section accent colors**: Each section sets `--section-accent` CSS custom property, used by accordion trigger borders and numbers.

### Scroll Progress Bar

Fixed bar aligned with nav bottom border (`top: 63px`, `height: 2px`, `z-index: 101`) — overlaps the nav's `border-bottom` so the gradient replaces the subtle border line as the user scrolls. Gradient from accent → purple → red (`var(--color-accent)` → `#8b5cf6` → `#dc2626`). Width driven by JS scroll percentage via `requestAnimationFrame`. Has `box-shadow: 0 0 8px var(--color-accent-glow)` for a subtle glow effect.

### Scroll Fade-In Animations

Elements with `.fade-in-section` class start at `opacity: 0; transform: translateY(24px)` and transition to visible when they enter the viewport (IntersectionObserver, fires once). Feature cards and screenshot cards have staggered delays (80ms and 100ms increments). Respects `prefers-reduced-motion`.

### Smooth Scrolling

`html { scroll-behavior: smooth; }` for anchor link navigation (nav dropdown links, feature card links).

### BJJ Texture Overlay

Subtle gi-weave pattern via `body::after` using `repeating-linear-gradient` at 45°/-45° with `opacity: 0.03`. All content has `position: relative; z-index: 1` to sit above the texture. **IMPORTANT**: Do NOT include `.nav` in the z-index rule — it would override the nav's `position: fixed`.

### `prefers-reduced-motion`

All transitions and animations are disabled. Fade-in elements are immediately visible. Screenshot hover effects are suppressed.

### Adding a New Feature Detail Section

1. Add clickable `<a>` card in features grid (class `feature-card feature-card-link feature-card-{prefix}`)
2. Add belt-themed CSS for the feature card (border, gradient background, icon glow, hover, title color)
3. Add section HTML between existing sections (follow the structure above)
4. Feature 01 is always expanded; wrap Features 02+ in accordion items (see structure above)
5. Add CSS with themed prefix (badge, glow, numbers, divider) and set `--section-accent` custom property
6. Add accordion trigger/panel themed CSS (background tint, hover glow, expanded panel background)
7. Add tablet breakpoint rules (single column, `direction: ltr`, accordion responsive)
8. Add mobile breakpoint rules (smaller fonts, tighter spacing)
9. Add to Features dropdown in nav (`ul.nav-dropdown-menu`)
10. Add `fade-in-section` class to the section element
11. Add section to gi-texture z-index rule (`.hero, .section, ...`)
12. **Bump CSS cache buster** `?v=N` in all 5 HTML files

### Hero Layout

Two-column grid (`.hero-grid`: `1fr 1.4fr`) with left-aligned content and right screenshot showcase:
- **Left** (`.hero-content`): App icon (100px, rounded 24px with glow), gradient `h1`, tagline, App Store button
- **Right** (`.hero-screenshots`): "As Seen in the App Store" label + 3x2 screenshot grid (`.hero-screenshot-grid`) + italic subtitle
- At 768px: collapses to single column, content centers
- Hero `h1` uses gradient text: `linear-gradient(135deg, #ffffff 0%, #c4c4d4 50%, #8888a8 100%)`

### Screenshot Grid Layouts

- **2 phones side by side**: `.ai-phone-pair` (flexbox, 20px gap)
- **4 phones in 2x2 grid**: `.ai-scanner-grid` (CSS grid, 2 columns)
- **Single phone centered**: `.ai-phone-single` or `.live-phone` (max-width + margin auto)

### Screenshot Source Directory

Original screenshots are stored in `~/Documents/Developer/Screenshots_1.0/Website Screenshots/`:
- `AI/` — AI Coach, Scanner, and Insights screenshots (e.g. `Scan1.png` through `Scan4.png`)
- `LiveSession/` — Live Session screenshots (e.g. `01.png` through `04.png`)
- `TechniqueLibrary/` — Technique Library screenshots (`01.png` through `04.png`)
- `AdvancedAnalytics/` — Advanced Analytics screenshots (`01.png` through `04.png`)
- `social_stackup/` — Social Feed & Stack Up screenshots (`01.png` through `04.png`)
- `HealthMetrics/` — Health Metrics & Data Import screenshots (`01.png` through `04.png`)

Copy to `images/` with site naming convention (e.g. `ai-scan-1.png`, `live-session-1.png`) and bump the `?v=N` cache buster.

## Contact Info

- Support: support@trainbjjapp.com
- App Store: https://apps.apple.com/app/train-bjj-jiujitsu-tracker/id6738895825
- Company: Super Core Solutions LLC
