# Interaction Design, Motion, and Theming Policy

**Document version:** 1.0.0  
**Effective date:** November 2026  
**Scope:** Animation, transitions, theme state handling, focus management, and input modalities  
**Reference standard:** Section 4.7, 5.0, & 5.1 of the Web Standards Audit Plan

---

## 1. Motion and Animation Standards

### 1.1 Non-Blocking, Purposeful Motion
- Animations are strictly decorative or informative; **no essential content or navigation action is delayed** by an animation transition.
- The site uses zero heavy JavaScript animation libraries (GSAP, Framer Motion, Three.js) and zero continuous requestAnimationFrame animation loops.
- CSS transitions are restricted exclusively to performant composited properties: `transform` and `opacity`.
- Zero animations animate layout properties (`width`, `height`, `margin`, `padding`, `top`, `left`, `right`, `bottom`), preventing expensive main-thread layout thrashing and reflows.

### 1.2 Strict Reduced-Motion Compliance
When the user's operating system or browser requests reduced motion (`@media (prefers-reduced-motion: reduce)`):
- All CSS animations and transitions are neutralized (`animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; animation-iteration-count: 1 !important;`).
- Smooth scrolling (`scroll-behavior: smooth`) is disabled; page jumps and anchor links transition instantaneously.
- Hover transforms (such as the -3px card vertical lift) are suppressed to maintain complete visual stability.

---

## 2. Input Modality Support

The interface adapts cleanly across four primary input modalities without requiring separate codebases:

### 2.1 Pointer / Mouse / Trackpad
- Hover affordances: interactive cards display subtle vertical elevation (`translateY(-3px)`) and glow border.
- Non-actionable cards remain flat with `cursor: default`.
- Links underline or illuminate cleanly on hover.

### 2.2 Touch / Mobile & Tablet
- No hover-dependent disclosures: all navigation items, descriptions, and metadata are visible in the default DOM state.
- Tap targets meet or exceed 44x44 CSS pixels.
- Stretched link pattern (`.card-stretched-link`) turns entire card surfaces into touchable targets, avoiding clumsy small-link tapping.

### 2.3 Keyboard / Assistive Hardware
- Visual focus indicator: high-contrast 2px solid focus ring (`var(--color-focus-ring)`) with 2px offset.
- Outline suppression without focus-visible replacement is strictly forbidden.
- Logical tab order matching visual document flow.

### 2.4 TV Remote / D-Pad (10-Foot Distance)
- Directional arrow navigation focuses sequential interactive controls cleanly.
- Visual focus states on TV displays are distinctly visible from 10 feet away.
- Overscan margins prevent content from being clipped by television bezels.

---

## 3. Theming & Contrast Standards

### 3.1 Dual Theme Engine
The site implements Dark Mode as default with a user-switchable Light Mode:
- **Dark Mode (Default):** High-contrast dark surfaces (`#0d1117`, `#161b22`) paired with high-contrast text (`#f0f6fc`), achieving a contrast ratio of **17.79:1**.
- **Light Mode:** Crisp off-white surfaces (`#ffffff`, `#f6f8fa`) paired with dark text (`#1f2328`), achieving a contrast ratio of **16.50:1**.
- **Instant Theme Application:** Inline theme initialization script in `<head>` reads `localStorage` and OS preference before first paint, guaranteeing zero flash of mismatched theme (FOUC).

### 3.2 High Contrast & Forced Colors
Under Windows High Contrast Mode or forced colors environments (`@media (forced-colors: active)`):
- All borders, focus outlines, button perimeters, and divider lines remain clearly drawn using semantic system colors (`ButtonText`, `Highlight`, `CanvasText`).
