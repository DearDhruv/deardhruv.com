# DearDhruv Writing & Publishing Workflow

This document establishes the official authoring, metadata, frontmatter, and publishing workflow for **deardhruv.com** following the Astro migration.

---

## 1. Architecture Overview

The site uses **Astro v5** with static output (`output: 'static'`, `build: { format: 'directory' }`).
Content is authored in Markdown within the `content/` directory and loaded via Astro's Content Layer (`glob({ pattern: '**/*.md', base: './content/...' })`).

- **Article Content:** `content/posts/`
- **Static Documents & Pages:** `content/about.md`, `content/portfolio.md`, `content/projects.md`, `content/sitemap.md`
- **Legal Policies:** `content/other/`
- **Static Assets & Images:** `static/images/`
- **Build Output:** `dist/` (static HTML, JSON feed, XML sitemap, and Markdown negotiation mirrors)

---

## 2. Directory & File Conventions

### 2.1 Single Articles
Individual technical articles are placed directly in `content/posts/`:
```text
content/posts/
├── my-new-article.md
└── _index.md
```

### 2.2 Series Articles
Multi-part engineering series are grouped inside a dedicated series subfolder:
```text
content/posts/ai_playground_series/
├── _index.md
├── 01-i-wanted-the-model-to-stay-on-the-phone.md
├── 02-the-day-a-chat-box-became-a-document-engine.md
├── 03-the-model-was-fine-the-phone-wasnt.md
├── 04-i-put-an-image-generator-inside-the-phone.md
├── 05-at-some-point-i-stopped-building-a-chat-app.md
└── 06-pushing-mobile-hardware-to-the-edge.md
```

File naming convention: lowercase kebab-case, prefixed with two-digit sequence numbers for series (`01-`, `02-`, etc.).

---

## 3. Frontmatter Specification

All markdown files use Hugo-compatible TOML frontmatter enclosed by `+++` delimiters:

```toml
+++
title = "Part 1 - I Wanted the Model to Stay on the Phone"
date = 2026-10-05T10:00:00+05:30
lastmod = 2026-10-05T10:00:00+05:30
description = "The engineering journey of integrating established on-device AI runtimes into one multimodal mobile product."
tags = ["Android", "iOS", "Kotlin Multiplatform", "On-Device AI", "llama.cpp"]
series = ["Beyond the Model"]
+++
```

### Required Fields
| Field | Type | Description |
|---|---|---|
| `title` | `string` | Display title of the article. Used in `<title>`, Open Graph, JSON feed, and `<h1>`. |
| `date` | `string` (ISO 8601) | Publication timestamp with timezone (e.g., `2026-10-05T10:00:00+05:30`). |
| `description` | `string` | Executive summary (1-2 sentences). Used in meta description, JSON feed, and lead text. |

### Optional Fields
| Field | Type | Description |
|---|---|---|
| `lastmod` | `string` (ISO 8601) | Date of last substantial edit. Used for XML sitemap freshness. |
| `tags` | `string[]` | Array of technical topics (e.g., `["Android", "NDK", "Vulkan"]`). |
| `series` | `string[]` | Array of parent series names (e.g., `["Beyond the Model"]`). |
| `aliases` | `string[]` | Legacy URLs that should redirect to this article. |

---

## 4. Typography & Layout Rules

### 4.1 Strict Single-`<h1>` Rule
- Each page layout (`ArticleLayout.astro`, `PageLayout.astro`) renders the page title as the sole `<h1 class="page-title">`.
- In markdown bodies, use `## Section Title` for top-level sections and `### Subsection Title` for subsections.
- Astro's build pipeline includes `rehypeDemoteHeadings`, which safely shifts any body `# Heading` to `## Heading`, guaranteeing 100% WCAG 2.2 AA document outline compliance.

### 4.2 Bounded Reading Measure
- All prose containers are locked to a maximum line measure of `72ch` (`.layout-container-reading`), optimizing character density and eye-tracking comfort.

### 4.3 Code Blocks & Diagrams
- Enclose all code in standard fenced code blocks specifying language:
  ````markdown
  ```kotlin
  suspend fun inferLocalModel(prompt: String): Flow<Token>
  ```
  ````
- Architecture diagrams use fenced `mermaid` blocks with contained horizontal scrolling.

---

## 5. Local Authoring Workflow

### 5.1 Starting Development Server
```bash
npm run dev:astro
```
Opens live preview at `http://localhost:4321/`.

### 5.2 Creating a New Article
Run the CLI post generator:
```bash
npm run new:post "Your New Article Title"
```
Or manually duplicate `archetypes/posts.md` into `content/posts/<slug>.md`.

### 5.3 Building & Verifying Locally
Before opening a pull request or committing:
```bash
# 1. Build Astro static distribution
npm run build:astro

# 2. Verify all 38 routes, assets, links, and edge functions against dist/
npm run test:dist

# 3. Verify control test suites
npm test
```

---

## 6. Machine Discovery & Content Negotiation

Every article authored in `content/` automatically achieves:
1. **HTML Web Rendering:** Rendered with zero-JS static HTML and responsive tokens.
2. **JSON Feed Inclusion:** Automatically syndicated into `/index.json` and `/feed.json`.
3. **Sitemap Inclusion:** Automatically registered in `/sitemap.xml` and `/sitemap/`.
4. **Agent Markdown Negotiation:** Netlify Edge Function (`markdown-negotiation.ts`) serves raw markdown with `Content-Type: text/markdown` and `X-Agent-Ready: true` whenever requested with `Accept: text/markdown`.
