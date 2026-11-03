# Fix Mode Walkthrough

A complete Fix Mode run from initial review to done. Shows all 10 passes applied to a real-looking SaaS dashboard.

---

## Starting point

The dashboard has been reviewed. Findings:

```
Slop Audit:
- Background: linear-gradient(135deg, #7c3aed 0%, #1e40af 100%) — P1
- .metric-card: background with saturated color (blue, green, purple) — P1
- Nav icons: emoji mixed with SVGs — P1
- Section headers: ALL CAPS with letter-spacing — P1
- Multiple primary buttons in header — P1
- .btn: transition: all 200ms — P2
- .card: border + box-shadow combined — P2
- Icon sizes inconsistent: 16px in nav, 20px in content, 18px in table — P2
- No visible focus states on interactive elements — P0
- No aria-labels on icon buttons — P1
- Mobile: no responsive breakpoints — P3
```

Scorecard: 4.5/10 overall.

---

## Pass 1: Spacing

**Check:** All margins, paddings, gaps are multiples of 4 or 8.

Before:
```css
.header { padding: 20px 24px; }           /* 20 is not on the 8px grid */
.sidebar-item { padding: 10px 16px; }     /* 10 is not on the 4px grid */
.metric-grid { gap: 14px; }              /* 14 is not on the grid */
.content-area { margin-top: 30px; }       /* 30 is not on the grid */
```

After:
```css
.header { padding: 16px 24px; }           /* 16 = 2 × 8 ✓ */
.sidebar-item { padding: 8px 16px; }      /* 8 on the grid ✓ */
.metric-grid { gap: 16px; }              /* 16 ✓ */
.content-area { margin-top: 32px; }       /* 32 = 4 × 8 ✓ */
```

**Check:** Space shows grouping. Section labels sit closer to their own items than to the section above.

Before:
```css
.section + .section { margin-top: 32px; }
.section-label { margin-bottom: 32px; }  /* same distance above and below */
```

After:
```css
.section + .section { margin-top: 48px; }
.section-label { margin-bottom: 16px; }  /* label is close to its items, far from the one above */
```

**Pass 1 result:** Grid is consistent. Grouping is clear.

---

## Pass 2: Color

**Remove slop:**

Before:
```css
body {
  background: linear-gradient(135deg, #7c3aed 0%, #1e40af 100%);
}
.metric-card-revenue { background: #1d4ed8; color: white; }
.metric-card-users   { background: #059669; color: white; }
.metric-card-growth  { background: #7c3aed; color: white; }
```

After:
```css
body {
  background: #0f1117; /* near-neutral dark, not a hue */
}
.metric-card {
  background: #1a1d27; /* one surface color for all cards */
  color: #f1f5f9;
}
/* Metric value itself carries the color, not the card background */
.metric-value-revenue { color: #60a5fa; }
.metric-value-users   { color: #34d399; }
.metric-value-growth  { color: #a78bfa; }
```

**Build neutral ramp:**

```css
:root {
  --canvas: #0f1117;
  --surface: #1a1d27;
  --surface-raised: #222535;
  --border: oklch(1 0 0 / 0.08);
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #475569;
  --accent: #60a5fa;
}
```

**Pass 2 result:** Background is near-neutral. Metric values carry color, not card backgrounds. Gradient removed.

---

## Pass 3: Icons

Before (mixed libraries, inconsistent sizes, hardcoded colors):
```jsx
<span>📊</span>                    {/* emoji */}
<HomeIcon className="w-4 h-4" />   {/* 16px Heroicons */}
<svg fill="#6366f1" .../>           {/* hardcoded fill */}
<SettingsIcon size={20} />          {/* 20px — different from nav */}
```

After (one library, consistent sizes, currentColor):
```jsx
{/* Navigation: all 20px Heroicons outline, currentColor */}
<HomeIcon className="w-5 h-5" style={{ color: 'currentColor' }} />
<ChartBarIcon className="w-5 h-5" style={{ color: 'currentColor' }} />
<Cog6ToothIcon className="w-5 h-5" style={{ color: 'currentColor' }} />

{/* Inline content: all 16px, same library */}
<ArrowUpIcon className="w-4 h-4" style={{ color: 'currentColor' }} />
```

```css
.icon { color: var(--text-secondary); }
.icon:hover { color: var(--text-primary); }
```

**Pass 3 result:** One library (Heroicons), two sizes (20px nav / 16px inline), all `currentColor`.

---

## Pass 4: Copy

Before:
```html
<h1>Revolutionize Your Analytics Dashboard</h1>
<span class="badge">NEW ✨</span>
<button>Get Started</button>
<h2 class="section-header">REVENUE METRICS</h2>
<h2 class="section-header">USER ACTIVITY</h2>
<h2 class="section-header">GROWTH OVERVIEW</h2>
```

After:
```html
<h1>Revenue</h1>
<span class="badge">New</span>
<button>Export report</button>
<h2 class="section-header">Revenue</h2>
<h2 class="section-header">Users</h2>
<h2 class="section-header">Growth</h2>
```

**Pass 4 result:** No emoji in labels. Section headers are plain sentence-case. CTA is specific.

---

## Pass 5: Typography

Before:
```css
body { font-family: 'Inter', sans-serif; }
h1 { font-size: 32px; font-weight: 400; }     /* no weight contrast */
h2 { font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; } /* section header slop */
p { font-size: 14px; }
.metric-value { font-size: 36px; font-weight: 700; }
```

After:
```css
:root { -webkit-font-smoothing: antialiased; }   /* crisper on macOS */

body { font-family: 'Inter', sans-serif; font-size: 15px; }

h1 {
  font-size: 24px;
  font-weight: 600;
  text-wrap: balance;
}

h2 {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  /* no uppercase, no letter-spacing */
  text-wrap: balance;
}

.metric-value {
  font-size: 32px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;   /* prevent layout shift as values update */
}
```

**Pass 5 result:** Weight contrast improved. No ALL CAPS section headers. `tabular-nums` on metrics. `antialiased` at root.

---

## Pass 6: Layout

Before:
- Everything center-aligned on the page
- Multiple primary CTAs in header: "Export", "New Dashboard", "Settings" all styled as primary buttons

After:
- Left-aligned content, consistent with reading direction
- Header: one primary CTA ("Export report"), others as secondary (ghost/outline style)

```css
.header-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.btn-primary {
  background: var(--accent);
  color: white;
  font-weight: 500;
}

.btn-secondary {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-secondary);
}
```

**Pass 6 result:** One primary CTA. Layout follows a left-aligned reading pattern.

---

## Pass 7: Details

**Concentric border radius:**

Before:
```css
.card { border-radius: 8px; padding: 16px; }
.card-header { border-radius: 8px; margin-bottom: 12px; } /* same radius — too small inside */
```

After:
```css
.card { border-radius: 16px; padding: 16px; }
.card-header { border-radius: 8px; } /* 16 - padding(8) = 8 — this will need adjusted padding */
/* Revised: */
.card { border-radius: 12px; padding: 12px; }
.card-inner { border-radius: 4px; } /* 12 - 8 = 4 — snug but correct */
```

**Shadow vs. border:**

Before:
```css
.card {
  border: 1px solid #1e293b;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}
```

After (pick one):
```css
.card {
  /* Option A: border only (flat style) */
  border: 1px solid var(--border);

  /* Option B: layered shadow (elevated style) */
  box-shadow:
    0 1px 2px oklch(0 0 0 / 0.12),
    0 4px 8px oklch(0 0 0 / 0.16);
}
```

**Pass 7 result:** Concentric radii correct. Shadow and border not combined.

---

## Pass 8: Accessibility & Touch

Before (missing all of these):
```jsx
<button onClick={handleExport}><ExportIcon /></button>   /* no aria-label */
<input placeholder="Search..." />                         /* no label */
```

After:
```jsx
<button onClick={handleExport} aria-label="Export report">
  <ExportIcon />
</button>

<label htmlFor="search" className="sr-only">Search</label>
<input id="search" placeholder="Search..." />
```

**Focus states:**

Before:
```css
button:focus { outline: none; }   /* removed with no replacement */
```

After:
```css
button:focus { outline: none; }
button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

**Touch:**

```css
button, a, [role="button"] {
  touch-action: manipulation;   /* removes 300ms tap delay */
}

@media (hover: hover) and (pointer: fine) {
  .card:hover { background: var(--surface-raised); }
}

.modal, .dropdown {
  overscroll-behavior: contain;
}
```

**Pass 8 result:** Focus states visible. Icon buttons labeled. Form inputs have labels. Touch guards in place.

---

## Pass 9: Visuals

**Empty state (chart area):**

Before: blank white box when no data is selected.

After:
```jsx
<div className="empty-chart">
  <ChartBarIcon className="w-8 h-8 text-muted" />
  <p>Select a date range to see revenue data</p>
  <button className="btn-primary">Set date range</button>
</div>
```

**Icon system (already done in Pass 3):** ✓

**Images:** No images in this dashboard. ✓

**Pass 9 result:** Chart empty state has icon + explanation + CTA.

---

## Pass 10: Motion

**High-frequency interactions get minimal transitions:**

```css
/* Row hover — instant or ≤100ms */
.table-row {
  transition: background-color 80ms ease-out;
}
.table-row:hover { background: var(--surface-raised); }

/* Tab switch — instant */
.tab { transition: color 80ms ease-out; }
```

**Button press:**

```css
.btn {
  transition: transform 150ms ease-out, background-color 80ms ease-out;
  /* Removed: transition: all */
}
.btn:active { transform: scale(0.96); }
```

**Sidebar open (low-frequency):**

```css
.sidebar {
  transform: translateX(-100%);
  transition: transform 250ms ease-out;
}
.sidebar.open { transform: translateX(0); }
```

**prefers-reduced-motion:**

```css
@media (prefers-reduced-motion: reduce) {
  .btn, .table-row, .sidebar {
    animation: none;
    transition: opacity 0.1s ease;
  }
}
```

**Pass 10 result:** High-frequency interactions use minimal transitions. Button press has `scale(0.96)`. Sidebar uses CSS transition (interruptible). `prefers-reduced-motion` respected.

---

## After all 10 passes

```
## Scorecard (after fixes)
Product fit:    6/10   Neutral base; still needs World reference and Signature
Hierarchy:      8/10   One primary CTA, secondary elements recede
Clarity:        8/10   Labels clear, focus states visible, empty state explained
Taste:          6/10   No template tells remaining; could use a product-specific detail
Restraint:      8/10   Gradient removed; metric values carry color, not card backgrounds
Density:        8/10   Appropriate for a dashboard
Craft:          8/10   Grid consistent; hover states present; focus visible; concentric radii
Responsiveness: 4/10   Still no responsive breakpoints — needs mobile pass

## Verdict
Required fix (P0): none remaining
Quick wins (P1): Add a World reference to the neutral ramp; add a Signature detail; add responsive breakpoints
```

The interface went from 4.5/10 to 7/10 across 10 passes. The remaining issues (World, Signature, responsiveness) require product-specific decisions that can't be made without the direction confirmed.
