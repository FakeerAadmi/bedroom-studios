# 13. DIGITAL DESIGN SYSTEM
**Tokens, Components, and the Operational UI Library**
*Version 1.0 — Autumn 2026*

---

## 1. DESIGN TOKENS

### Spacing System (4px Base Grid)
```
--space-1:   4px    (Micro-offsets, tag padding)
--space-2:   8px    (Inline elements, icon gaps)
--space-3:  12px    (Button padding, input padding)
--space-4:  16px    (Card gutters, mobile margins)
--space-6:  24px    (Desktop gutters, panel padding)
--space-8:  32px    (Standard section breathing room)
--space-12: 48px    (Intermediate section transitions)
--space-16: 64px    (Mobile section margins)
--space-24: 96px    (Desktop section transitions)
--space-32: 128px   (Major architectural chapter breaks)
```

### Color Tokens
```
/* Room Atmospheres */
--bg-room:         #07080B  (Obsidian dark room canvas)
--bg-room-tint:    #100E0D  (Warm dusk room ambient)
--bg-paper:        #FAF9F5  (High-density unbleached cotton archival sheet)
--bg-surface-dark: #12100E  (Receding shelf walnut surface)

/* Inks & Type */
--ink-primary:     #1C1C1A  (92% black mineral ink on paper)
--ink-muted:       rgba(28, 28, 26, 0.55)
--ink-ghost:       rgba(28, 28, 26, 0.12)
--ink-inverse:     #FFFFFF  (100% white on dark room)
--ink-inverse-mut: rgba(255, 255, 255, 0.50)

/* Metallic & Mineral Accents */
--accent-brass:    #D4AF37  (C360 brushed brass reflection)
--accent-amber:    #FFB84D  (2400K lamp light pool core)
--accent-terracotta:#9C4221 (Mineral burnt clay)
--accent-radar:    #D4FF00  (Phosphor chartreuse live telemetry pulse)
```

### Radii & Chamfers
```
--radius-none:  0px     (Architectural planes, full-bleed images)
--radius-subtle:2px     (Small tags, micro-chamfer buttons)
--radius-sm:    4px     (Inputs, form fields, thumbnails)
--radius-md:    8px     (Panels, dropdown menus, drawers)
--radius-lg:    16px    (Floating dialogs, modal cards)
--radius-full:  9999px  (Pill tags, circular action buttons, badges)
```

---

## 2. CORE COMPONENT ARCHITECTURE

### 1. Action Buttons
- **Primary Pill (Bespoke Request CTA)**:
  `bg-[#D4FF00] text-ink font-mono text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full border border-ink hover:bg-ink hover:text-[#D4FF00] transition-colors`
- **Architectural Secondary (Ghost Button)**:
  `bg-transparent text-ink border border-ink/30 font-mono text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-full hover:border-ink hover:bg-ink/5 transition-colors`
- **Icon Action (Cart / Wishlist)**:
  `w-10 h-10 rounded-full border border-ink/20 flex items-center justify-center hover:border-ink hover:text-accent transition-colors`

### 2. Product Presentation Cards
- **Architecture**:
  - Image container with aspect ratio `4:5`.
  - Object isolated or photographed on warm neutral tone.
  - Title set in Newsreader/DM Sans.
  - Price set in Space Grotesk Bold (`₹6,400`).
  - Subtle hover lift (`-translate-y-1.5`) with high-damping spring (`transition-all duration-500 ease-out`).

### 3. Slide-Out Panels (Cart & Mobile Drawer)
- **Positioning**: Fixed right edge (`inset-y-0 right-0 max-w-md w-full z-50`).
- **Backdrop**: Layered blur overlay (`bg-ink/25 backdrop-blur-md`).
- **Panel Surface**: Solid cotton paper (`bg-[#FAF9F5] border-l border-ink/10 shadow-2xl`).

### 4. Input Fields & Form Controls
- **Architecture**:
  - Bottom-line or boxed minimalist field: `bg-ink/4 border border-ink/15 rounded-lg px-4 py-3 text-sm font-sans focus:border-ink focus:bg-paper focus:ring-1 focus:ring-ink outline-none transition-all`.
  - Labels set in uppercase monospace above input (`text-[10px] tracking-widest text-ink/60`).

### 5. Notification Toasts & Status Badges
- **Architecture**:
  - Discreet bottom-right or top-center capsule: `bg-[#1C1C1A] text-paper text-xs font-mono px-4 py-2.5 rounded-full shadow-lg border border-white/10 flex items-center gap-2`.
  - Accompanied by a pulsing `#D4FF00` live telemetry dot.
