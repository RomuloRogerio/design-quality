# Ant Design Quality Skill

A review and correction skill for UIs built with or aiming for Ant Design quality. Grounded in the official Ant Design v6 design language.

---

## Four core values

Every decision is a tie-breaker against these four:

| Value | Meaning |
|---|---|
| **Natural** | Follows established conventions; nothing surprises a returning user. Prefer existing OS/enterprise patterns over invention. |
| **Certain** | User always knows their state, what their input did, and what comes next. Hover, focus, loading, and error states are explicit and consistent. |
| **Meaningful** | Visual emphasis is reserved for action. Decoration that does not communicate is removed. |
| **Growing** | Scales from small forms to dense tables to multi-tenant admin consoles without losing coherence. |

When two design approaches conflict, the one that produces a more **certain** and **legible** state wins.

---

## Review Mode (`/dq-review` on an Ant Design UI)

Run this audit and report findings:

### 1. Value check
- Does the UI feel **Natural**? Or does it invent patterns users need to learn?
- Is every state **Certain**? Check: hover / focus / loading / empty / error — are they all explicit?
- Is emphasis **Meaningful**? Count how many elements compete for attention. The answer should be one.
- Does it **Grow**? Would it hold up at 1440 px wide with 8 table columns and a detail pane?

### 2. Color audit
- Is `#1677FF` (or `colorPrimary` override) the only blue used for actions?
- Are semantic colors (`success #52C41A`, `warning #FAAD14`, `error #FF4D4F`) used for status only?
- Are preset colors (`blue / purple / cyan / green / magenta / red / orange / yellow / volcano / geekblue / gold / lime`) reserved for tags and charts — never for primary affordances?
- Is there any hard-coded `#FFFFFF` or `#FAFAFA` bypassing surface tokens?
- Is white text on `#1677FF` used for small (<18px / <14px bold) text? Flag as WCAG fail.

### 3. Typography audit
- Is the base font size **14 px** (acceptable for dashboards/admin; 16 px for content-heavy pages)?
- Are only two weights used: **400** (body) and **600** (headings, table headers)?
- Any thin (100–300), bold (700+), or italic in interface chrome? Remove them.
- Headings follow the scale: display-lg 38 / headline-lg 30 / headline-md 24 / headline-sm 20 / title-lg 16 / title-md 14?

### 4. Spacing audit
- Does every gap, gutter, and inset snap to the **4 px grid**?
- Spacing steps used: 4 / 4 / 8 / 16 / 24 / 32 px. Any magic numbers (`padding: 11px`, `gap: 13px`)? Flag each.

### 5. Elevation audit
- Is the UI **flat-first**? Borders and tonal contrast carry hierarchy.
- Shadows appear only on floating surfaces (modals, dropdowns, drawers)?
- Is the three-layer surface model respected?
  - `bg-layout #F5F5F5` — page background
  - `bg-container #FFFFFF` — cards, panels, tables, forms
  - `bg-elevated #FFFFFF` — modals, dropdowns, popovers (separated by shadow, not color)
- Never both a shadow AND a border on the same container?

### 6. Corner radius audit
- Controls (button, input, select): **6 px**
- Surfaces (card, modal, drawer): **8 px**
- Tags, tooltips, small chips: **4 px**
- Full-pill (`9999 px`): only circular avatars, badges, status dots — not buttons or tags
- Adjacent elements use the same radius? A card (8 px) containing a button (16 px) is a smell.

### 7. Motion audit
- Are only three durations used: `0.1 s` (hover/focus), `0.2 s` (component transitions), `0.3 s` (surface changes)?
- Are named easings used (`motionEaseInOut`, `motionEaseOut`, `motionEaseIn`, `motionEaseOutBack`)? No custom `cubic-bezier`?
- Does every animation add meaning — or is it decoration?

### 8. Component archetypes
- **Button (primary)**: solid primary fill, white text, 32 px tall, 6 px radius. Only ONE per screen.
- **Button (default)**: transparent bg, dark text, 1 px outline. No second primary-colored button.
- **Input**: 32 px tall. Hover border brightens; focus thickens to primary + inset glow.
- **Card**: white surface, 8 px radius, 24 px all-sides padding, 16 px internal gaps.
- **Modal**: 8 px radius, `rgba(0,0,0,0.45)` mask, 20×24 px body padding.
- **Selected menu item**: `#E6F4FF` bg + primary text. Only visual cue for "you are here."
- **Active tab**: primary text + 2 px underline. No background fill ever.
- **Table header**: `surface-container` bg + `title-md` (14/600).
- **Tag**: 4 px radius, 12 px font, pastel fills from preset palette. Never for critical state.
- **Tooltip**: `rgba(0,0,0,0.85)` bg, white text. Always framework-positioned.

---

## Fix Mode (use with `/fix`)

Run these passes in order on an Ant Design UI:

1. **Values** — Mark every state (hover, focus, loading, empty, error). Remove decoration with no semantic role.
2. **Colors** — Replace hard-coded hex with token references. Demote misused accent colors to `surface-container`.
3. **Typography** — Collapse to 400/600 only. Remove italic/thin/bold from chrome.
4. **Spacing** — Snap every value to 4 px grid. Replace magic numbers with the nearest scale step.
5. **Elevation** — Remove shadow+border combos. Apply three-layer surface model.
6. **Radius** — Normalize to 6/8/4 px by component class. Remove full-pill from non-circular elements.
7. **Components** — Demote second primary buttons. Fix inputs to 32 px. Correct card/modal padding.
8. **Motion** — Replace custom durations/easings with tokens. Remove decorative animations.

---

## Do's and Don'ts (quick reference)

**Do:**
- Use the four values as a tie-breaker in any design conflict
- Read surfaces from `colors.surface`, `surface-container`, `surface-layout`
- Use `motionDurationMid` (0.2 s) for any transition without a more specific token
- Reserve the preset palette for tags, charts, categorical visualization
- Snap every gap, inset, and gutter to the 4 px grid

**Don't:**
- Stack two `primary` buttons on the same surface
- Hard-code `#FFFFFF` or `#FAFAFA` — read the token
- Invent custom `cubic-bezier` curves — use named easings
- Mint accent colors outside the preset palette for one-off surfaces
- Use magic spacing numbers — if the scale lacks a step, revisit the design

---

## References
- [Ant Design DESIGN.md](https://github.com/ant-design/ant-design/blob/master/DESIGN.md)
- [Ant Design Customize Theme](https://ant.design/docs/react/customize-theme)
- [Design Tokens](https://ant.design/docs/react/design-token)
