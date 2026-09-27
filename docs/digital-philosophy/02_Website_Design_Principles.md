# 02. WEBSITE DESIGN PRINCIPLES
**The Ten Operational Laws of the Digital Experience**
*Version 1.0 — Autumn 2026*

---

## PRINCIPLE 1: DIGITAL OBJECTS OVER FLAT CARDS
### 1. Meaning
Products are physical artifacts resting in an architectural space, not rectangular web-card containers with CSS drop shadows.
### 2. Practical Implication
Objects are photographed on isolated, transparent, or tonal backgrounds. They sit flush upon horizon lines and surfaces. Their silhouettes interact directly with the environment.
### 3. Examples
The hero shelf where the lamp and 5 objects sit directly on a walnut surface with contact shadows.
### 4. Anti-Examples
A 3-column e-commerce grid where every item is trapped inside a white rounded-corner card with a grey 1px border and a grey background thumbnail.
### 5. Implications
- **Homepage**: Objects are displayed along continuous horizontal architectural planes (shelves, workbenches).
- **Product Page**: The hero image is full-bleed or uncontained, allowing the object's silhouette to command the layout.
- **Navigation**: Visual navigation allows users to click on recognizable physical object silhouettes rather than abstract link pills.

---

## PRINCIPLE 2: SPACE BEFORE INTERFACE
### 1. Meaning
Atmosphere and spatial presence precede UI clutter. When a user enters the space, they should experience the room before being assaulted by navigation menus, banners, and filters.
### 2. Practical Implication
Header navigation, promotion bars, and sidebars remain invisible or discreetly recessed until the user initiates interaction or until an atmospheric reveal occurs.
### 3. Examples
On initial entry, the header is tucked away off-canvas; the dark room and unlit lamp exist alone. Lighting the lamp gently fades the header into place.
### 4. Anti-Examples
Websites that greet the user with a cookie modal, an email newsletter popup, a floating chat widget, an announcement bar, and a sticky navigation header within 0.5 seconds of load.
### 5. Implications
- **Homepage**: The hero experience is uncluttered by conventional header elements until illuminated.
- **Product Page**: Clean white space surrounds the primary object before technical specs appear.
- **Navigation**: Appears cleanly on scroll or upon explicit activation.

---

## PRINCIPLE 3: REVEAL RATHER THAN DUMP
### 1. Meaning
Information is disclosed progressively as the user demonstrates interest, mirroring the way an architect or curator guides a guest through an exhibition.
### 2. Practical Implication
High-level emotional resonance and silhouette first; material details and specs upon interaction; full technical documentation and checkout details when ready to buy.
### 3. Examples
Hovering over a shelf object reveals an understated monospaced label tooltip; clicking a product opens a full tectonic breakdown (material, weight, dimensions, light engine).
### 4. Anti-Examples
Dumping 40 bullet points, dimensions, star ratings, stock counters, countdown timers, and discount badges in one dense wall of text.
### 5. Implications
- **Homepage**: Progressive scroll reveals: Atmospheric Lamp Shelf → Studio Philosophy Ticker → Product Catalog → Workbench Details → Order CTA.
- **Product Page**: Clean hero photograph → Narrative description → Expandable Tectonic Specs accordion → Cart action.
- **Navigation**: Clean 5-link primary bar; sub-filters expand cleanly without shifting page layout.

---

## PRINCIPLE 4: MOTION GOVERNED BY MASS AND INERTIA
### 1. Meaning
Elements on screen move with the physical laws of mass, spring tension, and air damping—never linear, robotic, or hyper-bouncy "gamey" tweening.
### 2. Practical Implication
Animations use spring physics with high damping coefficients (e.g. `damping: 24, stiffness: 180`). Heavier objects move with slower acceleration and gradual deceleration; lighter elements respond crisply.
### 3. Examples
The beaded pull-chain swinging with natural pendulum decay; the drawer opening with fluid hydraulic resistance.
### 4. Anti-Examples
Bouncy, cartoonish elastic springs where elements overshoot three times and vibrate like jelly.
### 5. Implications
- **Homepage**: Lamp pull has physical recoil (lamp body shifts 2px and returns over 650ms).
- **Product Page**: Image carousel transitions with weighted momentum.
- **Navigation**: Mobile menu slides in with smooth easing (`cubic-bezier(0.22, 1, 0.36, 1)`), feeling like a solid sliding panel.

---

## PRINCIPLE 5: HONEST MATERIAL TELEMETRY
### 1. Meaning
Digital descriptions must provide precise, verifiable physical data rather than marketing puffery.
### 2. Practical Implication
State exact weights in grams, exact dimensions in millimeters, exact CCT kelvin ratings, exact concrete cure times, and exact polymer layer heights.
### 3. Examples
"Mass: 1,120g • Base: 53-Grade Portland Concrete • Light: 2400K High-CRI LED • Layer Height: 0.16mm."
### 4. Anti-Examples
"Crafted to perfection with premium eco-friendly materials for a luxurious modern lifestyle experience."
### 5. Implications
- **Homepage**: Studio workbench section breaks down real production metrics.
- **Product Page**: A dedicated "Tectonic Specifications" data block presented in clean monospace formatting.
- **Navigation**: Category headers cite physical families (e.g. *Luminaires*, *Cementware*, *Instruments*).

---

## PRINCIPLE 6: PURPOSEFUL FRICTION
### 1. Meaning
Not every interaction should be instantaneous and frictionless. Deliberate micro-friction creates anticipation, appreciation, and tactile memory.
### 2. Practical Implication
The user must intentionally pull the lamp chain to turn on the room; the inactivity timer is 4 seconds, allowing them to sit in the quiet darkness first.
### 3. Examples
Dragging the chain downwards to ignite the lamp; clicking an expandable drawer to read the foundry notes.
### 4. Anti-Examples
Auto-playing video carousels, auto-scrolling banners, and popups that trigger instantly before the user can orient themselves.
### 5. Implications
- **Homepage**: The initial darkness creates a moment of pause and contemplation.
- **Product Page**: Custom order inquiry flow asks thoughtful questions about the user's workspace setup.
- **Navigation**: Submenus open cleanly on deliberate click/hover, not erratic accidental mouse passes.

---

## PRINCIPLE 7: SILENT UTILITY IN COMMERCE
### 1. Meaning
When the user decides to purchase or inspect details, the poetry steps aside and pure, unhindered utility takes over.
### 2. Practical Implication
Price is immediately visible, checkout is frictionless, stock status is explicit, and payment flows are rock solid.
### 3. Examples
Clear ₹ price tags, transparent lead times ("Ships in 3–5 working days"), simple "Request Order" flow linked directly to human studio coordination.
### 4. Anti-Examples
Hiding prices behind "Inquire for Price" buttons on standard catalog items; burying shipping costs until the final checkout step; fake countdown timers.
### 5. Implications
- **Homepage**: Clean product grid with clear prices and immediate cart buttons.
- **Product Page**: Prominent price, transparent dispatch times, and direct checkout button.
- **Navigation**: Cart icon displays live badge count and opens a high-efficiency slide-out summary.

---

## PRINCIPLE 8: TACTILITY WITHOUT SKEUOMORPHISM
### 1. Meaning
We communicate tactile reality through lighting, macro-texture, and acoustics—never through 2005-era fake drop shadows, leather stitching, or embossed glossy bevels.
### 2. Practical Implication
Use high-resolution 1:1 macro photography of real materials, natural light direction, and authentic Web Audio mechanical sound synthesis.
### 3. Examples
Hearing the mechanical 1250Hz switch snap when pulling the chain; seeing the raking light reveal the rough texture of Portland cement.
### 4. Anti-Examples
CSS bevel effects, faux-leather digital textures, or simulated wood grains drawn in SVG.
### 5. Implications
- **Homepage**: Real photography of physical objects seated on the shelf.
- **Product Page**: Macro zoom photography showing the 0.16mm layer ridges.
- **Navigation**: Subtle border outlines (1px `rgba(28,28,26,0.1)`) that feel like fine architectural pencil lines.

---

## PRINCIPLE 9: DEPTH THROUGH LIGHT AND SHADOW
### 1. Meaning
Spatial depth is created through the physics of illumination, not arbitrary drop-shadow filters.
### 2. Practical Implication
Light emanates from physical light sources (such as the lamp) and falls off radially with distance. Objects closer to the light source receive higher specular highlights and cast stronger contact shadows.
### 3. Examples
The conical warm light pool spreading across the walnut shelf, illuminating nearby cement objects while outer frames remain moodier.
### 4. Anti-Examples
Generic `box-shadow: 0 10px 30px rgba(0,0,0,0.5)` slapped onto every card uniformly regardless of light direction.
### 5. Implications
- **Homepage**: The downward cone of light defines the visual stage.
- **Product Page**: Lighting in product photos is consistent: single warm key light from upper left (45°), soft ambient fill.
- **Navigation**: Sticky navbar utilizes a subtle frosted backdrop blur (`backdrop-blur-xl bg-paper/90`) that reveals underlying content passing beneath.

---

## PRINCIPLE 10: ARCHITECTURAL CONTINUITY
### 1. Meaning
Every page, modal, email, and social asset must feel like a different room inside the same physical building.
### 2. Practical Implication
Consistent 12-column grid, strict typographic hierarchy, identical color tokens, identical border radii (1.5mm–3mm chamfered feel), and identical tonal voice.
### 3. Examples
Transitioning from `/shop` to `/about` or `/commissions` feels like moving from the showroom to the reading library and then to the active workshop.
### 4. Anti-Examples
A dark, moody homepage that suddenly links to an all-white, generic Shopify template with generic blue buttons and Inter font.
### 5. Implications
- **Homepage**: The gateway showroom.
- **Product Page**: The design archive and technical workshop.
- **Navigation**: Persistent spatial thread connecting all pages seamlessly.
