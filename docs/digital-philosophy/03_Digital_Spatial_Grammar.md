# 03. DIGITAL SPATIAL GRAMMAR
**The Spatial Taxonomy of Bedroom Studios Web Architecture**
*Version 1.0 — Autumn 2026*

---

## 1. THE TAXONOMY

Instead of thinking in abstract web-development abstractions (`hero`, `card`, `banner`, `section`, `modal`, `footer`), Bedroom Studios conceives of its digital experience as a **curated architectural sanctum**:

```
SPATIAL TAXONOMY
│
├── THE ROOM (The Viewport / Global Atmosphere)
├── THE WALL (The Architectural Backdrop)
├── THE SHELF (The Primary Presentation Surface)
├── THE OBJECT (The Tactile Focus)
├── THE LIGHT (The Illuminating Force & State Machine)
├── THE SHADOW (Depth, Gravity & Grounding)
├── THE THRESHOLD (The Entrance & Initial Decision)
├── THE PASSAGE (Transitions & Page Navigation)
├── THE REVEAL (Progressive Disclosure)
├── THE ARCHIVE (The Catalog & Technical Library)
└── THE WORKSHOP (The Process & Material Reality)
```

---

## 2. DETAILED SPATIAL CONSTRUCTS

### 1. The Threshold (The Entryway)
- **Concept**: Stepping off the chaotic, noisy street of the open internet into a quiet, secluded studio sanctuary.
- **Digital Manifestation**: The initial dark-room viewport (`bg-[#07080B]`) where the website is initially silent, the lamp is turned OFF, and conventional UI noise (banners, cookies, popups) is banished. The user stands on the threshold.

### 2. The Light (The Revealing Catalyst)
- **Concept**: In architecture, light creates space. Without light, space does not exist.
- **Digital Manifestation**: Pulling the chain or activating the switch releases a warm (2400K) pool of light. This illumination is not decorative—it is the physical catalyst that wakes up the page, reveals the shelf objects, illuminates the surface, and reveals the navigation.

### 3. The Shelf (The Horizontal Plane)
- **Concept**: A craftsman’s curated wooden display shelf where prized objects are arranged with space to breathe.
- **Digital Manifestation**: A tactile walnut plane with depth, beveled front lip, and wall drop-shadow. Objects sit directly on its surface. It serves as an intuitive physical menu: clicking the lamp opens Lighting; clicking the cement pedestal opens Cementware; clicking the architectural sculpture opens Bedroom Labs.

### 4. The Object (The Undivided Focus)
- **Concept**: The hero of the studio. An artifact of weight, precision, and hand-finishing.
- **Digital Manifestation**: Transparent, photographic cutouts with zero card borders. Uncontained silhouettes that interact with light and shadow.

### 5. The Wall (The Texture of Space)
- **Concept**: The plaster, exposed brick, or limewash wall that bounds the room.
- **Digital Manifestation**: Subtle, low-opacity (3%) fractal plaster noise that prevents the background from feeling like a sterile, flat digital hex code (`#000000`).

### 6. The Passage (The Seamless Transition)
- **Concept**: Walking from the showroom into the reading library or workshop.
- **Digital Manifestation**: Page transitions that slide or fade with architectural gravity. The scroll down from the hero shelf into the product catalog feels like moving down the gallery wall into the display tables.

### 7. The Archive (The Permanent Catalog)
- **Concept**: A curator’s technical archive where every specimen is cataloged with exact provenance, material batch numbers, and dimensional specs.
- **Digital Manifestation**: The product listing and detail pages (`/shop`, `/product/[slug]`). Clean typography, monospace metadata, high-resolution orthographic views.

### 8. The Workshop (Bedroom Labs & Commissions)
- **Concept**: The messy, sawdust-and-resin backroom where experiments, 3D printing toolpaths, failed castings, and bespoke commissions are born.
- **Digital Manifestation**: The `/fandoms` (Bedroom Labs) and `/commissions` pages. Photography features raw workbenches, curing tanks, CAD wireframes, and process video clips.

---

## 3. WHERE SPATIAL METAPHORS WORK VS. WHERE THEY BECOME GIMMICKS

The boundary between architectural elegance and embarrassing gimmickry is strictly enforced:

```
┌──────────────────────────────────────────┬──────────────────────────────────────────┐
│ ARCHITECTURAL ELEGANCE (DO THIS)         │ GIMMICKY EXCESS (STRICTLY FORBIDDEN)     │
├──────────────────────────────────────────┼──────────────────────────────────────────┤
│ The homepage hero as an illuminated room │ Forcing the user to navigate a 3D gaming │
│ with a physical pull-chain switch.       │ room with WASD keys or virtual joysticks.│
├──────────────────────────────────────────┼──────────────────────────────────────────┤
│ Objects sitting flush on a walnut shelf  │ Skeuomorphic wooden texture backgrounds  │
│ with believable contact shadows.         │ with fake wood knots across checkout.    │
├──────────────────────────────────────────┼──────────────────────────────────────────┤
│ Progressive disclosure: light spreads to │ Making the user click 4 different doors  │
│ reveal the catalog below.                │ or keys to access the /shop catalog.     │
├──────────────────────────────────────────┼──────────────────────────────────────────┤
│ Conventional, lightning-fast slide-out   │ Animating a physical wooden cash-drawer  │
│ cart drawer with transparent ₹ pricing.  │ opening with sound effects for checkout. │
└──────────────────────────────────────────┴──────────────────────────────────────────┘
```

### The Infallible Rule of Transition:
- **Brand Discovery & Introduction**: Spatial, atmospheric, sensory, and deliberate.
- **Catalog Browsing, Product Selection & Checkout**: Clean, fast, unencumbered architectural modernism.
