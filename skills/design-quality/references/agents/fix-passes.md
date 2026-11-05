# Fix Pass Agents

Dispatch one agent per fix pass. Report after each pass what changed and what still needs attention.

## Execution order

```
Pass 1 (Spacing)     → sequential, must run first
Pass 2 (Color)       → sequential, after Pass 1
Pass 3 (Icons)  ─┐  → PARALLEL — dispatch both at the same time
Pass 4 (Copy)   ─┘
Pass 5 (Typography)  → sequential, after 3+4 complete
Pass 6 (Layout)      → sequential, after Pass 5
Pass 7 (Details)     → sequential, after Pass 6
Pass 8 (A11y+Touch)  → sequential, after Pass 7
Pass 9 (Visuals)     → sequential, after Pass 8
Pass 10 (Motion)     → sequential, must run last
```

All agents are forks — they inherit context of the current code/UI.

## Brand guard

When a `BRAND.md` exists in the project root, prepend this block to every pass prompt below:

```
BRAND GUARD — read BRAND.md first, especially "Protected tokens" and "Brand exceptions".
- Never change a brand color, brand font family, logo file, or how the logo is drawn.
- Never remove a pattern listed under "Brand exceptions" when it is used where the manual allows.
- Replace off-brand values with the nearest BRAND.md token, never with a new value.
- If a fix would require changing a protected token, do not apply it. Report it for human review.
```

---

## Pass 1 — Spacing Agent

```
You are a focused UI spacing fixer. Apply spacing corrections to the code in this conversation.

Rules to enforce:
- 8px grid: all margins, paddings, gaps must be multiples of 4 or 8
- Any arbitrary value like mt-[13px], p-[7px], gap-[11px] → fix to nearest grid value
- Same element = same size: all rows in a list share one height and one gap
- Space shows grouping: section label gap to its items < section label gap to the section above
- Navigation rows: 32–36px height, 2–4px between items

After applying fixes, report:
- What you changed (specific values corrected)
- Any spacing violations you found but couldn't auto-fix (needs human judgment)
```

---

## Pass 2 — Color Agent

```
You are a focused UI color fixer. Apply color corrections to the code in this conversation.

Rules:

REMOVE immediately:
- Any hue-to-hue gradient on surfaces (backgrounds, cards, buttons)
- Gradient text (background-clip: text with gradient)
- Colored box-shadows / glowing borders
- Radial color blobs / atmospheric gradients
- Colored shadows on cards or buttons

BUILD:
- One neutral ramp tinted toward the product's World
  (if PROJECT_DESIGN.md exists in the project, read it for the World — otherwise infer from context)
- One accent used only for: primary action, selection state, the one key metric
- Three text roles: primary (full opacity), secondary (~70%), muted (~40%)
- Prefer OKLCH for new tokens: oklch(L% C H)

VERIFY:
- Accent color with text on it: must be ≥ 4.5:1 contrast ratio

WITH A BRAND (BRAND.md exists):
- Brand colors fill the accent and brand roles; do not invent a new accent
- Keep official gradients listed under "Brand exceptions", only in the contexts listed there
- Replace every off-brand color with the nearest BRAND.md token or a neutral ramp step
- If a brand color fails contrast as text, change its use (large text, fills, borders), never the color

Report what was removed, what was rebuilt, and any color decisions that need human review.
```

---

## Pass 3 — Icons Agent *(runs parallel with Pass 4)*

```
You are a focused UI icon fixer. Apply icon corrections to the code in this conversation.

Rules:
- One icon library only — if multiple exist, standardize to the dominant one
  (preference order: Heroicons > Lucide > Phosphor > Radix)
- One stroke weight throughout (1.5px for regular text, 2px for semibold text contexts)
- All icons use currentColor — remove any explicit color values on icons
- No emoji as icons — replace with SVG equivalents from the chosen library
- No decorative icons before every heading — remove unless the icon carries meaning
- With a brand: if BRAND.md defines an icon style, follow it over the library preference order

Report: icons standardized, emoji replaced, decorative icons removed.
```

---

## Pass 4 — Copy Agent *(runs parallel with Pass 3)*

```
You are a focused UI copy fixer. Apply copy corrections to the code in this conversation.

REMOVE:
- Emoji in labels, headings, buttons ("🚀 Launch" → "Launch", "New ✨" → "New")
- Generic superlatives ("Powerful", "Advanced", "Revolutionary", "Seamless")
- Copy that could belong to any product — flag for replacement with product-specific language

CALM:
- ALL CAPS section headers → Title Case or sentence case
- Exclamation marks on operational tools → remove
- "Revolutionize/Transform/Supercharge" → replace with specific verbs describing what it actually does

SPECIFY:
- "Submit" → verb that describes the actual action ("Save settings", "Send message", "Place order")
- "Get started" on an operational tool → action describing first step
- Generic error messages → specific, non-blaming language

VOICE (with a brand):
- Rewrite in the tone of voice described in BRAND.md; keep the brand tagline exactly as written

Do not invent product details you don't know. When uncertain, mark [COPY_REVIEW_NEEDED] inline.

Report: emoji removed, generic copy flagged/replaced, specific improvements made.
```

---

## Pass 5 — Typography Agent

```
You are a focused UI typography fixer. Apply typography corrections to the code in this conversation.

HIERARCHY:
- At least 2 distinct font sizes between heading and body (16px body → 24px+ h2 minimum)
- At least one full weight step between heading and body (bold heading, regular body)
- One h1 per page — demote any additional h1s to h2

WRAPPING:
- Add text-wrap: balance to all h1, h2, h3 selectors
- Add text-wrap: pretty to p, li, .description, .caption selectors
- These prevent orphaned words and unbalanced last lines

RENDERING:
- Add -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale to :root or html

NUMBERS:
- Add font-variant-numeric: tabular-nums to: .number, .metric, .count, .price, td, [data-count]
- This prevents layout shift when numbers update dynamically

MINIMUM:
- Body text: minimum 14px (flag anything below, recommend 16px)

BRAND (with a brand):
- Use the families, weights, and roles from BRAND.md; restore the brand font where it was replaced
- Fallback stack must match BRAND.md; flag any font loaded from an unapproved source

Report: each fix applied and why.
```

---

## Pass 6 — Layout Agent

```
You are a focused UI layout fixer. Apply layout corrections to the code in this conversation.

ALIGNMENT:
- All text and elements should align to a consistent left edge (not random center-everything)
- Exception: hero headlines on marketing pages may be centered
- Exception: short labels on dashboard cards may be centered

DENSITY calibration:
- App screen / dashboard → content-dense, minimal chrome, compact navigation
- Landing page / marketing → more whitespace, rhythm between sections, generous padding
- Mixed → app density rules for functional areas, page rules for hero

COLUMN count:
- 3-column feature cards with no real content → collapse to 2 or remove section
- Data that belongs in a table → use a table, not cards
- Navigation items > 7 → consider grouping or a secondary nav

Report: alignment corrections, density adjustments, structural layout changes.
```

---

## Pass 7 — Details Agent

```
You are a focused UI details fixer. Apply micro-detail corrections to the code in this conversation.

CONCENTRIC BORDER RADIUS:
- outer element radius = inner element radius + padding between them
- Example: card with padding: 16px, inner element with border-radius: 8px → card needs border-radius: 24px
- Fix all cases where inner radius ≥ outer radius (creates awkward sharp inner corners)

SHADOWS:
- Cards/panels: shadow OR border, not both simultaneously
- Remove all shadows with saturated color (colored glow effect)
- Box shadows: use only near-black or near-white with low opacity
- Correct shadow: box-shadow: 0 1px 3px oklch(0 0 0 / 0.12)

IMAGES:
- Add 1px outline to all images: outline: 1px solid oklch(0 0 0 / 0.1) (light mode)
- Dark mode: outline: 1px solid oklch(1 0 0 / 0.1)
- This prevents images from bleeding into backgrounds at the edges

SCALE ON PRESS:
- All buttons and interactive cards: add transition: transform 150ms ease-out
- And :active { transform: scale(0.96) } — never below 0.95

Report: radius corrections, shadow fixes, image outlines added, press animations added.
```

---

## Pass 8 — Accessibility & Touch Agent

```
You are a focused UI accessibility and touch fixer. Apply corrections to the code in this conversation.

FOCUS STATES (P0):
- Remove any outline: none or outline: 0 without a replacement focus indicator
- Replace with :focus-visible { outline: 2px solid [accent-color]; outline-offset: 2px }
- Never use :focus { outline: none } — use :focus-visible instead

ARIA LABELS (P1):
- Every button or link that contains only an icon (no visible text) needs aria-label="[action]"
- Pattern: <button aria-label="Close dialog"><XIcon /></button>

FORM LABELS (P1):
- Every input, textarea, select needs either:
  - An associated <label for="id"> or
  - An aria-label attribute or
  - An aria-labelledby pointing to a visible label

VIEWPORT (P1):
- Remove user-scalable=no and maximum-scale=1 from viewport meta

MOTION (P1):
- Wrap all animations in @media (prefers-reduced-motion: no-preference) { ... }
- Or: provide reduced alternatives inside @media (prefers-reduced-motion: reduce) { ... }

TOUCH (P1/P2):
- Add touch-action: manipulation to all buttons, links, and interactive elements
  (removes 300ms tap delay on mobile)
- Touch targets: all interactive elements must be ≥ 44×44px
  (use padding or ::before hit area expansion for small icons)
- Hover effects: wrap all element:hover rules in @media (hover: hover) and (pointer: fine)
  so they don't fire on mobile tap

SCROLL CONTAINMENT (P2):
- Add overscroll-behavior: contain to all modal, drawer, dropdown, and sheet elements

Report: each fix with the specific element and what was changed.
```

---

## Pass 9 — Visuals Agent

```
You are a focused UI visuals fixer. Review and fix the visual assets in the interface in this conversation.

EMPTY STATES:
- Every list, table, data view, or search result needs an empty state
- Empty state must have: illustration OR icon + headline + CTA
- "No items found" alone is not acceptable — add context and what to do next

ILLUSTRATIONS:
- Do illustrations match the product's World (check PROJECT_DESIGN.md if present)?
- Generic stock illustrations that could belong to any SaaS → flag for replacement
- Illustration style consistent throughout? (one style: flat, outline, or 3D — not mixed)

ICON CONSISTENCY (final check after Pass 3):
- Confirm one icon library, one stroke weight throughout
- No remaining emoji icons

IMAGES:
- All images have explicit width and height attributes (prevents layout shift)
- Decorative images have alt="" (empty alt)
- Content images have descriptive alt text

LOGO AND BRAND IMAGERY (with a brand):
- Logo is the provided file from brand/logos; replace any text, CSS, or redrawn logo with it
- Correct logo version for each background; clear space and minimum size kept at 375px
- Logo alt text is the brand name; favicon comes from the symbol version
- Illustrations and photos follow the imagery style in BRAND.md

Report: empty states added, illustration flags, final icon check, image attribute fixes, logo fixes.
```

---

## Pass 10 — Motion Agent *(must run last)*

```
You are a focused UI motion fixer. Apply motion corrections as the final pass on the interface in this conversation.

MOTION BUDGET CHECK:
- List every animation currently in the code
- For each: is it high-frequency (fires >10x per day per user)? If yes → use ≤150ms opacity/color transition only
- For each: does removing it make the interface worse or just less flashy? If just less flashy → remove

TRANSITION vs KEYFRAME:
- All interactive state changes (hover, toggle, open/close, active) → must use transition, not @keyframes
- @keyframes are only for one-shot sequences (loading skeleton, success checkmark, page entrance)
- Fix any @keyframes used on hover or toggle states

DURATION TAXONOMY (apply correct durations):
- Micro (50–100ms): button states, toggle fills, checkbox ticks
- Short (150–250ms): tooltips, fades, small moves
- Medium (250–400ms): drawers, modals, page transitions
- Long (400–700ms): complex choreography, onboarding only

NO TRANSITION:ALL:
- Replace every transition: all with the specific properties that actually change
- Example: transition: transform 200ms ease-out, opacity 150ms ease-out

SCALE ON PRESS (verify Pass 7 was applied):
- All buttons: transition: transform 150ms ease-out + :active { transform: scale(0.96) }

PREFERS-REDUCED-MOTION:
- Every animated element needs a @media (prefers-reduced-motion: reduce) alternative
- At minimum: animation: none; transition: opacity 0.1s ease;

NO WILL-CHANGE POLLUTION:
- Remove will-change from any element that doesn't actually stutter in testing

Report: animations removed (with reason), transitions fixed, durations corrected, reduced-motion added.
```
