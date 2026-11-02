# Browser and Platform Compatibility Policy

**Document version:** 1.0.0  
**Effective date:** November 2026  
**Scope:** Deardhruv.com production website and all canonical routes  
**Reference standard:** [WHATWG HTML](https://html.spec.whatwg.org/), [CSS Specifications](https://www.w3.org/Style/CSS/), [MDN Baseline](https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility)

---

## 1. Core Principle: Progressive Enhancement

The site is built as a zero-client-hydration static website using Astro, plain semantic HTML, modular CSS custom properties, and native platform features. The core content—all articles, case studies, resume details, project breakdowns, and site navigation—must be fully readable and operable even if JavaScript is disabled, blocked, or fails to execute.

## 2. Supported Browser Tier Matrix

### Tier 1: Primary Target (Full Visual & Interaction Fidelity)
These browsers represent modern web platforms and must display 100% intended visual aesthetics, color transitions, smooth scrolling, and custom properties without degradation.

| Browser Engine | Browser Names | Versions Supported | Operating Systems |
|---|---|---|---|
| **Blink / Chromium** | Google Chrome, Microsoft Edge, Brave, Vivaldi | Current stable + previous 2 major versions | macOS, Windows, Linux, Android, ChromeOS |
| **WebKit** | Apple Safari, Mobile Safari | Current stable + previous major release (iOS 16+, macOS Ventura+) | macOS, iOS, iPadOS |
| **Gecko** | Mozilla Firefox | Current stable + ESR (Extended Support Release) | macOS, Windows, Linux, Android |
| **Mobile WebViews** | Android System WebView, iOS WKWebView | Current stable Play Store / iOS releases | Android 10+, iOS 16+ |

### Tier 2: Television & 10-Foot Interfaces
Web browsing on smart televisions and media hubs requires distinct interaction and layout considerations (large typography, remote control D-pad navigation, high contrast).

| Platform | Environments | Interaction Mode | Target Viewing Distance |
|---|---|---|---|
| **Android TV / Google TV** | Chromium-based TV browsers | D-pad / Arrow Key remote | 10-foot viewing distance (~3 meters) |
| **Samsung Tizen** | Samsung Internet for TV | Remote directional navigation | 10-foot viewing distance |
| **LG webOS** | LG Web Browser | Magic Remote pointer / D-pad | 10-foot viewing distance |

### Tier 3: Documented Older-Browser Floor (Graceful Degradation)
For older devices, embedded browsers, or high-latency networks:

- **Baseline Floor:** Chrome 80+, Firefox 78+, Safari 13.1+, Edge 80+.
- **Guaranteed Behavior:** Content is fully readable; semantic landmarks and document hierarchy (`<h1>`-`<h6>`) render properly; links and anchor jumps work; system fonts display cleanly.
- **Allowed Degradation:** Fallback to system color schemes if CSS custom properties fail; standard instantaneous transitions if modern CSS animation features are not supported; standard single-column reflow if modern container queries are unsupported.

---

## 3. Web Feature Standards & Avoidance of Vendor Lock-In

1. **System Font Stack:** To eliminate Flash of Unstyled Text (FOUT) and Flash of Invisible Text (FOIT), the site uses native system font stacks (`system-ui`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `Helvetica Neue`, `Arial`, `sans-serif`). Zero external font network round-trips are required.
2. **CSS Layout Primitives:** Grid, Flexbox, and CSS Custom Properties (`var(--...)`) are universally supported across all Tier 1 and Tier 2 browsers (MDN Baseline Widely Available).
3. **No Polyfill Bloat:** The repository carries zero JavaScript polyfills. Standard Web APIs (`fetch`, `IntersectionObserver`, `URL`, `localStorage`) are used strictly according to WHATWG / W3C standards.
4. **Media Types & Formats:** Images are delivered as optimized WebP with responsive dimension hints (`width`, `height`) and intrinsic aspect ratios to eliminate Cumulative Layout Shift (CLS).

---

## 4. Verification & Testing Protocol

- **Automated Viewport Sweeps:** `npm run quality:browser` audits layouts across viewports from 320px to 3840px.
- **Visual Regression Matrix:** `npm run quality:visual` verifies document landmarks, heading hierarchy, and responsive styling.
- **No-JavaScript Smoke Tests:** `npm test` ensures all content is pre-rendered into static HTML on disk in `dist/`.
