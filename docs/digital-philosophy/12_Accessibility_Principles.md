# 12. ACCESSIBILITY PRINCIPLES
**The Universal Gateway: Dignity, Inclusion, and Sensory Choice**
*Version 1.0 — Autumn 2026*

---

## 1. THE INCLUSION MANDATE

At Bedroom Studios, **accessibility is not a compliance checklist; it is an architectural obligation**.

Just as a physical studio building must provide ramps, wide doorways, and tactile wayfinding, our digital sanctuary must be fully navigable by screen readers, keyboard-only users, people with motor disabilities, and users sensitive to vestibular motion.

**The experiential brand layer must NEVER create a barrier to access.**

---

## 2. THE FIVE ACCESSIBILITY PILLARS

```
THE ACCESSIBILITY PILLARS
│
├── 1. THE EXPERIENTIAL BYPASS (Skip directly to content & catalog)
├── 2. FULL KEYBOARD AUTONOMY (Every control focusable & operable via Tab / Enter / Space)
├── 3. ARCHITECTURAL CONTRAST (WCAG 2.1 AA / AAA standards across all light levels)
├── 4. VESTIBULAR SAFETY (Respect for prefers-reduced-motion)
└── 5. SEMANTIC SCREEN READER TREE (Meaningful ARIA landmarks & live telemetry)
```

---

## 3. SPECIFIC ACCESSIBILITY IMPLEMENTATIONS

### 1. The Experiential Bypass (The "Skip to Content" Link)
- On the homepage where the lamp starts turned OFF:
  - Tabbing once immediately surfaces an accessible, high-contrast **"Skip to Catalog & Content"** button in the top-left corner (`bg-[#D4FF00] text-ink font-mono font-bold px-4 py-2 rounded-full`).
  - Pressing `Enter` immediately turns on the lamp, unlocks scroll, and moves focus to the `#illuminated-content` catalog landmark, bypassing the pull-chain interaction entirely.
- The pull chain itself is fully keyboard accessible: focusing on it and pressing `Enter` or `Space` triggers the illumination sequence.

### 2. Focus Indicators (The Architectural Focus Ring)
- We never set `outline: none` without providing an immediate custom focus indicator.
- When any element receives keyboard focus:
  - It displays a high-visibility, 2px amber/gold focus ring with a 2px offset: `ring-2 ring-amber-400/80 ring-offset-2 ring-offset-[#07080B]`.
  - The focus ring is styled with the same crisp precision as an architectural dimension callout.

### 3. Contrast Ratios
- **Daylight Mode (`#FAF9F5` background)**:
  - Primary text (`#1C1C1A`): Contrast ratio of **13.8:1** (exceeds WCAG AAA standard of 7.0:1).
  - Secondary metadata (`rgba(28,28,26,0.65)`): Contrast ratio of **5.2:1** (exceeds WCAG AA standard of 4.5:1).
- **Obsidian Room (`#07080B` background)**:
  - Active text (`rgba(255,255,255,0.95)`): Contrast ratio of **18.2:1** (WCAG AAA).
  - Telemetry buttons (`#D4FF00` on dark): Contrast ratio of **14.5:1** (WCAG AAA).

### 4. Motor and Motion Safety (`prefers-reduced-motion`)
- When a user has enabled reduced motion in their operating system:
  - All spring physics, pendulum chains, lamp tilts, and multi-second scroll animations are disabled.
  - State changes happen via instantaneous 50ms opacity fades.
  - Page transitions become instant, preventing vestibular nausea.

### 5. Semantic HTML & Screen Reader Structure
- We use pure semantic HTML5 elements: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`.
- Every image has rich, descriptive alt text explaining its physical materiality (e.g. `alt="Handcrafted Tiffany stained glass lamp with unlacquered brass fluted base and pull chain"`).
- Dynamic states (cart item additions, order submissions) utilize `aria-live="polite"` regions so assistive technology users receive confirmation without layout disruption.
