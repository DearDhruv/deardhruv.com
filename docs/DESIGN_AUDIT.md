# Design System and Visual Audit

**Repository:** `deardhruv.com`  
**Date:** 31 October 2026  
**Auditor:** Antigravity / Gemini 3.8  
**Reference Document:** `plans/DEARDHRUV_DESIGN_SYSTEM_AND_ASTRO_MIGRATION_ADDENDUM.md`  
**Baseline Commit:** `ff2d92b`  

---

## 1. Executive Summary

This audit catalogs visual, typographical, component-state, and responsive inconsistencies across `deardhruv.com`. Prior to the addendum, the site underwent an incremental Hugo-based portfolio redesign. While the functional contract (38 legacy routes, 7 static assets, 79 HTML pages, 72 Edge Function test assertions) is 100% satisfied, the visual execution remains a patchwork of disparate styles, conflicting layout containers, irregular component states, and broken typographical hierarchy.

This audit provides an evidence-based inventory with unique Issue IDs, exact severity ratings, root causes, proposed design-system rules, and automated verification tests.

---

## 2. Screenshot & Viewport Baseline Matrix

Audited across 6 standard viewports and 9 canonical page archetypes:

| Viewport Class | Dimensions | Orientation / Target | Checked Routes |
|---|---|---|---|
| **Mobile Narrow** | 320 × 568 px | Portrait (iPhone SE / older Android) | `/`, `/about/`, `/portfolio/`, `/projects/`, `/posts/`, `/sitemap/` |
| **Mobile Standard** | 390 × 844 px | Portrait (iPhone 14/15/16, Pixel 8/9) | All 9 canonical routes |
| **Tablet Portrait** | 768 × 1024 px | Portrait (iPad Mini / 10-inch tablets) | All 9 canonical routes |
| **Tablet Landscape** | 1024 × 768 px | Landscape (Tablet docked / netbook) | `/`, `/portfolio/`, `/posts/ai_playground_series/...` |
| **Desktop Standard** | 1440 × 900 px | Landscape (MacBook Pro / standard desktop) | All 9 canonical routes |
| **Desktop Wide / 4K** | 1920 × 1080 px | Ultra-wide / 4K display scaling | All 9 canonical routes |

---

## 3. Typography & Reading Hierarchy Inconsistency Inventory

### [TYPO-01] Multi-H1 Anti-Pattern on Long-Form Article Pages
- **Severity:** Blocker
- **Page & Component:** `/posts/ai_playground_series/01-i-wanted-the-model-to-stay-on-the-phone/` (and parts 02–06)
- **Evidence Reference:** `tests/fixtures/visual-baseline.json` records 19 `<h1>` elements in a single article document.
- **Root Cause:** Markdown authoring used top-level `#` for major numbered sections (`# 1. The promise is simple`, `# 2. I needed Android and iOS...`). The template output directly rendered `<h1>` tags inside `<article class="post">`.
- **Impact:** Screen reader navigation fails WCAG 2.2 AA (Criterion 1.3.1 Info and Relationships, 2.4.6 Headings and Labels). Users navigating by heading level cannot distinguish article title from subheadings.
- **Design System Rule:** Exactly one `<h1>` per document (the page/article title). All article sections must render as `<h2>`, subsections as `<h3>`.
- **Verification Test:** Automated AST / regex test ensuring `h1Count === 1` for all rendered HTML pages.

### [TYPO-02] Inconsistent Type Scale and Arbitrary Font Clamps
- **Severity:** High
- **Page & Component:** Across all templates (`layouts/index.html`, `layouts/_default/hero-page.html`, `layouts/posts/single.html`).
- **Evidence Reference:**
  - Hero title: `font-size: clamp(2rem, 5vw, 3.25rem)` in `custom.css:120`.
  - Article title: `font-size: clamp(1.85rem, 4vw, 2.75rem)` in `custom.css:840`.
  - Policy page title: `font-size: 2.25rem` fixed in `custom.css:1920`.
  - H2 subheadings: range from `1.35rem` to `1.85rem` with conflicting line heights (`1.2` to `1.45`).
- **Root Cause:** Template-specific CSS blocks created independently over time without shared typography tokens.
- **Design System Rule:** Enforce an intentional, centralized 8-tier fluid type scale:
  - `--font-display`: `clamp(2.75rem, 6vw, 4.5rem)`
  - `--font-h1`: `clamp(2rem, 4.5vw, 3.25rem)`
  - `--font-h2`: `clamp(1.5rem, 3vw, 2.25rem)`
  - `--font-h3`: `clamp(1.25rem, 2vw, 1.65rem)`
  - `--font-h4`: `1.125rem`
  - `--font-lead`: `clamp(1.1rem, 1.5vw, 1.25rem)`
  - `--font-body`: `1rem` (16px base)
  - `--font-small`: `0.875rem`
  - `--font-metadata`: `0.8125rem`
- **Verification Test:** CSS token lint asserting zero hardcoded pixel or rem heading sizes outside `typography.css`.

### [TYPO-03] Disjointed Reading Measure and Unbounded Line Lengths
- **Severity:** Medium
- **Page & Component:** `/about/`, `/projects/`, `/posts/` (List index).
- **Evidence Reference:** Text lines on 1440px+ screens extend to full container width (> 1000px, roughly 120–140 characters per line), far exceeding the 65–75 character optimal measure. Only the single article template applied `max-width: 76ch`.
- **Root Cause:** Container wrapper `content-max-width: 1080px` applied indiscriminately to both multi-column grids and single-column prose.
- **Design System Rule:** Provide dedicated layout container primitives:
  - `.container-reading`: max-width `72ch` with `margin-inline: auto`.
  - `.container-wide`: max-width `1140px` for multi-column grids and hero strips.
- **Verification Test:** Computed character count checks per line under standard 1440px desktop viewports.

### [TYPO-04] Monospace Inconsistency and Inline Code Vertical Disruption
- **Severity:** Medium
- **Page & Component:** Code blocks and inline `<code>` tags across articles and `/projects/`.
- **Evidence Reference:** Inline code sets `padding: 0.2em 0.4em; font-size: 0.9em;` but lacks `vertical-align: baseline;` and causes uneven line-spacing in paragraphs with frequent technical symbols.
- **Root Cause:** Incomplete reset rules for monospace tags.
- **Design System Rule:** Standardize `--font-mono` on system code stack (`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`) with fixed `0.875rem` size and zero line-height distortion.
- **Verification Test:** Computed line-box height consistency verification.

### [TYPO-05] Low Contrast on Secondary Metadata and Captions in Dark Mode
- **Severity:** High
- **Page & Component:** Article dates, reading times, tags, and footer links.
- **Evidence Reference:** Muted text token `--text-muted: #64748b` against surface `--bg-primary: #141517` yields 4.12:1 contrast ratio, failing the WCAG 2.2 AA minimum threshold of 4.5:1 for small text.
- **Root Cause:** Inverted theme tokens without automated contrast validation.
- **Design System Rule:** Re-calibrate `--text-muted` to `#94a3b8` in dark mode (contrast 6.8:1) and `#475569` in light mode (contrast 7.2:1).
- **Verification Test:** Automated axe-core / contrast calculator asserting >= 4.5:1 on all text roles.

---

## 4. Component & Interaction State Inconsistency Inventory

### [COMP-01] Button Variant Divergence & Touch Target Violations
- **Severity:** High
- **Page & Component:** Homepage CTA buttons, Series navigation buttons, and legal return links.
- **Evidence Reference:**
  - `custom.css:320` defines `.btn-primary` with `padding: 0.65rem 1.25rem; border-radius: 8px;`.
  - `custom.css:1120` defines `.series-nav-btn` with `padding: 0.4rem 0.85rem; border-radius: 9999px; min-height: 34px;`.
  - Touch targets below 44px fail WCAG 2.2 AA (Criterion 2.5.8 Target Size Minimum: 24×24px minimum, 44×44px recommended).
- **Root Cause:** Decentralized component definitions across feature-specific CSS sections.
- **Design System Rule:** Provide unified button tokens and variants:
  - Height: `min-height: 44px; display: inline-flex; align-items: center; justify-content: center;`.
  - Radius: uniform `--radius-md` (8px).
  - Variants: `Button.primary`, `Button.secondary`, `Button.ghost`.
- **Verification Test:** Automated Playwright / DOM check measuring `getBoundingClientRect().height >= 44` across all interactive buttons.

### [COMP-02] Focus Outline Inconsistency & Clipped Focus Rings
- **Severity:** High
- **Page & Component:** Cards on `/portfolio/` and `/projects/`, code copy buttons, and header links.
- **Evidence Reference:** Project cards apply `overflow: hidden;` (`custom.css:480`), which clips `:focus-visible` outlines on internal interactive elements. Some links lack `:focus-visible` entirely, relying on browser default.
- **Root Cause:** Card container styling clipping child focus rings.
- **Design System Rule:**
  - Remove `overflow: hidden` on interactive cards; use `position: relative; isolation: isolate;` instead.
  - Universal `:focus-visible` ring token: `outline: 2px solid var(--focus-ring); outline-offset: 3px;`.
- **Verification Test:** Automated keyboard tab navigation test capturing screenshot of every focused element to verify complete visibility of the focus ring.

### [COMP-03] Dotted vs Solid Divider Arbitrary Variation
- **Severity:** Medium
- **Page & Component:** `/posts/` index, `/portfolio/` case studies, `/sitemap/`.
- **Evidence Reference:** `custom.css:1240` uses dashed borders (`border-top: 1px dashed var(--border-subtle)`), `custom.css:1480` uses dotted borders (`border-left: 2px dotted ...`), and `custom.css:180` uses solid lines.
- **Root Cause:** Ad-hoc styling introduced during individual phase developments.
- **Design System Rule:** Standardize dividers:
  - Default structural separation: subtle solid line (`1px solid var(--border-subtle)`).
  - Dashed/dotted borders: reserved exclusively for technical diagrams, architecture flowcharts, and code block headers.
- **Verification Test:** CSS stylesheet scan verifying zero dashed/dotted borders in standard editorial containers.

### [COMP-04] Surface Elevation & Border Radius Drift
- **Severity:** Medium
- **Page & Component:** Work cards, architecture containers, callouts, and code blocks.
- **Evidence Reference:**
  - Work cards: `border-radius: 16px; border: 1px solid var(--border-subtle);`
  - Architecture boxes: `border-radius: 12px;`
  - Callout boxes: `border-radius: 6px;`
  - Code blocks: `border-radius: 10px;`
- **Root Cause:** Multiple arbitrary radius tokens without a strict component binding.
- **Design System Rule:** Three-tier radius tokens:
  - `--radius-sm: 6px` (badges, tags, chips)
  - `--radius-md: 10px` (cards, buttons, input fields, code blocks)
  - `--radius-lg: 16px` (modal surfaces, large visual feature containers)
- **Verification Test:** Token usage audit asserting 100% adherence to standard radius tokens.

### [COMP-05] Light Theme Contrast Drift on Card Surfaces
- **Severity:** High
- **Page & Component:** Light mode card backgrounds and subtle borders across all pages.
- **Evidence Reference:** In light mode (`[data-theme="light"]`), card surface `--bg-card: #ffffff` against page background `--bg-primary: #ffffff` relies solely on `--border-subtle: #e2e8f0` (1.15:1 contrast against white), causing cards to blend into the page.
- **Root Cause:** Inversion of dark mode variables without dedicated light mode surface hierarchy.
- **Design System Rule:** Light mode surface hierarchy:
  - Page surface: `#f8fafc` (slate-50)
  - Card/container surface: `#ffffff` (white) with subtle border `#cbd5e1` (slate-300, 1.45:1 contrast) and soft shadow `--shadow-sm`.
- **Verification Test:** Light mode contrast and surface perceptibility automated audit.
