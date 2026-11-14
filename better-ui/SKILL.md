---
name: better-ui
description: Design and build user interfaces at the level of the best work on Dribbble - art-directed, visually rich, deeply detailed and polished - instead of flat, generic "AI-looking" output. Use this whenever you create, restyle or review anything a person will look at in a browser or app - landing pages, marketing sites, dashboards, admin panels, web apps, mobile screens, components, forms, HTML prototypes, React/Vue/Svelte/Tailwind UI - including when the user only says "build me a page/app/site/dashboard for X" and never mentions design, and when they ask to make an existing UI look better, more premium, more modern, more polished or less generic. Skip it only for work with no visible result (backend, scripts, pure logic).
---

# Better UI

The bar for this skill is the work that gets attention in design communities: a confident art direction, visuals that are rich and specific, real depth, and a finish where nothing looks accidental. Aim there on every build.

Generic AI output and a great shot often use the same ingredients: cards, gradients, rounded corners, a product screenshot. What separates them is depth of execution.

- **Generic is shallow.** A flat fill, three icon cards, a grey box labelled "dashboard", one shadow copied everywhere, text sitting on a blank page. Each element is the first version of itself.
- **Great is deep.** A hero built around a product visual drawn in real detail, with pieces of it lifted out and floating beside it. A palette with a point of view. Type with character and tight control. Surfaces that sit in light. A dozen small designed details on every screen. Every element has been taken two steps past its first version.

So the job is neither restraint nor decoration. It is **commitment and detail**: commit to one strong direction, then execute every part of it more thoroughly than seems necessary. Expect to write a lot of markup. A hero visual alone is often 150 to 300 lines, and a dashboard has a dozen distinct modules; that is normal, and it is where the quality comes from. A short file is almost always a plain page.

Two things stay non-negotiable while you do this: the interface must work (real states, real responsiveness, readable contrast), and the content must be specific and honest. Rich and wrong is still wrong.

## 1. Find out whose design this is

- **An existing product** (styles, components, tokens, a Tailwind theme, a brand guide, a screenshot from the user): the direction is already decided. Read the tokens and a few screens, reuse the components, and bring the richness and finish of this skill *within* that system. Do not add a second styling system, font or accent. Skip the direction pick in step 3; use everything else.
- **A direction from the user** (a reference, a brand, "make it look like X"): that wins over the library below.
- **A blank slate**: continue.

## 2. Understand the job and write the content

A few lines, for yourself: what the product is, who is looking and in what situation, the one job of this screen, and its register: *persuade* (landing, pricing), *operate* (apps, dashboards, tools), or *read*.

Then draft the real content before any layout: the actual headline, labels, numbers, names. Make sample data plausible, internally consistent and right for the locale (currency, language, date formats). Specific content is what makes rich visuals convincing: a product mock filled with believable rows and figures looks real, and one filled with "Item 1" looks like a wireframe.

When the brief is thin, do not send a questionnaire. Assume specifically, build, and state your assumptions at the end.

Honesty rule: never use real company logos, real people's names or faces, or invented claims about real results. Sample people, fictional company names and example figures are fine and expected, inside product visuals and in proof sections alike. Where a marketing page needs proof you were not given (testimonials, customer logos, usage numbers), design the section fully with clearly fictional names, and tell the user in the handoff exactly which parts they must replace before publishing.

## 3. Commit to an art direction

Read `references/art-directions.md`. It is a library of complete directions, each with a palette, type pairing, shape and depth language, background atmosphere and signature devices, as ready-to-use tokens.

1. Shortlist the three directions that best suit this subject and audience. Include at least one that is not the obvious choice for the category.
2. Let the script choose among them, so the pick does not default to habit and different products end up looking different:
   ```bash
   node <this-skill-dir>/scripts/deal.cjs "<product name>" <id> <id> <id>
   ```
   (No Node? Take the one a typical competitor in this category would be least likely to use.)
3. **Tune it to the subject.** Shift the accent toward a colour from the product's world, decide the showpiece from what this product actually does, and add one device only this product would have. A direction used straight from the library is a template; a tuned one is a design.
4. Write the result as CSS custom properties at the top of the stylesheet, with a short comment naming the direction and what you tuned. Then use only those tokens.

Commit fully. A direction applied timidly (the palette but not the atmosphere, the font but not the scale, the cards but not the depth) produces exactly the bland middle this skill exists to avoid.

## 4. Design the showpiece first

Every strong shot has one thing that makes people stop: a showpiece. Decide what it is before laying out anything else, and give it a third or more of your effort.

- **Landing page:** the hero visual. Almost always the product itself, drawn in convincing detail in HTML/CSS/SVG (a real app window with navigation, rows, figures and a chart), with two to four detail cards lifted out and floating over its edges, set in an atmosphere (glow, grid, rings).
- **Dashboard or admin:** a full app shell with one hero module (the main chart or the key figure on a feature card) and supporting tiles that each carry a small visual of their own.
- **Mobile-first tool or app:** the core interaction given real character: a hero card with a progress ring or big figure, items with their own colour and icon, a custom control with a satisfying state change.

`references/showpiece.md` explains how to build these in code: product mocks, floating cards, charts, avatars, thumbnails, icons, illustration, device frames and atmospheres. Read it before you start; do not improvise a grey rectangle.

Then compose the rest of the screen around the showpiece, using the patterns for your register. Read the one that applies:

- `references/marketing.md` for landing and pricing pages.
- `references/product-ui.md` for dashboards, admin, apps and mobile tools.

## 5. Build with depth and finish

Read `references/polish.md` and apply its system from the first line, not at the end: content on surfaces rather than on the bare page, layered shadows with a light top edge, hairline borders, tinted neutrals, tight display type, a spacing rhythm, and the small details (pills, status dots, icon chips, key hints, sparklines, avatars) that make a screen feel designed. Give repeated elements variety: no row of tiles should be the same tile three times with different words.

Build the whole thing:

- **Every width.** The phone layout is designed, not shrunk: the showpiece is recomposed for a narrow screen and stays impressive there. The desktop layout uses its width with a real multi-column composition, never a phone column floating in empty space. No horizontal scroll.
- **Every state** a real person will meet: hover, focus, pressed, selected, empty, loading, error, long content. Controls that are on screen work.
- **Motion with purpose:** one composed entrance for the showpiece if it suits the direction, hover and press feedback everywhere, nothing that delays content. Respect `prefers-reduced-motion`.
- **The floor** in `references/craft.md`: contrast, focus visibility, labels, tap targets, a disciplined type scale, one grid. Richness never excuses unreadable text.

## 6. Render, measure, critique against the bar, fix

You cannot judge a design from its source. Render it:

```bash
node <this-skill-dir>/scripts/audit.cjs path/to/index.html --out .ui-audit
node <this-skill-dir>/scripts/audit.cjs http://localhost:5173/ --setup seed.js   # app with state
```

The script screenshots the page at 375, 768 and 1440px and prints an inventory plus measured problems: overflow, contrast, focus, tap targets, clipped text, uneven phone gutters, near-miss alignment, awkward wraps, repeated graphics, and a warning when a screen is visually thin. Tall pages are saved as several parts so that details stay legible: open every part, not just the first screen. Fix everything under BROKEN and ACCESSIBILITY, and resolve what is under CRAFT and RICHNESS. For apps, pass `--setup` with a few lines of JS that seed realistic data, because an empty app shows nothing. (No browser available? Say so in the handoff and review the source against `references/critique.md`.)

Then **open the screenshots and critique them as an art director would**, using `references/critique.md`. It has the rubric (art direction, showpiece, richness, depth and finish, colour, typography, composition, phone) with what a 5, a 7 and a 9 look like, and the usual fixes for each gap.

- If you can spawn a subagent, do: give it only the screenshot paths, the one-line brief and the path to `references/critique.md`, and ask for scores and the most damaging gaps. A reviewer who did not build the page sees what is there, not what was intended. Otherwise score it yourself, as harshly as a stranger would.
- Any dimension under 8 is unfinished. Fix the biggest gaps first. They are usually: the showpiece is not detailed enough, the sections after the first go flat, there is too little imagery and designed detail, and depth is timid.
- Render again and re-score. **Do at least two full rounds.** Three or four is normal for work that reaches the bar. The later rounds are where a competent page becomes a striking one.

Delete the audit folder when you are done unless the user wants it.

## 7. Hand off plainly

Tell the user, briefly: the direction you chose and how you tuned it, the assumptions you made, and what is placeholder or not wired up (sample data, fictional proof to replace, links that go nowhere). No adjectives about the result; they can see it.

## Ways this goes wrong

- **Timid execution.** A nice palette on a page that is still heading, paragraph, three boxes. The direction has to reach the composition, the visuals and the details.
- **An empty hero.** Headline, two buttons and a gradient is not a hero. Build the showpiece.
- **Shallow visuals.** A product mock made of five grey bars, a chart with no grid, axis or highlighted point. Fill visuals with believable, specific content at real density.
- **Text on a bare page.** Rows and tables sitting directly on the background with hairlines read as a document. Put content on surfaces, in a shell, with imagery.
- **No imagery.** Lists without thumbnails, people without avatars, features without illustrations, items without icons. Every repeated item should carry a small visual.
- **One good screen, then filler.** Each section after the first needs its own visual idea.
- **Sameness within the page.** Identical tiles, one shadow, one radius, one text size below the headline, one colour used for everything.
- **Decoration that fights the content.** Glow behind body text, low-contrast text on a gradient, animation on everything. Richness goes into visuals and surfaces; text stays effortless to read.
- **Stopping after the first render.** The first render is a draft.
