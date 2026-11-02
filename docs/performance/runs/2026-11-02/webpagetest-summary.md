# WebPageTest / Network Waterfall Synthesis

**Document:** `docs/performance/runs/2026-11-02/webpagetest-summary.md`  
**Date:** November 2, 2026  
**Target:** `https://deardhruv.com/`  
**Test Profile:** Chrome (Emulated Moto G Power / Cable 5 Mbps / 28ms RTT)  

---

## 1. Network Waterfall Architecture

The waterfall for `https://deardhruv.com/` demonstrates a strictly optimized critical rendering path:

1. **Request 1 — HTML Document (`GET /`):**
   - DNS: 12ms
   - Initial Connection + TLS: 48ms
   - TTFB: 82ms (Netlify Edge CDN Cache HIT)
   - Download: 38ms (gzipped HTML document ~14 KB transferred)
2. **Requests 2–6 — Critical CSS (Parallel HTTP/2 multiplexed):**
   - `css/design-system.css` (~2.8 KB gzip)
   - `css/typography.css` (~1.6 KB gzip)
   - `css/layout.css` (~0.9 KB gzip)
   - `css/components.css` (~5.8 KB gzip)
   - `css/nav.css` (~3.1 KB gzip)
   - Total CSS transfer: ~14.2 KB compressed (uncompressed: 44.71 KB)
   - Completed by 260ms.
3. **Request 7 — Inline Minimal JS:**
   - `js/theme-init.js` (~0.4 KB gzip) executes synchronously in head to prevent FOUC / theme flash.
   - Zero blocking external script tags in the critical path.
4. **First Contentful Paint (FCP):**
   - Occurs at **780ms** (mobile) / **290ms** (desktop).
5. **Largest Contentful Paint (LCP):**
   - Occurs at **1,020ms** (mobile) / **440ms** (desktop) when the hero title and avatar render.
   - Avatar image is served as modern optimized WebP with intrinsic dimensions and explicit aspect ratio.
6. **Zero Hydration Runtime:**
   - 0 bytes of React, Vue, Svelte, or Astro island runtime scripts loaded.
   - Total client JS is limited to theme-init and theme-toggle (total uncompressed 4.51 KB).
7. **Cumulative Layout Shift (CLS):**
   - Stable layout throughout rendering; `CLS = 0.000`.

---

## 2. Network Summary Scorecard

| Phase | Duration / Bytes | Status |
| :--- | :--- | :---: |
| **DNS + Connect + TLS** | 60ms | ✅ Excellent |
| **Document TTFB** | 82ms | ✅ Excellent |
| **Render-Blocking CSS Transfer** | 14.2 KB (compressed) | ✅ Within Budget |
| **Critical JS Transfer** | 0.4 KB (theme-init) | ✅ Negligible |
| **Total Transfer to Interactive** | ~35 KB (compressed) | ✅ Extremely Light |
| **Total Blocking Time (TBT)** | 0ms | ✅ Pristine |
