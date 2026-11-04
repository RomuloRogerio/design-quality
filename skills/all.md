# design-quality — All Skills

Load this file to get all three skills in this repository at once.

---

## Included skills

### 1. design-quality (UI review & fix)
`skills/design-quality/SKILL.md`

For evaluating and fixing AI-generated interfaces. Use when:
- Reviewing any UI for slop, quality, or design issues
- Building a new UI from scratch (Create Mode sets direction first)
- Running 10 sequential fix passes (Fix Mode)
- Walking every state at 10% speed (Polish Mode)

Modes: **Review · Create · Fix · Polish**

---

### 2. ant-design (Ant Design review & fix)
`skills/ant-design.md`

For UIs built with or aiming for Ant Design quality. Use when:
- Reviewing a React/enterprise UI against Ant Design v6 tokens and patterns
- Checking for token hard-coding, wrong weights, magic spacing numbers, or stacked primary buttons
- Applying Ant Design-specific fix passes (color → typography → spacing → elevation → radius → motion)

Grounded in: Natural · Certain · Meaningful · Growing

---

### 3. system-design (scalable architecture)
`skills/system-design.md`

For planning scalable backend and distributed systems. Use when:
- Starting a system design from scratch (5-step framework)
- Choosing between SQL/NoSQL, cache strategies, or message queues
- Reviewing an architecture for failure modes, bottlenecks, or CAP trade-offs
- Preparing for a system design interview

---

## How to use

**Load a single skill** — point your agent at any one file:
```
skills/design-quality/SKILL.md   → UI review and fix
skills/ant-design.md              → Ant Design-specific review
skills/system-design.md           → Architecture planning
```

**Load all three** — point your agent at this file (`skills/all.md`).  
Claude will read all three and apply the relevant skill depending on what you're working on:
- Reviewing a UI? → design-quality or ant-design activates
- Planning a backend? → system-design activates
- Both? → All three apply

**Claude Code plugin** — for slash commands (`/dq-review`, `/direction`, `/fix`, `/polish`) without manually loading a skill, install the plugin:
```bash
claude --plugin-dir /path/to/design-quality/plugin
```

---

## Choosing between design-quality and ant-design

| Situation | Use |
|---|---|
| General UI review — any stack | `design-quality` |
| Ant Design React app | `ant-design` |
| Both (thorough review) | Both — they cover different criteria |
| New UI from scratch | `design-quality` (Create Mode sets direction first) |
| Token/spacing audit of an Ant Design app | `ant-design` |
