# DearDhruv.com — Current Website Deep Audit, Brand Search Visibility & Employer Portfolio Execution Plan

**Document type:** Fully independent implementation specification for AI coding agents  
**Prepared:** 1 November 2026  
**Website:** https://deardhruv.com/  
**Repository:** https://github.com/DearDhruv/deardhruv.com  
**LinkedIn:** https://www.linkedin.com/in/deardhruv/  
**Resume supplied for this task:** `DearDhruv-Resume.pdf` (5 pages)  
**Primary objective:** Deep-audit the current production website, identify and fix technical/UX/SEO/performance problems, strengthen search/entity signals for the name **Dhruv Patel** and public identity **DearDhruv**, and add accurately attributed employer-project work.  

---

## 0. How to use this document

This file is intentionally self-contained. It does **not** depend on, extend, or require any earlier website redesign, content rewrite, design-system, Astro migration, or audit plan. Read and follow this document as the complete specification for this task.

The work must be completed in small, resumable tasks. Do not attempt to implement every phase in one context window. An AI agent should:

1. Read this entire document once before changing files.
2. Start with **Phase 0, Task 0.1 only**.
3. Inspect the repository and current production deployment before assuming any file structure or implementation detail.
4. Complete one task at a time, run its stated verification, and commit the completed task.
5. Update `docs/agent-handoff/current-website-audit.md` after every task.
6. Stop at a clean commit boundary if context, time, or quota is running low.
7. Resume from the handoff file in a later session without repeating already verified work.

### Non-negotiable safeguards

- The current production site is configured as an **Astro** site. Do not migrate it back to Hugo. Confirm the actual repository and Netlify configuration before acting; use the current Astro implementation.
- Do not change existing public page paths, article paths, policy paths, feeds, static assets, PDF paths, or machine-discovery endpoint paths unless a verified, user-approved reason requires it. Prefer fixing content and metadata in place.
- Never delete or rename an article simply to improve SEO.
- Never invent an employer project, customer/client, project name, metric, role, date, performance improvement, app platform, award, or technical implementation detail.
- Never imply that an employer endorses a personal project, or that a personal project was an employer deliverable.
- Do not publish confidential client names, screenshots, source code, architecture diagrams, commercial information, or internal metrics without explicit authorization.
- Do not keyword-stuff `DearDhruv`, `Dhruv Patel`, or social handles. Use them naturally and consistently as identity signals.
- Never claim that an online audit score, search position, or AI citation is guaranteed.
- Never present a Lighthouse lab score as real-user field performance.
- Do not copy external audit results without recording the tool, tested URL, date, test mode, and report link or artifact.
- Do not publish to production automatically. Use a branch and Netlify Deploy Preview; obtain approval before production deployment.

---

# 1. Project outcome

The finished site should work as a premium, technically credible professional portfolio for **Dhruv Patel**, publicly known as **DearDhruv**. It should communicate the user's identity and experience clearly, make personal products easy to distinguish from professional employer work, and help search engines and people connect the official profiles and website to the same person.

The work has five outcomes:

1. **Technical health:** measurable, repeatable evidence for performance, Core Web Vitals, security headers, broken links, crawlability, accessibility, responsive behaviour, build stability and content delivery.
2. **Search/entity visibility:** a consistent identity graph across the website and the user's verified public profiles, with correct metadata, structured data, canonical URLs, sitemap, internal links and useful content.
3. **Employer portfolio:** selected work organized by the company where it was performed, with a company-attribution line at the bottom of every relevant project card or case study.
4. **Truthful content:** experience, project ownership, platform availability, technical claims and metrics that match evidence in the supplied resume, public professional profiles, store listings, repository artifacts or explicit user confirmation.
5. **Maintainability:** use the current Astro/Netlify setup and existing scripts/tests. Keep content easy to update, the implementation modular, and the audit repeatable.

## 1.1 Definition of success

A task is not done because a page looks better in one screenshot. It is done only when:

- The change is visible and correct in the production build preview.
- Existing URLs still resolve and preserve their content.
- Internal and external links have been checked.
- The relevant automated tests pass.
- Accessibility and keyboard interactions are checked for changed components.
- Mobile and desktop visual snapshots are inspected.
- Performance is measured in the same conditions as the baseline.
- Documentation and handoff notes are updated.
- A Git commit records the finished task.

---

# 2. Current evidence and initial public-site report

**Evidence date:** 1 November 2026.  
This section records what was observable from the public site, public GitHub repository, public LinkedIn search preview, Google Play listings, and the attached resume. It is a baseline, not a claim that every underlying source-code path has been audited. Re-run every check before applying a fix because the site may change.

## 2.1 Verified site and repository architecture

The public repository is `DearDhruv/deardhruv.com`. The active package manifest visible on the default branch contains Astro build scripts and test/audit commands. The public Netlify configuration specifies:

- Publish directory: `dist`.
- Build command: `npm run build:astro`.
- Node runtime: `24`.
- Preview/split/branch deploy contexts also use `npm run build:astro`.
- `package.json` declares Astro and TypeScript development dependencies.

This is consistent with an Astro + Netlify production setup. **Do not replace or undo it.**

### Repository documentation discrepancy — confirmed

The repository README still describes the website as a Hugo project, refers to Hugo prerequisites and `hugo --gc --minify`, and mentions the old theme. The README is stale relative to the current `package.json` and `netlify.toml`, which build Astro.

**Required action:** update README and contributor instructions to describe the actual Astro build, scripts, content workflow, Node version, Netlify deploy and test process. Inspect all legacy Hugo configuration/theme files before deleting anything; only remove obsolete files after confirming they are not consumed by the current build or preserving a safe rollback commit.

### Existing scripts that must be inspected and reused

The public `package.json` already declares the following script surface:

- `npm run build` and `npm run build:astro`
- `npm run dev` and `npm run dev:astro`
- `npm run check`
- `npm test`
- `npm run test:routes`
- `npm run test:assets`
- `npm run test:links`
- `npm run test:edge`
- `npm run test:contrast`
- `npm run test:a11y`
- `npm run test:content`
- `npm run test:seo`
- `npm run test:interactive`
- `npm run test:dist`
- `npm run test:regression`
- `npm run test:visual`
- `npm run test:perf`
- `npm run audit`
- `npm run audit:health`
- `npm run audit:seo`
- `npm run audit:a11y`
- `npm run audit:perf`
- `npm run audit:security`
- `npm run audit:ai`
- `npm run new:post`

**Do not create a second audit system before inspecting these scripts.** Run them, inspect their output and source, identify missing coverage, then extend what already exists. Confirm that each script actually tests what its name implies; a passing placeholder or token check is not sufficient proof of browser accessibility or real-world performance.

## 2.2 Current public pages and content inventory

The live navigation currently exposes:

- `/` — homepage.
- `/about/` — About Dhruv Patel.
- `/portfolio/` — Work & Impact.
- `/projects/` — Engineering Projects & Case Studies.
- `/posts/` — posts index (inner-page navigation labels this destination “Writing”).
- `/sitemap/` — human-readable sitemap.
- `/posts/ai_playground_series/` — Beyond the Model series overview.
- Six individual Beyond the Model articles.
- `/other/` and product policy paths for AI Playground, Open Store App and VelociHue.
- `/resume.pdf` — publicly linked professional resume.
- Machine-discovery and machine-readable endpoints listed on the sitemap, including `/index.json`, `/index.md`, `/llms.txt`, `/auth.md`, `/.well-known/mcp.json`, `/.well-known/api-catalog`, and `/sitemap.xml`.

This is only the discovered route set. Generate a complete route inventory from the repository build output, existing redirect rules, current XML sitemap, links and previous deployment artifacts. The repository inventory is the definitive route contract.

### Navigation consistency — observed

The homepage's primary navigation labels the articles area **“Posts”**, while inner pages label the same destination **“Writing”**. Choose one label and use it consistently in desktop navigation, mobile navigation, breadcrumbs, footer, sitemap and accessible names. Do not change the destination path `/posts/` merely to match the label.

## 2.3 Current homepage positioning — observed

The current homepage identifies:

- **Dhruv Patel** as the main name.
- “Android Architect | Kotlin Multiplatform | On-Device AI” as the specialization line.
- “Lead Android & Multiplatform Engineer” and “14+ years” in the introduction.
- Technical focus areas: Android/native architecture, KMP/CMP, on-device AI/edge compute, commerce/hardware integration.
- Flagship independent products: AI Playground and VelociHue.
- A six-part engineering series.
- Contact links and a public PDF resume.

This is a much more specific identity than the earlier generic profile copy. Keep the technical positioning but make every claim accurate and consistent throughout the site.

## 2.4 Confirmed findings and risks

| ID | Priority | Finding | Evidence / why it matters | Required response |
|---|---|---|---|---|
| DD-01 | P0 | AI Playground repository URL currently returns GitHub 404 | The Projects page's Source Code link resolves to `https://github.com/DearDhruv/Model-Playground`, which returned a 404 in the public inspection. A prominent source-code CTA must not lead to a dead repository. | Verify whether the repo was renamed, made private, removed or replaced. Update the URL to the correct public repository only after confirmation; otherwise remove/label the source link as unavailable. Run automated external-link checks. |
| DD-02 | P0 | Product platform availability appears overstated or inconsistent | Website describes AI Playground for Android and iOS and VelociHue shipping across Android, iOS and Android TV. The supplied resume says Play Store is available and App Store release is planned; the public LinkedIn preview says VelociHue iOS is in development and TV remote support is coming soon. Google Play pages confirm Android listings. | Build a platform-by-platform release-status matrix using current App Store, Google Play and Android TV evidence. Never say “shipping” or “available” for an unlaunched platform. Use “planned”, “in development” or “target platform” as appropriate. |
| DD-03 | P0 | Current-employer identity does not reconcile across sources | The supplied resume states IMPACT Commerce, February 2022–present. The public LinkedIn search preview is titled “Dhruv Patel - SageStar Creations” and lists SageStar Creations first under Experience. Current site says IMPACT Commerce. The LinkedIn page could not be fully opened in this audit. | Treat current employer as **unconfirmed** until Dhruv approves the current role and dates. Do not silently choose one source. Record a decision in the fact ledger before publishing current-employer wording. |
| DD-04 | P1 | The public resume PDF differs from the newly supplied resume | The live `/resume.pdf` is a four-page document and its side-project section includes VelociHue. The supplied five-page resume includes both Veloci Hue and AI Playground plus current speeches/project content. | Compare both files and prepare a refreshed PDF. Replace the public file at the exact same `/resume.pdf` path only after validating the new PDF and obtaining owner approval. Preserve the public URL. |
| DD-05 | P1 | Employer-work case studies lack clear company attribution | `/portfolio/` and `/projects/` contain Digital Commerce Platform and POS/Peripheral Hardware Integration work but do not consistently show the employer name at the bottom. | Add an employer attribution footer to each verified employer project. Use the CV and owner confirmation to map work to companies. Do not infer a client company from a technology or product description. |
| DD-06 | P1 | POS peripheral count is inconsistent | Homepage currently says 27+ POS peripherals; About and Portfolio describe 30+ peripherals; resume lists printer/payment-terminal work but does not substantiate either total. | Find a reliable source or obtain Dhruv's confirmation. Use one approved count everywhere or remove the number and describe the device categories without a count. |
| DD-07 | P1 | Quantified engineering outcomes need traceable evidence | Portfolio lists 40% startup-latency reduction, 99.8% peripheral connection reliability, 60% communication-latency reduction, and AI Playground 2x decoding throughput. The resume does not substantiate these figures. | Create a metric evidence ledger. Keep a metric only with benchmark conditions, source artifact and clear attribution. Otherwise remove the number or rewrite as a qualitative engineering contribution. |
| DD-08 | P1 | Personal projects and employer projects are not separated strongly enough | AI Playground and VelociHue are independent products; enterprise commerce and POS integration are employer work. | Create distinct “Independent Projects” and “Selected Work by Employer” sections and use distinct visual labels. Never imply company ownership of personal projects. |
| DD-09 | P1 | Public LinkedIn and website profile details may be stale or inconsistent | LinkedIn public search preview uses the SageStar Creations title and shows different VelociHue platform status from the website. | Verify the current LinkedIn profile, headline, employer and project details directly. Build a profile consistency matrix and do not rewrite LinkedIn itself without explicit authorization. |
| DD-10 | P1 | Search results may be showing older homepage wording | Public search results still expose older summary copy such as “Mobile Solutions Expert” and general marketing claims, while the current live page has a more focused Android/KMP/on-device AI position. Search snippets can be stale and are not controlled completely by page metadata. | Check title/description/Open Graph/canonical and Search Console. Request recrawl after fixes; do not promise immediate snippet changes. |
| DD-11 | P2 | MCP/discovery descriptor requires protocol validation | `/.well-known/mcp.json` identifies the server as “Dhruv's blog”, uses the descriptor URL itself as the advertised Streamable HTTP URL and lists resources but no tools. | Validate the descriptor against the current MCP server-card specification and perform an actual MCP handshake/resource read. If it is only static discovery metadata, do not present it as a functioning MCP server. Rename the product descriptor to match the portfolio if appropriate. |
| DD-12 | P2 | Machine-readable endpoint content types cannot be confirmed from a standard page fetch | Public sitemap lists JSON Feed, Markdown mirror, LLM directory, API catalog and XML sitemap. The web inspection client could not render some endpoints because they use non-HTML content types; this is not proof that those endpoints are broken. | Test each endpoint using `curl -i`, expected `Accept` headers and content validation. Record HTTP status, content type, CORS if relevant, cache headers and schema validity. |
| DD-13 | P2 | Public claims include absolutes that need careful phrasing | About page uses terms such as “zero unhandled exceptions” and “30+ physical” peripherals. Absolute claims are difficult to prove, and device-count claims differ across pages. | Prefer precise, scoped descriptions. Never state “zero failures”, “100% secure”, “works on every device” or similar absolutes without a documented scope and proof. |
| DD-14 | P2 | Article and portfolio cross-link consistency needs review | Homepage highlights selected articles while Posts lists all six parts. Verify that all six are discoverable, series navigation is complete, and related projects link to the right case studies. | Add internal links and consistent series metadata without changing existing article URLs. |
| DD-15 | P2 | Public technical version numbers must be tied to source | Portfolio lists version-specific stack details such as Kotlin 2.4, Compose Multiplatform 1.12, LiteRT 2.3, SQLDelight 2.4 and target SDK 37. | Verify each version and runtime against the current source tree, Gradle catalog and release artifact. Remove stale version numbers or update the content from verified build files. |

### 2.5 Performance score status — not measured in this public inspection

A live public page fetch and source inspection are possible, but this environment did not return a completed numeric PageSpeed Insights or Lighthouse report for `deardhruv.com`. There is no access here to the owner's Google Search Console or Bing Webmaster Tools properties, Clarity/GA4 dashboards, Netlify account or authenticated crawl settings.

Therefore:

- **Do not write a fabricated Lighthouse score, Core Web Vitals pass, accessibility score, SEO score, response-time figure or security grade into the report.**
- Phase 1 must run the actual online tools and save their report links/export artifacts.
- A “no data” result is a valid result. It means field data or owner access was unavailable, not that the site passed.
- Distinguish laboratory runs from Chrome UX Report/Search Console field data.

---

# 3. Source-of-truth and identity rules

## 3.1 Identity model

Use a consistent public identity:

- Full professional name: **Dhruv Patel**.
- Recognizable online name / brand: **DearDhruv**.
- Primary site: `https://deardhruv.com/`.
- LinkedIn: `https://www.linkedin.com/in/deardhruv/`.
- GitHub: `https://github.com/DearDhruv`.
- X: `https://x.com/DearDhruv` (normalize URL casing as appropriate; do not change account identity).
- Instagram: `https://www.instagram.com/deardhruv/`.

Other profile links visible on the About page may be included in the identity graph only after confirming that each one is controlled by Dhruv and points to the correct public profile. Do not scrape or automatically claim every search result with the same name.

### Recommended natural-language use

Use a natural introduction such as:

> Dhruv Patel, known online as DearDhruv, is a Lead Android Engineer focused on Android architecture, Kotlin Multiplatform, on-device AI and hardware-integrated mobile systems.

This wording is a direction, not a mandatory exact sentence. Adjust the role/employer clause once the current-role conflict is resolved.

Use “DearDhruv” naturally in:

- A short identity sentence on the homepage or About page.
- The document title/description where it reads naturally.
- The identity/Person structured data alternate name.
- Profile links and cross-site identity references.
- The footer or contact block where helpful.

Do not append `DearDhruv` to every heading, image alt attribute, article title or paragraph. Do not create low-value pages solely to repeat the keyword.

## 3.2 Employment and project source hierarchy

Use sources in this order, while still recording conflicts:

1. Dhruv's explicit written approval for a current fact or sensitive attribution.
2. The latest resume supplied for this task.
3. The current LinkedIn profile as confirmed by the owner or a current public profile page.
4. Public company/store/GitHub/project artifacts that unambiguously support a claim.
5. Older website content, old search snippets or previous plans.

If sources disagree, do not silently merge them. Add a row to `docs/content-fact-ledger.csv` with the field, source values, date, conflict and required owner decision.

## 3.3 Current resume facts supplied for this task

The new attached five-page resume contains these employment entries:

| Dates in resume | Company | Role in resume | Supported work/experience in resume |
|---|---|---|---|
| Feb 2022 – Present | IMPACT Commerce, Denmark | Lead Android Engineer | Digital commerce/mobile applications; research into custom Android OS for touch screens and in-store displays; printers and payment terminals; custom Android touch hardware; Jetpack Compose; library-based applications; cross-functional collaboration and quality practices. |
| Nov 2018 – Feb 2022 | PLANOLY, USA | Senior Android Developer | PLANOLY visual planner for Instagram/Pinterest; StoriesEdit Instagram template editor; performance optimization; FFmpeg video manipulation; photo manipulation; MVP/MVVM; Jetpack libraries/Compose. |
| Jun 2016 – Oct 2018 | Ashapura Softech Inc, India | Tech Lead / Android Engineer | Led Android developers and client mobile application work; mentoring, delivery planning, reviews, stakeholder coordination and technical sessions. Specific client/product names are not stated in the resume. |
| Feb 2014 – Jun 2016 | Russmedia Tech, India | Team Lead / Senior Android Developer | Android development, testing, support and deployment; UI Automator scripts; requirements collaboration; team leadership, code reviews and client meetings. Specific client/product names are not stated. |
| Jan 2012 – Dec 2013 | Hidden Brains InfoTech, India | Junior Android Developer | Android apps, Android games and early iPhone development. Specific client/product names are not stated. |
| Oct 2011 – Dec 2011 | Orane Inc, India | Junior Android Developer | Android development learning/research, games and animations. |
| Feb 2011 – May 2011 | DataSoft, India | Trainee | Training project: Android app catering to the needs of visually impaired individuals. Do not claim that it was launched commercially unless confirmed. |
| Feb 2010 – May 2010 | Coronation, India | Trainee | Training in ASP.NET and VB.NET web application development. |

Other supported resume facts:

- Lead Android Engineer with 14+ years of experience.
- Core skills listed: Kotlin, Coroutines/Flow, Jetpack Compose, Java, Material Design, adaptive layouts, FFmpeg, hardware integration, OpenAPI and GraphQL.
- Education: Computer Engineering, Nirma University, Gujarat; July 2011.
- Third place in a state-level web-design competition in 2010.
- Technical talks/workshops listed in 2018, 2019, 2022 and 2025.
- Side projects: Veloci Hue (KMP/CMP game) and AI Playground (KMP/CMP local/on-device AI), with Play Store links and App Store release described as planned in the supplied resume.

The resume does **not** provide individual project names for every previous employer, client names for multi-client work, quantified POS peripheral counts, a 40% startup improvement, a 99.8% connection reliability rate or a 60% latency improvement. Those must be separately evidenced or omitted.

## 3.4 Current employer conflict — mandatory decision gate

- Resume: IMPACT Commerce is marked February 2022–Present.
- Current site: says Dhruv currently serves at IMPACT Commerce.
- Public LinkedIn search preview: profile result title shows “Dhruv Patel - SageStar Creations” and lists SageStar Creations first under Experience.

The public LinkedIn page was not fully readable in the browser inspection. It is possible the profile has been updated, that SageStar is a side venture, or that one of the public sources is stale. The agent must ask Dhruv for confirmation in the project handoff if it cannot establish the correct current role. Until resolved:

- Do not replace IMPACT Commerce with SageStar Creations automatically.
- Do not claim both as current employers.
- Do not change the current-employer line in structured data.
- Previous employer attribution can be drafted from the resume, subject to confidentiality checks.

---

# 4. Employer-project portfolio specification

## 4.1 Required information architecture

The site must make the following distinction visually and semantically clear:

1. **Independent Projects** — products that Dhruv owns or builds independently, such as AI Playground and VelociHue.
2. **Selected Work by Employer** — engineering work performed as part of a role at a named employer.
3. **Open Source & Community** — public repositories, contributions, talks, workshops and writing.

Do not combine all work into one undifferentiated list.

## 4.2 Initial employer-project cards supported by the resume

Create draft project records for these. Each record must use a concise title, a specific contribution summary, the technologies supported by evidence, the role/date range and a company attribution row at the bottom. Do not make up client names or internal product names.

### A. Digital Commerce & In-Store Android Systems

- **Employer attribution:** IMPACT Commerce (only after the current/role mapping is confirmed).
- **Resume role/date:** Lead Android Engineer; February 2022–Present.
- **Supported description:** Android commerce applications, custom touch-screen/in-store display research and development, printer/payment terminal integration, custom Android touch hardware, Jetpack Compose and library-based applications.
- **Allowed framing:** describe the engineering scope and constraints at a generalized level.
- **Do not invent:** retailer/customer names, transaction volume, exact payment provider, store count, POS peripheral count, reliability percentages, revenue, checkout speed or platform deployment count.
- **Attribution row:** `Company: IMPACT Commerce · Role: Lead Android Engineer · Period: Feb 2022–Present` (after approval).

### B. POS Hardware Integration & Peripheral Connectivity

- **Employer attribution:** confirm whether this work belongs to IMPACT Commerce or another employer before assigning it.
- **Resume-supported device categories:** printers and payment terminals. The site additionally mentions barcode scanners and weight scales, but those categories must be verified with Dhruv before inclusion.
- **Allowed framing:** Android hardware integration, device abstraction, robust connection lifecycle, peripheral communication and touch hardware.
- **Do not publish:** “30+ peripherals”, “27+ peripherals”, “99.8% reliability” or “60% faster” without documented measurements.
- **Attribution row:** show the verified company, role and date range at the bottom.

### C. PLANOLY Visual Planner & StoriesEdit

- **Employer attribution:** PLANOLY.
- **Resume role/date:** Senior Android Developer; November 2018–February 2022.
- **Resume-supported work:** PLANOLY planner for Instagram/Pinterest and StoriesEdit Instagram template editor; FFmpeg video manipulation; photo manipulation; MVP/MVVM and Jetpack libraries/Compose; performance optimization.
- **Do not invent:** user/download totals, revenue, engagement lifts, proprietary algorithms, exact feature ownership or undocumented performance numbers.
- **Attribution row:** `Company: PLANOLY · Role: Senior Android Developer · Period: Nov 2018–Feb 2022`.

### D. Client Android Applications & Team Leadership

- **Employer attribution:** Ashapura Softech Inc.
- **Resume role/date:** Tech Lead / Android Engineer; June 2016–October 2018.
- **Resume-supported work:** leading Android developers, client application delivery, architecture/implementation oversight, stakeholder coordination, mentoring, technical sessions, project planning and code reviews.
- **Do not invent:** client brands or project names. If no names/artifacts are approved, present this as a leadership-and-delivery case study rather than a fictional named product.
- **Attribution row:** `Company: Ashapura Softech Inc. · Role: Tech Lead / Android Engineer · Period: Jun 2016–Oct 2018`.

### E. Android Applications & UI Automation

- **Employer attribution:** Russmedia Tech.
- **Resume role/date:** Team Lead / Senior Android Developer; February 2014–June 2016.
- **Resume-supported work:** Android application design/development/testing/support/deployment; UI Automator scripts; requirement discussions; team management; code reviews and client communication.
- **Do not invent:** product/client names or test coverage improvements.
- **Attribution row:** `Company: Russmedia Tech · Role: Team Lead / Senior Android Developer · Period: Feb 2014–Jun 2016`.

### F. Early Android, Games & iPhone Development

- **Employer attribution:** Hidden Brains InfoTech.
- **Resume role/date:** Junior Android Developer; January 2012–December 2013.
- **Resume-supported work:** Android applications, Android games and iPhone development.
- **Do not infer:** specific iOS architecture, Swift, customer names or released apps unless verified.
- **Attribution row:** `Company: Hidden Brains InfoTech · Role: Junior Android Developer · Period: Jan 2012–Dec 2013`.

### G. Android Game & Animation Work

- **Employer attribution:** Orane Inc.
- **Resume role/date:** Junior Android Developer; October 2011–December 2011.
- **Resume-supported work:** Android games and animations, learning/research in Android development.
- **Do not overstate:** a short early-career period as a large independent product launch.
- **Attribution row:** `Company: Orane Inc. · Role: Junior Android Developer · Period: Oct 2011–Dec 2011`.

### H. Accessibility-Oriented Android Training Project

- **Employer/training attribution:** DataSoft.
- **Resume role/date:** Trainee; February 2011–May 2011.
- **Resume-supported work:** training project: Android app catering to the needs of visually impaired individuals.
- **Do not say:** commercially released, widely adopted, accessibility-certified or production deployed unless proven.
- **Attribution row:** `Training: DataSoft · Role: Trainee · Period: Feb 2011–May 2011`.

### I. ASP.NET / VB.NET Web Application Training

- **Employer/training attribution:** Coronation.
- **Resume role/date:** Trainee; February 2010–May 2010.
- **Resume-supported work:** training in ASP.NET and VB.NET web application development.
- **Do not fabricate:** project title, business customer or production deployment.
- **Attribution row:** `Training: Coronation · Role: Trainee · Period: Feb 2010–May 2010`.

## 4.3 Attribution display requirements

At the **bottom of every employer project card/case study**, display a consistent, understated attribution footer, for example:

> **Worked at:** IMPACT Commerce  ·  **Role:** Lead Android Engineer  ·  **Period:** Feb 2022–Present

The employer line must:

- Be visible, not hidden in a tooltip or only in structured data.
- Link to the official employer site only if the correct official URL has been verified.
- Not imply endorsement, ownership of Dhruv's independent projects, or that the employer is the client if it was only the employer.
- Use accessible text; do not rely on a logo alone.
- Use a separate field for client attribution if a project was delivered to a customer through an employer. Only disclose the client if authorized.
- Be visually consistent across cards and full case-study pages.

## 4.4 Employer-project content schema

Keep project data out of monolithic page components. Reuse the existing content system if appropriate. The conceptual record should include:

```ts
export interface EmployerProject {
  id: string;
  slug: string; // Do not change an existing public slug.
  title: string;
  summary: string;
  employer: {
    name: string;
    officialUrl?: string;
    role: string;
    startDate: string;
    endDate?: string;
    attributionApproved: boolean;
  };
  client?: {
    name: string;
    publicDisclosureApproved: boolean;
  };
  problem?: string;
  contribution: string[];
  technologies: string[];
  outcomes?: Array<{
    label: string;
    value: string;
    unit?: string;
    evidenceUrl?: string;
    measurementMethod?: string;
    approved: boolean;
  }>;
  publicArtifacts: Array<{ label: string; url: string }>;
  confidentiality: "public" | "generalized" | "restricted";
  sourceFacts: string[];
}
```

Adjust the type to the current Astro content-collection implementation. Do not introduce a separate database or CMS just for this data.

---

# 5. DearDhruv brand-search and entity SEO specification

## 5.1 Desired search associations

When someone searches for `deardhruv`, the preferred official result should be `https://deardhruv.com/`, with verified profiles such as LinkedIn, GitHub, X and Instagram clearly associated with the same individual.

Relevant natural query variants include:

- DearDhruv
- Dear Dhruv
- Dhruv Patel DearDhruv
- Dhruv Patel Android Engineer
- DearDhruv Android Engineer
- DearDhruv Android Architect
- DearDhruv Kotlin Multiplatform
- Dhruv Patel on-device AI

These are search-monitoring terms, not phrases to paste repeatedly into page content.

No website can guarantee a #1 position for a branded query. Search systems use many signals and control crawling, indexing, snippets and ranking independently. The implementation must improve clarity and consistency, not promise rankings.

## 5.2 Person identity and structured data

Create one accurate, canonical Person entity on the homepage and/or About page. Use JSON-LD that matches visible content. Suggested structure:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Dhruv Patel",
  "alternateName": ["DearDhruv", "@DearDhruv"],
  "url": "https://deardhruv.com/",
  "jobTitle": "Lead Android Engineer",
  "sameAs": [
    "https://www.linkedin.com/in/deardhruv/",
    "https://github.com/DearDhruv",
    "https://x.com/DearDhruv",
    "https://www.instagram.com/deardhruv/"
  ],
  "knowsAbout": [
    "Android development",
    "Kotlin",
    "Jetpack Compose",
    "Android architecture",
    "Kotlin Multiplatform",
    "Compose Multiplatform",
    "On-device AI",
    "Mobile performance engineering",
    "Hardware integration"
  ]
}
```

This is a starter schema only. Confirm canonical profile URLs, current job title and current employer before production. Do not include `worksFor` until the employment conflict is resolved. Only add profile URLs that are truly controlled by Dhruv. Do not add fake `sameAs` URLs or profiles based only on a similar username.

Add suitable types where they genuinely fit:

- `WebSite` for the canonical site.
- `ProfilePage` for the About profile page if the content meets the type's definition.
- `Person` as the main entity.
- `Article`/`BlogPosting` for technical articles, with accurate `datePublished`, `dateModified`, author and canonical URL.
- `SoftwareApplication` for independent products, with only supported operating systems, availability, app-store links and version facts.
- `BreadcrumbList` for navigational breadcrumbs.

Do not add ratings, reviews, offers, employer relationships or product availability fields without evidence. Validate structured data and ensure every JSON-LD claim also appears in visible content.

## 5.3 Page titles and descriptions

Create unique, specific metadata for every indexable route. Avoid one generic title copied to every page.

Examples of direction:

- Home: `Dhruv Patel (DearDhruv) — Lead Android Engineer`
- About: `About Dhruv Patel (DearDhruv) — Android & Multiplatform Engineering`
- Portfolio: `Dhruv Patel — Android, Kotlin Multiplatform & On-Device AI Work`
- Projects: `Engineering Projects by Dhruv Patel (DearDhruv)`
- Posts index: `Engineering Notes by Dhruv Patel — Android, KMP & On-Device AI`

These are examples. Final metadata must fit actual page content and avoid truncation or misleading claims.

Every indexable page should have:

- One descriptive `<title>`.
- One useful meta description.
- One canonical URL using HTTPS and the canonical host.
- Correct Open Graph title/description/image/URL.
- Correct X/Twitter card metadata.
- A valid language attribute and correct document title.
- A single meaningful H1 and logical headings.
- Crawlable HTML links with descriptive anchor text.
- Accurate image alt text; decorative images should use empty alt text.

Do not canonicalize different useful articles to the homepage. Each canonical article should point to itself unless a genuine duplicate exists.

## 5.4 Cross-profile identity consistency

Create a profile matrix in `docs/profile-consistency.csv`:

| Platform | Canonical URL | Public name | Headline/bio | Website backlink | Status/date checked |
|---|---|---|---|---|---|
| Personal website | https://deardhruv.com/ | Dhruv Patel / DearDhruv | Current positioning | N/A | |
| LinkedIn | https://www.linkedin.com/in/deardhruv/ | Verify | Verify | Verify | |
| GitHub | https://github.com/DearDhruv | Verify | Verify | Verify | |
| X | https://x.com/DearDhruv | Verify | Verify | Verify | |
| Instagram | https://www.instagram.com/deardhruv/ | Verify | Verify | Verify | |

Additional profiles listed on the About page may be added after verifying ownership. Make sure each profile links back to the canonical site where the platform allows it. Avoid automated link-exchange schemes.

## 5.5 Search Console monitoring

Using owner access supplied by Dhruv:

- Verify the domain property in Google Search Console.
- Verify Bing Webmaster Tools (import from Search Console if available).
- Submit the current XML sitemap.
- Inspect homepage, About, Portfolio, Projects, each series article, policies and resume URL.
- Review Pages/Indexing, Crawling, Manual Actions, Security Issues, Links, Search Performance and Core Web Vitals.
- Track branded query impressions/clicks/CTR/position for `deardhruv`, `dear dhruv`, `dhruv patel`, and relevant engineering variants.
- Record date range and country/device filters. Do not report a ranking without specifying the query, location, device and date.
- Compare the post-change period against the pre-change baseline after enough data accumulates; indexing and snippet changes can take time.

Do not promise that adding the name to the site will make every social profile appear at the top. The goal is a coherent, accurate entity graph and discoverable public content.

---

# 6. AI-search and machine-readable discovery

## 6.1 Principles

Prioritize ordinary search-engine eligibility, clear visible content, crawlable links, accurate structured data and useful original engineering writing. AI-specific text files are optional discovery aids, not a guarantee of citation.

Check official crawler policies at implementation time. At minimum, review:

- Googlebot and relevant Google crawler directives.
- OpenAI `OAI-SearchBot` separately from `GPTBot` and `ChatGPT-User`.
- Perplexity crawler documentation.
- Anthropic crawler documentation.
- Microsoft/Bingbot.

Do not copy a random robots.txt template or block all AI bots by default. The user wants to be discoverable, but crawler access must be balanced with licensing, privacy and infrastructure policy. Record the effect of each user-agent rule.

## 6.2 Existing discovery endpoints to validate

The human-readable sitemap lists:

- `/index.json` — JSON Feed.
- `/index.md` — root Markdown mirror.
- `/llms.txt` — LLM directory.
- `/auth.md` — authentication/service information.
- `/.well-known/mcp.json` — MCP descriptor/server card.
- `/.well-known/api-catalog` — linkset/API catalog.
- `/sitemap.xml` — XML sitemap.
- `/resume.pdf` — public resume.

The public MCP descriptor currently identifies the service as “Dhruv's blog”, advertises Streamable HTTP at the descriptor URL itself, and lists the JSON feed and LLM directory as resources while listing no tools. Validate it using a current MCP inspector/client and the applicable server-card specification. If a real Streamable HTTP endpoint and protocol handshake do not exist, change the descriptor to accurately represent a static resource catalog or remove misleading MCP claims. Do not add a fake API.

## 6.3 Endpoint acceptance checks

For every endpoint:

- Return the expected status code.
- Return the correct `Content-Type` and charset.
- Return valid UTF-8 where applicable.
- Return valid JSON, JSON Feed, XML or Markdown.
- Include only canonical absolute URLs where required.
- Do not expose secrets, private content, personal data beyond intended public contact details, or internal Netlify environment data.
- Use appropriate caching and `Vary` behaviour.
- Ensure redirects do not create loops.
- Ensure edge content-negotiation does not break normal HTML, static files, feeds, API resources or crawlers.
- Test with normal browser requests and relevant `Accept` headers.

For the XML sitemap:

- Include only canonical, indexable, successful URLs.
- Exclude noindex pages, redirects, error pages, duplicate URLs and private content.
- Keep `lastmod` accurate; do not set every URL to the current date on every build.
- Validate XML syntax and compare sitemap URLs with generated routes.

For `/llms.txt`:

- Keep it concise, accurate and navigational.
- Include official About, Portfolio, Projects, Posts, important articles, independent products, public source repositories and contact.
- Distinguish employer work from independent products.
- Do not use it to make claims that are absent from visible pages.

---

# 7. Technical, accessibility, responsive and performance standards

## 7.1 Performance targets

Use the current Google Core Web Vitals “good” thresholds at the 75th percentile:

- LCP: **2.5 seconds or less**.
- INP: **200 milliseconds or less**.
- CLS: **0.1 or less**.

Measure both mobile and desktop. Field data may be unavailable for low-traffic URLs; record that rather than treating lab data as a substitute.

Additional project budgets (adjust only with documented evidence):

- Keep critical-path JavaScript minimal. Prefer Astro-generated static HTML and small, explicit islands over hydrating whole pages.
- Avoid large animation/video libraries for decorative effects.
- Prefer CSS transforms/opacity for animation; do not animate layout dimensions continuously.
- Reserve image dimensions to avoid layout shift.
- Use responsive images and modern formats where supported.
- Lazy-load below-the-fold non-critical media; do not lazy-load the LCP image.
- Use `font-display: swap` or a suitable equivalent, subset/limit font variants, and avoid unnecessary third-party fonts.
- Use immutable cache headers only for fingerprinted assets.
- Verify compressed transfer sizes and unused CSS/JS before adding a numeric bundle budget.
- Test CPU-throttled and slow-network profiles; do not optimize only on a fast developer laptop.

## 7.2 Accessibility target

Target WCAG 2.2 AA. At minimum:

- Text contrast 4.5:1 for normal text and 3:1 for large text.
- Visible keyboard focus; do not remove outlines without an equally visible replacement.
- All features operable by keyboard.
- Semantic links and buttons; no clickable `div` elements without proper semantics.
- Meaningful heading order and landmarks.
- Useful image alternatives; decorative imagery is ignored by screen readers.
- Forms have programmatic labels and clear error messages.
- Motion respects `prefers-reduced-motion`.
- Focus is managed in dialogs, menus, theme palettes and mobile navigation.
- Touch targets are appropriately sized and spaced.
- Zoom to 200% and reflow without loss of content/functionality.
- Screen-reader labels identify links meaningfully (avoid multiple “Read more” controls without context).
- Color is not the only carrier of meaning.

Automated scans are necessary but not sufficient. Perform keyboard and screen-reader spot checks on every changed interactive component.

## 7.3 Responsive/device matrix

Test actual layouts, not just CSS breakpoints. Include:

- 320 × 568, 360 × 640, 375 × 812, 390 × 844, 430 × 932.
- Narrow/short flip cover display around 320 px wide and unfolded phone mode.
- Foldable inner screen in portrait and landscape.
- Tablet portrait and landscape.
- 1024 × 768 and 1280 × 800 laptop/tablet class.
- 1366 × 768 and 1440 × 900 desktop.
- 1920 × 1080 and 2560 × 1440 wide desktop.
- 3840 × 2160 TV/large display where feasible.
- Browser zoom at 200% and 400%.

Verify no horizontal overflow, clipped text, inaccessible menus, tiny tap targets, broken grids, awkward empty columns or hover-only controls. TV/remote layouts are not required to turn the personal site into a TV app, but the site must remain readable and navigable on large screens and keyboard/remote input.

---

# 8. Free and low-cost online audit tools

Use first-party or recognized tools for evidence. Third-party one-click score sites are useful as a second opinion, not the source of truth.

| Tool | Primary use | Link | Access / caution |
|---|---|---|---|
| Google PageSpeed Insights | Mobile/desktop Lighthouse lab tests and Chrome UX Report field data when available | https://pagespeed.web.dev/ | Free; run key pages separately. Field data may be absent. |
| Lighthouse | Repeatable local/CI performance, accessibility, SEO and best-practice audit | https://developer.chrome.com/docs/lighthouse/ | Free; lab data only. Pin the version and save JSON/HTML reports. |
| Google Search Console | Index coverage, search queries, links, sitemaps, manual actions, security and Core Web Vitals | https://search.google.com/search-console | Free; owner verification required. |
| Bing Webmaster Tools | Bing indexing, URL inspection, site scans, search performance and AI Performance where eligible | https://www.bing.com/webmasters | Free; property verification required. |
| Screaming Frog SEO Spider | Whole-site crawl, status codes, titles, metadata, redirects, canonical, image alt and internal links | https://www.screamingfrog.co.uk/seo-spider/ | Free crawl up to 500 URLs; free edition has feature limits. |
| Ahrefs Webmaster Tools / Free | Verified site crawl, technical SEO and backlink/keyword views | https://ahrefs.com/webmaster-tools | Verify ownership; limits apply. |
| WAVE | Visual accessibility inspection | https://wave.webaim.org/ | Free; page-by-page and dynamic content limitations. |
| axe DevTools / axe-core | Automated accessibility tests in browser and CI | https://www.deque.com/axe/ | axe-core is open source; full DevTools product has paid features. |
| WebPageTest | Network waterfalls, filmstrips, test locations and repeat-run diagnostics | https://www.webpagetest.org/ | Free access has limits; save test IDs. |
| Microsoft Clarity | Heatmaps, session recordings and interaction friction | https://clarity.microsoft.com/ | Free account; requires correct consent/privacy handling and script setup. |
| Google Analytics 4 | Traffic acquisition, engagement and configured events | https://analytics.google.com/ | Free standard use; avoid unnecessary tracking. |
| Cloudflare Web Analytics | Privacy-oriented traffic and performance overview | https://www.cloudflare.com/web-analytics/ | Free option; confirm current setup/availability. |
| PageScore | Fast secondary check of SEO, security, accessibility, performance and AI-readiness basics | https://pagescore.de/en | Free external scan; one-page/server-side snapshot, not ranking/field data. |
| RankProof | Secondary SEO/accessibility/speed/AI readiness scan | https://rankproof.eu/ | Free scanner according to its current offering; verify scope and date. |
| Sitecheckly | Secondary SEO + AEO scan | https://sitecheckly.com/ | Free scan advertised; do not treat AEO score as actual citations. |
| SSL Labs | TLS certificate and HTTPS configuration | https://www.ssllabs.com/ssltest/ | Free. |
| MDN HTTP Observatory | HTTP security headers | https://developer.mozilla.org/en-US/observatory | Free; header grade is only one security layer. |
| Google Rich Results Test | Google-eligible structured data testing | https://search.google.com/test/rich-results | Free; only supported rich-result types. |
| Schema.org Validator | General Schema.org markup syntax | https://validator.schema.org/ | Free; syntax validity does not guarantee rich results. |

### Audit execution rules

- Run mobile and desktop separately.
- Test the homepage, About, Portfolio, Projects, posts index, one series overview, all six article pages, each policy root and representative policy detail pages, and `/resume.pdf`.
- Run at least three Lighthouse mobile runs per representative page under the same settings and retain median and range. Record any unstable runs.
- Run a full link crawl across all discovered public routes and external links.
- Use PageScore/RankProof/Sitecheckly as secondary checks and record their individual reports and limitations.
- Never merge different tools' scores into one invented total score.
- Do not install five analytics tools just because they are free. Use at most one primary analytics platform plus Clarity if the owner wants heatmaps/session recordings.

---

# 9. Detailed implementation phases

Each task below is deliberately small. Every task must end with a commit, verification summary and handoff update. If an existing script/test already covers a task, run and improve it instead of duplicating it.

## Phase 0 — Repository, deployment and current-state verification

**Goal:** Establish exactly what source code produces the live Astro site and protect the existing deployment.

### Task 0.1 — Confirm repository and branch

- Clone/open `https://github.com/DearDhruv/deardhruv.com`.
- Record active branch, commit SHA, working-tree status and recent commit history.
- Compare current branch with the last successful Netlify production deploy commit if access exists.
- Confirm no local edits are overwritten.

**Verify:** `git status`, branch, latest commit and deployment commit are captured in the audit baseline.  
**Commit:** `docs(audit): record repository and deployment baseline`.

### Task 0.2 — Confirm Astro/Netlify build contract

- Inspect `package.json`, `astro.config.*`, `netlify.toml`, Node version files, build scripts and publish directory.
- Confirm current build command is `npm run build:astro` (or update documentation if it changes with evidence).
- Confirm Netlify publishes `dist` and uses the intended Node runtime.
- Do not switch framework or deployment platform.

**Verify:** clean install and production build complete using repository instructions.  
**Commit:** `docs(build): document verified Astro and Netlify setup`.

### Task 0.3 — Inspect the existing audit/test system

- Read `scripts/audit.js`, every test file named in `package.json`, route verification, visual regression, performance budget, SEO metadata, content loader and Edge Function tests.
- For every script, record what it measures, inputs, outputs, false-positive behaviour and whether it can fail CI.
- Identify placeholder checks, skipped suites and untested runtime behaviours.
- Preserve useful tests.

**Verify:** create `docs/audit/test-coverage-matrix.md`.  
**Commit:** `docs(test): map existing audit and regression coverage`.

### Task 0.4 — Correct stale repository documentation

- Update the README from Hugo to Astro only after Tasks 0.1–0.2 confirm the active build.
- Document `npm install`/lockfile-safe install, `npm run dev`, `npm run build:astro`, `npm test`, specialized audit commands, Netlify deployment and article creation.
- Inspect legacy Hugo files before removal. Remove only files confirmed unused; preserve them if they are needed by migration history or compatibility.

**Verify:** a new contributor can follow README instructions from a clean checkout.  
**Commit:** `docs(readme): replace stale Hugo instructions with Astro workflow`.

## Phase 1 — Reproducible public-site audit baseline

**Goal:** Produce actual measurements and a durable record before fixes.

### Task 1.1 — Generate complete URL inventory

- Crawl the live site and built output.
- Merge routes from source content, static files, sitemap, internal links and redirects.
- Include HTTP status, canonical, indexability, content type, title, word count and page category.
- Include feeds, machine-readable resources, PDF and policy pages.

**Verify:** `docs/audit/baseline-2026-11-01/url-inventory.csv`; no silently omitted discovered route.  
**Commit:** `test(audit): add current public URL inventory`.

### Task 1.2 — Run existing repository audits

Run and record:

```bash
npm run check
npm run build:astro
npm test
npm run test:dist
npm run test:regression
npm run test:visual
npm run test:perf
npm run audit
npm run audit:health
npm run audit:seo
npm run audit:a11y
npm run audit:perf
npm run audit:security
npm run audit:ai
```

Run specialized scripts individually even if `npm test` already invokes some of them. Record command, exit code, duration, stdout/stderr and report artifact path. Fix flaky scripts only in separate small tasks.

**Verify:** `docs/audit/baseline-2026-11-01/repository-test-results.md`.  
**Commit:** `docs(audit): capture existing repository audit baseline`.

### Task 1.3 — Run PageSpeed Insights

- Test homepage, About, Portfolio, Projects, Posts, series overview and one article on mobile and desktop.
- Save Lighthouse JSON/HTML report URLs and report date.
- Capture performance, accessibility, best practices and SEO categories.
- Capture LCP, INP, CLS, FCP, Speed Index, TBT and diagnostics when returned.
- Record CrUX field data separately; record “no data” if not available.

**Verify:** `docs/audit/baseline-2026-11-01/pagespeed/` contains one report record per tested URL/form factor.  
**Commit:** `docs(audit): record PageSpeed baseline`.

### Task 1.4 — Run WebPageTest and inspect waterfalls

- Run at least one representative mobile test and one desktop test.
- Use repeat runs when the free tier permits.
- Record test location, browser, connection profile, cache state, run number and waterfall URL.
- Identify render-blocking resources, large images, fonts, third-party scripts, long tasks and late-loading media.

**Verify:** include WebPageTest IDs, screenshots/filmstrips and an actionable request waterfall summary.  
**Commit:** `docs(audit): record WebPageTest waterfall baseline`.

### Task 1.5 — Run full SEO/link crawl

- Use Screaming Frog free crawl if the URL count is within 500; otherwise use the repository crawler and/or Ahrefs verified audit if available.
- Check 4xx/5xx links, redirect chains, redirect loops, orphan pages, duplicate titles/descriptions, missing H1, multiple H1 if unintended, canonical errors, noindex conflicts, missing alt text and oversized images.
- Separate internal links from external links.

**Verify:** `docs/audit/baseline-2026-11-01/link-and-seo-crawl.csv`.  
**Commit:** `docs(audit): capture full SEO and link crawl`.

### Task 1.6 — Run accessibility checks

- Run axe-core/Playwright on core templates and representative pages.
- Inspect each interactive theme palette, mobile menu, navigation, project links, copy controls, code blocks and diagrams.
- Use WAVE on representative pages.
- Manually test keyboard-only access, focus order, 200% zoom, reduced motion and at least one screen reader/browser combination if available.

**Verify:** create a severity-ranked accessibility issue list with element selectors and screenshot evidence.  
**Commit:** `docs(a11y): record accessibility baseline`.

### Task 1.7 — Run security and endpoint checks

- Run SSL Labs and HTTP Observatory.
- Inspect production headers and redirects.
- Check CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, cache control and `Vary` behaviour.
- Validate robots.txt, XML sitemap, JSON Feed, Markdown mirror, llms.txt, auth.md, API catalog and MCP descriptor with expected request headers.
- Verify Netlify Edge Function markdown negotiation with HTML and `text/markdown` `Accept` values.

**Verify:** `docs/audit/baseline-2026-11-01/security-and-endpoints.md`.  
**Commit:** `docs(audit): record security and machine-endpoint baseline`.

### Task 1.8 — Capture the baseline dashboard

- Build one Markdown executive summary plus CSV/JSON data files.
- Include only measured scores.
- Include a “not tested / no data / needs account” state for unavailable reports.
- Sort issues by impact, confidence, effort and affected routes.

**Verify:** the report can be rerun and regenerated without manual score editing.  
**Commit:** `docs(audit): publish reproducible website baseline report`.

## Phase 2 — Evidence ledger and public fact correction

**Goal:** Resolve conflicts before changing professional claims.

### Task 2.1 — Create a fact ledger

Create `docs/content-fact-ledger.csv` with columns:

`id,claim,source,value,date_checked,confidence,conflict,owner_decision,approved_for_publication,notes`.

Seed it with:

- Current employer and date range.
- 14+ years experience.
- POS peripherals count.
- 40% startup latency improvement.
- 99.8% reliability metric.
- 60% IPC latency reduction.
- 2x decoding throughput.
- 25+ document formats.
- AI Playground platform availability.
- VelociHue platform availability (Android, iOS, Android TV).
- Kotlin/CMP/LiteRT/SQLDelight versions.
- App store/repository links.
- Conference/speaking dates.

### Task 2.2 — Resolve current employment

- Compare resume and LinkedIn with Dhruv's current confirmation.
- Record whether IMPACT Commerce remains current, whether SageStar Creations is current, a side venture or a stale snippet, and the correct date range.
- Do not edit `worksFor`, headline or current employer attribution until approved.

**Verify:** approved fact-ledger row and content copy reviewed.  
**Commit:** `docs(content): record approved current-employment facts`.

### Task 2.3 — Reconcile product release status

For AI Playground and VelociHue, create a table of platform status:

| Product | Android | iOS | Android TV | Evidence | Last checked |
|---|---|---|---|---|---|
| AI Playground | Verify Google Play listing | Verify App Store listing/TestFlight/owner statement | Verify actual TV listing/remote support | Store URL/build/approved statement | |
| VelociHue | Verify Google Play listing | Verify App Store listing | Verify dedicated TV availability and D-pad support | Store URL/build/approved statement | |

Only call a platform “available” when a public supported distribution path exists. Separate “implemented”, “tested”, “submitted”, “approved” and “released”.

**Verify:** every platform label has evidence.  
**Commit:** `docs(content): record verified product platform status`.

### Task 2.4 — Reconcile quantified engineering claims

For every numerical statement, attach source evidence and measurement conditions. An evidence record should include:

- Baseline and comparison build/commit.
- Device model, OS, RAM/SoC where relevant.
- Network/device state.
- Workload or test protocol.
- Number of runs and aggregation method.
- Measured metric and units.
- Artifact/log/chart/benchmark link.
- Whether the metric is personal work, team work or employer-wide outcome.

Remove, qualify or generalize metrics without evidence. Never create a synthetic benchmark just to preserve a marketing figure.

**Verify:** no numeric public claim remains without a ledger row marked approved.  
**Commit:** `docs(content): validate public engineering metrics`.

### Task 2.5 — Validate the resume artifact

- Compare the supplied five-page PDF with the currently published four-page `/resume.pdf`.
- Check name, title, dates, projects, skills, speaking engagements, links, page order and text extraction.
- Confirm that no page is blank/cropped and links are clickable.
- Preserve the exact public path `/resume.pdf`.
- Replace the public PDF only after Dhruv approves the updated version.

**Verify:** open PDF in browser, run text extraction and check all pages; compare file hash and content.  
**Commit:** `content(resume): refresh public resume without changing URL`.

## Phase 3 — DearDhruv identity and branded-search implementation

**Goal:** Make the website and verified profiles clearly refer to the same person without keyword spam.

### Task 3.1 — Standardize visible identity text

- Choose consistent display names: `Dhruv Patel` and `DearDhruv`.
- Use one approved role headline across homepage, About, Portfolio metadata and contact section.
- Include a natural `known online as DearDhruv` sentence on About/homepage.
- Add social-profile links with clear labels.
- Do not repeatedly append the keyword to every paragraph.

**Verify:** scan rendered HTML for inconsistent names/headlines and inspect the page visually.  
**Commit:** `content(identity): standardize Dhruv Patel and DearDhruv naming`.

### Task 3.2 — Add and validate Person/WebSite schema

- Implement JSON-LD using the current site's existing metadata helpers.
- Add accurate `Person`, `WebSite`, `ProfilePage` and breadcrumb types only where they fit.
- Use `sameAs` for verified LinkedIn, GitHub, X and Instagram profiles.
- Add current employer only after Task 2.2 approval.
- Ensure schema agrees with visible content and page metadata.

**Verify:** Schema.org validation; Google Rich Results Test where applicable; unit test expected identity fields and canonical URLs.  
**Commit:** `feat(seo): add verified DearDhruv identity structured data`.

### Task 3.3 — Add unique page metadata

- Create a per-page metadata audit table.
- Write distinct titles/descriptions for all indexable pages.
- Check Open Graph and X/Twitter cards.
- Ensure canonical host, trailing slash policy and protocol are consistent.
- Do not change routes to make titles shorter.

**Verify:** run existing `npm run test:seo` and crawler; assert no duplicate title/description except intentionally templated policy pages with unique subject.  
**Commit:** `feat(seo): improve unique titles descriptions and social metadata`.

### Task 3.4 — Cross-link verified profiles

- Confirm actual profile ownership.
- Ensure the site points to the canonical profile URL.
- Where profile settings allow, add website backlink to `https://deardhruv.com/`.
- Build a small visible profile/contact block.
- Do not automate sign-in or profile editing without owner action.

**Verify:** every profile link resolves to the correct profile and every profile listed in `sameAs` is approved.  
**Commit:** `content(identity): align verified public profile links`.

### Task 3.5 — Branded query measurement baseline

- Capture current search results for the branded terms and record location/device/time.
- Use Search Console query data once owner access is available.
- Track impressions, clicks, CTR and average position per query; include profile results if a consistent manual snapshot is maintained.
- Do not compare two screenshots as if they were controlled rank measurements.

**Verify:** baseline report names the source and limits.  
**Commit:** `docs(seo): add DearDhruv branded-search baseline`.

## Phase 4 — Employer project portfolio implementation

**Goal:** Present previous-company work with accurate context and company attribution at the bottom.

### Task 4.1 — Create employer/independent project separation

- Add separate page sections or tabs that work without JavaScript: `Independent Projects`, `Selected Work by Employer`, `Open Source & Community`.
- Keep AI Playground and VelociHue under independent projects.
- Keep employer work in its own group.
- Maintain existing `/portfolio/` and `/projects/` URLs.

**Verify:** navigation and anchors work with keyboard and without JavaScript for the essential content.  
**Commit:** `feat(portfolio): separate independent and employer work`.

### Task 4.2 — Add employer project data records

- Add the employer records from Section 4.2 to the existing Astro content collections/data model.
- Include supported roles, dates and technologies.
- Use `confidentiality` and `attributionApproved` guards.
- Avoid invented client names or products.

**Verify:** content schema validates; unapproved employer/client records do not render publicly.  
**Commit:** `content(portfolio): add verified employer project records`.

### Task 4.3 — Build a reusable project card

Every employer card must have:

- Project/work title.
- Concise problem/context statement.
- Dhruv's contribution/role.
- Technologies actually used.
- Outcome only if evidenced.
- Relevant public artifact only if safe and live.
- Bottom attribution row with company, role and period.

**Verify:** visual regression across mobile, foldable/tablet, desktop and wide screen; axe check; link test.  
**Commit:** `feat(portfolio): build accessible employer project card`.

### Task 4.4 — Add employer case study details gradually

Build one employer case study per small task, starting with the best-supported recent work. Use separate commits for:

1. IMPACT Commerce work after current employment and project mapping is approved.
2. PLANOLY and StoriesEdit.
3. Ashapura Softech.
4. Russmedia Tech.
5. Hidden Brains InfoTech.
6. Orane, DataSoft and Coronation as concise early-career/training entries.

Do not create thin pages with one sentence and a company keyword. If there is not enough verified detail for a standalone page, keep it as a concise section in the timeline rather than adding low-value URLs.

**Verify:** all content maps to fact-ledger sources and every card shows attribution at its bottom.  
**Commit format:** `content(portfolio): add [employer] work summary`.

### Task 4.5 — Make employer and client relationships unambiguous

- Label the company where Dhruv was employed separately from any end client/customer.
- Do not show a customer logo unless disclosure/brand permission is clear.
- Use wording such as “Work delivered while at [Employer]” rather than “Built for [Client]” unless the latter is verified.
- Add a short portfolio note that some enterprise details are generalized to respect confidentiality, if applicable.

**Verify:** manual content review against employer/source ledger.  
**Commit:** `content(portfolio): clarify employer and client attribution`.

## Phase 5 — Independent product cards and technical case studies

**Goal:** Make flagship products compelling but technically accurate.

### Task 5.1 — Repair AI Playground project links

- Verify the GitHub source link currently returning 404.
- Search for the actual public repo or ask the owner to provide its new URL.
- Do not guess a repository slug.
- If private, replace CTA with `Source code is not public` or remove it.
- Verify Google Play URL.

**Verify:** all product links resolve; link checker passes.  
**Commit:** `fix(projects): repair AI Playground public artifact links`.

### Task 5.2 — Correct AI Playground platform labels and claims

- Use Task 2.3 release-status evidence.
- Separate Android release from iOS in-development/planned status if not released.
- Validate engines and features against current release and repository code.
- Align privacy statements with the Google Play Data Safety declaration and current privacy policy.
- Avoid “100% private/no data ever leaves” if any optional telemetry, diagnostics or network requests exist. State the scope precisely.

**Verify:** product page, privacy policy, Play listing and website agree.  
**Commit:** `content(projects): align AI Playground copy with release evidence`.

### Task 5.3 — Correct VelociHue platform labels and claims

- Confirm Android listing is live.
- Verify whether iOS has a public App Store listing; do not treat “ready” as “released”.
- Verify Android TV installation, remote navigation and support; do not treat a target layout as a released TV app.
- Re-check game engine, Firestore schema, achievements, frame rate and accessibility claims against source and benchmark artifacts.

**Verify:** every platform status has a public listing/test evidence or explicit owner confirmation.  
**Commit:** `content(projects): align VelociHue copy with release evidence`.

### Task 5.4 — Improve case-study structure

Use a consistent technical narrative:

1. Context/problem.
2. Constraints.
3. Role and ownership.
4. Architecture and decisions.
5. Trade-offs and failure modes.
6. Measured results with evidence, if available.
7. What changed/what was learned.
8. Public artifacts.

Keep technical depth, but avoid claims without evidence. Preserve code examples and existing article URLs.

**Verify:** technical review and content fact-ledger checks.  
**Commit:** `content(projects): standardize technical case-study structure`.

## Phase 6 — SEO crawlability, internal links and content quality

**Goal:** Make every important page easy to discover and understand.

### Task 6.1 — Validate canonical URLs and redirects

- Inventory all known historical URLs and aliases.
- Check redirects for old case-sensitive routes and previous Hugo-style paths.
- Preserve existing published paths.
- Ensure internal links point directly to canonical routes rather than through redirects.
- Avoid redirect chains and loops.

**Verify:** automated redirect map test and live HTTP checks.  
**Commit:** `test(seo): lock legacy route and redirect compatibility`.

### Task 6.2 — Validate XML sitemap and robots rules

- Verify sitemap syntax, indexable URLs and `lastmod` dates.
- Verify robots rules do not block CSS, JS, images or intended public pages.
- Review crawler-specific user-agent rules with official docs.
- Test CDN/Netlify responses, not just repository files.

**Verify:** parse XML; fetch with `curl`; compare sitemap to route inventory.  
**Commit:** `fix(seo): validate sitemap and robots crawl rules`.

### Task 6.3 — Strengthen internal linking

- Link employer cards to related technical articles only where relevant.
- Link AI Playground to the six-part series and back to the project case study.
- Link VelociHue to the public Play listing and related engineering detail.
- Add useful “next article/previous article” links to the series.
- Use descriptive anchor text, not generic repeated “click here”.

**Verify:** crawl finds no orphan articles and series navigation includes all six parts.  
**Commit:** `feat(content): improve related-work and article navigation`.

### Task 6.4 — Review indexability of policy and utility pages

- Inspect `/other/` and all ten listed policy pages.
- Ensure each app policy page refers to the correct product/version and current data practices.
- Do not index empty policy category pages unless they provide useful content.
- Avoid accidental noindex of legally required policy pages linked from app stores.

**Verify:** policy routes, metadata, links and store listing links work.  
**Commit:** `fix(content): validate product policy pages and indexability`.

### Task 6.5 — Check search snippets and social previews

- Use URL Inspection and social preview tools for important routes.
- Verify correct title/description/OG image and no stale default metadata.
- Prepare canonical URLs for reindex requests.
- Do not assume the snippet updates immediately.

**Verify:** attach screenshots or report URLs for homepage, About, Portfolio, Projects and articles.  
**Commit:** `test(seo): add social preview and snippet verification`.

## Phase 7 — Accessibility and interaction quality

**Goal:** Make the site usable across input methods, themes and screen sizes.

### Task 7.1 — Audit typography, contrast and focus states

- Test all theme palette combinations, light/dark modes and highlighted/selected/disabled text.
- Verify WCAG contrast.
- Define focus, hover, active, pressed, selected, disabled and loading states for nav, buttons and cards.
- Do not make hover the only source of information.

**Verify:** automated contrast test plus manual samples with actual foreground/background pairs.  
**Commit:** `fix(a11y): improve contrast and interaction states`.

### Task 7.2 — Audit navigation and theme controls

- Test desktop/mobile nav open/close behaviour.
- Test keyboard, Escape, focus return, outside click and screen reader labels.
- Ensure active route is conveyed semantically (`aria-current="page"`).
- Ensure theme palette and close button do not trap focus or overlap content.

**Verify:** Playwright keyboard tests and axe scan.  
**Commit:** `fix(a11y): make navigation and theme controls accessible`.

### Task 7.3 — Audit code blocks, diagrams and tables

- Confirm architecture diagrams render as diagrams only when valid; otherwise display readable code with copy/scroll support.
- The public Projects page currently contains an architecture flowchart-like block in the text extraction. Inspect the actual browser rendering and fix it if it appears as raw/poorly formatted code.
- Ensure horizontal code scrolling does not cause whole-page overflow.
- Add captions/accessible names where needed.

**Verify:** screenshots, keyboard copy control, screen-reader/semantics spot check.  
**Commit:** `fix(content): improve code and diagram rendering`.

### Task 7.4 — Complete responsive visual matrix

- Capture named viewport screenshots from Section 7.3.
- Check text wrapping, navigation, cards, employer attribution, code diagrams, footer, palette and article reading width.
- Verify landscape/portrait and fold/unfold transitions.
- Use real device/browser tests where available; emulation alone is not proof of device-specific issues.

**Verify:** `docs/audit/responsive-matrix.md` and visual baseline screenshots.  
**Commit:** `test(ui): add responsive visual coverage`.

## Phase 8 — Performance remediation

**Goal:** Fix measured bottlenecks, not merely chase a synthetic score.

### Task 8.1 — Fix the largest measured LCP issue

- Identify LCP element in PSI/Lighthouse/DevTools.
- If image: use responsive srcset/sizes, appropriate format/dimensions and preload only when beneficial.
- If text/font: optimize font loading and critical CSS.
- Do not lazy-load the LCP element.

**Verify:** same URL, mode, test location and conditions; record before/after runs.  
**Commit:** `perf(lcp): optimize measured largest contentful paint bottleneck`.

### Task 8.2 — Fix measured interaction delays

- Inspect long tasks and third-party scripts.
- Defer non-critical JavaScript and hydrate only necessary Astro islands.
- Avoid large client-side state for static content.
- Keep navigation and theme controls responsive.

**Verify:** INP field data when available, lab interaction diagnostics, performance trace and functional test.  
**Commit:** `perf(interaction): reduce measured main-thread blocking`.

### Task 8.3 — Fix layout shifts

- Reserve aspect ratios/dimensions for images, avatars, embeds and diagrams.
- Prevent late font swap from reshaping important text where practical.
- Ensure dynamic banners/palette controls do not push content unexpectedly.

**Verify:** CLS trace and visual screenshot diff.  
**Commit:** `perf(layout): eliminate verified layout shifts`.

### Task 8.4 — Optimize images, fonts, CSS and third parties

- Use image dimensions and responsive formats.
- Remove unused font weights and unnecessary remote fonts.
- Inspect actual stylesheet/JS usage before removing code.
- Review Google Analytics/tag scripts and any third-party CDNs.
- Ensure consent/privacy policy accurately reflects analytics.
- Keep caching for hashed assets; do not apply immutable caching to mutable HTML or unversioned assets.

**Verify:** bundle sizes, request waterfalls and cache headers.  
**Commit:** `perf(assets): optimize measured static asset delivery`.

## Phase 9 — Security and deployment hardening

**Goal:** Keep public site secure without breaking its content negotiation or analytics.

### Task 9.1 — Review security headers

The current public `netlify.toml` includes HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, CSP and Permissions-Policy. It also includes an older `X-XSS-Protection` header. Inspect production response headers and test the actual behaviour before changing them.

- Evaluate CSP allowlists and `'unsafe-inline'` usage.
- Prefer nonces/hashes or externalized scripts where practical, but do not break Astro output blindly.
- Confirm HSTS `includeSubDomains` and `preload` are safe for every subdomain.
- Review iframe policy and resource origins.
- Remove obsolete headers only after checking compatibility and current browser guidance.

**Verify:** SSL Labs, HTTP Observatory, browser console, CSP report/test mode and production response headers.  
**Commit:** `security(headers): harden verified response policy`.

### Task 9.2 — Validate Edge Function and cache behaviour

- Confirm markdown negotiation returns Markdown only for supported `Accept` cases and regular HTML by default.
- Confirm it does not rewrite static JS/CSS/images/PDF/JSON incorrectly.
- Test `Vary: Accept` and edge/CDN caching.
- Test feed, sitemap, Markdown and HTML paths with `curl -I` and full GET.

**Verify:** existing `npm run test:edge`, production smoke tests and content-type matrix.  
**Commit:** `fix(netlify): harden content negotiation and caching`.

### Task 9.3 — Review analytics and privacy

- Identify every analytics/recording script, consent mechanism and data sent.
- Prefer no third-party tracking if it is not useful.
- If Clarity/GA4 is installed, verify consent/privacy policy and avoid capturing sensitive input.
- Ensure no secrets, private routes or environment variables are exposed in client bundles.

**Verify:** network request review, policy review and secret scan.  
**Commit:** `privacy(analytics): align analytics implementation and disclosures`.

## Phase 10 — Automated CI and regression coverage

**Goal:** Make the important checks repeatable on every pull request.

### Task 10.1 — Define required CI commands

The current `npm test` appears to run route/assets/links/edge/contrast/accessibility-token/content/SEO/interactive checks, while visual, performance and full regression checks have separate script names. Inspect the exact scripts and create a CI workflow that explicitly runs all required suites.

At minimum evaluate:

```bash
npm ci
npm run check
npm run build:astro
npm test
npm run test:dist
npm run test:regression
npm run test:visual
npm run test:perf
npm run audit:security
npm run audit:ai
```

Avoid running the same expensive job several times without a reason. Use CI caching and clear test artifacts.

**Verify:** pull request fails when a required check fails; reports are attached as artifacts.  
**Commit:** `ci(test): enforce website quality gates`.

### Task 10.2 — Add brand and employer content tests

- Assert canonical name and profile links.
- Assert Person schema `sameAs` list matches approved profile list.
- Assert all employer work cards have an attribution footer.
- Assert independent projects are not assigned an employer by default.
- Assert no unapproved client name or unverified metric appears in rendered output.
- Assert platform availability labels match the approved fact ledger.

**Verify:** deliberately break each condition in a local test and confirm it fails.  
**Commit:** `test(content): add identity and employer-attribution regression checks`.

### Task 10.3 — Add route and link regression guards

- Compare generated public route list with the baseline.
- Require every legacy path to return 200 or its previously approved redirect.
- Validate all internal href/src values.
- Add a periodic external-link check with retries and false-positive handling.
- Do not fail all builds because a third-party site temporarily rate-limits a checker; report and triage external failures separately.

**Verify:** regression test catches an intentionally removed legacy path.  
**Commit:** `test(routes): enforce public URL and link compatibility`.

### Task 10.4 — Add visual and performance regression baselines

- Keep screenshots for the core pages and representative article templates.
- Use stable test environment, fixed viewport, fonts, browser version and reduced animations.
- Use visual thresholds to detect meaningful diffs, not anti-aliasing noise.
- Add performance budgets derived from real baseline and realistic lower-end conditions.

**Verify:** screenshot diffs are reviewable and performance regressions fail on agreed thresholds.  
**Commit:** `test(visual): establish reviewed visual and performance baselines`.

## Phase 11 — Production preview and controlled release

**Goal:** Ship only after all critical validations pass.

### Task 11.1 — Build Netlify Deploy Preview

- Push branch and generate preview.
- Verify the preview uses the correct Astro build and Node runtime.
- Confirm no draft or secret content is published.

**Verify:** build logs and preview URL saved.  
**Commit:** no extra code commit unless preview fixes are required; record preview SHA.

### Task 11.2 — Production smoke-test matrix

Check:

- Homepage, About, Portfolio, Projects, Posts, series page and all six articles.
- Each employer case study/section.
- Every product policy page.
- `/resume.pdf`.
- `/sitemap/` and `/sitemap.xml`.
- `/robots.txt`.
- `/index.json`, `/index.md`, `/llms.txt`, `/auth.md`.
- `/.well-known/mcp.json`, `/.well-known/api-catalog`.
- Canonical redirects and trailing slash behaviour.
- External links to LinkedIn/GitHub/X/Instagram/Play Store/App Store.

**Verify:** 200/expected redirects, correct `Content-Type`, no console errors, no broken images, no critical layout issue.  
**Commit:** `test(release): record production smoke test` (docs-only if necessary).

### Task 11.3 — Search engine re-crawl

- Submit/refresh XML sitemap in Google Search Console and Bing Webmaster Tools.
- Request indexing for homepage, About and updated Portfolio/Projects pages where appropriate.
- Inspect crawl/index state.
- Save submission date and response.
- Do not use automated indexing APIs that violate provider terms.

**Verify:** report shows accepted submission/request, not guaranteed ranking/indexing.  
**Commit:** `docs(seo): record post-release sitemap and indexing requests`.

### Task 11.4 — Final release approval

Production deploy only after Dhruv reviews:

- Current role/employer fact.
- Employer attribution and any client disclosure.
- Public metrics.
- Product release status.
- Updated public resume PDF.
- Social profile links.
- Visual changes.

**Verify:** approval is recorded in release checklist.  
**Commit:** release tag or final release commit following existing repository practice.

## Phase 12 — Monitoring, reports and handoff

**Goal:** Keep website health visible after the work is finished.

### Task 12.1 — Create one reproducible audit command

Use the current `npm run audit` and related scripts. Add missing pieces only after verifying no current feature already covers them. Provide one documented command for local full audit and a smaller PR audit.

**Verify:** command runs from a clean checkout and produces the documented report files.  
**Commit:** `feat(audit): provide repeatable full website audit workflow`.

### Task 12.2 — Add monthly/quarterly monitoring guide

Document a light ongoing routine:

- Weekly: check deployment health, external broken links, and Search Console indexing/security notifications.
- Monthly: rerun PSI/Lighthouse on key routes, review Search Console branded query data, check Bing AI Performance if available, inspect top Clarity friction signals if installed.
- Quarterly: full crawl, accessibility review, policy/resume/profile consistency review and dependency updates.

These are recommended manual routines unless Dhruv explicitly configures automated tasks. Do not silently create paid subscriptions.

**Verify:** `docs/website-maintenance.md` with tool URLs, owners and report locations.  
**Commit:** `docs(maintenance): add ongoing website audit routine`.

### Task 12.3 — Final handoff and next-agent guide

Update `docs/agent-handoff/current-website-audit.md` with:

- Completed phases/tasks.
- Latest commit SHA.
- Current branch and deployment preview.
- Tests run and outcomes.
- Remaining P0/P1 issues.
- Owner decisions still needed.
- Links to audit reports, screenshots and fact ledger.
- Exact next task for the next AI agent.

**Verify:** a new agent can resume from the handoff file without needing conversation history.  
**Commit:** `docs(handoff): finalize website audit and portfolio implementation handoff`.

---

# 10. Test strategy and acceptance gates

## 10.1 Unit/content tests

- Content schema validation for employer projects and independent products.
- Required title, summary, role, date, attribution and confidentiality fields.
- All public URLs have unique canonical metadata unless duplicate policy says otherwise.
- Person schema matches approved profile identity.
- No unapproved current-employer claim.
- No unapproved client or metric text.
- No platform status without source evidence.
- All six series articles have correct order and previous/next navigation.

## 10.2 Integration tests

- Astro content loader and static routes.
- Markdown/MDX rendering, code snippets, diagrams, images and feeds.
- Netlify Edge Function content negotiation.
- XML sitemap, JSON Feed, Markdown mirror and llms.txt generation.
- Canonical redirects and asset paths.
- Resume PDF route/content type.

## 10.3 Browser/end-to-end tests

Use the repository's existing visual/E2E approach where possible. Cover:

- Desktop and mobile navigation.
- Active state and current route announcement.
- Theme palette and persistence if supported.
- Keyboard navigation and Escape close.
- Project links and company attribution.
- Article sequence navigation.
- Download/open resume.
- Search/share/copy controls if present.
- No JS console errors or failed first-party requests.

## 10.4 Accessibility tests

- axe-core on all shared page templates.
- WAVE manual review on representative pages.
- Tab/Shift+Tab/Enter/Space/Escape testing.
- Screen-reader check for navigation, headings, theme palette and project card names.
- Contrast across every theme palette.
- Reduced-motion behaviour.
- 200% and 400% zoom where applicable.

## 10.5 Performance tests

- Lighthouse mobile and desktop with a pinned version.
- Three runs per target page where practical; report median and spread.
- WebPageTest waterfall for homepage and one long article.
- Field CWV from PSI/Search Console when available.
- CPU-throttled and network-throttled tests.
- Image payload and font payload review.
- JavaScript transferred and executed on the critical path.

## 10.6 Visual regression tests

Capture at minimum:

- Homepage at mobile, tablet, desktop and wide desktop.
- About page.
- Portfolio page with employer cards.
- Projects page with a diagram/code block.
- Posts index and article page.
- Legal page and footer.
- Both light and dark theme, and each supported accent palette if applicable.
- Portrait and landscape states for narrow phones and foldables.

Visual approval must inspect meaningful differences rather than blindly update all snapshots after every change.

## 10.7 Public URL contract

Before/after tests must prove:

- Existing public URLs still resolve.
- Existing article slugs do not change.
- Existing policy URLs do not change.
- Existing asset URLs remain valid or have a deliberate redirect with no external-link breakage.
- `/resume.pdf` remains the public resume location.
- Feed and machine-discovery endpoints retain their paths and MIME types.
- Internal links are updated only to direct canonical destinations.

---

# 11. Prioritization rules

Use severity, impact, confidence and effort. Do not confuse a low score with a blocker.

- **P0 — Blocker:** dead prominent project CTA, incorrect professional/employer fact, broken primary route, major crawl/indexing block, security/privacy exposure, release-status misrepresentation.
- **P1 — High:** wrong canonical/metadata, broken key article links, unsubstantiated outcome metrics, unclear project ownership, significant mobile/keyboard/accessibility issue, poor measured Core Web Vitals.
- **P2 — Medium:** duplicate metadata, suboptimal internal links, unhelpful snippets, small responsive bugs, non-critical security header improvements.
- **P3 — Low:** minor copy polish, small icon/spacing inconsistency, low-impact report cosmetics.

Fix P0 before public release. Fix P1 before declaring the audit complete. P2/P3 may remain in the final backlog with clear rationale.

---

# 12. Git workflow and AI-agent operating rules

## 12.1 Task size

Each task should generally change one concern and be completable within one short AI session. If a task involves multiple independent pages or concerns, split it further.

## 12.2 Commit format

Use conventional commits where possible:

- `docs(audit): ...`
- `fix(seo): ...`
- `feat(seo): ...`
- `content(portfolio): ...`
- `feat(portfolio): ...`
- `fix(a11y): ...`
- `perf(lcp): ...`
- `security(headers): ...`
- `test(routes): ...`
- `ci(test): ...`

One commit per completed task. Do not commit broken/incomplete work merely to satisfy a quota boundary; leave the working tree clean or clearly document any intentional in-progress change.

## 12.3 Required task handoff format

Update `docs/agent-handoff/current-website-audit.md` after each task:

```md
## Current state
- Phase/task:
- Status: complete / blocked / in progress
- Branch:
- Latest commit:

## Changes made
- Files changed:
- Behaviour/content changed:

## Verification
- Commands run:
- Results:
- Browser/visual checks:
- Audit artifacts:

## Decisions and assumptions
- Confirmed facts:
- Unconfirmed facts:
- Owner approval required:

## Remaining issues
- P0:
- P1:
- P2/P3:

## Next exact task
- Task ID:
- Files likely involved:
- Steps:
- Acceptance criteria:
```

## 12.4 Stop/resume prompt

When quota/context is low, the agent must finish the current small task, run verification, commit and update the handoff. The next session should be started with:

> Read `DEARDHRUV_CURRENT_WEBSITE_DEEP_AUDIT_AND_EMPLOYER_PORTFOLIO_EXECUTION_PLAN.md` and `docs/agent-handoff/current-website-audit.md` completely. Do not repeat completed tasks. Confirm the latest commit and working tree. Resume only the exact next task listed in the handoff. Keep all route, fact, confidentiality, test and deployment safeguards. Complete one task, verify it, commit it and update the handoff.

---

# 13. Required final deliverables

The work is not complete until the following are available in the repository (adapt exact locations to current repo conventions, but keep the artifacts accessible):

1. `docs/audit/baseline-2026-11-01/README.md` — overall audit summary and tested date.
2. `docs/audit/baseline-2026-11-01/url-inventory.csv` — public URL inventory.
3. `docs/audit/baseline-2026-11-01/link-and-seo-crawl.csv` — internal/external URL findings.
4. `docs/audit/baseline-2026-11-01/repository-test-results.md` — existing script outputs.
5. `docs/audit/baseline-2026-11-01/pagespeed/` — actual PSI/Lighthouse reports, not fabricated scores.
6. `docs/audit/baseline-2026-11-01/webpagetest/` — test IDs and waterfall report references.
7. `docs/audit/baseline-2026-11-01/accessibility.md` — axe/WAVE/manual results.
8. `docs/audit/baseline-2026-11-01/security-and-endpoints.md` — headers/TLS/content-type/Edge checks.
9. `docs/audit/final/` — matching final reports after remediation.
10. `docs/content-fact-ledger.csv` — evidence and owner approvals.
11. `docs/profile-consistency.csv` — verified public profiles and cross-links.
12. `docs/agent-handoff/current-website-audit.md` — resumable state.
13. `docs/website-maintenance.md` — simple ongoing audit routine.
14. Employer project cards/case studies with company attribution at the bottom.
15. Updated public resume at `/resume.pdf` if approved, preserving the same URL.
16. Updated repository README reflecting Astro/Netlify.
17. CI checks for routes, content facts, visual, accessibility and performance.
18. Production smoke-test report and owner-approved release record.

Do not commit full browser HAR files or analytics exports that contain private visitor data. Remove cookies, tokens, personal user data and account identifiers from all audit artifacts.

---

# 14. Current source links for this task

These are the public sources used for the initial baseline. Re-fetch them when work begins; do not rely on the snapshots indefinitely.

## Website

- Homepage: https://deardhruv.com/
- About: https://deardhruv.com/about/
- Portfolio: https://deardhruv.com/portfolio/
- Projects: https://deardhruv.com/projects/
- Posts: https://deardhruv.com/posts/
- Series overview: https://deardhruv.com/posts/ai_playground_series/
- Human-readable sitemap: https://deardhruv.com/sitemap/
- Public resume: https://deardhruv.com/resume.pdf
- XML sitemap: https://deardhruv.com/sitemap.xml
- LLM directory: https://deardhruv.com/llms.txt
- MCP descriptor: https://deardhruv.com/.well-known/mcp.json
- API catalog: https://deardhruv.com/.well-known/api-catalog

## Repository and professional profiles

- Repository: https://github.com/DearDhruv/deardhruv.com
- LinkedIn: https://www.linkedin.com/in/deardhruv/
- GitHub profile: https://github.com/DearDhruv
- X: https://x.com/DearDhruv
- Instagram: https://www.instagram.com/deardhruv/

## Product listings observed during the baseline

- AI Playground on Google Play: https://play.google.com/store/apps/details?id=com.deardhruv.llmplayground
- Veloci Hue on Google Play: https://play.google.com/store/apps/details?id=com.deardhruv.velocihue

## Official guidance to re-check during implementation

- Google Search Essentials: https://developers.google.com/search/docs/essentials
- Google AI features and your website: https://developers.google.com/search/docs/appearance/ai-features
- Google spam policies (including keyword stuffing): https://developers.google.com/search/docs/essentials/spam-policies
- Core Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- PageSpeed Insights: https://pagespeed.web.dev/
- Lighthouse: https://developer.chrome.com/docs/lighthouse/
- Google Search Console: https://search.google.com/search-console
- Bing Webmaster Tools: https://www.bing.com/webmasters
- OpenAI crawler documentation: https://platform.openai.com/docs/bots
- Netlify configuration documentation: https://docs.netlify.com/configure-builds/file-based-configuration/
- Astro documentation: https://docs.astro.build/

---

# 15. Final acceptance checklist

Do not mark the overall project complete until every required item is checked or explicitly accepted as a documented limitation.

- [ ] Current Astro + Netlify source of truth confirmed and documented.
- [ ] Stale Hugo README/build instructions corrected.
- [ ] Existing repository audit scripts inspected, run and improved where needed.
- [ ] All actual online audit results saved; no scores invented.
- [ ] PageSpeed mobile and desktop reports saved for key routes.
- [ ] Field Core Web Vitals availability recorded separately from lab results.
- [ ] Full site link/SEO crawl saved.
- [ ] Accessibility results and manual keyboard checks saved.
- [ ] Security headers, TLS and content-negotiation tests saved.
- [ ] Current employer and role reconciled with Dhruv.
- [ ] Product platform availability verified for Android/iOS/Android TV.
- [ ] Public metrics either evidenced or removed/reworded.
- [ ] AI Playground repository CTA repaired or removed.
- [ ] Public `/resume.pdf` refreshed only with approval and same URL retained.
- [ ] Independent projects separated from employer work.
- [ ] Employer projects have accurate company attribution at the bottom.
- [ ] Client confidentiality preserved; no invented client names.
- [ ] Person/WebSite structured data reflects visible and approved facts.
- [ ] DearDhruv identity links verified across LinkedIn, GitHub, X and Instagram.
- [ ] Branded query baseline recorded in Search Console/Bing where owner access exists.
- [ ] Sitemap, robots and all machine endpoints validated.
- [ ] MCP descriptor either protocol-verified or accurately represented as static discovery metadata.
- [ ] WCAG 2.2 AA target checked on core templates.
- [ ] Responsive and visual tests pass on the required viewport matrix.
- [ ] Performance changes are supported by before/after measurements.
- [ ] Existing public URLs and article paths pass regression testing.
- [ ] CI runs all required checks.
- [ ] Netlify Deploy Preview approved.
- [ ] Production smoke test passes.
- [ ] Final report, fact ledger, profile matrix and handoff are committed.

**End state:** a fast, accessible, accurate Astro portfolio that clearly connects Dhruv Patel with the DearDhruv identity, presents independent products separately from employer work, credits the correct company at the bottom of each employer project, and has repeatable evidence for technical health and search visibility.
