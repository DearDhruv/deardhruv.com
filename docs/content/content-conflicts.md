# Content Conflict Resolution Log

This document tracks identified content discrepancies, conflicting technical claims, or inconsistent metrics across the site, detailing their root cause and the evidence-based resolution.

---

## Conflict 1: Numeric Experience vs Professional Terminology

- **Locations:** `src/pages/index.astro`, `content/about.md`, `content/portfolio.md`, `static/llms.txt`.
- **Discrepancy:** Old copies toggled between "14+ years", "15+ years", and "over 15 years".
- **Source of Truth:** User specification (Prompt request #10: *"rewrite the industry experience in nice professional term instead of 15 or 14+ years of experience"*).
- **Resolution:** Replaced all numeric counters with authoritative, design-system-aligned terminology:
  - Homepage Hero Chip: `Battle-Tested Leadership`
  - Homepage Specialization Badge: `Battle-Tested`
  - About lead paragraph: `a seasoned track record of crafting high-performance, user-centric mobile applications...`
  - Portfolio intro: `extensive production leadership building high-performance mobile architectures...`
  - Metadata & Schema JSON-LD: `extensive production leadership`.

---

## Conflict 2: Number of Supported POS Hardware Peripherals

- **Locations:** `src/pages/index.astro` vs `content/projects.md` vs `content/portfolio.md`.
- **Discrepancy:** Earlier copy stated `27+ POS peripherals`, while newer hardware integrations expanded this to `30+`.
- **Source of Truth:** User specification (Prompt request #8: *"updatre 27+ to 30+ POS peripherals"*).
- **Resolution:** Standardized to `30+ POS peripherals` across Home, Projects, and Portfolio.

---

## Conflict 3: On-Device AI Feature Scope (Text LLMs vs Image Generation)

- **Locations:** Homepage cards vs AI Playground project breakdown.
- **Discrepancy:** Homepage Card 3 initially referenced only local LLMs (`llama.cpp`, `LiteRT`), omitting the on-device image synthesis engine documented in Article 04.
- **Source of Truth:** Project documentation in `content/posts/ai_playground_series/04-*.md` and User specification (Prompt request #8: *"on device ai - add the image genration"*).
- **Resolution:** Added `Image Generation` chip and description (*"Pioneered local LLM inference and on-device image generation engines..."*) to Homepage Card 3 and Projects overview.

---

## Conflict 4: Card Header Badge Wrapping

- **Locations:** Homepage Section 1 card headers.
- **Discrepancy:** Badges placed alongside long headers wrapped awkwardly into two lines (`14+` over `Years`, `Produc` over `tion`, `Enter` over `prise`).
- **Source of Truth:** User specification (Prompt requests #3, #4: *"Header needs to be on top and he tag needs to be under it"*).
- **Resolution:** Positioned card headers `<h3>` as full-width block elements on top, with tags `<span class="badge">` placed directly underneath, styled with `white-space: nowrap;`.
