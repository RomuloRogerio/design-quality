# Direction Research Agent

Dispatched during Create Mode Gate 1 when a product URL, name, or category is known.
This is a fresh agent (default subagent_type, no conversation context needed) — pass the product
details in the prompt using the template below.

## When to dispatch

Dispatch ONLY when you have at least one of:
- A product URL (can be browsed)
- A product name that's publicly known
- A clear product category with enough specificity ("B2B SaaS invoicing tool for freelancers")

Do NOT dispatch for vague descriptions ("make a productivity app").

## Prompt to use

Fill in [PRODUCT NAME / URL / DESCRIPTION] with what you know, then dispatch:

```
Research the product [PRODUCT NAME / URL / DESCRIPTION] for a design direction briefing.

I need to understand:
1. What the product does in concrete terms (not marketing language)
2. Who the primary users are and what they're trying to accomplish
3. What the primary task is — the single most important thing a user does in this product
4. What domain/world this product naturally belongs to (materials, places, sensory associations)
5. What competitors look like and what visual clichés to avoid in this category
6. Any existing brand identity (colors, fonts, tone of voice) visible on their site or in context

Output format:

## Product Summary
[2–3 sentences on what it does, who it's for, primary task]

## Domain / World
[The materials, places, or sensory universe this product naturally inhabits]
[Examples: "accounting tools = ledgers, clean columns, quiet authority" or "dev tools = terminals, precise monospace, focused flow"]

## Competitor visual clichés to avoid
[What every product in this category looks like — so we can differentiate]

## Existing brand signals
[Colors, fonts, tone — if any visible on their site or in provided screenshots]

## Recommended Character words
[2–3 concrete character words derived from the product's actual function and users]
[Explain why each word fits — avoid: clean, modern, sleek, minimal, premium]
```

## After the research agent completes

Use its output to pre-fill Gate 1 understanding. Present it to the user for confirmation:

"Based on my research: [summary from agent]. Is this accurate before I propose design directions?"

This replaces the open-ended "what is your product?" question with a confirmation, which is faster
and surfaces details the user might not think to mention.

Then proceed to Gate 2 (Direction + Design Dials) using the research output to inform the
Character, World, and Signature lines.
