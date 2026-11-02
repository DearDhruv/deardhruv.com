# Technical Status & Interpretation of Supplied Reports

**Document:** `docs/performance/baseline/supplied-reports/report-status.md`  
**Date:** November 2, 2026  

---

## 1. CrUX Field Data Coverage

The Chrome User Experience Report (CrUX) aggregates real-world performance metrics from millions of Chrome users who have opted into syncing their browsing history and have usage statistic reporting enabled.

For personal portfolio and specialized engineering sites such as `https://deardhruv.com/`:
- Google requires a minimum threshold of eligible unique page loads over a 28-day rolling window for origin-level and URL-level data to meet aggregation privacy criteria.
- When this threshold is not reached, PageSpeed Insights returns:
  > *"There is not sufficient real-world speed data for this page."*
- **Engineering Rule:** The absence of CrUX data is not a failure, nor is it evidence that the website is slow. It signifies insufficient sample volume. All field performance evaluations remain marked as **Field data unavailable / not enough CrUX data**.

---

## 2. Technical Inspection of PSI URL Parameters

The provided links:
- `https://pagespeed.web.dev/analysis/https-deardhruv-com/t7y4njv7mq?form_factor=desktop`
- `https://pagespeed.web.dev/analysis/https-deardhruv-com/t7y4njv7mq?form_factor=mobile`

Both point to report run token `t7y4njv7mq`.
- When loaded via standard HTTP clients, the page serves an initial HTML shell containing WIZ framework state:
  ```json
  {"MUE6Ne":"chrome-lightbrary-ui","cfb2h":"boq_chrome-lightbrary-ui_20261028.04_p0","y2FhP":"prod"}
  ```
- The actual audit scores and diagnostic trees are rendered asynchronously via Google internal endpoints (`/_/PagespeedUi/`).
- Direct automated REST queries to `https://www.googleapis.com/pagespeedonline/v5/runPagespeed` without an authenticated API key result in standard HTTP 429 quota exhaustion.

---

## 3. Lighthouse Metrics Check Status

The check URL:
- `https://lighthouse-metrics.com/lighthouse/checks/008436db-d9bf-4b32-8a1d-ebdc14010afa`
- The endpoint was unreachable / timed out during initial audit discovery.
- In compliance with Phase 0 Task 0.1, fresh reproductions have been generated using pinned local audit scripts and reproducible browser engines.
