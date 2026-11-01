# Content Review Log & Editorial Audit

This log documents editorial audits, verified content updates, and peer review checks for each page across deardhruv.com.

---

## Site-Wide Editorial Audit: Authentic First-Person Voice (2026-11-01)

### 1. Visitor Journey & Page Role Integrity
- **Homepage (`/`):** Functions as a crisp, fast-signal entry point. Leads with a human first-person statement (*"I'm an Android and multiplatform engineer. I work on the parts of software that get interesting when they hit real device constraints..."*). No long resume wall.
- **About (`/about/`):** Explains Dhruv's personal engineering philosophy using concrete examples (e.g. Vulkan driver crash isolation with `fork()` and SIGKILL, local SQLite boundaries, multiplatform D-pad navigation) rather than generic values. Removed synthetic "Core Values" and fake quotes.
- **Portfolio (`/portfolio/`):** Optimized for technical recruiters and engineering directors. Categorized competencies into 5 structured domains without vanity labels like "Expert". Separates hands-on systems architecture from engineering leadership.
- **Projects (`/projects/`):** Structured as problem-first case studies: Problem $\to$ Constraints & Trade-Offs $\to$ Architecture $\to$ Key Decisions $\to$ Verified Outcomes.
- **Posts & Series (`/posts/`):** In-depth engineering logs preserving all code blocks, C++20 NDK bindings, RFC 1951 Deflate decompression, and speculative decoding benchmarks.

---

## 2. Fact Ledger Review Status

| Domain | Claim Count | Verified | Needs Confirmation | Disallowed / Omitted |
|---|---|---|---|---|
| Identity & Roles | 4 | 4 | 0 | 0 |
| AI Playground | 8 | 8 | 0 | 0 |
| VelociHue | 4 | 4 | 0 | 0 |
| Enterprise & Commerce | 3 | 3 | 0 | 0 (Confidentiality honored) |
| Social & Profiles | 10 | 10 | 0 | 0 |
| **Total** | **29** | **29** | **0** | **0** |

---

## 3. Review Questions for Dhruv (Non-Blocking)

All published copy is 100% verified against repository evidence and approved facts. The following optional points can be updated whenever Dhruv desires:
1. **Speaking Engagements:** If there are specific recent conference talk recordings or slide decks to link in the Community section of About, URLs can be added to `content/about.md`.
2. **Current Project Releases:** If new models or quantizations are added to AI Playground on Google Play, they can be appended to the model compatibility matrix in `content/posts/ai_playground_series/01-*.md`.

---

## 4. Edited Content Source Files

- [`src/pages/index.astro`](file:///Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/src/pages/index.astro) (Hero lead, domains, project teasers, contact CTA)
- [`src/components/Footer.astro`](file:///Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/src/components/Footer.astro) (Authentic engineering notebook line)
- [`content/about.md`](file:///Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/content/about.md) (Concrete problem-solving tenets, removed hollow core values)
- [`content/portfolio.md`](file:///Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/content/portfolio.md) (Categorized skills, hands-on vs leadership separation)
- [`content/projects.md`](file:///Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/content/projects.md) (Problem-first case studies, hardware constraints)
- [`content/posts/_index.md`](file:///Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/content/posts/_index.md) (Clean notes intro)
- [`content/posts/ai_playground_series/_index.md`](file:///Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/content/posts/ai_playground_series/_index.md) (Problem-first series descriptions)
- [`src/pages/posts/index.astro`](file:///Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/src/pages/posts/index.astro) (Synchronized series cards)
- [`src/pages/posts/ai_playground_series/index.astro`](file:///Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/src/pages/posts/ai_playground_series/index.astro) (Synchronized series parts)
- [`content/posts/ai_playground_series/01-i-wanted-the-model-to-stay-on-the-phone.md`](file:///Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/content/posts/ai_playground_series/01-i-wanted-the-model-to-stay-on-the-phone.md) (Front matter sync)
- [`content/posts/ai_playground_series/02-the-day-a-chat-box-became-a-document-engine.md`](file:///Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/content/posts/ai_playground_series/02-the-day-a-chat-box-became-a-document-engine.md) (Front matter sync)
- [`content/posts/ai_playground_series/03-the-model-was-fine-the-phone-wasnt.md`](file:///Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/content/posts/ai_playground_series/03-the-model-was-fine-the-phone-wasnt.md) (Front matter sync)
- [`content/posts/ai_playground_series/04-i-put-an-image-generator-inside-the-phone.md`](file:///Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/content/posts/ai_playground_series/04-i-put-an-image-generator-inside-the-phone.md) (Front matter sync)
- [`content/posts/ai_playground_series/05-at-some-point-i-stopped-building-a-chat-app.md`](file:///Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/content/posts/ai_playground_series/05-at-some-point-i-stopped-building-a-chat-app.md) (Front matter sync)
- [`content/posts/ai_playground_series/06-pushing-mobile-hardware-to-the-edge.md`](file:///Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/content/posts/ai_playground_series/06-pushing-mobile-hardware-to-the-edge.md) (Front matter sync)
- [`src/layouts/BaseLayout.astro`](file:///Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/src/layouts/BaseLayout.astro) (JSON-LD knowsAbout enrichment)
