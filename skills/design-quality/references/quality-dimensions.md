# Quality Dimensions Scoring Guide

Rubric for the 8-dimension scorecard. Use during Review Mode.

---

## Product Fit (1–10)

Does the visual direction match the product's actual job and audience?

| Score | Meaning |
|---|---|
| 9–10 | Only this product could look like this. The visual reflects its specific users, content, and purpose. |
| 7–8 | Clearly aligned with the product category. A few generic choices but nothing that misfires. |
| 5–6 | Could belong to a few different products. Safe but not specific. |
| 3–4 | Generic SaaS style applied regardless of what the product actually does. |
| 1–2 | The design actively contradicts the product (fun colors on a medical tool, dark cockpit on a recipe app). |

Red flag: a reference style is visible but the product's own identity is weaker for it.

---

## Hierarchy (1–10)

Can the user see what matters first, second, third?

| Score | Meaning |
|---|---|
| 9–10 | Immediate. The primary action is obvious, secondary actions recede, and tertiary elements are discoverable but not competing. |
| 7–8 | Clear hierarchy with minor exceptions (one secondary element fighting for attention). |
| 5–6 | Some hierarchy but requires effort to parse. Multiple things competing at the same visual weight. |
| 3–4 | Flat. Everything feels equally important. |
| 1–2 | Inverted — decorative elements draw more attention than functional ones. |

---

## Clarity (1–10)

Are labels, actions, data, and states easy to understand?

| Score | Meaning |
|---|---|
| 9–10 | No ambiguity anywhere. Every label names exactly what it does. States (hover, active, disabled, loading, error) are all distinct. |
| 7–8 | Mostly clear. One or two labels that could be more specific. |
| 5–6 | Some guessing required. Empty/loading/error states missing or unclear. |
| 3–4 | Labels are generic ("Submit", "Option 1"). Multiple states look identical. |
| 1–2 | User cannot reliably determine what the interface is for or what to do next. |

---

## Taste (1–10)

Does it feel intentional without looking templated?

| Score | Meaning |
|---|---|
| 9–10 | Specific design decisions made with conviction. No default choices. A visible point of view. |
| 7–8 | Mostly intentional. One or two choices that feel like defaults. |
| 5–6 | Competent but could be generated from a template. No memorable detail. |
| 3–4 | Recognizably from a component library or AI default with no customization. |
| 1–2 | Instant template identification. Zero design judgment. |

---

## Restraint (1–10)

No unnecessary decoration, filler, or style cosplay?

| Score | Meaning |
|---|---|
| 9–10 | Every element earns its place. Nothing added for visual interest alone. |
| 7–8 | Mostly restrained with one or two decorative additions that don't hurt. |
| 5–6 | Some unnecessary elements (filler cards, decorative blobs, unused sections). |
| 3–4 | Significant decoration that doesn't serve the product. |
| 1–2 | Heavy decoration that actively competes with content and reduces usability. |

Red flag: a design that would look impressive in a portfolio screenshot but makes the product less clear.

---

## Density (1–10)

Is the amount of information right for the task?

| Score | Meaning |
|---|---|
| 9–10 | Perfect calibration. Operational tools are dense and efficient; discovery surfaces have breathing room. |
| 7–8 | Mostly appropriate. One area either too cramped or too sparse. |
| 5–6 | Noticeable mismatch. A dashboard with too much whitespace, or a landing page that's information-dense to the point of exhaustion. |
| 3–4 | Wrong density for the product type. |
| 1–2 | Impossible to use — either can't find information in the noise, or the page is effectively empty. |

---

## Craft (1–10)

Spacing, type, alignment, contrast, component states — are they polished?

| Score | Meaning |
|---|---|
| 9–10 | Pixel-consistent. 8px grid everywhere. All states (hover, focus, active, disabled, loading, empty) handled. Contrast checked. |
| 7–8 | High craft with a few minor inconsistencies. |
| 5–6 | Good intent but uneven execution. Some grid breaks, missing states, or inconsistent spacing. |
| 3–4 | Visible craft issues. Misalignments, missing hover states, broken focus indicators. |
| 1–2 | No discernible grid or type system. Components feel unfinished. |

---

## Responsiveness (1–10)

Does the design survive mobile and narrow layouts?

| Score | Meaning |
|---|---|
| 9–10 | Works at 375px, 768px, 1024px, 1440px. Mobile layout is thoughtful, not just stacked. Navigation adapts appropriately. |
| 7–8 | Works at most breakpoints with minor issues at one. |
| 5–6 | Desktop-first with a functional but rough mobile layout. Some overflow or cramping. |
| 3–4 | Mobile layout is broken or extremely cramped. Touch targets too small. |
| 1–2 | No responsive consideration. Unusable on mobile. |

---

## Brand Fidelity (1–10) — only when a `BRAND.md` exists

Does the interface follow the brand's documented rules?

This is separate from Product fit. Product fit asks whether the design suits the product's job.
Brand fidelity asks whether it follows the brand manual. A screen can fit the product perfectly
and still use the wrong logo version and three off-brand colors.

Scored by the Brand Fidelity agent (`agents/review-brand.md`).

| Score | Meaning |
|---|---|
| 9–10 | Every color, font, and graphic traces back to BRAND.md. Logo used perfectly. Voice is unmistakably the brand's. |
| 7–8 | Faithful, with minor drift: one off-brand neutral, a small clear space violation. |
| 5–6 | Several off-brand colors or fonts, or one P1 logo misuse. |
| 3–4 | The brand is recognizable only by the logo. The color and type system is ignored. |
| 1–2 | Logo misused at P0, or the design contradicts the brand. |

Red flag: the logo rebuilt as text or CSS. That is a P0 even if every other score is high.
