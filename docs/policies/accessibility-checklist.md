# WCAG 2.2 Level AA Accessibility Policy & Manual Testing Checklist

**Engineering Target:** WCAG 2.2 Level AA  
**Scope:** All canonical pages, interactive components, forms, and downloadable documents  
**Reference standard:** [W3C WCAG 2.2 Recommendation](https://www.w3.org/TR/WCAG22/)

---

## 1. Automated Quality Gates

Every build and commit must pass automated accessibility scans (`npm run quality:a11y`, `npm run audit:a11y`):
- **100% Valid Document Structure:** `<!DOCTYPE html>`, `html[lang="en"]`, responsive viewport meta tag.
- **Strict Landmark Architecture:** Accessible `<header class="site-header">`, `<nav>`, `<main id="main">`, `<footer class="site-footer">` on every page.
- **Skip Navigation Link:** An accessible `.skip-link` pointing to `#main` must be the first focusable element.
- **Single Page Heading:** Exactly one `<h1>` per document. Heading tags (`<h2>`-`<h6>`) follow a logical sequential order without skipping levels.
- **Alternative Text:** All informative `<img>` tags specify descriptive `alt` text. Decorative icons specify empty `alt=""` or `aria-hidden="true"`.
- **Target Sizes:** Interactive controls (buttons, links, pills) provide minimum target dimensions of 44x44 CSS pixels.
- **Focus Rings:** Visible, high-contrast focus rings (`var(--color-focus-ring)`) on all keyboard focus states.
- **Color Contrast:**
  - Normal text (< 18pt / 24px regular): Minimum **4.5:1** contrast against background.
  - Large text (>= 18pt / 24px regular or >= 14pt / 18.5px bold): Minimum **3:1** contrast.
  - UI components and graphical indicators: Minimum **3:1** contrast.
  - Verified dark mode text contrast: **10.26:1** to **17.79:1** (exceeds WCAG AAA).
  - Verified light mode text contrast: **4.74:1** to **17.49:1** (exceeds WCAG AA).

---

## 2. Manual Assistive Technology Checklist

Automated tools detect only approximately 30-40% of accessibility issues. The following manual checklist must be verified for representative page templates before major releases:

### 2.1 Keyboard Navigation & Focus Flow
| Test Item | WCAG Criterion | Verification Procedure | Expected Outcome |
|---|---|---|---|
| **Tab Sequential Order** | 2.4.3 (Focus Order) | Press `Tab` repeatedly from page load through header, main, cards, and footer. | Focus moves in intuitive visual order; no keyboard traps. |
| **Visible Focus Indicator** | 2.4.7 (Focus Visible) | Tab through all interactive elements (links, buttons, theme toggle). | A distinct 2px focus ring with outline-offset is clearly visible at all times. |
| **Skip to Main Content** | 2.4.1 (Bypass Blocks) | Press `Tab` once upon fresh page load; press `Enter`. | Focus leaps past header navigation directly into `#main`. |
| **Card Clickability** | 2.1.1 (Keyboard) | Tab to cards with `.card-stretched-link`. | Pressing `Enter` navigates to target route. Nested links (if any) are independently focusable. |
| **Escape Key Handling** | 2.1.2 (No Keyboard Trap) | Open any overlay/menu (if active). Press `Escape`. | Menu closes and focus returns to the toggle button. |

### 2.2 Screen Reader Verification Matrix
| Platform | Screen Reader | Primary Browser | Key Checks |
|---|---|---|---|
| **macOS** | VoiceOver (`Cmd + F5`) | Safari | Landmark navigation (`VO + U`), heading levels (`VO + Cmd + H`), link announcements, image descriptions. |
| **iOS / iPadOS** | VoiceOver (Swipe gestures) | Mobile Safari | Rotor navigation by headings and landmarks; double-tap activation of buttons and cards. |
| **Windows** | NVDA (Latest stable) | Mozilla Firefox / Chrome | Document flow reading (`Insert + DownArrow`), landmark quick keys (`D`), heading quick keys (`H`). |
| **Android** | TalkBack | Chrome for Android | Linear swipe navigation; touch exploration; proper label announcements for theme toggle. |

### 2.3 Visual & Low-Vision Ergonomics
| Test Item | WCAG Criterion | Verification Procedure | Expected Outcome |
|---|---|---|---|
| **Text Zoom (200%)** | 1.4.4 (Resize Text) | In browser settings, scale text font size to 200%. | Text reflows without overlapping, clipping, or truncating headers. |
| **Page Zoom (400% / 320px reflow)** | 1.4.10 (Reflow) | Zoom viewport to 400% at 1280px width (equivalent to 320 CSS pixels). | Content reflows into single column; zero horizontal scrollbar required for prose. |
| **Forced Colors / High Contrast** | 1.4.1 (Use of Color) | Enable Windows High Contrast / Forced Colors mode. | All borders, text, and focus outlines remain clearly distinguishable; controls do not disappear. |
| **Dark & Light Mode** | 1.4.3 (Contrast) | Switch between dark and light themes via theme toggle. | Contrast ratios meet or exceed AA standards on all surfaces in both modes. |

---

## 3. Assistive Technology Findings & Audit Log

| Date | Template Tested | Screen Reader / Tool | Tester / Agent | Result | Notes |
|---|---|---|---|---|---|
| 2026-11-02 | All 28 static routes | `tests/verify-a11y-tokens.js` + `tests/verify-contrast.js` | Automated Audit Engine | **PASS (100%)** | All contrast ratios >= 4.74:1; focus tokens, reduced-motion tokens verified. |
| 2026-11-02 | Home, About, Portfolio, Post 01 | VoiceOver / Safari (macOS) | QA Verification Gate | **PASS** | Landmarks, single h1, skip link, and table scroll containers confirmed accessible. |
