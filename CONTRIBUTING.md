# Contributing

## What this project needs

- New slop signs (patterns you've seen AI generate that aren't in the catalog)
- Corrections to severity ratings (a sign you think is P1 but is rated P2, with a reason)
- New quality dimensions (with a rubric for what 1–10 looks like)
- Translations (the skill prompt in `SKILL.md` and reference files in `references/`)
- Documentation improvements (examples in `docs/`, clarifications in `SKILL.md`)

## Adding a slop sign

Slop signs live in `skills/design-quality/references/slop-signs.md`.

Each sign is a row in a table with two columns: the sign and the typical severity.

```markdown
| Sign description | P0 / P1 / P2 / P3 |
```

**Severity guide:**
- **P0** — breaks usability or readability. A user cannot complete their task.
- **P1** — makes the interface look clearly AI-generated.
- **P2** — weakens the craft but doesn't break usability.
- **P3** — nice-to-have polish improvement.

**What makes a good slop sign:**

1. It is observable — someone reviewing a screenshot or CSS could find it without running the app.
2. It is specific — "bad spacing" is not a slop sign. "Padding inconsistent across sibling components" is.
3. It is common enough to scan for — the catalog is used as a checklist during audits. If a sign appears once a year, it doesn't belong here.
4. It is something AI specifically over-produces — not just a general design mistake.

**What is NOT a slop sign:**

- A violation that applies equally to human-designed interfaces (those belong in a general design audit checklist, not this catalog)
- A code smell without visual consequence (belongs in a linting config, not here)
- A personal taste preference

**Format:**

Add to the existing section that best fits. If it doesn't fit any section, propose a new section in the PR description.

```markdown
| The sign, described concisely and observably | P1 |
```

## Proposing a new quality dimension

The 8 dimensions in Review Mode are:
Product fit, Hierarchy, Clarity, Taste, Restraint, Density, Craft, Responsiveness.

A new dimension needs:

1. A question it asks — one sentence, matching the format of existing dimensions.
2. A scoring rubric — what 9–10 looks like, what 5–6 looks like, what 1–2 looks like. Match the format in `references/quality-dimensions.md`.
3. A failure flag — one specific observable situation that would be a failure even if other scores look ok.
4. An argument for why it is separate from existing dimensions — why it cannot be captured by the current 8.

Open an issue first to discuss before writing the full rubric. Most dimension proposals turn out to fit inside an existing one once reviewed.

## Adding a translation

Translations live at the repository root:
- `README.md` — English (canonical)
- `README.pt-BR.md` — Brazilian Portuguese

To add a translation:

1. Create `README.[locale].md` at the root.
2. Translate the content — do not cut sections for brevity.
3. Add a link to it in `README.md` under a "Languages" section (if one doesn't exist yet, add it before the "Contributing" section).

The skill prompt in `SKILL.md` and the reference files in `references/` are kept in English only, because they are read by the AI model at inference time and localizing them would require the user to have a locale-aware skill loading mechanism.

## Adding documentation examples

`docs/` contains three guides:
- `review-guide.md` — how to use Review Mode with real examples
- `fix-mode-walkthrough.md` — a complete Fix Mode run from P0 to done
- `slop-field-guide.md` — visual catalog of slop signs with examples

Good documentation examples:
- Use real-looking code, not toy examples
- Show both the before and the after
- Explain why the fix works, not just what to change
- Reflect actual AI output patterns, not invented ones

## Pull request process

1. Fork the repository.
2. Make changes on a branch named `fix/`, `feat/`, or `docs/` depending on the type.
3. In the PR description:
   - For slop signs: explain where you first saw this, how often you see it, and why the severity is what you think it is.
   - For dimension proposals: include the full discussion from the issue.
   - For translations: note which sections you omitted and why (ideally: none).
4. The PR description is where the judgment goes. The change itself should be minimal and clear.

## What gets rejected

- Slop signs that describe general design mistakes rather than AI-specific patterns
- Severity changes without rationale
- Dimension proposals that can be accommodated by an existing dimension
- Translations with sections cut for brevity
- Documentation that adds length without adding examples
