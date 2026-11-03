# Changelog

## v2.0.0

### New in v2

**Four modes instead of one**

v1 was a review-only skill. v2 adds Create Mode, Fix Mode, and Polish Mode.

- **Create Mode** — gates on product direction before writing any UI. Requires five lines (Product, Character, World, Moments, Signature) confirmed before any code is written. Includes PROJECT_DESIGN.md for cross-session persistence.
- **Fix Mode** — ten sequential passes. Each pass is a complete unit; do not start pass 2 before finishing pass 1.
- **Polish Mode** — for interfaces that are mostly designed but feel slightly off. Includes the 10%-speed DevTools technique.

**Gate 0: Input resolver**

v1 assumed HTML/CSS was always available. v2 explicitly resolves what was shared before starting: screenshot, HTML source, project folder, URL, artifact link, or text description. Different inputs have different audit capabilities.

**Context type detection**

v1 applied the same rules to apps and landing pages. v2 distinguishes:
- **App screen** — density governs; header is small; action IS the content
- **Page** — more creative license; hero matters; sections and rhythm

Different heuristics apply in each.

**Design Dials**

Three knobs added to direction proposals: Variance / Motion / Density (1–10 each). Gives a quick visual signal on the intended character of each direction.

**Felt State Check**

New section in Review Mode. Asks what the user is feeling at loading, empty, error, and success states — and checks whether the interface acknowledges those feelings.

**Peak-End Rule check**

For multi-step flows, maps the peak moment and the final state. Ending on an administrative screen or unresolved error → P1.

**Accessibility & Touch passes**

v1 had basic accessibility flags. v2 adds:
- Dedicated Accessibility & Touch pass (Pass 8) in Fix Mode
- `@media (hover: hover) and (pointer: fine)` guard for hover effects
- `touch-action: manipulation` on all buttons
- `overscroll-behavior: contain` on modals and drawers
- 44px minimum touch targets

**Performance quick checks**

- `transition: all` on layout properties → P2
- Lists >50 items without virtualization → P2
- Images without explicit `width`/`height` → P2

**Motion pass (Pass 10)**

v1 had no motion guidance. v2 adds a full Motion pass with:
- Duration taxonomy (Micro 50–100ms / Short 150–250ms / Medium 250–400ms / Long 400–700ms)
- CSS transitions over keyframes rule for interactive elements
- Icon state crossfade pattern (opacity + scale 0.25 + blur 4px)
- `prefers-reduced-motion` requirement on every animated element

**Designer Skills Index reference**

New reference file mapping each of the 8 scorecard dimensions to a deeper skill from the designer-skills collection. When a dimension scores ≤ 5, there is a matching skill that goes deeper.

**OKLCH color tokens**

v2 recommends OKLCH (`oklch(L% C H)`) for new color tokens — perceptually uniform, easier to adjust than hex or hsl.

**IMAGE outline polish technique**

1px outline on images using pure black/white (`oklch(0 0 0 / 0.1)`) instead of tinted neutrals, which absorb the surface color.

**Pre-delivery checklist**

17-item checklist added to ensure nothing is missed before marking a UI done.

---

## v1.0.0

Initial release.

- Review Mode: slop audit + 8-dimension scorecard + P0–P3 fix list
- Slop catalog: Color & Effects, Typography, Layout & Structure, Icons, Components & Interaction, Copy & Content, Template Identity Check, Accessibility & Technical
- 8 scoring dimensions: Product fit, Hierarchy, Clarity, Taste, Restraint, Density, Craft, Responsiveness
- Quality dimensions scoring guide with rubric per dimension
- Micro-polish reference: concentric radii, optical alignment, shadows, press animation, icon rules, typography details, image outlines, transitions, touch & pointer, animations, hit areas
