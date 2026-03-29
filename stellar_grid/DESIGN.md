# Design System Specification

## 1. Overview & Creative North Star
This design system is built upon the Creative North Star of **"The Digital Concierge."** We are moving away from the utilitarian "grid of boxes" common in marketplaces to an editorial, high-end experience that feels curated and effortless. 

The system rejects "default" web aesthetics. Instead of using borders to define space, we use **Tonal Depth** and **Asymmetric Breathing Room**. We prioritize a "Paper on Glass" philosophy—where every element feels like a physical layer of premium material floating in a clean, airy environment. This creates a sense of "Quiet Luxury" that builds immediate trust and signals a premium service tier.

---

## 2. Colors & Surface Architecture

### The Palette
We utilize a sophisticated range of Midnight Navies (`primary`), vibrant Teals (`secondary`), and a tiered grayscale system to create depth without clutter.

*   **Primary (`#000000` / `primary_container`):** Used for high-authority elements and deep-contrast backgrounds.
*   **Secondary (`#006b5f`):** Our signature action color, providing a professional "Electric Teal" energy.
*   **Tertiary (`#002109`):** Reserved for success states and specialized highlights.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section content. 100% opaque borders are forbidden. 
*   **Sectioning:** Define boundaries solely through background shifts. For example, a card using `surface_container_lowest` (#ffffff) should sit on a section using `surface_container_low` (#f2f4f6).
*   **The Glass Rule:** For floating navigation or elevated modals, use `surface_container_lowest` at 80% opacity with a `24px` backdrop blur.

### Surface Hierarchy & Nesting
Treat the interface as a physical stack. 
1.  **Base Layer:** `surface` (#f7f9fb)
2.  **Structural Sections:** `surface_container_low` (#f2f4f6)
3.  **Actionable Cards:** `surface_container_lowest` (#ffffff)
4.  **Interaction Pop-overs:** `surface_bright` (#f7f9fb) with Ambient Shadows.

---

## 3. Typography
The typographic system uses a "Scale of Authority." We pair the architectural precision of **Plus Jakarta Sans** for headers with the high-legibility of **Inter** for functional data.

*   **Display & Headlines (Plus Jakarta Sans):** These are our editorial anchors. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) to create a bold, "magazine-style" hero section.
*   **Titles & Body (Inter):** Used for clarity and trust. `title-lg` (1.375rem) provides enough weight for service names, while `body-md` (0.875rem) ensures long-form descriptions remain readable.
*   **Labels:** Always use `label-md` in uppercase with +0.05em tracking when used for category tags to distinguish them from interactive text.

---

## 4. Elevation & Depth

### The Layering Principle
We convey hierarchy through **Tonal Layering** rather than shadows whenever possible. A "nested" look is achieved by placing a lighter surface token inside a darker one.
*   *Example:* A service provider’s profile detail (`surface_container_highest`) nested within a search result card (`surface_container_low`).

### Ambient Shadows
When an element must "float" (e.g., a sticky "Book Now" bar), use an **Ambient Shadow**:
*   **Blur:** 32px to 64px.
*   **Color:** `on_surface` (#191c1e) at 4% to 6% opacity. 
*   **Offset:** Y: 8px, X: 0. 
This mimics natural light rather than a digital drop shadow.

### The "Ghost Border" Fallback
If contrast is required for accessibility (e.g., input fields), use a **Ghost Border**: `outline_variant` at 15% opacity. Never use a solid grey line.

---

## 5. Component Logic

### Buttons
*   **Primary:** Solid `primary` background. Use `xl` (1.5rem) roundedness for a friendly, modern feel.
*   **Secondary:** `secondary_container` background with `on_secondary_container` text.
*   **Signature CTA:** Apply a subtle linear gradient from `primary` to `primary_container` (155° angle) to give the button a "jeweled" depth.

### Cards & Lists
*   **Prohibition:** No divider lines. Use `spacing.6` (2rem) of white space to separate list items.
*   **Layout:** Cards should use `md` (0.75rem) or `lg` (1rem) corner radius. Use `surface_container_low` for the card body and `surface_container_lowest` for internal elements like "Review Tags."

### Input Fields
*   **Visual Style:** Soft-filled backgrounds using `surface_container_high`. Upon focus, transition the background to `surface_container_lowest` and apply a 1pt "Ghost Border" using the `secondary` color at 30% opacity.

### Featured Service "Hero" Chips
*   **Unique Component:** Use Glassmorphism (Backdrop blur 12px, 40% `surface_variant`) for category filters that scroll over high-quality photography.

---

## 6. Do's and Don'ts

### Do
*   **DO** use intentional asymmetry. Align a headline to the left but offset the supporting body text to the right to create a "custom-build" editorial feel.
*   **DO** use high-quality, professional photography of real people. Avoid "clip-art" style icons; use thin-stroke, custom line icons.
*   **DO** utilize the `20` (7rem) spacing token for large section breaks to emphasize premium "breathing room."

### Don't
*   **DON'T** use 100% black text. Always use `on_surface` or `on_surface_variant` for a softer, more premium look.
*   **DON'T** use standard 4px "default" border radii. Everything in this system is at least `0.5rem` (DEFAULT) to ensure a friendly, modern touch.
*   **DON'T** use dividers. If you feel you need a line, you actually need more white space.