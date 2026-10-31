# Icon and Divider Standards Specification

**Status:** APPROVED  
**Date:** 31 October 2026  
**Auditor / Agent:** Antigravity / Gemini 3.8  
**Reference Document:** `plans/DEARDHRUV_DESIGN_SYSTEM_AND_ASTRO_MIGRATION_ADDENDUM.md` Section 5.6 & 5.7  
**Baseline Commit:** `e2d2eaa`  

---

## 1. Iconography Standards

To guarantee visual unity across all site components, `deardhruv.com` standardizes on an inline SVG outline icon set derived from the Lucide system.

### 1.1 Dimensional Grid & Stroke Weight
- **Stroke Width:** Exactly `1.75px` across all sizes (scales cleanly on both standard and Retina displays).
- **Line Caps & Joins:** `stroke-linecap="round"` and `stroke-linejoin="round"`.
- **Coordinate Space:** Native `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`.

| Size Class | Dimensions (CSS) | Intended Usage | Margin / Text Gap |
|---|---|---|---|
| **Micro** | 14 × 14 px | Metadata chips, dates, reading time | `var(--space-1)` (4px) |
| **Small** | 16 × 16 px | Button icons, external link arrows | `var(--space-2)` (8px) |
| **Medium** | 20 × 20 px | Header navigation controls, theme switcher | `var(--space-2)` (8px) |
| **Feature** | 24 × 24 px | Card header highlights, section badges | `var(--space-3)` (12px) |

### 1.2 Accessibility Invariants
1. **Decorative Icons:** Any icon adjacent to descriptive text must include `aria-hidden="true"`.
2. **Icon-Only Buttons:** Any interactive control without visible text (e.g. mobile menu hamburger, theme toggle button, code-copy button) must provide an explicit `aria-label` describing the action (e.g. `aria-label="Toggle visual theme"`).
3. **Touch Safety:** Icon buttons must have CSS `min-height: 44px; min-width: 44px;` hit targets.
4. **Color Independence:** Icons must inherit `currentColor` so they naturally match text hierarchy and contrast.

---

## 2. Divider and Border Rules

The visual audit in `docs/DESIGN_AUDIT.md` identified that haphazard mixing of dashed, dotted, and solid lines disrupted visual calm. The following rules govern all borders:

### 2.1 Divider Archetypes
1. **Subtle Solid Divider (`1px solid var(--color-divider)`):**
   - **Allowed Use:** Standard structural separation between page sections, article headers, navigation bars, and footer blocks.
   - **Rationale:** Keeps the editorial reading flow clean and uncluttered.
2. **Hairline Card Border (`1px solid var(--color-border-subtle)`):**
   - **Allowed Use:** Framing surface cards, code panels, and callout blocks.
3. **Technical Dashed Line (`1px dashed var(--color-border-strong)`):**
   - **Allowed Use:** Restricted strictly to technical architecture diagrams (Mermaid flowcharts), hardware interface schematics, and boundary lines between speculative decoding runtimes.
   - **Forbidden Use:** Standard editorial paragraph breaks or article separators.
4. **Dotted Tree Guide (`1.5px dotted var(--color-border-subtle)`):**
   - **Allowed Use:** Restricted strictly to hierarchical directory/route trees on `/sitemap/`.
   - **Forbidden Use:** Underlines, button borders, or card outlines.

### 2.2 Border Radius Enforcements
- Tags, Chips, Badges: `--radius-sm` (6px)
- Cards, Code Blocks, Buttons: `--radius-md` (10px)
- Modal Surfaces, Hero Visual Panels: `--radius-lg` (16px)
- Circular Avatars, Pill Buttons: `--radius-full` (9999px)
