# 05. TYPOGRAPHY AND VISUAL HIERARCHY
**The Tectonic Typesetting of Architectural Objects**
*Version 1.0 — Autumn 2026*

---

## 1. TYPOGRAPHIC PHILOSOPHY

Typography at Bedroom Studios is not treated as decorative marketing text. It is treated as **architectural lettering, letterpress editorial ink, and foundry engineering stamps**.

We reject the ubiquitous, homogenized "Tech Startup Sans" aesthetic (Inter, Roboto, SF Pro used uniformly across every heading, body, and button). 

Our typographic voice is built on the deliberate tension between **Literary Editorial Warmth** and **Precision Computational Foundry Telemetry**.

---

## 2. THE THREE-TYPE ARCHITECTURE

```
TYPOGRAPHIC SYSTEM
│
├── 1. THE EDITORIAL / DISPLAY VOICE: NEWSREADER (Serif)
│   └── Optical sizing, literary authority, contemplative stillness.
│
├── 2. THE INTERFACE & BODY VOICE: DM SANS (Geometric Humanist Sans)
│   └── Clean legibility, balanced proportions, unpretentious clarity.
│
└── 3. THE FOUNDRY TELEMETRY VOICE: SPACE GROTESK / JETBRAINS MONO (Monospace)
    └── Technical specs, batch numbers, dimensions, weights, prices, radar labels.
```

---

## 3. TYPOGRAPHIC ROLE ASSIGNMENTS

| ROLE | TYPEFACE | WEIGHT | CASING | TRACKING | LINE HEIGHT | USAGE & CONTEXT |
|---|---|---|---|---|---|---|
| **Editorial Headlines** | Newsreader | Medium / Italic | Sentence case | -0.02em | 1.05 – 1.15 | Studio manifesto headlines, narrative storytelling, editorial collection intros. |
| **Product Titles** | DM Sans / Newsreader | Bold / Medium | Title case | -0.015em | 1.10 | Product name on PDP and catalog grid. |
| **Primary Navigation** | DM Sans | SemiBold | UPPERCASE | +0.20em | 1.00 | Global navbar links (`SHOP`, `BEDROOM LABS`, `OUR STORY`). |
| **Body Narrative** | DM Sans | Regular | Sentence case | 0.00 | 1.65 – 1.75 | Editorial essays, product descriptions, studio provenance notes. |
| **Tectonic Metadata** | Space Grotesk / Mono | Medium | UPPERCASE | +0.18em | 1.30 | Dimensions, weights (`1,120G`), material tags (`53-PORTLAND`), batch IDs. |
| **Pricing** | Space Grotesk | Bold | Tabular nums | +0.02em | 1.00 | Clean currency figures (`₹6,400`). Always formatted with Indian numbering. |
| **Action Buttons** | Space Grotesk / DM Sans | Bold | UPPERCASE | +0.15em | 1.00 | Buttons (`REQUEST ORDER`, `ADD TO BAG`, `INQUIRE`). |
| **Shelf Tooltip Labels** | Mono | Medium | UPPERCASE | +0.25em | 1.00 | Small hover indicators on interactive shelf objects (`LIGHTING`, `CEMENTWARE`). |

---

## 4. CASING & TRACKING DISCIPLINE

### The Law of Uppercase Tracking
Whenever a string is set in all-caps (UPPERCASE), it **must be tracked out** by at least `+0.15em` to `+0.28em`. All-caps text without tracking looks cramped, amateurish, and aggressive. Tracked-out uppercase text looks carved into stone or stamped on brass.

### The Law of Negative Display Tracking
Whenever large display type (> 36px) is set in sentence case, it **must be tightened** by `-0.015em` to `-0.03em`. This pulls the letterforms into an architecturally solid, cohesive block.

---

## 5. DENSITY, CONTRAST & READABILITY

- **Ink Contrast on Archival Paper (`#FAF9F5`)**:
  - Primary text: `rgba(28, 28, 26, 0.92)` (#1C1C1A) — never harsh digital `#000000`.
  - Secondary metadata: `rgba(28, 28, 26, 0.55)` — muted stone ink.
  - Borders & architectural guidelines: `rgba(28, 28, 26, 0.08)` to `rgba(28, 28, 26, 0.12)`.
- **Luminescence on Obsidian Room (`#07080B`)**:
  - Primary glowing text: `rgba(255, 255, 255, 0.95)`.
  - Muted secondary text: `rgba(255, 255, 255, 0.50)`.
  - Amber telemetry accent: `rgba(255, 215, 120, 0.85)` / `#D4FF00` (live radar only).
