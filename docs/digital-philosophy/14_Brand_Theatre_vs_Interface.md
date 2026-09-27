# 14. BRAND THEATRE VS. NORMAL INTERFACE
**The Boundary Between Architectural Atmosphere and Commercial Utility**
*Version 1.0 — Autumn 2026*

---

## 1. THE DILEMMA OF "BRAND THEATRE"

Many experimental design websites fail because they mistake **friction for depth**. They force the user to watch a 5-second unskippable WebGL logo animation, click through a maze of doors, or solve a puzzle just to see a product catalogue.

At Bedroom Studios, we celebrate **Brand Theatre**, but we subject it to strict operational boundaries:

> **Brand Theatre creates memory, reverence, and emotional context. Normal Interface delivers clarity, autonomy, and speed. They must never collide or obstruct one another.**

---

## 2. THE DUAL-STATE CLASSIFICATION

```
┌──────────────────────────────────────────┬──────────────────────────────────────────┐
│ BRAND THEATRE (ATMOSPHERIC EXPERIENTIAL) │ NORMAL INTERFACE (HIGH-EFFICIENCY UTILITY)│
├──────────────────────────────────────────┼──────────────────────────────────────────┤
│ • Initial Homepage entry (Dark room/lamp)│ • Product detail pages & specification   │
│ • Pull-chain switch ignition sequence    │ • The entire /shop catalog and filtering │
│ • Bedroom Labs experimental releases     │ • Shopping cart drawer and checkout flow │
│ • Studio manifesto & philosophy essays  │ • Customer account, wishlist & tracking  │
│ • Custom commission bespoke inquiry form │ • Customer support & studio dispatch     │
└──────────────────────────────────────────┴──────────────────────────────────────────┘
```

---

## 3. THE FOUR GOVERNING RULES OF DIGITAL THEATRE

### Rule 1: Theatre Only on the Threshold
Experiential theatrical moments are strictly permitted on the **Homepage Entry Threshold** and dedicated **Bedroom Labs** experimental showcase pages. They are **STRICTLY PROHIBITED** on:
- Product Detail Pages (PDP).
- The Category / Collection Archive (`/shop`).
- The Cart Drawer and Checkout funnel.
When a user clicks `/shop` or enters via a direct Google search or social link, they are taken directly to the illuminated, high-utility catalog with zero introductory theatrics.

### Rule 2: The Multi-Pathway Bypass
Every theatrical moment must feature at least three independent bypass mechanisms:
1. **The 4-Second Inactivity Safety Valve**: If the user does not interact, the theatre completes automatically after 4 seconds without trapping the user.
2. **The Immediate Pointer / Scroll Bypass**: Moving the mouse to the header or flicking the scroll wheel immediately triggers completion and reveals standard navigation.
3. **The Accessible Keyboard Escape**: Tabbing immediately presents an accessible "Skip to Catalog" focus button.

### Rule 3: Session Intelligence (Frequency Capping)
Once a user has experienced the pull-chain lamp ignition on the homepage:
- Their browser records the activation in `sessionStorage` (`hasSeenLampIntro = true`).
- If they navigate to `/shop` and subsequently return to `/`, the lamp remains **illuminated, the header remains visible, and the scroll is unlocked**. They are not forced to re-pull the chain on every page visit during a single shopping session.

### Rule 4: Zero Theatre During Transaction
When a user clicks `ADD TO BAG`, `REQUEST ORDER`, or opens the Cart:
- The UI moves at **hardware speed (< 100ms)**.
- No animated cash-registers, no faux-paper receipts folding, no celebratory confetti.
- The interface behaves with the silent, sober efficiency of a Swiss banking terminal.
