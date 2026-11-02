+++
title = "About Dhruv Patel"
date = "2022-08-03"
layout = "hero-page"
aliases = ["about-us", "about-hugo", "contact"]
[author]
name = "Dhruv Patel"
+++

I'm **Dhruv Patel** (known online as **DearDhruv**), a Lead Android Engineer, Android Architect, and Android Artist based in India. With 15+ years of experience across mobile engineering, I focus on native mobile systems, high-performance architecture, hardware integration, and running local AI models directly on consumer devices.

Currently, I serve as a **Lead Android Engineer at IMPACT Commerce**, where I work on digital commerce applications, custom Android OS touch hardware, and point-of-sale integrations.

Beyond enterprise systems, I design and build independent open-source products. Two projects where I've documented my work in detail are **[AI Playground](https://play.google.com/store/apps/details?id=com.deardhruv.llmplayground)**, an offline-first mobile workstation for running local LLMs and diffusion models, and **[VelociHue](https://play.google.com/store/apps/details?id=com.deardhruv.velocihue)**, a fast-paced arcade action game engineered in Kotlin Multiplatform and Compose Multiplatform for Android and Android TV.

👉 **Portfolio:** [Explore engineering highlights and employer case studies](/portfolio/)

---

## 🛠️ How I Approach Engineering

I prefer working on problems where software directly meets hardware limits. A few principles that guide how I build:

### 1. Build for Real Device Constraints
Mobile devices have hard thermal ceilings, volatile memory budgets, and unpredictable battery drains. When building AI Playground, running inference directly on a phone meant accounting for vendor Vulkan driver segmentation faults. Rather than pretending mobile drivers never crash, I moved inference into a defensive `fork()` child process sandbox with a 3000ms watchdog loop. If a driver crashes, the child process is terminated with `SIGKILL` without taking down the user's UI.

### 2. Prefer Local Processing Where Practical
Cloud services are convenient, but keeping compute local protects privacy, eliminates round-trip network latency, and ensures applications work when connections fail. Running on-device LLMs (via `llama.cpp` and `LiteRT`) and keeping documents in a local SQLite database ensures personal data never leaves the device.

### 3. Share Logic Without Sacrificing Native Feel
In Kotlin Multiplatform, I favor sharing deterministic core logic (state stores, persistence engines, and game loops) while respecting each platform's native strengths. In VelociHue, Android TV navigation uses native D-pad focus semantics, iOS runs a SwiftUI host, and Android uses Jetpack Compose, all sharing a single deterministic physics loop.

### 4. Hardware Integration Demands Defensive State Machines
Working with physical point-of-sale peripherals (receipt printers, payment terminals) taught me that hardware state can disconnect at any millisecond. I design hardware abstraction layers with isolated IPC channels, timeout fallbacks, and defensive reconnection state machines.

---

## 💼 Career History & Experience

- **Lead Android Engineer** - *IMPACT Commerce, Denmark & India* (Feb 2022 – Present)  
  Digital commerce mobile applications, custom Android OS research for touch screens, hardware integration (printers, payment terminals), and Jetpack Compose library architectures.
- **Senior Android Developer** - *PLANOLY, USA & India* (Nov 2018 – Feb 2022)  
  Visual planner for Instagram/Pinterest and StoriesEdit template editor; video manipulation using FFmpeg; photo manipulation; MVVM architecture migration; performance optimization.
- **Tech Lead | Android Engineer** - *Ashapura Softech Inc, India* (Jun 2016 – Oct 2018)  
  Managed and directed teams of Android developers delivering client applications, led technical sessions, and coordinated with external stakeholders.
- **Team Lead | Senior Android Developer** - *Russmedia Tech, India* (Feb 2014 – Jun 2016)  
  Android application design, development, and support; authored UI Automator test scripts; managed developer squads and conducted code reviews.
- **Junior Android Developer** - *Hidden Brains InfoTech, India* (Jan 2012 – Dec 2013)  
  Android applications, 2D mobile game development, and early iPhone application development.
- **Early Career Foundation & Training**  
  - *Orane Inc* (Oct 2011 – Dec 2011): Junior Android Developer (animations & games).  
  - *DataSoft* (Feb 2011 – May 2011): Trainee (accessible app for visually impaired individuals).  
  - *Coronation* (Feb 2010 – May 2010): Trainee (ASP.NET & VB.NET web development).

---

## 🎓 Education & Awards

- **Education:** Computer Engineering, Nirma University, Gujarat, India (Graduated July 2011, Grade: 7.15 / 10).
- **Awards:** 3rd Place in State-level Web Designing Competition, ISTE Student Chapter, TechFest 2010 at Nirma University.

---

## 🎤 Speeches & Developer Conferences

I regularly speak with the developer community at Google Developer Group (GDG) DevFest conferences:

- **Dec 2025:** *Jetpack Compose - Game changing features* at GDG DevFest Surat, India (Deep dive into Navigation 3, adaptive layouts, performance boosts, and Accessibility).
- **Nov 2025:** *Android 17 Mandates Adaptive Layouts* at GDG DevFest Ahmedabad, India (Adaptive UI architecture using window size classes across phones, foldables, tablets, and desktop windows).
- **Jun 2022:** *What's new in Android* at Gandhinagar, India (Technical overview of APIs and system capabilities introduced in Android 13).
- **Sep 2019:** *UI & UX with ease for Mobile* at GDG DevFest Surat, India (Handling responsive UI and multi-screen UX across mobile devices).
- **Sep 2019:** *UI & UX with ease for Mobile* at GDG DevFest Rajkot, India.
- **Sep 2018:** *Android Jetpack – Slices* at GDG DevFest Ahmedabad, India (Architecture and implementation demo of Android Slices).
- **Feb 2018:** *DialogFlow Chatbot Workshop* at Gujarat State Student Convention (GSSC 2018), Anand, India.
- **Feb 2018:** *DialogFlow Workshop* at Rajkot, India.

---

## 📱 Connect & Verified Profiles

If you'd like to discuss native mobile architecture, on-device AI systems, or technical speaking, feel free to reach out directly:

- **📧 Email:** [dhruv.time@gmail.com](mailto:dhruv.time@gmail.com)
- **💼 LinkedIn:** [linkedin.com/in/deardhruv](https://www.linkedin.com/in/deardhruv/)
- **💻 GitHub:** [@DearDhruv](https://github.com/DearDhruv)
- **🐦 X / Twitter:** [@DearDhruv](https://x.com/DearDhruv)
- **📸 Instagram:** [@DearDhruv](https://instagram.com/deardhruv)
- **🛍️ Google Play:** [Dhruv Patel Developer Page](https://play.google.com/store/apps/dev?id=5177092407740817842)
- **🌐 about.me:** [about.me/deardhruv](https://about.me/deardhruv)
- **🤗 Hugging Face:** [@DearDhruv](https://huggingface.co/deardhruv)
- **✍️ Medium:** [@DearDhruv](https://medium.com/@DearDhruv)
- **📚 Stack Overflow:** [deardhruv](https://stackoverflow.com/users/596566/deardhruv)
- **▶️ YouTube:** [@Dhruvein](https://www.youtube.com/user/Dhruvein)
- **🤖 Reddit:** [u/DearDhruv](https://www.reddit.com/user/DearDhruv/)

---

### 🔗 Quick Links

- **Portfolio:** [View full engineering portfolio](/portfolio/)
- **Projects:** [See production systems and case studies](/projects/)
- **Articles:** [Read technical engineering logs](/posts/)
- **Sitemap:** [Explore site structure](/sitemap/)
