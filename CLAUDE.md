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
| `index.html` | Main landing page (hero, screenshots, features, AI section, Live Session section, pricing, contact) |
| `faq.html` | FAQ page |
| `privacy.html` | Privacy policy |
| `terms.html` | Terms of service |
| `ai-feedback.html` | AI feedback/reporting page |
| `styles.css` | All styles (single file) |
| `CNAME` | GitHub Pages custom domain config |
| `images/` | All screenshots and assets |

## Page Sections (index.html, top to bottom)

1. **Nav** — Logo + links (FAQ, Features, AI, Live, AI Feedback, Support)
2. **Hero** — App icon, tagline, App Store button
3. **Screenshot Showcase** ("See It in Action") — 3x2 grid of app screenshots
4. **Features** ("Everything You Need to Level Up") — 6 feature cards (2 are clickable: AI → #ai, Live → #live-session)
5. **AI Features** (#ai) — Indigo/purple themed section with 3 sub-features (Coach, Scanner, Insights)
6. **Live Session** (#live-session) — Red themed section with 4 sub-features (Timer, Controls, Save, Lock Screen)
7. **Pricing** — Free vs Premium comparison
8. **Contact/Support** — Email link
9. **Footer** — Copyright, legal links

## CSS Architecture

### Design Tokens (CSS Variables in `:root`)

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-bg` | `#0a0a14` | Page background |
| `--color-bg-card` | `#141428` | Card backgrounds |
| `--color-text` | `#e8e8ec` | Primary text |
| `--color-text-muted` | `#9898a8` | Secondary text |
| `--color-accent` | `#6366f1` | Indigo accent (buttons, links) |
| `--color-accent-glow` | `rgba(99, 102, 241, 0.3)` | Hover glow effects |
| `--color-border` | `#1e1e36` | Card/image borders |
| `--max-width` | `1080px` | Container max width |
| `--radius` | `12px` | Default border radius |

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

### Feature Detail Section Structure

Each section follows this layout:
```
section.{prefix}-section
  div.container
    div.{prefix}-header          — Badge + title + subtitle (centered)
    div.{prefix}-feature         — Grid: 1.2fr content | 1fr screenshots
      div.{prefix}-feature-content  — Number + h3 + lead text + bullet list
      div.{prefix}-feature-screenshots — Phone image(s) with caption
    div.{prefix}-feature.{prefix}-feature-reverse  — Alternating sides via direction:rtl
```

CSS class prefix: `ai-` for AI section, `live-` for Live Session section.

### Alternating Layout

Odd features: text left, screenshot right (default grid).
Even features: text right, screenshot left (`.{prefix}-feature-reverse` with `direction: rtl`).
At tablet breakpoint: `direction: ltr` restores natural order (text above screenshot).

### Clickable Feature Cards

Feature cards that link to detail sections use `<a>` tags with class `feature-card feature-card-link`.
Currently clickable: AI Training Coach → `#ai`, Live Session Tracking → `#live-session`.

## Image Conventions

### Naming

| Prefix | Section | Example |
|--------|---------|---------|
| `01-06.png` | Hero screenshot showcase | `01.png`, `02.png` |
| `ai-chat-` | AI Coach screenshots | `ai-chat-1.png`, `ai-chat-2.png` |
| `ai-scan-` | Notebook Scanner screenshots | `ai-scan-1.png` through `ai-scan-4.png` |
| `ai-session-` | Post-Session Insights | `ai-session-analysis.png` |
| `live-session-` | Live Session screenshots | `live-session-1.png` through `live-session-4.png` |

### Sizing (HTML width attributes as failsafe)

| Context | `width` attr | CSS `max-width` |
|---------|-------------|-----------------|
| AI Coach phones | `190` | `190px` |
| Scanner grid | `170` | `170px` |
| Insights single | `220` | `220px` |
| Live Session phones | `220` | `220px` |
| Hero showcase | (none) | `260px` |

### Cache Busting

When replacing images with the same filename, add `?v=N` query string to force browsers to fetch the new version:
```html
<img src="images/ai-scan-1.png?v=2" ...>
```

## Nav Bar

- Links use `white-space: nowrap` to prevent wrapping
- At 480px: font shrinks to `0.72rem`, gap to `8px`
- Keep link text short (single words preferred: "FAQ", "Features", "AI", "Live")

## Key Patterns

### Adding a New Feature Detail Section

1. Add clickable `<a>` card in features grid (class `feature-card feature-card-link`)
2. Add section HTML between existing sections (follow the structure above)
3. Add CSS with themed prefix (badge, glow, numbers, divider)
4. Add tablet breakpoint rules (single column, `direction: ltr`)
5. Add mobile breakpoint rules (smaller fonts, tighter spacing)
6. Add nav link in header

### Screenshot Grid Layouts

- **2 phones side by side**: `.ai-phone-pair` (flexbox, 20px gap)
- **4 phones in 2x2 grid**: `.ai-scanner-grid` (CSS grid, 2 columns)
- **Single phone centered**: `.ai-phone-single` or `.live-phone` (max-width + margin auto)

## Contact Info

- Support: support@trainbjjapp.com
- App Store: https://apps.apple.com/app/train-bjj-jiujitsu-tracker/id6738895825
- Company: Super Core Solutions LLC
