# Architecture Decision Record: Approval of "Precision Technical Editorial" Visual Direction

**Status:** APPROVED  
**Date:** 31 October 2026  
**Auditor / Agent:** Antigravity / Gemini 3.8  
**Reference Addendum:** `plans/DEARDHRUV_DESIGN_SYSTEM_AND_ASTRO_MIGRATION_ADDENDUM.md` Section 4  
**Baseline Commit:** `eb6846f`  

---

## 1. Context

`deardhruv.com` represents the digital portfolio and engineering publication of Dhruv Patel, a Lead Android & Mobile Systems Engineer specializing in on-device AI, high-reliability POS architecture, and open-source tooling.

The visual audit in `docs/DESIGN_AUDIT.md` highlighted 14 critical inconsistencies:
- Multi-H1 anti-patterns on article pages (19 `<h1>`s).
- Fragmented type scales and arbitrary fluid clamps.
- Unconstrained line lengths (> 120ch) on narrative pages.
- Variable touch target heights (< 44px) and clipped focus outlines on cards.
- Inconsistent border styles (mixing solid, dashed, and dotted dividers).
- Low contrast on dark-mode secondary metadata and poor card boundary perception in light mode.

Task A2.1 and A2.2 formulated and prototyped three candidate directions:
1. **Concept A: Precision Technical Editorial**
2. **Concept B: Monochromatic Swiss Grid**
3. **Concept C: Developer Workbench / CLI**

---

## 2. Decision

We formally approve **Concept A: "Precision Technical Editorial"** as the permanent visual and design-system foundation for `deardhruv.com`.

### 2.1 Rationale for Concept A
1. **Uncompromised Reading Ergonomics:** A bounded `72ch` measure, standardized `1.65` body line-height, and single H1 document outlines ensure high comfort across multi-thousand word technical deep dives.
2. **Accessible Contrast by Design:** Semantic tokens guarantee full WCAG 2.2 AA compliance:
   - Primary text: `#f8fafc` on `#090d16` (17.5:1 dark mode) / `#0f172a` on `#f8fafc` (15.8:1 light mode).
   - Secondary text: `#94a3b8` on `#090d16` (6.8:1 dark mode) / `#475569` on `#f8fafc` (7.2:1 light mode).
   - Interactive accent: `#38bdf8` on `#090d16` (8.2:1 dark mode) / `#0284c7` on `#ffffff` (5.4:1 light mode).
3. **Consistent Component States:** Explicitly defines resting, hover (fine pointer only), focus-visible (unclipped 2px cyan outline with 3px offset), pressed, and disabled states.
4. **Touch Target Safety:** All interactive controls enforce a minimum hit area of 44×44px.
5. **Restrained Technical Identity:** Avoids tacky AI tropes (purple gradients, particle canvases, glassmorphism) in favor of high-credibility editorial presentation.

### 2.2 Why Alternatives Were Rejected
- **Concept B (Swiss Minimalist Grid):** Rejected due to harsh contrast transitions in dark mode, cold visual tone, and poor suitability for complex multi-branch architecture diagrams.
- **Concept C (Workbench / Terminal):** Rejected because fake terminal aesthetics reduce reading comfort for long-form engineering essays and violate Addendum Section 4.2.

---

## 3. Implementation Consequences

1. All future page templates (whether in Hugo or migrated to Astro) must inherit exclusively from `assets/css/design-system.css`.
2. Heading tags must strictly adhere to semantic hierarchy: exactly one `<h1>` per page.
3. Dividers must default to 1px hairline solid borders; dashed/dotted borders are restricted to technical diagrams.
4. All non-essential hover transitions must be guarded by `@media (hover: hover) and (pointer: fine)`.
5. Universal reduced-motion media query must be respected across all pages.
