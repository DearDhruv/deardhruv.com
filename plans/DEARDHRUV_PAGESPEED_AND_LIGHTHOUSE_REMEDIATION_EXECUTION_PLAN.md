# DearDhruv.com — PageSpeed & Lighthouse Remediation Execution Plan

**Document type:** Independent, report-driven engineering execution plan  
**Target:** `https://deardhruv.com/`  
**Current architecture assumption:** Astro + Netlify; verify against the checked-out repository before changing anything. Do not assume Hugo.  
**Primary report set:** Google PageSpeed Insights desktop/mobile and Lighthouse Metrics report supplied by the site owner.  
**Execution style:** Small, independently verifiable tasks; one focused Git commit per completed task; durable handoff notes after every phase.  
**Production policy:** No direct production edits. Use a branch and Netlify Deploy Preview until release gates pass.

---

## 0. Mission and non-negotiable rules

The objective is to use the supplied PageSpeed and Lighthouse report set as the starting evidence, reproduce the current performance baseline, identify root causes, improve the real experience of the website, and prevent future regressions.

This is not a request to maximize Lighthouse numbers by hiding content, removing useful functionality, delaying content, or applying superficial score hacks. Prioritize a fast, stable, accessible and visually correct experience for real visitors on both capable and constrained devices.

### Non-negotiable rules

1. The site has moved away from Hugo. Verify the current repository and build configuration; do not migrate back to Hugo or introduce a second framework.
2. Preserve all existing public URLs, article slugs, feeds, aliases, canonical URLs, downloadable assets and machine-readable endpoints unless the owner explicitly approves a change.
3. Do not delete or visually hide content solely to improve a score.
4. Do not invent PageSpeed/Lighthouse scores, metric values, savings estimates, field data or test results.
5. Do not claim a fix is complete because a Lighthouse score increased once. Re-run controlled tests and inspect the actual trace/resource evidence.
6. Preserve the site's design identity and visual quality. Performance improvements must not silently flatten or remove intentional design.
7. Keep JavaScript minimal. Do not make static content depend on client-side JavaScript when Astro can render it at build time.
8. Avoid adding dependencies unless the measurable benefit exceeds their bundle, maintenance, security and runtime cost.
9. No secrets, API keys, personal tokens or private environment values may be committed.
10. Every completed task requires tests, evidence, a commit, and an updated handoff note.
11. Do not deploy unreviewed changes directly to production.
12. If a report cannot be retrieved, record the limitation and regenerate it. Never substitute guesses for missing diagnostics.

---

## 1. Supplied reports and evidence status

### 1.1 Report links supplied by the owner

| Report | Link | Requested mode |
|---|---|---|
| Google PageSpeed Insights | [Desktop report](https://pagespeed.web.dev/analysis/https-deardhruv-com/t7y4njv7mq?form_factor=desktop) | Desktop |
| Google PageSpeed Insights | [Mobile report](https://pagespeed.web.dev/analysis/https-deardhruv-com/t7y4njv7mq?form_factor=mobile) | Mobile |
| Lighthouse Metrics | [Lighthouse check](https://lighthouse-metrics.com/lighthouse/checks/008436db-d9bf-4b32-8a1d-ebdc14010afa) | Report-specific check; determine its settings from the report itself |

### 1.2 What could be verified during preparation of this plan

The publicly accessible PageSpeed report pages exposed the following:

- Both desktop and mobile links were associated with a report timestamp displayed as **November 2, 2026, 8:01:10 AM**.
- The Chrome User Experience Report (CrUX) section stated that there was **not sufficient real-world speed data for this page**.
- The page displayed **No Data** for that real-user section.
- The dynamic Lighthouse diagnostics and numeric category/metric results did not load into the inspection view used to prepare this document.
- The Lighthouse Metrics report URL timed out in the inspection environment, so its audit contents could not be independently extracted here.

### 1.3 Important interpretation

The absence of CrUX data is **not** a failed Lighthouse score and is **not** proof that the website is slow. It means there is insufficient Chrome field data for the specific page/report view. A lab test can still measure a simulated visit. A small personal website may not receive enough eligible Chrome visits to appear in CrUX.

Do not report “Core Web Vitals failed” solely because the page says “No Data.” Report the status as **Field data unavailable / not enough CrUX data** until there is sufficient data.

The supplied pages did not expose their numeric Lighthouse results in the preparation environment. Therefore this plan deliberately does not invent:

- Performance, Accessibility, Best Practices or SEO scores.
- FCP, LCP, Speed Index, TBT, CLS or other timings.
- Individual failed audits or warnings.
- Estimated savings from image, JavaScript, CSS or font opportunities.
- The device/network settings used by Lighthouse Metrics.

### 1.4 Mandatory first action for the agent

Before implementation, retrieve the original reports in a normal browser session and save evidence locally:

1. Open the two supplied PageSpeed links and confirm the URL, report timestamp and selected form factor.
2. Expand every Lighthouse category and each “Opportunities”, “Insights”, “Diagnostics” and passed-audit group.
3. Save the full report as PDF or print-to-PDF for a human-readable snapshot.
4. Retrieve raw Lighthouse JSON where available. Preserve the original JSON without editing it.
5. Open the Lighthouse Metrics check. Record its audit date, Lighthouse version, browser version, device profile, network/CPU settings, categories, scores and all failed/diagnostic audits.
6. If the exact report is expired or inaccessible, run fresh scans and label them **fresh reproduction**, not “original report”.
7. Save screenshots of the report headers and the most important expanded audit details.
8. Record exact retrieval date/time, source URL, final tested URL, redirect chain, viewport, form factor, Lighthouse version and test environment.

**Output location:** `docs/performance/baseline/supplied-reports/` with `README.md`, PDFs, JSON, screenshots and a source manifest. Keep large artifacts in a documented CI artifact store if repository size would become excessive; keep the summary and links in Git.

---

## 2. Evidence model and how to interpret the reports

PageSpeed Insights may present both:

- **Field data:** real visitor performance from Chrome UX Report (CrUX), based on a rolling collection period and reported at the 75th percentile when there is sufficient data.
- **Lab data:** a controlled Lighthouse run that simulates a browser/device/network profile and supplies repeatable diagnostics.

These datasets answer different questions. Lab data helps isolate code and resource problems. Field data shows what real users experience across a broader device/network population. They may disagree without either report being “wrong”.

The three supplied reports must not be merged into one assumed score. Lighthouse version, browser build, throttling, test location, cache state, tested URL, viewport and run variability may differ. Record these values and compare like with like.

### 2.1 Evidence levels

Every finding in the audit register must have one of these labels:

- **Verified in supplied report:** visible directly in an original supplied report.
- **Verified in fresh reproduction:** reproduced with a new dated run.
- **Verified in repository:** supported by source code, build output, package analysis or configuration.
- **Verified in browser/device test:** reproduced through browser automation or a real device.
- **Inferred / needs verification:** plausible but not yet proven.
- **Not measurable from available evidence:** missing access, insufficient sample or unsupported test.

### 2.2 Finding record format

For each finding record:

- Finding ID.
- Report/source and exact audit name.
- Severity and user impact.
- Affected URL(s), device profile and browser.
- Evidence: metric, resource URL, screenshot, trace, DOM node or source line.
- Root cause, not just the audit label.
- Proposed remediation.
- Risk of visual/functional regression.
- Estimated engineering size (S/M/L), clearly marked as estimate.
- Verification procedure and expected result.
- Before/after comparison.
- Status: open, investigating, planned, fixed, verified, accepted risk or blocked.

Do not silently remove a finding from the register after a code change. Mark it fixed only when the validation evidence passes.

---

## 3. Scope of the performance investigation

The agent must inspect the following layers. A PageSpeed report is a starting point, not the complete audit.

### 3.1 Navigation and server response

- HTTPS and redirect chain; avoid unnecessary redirect hops.
- DNS lookup, connection, TLS negotiation and TTFB.
- Netlify CDN behavior, cache headers and content negotiation.
- Static HTML response and compression (Brotli or gzip where supported).
- HTML document size and response headers.
- Cache-control for HTML, fingerprinted assets, fonts, images and downloadable files.
- `ETag`, `Last-Modified`, `Vary`, `Content-Encoding`, `Content-Type` correctness.
- HTTP/2 or HTTP/3 availability where supported by the platform and browser.
- Avoid cache rules that make HTML stale or fingerprinted files uncacheable.
- Confirm canonical host behavior and absence of redirect loops.

### 3.2 Core Web Vitals and lab metrics

Record and analyze:

- LCP — Largest Contentful Paint.
- INP — Interaction to Next Paint (field metric; laboratory interaction testing is supplementary).
- CLS — Cumulative Layout Shift.
- FCP — First Contentful Paint.
- TTFB — Time to First Byte.
- TBT — Total Blocking Time (lab diagnostic; not a field Core Web Vital).
- Speed Index.
- Long tasks and main-thread work.
- Resource load timing, priority and render-blocking behavior.

Use current “good” Core Web Vitals targets at the 75th percentile as the principal field targets:

| Metric | Good target | What to inspect |
|---|---:|---|
| LCP | ≤ 2.5 seconds | Server response, critical HTML/CSS, hero image, fonts, loading priority |
| INP | ≤ 200 milliseconds | Event handlers, JS work, framework hydration, long tasks, layout and paint |
| CLS | ≤ 0.1 | Image/font dimensions, late content, layout changes, sticky UI, animations |

If field data is unavailable, state that explicitly and use repeatable lab metrics plus real-device tests as interim evidence. Do not claim a field pass from lab values.

### 3.3 JavaScript and runtime

- Total JavaScript shipped per page, raw and compressed.
- First-party versus third-party JavaScript.
- Astro client directives and hydration boundaries.
- Whether static or mostly static components are needlessly hydrated.
- Unused JavaScript and dead dependencies.
- Parse, compile and execution time.
- Event-handler cost and listener leaks.
- Main-thread long tasks.
- Layout thrashing and forced synchronous layout.
- Excessive DOM mutation.
- Memory retention, detached nodes and repeated allocations.
- Large client-side libraries used for simple interactions.
- Duplicate dependencies and multiple versions of the same library.
- Third-party widgets, analytics, embeds and tag managers.
- Failure behavior when JavaScript is unavailable or blocked.

Astro-specific rule: use static rendering by default. Add client-side hydration only when a component has a demonstrated interaction requirement. Choose the smallest suitable client directive and avoid hydrating an entire page because one widget needs interaction.

### 3.4 CSS, layout and rendering

- CSS bytes per route, compressed and uncompressed.
- Render-blocking stylesheet behavior.
- Unused CSS and duplicate style rules.
- CSS selector complexity only where it measurably affects style calculation.
- Excessive `@import` chains.
- Font loading and layout shifts.
- Expensive filters, shadows, large blur/backdrop effects and blend modes.
- Large fixed/sticky elements.
- Layout instability during font/image/content loading.
- Forced reflow and expensive paint areas.
- Containment and content visibility where correctly applied.
- Responsive CSS complexity and unused breakpoint overrides.
- CSS fallback behavior for unsupported features.

### 3.5 Images, icons, SVG and video

- Correct format selection: AVIF/WebP where appropriate, fallback where required.
- Responsive variants and `srcset`/`sizes`.
- Correct intrinsic width/height or aspect ratio.
- Appropriate crop and resolution for actual display size.
- Compression quality versus visible artifacts.
- Lazy loading below the fold; do not lazy-load the true LCP image.
- Fetch priority and preload only for proven critical resources.
- SVG complexity, oversized embedded data and unnecessary filters.
- Avoid loading the same asset twice.
- Avoid shipping desktop-size artwork to small phones.
- Video poster, codec, preload policy, autoplay, captions and data consumption.
- Use CSS or inline SVG for simple icons rather than loading a large icon package for a handful of glyphs.

### 3.6 Fonts and typography resources

- Number of font families, files, weights and styles.
- Variable font versus multiple static files.
- WOFF2 where supported.
- `font-display` strategy and fallback metrics.
- Subsetting only when safe for the languages/scripts used.
- Preload only the font needed for above-the-fold content.
- Avoid preloading every weight or font family.
- Cross-origin font loading headers where needed.
- Measure layout shift caused by fallback-to-web-font swaps.
- Ensure readable fallback fonts when custom fonts fail.

### 3.7 Animation and interaction performance

- Prefer `transform` and `opacity` for continuous animation.
- Avoid continuously animating layout properties such as width, height, top, left, margin or padding unless the effect is small and justified.
- Avoid large-area blur, filter and backdrop-filter animations on constrained devices.
- Avoid permanent `will-change` on many elements; it can consume memory.
- Respect `prefers-reduced-motion`.
- Stop or simplify off-screen animation when appropriate.
- Avoid scroll listeners that perform expensive work each frame.
- Use `requestAnimationFrame` for custom frame work and clean up listeners/observers.
- Verify no animation causes text flicker, content shift or focus loss.
- Check 60 Hz and high-refresh displays without requiring high refresh to look correct.
- Ensure animation still works when GPU acceleration is limited or unavailable.
- Provide reduced-motion and low-power fallbacks without removing meaningful state feedback.

### 3.8 HTML and document structure

- Valid HTML and correct document outline.
- Semantic landmarks and heading order.
- Correct `lang` attribute and character encoding.
- Correct viewport meta tag.
- No duplicate IDs, invalid nesting or broken ARIA references.
- Links versus buttons used semantically.
- Images have correct alt behavior (meaningful versus decorative).
- Main content available in initial HTML when feasible.
- Metadata and structured data match visible page content.
- Avoid huge and unnecessarily deeply nested DOM trees.
- Ensure every canonical, alternate, pagination and feed relationship is correct.

### 3.9 Third-party code and privacy

- Inventory analytics, fonts, embeds, widgets and remote APIs.
- Measure the performance cost and request count of every third-party script.
- Load optional integrations after consent where legally required.
- Avoid unnecessary tag managers and overlapping analytics tools.
- Verify privacy notices and consent behavior for the actual audience/jurisdictions.
- Avoid sending personal or sensitive user data to analytics.
- Test behavior when third-party domains are blocked or unavailable.

### 3.10 Device and network profiles

Test more than a single desktop and a single modern phone:

- Mobile: constrained Android CPU, modest RAM and a slow/unstable mobile network.
- Modern Android Chrome.
- iOS Safari on a supported iPhone.
- Android foldable, both outer/cover and inner unfolded screen.
- Tablet portrait and landscape.
- Desktop Chrome, Edge, Firefox and Safari where available.
- Older/lower-powered laptop or desktop.
- Android TV / television browser where the owner expects a usable experience.
- Narrow portrait, wide landscape, short landscape, square-ish and ultrawide ratios.
- Keyboard-only use and touch use.
- High zoom and text scaling.
- Reduced motion, reduced transparency where applicable, high contrast and dark/light themes if provided.
- Offline, high latency, packet loss and failed third-party request scenarios.

Emulation is useful but not a replacement for physical-device checks. Clearly label what was emulated and what was physically tested.

---

## 4. Baseline and reproduction requirements

### Phase 0 — Recover the three reports and freeze the baseline

**Goal:** Obtain original results and a reliable, repeatable baseline before touching source code.

#### Task 0.1 — Recover supplied report data

1. Open the two PSI reports in Chrome.
2. Save desktop and mobile PDFs.
3. Expand all audit details and capture relevant screenshots.
4. Save raw Lighthouse JSON if accessible.
5. Open and save the Lighthouse Metrics report, including the report's settings and version details.
6. If unavailable, generate a fresh set and document why the old one could not be retrieved.

**Verification:** All three report entries have a source URL, date/time, tested URL, form factor/profile, Lighthouse/browser version if shown, PDF or screenshot, and raw JSON if available. Missing items are explicitly labeled.

**Commit:** `docs(performance): archive supplied PSI and Lighthouse reports`

#### Task 0.2 — Verify the current application and deployment

1. Inspect `package.json`, lockfile, Astro config, Netlify config, build scripts and GitHub workflows.
2. Verify the production deploy commit and branch in Netlify.
3. Verify the public site is actually served from the expected Astro build output.
4. Identify route-specific layouts and client-side islands.
5. Identify existing audit scripts and reuse them where sound.
6. Record current external integrations, redirects, headers, cache rules and deploy configuration.

**Verification:** A short architecture/deployment note exists. Do not change framework or deployment architecture in this task.

**Commit:** `docs(performance): document current build and deploy baseline`

#### Task 0.3 — Capture a reproducible URL set

At minimum include:

- Homepage.
- About page.
- Portfolio page.
- Projects page.
- Posts index.
- One short article.
- One long article with code/media.
- One project detail page.
- Resume/download endpoint if public.
- Sitemap and robots.txt as endpoint checks.

Add all discovered routes from the generated sitemap and internal crawler. Categorize by template so representative page types are tested.

**Verification:** The route list records final canonical URL, HTTP status, content type, redirect chain and page template. Preserve all existing published paths.

**Commit:** `test(performance): establish representative route inventory`

#### Task 0.4 — Run fresh baseline measurements

For each representative page:

- Run PSI mobile and desktop.
- Run Lighthouse CLI or Lighthouse CI in a pinned environment.
- Run at least three lab repetitions per mode; retain every result and report median/variance rather than selecting the best run.
- Capture a cold-cache and warm-cache run where meaningful.
- Capture WebPageTest waterfall for homepage and one long article.
- Test a representative low-end CPU/network throttle.
- Record output size, resource counts, JS/CSS/font/image totals and transfer bytes.

**Verification:** A baseline summary compares the original supplied reports (if recoverable) with fresh reports. Differences in versions/settings are explained, not treated as regression automatically.

**Commit:** `docs(performance): add reproducible mobile and desktop baseline`

---

## 5. Root-cause triage and remediation phases

### Phase 1 — Convert Lighthouse output into a prioritized finding register

**Goal:** Turn raw audits into a list of actual causes and actionable tasks.

#### Task 1.1 — Normalize findings

For every Lighthouse issue capture:

- Audit ID and title.
- Category and score/display mode.
- Affected element/resource.
- Estimated savings (keep Lighthouse estimate as estimate, not measured benefit).
- Diagnostic details and trace reference.
- Frequency across mobile/desktop runs.
- Severity, user impact and confidence.

Group duplicate findings that share the same cause. Do not create separate fixes for each URL if the same shared component causes the issue.

**Verification:** No reported failing audit is silently omitted. Each item has an owner/status and source evidence.

**Commit:** `docs(performance): create Lighthouse findings register`

#### Task 1.2 — Prioritize by user impact

Use this order unless evidence suggests otherwise:

1. Broken rendering, blocked content or serious navigation defects.
2. Slow LCP or main-content delivery on mobile.
3. Main-thread blocking and poor interaction responsiveness.
4. Layout shifts and unstable content.
5. Excessive JavaScript, images, fonts or third-party payload.
6. Accessibility and security issues that affect users or risk.
7. Lower-impact SEO and code-quality warnings.

Classify severity:

- P0: production broken, content inaccessible, data/security exposure, major route regression.
- P1: severe user-visible performance or accessibility issue on common devices.
- P2: meaningful performance/UX inefficiency or limited compatibility issue.
- P3: minor optimization or polish.

**Verification:** A prioritized backlog exists with impact, scope, evidence and acceptance criteria.

**Commit:** `docs(performance): prioritize remediation backlog`

### Phase 2 — Optimize the initial critical rendering path

**Goal:** Show the important content quickly without layout jumps.

#### Task 2.1 — Inspect navigation and document response

- Remove unnecessary redirects.
- Confirm CDN and static HTML response performance.
- Ensure the document is compressed and correct content type is served.
- Avoid blocking requests before first paint.
- Verify fonts and CSS do not delay the page unnecessarily.
- Ensure the site renders meaningful content without JavaScript.

**Verification:** WebPageTest waterfall shows a clear and reduced critical path; first content and primary heading appear correctly on slow mobile.

**Commit:** `perf(rendering): streamline document and critical request path`

#### Task 2.2 — Optimize the LCP element

1. Identify the actual LCP element in each relevant template.
2. If it is an image, use an appropriately sized responsive source.
3. Do not lazy-load the LCP image.
4. Add high fetch priority or preload only when evidence shows it helps and it is not duplicated.
5. If it is text, inspect font/CSS/HTML availability and render-blocking behavior.
6. Avoid oversized hero images and video backgrounds on mobile.
7. Provide dimensions/aspect ratio to reserve layout space.

**Verification:** LCP element is confirmed from a trace. Compare repeat runs and ensure no competing preload or excessive bandwidth priority is introduced.

**Commit:** `perf(lcp): optimize primary content rendering`

#### Task 2.3 — Reduce render-blocking CSS

- Inventory global and route CSS.
- Remove unused CSS only after coverage/route checks.
- Avoid CSS `@import` chains.
- Split route-specific styles where it reduces actual initial bytes without fragmentation overhead.
- Keep critical above-the-fold styling available early.
- Avoid inline duplication that increases HTML on every route.

**Verification:** Compare CSS transfer bytes, render timing and visual snapshots. All routes and themes remain visually correct.

**Commit:** `perf(css): reduce critical stylesheet cost`

### Phase 3 — Reduce JavaScript cost and improve interaction responsiveness

**Goal:** Keep the site primarily static and minimize main-thread work.

#### Task 3.1 — Produce a per-route JavaScript inventory

- Record every bundled chunk, size, compressed size and import source.
- Identify which routes load each chunk.
- Identify Astro islands and hydration directives.
- Identify third-party scripts and the reason each exists.
- Identify duplicate dependencies and large libraries.

**Verification:** `docs/performance/javascript-inventory.md` contains a route-to-chunk map and bundle analysis artifact.

**Commit:** `docs(performance): inventory route JavaScript cost`

#### Task 3.2 — Remove unnecessary hydration and client code

- Convert static islands to server/static Astro components.
- Use the narrowest client directive justified by interaction.
- Defer nonessential widgets until visible or idle when appropriate.
- Keep navigation and article content functional without JavaScript.
- Avoid loading animation/interaction libraries for simple CSS effects.
- Remove dead dependencies only after confirming no route uses them.

**Verification:** Check every interaction and route. Compare total JS bytes, hydration work and main-thread trace before/after.

**Commit:** `perf(js): reduce unnecessary client hydration`

#### Task 3.3 — Fix long tasks and expensive handlers

- Trace long tasks and identify exact script/function.
- Break up large synchronous work.
- Avoid expensive synchronous DOM reads/writes interleaved in loops.
- Use passive listeners for scroll/touch when safe.
- Debounce/throttle only when behavior remains correct.
- Use IntersectionObserver/ResizeObserver rather than frequent manual polling where appropriate.
- Clean up listeners, observers, timers and subscriptions.

**Verification:** Reproduce the interaction under CPU throttle. Confirm the long task is reduced/removed and UI remains responsive.

**Commit:** `perf(interaction): reduce main-thread blocking`

#### Task 3.4 — Third-party script review

For analytics, embeds and external widgets:

- Identify whether it is required.
- Measure network, JS and main-thread cost.
- Delay loading until necessary.
- Load only on routes that use it.
- Avoid duplicate analytics and duplicated tracking events.
- Ensure consent/privacy behavior remains correct.
- Provide fallback if vendor scripts fail.

**Verification:** Test with third-party requests blocked. Core site content and navigation must remain usable.

**Commit:** `perf(third-party): defer nonessential external scripts`

### Phase 4 — Images, fonts and media

**Goal:** Reduce transfer and decode cost without compromising visual quality.

#### Task 4.1 — Image audit and responsive delivery

- Crawl image references in source and production output.
- Identify oversized originals, duplicate assets, unused assets and incorrect MIME types.
- Generate responsive size variants for images that are displayed at materially different sizes.
- Use modern formats where supported with valid fallbacks.
- Set accurate `width`/`height` or `aspect-ratio`.
- Lazy-load below-the-fold images only.
- Never lazy-load the confirmed LCP image.
- Use `srcset`/`sizes` that match the layout.
- Avoid sending huge images to old phones/TVs.

**Verification:** Compare bytes and screenshot quality at phone, desktop and large-screen widths. Check that no image is blurry or cropped incorrectly.

**Commit:** `perf(images): optimize responsive image delivery`

#### Task 4.2 — Font loading audit

- Inventory font files and weights.
- Remove unused weights/families.
- Prefer WOFF2 where appropriate.
- Review `font-display` and fallback metrics.
- Preload only essential above-the-fold fonts.
- Avoid font requests for symbols already available via system fonts/SVG.
- Check glyph coverage for all languages and symbols used in the site.

**Verification:** Test with fonts disabled/blocked and on slow network. Check text wrapping and CLS before/after.

**Commit:** `perf(fonts): reduce font payload and layout shift`

#### Task 4.3 — Video and animated assets

- Avoid autoplaying large hero videos by default on mobile.
- Provide poster frames and dimensions.
- Use `preload="none"` or metadata where suitable.
- Ensure captions/transcripts when needed.
- Respect data saver/reduced motion preferences.
- Avoid unnecessary GIFs; evaluate modern video or CSS/SVG motion when suitable.

**Verification:** Confirm no unnecessary video bytes load before user intent and no content shifts when poster/media loads.

**Commit:** `perf(media): optimize video and motion assets`

### Phase 5 — CSS animation, layout and paint optimization

**Goal:** Preserve the intended premium visual experience while remaining smooth on constrained hardware.

#### Task 5.1 — Inventory animated components

For every animated element record:

- Purpose and trigger.
- Properties animated.
- Duration, easing and repeat behavior.
- Whether it runs off-screen or in the background.
- Impact under CPU/GPU throttling.
- Reduced-motion behavior.
- Whether it is essential to comprehension or decorative.

**Verification:** An animation inventory exists, and all decorative animations have an appropriate reduced-motion behavior.

**Commit:** `docs(animation): inventory motion and rendering cost`

#### Task 5.2 — Remove layout-triggering animation where possible

- Prefer `transform`/`opacity` for visual movement.
- Avoid animating layout and geometry properties continuously.
- Limit filter/backdrop blur and oversized shadow animation.
- Do not apply `will-change` globally or permanently to large collections.
- Avoid scroll-linked effects that trigger synchronous layout each frame.
- Respect `prefers-reduced-motion` and ensure no essential information is motion-only.

**Verification:** Use Chrome Performance panel and paint flashing/layers tools. Check for dropped frames and unintended compositing memory use.

**Commit:** `perf(animation): reduce layout and paint work`

#### Task 5.3 — Layout stability and responsive layout

- Reserve space for images, embeds, navigation and asynchronously loaded content.
- Inspect sticky/fixed navigation and headers.
- Check late-loading fonts and content.
- Avoid injecting banners above content after load without reserved space.
- Test short landscape viewports and foldable resize states.

**Verification:** CLS remains low in repeat lab runs and visual snapshots show no overlap or layout jumps.

**Commit:** `fix(layout): prevent content shifts across viewports`

### Phase 6 — Network, caching and Netlify delivery

**Goal:** Deliver static resources efficiently and safely.

#### Task 6.1 — Verify compression and cache policy

- Confirm compression for HTML, CSS, JS, SVG, JSON and text assets.
- Use long-lived immutable caching for fingerprinted assets.
- Avoid long immutable caching for mutable HTML and unversioned files.
- Verify cache invalidation works on deploy.
- Ensure correct `Vary` values for representation negotiation.
- Review `Cache-Control`, `ETag` and redirect behavior.

**Verification:** Inspect response headers for a representative HTML page, CSS/JS chunk, image, font and feed. Confirm old HTML does not point to missing or stale chunks after deploy.

**Commit:** `perf(netlify): tune compression and static asset caching`

#### Task 6.2 — Review headers and Netlify configuration

- Confirm the actual production deploy is the expected branch/commit.
- Review `netlify.toml`, redirects, headers and functions/edge functions.
- Remove stale Hugo-specific comments, files or documentation only after proving they are obsolete.
- Do not remove required legacy response negotiation or endpoint behavior.
- Verify security headers separately from caching rules.

**Verification:** Deploy Preview passes route, header, feed and asset checks. No published endpoint changes unintentionally.

**Commit:** `fix(netlify): align deployment and delivery configuration`

### Phase 7 — Browser, device and constrained-hardware validation

**Goal:** Verify that optimization has not made the experience fragile on less capable devices.

#### Task 7.1 — Automated browser matrix

Use Playwright for supported Chromium, Firefox and WebKit projects where CI runners support them. Include browser version and OS in artifacts. Run key user journeys and layout checks at representative viewport sizes.

Viewport matrix must include:

- Small narrow phone portrait.
- Standard phone portrait.
- Large phone portrait.
- Phone landscape with short height.
- Foldable cover screen.
- Foldable inner/unfolded screen.
- Tablet portrait and landscape.
- Laptop 1366×768 class viewport.
- Desktop 1920×1080 class viewport.
- Ultrawide viewport.
- TV 1920×1080 and 3840×2160 layout checks where a TV-friendly mode is intended.

Do not encode only one exact device width; verify fluid behavior between the named sizes.

**Verification:** No horizontal overflow, clipped controls, hidden content, overlapping navigation, unreadable text or unusable touch targets. Save screenshots for all failed cases and representative passing cases.

**Commit:** `test(responsive): expand viewport regression matrix`

#### Task 7.2 — Browser compatibility and feature fallback

Test current stable Chrome, Edge, Firefox and Safari/WebKit. Where the owner supports older browser environments, define the oldest supported versions explicitly and validate them.

- Check CSS features with `@supports` and provide graceful fallback.
- Check JavaScript APIs with feature detection where necessary.
- Avoid user-agent sniffing unless there is a documented compatibility reason.
- Test WebKit behavior for sticky positioning, viewport units, font rendering and scroll.
- Test Chromium-based TV browser navigation if TV support is an intended requirement.

**Verification:** Record the browser/version and any unsupported feature; no essential content or navigation depends on an unsupported decorative feature.

**Commit:** `test(compatibility): validate browser support and fallbacks`

#### Task 7.3 — Low-end hardware and throttled network

- Run Lighthouse mobile profile.
- Use CPU throttling and slow network profile.
- Test on at least one physical lower-end Android device if available.
- Test on a physical iPhone/Safari if available.
- Test TV remote/focus navigation if TV compatibility is part of product scope.
- Capture memory/heap observations for long page sessions and route transitions.

**Verification:** Site remains usable; content appears; navigation responds; animations degrade gracefully; no runaway memory growth is observed in a repeated route/scroll test.

**Commit:** `test(performance): add constrained-device validation`

### Phase 8 — Accessibility and visual regression after performance changes

**Goal:** Ensure performance work does not reduce accessibility or design quality.

- Run axe-core or equivalent automated checks on important routes.
- Validate keyboard tab order, visible focus, skip link, dialogs/menus and focus return.
- Verify text contrast and non-text contrast.
- Verify semantic headings, landmarks, links and button names.
- Test zoom and text scaling.
- Test `prefers-reduced-motion`.
- Test color contrast in every supported theme.
- Test that animation does not hide content or steal focus.
- Keep interaction states consistent (hover, focus-visible, active, selected, disabled, loading).

**Verification:** No new accessibility violations; visual regression changes reviewed and approved rather than blindly accepted.

**Commit:** `test(a11y): validate accessibility after performance work`

### Phase 9 — Performance budgets and regression automation

**Goal:** Make the quality gates reproducible on every relevant change.

#### Task 9.1 — Define budgets from baseline

Do not invent budgets before inspecting actual output. Use the measured baseline to define realistic budgets for:

- Total initial JS per route, compressed.
- CSS per route, compressed.
- Initial image transfer bytes.
- Font bytes and number of font requests.
- Total initial transfer bytes.
- Request count.
- LCP/TBT lab limits where stable.
- DOM node count where it is a meaningful indicator.
- Unused JS/CSS warnings.

Set budgets by route/template class; a long article with diagrams has different resource needs from the homepage.

**Verification:** Budgets are documented, justified by data and enforceable in CI. No unexplained baseline regression is accepted as the new normal.

**Commit:** `test(performance): define route-specific resource budgets`

#### Task 9.2 — Add Lighthouse CI or equivalent

Use Lighthouse CI for PR/commit performance auditing and artifact retention. Configure:

- Build the Astro project in CI.
- Serve the production build locally or test a Deploy Preview.
- Run multiple Lighthouse samples to reduce variance.
- Audit a representative set of URLs.
- Save HTML and JSON reports as CI artifacts.
- Compare with the baseline.
- Assert selected metrics/category thresholds and resource budgets.
- Start with warning-only for noisy metrics if necessary, then enforce after stabilization.

Do not gate every commit on a single noisy third-party PSI score. Use deterministic local CI for code regressions, with PSI as a separate external snapshot.

**Verification:** A pull request receives an audit artifact and fails on a confirmed critical regression according to the agreed policy.

**Commit:** `ci(performance): add Lighthouse regression checks`

#### Task 9.3 — Add static quality gates

Run the existing scripts if present; inspect before duplicating them. Add or retain:

- Type checking.
- Linting and formatting checks.
- Unit/component tests.
- Build validation.
- Link and route checks.
- HTML validation for generated output.
- Accessibility automated checks.
- Bundle/resource budget checks.
- Security/dependency scanning.

**Verification:** CI output is understandable, failing checks identify the command and affected page, and the pipeline does not hide warnings.

**Commit:** `ci(quality): consolidate static and build verification`

### Phase 10 — Fresh external reports and independent validation

**Goal:** Compare the optimized site with the original supplied audit on comparable conditions.

#### Task 10.1 — Re-run PageSpeed Insights

After changes have deployed to a preview or approved production release:

- Run PSI for desktop and mobile separately.
- Use the same canonical homepage URL as the supplied reports.
- Capture the report timestamp and link.
- Save PDF/screenshots and raw JSON if available.
- Record CrUX availability independently from Lighthouse lab scores.
- Compare all four Lighthouse categories and all available metrics.
- Compare failed audits and resource opportunities.

**Verification:** An improvement table identifies metric before, after, change, test condition and evidence. If the original numeric values cannot be recovered, state that a direct numeric comparison is unavailable and compare fresh baseline to fresh post-change results instead.

**Commit:** `docs(performance): publish post-remediation PSI comparison`

#### Task 10.2 — Re-run Lighthouse Metrics

- Create a fresh check with settings matching the original report where possible.
- Record the run profile and limitations.
- Compare diagnostics and resource results.
- Do not compare numerical scores across materially different versions/settings without qualification.

**Verification:** New report link and test configuration are archived, with a difference report.

**Commit:** `docs(performance): archive independent Lighthouse verification`

#### Task 10.3 — Validate real-user data status

- Check PSI CrUX availability at page and origin level.
- Check Search Console Core Web Vitals report if the property has enough data.
- Do not expect immediate CrUX availability after a traffic increase; field datasets require sufficient eligible usage.
- If field data remains unavailable, install only a privacy-reviewed, minimal real-user measurement solution if appropriate and consent/legal requirements are addressed.

**Verification:** Report exactly what field data exists and what remains unavailable. Do not present synthetic lab runs as real-user measurements.

**Commit:** `docs(performance): document field data coverage`

### Phase 11 — Release readiness, deploy and rollback

**Goal:** Release performance improvements without breaking routes or content.

Before production:

- All CI checks pass.
- No P0/P1 finding remains open without explicit owner approval.
- Important P2 issues are documented and accepted or fixed.
- Lighthouse/PSI post-change reports are archived.
- Visual screenshots are reviewed.
- Legacy URLs, aliases, feeds, sitemap, robots and downloads pass.
- Canonical URL and metadata are correct.
- Netlify Deploy Preview is tested.
- Rollback commit/deploy is identifiable.

After production deploy:

- Smoke-test homepage and important routes.
- Check 404 and redirect behavior.
- Check canonical response headers and asset loading.
- Check analytics/consent behavior if configured.
- Run a fresh PSI smoke test after deploy settles.
- Monitor error logs and visitor feedback.

**Commit:** `docs(release): record performance release verification`

### Phase 12 — Ongoing monitoring and recurring audits

**Every commit / pull request:**

- Install/build/typecheck/lint/test.
- Route and link checks.
- Bundle and resource budgets.
- Lighthouse CI on representative templates.
- Accessibility smoke checks.
- Responsive screenshot smoke tests.

**Every deployment:**

- Deploy Preview smoke tests.
- Production route/asset verification.
- HTTP headers and redirects.
- PSI mobile and desktop snapshots for primary URL after deployment.

**Weekly or biweekly:**

- Crawl all public URLs.
- Check broken external links.
- Review dependency/security alerts.
- Inspect resource/bundle budget trends.
- Review any performance regressions.

**Monthly:**

- Review PageSpeed/CrUX and Search Console field data when available.
- Review Core Web Vitals and traffic distribution.
- Run a representative WebPageTest waterfall.
- Review third-party script cost and image/font growth.
- Compare current results with the stable baseline.

**Quarterly:**

- Full browser/device matrix.
- Full accessibility review, including manual keyboard/screen reader checks.
- Full technical SEO and structured data review.
- Security configuration and dependency audit.
- Revisit supported browser/device policy and performance budgets.

**Commit:** `docs(operations): establish recurring website quality review`

---

## 6. Suggested performance budget policy

Budgets must be based on the initial measured build and actual site needs. The values below are **starting goals for review, not standards or claims about current performance**. Adjust only with evidence and document every exception.

| Area | Starting goal / policy | Enforcement |
|---|---|---|
| Core Web Vitals | Good thresholds at p75 when field data exists | Monitor; not a per-commit field gate |
| Initial JS | Keep low; target ≤ 100 KB compressed for a mostly static portfolio if feasible | Per-route CI budget; review any exception |
| Initial CSS | Keep low; target ≤ 75 KB compressed if feasible | Per-route CI budget |
| Fonts | Prefer 1–2 families and only necessary weights | Asset inventory and CI budget |
| Hero/LCP image | Responsive, correct dimensions, modern format; avoid oversized payload | Image lint/report and Lighthouse evidence |
| Total initial transfer | Establish per-template budget from measured baseline; aim for under 1 MB on the home route if visual assets allow | CI budget and manual review |
| Long tasks | Avoid recurring long tasks; investigate any > 50 ms main-thread task in interaction traces | Trace review and performance test |
| Layout stability | No known avoidable shifts; field CLS target ≤ 0.1 | Lab/visual check and field monitoring |
| Third-party scripts | Each integration has documented purpose, owner and measured cost | Review gate for additions |
| Animations | No motion that makes content unusable on constrained hardware | Device and reduced-motion tests |

If a budget is not achievable without damaging visual quality or content, record the trade-off and propose a route-specific budget. Never reduce useful content merely to pass a numeric threshold.

---

## 7. Tools and their role

Use the free tools below as complementary evidence sources. Free quotas and access policies can change; verify current terms when configuring automated usage.

| Tool | Primary use | How to use it in this plan |
|---|---|---|
| [PageSpeed Insights](https://pagespeed.web.dev/) | Mobile/desktop Lighthouse lab report and CrUX field data when available | External before/after snapshot |
| [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview) | Local repeatable performance, accessibility, best-practices and SEO audits | Local and CI audit |
| [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) | Per-PR/commit reports, comparisons, assertions and artifact history | Main regression gate |
| [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance) | Main-thread, long tasks, layout, paint, runtime analysis | Root-cause investigation |
| [WebPageTest](https://www.webpagetest.org/) | Waterfalls, filmstrips, network profiles and repeat runs | Independent loading analysis |
| [Chrome UX Report](https://developer.chrome.com/docs/crux) | Real Chrome user experience field data | Field data coverage and trends |
| [axe-core](https://github.com/dequelabs/axe-core) | Automated accessibility checks | CI/browser smoke checks |
| [Playwright](https://playwright.dev/) | Multi-browser, viewport, interaction and visual testing | Regression automation |
| [Screaming Frog SEO Spider](https://www.screamingfrog.co.uk/seo-spider/) | Crawl URLs, metadata, broken links and page structure | Scheduled crawl (free crawl limit applies) |
| [Nu Html Checker](https://validator.w3.org/nu/) | HTML conformance validation | Build/output or representative-page validation |
| [MDN Browser Compatibility Data](https://github.com/mdn/browser-compat-data) | Browser feature support reference | Compatibility policy and fallback review |
| [Can I Use](https://caniuse.com/) | CSS/JS feature compatibility reference | Verify advanced browser features |
| [Netlify Deploy Previews](https://docs.netlify.com/site-deploys/deploy-previews/) | Test changes before production | Release validation environment |

A third-party online score is not a complete proof of quality. Keep local test artifacts and human review in the workflow.

---

## 8. Required report outputs

Each audit cycle must generate a dated report folder. Suggested layout:

```text
docs/
  performance/
    README.md
    baseline/
      supplied-reports/
      fresh-baseline/
    findings/
      performance-findings.csv
      performance-findings.md
      resource-inventory.json
      route-inventory.csv
    runs/
      YYYY-MM-DD/
        psi-mobile.json
        psi-desktop.json
        lighthouse-mobile.html
        lighthouse-mobile.json
        lighthouse-desktop.html
        lighthouse-desktop.json
        lighthouse-metrics-link.txt
        webpagetest-summary.md
        screenshots/
    comparisons/
      before-after.md
      metrics.csv
      charts/
    release/
      YYYY-MM-DD-release-checklist.md
```

### 8.1 Executive summary report

Must contain:

- Release/build identifier and Git commit.
- Tested production or preview URL.
- Test date, region, browser and Lighthouse version.
- Desktop/mobile scores only when actually available.
- LCP/FCP/TBT/CLS/Speed Index and other available lab values.
- Field-data status (available or insufficient).
- Top five findings by user impact.
- Fixed, open, deferred and accepted-risk counts.
- Before/after charts for comparable tests.
- Links to raw evidence and CI artifacts.

### 8.2 Resource report

Include:

- Total transferred bytes.
- Request count.
- JS/CSS/font/image/video bytes separately.
- First-party and third-party resources.
- Largest resources and whether they are above the fold.
- Cache and compression status.
- Resource changes versus baseline.

### 8.3 Interaction and runtime report

Include:

- Main-thread work and long tasks.
- Key interaction response observations.
- JS execution/parse cost.
- Animation frame behavior and any dropped-frame evidence.
- Memory observations for representative interactions and repeated route/scroll use.
- Browser/device profile and whether the test was physical or emulated.

### 8.4 Accessibility and visual report

Include:

- Automated violations by severity.
- Manual keyboard/focus findings.
- Reduced-motion findings.
- Contrast and text scaling findings.
- Screenshots for representative viewport sizes.
- Any accepted visual differences and reviewer approval.

---

## 9. Git and agent execution protocol

The agent must work in very small units to survive context or quota interruptions.

### Before starting a task

1. Read this plan fully.
2. Read `AGENT_HANDOFF.md` if it exists.
3. Check `git status`, current branch and latest commit.
4. Confirm no unrelated user changes will be overwritten.
5. Identify the exact task and its acceptance criteria.
6. Run relevant existing tests before editing and record baseline failures.

### While implementing

- One task should solve one coherent problem.
- Do not combine unrelated refactors with performance changes.
- Explain any change to dependencies or build configuration.
- Add or update tests with the code change.
- Capture before/after evidence.
- Do not suppress tests or reduce assertion coverage to make CI pass.

### At task completion

1. Run the task-specific tests.
2. Run the production build.
3. Run route/link checks for affected paths.
4. Run visual checks when layout or styling changed.
5. Inspect `git diff` and ensure no unrelated files changed.
6. Update `docs/performance/findings/` and handoff notes.
7. Commit with a focused conventional commit message.
8. Record commit hash, commands, test output, evidence paths and remaining risks.

### Agent handoff file

Maintain `AGENT_HANDOFF.md` with:

```markdown
# Agent Handoff

## Current phase and task
## Completed tasks and commit hashes
## Current branch and working tree status
## Baseline and latest report locations
## Findings fixed and evidence
## Findings still open
## Commands executed and results
## Known flaky tests or environment limits
## Next exact task
## Files changed in the last task
## Risks and decisions requiring owner input
```

Never claim that a task is complete when tests were skipped. Use `NOT RUN`, `BLOCKED` or `NEEDS OWNER INPUT` explicitly.

---

## 10. Definition of done

This report-driven remediation project is complete only when all of the following are true:

- The exact supplied reports were recovered or their unavailability was documented and fresh reproductions created.
- The original numeric metrics were not guessed or fabricated.
- Every relevant Lighthouse finding has been mapped to a root cause and a disposition.
- The primary slow/resource-heavy issues have been fixed or explicitly accepted with rationale.
- Desktop and mobile PSI reports have been regenerated after implementation.
- Lighthouse Metrics has a fresh comparison run, or a documented service-access limitation.
- Field data availability is reported accurately.
- Performance budgets exist and run in CI.
- Tests cover representative site templates and URLs.
- Critical browser/device and responsive checks pass.
- No critical accessibility regression is introduced.
- Visual design and animation quality are preserved or improved.
- Static assets are compressed and caching is correct.
- Existing routes, article URLs, aliases, feeds and downloads remain valid.
- Netlify Deploy Preview passes before production.
- Production smoke tests and rollback instructions are recorded.
- All work is committed and the next agent can continue from the handoff.

---

## 11. Authoritative references

Use the current official documentation when making implementation decisions. Re-check pages before execution because Lighthouse versions, API schemas, browser support and free-tool limits may change.

- [Google PageSpeed Insights — About](https://developers.google.com/speed/docs/insights/v5/about) — separates field data from Lighthouse lab diagnostics.
- [PageSpeed Insights API reference](https://developers.google.com/speed/docs/insights/v5/reference) — supports programmatic report generation and result capture.
- [PageSpeed Insights API getting started](https://developers.google.com/speed/docs/insights/v5/get-started) — setup and usage.
- [PageSpeed Insights FAQ](https://developers.google.com/speed/docs/insights/faq) — field data availability and report freshness.
- [Core Web Vitals](https://web.dev/articles/vitals) — user-centric metrics and good thresholds.
- [Lighthouse overview](https://developer.chrome.com/docs/lighthouse/overview) — audit categories and execution modes.
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) — per-commit audits, assertions and regression reports.
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance) — runtime profiling and root-cause analysis.
- [Netlify Deploy Previews](https://docs.netlify.com/site-deploys/deploy-previews/) — safe preview validation before production.

---

## 12. Exact starting instruction for the next AI agent

> You are taking over a performance remediation project for DearDhruv.com. Read this entire document before changing any code. This is an independent plan based on three supplied reports: PageSpeed desktop, PageSpeed mobile and Lighthouse Metrics. First retrieve and archive the exact report contents. The report pages previously exposed insufficient CrUX data and did not expose the numeric Lighthouse audit payload in the preparation environment; do not invent scores or failed audits. If a supplied report is inaccessible or expired, generate a fresh, dated reproduction and label it clearly.
>
> Start with **Phase 0, Task 0.1 only**. Do not begin implementation until the reports and baseline are documented. Verify the checked-out repository is the current Astro/Netlify project; do not assume Hugo. Preserve every existing public route and asset. Reuse the repository's existing audit scripts before adding new tooling. Work on a branch, use small tasks, run tests and visual checks, save report evidence, commit every completed task, and update `AGENT_HANDOFF.md`. Do not deploy to production without the release gates in this document. When you stop, leave the exact next task and all evidence paths so another agent can resume without repeating work.

**End of independent execution plan.**
