+++
title = "Engineering Projects & Case Studies"
date = "2026-10-21"
description = "In-depth technical case studies and architectural deep dives across Android architecture, Kotlin Multiplatform, on-device AI runtimes, and employer engineering systems."
+++

This page documents selected engineering case studies across **independent products** and **work by employer**. Each case study details the engineering problem, platform constraints, chosen architecture, and technical trade-offs.

---

## 🚀 Independent Products & Case Studies

### 1. AI Playground - On-Device Multimodal AI Workstation

**Summary:** A privacy-first mobile workstation that runs multimodal LLMs and diffusion models locally on phones without cloud dependencies.  
**Role:** Director & Lead Engineer &middot; **Status:** Live on Google Play (v1.7.7 Production) &middot; iOS in development  
**Stack:** Kotlin Multiplatform (CMP 1.12), Modern C++20 / NDK (JNI), llama.cpp v0.8.0, Google AI Edge LiteRT, Apple MLX Swift / Metal GPU, stable-diffusion.cpp, SQLDelight  

#### The Problem
Most AI applications depend entirely on cloud APIs. For users analyzing personal notes, proprietary code, or confidential spreadsheets, sending raw data to remote servers introduces serious privacy concerns, recurring subscription costs, and requires a continuous network connection. I built AI Playground to explore how far consumer phones could be pushed as self-contained, offline-first inference engines.

#### Platform Constraints & Trade-Offs
- **Memory Pressure:** Mobile operating systems terminate processes that spike memory beyond strict system thresholds (Android Low Memory Killer / iOS Jetsam).
- **GPU Driver Fragility:** Vendor Vulkan drivers across heterogeneous Android chipsets frequently encounter segmentation faults during shader compilation.
- **Thermal Ceilings:** Sustained matrix multiplication triggers aggressive kernel thermal downclocking within 60 to 90 seconds if compute pipelines are unthrottled.

#### Architecture Overview
```mermaid
flowchart TD
    subgraph UI ["Compose Multiplatform UI Layer"]
        A[Chat & Document Studio] --> B[Voice & Audio Pipeline]
        A --> C[Diffusion Image Studio]
    end

    subgraph KMP ["Shared Domain & State (Kotlin Multiplatform)"]
        D[Model Admission Guardrail]
        E[SQLDelight Activity Ledger]
        F[Document Parser Engine]
    end

    subgraph Native ["Native Runtimes (C++20 NDK / Swift)"]
        G[Speculative Turbo Decoding]
        H[Defensive fork Sandbox]
        I[Apple MLX Metal Backend]
    end

    UI --> KMP
    KMP --> Native
    H -->|IPC| J[Vulkan / OpenCL Driver]
```

#### Engineering Decisions & Implementation
1. **Multi-Engine On-Device Runtimes:** Runs GGUF models via high-performance `llama.cpp` JNI bindings with dynamic multi-binary `LlamaEngineLoader` (OpenCL/Vulkan GPU routing on Android and native Metal GPU on iOS), Safetensors models via Apple MLX Swift on iOS, and MediaPipe `.task` models.
2. **Dual-Model Speculative Turbo Decoding:** Paired lightweight companion draft models (e.g. Qwen 2.5 0.5B) with target models (e.g. Llama 3.2 1B). Dynamic draft context capping (`std::min(2048u, ...)`) and KV cache session pre-warming produced a measured **2x decoding throughput improvement** on local silicon without exhausting VRAM.
3. **Defensive `fork()` Child Process Sandbox:** To prevent vendor GPU driver bugs from crashing the application, native driver probing runs inside an isolated child process with a 3000ms non-blocking watchdog and `kill(pid, SIGKILL)` fallback. If the driver faults, the child process exits cleanly while the host UI remains responsive.
4. **Pure-KMP Document Parsing Engine:** Extracts structured text across 25+ file formats (TXT, LOG, MD, CSV, TSV, JSON, XML, YAML, DOCX, DOC, XLSX, XLS, PPTX, PPT, RTF, ODT, ODS, ODP) using pure RFC 1951 Deflate decompression, avoiding third-party native binaries or external web services.
5. **On-Device Diffusion & Bonsai Image Ternary 4B:** Local text-to-image synthesis supporting 16 curated models across Android (LiteRT multi-graph, `stable-diffusion.cpp` GGUF) and iOS (Apple MLX Metal GPU, Core ML), with 4-step synthesis via Bonsai Image Ternary 4B (FLUX.2-klein quantized to 1.58-bit/2-bit ternary weights) and W3C PNG `tEXt` chunk attribution metadata.
6. **Context Intelligence & System Integration:** System-wide text selection action (`ACTION_PROCESS_TEXT`), context-aware smart clipboard detection (20+ chars) with one-tap action pills, offline touch-to-talk speech-to-text, and 11 localized languages with native RTL support.
7. **100% Offline Activity Ledger:** Tracks local usage milestones via SQLDelight (schema v10) with strictly zero network calls (`INV-OFFLINE-01`).

#### Links & Artifacts
- **Google Play:** [AI Playground on Google Play](https://play.google.com/store/apps/details?id=com.deardhruv.llmplayground)
- **Technical Series:** [Beyond the Model 6-Part Engineering Series](/posts/ai_playground_series/)

---

### 2. VelociHue - High-Framerate Arcade Game in KMP

**Summary:** A fast-paced arcade action game engineered to prove that Kotlin Multiplatform and Compose Multiplatform can deliver fluid 60-120 FPS gameplay across phones, tablets, and TVs.  
**Role:** Director & Lead Engineer &middot; **Status:** Live on Google Play (v0.1.8 Production) &middot; Android TV Live &middot; iOS Playable  
**Stack:** Kotlin Multiplatform (Kotlin 2.4.21, CMP 1.12.2), Target SDK 37 (Android 17), Cloud Firestore (Schema v5), Android TV (Leanback & D-pad), iOS 18 (SwiftUI & Metal)  

#### The Problem
Cross-platform toolkits often struggle with consistent high-framerate rendering and low-latency input handling in timing-sensitive games. The objective of VelociHue was to build a commercial arcade title sharing 100% of game physics and progression logic while maintaining native-quality frame pacing across mobile and 10-foot television screens.

#### Architecture & Technical Highlights
1. **Shared Pure-Kotlin Game Engine:** A deterministic physics loop (`GameEngine`, `CollisionDetector`) managing color-matching physics, projectiles, and power-ups across Android, iOS, and Android TV with zero duplicated logic.
2. **Boost & Overdrive Speed Surge:** Reactive gauge accrual from perfect color-gate passes, edge grazes, asteroid kills, and wormholes, delivering 2.2x world speed surges, obstacle shattering, and auto-magnetism.
3. **Zero-Allocation Hot-Path Rendering:** Eliminated 11 `BoxWithConstraints` subcompositions on the rendering hot path, implementing GPU-scaled canvas `drawText` via `rememberTextMeasurer` in `ScorePopUpLayer` with memoized draw states.
4. **Conflict-Free Cloud Sync Engine (Schema v5):** Multi-device synchronization backed by Cloud Firestore with a 3-way union merge strategy that reconciles player progression, cosmetics, and active streaks across devices.
5. **Interactive Pilot Academy & Adaptive Ergonomics:** 6-module interactive training academy reusing real in-game UI components, with posture classification adapting for foldables, flips, tablets, and phones.
6. **Native Android TV & Living Room Parity:** Dedicated television deployment with Leanback manifest declarations, custom D-pad remote navigation (Down to fire, Up to boost), and living-room TV ad gating.
7. **29-Achievement Multi-Tiered Engine:** Progression system evaluated by a pure-function derived unlock engine (`AchievementUnlockComputation`) with retroactive upgrade backfill across player levels.
8. **Instant Compose Share Cards:** Run-summary share cards captured into high-resolution PNGs via Compose `GraphicsLayer.toImageBitmap()` and shared via Android `FileProvider`.

#### Links & Artifacts
- **Google Play:** [VelociHue on Google Play](https://play.google.com/store/apps/details?id=com.deardhruv.velocihue)

---

### 3. Open Store - TV Apps & Launcher for Android TV

**Summary:** A lightweight, privacy-first companion, smart launcher, and app hub engineered specifically for Android TV and Google TV devices.  
**Role:** Author & Lead Engineer &middot; **Status:** Live on Google Play (v1.0.7 Production) &middot; Exclusively for Android TV & Google TV  
**Stack:** Kotlin 2.1.10, Jetpack Compose for TV (AndroidX TV Material 3), Target SDK 37 (Android 17), Android TV (Leanback), R8 Minification, Background Concurrency (`Dispatchers.IO`)  

#### The Problem
On Android TV and Google TV devices (such as Chromecast with Google TV or smart televisions), the official Google Play Store icon is frequently hidden or buried behind deep system settings submenus or voice search queries. In addition, managing sideloaded TV utilities, decluttering pre-installed bloatware, and monitoring internal flash storage on a 10-foot living-room display with a physical remote control is cumbersome and unoptimized.

#### Architecture & Technical Highlights
1. **Google Play Store Gateway:** Instant 1-click shortcut to launch the official Google Play Store directly on Android TV devices where the store is buried.
2. **My TV Apps Drawer with Real-Time Search:** High-resolution 2D grid displaying all installed TV applications with real-time remote search, 3-way smart sorting (A-Z/Z-A, Recently Installed, Recently Updated), and bloatware app hiding.
3. **Quick Launch Pinned Favorites Shelf:** Dedicated living-room top shelf pinning up to 6 frequently used apps for instant 1-click launching and remote navigation.
4. **App Details & Context Actions:** Long-press or Menu button context actions to open apps, view version labels (`vX.Y.Z`), pin/unpin favorites, hide/unhide applications, open system App Info/permissions, safe uninstall, or jump directly to the Play Store listing.
5. **Living-Room Quick TV Settings & Storage Health:** Direct shortcuts to Storage, Applications, Network & Internet, and Bluetooth Remotes & Accessories with robust fallback intent chains, plus a real-time storage gauge with color-coded capacity indicators.
6. **10 OLED Dark Themes & Top 10 Languages:** Hand-crafted dark palettes tailored for OLED living-room screens, localized in English, Spanish, Hindi, German, French, Japanese, Portuguese, Russian, Arabic (RTL), and Simplified Chinese with automatic TV system language detection and RTL-aware horizontal traversal (`rtlFocusProperties`).
7. **100% Fluid D-Pad Navigation & Zero Focus Traps:** Focus memory, 2D traversal, deterministic default active selection on fresh launch, seamless focus preservation on warm resume, smooth press scale damping (`0.98f`), trailing long-press release defusing, and column-proportional hero-to-shelf routing.
8. **Adaptive Low-RAM Engine & Memory Trimming:** Automatic gradient bypass and zero-scale focus on budget TV hardware; cooperative OS memory pressure trimming (`onTrimMemory`), running at 57 MB PSS standard and 52 MB PSS in low-RAM mode on 4K TV.
9. **Zero Ads & 100% Privacy:** Strictly zero advertisements, zero background analytics telemetry, zero tracking SDKs, and automatic sanitization of pinned/hidden lists on every scan to eliminate ghost slots.

#### Links & Artifacts
- **Google Play:** [Open Store on Google Play](https://play.google.com/store/apps/details?id=com.deardhruv.openstore)
- **Legal & Privacy:** [Open Store Legal & Privacy Documentation](/other/open-store-app/)

---

## 💼 Selected Work by Employer

### 3. Digital Commerce & In-Store Android Touch Systems

**Summary:** Scalable mobile commerce systems and in-store interactive display software running on custom Android touch hardware.  
**Role:** Lead Android Engineer &middot; **Period:** Feb 2022–Present  
**Stack:** Kotlin, Jetpack Compose, Clean Architecture, MVI, Custom Android OS, Hardware Abstraction Layers  

#### Engineering Scope & Architecture
- **In-Store Touch Hardware:** Conducted research and system architecture for custom Android OS builds powering in-store interactive displays and point-of-sale terminals.
- **Adaptive UI:** Engineered adaptive layouts supporting tablet, foldable, and multi-window configurations using Jetpack Compose Window Size Classes.
- **Offline Catalog Integrity:** Designed a multi-tier caching layer ensuring cart persistence and uninterrupted product browsing during network dropouts.
- **Engineering Quality:** Implemented automated linting, comprehensive code review standards, and library-based modularization.

> **Worked at:** IMPACT Commerce, Denmark &middot; **Role:** Lead Android Engineer &middot; **Period:** Feb 2022–Present

---

### 4. POS & Peripheral Hardware Integration Layer

**Summary:** Resilient Hardware Abstraction Layer (HAL) connecting Android point-of-sale applications to physical retail peripherals.  
**Role:** Lead Android Engineer &middot; **Period:** Feb 2022–Present  
**Stack:** Kotlin, Android NDK, C++, Unix Domain Sockets, Thermal Printers, Payment Terminals HAL  

#### Engineering Scope & Architecture
- **Peripheral Communication:** Engineered asynchronous communication drivers for receipt printers and payment terminals with stateful reconnect logic.
- **Defensive Process Isolation:** Isolated hardware peripheral communication across dedicated process boundaries to prevent peripheral firmware faults or USB disconnects from crashing checkout flows.
- **Background Watchdog:** Implemented automated watchdog services monitoring peripheral connection health and managing graceful offline fallbacks.

> **Worked at:** IMPACT Commerce, Denmark &middot; **Role:** Lead Android Engineer &middot; **Period:** Feb 2022–Present

---

### 5. PLANOLY Visual Planner & StoriesEdit Template Editor

**Summary:** High-performance visual media planning and template editing applications serving millions of global social media creators on Instagram and Pinterest.  
**Role:** Senior Android Developer &middot; **Period:** Nov 2018–Feb 2022  
**Stack:** Kotlin, Java, Jetpack Compose, MVP/MVVM, FFmpeg, Canvas Drawing APIs  

#### Engineering Scope & Architecture
- **Video Manipulation with FFmpeg:** Engineered native video processing pipelines utilizing FFmpeg for transcoding, filtering, and precision video trimming.
- **Photo & Template Editor:** Developed high-fidelity canvas manipulation tools for StoriesEdit, enabling users to compose multi-layer graphic templates for Instagram Stories.
- **Modern Architecture Migration:** Progressively refactored legacy MVP components to modern MVVM using Jetpack libraries and early Jetpack Compose.
- **Performance Profiling:** Diagnosed and resolved memory pressure bottlenecks during high-resolution media export, ensuring smooth rendering across varied Android hardware.

> **Worked at:** PLANOLY, USA &middot; **Role:** Senior Android Developer &middot; **Period:** Nov 2018–Feb 2022

---

### 6. Client Android Applications & Mobile Team Leadership

**Summary:** Enterprise mobile application design, architecture consulting, and engineering team leadership across varied client industries.  
**Role:** Tech Lead | Android Engineer &middot; **Period:** Jun 2016–Oct 2018  
**Stack:** Android SDK, Java, Kotlin, Agile Methodologies, Software Architecture  

#### Engineering Scope & Architecture
- **Team Leadership:** Managed a team of Android developers, overseeing sprint planning, task delegation, and technical delivery.
- **Technical Mentorship:** Organized regular technical workshops introducing modern Android frameworks and reactive programming patterns.
- **Client Collaboration:** Worked directly with enterprise product owners to define architectural requirements, establish delivery timelines, and maintain budget adherence.

> **Worked at:** Ashapura Softech Inc, India &middot; **Role:** Tech Lead / Android Engineer &middot; **Period:** Jun 2016–Oct 2018

---

### 7. Mobile Platform Delivery & UI Automation

**Summary:** Production Android application development and test automation framework architecture.  
**Role:** Team Lead | Senior Android Developer &middot; **Period:** Feb 2014–Jun 2016  
**Stack:** Android SDK, UI Automator, Clean Architecture, JUnit  

#### Engineering Scope & Architecture
- **UI Test Automation:** Built automated UI test suites with Android UI Automator, reducing manual QA regression overhead on key user flows.
- **Team Management:** Led a squad of Android engineers, conducted rigorous code reviews, and enforced maintainability standards.
- **Requirements Engineering:** Translated complex product specifications into modular, scalable mobile codebases.

> **Worked at:** Russmedia Tech, India &middot; **Role:** Team Lead / Senior Android Developer &middot; **Period:** Feb 2014–Jun 2016

---

## 🌐 Open Source & Community Leadership

- **GitHub Ecosystem:** Active contributor and maintainer at [@DearDhruv](https://github.com/DearDhruv).
- **Conference Speaker:** Regular technical speaker at GDG DevFest conferences across India on topics including Jetpack Compose Navigation 3, Android 17 Adaptive Layouts, and on-device AI runtimes.
- **Beyond the Model:** Author of the 6-part engineering series exploring offline-first AI on mobile silicon.
