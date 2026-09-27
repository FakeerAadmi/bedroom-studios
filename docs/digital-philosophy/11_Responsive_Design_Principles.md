# 11. RESPONSIVE DESIGN PRINCIPLES
**The Multi-Viewport Translation of Spatial Architecture**
*Version 1.0 — Autumn 2026*

---

## 1. THE CORE PHILOSOPHY

Mobile is not a "cramped, scaled-down desktop." Mobile is an **intimate handheld instrument**.

When transitioning between viewports:
- **We preserve**: Atmospheric stillness, material honesty, typographic authority, and frictionless checkout.
- **We simplify**: Complex multi-object horizontal spatial arrangements that would crowd a portrait screen.
- **We eliminate**: Awkward, high-precision desktop cursor hovers and multi-touch dragging physics that cause gesture conflict with native mobile scrolling.

---

## 2. THE THREE-TIER VIEWPORT MATRIX

```
VIEWPORT SPECIFICATIONS
├── DESKTOP (≥ 1024px)  ── The Expansive Architectural Showroom
├── TABLET (768px–1023px) ── The Curated Gallery Reading Desk
└── MOBILE (≤ 767px)    ── The Handheld Monograph & Direct Dispatch
```

---

## 3. HOW SPATIAL ELEMENTS TRANSLATE ACROSS BREAKPOINTS

### 1. The Hero Shelf (Homepage)
- **Desktop (1024px+)**:
  - Full-width wide walnut display shelf.
  - Dominant center Tiffany lamp flanked by 4–5 curated objects (books, tray, frame, incense pedestal, geometric model).
  - Hovering reveals monospaced tooltip labels; pulling the chain exerts multi-axis spring recoil.
- **Tablet (768px – 1023px)**:
  - Compressed shelf: 2–3 key objects flanking the lamp.
  - Generous negative space preserved on perimeter edges.
- **Mobile (≤ 767px)**:
  - The lamp commands the primary vertical focus (occupying 40vh).
  - The shelf objects do not crowd the lamp horizontally; instead, 2 essential objects (Architectural Sculpture and Incense Pedestal) sit in an elegant secondary horizontal strip beneath or immediately adjacent to the lamp base.
  - Pull-chain features an enlarged touch target (`min-w-[48px] min-h-[48px]`) with vertical drag or single-tap activation.

### 2. Product Detail Page (PDP) Layout
- **Desktop**:
  - Asymmetric 2-column layout: Left 7-column sticky photography scroll, Right 5-column sticky purchase and specification column.
- **Tablet**:
  - Stacked hero: Full-width photographic carousel followed by a balanced 2-column specification block.
- **Mobile**:
  - 1-column linear stack: Full-bleed edge-to-edge swipeable image gallery with subtle pagination dots.
  - Sticky bottom thumb dock (`ADD TO BAG — ₹6,400`) fixed above the system home bar.

### 3. Navigation Bar
- **Desktop**:
  - Persistent horizontal text links with uppercase tracked typography (`01 HOME`, `02 SHOP`, `03 LABS`, `04 COMMISSIONS`, `05 STORY`).
- **Mobile**:
  - Minimalist header: Wordmark on left, Cart & Saved icons on right, animated SVG 3-bar hamburger button.
  - Clicking hamburger opens a full-screen drawer with large-type index links and quick-action buttons.

---

## 4. TOUCH ERGONOMICS & THUMB ZONE DISCIPLINE

- **Minimum Tap Target**: Every interactive element on mobile (buttons, links, swatches, pull-tabs) must be at least **44px × 44px** (target standard: 48px).
- **The Natural Thumb Arc**: Critical conversion actions (`ADD TO BAG`, `REQUEST ORDER`, `VIEW CART`) are permanently anchored in the lower 35% of the mobile viewport, directly accessible by the user's thumb without stretching.
- **No Hover Dependencies**: Any information revealed by hover on desktop (e.g. object labels, secondary photos) must be permanently visible or revealed by tap on mobile.
