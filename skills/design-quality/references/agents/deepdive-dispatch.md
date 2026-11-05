# Deep-Dive Dispatch

Auto-dispatch these agents when the matching dimension scores ≤ 5 in Review Mode.
Announce before dispatching: "[Dimension] scored [N] — dispatching a focused [skill-name] critique."

Dispatch as a fork agent (inherits conversation context including the UI input).

## Dispatch table

| Dimension ≤ 5 | Skill to invoke | Prompt instruction to pass |
|---|---|---|
| Hierarchy | `critique-visual-hierarchy` | "Run a full visual hierarchy critique on the interface in this conversation. Cover: entry point, eye flow, visual weight, emphasis. Use the Observation → Problem → Fix format." |
| Clarity (affordances) | `critique-affordance` | "Run a full affordance critique on the interface in this conversation. Cover: clickability signals, state visibility, CTA clarity, discoverability. Use Observation → Problem → Fix." |
| Clarity (density) | `critique-information-density` | "Run a full information density critique on the interface in this conversation. Cover: cognitive load, content priority, scanning patterns, progressive disclosure. Use Observation → Problem → Fix." |
| Craft — typography | `critique-typography` | "Run a full typography critique on the interface in this conversation. Cover: scale usage, readability, consistency, token compliance. Use Observation → Problem → Fix." |
| Craft — color | `critique-color` | "Run a full color critique on the interface in this conversation. Cover: contrast ratios, palette coherence, semantic color use, accessibility. Use Observation → Problem → Fix." |
| Craft — layout | `critique-composition` | "Run a full composition critique on the interface in this conversation. Cover: balance, whitespace, rhythm, gestalt principles. Use Observation → Problem → Fix." |
| Taste (feels flat/cold) | `interfaces-that-feel` | "Run a full emotional design critique on the interface in this conversation. Focus on felt-state translation and emotional timing principles." |
| Density | `critique-information-density` | Same as Clarity (density) above. |
| Emotional arc issues | `peak-end-rule` | "Apply the Peak-End Rule framework to this interface's flow. Identify the peak and end moments, evaluate their design quality, and recommend improvements." |
| Brand fidelity (only with `BRAND.md`) | none | Do not dispatch. Re-read `BRAND.md`, list the Brand Fidelity findings by severity, and offer Fix Mode passes 2, 4, 5, and 9 with the brand guard. |

## Multiple low-scoring dimensions

If 3 or more dimensions score ≤ 5, dispatch all matching agents in parallel in one message.
Report results one by one as they come in, then synthesize into a priority fix list.

## After deep-dive completes

Append the deep-dive findings to the Review output under a new section:

```
## Deep-Dive: [Dimension]
[agent output — keep the Observation → Problem → Fix structure]
```

Then ask: "Based on the deep-dive, do you want to go straight to Fix Mode?"
