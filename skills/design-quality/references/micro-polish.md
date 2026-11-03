# Micro-Polish Reference

Specific values and techniques for polishing interfaces that are mostly designed but feel slightly
off. Use during Polish Mode. Always express changes in the project's existing styling system —
Tailwind in a Tailwind project, CSS in a CSS project.

Review technique: slow the interface to **10% speed** in browser DevTools → Animations panel.
Walk every state: hover, focus, active, loading, empty. What feels off at 10% is what's subtly
wrong at full speed.

---

## Border Radius

**Concentric radius rule**: outer element's radius = inner element's radius + the padding between them.

```css
/* Wrong */
.card { border-radius: 12px; padding: 16px; }
.card-inner { border-radius: 12px; } /* should be 12 - 16 = too small */

/* Correct */
.card { border-radius: 24px; padding: 12px; }
.card-inner { border-radius: 12px; } /* 24 - 12 = 12 ✓ */
```

Mismatched radii on nested elements is the most common thing that makes interfaces feel cheap.

---

## Optical Alignment

When geometric centering looks off, align optically:

- Buttons with icons: the icon often needs 1–2px nudge down from geometric center
- Play/pause triangles: add ~2px left offset to counteract the optical lean right
- Asymmetric icons (chevrons, arrows): verify visual center, not bounding-box center
- Icon + text in a badge or tag: cap-height alignment, not baseline

---

## Shadows

Prefer layered `box-shadow` for elevation over borders:

```css
/* Flat, lifeless */
.card { border: 1px solid #e5e7eb; }

/* Layered shadow for real depth */
.card {
  box-shadow:
    0 1px 2px oklch(0 0 0 / 0.04),
    0 2px 4px oklch(0 0 0 / 0.04),
    0 4px 8px oklch(0 0 0 / 0.06);
}
```

Keep borders for: dividers, layout separators, selected state, focus state.
Never combine shadow and border on the same card — pick one.

---

## Press Animation

Scale on press gives tactile feedback:

```css
button {
  transition: transform 150ms ease-out;
}
button:active {
  transform: scale(0.96);
}
```

- Always `0.96` — never smaller than `0.95` (feels exaggerated)
- Add a `static` prop/class to disable when motion is distracting (dense data tables, etc.)

---

## Icon Rules

**Stroke weight matches text weight:**
- Regular (400) text → 1.5px stroke icons
- Semibold (600) text → 2px stroke icons
- One stroke weight per surface — never mix

**States via `currentColor`:**
```css
.icon { color: var(--text-secondary); } /* default */
.icon:hover { color: var(--text-primary); }
.icon.active { /* use fill variant of the same icon, same color */ }
```

**Icon animation (when warranted):**
```css
/* Cross-fade between icon states */
.icon-out { opacity: 0; scale: 0.25; filter: blur(4px); }
.icon-in  { opacity: 1; scale: 1;    filter: blur(0); }
/* transition: opacity 200ms, scale 200ms, filter 200ms */
```
If `framer-motion` is installed: `transition: { type: "spring", duration: 0.3, bounce: 0 }`.
Bounce must always be `0`.

---

## Typography Details

```css
/* Headings — prevent orphaned words */
h1, h2, h3 { text-wrap: balance; }

/* Body — prevent single-word last lines */
p, li, figcaption { text-wrap: pretty; }

/* Updating numbers — prevent layout shift as values change */
.number, .metric, .count, td { font-variant-numeric: tabular-nums; }

/* macOS — crisper, thinner text rendering */
:root { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
```

When to use `tabular-nums`:

| Use | Don't use |
|---|---|
| Counters, timers, prices that update | Static display numbers |
| Table columns with numbers | Phone numbers, zip codes |
| Animated number transitions | Version strings (v2.1.0) |

---

## Image Outlines

1px outline adds consistent depth. Color must be pure black or white — never a tinted neutral
(tinted outlines absorb the surface color and look like dirt on the image edge):

```css
/* Light mode */
img { outline: 1px solid oklch(0 0 0 / 0.1); }

/* Dark mode */
img { outline: 1px solid oklch(1 0 0 / 0.1); }
```

---

## Transitions

```css
/* Never */
transition: all 200ms ease;

/* Always specify */
transition: transform 200ms ease-out, opacity 200ms ease-out;
```

**`will-change`:** only for `transform`, `opacity`, `filter`. Only when first-frame stutter is
visible. Never `will-change: all`.

---

## Touch & Pointer

```css
/* Remove 300ms tap delay on mobile */
button, a, [role="button"] {
  touch-action: manipulation;
}

/* Only apply hover effects on devices that support hover */
@media (hover: hover) and (pointer: fine) {
  .card:hover { transform: translateY(-2px); }
}

/* Prevent scroll chaining in modals and drawers */
.modal, .drawer, .dropdown {
  overscroll-behavior: contain;
}
```

---

## Animations

**Enter animations:**
- Use CSS `transition` for interactive state changes (interruptible — user can click away mid-animation)
- Reserve `@keyframes` for staged sequences that run once (first page load, success state)
- `ease-out` for enters, `ease-out` for exits
- Skip enter animation on first render: `initial={false}` on `AnimatePresence`

**Stagger:** only for infrequent, staged entrances that communicate hierarchy.
Never for high-frequency interactions (every row in a list, every hover).

**Exit:** `translateY(-4px)` or similar small offset. Never full height. Softer than enters.

**Motion restraint:** Motion is never the only feedback channel — every animated state change
also needs a static cue (color, icon, or label change).

---

## Hit Areas

```css
/* Small icon button */
.icon-button {
  width: 20px;
  height: 20px;
  position: relative;
}
.icon-button::before {
  content: '';
  position: absolute;
  inset: -12px; /* extends hit area to 44×44 without changing layout */
}
```

- Mobile: 44×44px minimum
- Dense desktop: 40×40px minimum
- Hit areas of adjacent elements must not overlap
