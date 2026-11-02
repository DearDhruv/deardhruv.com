# DearDhruv Website — Authentic Content Rewrite Addendum

**Purpose:** Rewrite the website's existing copy so it sounds like Dhruv: a technically curious, experienced engineer describing real work in a clear, specific, natural voice. The finished site should feel personal and thoughtfully edited, not like a generic AI-generated portfolio.

**How to use this file:** Give this addendum to Gemini together with:
1. `Deardhruv_Original_Website_Execution_Plan.md`
2. `DEARDHRUV_DESIGN_SYSTEM_AND_ASTRO_MIGRATION_ADDENDUM.md`

This document adds a content workstream to those plans. It does not replace the route-preservation, design-system, migration, testing, or commit requirements in the other documents. Where the documents overlap, follow the stricter requirement. The website's existing public URLs and article paths remain immutable unless Dhruv explicitly approves a change.

---

## 1. The assignment

Rewrite the website's visible and metadata copy—not merely proofread it. The current site has useful technical substance, but some sections repeat broad portfolio language, while other sections read like a dense technical specification. Make the writing sound like a real engineer explaining what he works on, what he has learned, what he built, and why a particular engineering decision mattered.

The result should be:

- Personal without being overly casual.
- Confident without sounding self-congratulatory.
- Technically detailed where detail helps a reader understand the work.
- Plain-spoken and readable without dumbing down engineering concepts.
- Specific, honest, and grounded in evidence.
- Consistent in voice across Home, About, Portfolio, Projects, article indexes, individual articles, metadata, and calls to action.
- Easy for Dhruv to maintain and edit later, ideally in Markdown/MDX through the repository.

Do not attempt to prove that text is "AI-undetectable." No tool or writing style can guarantee that. The goal is to remove generic, synthetic, repetitive writing habits and create a credible first-person voice based on real work and verified facts.

## 2. Voice and editorial direction

### 2.1 The voice to aim for

Write as a hands-on engineer who has spent years building software and is still curious about how things work under the surface. The voice should feel calm, direct, observant, and practical. Let the engineering work provide the credibility.

Use first person when it makes the writing more direct. Use "I built", "I worked on", "I ran into", "I chose", "I learned", or "I wanted to understand" only where the underlying facts support that statement. Use active voice and concrete verbs.

Prefer a natural mix of short and medium-length sentences. Longer sentences are fine when explaining a technical sequence, but avoid paragraphs that are a string of clauses and jargon.

Make room for trade-offs and constraints. Real engineering stories are often about memory limits, old hardware, unreliable drivers, platform differences, offline behavior, build complexity, or a feature that did not work on the first attempt. Explain those details when the source material supports them.

### 2.2 Avoid common AI-sounding patterns

Do not use these phrases unless they are part of a direct quote or an established product name:

- "pushing the boundaries"
- "cutting-edge solutions"
- "revolutionizing the industry"
- "passionate about innovation"
- "leveraging the power of"
- "seamlessly integrates"
- "robust and scalable solutions"
- "state-of-the-art" as a generic adjective
- "in today's fast-paced digital world"
- "where technology meets innovation"
- "dedicated to excellence"
- "I thrive at the intersection of"
- "I'm always excited to connect and collaborate"
- "empowering users" without saying what users can actually do
- "unlocking the potential"
- "next-generation experience"
- "comprehensive suite" when a simple list will do
- "endless possibilities"

Also avoid:

- Repeating the same claim in the hero, About page, Portfolio page, and footer.
- Repeating the same list of technologies in every section.
- Turning every paragraph into a three-item list.
- Overusing em dashes, colons, semicolons, emojis, exclamation marks, or rhetorical questions.
- Inflated labels such as "visionary", "guru", "ninja", "rockstar", or "world-class".
- Empty claims such as "highly optimized", "enterprise-grade", "production-ready", "zero-latency", or "millions of users" without specific evidence and context.
- Generic mission statements and invented personal philosophies.
- Perfectly symmetrical paragraphs and repeated sentence structures that make every section sound templated.
- Keyword stuffing for SEO.

### 2.3 Keep the technical voice human

Technical writing must remain precise. Do not remove meaningful terms simply because they are specialized. Explain a term the first time it matters, then use it naturally. A technical reader should be able to inspect an article and understand the real architecture, constraints, and trade-offs.

Do not convert a technical implementation into vague marketing language. For example, retain the actual runtime, backend, file format, memory constraint, device limitation, or synchronization strategy when it is relevant and verified. Put low-level implementation details in expandable details, architecture diagrams, code blocks, or a dedicated technical section if the main narrative becomes difficult to scan.

---

## 3. Who the site is speaking as

The website is Dhruv Patel's personal engineering portfolio and technical notebook. The public site currently describes Dhruv as a Lead Android Engineer, with work across Android, Kotlin Multiplatform, on-device AI, hardware integration, multimedia, architecture, and performance. The live homepage and supporting pages also identify Impact Commerce and projects including AI Playground and VelociHue.

Keep the site about Dhruv's own work and perspective. Do not turn it into an agency site, a generic software consultancy landing page, or a list of buzzwords.

The site should communicate three things quickly:

1. **What Dhruv builds:** Android and multiplatform software, including systems that work close to device hardware.
2. **What makes the work interesting:** performance constraints, local/on-device processing, hardware and platform integration, architecture, and making software behave well on real devices.
3. **Where to explore further:** selected projects, detailed engineering articles, source repositories, published apps, and ways to contact him.

Do not invent a personal origin story, childhood motivation, career turning point, hobbies, family details, personal values, or future ambitions. Add those only when Dhruv supplies or approves them.

---

## 4. Source-of-truth and fact-checking rules

This is mandatory. The current site contains both broad profile statements and very specific technical claims. Rewrite them only after creating a fact ledger.

### 4.1 Inspect the repository, not just the rendered pages

Before editing copy:

1. Clone or inspect the current Git repository and its complete history as needed.
2. Locate every content file, front matter block, template-generated text, navigation label, footer string, SEO field, Open Graph field, JSON-LD block, RSS/Atom feed field, sitemap output, 404 page, privacy/terms page, and downloadable document.
3. Inventory every article, project, image caption, alt text, author bio, and social-sharing description.
4. Map each content item to its current public URL.
5. Record the original text before changing it so that content can be reviewed or restored.
6. Inspect the actual project source, release listing, app listing, repository, and available documentation where required to validate technical claims.

The public pages that were visible during preparation include:

- `https://deardhruv.com/`
- `https://deardhruv.com/about/`
- `https://deardhruv.com/portfolio/`
- `https://deardhruv.com/projects/`
- `https://deardhruv.com/posts/`
- `https://deardhruv.com/posts/ai_playground_series/`
- The six existing articles under the `Beyond the Model Series` collection.

This is a starting inventory, not an exhaustive route list. Generate the complete list from the repository and current production sitemap before editing.

### 4.2 Build a content fact ledger

Create `docs/content/fact-ledger.md` with one entry for each meaningful claim. Include:

| Field | Required content |
|---|---|
| Claim ID | Stable identifier, e.g. `PROFILE-001` |
| Claim | Exact fact the copy intends to communicate |
| Source | Repository file, project source, official listing, user-provided fact, or approved statement |
| Evidence | File path, link, test result, release note, or other evidence |
| Status | Verified / Needs Dhruv confirmation / Stale / Do not publish |
| Last checked | Date of validation |
| Used in | Pages or articles containing the claim |

Treat the following as claims requiring evidence or explicit approval before they are promoted in the rewrite:

- "14+ years" of experience.
- Current job title and employer.
- "millions of users" or "millions of transactions".
- Specific numbers of POS devices or peripherals.
- Exact percentages for reliability, latency, app startup time, or performance improvements.
- "2x throughput" or other acceleration claims.
- "100% privacy", "zero network calls", or "zero cloud dependencies". Define exactly what is covered and whether any opt-in or platform service is an exception.
- Exact model, runtime, framework, language, compiler, SDK, or backend versions.
- Claims of production usage, global deployment, or ownership of a system.
- Claims such as "pioneered", "architected", "led", "designed", or "built" where the scope of personal responsibility needs to be clear.
- Speaking, conference, community, open-source, or mentorship activity.

If evidence is unavailable, do not silently assume the statement is true. Either:

1. Rewrite it more narrowly using only what is supported; or
2. Mark it `Needs Dhruv confirmation` and place it in a review list instead of publishing it.

Do not turn a project target into a measured result. Do not turn an experimental feature into a shipped capability. Do not claim a feature is available on both platforms if it currently exists on one platform only. Do not call a prototype production software unless its deployment status is verified.

### 4.3 Resolve inconsistencies rather than copying them

The current public pages are not perfectly consistent in their technology lists, project descriptions, and profile summary. The Portfolio page is more detailed than the About page; the current project pages contain implementation details and version numbers that may become stale.

Create `docs/content/content-conflicts.md`. Record each discrepancy and its sources. Choose the most accurate statement only when repository evidence or an approved source resolves it. Otherwise mark it for Dhruv's confirmation.

Do not publish multiple conflicting versions across different pages.

### 4.4 Important attachment warning

A previously supplied text attachment contains introductions and biographies of other GDG/community members, including their names, roles, projects, links, and personal details. **Those biographies are not Dhruv's biography.** Do not copy their credentials, career history, achievements, wording, links, or personal stories into Dhruv's website. They may be used only as examples of how other people structure an introduction, not as factual source material about Dhruv.

---

## 5. Page-by-page rewrite brief

Rewrite all current website content, not just the home page. Keep each page's purpose distinct so the site does not repeat itself.

### 5.1 Home page `/`

**Purpose:** Give visitors a quick, memorable understanding of what Dhruv works on and guide them to the most useful next page.

Rewrite:

- Main headline / name lockup where applicable.
- Role descriptor.
- Short introduction / hero paragraph.
- Primary and secondary calls to action.
- Featured project summaries.
- Selected article summaries.
- Small labels, captions, badges, and supporting text.
- Footer introduction and quick-link descriptions.

The hero should not be a long resume summary. It should have one clear idea, a short paragraph, and one or two useful actions. Do not repeat the whole technical stack in the hero.

**Illustrative editorial direction (not mandatory final copy):**

> I'm Dhruv, an Android and multiplatform engineer. I like working on the parts of software that become interesting when they meet real devices: performance, hardware integration, local processing, and the differences between platforms.
>
> Lately, a lot of my time has gone into Kotlin Multiplatform and on-device AI. I'm building ways to run models and handle data locally on phones, while keeping the experience practical on the hardware people already own. This site is where I share the projects, engineering decisions, and lessons along the way.

Use this as a tone and structure example only. Verify every detail against the fact ledger, and edit it so it sounds like Dhruv rather than copying it mechanically.

### 5.2 About page `/about/`

**Purpose:** Explain the person and professional background behind the work, without becoming a second technical portfolio page.

Suggested structure:

1. A short, natural introduction.
2. What Dhruv currently works on, if current employment details are confirmed.
3. A concise account of the kinds of engineering problems he enjoys solving.
4. How he approaches architecture, performance, platform-specific UX, hardware, or local-first systems—with concrete examples rather than generic values.
5. Community, speaking, mentoring, and open-source work, only where specific activity can be verified.
6. A brief invitation to contact him for relevant conversations.

Remove the generic "Core Values" list unless each item can be expressed through an actual example. Avoid claims such as "I am passionate about excellence". Show the behavior instead.

### 5.3 Portfolio page `/portfolio/`

**Purpose:** Offer a compact professional overview for recruiters, engineering leaders, clients, collaborators, and conference organizers.

- Lead with the type of problems Dhruv works on.
- Group technical skills into understandable categories.
- Separate hands-on engineering from leadership, mentorship, and community activity.
- Keep the skill list accurate and current. Do not label a technology "expert" without an approved reason to use that wording.
- Show project impact with context: what the system did, what Dhruv owned, what constraints mattered, and what changed as a result.
- Use numbers only when evidence exists and the measurement is meaningful.
- Link to detailed projects and articles rather than repeating all their content here.

Avoid a page that reads like a pasted CV or an SEO keyword inventory.

### 5.4 Projects page `/projects/`

**Purpose:** Explain the work through real products and engineering problems.

For each project, use a consistent but flexible editorial structure:

- Project name and a one-line plain-English explanation.
- Status: shipped, in development, prototype, archived, or experimental. Verify before displaying.
- Dhruv's role and precise ownership.
- Why the project exists / what problem it addresses.
- What was built and how it works.
- The technically difficult parts and the choices made.
- Constraints and trade-offs (hardware, memory, thermal behavior, offline requirements, platform differences, reliability, maintainability, or accessibility as relevant).
- Measured outcomes, only if evidenced.
- Current limitations or next steps, if useful and approved.
- Links to the live product, repository, documentation, demo, or related article.

**AI Playground:** Describe the user problem first: running AI on a personal device without making every interaction depend on a cloud service. Then explain the actual engines, file handling, local inference, privacy boundary, platform support, and hardware constraints. Avoid stacking every model/runtime/optimization in the opening paragraph. Put implementation details into clearly labelled technical sections.

**VelociHue:** Describe the gameplay and user experience first. Then explain the shared engine, cross-platform targets, controls, progression, synchronization, performance, and accessibility. Avoid calling it "endless replayability" or "ultimate" unless that is deliberately the product's voice. Keep technical architecture out of the first sentence.

**Professional / client work:** Respect confidentiality. Do not disclose client names, architecture, exact metrics, or proprietary details unless already approved for public disclosure. Where the original project page uses generic labels such as "Digital Commerce Platform" or "Hardware Integration Module", keep the description high-level unless a public case study is authorized.

### 5.5 Posts index `/posts/` and article series page

**Purpose:** Help people find articles by problem, subject, or practical lesson.

- Add an honest, one- or two-sentence explanation of what the writing covers.
- Make titles specific and human. Avoid sensationalism and artificial drama.
- Give each article a short description that says what the reader will learn.
- Keep dates accurate and display the actual publication/update date.
- Avoid making every article description begin with "Learn how" or "Discover".
- Do not invent article categories, reading times, or takeaways that the article does not support.

### 5.6 Individual technical articles

Rewrite the prose of every existing article in the `Beyond the Model Series`, not just the series landing page. Preserve all existing article paths, filenames where practical, front matter identifiers, dates, tags used by integrations, and cross-links.

For each article:

1. Keep the author's actual engineering story, technical position, and conclusions.
2. Improve the opening so it starts with the real problem, observation, or decision—not a generic introduction to the topic.
3. Explain the context and why the problem mattered.
4. Describe the approach and alternatives considered, if present in the source.
5. Preserve implementation detail and technical accuracy.
6. Explain what worked, what did not, and what the author learned only when stated or supported in the original material.
7. End with a useful takeaway, next question, or natural connection to the next article. Do not force a motivational conclusion.

**Do not rewrite technical material as if it were ordinary marketing copy.** Preserve:

- Code blocks and code behavior.
- Commands, shell output, stack traces, compiler flags, configuration, and API names.
- Exact model names, runtime names, class/function names, schema names, and identifiers.
- Mathematical expressions, benchmark methodology, numerical values, tables, and diagrams.
- Citations, source links, licenses, attribution, and quotations.
- Important caveats, failure conditions, limitations, and platform-specific details.

You may rewrite the surrounding explanation for clarity. If the source appears technically inconsistent or out of date, flag it in the content review log; do not "fix" it by guessing.

### 5.7 Legal, policy, error, and utility pages

Review these pages for clarity, but do not casually paraphrase legal language or change policy meaning. Keep required legal statements intact unless Dhruv approves the change. Rewrite only navigation/help copy that does not alter legal obligations. Verify all utility pages, 404, search, RSS, sitemap, robots, privacy, and contact routes after the framework migration.

### 5.8 Metadata and machine-readable text

Rewrite and validate:

- `<title>` and meta description for every indexable page.
- Open Graph title/description and social preview text.
- Twitter/X card metadata if present.
- JSON-LD Person, Article, BlogPosting, WebSite, and Breadcrumb fields where present.
- Image alt text and captions.
- RSS/Atom feed titles and descriptions.
- Sitemap titles only if the generator emits them.
- Canonical URL and language metadata.

Metadata must describe the actual page. Do not stuff keywords or create duplicate descriptions across every page. Do not add fake ratings, reviews, credentials, employer endorsements, or awards to structured data.

---

## 6. Article editing standards

Apply the following editorial checks to every article:

### 6.1 Opening

- Start with a concrete situation, problem, engineering observation, or decision.
- Avoid "In today's rapidly evolving landscape..." and generic background paragraphs.
- Give readers a reason to continue within the first few paragraphs.
- Do not pretend that every technical problem was a dramatic breakthrough.

### 6.2 Paragraphs and rhythm

- Keep most paragraphs focused on one idea.
- Vary paragraph and sentence length naturally.
- Break up long walls of prose, but do not turn every sentence into a separate paragraph.
- Use subheadings to describe the actual next topic, not generic headings such as "The Journey", "The Solution", or "Conclusion" repeated in every article.
- Use lists for real lists, steps, constraints, or comparisons—not as a default writing format.

### 6.3 Technical explanations

- Introduce the problem before the solution.
- Explain why a particular approach was selected.
- Mention alternatives and trade-offs when the source includes them.
- Keep code examples close to the explanation that needs them.
- Define uncommon acronyms once. Do not repeatedly explain well-known terms to an expert audience.
- Do not write claims such as "this guarantees", "always prevents", or "eliminates crashes" unless the source proves that exact guarantee.

### 6.4 Conclusions

- Summarize the specific engineering lesson, not a generic life lesson.
- Mention unresolved limitations or follow-up work where appropriate.
- Link naturally to the next relevant article or project.
- Avoid repetitive closings such as "The future is exciting" or "This is just the beginning".

---

## 7. Content architecture and easy ongoing editing

Keep the content workflow straightforward for Dhruv to update from anywhere.

- Prefer Markdown/MDX files in the repository for authored pages and articles.
- Keep content separate from presentation components.
- Use a small set of front matter fields with clear names and documented examples.
- Avoid making Dhruv edit code just to change a paragraph, link, project description, or article image.
- Keep one source of truth for repeated information such as social URLs, profile summary, project links, and current role, where the architecture allows it.
- Avoid duplicating a complete biography in multiple files. Use reusable data only for genuinely shared fields; page-specific narrative should remain tailored.
- Provide a content authoring guide with examples for a new article, a new project, an image, a draft, and an updated article.
- Make drafts previewable without exposing drafts publicly.
- Ensure content editing is possible from GitHub's web interface or another approved low-friction content UI. If proposing a CMS, compare its setup, cost, authentication, media handling, preview workflow, and long-term maintenance before adding it.

Create or update:

- `docs/content/VOICE_AND_STYLE_GUIDE.md`
- `docs/content/CONTENT_INVENTORY.md`
- `docs/content/fact-ledger.md`
- `docs/content/content-conflicts.md`
- `docs/content/CONTENT_REVIEW_LOG.md`
- `docs/content/ADDING_AND_EDITING_CONTENT.md`

These documents are for maintenance and review; do not publish internal review notes or unapproved claims to the public website.

---

## 8. SEO without awkward writing

Write for people first. SEO should describe the real subject of each page, not dictate the prose.

- Use one clear H1 per page.
- Structure H2/H3 headings by topic.
- Use natural names for technologies and project titles where relevant.
- Give each page a distinct title and useful meta description.
- Use descriptive anchor text rather than "click here" or a repeated list of keywords.
- Keep canonical URLs stable.
- Preserve current article dates and paths.
- Add internal links where they help a reader follow a project or technical subject.
- Avoid thin pages created only to target search phrases.
- Do not generate fake author credentials, organizations, awards, or review schema.

---

## 9. Content acceptance criteria

A page is not complete merely because the text has been changed. It must pass all of these checks.

### 9.1 Editorial checks

- [ ] The page has a clear purpose and says something that belongs on this page.
- [ ] It sounds like one person, not a generic company brochure.
- [ ] The opening is direct and specific.
- [ ] It uses active voice where natural.
- [ ] It contains concrete nouns and verbs rather than adjective-heavy claims.
- [ ] It does not repeat content that is already better explained elsewhere.
- [ ] It does not use the avoid-list phrases or obvious template language.
- [ ] Paragraphs and sentence rhythm feel natural when read aloud.
- [ ] The tone is confident but not inflated.
- [ ] No personal history, opinion, emotion, or motivation has been invented.

### 9.2 Factual checks

- [ ] Every metric has a source and context.
- [ ] Every role, employer, date, product status, and technology claim is current.
- [ ] Experimental and shipped capabilities are distinguished.
- [ ] First-person ownership is accurate.
- [ ] Third-party work is credited and confidentiality is respected.
- [ ] No information from another person's community biography has been attributed to Dhruv.
- [ ] Conflicting or unsupported claims are marked for review rather than silently published.

### 9.3 Technical checks

- [ ] Code samples still compile/run where applicable.
- [ ] Commands, URLs, paths, filenames, references, citations, and link targets remain valid.
- [ ] Code identifiers and technical terminology are unchanged unless explicitly corrected with evidence.
- [ ] Markdown/MDX rendering is correct.
- [ ] Tables, diagrams, footnotes, syntax highlighting, embeds, and image captions still render.
- [ ] Article anchors and in-page table-of-contents links still work.
- [ ] Front matter and metadata are valid for the selected site generator.

### 9.4 Route and link checks

- [ ] Every pre-existing public URL still resolves.
- [ ] Every article's canonical URL is unchanged.
- [ ] All cross-links between the six-part series still work.
- [ ] Existing external links are preserved unless they are demonstrably broken or redirected with approval.
- [ ] Download links and static asset paths still work.
- [ ] Feed and sitemap entries are valid.
- [ ] No duplicate canonical URLs or accidental `noindex` directives are introduced.

---

## 10. Automated and visual testing for content

Add automated tests where practical:

1. **Content schema tests:** Validate required front matter fields, date formats, slugs, categories, and link fields.
2. **Route snapshot:** Compare the pre-migration URL inventory with the generated production route inventory. Fail on removed or renamed routes.
3. **Internal link check:** Check relative links, article anchors, images, downloadable files, and generated routes.
4. **External link check:** Run separately and report transient network failures; do not fail the build solely because a third-party site rate-limits the checker.
5. **Metadata tests:** Verify unique titles, descriptions, canonical URLs, social metadata, heading structure, and structured-data validity.
6. **Markdown/MDX tests:** Ensure code fences, tables, images, footnotes, and embedded content are rendered correctly.
7. **Visual regression:** Capture screenshots for the home page, About, Portfolio, Projects, posts index, series page, representative long article, and 404 at mobile, tablet, desktop, and wide desktop breakpoints.
8. **Accessibility:** Check heading order, accessible names, link clarity, contrast, image alt text, keyboard navigation, and screen-reader landmarks.

Use a content-specific visual review in addition to the design-system review. Check real long headings, long project names, code blocks, inline links, list nesting, tables, captions, and article metadata. Test both light and dark themes if the site provides them.

---

## 11. Small, resumable implementation phases

Each task must fit into a small AI-agent session. Do not combine a complete website rewrite into one enormous task.

### Phase C0 — Inventory and baseline

**C0.1** List all content source files and map each one to its current URL.

**C0.2** Export or preserve the existing visible copy and front matter before editing.

**C0.3** Create the content inventory, initial fact ledger, and conflict log.

**C0.4** Identify articles, projects, static documents, and generated text. Mark content that should not be rewritten (code, legal language, quotations, externally authored text).

**Verification:** The inventory count matches the repository and the production sitemap. No file is edited in this phase.

**Commit:** `docs(content): inventory existing website copy and claims`

### Phase C1 — Voice guide and editorial rules

**C1.1** Create `VOICE_AND_STYLE_GUIDE.md` from this addendum.

**C1.2** Build a short before/after example based only on verified existing content.

**C1.3** Write a page-specific tone matrix for Home, About, Portfolio, Projects, and technical articles.

**C1.4** Record unsupported claims and questions that require Dhruv's confirmation.

**Verification:** Review the guide against the current homepage and About page. It must not introduce new facts.

**Commit:** `docs(content): define authentic personal writing voice`

### Phase C2 — Home page copy

**C2.1** Rewrite only the homepage hero.

**C2.2** Rewrite featured project summaries.

**C2.3** Rewrite article teasers and calls to action.

**C2.4** Review footer, labels, and homepage metadata.

**Verification:** Read the page aloud, inspect at mobile and desktop sizes, run link and metadata checks, and compare against the fact ledger.

**Commit:** `content(home): rewrite homepage in authentic first-person voice`

### Phase C3 — About page

**C3.1** Rewrite the opening profile.

**C3.2** Rewrite current role and professional background after verification.

**C3.3** Rewrite technical interests and working approach using examples.

**C3.4** Rewrite community, speaking, mentorship, and contact sections only where evidence exists.

**Verification:** Ensure About adds context rather than duplicating the homepage and Portfolio. Check every factual claim.

**Commit:** `content(about): rewrite profile and professional story`

### Phase C4 — Portfolio page

**C4.1** Rewrite the professional profile and skill categories.

**C4.2** Rewrite leadership/community summary.

**C4.3** Rewrite each impact statement to include context and evidence.

**C4.4** Remove repeated or unsupported claims.

**Verification:** Cross-check each skill and claim against the fact ledger and current source material.

**Commit:** `content(portfolio): clarify expertise and engineering impact`

### Phase C5 — Projects page

**C5.1** Rewrite AI Playground overview and project narrative.

**C5.2** Rewrite VelociHue overview and project narrative.

**C5.3** Rewrite professional/client work descriptions within confidentiality limits.

**C5.4** Rewrite open-source and project link descriptions.

**Verification:** Confirm project status, platform coverage, technologies, links, role, and metrics. Ensure the main summary is understandable before the deep technical detail.

**Commit:** `content(projects): rewrite project stories and technical summaries`

### Phase C6 — Article collection and series landing pages

**C6.1** Rewrite the Posts index intro and metadata.

**C6.2** Rewrite the `Beyond the Model Series` overview.

**C6.3** Rewrite all six article teasers and their descriptions.

**Verification:** Confirm all six article links, ordering, dates, and descriptions. Confirm no article route has changed.

**Commit:** `content(posts): rewrite article index and series overview`

### Phase C7 — Technical articles, parts 1 and 2

**C7.1** Rewrite Part 1 prose while preserving technical content.

**C7.2** Rewrite Part 2 prose while preserving technical content.

**C7.3** Verify code, diagrams, citations, internal links, and all technical identifiers.

**Verification:** Use side-by-side diff review. No code, command, or metric changes without separate evidence and explicit review.

**Commit:** `content(articles): edit Beyond the Model parts 1 and 2`

### Phase C8 — Technical articles, parts 3 and 4

**C8.1** Rewrite Part 3 prose while preserving technical content.

**C8.2** Rewrite Part 4 prose while preserving technical content.

**C8.3** Verify code, diagrams, citations, internal links, and all technical identifiers.

**Verification:** Same checks as Phase C7.

**Commit:** `content(articles): edit Beyond the Model parts 3 and 4`

### Phase C9 — Technical articles, parts 5 and 6

**C9.1** Rewrite Part 5 prose while preserving technical content.

**C9.2** Rewrite Part 6 prose while preserving technical content.

**C9.3** Verify code, diagrams, citations, internal links, and all technical identifiers.

**Verification:** Same checks as Phase C7.

**Commit:** `content(articles): edit Beyond the Model parts 5 and 6`

### Phase C10 — Metadata, captions, and utility copy

**C10.1** Rewrite SEO title and description fields.

**C10.2** Rewrite Open Graph/social preview copy.

**C10.3** Review image alt text and captions for accuracy and usefulness.

**C10.4** Review navigation labels, buttons, 404 copy, search prompts, empty states, and footer copy.

**C10.5** Review RSS/Atom and structured-data text.

**Verification:** Unique metadata tests, structured-data validation, accessibility checks, and a rendered page review.

**Commit:** `content(metadata): improve page descriptions and utility copy`

### Phase C11 — Complete editorial and factual review

**C11.1** Read the complete site copy as one visitor journey.

**C11.2** Remove repeated claims, repeated introductions, and inconsistent labels.

**C11.3** Review every claim in the fact ledger.

**C11.4** Produce a short list of questions that genuinely require Dhruv's confirmation. Do not block unrelated verified content on these questions.

**C11.5** Produce a content change summary with links to each edited source file.

**Verification:** All page-level and article-level acceptance criteria pass. Any unresolved claim is omitted or clearly marked as requiring approval in the private review log.

**Commit:** `content(review): complete site-wide editorial and fact audit`

### Phase C12 — Final content regression

**C12.1** Generate the full route list from the final build.

**C12.2** Compare it with the original production route list.

**C12.3** Run internal link, metadata, Markdown, and visual tests.

**C12.4** Inspect representative pages manually at supported screen sizes and themes.

**C12.5** Verify feeds, sitemap, canonical URLs, article anchors, downloads, and old links.

**Verification:** No unexplained route changes, broken internal links, missing articles, malformed code blocks, or metadata regressions.

**Commit:** `test(content): verify rewritten content and legacy routes`

---

## 12. Working protocol for Gemini

At the start of every session:

1. Read this addendum and both main website-plan documents.
2. Read the current `docs/content/CONTENT_INVENTORY.md`, `fact-ledger.md`, `content-conflicts.md`, and `CONTENT_REVIEW_LOG.md`.
3. Check `git status`, current branch, and latest commit.
4. Identify the next incomplete task. Do not redo completed work without a reason.
5. Work on one task at a time and keep the diff small.

At the end of every task:

1. Run the required tests for the task.
2. Inspect the diff and check for accidental path, metadata, code, or front matter changes.
3. Update the relevant content review log and fact ledger.
4. Commit the completed task using the prescribed message pattern.
5. Update a resumable `docs/content/AI_HANDOFF.md` with:
   - Completed task ID.
   - Files changed.
   - Claims verified or awaiting confirmation.
   - Tests run and results.
   - Commit hash.
   - Exact next task.
   - Any blocker or decision needed from Dhruv.

Do not start a large follow-up task if the current task is not fully verified and committed.

### Required commit discipline

- One logical content task per commit.
- Never combine content rewrites with framework migration or visual redesign in the same commit unless a small technical dependency makes it unavoidable.
- Do not commit generated build folders, caches, secrets, credentials, or local environment files.
- Do not force-push or rewrite shared history.
- Do not push or deploy to production automatically unless the primary project plan explicitly authorizes it.

---

## 13. Final editorial quality bar

Before calling the content rewrite complete, ask:

- Could this paragraph belong to almost any software engineer's portfolio? If yes, make it more specific or remove it.
- Does this sentence claim more than the evidence supports? If yes, narrow it.
- Is this technology name helping the reader understand the work, or is it just filling a skills list? If it adds no value, move it or remove it.
- Have I explained what the project does before listing how it was built?
- Does each page have a distinct job?
- Does the copy sound believable when spoken aloud by Dhruv?
- Have I kept the technical details that make the work interesting?
- Have I avoided inventing feelings, motivations, results, or personal stories?
- Would a recruiter, engineer, or potential collaborator understand what Dhruv actually does after reading the first screen?
- Can Dhruv update this content later without learning the site's component code?

The final site should not sound like a company brochure, a resume generated from keywords, or a generic AI portfolio template. It should sound like an experienced engineer who knows the details of his work, can explain them clearly, and is comfortable letting the work speak for itself.

**End of addendum.**
