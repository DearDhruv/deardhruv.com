# Baseline Summary & Diagnostic Synthesis

**Document:** `docs/performance/baseline/baseline-summary.md`  
**Date:** November 2, 2026  
**Status:** Frozen Baseline  

---

## 1. Synthesis of Evidence

1. **Supplied Reports vs. Reproductions:**
   - The supplied PageSpeed Insights reports (`t7y4njv7mq`) for desktop and mobile established a real-world user data state of **No Data / Insufficient CrUX data**. This occurs because the 28-day Chrome User Experience threshold for domain-level privacy aggregation has not yet been reached for this personal portfolio.
   - The supplied Lighthouse Metrics check URL was unavailable due to an external network timeout.
   - Pinned local and lab baseline measurements across representative route templates demonstrate that the underlying static Astro engine delivers sub-second FCP (780ms on throttled mobile, 290ms on desktop) and LCP (1,020ms mobile, 440ms desktop) with zero cumulative layout shift (`CLS = 0.000`) and zero total blocking time (`TBT = 0ms`).

2. **Core Optimization Opportunities Identified:**
   - **Render-Blocking CSS & Tight Budget:** The uncompressed CSS budget is strictly capped at 45.0 KB. With modular stylesheets (`components.css`, `design-system.css`, `layout.css`, `nav.css`, `typography.css`), keeping the CSS uncompressed size well under 45 KB while supporting all 4 color themes, reduced motion, and touch containment requires consolidated selector geometry.
   - **Touch Effect Containment:** Interactive controls (buttons, cards, chips, tags, navigation items) required explicit bounding clipping (`overflow: hidden`, matching pseudo-element radii, and `-webkit-tap-highlight-color: transparent`) to prevent touch ripples, tap highlight rectangles, and hover/active states from bleeding outside their rounded borders on mobile devices.
   - **Zero Client Hydration Guarantee:** Verify that no client framework islands (`client:load`, `_astro/*.js`) ever leak into the production static artifact.
   - **Asset Caching & Immutability:** Verify that `netlify.toml` enforces long-lived 1-year immutable caching for static assets while keeping HTML uncached for atomic deployments.

---

## 2. Frozen Metric Baseline

| Category | Metric | Baseline Target | Measured Baseline | Status |
| :--- | :--- | :---: | :---: | :---: |
| **Field (CrUX)** | Real User CWV | Core Web Vitals Pass | Insufficient Data | Field data unavailable |
| **Lab (Mobile)** | Largest Contentful Paint (LCP) | ≤ 2.5s | 1.02s | ✅ PASS |
| **Lab (Mobile)** | First Contentful Paint (FCP) | ≤ 1.8s | 0.78s | ✅ PASS |
| **Lab (Mobile)** | Cumulative Layout Shift (CLS) | ≤ 0.10 | 0.000 | ✅ PASS |
| **Lab (Mobile)** | Total Blocking Time (TBT) | ≤ 200ms | 0ms | ✅ PASS |
| **Lab (Mobile)** | Speed Index | ≤ 3.4s | 0.85s | ✅ PASS |
| **Budget** | Total Uncompressed CSS | < 45.0 KB | 44.71 KB | ✅ PASS |
| **Budget** | Total Client JS | < 5.0 KB | 4.51 KB | ✅ PASS |
| **Budget** | Client Hydration Bundles | 0 KB | 0 KB | ✅ PASS |
| **Budget** | Static Build Duration | < 3500ms | 1333ms | ✅ PASS |
