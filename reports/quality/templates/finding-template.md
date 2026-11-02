# Standard Quality Audit Finding Template

```yaml
id: PERF-001 # Category prefix + sequential index (PERF, A11Y, HTML, RESP, SEC, SEO)
category: performance # accessibility | html | responsive | performance | security | seo
severity: high # blocker | critical | high | medium | low | informational
status: confirmed # confirmed | suspected | remediated | accepted-risk
route: /
component: HeroSection
standard_or_metric: LCP
observed: "LCP element is an oversized image without responsive srcset"
expected: "Responsive image with appropriate srcset, dimensions, and webp format"
evidence:
  - "reports/quality/latest/summary.json"
  - "dist/index.html"
test_environment:
  browser: "Chrome stable (Blink)"
  viewport: "390x844 CSS px"
  network: "Configured mobile profile"
  cpu_throttle: "None / 4x slowdown"
recommended_fix: "Serve responsive WebP avatar and specify intrinsic width/height"
verification: "Re-run npm run quality:perf and confirm bundle within budget"
```
