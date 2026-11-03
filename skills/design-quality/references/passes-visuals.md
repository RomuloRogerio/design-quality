# Pass 9: Visuals

Applied last before Motion. Checks illustration, empty states, and icon system consistency.

## Empty States

Every screen that can have no content must have a designed empty state:
- Illustration or icon that fits the product World (not a generic stock illustration)
- Short headline: what happened or what's next
- Primary CTA: what to do from here

Flag if: the empty state is just blank space, a spinner, or generic "No data found."

## Illustration Consistency

If the product uses illustrations:
- One style only. Flat, isometric, outline, character — pick one.
- Same stroke weight, color palette (accent from the product palette), and level of detail.
- Illustrations match the World: a monitoring tool doesn't use cheerful pastel characters.

## Icon System

By this pass, icons should already be from one library (Pass 3). Here, check:
- All icons have the same stroke weight as each other.
- Icon size is consistent within a context: all nav icons the same size, all inline icons the same size.
- Icons use `currentColor` — they inherit text color and adapt to dark mode automatically.
- No SVG icons with hardcoded `fill="#000"` or `stroke="#333"`.

If `better-icons` MCP is available: `better-icons search <query>` searches 200+ libraries by semantic meaning. Use it to find a semantically correct icon rather than picking the closest shape from one library.

## Images

- Every `<img>` has explicit `width` and `height` attributes (prevents layout shift).
- Aspect ratios are defined — images don't reshape on load.
- No stock photography that could belong to any product in the category.
  A logistics product uses logistics imagery. A developer tool uses terminal or code imagery.

## The Product World Check

Stand back from the screen and ask: does any visual element feel like it was pulled from a template?
- Illustrations that look like they came from unDraw, Storyset, or similar → replace or remove.
- Icons that feel generic rather than chosen → verify with `better-icons search`.
- Empty state copy that says "Looks like there's nothing here yet" → write something specific.
