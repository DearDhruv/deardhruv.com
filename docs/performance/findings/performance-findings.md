# Prioritized Findings Register

**Document:** `docs/performance/findings/performance-findings.md`  
**Date:** November 2, 2026  
**Execution Context:** `plans/DEARDHRUV_PAGESPEED_AND_LIGHTHOUSE_REMEDIATION_EXECUTION_PLAN.md` — Phase 1, Task 1.1  

---

## 1. Finding Records

### Finding PERF-01: Touch Effect & Pseudo-Element Bleed Past Container Bounds
- **Severity:** P1 (User Impact / Mobile Tactile Quality)
- **Status:** `fixed`
- **Affected Elements:** `.btn`, `.card`, `.card-interactive`, `a.card`, `.card-stretched-link::after`, `.chip`, `.tag`, `.badge`, `.site-nav-link`, `.palette-btn`.
- **Evidence:** Tap states and stretched-link pseudo-elements lacked bounding containment on mobile WebKit and Chrome. On tap or hover, highlights and native tap overlays bled outside container rounded corners (`var(--radius-md)`, `var(--radius-sm)`, `var(--radius-full)`).
- **Root Cause:**
  1. Missing `overflow: hidden;` on `.btn`, `.chip`, `.tag`, `.badge`, and navigation action buttons.
  2. Missing `border-radius: inherit;` on `.card-stretched-link::after` and `.card::before`.
  3. Default OS `-webkit-tap-highlight-color` drawing sharp rectangular translucent tap overlays over rounded buttons.
- **Remediation:**
  1. Added `overflow: hidden;` and `position: relative;` to `.btn`, `.card`, `.card-interactive`, `.chip`, `.tag`, `.badge`, `.site-nav-link`, `.header-icon-btn`, `.theme-toggle-btn`, `.palette-btn`, and `.palette-close-btn`.
  2. Added `border-radius: inherit;` to `.card-stretched-link::after`, `.card::before`.
  3. Enforced global `-webkit-tap-highlight-color: transparent;` in `design-system.css`.
  4. Added automated regression assertions to `tests/verify-interactive-containers.js`.
- **Verification:** 14 automated containment checks pass cleanly in `tests/verify-interactive-containers.js`.

---

### Finding PERF-02: Total Uncompressed CSS Budget Exceeded
- **Severity:** P2 (Performance Inefficiency / Parse Overhead)
- **Status:** `fixed`
- **Affected Files:** `static/css/*.css`
- **Evidence:** Total uncompressed CSS footprint reached 45.63 KB, exceeding the strict 45.0 KB budget limit.
- **Root Cause:** Redundant selector declarations (`card-interactive h2, h3, h4...`), multi-line keyframes, unused `--primitive-slate-...` variables, and verbose spacing across CSS files.
- **Remediation:**
  1. Removed unreferenced `--primitive-slate-...`, `--primitive-white`, and unused primitive color tokens from `design-system.css` (-310 bytes).
  2. Consolidated shared card heading selectors via modern `:is(h2, h3, h4, .card-title, .card-stretched-link)` (-250 bytes).
  3. Consolidated table and blockquote descendant selectors via `:is()` (-150 bytes).
  4. Streamlined `@keyframes` formatting in `components.css` and `nav.css` (-170 bytes).
  5. Current uncompressed CSS footprint reduced to **44.71 KB** (< 45.0 KB budget).
- **Verification:** `tests/verify-performance-budgets.js` and `scripts/audit.js --perf` pass 100%.

---

### Finding PERF-03: Zero Client Hydration Island Enforcement
- **Severity:** P1 (Runtime Performance / Mobile Battery)
- **Status:** `fixed`
- **Affected Routes:** All 29 generated routes.
- **Evidence:** Verification of `dist/_astro/` directory for client-side JavaScript bundles.
- **Root Cause:** Client-side hydration frameworks (React, Vue, Svelte) introduce heavy runtime libraries (30–120 KB), causing main-thread execution stalls and high INP.
- **Remediation:** Zero client framework runtime guarantee. All rendering is statically compiled by Astro at build time. Client JS is strictly limited to 4.51 KB of vanilla scripts (`theme-init.js`, `theme-toggle.js`).
- **Verification:** Verified by `tests/verify-performance-budgets.js` and `scripts/audit.js`.

---

### Finding PERF-04: Hero Avatar LCP Delivery Optimization
- **Severity:** P1 (Largest Contentful Paint)
- **Status:** `fixed`
- **Affected Route:** Homepage (`/`).
- **Evidence:** The hero avatar (`pro_pic_small.webp`) is the confirmed Largest Contentful Paint (LCP) element on mobile and desktop viewports.
- **Root Cause:** Risk of delayed LCP if hero image is lazy-loaded or lacks explicit dimensions.
- **Remediation:**
  1. Guaranteed `loading="eager"` (never lazy-loaded) on the hero avatar.
  2. Added `fetchpriority="high"` and `decoding="async"`.
  3. Explicit intrinsic dimensions (`width="180" height="180"`) and responsive CSS sizing preventing layout shift (`CLS = 0.000`).
- **Verification:** `npm run quality:release` and `npm run test:perf` pass cleanly.

---

### Finding PERF-05: Static Asset Immutable Caching
- **Severity:** P2 (Repeat Visit Performance)
- **Status:** `fixed`
- **Affected Assets:** Fingerprinted static assets in `dist/assets/`, `dist/_astro/`, and `dist/css/`.
- **Evidence:** Netlify HTTP response headers check.
- **Root Cause:** Static assets without explicit `Cache-Control` headers can lead to unnecessary re-validation requests.
- **Remediation:** Configured `Cache-Control: public, max-age=31536000, immutable` in `netlify.toml` for static assets, and 30-day caching for icons.
- **Verification:** Verified by `scripts/audit.js` (Section 4).

---

### Finding PERF-06: Field Data Status (CrUX Insufficient Volume)
- **Severity:** P3 (Informational / Compliance with Non-Negotiable Rules)
- **Status:** `fixed`
- **Affected Domain:** `https://deardhruv.com/`
- **Evidence:** PageSpeed Insights displays *"There is not sufficient real-world speed data for this page"* and *"No Data"*.
- **Root Cause:** Traffic volume below Google's 28-day privacy aggregation threshold for Chrome UX Report.
- **Remediation:** Documented field status accurately as **Field data unavailable / not enough CrUX data**. Do not fabricate field scores or claim Core Web Vitals failure.
- **Verification:** Documented in `docs/performance/baseline/supplied-reports/README.md`.
