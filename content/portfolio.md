+++
title = "Work & Impact"
date = "2026-06-11"
layout = "hero-page"
description = "Dhruv Patel's engineering portfolio showcasing native Android systems, Kotlin Multiplatform architecture, on-device AI runtimes, employer project case studies, and technical leadership."
+++

I'm a **Lead Android Engineer**, **Android Architect**, and **Android Artist** (known online as **@DearDhruv** or **DearDhruv**) with 15+ years of experience building scalable Android applications, leading engineering teams, and delivering performant, user-centric mobile products across global markets.

This portfolio separates my **independent engineering products** from **selected work by employer**, documenting systems architecture, device constraints, and verified technical outcomes.

---

## 👨‍💼 Engineering Overview

- **Current Role:** Lead Android Engineer at IMPACT Commerce (Denmark / India)
- **Primary Specialization:** Native Android systems (Kotlin, Jetpack Compose, C++20 NDK), Kotlin Multiplatform (KMP/CMP), On-Device AI Runtimes (`llama.cpp`, LiteRT, MLX), and Hardware Peripherals Integration.
- **Architectural Tenets:** Platform-native fidelity, offline-first reliability, defensive process isolation, and zero unnecessary cloud dependencies.

---

## 🛠️ Technical Competencies

- **Languages:** Kotlin, Modern C++ (Android NDK), Java, Swift (interop)
- **Mobile & Multiplatform:** Android SDK, Jetpack Compose, Compose Multiplatform, Adaptive Layouts, Window Size Classes, iOS (SwiftUI host integration), Android TV (Leanback & D-pad)
- **On-Device AI & Compute:** `llama.cpp`, Google AI Edge LiteRT (v2.3), LiteRT-LM, Apple MLX, on-device image synthesis (Bonsai 4B), Vulkan / OpenCL / Metal compute backends, speculative drafting pipelines
- **Data & Architecture:** MVI, Clean Architecture, Unidirectional Data Flow, SQLDelight, Room, Cloud Firestore (Schema v5), Coroutines & Reactive Flows, memory-mapped I/O
- **Hardware & Systems:** Custom Android Touch Hardware, Hardware Abstraction Layers (HAL), POS Payment Terminals, Thermal Printers, Unix Domain Sockets, defensive IPC, POSIX `fork()` sandboxing
- **Media & Multimedia:** FFmpeg video manipulation, photo manipulation pipelines, custom canvas rendering

---

## 🚀 Independent Products

### 1. AI Playground - On-Device Multimodal AI Workstation
**Role:** Director & Lead Engineer  
**Tech:** Kotlin Multiplatform (CMP 1.12), C++20 / NDK (JNI), llama.cpp v0.8.0, Google AI Edge LiteRT, Apple MLX Swift / Metal GPU, stable-diffusion.cpp, SQLDelight  
**Status:** Live on Google Play (v1.7.7 Production) &middot; iOS in development

An offline-first multimodal AI workstation that runs local LLMs and diffusion models directly on mobile silicon, keeping user conversations, documents, and generated images private with zero cloud telemetry (`INV-OFFLINE-01`).

- **Multi-Engine On-Device Runtimes:** Runs GGUF models via high-performance `llama.cpp` JNI bindings with dynamic multi-binary `LlamaEngineLoader` (OpenCL/Vulkan GPU routing on Android and native Metal GPU on iOS), Safetensors models via Apple MLX Swift on iOS, and MediaPipe `.task` models.
- **Dual-Model Speculative Turbo Decoding:** Couples compact companion draft models (e.g. Qwen 2.5 0.5B) with target models (e.g. Llama 3.2 1B). Dynamic draft context capping and KV cache session pre-warming double decoding throughput on local mobile silicon without VRAM exhaustion.
- **Defensive Hardware Sandbox:** Designed a crash-resilient `fork()` child process watchdog sandbox with a 3000ms loop and `kill(pid, SIGKILL)` fallback for native Vulkan driver probing, preventing vendor GPU driver segmentation faults from crashing the application UI.
- **On-Device Diffusion & Bonsai Image Ternary 4B:** Local text-to-image synthesis supporting 16 curated models across Android (LiteRT multi-graph, `stable-diffusion.cpp` GGUF) and iOS (Apple MLX Metal GPU, Core ML), with 4-step synthesis via Bonsai Image Ternary 4B (FLUX.2-klein quantized to 1.58-bit/2-bit ternary weights) and W3C PNG `tEXt` chunk attribution metadata.
- **Pure-KMP Document Parsing Engine:** Offline semantic extraction across 25+ file formats (TXT, LOG, MD, CSV, TSV, JSON, XML, YAML, DOCX, DOC, XLSX, XLS, PPTX, PPT, RTF, ODT, ODS, ODP) using pure RFC 1951 Deflate decompression without external binaries or cloud services.
- **Context Intelligence & System Integration:** System-wide text selection action (`ACTION_PROCESS_TEXT`), context-aware smart clipboard detection (20+ chars) with one-tap action pills, offline touch-to-talk speech-to-text, and 11 localized languages with native RTL support.

👉 **Artifacts & Links:** [Google Play Store](https://play.google.com/store/apps/details?id=com.deardhruv.llmplayground) &middot; [6-Part Engineering Blog Series](/posts/ai_playground_series/)

---

### 2. VelociHue - High-Framerate Arcade Game in KMP
**Role:** Director & Lead Engineer  
**Tech:** Kotlin Multiplatform (Kotlin 2.4.21, CMP 1.12.2), Target SDK 37 (Android 17), Cloud Firestore (Schema v5), Android TV (Leanback & D-pad), iOS 18 (SwiftUI & Metal)  
**Status:** Live on Google Play (v0.1.8 Production) &middot; Android TV Live &middot; iOS Playable

A fast-paced arcade action game engineered with Kotlin Multiplatform and Compose Multiplatform, shipping natively on Android and Android TV with shared physics and deterministic progression logic across platforms.

- **Shared Pure-Kotlin Game Engine:** Deterministic game loop running at 60-120 FPS managing color-matching physics, projectiles, and power-ups across Android, Android TV, and iOS with 100% shared logic.
- **Boost & Overdrive Speed Surge:** Reactive gauge accrual from perfect passes, edge grazes, asteroid kills, and wormholes, delivering 2.2x world speed surges, obstacle shattering, and auto-magnetism.
- **Zero-Allocation Hot-Path Rendering:** Eliminated 11 `BoxWithConstraints` subcompositions on the rendering hot path, implementing GPU-scaled canvas `drawText` via `rememberTextMeasurer` in `ScorePopUpLayer` with memoized draw states.
- **Conflict-Free Cloud Sync Engine (Schema v5):** Multi-device synchronization backed by Cloud Firestore with a 3-way union merge strategy that reconciles player progression, cosmetics, and streaks across devices.
- **Interactive Pilot Academy & Adaptive Ergonomics:** 6-module interactive training academy reusing real in-game UI components, with posture classification adapting for foldables, flips, tablets, and phones.
- **Native Android TV & Living Room Parity:** Dedicated television deployment with Leanback manifest declarations, D-pad remote navigation (Down to fire, Up to boost), and living-room TV ad gating.
- **29-Achievement Multi-Tiered Engine:** Progression system evaluated by a pure-function derived unlock engine (`AchievementUnlockComputation`) with retroactive upgrade backfill across player levels.
- **Sensory & Accessibility Suite:** Built-in photo-sensitive and reduced-motion safety mode, granular SFX/music volume controls, and dynamic haptic feedback scaling.

👉 **Artifacts & Links:** [Google Play Store](https://play.google.com/store/apps/details?id=com.deardhruv.velocihue) &middot; [Technical Project Deep-Dive](/projects/)

---

### 3. Open Store - TV Apps & Launcher for Android TV
**Role:** Author & Lead Engineer  
**Tech:** Kotlin 2.1.10, Jetpack Compose for TV (AndroidX TV Material 3), Target SDK 37 (Android 17), Android TV (Leanback), R8 Minification, Background Concurrency (`Dispatchers.IO`)  
**Status:** Live on Google Play (v1.0.7 Production) &middot; Exclusively for Android TV & Google TV

A lightweight, privacy-first companion, smart launcher, and app hub engineered specifically for Android TV and Google TV devices, providing an instant gateway to open the Google Play Store, manage installed apps, monitor storage health, and navigate living-room settings with zero ads and zero telemetry.

- **Google Play Store Gateway:** Instant 1-click shortcut to launch the official Google Play Store on Android TV and Google TV devices where the store icon is hidden or buried by the system launcher.
- **My TV Apps Drawer & Instant Remote Search:** High-resolution 2D grid displaying all installed TV and system applications with real-time D-pad remote search, 3-way smart sorting (A-Z/Z-A, Recently Installed, Recently Updated), and bloatware app hiding.
- **Quick Launch Pinned Favorites Shelf:** Dedicated living-room top shelf pinning up to 6 frequently used apps for instant 1-click launching and remote navigation.
- **App Details & Context Actions:** Long-press or Menu button context actions to open apps, view version labels (`vX.Y.Z`), pin/unpin favorites, hide/unhide applications, open system App Info/permissions, safe uninstall, or jump directly to the Play Store listing.
- **Living-Room Quick TV Settings & Storage Health:** Direct TV shortcuts to Storage, Applications, Network & Internet, and Bluetooth Remotes & Accessories with robust fallback intent chains, plus a real-time storage gauge with color-coded capacity indicators.
- **10 OLED Dark Themes & Top 10 Languages:** Hand-crafted dark palettes tailored for OLED living-room screens, localized in English, Spanish, Hindi, German, French, Japanese, Portuguese, Russian, Arabic (RTL), and Simplified Chinese with automatic TV system language detection and RTL-aware horizontal traversal (`rtlFocusProperties`).
- **100% Fluid D-Pad Navigation & Zero Focus Traps:** Engineered strictly for remote controls with focus memory, 2D traversal, deterministic default active selection on fresh launch, seamless focus preservation on warm resume, smooth press scale damping (`0.98f`), trailing long-press release defusing, and column-proportional hero-to-shelf routing.
- **Adaptive Low-RAM Engine & Memory Trimming:** Automatic gradient bypass and zero-scale focus on budget TV hardware; cooperative OS memory pressure trimming (`onTrimMemory`), running at 57 MB PSS standard and 52 MB PSS in low-RAM mode on 4K TV.
- **Zero Ads & 100% Privacy:** No advertisements, no background telemetry, no tracking SDKs, and automatic sanitization of pinned/hidden lists on every scan to eliminate ghost slots.

👉 **Artifacts & Links:** [Google Play Store](https://play.google.com/store/apps/details?id=com.deardhruv.openstore) &middot; [Open Store Legal & Privacy](/other/open-store-app/)

---

## 💼 Selected Work by Employer

### 3. Digital Commerce & In-Store Android Touch Systems
**Role:** Lead Android Engineer  
**Tech:** Kotlin, Jetpack Compose, Clean Architecture, MVI, Custom Android OS, Hardware HAL  

Engineering innovative digital commerce applications and in-store interactive experiences operating on custom Android touch hardware.

- Conducted research and engineering on custom Android OS builds for touch screens and in-store retail displays.
- Integrated hardware peripherals including thermal receipt printers and payment terminals with defensive connection lifecycles.
- Developed library-based modular architectures with modern UI built completely in Jetpack Compose.
- Established engineering best practices, automated linting, code reviews, and quality assurance processes across cross-functional teams.

> **Worked at:** IMPACT Commerce, Denmark &middot; **Role:** Lead Android Engineer &middot; **Period:** Feb 2022–Present

---

### 4. PLANOLY Visual Planner & StoriesEdit Template Editor
**Role:** Senior Android Developer  
**Tech:** Kotlin, Java, Jetpack Compose, MVP/MVVM, FFmpeg, Photo Manipulation APIs  

Engineered key creative features for PLANOLY (visual planner for Instagram and Pinterest) and StoriesEdit (template editor for Instagram).

- Engineered multimedia editing workflows, including complex video manipulations and encoding pipelines using FFmpeg.
- Built interactive photo manipulation and layout template editing tools with high-fidelity canvas rendering.
- Modernized legacy MVP application components to MVVM architecture using modern Jetpack libraries and Jetpack Compose.
- Profiled application bottlenecks, optimized rendering latency, and stabilized memory footprint across large media grids.
- Collaborated across distributed agile squads (including on-site hybrid tenure in Austin, TX) conducting code reviews and sprint planning.

> **Worked at:** PLANOLY, USA &middot; **Role:** Senior Android Developer &middot; **Period:** Nov 2018–Feb 2022

---

### 5. Client Android Applications & Mobile Engineering Leadership
**Role:** Tech Lead | Android Engineer  
**Tech:** Android SDK, Java, Kotlin, Agile Engineering, Architecture Consulting  

Led engineering teams delivering diverse Android applications for enterprise clients across international markets.

- Directed developer teams through technical planning, architecture design, and delivery milestones.
- Conducted regular technical training sessions introducing emerging Android technologies and modern design patterns.
- Managed end-to-end mobile development lifecycle, adhering to strict client deadlines and budgetary requirements.
- Collaborated with external stakeholders to translate product requirements into maintainable software roadmaps.

> **Worked at:** Ashapura Softech Inc, India &middot; **Role:** Tech Lead / Android Engineer &middot; **Period:** Jun 2016–Oct 2018

---

### 6. Mobile Platform Delivery & UI Automation
**Role:** Team Lead | Senior Android Developer  
**Tech:** Android SDK, UI Automator, Clean Architecture, Automated Testing  

Designed, developed, tested, and deployed high-performance mobile applications while standardizing automated testing.

- Authored automated UI testing suites using Android UI Automator, ensuring regression-free deployment of critical user journeys.
- Managed a squad of Android developers, conducting comprehensive code reviews and mentoring junior developers in clean code practices.
- Actively engaged in client and product owner consultations to align technical implementation with business objectives.

> **Worked at:** Russmedia Tech, India &middot; **Role:** Team Lead / Senior Android Developer &middot; **Period:** Feb 2014–Jun 2016

---

### 7. Early Android, Interactive Games & iPhone Development
**Role:** Junior Android Developer  
**Tech:** Android SDK, Java, Objective-C, Game Loops  

Built early commercial Android applications, interactive 2D mobile games, and contributed to early iPhone application maintenance.

> **Worked at:** Hidden Brains InfoTech, India &middot; **Role:** Junior Android Developer &middot; **Period:** Jan 2012–Dec 2013

---

### 8. Early Engineering Foundation & Training
- **Orane Inc (Oct 2011 – Dec 2011):** Junior Android Developer: research into Android animations and game mechanics.  
  > **Worked at:** Orane Inc &middot; **Role:** Junior Android Developer &middot; **Period:** Oct 2011–Dec 2011
- **DataSoft (Feb 2011 – May 2011):** Trainee: created an accessible mobile application catering to the needs of visually impaired individuals.  
  > **Training:** DataSoft &middot; **Role:** Trainee &middot; **Period:** Feb 2011–May 2011
- **Coronation (Feb 2010 – May 2010):** Trainee: developed web applications using ASP.NET and VB.NET.  
  > **Training:** Coronation &middot; **Role:** Trainee &middot; **Period:** Feb 2010–May 2010

---

## 🎤 Speeches & Developer Conferences

I regularly speak at Google Developer Group (GDG) DevFest conferences and technical symposiums:

- **Dec 2025:** *Jetpack Compose - Game changing features* at GDG DevFest Surat, India (Deep dive into Navigation 3, adaptive layouts, performance boosts, and Accessibility).
- **Nov 2025:** *Android 17 Mandates Adaptive Layouts* at GDG DevFest Ahmedabad, India (Adaptive UI architecture using window size classes across phones, foldables, tablets, and desktop windows).
- **Jun 2022:** *What's new in Android* at Gandhinagar, India (Technical overview of APIs and system capabilities introduced in Android 13).
- **Sep 2019:** *UI & UX with ease for Mobile* at GDG DevFest Surat, India (Handling responsive UI and multi-screen UX across mobile devices).
- **Sep 2019:** *UI & UX with ease for Mobile* at GDG DevFest Rajkot, India.
- **Sep 2018:** *Android Jetpack – Slices* at GDG DevFest Ahmedabad, India (Architecture and implementation demo of Android Slices).
- **Feb 2018:** *DialogFlow Chatbot Workshop* at Gujarat State Student Convention (GSSC 2018), Anand, India.
- **Feb 2018:** *DialogFlow Workshop* at Rajkot, India.

---

## 🌐 Open Source & Community Leadership

- **Hands-On Architecture:** Guiding engineering teams through multi-module Gradle modularization, unidirectional data flow, and modern Android/KMP migration patterns.
- **Open-Source Contribution:** Active contributor and maintainer across mobile and multiplatform ecosystems on GitHub ([@DearDhruv](https://github.com/DearDhruv)).
- **Technical Writing:** Author of the six-part engineering series [Beyond the Model](/posts/ai_playground_series/), covering on-device AI runtimes, memory guardrails, and mobile hardware acceleration.

---

## 📱 Connect & Inquiries

- **Email:** [dhruv.time@gmail.com](mailto:dhruv.time@gmail.com)
- **LinkedIn:** [linkedin.com/in/deardhruv](https://www.linkedin.com/in/deardhruv/)
- **GitHub:** [github.com/DearDhruv](https://github.com/DearDhruv)
- **X / Twitter:** [x.com/DearDhruv](https://x.com/DearDhruv)
- **Instagram:** [instagram.com/deardhruv](https://instagram.com/deardhruv)
- **Google Play:** [Dhruv Patel Developer Page](https://play.google.com/store/apps/dev?id=5177092407740817842)
- **about.me:** [about.me/deardhruv](https://about.me/deardhruv)
- **Hugging Face:** [huggingface.co/deardhruv](https://huggingface.co/deardhruv)
- **Medium:** [medium.com/@DearDhruv](https://medium.com/@DearDhruv)
- **Stack Overflow:** [deardhruv](https://stackoverflow.com/users/596566/deardhruv)
- **Résumé:** [Download PDF](/resume.pdf)
