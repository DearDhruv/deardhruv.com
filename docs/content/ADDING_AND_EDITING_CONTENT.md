# Adding & Editing Content Guide

This guide explains how to add, edit, or update articles, projects, and metadata on deardhruv.com. Content is authored in Markdown within the Git repository and processed by Astro.

---

## 1. Directory Structure

- `content/about.md`: About page narrative and verified professional journey.
- `content/portfolio.md`: Portfolio skills categories and impact highlights.
- `content/projects.md`: Deep dive case studies for flagship and client systems.
- `content/posts/`: Technical articles and series collections.
  - `content/posts/ai_playground_series/`: "Beyond the Model" 6-part on-device AI engineering series.
- `content/other/`: Product landing pages, Terms of Service, and Privacy Policies.
- `src/pages/index.astro`: Homepage layout and featured teasers.

---

## 2. Adding a New Article

1. Create a new markdown file under `content/posts/<series-name>/<slug>.md` or `content/posts/<slug>.md`.
2. Provide required front matter:
```markdown
+++
title = "Title of the Article"
date = "YYYY-MM-DD"
description = "One or two sentences explaining the specific technical lesson or problem addressed."
tags = ["Android", "Kotlin Multiplatform", "On-Device AI"]
layout = "post"
+++

Start directly with the problem or observation...
```
3. Run the route and link tests: `npm test`.

---

## 3. Editorial Checklist Before Merging

- [ ] Does the opening start with a concrete engineering problem or decision?
- [ ] Are all code blocks syntax-highlighted with the correct language tag?
- [ ] Have all banned phrases from `VOICE_AND_STYLE_GUIDE.md` been avoided?
- [ ] Are claims backed by measurements, repository code, or `fact-ledger.md`?
- [ ] Do all internal cross-links resolve to existing routes?
