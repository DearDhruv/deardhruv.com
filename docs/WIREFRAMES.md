# Responsive Page Wireframes & Layout Blueprints

Structured ASCII wireframes specifying layout structure across mobile, tablet/foldable, desktop, and 10-foot TV viewports.

---

## 1. Homepage (`/`)

### Mobile (< 685px)
```text
+------------------------------------------+
| [$ cd /home/]                     [=] [*] |
+------------------------------------------+
|              [ Avatar ]                  |
|             Dhruv Patel                  |
|   Android Architect | KMP | On-Device AI |
|                                          |
| [Explore Work]  [Read Notes] [Résumé]     |
+------------------------------------------+
| CAPABILITIES                             |
| - Android & Systems Architecture         |
| - Kotlin Multiplatform (KMP/CMP)         |
| - On-Device AI & LLM Inference           |
| - Hardware & POS Peripherals             |
+------------------------------------------+
| FLAGSHIP SPOTLIGHT                       |
| [ AI Playground Card                   ] |
| [ VelociHue Card                       ] |
+------------------------------------------+
| LATEST TECHNICAL WRITING                 |
| [ Beyond the Model 6-Part Series       ] |
+------------------------------------------+
| COLLABORATION & CONTACT                  |
| [Email] [LinkedIn] [GitHub] [Twitter]    |
+------------------------------------------+
| (c) 2026 Dhruv Patel | Powered by Hugo    |
+------------------------------------------+
```

### Desktop (1024px - 1440px)
```text
+-----------------------------------------------------------------------+
| [$ cd /home/]               Portfolio  Projects  About  Posts  Sitemap  [*] |
+-----------------------------------------------------------------------+
|  [ Avatar ]     Dhruv Patel                                           |
|  (180x180)      Lead Android & Multiplatform Engineer                 |
|                 Pioneering On-Device AI Runtimes & Native Mobile HAL   |
|                 [Explore Work]  [Engineering Notes]  [Résumé (PDF)]   |
+-----------------------------------------------------------------------+
|  ENGINEERING SPECIALIZATIONS                                          |
|  +-------------------+  +-------------------+  +--------------------+ |
|  | Native Mobile HAL |  | KMP & CMP Parity  |  | On-Device Edge AI  | |
|  | C++20 / NDK / POS |  | Shared Game Loops |  | llama.cpp / Bonsai | |
|  +-------------------+  +-------------------+  +--------------------+ |
+-----------------------------------------------------------------------+
|  SELECTED WORK                                                        |
|  +--------------------------------+  +-------------------------------+ |
|  | AI Playground (Flagship AI)    |  | VelociHue (Multiplatform Game)| |
|  | Offline multimodal AI studio   |  | 60-120 FPS KMP engine, schema | |
|  | [Play Store] [GitHub] [Series] |  | v5 Firestore sync, Android TV | |
|  +--------------------------------+  +-------------------------------+ |
+-----------------------------------------------------------------------+
|  WRITING: BEYOND THE MODEL SERIES                                     |
|  Part 1 -> Part 2 -> Part 3 -> Part 4 -> Part 5 -> Part 6              |
+-----------------------------------------------------------------------+
|  (c) 2026 Dhruv Patel | CC BY-NC 4.0 | RSS | Powered by Hugo          |
+-----------------------------------------------------------------------+
```

---

## 2. Portfolio (`/portfolio/`) vs Projects (`/projects/`)

### Portfolio: Curated Executive Overview
```text
+-----------------------------------------------------------------------+
| WORK & IMPACT                                                         |
| 14+ years of engineering leadership, native performance, and edge AI  |
+-----------------------------------------------------------------------+
| CATEGORY FILTER: [All] [Flagship Products] [Enterprise] [Open Source] |
+-----------------------------------------------------------------------+
| [FLAGSHIP] AI Playground                                              |
| Impact: Zero-cloud multimodal inference, 2x Speculative Turbo speed   |
| Links: Play Store | GitHub | Architecture Case Study                  |
+-----------------------------------------------------------------------+
| [FLAGSHIP] VelociHue                                                  |
| Impact: Pure KMP game loop, 3-way union sync, 29-tier achievement     |
+-----------------------------------------------------------------------+
| [ENTERPRISE] Digital Commerce & POS Peripherals                       |
| Impact: Millions of transactions, 27+ hardware integrations           |
+-----------------------------------------------------------------------+
```

### Projects: In-Depth Engineering Case Study
```text
+-----------------------------------------------------------------------+
| AI PLAYGROUND: ARCHITECTURE CASE STUDY                                |
| Role: Director & Lead Engineer | Tech: KMP, C++20 NDK, Vulkan, MLX    |
+-----------------------------------------------------------------------+
| 1. System Constraints & Hardware Guardrails                           |
| 2. Speculative Turbo Engine & KV Cache Architecture                   |
|    [ Interactive / Static Mermaid Data-Flow Diagram ]                 |
| 3. Crash-Resilient NDK Driver Sandbox (fork() & Watchdog)             |
| 4. Offline Document Parser (25+ Formats via Pure RFC 1951 Deflate)    |
| 5. Benchmark Results & Hardware Metrics                               |
+-----------------------------------------------------------------------+
```

---

## 3. Article Reading Experience (`/posts/...`)
```text
+-----------------------------------------------------------------------+
| Posts > Beyond the Model Series > Part 1                              |
| # Part 1 - I Wanted the Model to Stay on the Phone                   |
| Published Oct 5, 2026 | 7 min read | Tags: AI, Android, KMP           |
+-----------------------------------------------------------------------+
|  [Table of Contents] (Optional floating / inline)                     |
|                                                                       |
|  Prose column constrained to 72ch for optimal eye movement.           |
|                                                                       |
|  +-- [Code Block: C++20 / Kotlin] ------------------------- [Copy] -+ |
|  | fun initSpeculativeEngine(draft: Model, target: Model) {        | |
|  |     // Pre-warm KV cache and guard VRAM admission                | |
|  | }                                                                | |
|  +------------------------------------------------------------------+ |
|                                                                       |
|  +-- [Series Progress Card] ----------------------------------------+ |
|  | <- Previous (Series Hub)       |       Next: Part 2 (Documents) -> |
|  +------------------------------------------------------------------+ |
+-----------------------------------------------------------------------+
```
