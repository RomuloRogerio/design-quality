# design-quality plugin

Claude Code plugin that surfaces the [design-quality skill](../skills/) as slash commands and a live status bar hint.

## Commands

| Command | What it does |
|---|---|
| `/dq-review` | Full UI audit: slop detection, 8-dimension scorecard (1–10), P0–P3 fix list |
| `/direction` | Create Mode — derives product direction (Character · World · Moments · Signature) before any UI code |
| `/fix` | Fix Mode — 10 sequential passes: Spacing → Color → Icons → Copy → Typography → Layout → Details → A11y → Visuals → Motion |
| `/polish` | Polish Mode — walks every state at 10% speed (hover · focus · active · loading · empty · error) |
| `/brand` | Brand Mode — reads a brand kit (MIV / brand manual, tokens JSON, logos, applications) into a confirmed `BRAND.md` |

## Status bar

After editing any `.tsx`, `.jsx`, `.css`, `.scss`, `.html`, `.vue`, or `.svelte` file the status bar shows `/dq-review · /fix · /polish` as a reminder.

## Install

```bash
claude --plugin-dir /path/to/design-quality/plugin
```

Or copy the `plugin/` folder and add it to your `CLAUDE_CODE_PLUGIN_DIRS` environment variable.
