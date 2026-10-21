+++
title = "Projects"
date = "2026-10-21"
description = "Featured engineering projects and production systems showcasing Android architecture, Kotlin Multiplatform, on-device AI runtimes, and high-performance native systems."
+++

---

## AI Playground

**Role:** Director & Lead Engineer | **Tech:** Kotlin Multiplatform, Compose Multiplatform, C++20 / NDK (JNI), llama.cpp v0.7.0, Google AI Edge LiteRT, Apple MLX, Vulkan/OpenCL/Metal, SQLDelight

An offline-first, on-device multimodal AI workstation for Android and iOS that turns mobile devices into self-contained inference engines. Powered by **Kotlin Multiplatform**, **Compose Multiplatform**, native **C++20 NDK (llama.cpp v0.7.0)**, and **Apple MLX Swift / Metal GPU**, it executes open-source LLMs (GGUF, Safetensors, MediaPipe), synthesizes on-device diffusion images (Bonsai Image Ternary 4B / FLUX.2-klein), parses 25+ document formats locally, and delivers desktop-class generation speed with zero cloud subscriptions and 100% data privacy.

**Key Achievements:**

- **Dual-Model Speculative Turbo Engine**: Implemented speculative drafting with companion draft models (e.g., Qwen 2.5 0.5B + Llama 3.2 1B), dynamic draft context capping (`std::min(2048u, ...)`), RAM admission guardrails (`isSpeculativeTurboEligible`), and KV cache session pre-warming to double decoding throughput while preventing VRAM exhaustion.
- **Multi-Runtime Ecosystem**: Engineered a unified runtime orchestrating llama.cpp v0.7.0 (with modular dynamic GPU feature delivery for Vulkan/OpenCL and ARM KleidiAI CPU backend), Google AI Edge LiteRT-LM (.litertlm / .task), LiteRT 2.3.0 Multi-Graph Image Generation (Bonsai 4B), and Apple MLX / Metal GPU on iOS.
- **On-Device Diffusion & Bonsai 4B Image Studio**: Built an on-device image synthesis studio supporting 16 curated models with 4-step photorealistic generation, anti-hallucination presets, and W3C PNG `tEXt` chunk metadata attribution.
- **Zero-Dependency KMP Document Engine**: Developed a pure Kotlin Multiplatform document processing engine extracting semantic structured text across 25+ file formats (PDF, DOCX, XLSX, PPTX, CSV, JSON, Markdown, RTF, OpenDocument) using pure RFC 1951 Deflate/ZIP decompression with zero external cloud APIs.
- **Crash-Resilient Hardware Isolation**: Designed a defensive `fork()` child process sandbox with a non-blocking 3000ms watchdog polling loop and `kill(pid, SIGKILL)` fallback for native Vulkan driver probing, preventing vendor driver GPU SIGSEGV crashes or driver deadlocks from taking down the host app.
- **100% Offline Activity Ledger**: Built a privacy-first local analytics ledger (SQLDelight schema v10) tracking usage milestones, tokens, and active streaks with strictly zero external network calls (`INV-OFFLINE-01`).
- **Streaming Fault-Tolerance**: Architected periodic mid-generation SQLite state persistence (`STREAM_PERSIST_INTERVAL_MS = 2500ms`) with automatic recovery of interrupted assistant turns (`PARTIAL_FAILED` with preserved output text) upon process restart.
- **Cross-Platform Parity & Multimodal Voice**: Delivered full Android & iOS parity featuring offline continuous voice dictation (Apple Speech framework + Android STT), sentence-level multilingual TTS, real-time context token headroom gauges, and an adaptive two-pane layout.

**Live Links:** [AI Playground on Google Play](https://play.google.com/store/apps/details?id=com.deardhruv.llmplayground) | [GitHub Repository](https://github.com/DearDhruv/Model-Playground) | [Deep-Dive Engineering Series](/posts/ai_playground_series/)

---

## VelociHue

**Role:** Director & Lead Engineer | **Tech:** Kotlin Multiplatform, Compose Multiplatform, Kotlin 2.4.0, AGP 9.2.1, Target SDK 37 (Android 17), Cloud Firestore (Schema v5), Android TV

A fast-paced, high-framerate arcade action game engineered in **Kotlin Multiplatform** and **Compose Multiplatform**, shipping natively across Android, iOS (SwiftUI host + shared KMP framework), and Android TV (Leanback & D-pad integration). Built on modern toolchains (Kotlin 2.4.0, AGP 9.2.1, Target SDK 37), it features an endless color-gate survival loop, dynamic physics, particle effects, multi-tiered progression, and conflict-free cross-device cloud synchronization.

**Key Highlights:**

- **Shared Pure-Kotlin Game Engine**: Architected a shared deterministic game loop (`GameEngine`, `CollisionDetector`, `StatsManager`, `AchievementManager`) running at high refresh rates (60–120 FPS), managing color-matching physics, projectiles, power-ups (Shield, Slow-Mo, Magnet), and revive flows across Android and iOS.
- **Conflict-Free Cloud Sync Engine (Schema v5)**: Designed a cross-device sync engine backed by Cloud Firestore (`CloudGameData`) with 3-way union merge strategies that safely synchronize player progression, currency, cosmetics, daily stats, and weekly rolling recaps without data regressions.
- **29-Achievement Multi-Tiered Engine**: Implemented a comprehensive achievement catalog covering 1–5,000 player levels, 100k diamonds, gameplay feats, cosmetic collection milestones, 7–30 day retention streaks, and skill tiers (Untouchable, Pacifist, Sharpshooter, Pure Run) evaluated by a single pure-function derived unlock engine (`AchievementUnlockComputation`) with retroactive upgrade backfill.
- **Sensory & Accessibility Suite**: Integrated a photo-sensitive and reduced-motion safety mode (dampening screen shake, flashes, and slow-mo vignettes), granular SFX/music volume sliders with snap-to-detents and haptic clicks, and dynamic haptic intensity scaling.
- **Native Android TV & 10-Foot Experience**: Built dedicated television deployment with Leanback manifest declarations, D-pad navigation focus states, and TV-optimized layouts.
- **Instant Compose Share Cards**: Engineered a run-summary share card composable captured directly into high-resolution PNGs via Compose `GraphicsLayer.toImageBitmap()` and shared seamlessly via Android `FileProvider`.
- **Multi-Flavor Build Modernization**: Decoupled distribution architecture supporting `internal`, `staging`, and `production` dimensions with automated `buildSrc` version governance and iOS xcconfig synchronization.

**Live Link:** [VelociHue on Play Store](https://play.google.com/store/apps/details?id=com.deardhruv.velocihue)

---

## Digital Commerce Platform

**Role:** Lead Android Engineer | **Tech:** Kotlin, Jetpack Compose, MVVM, Clean Architecture

Building sophisticated digital commerce solutions for global markets with seamless payment integration, inventory management, and real-time synchronization across multiple platforms.

**Key Achievements:**

- Architected scalable mobile solutions handling millions of transactions
- Implemented adaptive layouts for diverse device configurations
- Reduced app load time by 40% through performance optimization

---

## Hardware Integration Module

**Role:** Senior Developer | **Tech:** Kotlin, Android NDK, Hardware APIs, Low-Latency IPC

Developed comprehensive hardware integration layer enabling seamless connectivity with POS systems and peripherals.

**Key Achievements:**

- Integrated 27+ hardware devices (printers, scanners, payment terminals)
- Achieved 99.8% connection reliability
- Reduced hardware communication latency by 60%
- Created reusable abstraction layer for future integrations

---

## Open Source Contributions

**GitHub:** [@DearDhruv](https://github.com/DearDhruv)

Active contributor to Android and Kotlin Multiplatform open source ecosystems with a focus on architecture patterns, on-device AI runtimes, testing utilities, and developer tools.

---

Looking for more details? Feel free to explore the [Blog](/posts) for technical deep-dives on these projects and related topics.
