# Responsive Viewport Matrix and Device Adaptation Policy

**Document version:** 1.0.0  
**Effective date:** November 2026  
**Scope:** Responsive layout, fluid grid systems, typography, and cross-device containment  
**Reference standard:** Section 4.11 & 6.1 of the Web Standards Audit Plan

---

## 1. Viewport Test Matrix (CSS Pixels)

The design must behave fluidly between standard breakpoints rather than functioning only at fixed pixel dimensions. The verification suite (`npm run quality:browser` / `tests/verify-viewport-matrix.js`) audits layout stability across the following 25 representative viewport widths:

| Device Category | Target Widths (px) | Height (px) | Orientation / Use Case | Required Layout Behavior |
|---|---|---|---|---|
| **Very Narrow Phones** | 320, 340 | 568 | Portrait (iPhone SE 1st gen, older compacts) | Single column; zero horizontal scroll; `min(100%, 320px)` card wrap; buttons wrap gracefully. |
| **Common Phones** | 360, 375, 390, 414, 430 | 640 - 932 | Portrait & Landscape (Pixel, iPhone 12-16, Galaxy S) | Touch-ergonomic tap targets (>= 44px); header navigation stays compact; fluid readable measure. |
| **Large Phones** | 480, 540 | 800 - 960 | Portrait / Landscape (Pro Max, Ultra series) | Proportional whitespace; no text line stretching beyond `72ch`. |
| **Foldables** | 600, 673, 720, 840, 900 | 600 - 1080 | Folded cover display & unfolded inner screen | Seamless transition between single-column and multi-column grid layouts. |
| **Small Tablets** | 600, 768 | 800 - 1024 | Portrait & Landscape (iPad Mini, Nexus 7) | Two-column cards when width permits; comfortable margin spacing (`var(--space-md)`). |
| **Tablets & Compact Laptops** | 820, 960, 1024 | 1180, 768 | Portrait & Landscape (iPad Air/Pro, Surface Go) | Clean grid layout; header navigation items spaced without wrapping or truncation. |
| **Standard Laptops** | 1280, 1366, 1440 | 720 - 900 | Desktop (MacBook Air/Pro, ThinkPad, Dell XPS) | Full desktop navigation; centered reading column constrained to `var(--width-container)` / `72ch`. |
| **Large Desktops** | 1600, 1920 | 900 - 1080 | Desktop (24" - 27" monitors) | Max-width container prevents single-line text stretching; margin auto centers content. |
| **Ultrawide Displays** | 2160, 2560, 3440 | 1080 - 1440 | Ultrawide 21:9 & 32:9 monitors | Content stays anchored within readable measure; lateral gutters balance aesthetics. |
| **Smart TV / 10-Foot** | 1920, 3840 | 1080, 2160 | Landscape (1080p Full HD & 4K Ultra HD) | High contrast, large legible typography, overscan safe padding, remote D-pad focus visibility. |

---

## 2. Responsive CSS Architecture Safeguards

1. **Horizontal Overflow Containment:**
   - Root `html` and `body` enforce `overflow-x: hidden` and `max-width: 100%`.
   - All images enforce `max-width: 100%; height: auto; display: block;`.
   - Preformatted code blocks enforce `overflow-x: auto` with internal padding.
   - Data tables and card grids wrap inside containers with `overflow-x: auto` to prevent viewport blow-out.

2. **Fluid Typography & Measure:**
   - Long-form prose and article bodies enforce a maximum measure of `--width-reading: 72ch`.
   - Headings use fluid clamp formulas (e.g., `clamp(1.5rem, 4vw, 2.25rem)`) to scale smoothly between 320px and 1920px.

3. **Touch Targets:**
   - Interactive buttons, pills, theme toggles, and nav links enforce minimum touch target dimensions of `44px` height and `44px` width.

4. **Notch & Safe Area Insets:**
   - Container padding incorporates `env(safe-area-inset-top)`, `env(safe-area-inset-right)`, `env(safe-area-inset-bottom)`, and `env(safe-area-inset-left)` to avoid notch clipping on modern mobile devices.

---

## 3. Automated Verification

- Run `npm run quality:browser` to verify CSS responsive constraints across the complete viewport matrix.
- Run `npm run quality:visual` to verify landmark outlines and visual hierarchy across standard breakpoints.
