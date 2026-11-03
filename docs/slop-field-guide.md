# Slop Field Guide

A visual catalog of AI-generated UI anti-patterns with examples. Each entry shows what the pattern looks like in code, why it appears, and what to do instead.

---

## Color Slop

### Purple-to-blue gradient background

**What it looks like:**
```css
body {
  background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%);
}
/* or */
.hero {
  background: linear-gradient(to bottom right, #8b5cf6, #3b82f6);
}
```

**Why AI produces it:** Gradient backgrounds appear frequently in high-engagement Dribbble shots and portfolio pieces. They read as "designed" in a screenshot. The training data is heavily biased toward portfolio-optimized work.

**The problem:** On app screens, the background should be near-neutral. Content carries color; chrome doesn't. A colored background competes with every element on it.

**Fix:**
```css
body {
  background: #0f1117;  /* near-neutral dark */
}
/* or */
body {
  background: #f8fafc;  /* near-neutral light */
}
```

**Severity: P1** — makes it look clearly AI-generated.

---

### Gradient text

**What it looks like:**
```css
.hero-headline {
  background: linear-gradient(135deg, #7c3aed, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**Why AI produces it:** Gradient text was a recognizable "premium" signal in 2021-2023 UI trends. AI has seen thousands of examples in high-starred repos and portfolio pieces.

**The problem:** Gradient text is unreadable at small sizes. It's inaccessible — screen readers struggle. It's visually aggressive. And it reads immediately as "AI output."

**Fix:**
```css
.hero-headline {
  color: var(--text-primary);  /* solid color */
}
/* If you need emphasis, use weight: */
.hero-headline {
  font-weight: 700;
  color: var(--text-primary);
}
```

**Severity: P1** — immediate template recognition.

---

### Glowing borders

**What it looks like:**
```css
.card:hover {
  box-shadow: 0 0 20px rgba(124, 58, 237, 0.5);
  border-color: #7c3aed;
}
/* or */
.sidebar-item.active {
  box-shadow: 0 0 12px rgba(99, 102, 241, 0.6);
}
```

**Why AI produces it:** Glow effects are visually striking in screenshots, which dominate the AI's training signal for "looks good."

**The problem:** On screen, glow effects are distracting. They draw the eye away from content. They look neon and cheap. Active states should be communicated with background color or a left border, not a glow.

**Fix:**
```css
/* Active state with background */
.sidebar-item.active {
  background: oklch(1 0 0 / 0.06);  /* subtle surface change */
  color: var(--text-primary);
}

/* Or with a left border accent */
.sidebar-item.active {
  border-left: 2px solid var(--accent);
  padding-left: 14px;  /* compensate for border width */
  color: var(--text-primary);
}
```

**Severity: P1** for navigation active states, P2 for card hover states.

---

### Radial color blobs

**What it looks like:**
```css
.hero::before {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%);
  top: -100px;
  left: -100px;
}
/* or as inline Tailwind: */
/* <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl top-0 -left-20" /> */
```

**Why AI produces it:** Atmospheric backgrounds appear in portfolio-grade UI work. AI interprets them as a signal of "high-effort design."

**The problem:** They create visual noise behind content. They have no semantic meaning. They're the visual equivalent of saying "trust me, this looks designed."

**Fix:** Remove entirely. If a landing page needs visual interest in the hero, use a real element from the product's World instead — a screenshot of the product, an illustration that fits the domain, a relevant image.

**Severity: P1** on app screens, P2 on landing pages.

---

## Typography Slop

### Emoji in labels

**What it looks like:**
```jsx
<button>🚀 Launch Campaign</button>
<span className="badge">New ✨</span>
<li>📊 Analytics</li>
<h2>🎯 Goals</h2>
```

**Why AI produces it:** Emoji are visually distinctive and appear frequently in high-engagement content on social platforms. AI interprets visual distinctiveness as good design.

**The problem:** Emoji render differently across operating systems, font rendering engines, and color schemes. They don't scale properly with text. They introduce visual inconsistency (emoji are always full-color; surrounding text adapts to theme). In navigation, they look like a toy.

**Fix:**
```jsx
{/* Replace with SVG icons from one library */}
<button><RocketLaunchIcon className="w-4 h-4" /> Launch Campaign</button>
<span className="badge">New</span>
<li><ChartBarIcon className="w-4 h-4" /> Analytics</li>
<h2>Goals</h2>
```

**Severity: P1** — immediate AI identification signal.

---

### ALL CAPS tracked section headers

**What it looks like:**
```css
h2 {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #94a3b8;
}
```

```html
<h2>REVENUE METRICS</h2>
<h2>USER ACTIVITY</h2>
<h2>RECENT TRANSACTIONS</h2>
```

**Why AI produces it:** This pattern comes from SaaS dashboard UI kits and design system documentation. It's used as section labels in real products — but AI applies it to every section header without judgment.

**The problem:** ALL CAPS tracked labels work in limited contexts (sidebar category labels, dense data tables with many columns). When applied to every section header, they create visual monotony and hierarchy collapse — everything reads at the same register.

**Fix:**
```css
h2 {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  /* no uppercase, no letter-spacing */
}
```

Use the ALL CAPS tracked style only for sidebar category dividers or table column headers where many items need organization — not for every section on the page.

**Severity: P1** when applied universally.

---

### Oversized hero on operational tools

**What it looks like:**
```css
/* On a time-tracking tool dashboard */
.hero h1 {
  font-size: 72px;
  font-weight: 800;
  line-height: 1.1;
}
```

**Why AI produces it:** Large typographic headlines appear in almost every high-quality landing page. AI applies landing page patterns to operational tools.

**The problem:** An oversized headline wastes space on a tool where the action IS the content. It delays the user from reaching what they came to do. It signals "look at me" on a surface where the user wants to look at their data.

**Rule of thumb:** If the app has content that the user works with (tables, charts, forms), the maximum h1 size is 24–28px. Headlines above 48px belong only on landing pages and marketing surfaces.

**Fix:**
```css
/* Dashboard h1 */
.dashboard-heading {
  font-size: 20px;
  font-weight: 600;
}
```

**Severity: P1** — wrong context type applied.

---

### Shouting copy

**What it looks like:**
```html
<h1>Revolutionize Your Workflow with AI-Powered Analytics</h1>
<h2>Unlock the Full Potential of Your Data</h2>
<p>Transform the way your team collaborates</p>
<button>Get Started Today</button>
```

**Why AI produces it:** This copy style appears in the landing pages AI was trained on. It optimizes for sounding impressive in a screenshot, not for communicating something specific.

**The problem:** "Revolutionize," "unlock," "transform," "powerful," "seamless" are empty. They could appear in the copy for any software product. They communicate nothing about what the product actually does.

**Template check:** If you can replace the product name with any competitor and the copy still fits — it's slop.

**Fix:**
```html
<h1>Time tracking for freelancers who hate tracking time</h1>
<h2>Your hours, invoiced automatically</h2>
<p>Start a timer. Send an invoice. That's it.</p>
<button>Start tracking</button>
```

Specific, plain, product-first. The copy tells you something only this product could say.

**Severity: P1** — template identity failure.

---

## Layout Slop

### The 3-column card grid

**What it looks like:**
```html
<section>
  <h2>Our Features</h2>
  <div class="grid grid-cols-3 gap-6">
    <div class="card">
      <svg>... icon ...</svg>
      <h3>Advanced Analytics</h3>
      <p>Get deep insights into your data with our powerful analytics engine.</p>
    </div>
    <div class="card">
      <svg>... icon ...</svg>
      <h3>Seamless Integrations</h3>
      <p>Connect with over 100+ tools your team already uses every day.</p>
    </div>
    <div class="card">
      <svg>... icon ...</svg>
      <h3>Real-time Collaboration</h3>
      <p>Work together with your team in real-time from anywhere in the world.</p>
    </div>
    {/* and 3 more just like these */}
  </div>
</section>
```

**Why AI produces it:** The "features grid" section is among the most common landing page patterns in training data. AI reproduces it as a default section structure.

**The problem:** Six identical cards with icon + heading + two generic sentences communicate nothing. The cards are interchangeable — you can read them in any order and lose nothing. The content is filler.

**Fix:** Replace with real content. A features section should show something true and specific about the product — a screenshot, an actual workflow, a real metric.

```html
<section>
  <div class="feature-row">
    <div class="feature-visual">
      [actual screenshot or demo of the feature]
    </div>
    <div class="feature-copy">
      <h2>See your busiest hours at a glance</h2>
      <p>The week view shows exactly when your revenue comes in. No dashboard customization required.</p>
    </div>
  </div>
</section>
```

**Severity: P1** — template fill without product content.

---

### Dark theme without product reason

**What it looks like:**
```css
:root {
  --bg: #0f172a;
  --surface: #1e293b;
  --text: #f1f5f9;
}
/* Applied to a recipe app, a children's educational tool, or a primary care scheduling system */
```

**Why AI produces it:** Dark UIs appear overwhelmingly in "impressive" design portfolios and developer tools that receive high engagement. AI interprets dark theme as "high quality."

**The problem:** Dark themes are appropriate for tools used in dark environments (monitoring dashboards, video editing software), developer tools where users expect them, and applications where the content itself is dark-dominant (photography, video). For most consumer apps, a forced dark theme has no product reason and creates accessibility challenges (text contrast is harder to manage, especially for users with certain visual conditions).

**Question to ask:** Does this product have a natural reason to be dark? If the honest answer is "no, it just looks more impressive," the default should be light with a dark mode option.

**Severity: P1** — wrong product fit applied.

---

## Components Slop

### Multiple competing primary buttons

**What it looks like:**
```jsx
<header>
  <div className="header-actions">
    <Button variant="primary">New Dashboard</Button>
    <Button variant="primary">Export</Button>
    <Button variant="primary">Invite Team</Button>
    <Button variant="primary">Settings</Button>
  </div>
</header>
```

**Why AI produces it:** AI generates buttons for every action it identifies as "important." Without a hierarchy constraint, it promotes every action equally.

**The problem:** Multiple primary buttons create hierarchy collapse. The user cannot tell which action matters. Every button competing for attention means none wins.

**Fix:**
```jsx
<header>
  <div className="header-actions">
    {/* One primary action — the most important thing to do from here */}
    <Button variant="primary">Export</Button>
    {/* Everything else: secondary */}
    <Button variant="secondary">New Dashboard</Button>
    <Button variant="ghost">Invite</Button>
    {/* Settings: icon button */}
    <button aria-label="Settings"><Cog6ToothIcon /></button>
  </div>
</header>
```

**Severity: P1** — hierarchy failure.

---

### Empty state: blank space

**What it looks like:**
```jsx
function Dashboard() {
  if (!data.length) return null;  /* or: return <div className="h-64"></div> */
  return <DataTable data={data} />;
}
```

**Why AI produces it:** Empty states require product knowledge — you need to know what users should do when there's no data. AI skips this rather than inventing the wrong answer.

**The problem:** A blank space for an empty state leaves the user with no feedback, no instruction, and no path forward. It looks broken.

**Fix:**
```jsx
function Dashboard() {
  if (!data.length) {
    return (
      <div className="empty-state">
        <InboxIcon className="w-8 h-8 text-muted" />
        <h3>No projects yet</h3>
        <p>Create your first project to start tracking time.</p>
        <Button variant="primary">New project</Button>
      </div>
    );
  }
  return <DataTable data={data} />;
}
```

**Severity: P1** — usability failure.

---

### Card with shadow AND border

**What it looks like:**
```css
.card {
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

**Why AI produces it:** Both patterns appear in well-designed components. AI uses both to be safe.

**The problem:** Shadow communicates elevation. Border communicates separation. Using both sends contradictory signals — is this element elevated above the surface, or flush with it? The visual result is usually a card that looks heavy and undefined.

**Fix:**
```css
/* Pick one: */

/* Option A: flat, on-surface (border communicates separation from background) */
.card { border: 1px solid var(--border); }

/* Option B: elevated (shadow communicates the card sits above the surface) */
.card {
  box-shadow:
    0 1px 2px oklch(0 0 0 / 0.04),
    0 2px 4px oklch(0 0 0 / 0.04),
    0 4px 8px oklch(0 0 0 / 0.06);
}
```

**Severity: P2** — craft issue.

---

## Identity Slop

### No Signature detail

**What it looks like:**
Any interface where swapping the logo for a competitor's logo would change nothing.

**Why AI produces it:** AI doesn't know what makes this specific product different. Without direction, it defaults to patterns that work for the product category rather than for this specific product.

**The test:** Stand back from the interface and ask: what detail here could only belong to this product?

If the honest answer is "nothing," the Signature is missing.

**Fix:** Pick one small detail and repeat it consistently throughout the product. It can be tiny — the shape of the status indicator, the weight of a specific typographic element, the way active states are communicated. One detail, used consistently, creates more identity than five attempts at visual drama.

Examples:
- **Monitoring tool:** A live blinking dot on every active status, everywhere in the product — not just on the main status page.
- **Developer tool:** Navigation items have keycap-style backgrounds on hover, referencing the keyboard.
- **Logistics tool:** Dashed lines connecting route waypoints, even in illustrations and empty states.
- **Time-tracking tool:** The timer widget has a rotating second-hand indicator, visible even when idle.

**Severity: P1** — template identity failure.

---

### No World reference

**What it looks like:**
```css
/* Time-tracking tool with completely generic neutrals */
:root {
  --canvas: #ffffff;
  --surface: #f8fafc;
  --text-primary: #0f172a;
  --accent: #6366f1;  /* generic purple — the AI default accent */
}
```

**Why AI produces it:** AI selects safe, palette-neutral colors that don't contradict anything. Purple is a common default — it appears in countless design systems without strong product associations.

**The problem:** Without a World tint, the neutrals feel like defaults. The product looks like it was assembled from a design system rather than designed for a specific domain.

**Fix:** Identify the product's World — the material or place it naturally belongs to. Tint the neutrals toward that World.

Examples:
```css
/* Time-tracking tool — World: watches, clocks, precision instruments */
:root {
  --canvas: #fafaf9;         /* warm off-white, like paper */
  --surface: #f5f5f0;        /* slightly warmer than pure white */
  --accent: #2d5a3d;         /* deep forest green — unhurried, focused */
}

/* Monitoring tool — World: instruments, night shifts, terminal screens */
:root {
  --canvas: #0a0f1a;         /* deep blue-black, not pure black */
  --surface: #111827;        /* slight blue cast in the dark surface */
  --accent: #22d3ee;         /* cyan — monitoring tool default, specific association */
}

/* Recipe app — World: kitchens, warmth, food photography */
:root {
  --canvas: #fffbf5;         /* warm white with orange undertone */
  --surface: #fef9f0;        /* warm cream */
  --accent: #c2410c;         /* burnt orange — food, warmth, cooking */
}
```

**Severity: P2** — identity weakness.
