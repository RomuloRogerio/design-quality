---
name: design-quality
description: >-
  Full-cycle design quality skill for AI-generated interfaces: evaluate, critique, fix, and apply a
  brand. Detects AI slop (purple gradients, gradient text, glows, emoji icons, card-grid filler,
  Inter-everything typography, generic layouts) and guides creation with a product direction
  framework. Reads brand kits (identity manual / MIV / brand guidelines PDF, tokens JSON, logo
  files, brand applications) into a BRAND.md profile and checks brand fidelity. Use WHENEVER:
  reviewing or auditing a UI; asking if it looks AI-generated, templated, or generic; creating a
  page, dashboard, app screen, or landing page; redesigning, unslopping, or polishing a screen;
  sharing a brand manual, logo, or brand tokens; applying or checking a brand on an interface.
  Works on React, Tailwind, HTML/CSS, Vue, Svelte. Triggers on: "review this design", "does this
  look AI?", "unslop", "make it less generic", "design this screen", "polish this", "redesign",
  "here is our brand manual", "apply my brand", "use this logo", "is this on brand?".
---

# Design Quality v2

A full-cycle skill for creating and evaluating interface design. For existing interfaces, it audits
and scores. For new ones, it sets a direction and ensures the craft is there. For broken ones, it
applies fixes pass by pass. When a brand kit exists, it reads the brand first and every mode works
inside it.

This version uses specialized subagents for Review Mode and Fix Mode — parallel where possible,
deep-diving automatically when a dimension scores ≤ 5.

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
| Brand kit (identity manual / MIV, tokens JSON, logo files, application images) | Run Brand Mode first, then the requested mode |
| Text description only | Ask for at least one of the above before scoring; describe what's missing |

Also check for a brand: a `BRAND.md` in the project root, or a brand kit (a `brand/` folder, a
manual PDF, logo files, a tokens JSON). A kit without `BRAND.md` means Brand Mode runs before
anything else.

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
| "here is our brand manual", "apply my brand", "use this logo", a tokens JSON or MIV shared | **brand** (then the mode they asked for) |

If a `BRAND.md` file exists in the project root, read it first. It holds the confirmed brand
profile: logo rules, colors, fonts, voice, exceptions, and protected tokens.

If a `PROJECT_DESIGN.md` file exists in the project root, read it next. It contains the approved
direction, palette, and Signature — don't override it without asking.

### Source of truth

When sources disagree, the higher one wins:

1. The user's explicit words in this conversation
2. The brand identity manual (MIV / brand guidelines), cited by page
3. `BRAND.md` and `brand/tokens.normalized.json`
4. `PROJECT_DESIGN.md`
5. This skill's defaults and slop rules

Accessibility minimums (contrast, focus, labels, touch targets) are never waived silently. When the
brand conflicts with them, keep the brand value and change how it is used. See the Contrast section
of `references/brand-intake.md`.

---

## Agent Architecture

For Review Mode and Fix Mode, dispatch specialized subagents rather than doing all work serially.
This produces deeper analysis in less time.

### When to use agents

- **Review Mode** on any real UI input → always dispatch 3 parallel review agents
- **Review Mode with a `BRAND.md`** → add a 4th parallel agent: Brand Fidelity
- **Any dimension scoring ≤ 5** → auto-dispatch the matching deep-dive agent after the scorecard
- **Fix Mode** → dispatch a dedicated fix agent per pass (passes 3 and 4 in parallel)
- **Create Mode Gate 1** → optionally dispatch a direction research agent when product URL or category is known

### Fork vs fresh

- **`subagent_type: "fork"`** — for review and fix agents that need the full conversation context (the UI input, screenshots, code)
- **Default (fresh)** — for direction research agents that don't need the conversation history

### Agent prompt files

Full prompt templates are in `references/agents/`. Reference them when dispatching — each file
is self-contained with the instructions and output format for that agent.

---

## Brand Mode

Turns a brand kit into a confirmed brand profile that every other mode obeys. Run it when a brand
kit is shared and no `BRAND.md` exists, or when the kit changed.

Expected kit:

```
brand/
  miv.pdf          brand identity manual (PDF or page images)
  tokens.json      design tokens or brand JSON, any shape
  logos/           SVG preferred, PNG accepted
  applications/    photos or screenshots of the brand applied
```

Files attached in the conversation count too. Full instructions: `references/brand-intake.md`.

1. **Inventory** every brand file
2. **Read the manual** in page ranges; record the page for every rule
3. **Read the JSON** in any shape and normalize it to W3C DTCG tokens
4. **Inventory the logos**: versions, colors, backgrounds, file health
5. **Read the applications** for patterns, not pixels
6. **Write** `BRAND.md` and `brand/tokens.normalized.json`, with conflicts and open questions listed
7. Ask: *"Is this brand profile correct before I use it?"* Stop. Wait.

Never edit, rename, or overwrite the user's brand files.

**Logo rule for every mode:** use the provided logo file. Never rebuild it with text, CSS, or a
redrawn SVG; never recolor, stretch, rotate, crop, or add effects.

---

## Review Mode

Audit, score, and prioritize. No code changes without asking first.

### Step 0: Dispatch the Parallel Review Agents

Before doing any analysis yourself, dispatch all agents in one message using the Agent tool: three
agents, or four when a `BRAND.md` exists. All are forks — they inherit full conversation context
including the UI input.

**Agent 1 — Slop Auditor**
Prompt template: `references/agents/review-slop.md`
Task: slop audit, template check, accessibility, mobile/touch, performance quick checks.

**Agent 2 — Scorecard Scorer**
Prompt template: `references/agents/review-scorecard.md`
Task: score all 8 dimensions 1–10 with reasoning per score.

**Agent 3 — Emotion Analyst**
Prompt template: `references/agents/review-emotion.md`
Task: Felt State Check across all key states + Peak-End Rule mapping.

**Agent 4 — Brand Fidelity** *(only when `BRAND.md` exists)*
Prompt template: `references/agents/review-brand.md`
Task: logo, color, typography, graphic elements, voice, and applications checked against `BRAND.md`.

Wait for all agents to complete, then proceed to Step 1.

### Step 1: Synthesize

Merge the agents' outputs into the standard output format.
Deduplicate findings that appear in multiple agents. If agents disagree on a score, use the lower
value and note the disagreement. Remove from the Slop Audit any pattern that Agent 4 lists under
"Brand exceptions used correctly".

```
## Slop Audit
[from Agent 1 — each finding with location and severity]

## Template Check
[from Agent 1]

## Scorecard
Product fit:    X/10   [from Agent 2 — one-line note]
Hierarchy:      X/10
Clarity:        X/10
Taste:          X/10
Restraint:      X/10
Density:        X/10
Craft:          X/10
Responsiveness: X/10
Brand fidelity: X/10   [from Agent 4 — only when BRAND.md exists]
Overall:        X/10

## Emotional Design
[from Agent 3 — Felt State + Peak-End findings]

## Brand Fidelity
[from Agent 4 — only when BRAND.md exists: findings with MIV page, exceptions used correctly,
open questions]

## Verdict
Best part:
Worst part:
Required fix (P0): [if any — otherwise "none"]
Quick wins (P1): [top 3 at most]
```

After the output, ask whether to apply any of the fixes.

### Step 2: Auto Deep-Dive

After the scorecard is shown, check every dimension. For any that scored ≤ 5, auto-dispatch the
matching deep-dive agent without waiting to be asked.

See `references/agents/deepdive-dispatch.md` for the dispatch table and prompt templates.

Announce before dispatching: "Hierarchy scored 4 — dispatching a focused visual-hierarchy critique."

**Deep-dive map:**

| Dimension / finding | Skill to dispatch |
|---|---|
| Hierarchy ≤ 5 | `critique-visual-hierarchy` skill |
| Clarity ≤ 5 (affordances) | `critique-affordance` skill |
| Clarity ≤ 5 (density) | `critique-information-density` skill |
| Craft ≤ 5 (typography) | `critique-typography` skill |
| Craft ≤ 5 (color) | `critique-color` skill |
| Craft ≤ 5 (layout) | `critique-composition` skill |
| Taste ≤ 5 (feels flat) | `interfaces-that-feel` skill |
| Density ≤ 5 | `critique-information-density` skill |
| Emotional arc issues | `peak-end-rule` skill |
| Brand fidelity ≤ 5 | No external skill: re-read `BRAND.md`, then offer Fix Mode passes 2, 4, 5, and 9 with the brand guard |

---

## Create Mode

Before writing any UI, follow this sequence. Each step is a gate — stop and confirm before moving on.

### Gate 0: Context type

State which applies before proceeding:
- **App screen** — tool, dashboard, data product. Density, actions, and states govern.
- **Page** — landing, editorial, marketing. Composition, rhythm, and sections govern.

### Gate 1: Product Research Agent (optional but recommended)

If the product has a URL, name, or belongs to a known category, dispatch a research agent before
asking the user for product understanding. This saves a round-trip and surfaces domain-specific
conventions the user might not think to mention.

Prompt template: `references/agents/direction-research.md`

If no URL or category is known, skip this step and ask the user directly.

Check for a `BRAND.md` in the project root. If it exists, read it: logo, palette, typography, and
voice are fixed by the brand, and the direction works inside them. If a brand kit exists without
`BRAND.md`, run Brand Mode first.

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
- **Moments**: 1–2 places on the screen where the design gets rich and specific.
  Everything else stays quiet so these read instantly.
- **Signature**: One small detail only this product would have, repeated consistently.

**With a `BRAND.md`:**
- Character starts from the manual's personality words. If those words are on the banned list,
  translate them into concrete terms ("modern" in the manual → what it means for this brand).
- World can come from the brand's graphic elements and imagery.
- Signature is built from an approved brand element or graphic, never from a new logo treatment.
- Palette and typography are not proposed. They come from `BRAND.md`.

Present 1–3 directions. For each, show three **Design Dials**:

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

## Brand
Source: BRAND.md (confirmed [date]) — or "none"
With a brand, Palette and Typography below point to BRAND.md tokens instead of new values.

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

### Design Principles

With direction confirmed, apply in this order (earlier passes affect later ones):

#### Spacing — establish first
- 8px grid. All margins, paddings, gaps: multiples of 4 or 8. (`mt-[13px]` → fix it.)
- Same element = same size. All list rows share one height and one gap.
- Space shows grouping: inner < outer. A section label sits closer to its own items than to the one above.
- Navigation is densest: rows 32–36px, 2–4px between them.

#### Color
- One neutral ramp, tinted toward the World. Backgrounds, surfaces, borders, text all from that ramp.
- One accent, used rarely: primary action, selection, or the one number that matters.
- Three text roles: primary, secondary, muted. Never ten slightly different grays.
- **Banned**: hue gradients on surfaces, gradient text, colored glows, colored shadows, radial blobs, neon borders.
  The only exception is a pattern listed under "Brand exceptions" in `BRAND.md`, used where the manual allows it.
- Accent with text on it: ≥ 4.5:1 contrast.
- Prefer OKLCH for new color tokens: `oklch(L% C H)`.
- With a brand: brand colors fill the accent and brand roles exactly as written in `BRAND.md`. Never
  shift a brand color to fix contrast; change how it is used.

#### Typography
- With a brand: use the brand families, weights, and fallback from `BRAND.md`.
- Pair a distinctive display font with a clean body font. Maximize weight contrast.
- `text-wrap: balance` on all headings (h1–h3). `text-wrap: pretty` on body and list text.
- `-webkit-font-smoothing: antialiased` on `:root` or `html`.
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

#### Anti-Generic Guardrail
If the design would look impressive in a portfolio screenshot but make the product less clear, reject it.

### After Building

Run Review Mode (with agents). Done when: no P0 findings, overall ≥ 7/10, product fit ≥ 7/10, and
brand fidelity ≥ 7/10 when a `BRAND.md` exists.

---

## Fix Mode

Run Review Mode first to get the scorecard. Then dispatch fix agents in pass order.

**Execution order:**
- Passes 1, 2 → sequential (spacing first, then color)
- Pass 3 + Pass 4 → **parallel** (icons and copy are independent)
- Passes 5–10 → sequential

See `references/agents/fix-passes.md` for each pass's agent prompt template.

**Brand guard:** when a `BRAND.md` exists, pass its "Protected tokens" and "Brand exceptions"
sections to every fix agent. No pass may change a brand color, a brand font family, a logo file, or
how the logo is drawn, and no pass may remove a documented brand exception. Off-brand values are
replaced with the nearest `BRAND.md` token, never with a new color.

For each pass, announce what the agent is doing and report per pass: what changed and what still
needs attention.

**Pass order:**
1. **Spacing** — 8px grid alignment, rhythm, grouping
2. **Color** — remove slop, build from neutral ramp
3. **Icons** — one set, one size, one stroke, currentColor *(parallel with Copy)*
4. **Copy** — remove emoji labels, calm the shouting, make it product-specific *(parallel with Icons)*
5. **Typography** — hierarchy, weights, `text-wrap: balance`, `text-wrap: pretty`, antialiasing, `tabular-nums`
6. **Layout** — alignment, density
7. **Details** — concentric radii, shadows, borders
8. **Accessibility & Touch** — focus states, `aria-label`, `touch-action: manipulation`, 44px targets, `overscroll-behavior`
9. **Visuals** — empty state illustrations, icon consistency, image aspect ratios. See `references/passes-visuals.md`
10. **Motion** — last pass, only where it adds meaning. See `references/passes-motion.md`

After all passes: run Review Mode agents again to verify. Report delta from original scorecard.

---

## Polish Mode

For interfaces that are mostly well-designed but feel slightly off.

Technique: slow the interface to 10% speed in browser DevTools (Animations panel) and walk every
state: hover, focus, active, loading, empty. What feels off at 10% is what's subtly wrong at full speed.

See `references/micro-polish.md` for specific values.

**Quick checklist:**
- [ ] Concentric border radius: outer = inner + padding
- [ ] Optical alignment over geometric (buttons with icons, asymmetric shapes)
- [ ] `scale(0.96)` on press — never smaller than 0.95
- [ ] Icon stroke matches text weight: 1.5px beside regular (400), 2px beside semibold (600)
- [ ] `font-variant-numeric: tabular-nums` on any dynamically updating numbers
- [ ] `text-wrap: balance` on all headings (h1–h3)
- [ ] `text-wrap: pretty` on paragraphs, list items, card descriptions
- [ ] `-webkit-font-smoothing: antialiased` on `:root`
- [ ] `touch-action: manipulation` on all buttons
- [ ] Hover effects wrapped in `@media (hover: hover) and (pointer: fine)`
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
- [ ] With a brand: the logo is the provided file, in the right version, with clear space and minimum size kept
- [ ] With a brand: every color and font maps to `BRAND.md` or the neutral ramp
- [ ] With a brand: no P0 or P1 finding from the Brand Fidelity agent
