# DearDhruv.com — Website Modernization & Portfolio Rebuild Plan

**Execution brief for:** Gemini Flash 3.8 High  
**Repository:** <https://github.com/DearDhruv/deardhruv.com>  
**Production domain:** <https://deardhruv.com/>  
**Observed repository branch:** `master` (verify before starting)  
**Hosting:** Netlify  
**Document created:** 31 October 2026  
**Project type:** Existing personal portfolio + technical blog modernization  
**Primary constraint:** Preserve every existing published URL, article path, legal page path, document URL, static asset URL, and machine-readable endpoint.

---

## 0. Instructions to the implementation agent

You are the implementation engineer, design systems engineer, accessibility specialist, performance engineer, QA engineer, and release engineer for this project. Work directly in the existing repository. This is a controlled modernization, not a greenfield rewrite.

### Read this first

1. Read this entire plan before changing code.
2. Inspect the actual checked-out repository and its current `HEAD`; information in this document is a public-source baseline from 31 October 2026, not a substitute for inspecting the local working tree.
3. Create and maintain `docs/WEBSITE_REDESIGN_PROGRESS.md`. This file is the hand-off log between Gemini runs. It must contain the current phase/task, completed commits, tests run, test results, known blockers, changed files, and the exact next task.
4. Work on a feature branch created from the current production branch. Do not work directly on `master` and do not change the repository's default branch.
5. Complete one small task at a time. After each task: run its tests, inspect the diff, update the progress log, and create a focused Git commit. Do not bundle several unrelated tasks into one commit.
6. Stop cleanly at task boundaries when context or quota is low. The next run must be able to resume by reading this plan, `docs/WEBSITE_REDESIGN_PROGRESS.md`, and the latest Git history. Never leave half-finished changes undocumented.
7. Do not fabricate professional history, client names, project metrics, awards, conference appearances, technical claims, or product capabilities. Keep existing factual content unless the owner approves changes. Mark unclear claims for review instead of silently rewriting them.
8. Do not publish any of the community members' biographies from the supplied text attachment on Dhruv's website. Those are other people's introductions and links; they are reference/context material only.
9. Do not add paid services, databases, server-rendering infrastructure, or recurring hosting costs unless a real requirement proves they are necessary. Prefer the existing static site and Netlify plan.
10. No public production deployment until the route-preservation, content, accessibility, responsive, and performance release gates in this document pass.

### Required task-completion message in the hand-off log

For every task, record:

- Task ID and short description.
- Files inspected and files changed.
- Implementation summary.
- Exact test commands executed and pass/fail results.
- Screenshots or visual test artifacts produced, if applicable.
- Accessibility and responsive checks completed.
- Route/link impact (must be `none` unless a verified addition is explicitly intended).
- Commit hash and commit subject.
- Remaining issues and the next task ID.

### Git workflow

Use a branch name such as:

```bash
git switch -c feature/portfolio-modernization
```

For each completed task, use an appropriately scoped commit, for example:

```bash
git status --short
git diff --check
# Run the task-specific tests and build before staging.
git add <only-the-files-for-this-task>
git commit -m "test(site): capture legacy route baseline"
```

Use conventional, descriptive commit messages. Examples:

- `docs(site): add route and content inventory`
- `style(site): add responsive design tokens`
- `feat(site): build accessible site navigation`
- `feat(portfolio): add evidence-led project cards`
- `test(site): add Playwright visual checks`
- `perf(site): optimize responsive project imagery`

Never use `git add .` without first checking that generated output, local screenshots, credentials, `.env` files, caches, and unrelated files are not staged. Never commit secrets, private tokens, personal contact data that is not already intended for publication, build artifacts, or user-specific local configuration.

---

## 1. Mission and desired outcome

Modernize **DearDhruv.com** into a polished, memorable, trustworthy engineering portfolio that demonstrates the depth of Dhruv's work across:

- Android engineering and native mobile architecture.
- iOS engineering and cross-platform delivery.
- Kotlin Multiplatform (KMP) and Compose Multiplatform (CMP).
- On-device AI, local LLM inference, multimodal processing, and edge compute.
- Native performance, C++/NDK, GPU backends, memory management, and hardware integration.
- Digital commerce, payment flows, POS integrations, and peripheral ecosystems.
- Web engineering, technical leadership, architecture, mentoring, open source, and technical writing.
- Product design collaboration, accessibility, responsive/adaptive UI, and performance engineering.

The website must feel high quality without requiring a high-end GPU, a modern flagship phone, a powerful laptop, or a fast internet connection. It must remain useful on small or old phones, foldables, tablets, laptops, old desktop computers, ultrawide monitors, Android TV browsers, and large 4K displays.

The website itself should demonstrate the engineering values it communicates: fast initial rendering, stable layouts, accessible navigation, readable content, responsible motion, strong technical SEO, maintainable templates, and easy publishing.

### Success definition

A visitor should understand the following within the first screen:

1. Who Dhruv is and the level/type of engineering work he does.
2. The strongest areas of specialization.
3. Where to inspect real work and technical writing.
4. How to contact him or download his résumé.

A technical reviewer should be able to explore meaningful project case studies and understand the problem, constraints, Dhruv's specific contribution, architecture, trade-offs, outcomes, and evidence. A recruiter or hiring manager should be able to scan the profile and experience quickly. An article reader should have an excellent long-form reading experience.

A site owner should be able to add or update an article from anywhere using a normal GitHub web workflow, and the change should automatically deploy through Netlify. A friendly browser-based CMS may be added only after its authentication, compatibility, route safety, and cost have been proven.

---

## 2. Current-site baseline and facts discovered

This section records what was visible from the public GitHub repository and production website on 31 October 2026. Verify all of it against the checked-out repository before implementation.

### 2.1 Existing architecture

- The repository README identifies the site as a **Hugo static site** hosted on Netlify.
- The observed branch is `master`.
- The theme is `hello-friend-ng`, included as the Git submodule `themes/hello-friend-ng` from `https://github.com/rhazdon/hugo-theme-hello-friend-ng.git`.
- Root-level project areas include `assets/`, `content/`, `layouts/`, `netlify/edge-functions/`, `static/`, `themes/`, `config.toml`, `.gitmodules`, `netlify.toml`, and the project README files.
- The README describes Markdown content, social links, and the Hugo build command.
- The Netlify configuration currently specifies `publish = "public"` and `command = "hugo --gc --minify"`.
- The observed Netlify configuration pins Hugo to `0.162.1` and Node to `24`. Verify that these versions are still the intended build versions and that local development uses the same Hugo version.
- The deployment is configured to build from the Git repository. A commit to the deployment branch triggers the existing Netlify workflow.

**Architecture decision:** Keep Hugo, static generation, Markdown, the existing Netlify hosting arrangement, and the current content paths. Do not migrate to Astro, Next.js, React, a headless CMS, or a database merely to achieve a visual redesign. Hugo already solves the core static-site and publishing requirements and has project-level template override support. A migration is a separate project and is not approved by this brief.

### 2.2 Existing public pages and navigation

The live site currently exposes these main navigation destinations:

- `/` — home.
- `/about/` — profile/about page.
- `/portfolio/` — Work & Impact page.
- `/posts/` — technical writing index.
- `/projects/` — projects page.
- `/sitemap/` — human-readable sitemap.

The current home-page positioning is “Android Architect | Kotlin Multiplatform | On-Device AI”. It describes a Lead Android & Multiplatform Engineer with 14+ years of experience. The actual current role, dates, technology versions, impact claims, and all other biography details must be checked against the owner's approved current résumé and facts before being changed.

### 2.3 Existing content and facts visible online

The following content files were visible in the public repository:

- `content/about.md`
- `content/portfolio.md`
- `content/projects.md`
- `content/posts/_index.md`

The About page uses the `hero-page` layout and contains front matter aliases:

- `/about-us/`
- `/about-hugo/`
- `/contact/`

These aliases are legacy public paths and must continue to resolve.

The existing project content includes the following themes and entries:

1. **AI Playground** — Kotlin Multiplatform, Compose Multiplatform, C++20/NDK, llama.cpp, Google AI Edge/LiteRT, Apple MLX, Vulkan/OpenCL/Metal, SQLDelight, offline/on-device multimodal AI, image generation, local document processing, runtime and native crash isolation, and cross-platform voice work.
2. **VelociHue** — KMP/CMP, Android, iOS, Android TV, game-engine logic, Firestore synchronization, achievements, accessibility, D-pad/10-foot UI, and share cards.
3. **Digital Commerce Platform** — Android, Compose, architecture, commerce, payment integration, inventory, and synchronization.
4. **Hardware Integration Module** — Android NDK, hardware APIs, printers, scanners, POS peripherals, and low-latency IPC.
5. **Open-source contributions** — Android/Kotlin ecosystem work.

The existing content contains quantified claims such as application scale, transaction volume, POS integration counts, percentage improvements, and throughput claims. **Do not assume those numbers are approved or independently verified.** Add a content verification checklist and ask the owner to approve any claim whose evidence is unclear. Confidential employer work must be described at a level that does not disclose client-sensitive information, proprietary source code, security details, or private operational data.

### 2.4 Existing blog series and published article paths

The Posts index currently links to “Beyond the Model Series”, a six-part AI Playground engineering series. These exact observed URLs are published and must remain available:

```text
/posts/
/posts/ai_playground_series/
/posts/ai_playground_series/01-i-wanted-the-model-to-stay-on-the-phone/
/posts/ai_playground_series/02-the-day-a-chat-box-became-a-document-engine/
/posts/ai_playground_series/03-the-model-was-fine-the-phone-wasnt/
/posts/ai_playground_series/04-i-put-an-image-generator-inside-the-phone/
/posts/ai_playground_series/05-at-some-point-i-stopped-building-a-chat-app/
/posts/ai_playground_series/06-pushing-mobile-hardware-to-the-edge/
```

The article detail pages are long technical articles with code and structured sections. Preserve the exact slug, path, article text, code content, and all internal/external citations unless the owner specifically authorizes an edit. Improve the rendering template and reading experience without rewriting the articles as part of this redesign.

### 2.5 Legal and product policy page paths

The published sitemap currently lists legal/policy pages under `/other/`. Keep all of these exact paths working:

```text
/other/
/other/ai-playground/
/other/ai-playground/privacy-policy-ai-playground-app/
/other/ai-playground/terms-ai-playground-app/
/other/open-store-app/
/other/open-store-app/privacy-policy-open-store-app/
/other/open-store-app/terms-open-store-app/
/other/veloci-hue/
/other/veloci-hue/privacy-policy-veloci-hue-game/
/other/veloci-hue/terms-veloci-hue/
```

Legal content is not decoration. Keep the exact content and page links while redesigning layout. Do not rewrite legal terms or privacy claims in a visual redesign phase. Any legal copy change needs explicit owner review.

### 2.6 Documents, machine-readable output, and Netlify behavior

The live résumé is linked at:

```text
/resume.pdf
```

Preserve that URL. The PDF content may be updated separately after the owner approves the new résumé, but never rename it or break existing links.

The Hugo configuration currently declares multiple output formats:

- Home: `HTML`, `RSS`, `JSON`, `Markdown`.
- Pages: `HTML`, `Markdown`.
- Sections: `HTML`, `RSS`, `Markdown`.

The existing Netlify configuration contains a `/feed.json` rewrite to `/index.json`, security headers, content-type rules, caching rules, and a `markdown-negotiation` Edge Function on `/*`.

The `markdown-negotiation` Edge Function checks whether the request's `Accept` header contains `text/markdown`. It rewrites a route such as `/some/page/` to `/some/page/index.md` and sets the resulting content type to `text/markdown; charset=utf-8`, with `x-agent-ready: true`. This is an intentional machine-readable/content-negotiation feature. Preserve and test it; do not remove it because it is not visible in the normal browser UI.

Other paths/endpoints that need to be checked and preserved where they exist today:

```text
/sitemap.xml
/index.json
/index.md
/feed.json
/llms.txt
/auth.md
/.well-known/api-catalog
/.well-known/mcp.json
/.well-known/oauth-protected-resource
/.well-known/oauth-authorization-server
/.well-known/openid-configuration
```

The `netlify.toml` includes headers for these resources, which is a clear signal that they may support external clients or discovery. Their exact current response code, response body, and content type must be recorded in the route/API inventory before modifying the configuration.

### 2.7 Existing integrations and security configuration

- `config.toml` contains a GA4 measurement ID (`G-230251097`). Verify it is still the correct property before keeping or changing it. Never add duplicate analytics scripts.
- `netlify.toml` defines CSP and other HTTP response headers. Inspect all existing scripts, styles, fonts, embeds, Netlify functions, and external resources before changing the Content Security Policy.
- The existing policy includes inline-script/style allowances and trusted third-party hosts. Review the need for each allow-list item. Tighten only after verifying functionality; do not break Markdown negotiation, analytics, fonts, or embeds.
- Preserve valid HTTPS redirects and caching behavior. Confirm no route is accidentally cached as immutable when its content is expected to change.

### 2.8 Supplied attachment and reference-site caveat

The only file available in this conversation is a pasted-text attachment containing introductions/bios for people in the GDG/developer community and URLs to a few portfolios. It is not a ZIP of source projects and is not a pack of visual screenshots. Some URLs in that text could not be fetched by the web research tool. Use it as inspiration for the types of work and portfolio structures to study; do not publish other people's bios, email details, or personal information on Dhruv's site.

---

## 3. Portfolio and design research — patterns to learn from

These are references to study, not templates to copy. Inspect their current behavior, responsive states, keyboard behavior, and performance before reusing a pattern.

### 3.1 Reference sites supplied in the text attachment

| Reference | Observed strength | What to learn | What not to copy blindly |
|---|---|---|---|
| [Deep Govani](https://deepgovani.com/) | Very clear opening statement and explicit distinction between professional work, personal concepts, and community contributions. Uses representative diagrams and labels them as illustrative when they are not genuine product screenshots. | Explain the real context and Dhruv's exact contribution. Use diagrams to explain systems without leaking protected product UI. Clearly label concept work, professional delivery, and open source. | Do not overpopulate each project card with technical tags or make every section equally prominent. Keep the number of featured projects curated. |
| [Vishvam Moliya](https://www.vishvam.dev/) | Distinctive hardware/rack-panel visual metaphor, status display, career pipeline, skill inventory, and archive presentation. | A cohesive and memorable identity can reflect engineering/hardware interests. A project archive can preserve older work without giving it the same priority as selected work. | Avoid continuous motion, excessive decorative labels, tiny text, or interaction that becomes harder to use on touch, remote, or keyboard. Preserve clear reading order. |
| [Ravi Rupareliya](https://ravirupareliya.com/) | Clear role statement, concise experience metrics, direct contact calls-to-action, and skill categories grouped by discipline. | Let visitors understand seniority, breadth, and collaboration areas quickly; offer a clear path from overview to detail. | Only use metrics that can be substantiated. Do not turn every skill into an unsupported proficiency score. |
| [DOTT](https://www.dottdrop.com/) | Listed in the supplied attachment as a product/brand website made by a community member. | Consider the distinction between product storytelling and a personal engineering portfolio. | The page could not be independently reviewed in this research pass; do not attribute specific design features to it. |
| [Ranjit Makwana portfolio](https://career.rjvibesonly.in/) | Listed in the supplied attachment. | May be revisited manually during visual research. | The page did not return a readable result during this pass; no claims are made about its design. |
| [Urmil Bhavsar portfolio](https://portfolio-urmil-bhavsars-projects.vercel.app/) | Listed in the supplied attachment. | May be revisited manually during visual research. | The page did not return a readable result during this pass; no claims are made about its design. |

### 3.2 Additional high-value portfolio references

| Reference | Observed strength | Recommended lesson |
|---|---|---|
| [Brittany Chiang](https://brittanychiang.com/) | Strong engineering portfolio information hierarchy: identity, current role, experience, projects, writing, and résumé are all discoverable. The content emphasizes accessibility and pixel-level UI quality. | Excellent model for a recruiter-friendly and engineering-review-friendly portfolio. Keep content readable and evidence-led even when adding visual personality. |
| [Bruno Simon](https://bruno-simon.com/) | Portfolio as an interactive 3D world, with keyboard, touch, and gamepad controls and user-accessible quality/audio options. | Study the ambition, interaction design, and explicit control options. Do **not** make a full-screen 3D/WebGL world the only entry point. It is an optional, expensive showcase and can exclude older devices, low-power hardware, keyboard/screen-reader users, and low-bandwidth visitors. |

### 3.3 Platform and design-system references

Use official design guidance to inform platform-specific project presentation and responsive behavior:

- **Android adaptive design:** Google recommends adapting to the available app/window dimensions and current window size class, rather than identifying a device by brand/model or assuming a tablet/foldable has one fixed size. See [Android window size classes](https://developer.android.com/develop/adaptive-apps/guides/use-window-size-classes) and [adaptive apps](https://developer.android.com/develop/adaptive-apps/guides/get-started-with-adaptive-apps).
- **Android TV:** Use the 10-foot readability principle, strong contrast, and visible focus states; all important controls must be reachable using a D-pad/keyboard-like remote. See [Build adaptive apps for TV](https://developer.android.com/develop/adaptive-apps/guides/tv/build-adaptive-apps-for-tv).
- **Apple motion guidance:** Motion should clarify status, feedback, and spatial relationships. It should be purposeful and optional, not a decorative obstacle. See [Apple Human Interface Guidelines — Motion](https://developer.apple.com/design/human-interface-guidelines/motion/).
- **Reduced motion:** Respect the operating-system setting using `prefers-reduced-motion`; remove or replace non-essential motion. See [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion).
- **Foldables:** Use responsive layout as the universal fallback. The Viewport Segments API and `device-posture` are limited-availability/experimental capabilities in some browsers, so they may enhance a layout but must never be required for a usable page. See [MDN Viewport Segments API](https://developer.mozilla.org/en-US/docs/Web/API/Viewport_segments_API), [using the API](https://developer.mozilla.org/en-US/docs/Web/API/Viewport_segments_API/Using), and [device-posture](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/device-posture).
- **WCAG:** Use WCAG 2.2 AA as the accessibility baseline. See [W3C WCAG 2.2](https://www.w3.org/TR/WCAG/).
- **Performance:** Use the current Core Web Vitals thresholds: LCP ≤ 2.5 seconds, INP ≤ 200 milliseconds, and CLS ≤ 0.1 at the 75th percentile. See [Google Search Central — Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals).
- **Hugo maintainability:** Prefer Hugo project-level layout overrides rather than editing vendor theme files. Hugo's project directory has a precedence model that allows project layouts to override theme layouts. See [Hugo directory structure](https://gohugo.io/getting-started/directory-structure/), [content organization and page bundles](https://gohugo.io/content-management/organization/), and [front matter](https://gohugo.io/content-management/front-matter/).
- **Netlify deployment:** Keep static deployment and Git-based deploy previews. See [Astro's Netlify deployment guide](https://docs.astro.build/en/guides/deploy/netlify/) only as a general example of Git-import static deploy settings; the live project should continue to use its current Hugo build configuration unless local evidence requires a correction.

---

## 4. Recommended brand and design direction

### 4.1 Design concept: “Engineering, made tangible”

Build a clean editorial engineering portfolio with subtle cues from hardware, system architecture, and developer tooling. It should feel premium, confident, modern, and technically credible—not like a generic agency landing page or a neon hacker dashboard.

Possible visual language:

- A dark graphite/ink base with a warm light theme alternative.
- One controlled accent color (cyan/teal or a similar crisp technical accent) plus semantic status colors.
- Strong typography, intentional whitespace, short section labels, thin dividers, and compact metadata.
- Real project screenshots, device mockups, architecture diagrams, terminal/code details, and selected hardware photos where permission exists.
- A subtle command-line wordmark or terminal reference may remain as a small brand detail, but must not dominate the identity or reduce readability.
- Consistent visual motifs across Android, iOS, web, AI, hardware, payment/commerce, and writing content.

### 4.2 Information hierarchy

1. The strongest and simplest positioning statement.
2. A concise explanation of what Dhruv builds and the engineering problems he solves.
3. Two or three flagship projects.
4. Evidence: role, architecture, devices/platforms, results, and links.
5. Professional experience and technical specializations.
6. Writing, talks, community, open source, and résumé.
7. Clear contact and collaboration action.

Do not put a huge wall of technology names in the hero. Give people a small set of understandable entry points; technical detail belongs in project case studies and articles.

### 4.3 Motion and interaction principles

The site should feel alive through quality micro-interactions, not through a constant animated background.

Allowed and encouraged:

- Subtle hover/focus states on links, cards, and buttons.
- Short opacity/transform transitions for menu panels and reveal effects.
- Small project-card media transitions that do not change layout dimensions.
- A restrained animated status indicator, only where it has a real meaning.
- Optional progress indication for long articles, as an enhancement rather than a reading dependency.
- Small inline diagrams with clear static equivalents.

Avoid as default behavior:

- WebGL/Three.js canvas in the initial page load.
- Heavy background videos, autoplay music, particle systems, shader effects, or continuous 3D animation.
- Scroll hijacking, snap scrolling that traps content, parallax on large areas, or forced intro/preloader sequences.
- Custom cursor effects as the only means of communicating hover/focus.
- Long staggered text animation that delays reading or causes layout shifts.
- Infinite animations that burn CPU/GPU or battery while the user is reading.

Implementation rules:

- Prefer CSS transitions and transform/opacity for simple motion.
- Never hide content until JavaScript runs; the site must be readable with JS disabled.
- Respect `prefers-reduced-motion: reduce` and provide an obvious static state.
- Avoid animating layout properties such as width, height, top, left, margin, and padding when transform/opacity can do the job.
- Do not add GSAP or Three.js unless a measured, clearly scoped, optional project demo needs it and a static fallback exists.

---

## 5. Site information architecture and page requirements

Keep the current public paths. New paths may be added, but existing ones must not change. The page names and navigation labels may be improved while retaining the old URLs.

### 5.1 Home `/`

Purpose: explain the person, specialization, and best work within a few seconds.

Suggested sections:

1. **Hero** — Name/brand, role, concise positioning, location only if the owner still wants it public, and primary actions: `Explore selected work`, `Read engineering notes`, `Contact`, `Résumé`.
2. **Capability strip** — Android, iOS, KMP/CMP, On-device AI, hardware/POS, commerce/payments, architecture/performance.
3. **Selected work** — AI Playground and VelociHue first, then commerce/hardware work if the owner approves and the details can be shared.
4. **Engineering approach** — Performance, privacy/offline-first, platform-native fidelity, adaptive UI, accessibility, and reliability.
5. **Writing** — The six-part Beyond the Model Series and latest articles.
6. **Experience snapshot** — Current position and a short career summary, after fact verification.
7. **Closing CTA** — Contact and résumé.

The homepage must not become a second copy of the full About and Portfolio pages. Use concise summaries and links.

### 5.2 About `/about/`

Purpose: tell the professional story and explain how Dhruv approaches engineering.

Suggested content groups:

- Professional introduction and current focus.
- Career timeline with roles and dates verified against the latest approved résumé.
- Engineering domains: Android, iOS, KMP, AI/edge, hardware, commerce/payments, web, leadership.
- Engineering principles: maintainability, performance, accessibility, privacy, native platform fidelity, testability, and thoughtful product collaboration.
- Community and speaking, with dated event names and proof links if available.
- Contact and résumé links.

Keep the current About aliases intact. Do not move `content/about.md` to a new content location.

### 5.3 Portfolio `/portfolio/`

Purpose: provide an overview of work and impact, not just a skill list.

Use a structured case-study index with a small curated set of entries. Distinguish:

- Professional/employer work.
- Personal products.
- Open-source work.
- Experiments/concepts.
- Community contributions.

A visitor must be able to tell which category a project belongs to. Never imply a concept or independent project was employer work, or imply employer work is fully public.

### 5.4 Projects `/projects/`

Purpose: serve project discovery and technical depth.

Create rich, scannable project sections or dedicated new case-study pages as appropriate. The existing `/projects/` path remains unchanged.

Recommended case-study structure:

1. Project name, category, role, project status, date range if public, and links.
2. One-sentence outcome-oriented summary.
3. Problem/context and target users.
4. Constraints: device capabilities, operating systems, offline requirements, memory, latency, network, hardware, privacy, or delivery constraints.
5. Dhruv's responsibilities versus team responsibilities.
6. Architecture overview and an accessible static diagram.
7. Key technical decisions and trade-offs.
8. Performance and reliability engineering.
9. Accessibility and adaptive UI decisions.
10. Outcome and verified impact metrics.
11. Screenshots, demo, store listing, code repository, article links, or sanitized artifacts.
12. What was learned and what remains next.

Recommended project groupings:

- **AI Playground:** flagship on-device AI architecture case study.
- **VelociHue:** KMP/CMP, cross-device game loop, sync, accessibility, Android TV, and D-pad behavior.
- **Digital commerce/payment experience:** describe the business/product context and verified engineering contribution without exposing private company implementation details.
- **POS/hardware integration:** show a sanitized architecture diagram, integration categories, reliability approach, and test strategy. Do not reveal customer credentials, network topology, device secrets, or confidential vendor information.
- **Open source:** link to public repositories and clearly state the exact contribution.

Do not create a page for every technology. Organize by problems solved and evidence.

### 5.5 Posts `/posts/`, series index and articles

Purpose: make technical writing enjoyable and easy to navigate.

Posts index:

- Clear title and one-line description.
- Search/filter only if the number of articles justifies it. For a small collection, simple category/year grouping is better.
- Series cards with article count and progress/order.
- Consistent dates, tags, reading time, and short summaries.

Article page:

- Excellent reading width (roughly 65–80 characters per line on desktop).
- Clear title, subtitle, date, reading time, and series/part indicator.
- Optional table of contents for long articles; never obstruct the reading flow.
- Proper heading hierarchy and anchor links.
- Code blocks with language labels, horizontal scrolling where necessary, and accessible copy controls.
- Screenshots and diagrams with meaningful alternative text and responsive sizes.
- Previous/next article links in the existing series order.
- Back-to-series and back-to-posts links.
- Print styles and visible citations/references.

**Do not move, rename, re-slug, reformat, or rewrite the six already published series articles in the visual template phases.**

### 5.6 Résumé `/resume.pdf`

- Keep the exact URL and PDF filename.
- Do not create a new URL and remove the old one.
- Validate the current PDF is reachable and opens after each deployment.
- Ensure the résumé link is clearly labelled and opens/downloads consistently.
- Replace PDF contents only after explicit owner approval of the new résumé.
- If the owner approves an HTML résumé page later, add it as a new route; do not replace the PDF URL.

### 5.7 Sitemap `/sitemap/` and `/sitemap.xml`

- Keep the human-readable sitemap at `/sitemap/`.
- Keep the XML sitemap at `/sitemap.xml` and verify it lists all intended public canonical pages.
- Do not expose draft/private pages or preview URLs in the production sitemap.
- Preserve the policy pages and article URLs.

### 5.8 Legal pages `/other/…`

Retain all current page URLs and text. Update only layout, spacing, typography, headings, and navigation. Do not alter legal wording, dates, or data-processing statements without owner approval.

### 5.9 Contact and external links

- Use clear `mailto:` and verified social/profile links.
- Test all outbound links. Use `target="_blank"` only where it improves the experience and always include safe `rel` attributes.
- Do not add a contact form unless a submission backend, spam protection, privacy notice, and success/error behavior are all defined. A reliable email link is enough for the first release.

---

## 6. Recommended technical architecture

### 6.1 Keep the existing stack

**Recommended production stack:**

- Hugo Extended/static generator (use the pinned repository version after local verification).
- Existing Markdown/TOML front matter content.
- Hugo project-level templates in `layouts/` to own the new design.
- Project-level CSS under `assets/` or the established location discovered in the repository.
- Small vanilla JavaScript modules only when necessary.
- Existing Netlify static hosting, deploy previews, security headers, and Edge Function behavior.
- GitHub as source of truth for content and code.

Avoid adding a client-side SPA framework. Server-side rendering is unnecessary for a personal portfolio/blog whose content changes with Git commits. Avoid an external database, API dependency, or paid headless CMS.

### 6.2 Theme strategy

The current theme is a Git submodule. Inspect its exact commit and current customization points first.

Preferred order:

1. Use project-level Hugo template overrides in `layouts/`.
2. Place project-owned CSS/JS/assets in project-owned folders.
3. Keep the upstream theme submodule unchanged wherever possible.
4. If an upstream template must be adapted, copy the minimal required template into the project-level override path and document the override.
5. Do not edit files inside the vendor theme submodule as the first option; submodule changes are harder to maintain and may disappear on update.
6. Do not remove the submodule or replace the theme until the local inventory proves it cannot support the intended design safely. If replacement becomes necessary, present evidence, migration cost, and route/data compatibility in the progress log before making that decision.

### 6.3 Asset approach

- Use responsive image variants: AVIF/WebP with a safe fallback where suitable.
- Supply `width`, `height`, `srcset`, and `sizes` to prevent layout shift and avoid oversized downloads.
- Lazy-load below-the-fold content images.
- Do not lazy-load the actual hero/LCP image; prioritize it appropriately.
- Use `decoding="async"` for non-critical images where appropriate.
- Keep logos/icons as optimized SVG or CSS, not icon-font downloads.
- Self-host any chosen fonts; ideally use a system font stack or one variable WOFF2 family. Do not fetch multiple font families from Google Fonts at runtime.
- Use actual product screenshots only when permitted. If a diagram is representative rather than an authentic screen, label it as such.
- Avoid autoplay video. Provide poster images and explicit play controls for optional demos.

### 6.4 CSS and responsive layout approach

- Mobile-first CSS.
- Fluid sizing using `clamp()`, `min()`, `max()`, and intrinsic grid/flex layouts.
- Use `max-width` for readable line length rather than fixed device widths.
- Use breakpoints where the content requires a layout change, not device brand/model detection.
- Avoid fixed heights for content sections.
- Avoid horizontal scrolling except intentional code/media containers.
- Support browser zoom to 200% and reflow at 320 CSS px.
- Add `viewport-fit=cover` only with safe-area-aware padding using `env(safe-area-inset-*)`.
- Keep a robust single-column fallback for every advanced layout.
- Use `@supports` for newer CSS, with a sensible base design if unsupported.

### 6.5 JavaScript policy

- JavaScript is progressive enhancement only.
- No JavaScript should be needed to read any page or navigate to a normal URL.
- Keep core interactive JavaScript small and dependency-free if possible.
- No blocking scripts in the head unless absolutely necessary.
- Use `defer` for non-critical scripts.
- Avoid hydration, runtime framework payloads, large animation packages, and client-side routing.
- If a mobile navigation toggle needs JavaScript, preserve keyboard accessibility, ARIA state, Escape-to-close, focus behavior, and a visible fallback navigation state.
- Any interaction must have a keyboard equivalent and work without hover.

### 6.6 Content authoring and management

**Default, zero-new-service workflow:**

- Keep articles as Markdown in the current `content/posts/` structure.
- Preserve the current bundle/file hierarchy and front matter patterns.
- Write a short `docs/HOW_TO_WRITE_ARTICLES.md` with examples taken from the actual repository structure.
- Add/maintain a Hugo archetype or a small script only after confirming how current posts are stored (single Markdown files vs leaf bundles).
- A new article should require only Markdown, front matter, and optional local images.
- A GitHub web edit on any browser/device should be able to update the Markdown file. Netlify deploys the commit automatically.
- Explain how to create an article, preview locally, check links, commit, and publish.

**Optional browser CMS:** Decap CMS may be evaluated after the route baseline and content schema are stable. It integrates with Git workflows, but its GitHub backend requires an authentication service/OAuth setup and users require write access. Netlify Identity/Git Gateway instructions found in older setup guides must be checked against the currently available Netlify account features before use. Do not assume an auth feature exists or is free. Keep the CMS out of the critical first release unless the login/authentication and content path behavior are proven in a deploy preview.

If a CMS is approved:

- Add it at a new `/admin/` route without changing any public article routes.
- Configure it to the existing repository and `master` branch unless the real default branch has changed.
- Map collections to the existing content paths; do not move articles.
- Set article slug/path generation to match the established URL convention.
- Configure images/media to existing safe locations and verify generated public URLs.
- Test creating an unpublished draft and editing an existing post in a non-production branch first.
- Use invite-only access; never enable open public registration for a personal-site CMS.
- Ensure CMS-generated commits trigger the same Netlify deploy-preview workflow.
- Keep GitHub editing as a fallback if CMS authentication breaks.

---

## 7. Responsive and device support requirements

The requirement is not “make a desktop page shrink on mobile.” The layout must be genuinely adaptive to available space, orientation, aspect ratio, input method, and user preferences.

### 7.1 Minimum viewport and layout test matrix

Use Playwright viewport tests and manual device/emulator checks where available. Suggested test sizes are CSS viewport dimensions, not physical panel resolution.

| Device class | Test viewport(s) | Expected behavior |
|---|---:|---|
| Very small/older phone | 320×568, 320×640 | No horizontal page overflow; text wraps; content and navigation remain usable. |
| Compact Android phone | 360×640, 360×800 | Single-column layout; touch-friendly controls; light media loading. |
| Standard phones | 375×667, 390×844, 412×915, 430×932 | Stable hero, cards, article text, and navigation. |
| Tall / narrow / flip outer screen | 344×720, 360×800 | No cramped side-by-side layout; sensible stacking and concise nav. |
| Foldable inner display | 768×1024, 884×1104, 1070×1280 | Adaptive content grid; optional two-column layout only when it remains readable. |
| Foldable landscape / tabletop | 1024×768, 1280×800, 1280×720 | Responsive to short height; avoid fixed-height hero or oversized header. |
| Tablet portrait/landscape | 768×1024, 820×1180, 1024×768 | Balanced reading widths and card density. |
| Laptop/old computer | 1024×768, 1280×720, 1366×768 | Must look complete without requiring large display pixels or GPU effects. |
| Desktop | 1440×900, 1920×1080 | Controlled line length; generous whitespace; no stretched paragraphs. |
| 4K / TV browser | 1920×1080, 2560×1440, 3840×2160 | Legible from a distance; navigation and links reachable with remote/keyboard focus. |
| Ultrawide | 2560×1080, 3440×1440 | Content width remains bounded; no excessively long lines or stretched card layouts. |
| Landscape phone / short-height window | 667×375, 844×390, 915×412 | Navigation and main content remain visible; no clipped hero or forced portrait assumptions. |

Also test representative aspect ratios including 1:1, 3:4, 4:3, 9:16, 16:9, 18:9, 19.5:9, 21:9, and ultrawide.

### 7.2 Foldables and hinge-aware layout

- Default to a normal responsive grid that works when the screen is seamless, split, or the hinge data is unavailable.
- Never put a button, heading, body-text column, or essential interaction across a physical hinge.
- If supported, use CSS viewport-segment environment variables and `horizontal-viewport-segments`/`vertical-viewport-segments` to adjust a two-segment layout.
- Gate any fold-specific behavior behind feature detection and `@supports`.
- Use the single-screen layout on browsers that do not expose viewport segments.
- Test folded/closed outer screen and unfolded/landscape inner screen separately.
- Do not depend on the experimental `device-posture` API to decide whether core content is shown.

### 7.3 Android TV and large-display behavior

- Use readable text and high-contrast surfaces suitable for a 10-foot viewing distance.
- Every link/control must be reachable through sequential keyboard navigation and visible focus; this is the safest web equivalent for D-pad use.
- Do not rely on hover for revealing controls or content.
- Avoid small icon-only actions and tiny metadata.
- Maintain landscape and portrait support where browser/window orientation allows it.
- Use generous focus indicators and avoid focus being obscured by sticky headers.
- Do not add app-like remote event handling unless browser testing proves it is needed; semantic links and controls should work naturally first.

### 7.4 Old/low-powered devices and browsers

- Core content must work without WebGL, WebGPU, canvas, large animation libraries, or advanced CSS features.
- Provide static image/diagram fallbacks.
- Keep the page readable if JavaScript is disabled or fails.
- Use feature detection rather than user-agent sniffing.
- Use robust system-font fallbacks.
- Test CPU-throttled browser profiles and a slow network profile.
- Test at least the current and previous two major versions of Chrome/Edge, Firefox, and Safari where automation is available. For older browsers outside this supported range, preserve graceful degradation rather than promising full support.

---

## 8. Accessibility requirements — WCAG 2.2 AA baseline

Accessibility must be built into every template, not added after the visual design is finished.

### 8.1 Structure and semantics

- One clear page-level `<h1>` per page (unless there is a documented exception).
- Logical heading hierarchy (`h1` → `h2` → `h3`); do not select heading tags only for font size.
- Use semantic `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`, `<section>`, `<figure>`, and `<time>` where they fit.
- Add a visible-on-focus skip link to the main content.
- Use real anchors for navigation and real buttons for actions.
- Add descriptive accessible names for icon-only buttons; decorative icons must be `aria-hidden="true"`.
- Add meaningful `alt` text to informative images and empty alt text to decorative images.
- Mark the document language accurately.

### 8.2 Keyboard and focus

- All functionality must be keyboard operable.
- Focus order follows visual/reading order.
- Focus rings must be visible, high-contrast, and not clipped.
- Do not remove browser outlines without an accessible replacement.
- No keyboard traps.
- Dropdown/mobile navigation opens, closes, and restores focus correctly; Escape closes overlay menus.
- Code copy buttons and other controls must expose an accessible name and status feedback.
- Focus must not be hidden behind a sticky header or fixed footer.

### 8.3 Visual accessibility

- Meet WCAG AA contrast for text and interactive elements.
- Never communicate meaning through color alone.
- Body text should be comfortable to read and should not use low-contrast gray for essential information.
- Support zoom and text resize without clipped controls or hidden content.
- Content must reflow at 320 CSS px without a two-dimensional page scroll, except where a code/media region inherently needs horizontal scrolling.
- Touch targets should aim for at least 44×44 CSS px, with adequate spacing.
- Honor `prefers-reduced-motion` and `forced-colors`.
- Avoid flashing or aggressive screen movement.

### 8.4 Article accessibility

- Code blocks must be readable at zoom and have a sensible keyboard scroll behavior.
- Tables must have proper header cells/captions where appropriate; use a mobile overflow wrapper only if the data requires it.
- Links must make sense out of context (avoid repeated “click here”).
- Long article TOCs must be keyboard navigable and not overtake screen-reader reading order.
- Captions and image alternatives must explain technical diagrams, not just say “image”.

### 8.5 Accessibility testing

- Run axe-core on all major template types using Playwright.
- Run automated checks against WCAG 2.2 AA rules.
- Manually test keyboard-only navigation, zoom, reduced motion, high contrast/forced colors where possible, and a screen reader (VoiceOver on macOS/iOS, NVDA on Windows, or equivalent).
- Automated accessibility tools catch only part of the problem; record manual testing separately.
- Target zero critical/serious accessibility violations. Any exception must have a documented reason and remediation issue.

---

## 9. Performance, loading, and technical quality budgets

The target is fast on a low-end Android device, an older laptop, and a slow connection—not only on a developer MacBook.

### 9.1 Core Web Vitals targets

Use Google's current Core Web Vitals thresholds, measured at the 75th percentile where field data exists:

| Metric | Good target | How to interpret |
|---|---:|---|
| LCP | ≤ 2.5 s | Main content should appear quickly. |
| INP | ≤ 200 ms | Interactions should respond quickly. |
| CLS | ≤ 0.1 | Content should not jump during load or interaction. |

### 9.2 Lighthouse acceptance targets

Run Lighthouse on the home page and at least one representative page for each distinct template: About, Portfolio, Projects, Article, Series index, Legal, and Sitemap.

| Lighthouse category | Mobile target | Desktop target |
|---|---:|---:|
| Performance | ≥ 90 (stretch 95+) | ≥ 95 |
| Accessibility | 100 target | 100 target |
| Best Practices | ≥ 95 | ≥ 95 |
| SEO | 100 target | 100 target |

Scores are lab indicators and can vary with Chrome version, test conditions, server/network state, and Lighthouse updates. Record the exact test date, browser/tool version, URL, run conditions, and report artifact. Do not claim a score without a saved report.

### 9.3 Practical budgets

Use these as initial guardrails. Record actual baseline sizes first and adjust only with a written reason.

- No client-side framework runtime on standard portfolio/article pages.
- Target initial custom JavaScript ≤ 30 KB gzip for the normal page experience; less is better.
- Target critical CSS ≤ 50 KB gzip. Split optional article-specific code only when it materially helps.
- Target first-view mobile transfer ≤ 750 KB on the homepage, excluding user-triggered video/demo downloads.
- Target a single hero/LCP image ≤ 200 KB where practical, with multiple responsive dimensions and AVIF/WebP.
- Keep font payload to system fonts or one carefully subsetted family; avoid downloading multiple weights that are never used.
- Avoid third-party scripts unless they serve a verified purpose. Measure analytics/embeds separately.
- No render-blocking third-party animation SDKs.
- Reserve image/video dimensions to prevent CLS.
- No autoplaying video/audio.
- Do not preload every font or image; preload only the resource that materially affects LCP.

### 9.4 Performance test conditions

Measure at least:

- Cold first visit and repeat visit.
- Mobile/low-end CPU throttling (e.g., 4× and 6× slowdown in a controlled browser profile).
- Slow 4G and/or Fast 3G simulation.
- JS disabled.
- Reduced motion enabled.
- Desktop and mobile.
- Long technical article with code blocks and images.
- Large 4K/TV viewport.

### 9.5 Tools and reports

Run and record:

- **Lighthouse CI** in GitHub Actions or equivalent CI, against deploy previews.
- **PageSpeed Insights** for lab data and field/Core Web Vitals where CrUX data exists: <https://pagespeed.web.dev/>.
- **WebPageTest** for waterfall, filmstrip, TTFB, LCP, total blocking time, request count, and cache behavior: <https://www.webpagetest.org/>.
- **Chrome DevTools Performance/Network** for diagnosing the actual slow resource or long task.
- **axe-core + Playwright** for automated accessibility checks.
- **W3C Nu HTML Checker** for HTML validation: <https://validator.w3.org/nu/>.
- **Link checker** such as Lychee or an equivalent crawler for internal/external links; distinguish real broken links from external rate limits or redirects.
- **SecurityHeaders** or Mozilla Observatory as an additional header review, not as a replacement for reviewing actual Netlify headers.

Save reports under a non-public folder such as `artifacts/website-audit/<date>/` only if the repository's policy permits reports. If artifacts are too large, retain the CI URL and summary in the progress log instead of committing every binary report.

---

## 10. SEO, sharing, and discoverability requirements

- Unique page title and meta description for every public route.
- Stable canonical URLs using `https://deardhruv.com` and the exact current path.
- Correct Open Graph and social preview metadata.
- A useful social image that is optimized for sharing and does not slow down the actual page.
- `Person`, `WebSite`, `Article`/`BlogPosting`, and `BreadcrumbList` structured data only where accurate and schema-valid.
- Article dates must reflect real publication/update dates; do not set the current date just to look fresh.
- Add descriptive headings and internal links between projects and related articles.
- Preserve `sitemap.xml`, robots behavior, RSS/JSON feeds, Markdown outputs, `llms.txt`, and content-negotiation behavior.
- Keep preview/deploy URLs out of the production sitemap and avoid indexing draft content.
- Verify favicon, theme color, web app metadata if currently present, and social cards.
- Do not add keywords meta tags as a substitute for high-quality page content.
- Validate structured data with Google's Rich Results Test or schema validator where applicable.

---

## 11. Security, privacy, and maintenance

- Keep secrets and OAuth credentials out of the repository and generated static output.
- Do not add unneeded third-party scripts, trackers, embeds, or remote fonts.
- Review CSP script/style/connect/font/image sources against actual required resources.
- Prefer self-hosted assets and external scripts with integrity protection where applicable.
- Keep HSTS and HTTPS behavior intact. Verify all HTTP URLs redirect to HTTPS.
- Keep `X-Content-Type-Options: nosniff` and a sensible `Referrer-Policy`.
- Review `X-Frame-Options`/`frame-ancestors` carefully; preserve existing protection unless an intentionally embedded feature requires a safe exception.
- Review obsolete headers and current browser behavior, but do not change header policy without an explicit test.
- Keep Netlify Edge Function behavior and cache semantics tested.
- Use `rel="noopener noreferrer"` when opening new tabs.
- Use only consent-compliant analytics. Verify the existing GA4 property and current privacy/consent obligations before changing analytics.
- No payment processing, payment form, newsletter system, or user-data form is part of this project by default. Payment integration work is shown as a case study, not as a live checkout feature.

---

## 12. URL and content preservation contract — release blocker

**This is the highest-priority non-functional requirement.** Existing public URLs have been shared externally. A visually perfect site that breaks one article or legal URL is not an acceptable result.

### 12.1 Mandatory route inventory

Before changing any route, create:

- `docs/URL-MANIFEST.md` — a readable human-maintained manifest.
- `tests/fixtures/legacy-routes.json` (or a CSV equivalent) — a machine-readable route list for automated checks.

Capture the full inventory from all of the following sources:

1. Production `sitemap.xml`.
2. Human-readable `/sitemap/` page.
3. Crawling all internal links from the home page and every discovered page.
4. Git-tracked content files and Hugo front matter (`aliases`, `slug`, `url`, `outputs`, `type`, `layout`, `draft`, etc.).
5. `netlify.toml` redirect/header/edge-function rules.
6. Existing generated output files such as `/index.json`, `/index.md`, RSS, and policy resources.
7. Public static files, especially `resume.pdf` and any images/documents linked from articles.
8. Search Console/analytics landing-page exports if the owner has them available. Do not block the first audit if they are unavailable.

For each route, record:

- Exact path and trailing-slash convention.
- Route type (HTML page, article, PDF, image/file, feed, JSON, Markdown, well-known endpoint, alias, redirect).
- Current status code.
- Content type.
- Canonical URL, if applicable.
- Whether it is linked from a page or generated by an output format.
- Any redirect target and redirect status.
- The source file(s) that create it.

### 12.2 Known routes from public inspection

These are known routes, not a complete substitute for the local manifest. Add any missing ones discovered in the repository.

```text
/
/about/
/about-us/
/about-hugo/
/contact/
/portfolio/
/projects/
/posts/
/posts/ai_playground_series/
/posts/ai_playground_series/01-i-wanted-the-model-to-stay-on-the-phone/
/posts/ai_playground_series/02-the-day-a-chat-box-became-a-document-engine/
/posts/ai_playground_series/03-the-model-was-fine-the-phone-wasnt/
/posts/ai_playground_series/04-i-put-an-image-generator-inside-the-phone/
/posts/ai_playground_series/05-at-some-point-i-stopped-building-a-chat-app/
/posts/ai_playground_series/06-pushing-mobile-hardware-to-the-edge/
/sitemap/
/sitemap.xml
/resume.pdf
/other/
/other/ai-playground/
/other/ai-playground/privacy-policy-ai-playground-app/
/other/ai-playground/terms-ai-playground-app/
/other/open-store-app/
/other/open-store-app/privacy-policy-open-store-app/
/other/open-store-app/terms-open-store-app/
/other/veloci-hue/
/other/veloci-hue/privacy-policy-veloci-hue-game/
/other/veloci-hue/terms-veloci-hue/
/index.json
/index.md
/feed.json
/llms.txt
/auth.md
/.well-known/api-catalog
/.well-known/mcp.json
/.well-known/oauth-protected-resource
/.well-known/oauth-authorization-server
/.well-known/openid-configuration
```

### 12.3 Strict preservation rules

- Do not rename or move existing Markdown articles.
- Do not change any established URL slug, front matter `url`, or `aliases` values.
- Do not change the site base URL.
- Do not remove the current Markdown output formats or the Netlify Edge Function.
- Do not change the published `/resume.pdf` URL.
- Do not remove legal pages or their exact URL paths.
- Do not replace `/portfolio/` with `/projects/` or vice versa; they are both published paths and serve distinct content.
- Do not change the default production branch or Netlify publish directory unless a verified blocker requires it.
- If a route absolutely must change, the owner must approve it first; implement a permanent `301` or `308` redirect from the old path to the new canonical path, test the redirect, and keep it indefinitely. This is an exception, not the normal migration strategy.
- Preserve query handling where relevant and avoid broad wildcard redirects that mask genuine missing pages.

### 12.4 Route parity automation

Before release:

- Build the redesigned site and serve it through a local preview/Netlify-compatible environment.
- Check every route in `legacy-routes.json`.
- Confirm each expected HTML path serves `200` or its baseline status/redirect behavior.
- Confirm `/resume.pdf` returns a valid PDF content type and non-empty PDF file.
- Confirm `/feed.json` resolves to the intended JSON response and retains its current redirect/rewrite semantics.
- Confirm `/index.json`, `/index.md`, `/sitemap.xml`, `/llms.txt`, `/auth.md`, and `/.well-known/*` endpoints behave as before wherever they currently exist.
- Confirm the Markdown Edge Function returns Markdown on an `Accept: text/markdown` request and HTML on a normal browser request.
- Compare the old and new sitemap URL sets. Any unexpected removed URL is a hard failure.
- Run an internal-link crawler against the generated HTML. Every internal link must resolve to an intended destination.

---

## 13. Small-phase implementation plan

The work is deliberately split into small tasks. **Each task is its own commit** after the task-level tests pass. Do not start a new phase while its exit criteria are failing.

### Phase 0 — Safety, branch, and baseline capture

**Goal:** Make the current site reproducible and protected before any visual changes.

**Task 0.1 — Repository safety check**

- Verify `git status`, current branch, current commit hash, submodule status, and Netlify production branch.
- Confirm working tree cleanliness. Do not discard any existing local changes.
- Create a feature branch from the current production branch.
- Record local tool versions: Hugo, Go if relevant, Node, npm, Git, Netlify CLI, browser versions.
- **Commit:** `docs(site): record baseline repository state`

**Task 0.2 — Reproduce current build**

- Initialize/update the theme submodule using the exact Git submodule state expected by the repo.
- Run `hugo --gc --minify` using the pinned version.
- Verify output in `public/` and inspect build warnings/errors.
- Launch local site and verify the main routes.
- Save command output and baseline notes in the progress log.
- **Commit:** `test(site): document current Hugo build baseline`

**Task 0.3 — Capture current screenshots and performance**

- Capture desktop and mobile screenshots for home, About, Portfolio, Projects, Posts, one article, Series index, one legal page, and Sitemap.
- Run Lighthouse/PSI baseline on production URLs where available.
- Do not optimize yet. Preserve baseline reports so improvements can be compared.
- **Commit:** `test(site): capture pre-redesign visual and performance baseline`

**Task 0.4 — Freeze the legacy URL manifest**

- Crawl production and inspect the entire content tree/front matter/Netlify config.
- Produce the human-readable and machine-readable route manifests.
- Record HTTP status/content type and redirects.
- Include all exact article paths and all discovered aliases.
- **Commit:** `test(site): add legacy URL compatibility manifest`

**Phase 0 exit criteria:** Current production build reproduced; no changes to published content; route manifest exists; desktop/mobile screenshots and baseline performance reports saved; the feature branch is clean and ready.

### Phase 1 — Full repository and design audit

**Goal:** Understand how the current Hugo theme, layouts, assets, and Netlify functions are wired together.

**Task 1.1 — Inspect source architecture**

- Read `config.toml`, `netlify.toml`, README/quick-start, `.gitmodules`, and all tracked custom layouts, assets, static files, and Edge Functions.
- Identify the actual path for custom CSS/JS. Note that the public config references `css/custom.css`; verify whether this file exists and where the theme expects it.
- Inspect theme submodule version and overrides. Do not modify vendor theme code.
- **Commit:** `docs(site): document Hugo layout and dependency architecture`

**Task 1.2 — Content and metadata inventory**

- Enumerate every content Markdown file and extract title, date, description, URL/slug, aliases, tags, categories, layout, outputs, draft status, and parent/series relationship.
- Create an article/content index.
- Verify all images and files referenced in Markdown exist.
- **Commit:** `docs(content): inventory published pages and article metadata`

**Task 1.3 — Integration and risk map**

- Document Netlify redirects, Edge Function behavior, response headers, content negotiation, analytics, feeds, sitemap, static files, and machine-readable endpoints.
- Add explicit regression tests or a checklist for each.
- Record security and external dependencies.
- **Commit:** `docs(site): map Netlify integrations and release risks`

**Phase 1 exit criteria:** Gemini can explain how each current route is rendered, where its source content lives, what integration serves it, and how the current site is deployed.

### Phase 2 — Information architecture and content decisions

**Goal:** Improve discovery without changing old URLs or inventing facts.

**Task 2.1 — Navigation and page hierarchy**

- Propose final labels and navigation order while retaining all existing paths.
- Ensure `/portfolio/` and `/projects/` remain separate, useful pages.
- Keep Posts and series pages easy to find.
- Record any planned new routes separately from the legacy path list.
- **Commit:** `docs(content): define portfolio information architecture`

**Task 2.2 — Evidence and content audit**

- Build a table of every quantitative claim and factual assertion found in About, Portfolio, Projects, and the résumé.
- Mark claims as: supported by public artifact, owner confirmation required, confidential/omit, outdated, or safe to retain.
- Do not silently update experience, current employer, dates, metrics, or tool versions.
- **Commit:** `docs(content): add claim verification checklist`

**Task 2.3 — Page wireframes**

- Create low-fidelity wireframes for Home, About, Portfolio, Projects, Posts, Article, Series, Legal, and Sitemap.
- Wireframes must include phone, tablet/foldable, desktop, and TV/large-display states.
- Validate information hierarchy before building polished visuals.
- **Commit:** `docs(design): add responsive page wireframes`

**Phase 2 exit criteria:** Page roles, copy priorities, content categories, and proposed new components are approved in the project documentation. No old content URL changes.

### Phase 3 — Design tokens and visual foundation

**Goal:** Establish a small maintainable design system.

**Task 3.1 — Color/type/spacing tokens**

- Define semantic CSS custom properties for surfaces, text, borders, accent, focus, success/warning/error, spacing, radii, shadows, and motion.
- Check text/background combinations against WCAG AA.
- Define typography scale with fluid `clamp()` values and comfortable line lengths.
- **Commit:** `style(site): define accessible design tokens`

**Task 3.2 — Typography and fonts**

- Prefer system fonts or one self-hosted variable WOFF2 family.
- Include appropriate fallback stacks and font-display behavior.
- Add only the font weights/styles that are actually used.
- Ensure text remains legible before custom fonts load.
- **Commit:** `style(site): add efficient typography system`

**Task 3.3 — Core layout primitives**

- Add reusable container, section, grid, stack, flow, card, button, metadata, badge/tag, and divider styles.
- Use intrinsic layout behavior and bounded reading widths.
- Verify the base CSS with no JavaScript and at 320px width.
- **Commit:** `style(site): add reusable responsive layout primitives`

**Phase 3 exit criteria:** A documented, responsive, accessible design system exists without importing a large frontend library.

### Phase 4 — Site shell, header, navigation, footer

**Goal:** Replace the generic shell while keeping navigation stable and intuitive.

**Task 4.1 — Base page template**

- Add/override the minimum required Hugo base layout in the project `layouts/` directory.
- Ensure metadata, language, viewport, canonical URL, skip link, `header`, `main`, and `footer` are included.
- Preserve Hugo template/output behavior for HTML, RSS, JSON, and Markdown.
- **Commit:** `feat(site): add project-owned base layout`

**Task 4.2 — Responsive header/navigation**

- Build desktop, mobile, touch, keyboard, and TV-friendly navigation.
- Use semantic anchors and a real button for toggle behavior.
- Add visible focus indicators and Escape-to-close where a menu overlay is used.
- Preserve all main nav routes.
- **Commit:** `feat(site): build accessible responsive navigation`

**Task 4.3 — Footer and social/contact links**

- Build a compact footer with verified links, copyright/license, and useful routes.
- Avoid icon-only unlabeled links.
- Preserve the current license notice and check the correct profile URLs.
- **Commit:** `feat(site): add responsive footer and contact links`

**Phase 4 exit criteria:** Every page has a shared shell, navigable via keyboard/touch/remote, and the existing navigation URLs remain unchanged.

### Phase 5 — Homepage redesign

**Goal:** Turn the homepage into a strong entry point without excessive visual weight.

**Task 5.1 — Hero and identity**

- Implement the hero from the approved positioning and owner-verified content.
- Add clear Work, Writing, Contact, and Résumé actions.
- Keep text readable before any JS runs.
- **Commit:** `feat(home): add engineering-focused hero`

**Task 5.2 — Capabilities and selected work**

- Add concise capability categories and selected project cards.
- Prioritize flagship personal products and only approved professional project summaries.
- Provide genuine project visuals or clearly labelled representative diagrams.
- **Commit:** `feat(home): add selected work and capability sections`

**Task 5.3 — Writing and closing CTA**

- Surface the existing Beyond the Model series and latest writing.
- Add a concise closing contact section.
- **Commit:** `feat(home): add writing highlights and contact CTA`

**Phase 5 exit criteria:** Home has a clear first-screen narrative, fast content rendering, no large background media, and all links work.

### Phase 6 — About, experience, and skills

**Goal:** Make expertise and professional history easy to scan.

**Task 6.1 — About page template**

- Apply the new template to existing `/about/` content.
- Retain all aliases and verify they still serve their expected pages.
- **Commit:** `feat(about): modernize profile page template`

**Task 6.2 — Experience timeline and capabilities**

- Add an accessible timeline and grouped capabilities using owner-verified facts.
- Avoid skill percentage/progress bars unless there is a meaningful metric.
- **Commit:** `feat(about): add experience timeline and skill groups`

**Task 6.3 — Community, speaking, and résumé actions**

- Organize speaking/community content with clear dates and links.
- Keep `/resume.pdf` unchanged.
- **Commit:** `feat(about): improve speaking and résumé discovery`

**Phase 6 exit criteria:** About content is easy to scan, all facts are checked, and aliases remain intact.

### Phase 7 — Portfolio and project case studies

**Goal:** Demonstrate the depth of work with strong evidence and clear separation of work categories.

**Task 7.1 — Portfolio overview**

- Modernize `/portfolio/` without changing the source path.
- Add category labels for professional, personal, open source, and community contributions.
- **Commit:** `feat(portfolio): redesign work overview`

**Task 7.2 — Project-card component**

- Build reusable project cards with title, role, short outcome, platform tags, status, and links.
- Cards must be keyboard-accessible and not depend on hover.
- **Commit:** `feat(projects): add accessible reusable project cards`

**Task 7.3 — AI Playground and VelociHue detail**

- Give flagship projects a case-study structure using verified content already available in public project/article sources.
- Use architecture diagrams and screenshots where available and safe.
- Cross-link the existing six-part article series.
- Do not move existing article routes.
- **Commit:** `feat(projects): expand flagship product case studies`

**Task 7.4 — Commerce and hardware work**

- Create concise, sanitized case-study sections for commerce/payment and POS/hardware integration only with owner-approved descriptions.
- Make confidentiality boundaries explicit.
- **Commit:** `feat(projects): add commerce and hardware case studies`

**Task 7.5 — Open source and work archive**

- Add public repository links and separate active work from archived work.
- **Commit:** `feat(portfolio): add open-source and archive sections`

**Phase 7 exit criteria:** A visitor can identify each project's category, Dhruv's role, the problem, and the evidence. No unsupported metrics or confidential project details are published.

### Phase 8 — Blog, series, and article reading experience

**Goal:** Improve reading experience without changing the articles or their paths.

**Task 8.1 — Posts index**

- Redesign `/posts/` with readable list/grid and series cards.
- Preserve article links and date metadata.
- **Commit:** `feat(blog): redesign posts index`

**Task 8.2 — Series landing page**

- Modernize `/posts/ai_playground_series/` with the six parts, reading order, progress, summaries, and links.
- Preserve all exact article URLs.
- **Commit:** `feat(blog): improve engineering series landing page`

**Task 8.3 — Article template**

- Add article typography, metadata, series navigation, code-block styles, responsive media, and related links.
- Confirm Markdown and syntax-highlighting output still works.
- **Commit:** `feat(blog): add modern long-form article layout`

**Task 8.4 — Table of contents and copy controls**

- Add TOC only where useful and accessible.
- Add optional code copy controls with keyboard operation and live status feedback.
- **Commit:** `feat(blog): add accessible article utilities`

**Phase 8 exit criteria:** All six published articles render and link correctly at desktop, mobile, keyboard, and reduced-motion settings. No article route changes.

### Phase 9 — Sitemap, legal pages, and document details

**Goal:** Complete all long-tail public routes and policy pages.

**Task 9.1 — Legal page templates**

- Apply a clean reading template to the six policy pages.
- Preserve exact legal content and paths.
- **Commit:** `style(legal): modernize policy page templates`

**Task 9.2 — Sitemap pages and XML output**

- Improve `/sitemap/` presentation.
- Ensure `/sitemap.xml` includes all valid public canonical URLs.
- **Commit:** `feat(seo): improve sitemap and route discovery`

**Task 9.3 — Resume and static documents**

- Verify `/resume.pdf` and all linked documents/assets.
- Improve the visual treatment of the link only; replace the file only after owner approval.
- **Commit:** `test(site): verify resume and downloadable assets`

**Phase 9 exit criteria:** All legal, sitemap, PDF, and static file paths are intact and readable.

### Phase 10 — Article authoring and optional CMS

**Goal:** Make future updates straightforward from anywhere.

**Task 10.1 — Article-writing documentation**

- Write `docs/HOW_TO_WRITE_ARTICLES.md` from the real content structure.
- Include front matter examples, image guidance, link checking, preview commands, commit procedure, and deployment steps.
- **Commit:** `docs(content): add article authoring guide`

**Task 10.2 — New-article helper**

- Add a Hugo archetype or helper script only after confirming the exact established article storage model and slug rules.
- Ensure it creates a draft under the correct path and does not overwrite existing content.
- **Commit:** `feat(content): add safe new article workflow`

**Task 10.3 — CMS feasibility decision**

- Compare GitHub web editor and Decap CMS for actual ease of use, hosting cost, authentication, image upload path, and current Netlify compatibility.
- Document the decision. Do not add a CMS if it introduces a paid requirement or unreliable OAuth dependency.
- **Commit:** `docs(content): record CMS decision and trade-offs`

**Task 10.4 — Optional Decap CMS implementation**

- Only execute if task 10.3 demonstrates a low-cost, supported auth path and owner approval is available.
- Build `/admin/` with invite-only access.
- Map content to existing paths and verify that editing a post does not change its URL.
- Test edits/drafts in a deploy preview before publishing.
- **Commit:** `feat(cms): add Git-backed content editor` (only if approved)

**Phase 10 exit criteria:** The owner has a documented, tested article publishing workflow. CMS is optional, not required for release.

### Phase 11 — Responsive, orientation, foldable, and TV adaptation

**Goal:** Verify every template against the broad device and aspect-ratio requirement.

**Task 11.1 — Viewport smoke tests**

- Add Playwright viewport coverage for the test matrix in Section 7.
- Detect horizontal overflow and clipped elements.
- **Commit:** `test(responsive): cover phone tablet desktop and TV viewports`

**Task 11.2 — Orientation and short-height fixes**

- Test portrait and landscape on phone, foldable, tablet, and resized desktop window.
- Fix fixed-height assumptions and navigation overflow.
- **Commit:** `fix(responsive): support landscape and short-height windows`

**Task 11.3 — Foldable enhancement and fallback**

- Add optional hinge/viewport-segment support only if browser testing proves it can be done safely.
- Ensure the normal responsive layout is still the default fallback.
- **Commit:** `feat(responsive): add progressive foldable viewport enhancement`

**Task 11.4 — TV and remote navigation**

- Test D-pad/keyboard sequential focus and 10-foot readability.
- Improve focus outlines, text sizes, and link spacing where required.
- **Commit:** `fix(responsive): improve large-screen and TV navigation`

**Phase 11 exit criteria:** All screen classes work without horizontal page overflow, hidden content, unreadable text, or inaccessible navigation.

### Phase 12 — Motion and interaction polish

**Goal:** Add motion that improves perceived quality without compromising access or speed.

**Task 12.1 — Motion tokens and reduced-motion path**

- Define a small duration/easing set.
- Add `prefers-reduced-motion` rules.
- Verify that all content remains visible without animation or JavaScript.
- **Commit:** `style(motion): add purposeful accessible motion system`

**Task 12.2 — Hover, focus, and touch feedback**

- Apply subtle interactive states to links, cards, buttons, and navigation.
- Ensure touch and keyboard feedback is as strong as hover feedback.
- **Commit:** `style(interactions): polish hover focus and touch states`

**Task 12.3 — Optional visual experiment review**

- Review whether any optional 3D or canvas experience adds real value.
- Default answer should be no for the home page. Any proposed demo needs a user-triggered launch, static screenshot fallback, performance budget, keyboard alternative, and reduced-motion behavior.
- **Commit:** `docs(design): record optional interaction experiment decision`

**Phase 12 exit criteria:** Motion is purposeful, optional, and does not cause layout shifts or CPU-heavy idle work.

### Phase 13 — SEO, social cards, structured data, feeds, and headers

**Goal:** Improve discoverability while keeping machine-readable output intact.

**Task 13.1 — Metadata and canonical URLs**

- Add unique title/description/canonical/social metadata to all major pages.
- Preserve existing canonical paths and article dates.
- **Commit:** `feat(seo): add page metadata and canonical tags`

**Task 13.2 — Structured data and social images**

- Add accurate Person, WebSite, BlogPosting/Article, and BreadcrumbList markup where useful.
- Validate JSON-LD and social preview metadata.
- **Commit:** `feat(seo): add structured data and social cards`

**Task 13.3 — Feeds and Markdown output regression**

- Confirm RSS, JSON, Markdown, `feed.json`, Edge Function, `llms.txt`, and `.well-known` resources still work.
- Add missing tests without removing existing features.
- **Commit:** `test(seo): cover machine-readable website endpoints`

**Task 13.4 — Security header review**

- Audit CSP and other headers against actual deployed resources.
- Tighten policy carefully and test every route and deploy preview.
- **Commit:** `security(site): review and harden Netlify headers`

**Phase 13 exit criteria:** Metadata validates and all legacy machine-readable endpoints continue working.

### Phase 14 — Automated tests and visual regression

**Goal:** Establish a reliable test suite so future small changes do not break the website.

**Task 14.1 — Test harness**

- Add minimal dev-only test dependencies if needed; avoid shipping test libraries to visitors.
- Use Playwright for browser tests and screenshots.
- Use axe-core for automated accessibility checks.
- Create reusable URL and viewport fixtures from the route manifest.
- **Commit:** `test(site): set up Playwright and axe test harness`

**Task 14.2 — Functional route tests**

- Open all legacy routes.
- Check correct page title, main heading, canonical URL, internal links, and asset loads.
- Validate PDF, RSS, JSON, Markdown, and redirects in separate assertions.
- **Commit:** `test(routes): add legacy route regression suite`

**Task 14.3 — Visual regression suite**

- Capture deterministic screenshots for each major template at narrow, medium, desktop, and TV widths.
- Use stable fonts/images and disable nondeterministic transitions in screenshot mode.
- Set a sensible pixel-diff threshold and manually review every approved baseline update.
- **Commit:** `test(visual): add responsive screenshot regression suite`

**Task 14.4 — Accessibility regression suite**

- Add axe scans for each template.
- Include tests for skip link, focus visibility, navigation button state, keyboard traversal, headings, image alt text, and reduced motion.
- **Commit:** `test(a11y): add automated accessibility regression suite`

**Task 14.5 — Link and HTML validation**

- Add an HTML validator and link checker workflow.
- Separate broken internal links from external services that rate-limit or block crawlers.
- **Commit:** `test(site): validate markup and internal external links`

**Phase 14 exit criteria:** CI runs Hugo build, route checks, visual screenshots, accessibility scans, and link/HTML validation. Failures block merge.

### Phase 15 — Performance audit and optimization

**Goal:** Measure the redesigned site under repeatable conditions and optimize based on evidence.

**Task 15.1 — Lighthouse CI and performance budgets**

- Configure Lighthouse CI for production-like deploy previews.
- Set budgets from Section 9.
- Run against the home page and each major template type.
- **Commit:** `test(perf): add Lighthouse CI and budgets`

**Task 15.2 — Diagnose and fix the largest costs**

- Use Network/Performance traces to identify slow images, fonts, JavaScript, CSS, external requests, and long tasks.
- Optimize the largest verified costs first.
- **Commit:** `perf(site): optimize measured critical-path bottlenecks`

**Task 15.3 — Low-end/slow-network re-test**

- Re-run CPU/network throttled tests and compare reports to the baseline.
- Test with JS disabled and reduced motion.
- **Commit:** `test(perf): verify low-end and slow-network experience`

**Phase 15 exit criteria:** Performance budgets pass; reports show no major regression on mobile; Core Web Vitals are within target where field data is available.

### Phase 16 — Netlify preview and release candidate

**Goal:** Test the actual deployment environment before production.

**Task 16.1 — Deploy preview verification**

- Push the feature branch and open a Netlify Deploy Preview.
- Verify the real Netlify build command, Hugo version, submodule checkout, headers, redirects, Edge Function, feeds, and content negotiation.
- Run route manifest checks against the preview URL.
- **Commit:** `test(deploy): document Netlify preview verification`

**Task 16.2 — Cross-browser manual review**

- Review Chrome, Firefox, Safari, Edge, Android Chrome, iOS Safari, and a TV browser where available.
- Confirm screenshots and keyboard/touch/remote behavior.
- Log any unsupported device-specific feature and ensure fallback.
- **Commit:** `docs(qa): record cross-browser release review`

**Task 16.3 — Owner content and visual review**

- Provide preview URL, screenshots, route manifest diff, performance summary, and all fact questions to the owner.
- Do not merge if material content or visual decisions remain unapproved.
- **Commit:** `docs(release): prepare owner review checklist`

**Phase 16 exit criteria:** Deploy preview matches local build, no route regressions, all mandatory automated tests pass, and owner review is complete.

### Phase 17 — Production rollout and post-deploy verification

**Goal:** Deploy safely and prove that existing links continue to work.

**Task 17.1 — Merge and production deploy**

- Merge through the repository's normal workflow only after approval.
- Confirm Netlify production build succeeds.
- **Commit:** Merge commit generated by approved PR process.

**Task 17.2 — Production smoke test**

- Run the complete legacy route suite against `https://deardhruv.com`.
- Check all six article URLs, all policy URLs, About aliases, `/portfolio/`, `/projects/`, `/resume.pdf`, `/sitemap/`, `/sitemap.xml`, `/feed.json`, `/index.json`, Markdown negotiation, and `.well-known` endpoints.
- Crawl all internal links.
- **Commit:** `test(release): record production route and link verification`

**Task 17.3 — Final benchmark report**

- Run Lighthouse/PSI/WebPageTest for home, About, Portfolio, Projects, Posts, one article, Series page, Legal, and Sitemap.
- Compare against pre-redesign baseline. Include reports, test conditions, and exact scores/metrics.
- Do not invent values or report a benchmark based on one unrepeatable run.
- **Commit:** `docs(perf): publish final website benchmark report`

**Task 17.4 — Handover documentation**

- Update README and add `docs/HOW_TO_UPDATE_WEBSITE.md`.
- Explain local preview, article workflow, asset optimization, content approval, CMS login if enabled, Netlify deploy previews, and troubleshooting.
- Include the route-preservation process for every future content change.
- **Commit:** `docs(site): add website maintenance and handover guide`

**Phase 17 exit criteria:** Production is live, routes are verified, benchmark reports are saved, and the site can be maintained by editing Markdown and pushing to GitHub.

---

## 14. Required tests and verification checklist

Use this as the master QA checklist. Mark each item in the progress log and release report.

### Build and repository

- [ ] `hugo --gc --minify` passes using the pinned Hugo version.
- [ ] Theme submodule initializes at the expected commit.
- [ ] No template warnings or missing content warnings remain unexplained.
- [ ] `git diff --check` passes.
- [ ] No secrets or generated output are committed.
- [ ] Netlify deploy preview builds successfully.

### Routes and files

- [ ] All original routes in `legacy-routes.json` return the expected status/redirect.
- [ ] No existing article path or slug changed.
- [ ] About aliases work.
- [ ] `/portfolio/` and `/projects/` both work.
- [ ] All six AI Playground series article paths work.
- [ ] All legal/policy page paths work.
- [ ] `/resume.pdf` returns a valid PDF.
- [ ] `/sitemap/` and `/sitemap.xml` work.
- [ ] `/feed.json`, `/index.json`, RSS, and Markdown outputs behave as before.
- [ ] Netlify Edge Function returns Markdown for `Accept: text/markdown` and normal HTML for browser requests.
- [ ] `llms.txt`, `auth.md`, and `.well-known` endpoints are verified against the baseline.
- [ ] Internal links and asset references resolve.

### Responsive and visual

- [ ] 320px width and 320×568 are usable without page-level horizontal overflow.
- [ ] All listed mobile, tablet, foldable, desktop, ultrawide, and TV viewports pass.
- [ ] Portrait and landscape orientations pass.
- [ ] Short-height windows do not clip the header or hero.
- [ ] No overlapping text, clipped buttons, missing images, or broken grids.
- [ ] Foldable hinge enhancement has a working single-screen fallback.
- [ ] TV/remote navigation has visible focus and reachable controls.
- [ ] Screenshot regressions are reviewed and approved.

### Accessibility

- [ ] WCAG 2.2 AA checks completed.
- [ ] No critical/serious axe violations.
- [ ] Keyboard-only navigation works across all major templates.
- [ ] Focus state is visible and not obscured.
- [ ] Skip link works.
- [ ] Heading hierarchy is logical.
- [ ] Every informative image has meaningful alt text.
- [ ] Contrast passes.
- [ ] 200% and 400% zoom/reflow reviewed.
- [ ] Reduced motion setting works.
- [ ] Forced colors/high contrast reviewed where available.
- [ ] Screen-reader spot checks are recorded.

### Performance and technical quality

- [ ] Lighthouse targets met on the agreed routes.
- [ ] LCP, INP, CLS reported accurately; field data distinguished from lab data.
- [ ] First-view transfer size and JS/CSS budgets pass.
- [ ] Low-end CPU and slow-network test pass.
- [ ] No unnecessary third-party scripts.
- [ ] No layout shift from fonts/images.
- [ ] No autoplay media or background GPU loop.
- [ ] Page remains useful with JavaScript disabled.
- [ ] Browser console has no uncaught errors.
- [ ] HTML validation passes or exceptions are documented.

### SEO, security, and deployment

- [ ] Every main page has a unique title, description, canonical, and social metadata.
- [ ] Structured data validates where used.
- [ ] Sitemap contains current public canonical URLs and no deploy preview URLs.
- [ ] HTTPS and redirects work.
- [ ] CSP/header changes are tested against all external resources and Edge Functions.
- [ ] Analytics is not duplicated and measurement ID is verified.
- [ ] Netlify production build and edge behavior pass.
- [ ] Production smoke tests and benchmark reports are saved.

---

## 15. Final design and content acceptance criteria

The site is ready only when all of the following are true:

1. It looks significantly more polished and contemporary than the current text-first presentation while remaining recognizably personal and engineering-focused.
2. The home page communicates specialization, selected work, and contact paths quickly.
3. Project pages show real engineering depth and separate professional, personal, open-source, and community work.
4. Every meaningful factual statement and metric is verified or explicitly marked as owner-approved.
5. Articles are easier to read, with excellent typography, code blocks, responsive media, navigation, and a clear series index.
6. Existing content files and published paths are preserved unless the owner approves a deliberate, redirected exception.
7. The site remains static-first and simple to deploy on Netlify.
8. A new article can be created by editing Markdown from anywhere, without requiring a paid CMS or complicated local environment.
9. The site is usable on low-end phones, old computers, foldables, tablets, TV browsers, and large screens.
10. Keyboard, screen reader, touch, reduced-motion, high-contrast, and zoom use cases have been checked.
11. Lighthouse, Core Web Vitals, route tests, visual tests, accessibility tests, and link checks have documented outcomes.
12. The production deploy has passed the complete legacy route compatibility suite.
13. README and maintenance documentation are up to date.
14. Every task has a focused commit and the progress log clearly explains how to resume.

---

## 16. Handoff format between Gemini runs

At the end of each run, update `docs/WEBSITE_REDESIGN_PROGRESS.md` in this format:

```markdown
# Website Redesign Progress

- Current branch:
- Current HEAD:
- Last completed phase/task:
- Next task:
- Current production URL:

## Completed tasks
| Task | Summary | Commit | Tests | Result |
|---|---|---|---|---|

## Files changed in the latest task
- ...

## Tests executed
- `command` — PASS/FAIL — short result

## Visual artifacts
- Screenshot/report path or URL:

## Route preservation
- Legacy route tests: PASS/FAIL/NOT RUN
- Route diff: none / list approved changes

## Open issues and owner decisions
- ...

## Exact next action
1. ...
```

If quota or context is exhausted, do not attempt to start an unrelated task. Finish the current task if possible, commit the tested work, update the handoff file, and leave the repository in a clean state.

---

## 17. Source and research references

### Project sources inspected

- GitHub repository: <https://github.com/DearDhruv/deardhruv.com>
- Live homepage: <https://deardhruv.com/>
- Live portfolio: <https://deardhruv.com/portfolio/>
- Live projects: <https://deardhruv.com/projects/>
- Live posts: <https://deardhruv.com/posts/>
- Live human-readable sitemap: <https://deardhruv.com/sitemap/>
- Live résumé: <https://deardhruv.com/resume.pdf>
- Repository configuration: <https://raw.githubusercontent.com/DearDhruv/deardhruv.com/master/config.toml>
- Netlify configuration: <https://raw.githubusercontent.com/DearDhruv/deardhruv.com/master/netlify.toml>
- Git submodule declaration: <https://raw.githubusercontent.com/DearDhruv/deardhruv.com/master/.gitmodules>
- About content: <https://raw.githubusercontent.com/DearDhruv/deardhruv.com/master/content/about.md>
- Portfolio content: <https://raw.githubusercontent.com/DearDhruv/deardhruv.com/master/content/portfolio.md>
- Projects content: <https://raw.githubusercontent.com/DearDhruv/deardhruv.com/master/content/projects.md>
- Markdown negotiation function: <https://raw.githubusercontent.com/DearDhruv/deardhruv.com/master/netlify/edge-functions/markdown-negotiation.ts>
- Beyond the Model Series: <https://deardhruv.com/posts/ai_playground_series/>

### Design references

- Deep Govani: <https://deepgovani.com/>
- Vishvam Moliya: <https://www.vishvam.dev/>
- Ravi Rupareliya: <https://ravirupareliya.com/>
- Brittany Chiang: <https://brittanychiang.com/>
- Bruno Simon: <https://bruno-simon.com/>
- DOTT (listed in supplied attachment; not independently reviewed in this pass): <https://www.dottdrop.com/>
- Ranjit Makwana portfolio (listed in supplied attachment; not independently reviewed in this pass): <https://career.rjvibesonly.in/>
- Urmil Bhavsar portfolio (listed in supplied attachment; not independently reviewed in this pass): <https://portfolio-urmil-bhavsars-projects.vercel.app/>

### Technical references

- Hugo directory structure and template precedence: <https://gohugo.io/getting-started/directory-structure/>
- Hugo content organization/page bundles: <https://gohugo.io/content-management/organization/>
- Hugo front matter and aliases: <https://gohugo.io/content-management/front-matter/>
- Hugo output formats: <https://gohugo.io/configuration/output-formats/>
- Netlify deploy with Git-based static sites (general reference): <https://docs.astro.build/en/guides/deploy/netlify/>
- Decap CMS overview: <https://decapcms.org/docs/intro/>
- Decap CMS GitHub backend/auth: <https://decapcms.org/docs/github-backend/>
- Decap CMS Hugo integration: <https://decapcms.org/docs/hugo/>
- WCAG 2.2: <https://www.w3.org/TR/wcag/>
- Core Web Vitals: <https://developers.google.com/search/docs/appearance/core-web-vitals>
- Reduced motion: <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion>
- Foldable viewport segments: <https://developer.mozilla.org/en-US/docs/Web/API/Viewport_segments_API>
- Android adaptive window size classes: <https://developer.android.com/develop/adaptive-apps/guides/use-window-size-classes>
- Android TV adaptive design: <https://developer.android.com/develop/adaptive-apps/guides/tv/build-adaptive-apps-for-tv>
- Apple HIG Motion: <https://developer.apple.com/design/human-interface-guidelines/motion/>
- Lighthouse CI assertions and budgets: <https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md>
- axe-core automated accessibility testing: <https://github.com/dequelabs/axe-core>
- PageSpeed Insights: <https://pagespeed.web.dev/>
- WebPageTest: <https://www.webpagetest.org/>
- W3C Nu HTML Checker: <https://validator.w3.org/nu/>

---

## Final instruction to Gemini

Start with **Phase 0, Task 0.1 only**. Inspect the real working copy, establish the safe feature branch, and create the progress hand-off file. Then proceed in the exact small-task sequence above. Preserve all existing public URLs and content by default. If any instruction conflicts with the current source code, stop only that task, document the conflict and evidence in the progress log, and choose the least risky backward-compatible implementation. A working, tested, accessible, fast static site is more important than a visually flashy redesign.
