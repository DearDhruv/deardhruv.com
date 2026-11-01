# DearDhruv.com — Website Audit, Search Visibility & Continuous Improvement Plan

**Prepared:** 1 November 2026
**Website:** <https://deardhruv.com/>
**Purpose:** Give Gemini a small-phase, evidence-driven implementation plan to audit, improve, measure, and monitor the website across technical quality, SEO, accessibility, performance, security, analytics, and AI-assisted search discovery.
**Budget constraint:** Prefer genuinely free tools and existing Netlify/GitHub infrastructure. Do not add paid subscriptions unless the owner explicitly approves them.

---

## 0. Instructions for the implementing agent

You are working as a senior web performance engineer, technical SEO specialist, accessibility engineer, analytics implementer, and QA engineer. Your job is not to chase arbitrary scores. Your job is to make **deardhruv.com** discoverable, accessible, reliable, fast, secure, understandable to people and search engines, and easy to maintain.

### 0.1 Read the existing project instructions first

Before changing code, read the other project documents supplied by the owner:

1. `DEARDHRUV_WEBSITE_REDESIGN_GEMINI_EXECUTION_PLAN.md` (or its currently supplied renamed copy).
2. `DEARDHRUV_DESIGN_SYSTEM_AND_ASTRO_MIGRATION_ADDENDUM.md`.
3. `DEARDHRUV_AUTHENTIC_CONTENT_REWRITE_ADDENDUM.md`.
4. This document.

The existing documents govern the redesign, design system, framework evaluation/migration, authentic content writing, and preservation of published paths. This document adds audit, reporting, analytics, technical SEO, security, and AI-search verification requirements. If file names differ, identify the matching document by title and content; do not stop just because a filename was changed.

### 0.2 Non-negotiable rules

- **Never invent an audit score, traffic figure, ranking, Core Web Vital, broken-link count, or AI citation.** Every number in a report must come from a recorded tool run or a clearly marked manual observation.
- Record the exact URL, timestamp, tool, run configuration, device profile, region (when known), and evidence for every test.
- Separate **field data** (real users, when sufficient data exists) from **lab data** (synthetic Lighthouse/WebPageTest runs). Never compare them as if they were the same dataset.
- If a tool cannot inspect a route, say `NOT TESTED` or `UNAVAILABLE`; do not interpret the tool's parser limitation as a website failure.
- Never claim that an SEO change guarantees Google rankings, AI citations, rich results, or inclusion in ChatGPT/Gemini answers.
- Never add an analytics, heatmap, chat, or monitoring script without documenting its purpose, data collected, performance cost, retention, and consent/privacy implications.
- Do not put API keys, access tokens, DNS credentials, private analytics exports, or personal user data in the Git repository.
- Do not change published article paths, legal-policy paths, the résumé URL, feeds, machine-readable endpoints, aliases, or other existing public URLs without explicit owner approval and a verified redirect plan. Prefer no path changes at all.
- Do not remove existing pages just because they are thin. First determine their purpose, preserve their URLs, then enrich them or recommend `noindex` only with a documented rationale and owner approval.
- Do not edit legal policies or make compliance claims automatically. Flag issues for owner review and, where necessary, qualified legal advice.
- Every completed task must include tests, a concise work note, and a Git commit. Keep tasks small enough for a fresh AI session to resume.
- Do not publish to production automatically during baseline or migration work. Use Netlify deploy previews until the final acceptance gate.

### 0.3 Definition of done

The project is not done because a score is green. It is done when:

1. The site passes the agreed functional, URL, responsive, accessibility, security, SEO, and performance checks.
2. The measured results and their limitations are saved as reproducible reports.
3. All high-priority findings have been fixed or explicitly accepted by the owner.
4. Old public URLs resolve to the correct content, without loops, accidental 404s, or redirect chains.
5. Google and Bing webmaster properties are verified by the owner and sitemaps are accepted, where credentials/ownership are required.
6. Privacy-sensitive measurement tools are configured deliberately and tested.
7. Netlify production deployment has a rollback path.
8. A later Gemini session can continue from the handoff document without repeating completed work.

---

# Part A — Current website inspection report

## 1. Report scope and reliability

This is a **preliminary public-web inspection**, prepared on 1 November 2026. It uses pages and public endpoints that could be read through the available web inspection interface. It is not a complete crawl, a Lighthouse run, a PageSpeed Insights API result, a security penetration test, or a view of private Google/Bing/analytics dashboards.

### Evidence labels used below

- **CONFIRMED:** Directly visible on a page or endpoint inspected during this review.
- **OBSERVATION:** A visible pattern that should be checked against source code and a browser before changing it.
- **NEEDS AUTOMATED TEST:** Cannot be settled from text extraction alone; Gemini must run the specified tool.
- **OWNER REVIEW:** The site contains a claim, policy, or business fact that must be verified by Dhruv before editing.
- **NOT MEASURED:** No score or result was obtained in this environment.

### 1.1 Pages and assets inspected

The following public resources were inspected or discovered in the live site's HTML sitemap:

| Resource | Public path | Preliminary result |
|---|---|---|
| Homepage | `/` | CONFIRMED reachable and readable |
| About | `/about/` | CONFIRMED reachable; slashless `/about` redirects to slash form |
| Portfolio | `/portfolio/` | CONFIRMED reachable; slashless `/portfolio` redirects to slash form |
| Projects | `/projects/` | CONFIRMED reachable; slashless `/projects` redirects to slash form |
| Posts index | `/posts/` | CONFIRMED reachable; slashless `/posts` redirects to slash form |
| HTML sitemap | `/sitemap/` | CONFIRMED reachable; lists page groups and machine-readable resources |
| Article series index | `/posts/ai_playground_series/` | Listed in the HTML sitemap; full route must be included in automated crawl |
| Six article pages | Under `/posts/ai_playground_series/` | Listed in the HTML sitemap; Part 1 was inspected directly |
| Résumé PDF | `/resume.pdf` | CONFIRMED reachable; four-page PDF was readable |
| Policy root | `/other/` | CONFIRMED reachable; currently appears to be a minimal index page |
| AI Playground policy group | `/other/ai-playground/` | CONFIRMED reachable; currently appears to be a minimal index page |
| Open Store policy group | `/other/open-store-app/` | CONFIRMED reachable; currently appears to be a minimal index page |
| VelociHue policy group | `/other/veloci-hue/` | CONFIRMED reachable; currently appears to be a minimal index page |
| AI Playground privacy policy | `/other/ai-playground/privacy-policy-ai-playground-app/` | CONFIRMED reachable and contains policy text |
| AI Playground terms | `/other/ai-playground/terms-ai-playground-app/` | CONFIRMED reachable and contains terms text |
| Open Store privacy/terms | Under `/other/open-store-app/` | Listed in the HTML sitemap; include in crawl |
| VelociHue privacy/terms | Under `/other/veloci-hue/` | Listed in the HTML sitemap; include in crawl |
| JSON feed | `/index.json` | Listed in HTML sitemap and MCP descriptor; served with `application/feed+json` according to retrieval metadata |
| Root Markdown mirror | `/index.md` | Listed in HTML sitemap; endpoint returns Markdown content type, but was not parsed by the web inspection interface |
| LLM discovery file | `/llms.txt` | Listed in HTML sitemap and MCP descriptor; Markdown content was not parsed by the web inspection interface |
| Agent authentication document | `/auth.md` | Listed in HTML sitemap; Markdown content was not parsed by the web inspection interface |
| MCP descriptor | `/.well-known/mcp.json` | CONFIRMED reachable; JSON says it advertises the site feed and `llms.txt`, and currently declares an empty tools list |
| API catalog/linkset | `/.well-known/api-catalog` | Listed in HTML sitemap; served as `application/linkset+json` according to retrieval metadata, but content was not parsed |
| XML sitemap | `/sitemap.xml` | Listed in HTML sitemap; retrieval tool reported XML content type but could not parse it; HTTP status and contents still need `curl`/crawler verification |
| Robots file | `/robots.txt` | NOT VERIFIED in this inspection; direct retrieval was unavailable in the inspection interface |

The HTML sitemap itself reports four main pages, eight posts/series pages, ten legal/policy pages, and eight machine-discovery/static-asset endpoints. Gemini must independently enumerate the actual URLs from the live XML sitemap, repository, and crawler; do not assume the HTML sitemap counts are complete or current.

### 1.2 Confirmed positive observations

1. The site has a public HTML sitemap that groups main pages, posts, legal policies, and machine-readable endpoints.
2. The main content areas are crawlable as ordinary HTML text through the public page responses.
3. Several slashless main-page URLs redirect to their trailing-slash forms. This appears consistent for About, Portfolio, Projects, Posts, and Sitemap; verify status codes and canonical tags in the automated baseline.
4. The site exposes a résumé PDF, a JSON content feed, a Markdown mirror, an `llms.txt` file, an MCP descriptor, and a linkset/API catalog. These can help discovery and reuse when they are valid, current, and maintained.
5. The article series is clearly grouped and has six named parts. The article content contains substantive technical explanations rather than only short summaries.
6. The portfolio pages link to project artifacts such as Google Play, GitHub, and the engineering article series.

### 1.3 Findings requiring attention

#### Finding LIVE-001 — Navigation and site chrome differ between the homepage and inner pages

**Severity:** High / P1 for the redesign
**Evidence:** The homepage extraction shows a compact terminal-like brand string (`> $ cd /home/`) and navigation labels About, Portfolio, Posts, Projects, Sitemap. Inner pages show a more developed header with a brand link, Home, About, Portfolio, Projects, Writing, Sitemap, résumé link, résumé label, and Theme control.
**Impact:** The site can feel like two different visual systems. Users may not understand whether “Posts” and “Writing” are the same destination. Inconsistent navigation makes the design feel less intentional and can complicate keyboard/mobile/TV interactions.
**Required action:** Audit the actual DOM/CSS and choose one shared header/footer/navigation component. Use consistent labels across every template. Keep an optional terminal motif as a visual detail only; it must not replace an accessible site identity or hide primary navigation. Preserve all destinations and URLs.
**Verification:** Playwright checks that the same primary navigation items, accessible names, active states, focus states, and destinations appear on all public HTML pages and at all tested breakpoints.

#### Finding LIVE-002 — Role and positioning statements vary between site surfaces and résumé

**Severity:** Medium / P2; owner review required
**Evidence:** The current homepage title says “Dhruv Patel - Lead Android Engineer”, the hero positions the owner as “Android Architect | Kotlin Multiplatform | On-Device AI”, inner-page branding says “Lead Android & Multiplatform Engineer”, and the résumé headline says “Lead Android Engineer”. An older search-index result also displays an earlier Android-only summary.
**Impact:** Search snippets, social previews, résumé visitors, and portfolio visitors may receive slightly different descriptions of the owner's current positioning. This is not necessarily wrong, but it needs to be deliberate.
**Required action:** Ask Dhruv to approve one canonical professional title and a short one-sentence positioning statement. Use a consistent title in page metadata, site header, résumé heading, Person structured data, and social metadata where appropriate. Do not inflate seniority or change employment facts.
**Verification:** Compare page title, visible H1/subtitle, Open Graph title/description, JSON-LD, résumé title, and search preview source fields.

#### Finding LIVE-003 — The number of POS peripherals is inconsistent

**Severity:** Medium / P2; owner review required
**Evidence:** The homepage currently says 27+ POS peripherals, while About, Portfolio, and the detailed Projects case study describe 30+ peripherals/devices. The older Projects version surfaced in search also refers to 27+.
**Impact:** Numeric discrepancies reduce trust in otherwise technical case studies.
**Required action:** Ask Dhruv to confirm the defensible count and definition (distinct models, protocols, integration types, or device categories). Update all occurrences consistently, or explain why the numbers refer to different scopes.
**Verification:** Search repository content and generated HTML for `27`, `30+`, `peripheral`, and `device`; ensure the final approved wording is consistent.

#### Finding LIVE-004 — Technical performance claims need benchmark context

**Severity:** Medium / P2; owner review required
**Evidence:** Public copy includes a measured 2x speculative decoding improvement, 3,000 ms watchdog, 25+ document formats, 60–120 FPS, 40% startup improvement, 99.8% hardware connection reliability, and 60% lower hardware communication latency. Some pages describe the method, but the public text does not consistently provide a reproducible test setup beside the metric.
**Impact:** Strong metrics are useful differentiators, but unexplained numbers can look like marketing claims and are difficult for technical readers to evaluate.
**Required action:** For each retained metric, record the baseline, test device/model, software version, workload, sample size or repetitions, measurement method, date, and source evidence. If an exact figure cannot be substantiated, remove the number or rewrite it as a qualitative engineering outcome. Do not invent benchmarks.
**Verification:** Add a claim-evidence checklist to the content audit and link to repositories, release artifacts, or benchmark notes where public disclosure is appropriate.

#### Finding LIVE-005 — Policy category pages are very thin

**Severity:** Medium / P2; content/indexing decision required
**Evidence:** `/other/`, `/other/ai-playground/`, `/other/open-store-app/`, and `/other/veloci-hue/` render their headings and shared site chrome but little visible explanatory content in the inspected text. The child privacy and terms pages do contain substantive text.
**Impact:** Empty category pages provide little value to a human visitor and may be low-value indexable URLs.
**Required action:** Preserve every route. Either add a concise page description and links to the related privacy/terms documents, or recommend a carefully reviewed `noindex,follow` directive for directory pages that have no independent search value. Do not noindex the actual policy documents without owner approval.
**Verification:** Test all directory and policy URLs, canonical tags, robots meta, sitemap inclusion, and internal links.

#### Finding LIVE-006 — Privacy/terms wording requires product and legal review

**Severity:** High / P1 for trust; legal review required
**Evidence:** The AI Playground privacy page mentions automatically collected data such as IP address, pages visited, visit dates/durations, OS information, Firebase Analytics and Crashlytics, and says only aggregated/anonymized data is periodically transmitted to external services. The app is also presented elsewhere as local-first/on-device. These statements can both be true, but the exact boundary between local prompts/files/model processing and app telemetry should be explicit. The terms page includes generic user-generated-content moderation clauses and conditional DSA language; the actual product features and service role must be checked.
**Impact:** Privacy copy that is too generic, inaccurate, or inconsistent can damage user trust and may create legal exposure.
**Required action:** Create a product-by-product data inventory: data collected, processing purpose, local/cloud location, third-party SDK, retention, sharing, user controls, and contact method. Ask Dhruv and a qualified reviewer to approve policy text. Do not silently remove or add legal claims.
**Verification:** Compare policy statements with the shipped app, SDK configuration, website analytics, crash reporting, backend endpoints, consent behaviour, and store disclosures.

#### Finding LIVE-007 — Search index may still show an older homepage description

**Severity:** Low / P3 until verified in Search Console
**Evidence:** A search-index result returned for `site:deardhruv.com` contains an older Android-only homepage description, while the current live homepage has newer Kotlin Multiplatform/on-device AI positioning. The search result was marked as crawled last month, so this may simply be an older cached/indexed snapshot.
**Impact:** Search snippets may temporarily lag behind live copy.
**Required action:** After the redesign is stable, inspect the homepage and important URLs in Google Search Console and Bing Webmaster Tools. Confirm canonical URLs, inspect indexed/live versions, submit the sitemap, and request recrawl only when appropriate. Do not repeatedly submit URLs or treat a delayed snippet as a penalty.
**Verification:** Save current Search Console/Bing performance and indexing screenshots/exports; recheck after normal crawl time.

#### Finding LIVE-008 — Machine-discovery endpoints need protocol and content validation

**Severity:** Medium / P2
**Evidence:** The HTML sitemap advertises `index.json`, `index.md`, `llms.txt`, `auth.md`, `/.well-known/mcp.json`, `/.well-known/api-catalog`, `sitemap.xml`, and `resume.pdf`. The MCP JSON currently identifies itself as “Dhruv's blog”, advertises `streamable-http` transport, lists the JSON feed and `llms.txt` as resources, and has an empty tools array. The API catalog is advertised as `application/linkset+json`.
**Impact:** A machine-readable endpoint that is stale, invalid, or misleading is worse than not having one. Merely publishing `llms.txt` or MCP metadata does not guarantee AI search visibility.
**Required action:** Validate every endpoint with its declared schema and MIME type. Ensure descriptions, server name, endpoint URL, resource URIs, link relations, and content match the actual site. Keep only what can be maintained. Do not add tools or exposed capabilities that the site does not truly provide.
**Verification:** JSON parse and schema validation; HTTP status/content-type checks; link checker; spec-level validation for MCP card and RFC 9264 linkset.

#### Finding LIVE-009 — Résumé and site profile need a synchronized fact review

**Severity:** Medium / P2
**Evidence:** `/resume.pdf` is a four-page résumé and can be opened independently. Its title and summary are Android-focused, while the site now emphasizes multiplatform systems and on-device AI. It also contains an App Store status line that should be rechecked against the current release status.
**Impact:** Recruiters may see different emphasis or outdated availability details depending on the entry point.
**Required action:** Review role/title, employment dates, project launch status, public project links, speaking events, education, contact routes, and technical skills. Update the résumé without changing its URL.
**Verification:** PDF text extraction, PDF links, accessibility/readability check, file size, mobile viewing, and consistency against About/Portfolio.

#### Finding LIVE-010 — Legacy route and content inventory must be treated as a release gate

**Severity:** Critical / P0 for the framework migration
**Evidence:** The public sitemap exposes published pages, six article URLs, legal-policy routes, a PDF, JSON/Markdown feeds, and machine-discovery resources. The repository and prior project plans identify existing aliases and Netlify behaviour that may not be fully visible from the current HTML page extraction.
**Impact:** A redesign or Hugo-to-Astro migration can unintentionally break links embedded in old articles, social posts, app listings, documents, or search results.
**Required action:** Generate a machine-readable baseline URL manifest from the current repository, Hugo build output, sitemap, aliases, and a live crawl. Compare it against the Astro preview and production build. No missing URL is accepted without an owner-approved mapping.
**Verification:** Automated status/redirect comparison and a Playwright/HTTP smoke test for every discovered URL.

### 1.4 Baseline metrics — explicitly not measured yet

The following numbers must be collected by Gemini in a real browser/tool run. They are intentionally blank here; no valid lab or field score was available during this inspection.

| Metric | Homepage | About | Portfolio | Projects | Posts | Article template | Source/status |
|---|---:|---:|---:|---:|---:|---:|---|
| Lighthouse Performance — mobile | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | Run Lighthouse/PSI |
| Lighthouse Performance — desktop | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | Run Lighthouse/PSI |
| Lighthouse Accessibility | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | Run Lighthouse + manual checks |
| Lighthouse Best Practices | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | Run Lighthouse |
| Lighthouse SEO | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | Run Lighthouse + GSC/Bing |
| LCP field data (75th percentile) | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | CrUX/PSI if available |
| INP field data (75th percentile) | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | CrUX/PSI if available |
| CLS field data (75th percentile) | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | CrUX/PSI if available |
| HTTP status / redirect hops | NOT MEASURED | PARTIAL | PARTIAL | PARTIAL | PARTIAL | NOT MEASURED | Run `curl`/crawler |
| Accessibility violations | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | axe/WAVE/manual |
| Broken internal links | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | Full crawl |
| AI crawler access | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | robots/crawl tests |

**Do not replace `NOT MEASURED` with guesses.** Record `NO FIELD DATA` separately from a failed Core Web Vitals result.

---

# Part B — Free tools and what each one is good for

## 2. Core free audit stack

Use the following tools first. They cover different layers; no single website checker replaces the full stack.

| Priority | Tool | Free use / access notes | Use it for | Official URL |
|---|---|---|---|---|
| P0 | Google Search Console | Free; owner must verify the property | Google indexing, queries, clicks, impressions, sitemap, URL inspection, AI Search generative-feature report when data is available | <https://search.google.com/search-console> |
| P0 | Bing Webmaster Tools | Free; owner must verify the property | Bing indexing, crawl/site scans, sitemap, SEO reports, AI Performance citations/grounding queries for supported Microsoft/partner surfaces | <https://www.bing.com/webmasters> |
| P0 | PageSpeed Insights | Free | Mobile/desktop Lighthouse diagnostics and CrUX field data when available | <https://pagespeed.web.dev/> |
| P0 | Lighthouse / Chrome DevTools | Free and locally runnable | Repeatable lab audit for performance, accessibility, best practices, SEO | <https://developer.chrome.com/docs/lighthouse> |
| P0 | Screaming Frog SEO Spider | Free tier crawls up to 500 URLs per crawl; advanced features are licensed | URL inventory, redirects, status codes, titles, metadata, headings, duplicates, broken links | <https://www.screamingfrog.co.uk/seo-spider/> |
| P1 | Ahrefs Webmaster Tools / Ahrefs Free | Free account; verified ownership unlocks site audit and some Site Explorer capabilities. Current published allowance: 5,000 crawl credits/month per project; Web Analytics up to 1,000,000 events/project. Check the live terms before relying on quotas. | Technical SEO, backlinks, keywords, site health, web analytics | <https://ahrefs.com/free> |
| P1 | PageScore.dev | Free plan advertises online audits, 5 categories and 50+ automated checks; the free report displays only a limited set of top issues. | Quick second opinion on performance, SEO, security, accessibility, mobile basics | <https://pagescore.dev/> |
| P1 | WAVE | Free web/browser accessibility checks | Visible accessibility errors, contrast concerns, headings, labels, alt text, landmarks | <https://wave.webaim.org/> |
| P1 | Accessibility Insights for Web | Free browser extension/tool | Guided keyboard and accessibility assessment | <https://accessibilityinsights.io/> |
| P1 | Microsoft Clarity | Free; official pricing states no traffic limit. Still review privacy/consent before installation. | Heatmaps, scroll maps, recordings, rage/dead clicks and behaviour analysis | <https://clarity.microsoft.com/> |
| P1 | Cloudflare Web Analytics | Free privacy-oriented analytics; can be used without transferring DNS/proxy to Cloudflare | Page-view and visitor/performance trends with a lightweight beacon | <https://www.cloudflare.com/web-analytics/> |
| P1 | Google Analytics 4 | Standard version free; account/configuration required | Acquisition, engagement, events, referrals and conversions | <https://analytics.google.com/> |
| P2 | WebPageTest | Free access/allowances may vary; use the current free tier and document limits | Network waterfalls, filmstrips, geographic testing, repeat visits | <https://www.webpagetest.org/> |
| P2 | MDN HTTP Observatory | Free | HTTP security header configuration | <https://developer.mozilla.org/en-US/observatory> |
| P2 | Qualys SSL Labs | Free | TLS/SSL certificate and server configuration | <https://www.ssllabs.com/ssltest/> |
| P2 | Google Rich Results Test | Free | Google-supported structured data eligibility and errors | <https://search.google.com/test/rich-results> |
| P2 | Schema Markup Validator | Free | General Schema.org syntax and vocabulary validation | <https://validator.schema.org/> |
| P2 | Google Looker Studio | Free for standard reporting | Charts and dashboards combining supported data connectors | <https://lookerstudio.google.com/> |

### 2.1 Recommended minimal setup

To avoid unnecessary scripts and account sprawl, start with:

1. Google Search Console.
2. Bing Webmaster Tools.
3. Ahrefs Free / Webmaster Tools.
4. PageSpeed Insights + local Lighthouse.
5. Screaming Frog (free 500 URL crawl).
6. WAVE + axe-core/Accessibility Insights.
7. Microsoft Clarity **or** one lightweight privacy-friendly analytics option.
8. Looker Studio only if a combined dashboard is useful.

Do not install GA4, Clarity, Cloudflare Analytics, Ahrefs Web Analytics, and multiple other tracking beacons simultaneously without a clear reason. More tools do not automatically mean better analytics. Every extra script may increase network work, introduce cookies/identifiers, affect privacy disclosures, and add maintenance.

## 3. Search engine and AI-search visibility

### 3.1 Google Search Console

Set up both the Domain property (preferred when DNS verification is available) and URL-prefix property only if needed for diagnostics. The owner must complete any DNS/ownership verification.

Collect:

- Search performance by query, page, country, device, date.
- Indexing state and excluded reasons.
- Sitemap submitted/read status and discovered URLs.
- URL inspection for the homepage, About, Portfolio, Projects, Posts, six article URLs, and policies.
- Canonical selected by Google vs canonical declared by the page.
- Page experience/Core Web Vitals field data when enough data exists.
- Generative AI performance in Google Search (AI Overviews/AI Mode) and Discover reports where the property has data.

Google announced global rollout of Search Generative AI performance insights on 31 August 2026. The report can still be absent when a property does not have enough impressions or otherwise lacks report data. Do not treat a missing report as an indexing error.

### 3.2 Bing Webmaster Tools

Verify the domain, import Search Console data if useful, submit the canonical XML sitemap, and run Site Scan.

Collect:

- Search clicks, impressions, query/page trend.
- IndexNow state if used; do not add IndexNow until its key/file workflow is validated.
- Crawl and indexing diagnostics.
- Backlink information where available.
- AI Performance report: citation counts, cited pages, grounding queries, and visibility trends for supported AI experiences such as Microsoft Copilot, Bing AI-generated summaries, and selected partners.

The Bing AI Performance report measures visible citation activity, not rankings, traffic, authority, or all ChatGPT/Gemini citations. It is sampled/aggregated and cannot show every citation or exact user prompt. Use trends as evidence, not proof of causation.

### 3.3 ChatGPT, Perplexity, Claude, and other AI discovery

Maintain a deliberate crawler policy. Review current official crawler documentation before editing `robots.txt` because bot names and purposes may change.

At minimum, assess the following user agents and their purpose:

| Crawler / agent | Purpose to verify | Default implementation stance |
|---|---|---|
| Googlebot | Google Search indexing | Allow public content unless owner intentionally restricts it |
| Bingbot | Bing search indexing | Allow public content unless owner intentionally restricts it |
| OAI-SearchBot | OpenAI search discovery/citation | Decide separately from GPTBot; allow if the owner wants ChatGPT Search discovery |
| GPTBot | OpenAI model-training crawler | Separate owner decision; do not assume allowing search requires allowing training |
| PerplexityBot | Perplexity search discovery | Review official documentation and owner preference |
| Claude-SearchBot / ClaudeBot / Claude-User | Anthropic search, training, and user-triggered retrieval roles may differ; verify current official names | Do not conflate search/retrieval permission with training permission |

Rules:

- Never blindly add `Allow: *` or blanket blocks without reviewing the current policy.
- Separate search retrieval/citation crawlers from model-training crawlers where providers support distinct agents.
- Do not use cloaking: the content delivered to crawlers must accurately represent what a human visitor can access.
- Avoid requiring client-side-only JavaScript for core article text, canonical metadata, titles, structured data, or navigation.
- Do not return a challenge page, empty shell, or accidental 403 to legitimate crawlers.
- Preserve rate limiting and security protections; test from ordinary browser and crawler user-agent requests.
- Record crawler decisions and the owner's preference in `docs/seo/AI_CRAWLER_POLICY.md`.

### 3.4 `llms.txt`, Markdown mirrors, JSON feed, MCP, and AI metadata

The site currently advertises `/llms.txt`, `/index.md`, `/index.json`, `/.well-known/mcp.json`, and `/.well-known/api-catalog`.

Treat these as optional machine-consumption interfaces, not ranking tricks.

For each endpoint verify:

- HTTP status and redirect behaviour.
- Correct `Content-Type` and character encoding.
- Valid syntax/JSON schema.
- Canonical, current URLs only.
- No private draft content, unpublished data, secrets, or personal information beyond what the owner intentionally publishes.
- Article titles, summaries, publication dates, authorship, and links match the human-readable page.
- The feed contains the intended public posts and does not duplicate or omit them unexpectedly.
- `llms.txt` points to current, useful documents and does not claim a special search ranking benefit.
- MCP metadata follows the current MCP server card/spec and points to genuinely available resources/transport. An empty tools array is acceptable if there are no tools; do not pretend the site supports tools it does not expose.
- API catalog/linkset follows RFC 9264 if it is intended to use `application/linkset+json`.

If a machine endpoint cannot be validated and offers no meaningful user or integration value, recommend keeping it stable but documenting the limitation, or retiring it only with explicit approval and a path-preservation plan.

### 3.5 Search fundamentals that must still be done

- Unique, useful `<title>` and meta description for each indexable page.
- One clear visible H1 per content page, with a logical heading hierarchy.
- A self-referencing canonical URL for each intended canonical page.
- Correct robots meta and `X-Robots-Tag` behaviour.
- Crawlable internal links using real anchors and descriptive text.
- XML sitemap containing canonical, indexable, successful URLs only; accurate `lastmod` values only when content actually changes.
- Robots.txt allowing the intended public resources and linking to the XML sitemap.
- Correct Open Graph and social preview metadata.
- Descriptive image filenames/alt text; decorative imagery has empty alt text.
- Structured data only when the content supports it; never add fake ratings, reviews, job titles, credentials, or organization details.
- 404 page returns a real 404 status; redirects are not used to conceal missing content.
- No accidental `noindex` on important public pages.
- No orphan articles; every article should be linked from an appropriate index, series page, project page, or related-article area.

Suggested structured data, subject to validation and page content:

- `Person` for the public professional identity, with factual `name`, `url`, `sameAs`, and supported professional details.
- `WebSite` for the domain.
- `ProfilePage` if the page genuinely functions as a personal profile and Google's guidance applies.
- `Article` or `BlogPosting` for real articles, with author, headline, dates, and image when present.
- `BreadcrumbList` where real breadcrumbs are visible and useful.
- `SoftwareApplication` only for actual product pages with supported properties and accurate availability/operating-system/pricing claims.

Structured data helps machines interpret content but does not guarantee a rich result or AI citation.

---

# Part C — Testing standards and acceptance targets

## 4. Performance testing

### 4.1 Core Web Vitals thresholds

Use the current Google `good` thresholds at the 75th percentile of real-user visits:

| Metric | Good target | What it measures |
|---|---:|---|
| LCP | ≤ 2.5 seconds | Largest Contentful Paint / loading experience |
| INP | ≤ 200 milliseconds | Interaction to Next Paint / responsiveness |
| CLS | ≤ 0.1 | Cumulative Layout Shift / visual stability |

If field data is unavailable for a URL, report `NO FIELD DATA`. Use lab data for diagnosis, but do not label a lab Lighthouse score as a field Core Web Vitals pass.

### 4.2 Required representative pages

Run baseline and post-change tests for:

- `/` — home.
- `/about/` — profile.
- `/portfolio/` — professional overview.
- `/projects/` — detailed case studies.
- `/posts/` — article index.
- `/posts/ai_playground_series/` — series landing page.
- Each of the six articles, at least one full run per article after the redesign.
- One legal/privacy page and one terms page per app family.
- `/sitemap/`.
- `/resume.pdf` download and mobile viewing.

### 4.3 Device and network matrix

Test both portrait and landscape, and use viewport/device emulation to cover:

- Small low-end Android phone (360 × 640 CSS px baseline; also 320 px width overflow check).
- Common phone (390 × 844).
- Large phone (430 × 932).
- Foldable outer display (narrow phone-like viewport) and unfolded display (e.g. 700–900 CSS px wide).
- Tablet portrait and landscape (768 px and 1024 px widths).
- Laptop (1366 × 768).
- Desktop (1440 × 900).
- Large desktop/ultrawide (1920 × 1080 and 2560 × 1440).
- TV / 10-foot UI: 1920 × 1080 with remote/keyboard focus simulation; do not assume hover exists.
- Zoom at 200% and 400%; test text resizing without clipped or overlapping content.
- Narrow and tall aspect ratios; very wide and short aspect ratios.

Network and CPU profiles:

- Fast broadband / normal desktop.
- Typical 4G mobile.
- Slow 3G or throttled network (diagnostic profile, not a claim about all users).
- CPU throttling (4× and 6× slowdown where available).
- Warm cache and cold cache.
- Repeat runs at least three times; report median and range. Use identical conditions for before/after comparisons.

Avoid overly expensive effects on low-end hardware. Do not use continuous canvas/WebGL/3D scenes, video backgrounds, large blur/backdrop-filter layers, or scroll-linked JavaScript effects as mandatory content. Every animation must have a static fallback and `prefers-reduced-motion` support.

### 4.4 Performance budgets (initial project targets)

Treat these as engineering budgets to validate and adjust with measured results, not as guaranteed Google ranking thresholds:

- Initial route response should be static/cached via Netlify CDN where possible.
- Keep first-screen content meaningful without waiting for client JavaScript.
- Avoid shipping a large client-side framework to pages that do not need it.
- Keep JavaScript hydration limited to genuinely interactive islands.
- Prefer CSS transitions for simple UI motion.
- Use responsive images (`srcset`, `sizes`, modern formats when supported) and explicit dimensions/aspect ratios.
- Lazy-load below-the-fold non-critical images; do not lazy-load the primary LCP image.
- Preload only the actual critical font/resource; don't prefetch every page asset.
- Subset/self-host fonts only when licensing and maintenance permit; provide system fallbacks.
- Avoid layout shifts caused by web fonts, images, embeds, ads, theme toggles, or late-loaded components.
- Minify and compress assets; set sensible cache headers for hashed assets and content files.
- Remove unused CSS/JS and duplicate tracking scripts.
- Keep third-party scripts out of the critical render path where possible.

For every performance optimization, demonstrate a measurable before/after effect. Don't add complexity for a theoretical gain.

## 5. Accessibility testing

Target **WCAG 2.2 Level AA** for the public site. Use automated checks and manual keyboard/screen-reader testing.

Minimum checks:

- Text contrast at least 4.5:1 for normal text and 3:1 for large text, subject to WCAG definitions.
- UI component boundaries and meaningful graphical objects meet relevant non-text contrast requirements.
- All navigation and interactive controls can be reached and operated with keyboard.
- Focus order is logical; focus is visible and not hidden under sticky headers/overlays.
- Skip-to-content link works.
- Buttons have accessible names; icon-only buttons have labels.
- Links are distinguishable without relying only on color.
- Hover behaviour has keyboard/touch equivalents.
- Current/selected/active states are conveyed semantically and visually.
- Touch targets are comfortably sized and meet WCAG 2.2 target-size requirements or a valid exception; aim for 44×44 CSS px where practical.
- Forms have associated labels, clear errors, and announced feedback.
- Images have contextual alt text; decorative images use empty alt text.
- Headings and landmarks form a meaningful document structure.
- Motion can be reduced; no critical content relies on animation.
- No flashing content exceeding thresholds; respect reduced motion.
- Content remains usable at 200% and 400% zoom and at narrow viewport sizes.
- TV/remote focus is obvious and persists as focus moves.

Tools:

- WAVE for a visual review.
- axe-core/Playwright for automated regression.
- Accessibility Insights for guided checks.
- Keyboard-only manual pass.
- VoiceOver on iOS/macOS and TalkBack on Android if available; otherwise document unavailable test environments.

A clean automated report is not proof of full WCAG conformance. Record manual checks separately.

## 6. SEO, crawl, and content integrity tests

- Crawl all internal URLs from homepage, sitemap, feeds, and repository manifests.
- Validate status codes, redirect destinations, redirect chains, canonical, robots directives, title, description, H1, heading order, image alt, language, and viewport metadata.
- Identify duplicate or near-duplicate titles/descriptions and content.
- Identify thin/orphan pages and pages with no meaningful internal links.
- Validate outgoing URLs, GitHub, Play Store, App Store (if live), LinkedIn, résumé, and article references.
- Confirm external links do not accidentally point to staging/local URLs.
- Validate sitemap URLs are canonical, indexable, and return 200 (or an explicitly accepted redirect if the sitemap is updated to canonical destinations).
- Confirm feeds contain the right posts and current metadata.
- Confirm the visible page content agrees with JSON-LD, Open Graph, `llms.txt`, feed, and résumé.
- Use GSC/Bing for actual indexed status; a crawler alone does not establish indexation.

## 7. Security and privacy checks

- HTTPS for all public routes and assets; no mixed content.
- Valid TLS certificate and sensible redirect from HTTP to HTTPS.
- Security headers reviewed: Content-Security-Policy, Strict-Transport-Security, X-Content-Type-Options, Referrer-Policy, frame protections (`frame-ancestors`/X-Frame-Options as appropriate), and Permissions-Policy. Apply headers according to actual requirements; do not paste a restrictive CSP that breaks scripts/fonts or embeds.
- No secrets in client bundles, Git history, Netlify build output, or public endpoint payloads.
- Dependency audit and update policy; avoid unmaintained packages.
- Check Netlify headers, redirects, functions, edge functions, and environment variables.
- Avoid exposing admin/preview endpoints unintentionally.
- Review public contact information and analytics data collection with the owner.
- If Clarity/GA4 is installed, document cookies/identifiers, consent requirements for relevant users/jurisdictions, and the privacy policy changes that may be required.
- Do not claim a site is legally compliant simply because a checker reports no header issue.

---

# Part D — Required reports and repository artefacts

## 8. Report directory structure

Store generated audit artefacts in the repository in a predictable location, unless the existing repo already has a better convention:

```text
docs/
  audits/
    README.md
    2026-11-01-baseline/
      executive-summary.md
      website-inventory.csv
      url-status-and-redirects.csv
      internal-links.csv
      external-links.csv
      page-metadata.csv
      heading-audit.csv
      image-alt-audit.csv
      structured-data-report.md
      sitemap-robots-ai-crawlers.md
      accessibility-report.md
      performance-summary.md
      security-summary.md
      content-claims-review.csv
      issue-register.csv
      screenshots/
      lighthouse/
      pagespeed/
      screaminfrog/
      axe/
      raw-tool-output/
    YYYY-MM-DD-follow-up/
      ...
```

Do not commit huge binary recordings, personal visitor session recordings, or sensitive analytics exports. Store screenshots and reports with sensible size limits. Do not commit raw Clarity sessions or exports containing personal data.

## 9. Required report contents

### 9.1 `executive-summary.md`

Must contain:

- Date and commit hash audited.
- Branch/deploy preview URL or production URL.
- Audit scope and exclusions.
- Overall status: `PASS`, `PASS WITH ACCEPTED ISSUES`, or `FAIL`.
- Top 5 most important findings.
- Highest-severity open issue count.
- Performance and accessibility summary by representative page.
- SEO/indexing summary.
- Search/AI visibility summary (only data actually provided by GSC/Bing).
- URL compatibility result.
- Owner decisions required.
- Links to the detailed reports.

Do not create a single composite score by averaging unrelated tools. Show category scores independently and explain their source.

### 9.2 `website-inventory.csv`

Required columns:

`url, source, page_type, canonical_url, expected_status, actual_status, redirect_target, indexable, in_xml_sitemap, in_html_sitemap, in_internal_links, title, meta_description, h1, lastmod, owner_status, notes`

### 9.3 `url-status-and-redirects.csv`

Required columns:

`source_url, final_url, status_chain, hop_count, expected_final_url, actual_final_url, result, evidence, severity`

### 9.4 `issue-register.csv`

Required columns:

`issue_id, category, severity, affected_url, finding, evidence, user_impact, search_impact, proposed_fix, owner_decision_required, status, created_at, fixed_commit, verification_result`

Severity:

- **P0/Critical:** Data/security risk, broken key route, migration route loss, site unavailable.
- **P1/High:** Major accessibility barrier, widespread broken navigation, key indexing failure, significant privacy/trust issue, severe performance regression.
- **P2/Medium:** Important page-level SEO, usability, content, or responsive issue.
- **P3/Low:** Polish, minor metadata/content issue, low-impact recommendations.
- **Info:** No action required; keep as observation.

### 9.5 Performance evidence

For each representative page, save:

- Lighthouse HTML/JSON if available.
- PageSpeed Insights report URL and run timestamp.
- Mobile and desktop strategy.
- Lab environment, browser version, emulated device, throttling.
- Field data availability and date window.
- LCP, INP, CLS field values where available.
- TTFB, FCP, Speed Index, LCP lab values, total blocking time, CLS lab value where available.
- Top opportunities/diagnostics and evidence.
- Three-run median and range for repeated tests.

### 9.6 Accessibility evidence

Save:

- axe results by URL.
- WAVE review notes/screenshots.
- Keyboard-only checklist.
- Focus order notes.
- Reduced-motion test notes.
- Contrast failures with foreground/background values and contrast ratios.
- Screen-reader test results and environment.

### 9.7 SEO/AI evidence

Save:

- URL inventory and indexability audit.
- Sitemap validation and robots.txt copy/hash.
- Canonical and robots-meta results.
- Structured data validation output.
- GSC/Bing report screenshots or CSV exports (redacted where needed).
- AI Performance results from Bing and Google when the property has data.
- Crawler user-agent tests and decisions.
- Search engine report dates and limitations.

### 9.8 Dashboard

A simple `docs/audits/README.md` should link to the latest baseline/follow-up reports and show a small table:

`date | deployment | URLs checked | P0 | P1 | P2 | mobile performance | desktop performance | accessibility status | SEO status | URL compatibility`

A Looker Studio dashboard is optional. Do not make the project depend on a dashboard service if a Markdown report is sufficient.

---

# Part E — Small implementation phases

Every phase below must be completed in tiny tasks. The agent must not batch the whole phase into one giant, risky commit. At the end of each task: run relevant checks, update a handoff note, and commit.

## Phase A0 — Establish repository and website baseline

**Goal:** Capture the existing website as it is before modifying it.

### A0.1 — Read project and deployment configuration

- Inspect repository tree, current branch, recent history, submodules, build scripts, lockfiles, Hugo config, Netlify config, redirects, headers, functions, edge functions, content, assets, static files, and generated files.
- Confirm the current production build command and Netlify deploy settings.
- Do not upgrade dependencies or edit templates yet.

**Verify:** Build current site; capture warnings; document output directory and Netlify configuration.
**Commit:** `docs(audit): document current site build and deploy setup`

### A0.2 — Build the full URL manifest

- Collect routes from repository content/front matter, Hugo aliases, sitemap, navigation, feeds, legal policies, static assets, PDFs, and a live crawl.
- Normalize only for comparison; preserve exact original paths in the manifest.
- Include query-string variants only when they represent a meaningful published resource.

**Verify:** Compare discovered route counts across repository, sitemap, and crawl; explain differences.
**Commit:** `test(audit): add legacy url inventory`

### A0.3 — Capture visual baseline

- Capture homepage and representative pages in mobile portrait, landscape, tablet, desktop, ultrawide, and TV-like viewport sizes.
- Capture dark/light themes if both exist.
- Save screenshots and viewport/browser details.

**Verify:** Screenshot files open and map to exact URL/viewport/theme.
**Commit:** `test(audit): capture pre-change visual baseline`

### A0.4 — Capture current tool reports

- Run PageSpeed Insights/Lighthouse for representative pages.
- Run Screaming Frog up to its free URL limit and supplement with a local script for all routes if needed.
- Run WAVE and axe checks.
- Run PageScore.dev as a secondary quick check.
- Save source report URLs and raw output.

**Verify:** Every score has a tool, timestamp, URL, and configuration. Use `NOT MEASURED` when a test cannot run.
**Commit:** `docs(audit): save initial tool reports`

## Phase A1 — Technical URL, sitemap, robots, and redirect audit

### A1.1 — Inspect robots and sitemap using HTTP tools

- Use `curl -I`, `curl -L`, and GET requests from a network-enabled local environment or CI.
- Record status, MIME type, redirect, cache headers, and content.
- Parse XML with an XML parser; validate URL syntax and canonical targets.
- Validate robots rules for Googlebot, Bingbot, OAI-SearchBot, GPTBot, PerplexityBot, and currently documented Anthropic bots.

**Verify:** No accidental blocked public routes; no sitemap URLs returning errors or non-canonical duplicates.
**Commit:** `test(seo): validate robots and sitemap endpoints`

### A1.2 — Validate all legacy route redirects

- Test slashless and trailing-slash variants.
- Test old aliases and every discovered article/policy path.
- Test `/resume.pdf`, `/index.json`, `/index.md`, `/llms.txt`, `/auth.md`, `/.well-known/mcp.json`, `/.well-known/api-catalog`, `/sitemap.xml`.
- Confirm redirect chains are not excessive and no loops exist.

**Verify:** Route manifest diff has zero unexplained missing paths.
**Commit:** `test(routes): add redirect and legacy url regression suite`

### A1.3 — Validate error handling

- Test a deliberately nonexistent URL.
- Confirm actual 404 status and a useful not-found page.
- Confirm Netlify rewrites or SPA fallback are not converting unknown URLs into 200 responses.

**Verify:** Unknown route returns 404; important links do not.
**Commit:** `test(routes): cover not-found status behaviour`

## Phase A2 — SEO metadata and structured data

### A2.1 — Audit titles, descriptions, headings, language, and canonical tags

- Export existing values for every public page.
- Identify duplicates, missing values, overly generic text, malformed tags, and canonicals pointing to wrong hosts/paths.
- Ensure pages are descriptive and human-written; avoid keyword stuffing.

**Verify:** CSV has one row per public HTML page; every issue is in issue register.
**Commit:** `docs(seo): record metadata and heading audit`

### A2.2 — Implement shared metadata components

- Create reusable page metadata logic for title, description, canonical, Open Graph, Twitter/X card metadata, robots directives, and theme color.
- Ensure every route supplies page-specific title and description.
- Keep generated URLs absolute and canonical to `https://deardhruv.com`.

**Verify:** HTML assertions for all page types; no duplicate canonical; preview images resolve.
**Commit:** `feat(seo): add shared page metadata system`

### A2.3 — Add and validate structured data

- Start with Person and WebSite data, then Article/BlogPosting and BreadcrumbList where appropriate.
- Add SoftwareApplication only where product claims and availability are verified.
- Do not mark personal projects as employers, customers, or official product endorsements.

**Verify:** JSON-LD parses; Rich Results Test and Schema Markup Validator show no unsupported properties; content agrees with visible page.
**Commit:** `feat(seo): add factual structured data`

### A2.4 — Improve internal linking and content discovery

- Add links among relevant projects, articles, portfolio and About pages.
- Add previous/next article links to the six-part series.
- Use descriptive link text instead of “click here”.
- Ensure all pages are reachable from a stable page or sitemap.

**Verify:** Crawl has no accidental orphan pages; link destinations return expected status.
**Commit:** `feat(content): improve internal discovery links`

## Phase A3 — Search Console and Bing ownership setup

### A3.1 — Prepare setup instructions for Dhruv

- Provide exact DNS TXT or HTML verification instructions based on available hosting/DNS setup.
- Do not request or store user passwords.
- Dhruv completes ownership verification in Google Search Console and Bing Webmaster Tools.

**Verify:** Owner confirms verification; record property URLs but never save credentials.
**Commit:** `docs(search): add webmaster verification checklist`

### A3.2 — Submit sitemap and inspect priority URLs

- Submit the XML sitemap to Google and Bing.
- Inspect the homepage, About, Portfolio, Projects, Posts, all six articles, résumé and policy pages.
- Record canonical and indexing status.

**Verify:** Screenshots/exports saved; unresolved statuses recorded in issue register.
**Commit:** `docs(search): record initial indexing status`

### A3.3 — Record baseline search performance

- Export query/page/country/device data for available date windows.
- Record Google generative AI report data if available.
- Record Bing AI Performance citation/pages/grounding query data if available.
- Do not manufacture zero citations if the dashboard has no data; use `NO DATA SHOWN`.

**Verify:** CSV/screenshot exports include dates and filters; private data is redacted.
**Commit:** `docs(search): save search visibility baseline`

## Phase A4 — AI crawler and machine-readable content audit

### A4.1 — Review crawler access policy

- Inspect current robots.txt and edge/security rules.
- Decide separately on search/citation crawlers and training crawlers.
- Ask Dhruv before allowing or blocking training agents.

**Verify:** Test user-agent responses against actual production and Netlify preview; no human/crawler cloaking.
**Commit:** `docs(seo): document ai crawler policy`

### A4.2 — Validate machine-readable resources

- Validate `llms.txt`, `index.md`, `index.json`, MCP JSON, API linkset, and `auth.md`.
- Check MIME type, schema, response status, content freshness, link reachability, and no accidental private details.
- Compare article metadata with the normal site.

**Verify:** Scripted validation and report for every endpoint.
**Commit:** `test(seo): validate machine discovery endpoints`

### A4.3 — Fix only supported issues

- Correct invalid metadata, stale links or wrong MIME types.
- Do not create an endpoint just to satisfy a trend.
- Do not claim an `llms.txt` file or MCP descriptor directly improves rankings.

**Verify:** Endpoint contract tests.
**Commit:** `fix(seo): correct verified machine discovery issues`

## Phase A5 — Accessibility and interaction audit

### A5.1 — Automated accessibility baseline

- Run axe on all page templates and representative pages.
- Run WAVE for visual issue identification.
- Capture exact selector, rule, severity and screenshot for each finding.

**Verify:** Accessibility report includes all failures and incomplete checks.
**Commit:** `test(a11y): add automated accessibility baseline`

### A5.2 — Keyboard and focus review

- Test every menu, button, link, theme picker, modal, disclosure, carousel, code copy button and mobile navigation.
- Check focus order, visible focus, escape behaviour, focus return, and skip link.

**Verify:** Keyboard checklist passes; issues become tickets before fixes.
**Commit:** `test(a11y): document keyboard and focus audit`

### A5.3 — Contrast and responsive typography

- Audit light and dark theme combinations; include disabled, hover, selected, active, focus and visited states.
- Verify contrast in real component contexts, not just design tokens.
- Test text zoom and reflow.

**Verify:** Save contrast matrix and screenshots.
**Commit:** `test(a11y): add contrast and zoom regression cases`

### A5.4 — Fix issues in small component-level tasks

- Fix global navigation, button/link states, forms, article controls, cards, icons and theme controls independently.
- Support `prefers-reduced-motion`.

**Verify:** axe plus manual keyboard/screen reader checks after each component.
**Commit:** One commit per component/fix group; do not combine unrelated UI changes.

## Phase A6 — Performance and responsive audit

### A6.1 — Run repeatable Lighthouse and PSI tests

- At least three mobile and three desktop lab runs per representative page.
- Keep device, browser, throttling and test region consistent.
- Save report URLs and JSON/HTML outputs.

**Verify:** Median/range in performance summary; field data separated from lab results.
**Commit:** `docs(perf): save repeatable mobile desktop baseline`

### A6.2 — Profile low-end rendering and interaction

- Use CPU throttling and network throttling.
- Inspect long tasks, layout/reflow, event handlers, hydration, large images/fonts, and expensive blur/shadows.
- Check low-end-device fallback for animated hero/3D effects.

**Verify:** Profiling traces saved; performance bottleneck documented before optimization.
**Commit:** `docs(perf): document low-end profiling results`

### A6.3 — Optimize one measured bottleneck at a time

- Optimize image dimensions/formats, fonts, JavaScript, CSS, route payloads, hydration, caching and animation only when evidence supports it.
- Avoid loading non-critical interactive islands above the fold.

**Verify:** Before/after reports under identical conditions; no visual/functional regression.
**Commit:** Separate commit for each optimization category.

### A6.4 — Responsive and device matrix regression

- Run Playwright screenshots for all breakpoints/orientations.
- Check horizontal overflow, clipping, sticky-header overlap, unusable menus, and foldable transitions.
- Test TV keyboard/D-pad-like focus and large-screen reading widths.

**Verify:** Visual regression reviewed; intentional differences approved.
**Commit:** `test(responsive): add viewport matrix regression suite`

## Phase A7 — Analytics and visitor behaviour

### A7.1 — Choose analytics with Dhruv

Recommend a minimal approach:

- Search Console and Bing for organic discovery.
- Microsoft Clarity for heatmaps/recordings only if the owner approves its data processing and privacy implications.
- Choose **one** primary website analytics product: Cloudflare Web Analytics or GA4 or Ahrefs Web Analytics.

Do not install several overlapping tools by default.

**Verify:** Owner has explicitly approved chosen tools and data categories.
**Commit:** `docs(analytics): record approved measurement plan`

### A7.2 — Implement a privacy-conscious integration

- Use one reusable integration point.
- Load scripts only when appropriate under the approved consent policy.
- Avoid sending sensitive form values or unnecessary query parameters.
- Exclude internal/admin traffic where practical.
- Do not duplicate events via both direct scripts and tag manager.

**Verify:** Network panel shows only intended requests; events are not duplicated; no PII in payloads.
**Commit:** `feat(analytics): add approved lightweight measurement`

### A7.3 — Define useful events

Only add events that answer a real question:

- `resume_download`.
- `contact_email_click`.
- `project_external_link_click` with safe, non-PII destination classification.
- `article_open` / `article_navigation` if needed.
- `theme_change` only if the data is useful and privacy-approved.

Do not record arbitrary keystrokes, form content, session text, or personal details.

**Verify:** Event names, parameters, and counts tested in debug mode.
**Commit:** `feat(analytics): track approved portfolio interactions`

### A7.4 — Configure Clarity responsibly, if selected

- Mask fields and dynamic content where appropriate.
- Avoid recording forms, private content or sensitive page regions.
- Review consent and disclosure requirements.
- Test recordings on staging with dummy data.

**Verify:** No sensitive data is visible in test recordings.
**Commit:** `feat(analytics): configure safe clarity capture` (only if approved).

## Phase A8 — Security, privacy, and policy consistency

### A8.1 — Security header baseline

- Run MDN HTTP Observatory and SSL Labs.
- Inspect Netlify headers and redirects.
- Check HTTPS, mixed content, CSP, HSTS and other applicable headers.

**Verify:** Report current values and compatibility risks; no restrictive change without testing.
**Commit:** `docs(security): record http and tls baseline`

### A8.2 — Policy content inventory

- List every app's privacy and terms pages.
- Compare website analytics scripts to website privacy statements.
- Compare app telemetry SDKs and data flows to app policy language.
- Flag generic template clauses that do not match the actual app.

**Verify:** Owner/legal review list is delivered; do not autonomously rewrite legal claims.
**Commit:** `docs(privacy): add policy and data inventory`

### A8.3 — Fix confirmed technical issues

- Correct missing/incorrect headers, mixed content, exposed files, unsafe redirect patterns, or dependency vulnerabilities.
- Keep secrets outside version control.

**Verify:** Repeat same security scans and show before/after.
**Commit:** `fix(security): remediate verified technical findings`

## Phase A9 — Audit dashboard and report automation

### A9.1 — Create report index

- Add `docs/audits/README.md` with links to latest baseline and follow-up reports.
- Include a concise issue trend table.

**Verify:** All report links resolve within the repository.
**Commit:** `docs(audit): add audit report index`

### A9.2 — Add repeatable audit scripts

- Add scripts for URL checks, redirects, sitemap parsing, robots checks, feed validation, JSON-LD parsing, and static content metadata.
- Use stable, maintained tooling and pin versions.
- Scripts must fail with actionable output and return non-zero on critical errors.

**Verify:** CI can run them locally and in Netlify/CI as appropriate.
**Commit:** `test(audit): add repeatable site audit scripts`

### A9.3 — Add scheduled checks only if safe and useful

- A weekly or monthly scheduled job may run non-invasive checks against production.
- Do not load-test or flood the production site.
- Store minimal results and notify only on meaningful regressions.

**Verify:** Schedule is documented and can be disabled; no secrets in logs.
**Commit:** `ci(audit): add lightweight scheduled audit`

## Phase A10 — Fix prioritization and implementation loop

For each issue:

1. Reproduce it.
2. Capture evidence.
3. Determine affected routes and devices.
4. Write a small fix plan.
5. Implement the smallest safe change.
6. Run unit/component/browser tests.
7. Run the relevant specialist audit again.
8. Update the issue register.
9. Commit only the task's code/docs/tests.

Never mark an issue resolved because code was changed. Mark it resolved only after the relevant test passes.

## Phase A11 — Post-redesign and post-migration regression

- Rebuild and redeploy preview.
- Re-run all old URL manifest checks.
- Re-run Lighthouse/PSI on representative pages.
- Re-run accessibility checks and visual comparisons.
- Validate robots, sitemap, canonical, feeds, llms, MCP/linkset, résumé and policy pages.
- Re-check search metadata and structured data.
- Re-check all external links.

**Acceptance:** Zero unexplained missing legacy URLs; no critical failures; all approved P1s fixed or owner-accepted; measurable report compared against baseline.

## Phase A12 — Production release and first-month monitoring

### A12.1 — Deploy preview approval

Dhruv reviews the final preview, mobile/desktop screenshots, article pages, policies, résumé, and route compatibility report.

### A12.2 — Production deployment

- Deploy only after explicit owner approval.
- Keep previous Netlify deploy available for rollback.
- Verify homepage, core pages, articles, policies, résumé, feeds, machine endpoints, robots and sitemap after deployment.

### A12.3 — Post-release indexing and monitoring

- Submit sitemap once after successful production deployment.
- Inspect priority URLs.
- Review Clarity/analytics data only after sufficient visits accrue.
- Review Core Web Vitals field data after a meaningful sample/time window.
- Compare Google/Bing search visibility and AI citations as observed, without claiming causality.

**Commit:** `docs(release): record production audit and rollback details`

---

# Part F — Automated test implementation examples

## 10. Minimum URL smoke-test contract

Write a test that reads the route manifest and requests each route. For each URL assert:

- The expected status (normally 200 for canonical pages, 404 for intentionally nonexistent paths).
- Redirects terminate in the expected canonical URL.
- No redirect loops.
- No redirect chain longer than the agreed limit (prefer one hop for standard slash normalization).
- Content type is expected for HTML/PDF/JSON/Markdown/XML/linkset resources.
- HTML pages have a title, canonical URL, language, viewport, and one meaningful H1.
- No `noindex` on pages that are meant to be indexed.

## 11. Playwright requirements

Use Playwright for:

- Navigation and menu behaviour across all pages.
- Mobile menu open/close and focus management.
- Theme selection and persistence, if supported.
- Keyboard traversal and escape behaviour.
- Article links, previous/next controls, code snippets and copy controls.
- Résumé and external project links.
- Responsive screenshots and overflow detection.
- Console errors and failed network requests.
- Reduced-motion behaviour.

Use semantic locators and accessible names, not brittle CSS selectors where possible. Add stable test IDs only when semantic queries are not appropriate.

## 12. Visual regression requirements

- Pin browser version, fonts, viewport, device scale factor, theme, and animation state.
- Disable or freeze time/random-dependent animation during screenshots.
- Wait for fonts and critical images to load.
- Compare screenshots with a reasonable per-pixel threshold and inspect any changed region.
- Do not blindly update snapshots to hide regressions.
- Capture screenshots at least for 320, 360, 390, 430, 768, 1024, 1366, 1440, 1920, and 2560 CSS px widths where feasible.
- Test both portrait and landscape for mobile/tablet/foldable-like profiles.

## 13. Unit and component tests

Test:

- Metadata generation and canonical URL helpers.
- Sitemap/feed generation.
- robots.txt output.
- Link construction and route normalization.
- Theme state and accessible names.
- Navigation active-state resolution.
- Structured data serializers.
- Analytics event allowlist and privacy-safe parameters.
- Any custom image or responsive source helper.

---

# Part G — Content quality and search trust

## 14. Authorship and technical credibility

Search systems and human readers should be able to understand who wrote the content, what was actually built, and which claims are demonstrable.

For each project/article:

- Identify the author's role accurately (solo developer, lead engineer, contributor, team member, etc.).
- Distinguish work performed personally from team achievements.
- Link public source code or app listings when they exist and are safe to share.
- Explain constraints, options considered, trade-offs, failures, test method, and lessons learned.
- Add update dates when a technical claim or supported version changes.
- Keep version numbers current or explicitly state the version used at the time of writing.
- Avoid fabricated test results, benchmark charts, quotes, customer endorsements, or client logos.
- Use precise first-person writing consistent with the separate authentic content rewrite addendum.
- Cite external libraries, standards, and research where appropriate.

## 15. Technical claim evidence register

Create `content/CLAIM_EVIDENCE.md` or the closest existing documentation file, with columns:

`claim_id, page, exact_claim, scope, source_or_artifact, measurement_method, test_environment, last_verified, approved_wording, owner_approval`

Prioritize numeric claims already visible on the live site:

- 14+ years of experience.
- 27+ vs 30+ POS device/peripheral count.
- 2x speculative decoding improvement.
- 3,000 ms watchdog interval.
- 25+ document formats.
- 4-step diffusion generation.
- 60–120 FPS.
- 29 achievements and level ranges.
- 40% startup reduction.
- 99.8% connection reliability.
- 60% communication latency reduction.
- Any “millions of transactions/users” wording in old content or search snippets.

Do not remove an achievement just because public proof is not available; ask the owner whether it is confidential, can be described qualitatively, or should be removed. Do not publish employer/customer-confidential data.

---

# Part H — Final release acceptance checklist

## 16. Production acceptance

### URL and content

- [ ] Full URL manifest generated from current repository and live site.
- [ ] Every legacy published article path preserved.
- [ ] Every legacy legal/policy path preserved.
- [ ] Résumé path `/resume.pdf` preserved.
- [ ] `/index.json`, `/index.md`, `/llms.txt`, `/auth.md`, MCP and API catalog endpoints verified.
- [ ] `/sitemap.xml`, `/sitemap/`, and `/robots.txt` verified.
- [ ] All old aliases verified.
- [ ] No redirect loops/chains or unexplained 404s.
- [ ] Sitemap contains canonical/indexable pages only.
- [ ] Feeds and machine-readable content match published pages.
- [ ] External project/social links checked.

### Performance

- [ ] Mobile and desktop Lighthouse/PSI reports saved.
- [ ] Three-run median and ranges saved for representative pages.
- [ ] Field data status correctly reported (available or no data).
- [ ] LCP/INP/CLS field results evaluated where available.
- [ ] Slow network and CPU-throttled checks completed.
- [ ] No large, unneeded JavaScript/animation dependency added.
- [ ] Images/fonts do not cause layout shift.
- [ ] No major console/network errors.

### Accessibility and responsive behaviour

- [ ] axe results saved; no unresolved critical/serious issues without owner approval.
- [ ] WAVE review saved.
- [ ] Keyboard-only navigation passes.
- [ ] Visible focus and logical focus order pass.
- [ ] Contrast matrix passes WCAG 2.2 AA for relevant content/states.
- [ ] Reduced-motion preference is respected.
- [ ] 200%/400% zoom and narrow viewport reflow checked.
- [ ] Foldable-like, tablet, desktop, ultrawide and TV-like views checked.
- [ ] Touch and remote focus states are usable.

### SEO and AI discovery

- [ ] GSC ownership verified by owner.
- [ ] Bing Webmaster Tools ownership verified by owner.
- [ ] Sitemap submitted and processing status recorded.
- [ ] Priority URLs inspected.
- [ ] Canonical and robots directives correct.
- [ ] Titles/descriptions/headings are page-specific.
- [ ] Structured data validates and matches visible facts.
- [ ] AI crawler policy approved and tested.
- [ ] Google Generative AI performance status recorded (data or no data).
- [ ] Bing AI Performance status recorded (data or no data).
- [ ] No promise of guaranteed AI visibility is made.

### Security and privacy

- [ ] TLS and HTTPS reviewed.
- [ ] Security headers reviewed without breaking site functionality.
- [ ] No secrets in repo/build artefacts.
- [ ] Analytics tools approved and documented.
- [ ] Consent/privacy behaviour reviewed for relevant regions.
- [ ] Website and app privacy statements reconciled with actual data flows.
- [ ] Legal policy changes reviewed by owner/qualified reviewer.

### Delivery

- [ ] All tasks have individual commits.
- [ ] Unit/component/Playwright tests pass.
- [ ] Visual regression reviewed.
- [ ] Audit reports stored and linked from `docs/audits/README.md`.
- [ ] Known issues and accepted risks documented.
- [ ] Netlify production deploy approved by Dhruv.
- [ ] Rollback procedure documented and tested or rehearsed.
- [ ] Post-deploy smoke test completed.
- [ ] Handoff file updated for the next Gemini session.

---

# Part I — Handoff protocol for quota/context interruptions

## 17. Required handoff file

Maintain `docs/audits/GEMINI_AUDIT_HANDOFF.md` and update it at the end of every task. It must contain:

```md
# Gemini Audit Handoff

Last updated: YYYY-MM-DD HH:mm timezone
Current branch:
Latest commit:
Current deploy preview URL (if any):

## Completed
- [ ] Task ID — description — commit hash — tests run — report path

## Current task
Task ID:
Objective:
Files being changed:
Last successful command/test:
Unresolved problem:

## Pending owner decisions
- Question:
  - Why it matters:
  - Options:
  - Recommendation:

## Open issues
- Issue ID / severity / affected routes / evidence / next action

## Next exact task
Task ID:
Smallest next action:
Expected files:
Required tests:
Expected commit message:

## Do not repeat
- Completed audits, test reports, or changes that are already committed.
```

### 17.1 Commit convention

Use conventional commits, for example:

- `docs(audit): capture live website baseline`
- `test(routes): verify legacy URL redirects`
- `test(seo): validate sitemap and canonical metadata`
- `feat(seo): add page-specific metadata`
- `test(a11y): add keyboard navigation coverage`
- `fix(a11y): correct menu focus handling`
- `perf(images): serve responsive AVIF and WebP assets`
- `docs(search): record Bing AI citation baseline`
- `ci(audit): add scheduled URL smoke tests`

Do not make a single commit called `website redesign complete` containing unrelated work.

---

# Part J — Sources and official references

The audit-tool descriptions and current platform guidance must be rechecked at the time Gemini implements them because free-tier limits, report names, crawler behaviour, and standards may change.

## Search and AI discovery

- Google Search Console: <https://search.google.com/search-console>
- Google Search Central — AI features and your website: <https://developers.google.com/search/docs/appearance/ai-features>
- Google Search Central — Search Generative AI performance reports announcement (3 June 2026; global rollout note updated 31 August 2026): <https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports>
- Google Search Console — Generative AI performance report for Search: <https://support.google.com/webmasters/answer/16984139>
- Google Search Console — Generative AI performance report for Discover: <https://support.google.com/webmasters/answer/16983858>
- Bing Webmaster Tools: <https://www.bing.com/webmasters>
- Bing Webmaster Tools — AI Performance: <https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c>
- Bing Webmaster Blog — AI Performance preview: <https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/>
- OpenAI crawler documentation: <https://platform.openai.com/docs/bots>
- Anthropic crawler / web search documentation: review current official documentation at <https://docs.anthropic.com/>
- Perplexity crawler documentation: <https://docs.perplexity.ai/guides/bots>

## Performance

- PageSpeed Insights: <https://pagespeed.web.dev/>
- PageSpeed Insights API: <https://developers.google.com/speed/docs/insights/rest>
- Lighthouse: <https://developer.chrome.com/docs/lighthouse>
- Web Vitals: <https://web.dev/articles/vitals>
- WebPageTest: <https://www.webpagetest.org/>

## Technical SEO and auditing

- Ahrefs Free: <https://ahrefs.com/free>
- Ahrefs free account limits: <https://help.ahrefs.com/en/articles/13002606-what-can-i-use-for-free-in-ahrefs>
- Screaming Frog SEO Spider: <https://www.screamingfrog.co.uk/seo-spider/>
- Screaming Frog crawl limit details: <https://www.screamingfrog.co.uk/seo-spider/user-guide/configuration/>
- PageScore.dev: <https://pagescore.dev/>
- PageScore pricing/free limitations: <https://pagescore.dev/pricing>

## Accessibility

- WCAG 2.2: <https://www.w3.org/TR/WCAG22/>
- WAVE: <https://wave.webaim.org/>
- Accessibility Insights: <https://accessibilityinsights.io/>
- axe-core: <https://github.com/dequelabs/axe-core>

## Analytics

- Microsoft Clarity: <https://clarity.microsoft.com/>
- Clarity pricing/free status: <https://clarity.microsoft.com/pricing>
- Google Analytics: <https://analytics.google.com/>
- Cloudflare Web Analytics: <https://www.cloudflare.com/web-analytics/>
- Looker Studio: <https://lookerstudio.google.com/>

## Security and structured data

- MDN HTTP Observatory: <https://developer.mozilla.org/en-US/observatory>
- Qualys SSL Labs: <https://www.ssllabs.com/ssltest/>
- Google Rich Results Test: <https://search.google.com/test/rich-results>
- Schema Markup Validator: <https://validator.schema.org/>
- RFC 9264 — Linkset: <https://www.rfc-editor.org/rfc/rfc9264>
- Model Context Protocol specification: <https://modelcontextprotocol.io/specification>

---

# Final instruction to Gemini

Start with **Phase A0, Task A0.1 only**. Inspect, document, test, and commit that task. Then update `docs/audits/GEMINI_AUDIT_HANDOFF.md` and stop at the task boundary before beginning the next task. Do not ask Dhruv to repeat information already present in the project documents or repository. When a decision genuinely requires the owner's judgement—especially analytics/privacy settings, numeric claims, crawler training permissions, legal policy text, or production deployment—prepare a concise decision note with evidence and wait for that decision rather than silently guessing.

The required result is not a score-chasing exercise. It is a maintainable, testable website with trustworthy content, strong technical foundations, measurable performance, accessible interaction, durable URLs, and a documented way to keep it healthy after launch.
