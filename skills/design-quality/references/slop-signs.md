# Slop Signs Catalog

A comprehensive catalog of AI-generated UI tells. Each sign is a finding to log during audit.
Assign severity: P0 (breaks usability), P1 (looks AI-generated), P2 (weakens craft), P3 (polish).

**Brand exceptions.** When a `BRAND.md` exists, a sign listed under its "Brand exceptions" section
is not slop if it is used in a context the manual allows (for example, an official gradient on a
hero). Used anywhere else, it is still slop. See `brand-intake.md`.

---

## Color & Effects

| Sign | Typical severity |
|---|---|
| Purple-to-blue gradient on background, card, or button | P1 |
| Any hue-to-hue gradient on a surface | P1 |
| Gradient text (`background-clip: text; -webkit-text-fill-color: transparent`) | P1 |
| Glowing border (`box-shadow` with saturated color) | P1 |
| Glowing element hover state | P1 |
| Radial color blob / atmospheric wash behind content | P1 |
| Colored shadow (non-neutral `box-shadow` on cards or buttons) | P2 |
| Neon or highly saturated border on any element | P1 |
| Background that reads as a hue (orange, blue, green) on an app screen | P1 |
| More than one accent color used in the chrome | P1 |
| Semantic colors (red, green) used decoratively | P2 |
| Gradient used as a border or outline | P2 |
| "Glassmorphism" blur without a meaningful layering reason | P2 |

---

## Typography

| Sign | Typical severity |
|---|---|
| Emoji in a label, badge, or heading ("New ✨", "🚀 Launch") | P1 |
| ALL CAPS tracked labels on every section header | P1 |
| Only Inter, Roboto, or system-sans with no other typographic decision | P2 |
| Oversized hero headline (>80px) on a functional operational tool | P1 |
| Copy that shouts ("Revolutionize Your Workflow", "Unlock the Future") | P1 |
| Every section has a centered headline | P2 |
| "Coming soon" or placeholder copy left in production | P0 |
| No visual weight difference between heading and body | P1 |
| Font size below 12px for body text | P0 |
| Headings without `text-wrap: balance` (orphaned words at line end) | P3 |

---

## Layout & Structure

| Sign | Typical severity |
|---|---|
| Evenly-spaced 3-column card grid used as content filler | P1 |
| Duplicate feature cards with icon + heading + two sentences each | P1 |
| Everything centered, no left-aligned reading pattern | P2 |
| Cards nested inside cards | P2 |
| Section exists only to fill space (fake "stats", invented testimonials) | P1 |
| No visual hierarchy — every element the same weight | P1 |
| Dark dashboard applied by default with no product reason | P1 |
| Sidebar with glowing active state | P2 |
| Every section separated by exactly the same spacing | P2 |
| Padding is inconsistent or broken (elements clip to edge at mobile) | P0 |

---

## Icons

| Sign | Typical severity |
|---|---|
| Emoji used as icons in navigation or cards | P1 |
| Two or more icon libraries mixed on one screen | P2 |
| Icons with their own colors (not `currentColor`) | P2 |
| Icons at inconsistent sizes across the same surface | P2 |
| Icon stroke weight mismatched from surrounding text weight | P2 |
| Decorative icons before every heading or label | P2 |

---

## Components & Interaction

| Sign | Typical severity |
|---|---|
| Submit button labeled "Submit" | P2 |
| Multiple primary buttons competing in one section | P1 |
| Spinner instead of skeleton screen for predictable layouts | P2 |
| Empty state with no CTA or helpful message | P1 |
| Modal without X button or Escape to close | P0 |
| Interactive element with hit area smaller than 44px (mobile) | P0 |
| Disabled button with no explanation of why | P0 |
| Auto-advancing carousel | P1 |
| Placeholder text used as label replacement | P0 |
| Card with both shadow AND border | P2 |
| "Click here" or "Learn more" as link text | P2 |
| Hamburger menu visible on desktop viewport | P1 |
| Scroll bleeds from modal to body (`overscroll-behavior` missing) | P2 |

---

## Copy & Content

| Sign | Typical severity |
|---|---|
| Generic feature names ("Advanced Analytics", "Powerful Integrations") | P1 |
| Fake or invented testimonials, metrics, or user data | P1 |
| Every CTA says "Get Started" | P2 |
| Hero copy that could belong to any product | P1 |
| Content that describes features instead of outcomes | P2 |

---

## Template Identity Check

| Sign | Typical severity |
|---|---|
| If the product name were swapped for a competitor's, the UI would still fit | P1 |
| No Signature detail — nothing that only this product would have | P1 |
| No World reference — neutrals and accent have no tint toward the product's domain | P2 |
| Generic stock illustration or unDraw-style character that could be any product | P2 |

---

## Brand Misuse

Check only when a `BRAND.md` exists. The Brand Fidelity agent owns these checks.

| Sign | Typical severity |
|---|---|
| Logo rebuilt with text, CSS, an icon font, or a redrawn SVG instead of the provided file | P0 |
| Logo recolored, stretched, rotated, cropped, or given shadow, glow, or outline | P0 |
| Brand color used as body text below 4.5:1 contrast | P0 |
| Wrong logo version for the background (positive logo on a dark surface) | P1 |
| Off-brand color on the primary action, header, or hero | P1 |
| Brand font silently replaced by Inter or a system font | P1 |
| Official brand gradient used outside the contexts the manual allows | P1 |
| Logo inside its clear space or below minimum size | P2 |
| Color proportion inverted (a support color dominating the screen) | P2 |
| Copy tone contradicts the brand voice | P2 |

---

## Accessibility & Technical

| Sign | Typical severity |
|---|---|
| Text contrast below 4.5:1 (WCAG AA) | P0 |
| No visible focus indicator on interactive elements | P0 |
| Icon button with no `aria-label` | P1 |
| Form input with no associated `<label>` | P1 |
| `user-scalable=no` or `maximum-scale=1` in viewport meta | P1 |
| `outline: none` on focus with no visual replacement | P0 |
| Color is the only differentiator between states (no icon or text backup) | P1 |
| `prefers-reduced-motion` not respected | P1 |
| `transition: all` instead of specific properties | P2 |
| No semantic HTML (divs instead of nav, button, header, etc.) | P1 |
| Images without alt text | P0 |
| Chart labels overlapping | P0 |
| Text overflow without truncation or wrapping at narrow widths | P0 |

---

## Mobile & Touch

| Sign | Typical severity |
|---|---|
| Touch targets smaller than 44×44px | P1 |
| Hover effects without `@media (hover: hover) and (pointer: fine)` guard | P2 |
| `touch-action: manipulation` missing on buttons (300ms tap delay on mobile) | P2 |
| No `overscroll-behavior: contain` on modals, drawers, or dropdowns | P2 |

---

## Performance

| Sign | Typical severity |
|---|---|
| Lists with >50 items rendered without virtualization | P2 |
| Images without explicit `width` and `height` attributes (layout shift) | P2 |
| `transition: all` animates layout properties (triggers expensive reflow) | P2 |
| `will-change` set on elements that don't visibly stutter | P3 |
