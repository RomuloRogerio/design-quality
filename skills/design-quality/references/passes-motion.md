# Pass 10: Motion

Always the last pass. Motion that's added before the layout, color, and type are settled
ends up masking problems rather than enhancing craft.

## The Motion Budget

Motion is a budget, not a garnish. Ask for every animation: does removing it make the interface
worse, or just less flashy? If the answer is "just less flashy," remove it.

**High-frequency interactions (used >10×/day): no custom animation.**
Row hover, keystroke feedback, tab switch, toggle — these get instant response or a minimal
`background-color` / `opacity` transition at ≤150ms. Anything more trains the user to wait.

**Low-frequency actions (used rarely or first time only): earn animation.**
Onboarding steps, empty state → first item, success states, error reveals — these can afford
150–300ms with a simple ease-out.

## Duration Taxonomy

| Category | Range | Use for |
|---|---|---|
| Micro | 50–100ms | Button states, toggle fills, checkbox ticks |
| Short | 150–250ms | Tooltips, fades, small positional moves |
| Medium | 250–400ms | Drawers, modals, page transitions |
| Long | 400–700ms | Complex choreography, onboarding sequences |

High-frequency interactions stay in the Micro tier. Long animations belong only in rarely-seen flows.
Total staggered sequence duration must be under 700ms.

## CSS Transitions > Keyframes for Interactive Elements

CSS transitions interpolate toward the latest state — they're interruptible. If a user opens
a drawer and closes it mid-animation, a transition reverses smoothly. A keyframe animation
restarts from the beginning.

**Rule:** Use `transition` for all interactive state changes (hover, toggle, open/close, focus).
Reserve `@keyframes` for one-shot sequences that run once on enter (loading skeletons, success
checkmarks, staggered page loads).

```css
/* ✅ Interruptible — correct for a toggle */
.drawer {
  transform: translateX(-100%);
  transition: transform 200ms ease-out;
}
.drawer.open { transform: translateX(0); }

/* ❌ Restarts on interrupt — wrong for interactive elements */
.drawer.open { animation: slideIn 200ms ease-out forwards; }
```

## Scale on Press

All buttons get `scale(0.96)` on `:active`. This gives tactile feedback.

- Never below `0.95` — feels exaggerated.
- Use CSS transitions (interruptible), not keyframes.
- Add a `static` prop pattern for buttons where the motion would be distracting (e.g., inside
  a drag handle, or in a high-frequency data input).

```css
.button {
  transition: transform 150ms ease-out;
}
.button:active {
  transform: scale(0.96);
}
```

## Icon State Transitions

When an icon changes state (play→pause, like→liked, checked→unchecked):
- Don't swap instantly — crossfade with `opacity`, `scale(0.25→1)`, and `filter: blur(4px→0px)`.
- Duration: 300ms, spring with bounce: 0 (if using Framer Motion).
- Use `initial={false}` on `AnimatePresence` so icons don't animate in on page load.

```tsx
<AnimatePresence initial={false} mode="popLayout">
  <motion.span
    key={isActive ? "active" : "inactive"}
    initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
    exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
    transition={{ type: "spring", duration: 0.3, bounce: 0 }}
  >
    <Icon />
  </motion.span>
</AnimatePresence>
```

## Enter / Exit Animations

- Enters: `opacity 0→1` + `translateY(8–12px) → 0` + optional `blur(4px→0)`. Duration 200–300ms, ease-out.
- Exits: softer and faster than enters. Small fixed `translateY(-12px)`, not full container height. Duration 100–150ms.
- Stagger children by 80–100ms only for infrequent staged entrances (first page load, empty→first item). Never stagger rows on every hover.

## prefers-reduced-motion

Every animation must have a reduced-motion alternative. The static cue (color, icon, label)
must still work without motion.

```css
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none;
    transition: opacity 0.1s ease;
  }
}
```

In Framer Motion:
```tsx
import { useReducedMotion } from "framer-motion";
const shouldReduceMotion = useReducedMotion();
// Pass { y: shouldReduceMotion ? 0 : 12 } to initial
```

## Motion is Never the Only Feedback Channel

Every animated state change also needs a static cue: color, icon, or label.
A spinner that's the only "loading" signal is inaccessible. Add `aria-busy="true"` and
a visually hidden label.

## Quick Motion Checklist

- [ ] No custom animation on interactions used >10×/day
- [ ] CSS `transition` used for all interactive state changes (not `@keyframes`)
- [ ] `scale(0.96)` on all button `:active` states
- [ ] Icon state changes use crossfade (opacity + scale 0.25 + blur 4px)
- [ ] `AnimatePresence initial={false}` on icon toggles (no animate-in on page load)
- [ ] Exit animations shorter than enters (100–150ms vs 200–300ms)
- [ ] `prefers-reduced-motion` respected on every animated element
- [ ] Motion is never the only feedback channel (static cue always present)
- [ ] No `transition: all` — specify exact properties
- [ ] No `will-change` on elements that don't actually stutter
