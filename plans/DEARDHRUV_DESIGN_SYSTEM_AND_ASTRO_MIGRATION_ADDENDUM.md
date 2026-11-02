# DearDhruv.com — Design System, Visual Consistency & Astro Migration Addendum

**Document type:** Binding addendum and implementation prompt for the existing website modernization plan  
**Primary agent:** Gemini Flash 3.8 High  
**Repository:** <https://github.com/DearDhruv/deardhruv.com>  
**Production domain:** <https://deardhruv.com/>  
**Hosting target:** Netlify (retain unless a measurable blocker is found)  
**Date:** 31 October 2026  
**Relationship to the original plan:** Read together with `DEARDHRUV_WEBSITE_REDESIGN_GEMINI_EXECUTION_PLAN.md`.

---

## 0. Critical instruction: this addendum changes the framework decision

This addendum exists because the current website has an inconsistent visual language. Text hierarchy, fonts, font sizes, descriptions, containers, cards, highlights, active/selected/hover states, buttons, navigation, borders, dotted separators, icons, backgrounds, contrast, and links do not yet behave as one intentional design system.

The owner also wants a more ambitious, designer-led engineering portfolio and is open to moving away from Hugo.

### 0.1 Priority over the earlier Hugo recommendation

The original plan's statements that Hugo must be retained permanently are no longer binding. In particular, revisit these original-plan sections:

- Section 2.1 — existing architecture and architecture decision.
- Section 6.1 — keep the existing stack.
- Section 6.2 — theme strategy.
- The Hugo-specific implementation instructions in the original phases.
- The original final instruction wherever it assumes Hugo is the permanent generator.

**New decision:** Hugo is the current production baseline and rollback reference, not a mandatory final framework. You are explicitly authorized to evaluate and, if the proof-of-concept gates pass, migrate the site to Astro while retaining Netlify and all existing public URLs.

Do not interpret this authorization as permission to perform an uncontrolled rewrite. The old site must remain deployable and recoverable until the Astro replacement has passed every migration and production acceptance gate.

### 0.2 Preferred direction

Evaluate the following in this order:

1. **Astro — preferred candidate.** Best fit for a component-driven, content-heavy portfolio that should ship mostly static HTML, use Markdown/MDX, and selectively hydrate interactive components.
2. **Hugo — control candidate.** Keep as the performance/build simplicity baseline. Do not dismiss it merely because it is currently used.
3. **Eleventy — alternative static candidate.** Consider if its templating/content workflow is demonstrably easier for this repository and the desired visual system.
4. **SvelteKit or Next.js — only if a real application requirement emerges.** Do not introduce server rendering, a large client runtime, or application complexity for decorative interactions.

Do not create a framework bake-off that consumes the whole budget. One small Astro proof of concept plus a documented comparison with the existing Hugo baseline is enough to make the decision.

### 0.3 What success must look like

The website should feel like a highly considered portfolio made by a senior digital product designer and a strong frontend engineer—not like a default theme with a new color palette.

Every page must visibly belong to the same design family. A visitor should never feel that the navigation, article pages, project cards, legal pages, buttons, and footer were assembled from unrelated templates.

The quality bar is:

- Consistent and unmistakable typography hierarchy.
- Predictable spacing, alignment, container widths, grid behavior, and reading measure.
- A coherent color system with verified light/dark contrast.
- Reusable surfaces, cards, borders, dividers, metadata, and highlights.
- Complete interaction states for pointer, keyboard, touch, and remote navigation.
- Purposeful animation that feels polished without taxing older devices.
- Excellent responsive behavior for narrow, wide, short, tall, folded, unfolded, portrait, and landscape viewports.
- Easy, low-cost content editing and Git-based deployment.
- No loss of any previously published URL, article, file, endpoint, or integration.

---

## 1. How to use this addendum

1. Read the original website execution plan and this addendum fully before editing the repository.
2. Read `docs/WEBSITE_REDESIGN_PROGRESS.md` if it exists. If it does not exist, create it as required by the original plan.
3. Add this addendum to the progress log as a new binding requirement. Record that the previous permanent-Hugo decision has been superseded by a controlled framework evaluation.
4. Do not begin by installing a design framework, icon package, animation library, CMS, or new site generator. First inspect what is already present and capture the production baseline.
5. Complete only one small task at a time. Run its checks, inspect the diff, update the handoff log, and create one focused Git commit before continuing.
6. Stop at a clean task boundary if the context or quota is low. The next Gemini run must be able to resume using the two plans, progress log, and Git history.
7. Do not deploy unfinished work to production. Use a feature branch and Netlify deploy previews.
8. Never invent professional facts, experience, client names, results, metrics, awards, or product capabilities. Visual redesign does not authorize factual rewriting.
9. Do not publish third-party biographies from the supplied community introductions. They are not Dhruv's content.
10. The owner has a limited budget. Prefer static hosting, open-source tools, no recurring service subscriptions, no database, and no runtime server unless a proven requirement needs one.

### 1.1 Required progress-log information for each task

Record:

- Addendum phase and task ID.
- Task objective and exact scope.
- Files inspected and changed.
- Design decision and rationale, when applicable.
- Test commands and exact results.
- Responsive viewports and interaction states checked.
- Visual screenshot paths or test artifact identifiers.
- Accessibility result.
- Performance impact, if measurable.
- Route/content/API impact (must be `none` unless an explicitly approved addition is intended).
- `git diff --check` result.
- Commit hash and commit message.
- Open issue, risk, or decision needed.
- The exact next task ID.

### 1.2 Commit discipline

Use the existing feature branch from the original plan. Do not work directly on the production branch.

Examples:

```bash
git status --short
git diff --check
# Execute task-specific tests before staging.
git add <only-files-for-this-task>
git commit -m "docs(design): record visual audit and design requirements"
```

Never blindly stage the entire repository. Do not commit credentials, environment files, local caches, generated production output, private screenshots, or unrelated changes.

---

## 2. Hard constraints: URL, content, and integration preservation

The original plan's compatibility requirements remain fully binding. This addendum does not weaken them.

### 2.1 Existing public URL paths are immutable by default

Before migration, capture the currently deployed site and checked-out Hugo build into a machine-readable route manifest. Use the actual repository and production site; do not rely only on the list in the old plan.

At minimum, verify the existing known paths:

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
sitemap.xml
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
/feed.json
/index.json
```

This list is a starting point, not the full inventory. Include every article, alias, image, downloadable file, font, static file, `.well-known` endpoint, RSS output, JSON output, Markdown output, and any path referenced by external links or documents.

For every manifest entry, record as applicable:

- Requested URL and normalized canonical URL.
- Existing HTTP status and redirect chain.
- Content type.
- Whether the response is HTML, Markdown, JSON, RSS/XML, PDF, image, font, or another file type.
- Whether the URL depends on a Netlify redirect, rewrite, header, or Edge Function.
- Whether trailing slash behavior matters.
- Whether a query string changes the response.
- Whether the path is intentionally aliased.

Do not simplify this to “all pages load”. Verify exact routes and response types.

### 2.2 Preserve source content paths wherever technically practical

The owner is concerned about existing links and documentation. Public URLs are the primary compatibility contract, but repository paths may also be referenced by raw GitHub links, issue comments, external documentation, and authoring workflows.

- Keep original Markdown article files and legal content at their current repository paths by default.
- Before relocating any source file, search the repository and public sources for references to it.
- If Astro's content workflow can read the existing `content/` tree without moving it, prefer that approach.
- If a move is genuinely required, preserve the old source path through a compatibility file or another non-destructive mechanism, and document exactly what changes.
- Never delete or overwrite the original Hugo content during the proof-of-concept.
- Use explicit `slug`, `permalink`, or route mapping for each migrated content entry. Never rely on a new generator's inferred slug when an old public route exists.
- Keep article bodies, code examples, citations, image references, publication dates, and front matter semantics intact unless the owner specifically approves a content change.

### 2.3 Preserve machine-readable and non-visual behavior

The migration must preserve and verify all existing behavior discovered in the original plan and repository, including:

- `/resume.pdf` and every static download.
- `/feed.json` rewrite and `/index.json` output.
- RSS and any additional JSON/Markdown output formats.
- Markdown negotiation based on the request's `Accept: text/markdown` header.
- The `markdown-negotiation` Netlify Edge Function and its response headers, including `x-agent-ready: true` where currently expected.
- Existing `.well-known` resources and any `llms.txt`, `auth.md`, or agent-facing content files found in the actual repository.
- Sitemap and robots behavior.
- Security headers, CSP, caching, canonical redirects, HTTPS redirects, and any analytics that are currently intentional.
- Existing Netlify build previews and production branch configuration.

Do not remove an integration because it is invisible in the normal browser UI.

### 2.4 No route changes disguised as design improvements

Do not rename an article, change an article slug, normalize a legacy path, remove a trailing slash, change case, move a legal page, rename the résumé, or turn an existing public page into a client-only route. If a current route has multiple aliases, each must continue to work with the same intentional behavior.

---

## 3. Mandatory visual audit before implementation

The owner has identified inconsistent UI/UX across typography, containers, states, color, icons, and interactions. Do not jump straight to CSS changes. Create an evidence-based visual audit first.

### 3.1 Capture the current site

Capture the current production site and baseline build for:

- Home page.
- About page.
- Portfolio page.
- Projects page.
- Blog index.
- Series index.
- One long article with code blocks and media.
- One legal/policy page.
- Sitemap.

At minimum, capture desktop, standard mobile, narrow mobile, tablet, landscape, and high-width layouts. Record the viewport, browser, DPR, color scheme, and URL for each screenshot.

Do not use screenshots with different fonts, image loading states, or scroll positions as if they were directly comparable.

### 3.2 Produce a visual inconsistency inventory

Inspect the actual rendered site and record every recurring inconsistency. Include examples and screenshot references. Use these categories:

**Typography**

- More than one visual style for the same semantic text role.
- Inconsistent font family, weight, size, line height, tracking, capitalization, and text color.
- Heading levels that do not visually or semantically follow a coherent scale.
- Paragraphs, descriptions, captions, metadata, and lists that are difficult to distinguish.
- Overly long line lengths, overly small text, poor wrapping, or uneven paragraph spacing.
- Code, inline code, blockquotes, tables, and links that feel visually unrelated to the rest of the page.

**Layout and containers**

- Unrelated max-widths, side gutters, section padding, card padding, grid gaps, and alignment.
- Containers that change width unpredictably from one page to another.
- Cards with inconsistent heights, border radii, shadows, or content alignment.
- Text blocks that do not align with their related media or metadata.
- Overuse of cards where a simple editorial section would be clearer.
- Overlapping, clipped, or overly compressed layouts at specific aspect ratios.

**Color, contrast, and surfaces**

- Low contrast between text and background, including secondary/tertiary text.
- Different colors used for the same meaning.
- Too many accents, arbitrary gradients, inconsistent highlights, or decorative surfaces.
- Borders and dividers that are too visible, too faint, or inconsistent.
- Dark and light theme mismatches, if both themes exist.

**Interaction and component states**

- Buttons, links, nav items, menu items, cards, icon buttons, chips, tabs, and controls that have inconsistent states.
- Hover styles that are missing or overly dramatic.
- Active route, selected item, hover, keyboard focus, pressed, disabled, and loading states that are indistinguishable or missing.
- Elements that appear clickable but do not perform a clear action.
- Hover-only information that cannot be accessed on touch, keyboard, or TV remote.
- Focus rings that disappear, are clipped, or do not contrast with the surface.

**Visual details**

- Inconsistent icons, icon sizes, stroke weights, baseline alignment, and icon/text gaps.
- Arbitrary solid, dashed, and dotted line styles.
- Inconsistent separators, bullets, badges, highlighted code, callouts, and status indicators.
- Mixed shadow, blur, glass, and border treatments without a system.

**Motion**

- Interactions with no transition or with a transition that is too slow or too strong.
- Unnecessary continuous animation or expensive visual filters.
- Animations that trigger layout shifts, hide content before JavaScript starts, or block reading.
- Motion that cannot be disabled or reduced.

Deliver `docs/DESIGN_AUDIT.md` with:

1. Screenshot index.
2. Issue ID for each problem.
3. Page and component where it occurs.
4. Severity: blocker, high, medium, or low.
5. Screenshot/evidence reference.
6. Root cause, where identifiable.
7. Proposed design-system rule that resolves it.
8. Verification test that will prove it is fixed.

Commit the audit before beginning the broad visual rewrite.

---

## 4. Desired art direction: premium technical editorial, not a generic template

The site should have a recognizable visual identity while staying calm, highly readable, and credible to senior engineering/product audiences.

### 4.1 Core creative direction

Use a **precision technical editorial** direction:

- Editorial typography and strong information hierarchy.
- Spacious but efficient layout; whitespace should create hierarchy, not waste the viewport.
- Strong grid alignment with occasional intentional asymmetry.
- Subtle references to architecture diagrams, hardware interfaces, development tools, systems, and technical documentation.
- Real project visuals, screenshots, architecture diagrams, device frames, and carefully selected detail images when the owner has permission to publish them.
- Elegant, understated accent colors and precise micro-interactions.
- A distinctive but restrained identity across home, articles, portfolio, projects, and legal pages.
- Detailed content presentation without looking like an admin dashboard or a SaaS pricing page.

### 4.2 Avoid generic AI-generated portfolio aesthetics

Do not use these by default:

- Purple/blue neon gradient backgrounds across every section.
- Random glowing borders, blur, and glassmorphism on all cards.
- A huge wall of technology pills or badges in the hero.
- Repeated rounded rectangles for every possible content block.
- Random dotted grids or decorative lines with no semantic purpose.
- Terminal/command-line visuals that make the entire website look like a fake terminal.
- Excessive uppercase micro-labels or tiny metadata.
- Huge text that wraps poorly on phone and foldable screens.
- Generic stock photos of developers, code, circuit boards, or AI brains.
- Cursor trails, custom cursor replacements, scroll hijacking, or forced loading screens.
- Full-screen Three.js/WebGL/particle experiences as the default homepage.

Use a small number of strong design decisions consistently. Do not confuse visual complexity with design quality.

### 4.3 Design concepts before committing to a style

Build two or three small visual concept prototypes using the same representative content:

- Home hero and featured project section.
- Project card and project detail header.
- Article title/metadata and long-form article sample.
- Navigation and footer.

A design direction is not approved merely because its hero looks good. It must also work for dense paragraphs, code examples, legal text, tables, images, and long article reading.

Capture side-by-side screenshots and a short design rationale for each concept. Compare:

- Visual identity and distinctiveness.
- Typography and readability.
- Hierarchy and scanability.
- Consistency across templates.
- Responsive behavior.
- Accessibility and contrast.
- Performance cost.
- Long-term ease of maintaining the design system.

Select one direction and document why. Do not mix unrelated details from all concepts.

### 4.4 Light and dark themes

If both themes are retained or introduced:

- Both must be fully designed, not just inverted colors.
- Every surface, border, muted text, icon, code block, selected state, hover state, and focus state must have an intentional theme token.
- Default to the system color preference on a first visit.
- Offer a clearly labeled, keyboard-accessible theme control if a manual switch is provided.
- Persist a manual user choice without causing a flash of the wrong theme.
- If storage is unavailable, fall back gracefully to system preference.
- Do not make accent colors the only way to distinguish states.
- Verify contrast in both themes using the same automated checks.

Do not ship a theme toggle until both themes meet the same design and accessibility standards.

---

## 5. Design system: one source of truth for every visual decision

Create a small, documented design system before rebuilding individual page sections. All pages and components must use shared tokens and reusable components. Page-specific raw values must not grow into a second design system.

Suggested code organization (adapt to the final stack):

```text
src/
  styles/
    tokens.css
    themes.css
    typography.css
    reset.css
    global.css
    utilities.css
  components/
    site/
    navigation/
    typography/
    buttons/
    cards/
    metadata/
    feedback/
    content/
  layouts/
  pages/
  content/             # only if moving source content is proven safe
```

If keeping the current repository content tree is feasible, use it instead of relocating published source files.

### 5.1 Token layers

Use three layers:

1. **Primitive tokens:** raw palette, spacing, font sizes, radii, shadows, durations, and easing values.
2. **Semantic tokens:** `--color-text-primary`, `--color-surface-page`, `--color-border-subtle`, `--color-focus-ring`, and similar meaning-based values.
3. **Component tokens:** only where a component genuinely needs a controlled override, for example button height or card padding.

Do not scatter arbitrary hex colors, spacing values, and border radii across component stylesheets.

### 5.2 Required semantic color tokens

At minimum define semantic equivalents for:

**Text**

- Primary text.
- Secondary text.
- Tertiary/muted text.
- Inverse text.
- Link text.
- Visited link text (where relevant).
- Accent text.
- Disabled text.
- Text on accent surfaces.

**Surfaces**

- Page/background surface.
- Main content surface.
- Subtle/alternate surface.
- Raised/elevated surface.
- Inverse surface.
- Accent surface.
- Selected surface.
- Code/preformatted surface.
- Overlay/dialog surface.

**Borders and indicators**

- Subtle divider.
- Default border.
- Strong border.
- Interactive border.
- Selected border.
- Focus ring.
- Success, warning, error, and informational states.

Define tokens for each enabled theme. Semantic tokens must retain the same meaning across themes even if their raw colors differ.

### 5.3 Contrast requirements

Use WCAG 2.2 AA as the mandatory accessibility baseline:

- Normal text: at least 4.5:1 contrast.
- Large text: at least 3:1 contrast.
- Meaningful component boundaries and graphical indicators: at least 3:1 against adjacent colors where WCAG requires it.
- Verify button text, links, muted text, metadata, badges, code syntax, selection, hover, and focus—not only primary body text.
- Do not rely on opacity alone to create secondary text; calculate the final composite contrast.
- Disabled controls may have WCAG exceptions, but keep disabled labels perceivable and explain why the state is disabled where needed.
- Never use color as the only indicator for status or selection; combine color with shape, icon, text, or underline.

Run automated contrast tests on design tokens and browser-rendered states. Store the results in `docs/ACCESSIBILITY_AUDIT.md`.

### 5.4 Typography system — mandatory consistency

The current site needs a deliberate type scale. Create semantic text roles and use them consistently everywhere.

Required roles:

| Role | Usage | Design requirement |
|---|---|---|
| Display | Optional hero statement | Large, fluid, controlled line length; never force awkward wraps |
| H1 | One primary page heading | One consistent visual role per page |
| H2 | Major sections | Predictable scale and top/bottom spacing |
| H3 | Section subsections/cards | Distinct from body and H2 |
| H4 | Smaller grouped headings | Use only when document structure requires it |
| Lead | Opening description/deck | Larger than body, restrained line length |
| Body | Paragraphs and lists | Comfortable reading size and line height |
| Body-small | Secondary supporting copy | Still comfortably legible |
| Metadata | Date, role, tags, status, category | Clear, high enough contrast; never excessively tiny |
| Caption | Image descriptions and source notes | Smaller but readable and clearly secondary |
| Eyebrow/overline | Small category label | Consistent tracking/case; use sparingly |
| Navigation | Main and secondary navigation | Consistent size, weight, and target dimensions |
| Button label | All button variants | Same type role across all sizes |
| Inline code | Technical terms in body text | Distinct background/color without disrupting line height |
| Code block | Multi-line samples | Monospace, scrolls horizontally only within its own code region |
| Blockquote | Quoted material | Consistent border/marker, text size, and spacing |

Suggested starting scale (calibrate through screenshots and real device checks):

```css
:root {
  --font-display: clamp(2.75rem, 6.5vw, 5.5rem);
  --font-h1: clamp(2.25rem, 4.8vw, 4.25rem);
  --font-h2: clamp(1.75rem, 3vw, 2.75rem);
  --font-h3: clamp(1.375rem, 2vw, 1.75rem);
  --font-h4: 1.1875rem;
  --font-lead: clamp(1.125rem, 1.5vw, 1.3rem);
  --font-body: 1rem;
  --font-body-small: 0.9375rem;
  --font-metadata: 0.8125rem;
  --font-caption: 0.8125rem;
  --font-overline: 0.75rem;
  --font-code: 0.875rem;
}
```

These are starting values, not permission to use a fixed scale without testing. Adjust them based on the actual selected font, language, device width, and readability.

Typography rules:

- Use `rem` for type sizes and line-height ratios, not a scatter of pixel sizes.
- Prefer one well-chosen variable font family for the interface and one system monospace stack for code. A second font family is allowed only when there is a visible, measurable design benefit.
- Self-host WOFF2 font files; do not make the page wait for a third-party font service.
- Verify the font license before bundling it.
- Use `font-display: swap` or a similarly resilient strategy and metric-compatible fallbacks to reduce layout shift.
- Do not load unused font weights or styles.
- Ensure the system fallback still looks intentional and readable.
- Body text should normally be at least 1rem (16 CSS px) on desktop/mobile unless a specific exception is justified and tested.
- Aim for body line-height around 1.55–1.75 depending on font and content; headings can be tighter.
- Long-form text should generally measure around 60–75 characters per line on desktop. Use `ch`/max-width constraints rather than arbitrary fixed widths.
- Keep paragraphs, lists, headings, captions, and metadata vertically consistent.
- Do not use uppercase styling on long phrases or body copy.
- Never fake hierarchy by making every label bold or every heading enormous.
- Preserve sensible line wrapping on 320px-wide screens and when text is zoomed to 200–400%.

### 5.5 Spacing, grid, and container system

Define a coherent spacing scale (for example, 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128 CSS px, adjusted as tokens). Use it consistently.

Create semantic layout primitives:

- `page-shell` — overall page structure.
- `container` — default bounded content width.
- `container-wide` — project grids and wide visual sections.
- `container-reading` — long-form text and legal content.
- `section` — consistent vertical section rhythm.
- `stack` — vertical spacing between related children.
- `cluster` — wrapping row of related inline items.
- `grid` — responsive project/card layout.
- `media-frame` — image/video aspect ratio and fit behavior.

Rules:

- Use `min()`, `max()`, `clamp()`, `minmax()`, CSS Grid, Flexbox, and intrinsic sizing where appropriate.
- Use logical properties (`margin-inline`, `padding-block`, `inset-inline`, etc.) instead of assuming left/right.
- Avoid hard-coded heights for content containers.
- Use `min-height` only when it serves a real visual purpose.
- Never let a hero force a full-screen height on short viewports.
- Keep visual alignment consistent across the navigation, page title, sections, card grids, and footer.
- Define breakpoints based on the content's need to reflow, not named device assumptions.
- Use container queries only where a component truly needs to respond to its own width; provide a safe baseline for browsers that do not support them.

### 5.6 Surface, card, border, and divider system

Define a limited number of reusable surfaces:

- Flat editorial section.
- Subtle inset surface.
- Standard card.
- Elevated/overlay card (rare).
- Media panel.
- Code panel.
- Callout/notice panel.

For each one define padding, radius, border, background, text hierarchy, and responsive behavior.

Border rules:

- Use one consistent default border weight and a small set of semantic border colors.
- Use subtle solid dividers for normal content structure.
- Use dashed or dotted lines only for a clearly intentional technical/diagram motif or to communicate a distinct relationship.
- Do not alternate solid/dashed/dotted borders randomly from component to component.
- A dotted line must never reduce contrast or create a false impression of a disabled element.
- Use shadows and blur sparingly; prefer clean surfaces and borders over multiple stacked shadows.

### 5.7 Icons and symbols

- Choose one coherent icon family (for example, a consistent Lucide outline set) or use a small internally managed inline SVG set.
- Do not mix filled, outlined, emoji, and unrelated third-party icon styles in one component family.
- Standardize icon sizes (for example, 16, 18, 20, and 24 CSS px), stroke width, line caps, and alignment.
- Icons next to text must align to the text baseline/center and use a consistent gap.
- Use decorative icons with `aria-hidden="true"`.
- Icon-only buttons require a meaningful accessible name, a visible hit area, and an accessible tooltip where appropriate.
- Do not make an icon the only communication for an important error, warning, or status.
- Prefer optimized inline SVG over large icon fonts or loading an entire library for a handful of icons.

---

## 6. Complete interaction-state system

A polished site must define every state, not just the default and hover state. Create a state matrix and demonstrate it in the design-system preview.

### 6.1 Mandatory states

For every interactive component, define and test:

1. Default/resting.
2. Hover — pointer devices only; do not depend on it.
3. Keyboard focus-visible.
4. Pressed/active while activating.
5. Selected — for a chosen tab, filter, theme, or option.
6. Current — for the current route/navigation item.
7. Visited — for visited links where useful and not confusing.
8. Disabled/unavailable.
9. Loading/busy, if the component performs an asynchronous action.
10. Error/validation, if the component accepts or processes input.
11. Expanded/collapsed, where applicable.
12. Empty state, where applicable.

Do not use the word “active” as a substitute for all of hover, selected, current, and pressed. They are different states and need separate styling and semantics.

### 6.2 Required interaction inventory

Build reusable and visually consistent components for:

- Primary, secondary, tertiary/ghost, and destructive buttons (only where destructive action exists).
- Inline text links and external links.
- Icon-only buttons.
- Desktop navigation items and mobile menu controls.
- Current/active navigation indicator.
- Project cards and article cards.
- Category chips, tags, and status badges.
- Tabs or segmented controls, only where they improve information organization.
- Table of contents and anchor links.
- Breadcrumbs where useful.
- Code-copy control.
- Theme toggle, if retained.
- Back-to-top/reading progress control, only if it adds real value and is accessible.
- Social/contact links.
- Dialog, popover, or menu only when required by the design.

Do not add controls simply to make the site feel interactive. Every interactive control must have an obvious purpose.

### 6.3 Button rules

- A button must look like an action; an inline link must look like navigation.
- Primary action should be visually clear without competing with multiple primary buttons in the same region.
- Use consistent height, horizontal padding, icon gap, border radius, and typography across button variants.
- Ensure focus, hover, pressed, disabled, and loading states are visually distinguishable.
- Use a semantic `<button>` for actions and `<a>` for navigation.
- Do not use clickable `<div>` or `<span>` elements.
- Never remove the browser's focus indicator without a stronger visible replacement.
- Ensure buttons remain comfortable to activate on touch and remote controls. WCAG 2.2 AA's target-size minimum is 24×24 CSS px subject to its exceptions; aim for at least 44×44 CSS px for primary touch controls wherever practical.

### 6.4 Links and navigation rules

- Links must have a consistent, recognizable treatment in paragraphs and navigation.
- Do not rely on color alone. Use underline or another persistent visual cue for inline content links.
- Navigation current state must be perceivable without hover.
- Hover may alter color, underline, border, or a small transform, but must not cause layout shift.
- External links should be identifiable when the distinction matters; do not append an icon to every link unnecessarily.
- Visited links must remain legible and should not be confused with active navigation.
- New-window behavior must be deliberate; avoid opening every link in a new tab.
- Use descriptive link text, not “click here”.
- Menus must work with keyboard, touch, pointer, and TV remote/keyboard navigation.

### 6.5 Focus and selection

- Use `:focus-visible` for a consistent, high-contrast, clearly visible outline.
- Focus must not be clipped by `overflow: hidden` or hidden under sticky navigation.
- Current and selected items must have an additional shape, underline, border, marker, or semantic state—not color alone.
- Use `aria-current="page"` for the current page link where appropriate.
- Use proper ARIA patterns only when a native HTML element cannot express the interaction.
- Do not add unnecessary `role` or `aria-*` attributes that conflict with native semantics.

### 6.6 Touch and hover behavior

Use hover enhancement only for fine-pointer devices, for example:

```css
@media (hover: hover) and (pointer: fine) {
  /* Optional hover-only enhancement. */
}
```

Touch users must receive the same content and functionality without hover. Avoid sticky hover effects on touch devices.

---

## 7. Animation and motion system

The site should feel thoughtfully animated, not constantly animated. Strong art direction comes from timing, restraint, and continuity—not the number of effects.

### 7.1 Allowed motion patterns

Use motion for a clear purpose:

- Button and link feedback.
- Menu open/close transitions.
- Small card/media hover feedback.
- Subtle page/view transition where supported.
- Small opacity/transform entrance for a limited number of elements.
- A subtle progress indicator for long articles when useful.
- Small diagram or image reveal that does not delay access to the content.

Create shared motion tokens, for example:

- Fast feedback: roughly 100–150 ms.
- Standard control transition: roughly 160–220 ms.
- Panel transition: roughly 200–300 ms.
- Larger editorial transition: roughly 250–400 ms.

Choose easing curves intentionally. Do not apply one long transition to every property.

### 7.2 Performance rules

- Prefer CSS transitions/animations for simple state changes.
- Prefer `transform` and `opacity` for animated movement/fades.
- Avoid repeatedly animating `width`, `height`, `top`, `left`, margins, shadows, large blur filters, and other properties that cause layout or paint work unless profiling proves the effect is inexpensive enough.
- Do not use `will-change` indiscriminately; add it only after profiling demonstrates a need and remove it when the animation ends if appropriate.
- Do not run continuous JavaScript animation loops when the page is idle.
- Do not attach scroll listeners to every element or use scroll hijacking.
- Keep the number of simultaneously animated elements low, especially on mobile and TV browsers.
- Avoid large fixed blurred backgrounds, full-page canvas effects, video backgrounds, and WebGL in the default experience.
- Do not defer content visibility until JavaScript runs. Content must remain available if scripts fail or are disabled.
- Verify animation smoothness on a low-end Android device or a throttled CPU profile, not only a modern MacBook.

### 7.3 Reduced motion and manual control

- Respect `prefers-reduced-motion: reduce`.
- Remove non-essential movement, parallax, staggered reveals, and view transitions under reduced motion.
- Keep state changes understandable without movement.
- If any continuous decorative motion is retained, provide a clear pause/disable control and stop it when not visible.
- Do not trigger motion automatically on every scroll when the same design works as a static composition.

### 7.4 Optional advanced motion

Astro View Transitions may be tested for continuity between pages. They are optional, not mandatory. Astro documents native transition options, fallback behavior, and reduced-motion/accessibility support. Verify focus, scroll restoration, screen-reader announcement, browser history, and back/forward navigation before enabling client-side navigation. A normal browser page navigation is preferable to a broken transition.

Do not add GSAP, Motion, Framer Motion, Lottie, or Three.js unless a specific, approved visual behavior cannot be achieved simply and the loaded JavaScript/performance budget remains within target.

---

## 8. Responsive and adaptive design requirements

Do not design one desktop screenshot and shrink it. Each component must adapt to its available space, content length, and input mode.

### 8.1 Screen and viewport coverage

Test at least these representative sizes. Add more when the content breaks between them.

| Class | Example viewport | Important cases |
|---|---:|---|
| Tiny/old phone | 320×568 | Narrow text, buttons, nav, long words |
| Common phone | 360×800 | Standard Android portrait |
| Modern phone | 390×844 | Typical mobile layout |
| Large phone | 430×932 | Wider card/text balance |
| Foldable outer display | 360×800 | Narrow closed layout |
| Foldable inner display | 673×841 or equivalent | Expanded layout, optional hinge awareness |
| Small tablet | 600×960 | Transition from stacked to split layout |
| Tablet portrait | 768×1024 | Tablet navigation and grid |
| Tablet landscape | 1024×768 | Reduced height and wider content |
| Small laptop | 1280×720 | Short viewport height |
| Desktop | 1440×900 | Main portfolio design target |
| Wide desktop | 1920×1080 | Avoid endless text line lengths |
| Ultrawide | 2560×1080 | Bounded content and balanced whitespace |
| 4K display | 3840×2160 | Appropriate maximum content width and scaling |
| TV browser | 1920×1080 | Ten-foot text readability and remote navigation |
| Short landscape | 640×360 | Header/hero must not clip or dominate |

Also test:

- Portrait and landscape orientation changes while the page is open.
- Browser zoom at 200% and 400% where applicable.
- Increased text size and user font preferences.
- DPR 1 and higher DPR screens.
- Safe-area insets on edge-to-edge devices where relevant.
- Narrow browser windows and split-screen/floating windows.
- Extremely long headings, descriptions, tags, article titles, URLs, and code lines.
- No horizontal page overflow; code blocks may have their own contained horizontal scroll when necessary.

### 8.2 Breakpoint and layout principles

- Base layout must be functional at 320 CSS px.
- Let content determine when grids collapse or navigation changes.
- Do not use device-name detection or user-agent sniffing for layout decisions.
- Use CSS Grid/Flexbox and intrinsic sizing.
- Prefer one-column reading layout on narrow widths and a bounded multi-column grid where it improves scanability.
- Use CSS logical properties.
- Avoid fixed heights for text containers.
- Ensure the site remains usable in portrait and landscape, folded and unfolded states.
- Use viewport-segment and device-posture APIs only as optional progressive enhancements; the responsive layout must work without them.
- Do not assume Android TV has a mouse. Provide strong focus indication and predictable sequential focus for remote/keyboard input.

### 8.3 TV and older browser considerations

The site is not a TV application, but must remain readable and operable in a TV browser:

- Larger, clear text and enough spacing for remote selection.
- Strong visible focus states.
- No hover-dependent essential behavior.
- Avoid tiny icon-only controls.
- Keep navigation order predictable.
- Avoid complex interactions that require pointer precision.

For older browsers/devices, use progressive enhancement. Core content, links, navigation, and page layouts must work without advanced APIs. If a feature is not supported, it should simply not enhance the experience; it must not break the page.

---

## 9. Framework migration: Hugo to Astro evaluation and execution

### 9.1 Why Astro is the preferred candidate

Astro fits this site because:

- It is designed for content-heavy websites and static output.
- Its components can render to HTML/CSS without a client-side JavaScript runtime by default.
- Interactive UI can be isolated into small islands instead of hydrating every page.
- Markdown and MDX are supported for writing and richer content composition.
- Layouts and components are easier to reason about as reusable visual building blocks than a pile of unrelated page overrides.
- Astro has a documented Netlify static deployment workflow using `astro build` and the `dist` output directory.

Official references:

- Astro islands architecture: <https://docs.astro.build/en/concepts/islands/>
- Astro content collections: <https://docs.astro.build/en/guides/content-collections/>
- Astro Markdown/MDX: <https://docs.astro.build/en/guides/markdown-content/>
- Astro view transitions: <https://docs.astro.build/en/guides/view-transitions/>
- Astro Netlify deployment: <https://docs.astro.build/en/guides/deploy/netlify/>

Astro is not automatically faster than Hugo in every metric. Hugo is a strong control and can have very fast build times. The decision must be based on a real proof-of-concept, actual output, maintainability, route parity, and measured performance—not a claim that one framework is universally superior.

### 9.2 Framework decision scorecard

Create `docs/FRAMEWORK_DECISION.md` and compare Hugo, Astro, and only one realistic alternative (Eleventy unless repository evidence suggests otherwise).

Score each category from 1 to 5 and explain the evidence. Suggested weights:

| Category | Weight |
|---|---:|
| URL/content migration safety | 20% |
| Design-system and component maintainability | 20% |
| Real-device performance and output weight | 20% |
| Easy Markdown/MDX authoring | 15% |
| Netlify static deployment and preview support | 10% |
| Ease of development and future updates | 10% |
| Build reliability and local setup simplicity | 5% |

Do not fabricate scores. Mark unknowns as unknown and prove them in the spike.

### 9.3 Astro proof-of-concept — do not migrate all pages yet

Create a small isolated branch or clearly separated spike that:

1. Installs the smallest stable Astro setup that satisfies the project.
2. Builds one home-like page, one project card, and one long-form Markdown article.
3. Uses the proposed design tokens and components.
4. Includes only essential interactivity (for example, a responsive navigation toggle) as a small island or native script.
5. Generates static output.
6. Deploys to a Netlify Deploy Preview.
7. Tests a representative old route and trailing-slash behavior.
8. Demonstrates Markdown/MDX authoring.
9. Measures built HTML, CSS, JS, font, and image payloads.
10. Verifies the desired typography, layout, motion, accessibility, and browser fallback behavior.

Do not copy all content or remove Hugo yet.

### 9.4 Static-first Astro architecture if the spike passes

Recommended target architecture:

```text
src/
  components/
    Header.astro
    Footer.astro
    Button.astro
    Icon.astro
    ProjectCard.astro
    ArticleCard.astro
    Metadata.astro
    Tag.astro
    Callout.astro
    TableOfContents.astro
    CodeBlock.astro
  layouts/
    BaseLayout.astro
    MarketingLayout.astro
    ArticleLayout.astro
    LegalLayout.astro
  pages/
    index.astro
    about/index.astro
    portfolio/index.astro
    projects/index.astro
    posts/index.astro
    sitemap/index.astro
    ...
  styles/
    tokens.css
    themes.css
    typography.css
    global.css
  content/              # use only if original content files must be migrated
public/
  resume.pdf
  images/
  fonts/
  ...
netlify/
  edge-functions/
  ...
```

This is illustrative. Adapt to the actual project and preserve the current repository content paths wherever possible.

Implementation rules:

- Use `.astro` components for static layout and content by default.
- Add TypeScript for small helpers and content schemas.
- Use Markdown/MDX for articles and case studies.
- Use `client:*` hydration directives only for specific components that require browser interaction.
- Do not create a global React runtime or hydrate the whole site unnecessarily.
- Avoid adding React/Svelte/Vue solely because Astro supports them.
- Prefer browser-native HTML elements and CSS before adding dependencies.
- Avoid server-side rendering and server adapters unless a proven requirement needs them.
- Keep static output as the default.
- Keep Netlify as host and use Git-based deploy previews.
- Pin dependency versions and commit the lockfile.
- Document the required Node version and the exact local build commands.

### 9.5 Netlify deployment after Astro migration

If Astro is selected and the build is static, verify the Netlify configuration uses the correct command and output directory. The current Hugo configuration uses a different publish directory. Do not change it until the new build and preview are proven.

Typical static Astro settings are:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

Use the current LTS Node version supported by the project and Netlify, pin it in the repository, and test the exact version in CI/Netlify. Do not assume the example above overrides the account's current build configuration correctly until a deploy preview proves it.

### 9.6 Migration order

If Astro wins the framework evaluation:

1. Preserve the old Hugo branch/build and route manifest.
2. Create the Astro base project without removing Hugo sources.
3. Implement tokens and global typography.
4. Implement the shared shell and navigation.
5. Port one representative route and verify the route exactly.
6. Port one article and confirm the article body/code/media are preserved.
7. Implement legacy aliases and trailing-slash behavior.
8. Implement all required output formats and static files.
9. Port page templates in small batches.
10. Re-run route, file, response-header, Edge Function, and link tests after each batch.
11. Remove or retire Hugo only after the complete Astro route contract passes and rollback is documented.

Do not keep two active sets of layouts indefinitely. Once Astro is proven and approved, finish the migration cleanly, but retain a rollback branch/tag and preserve old source history in Git.

---

## 10. Content management and publishing workflow

The owner wants easy website management from anywhere, including article writing and updates. Keep this workflow simple and inexpensive.

### 10.1 Required baseline workflow

The website must support:

- Writing an article from a browser using GitHub's web editor.
- Updating existing Markdown content without needing to install the project locally.
- Uploading optimized images to a predictable content folder.
- Automatic Netlify deployment after a commit or merge.
- Deploy Preview before production for major changes.
- A documented article template with title, description, date, tags, slug, draft flag, cover image (optional), and canonical URL rules.
- A clear media naming and image-optimization convention.

Create `docs/WRITING_AND_PUBLISHING.md` with a step-by-step workflow understandable without frontend expertise.

### 10.2 Optional visual CMS evaluation

A CMS may be considered, but it must not become a prerequisite for website operation.

Evaluate Decap CMS only after the framework and content schema have stabilized:

- Decap CMS is a Git-based editor for static-site content.
- It can provide browser editing, previews, and media uploads.
- Its GitHub backend needs an appropriate authentication setup; the official documentation notes that a server is needed for GitHub authentication unless a hosted service such as Decap Turbo is used.
- Check current Netlify account capabilities, authentication support, costs, and security before choosing a backend.
- Do not assume old Netlify Identity or Git Gateway tutorials still match the current account offering.
- Never commit OAuth secrets or personal access tokens into the frontend.
- Protect `/admin/` and verify authorization, roles, repository permissions, and draft/preview behavior.

Official references:

- Decap overview: <https://decapcms.org/docs/intro/>
- GitHub backend: <https://decapcms.org/docs/github-backend/>
- Backends overview: <https://decapcms.org/docs/backends-overview/>

If the CMS adds authentication complexity or costs that are not justified, keep the GitHub editing workflow. A simple, reliable GitHub workflow is better than an unreliable dashboard.

---

## 11. Page-by-page design requirements

All current public pages must be rebuilt from the same design tokens and components while preserving their path and content.

### 11.1 Home `/`

- Clear identity and role statement.
- Concise introduction with a deliberate text hierarchy.
- Primary and secondary calls to action with consistent button rules.
- A restrained capability overview; no wall of badges.
- Curated flagship projects with consistent media aspect ratios and metadata placement.
- Evidence-led experience/impact section.
- Selected writing and community/open-source content where accurate.
- Footer with coherent link and social treatments.

### 11.2 About `/about/`

- Same page title, lead, body, and section hierarchy used elsewhere.
- Career narrative that is easy to scan.
- Skill and specialization groupings with consistent chips or lists.
- No arbitrary skill proficiency percentages.
- Preserve aliases and current public content.

### 11.3 Portfolio `/portfolio/`

- Clear separation of featured work, professional contributions, personal projects, and open source where supported by the owner's real history.
- Project cards use the same component and state rules as `/projects/`.
- Distinguish confidential or illustrative work from publicly verifiable work.
- Evidence and attribution are easy to understand.

### 11.4 Projects `/projects/`

- Consistent project grid, card ratio, category labels, title, summary, and metadata.
- Projects should not all look like generic cards; use layout variation only within the system.
- Detailed project sections need predictable hierarchy for overview, problem, role, architecture, constraints, trade-offs, outcomes, visuals, and links.
- Do not invent project detail where the original content does not support it.

### 11.5 Posts `/posts/` and series/article pages

- Blog index has a consistent content listing, title, summary, date, tags, and reading metadata.
- Series index makes the six-part sequence easy to browse.
- Article body uses a reading-width container and excellent typography.
- Code blocks have stable contrast, syntax colors, copy feedback, and contained horizontal scrolling.
- Tables, blockquotes, images, captions, lists, inline links, and callouts are styled consistently.
- Table of contents, if added, must be keyboard-accessible and useful on both mobile and desktop.
- Keep the actual article body and existing article URLs unchanged unless owner approval is explicit.

### 11.6 Legal pages `/other/...`

- Use a readable legal-document layout with clear section hierarchy and a bounded line length.
- Preserve all legal wording and dates during the design refactor.
- Use the same typography, link, table, and focus styles as the rest of the site.
- Do not hide required legal links or make the text low contrast.

### 11.7 Sitemap and document endpoints

- Human-readable sitemap uses the same global heading, link, and container styles.
- XML sitemap remains machine-readable.
- `/resume.pdf` remains the same public URL.
- Feeds, JSON, Markdown endpoints, and other static resources must not accidentally receive the HTML page shell.

---

## 12. Testing strategy: design consistency must be testable

A design system that exists only in a design file or CSS comments is not enough. Add verification that catches inconsistencies and regressions.

### 12.1 Design-system preview page

Create a non-indexed, development/preview-only style guide or component showcase. It must render the actual production components, not a separate hand-built mock.

It should demonstrate:

- All heading levels and text roles.
- Paragraphs, lists, links, inline code, code blocks, blockquotes, tables, captions, and metadata.
- Every button variant and all interaction states.
- Navigation default/current/hover/focus/pressed states.
- Cards, project cards, article cards, tags, badges, callouts, dividers, containers, and media frames.
- Light and dark themes, if enabled.
- Mobile and desktop layout behavior.
- Reduced-motion behavior.

The page must be `noindex` and must not appear in the production sitemap. Prefer excluding it from the production build unless it has a deliberate owner-approved purpose.

### 12.2 Visual regression with Playwright

Add Playwright screenshot tests for every major page template and representative content states.

Minimum routes:

- `/`
- `/about/`
- `/portfolio/`
- `/projects/`
- `/posts/`
- `/posts/ai_playground_series/`
- At least one long article containing code, lists, and images.
- One legal/policy page.
- `/sitemap/`
- Design-system preview in a deploy preview/local build only.

Minimum viewports:

- 320×568.
- 360×800.
- 390×844.
- 430×932.
- 600×960.
- 768×1024 portrait.
- 1024×768 landscape.
- 1280×720.
- 1440×900.
- 1920×1080.
- 2560×1080.
- 3840×2160 (or a documented scaled screenshot strategy if the test runner cannot capture native 4K reliably).

Test both theme modes if applicable. Include menu-open, keyboard-focus, hover (fine pointer), selected tab/filter, and reduced-motion screenshots where those states exist.

Stabilize screenshot tests:

- Wait for `document.fonts.ready`.
- Wait for required images to complete or use deterministic fixtures.
- Disable motion only for screenshot stabilization; separately test motion behavior.
- Use stable data and deterministic dates/content.
- Mask only genuinely variable regions and document why.
- Review all changed screenshots; do not automatically approve snapshots to silence failures.

### 12.3 Functional interaction tests

Playwright must verify:

- Navigation links resolve to the intended route.
- Mobile navigation opens/closes by button, Escape, outside click (if designed), and link selection.
- Keyboard navigation order is logical.
- Focus is visible and not hidden.
- Current route is exposed semantically.
- Theme toggle works and persists correctly, if included.
- Code-copy action copies the correct text and provides feedback.
- Table-of-contents anchors scroll to the correct headings.
- External links have expected behavior.
- Controls do not rely on hover.
- Browser back/forward works if view transitions/client routing are enabled.
- Page content remains readable with JavaScript disabled.

### 12.4 Unit and component tests

Use Vitest for pure functions and helpers. Add component tests for meaningful interactive components. Do not add tests that only duplicate framework behavior.

Test:

- Route/slug normalization helper (if one exists).
- Reading-time utility (if used).
- Content metadata/schema validation.
- Date formatting and article ordering.
- Theme preference logic.
- Navigation current-state logic.
- Accessible labels and interaction states for interactive components.
- Any component state machine beyond simple native HTML.

### 12.5 Accessibility tests

- Run axe-core or an equivalent automated scan across all major page templates.
- Require zero critical/serious automated violations, unless a documented third-party issue is outside the site's control and has an approved mitigation.
- Run keyboard-only tests.
- Test focus visibility, logical focus order, skip link, menu behavior, headings, landmarks, labels, link purpose, alt text, contrast, zoom/reflow, and reduced motion.
- Conduct screen-reader spot checks with at least one desktop screen reader and one mobile screen reader when available.
- Automated tools do not prove WCAG conformance; record manual checks separately.

### 12.6 Route and content regression tests

- Compare the new build against the frozen route manifest.
- Test every legacy route for expected status and redirect chain.
- Verify canonical URL and trailing slash.
- Verify every published article's title and body are present.
- Compare original content file hashes or normalized content snapshots where appropriate.
- Verify images, downloadable files, fonts, feed, JSON, RSS, Markdown output, and `.well-known` resources.
- Test both browser `Accept: text/html` and machine `Accept: text/markdown` requests.
- Verify response headers and MIME types.
- Crawl internal links and report broken external links separately (external sites may be temporarily unavailable).

---

## 13. Performance budgets and benchmark expectations

Measure the production baseline before changes, then compare the deploy preview and production release. Report both lab data and field data accurately; do not claim CrUX/field Core Web Vitals where no field data exists.

### 13.1 Core Web Vitals targets

At the 75th percentile of real-user data where available, aim for:

- LCP ≤ 2.5 seconds.
- INP ≤ 200 milliseconds.
- CLS ≤ 0.1.

These are Google's “good” thresholds. Use Lighthouse and WebPageTest for lab diagnostics, and PageSpeed Insights/Search Console for field evidence when sufficient data exists.

### 13.2 Suggested initial payload budgets

Use these as targets to challenge and refine—not as permission to hide oversized assets in a different category.

| Resource | Suggested target |
|---|---:|
| Initial route JavaScript | ≤ 30 KB gzip where practical |
| Initial route CSS | ≤ 60 KB gzip |
| Custom font payload | ≤ 100 KB total preferred; system stack is acceptable |
| Above-the-fold hero image | ≤ 200 KB where visual quality permits |
| Total initial first-view transfer | Aim ≤ 750 KB compressed |
| Third-party blocking scripts | 0 by default |
| Long main-thread tasks | None attributable to decorative site code |

Record actual values, explain any exception, and avoid optimizing for a single Lighthouse score at the expense of real usability.

### 13.3 Low-end device testing

At minimum:

- Test on a real lower-end Android phone if available.
- Otherwise use a documented CPU/network throttling profile in Chromium DevTools/Playwright.
- Test slow 4G and a slower network profile.
- Test with cache disabled and with a warm cache.
- Inspect paint flashing and the Performance panel for unnecessary repaints and long tasks.
- Test animation on a CPU-throttled profile.
- Confirm no continuous animation burns CPU while the page is idle.
- Check page responsiveness while images and fonts are loading.

### 13.4 Benchmark tools

Use and save reports from:

- Lighthouse CLI or Lighthouse CI.
- PageSpeed Insights: <https://pagespeed.web.dev/>
- WebPageTest: <https://www.webpagetest.org/>
- Chrome DevTools Performance and Network panels.
- Core Web Vitals data in Search Console where available.
- axe-core for automated accessibility.
- Playwright for screenshots and responsive/interaction checks.
- W3C Nu HTML Checker for HTML validation.

Benchmark at least home, one project page, posts index, one long article, and one legal page. Do not measure only the homepage.

---

## 14. Small, resumable implementation phases

Every task below must be small enough for an AI agent to complete in a limited context window. Do not combine several tasks into one large “redesign” commit.

### Phase A0 — Reconcile plans and establish the safe baseline

**Goal:** Make this addendum binding and capture evidence before changing the visual system.

**Task A0.1 — Update project handoff**

- Read the original plan and this addendum.
- Update `docs/WEBSITE_REDESIGN_PROGRESS.md` with the changed framework decision.
- Explicitly record that Hugo is now a baseline/candidate, and Astro is the preferred proof-of-concept candidate.
- Record that URL, content, source-path, and integration preservation remain mandatory.
- **Commit:** `docs(site): add design-system and framework migration requirements`

**Task A0.2 — Capture repository and production baseline**

- Confirm branch, `HEAD`, clean/dirty state, Hugo version, Node version, Netlify build settings, and submodule state.
- Capture current build output and production behavior.
- **Commit:** `docs(site): record pre-migration build baseline`

**Task A0.3 — Generate complete legacy route manifest**

- Generate a machine-readable manifest from the existing build and crawl the live site.
- Include route, status, redirect, MIME type, file, alias, and output-format information.
- **Commit:** `test(routes): freeze complete legacy URL contract`

**Phase A0 exit:** Baseline is reproducible and the route/content contract is recorded.

### Phase A1 — Visual and interaction audit

**Goal:** Identify the current inconsistencies with evidence.

**Task A1.1 — Capture page screenshots**

- Capture the required pages at desktop, mobile, tablet, and landscape widths.
- Record viewport, theme, and browser.
- **Commit:** `test(visual): capture existing site screenshot baseline`

**Task A1.2 — Audit typography and reading hierarchy**

- Record inconsistent font families, sizes, weights, line heights, spacing, labels, descriptions, and content widths.
- **Commit:** `docs(design): audit typography and content hierarchy`

**Task A1.3 — Audit components and states**

- Record buttons, links, menu items, containers, cards, dividers, icons, focus/hover/selected/disabled states, and theme inconsistency.
- **Commit:** `docs(design): audit component and interaction states`

**Task A1.4 — Audit responsive and motion behavior**

- Record broken ratios, viewport issues, layout shifts, inaccessible hover behavior, reduced-motion problems, and expensive animations.
- **Commit:** `docs(design): audit responsive behavior and motion`

**Phase A1 exit:** `docs/DESIGN_AUDIT.md` is complete and contains issue IDs and evidence.

### Phase A2 — Art direction and visual concepts

**Goal:** Choose one coherent direction before broad implementation.

**Task A2.1 — Produce design principles and concept options**

- Produce two or three small concept directions using the same sample page content.
- Avoid generic AI portfolio patterns.
- **Commit:** `docs(design): define portfolio art direction options`

**Task A2.2 — Prototype representative screens**

- Prototype hero, project card/detail, article header/body, navigation, and footer for each concept.
- Use the actual content hierarchy.
- **Commit:** `feat(design): prototype portfolio visual directions`

**Task A2.3 — Evaluate and choose one direction**

- Compare on hierarchy, consistency, readability, responsiveness, accessibility, performance, and maintainability.
- Document selected direction and why alternatives were rejected.
- **Commit:** `docs(design): approve portfolio visual direction`

**Phase A2 exit:** There is one documented direction that works for both marketing and long-form content.

### Phase A3 — Design tokens and typography

**Goal:** Establish the visual foundation.

**Task A3.1 — Add primitive and semantic color tokens**

- Add light/dark semantic tokens if both themes are in scope.
- Run contrast checks for all text and component roles.
- **Commit:** `style(design): define semantic color and surface tokens`

**Task A3.2 — Define typography roles and scale**

- Add consistent display, H1–H4, lead, body, small, metadata, caption, overline, navigation, button, and code roles.
- Check fallback font behavior and font loading.
- **Commit:** `style(design): standardize typography system`

**Task A3.3 — Define spacing, layout, grid, and radii**

- Add spacing scale, bounded containers, reading widths, layout primitives, border, radius, and shadow tokens.
- **Commit:** `style(design): define responsive layout and surface tokens`

**Task A3.4 — Document icon and divider rules**

- Select one icon style and specify size/stroke/alignment rules.
- Specify when solid/dashed/dotted separators may be used.
- **Commit:** `docs(design): document icon and divider standards`

**Phase A3 exit:** Tokens and typography roles are documented and available in code. No page-specific redesign has started yet.

### Phase A4 — Component foundation and state system

**Goal:** Make repeated visual elements consistent.

**Task A4.1 — Build core typography/content components**

- Implement heading, lead, body, metadata, caption, link, code, blockquote, list, table, and callout styles.
- **Commit:** `feat(ui): add consistent typography and content primitives`

**Task A4.2 — Build buttons and link components**

- Implement primary/secondary/tertiary buttons and inline/external link treatments.
- **Commit:** `feat(ui): standardize buttons and links`

**Task A4.3 — Build cards, tags, badges, and dividers**

- Implement reusable visual patterns without forcing every section into a card.
- **Commit:** `feat(ui): standardize cards metadata and separators`

**Task A4.4 — Implement and test the state matrix**

- Default, hover, focus-visible, pressed, selected, current, visited, disabled, loading, error, and expanded/collapsed states where applicable.
- **Commit:** `feat(ui): add complete accessible interaction states`

**Task A4.5 — Create the style-guide preview**

- Render actual components in all important variants and themes.
- Keep it out of production index/sitemap.
- **Commit:** `feat(dev): add design-system component preview`

**Phase A4 exit:** Every shared component has documented styles and tested states.

### Phase A5 — Theme, accessibility, and responsive shell

**Goal:** Build a complete shared shell that works across input modes.

**Task A5.1 — Complete light/dark themes**

- Implement theme preference, manual toggle if required, and no-flash behavior.
- **Commit:** `feat(theme): implement accessible theme behavior`

**Task A5.2 — Implement responsive site header/navigation**

- Test desktop, mobile, touch, keyboard, and TV/remote navigation.
- **Commit:** `feat(site): implement responsive accessible navigation`

**Task A5.3 — Implement footer and page containers**

- Reuse exact width, alignment, spacing, link, and metadata tokens.
- **Commit:** `feat(site): standardize page shell and footer`

**Task A5.4 — Add reduced-motion behavior and focus verification**

- Test keyboard, menu, skip link, theme control, and reduced-motion mode.
- **Commit:** `test(a11y): verify shell focus and reduced-motion behavior`

**Phase A5 exit:** Shared shell is consistent, accessible, and functional with pointer, keyboard, touch, and remote.

### Phase A6 — Animation and micro-interaction polish

**Goal:** Add tasteful motion without harming performance.

**Task A6.1 — Add motion tokens and simple transitions**

- Add duration/easing tokens and CSS state transitions.
- **Commit:** `style(motion): define motion tokens and control feedback`

**Task A6.2 — Add selected card and navigation motion**

- Add subtle hover/focus/active behavior with no layout shift.
- **Commit:** `feat(motion): polish cards and navigation interactions`

**Task A6.3 — Evaluate view/page transitions**

- Prototype only; verify history, focus, assistive tech, reduced motion, and fallback.
- Do not enable globally unless the experience demonstrably improves.
- **Commit:** `test(motion): evaluate accessible page transitions`

**Task A6.4 — Profile animation on low-end devices**

- Record CPU/paint performance and remove expensive effects.
- **Commit:** `perf(motion): optimize animation for low-end devices`

**Phase A6 exit:** Motion is purposeful, optional, reduced-motion compatible, and performance-tested.

### Phase A7 — Hugo vs Astro decision and proof-of-concept

**Goal:** Decide whether the framework migration is worth doing.

**Task A7.1 — Record framework decision scorecard**

- Compare Hugo with Astro and one alternative using the weighted categories in Section 9.2.
- **Commit:** `docs(architecture): compare static site framework options`

**Task A7.2 — Build minimal Astro proof-of-concept**

- One page, one project card, one article, design tokens, and a minimal interaction.
- Preserve original Hugo source and deployment.
- **Commit:** `feat(spike): prototype Astro portfolio rendering`

**Task A7.3 — Deploy Astro spike to Netlify preview**

- Verify `dist` static output, Git-based preview, asset paths, trailing slash, and no server requirement.
- **Commit:** `test(deploy): verify Astro Netlify preview`

**Task A7.4 — Benchmark Hugo and Astro prototypes**

- Compare production-like HTML/CSS/JS/font/image payload, LCP proxy, Lighthouse, accessibility, build reliability, and author workflow.
- **Commit:** `docs(perf): compare Hugo and Astro proof-of-concept`

**Task A7.5 — Make and document the migration decision**

- Recommend Astro only if the scorecard and proof-of-concept pass.
- If Hugo remains better, document the evidence and use the design system within Hugo.
- **Commit:** `docs(architecture): approve or reject Astro migration`

**Phase A7 exit:** Framework decision is evidence-led and the rollback path is clear.

### Phase A8 — Controlled migration (only if Astro is approved)

**Goal:** Move the site in small, verifiable batches.

**Task A8.1 — Initialize production Astro structure**

- Pin Node/dependencies, add build scripts, add TypeScript and static output config.
- Preserve Hugo source and Netlify integrations.
- **Commit:** `build(site): initialize Astro static architecture`

**Task A8.2 — Implement static output and base layout**

- Add global metadata, semantic landmarks, CSS tokens, theme behavior, and shared base layout.
- **Commit:** `feat(site): add Astro base layout and static shell`

**Task A8.3 — Read existing Markdown without source-path changes**

- Prove the chosen content loader reads the existing content tree.
- Preserve original source files and front matter semantics.
- **Commit:** `feat(content): load existing Markdown content safely`

**Task A8.4 — Port home page**

- Preserve `/` metadata and content facts.
- **Commit:** `feat(home): migrate homepage to Astro`

**Task A8.5 — Port About page and aliases**

- Preserve `/about/`, `/about-us/`, `/about-hugo/`, `/contact/` behavior.
- **Commit:** `feat(about): migrate about page and legacy aliases`

**Task A8.6 — Port Portfolio and Projects pages**

- Preserve both `/portfolio/` and `/projects/` exactly.
- **Commit:** `feat(portfolio): migrate work and projects pages`

**Task A8.7 — Port posts and series index**

- Preserve all post listing and series URLs.
- **Commit:** `feat(blog): migrate posts and series indexes`

**Task A8.8 — Port one article and verify content parity**

- Compare original and new article body, code blocks, image references, metadata, and output formats.
- **Commit:** `feat(blog): migrate first long-form article`

**Task A8.9 — Port remaining articles in small batches**

- One or two articles per task; do not combine all six into a single large commit.
- **Commit examples:** `feat(blog): migrate article 02` etc.

**Task A8.10 — Port legal pages**

- Preserve content wording and every existing legal route.
- **Commit:** `feat(legal): migrate policy pages without copy changes`

**Task A8.11 — Port sitemap and static documents**

- Preserve `/sitemap/`, `/sitemap.xml`, `/resume.pdf`, images, fonts, and all files.
- **Commit:** `feat(site): migrate sitemap and static public files`

**Task A8.12 — Rebuild feed/JSON/Markdown outputs**

- Preserve all response types and machine-readable behavior.
- **Commit:** `feat(outputs): preserve feed JSON and Markdown endpoints`

**Task A8.13 — Reconcile Netlify Edge Function and headers**

- Verify existing Markdown negotiation, CSP, redirects, cache, and security headers.
- **Commit:** `feat(netlify): preserve edge negotiation and response headers`

**Phase A8 exit:** All known routes and outputs work in Astro and compare cleanly against the baseline.

### Phase A9 — Page-by-page visual refinement

**Goal:** Apply the unified design system to all pages.

**Task A9.1 — Refine homepage visual hierarchy**

- Verify hero and first viewport at narrow, short, and wide dimensions.
- **Commit:** `style(home): refine homepage visual hierarchy`

**Task A9.2 — Refine About and Portfolio pages**

- Apply shared text, section, and metadata components.
- **Commit:** `style(portfolio): refine about and portfolio pages`

**Task A9.3 — Refine Projects and project detail layouts**

- Verify images, cards, tags, metadata, and evidence sections.
- **Commit:** `style(projects): refine project presentation`

**Task A9.4 — Refine blog index and article reading layout**

- Check long content, code, tables, media, TOC, and responsive reading measure.
- **Commit:** `style(blog): refine long-form reading experience`

**Task A9.5 — Refine legal, sitemap, and document pages**

- Apply shared tokens without changing legal copy.
- **Commit:** `style(content): standardize legal and sitemap pages`

**Phase A9 exit:** Every public page uses the same system and has no outlier typography or control styles.

### Phase A10 — Publishing workflow and optional CMS

**Goal:** Make routine updates easy from anywhere.

**Task A10.1 — Write article and project authoring guide**

- Explain exact file paths, front matter, assets, preview, and publishing.
- **Commit:** `docs(content): add writing and publishing workflow`

**Task A10.2 — Add a reusable article template**

- Preserve current content storage and URL conventions.
- **Commit:** `feat(content): add article authoring template`

**Task A10.3 — Evaluate optional CMS authentication and cost**

- Test only if GitHub's browser editor workflow is not sufficient.
- **Commit:** `docs(content): evaluate browser CMS options`

**Task A10.4 — Implement CMS only if proven worthwhile**

- Protect authentication and verify draft/preview/publishing.
- **Commit:** `feat(cms): add optional secure content editor`

**Phase A10 exit:** The owner can add/update content from a browser with a documented path and no unnecessary operating cost.

### Phase A11 — Full regression, benchmark, and release

**Goal:** Prove the redesigned site is more consistent, accessible, and fast without breaking old paths.

**Task A11.1 — Complete route/content regression**

- Test every item in the route manifest, file, output format, and redirect.
- **Commit:** `test(routes): verify complete legacy URL compatibility`

**Task A11.2 — Complete visual regression matrix**

- Capture required page templates and states across the required viewport set.
- **Commit:** `test(visual): add responsive screenshot regression coverage`

**Task A11.3 — Complete accessibility regression**

- Axe, keyboard, screen-reader spot check, contrast, zoom, reduced motion.
- **Commit:** `test(a11y): complete WCAG 2.2 AA verification`

**Task A11.4 — Complete performance regression**

- Lighthouse CI, PageSpeed, WebPageTest, CPU/network throttling, bundle/payload budget.
- **Commit:** `perf(site): meet responsive performance budgets`

**Task A11.5 — Complete Netlify deploy preview acceptance**

- Verify production-like build, headers, Edge Function, static file paths, redirects, feeds, and content negotiation.
- **Commit:** `test(deploy): verify final Netlify preview`

**Task A11.6 — Production release and post-deploy checks**

- Deploy only after owner approval and all gates passing.
- Run production smoke tests and save reports.
- **Commit:** `docs(release): record production acceptance and benchmarks`

**Phase A11 exit:** Complete route compatibility, visual quality, accessibility, performance, and publishing workflow are verified.

---

## 15. Final acceptance checklist

Do not declare the redesign complete until all mandatory items below are checked and backed by evidence.

### Visual system

- [ ] One documented art direction is used across every page.
- [ ] One typography system controls all heading, body, description, metadata, caption, code, and label roles.
- [ ] Text sizes, weights, line heights, and widths are consistent and readable.
- [ ] Spacing, containers, section gaps, grids, and alignment use shared tokens.
- [ ] Colors are semantic and consistent across light/dark themes, if enabled.
- [ ] All relevant text and UI-state contrast checks pass.
- [ ] Cards, panels, borders, shadows, highlights, and dividers use a defined system.
- [ ] Solid/dashed/dotted lines follow documented rules.
- [ ] Icons use one coherent set/style with consistent sizing and alignment.
- [ ] Links, buttons, nav items, and menu items have complete default/hover/focus/pressed/current/selected/disabled/loading states as applicable.
- [ ] No interactive feature depends on hover alone.
- [ ] No component uses an unexplained one-off color, font size, radius, or spacing value.
- [ ] Design-system preview reflects the actual production components.

### Motion and interaction

- [ ] Motion is purposeful and consistent.
- [ ] Reduced motion is respected.
- [ ] No autoplay video/music or expensive continuous animation.
- [ ] Animations do not create layout shift or hide content before JavaScript.
- [ ] Animations are tested on a low-end or CPU-throttled device.
- [ ] Pointer, keyboard, touch, and TV remote interactions are verified where relevant.

### Responsive

- [ ] 320px width works without page-level horizontal scroll.
- [ ] Phone, tablet, foldable, desktop, ultrawide, 4K, and TV browser layouts are verified.
- [ ] Portrait, landscape, folded/unfolded, narrow, and short-height layouts work.
- [ ] Text wrapping, buttons, navigation, cards, media, and code remain usable.
- [ ] 200% and 400% zoom/reflow are reviewed.

### Framework and authoring

- [ ] Hugo vs Astro decision is documented with evidence.
- [ ] If Astro is selected, static output and no-server Netlify deploy are proven.
- [ ] No unnecessary framework/runtime or animation dependency is shipped.
- [ ] Article authoring workflow is documented and usable from a browser.
- [ ] Optional CMS is not required for routine operations unless its auth/cost/preview flow is proven.
- [ ] Build instructions and dependency versions are pinned/documented.

### Compatibility

- [ ] Every legacy URL returns the expected response.
- [ ] Every article, legal page, résumé, image, download, and static file is present.
- [ ] Source content is preserved or any necessary relocation is documented and non-destructive.
- [ ] `/feed.json`, `/index.json`, RSS, Markdown output, sitemap, `.well-known`, and any agent-facing endpoints work.
- [ ] Netlify Edge Function and Markdown negotiation work.
- [ ] Security headers, redirects, and caching behavior are preserved.
- [ ] No broken internal links.

### Quality and release

- [ ] Unit and component tests pass.
- [ ] Playwright functional tests pass.
- [ ] Playwright screenshot regression is reviewed.
- [ ] Automated accessibility scans have zero unresolved critical/serious violations.
- [ ] Manual keyboard, zoom, reduced-motion, and screen-reader checks are recorded.
- [ ] Lighthouse reports and performance payload measurements are saved.
- [ ] Low-end throttled profile is acceptable.
- [ ] Netlify Deploy Preview passes all release checks.
- [ ] Production deployment has owner approval.
- [ ] Rollback procedure is documented and tested.

---

## 16. Agent handoff template

Append an entry to `docs/WEBSITE_REDESIGN_PROGRESS.md` after every task:

```markdown
## [YYYY-MM-DD] — [Addendum phase/task ID]

**Task:**
**Status:** COMPLETE / BLOCKED / PARTIAL
**Branch:**
**HEAD before:**
**Commit:**

### Objective

### Files inspected

### Files changed

### Implementation details / design decisions

### Commands executed

### Test results

### Visual evidence

### Responsive viewports and states checked

### Accessibility results

### Performance results

### Route/content/source-path impact

### Known issues / decisions required

### Exact next task

```

When resuming, Gemini must:

1. Read the original execution plan.
2. Read this addendum.
3. Read the most recent progress-log entry.
4. Inspect `git status`, `git log`, and the latest commit.
5. Run or inspect the relevant existing tests.
6. Continue only the exact next incomplete task.

Do not redo completed tasks unless a test or later change proves a regression.

---

## 17. Research references

The following official documentation supports the architecture, accessibility, and performance requirements. Re-check the current documentation and browser support when implementation begins; do not rely on stale examples.

### Astro and static deployment

- Astro islands architecture: <https://docs.astro.build/en/concepts/islands/>
- Astro content collections: <https://docs.astro.build/en/guides/content-collections/>
- Astro Markdown content: <https://docs.astro.build/en/guides/markdown-content/>
- Astro view transitions: <https://docs.astro.build/en/guides/view-transitions/>
- Astro Netlify deploy: <https://docs.astro.build/en/guides/deploy/netlify/>
- Hugo directory structure: <https://gohugo.io/getting-started/directory-structure/>
- Hugo content organization: <https://gohugo.io/content-management/organization/>
- Hugo front matter: <https://gohugo.io/content-management/front-matter/>

### Git-based content management

- Decap CMS overview: <https://decapcms.org/docs/intro/>
- Decap CMS GitHub backend/authentication: <https://decapcms.org/docs/github-backend/>
- Decap CMS backends: <https://decapcms.org/docs/backends-overview/>

### Accessibility and responsive design

- WCAG 2.2 Recommendation: <https://www.w3.org/TR/WCAG/>
- MDN reduced motion: <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/prefers-reduced-motion>
- MDN viewport segments: <https://developer.mozilla.org/en-US/docs/Web/API/Viewport_segments_API>
- Android adaptive window size classes: <https://developer.android.com/develop/adaptive-apps/guides/use-window-size-classes>
- Android TV adaptive apps: <https://developer.android.com/develop/adaptive-apps/guides/tv/build-adaptive-apps-for-tv>

### Animation and performance

- web.dev high-performance CSS animations: <https://web.dev/articles/animations-guide>
- MDN CSS performance: <https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/CSS>
- Google Core Web Vitals: <https://developers.google.com/search/docs/appearance/core-web-vitals>
- Lighthouse CI: <https://github.com/GoogleChrome/lighthouse-ci>
- PageSpeed Insights: <https://pagespeed.web.dev/>
- WebPageTest: <https://www.webpagetest.org/>
- axe-core: <https://github.com/dequelabs/axe-core>
- W3C Nu HTML Checker: <https://validator.w3.org/nu/>

---

## Final instruction to Gemini

Treat this addendum as a binding extension to the original `DEARDHRUV_WEBSITE_REDESIGN_GEMINI_EXECUTION_PLAN.md`.

**Start with Phase A0, Task A0.1 only.** Do not begin the full redesign or framework migration immediately. First reconcile the plans, capture the current site and route baseline, and document the inconsistencies. Then proceed in the small task sequence above.

The owner explicitly authorizes a controlled Hugo-to-Astro evaluation and an Astro migration if the proof-of-concept demonstrates that it improves the design/development workflow without harming performance, maintenance simplicity, Netlify deployment, or compatibility. Do not force an Astro migration if the evidence does not support it.

The non-negotiable priorities are:

1. A highly consistent, premium, designer-led visual system.
2. Excellent typography, layout, accessibility, and interaction states.
3. Purposeful, performant animation that works on low-end hardware.
4. Easy, low-cost writing, updating, and deployment from anywhere.
5. Full compatibility with every existing public URL, article, file, feed, endpoint, and integration.
6. Small, tested, documented tasks with one focused Git commit per completed task.

A beautiful hero does not make the website complete. Every page, every text role, every component, every state, every viewport, and every published link must meet the same quality standard.
