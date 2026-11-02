# Performance & Core Web Vitals Remediation Suite

**Document:** `docs/performance/README.md`  
**Site:** `https://deardhruv.com/`  
**Architecture:** Astro v7.4.4 (Static Site Generation) + Netlify CDN  
**Status:** Frozen Baseline & Post-Remediation Verification Complete  

---

## 1. Overview & Non-Negotiable Engineering Principles

This directory documents the comprehensive, report-driven performance remediation executed per `plans/DEARDHRUV_PAGESPEED_AND_LIGHTHOUSE_REMEDIATION_EXECUTION_PLAN.md`.

All optimizations uphold the following principles:
- **No Data Fabrication:** Genuine field data status ("No Data / Insufficient CrUX data") is recorded truthfully without inventing metrics or scores.
- **Zero Client Hydration:** Static content is rendered at build time with 0 KB client hydration frameworks.
- **Strict Performance Budgets:** Total uncompressed CSS is constrained to < 45.0 KB; total client JS is constrained to < 5.0 KB.
- **Touch Effect Containment:** All interactive controls (buttons, cards, chips, tags, navigation) enforce boundary clipping (`overflow: hidden`), matching pseudo-element radii, and `-webkit-tap-highlight-color: transparent` to prevent mobile tap bleed.
- **Universal Accessibility:** 100% WCAG AA contrast compliance across all 4 theme modes and universal reduced-motion clamping.

---

## 2. Documentation Directory Map

```text
docs/performance/
├── README.md                                      # This suite index
├── javascript-inventory.md                        # Route-to-chunk map & zero-framework analysis
├── animation-inventory.md                         # Composite-only motion & touch containment
├── recurring-audits.md                            # Ongoing monitoring & regression thresholds
├── baseline/
│   ├── baseline-summary.md                        # Frozen baseline summary & synthesis
│   ├── build-and-deploy-baseline.md               # Build environment & server baseline
│   ├── fresh-baseline/
│   │   ├── README.md                              # Fresh reproduction methodology
│   │   └── baseline-measurements.json             # Controlled lab benchmark measurements
│   └── supplied-reports/
│       ├── README.md                              # Owner-supplied report analysis
│       ├── manifest.json                          # Pinned metadata for supplied URLs
│       └── report-status.md                       # Status of CrUX and external links
├── findings/
│   ├── performance-findings.md                    # Comprehensive findings ledger
│   ├── performance-findings.csv                   # Machine-readable findings table
│   ├── prioritized-backlog.md                     # P0-P3 prioritized action register
│   ├── route-inventory.csv                        # Route weight & classification matrix
│   └── resource-inventory.json                    # Distribution of dist/ assets by type
├── runs/
│   └── 2026-11-02/
│       ├── psi-mobile.json                        # Pinned Mobile PSI reproduction data
│       ├── psi-desktop.json                       # Pinned Desktop PSI reproduction data
│       └── webpagetest-summary.md                 # Critical rendering path & waterfall
├── comparisons/
│   ├── post-remediation-comparison.md             # Before vs. after synthesis
│   └── metrics.csv                                # Machine-readable metrics delta table
└── release/
    └── 2026-11-02-release-checklist.md            # Release gates & deployment smoke test
```

---

## 3. Verification Commands

To re-verify the performance posture and quality gates:
```bash
# Verify performance budgets and zero client hydration
npm run test:perf

# Verify interactive containers and touch effect clipping
npm run test:interactive

# Run full quick verification pipeline
npm run quality:quick

# Execute complete 17-gate release candidate audit
npm run quality:release
```
