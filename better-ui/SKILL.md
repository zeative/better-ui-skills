---
name: better-ui
description: Design and build user interfaces that look like real, professional products - the clean, polished, well-made work that is popular on Dribbble - instead of flat, generic "AI-looking" output or overdesigned, gimmicky output. Use this whenever you create, restyle or review anything a person will look at in a browser or app - landing pages, marketing sites, dashboards, admin panels, web apps, mobile screens, components, forms, HTML prototypes, React/Vue/Svelte/Tailwind UI - including when the user only says "build me a page/app/site/dashboard for X" and never mentions design, and when they ask to make an existing UI look better, more premium, more modern, more polished or less generic. Skip it only for work with no visible result (backend, scripts, pure logic).
---

# Better UI

The bar is the interface work that is popular on Dribbble, and the products good teams actually ship. Look at that work closely and it is not exotic. It is **familiar patterns executed with precision**: a clean sans-serif, a light neutral canvas, white cards, one brand colour, real-looking content, small consistent icons, generous but even spacing, and not one element out of place.

AI-built interfaces miss this bar in two opposite ways, and both are instantly recognisable:

- **Too plain.** A page of text and default components. No brand, no hierarchy, no visual moment, nothing a designer drew. It reads as "rendered HTML".
- **Too much.** An invented theme or metaphor pushed onto the interface (stamps, tickets, beads, paper, chalkboards), skeuomorphic textures, decorative display fonts, clever copy, every surface styled. It reads as a costume, and no real product team would ship it.

The professional middle is narrow and specific: **the conventional layout for this kind of screen, done carefully, with one or two well-made visual moments and real content.** That is what this skill builds.

Two things are non-negotiable throughout: the interface must work (real states, responsive, readable contrast), and the content must be specific and honest.

## 1. Find out whose design this is

- **An existing product** (styles, components, tokens, a Tailwind theme, a brand guide, screenshots): read the tokens and a few screens and work inside that system. Do not add a second font, accent or component style. Apply the craft in this skill within it.
- **A direction from the user** (a reference, a brand, "make it look like X"): that wins over the defaults below.
- **A blank slate**: continue.

## 2. Understand the job and write the content

Note for yourself: what the product is, who uses it and where (phone on the go, desktop at work), the one job of this screen, and its kind:

- *Mobile-first app* (tracker, wallet, workout, to-do, booking): looks like a native app.
- *Dashboard or admin*: an app shell with data.
- *Landing or marketing page*: sells a product.
- *Showcase site* (portfolio, studio, restaurant, event): imagery and type; read `references/editorial.md`.
- *Docs or reading*: typography and calm.

Then write the real content before any layout: a product name, the headline, labels, numbers, names, dates. Plain product language, the way a good team's app talks: "3 of 5 done today", "$595 left this month", "Best streak 12 days". No metaphors in the copy, no jokes, no notes that describe the interface to the viewer. Sample data is plausible, internally consistent and right for the locale.

When the brief is thin, assume specifically, build, and list your assumptions at the end. Never use real company logos, real people's names or faces, or invented claims about real results; fictional names and example figures are fine.

## 3. Set up the system

Read `references/system.md` and write its tokens at the top of the stylesheet before any component. In short:

- **Type:** one sans-serif family (Inter, Plus Jakarta Sans, Manrope, DM Sans, Geist or the system UI font), weights 400/500/600, tabular figures for numbers. A compact scale: 12, 13, 14, 16, 18, 20, 24, 32, with 40 to 56 only for a landing hero. Serif or display faces only for showcase sites or when the brand already has one.
- **Colour:** a light neutral canvas (or a near-black one for a dark app), white or slightly raised surfaces, two text greys, one brand colour chosen to fit the category, and semantic green, amber and red for status. Category colours, if needed, are soft tints used on small icon chips and chart series.
- **Shape and depth:** one radius scale (for example 8, 12, 16, 24, full), hairline borders or a soft two-layer shadow, never both heavy. Flat and clean; no textures, grain, paper, bevels or glows behind text.
- **Icons:** one line-icon set at one stroke width, usually inside soft tinted chips. Native emoji or 3D-style emoji are acceptable as item icons in consumer apps, used consistently.

## 4. Use the conventional layout for this kind of screen

Popular shots are not novel layouts; they are the standard layout of their kind, filled with real content and finished. Read the reference for your kind and follow its anatomy:

- `references/product-ui.md` for mobile-first apps, dashboards and admin.
- `references/marketing.md` for landing and pricing pages.
- `references/editorial.md` for showcase sites.

Every screen still needs a clear first, second and third thing to look at, and **one or two visual moments** that a designer clearly made: a summary card on the brand colour with a well-drawn chart, a product screenshot in a clean frame, a ring, a photo, a set of friendly item icons. `references/showpiece.md` explains how to draw these well in HTML, CSS and SVG. One or two, not ten: the rest of the screen stays calm so those moments carry.

## 5. Build it properly

- **Every width.** A mobile-first app is designed at 375px first and looks like a native app there: safe-area top padding, a header, content, a bottom tab bar. On desktop it becomes a sensible layout (a centred app column with side panels, or a proper shell), not a stretched phone.
- **Every state** a person will meet: hover, focus, pressed, selected, empty, loading, error, long content. Controls on screen work. Data persists if the app stores anything.
- **Restraint in motion:** quick hover and press feedback, a subtle state change on completion. Respect `prefers-reduced-motion`.
- **The floor** in `references/craft.md`: contrast, focus, labels, 44px tap targets, one grid, no overflow.
- **Finish:** `references/polish.md` covers alignment, spacing, shadows, type details and the small things that separate shipped work from a draft.

## 6. Render, audit, review against real products, fix

You cannot judge a design from its source. Render it:

```bash
node <this-skill-dir>/scripts/audit.cjs path/to/index.html --out .ui-audit
node <this-skill-dir>/scripts/audit.cjs http://localhost:5173/ --setup seed.js   # app with state
```

The script screenshots the page at 375, 768 and 1440px and prints measured problems: overflow, contrast, focus, tap targets, clipped text, uneven gutters, near-miss alignment, awkward wraps. Fix everything under BROKEN and ACCESSIBILITY and resolve the rest. Open every screenshot part.

Then review the screenshots with `references/critique.md`. The test is the one a designer applies when scrolling Dribbble: **would this pass as a real, professionally made product, among the popular shots of its category?** If you can start a subagent (Task, Agent or similar), have a fresh one review it with the brief at the end of `critique.md` and nothing about your intentions. Fix what it flags in order, render again, and review once more with a fresh reviewer. Two rounds is usually enough; stop after three.

Delete the audit folder when you are done unless the user wants it.

## 7. Hand off plainly

Tell the user briefly: what you built, the assumptions you made, and what is placeholder (sample data, fictional names, links that go nowhere). No adjectives about the result.

## Ways this goes wrong

- **A theme instead of a product.** The habit tracker becomes a stamp card, the budget an abacus, the workout a barbell. Real products use the standard pattern (a list, a ring, a progress bar) and get their character from colour, type, icons and finish. Drop the metaphor.
- **Costume finishes.** Paper texture, grain, wood, brass, ticket notches, postmarks, chalk, neon glows, heavy offset shadows. Flat, clean surfaces.
- **Display fonts on product UI.** A serif or condensed display face for app headings and numbers. Use the one sans family; let size and weight do the work.
- **Clever copy.** Puns, metaphors and narrative labels ("Two to go", "postmark", "links closed"), or text that explains the design to the viewer. Write what a shipped app says.
- **Too plain.** No brand mark, no header, no tab bar, rows of identical default cards, one colour used for everything, nothing a designer drew. Add the app chrome, a summary card, item icons and one clear visual moment.
- **Everything styled.** Every card a different colour or treatment, gradients on everything, five accent colours. One brand colour, quiet surfaces, colour where it means something.
- **Oversized type.** A 96px number on a phone. Hero figures in apps are 28 to 40px; landing headlines 40 to 56px.
- **Wireframe content.** "Item 1", lorem ipsum, a grey box labelled "chart". Real names, figures and a real chart.
- **Stopping after the first render.** The first render is a draft.
