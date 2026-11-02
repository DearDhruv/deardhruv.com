# Test Tool and Environment Limitations Policy

**Document version:** 1.0.0  
**Effective date:** November 2026  
**Scope:** Transparency regarding testing tools, emulation vs physical hardware, and automated vs manual limitations  
**Reference standard:** Section 3.7 & 6.2 of the Web Standards Audit Plan

---

## 1. Honesty Regarding "Free" and Automated Scanners

Automated scanners (Lighthouse, axe-core, Pa11y, Nu HTML Checker, PageSpeed Insights) are valuable diagnostic heuristics, but they have fundamental technical limitations that must be acknowledged:

1. **Lab Simulation vs. Real Physical Devices:**
   - Chrome DevTools CPU throttling (e.g., 4x or 6x slowdown) emulates clock frequency limits, but it **does not simulate**:
     - Real-world thermal throttling under continuous load.
     - Low-end GPU memory limitations, driver bugs, or texture upload stalls.
     - Actual physical memory pressure (Low Memory Killer / OOM eviction on 2GB RAM Android phones).
     - Physical battery drain or display refresh rate variance (90Hz, 120Hz, or variable refresh rates).
   - Findings from emulators must be recorded as **Lab Emulation**, never as physical-device proof.

2. **Automated Accessibility Scan Coverage:**
   - Tools like axe-core and Pa11y detect syntax violations, contrast issues, missing alt attributes, and duplicate IDs.
   - However, they **cannot determine**:
     - Whether an image's `alt` text is actually meaningful or confusing.
     - Whether a screen reader's spoken output conveys the intended semantic structure.
     - Whether keyboard navigation feels natural, intuitive, and logical.
     - Whether error messages are clear and actionable to a human user.
   - Automated accessibility scans catch ~30-40% of WCAG criteria. A clean automated scan is **not** a certificate of WCAG conformance.

3. **Public Free Cloud Scanners (PSI, WebPageTest):**
   - Free public scanners run from remote cloud server locations (e.g., Virginia, Ireland) under synthetic network profiles.
   - They fluctuate based on public cloud queue load, network jitter, and CDN cache warming.
   - Results should be compared across multiple runs using medians, rather than treating a single score as ground truth.
   - Mark unavailable field measurements as **Not measured** rather than inventing numbers.

4. **Television and Remote Control Interfaces:**
   - Testing a 1920x1080 desktop browser with arrow keys verifies basic CSS styling, but does **not verify**:
     - TV remote D-pad input latency over Bluetooth / Infrared.
     - WebOS / Tizen browser rendering engine idiosyncrasies.
     - Television overscan clipping on diverse hardware panels.
   - Mark TV support as **Emulated 10-foot desktop test** unless verified on an actual connected Smart TV.

---

## 2. Policy for Engineering Claims

- **Never claim "Tested on all devices":** Document the exact physical models tested (e.g., MacBook Pro M-series, Pixel 8, iPhone 15, iPad).
- **Never claim "WCAG 2.2 Certified":** Claim "Engineered to WCAG 2.2 Level AA acceptance standards; verified via automated rules and manual checklist."
- **Separate Lab Diagnostics from Real-User Field Data:** Always report lab scores (Lighthouse) distinctly from real-user Core Web Vitals (CrUX).
