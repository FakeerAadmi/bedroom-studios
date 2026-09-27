# 04. INTERACTION AND MOTION LANGUAGE
**The Kinetic Physics, Interaction Hierarchy, and Damping Laws**
*Version 1.0 — Autumn 2026*

---

## 1. THE THREE-TIER INTERACTION HIERARCHY

We govern all interactive behaviour through three explicit tiers. Every interaction on the website must belong to one of these tiers:

```
THE INTERACTION PYRAMID
│
├── LEVEL 3: EXPERIENTIAL (Rare Brand Transformations — Frequency: 1% of time)
│   └── Lighting the room via pull-chain; entering the dark showroom; full-viewport reveals.
│
├── LEVEL 2: PHYSICAL (Tactile Object Interactions — Frequency: 15% of time)
│   └── Pulling a mechanical switch; dragging a 360-degree object turntable; opening technical drawers.
│
└── LEVEL 1: QUIET (Silent Interface Ergonomics — Frequency: 84% of time)
    └── Hovering, clicking links, scrolling catalog, expanding accordions, checking out.
```

### Level 1: Quiet Interactions (Silent Interface)
- **Role**: Fluid, invisible, lightning-fast utility.
- **Rules**: Transition duration is strictly **150ms to 250ms**. Easing is clean ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Feedback**: Subtle opacity shifts (from 60% to 100% ink), micro-scale shifts (1.02x maximum), or 1px underline reveals. Zero sound effects, zero shaking, zero bouncing.

### Level 2: Physical Interactions (Object Feedback)
- **Role**: Translates physical object behavior into digital ergonomics.
- **Rules**: Governed by real physical mechanics:
  - Dragging requires tactile resistance (drag elasticity: `0.2`).
  - Releases trigger spring oscillations with physical mass damping (`stiffness: 180, damping: 22`).
  - Accompanied by authentic, subtle Web Audio synthesizers (e.g. 1250Hz switch click).
- **Context**: Used strictly on product detail pages and interactive display fixtures.

### Level 3: Experiential Interactions (Atmospheric Transformations)
- **Role**: Profound, memorable moments of brand initiation.
- **Rules**: Duration can extend up to **800ms to 1200ms**. Multi-layered: sound, light, shadow, and interface orchestration occur in sequence.
- **Context**: Strictly reserved for the initial homepage entry threshold or interactive Bedroom Labs conceptual releases. Never repeated on internal pages; never blocking repeat shoppers.

---

## 2. MOTION PHYSICS MATRIX

Motion at Bedroom Studios is not designed in linear CSS milliseconds. It is modeled on **Newtonian mass, inertia, and damping**:

| ELEMENT CLASS | MASS EQUIVALENT | SPRING STIFFNESS | DAMPING RATIO | TIMING / DURATION | VISUAL BEHAVIOR |
|---|---|---|---|---|---|
| **Heavy Objects** (Lamps, Concrete Plinths) | 1,200g | 120 | 28 | 650ms – 850ms | Slow to start, stately momentum, zero bouncy overshoot. Settles with deliberate weight. |
| **Medium Instruments** (Trays, Framed Art) | 450g | 160 | 24 | 400ms – 550ms | Controlled glide, gentle deceleration, subtle landing settle. |
| **Light Kinetic Parts** (Pull-Chain, Fob) | 40g | 220 | 14 | 850ms (decaying) | Crisp initial displacement, 3-cycle natural pendulum decay, rotational lag. |
| **Interface Panels** (Cart Drawer, Mobile Menu) | Rigid Panel | 300 | 32 | 260ms – 320ms | Smooth architectural slide (`cubic-bezier(0.22, 1, 0.36, 1)`). Solid, no flex. |
| **Typographic & Tonal States** | Massless | N/A | N/A | 150ms – 200ms | Linear or cubic ease-out color/opacity fade. |

---

## 3. THE GOLDEN RULE: INTERACTION MUST HAVE A REASON

We reject animation for animation's sake. Every animation on `bedroomstudios.store` must satisfy one of three functional criteria:
1. **Spatial Orientation**: It explains where an element came from or where it is going (e.g. the cart drawer sliding in from the right edge confirms it lives off-screen).
2. **Physical Cause and Effect**: It reflects a real kinetic action (e.g. dragging the chain pulls the switch contacts together).
3. **Cognitive Relief**: It smooths visual transitions to prevent jarring eye strain when shifting between dark and light scenes.

---

## 4. WHEN NOT TO ANIMATE (THE PROHIBITIONS)

- **NEVER Animate Text While Reading**: No typewriter effects, no letter-by-letter staggered tumbling on body copy, no wave animations on headlines. Text must be instantly readable.
- **NEVER Animate During High-Intent Checkout**: The cart drawer, checkout inputs, payment buttons, and error messages must appear with zero delay (< 100ms).
- **NEVER Loop Ambient Animations**: No pulsating "Buy Now" buttons, no floating bouncing arrows saying "Scroll Down," no infinite wobbling icons. An object moves when interacted with, then returns to quiet stillness.
- **RESPECT `prefers-reduced-motion`**: When a user's operating system requests reduced motion, all Level 2 and Level 3 motion must instantly collapse to instantaneous opacity crossfades (duration: 0.05s).
