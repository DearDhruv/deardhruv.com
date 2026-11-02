# Per-Route JavaScript Inventory & Runtime Profile

**Date:** November 2, 2026  
**Document:** `docs/performance/javascript-inventory.md`  
**Execution Context:** `plans/DEARDHRUV_PAGESPEED_AND_LIGHTHOUSE_REMEDIATION_EXECUTION_PLAN.md` — Phase 3, Task 3.1  

---

## 1. Zero-Framework Architecture

DearDhruv.com enforces a strict **Zero-Framework Client Hydration** policy:
- No React, Vue, Svelte, Preact, or Solid runtime bundles are imported or hydrated on the client.
- The `dist/_astro/` directory contains **zero JavaScript files**.
- All interactive components (theme switching, mobile menu toggle, palette selection) are implemented using minimal, dependency-free vanilla JavaScript.

---

## 2. Client-Side Script Inventory

| Script File | Uncompressed Size | Gzip Size | Placement | Purpose | Dependencies |
| :--- | :---: | :---: | :--- | :--- | :--- |
| `js/theme-init.js` | 0.98 KB (1,003 B) | ~0.4 KB | `<head>` inline | Reads `localStorage` / `prefers-color-scheme` and sets `data-theme` and `data-palette` before first paint, completely eliminating theme flashing (FOUC). | None (Vanilla) |
| `js/theme-toggle.js` | 3.53 KB (3,615 B) | ~1.1 KB | Deferred in `<body>` | Binds click and keyboard events for theme switching (light/dark), mobile navigation drawer toggle, and palette selection bar. | None (Vanilla) |
| **Total Client JS** | **4.51 KB** | **~1.5 KB** | — | **Budget: < 5.0 KB uncompressed** | **None** |

---

## 3. Hydration Directives Audit

- `client:load`: 0 occurrences (None)
- `client:idle`: 0 occurrences (None)
- `client:visible`: 0 occurrences (None)
- `client:media`: 0 occurrences (None)
- `client:only`: 0 occurrences (None)

**Conclusion:** 100% of pages are statically rendered to pure HTML at build time. No client-side island hydration overhead exists.

---

## 4. Third-Party Script Review

- **Analytics / Tracking Scripts:** 0 (None).
- **Ad Trackers / Tag Managers:** 0 (None).
- **Third-Party Fonts / CDN Scripts:** 0 (None).
- **External Widget Embeds:** 0 (None).

**Third-Party Cost:** 0 requests, 0 KB transferred, 0ms main-thread CPU cost.
