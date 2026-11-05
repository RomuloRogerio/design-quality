# Brand Intake

How to turn a brand kit into a confirmed brand profile. Used by Brand Mode, and read by Create,
Review, and Fix Mode whenever a `BRAND.md` exists.

A brand identity manual is also called brand guidelines, brand book, or brand manual. In Brazil
it is the **MIV** (Manual de Identidade Visual).

---

## The brand kit

Expected layout in the project:

```
brand/
  miv.pdf          brand identity manual (any file name; PDF or page images)
  tokens.json      design tokens or a brand JSON, any shape
  logos/           logo files; SVG preferred, PNG accepted
  applications/    photos or screenshots of the brand applied
```

Also accept:
- Files attached directly in the conversation
- Portuguese folder names: `aplicacoes/`, `logotipos/`, `logos/`
- A manual split into one image per page

Find a kit with these globs: `brand/**`, `**/*{miv,MIV}*`, `**/*{guideline,brandbook,brand-book,manual}*.pdf`,
`**/*tokens*.json`, `**/logo*.{svg,png}`.

Never edit, rename, or overwrite the user's source files. Everything you produce is new.

---

## What Brand Mode produces

| File | Where | Content |
|---|---|---|
| `BRAND.md` | project root, next to `PROJECT_DESIGN.md` | The brand profile, using the template below |
| `tokens.normalized.json` | inside `brand/` (create the folder if the kit came as attachments) | Brand tokens in W3C Design Tokens (DTCG) format |

---

## Step 1: Inventory

List every brand file: path, type, and what it appears to be. This becomes the **Sources** table in
`BRAND.md`. Note anything unreadable (password-protected PDF, corrupt image, empty JSON).

---

## Step 2: Read the manual

- Read PDFs in page ranges of at most 20 pages. For long manuals, read the table of contents
  first, then the sections listed below.
- Read page images visually, one by one.
- Record the page number next to every rule you extract. Findings later cite it.

Extract:

| Topic | What to record |
|---|---|
| Essence | Personality words, values, tone of voice, tagline |
| Logo versions | Primary, horizontal, vertical, symbol, wordmark; positive, negative, monochrome |
| Clear space | The rule and its unit (often "x = height of a letter in the wordmark") |
| Minimum size | Screen size in px and print size in mm, per version |
| Logo backgrounds | Which version goes on which background; photo rules |
| Logo prohibitions | Distort, rotate, recolor, outline, shadow, glow, rearrange, busy backgrounds |
| Colors | Name, role (primary, secondary, support, neutral), HEX, RGB, CMYK, Pantone |
| Color proportion | Usage ratio if stated (for example 60 / 30 / 10) and approved combinations |
| Official gradients | Stops, angle, and the contexts where the manual allows them |
| Typography | Families, weights, roles (headline, body, support), fallback, license hints |
| Graphic elements | Patterns, shapes, frames, icon style, and where they appear |
| Imagery | Photo treatment, illustration style |
| Applications | What the manual shows: cards, social, signage, screens |
| Explicit don'ts | Every prohibition, quoted as written |

### Color values

Copy values exactly as printed. Do not round, and do not sample a color from a rendered PDF when
the manual prints the value.

Priority for screen color:
1. HEX or RGB printed in the manual
2. `tokens.json`
3. The fill of the official SVG logo
4. A value sampled from an image (mark it `sampled`)

If the manual gives only CMYK or Pantone, convert it, mark the result `approximate`, and ask the
user for the official screen value. Print conversions shift hue; never present them as official.

---

## Step 3: Read the JSON

Accept any shape. The common ones:

| Shape | How to recognize it |
|---|---|
| W3C DTCG | Keys `$value` and `$type` |
| Tokens Studio (Figma) | Keys `value` and `type`, references like `{color.primary}` |
| Style Dictionary | Nested groups with `value`, often `color.base.red.value` |
| Flat custom | Plain pairs: `"primaryColor": "#1B4D8C"` |

Normalize to DTCG in `brand/tokens.normalized.json`:
- Resolve every reference and alias to a final value
- Keep the original name in `$extensions.source.name` and the file in `$extensions.source.file`
- Group as `color`, `font` (family), `fontWeight`, `dimension` (spacing, radius), `gradient`
- Add `$description` with the role from the manual

```json
{
  "color": {
    "brand": {
      "primary": {
        "$type": "color",
        "$value": "#1B4D8C",
        "$description": "Primary brand blue (MIV p.14)",
        "$extensions": { "source": { "file": "brand/tokens.json", "name": "azulPrincipal" } }
      }
    }
  },
  "font": {
    "heading": {
      "$type": "fontFamily",
      "$value": ["Sora", "Arial", "sans-serif"],
      "$description": "Headlines (MIV p.22)"
    }
  }
}
```

When the JSON and the manual disagree, the manual wins unless the user says the JSON is newer.
List every disagreement under **Open questions**.

---

## Step 4: Inventory the logos

For each file record: version, color mode, format, size or `viewBox`, colors used (read `fill` and
`stroke` in SVG), and the background it is meant for.

Check file health:
- SVG with an embedded raster (`<image>`) is not a true vector: flag it
- SVG with live `<text>` depends on a font being installed: flag it, ask for outlined paths
- PNG smaller than twice its display size will look soft on high density screens
- Transparent background where the logo sits on color

Missing versions (no negative, no symbol): note them. Do not invent a version by recoloring unless
the manual shows that version.

---

## Step 5: Read the applications

Look for patterns, not pixels: color proportion, logo placement and size, whitespace, type
hierarchy, use of graphic elements, photo treatment, tone of copy.

Applications can be old or wrong. When one contradicts the manual, the manual wins; note the
contradiction.

---

## Step 6: Write BRAND.md

```markdown
# BRAND.md

Generated from the sources below on [date]. The manual is the source of truth.
Confirmed by the user: [no / yes, date]

## Sources
| File | Type | Notes |

## Essence
Personality: [words, MIV page]
Tone of voice: [description, MIV page]
Tagline: [text]

## Logo
| Version | File | Use on | Never on |
Clear space: [rule] (MIV p.X)
Minimum size: [px on screen] / [mm in print]
Prohibited: [list, quoted]

## Color
| Token | Name | Role | HEX | RGB | CMYK | Pantone | Source | As text on white | As text on black |
Proportion: [rule]
Approved combinations: [list]
Official gradients: [stops, angle, allowed contexts] or "none"

## Typography
| Role | Family | Weights | Fallback | Source or license |

## Graphic elements
[description, where allowed, MIV page]

## Imagery
[photo and illustration style]

## Patterns from applications
[what repeats across the applications]

## Brand exceptions
Patterns this brand documents that design-quality would otherwise flag as slop.
| Pattern | Allowed in | MIV page |

## Protected tokens
Tokens no fix pass may change: [list]

## Open questions
[conflicts, missing versions, approximate conversions, missing fonts]
```

The "As text" columns hold the contrast ratio of each brand color as text on white and on black.
Mark each one: passes 4.5:1, passes only 3:1 (large text), or fails.

---

## Step 7: Confirm

Show a short summary and the open questions. Ask: *"Is this brand profile correct before I use
it?"* Stop. Wait. After the user confirms, set `Confirmed by the user: yes, [date]`.

Then, if a `PROJECT_DESIGN.md` exists or is created, its Palette and Typography sections point to
`BRAND.md` tokens instead of defining new ones.

---

## Applying the brand on screens

### Logo
- Use the provided file, inline SVG or `<img>`. Never rebuild the logo with text, CSS, an icon
  font, or a redrawn SVG.
- Never recolor, stretch, rotate, crop, or add shadow, glow, or outline.
- Pick the version by background: positive on light, negative on dark, monochrome where color is
  not possible.
- Keep the clear space free of other elements.
- Keep the logo at or above minimum size at 375px width. If the full logo falls below it, switch to
  the approved compact or symbol version.
- `alt` is the brand name. Favicon and app icon come from the symbol version.

### Color
- Brand colors fill the accent and brand roles. On app screens, the chrome stays mostly neutral
  and the brand color marks the primary action, selection, and key moments.
- If the manual defines neutrals, use them. If not, tint the neutral ramp toward the brand primary.
- Follow the proportion rule when the manual states one. On app screens it applies to brand
  surfaces (header, hero, marketing areas), not to every control.
- A color that is not in `BRAND.md` and not part of the neutral ramp is off brand.

### Contrast
Check every brand color as text and as background. When a brand color fails 4.5:1 as body text:
1. Use it for large text (24px, or 18.66px bold) only if it reaches 3:1
2. Use it for non-text elements: fills, borders, icons next to a text label
3. Use a darker tint only if the manual approves tints
4. Never change the brand color itself. Record the limitation in `BRAND.md`.

### Typography
- Use brand fonts only from a source the user provides: font files or a licensed web service.
- If the font is unavailable, use the manual's fallback. If there is none, propose one with similar
  proportions and ask before shipping it.

### Gradients and graphic elements
Use them only in the contexts the manual allows. Keep them out of interactive controls unless the
manual shows them there.

### Voice
The copy pass uses the tone words from `BRAND.md`.

---

## Brand exception or slop?

A pattern counts as a brand exception only when both are true:
1. The manual documents it, with a page number
2. It is used in a context the manual allows

Otherwise it is still slop. Example: the official gradient on the hero of a landing page is a brand
exception. The same gradient on every button is slop (P1), unless the manual shows it on buttons.
