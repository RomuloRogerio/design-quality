# Review Mode Guide

How to use Review Mode effectively — what to share, how to read the output, and what to do next.

---

## What to share

Review Mode works on:

| Input | Quality of audit |
|---|---|
| HTML + CSS source | Full audit — spacing, color tokens, accessibility attributes all visible |
| Screenshot | Visual audit only — can't confirm CSS values or ARIA attributes |
| Project folder | Full audit — skill reads main CSS/component files |
| URL (live page) | Full audit with browser tools available |
| Artifact link | Full audit — treated as HTML source |
| Text description | Not auditable — skill will ask for one of the above |

If you have the source, share it. Screenshots miss accessibility violations, `transition: all`, and spacing inconsistencies.

---

## Reading the output

### Slop Audit

Each finding is logged as:

```
[location] [what was found] — P0 / P1 / P2 / P3
```

Example:
```
Hero section: purple-to-blue gradient background — P1
Nav: emoji used as icons ("🏠", "📊", "⚙️") — P1
Card: shadow AND border combined — P2
.btn: transition: all 200ms — P2
Hero: "Revolutionize Your Workflow Today" — P1
```

### Scorecard

Eight dimensions, 1–10 each, with a one-line note.

A score of 7+ means the dimension is acceptable. Below 7, there's a specific issue. Below 5, there's a reference skill that goes deeper.

Example scorecard for a typical AI-generated SaaS dashboard:
```
Product fit:    4/10   Generic SaaS dark theme, no product-specific signal
Hierarchy:      6/10   Primary action identifiable but competing secondary elements
Clarity:        7/10   Labels mostly clear, one ambiguous CTA
Taste:          3/10   Template-recognizable, no memorable detail
Restraint:      4/10   Gradient blobs, glassmorphism panels, gradient text
Density:        6/10   Reasonable for a dashboard
Craft:          5/10   8px grid breaks in several places, hover states missing
Responsiveness: 3/10   No responsive consideration visible
Overall:        5/10
```

### Verdict

```
Best part: The spacing on the data table is clean and consistent.
Worst part: The interface could be from any SaaS product. No identity.
Required fix (P0): none
Quick wins (P1): Remove gradient background (5 min), swap emoji nav icons for Heroicons (15 min), rewrite hero copy to be product-specific (10 min)
```

---

## After the review

### Option 1: Fix everything

Say "fix all P0 and P1 issues." The skill enters Fix Mode and runs all 10 passes.

### Option 2: Fix specific issues

Say "fix the color issues and the icon issues." The skill runs Pass 2 (Color) and Pass 3 (Icons).

### Option 3: Deep-dive a dimension

If a dimension scores ≤ 5 and you want more detail than the review gave:

```
Hierarchy scores 4. Go deeper.
```

The skill uses the designer-skills index to find a matching deeper skill and applies it.

### Option 4: Just the scorecard, no fixes

Say "review only, don't suggest fixes." The skill produces the audit and scorecard and stops.

---

## Example review: landing page

**Input:** HTML source of a SaaS landing page

**Output:**

```
## Slop Audit

Hero: purple-to-blue gradient background (background: linear-gradient(135deg, #7c3aed, #2563eb)) — P1
Hero headline: gradient text on heading (.hero-title: background-clip: text; -webkit-text-fill-color: transparent) — P1
Hero copy: "Transform your business with AI-powered insights" — P1 (template copy, fits any product)
Features section: 3-column card grid with 6 identical cards (icon + heading + 2 sentences) — P1
Every section header: ALL CAPS with letter-spacing: 0.15em — P1
CTA buttons: all say "Get Started" — P2
Nav icons: emoji mixed with SVG (📊 beside a Heroicons svg) — P2
.card: both box-shadow and border-bottom combined — P2
.btn: transition: all 300ms — P2
Mobile: no responsive breakpoints visible in source — P3

## Template Check
Yes. Swap "ProductName" for any analytics SaaS and the UI fits. No World reference, no Signature.

## Scorecard
Product fit:    3/10   Dark blue gradient could be a security tool, a developer tool, or a productivity app
Hierarchy:      6/10   Primary CTA identifiable, but two "Get Started" buttons compete
Clarity:        7/10   Section labels are clear
Taste:          3/10   Immediate template recognition — gradient + features grid + all-caps
Restraint:      4/10   Gradient background, gradient text, blob decoration, glassmorphism card
Density:        7/10   Landing page density is appropriate
Craft:          5/10   Good intent, grid breaks in feature cards, missing hover states
Responsiveness: 3/10   No breakpoints, assumed desktop-only
Overall:        5/10

## Verdict
Best part: Information architecture is logical — Hero → Features → CTA flow works.
Worst part: Every visual choice is a template default. No product character.
Required fix (P0): none
Quick wins (P1): Remove gradient background, fix hero copy, replace features grid with real content
```

---

## Example review: app screen

**Input:** Screenshot of a React dashboard

**Output:**

```
## Slop Audit

Sidebar: glowing active state (box-shadow: 0 0 12px #7c3aed) — P2
Sidebar nav: sidebar background is a hue (bg-purple-950) on an app screen — P1
Stats row: 4 metric cards all with colored backgrounds (not the metric value, the card itself) — P1
Chart area: no chart visible — empty state is blank white space — P1
Table: hover states missing — P2
Table: transition: all on row hover — P2
Buttons: multiple primary buttons competing in the header area — P1
Mobile: no responsive layout visible — P3

## Template Check
Yes. This is the standard dark SaaS dashboard from the AI portfolio circuit. No World, no Signature.

## Scorecard
Product fit:    4/10   Dark purple SaaS — could be any operational tool
Hierarchy:      5/10   Primary action not obvious — multiple competing primaries
Clarity:        6/10   Labels clear, empty chart state confusing
Taste:          3/10   Immediate recognition as AI-generated dashboard template
Restraint:      5/10   Colored card backgrounds add noise without value
Density:        7/10   Density is appropriate for a dashboard
Craft:          5/10   Missing hover states, transition: all, glowing sidebar
Responsiveness: 4/10   No responsive evidence
Overall:        5/10

## Verdict
Best part: Table structure and column widths are well-considered.
Worst part: The purple sidebar and colored metric cards read as a template, not a product.
Required fix (P0): none
Quick wins (P1): Move sidebar background to near-neutral, make metric cards show data prominently with white backgrounds, add empty state to chart area
```

---

## Felt State Check

During review, the skill asks about emotional states at key moments:

- **Loading**: Is "Loading..." the copy, or does it say what's actually being loaded?
- **Empty state**: Is there just blank space, or an explanation + CTA?
- **Error**: Does the error blame the user, or explain what happened and how to recover?
- **Success**: Is success acknowledged, or silently absorbed?

Example findings:

```
Loading state: spinner with "Loading..." — should be "Getting your reports" — P2
Empty chart: blank white box, no explanation of how to get data in — P1
Error message: "Invalid request" (blames user for server error) — P1
Success: form submits with no confirmation — P2
```

---

## Peak-End Rule check

For flows with more than 2 steps, the skill maps the peak and the end:

- **Peak**: the order-placed moment, the first result, the submitted form — is it well-designed?
- **End**: the last screen the user sees — does it confirm clearly and feel complete?

Example:
```
Onboarding flow peak: "Add your first project" step — well-designed with clear CTA and example ✓
Onboarding flow end: redirects to empty dashboard with no explanation — P1
  Fix: end on a "You're set up" confirmation state with 2-3 suggested next steps
```
