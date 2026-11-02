# Archive of Supplied PageSpeed Insights & Lighthouse Reports

**Retrieval Date:** November 2, 2026  
**Audited Target:** `https://deardhruv.com/`  
**Execution Context:** `plans/DEARDHRUV_PAGESPEED_AND_LIGHTHOUSE_REMEDIATION_EXECUTION_PLAN.md` — Phase 0, Task 0.1  

---

## 1. Supplied Report Inventory

The site owner supplied three external performance report links:

| Report Type | Form Factor / Environment | Supplied Target URL |
| :--- | :--- | :--- |
| **Google PageSpeed Insights** | Desktop | [Desktop Report](https://pagespeed.web.dev/analysis/https-deardhruv-com/t7y4njv7mq?form_factor=desktop) |
| **Google PageSpeed Insights** | Mobile | [Mobile Report](https://pagespeed.web.dev/analysis/https-deardhruv-com/t7y4njv7mq?form_factor=mobile) |
| **Lighthouse Metrics** | Automated CI Check | [Lighthouse Check](https://lighthouse-metrics.com/lighthouse/checks/008436db-d9bf-4b32-8a1d-ebdc14010afa) |

---

## 2. Retrieval & Verification Observations

1. **PageSpeed Insights Report Pages (`t7y4njv7mq`):**
   - **Report Timestamp:** Displayed as **November 2, 2026, 8:01:10 AM**.
   - **Chrome User Experience Report (CrUX) Status:** Explicitly indicated: *"There is not sufficient real-world speed data for this page."*
   - **Real-User Speed Status:** Displayed **No Data** across Core Web Vitals (LCP, INP, CLS) and supplementary field metrics (FCP, TTFB).
   - **Dynamic Audit Payload:** The live web pages utilize an asynchronous client-side Angular/WIZ application architecture (`/_/PagespeedUi`). Direct programmatic HTTP requests to the public Google PSI API without an API key returned HTTP 429 rate limit errors.
   - **Compliance with Non-Negotiable Rule 4:** As mandated by the plan, no scores or metric values are fabricated or assumed. The field status is archived strictly as **Field data unavailable / not enough CrUX data**.

2. **Lighthouse Metrics Check (`008436db-d9bf-4b32-8a1d-ebdc14010afa`):**
   - The remote check endpoint timed out during network inspection from the audit runtime.
   - Per Phase 0 Task 0.1 instructions, the status is cataloged as **External service timeout / fresh local reproduction required**.

3. **Fresh Reproduction Strategy:**
   - In accordance with Section 1.4 (item 6) and Section 4 (Task 0.4), fresh reproductions were generated and archived under `docs/performance/baseline/fresh-baseline/` and `docs/performance/runs/2026-11-02/`, clearly labeled **fresh reproduction**.

---

## 3. Archive Manifest

- `manifest.json`: Machine-readable metadata and retrieval ledger.
- `report-status.md`: Technical investigation into CrUX thresholds, WIZ payload inspection, and reproduction methodology.
