---
name: better-ui
description: Design and build user interfaces that are specific to the product, restrained, and verifiably well made instead of generic "AI-looking" output. Use this whenever you create, restyle or review anything a person will look at in a browser or app - landing pages, marketing sites, dashboards, admin panels, web apps, mobile screens, components, forms, HTML prototypes, React/Vue/Svelte/Tailwind UI - including when the user only says "build me a page/app/site/dashboard for X" and never mentions design, and when they ask to make an existing UI look better, cleaner, more polished, more professional, less generic or less like AI made it. Skip it only for work with no visible result (backend, scripts, pure logic).
---

# Better UI

Generic UI is not caused by bad taste. It is caused by nobody deciding. At every choice point (palette, typeface, layout, headline, what goes in the third card) the easiest thing to produce is the most common thing, and a page made entirely of most-common choices looks like every other page. Telling yourself to "avoid the purple gradient" does not fix this: it only moves you to the next most common answer, which today is a cream background, a serif headline with one italic word, and an earthy accent. People spot that one just as fast.

So this skill does not hand you a style. It asks for three things, in this order:

1. **Specific** - every visible decision traces back to this product, this user and this content.
2. **Restrained** - nothing is on the screen unless it carries information or helps someone act. No gimmicks.
3. **Verified** - you render the result, look at it and measure it, because you cannot see a layout by reading its source.

Scale the process to the task. A new page or app deserves all seven steps. A small change inside an existing screen needs step 1, then 5 to 7.

## 1. Find out whose design this is

Before designing anything, look at what already exists.

- **There is an existing product** (a codebase with styles, a component library, a tokens file, a Tailwind theme, a brand guide, or a screenshot the user gave you): the design is already decided and your job is to fit in. Read the tokens and two or three existing screens, reuse the existing components, and express anything new in the project's own values. Do not introduce a second styling system, a new font or a new accent colour. If you believe the existing system is the problem, say so and ask; do not quietly replace it. Skip step 4 and use the rest of this skill for craft.
- **The user gave a direction** (a reference, a brand, "make it look like X", specific colours): that wins over everything below.
- **It is a blank slate**: continue.

## 2. Understand the job

Write down, in a few lines, for yourself:

- **Subject** - what this product actually is, concretely.
- **Person and moment** - who is looking at it and in what situation (on a phone at the counter between customers; at a desk all day; once, sceptical, arriving from a search).
- **The one job** of this screen - what the person must be able to see or do first.
- **Register** - *operate* (a tool people work in: apps, dashboards, admin), *persuade* (a page that must convince: landing, pricing), or *read* (docs, articles). This sets density, how much personality is welcome, and which reference file applies.

When the brief is thin, do not send back a questionnaire. Make specific assumptions, build on them, and state them when you hand off. Ask first only when a wrong guess would waste the entire build.

## 3. Write the content before the layout

Layout is the arrangement of content, so there is nothing to arrange until the content exists. Draft the real words and the real data first.

- Write the actual headline, labels, button text, empty-state and error messages. Say what the thing does in plain words a customer would use. If a sentence could sit unchanged on a competitor's site, it is not saying anything yet.
- Make sample data plausible and internally consistent: totals that add up, dates that fall in order, names and prices that fit the domain and locale (currency format, language, units). Include the awkward cases a real system has: a long name, a zero, a failed item.
- Never invent proof. Fake testimonials, customer logos, user counts, ratings and "trusted by" rows are fabrications that a real business would then publish. Leave proof out, or mark a clearly labelled placeholder for the user to fill.
- Buttons are a verb plus an object ("Export report"). Use sentence case. Cut any text that explains what the interface already shows.

## 4. Choose a direction on purpose

This is the step that separates a designed page from a generated one. Read `references/direction.md` for the method in full; in short:

1. **Name your default.** Write one line describing what you would produce for any brief like this one. That is the prior. It is allowed to win, but only on its merits.
2. **Collect material from the subject's world**: the artefacts its users already handle, where and how the screen is used, the emotional weight of the task, the conventions of tools they already trust.
3. **Draft three directions** from that material, one line each, that genuinely differ from each other and from the default (different ground, type classification, density, shape).
4. **Pick one** and write one sentence on why it fits this audience and job better than the others.
5. **Run the swap test**: if you replaced the name and copy with a different product's, would the design fit just as well? If yes, it is still generic; go back to the material.

Then record the decisions as a short block (keep it as a comment at the top of the stylesheet or tokens file, so the next person or session inherits it):

```
Direction: <one sentence: what it should feel like and why that suits this user>
Type:      <family for text, family for display if different, why; the size scale>
Colour:    <ground, ink, one accent and what it is reserved for, status colours>
Shape:     <radius set, borders vs shadows, density>
Signature: <the one element that could only belong to this product>
Not doing: <the defaults you considered and set aside>
```

One signature, not five. Spend distinctiveness in a single place and let everything else be quiet and correct. For tools people use all day, the right amount of personality is often very small, and "calm, dense, familiar" is a legitimate direction as long as you chose it.

## 5. Build from a system

Define tokens before writing components, and then use nothing else. This is what makes a page look made by one hand; without it you get twenty font sizes and ten corner radii, each one reasonable locally.

- **Type**: at most two families; a scale of roughly 5 to 8 sizes; two or three weights.
- **Colour**: neutrals tinted slightly toward the brand hue, one accent with a defined job, status colours only for status. Define them as custom properties with role names (`--surface`, `--ink-muted`, `--accent`), not appearance names.
- **Space**: one scale on a 4px base (4, 8, 12, 16, 24, 32, 48, 64, 96).
- **Shape**: two or three radii, one elevation approach (rules, or borders, or a small shadow scale).

When you need a value that is not in the system, either the system is missing a step (add it deliberately) or the value is wrong.

Then build the whole thing, not the screenshot of it:

- **Every state**, because real use is mostly not the happy path: empty, loading, error, one item, many items, long content, disabled, hover, keyboard focus, pressed, selected, success. A feature without its empty and error states is unfinished.
- **Every width**, from a 320px phone to a wide desktop, with layout that reflows rather than shrinks. Touch targets at least 44px on touch layouts.
- **Keyboard and assistive tech**: semantic elements, labels on every field, names on icon-only buttons, a visible `:focus-visible` style, one `<h1>`, text contrast of at least 4.5:1 (3:1 for large text).
- **Interaction that works**: if a control is on screen it does something, or it is not on screen. Data the user enters survives a reload when that is what they would expect.

Detailed, numeric guidance lives in the reference files. Read the ones that apply before building:

- `references/craft.md` - typography, colour, spacing, surfaces, motion, accessibility. Always relevant.
- `references/product-ui.md` - apps, dashboards, tables, forms, charts, states. Read for the *operate* register.
- `references/marketing.md` - landing and pricing pages. Read for the *persuade* register.

## 6. Look, measure, fix

You have been working blind. Now render it.

```bash
node <this-skill-dir>/scripts/audit.cjs path/to/index.html --out .ui-audit
node <this-skill-dir>/scripts/audit.cjs http://localhost:5173/ --setup seed.js   # app with state
```

The script renders the page at 375, 768 and 1440px, saves screenshots, and prints an inventory (every font size, colour, radius and shadow actually in use) plus measured problems: overflow, contrast failures, invisible keyboard focus, small tap targets, unlabelled controls, type-scale and radius sprawl, and common unchosen defaults. For anything with state, pass `--setup` with a few lines of JS that seed realistic data or open the view you want to check: an empty app tells you almost nothing. If the script cannot find a browser it says so; then use whatever browser or screenshot tool you do have, and failing that, walk the checklist in `references/craft.md` against the source.

Then **read the screenshots** (open the image files), phone width first, and go through this in order. Earlier items matter more.

1. **First glance.** What does the eye land on first? Is that the most important thing for the one job? If three things compete, the hierarchy is not decided yet.
2. **Squint.** Blur your attention: do the groups read as groups, and is there a clear primary action per view? Is anything loud that should be quiet (borders, icons, labels, decoration)?
3. **Edges and rhythm.** Do things line up on shared edges? Is spacing inside groups clearly tighter than spacing between them? Is anything almost aligned or almost the same size?
4. **Text.** Is every piece of text comfortable to read at that width: size, line length, contrast, wrapping? Any orphaned words, clipped labels, or numbers that should align and do not?
5. **Phone.** Did the layout reflow into something designed for a thumb, or just get narrower?
6. **Subtract.** For each decorative element, each container, each label: would anything be lost if it were removed? If not, remove it.
7. **Swap test, again**, against the rendered page rather than the plan.

Fix what you find and run it again. Treat the report's BROKEN and ACCESSIBILITY sections as bugs. Treat CRAFT as inconsistencies to resolve or justify, and REFLEXES as questions: each is fine when it was chosen and has a reason, and a problem when it merely arrived. Two or three rounds is normal; stop when a round finds nothing you would be embarrassed by. Delete the audit output folder when you are done unless the user wants it.

You wrote this page, so you will tend to see what you intended rather than what is there. The measurements do not share that bias, which is why they come first. If you are able to hand the screenshots to a fresh reviewer with no context (a subagent given only the images and the brief), that is the best check available for a page that matters.

## 7. Hand off plainly

Tell the user, briefly: the direction you chose and why, the assumptions you made about audience or content, and anything that is mocked or not wired up (placeholder links, sample data, proof they need to supply). Do not describe the result with adjectives; they can see it.

## Things that need a reason

None of these is banned. Each is on this list because it usually shows up without anyone having chosen it. Use one when you can say what it does for this product; otherwise leave it out. `references/direction.md` explains where they come from.

- A gradient, glow, blur or glass panel that carries no information.
- An icon whose only job is to sit above a heading; emoji used as icons.
- A container (card, box, border) around something that space alone would group.
- A small uppercase label above a heading; a pill badge above the headline.
- Colour that is not encoding anything: a different hue per card, coloured stripes on card edges.
- Animation on load or scroll that does not explain a change the user caused.
- A section that exists because pages like this usually have one.
- A number, badge or status that is not backed by real data.
- Centred everything; three equal columns; every corner the same large radius.
