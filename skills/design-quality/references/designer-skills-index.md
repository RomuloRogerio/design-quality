# Designer Skills Index

Map of the designer-skills collection (111 skills) organized by relevance to the design-quality-v2
workflow. Use this to find deeper expertise for a specific problem identified in Review or Fix Mode.

Source: `designer-skills-main` (full collection — 9 categories, 111 skills)

---

## When Review Mode finds something deep

Use these skills for a focused deep-dive when our scorecard flags a specific dimension.

| Our dimension / finding | Go deeper with |
|---|---|
| **Hierarchy ≤ 5** | `critique-visual-hierarchy` — entry point, eye flow, weight, emphasis |
| **Clarity ≤ 5** (affordances) | `critique-affordance` — clickability signals, state visibility, CTA clarity |
| **Clarity ≤ 5** (density) | `critique-information-density` — cognitive load, content priority, progressive disclosure |
| **Craft ≤ 5** (typography) | `critique-typography` — scale usage, readability, consistency, token compliance |
| **Craft ≤ 5** (color) | `critique-color` — contrast ratios, palette coherence, semantic meaning |
| **Craft ≤ 5** (layout) | `critique-composition` — balance, whitespace, rhythm, gestalt |
| **Taste ≤ 5** | `aesthetic-usability` — consistency as a trust signal |
| **Taste ≤ 5** (feels flat/cold) | `interfaces-that-feel` — felt-state translation, emotional timing principles |
| **Density ≤ 5** | `critique-information-density` |
| Emotional arc of a flow | `peak-end-rule` — peak moment + end moment design |
| Motion feels wrong | `animation-principles` — easing, duration taxonomy, sequencing |
| Accessibility fails | `accessibility-audit` (design-systems) |

---

## When Create Mode needs a specific component or pattern

| Situation | Skill |
|---|---|
| Form with multiple steps | `form-design` (interaction-design) |
| Navigation — choosing the pattern | `navigation-patterns` (interaction-design) |
| First-run / onboarding | `onboarding-design` (interaction-design) |
| Error messages and recovery | `error-handling-ux` (interaction-design) |
| Loading states (skeleton vs spinner) | `loading-states` (interaction-design) |
| Data tables, charts | `data-visualization` (ui-design) |
| Illustration style | `illustration-style` (ui-design) |
| Building color from scratch | `color-system` (ui-design) |
| Typography system | `typography-scale` (ui-design) |
| Spacing system | `spacing-system` (ui-design) |
| Icon library rules | `icon-system` (design-systems) |
| Dark mode translation | `dark-mode-design` (ui-design) |
| Multi-brand / theming | `theming-system` (design-systems) |
| Multi-locale / localization | `localization-design` (design-systems) |
| Touch sizing / target design | `fitts-law` (interaction-design) |
| Motion — product-wide tokens | `motion-system` (design-systems) |

---

## When Fix Mode exposes a structural problem

| Problem pattern | Skill |
|---|---|
| "Why does this work but feel cold?" | `interfaces-that-feel` |
| "The peak moment is forgettable" | `peak-end-rule` |
| "Users miss the primary action" | `critique-affordance` → `hicks-law` |
| "Everything reads the same weight" | `critique-visual-hierarchy` → `von-restorff-effect` |
| "Layout feels off but hierarchy is fine" | `critique-composition` |
| "Screen is overwhelming" | `critique-information-density` → `millers-law` |
| "They're not recognising the pattern" | `jakobs-law` (when innovating on familiar patterns) |
| "The design works but tests badly" | `aesthetic-usability` |
| "Perceived performance feels slow" | `doherty-threshold` |

---

## Ship and Validate

| When | Skill |
|---|---|
| Handing off to engineering | `handoff-spec` (design-ops) |
| Post-implementation check | `design-qa-checklist` (design-ops) |
| Accessibility formal audit | `accessibility-audit` (design-systems) |
| Formal usability audit (no users) | `heuristic-evaluation` — Nielsen's 10 heuristics, severity 0–4 |
| Concept selection (multiple directions) | `concept-selection` (prototyping-testing) |
| Measuring impact | `design-impact-reporting` (design-ops) |

---

## Nielsen's 10 Heuristics (quick reference)

For formal audit reports — use when a stakeholder needs a structured, named framework.

1. Visibility of system status
2. Match real world (system speaks users' language)
3. User control and freedom (undo and exit)
4. Consistency and standards
5. Error prevention
6. Recognition over recall
7. Flexibility and efficiency (shortcuts for experts)
8. Aesthetic and minimalist design
9. Error recovery
10. Help and documentation

Severity scale: 0 = no problem · 1 = cosmetic · 2 = minor · 3 = major · 4 = catastrophe.

---

## The visual-critique skills at a glance

The 6 visual-critique skills each audit one dimension with four sub-dimensions and an Observation → Problem → Fix format. They are complementary to our scorecard, not a replacement.

| Skill | Audits | Our scorecard dimension |
|---|---|---|
| `critique-visual-hierarchy` | Entry point, Eye flow, Weight, Emphasis | Hierarchy |
| `critique-affordance` | Clickability, State visibility, CTA clarity, Discoverability | Clarity |
| `critique-color` | Contrast, Palette coherence, Semantic use, Accessibility | Craft (color) |
| `critique-composition` | Balance, Whitespace, Rhythm, Gestalt | Craft (layout) |
| `critique-typography` | Scale usage, Readability, Consistency, Tokens | Craft (type) |
| `critique-information-density` | Cognitive load, Priority, Scanning, Progressive disclosure | Density |
