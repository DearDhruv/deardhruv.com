# Deardhruv.com — Web Standards, Performance, Accessibility, Compatibility & Continuous Quality Audit Plan

**Document type:** Independent engineering specification and phased implementation plan  
**Target website:** <https://deardhruv.com/>  
**Known deployment direction:** Astro + Netlify (verify against the current repository and production deployment before changing anything)  
**Audience:** AI coding agents, frontend engineers, QA engineers, designers, and future maintainers  
**Operating model:** Small tasks, evidence-backed findings, automated checks on every commit/PR, deeper scheduled audits, release gates, and documented handoffs  
**Primary constraint:** Keep the site lightweight, fast, accessible, responsive, secure, maintainable, and usable on lower-end devices—not merely impressive on a high-end desktop.

---

## 0. Mission and expected result

The purpose of this document is to establish a repeatable quality engineering system for the website. It is not a redesign brief and it is not a request to chase arbitrary scores. It defines what must be inspected, measured, tested, reported, and protected whenever the website changes.

The website should:

1. Follow current, applicable international web standards and recognised best practices.
2. Load quickly on constrained mobile networks and lower-end hardware.
3. Keep JavaScript, CSS, HTML, fonts, images, animation, and third-party resources as small and purposeful as practical.
4. remain usable when a device has a slow CPU, limited memory, high latency, reduced bandwidth, or reduced-motion preferences.
5. Work across current major browsers and a documented set of older-but-relevant browser versions.
6. Adapt to narrow phones, large phones, tablets, foldables, portrait and landscape orientations, desktop monitors, ultrawide displays, and television-sized screens.
7. Meet WCAG 2.2 Level AA as the engineering target, with manual assistive-technology checks in addition to automated scans.
8. Use progressive enhancement: the main content and essential navigation must remain usable without unnecessary client-side JavaScript.
9. Protect search discoverability, metadata, structured data, canonical URLs, feeds, sitemap, robots rules, and every existing published URL.
10. Provide a repeatable audit trail that shows what was tested, on which build, using which tools, with which settings, and what changed since the previous run.
11. Avoid regressions at each commit and release through proportionate automated checks.
12. Remain straightforward to update, write articles for, preview, deploy, and maintain from anywhere.

A score of 100 is not the definition of quality. A website can score highly in Lighthouse and still have poor real-device behaviour, inaccessible interactions, broken links, excessive battery use, confusing content, or problems in Safari and TV browsers. All findings must be interpreted in context.

## 1. Mandatory instructions for every AI agent

### 1.1 Verify the current implementation before acting

The known direction is Astro on Netlify, but the repository is the source of truth. Before changing configuration:

- Inspect `package.json`, the lockfile, Astro configuration, Netlify configuration, build scripts, CI workflows, and the current deployment settings.
- Record the current framework and version, Node version, package manager, build command, output directory, adapters/integrations, and hosting configuration.
- Identify existing lint, type-check, unit-test, accessibility, SEO, performance, security, visual-regression, route, and link-check scripts.
- Reuse and improve existing scripts. Do not create a second audit framework that duplicates an existing working implementation.
- Confirm the production deploy corresponds to the expected Git branch and commit.
- Inspect the deployed HTML and assets. Do not assume the repository and production deployment are in sync.
- Do not introduce another framework, CMS, database, runtime server, analytics vendor, animation library, or large dependency unless the need is demonstrated and documented.

### 1.2 Protect content and URLs

- Do not rename, move, delete, or silently change any published article, project, profile, policy, résumé, image, feed, sitemap, or downloadable-file path.
- Build a baseline URL manifest before changes.
- Preserve old URLs exactly wherever possible. If a change is unavoidable and explicitly approved, implement a permanent one-to-one redirect and verify it.
- Preserve canonical URLs and avoid redirect chains or redirect loops.
- Verify both HTML pages and non-HTML endpoints, including sitemap, robots.txt, RSS/Atom/JSON feeds, Markdown endpoints, PDFs, and assets.
- Do not modify production settings or deploy to production without the release process and approval.

### 1.3 Evidence before claims

Every audit finding must include:

- Unique finding ID.
- Affected URL, route, component, asset, or code file.
- Severity: Blocker, Critical, High, Medium, Low, or Informational.
- Category and relevant standard/criterion.
- Reproduction steps.
- Tool, tool version, run date, browser/device profile, and test conditions.
- Evidence: screenshot, trace, HAR, console output, report excerpt, source location, or measured value.
- Impact on users and/or maintainers.
- Recommended fix.
- Verification procedure after the fix.
- Whether the issue is confirmed, suspected, or not testable in the current environment.

Never invent performance scores, real-user measurements, browser support, security grades, or user behaviour. Mark unavailable measurements as **Not measured** and explain what is needed to measure them.

### 1.4 Keep tasks small

- Work on one small task at a time.
- Complete the implementation, tests, and documentation for that task before starting the next one.
- Commit each completed task with a meaningful conventional commit message.
- Keep changes scoped. Avoid mass formatting, dependency upgrades, and unrelated content edits in the same commit.
- Update `QUALITY_AUDIT_STATUS.md` and the handoff section after each completed task.
- Never claim a task is complete merely because a command exits successfully. Inspect the actual report and verify the user-visible result.

---

## 2. Standards and technical references to use

The agent must verify the latest stable recommendations before changing a version-specific implementation. The links below are the starting reference set, not a claim that every standard applies to every website feature.

| Area | Primary reference / target | How to apply it |
|---|---|---|
| Accessibility | [WCAG 2.2](https://www.w3.org/TR/WCAG22/) Level AA | Primary accessibility acceptance target. Check relevant A, AA criteria and documented exceptions. |
| Accessibility patterns | [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) | Use for complex widgets only. Prefer native HTML controls when possible. |
| HTML | [WHATWG HTML Living Standard](https://html.spec.whatwg.org/) | Valid semantics, landmarks, forms, headings, links, buttons, metadata, and browser behaviour. |
| HTML validation | [Nu HTML Checker](https://validator.w3.org/nu/) | Detect markup errors and warnings; do not treat a clean result as proof of accessibility. |
| CSS | [CSS specifications](https://www.w3.org/Style/CSS/) and [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) | Validate syntax and check layout behaviour across browsers. |
| JavaScript | [ECMAScript specification](https://tc39.es/ecma262/) and MDN | Use supported language features, avoid unnecessary polyfills, and prevent runtime errors. |
| Browser feature support | [MDN Baseline](https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility), [Can I Use](https://caniuse.com/), [MDN Browser Compatibility Data](https://github.com/mdn/browser-compat-data) | Check all browser APIs and CSS features used by the site. |
| Core Web Vitals | [Google Core Web Vitals](https://web.dev/articles/vitals) | Field targets at the 75th percentile, segmented by mobile and desktop where data exists. |
| Performance | [Web.dev performance](https://web.dev/learn/performance/) and [MDN Performance](https://developer.mozilla.org/en-US/docs/Web/Performance) | Critical rendering path, resources, caching, rendering, JS and image optimisation. |
| Animation | [High-performance CSS animations](https://web.dev/articles/animations-guide) | Prefer composited transform/opacity; profile expensive effects and respect reduced motion. |
| Reduced motion | [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) | Provide an intentional reduced-motion experience. |
| Security | [OWASP Top 10](https://owasp.org/www-project-top-ten/), [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/), [OWASP WSTG](https://owasp.org/www-project-web-security-testing-guide/) | Apply security controls proportionate to a static portfolio and any server-side integrations. |
| Transport security | [TLS guidance](https://wiki.mozilla.org/Security/Server_Side_TLS), [SSL Labs](https://www.ssllabs.com/ssltest/) | HTTPS, certificates, modern TLS, redirect behaviour and security headers. |
| Structured data | [Schema.org](https://schema.org/), [Google structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) | Use accurate entities and properties; structured data must match visible content. |
| Search | [Google Search Central](https://developers.google.com/search/docs), [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a) | Crawlability, indexing, canonicalisation, helpful content, metadata and sitemaps. |
| Web platform tests | [Web Platform Tests](https://web-platform-tests.org/) | Reference for cross-browser interoperability; use real project tests for site-specific behaviour. |
| Internationalisation | [W3C Internationalisation](https://www.w3.org/International/) | Language, directionality, Unicode, text expansion and locale behaviour if applicable. |

### 2.1 Standards discipline

- WCAG 2.2 AA is the target, not a certification claim. Do not write “WCAG certified” unless a recognised and valid certification process actually occurred.
- Do not misuse ARIA. Native semantic elements are preferable to recreating buttons, links, headings, tabs, menus, and dialogs with generic `div` elements.
- Use web platform features that are widely available in the supported browser set. For newly available or limited-availability features, add a fallback and test it.
- Check the current feature support in MDN Baseline and Can I Use at the time the feature is introduced. Do not copy old compatibility tables into code comments and assume they remain current.
- Validate HTML, but understand that validators do not measure usability, visual quality, accessibility, security, or performance.
- Do not pursue SEO tricks that violate search engine guidelines, including keyword stuffing, hidden text, doorway pages, fake review markup, or misleading structured data.

---

## 3. Free online tools and free developer tools

The tools below are selected because their core use is free, open source, or available without a paid subscription. Free tiers, rate limits, login requirements, scan limits, and feature availability can change. The agent must re-check each tool's current terms before automating or depending on it.

### 3.1 Performance, load speed, and real-user metrics

| Tool | Link | Cost / access | Use it for | Important limitation |
|---|---|---|---|---|
| Google PageSpeed Insights | https://pagespeed.web.dev/ | Free online tool | Lighthouse lab report plus Chrome UX Report field data when sufficient data exists; mobile and desktop. | Field data may be unavailable for a low-traffic URL/origin. A lab run is a controlled simulation, not a physical low-end phone. |
| Lighthouse | https://developer.chrome.com/docs/lighthouse/ | Free, open source; Chrome/CLI/Node | Performance, accessibility, best practices, and SEO audits. | Scores vary between runs. Use repeat runs and compare the same environment. It does not replace manual checks. |
| Chrome UX Report (CrUX) | https://developer.chrome.com/docs/crux/ | Free public dataset/APIs | Aggregated real Chrome-user experience and Core Web Vitals where eligible data exists. | Not every site/page has enough traffic. Does not represent every browser or every user. |
| WebPageTest | https://www.webpagetest.org/ | Free public testing with service limits | Waterfall, filmstrip, multiple locations, connection profiles, repeat views, and loading sequence. | Public infrastructure has queue/rate limitations; test settings and location must be recorded. |
| Chrome DevTools Performance | https://developer.chrome.com/docs/devtools/performance/ | Free, built into Chrome | Main-thread work, long tasks, scripting, layout, paint, rendering, frame rate, network, CPU throttling. | Browser-specific profiling. A recording is not a full device energy or GPU-power measurement. |
| Chrome DevTools Performance Monitor | https://developer.chrome.com/docs/devtools/performance-monitor/ | Free | Live CPU usage, JS heap, DOM nodes, event listeners, documents, frames, layout and style recalculation rates. | Chromium diagnostic view; values should be interpreted with context. |
| Chrome DevTools Memory | https://developer.chrome.com/docs/devtools/memory/ | Free | Heap snapshots, allocation timelines, detached DOM nodes, memory leak investigation. | Does not represent every native, GPU, driver or OS memory allocation. |
| Lighthouse CI | https://github.com/GoogleChrome/lighthouse-ci | Free, open source | Repeatable Lighthouse checks in CI, budgets, stored reports and change comparison. | Needs project configuration and stable environments; do not let noisy metrics create flaky builds. |
| `web-vitals` | https://github.com/GoogleChrome/web-vitals | Free, open source | Correctly collect Core Web Vitals from real page visits when RUM is intentionally enabled. | Requires privacy review, consent decisions where applicable, and a data endpoint/analytics provider. |

### 3.2 Accessibility and inclusive interaction

| Tool | Link | Cost / access | Use it for | Important limitation |
|---|---|---|---|---|
| WAVE | https://wave.webaim.org/ | Free online page checks | Visual overlays for accessibility errors, contrast, labels, headings and structure. | Primarily page-level; dynamic states and every WCAG criterion are not covered. |
| axe-core | https://github.com/dequelabs/axe-core | Free, open source | Automated accessibility tests in unit/component/browser tests and CI. | Automated checks catch only a portion of accessibility issues. |
| Accessibility Insights for Web | https://accessibilityinsights.io/ | Free browser tooling | Automated checks plus guided manual assessment, including keyboard/focus checks. | Manual steps still require a person and understanding of the feature. |
| Pa11y / Pa11y CI | https://pa11y.org/ and https://github.com/pa11y/pa11y-ci | Free, open source | Accessibility scanning of URL lists and sitemaps in CI. | Depends on the selected WCAG ruleset and browser execution; not a complete audit. |
| W3C Contrast Checker | https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html | Free guidance; pair with a contrast tool | Verify contrast ratios for text and UI components. | Contrast tools do not evaluate font legibility, hierarchy, meaning, or focus visibility. |
| Colour Contrast Analyser | https://www.tpgi.com/color-contrast-checker/ | Free desktop utility | Sample actual foreground/background contrast. | Manually sample gradients, overlays and hover/selected states. |
| HeadingsMap | https://addons.mozilla.org/ | Free extension | Inspect heading hierarchy and landmarks. | Not a full accessibility audit. |
| NVDA | https://www.nvaccess.org/ | Free Windows screen reader | Real assistive-technology testing. | Requires manual test scripts and a Windows environment. |
| VoiceOver | Built into Apple platforms | Included with macOS/iOS | Screen-reader testing on Safari and Apple devices. | Must test on actual or simulated Apple environments; keyboard-only checks are not enough. |

### 3.3 HTML, CSS, links, feeds, and internationalisation

| Tool | Link | Cost / access | Use it for | Important limitation |
|---|---|---|---|---|
| Nu HTML Checker | https://validator.w3.org/nu/ | Free | HTML conformance issues in rendered documents. | A validator is a checker, not a quality or accessibility certification. |
| W3C CSS Validator | https://jigsaw.w3.org/css-validator/ | Free | CSS syntax and specification warnings. | Vendor-specific modern CSS may produce warnings; review rather than blindly suppress. |
| W3C Link Checker | https://validator.w3.org/checklink | Free | Link checking for pages and crawled routes. | Rate limits, external server blocks and transient failures can create false positives. |
| W3C Internationalisation Checker | https://validator.w3.org/i18n-checker/ | Free | Language declarations and internationalisation issues. | Does not evaluate translation quality or every language-specific UX issue. |
| W3C Feed Validation Service | https://validator.w3.org/feed/ | Free | RSS/Atom validation. | Test the feed URL actually deployed, not just a local file. |
| Schema Markup Validator | https://validator.schema.org/ | Free | General Schema.org structured-data validation. | Syntax validity does not guarantee a search feature or ranking. |
| Google Rich Results Test | https://search.google.com/test/rich-results | Free | Google-supported rich-result eligibility and errors. | Only supported rich-result types are evaluated; no display guarantee. |

### 3.4 Browser, screen, and responsive checks

| Tool | Link | Cost / access | Use it for | Important limitation |
|---|---|---|---|---|
| Playwright | https://playwright.dev/ | Free, open source | Chromium, Firefox, WebKit; desktop and emulated mobile/tablet browser projects; screenshots and interaction tests. | Emulation is not a substitute for physical hardware, real TV remotes, real foldables, or actual Safari hardware. |
| Responsively App | https://responsively.app/ | Free, open source | View multiple viewport/device presets side-by-side and mirror interactions. | Uses an Electron/Chromium-based environment; verify other browser engines separately. |
| Chrome DevTools Device Mode | https://developer.chrome.com/docs/devtools/device-mode/ | Free | Responsive viewport, DPR, touch, CPU/network throttling and screen emulation. | Not a real-device hardware test. |
| Firefox Responsive Design Mode | https://firefox-source-docs.mozilla.org/devtools-user/responsive_design_mode/ | Free | Firefox-specific responsive viewport and touch testing. | Does not emulate every real device or browser version. |
| Safari Web Inspector / Simulator | https://developer.apple.com/safari/tools/ | Free with Apple developer tools | Safari/WebKit inspection and iOS Simulator testing on macOS. | Physical iPhone/iPad verification remains necessary for final confidence. |
| MDN Baseline | https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility | Free | Widely available/newly available feature checks across major browser families. | Does not cover every old browser, webview, assistive technology, TV browser, or device limitation. |
| Can I Use | https://caniuse.com/ | Free | Specific browser-version support for HTML/CSS/JS features. | Compatibility tables do not prove the whole implementation works. |

### 3.5 Security and transport

| Tool | Link | Cost / access | Use it for | Important limitation |
|---|---|---|---|---|
| OWASP ZAP | https://www.zaproxy.org/ | Free, open source | Baseline passive scanning, security testing of public routes and forms, CI automation. | Only scan assets and domains you own or are authorised to test. Active scans can affect systems; start with passive/baseline scans. |
| MDN HTTP Observatory | https://developer.mozilla.org/en-US/observatory | Free | HTTP security headers and configuration review. | It cannot establish that the complete site/app is secure. |
| Qualys SSL Labs | https://www.ssllabs.com/ssltest/ | Free | Public TLS/SSL configuration and certificate assessment. | Evaluates TLS configuration, not all application security. |
| SecurityHeaders.com | https://securityheaders.com/ | Free scan | Public response security headers. | Header grades are a heuristic; validate policy compatibility before deployment. |
| Mozilla TLS guidance | https://wiki.mozilla.org/Security/Server_Side_TLS | Free guidance | TLS configuration baseline. | Hosting provider controls some TLS settings. |
| OWASP Dependency-Check | https://owasp.org/www-project-dependency-check/ | Free, open source | Known vulnerable dependencies in applicable ecosystems. | Findings can be false positive/false negative; review advisory and package path. |
| npm audit | https://docs.npmjs.com/cli/v10/commands/npm-audit | Free CLI | Known package vulnerabilities in npm dependency tree. | Does not replace dependency review or runtime security testing. |

### 3.6 SEO, search visibility, and analytics

| Tool | Link | Cost / access | Use it for | Important limitation |
|---|---|---|---|---|
| Google Search Console | https://search.google.com/search-console | Free account/property verification | Indexing, queries, clicks, impressions, sitemap, canonical and search appearance reports. | Requires verified property. Search reporting has delays and privacy thresholds. |
| Bing Webmaster Tools | https://www.bing.com/webmasters | Free account/property verification | Bing crawling, URL inspection, SEO reports, backlinks and available AI Performance reporting. | AI citation reporting does not represent every AI provider. |
| Ahrefs Webmaster Tools / Free | https://ahrefs.com/webmaster-tools | Free with ownership verification and limits | Technical site audit and backlink information within free limits. | Crawl and report limits apply; commercial features are paid. |
| Screaming Frog SEO Spider | https://www.screamingfrog.co.uk/seo-spider/ | Free up to 500 URLs per crawl | Crawl titles, descriptions, headings, canonicals, redirects, links, images, status codes. | Larger crawls and certain features require a licence. |
| Google Analytics 4 | https://analytics.google.com/ | Free standard product | User journeys, acquisition, landing pages, events and conversions. | Requires privacy review and correct event configuration. |
| Microsoft Clarity | https://clarity.microsoft.com/ | Free service | Heatmaps, session recordings and interaction friction. | Add only after privacy review; mask sensitive inputs and respect consent requirements. |
| Cloudflare Web Analytics | https://www.cloudflare.com/web-analytics/ | Free | Privacy-focused page-view and performance analytics. | It does not replace Search Console, detailed product analytics, or every RUM measure. |
| Looker Studio | https://lookerstudio.google.com/ | Free standard use | Dashboarding from Search Console, Analytics and supported sources. | Connectors and some third-party connectors may have paid limits. |

### 3.7 Important honesty about “free”

- The audit tool itself may be free while automation, API quotas, long-term history, team dashboards, high-volume testing, or physical-device access may be paid.
- Public scanners usually test a public URL from their own environment. They do not know the user's real CPU, RAM, battery, GPU, browser extensions, assistive technology, TV remote, or foldable hinge state.
- Physical low-end phones, iPhones, tablets, foldables, and TVs must be tested on real hardware where possible. Emulators and browser emulation reduce risk but cannot prove full compatibility.
- No free service can promise discovery, ranking, or citations in every search engine and AI assistant.
- Record the date and exact test configuration for every online report. Do not compare a mobile result with a desktop result or different test regions as if they were identical.

---

## 4. Full website quality checklist

Every page template and important component must be evaluated against the following categories. The audit should include the home page, about/profile page, portfolio/projects, article list, at least one long article, contact page, policy pages, 404 page, sitemap, feeds, downloadable documents, and any interactive/demo page.

### 4.1 Page loading and perceived speed

Check:

- DNS lookup, connection setup, TLS handshake, request latency, TTFB, redirects, HTML response time, and server/cache behaviour.
- Critical rendering path and whether CSS/JS blocks first paint unnecessarily.
- FCP, LCP, INP, CLS, TTFB, Speed Index, and total blocking time in lab results where available.
- Real-user Core Web Vitals at the 75th percentile where CrUX/Search Console data exists.
- Cold-cache and warm-cache loads.
- First visit and repeat visit behaviour.
- Slow mobile connection and higher-latency connections.
- Font loading and font-swap behaviour; no invisible text for an extended period.
- Hero image priority, image dimensions, responsive source selection, and preload only when truly critical.
- Lazy loading below-the-fold media without lazy-loading the primary LCP image.
- Unnecessary redirects, chained redirects, and duplicate requests.
- Compression (Brotli/Gzip where supported), content types, cache headers, CDN caching, and immutable hashed asset caching.
- Loading order and network waterfall for fonts, scripts, CSS, images, videos, analytics, embeds, and other third parties.
- Correct use of preload, preconnect, dns-prefetch, prefetch, and modulepreload; remove speculative hints that add work without a measured benefit.
- Browser back/forward cache compatibility where applicable.

### 4.2 Core Web Vitals and performance targets

Use Google's current good thresholds as the minimum field target:

| Metric | Good target | What it tells us |
|---|---:|---|
| LCP | <= 2.5 seconds | Main content loading performance |
| INP | <= 200 milliseconds | Responsiveness to real interactions |
| CLS | <= 0.1 | Visual stability |

Evaluate at the 75th percentile of real page visits, segmented by mobile and desktop when the data supports it. Lab values are useful for diagnosis but are not the same as field data.

Also track diagnostic metrics where available:

- TTFB: target <= 0.8 seconds for the origin/edge path under the selected test conditions; establish an achievable baseline for Netlify and geographic location.
- FCP: aim <= 1.8 seconds under the selected mobile Lighthouse profile.
- TBT: aim <= 200 milliseconds in the selected Lighthouse profile, while understanding that it is a lab diagnostic and not a Core Web Vital.
- Long tasks: identify tasks over 50 ms and remove or break up those that block interactions.
- Animation frames: aim for stable frame delivery. For a 60 Hz target, a frame has roughly 16.7 ms; newer high-refresh screens have tighter budgets. Test on actual hardware rather than assuming every TV/phone refreshes at 60 Hz.

These are project targets, not universal guarantees. Establish the same test environment and record variance before enforcing thresholds.

### 4.3 Proposed resource budgets

The agent must measure the current baseline first, then tune budgets for actual page complexity. Start with these provisional budgets for ordinary portfolio/article routes:

| Resource | Initial target / guardrail | Notes |
|---|---:|---|
| Initial HTML | <= 50 KB compressed per page, preferred | Long articles may exceed this; focus on semantic content and avoid bloated inline payloads. |
| Initial JavaScript | <= 100 KB compressed per route, preferred <= 50 KB | Static content should require little or no client JS. Exceptions need a bundle report and reason. |
| Initial CSS | <= 75 KB compressed per route | Avoid huge global stylesheets and unused design-system CSS. |
| Critical above-the-fold images | <= 500 KB combined where practical | Hero art can need more, but must be responsive and justified. |
| Single raster image | Prefer <= 200 KB for normal content images | Use AVIF/WebP with suitable fallbacks where supported; do not degrade quality unnecessarily. |
| Font payload | <= 150 KB total initial font transfer where practical | Prefer WOFF2, subsets, limited weights, `font-display: swap`/appropriate strategy. |
| Third-party scripts | Zero by default; every addition justified | Analytics, embeds and widgets can affect performance and privacy. |
| Initial critical request count | Keep low and documented | Focus on critical path rather than an arbitrary global count. |
| Main page DOM | Prefer fewer than 1,500 elements; investigate above 2,000 | Not a hard browser limit; lists/articles may be naturally larger. |
| Total transferred bytes | Set route-specific mobile budget after baseline | Report cold-cache first visit separately from repeat visits. |

Budgets must be implemented as route-aware checks, not broad rules that break legitimate content. If a budget must be raised, document the affected route, justification, user impact, owner, and review date. Never raise a budget only to silence a failing test.

### 4.4 JavaScript and runtime weight

Inspect:

- How much JavaScript each route downloads, parses, compiles, and executes.
- Which scripts are truly required for the initial view.
- Astro hydration/island boundaries and whether a component actually needs client-side JavaScript.
- Hydration waterfalls, hydration errors, duplicate hydration, and unnecessary client bundles.
- Dead code, unused dependencies, duplicate packages, large dependencies, unnecessary polyfills, and duplicated utilities.
- Tree-shaking and production minification.
- Dynamic imports and route-level/component-level code splitting.
- Event listener lifecycle and cleanup.
- Passive listeners for touch/scroll where appropriate.
- Long synchronous tasks, expensive event handlers, layout thrashing, and repeated DOM queries.
- Main-thread blocking during scroll, navigation, menus, search, animation, and page transitions.
- Unhandled promise rejections, console errors, and exceptions.
- Third-party JavaScript, embeds, widgets, social feeds, video players and tag managers.
- Memory growth after repeated route changes, opening/closing menus, or running animations.
- Whether core content and links work when JavaScript is unavailable or blocked.

Rules:

- Prefer static HTML for content pages.
- Hydrate only interactive components.
- Do not add a client framework to solve a problem CSS/HTML can solve.
- Load non-critical features on demand.
- Do not run continuous animation loops when the component is not visible.
- Pause or lower animation work when `document.visibilityState` is hidden.
- Avoid polling when events or static state will do.
- Avoid adding a large animation library for a handful of CSS transitions.

### 4.5 HTML and document structure

Check:

- Valid document structure and doctype.
- Correct `lang` attribute and direction where required.
- Unique, meaningful `<title>` and description per page.
- Correct viewport meta tag.
- Semantic landmarks (`header`, `nav`, `main`, `footer`, `aside` where appropriate).
- Exactly one clear primary page heading as a design/content rule, with a logical heading hierarchy (do not choose headings merely for visual size).
- Meaningful link text and button labels.
- Correct use of `<a>` for navigation and `<button>` for actions.
- Lists represented as lists; tables used for tabular data.
- Images have appropriate alt text or empty alt for decorative images.
- Width/height or aspect ratio reserved for images, video, embeds and other media to avoid layout shifts.
- Forms have labels, instructions, validation and error associations.
- No duplicate IDs, invalid nesting, missing required attributes, or invalid interactive element nesting.
- Proper metadata, canonical URL, robots directives, Open Graph and social preview metadata.
- Correct structured data that matches page content.
- No hidden keyword text, misleading metadata or deceptive markup.
- No accidental indexation of staging/preview/private pages.
- No accidental `noindex` on public pages.

### 4.6 CSS, layout and rendering efficiency

Check:

- CSS bundle size and unused CSS.
- Cascade complexity, specificity conflicts, duplicate declarations, and unnecessary overrides.
- CSS custom property tokens for colors, spacing, typography, radii, shadows and motion.
- Container queries, grid, flexbox and intrinsic sizing used appropriately.
- Avoid fixed widths/heights that cause overflow or clipping.
- Prefer fluid sizing (`min()`, `max()`, `clamp()`) with accessible minimums.
- Test long words, long URLs, code blocks, tables, inline media, and large text scaling.
- Use `content-visibility`/containment only with testing; avoid hiding content from search/assistive technology or causing scroll/anchor issues.
- Avoid excessive blur, backdrop-filter, large shadows, giant gradients, filters, blend modes, and full-screen canvas on low-end GPUs.
- Avoid layout shifts triggered by late font/image/script injection.
- Use aspect ratios and responsive layout primitives.
- Validate CSS in Chromium, Firefox and WebKit.

### 4.7 Animation, transitions and motion

The design must be polished without spending CPU/GPU continuously or forcing every user to experience motion.

Check:

- Prefer `transform` and `opacity` for animations where possible.
- Avoid animating layout properties (`width`, `height`, `top`, `left`, margins, padding) unless profiling proves it acceptable.
- Avoid continuous animated backgrounds, particles, cursor trails, large parallax, full-page WebGL, video backgrounds, and unnecessary 3D scenes on the default experience.
- Use `will-change` sparingly and remove it when no longer needed.
- Avoid creating excessive compositing layers.
- Avoid expensive backdrop filters and large blur radii on low-end devices.
- Pause offscreen animations using intersection/visibility-aware logic when appropriate.
- Stop animation when a tab is backgrounded.
- Use CSS transitions for simple state changes rather than JavaScript animation loops.
- Respect `prefers-reduced-motion: reduce`; remove non-essential movement and avoid large scale/pan transitions.
- Keep motion short and purposeful; avoid motion that delays access to content or controls.
- Provide stable focus, hover, pressed, active, selected, disabled and loading states independent of animation.
- Do not rely on hover for essential interaction; touch and keyboard need equivalent access.
- Avoid flashing content. Verify applicable WCAG flash criteria.
- Test real scroll performance and animation frame stability on lower-end hardware.

### 4.8 Image, video, SVG and media optimisation

Check:

- Correct dimensions for display size and high-DPR screens.
- Responsive `srcset` and `sizes` for images with multiple breakpoints.
- AVIF/WebP support with appropriate fallback strategy.
- Proper compression without visible quality loss.
- Lazy-load below-the-fold content; do not lazy-load the actual LCP/hero image by default.
- Avoid oversized source images and thumbnails loaded at full resolution.
- Include intrinsic dimensions/aspect ratio to prevent CLS.
- Use SVG for suitable icons/illustrations; sanitise untrusted SVG and avoid giant inline SVG payloads.
- Avoid base64-embedding large images in HTML/CSS.
- Video should not autoplay with sound. Use posters, controls, captions and deferred loading.
- Respect data-saving preferences where applicable and avoid downloading high-resolution media before user intent.
- Animated GIFs should be replaced by video or CSS/SVG when appropriate and accessible.
- Ensure image alt text communicates useful meaning, not filenames or keyword stuffing.

### 4.9 Fonts and typography

Check:

- Font file type and size; prefer WOFF2 where supported.
- Number of font families and weights downloaded on first visit.
- Subsetting to required character sets when safe.
- Font loading behaviour and fallback metrics.
- Avoid layout shifts when the final font replaces fallback fonts.
- Correct language glyph coverage and punctuation.
- Readability at 200% zoom and at narrow widths.
- Text remains usable when custom fonts fail or are blocked.
- Do not load font families from several external providers without a reason.

### 4.10 Accessibility and assistive technology

Target WCAG 2.2 AA. Check at minimum:

**Perceivable**
- Text contrast: 4.5:1 for normal text and 3:1 for large text, where the criterion applies.
- Non-text UI components and meaningful graphics: 3:1 against adjacent colors where applicable.
- Text alternatives for informative images; decorative images ignored by screen readers.
- Captions/transcripts for meaningful audio/video.
- Content does not depend only on color, shape, position, sound, animation or hover.
- Reflow without two-dimensional scrolling at 320 CSS pixels for ordinary content (except content that inherently requires two-dimensional layout).
- Text resizing and text-spacing overrides do not clip, overlap, or hide content.

**Operable**
- All functionality works using keyboard alone.
- Visible focus indicator on every interactive element.
- Logical focus order and no keyboard trap.
- Skip link to main content.
- Touch/click target sizes meet WCAG 2.2 target-size criteria or documented exceptions; aim for larger comfortable targets (around 44 CSS px where practical).
- Pointer gestures have simpler alternatives.
- Dragging operations have a non-drag alternative.
- Hover/focus-triggered content can be dismissed, hovered, and remains available as required.
- No essential hover-only states.
- Focus is not obscured by sticky headers, menus, banners, or overlays.
- Page title, navigation and repeated components are consistent.

**Understandable**
- Language and language changes are programmatically identified.
- Form labels, instructions, required fields and errors are clear.
- Error suggestions are actionable.
- Navigation and controls behave consistently.
- Links identify destination/purpose in context.
- No unexpected context change merely from focus/input.

**Robust**
- Valid names, roles, states and values for controls.
- Screen-reader announcement for dynamic status/error/loading changes where needed.
- Semantic HTML and correct ARIA relationships.
- Test with NVDA/Firefox or Chrome on Windows and VoiceOver/Safari on macOS/iOS where available.
- Check accessible name, role, value and focus order for all interactive components.

Automated tools cannot prove the full set of criteria. Keep a manual checklist and record the tester, browser, assistive technology, and result.

### 4.11 Responsive and adaptive layout

Do not implement a design that only works at a few named phone widths. Test fluid behaviour between breakpoints.

Required viewport test matrix (CSS pixels, approximate representative sizes):

| Category | Test widths | Required orientation / behaviour |
|---|---|---|
| Very narrow phones | 320, 340 | Portrait; no horizontal overflow; content remains readable. |
| Common phones | 360, 375, 390, 414, 430 | Portrait and landscape; touch-friendly controls. |
| Large phones | 480, 540 | Portrait/landscape; avoid oversized whitespace or stretched text. |
| Foldables | 600, 673, 720, 840, 900 | Folded/narrow and unfolded/wide states; test hinge/occlusion if using spanning APIs. |
| Small tablets | 600, 768 | Portrait and landscape; navigation and columns adapt. |
| Tablets / compact laptops | 820, 960, 1024 | Both orientations; no awkward intermediate layout. |
| Standard laptops | 1280, 1366, 1440 | Desktop navigation, readable line length. |
| Large desktops | 1600, 1920 | Constrained content width; no excessively long text lines. |
| Ultrawide | 2160, 2560, 3440 | Intentional content grid; avoid stretched single-column text. |
| Full HD TV | 1920x1080 | Ten-foot viewing distance; large readable typography and remote focus. |
| 4K TV | 3840x2160 | DPR/scaling considered; content does not become tiny or spread unnaturally. |

The unusual 320/340/673 values are test points, not mandatory CSS breakpoints. Remove any malformed values when implementing the test matrix; the intended narrow-phone widths are 320, 340 and 360 CSS pixels.

Also test:

- Portrait, landscape, and orientation change while a page is open.
- Browser chrome expansion/collapse and dynamic viewport units.
- Safe-area insets (`env(safe-area-inset-*)`) on notched devices where relevant.
- Foldable continuity, folded/unfolded posture, and hinge/occlusion only if the site uses spanning APIs.
- Browser zoom at 200% and reflow at 400% (where applicable to WCAG 1.4.10).
- Text-only zoom and custom font scaling where the OS/browser offers it.
- Minimum and maximum viewport height, short landscape displays, and virtual keyboard overlap.
- Touch, mouse, keyboard, stylus, and remote-control focus.
- Long content, tables, code, card grids, modals and menus at all relevant widths.

### 4.12 TV and remote-control usability

A television is not simply a wide desktop monitor. If TV support is a goal, test:

- 10-foot readability, text size and viewing contrast.
- Focus indicators large enough to see from a distance.
- Predictable directional navigation using arrow keys and remote controls.
- Logical focus order between navigation, content cards and actions.
- No hover-only interactions.
- No small pointer targets that require a mouse.
- Overscan-safe spacing and avoidance of edge-critical content.
- No unnecessary high-resolution assets that waste bandwidth and decode resources.
- Performance on an actual target TV browser where possible.

Document which TV browser/OS was tested. Do not claim universal smart-TV support from a 1920x1080 desktop viewport test.

### 4.13 Browser and platform compatibility

Minimum browser engine matrix:

- Chromium: current stable Chrome and Edge.
- Gecko: current stable Firefox.
- WebKit: current stable Safari on macOS and iOS.
- Android Chrome on a real Android phone.
- iOS Safari on a real iPhone/iPad where available.
- Android System WebView if embedded webviews are relevant.
- TV browser / Chromium-based TV browser only if declared in the support policy.

For each browser, test:

- Initial render, navigation, anchor links, back/forward navigation, downloads and file links.
- CSS Grid/Flexbox/container queries, sticky/fixed layouts and viewport units.
- Fonts, SVG, video/audio, image formats and lazy loading.
- Focus/keyboard and touch behaviour.
- Forms, copy actions and external links.
- Animation and reduced motion.
- Console errors, network errors, mixed content, storage/cookie behaviour and privacy controls.

Set a written browser support policy. Prefer Baseline widely available features for core content. If a newly available API is used, supply a fallback. Keep a documented support floor and revisit it periodically; do not silently abandon old but meaningful visitor environments.

### 4.14 Low-end device, CPU, memory, GPU and energy use

Inspect and test:

- CPU time during first load, scroll, menu interactions, route transitions and animation.
- JavaScript heap growth during repeated navigation and interaction cycles.
- DOM node count, event listeners, detached nodes and memory retention.
- Repeated style recalculation, layout, paint and compositing work.
- GPU-intensive effects: blur, backdrop-filter, large shadows, filters, canvas, WebGL, video, particles and large layer counts.
- Image decode cost and resolution; high pixel-count images can use substantial memory even when compressed download size is small.
- Background tab behaviour; timers and animation loops should pause or reduce activity.
- Thermal and battery impact in real-device tests when possible.
- Storage usage, service worker/cache size, and browser storage cleanup behaviour if PWA features exist.

Use DevTools CPU throttling and memory profiling as diagnostics, then confirm on a physical low-end device. There is no reliable general-purpose public website scanner that reports exact battery consumption, hardware GPU use, or total device memory for every phone/TV. Mark these tests as physical-device-only.

### 4.15 Network resilience and offline behaviour

Check:

- Page behaviour on slow 4G, fast 3G or custom high-latency/high-loss profiles.
- Essential content is not hidden behind a large JavaScript request.
- Graceful errors when fonts, image CDNs, analytics, embeds or external APIs fail.
- Retry/error behaviour for interactive features.
- No infinite loading spinners.
- External links and downloadable files fail clearly.
- Cache headers and stale-asset behaviour after deployment.
- Atomic deploy behaviour: old HTML should not reference assets deleted by a new release.
- Offline support only if intentionally implemented; do not introduce a service worker just to claim PWA support.
- If a PWA/service worker exists, test installability, cache versioning, update prompts, offline fallbacks and stale content.

### 4.16 SEO, discoverability and content structure

Check:

- Crawling/indexability and HTTP status codes.
- Unique page title and meta description.
- Canonical URL and duplicate-content handling.
- Robots.txt and XML sitemap correctness.
- Sitemap includes only canonical, indexable, successful URLs.
- No accidental `noindex`, blocked CSS/JS, or redirect loop.
- Clear internal linking and descriptive anchor text.
- Page headings reflect content hierarchy.
- Open Graph and social-card metadata.
- Structured data validates and matches visible information.
- Person/profile identity information is consistent across site and external profiles where the user controls them.
- Article author, publish date and modified date are accurate.
- Images have useful alt text and descriptive filenames where practical.
- 404 page returns a real 404 status, not a soft 404.
- Pagination, feeds, downloadable resources and search snippets work.
- Search Console and Bing Webmaster reports are reviewed after release.

Do not keyword-stuff brand names or profile handles. Use the desired name/handle naturally in visible identity copy, page title where appropriate, profile links, accurate Person structured data, and consistent sameAs links. Never add hidden text or duplicate pages for the same person.

### 4.17 Security, privacy and trust

Check:

- HTTPS everywhere and correct HTTP-to-HTTPS redirect.
- TLS certificate validity and renewal.
- HSTS when safe for the current deployment and subdomain structure.
- `Content-Security-Policy` appropriate to actual resources; avoid blindly copying a restrictive policy that breaks the site.
- `X-Content-Type-Options: nosniff`.
- `Referrer-Policy` chosen intentionally.
- `Permissions-Policy` restricts unused features.
- `frame-ancestors`/clickjacking protection via CSP where appropriate.
- Correct CORS configuration; no wildcard for sensitive/private resources.
- No secrets or private tokens in source, client JS, Netlify public env, build output, logs or repository history.
- Dependency updates and vulnerability scans.
- External links use safe `rel` values where required.
- User input is escaped/sanitised; do not trust Markdown/MDX or HTML from an untrusted source.
- Contact forms resist spam and validate safely if present.
- Privacy notice and data handling match actual analytics/cookies/scripts.
- Consent controls are not deceptive and do not block essential content.
- Only retain data required for stated purpose; set retention and access restrictions.
- Third-party tools and embedded content are documented.

Legal/privacy obligations depend on the audience, data processed, and applicable jurisdictions. The agent should identify issues and recommend legal review where needed; it must not claim legal compliance based solely on a technical scan.

### 4.18 Reliability, maintainability and code quality

Check:

- Reproducible clean install and build from lockfile.
- Pinned or intentionally managed Node/package versions.
- No dependency on uncommitted local state.
- Lint, format, type-check and unit tests.
- Component tests and integration tests for critical interactions.
- Browser tests across supported engines.
- No console errors, failed requests or uncaught exceptions.
- Broken internal/external links and incorrect status codes.
- Route list matches actual page inventory.
- Content frontmatter/schema validation.
- Design tokens and components used consistently.
- No unused components, duplicated CSS, abandoned libraries, dead routes or dead assets.
- Build output contains no source maps/secrets unintentionally.
- Deployment preview, rollback and cache behaviour are understood.
- Documentation explains how to add an article/project and how to run the quality checks.

---

## 5. Motion and design quality acceptance tests

The visual system must be tested in every state—not only in the default state.

For each component, verify:

- Default.
- Hover (mouse/trackpad only).
- Focus-visible (keyboard).
- Pressed/active.
- Selected/current.
- Disabled.
- Loading.
- Error/invalid.
- Success/complete.
- Reduced-motion mode.
- High contrast/forced-colors where supported.
- Light and dark themes if both are offered.
- Touch interaction.

Visual review must also cover typography scale, body line length, heading wrapping, description contrast, link appearance, code blocks, borders, separators, dotted lines, card containers, shadows, icon optical alignment, spacing, grid alignment, focus rings, and sticky/fixed elements.

The site should not use animation to conceal content or force users to wait for a transition. Every essential navigation action should work immediately or expose a clear pending state.

### 5.1 Animation test scenarios

- Initial page entry with animation enabled.
- Initial page entry with reduced motion.
- Scroll while transitions are running.
- Rapid repeated activation of a menu/button.
- Route navigation during animation.
- Tab hidden and restored.
- Low CPU throttling.
- Slow network loading of animated assets.
- Touch and keyboard use.
- Safari/WebKit and Firefox rendering.
- Long page with many cards/animated elements.

Record frame drops/jank, main-thread work, CPU time, layout/paint events, memory growth, and whether the animation blocks interaction.

---

## 6. Test environments and device coverage

### 6.1 Emulated matrix

Use Playwright projects for Chromium, Firefox and WebKit. Add representative viewport/device profiles for:

- Small Android phone.
- Standard Android phone.
- Large Android phone.
- iPhone-sized viewport.
- Tablet portrait.
- Tablet landscape.
- Folded/narrow device viewport.
- Unfolded/wide device viewport.
- Laptop.
- Desktop.
- Large/ultrawide desktop.
- TV 1080p and 4K viewport.

Run a custom width sweep in addition to device presets. Test at 320, 360, 390, 430, 600, 768, 820, 1024, 1280, 1440, 1920, 2560 and 3840 CSS/device-pixel cases as appropriate. Distinguish CSS viewport size from physical pixel resolution and DPR.

### 6.2 Real-device smoke matrix

Keep a practical, low-cost physical matrix. At minimum, aim for:

- One lower-end Android phone with limited RAM/older CPU.
- One current Android phone.
- One iPhone with Safari.
- One tablet or foldable if available.
- One TV/browser device if TV support is claimed.
- One older desktop/laptop with limited CPU/RAM.

If a device is unavailable, record it as not tested. Do not say “all devices supported.” Ask a tester to verify the exact model, OS version, browser version, orientation and network.

### 6.3 Manual test scenarios

- Open site from a cold browser session.
- Open the same route from a shared/direct URL.
- Navigate with mouse, keyboard, touch and TV remote where relevant.
- Rotate device.
- Fold/unfold device where available.
- Zoom text to 200%; test reflow at 400% / 320 CSS pixels where relevant.
- Turn on reduced motion.
- Turn on dark mode if supported.
- Disable JavaScript and reload.
- Throttle CPU and network.
- Block third-party resources.
- Open/close navigation repeatedly.
- Navigate forward/back.
- Open external links and download files.
- Test long pages and anchors.
- Reload a page during or after deployment.

---

## 7. Continuous verification strategy

The audit must run at the right frequency. Running every expensive external scanner on every keystroke/commit wastes time, creates rate-limit problems, and makes the pipeline slow. Use several layers.

### 7.1 Local checks before every commit

Required fast checks:

1. Format/lint.
2. Type-check.
3. Unit tests for changed code.
4. Content/frontmatter/schema checks for changed content.
5. Production build.
6. Internal route/link/path manifest checks.
7. Accessibility unit/component checks for changed interactive components.
8. Confirm no unintended large bundle/resource increase.
9. Review the diff for secrets, generated files, and unrelated changes.

Local hooks should stay fast. Do not require public internet scans in a pre-commit hook.

### 7.2 CI on every push / pull request

Required gates:

- Clean install using committed lockfile.
- Lint and formatting check.
- Type-check.
- Unit and component tests.
- Build success.
- Route/URL regression test.
- Internal link validation.
- HTML validation on generated representative pages.
- axe-core/Pa11y automated accessibility scan of critical templates.
- Playwright smoke tests in Chromium.
- JavaScript/CSS/image/font budget checks.
- Console errors and failed local requests must be zero unless explicitly allowlisted.
- Save machine-readable JSON and human-readable HTML/Markdown reports as CI artifacts.

### 7.3 Expanded pull request checks

Run when a UI, layout, global CSS, design token, navigation, article template or interaction component changes:

- Playwright Chromium, Firefox and WebKit.
- Mobile and desktop viewport tests.
- Visual regression screenshots for important templates.
- Keyboard navigation and focus assertions.
- Reduced-motion tests.
- Light/dark theme tests if applicable.
- Responsive overflow checks.
- Accessibility scans on multiple page templates, not just homepage.
- Compare bundle sizes with baseline.

Visual diffs should be reviewed, not auto-accepted. The agent must not update all snapshots merely to make a failing pipeline green.

### 7.4 Scheduled nightly/weekly audits

Nightly or weekly, depending on repository traffic and CI budget:

- Full route crawl.
- External link checks (retry transient errors; separate broken links from blocked/timeout links).
- Full browser matrix.
- PageSpeed Insights for selected representative URLs.
- WebPageTest for key pages where free capacity is available.
- Search sitemap/robots/canonical checks.
- Security header scan and OWASP ZAP passive/baseline scan.
- Dependency vulnerability check.
- Compare performance and bundle-size trends.
- Archive timestamped reports.

Do not run high-volume scans against unrelated third-party domains. Rate-limit and obey each service's terms.

### 7.5 Release candidate / pre-production gate

Before release:

- Run all CI gates.
- Build and deploy preview.
- Crawl all known published URLs and the generated sitemap.
- Validate all old routes, aliases and downloads.
- Run full Playwright browser matrix.
- Run visual comparisons at the viewport matrix.
- Run automated accessibility checks and complete manual keyboard/screen-reader checklist for key flows.
- Run PageSpeed Insights mobile and desktop for representative page templates.
- Run WebPageTest for home, article, project and long-content route where free capacity allows.
- Run TLS/security-header checks against the preview/prod domain as appropriate.
- Verify structured data, Open Graph, canonical, robots, feeds and sitemap.
- Confirm no unexpected `noindex`, broken redirects, 404s, console errors or missing assets.
- Confirm any metric change is explained and within budget.

### 7.6 Post-release smoke check

Immediately after approved production deployment:

- Verify HTTP status and HTTPS redirects.
- Verify homepage and major page templates.
- Verify sitemap, robots, feeds, résumé/downloads and assets.
- Verify canonical tags and headers.
- Check console/network in browser smoke test.
- Run quick PSI smoke test on homepage and a representative inner page.
- Confirm deployment commit and rollback target.
- Monitor Search Console/Bing reports and real-user analytics over time; delayed indexing/field data is not an immediate release failure.

### 7.7 Performance regression policy

- Do not compare a single noisy Lighthouse score. Run a repeatable number of runs and compare medians or stable statistics under the same profile.
- Any significant regression in LCP, INP/TBT, CLS, transferred bytes, JS bundle, CPU work, DOM size or memory must be investigated.
- A proposed starting alert is a 10% regression in stable lab measurements or any resource budget breach. Adjust after establishing the baseline.
- Block release for broken content, accessibility blockers, serious security findings, critical route failures, or large unexplained performance regressions.
- Document accepted exceptions with owner and expiration/review date.

---

## 8. Reporting and dashboard requirements

Create a report structure inside the repository. Suggested paths (adapt to current conventions):

```text
reports/
  quality/
    README.md
    baseline/
    latest/
    history/
    templates/
  screenshots/
    current/
    previous/
  audit-status/
    QUALITY_AUDIT_STATUS.md
```

Avoid committing huge binary traces or every screenshot if repository size becomes a problem. CI artifacts can retain large evidence files. Commit concise summaries, metadata and trend data where practical.

### 8.1 Every audit report must include

- Site URL and deployment environment.
- Git commit hash and branch.
- Framework/build version and lockfile hash.
- Audit timestamp and timezone.
- Tool names and exact versions.
- Browser engine/version and device/viewport profile.
- CPU/network throttling values.
- Cache state (cold/warm).
- Route list and number of routes tested.
- Summary by category.
- Critical/high/medium/low issue counts.
- Core Web Vitals lab and field results clearly separated.
- Resource sizes and largest resources.
- Accessibility results and manual test status.
- Browser compatibility matrix.
- Security/TLS results.
- Screenshots, traces, HAR or report links.
- Comparison with previous baseline.
- Unresolved risks and accepted exceptions.
- Exact next actions and owners.

### 8.2 Standard finding record

```yaml
id: PERF-001
category: performance
severity: high
status: confirmed
route: /
component: HeroSection
standard_or_metric: LCP
observed: "LCP element is an oversized image"
expected: "Responsive image with appropriate source and dimensions"
evidence:
  - "reports/quality/latest/lighthouse-mobile.html"
  - "reports/screenshots/current/home-mobile.png"
test_environment:
  browser: "Chrome stable"
  viewport: "390x844 CSS px"
  network: "configured mobile profile"
  cpu_throttle: "document actual setting"
recommended_fix: "Serve responsive AVIF/WebP and avoid lazy-loading the LCP image"
verification: "Repeat PSI/Lighthouse and confirm field trend when sufficient data exists"
```

### 8.3 Dashboard charts

Where possible, show trends for:

- Lighthouse performance/accessibility/SEO/best-practices (lab, not field).
- LCP, INP, CLS and TTFB (field where available; lab diagnostics separately).
- JavaScript/CSS/font/image transfer size.
- Total transferred bytes and request count.
- Number of console errors and failed requests.
- Automated accessibility violations by severity.
- Broken internal and external links.
- Routes tested and routes failing.
- Browser/device test pass rate.
- Security findings by severity.
- Build duration and artifact size.

A custom dashboard is optional. Markdown/JSON/HTML reports are mandatory. Do not add a paid dashboard dependency just to display basic graphs.

---

## 9. Phased implementation plan

Every task is intentionally small. Agents should stop after the requested task if the budget/quota is low. Each phase has a handoff checkpoint and commit requirement.

### Phase 0 — Repository orientation and baseline preservation

**Goal:** Understand the current architecture and protect the existing website.

Tasks:

0.1 Inspect repository structure, package manager, scripts, Astro version, Netlify configuration and CI. Record actual versions.  
0.2 Inspect current audit scripts and tests. Reuse working scripts; list missing coverage.  
0.3 Build a list of all routes from source content, generated output, sitemap and production crawl.  
0.4 Record canonical paths, aliases, feeds, PDFs, images, downloads and machine-readable endpoints.  
0.5 Capture current production build and important screenshots.  
0.6 Record baseline build size, route count, asset sizes and current audit output.  
0.7 Create `QUALITY_AUDIT_STATUS.md` and a baseline report index.

Verification:

- Clean install and production build pass.
- URL manifest contains every known published route and asset class.
- No production changes made.
- Baseline screenshots and metadata are archived.

Commit examples:

- `docs(quality): record current architecture and audit baseline`
- `test(routes): add legacy route and asset manifest`

### Phase 1 — Standards, policy and test strategy

**Goal:** Define what “supported”, “accessible” and “fast” mean for this website.

Tasks:

1.1 Write a browser support policy with current major engines and a documented older-browser floor.  
1.2 Adopt WCAG 2.2 AA as target and create manual test checklist.  
1.3 Define supported screen categories, orientation and viewport sweep.  
1.4 Define reduced-motion, input modality, dark/light and high-contrast behaviour.  
1.5 Define initial resource budgets from measured baseline.  
1.6 Define critical/major/minor severity and release-blocking criteria.  
1.7 Record limitations of emulators and free online scanners.

Verification:

- Policies are explicit and versioned.
- No unsupported claim such as “works on all devices”.
- Budgets have a measured baseline or are marked provisional.

Commit:

- `docs(quality): define browser accessibility and performance policies`

### Phase 2 — Fast quality gates on every commit

**Goal:** Catch simple regressions early without slowing development.

Tasks:

2.1 Add or standardise lint and formatting check.  
2.2 Add type-check/build checks where applicable.  
2.3 Ensure unit tests run from a clean checkout.  
2.4 Add content/frontmatter/schema validation.  
2.5 Add internal route and legacy-path regression tests.  
2.6 Add local asset existence and internal-link tests.  
2.7 Add a lightweight bundle/resource budget report.  
2.8 Add a documented `npm run quality:quick` (or repository-convention equivalent) command.

Verification:

- Run command on a clean working tree and on an intentionally failing test fixture.
- Confirm it fails for a missing route/asset and passes after correction.
- Keep runtime acceptable for routine commits.

Commit each task separately:

- `test(quality): add content validation`
- `test(routes): protect published paths`
- `chore(quality): add quick quality command`

### Phase 3 — Lighthouse and performance automation

**Goal:** Measure page load and runtime quality consistently.

Tasks:

3.1 Choose representative routes: home, about, portfolio, project, article index, long article, policy, 404.  
3.2 Add Lighthouse CLI or Lighthouse CI with stable configuration.  
3.3 Save JSON and HTML output as CI artifacts.  
3.4 Add mobile and desktop profiles.  
3.5 Add resource budgets for JS/CSS/fonts/images.  
3.6 Add repeat-run and median comparison for performance-sensitive checks.  
3.7 Document how to run PageSpeed Insights and WebPageTest manually.  
3.8 Create a baseline chart/report.

Verification:

- Repeated runs are reproducible enough for trend detection.
- Missing field data is marked unavailable, not zero.
- Lighthouse failure links to the saved diagnostic report.
- A deliberately oversized fixture triggers the appropriate budget warning/failure.

Commit:

- `test(performance): add lighthouse ci and resource budgets`

### Phase 4 — Accessibility automation and manual testing

**Goal:** Detect accessibility regressions and establish real keyboard/screen-reader verification.

Tasks:

4.1 Add axe-core or Pa11y CI.  
4.2 Scan each page template and important interaction state.  
4.3 Add keyboard navigation tests for menus, dialogs, links and buttons.  
4.4 Add visible focus and focus-order assertions.  
4.5 Add reduced-motion browser test.  
4.6 Add contrast test for core design tokens and state pairs.  
4.7 Create manual NVDA and VoiceOver checklist.  
4.8 Test zoom/reflow and touch target size manually.  
4.9 Record issues and remediation priority.

Verification:

- Automated scans run on representative routes.
- No new serious automated violations are introduced.
- Manual checklist includes actual results, not just ticked by assumption.
- Do not claim full WCAG conformance from axe/WAVE/Pa11y alone.

Commit:

- `test(a11y): add automated accessibility and keyboard checks`
- `docs(a11y): add manual assistive technology test matrix`

### Phase 5 — Cross-browser and device responsiveness

**Goal:** Catch layout and browser-engine differences.

Tasks:

5.1 Configure Playwright Chromium, Firefox and WebKit projects.  
5.2 Add phone, tablet, desktop and landscape viewport profiles.  
5.3 Add viewport width sweep tests and horizontal-overflow detection.  
5.4 Add navigation, article, project-card, image and footer visual tests.  
5.5 Add screenshots for narrow phone, common phone, tablet, laptop, wide desktop and TV-sized viewport.  
5.6 Add Responsively App to the manual developer workflow.  
5.7 Define physical-device smoke process and record devices available.  
5.8 Add foldable and remote-control test notes if those categories are claimed.

Verification:

- Playwright tests run on all three engines in CI at least for critical routes.
- No horizontal overflow at supported widths.
- Visual baselines are reviewed by a human.
- Emulation is not described as physical-device proof.

Commit:

- `test(responsive): add cross-browser viewport matrix`

### Phase 6 — HTML, CSS, JS and asset quality

**Goal:** Improve page structure and reduce unnecessary payload.

Tasks:

6.1 Validate rendered HTML with Nu HTML Checker.  
6.2 Validate CSS and investigate warnings.  
6.3 Review HTML semantics, heading structure, landmarks and control semantics.  
6.4 Generate route-level JS/CSS bundle reports.  
6.5 Remove unused/duplicate dependencies only after verifying usage.  
6.6 Check tree-shaking, dynamic imports and route-level delivery.  
6.7 Audit image dimensions, compression, responsive sources and lazy loading.  
6.8 Audit font weights, subsets, formats and loading strategy.  
6.9 Audit third-party scripts and embeds.  
6.10 Confirm no secrets or build-only artifacts are shipped.

Verification:

- Validation reports stored.
- Bundle comparison shows measured before/after values.
- No broken visual states or missing icons/fonts after optimisation.
- JavaScript-disabled core content remains usable.

Commit each focused improvement separately.

### Phase 7 — Animation and rendering performance

**Goal:** Keep motion polished and efficient.

Tasks:

7.1 Inventory all animated effects and classify purpose/priority.  
7.2 Record which CSS properties each effect animates.  
7.3 Replace layout-triggering effects with transform/opacity where appropriate.  
7.4 Remove unnecessary continuous loops, particles and large filters.  
7.5 Add reduced-motion behaviour and test it.  
7.6 Pause nonessential animation offscreen/backgrounded.  
7.7 Profile CPU, dropped frames, layout/paint and memory on a constrained profile.  
7.8 Verify hover/focus/active/selected states without motion.

Verification:

- No essential action requires animation to finish.
- Reduced-motion mode removes nonessential movement.
- No sustained main-thread work is caused by idle decorative animation.
- Before/after performance traces are attached for significant changes.

Commit:

- `perf(animation): reduce layout work and respect reduced motion`

### Phase 8 — Low-end device and resource-use validation

**Goal:** Ensure the site does not assume premium hardware.

Tasks:

8.1 Create a documented lower-end CPU/network profile in DevTools/Playwright.  
8.2 Measure CPU and heap during page load and common interactions.  
8.3 Run repeat-navigation memory-leak test.  
8.4 Inspect large images, videos, fonts and decoded pixel memory.  
8.5 Test scrolling and animation on a physical lower-end phone.  
8.6 Test battery/thermal behaviour manually for a representative session where hardware permits.  
8.7 Document physical devices and untested categories.

Verification:

- Memory does not continuously grow during repeated route/interaction cycles without explanation.
- No unnecessary background activity remains after interactions.
- Site remains readable and usable under CPU/network throttling.
- Battery/GPU conclusions are only made from a real measurement or are marked unmeasured.

Commit:

- `test(device): add low-end runtime and memory test procedure`

### Phase 9 — Network, caching and resilience

**Goal:** Make initial and repeat visits reliable.

Tasks:

9.1 Inspect server response headers, cache policy and compression.  
9.2 Confirm static assets use immutable caching only when fingerprinted/versioned.  
9.3 Check HTML cache and deploy consistency.  
9.4 Test slow network, blocked third-party resources and failed image/font delivery.  
9.5 Verify lazy-loading and priority hints.  
9.6 Check back/forward cache and navigation behaviour.  
9.7 If a service worker exists, test update/offline/cache invalidation; otherwise do not add one without a requirement.

Verification:

- New deployment does not leave HTML pointing at missing old assets.
- Essential content remains available if optional resources fail.
- No endless loading indicators or blank states.

Commit:

- `test(network): add cache and degraded-network verification`

### Phase 10 — Security and privacy checks

**Goal:** Reduce avoidable attack surface and protect visitor trust.

Tasks:

10.1 Run HTTPS/TLS and security-header checks.  
10.2 Review CSP and other response headers against actual scripts, assets and embeds.  
10.3 Run OWASP ZAP passive/baseline scan on authorised target.  
10.4 Check dependency advisories and lockfile.  
10.5 Scan repository/build output for secrets.  
10.6 Review external links, embedded content, forms and user input.  
10.7 Review analytics/cookies/consent/privacy documentation.  
10.8 Document accepted security findings and host-controlled settings.

Verification:

- No exposed secrets.
- No critical/high confirmed security issue remains without explicit mitigation/acceptance.
- CSP does not break production functionality.
- Privacy statements match actual third-party services and collected data.

Commit:

- `test(security): add baseline security checks`

### Phase 11 — SEO, feeds and discovery regression

**Goal:** Preserve search engine access and ensure technically correct page metadata.

Tasks:

11.1 Crawl all routes and inspect status codes.  
11.2 Verify title, description, canonical, robots directives and social metadata.  
11.3 Verify sitemap and robots.txt.  
11.4 Validate JSON-LD and visible content consistency.  
11.5 Validate RSS/Atom/JSON/Markdown outputs if present.  
11.6 Verify 404 status and redirects.  
11.7 Check Google Search Console and Bing Webmaster Tools after production release.  
11.8 Review AI/search crawler policies without allowing unwanted training crawlers by accident.  
11.9 Check identity/entity signals and profile links remain accurate.

Verification:

- No new unexpected 404/5xx or redirect loops.
- All canonical pages are indexable as intended.
- Sitemap entries return successful canonical pages.
- Structured data is accurate, not keyword-stuffed or fabricated.

Commit:

- `test(seo): add metadata sitemap and structured-data regression checks`

### Phase 12 — Reporting, dashboards and scheduled audits

**Goal:** Make quality visible and repeatable.

Tasks:

12.1 Create report index and machine-readable JSON format.  
12.2 Save latest CI reports as artifacts.  
12.3 Add trend tracking for performance/resource budgets.  
12.4 Add accessibility issue counts and route/browser pass matrix.  
12.5 Add scheduled link, security, SEO and performance scans.  
12.6 Add instructions for manual online scans.  
12.7 Make dashboard optional and free-first.

Verification:

- Every report can be traced to commit, environment, tool version and test profile.
- Scheduled scans are rate-limited and do not create noisy false failures.
- Reports clearly separate field data, lab data and manual results.

Commit:

- `feat(quality): publish audit reports and scheduled checks`

### Phase 13 — Release gates and rollback readiness

**Goal:** Ensure release does not introduce regressions.

Tasks:

13.1 Create release checklist and environment matrix.  
13.2 Verify full URL manifest and route compatibility.  
13.3 Run full browser, accessibility, SEO and performance checks.  
13.4 Verify production headers, feeds, sitemap, downloads and assets.  
13.5 Run post-deploy smoke tests.  
13.6 Record deployment commit and rollback procedure.  
13.7 Update status/handoff and close accepted exceptions.

Verification:

- Release gate has explicit pass/fail evidence.
- Production deployment can be rolled back using the documented Netlify/Git process.
- No release is marked complete while critical route, accessibility or security blockers remain.

Commit:

- `docs(release): add quality release and rollback checklist`

---

## 10. Recommended script interface

Adapt names to the existing repository. Do not blindly overwrite existing scripts. The objective is a consistent entry point such as:

```json
{
  "scripts": {
    "quality:quick": "run lint, typecheck, unit tests, content checks, route checks and build",
    "quality:a11y": "run axe-core or Pa11y checks",
    "quality:html": "validate generated HTML",
    "quality:links": "check internal links and the URL manifest",
    "quality:visual": "run Playwright visual checks",
    "quality:browser": "run Playwright Chromium, Firefox and WebKit projects",
    "quality:lighthouse": "run Lighthouse CI on representative routes",
    "quality:security": "run dependency and configured passive security checks",
    "quality:report": "aggregate machine-readable results into a summary",
    "quality:release": "run all release-candidate checks"
  }
}
```

This JSON is illustrative only. The agent must use the actual package manager, script conventions, tool versions and existing commands in the repository. Avoid scripts that silently ignore failures or convert every error into a warning.

### 10.1 Suggested GitHub Actions stages

```text
pull_request / push
  ├─ install from lockfile
  ├─ lint + format check
  ├─ type check
  ├─ unit/component tests
  ├─ content schema + route/URL manifest checks
  ├─ production build
  ├─ resource budget report
  ├─ HTML and link checks
  ├─ axe/Pa11y checks
  ├─ Playwright Chromium smoke
  └─ upload JSON/HTML reports and screenshots

UI-sensitive pull request
  ├─ Playwright Chromium + Firefox + WebKit
  ├─ mobile/desktop viewport matrix
  ├─ visual regression
  ├─ reduced-motion and keyboard tests
  └─ compare bundle/resource budgets

scheduled nightly/weekly
  ├─ full URL crawl
  ├─ external link audit
  ├─ full browser matrix
  ├─ PSI/WebPageTest selected URLs
  ├─ dependency and passive security scans
  └─ archive report history

release candidate
  ├─ all pull-request checks
  ├─ all route and old-path checks
  ├─ full visual/accessibility/browser matrix
  ├─ production-like performance scans
  ├─ security/TLS/header checks
  ├─ SEO/feed/structured-data checks
  └─ approval and deployment

post deploy
  ├─ smoke check routes/assets/feeds
  ├─ verify headers and canonical
  ├─ quick production performance run
  └─ record release commit and rollback target
```

### 10.2 CI implementation rules

- Pin actions to trusted versions/SHAs according to repository policy.
- Use least-privilege workflow permissions.
- Never expose secrets to untrusted fork pull requests.
- Cache dependencies safely; do not cache generated output in a way that hides build failures.
- Upload artifacts even when tests fail where safe, so failure evidence is retained.
- Keep public scans out of every per-commit hook; run them on schedule/release.
- Use retries for flaky external services, but do not retry deterministic test failures indefinitely.
- Make flaky tests visible and owned. Do not quarantine permanently without a tracked issue.
- Keep concurrency controls so an older deployment cannot overwrite a newer one.

---

## 11. Test page and component inventory

At minimum include these page families in every full audit:

1. Homepage.
2. About/profile page.
3. Portfolio/work index.
4. Project detail page (at least one representative per template).
5. Articles/posts index.
6. Long-form article with code, images and headings.
7. Category/tag/archive page if present.
8. Contact page and any form.
9. Privacy policy and terms pages.
10. 404 page.
11. Sitemap and robots.txt.
12. RSS/Atom/JSON feed and Markdown output if exposed.
13. Résumé PDF and other downloads.
14. Any search, filter, theme switcher, menu, animation demo or interactive component.

The agent must discover actual current routes and update this list; it must not assume every example exists.

---

## 12. Visual regression and screenshot policy

Create a stable screenshot suite for:

- Home: narrow mobile, common mobile, tablet, laptop, desktop, ultrawide.
- About: mobile and desktop.
- Portfolio/project grid: mobile, tablet, desktop.
- Project detail: mobile and desktop.
- Long article: mobile and desktop.
- Header/navigation: default, open, focused, selected/current, scrolled/sticky.
- Footer and social links.
- Light/dark themes if available.
- Reduced-motion state.
- Keyboard focus and validation/error states.

Rules:

- Use deterministic fonts/assets and wait for stable rendering before capture.
- Disable or stabilise nondeterministic timestamps/remote content in screenshot tests.
- Set a reasonable pixel-diff threshold but review every meaningful change.
- Keep before/after screenshots for design-system-wide modifications.
- Do not update snapshots automatically as part of the same command that detects a failure.
- Screenshot comparisons do not replace live browser interaction tests.

---

## 13. Release acceptance criteria

A release is acceptable only when:

### Functional
- All major routes load with correct status.
- All internal links, downloads and anchors work.
- No critical JavaScript errors or failed first-party requests.
- Core content works without unnecessary JavaScript.

### Performance
- Core Web Vitals meet good field thresholds where sufficient real-user data exists, or a tracked improvement plan is documented when data does not exist.
- Representative mobile/desktop lab results meet project budgets.
- Resource budgets are not exceeded without accepted exception.
- No obvious main-thread blocking, memory leak or severe animation jank remains.

### Accessibility
- No known critical accessibility blocker remains.
- Automated tests pass or documented exceptions are reviewed.
- Keyboard and focus tests pass.
- Reduced motion works.
- Manual screen-reader review has been recorded for critical templates.

### Compatibility and responsive layout
- Chromium, Firefox and WebKit critical test suites pass.
- No unexpected overflow at supported viewport widths.
- Portrait/landscape and narrow/wide layouts work.
- Physical-device tests are recorded for available representative devices.
- TV/foldable support is only claimed when actual relevant tests have been performed.

### SEO and discovery
- Canonical and robots directives are correct.
- Sitemap and feeds are valid and accessible.
- Structured data is valid and reflects visible content.
- Existing URLs and aliases remain available.
- Search console changes are monitored after release.

### Security and operations
- HTTPS and redirects work.
- No exposed secret or unresolved critical/high security finding.
- Privacy disclosure matches actual tracking and embeds.
- Deployment commit, preview and rollback are documented.

---

## 14. Agent handoff and resume protocol

At the end of every task, update `QUALITY_AUDIT_STATUS.md` (or the existing equivalent) with:

```markdown
# Quality Audit Status

## Current repository state
- Framework/version:
- Node/package manager:
- Build command/output:
- Deployment provider/environment:
- Current branch/commit:

## Completed
- [x] Phase N / Task N.N — summary — commit SHA

## In progress
- Phase N / Task N.N
- Files changed:
- Current blocker:

## Tests run
- Command:
- Environment:
- Result:
- Report paths:

## Findings still open
- ID / severity / route / next action

## Decisions and accepted exceptions
- Decision:
- Reason:
- Owner/review date:

## Next exact task
- Task ID:
- Expected files:
- Acceptance criteria:
- Required tests:
- Suggested commit message:
```

Next agent instructions:

1. Read this document and `QUALITY_AUDIT_STATUS.md` completely.
2. Inspect current `git status`, latest commit, branch and CI result.
3. Re-run only the relevant failed/current task checks first.
4. Do not repeat completed tasks unless their dependencies changed or their evidence is stale.
5. Continue with the next exact incomplete task.
6. Keep the change small, test it, commit it, and update the handoff again.

If the agent runs out of quota, it must leave the repository in a coherent state, with no half-applied migration or uncommitted unrelated changes. Record uncommitted work explicitly if a commit cannot safely be made.

---

## 15. First execution instruction

Begin with **Phase 0, Task 0.1 only**.

Do not redesign the website during the initial audit. Do not update dependencies in the same task. Do not deploy to production. Inspect the repository, identify existing quality scripts and document the current architecture and test command inventory. Commit the architecture/audit baseline before proceeding to the next task.

The next task should be selected from the status file, not guessed.

---

## 16. Official reference links

### Standards and guidance

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI Accessibility Standards: https://www.w3.org/WAI/standards-guidelines/
- WAI ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/
- WHATWG HTML: https://html.spec.whatwg.org/
- W3C CSS: https://www.w3.org/Style/CSS/
- ECMAScript: https://tc39.es/ecma262/
- MDN Baseline: https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility
- Core Web Vitals: https://web.dev/articles/vitals
- Google Core Web Vitals for Search: https://developers.google.com/search/docs/appearance/core-web-vitals
- Web performance: https://web.dev/learn/performance/
- Animation guide: https://web.dev/articles/animations-guide
- Reduced motion: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/

### Free online and developer tools

- PageSpeed Insights: https://pagespeed.web.dev/
- Lighthouse: https://developer.chrome.com/docs/lighthouse/
- Lighthouse CI: https://github.com/GoogleChrome/lighthouse-ci
- WebPageTest: https://www.webpagetest.org/
- Chrome DevTools Performance: https://developer.chrome.com/docs/devtools/performance/
- Chrome DevTools Memory: https://developer.chrome.com/docs/devtools/memory/
- Chrome Performance Monitor: https://developer.chrome.com/docs/devtools/performance-monitor/
- WAVE: https://wave.webaim.org/
- axe-core: https://github.com/dequelabs/axe-core
- Accessibility Insights: https://accessibilityinsights.io/
- Pa11y: https://pa11y.org/
- Nu HTML Checker: https://validator.w3.org/nu/
- CSS Validator: https://jigsaw.w3.org/css-validator/
- W3C Link Checker: https://validator.w3.org/checklink
- W3C Internationalisation Checker: https://validator.w3.org/i18n-checker/
- Feed Validator: https://validator.w3.org/feed/
- Schema Markup Validator: https://validator.schema.org/
- Google Rich Results Test: https://search.google.com/test/rich-results
- Playwright: https://playwright.dev/
- Responsively App: https://responsively.app/
- MDN Baseline: https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility
- Can I Use: https://caniuse.com/
- OWASP ZAP: https://www.zaproxy.org/
- MDN HTTP Observatory: https://developer.mozilla.org/en-US/observatory
- SSL Labs: https://www.ssllabs.com/ssltest/
- Security Headers: https://securityheaders.com/
- Google Search Console: https://search.google.com/search-console
- Bing Webmaster Tools: https://www.bing.com/webmasters
- Ahrefs Webmaster Tools: https://ahrefs.com/webmaster-tools
- Screaming Frog: https://www.screamingfrog.co.uk/seo-spider/
- Google Analytics: https://analytics.google.com/
- Microsoft Clarity: https://clarity.microsoft.com/
- Cloudflare Web Analytics: https://www.cloudflare.com/web-analytics/
- Looker Studio: https://lookerstudio.google.com/

---

## 17. Final principle

The desired outcome is not a website that wins a single automated score. It is a site whose content is available quickly, whose interactions feel immediate, whose motion is restrained and smooth, whose layout adapts without breaking, whose markup is meaningful, whose controls work for assistive technologies, whose resource use is proportionate, and whose quality can be demonstrated with repeatable evidence.

Every commit should make the website safer or better—or preserve its current quality. Every release should provide proof that it still works for the people and devices the website claims to support.
