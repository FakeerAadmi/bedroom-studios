# 09. NAVIGATION AND INFORMATION ARCHITECTURE
**The Dual Highway: Spatial Discovery vs. Conventional Utility**
*Version 1.0 — Autumn 2026*

---

## 1. THE DUAL HIGHWAY PHILOSOPHY

A visitor arrives at Bedroom Studios with one of two psychological mindsets:
1. **The Flâneur / Collector (Discovery Mindset)**: Wants to explore, soak in the atmosphere, pull chains, touch virtual surfaces, and discover experimental pieces.
2. **The Purposeful Buyer (Utility Mindset)**: Knows they need a desk lamp or cement incense holder, wants to check dimensions, compare prices, and purchase in under 60 seconds.

**We never sacrifice the Purposeful Buyer for the Flâneur, nor do we ruin the Flâneur's immersion with an ugly utilitarian grid.**

We achieve this through a **Dual Highway System**:

```
THE DUAL HIGHWAY
│
├── HIGHWAY 1: SPATIAL / OBJECT-BASED NAVIGATION (Atmospheric Discovery)
│   └── Interactive shelf, clicking real physical object silhouettes, illuminated hotspots.
│
└── HIGHWAY 2: CONVENTIONAL UTILITY NAVIGATION (Instant Access)
    └── Global sticky navbar, index drawer, category filters, global search, direct links.
```

---

## 2. INFORMATION ARCHITECTURE MAP

```
bedroomstudios.store
│
├── 01 / HOME (The Threshold & Illuminated Shelf Showroom)
│
├── 02 / SHOP (The Complete Permanent Archive)
│   ├── Family I: Luminaires (Desk lamps, table lamps, ambient lights)
│   ├── Family II: Desktop Instruments (Catch-all trays, pen cradles, cord anchors)
│   └── Family III: Ritual & Mineral (Incense pedestals, candle holders, vessels)
│
├── 03 / BEDROOM LABS (Speculative Experiments & Small Batches)
│   ├── Numbered artist editions (1-of-25)
│   ├── Material tests (Bio-composite polymers, experimental aggregate casts)
│   └── Open computational 3D research files
│
├── 04 / COMMISSIONS (Bespoke Architectural Installations)
│   ├── Custom luminaire briefs
│   ├── Corporate / studio workspace installations
│   └── Material sample kit requests
│
├── 05 / OUR STORY (The Foundry, Philosophy & Bangalore Workshop)
│   ├── The Design Constitution & Manifesto
│   ├── Material provenance (Portland cement, C360 brass, additive tooling)
│   └── Studio founders & team
│
├── UTILITY ROUTES:
│   ├── /cart (Slide-out drawer & standalone summary)
│   ├── /checkout (Frictionless bespoke request flow)
│   ├── /wishlist (Saved items dock)
│   └── /track (Direct live production & courier status)
```

---

## 3. WHEN CONVENTIONAL NAVIGATION APPEARS

To ensure users never feel disoriented or trapped inside an experiential room:

### The 4-Second Inactivity Safety Valve
On initial entry, if a first-time visitor does not pull the lamp chain within 4 seconds, the system automatically ignites the lamp and reveals the global navbar and catalog smoothly.

### Immediate Scroll / Pointer Bypass
The moment a user attempts to scroll or moves their pointer towards the top of the viewport, the global sticky navbar immediately fades in (`opacity-100 translate-y-0`), granting instant access to `/shop`, search, cart, and account.

### The Mobile Drawer Ergonomics
On mobile devices, navigation collapses into a dedicated full-screen drawer accessible via an animated 3-line-to-X hamburger icon:
- Numbered index links (`01 HOME`, `02 SHOP`, `03 BEDROOM LABS`, `04 COMMISSIONS`, `05 OUR STORY`).
- Direct quick-actions for `Cart (N)` and `Saved (N)`.
- Studio colophon footer: *"Bedroom Studios · Made with anxiety in India ✕"*.
