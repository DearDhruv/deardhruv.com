+++
title = "About Dhruv Patel"
date = "2022-08-03"
layout = "hero-page"
aliases = ["about-us", "about-hugo", "contact"]
[author]
name = "Dhruv Patel"
+++

I'm **Dhruv Patel** (known online as **DearDhruv**), a Lead Android Engineer, Android Architect, and Android Artist based in India. I focus on native mobile systems, high-performance architecture, and running local AI models directly on consumer devices.

Currently, I serve as a **Lead Android Engineer at Impact Commerce**, where I work on digital commerce applications, POS payment terminal integrations, and high-throughput checkout flows.

Beyond enterprise systems, I spend significant time building open-source tools and experimental applications. Two projects where I've documented my work in detail are **[AI Playground](https://github.com/DearDhruv/Model-Playground)**, an offline-first mobile workstation for running local LLMs and diffusion models, and **[VelociHue](https://play.google.com/store/apps/details?id=com.deardhruv.velocihue)**, a fast-paced multiplatform game running across Android, iOS, and Android TV.

👉 **Portfolio:** [Explore engineering highlights and case studies](/portfolio/)

---

## 🛠️ How I Approach Engineering

I prefer working on problems where software directly meets hardware limits. A few principles that guide how I build:

### 1. Build for Real Device Constraints
Mobile devices have hard thermal ceilings, volatile memory budgets, and unpredictable battery drains. When building AI Playground, running inference directly on a phone meant accounting for vendor Vulkan driver segmentation faults. Rather than pretending mobile drivers never crash, I moved inference into a defensive `fork()` child process sandbox with a 3000ms watchdog loop. If a driver crashes, the child process is terminated with `SIGKILL` without taking down the user's UI.

### 2. Prefer Local Processing Where Practical
Cloud services are convenient, but keeping compute local protects privacy, eliminates round-trip network latency, and ensures applications work when connections fail. Running on-device LLMs (via `llama.cpp` and `LiteRT`) and keeping documents in a local SQLite database ensures personal data never leaves the device.

### 3. Share Logic Without Sacrificing Native Feel
In Kotlin Multiplatform, I favor sharing deterministic core logic—state stores, persistence engines, and game loops—while respecting each platform's native strengths. In VelociHue, Android TV navigation uses native D-pad focus semantics, iOS runs a SwiftUI host, and Android uses Jetpack Compose, all sharing a single deterministic physics loop.

### 4. Hardware Integration Demands Defensive IPC
Working with 30+ physical point-of-sale peripherals (receipt printers, barcode scanners, payment terminals) taught me that hardware state can disconnect at any millisecond. I design hardware abstraction layers with isolated IPC channels, timeout fallbacks, and zero unhandled exceptions.

---

## 🌍 Background & Technical Focus

Over the course of my engineering career across startups to enterprise platforms, I've focused on:

- **Native Android & System Internals:** Kotlin, Jetpack Compose, Coroutines/Flow, and C++20 via the Android NDK.
- **Kotlin Multiplatform (KMP/CMP):** Shared MVI architectures, Compose Multiplatform for Android, iOS, and Android TV.
- **On-Device Machine Learning:** Local inference engines (`llama.cpp`, Google AI Edge LiteRT, Apple MLX), speculative drafting pipelines, and on-device image synthesis (Bonsai 4B & Ternary diffusion).
- **Architecture & Resilient Storage:** MVI, unidirectional data flow, SQLDelight, Room, and offline-first synchronization with Cloud Firestore.
- **Team Leadership & Mentorship:** Guiding engineering teams through modern architecture migrations, code quality standards, and performance profiling.

---

## 🎤 Community & Technical Writing

I enjoy breaking down complex systems into practical, readable explanations. I regularly document my findings and speak with the developer community about:

- Running on-device LLMs and diffusion models on mobile silicon.
- Kotlin Multiplatform architecture patterns for production apps.
- Native crash sandboxing and memory safety with the Android NDK.
- Performance profiling, thermal management, and battery guardrails.

You can read my six-part engineering breakdown in the **[Beyond the Model Series](/posts/ai_playground_series/)**.

---

## 📱 Connect & Verified Profiles

If you'd like to discuss native mobile architecture, on-device AI systems, or technical speaking, feel free to reach out directly.

- **📧 Email:** [dhruv.time@gmail.com](mailto:dhruv.time@gmail.com)
- **💼 LinkedIn:** [linkedin.com/in/deardhruv](https://www.linkedin.com/in/deardhruv/)
- **💻 GitHub:** [@DearDhruv](https://github.com/DearDhruv)
- **🐦 X / Twitter:** [@DearDhruv](https://x.com/DearDhruv)
- **📸 Instagram:** [@DearDhruv](https://instagram.com/deardhruv)
- **🌐 about.me:** [about.me/deardhruv](https://about.me/deardhruv)
- **🤗 Hugging Face:** [@DearDhruv](https://huggingface.co/deardhruv)
- **✍️ Medium:** [@DearDhruv](https://medium.com/@DearDhruv)
- **📚 Stack Overflow:** [deardhruv](https://stackoverflow.com/users/596566/deardhruv)
- **🎨 Dribbble:** [@DearDhruv](https://dribbble.com/DearDhruv)
- **▶️ YouTube:** [@Dhruvein](https://www.youtube.com/user/Dhruvein)
- **🤖 Reddit:** [u/DearDhruv](https://www.reddit.com/user/DearDhruv/)

---

### 🔗 Quick Links

- **Portfolio:** [View full engineering portfolio](/portfolio/)
- **Projects:** [See production systems and case studies](/projects/)
- **Articles:** [Read technical engineering logs](/posts/)
- **Sitemap:** [Explore site structure](/sitemap/)
