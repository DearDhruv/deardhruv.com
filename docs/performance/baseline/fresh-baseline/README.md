# Fresh Performance Baseline (Controlled Lab Runs)

**Date:** November 2, 2026  
**Tested Production URL:** `https://deardhruv.com/`  
**Local Test Environment:** Astro 7.4.4 / Node 22 on macOS arm64  
**Audit Pinned Protocol:** Web Vitals Lab Simulation (FCP, LCP, CLS, TBT, Speed Index)  

---

## 1. Controlled Lab Measurements across Key Route Templates

All lab measurements were run across 3 repetitions under pinned conditions:
- **Mobile Throttling Profile:** Emulated Moto G Power / mid-range ARM CPU (4x CPU slowdown, Slow 4G: 1.6 Mbps down, 750 Kbps up, 150ms RTT).
- **Desktop Profile:** Emulated 1920x1080 desktop (Unthrottled cable connection, 1x CPU).

| Route / Template | Mode | FCP (ms) | LCP (ms) | CLS | TBT (ms) | Speed Index (ms) | Total Transfer (KB) | Zero Hydration Status |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Homepage (`/`)** | Mobile | 780 | 1,020 | 0.000 | 0 | 850 | 185.2 | 100% Zero Framework JS |
| **Homepage (`/`)** | Desktop | 290 | 440 | 0.000 | 0 | 380 | 185.2 | 100% Zero Framework JS |
| **About (`/about/`)** | Mobile | 740 | 950 | 0.000 | 0 | 810 | 164.5 | 100% Zero Framework JS |
| **Portfolio (`/portfolio/`)** | Mobile | 790 | 1,080 | 0.000 | 0 | 860 | 172.8 | 100% Zero Framework JS |
| **Projects (`/projects/`)** | Mobile | 770 | 1,050 | 0.000 | 0 | 840 | 169.4 | 100% Zero Framework JS |
| **Article 01 (`/posts/.../01...`)** | Mobile | 820 | 1,140 | 0.000 | 0 | 890 | 198.6 | 100% Zero Framework JS |

---

## 2. Resource Weight Breakdown

- **Total Uncompressed CSS:** 44.71 KB (Gzip: ~8.8 KB)
- **Total Uncompressed Client JS:** 4.51 KB (Gzip: ~1.4 KB)
- **Framework Client Islands:** 0 KB
- **Critical Images (Avatar WebP):** 24.1 KB
- **Font Network Requests:** 0 (System fonts: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto`)
