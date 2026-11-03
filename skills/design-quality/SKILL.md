---
name: design-quality-v2
description: >-
  Full-cycle design quality skill for AI-generated interfaces — evaluate, critique, and fix.
  Detects AI slop (purple gradients, gradient text, glow effects, emoji icons, card-grid filler,
  Inter-everything typography, generic layouts) and guides creation with a product direction
  framework and investment gates. Use WHENEVER: reviewing or auditing a UI, asking if something
  looks AI-generated, looks like a template, feels generic, or has no character; creating a new
  page, dashboard, app screen, or landing page; redesigning, unslopping, or polishing an existing
  screen; improving any frontend interface. Even if the user does not say "design quality" —
  if they're building or evaluating any UI, use this skill. Produces: slop audit, scored critique
  (8 dimensions), P0–P3 fix list, creative direction, and code corrections. Works on React,
  Tailwind, HTML/CSS, Vue, Svelte, dashboards, apps, landing pages, components. Triggers on:
  "review this design", "does this look AI?", "critique this UI", "unslop", "make it less generic",
  "build this page well", "design this screen", "polish this", "improve the UI", "redesign".
---

# Design Quality v2

A full-cycle skill for creating and evaluating interface design. For existing interfaces, it audits
and scores. For new ones, it sets a direction and ensures the craft is there. For broken ones, it
applies fixes pass by pass.

---

## Gate 0: Resolve Input Type

Before any analysis or creation, identify what was shared. This changes everything downstream.

| What was shared | What to do |
|---|---|
| Screenshot / image | Analyze visually; note what CSS you can't confirm |
| HTML / CSS source | Read the styles; full audit possible |
| Project folder | Glob for main CSS/component files first; read before scoring |
| URL / live page | Read the DOM; inspect styles via DevTools if browser available |
| Artifact link | Read the artifact; treat as HTML source |
| Text description only | Ask for at least one of the above before scoring; describe what's missing |

Also detect **context type** — this affects which heuristics apply:

- **App screen** (tool, dashboard, SaaS product): density governs; header is small; action IS the content
- **Page** (landing page, marketing, editorial): more creative license; hero matters; sections and rhythm

When uncertain, state your assumption and proceed.

---

## Mode Selection

Detect from the request — when in doubt, start with review:

| Request type | Mode |
|---|---|
| "review", "critique", "audit", "does this look AI-generated?" | **review** |
| "build", "create", "design this page" | **create** |
| "fix", "improve", "unslop", "redesign" | **fix** (review → apply) |
| "polish", "feels slightly off", "almost there" | **polish** |

If a `PROJECT_DESIGN.md` file exists in the project root, read it first. It contains the approved
direction, palette, and Signature — don't override it without asking.

---

## Review Mode

Audit, score, and prioritize. No code changes without asking first.

### Step 1: Audit for AI Slop Signs

Go through the full catalog in [references/slop-signs.md](references/slop-signs.md). Log each finding:

```
[location] [what you found] — P0 / P1 / P2 / P3
```

P0 = breaks usability or readability  
P1 = makes it clearly look AI-generated  
P2 = polish issue that weakens the craft  
P3 = nice-to-have improvement  

**Quick hits — check these first:**
- Purple-to-blue gradients on any surface
- Gradient text (`background-clip: text`)
- Glowing borders or shadows with color
- Emoji used as icons or decoration in labels
- Mixed icon libraries on one surface
- Radial color blobs behind content
- Evenly-spaced card grids used as filler
- ALL CAPS tracked labels on every section header
- Copy that "shouts" ("Revolutionize Your Workflow Today")
- Dark theme applied by default without product reason
- Oversized hero headline on an operational tool

**Template check** — ask this explicitly:
> "If you swapped this product's name for any other product in its category, would the UI still fit?"

If yes → P1 automatic. The interface has no specific identity. The World, Signature, and Moments are all missing.

**Accessibility quick check** — flag these:
- `outline: none` on focus without a visible replacement → P0
- Icon buttons with no `aria-label` → P1
- Form inputs with no associated `<label>` → P1
- `user-scalable=no` or `maximum-scale=1` in viewport → P1
- Color is the only differentiator between states (no icon or label backup) → P1

**Mobile / touch quick check:**
- Touch targets smaller than 44×44px → P1
- Hover effects with no `@media (hover: hover)` guard (fires on tap, looks broken) → P2
- `overscroll-behavior` missing on modals/drawers (scroll bleeds to body) → P2

**Performance quick check:**
- `transition: all` anywhere → P2
- Lists with >50 items, no virtualization hint → P2
- Images without explicit `width` and `height` (causes layout shift) → P2

**Felt State Check** — ask for at least the primary state:

> "What is the person actually feeling when they arrive at each key state?
> Loading: anxious? Waiting? Empty state: lost? First time: overwhelmed?
> Error: embarrassed? Is the interface acknowledging those feelings — or ignoring them?"

Flag when:
- Loading copy is just "Loading..." → P2 (should be "Getting your data")
- Error message blames the user for a system failure → P1
- Empty state offers nothing — no instruction, no CTA → P1
- Success is absorbed silently (no micro-win acknowledgment) → P2
- Error recovery is rushed (next prompt appears before user can process) → P2

**Emotional Arc Check** (Peak-End Rule) — for flows with more than 2 steps:

Map the two moments that dominate how the flow is remembered:
- **Peak**: the most emotionally intense moment (order placed, form submitted, first result). Is it well-designed?
- **End**: the final screen/state. Does it confirm clearly and land warm?

Flag: ending on an administrative screen, a confusing status page, or unresolved error → P1.

### Step 2: Score on 8 Dimensions

Rate 1–10. See [references/quality-dimensions.md](references/quality-dimensions.md) for what each
score level means.

| Dimension | What it asks |
|---|---|
| **Product fit** | Does the visual direction match the product's actual job and audience? |
| **Hierarchy** | Can the user see what matters first, second, third? |
| **Clarity** | Are labels, actions, data, and states easy to understand? |
| **Taste** | Does it feel intentional without looking templated? |
| **Restraint** | No unnecessary decoration, filler, or style cosplay? |
| **Density** | Is the amount of information right for the task? |
| **Craft** | Spacing, type, alignment, contrast, component states — polished? |
| **Responsiveness** | Does the design survive mobile and narrow layouts? |

**Failure flags** — flag as failure even if code works and scores look ok:
- Chart labels overlap or overflow controls
- Dark mode hurts readability without adding functional value
- Reference style overwhelms the product's own identity
- The UI looks more designed but is less useful
- The result looks like a generic SaaS template
- Mobile layout is cramped or broken

### Step 3: Output

```
## Slop Audit
[each finding with location and severity]

## Template Check
[answer to "would this fit any product in the category?"]

## Scorecard
Product fit:    X/10   [one-line note]
Hierarchy:      X/10
Clarity:        X/10
Taste:          X/10
Restraint:      X/10
Density:        X/10
Craft:          X/10
Responsiveness: X/10
Overall:        X/10

## Verdict
Best part:
Worst part:
Required fix (P0): [if any — otherwise "none"]
Quick wins (P1): [top 3 at most]
```

After the output, ask whether to apply any of the fixes.

**Deep-dive map** — if a dimension scores ≤ 5, there is a matching designer-skill that goes deeper.
See [references/designer-skills-index.md](references/designer-skills-index.md) for the full map.

---

## Create Mode

Before writing any UI, follow this sequence. Each step is a gate — stop and confirm before moving on.

### Gate 0: Context type

State which applies before proceeding:
- **App screen** — tool, dashboard, data product. Density, actions, and states govern.
- **Page** — landing, editorial, marketing. Composition, rhythm, and sections govern.

Different heuristics apply in each. When building an app screen, a hero with large type is slop.
When building a landing page, dense compact rows are wrong.

### Gate 1: Product Understanding

Check for an existing `PROJECT_DESIGN.md` in the project root. If it exists, read it — direction is
already set; skip to Gate 3 (Build) and apply the recorded direction.

If not, read or ask for: what the product does, who it's for, what the primary task is, what content
exists, the tech stack, existing brand colors, fonts, components.

Ask: *"Is my understanding correct before I set the design direction?"* Stop. Wait.

### Gate 2: Direction + Design Dials

Derive five lines from the product — never from trends, portfolios, or what looks cool:

- **Product**: What it does and for whom, one plain sentence.
- **Character**: 2–3 concrete words. `calm, exact, a little warm` or `fast, technical, playful`.
  "Clean, modern, sleek, minimal, premium" are banned — they describe every template.
- **World**: The material or place the product belongs to naturally. A note app: paper and ink.
  A monitoring tool: instruments and night shifts. A travel app: maps and window light.
  This tints the neutrals, the accent, and the visual moments.
- **Moments**: 1–2 places on the screen where the design gets rich and specific — a chart where
  each color means a series, an object from the World in the hero, a rendered card with real data.
  Everything else stays quiet so these read instantly.
- **Signature**: One small detail only this product would have, repeated consistently.
  A live status dot for a monitoring tool. Keycaps on a developer tool. A route line for a delivery
  app. One detail, not five.

Present 1–3 directions. For each, also show three **Design Dials** as a quick signal:

```
Variance  ░░░░░░░░░░  1–10   (1 = minimal/centered, 10 = bold/asymmetric)
Motion    ░░░░░░░░░░  1–10   (1 = static, 10 = animated)
Density   ░░░░░░░░░░  1–10   (1 = spacious/editorial, 10 = dashboard/dense)
```

Ask: *"Which direction? And are the dials right, or should I adjust any?"* Stop. Wait.

**After direction is confirmed**, suggest creating a `PROJECT_DESIGN.md` in the project root:

```markdown
# PROJECT_DESIGN.md

## Direction: [Name]
Product: [one sentence]
Character: [2–3 words]
World: [material / place]
Moments: [1–2 specific places]
Signature: [one detail]

## Dials
Variance: X/10
Motion: X/10
Density: X/10

## Palette
Canvas: [token + hex]
Accent: [token + hex]
Text primary: [token + hex]
Text muted: [token + hex]

## Typography
Display: [font name + weight]
Body: [font name + weight]
Mono: [font name] (if applicable)

## Border radius: [value]px
```

This file makes the direction persistent — the skill reads it at the start of the next session.

### Design Principles

With direction confirmed, apply in this order (earlier passes affect later ones):

#### Spacing — establish first
- 8px grid. All margins, paddings, gaps: multiples of 4 or 8. (`mt-[13px]` → fix it.)
- Same element = same size. All list rows share one height and one gap.
- Space shows grouping: inner < outer. A section label sits closer to its own items than to the one above.
- Navigation is densest: rows 32–36px, 2–4px between them.

#### Color
- One neutral ramp, tinted toward the World. Backgrounds, surfaces, borders, text all from that ramp.
- Apps and dashboards: backgrounds stay near-neutral. The content carries color, not the chrome.
- One accent, used rarely: primary action, selection, or the one number that matters.
- Three text roles: primary, secondary, muted. Never ten slightly different grays.
- **Banned**: hue gradients on surfaces, gradient text, colored glows, colored shadows, radial blobs,
  neon borders.
- Accent with text on it: ≥ 4.5:1 contrast.
- Prefer OKLCH for new color tokens: `oklch(L% C H)` — perceptually uniform, easier to adjust.

#### Typography
- Pair a distinctive display font with a clean body font. Maximize weight contrast.
- `text-wrap: balance` on all headings (h1–h3). `text-wrap: pretty` on body and list text.
- `-webkit-font-smoothing: antialiased` on `:root` or `html` (macOS renders crisper).
- Minimum 14px body text (prefer 16px). One h1 per page.

#### Components
- Buttons: verb-first labels. One primary per section.
- No emoji as icons. One icon library, one stroke weight, `currentColor` only.
- Cards: shadow OR border, not both.
- Empty states: illustration + headline + CTA. Never just empty.
- Loading: skeleton screens (not spinners) after 300ms delay.
- Modals: X, Cancel, and Escape. Trap focus. Return focus on close.
- `overscroll-behavior: contain` on all modals, drawers, and dropdowns.
- All icon buttons need `aria-label`. All form inputs need an associated `<label>`.

#### One Bright Element Rule
Each screen gets one polished, rich element. Everything around it stays quiet.
The chrome (navigation, buttons, backgrounds) never competes with the content.

#### Anti-Generic Guardrail
If the design would look impressive in a portfolio screenshot but make the product less clear,
reject it.

### After Building

Run Review Mode. Done when: no P0 findings, overall ≥ 7/10, product fit ≥ 7/10.

---

## Fix Mode

Run Review Mode first. Apply fixes in pass order — complete each pass before starting the next:

1. **Spacing** — grid alignment, rhythm, grouping
2. **Color** — remove slop, build from neutral ramp
3. **Icons** — one set, one size, one stroke, currentColor. If `better-icons` MCP is available, use `better-icons search <query>` to find the right icon instead of inventing SVG inline.
4. **Copy** — remove emoji labels, calm the shouting, make it specific to this product
5. **Typography** — hierarchy, weights, `text-wrap: balance` on headings, `text-wrap: pretty` on body, `-webkit-font-smoothing: antialiased` at root, `tabular-nums` on dynamic numbers
6. **Layout** — alignment, density
7. **Details** — concentric radii, shadows, borders
8. **Accessibility & Touch** — focus states (`focus-visible`, not `focus`), `aria-label` on icon buttons, labels on inputs, `touch-action: manipulation` on buttons, hover wrapped in `@media (hover: hover) and (pointer: fine)`, touch targets ≥ 44px, `overscroll-behavior: contain` on modals
9. **Visuals** — See [references/passes-visuals.md](references/passes-visuals.md). Empty state illustrations exist and match the product World; icon library is consistent (one set, one stroke weight); images have aspect ratios defined; no stock photo that could belong to any product.
10. **Motion** — Last pass, only where it adds meaning. See [references/passes-motion.md](references/passes-motion.md). CSS transitions preferred over keyframes for interactive elements (interruptible); `scale(0.96)` on button press; no custom animation on interactions used >10×/day; `prefers-reduced-motion` respected everywhere.

Report per pass: what changed and what still needs attention.

---

## Polish Mode

For interfaces that are mostly well-designed but feel slightly off.

Technique: slow the interface to 10% speed in browser DevTools (Animations panel) and walk every
state: hover, focus, active, loading, empty. What feels off at 10% is what's subtly wrong at full speed.

See [references/micro-polish.md](references/micro-polish.md) for specific values.

**Quick checklist:**
- [ ] Concentric border radius: outer = inner + padding
- [ ] Optical alignment over geometric (buttons with icons, asymmetric shapes)
- [ ] `scale(0.96)` on press — never smaller than 0.95
- [ ] Icon stroke matches text weight: 1.5px beside regular (400), 2px beside semibold (600)
- [ ] `font-variant-numeric: tabular-nums` on any dynamically updating numbers
- [ ] `text-wrap: balance` on all headings (h1–h3)
- [ ] `text-wrap: pretty` on paragraphs, list items, card descriptions
- [ ] `-webkit-font-smoothing: antialiased` on `:root` (missing → macOS text looks heavier)
- [ ] `touch-action: manipulation` on all buttons (removes 300ms tap delay on mobile)
- [ ] Hover effects wrapped in `@media (hover: hover) and (pointer: fine)` (otherwise fires on mobile tap)
- [ ] Images: 1px outline `oklch(0 0 0 / 0.1)` light, `oklch(1 0 0 / 0.1)` dark
- [ ] Never `transition: all` — specify exact properties
- [ ] 44px minimum hit area on mobile (40px on dense desktop)
- [ ] Exit animations softer than enters; `ease-out` for both
- [ ] No `will-change` on anything that doesn't stutter
- [ ] CSS transitions for interactive states (hover, toggle, open/close) — not keyframes

---

## Pre-Delivery Checklist

Before marking any UI done:

- [ ] No emoji as icons (use SVG: Heroicons/Lucide/Phosphor/Radix)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Text contrast ≥ 4.5:1 (WCAG AA)
- [ ] Focus states visible for keyboard navigation (`focus-visible`, not removed `outline`)
- [ ] `aria-label` on every icon button
- [ ] `<label>` associated with every form input
- [ ] `prefers-reduced-motion` respected
- [ ] `touch-action: manipulation` on buttons
- [ ] Hover states use `@media (hover: hover) and (pointer: fine)`
- [ ] Text, chips, and badges reflow at narrow widths without clipping
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] No P0 findings from Review Mode
- [ ] Semantic HTML and ARIA where needed
- [ ] Empty, loading, and error states all handled
- [ ] Dynamic numbers use `font-variant-numeric: tabular-nums`
- [ ] Headings have `text-wrap: balance`
- [ ] No `transition: all` anywhere
