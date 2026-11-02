# Performance Budgets and Runtime Resource Guardrails

**Document version:** 1.0.0  
**Effective date:** November 2026  
**Scope:** Static build artifacts, client JavaScript payload, CSS bundles, HTML document sizes, and rendering metrics  
**Reference standard:** Section 4.2 & 4.3 of the Web Standards Audit Plan

---

## 1. Resource Footprint Budgets

All static artifacts generated in `dist/` are monitored continuously by `npm run test:perf` and `npm run audit:perf`. Exceeding any budget causes an immediate build failure.

| Resource Category | Budget Limit | Current Measured Baseline | Status | Guardrail Rationale |
|---|---|---|---|---|
| **Client JavaScript Footprint** | <= 5.0 KB uncompressed (< 2 KB gzip) | **4.51 KB** uncompressed | **PASS** | Strict zero-framework architecture. Only vanilla theme toggle and init scripts are permitted. |
| **Client Hydration Bundles (`_astro/`)** | **0.0 KB** (Zero runtime bundles) | **0.0 KB** | **PASS** | No React, Vue, Svelte, Preact, or client-side runtime hydration code. |
| **Total Uncompressed CSS** | <= 45.0 KB uncompressed (< 10 KB gzip) | **44.64 KB** uncompressed | **PASS** | Prevents CSS bloat. Modular separation (`design-system`, `typography`, `layout`, `nav`, `components`). |
| **Per-Route HTML Document Size** | <= 100.0 KB uncompressed (< 20 KB gzip) | **98.13 KB** (deepest article) | **PASS** | Guarantees rapid initial paint and minimal DOM parsing overhead on mobile CPUs. |
| **Third-Party External Scripts** | **Zero (0 scripts)** | **0 scripts** | **PASS** | No third-party analytics, ads, tracking pixels, or external widgets. |
| **Web Font Network Payload** | **0.0 KB** | **0.0 KB** | **PASS** | Pure system font stack; zero network font downloads; zero layout shift (CLS: 0). |
| **Static Build Duration** | <= 3,500 ms | **~1,400 ms** | **PASS** | Fast developer feedback and rapid CI pipeline execution. |
| **DOM Element Count** | <= 1,500 elements | **< 600 elements** (avg ~350) | **PASS** | Keeps browser memory use low and DOM traversal lightning fast on low-end hardware. |

---

## 2. Core Web Vitals Lab Targets (75th Percentile)

| Metric | Target Threshold | Site Implementation Strategy |
|---|---|---|
| **Largest Contentful Paint (LCP)** | **<= 2.5 seconds** | Pure static HTML, zero client JS blocking paint, instant system fonts, pre-optimized local avatars. |
| **Interaction to Next Paint (INP)** | **<= 200 milliseconds** | Zero JavaScript event listeners running on main thread; passive listeners only; zero hydration waterfalls. |
| **Cumulative Layout Shift (CLS)** | **<= 0.1** (Target: **0.00**) | System fonts (zero font swap shift), explicit `width` and `height` attributes on images, CSS aspect ratios. |
| **First Contentful Paint (FCP)** | **<= 1.8 seconds** | Fast CDN edge response, compressed static HTML, critical styles in head. |
| **Total Blocking Time (TBT)** | **<= 200 milliseconds** (Target: **0 ms**) | Zero main-thread JavaScript execution during page load. |
| **Time to First Byte (TTFB)** | **<= 800 milliseconds** | Netlify Global Edge CDN distribution, immutable asset caching, pre-rendered static files. |

---

## 3. Enforcement & Verification

- `node tests/verify-performance-budgets.js`: Verifies build time, CSS size, client JS footprint, and zero hydration guarantee.
- `node scripts/audit.js --perf`: Validates production HTML document sizes and cache headers.
- Budgets may not be relaxed or increased without documented engineering justification, architectural review, and explicit release signoff.
