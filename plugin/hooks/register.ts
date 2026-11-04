import type { Register } from 'claude-code'

const UI_EXTENSIONS = /\.(tsx|jsx|css|scss|sass|html|vue|svelte)$/i

export const register: Register = on => {
  // Register all slash commands at session start
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'dq-review',
      description: 'Audit the current UI: slop detection, 8-dimension scorecard, fix list (P0–P3)',
    })
    await $.command.register({
      name: 'direction',
      description: 'Define product direction before writing any UI (Create Mode)',
    })
    await $.command.register({
      name: 'fix',
      description: 'Run 10 sequential fix passes on the current UI (Fix Mode)',
    })
    await $.command.register({
      name: 'polish',
      description: 'Walk the interface at 10% speed — hover, focus, loading, empty states',
    })

    return next(e)
  })

  // /dq-review → triggers Review Mode (slop audit + scorecard + verdict)
  on('command.run', { command: 'dq-review' }, $ => {
    $.ui.status(undefined)
    return {
      text: [
        'Review this design using the design-quality skill. Run the full audit:',
        '',
        '## Slop Audit',
        'List every AI slop sign found with its location and severity (P0–P3).',
        '',
        '## Template Check',
        'Would this UI still fit if you swapped the product name for any competitor?',
        '',
        '## Scorecard',
        'Score each of the 8 dimensions from 1–10 with a one-line note:',
        'Product fit · Hierarchy · Clarity · Taste · Restraint · Density · Craft · Responsiveness',
        '',
        '## Verdict',
        'Best part / Worst part / Required fix (P0 if any) / Top 3 quick wins (P1)',
      ].join('\n'),
    }
  })

  // /direction → triggers Create Mode (direction framework before any UI)
  on('command.run', { command: 'direction' }, $ => {
    $.ui.status(undefined)
    return {
      text: [
        'Start Create Mode using the design-quality skill.',
        'Before writing any UI code:',
        '',
        '1. Ask for the product context: what it does, who it\'s for, the primary task.',
        '2. Derive a direction with 5 lines:',
        '   Product · Character · World · Moments · Signature',
        '3. Set the Design Dials: Variance / Motion / Density (1–10 each).',
        '4. Present the direction and wait for explicit confirmation.',
        '',
        'Do not write any UI code until the direction is confirmed.',
      ].join('\n'),
    }
  })

  // /fix → triggers Fix Mode (10 sequential passes)
  on('command.run', { command: 'fix' }, $ => {
    $.ui.status(undefined)
    return {
      text: [
        'Apply Fix Mode using the design-quality skill.',
        'Run all 10 passes in strict sequence — complete each before starting the next:',
        '',
        '1. Spacing — 8px grid alignment, rhythm, grouping',
        '2. Color — remove slop patterns, build from a neutral ramp',
        '3. Icons — one library, one size, one stroke weight, currentColor',
        '4. Copy — remove emoji labels, calm the copy, make it product-specific',
        '5. Typography — hierarchy, weights, text-wrap: balance on headings',
        '6. Layout — alignment, density',
        '7. Details — concentric radii, shadow OR border (not both)',
        '8. Accessibility & Touch — focus states, aria-label, 44px targets',
        '9. Visuals — empty states, icon consistency, image aspect ratios',
        '10. Motion — last pass, only where it adds meaning',
      ].join('\n'),
    }
  })

  // /polish → triggers Polish Mode (10% speed walk)
  on('command.run', { command: 'polish' }, $ => {
    $.ui.status(undefined)
    return {
      text: [
        'Start Polish Mode using the design-quality skill.',
        'Slow the interface to 10% speed in browser DevTools (Animations panel).',
        'Walk every state: hover → focus → active → loading → empty → error.',
        'What feels off at 10% is what\'s wrong at full speed.',
        'Apply micro-fixes only. Do not restructure or redesign.',
      ].join('\n'),
    }
  })

  // Show hint in status bar when UI files are edited or created
  on('tool.call', { tool: 'Edit' }, async ($, e, next) => {
    const ran = await next(e)
    if (UI_EXTENSIONS.test(e.file_path)) {
      $.ui.status('/dq-review · /fix · /polish')
    }
    return ran
  })

  on('tool.call', { tool: 'Write' }, async ($, e, next) => {
    const ran = await next(e)
    if (UI_EXTENSIONS.test(e.file_path)) {
      $.ui.status('/dq-review · /fix · /polish')
    }
    return ran
  })
}
