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

- **An existing product** (styles, components, tokens, a Tailwind theme, a brand guide, a screenshot from the user): the direction is already decided. Read the tokens and a few screens, reuse the components, and bring the richness and finish of this skill *within* that system. Do not add a second styling system, font or accent. In step 3, skip the finish kit and palette; still look for the one idea within the existing brand. Use everything else.
- **A direction from the user** (a reference, a brand, "make it look like X"): that wins over the library below.
- **A blank slate**: continue.

## 2. Understand the job and write the content

A few lines, for yourself: what the product is, who is looking and in what situation, the one job of this screen, and its register. The register decides what "rich" means, so get it right:

- *Persuade*: a landing or pricing page for a product. Rich means a detailed product visual, designed sections, layered surfaces.
- *Operate*: an app, dashboard or tool. Rich means a full shell, data drawn beautifully, imagery in every list. A personal or mobile-first app is the quiet end of this: one focal object and a lot of air.
- *Showcase*: a portfolio, studio, restaurant, fashion, event or personal site. Rich means large imagery and dramatic type with almost no interface. Cards, pills, glows and product-page sections are wrong here.
- *Read*: docs and articles. Typography and calm.

Then draft the real content before any layout: the actual headline, labels, numbers, names. Make sample data plausible, internally consistent and right for the locale (currency, language, date formats). Specific content is what makes rich visuals convincing: a product mock filled with believable rows and figures looks real, and one filled with "Item 1" looks like a wireframe.

When the brief is thin, do not send a questionnaire. Assume specifically, build, and state your assumptions at the end.

Honesty rule: never use real company logos, real people's names or faces, or invented claims about real results. Sample people, fictional company names and example figures are fine and expected, inside product visuals and in proof sections alike. Where a marketing page needs proof you were not given (testimonials, customer logos, usage numbers), design the section fully with clearly fictional names, and tell the user in the handoff exactly which parts they must replace before publishing.

## 3. Find the one idea, then commit to it

Polished work that follows a good template still looks like a template. What lifts a design into the top tier is **one ownable idea**: a visual concept taken from this product's own world, made the hero of the screen, and echoed through the details. A reviewer should be able to name it in a phrase ("departures as a split-flap board", "a playlist as a stack of record sleeves", "doses as a dotted scale on a pharmacy label").

Work it out in writing before any layout:

1. **Name and world.** If the product has no name, give it one with an image in it. List eight or more things from its world that can be drawn: objects, marks, materials, tools, rituals, the way its trade writes numbers.
2. **Choose the motif.** Pick the one that is most specific to this product, can be drawn simply, and can carry real data or content. A motif that could decorate any product (blobs, sparkles, generic rings, a stock gradient) is not one.
3. **Make it the hero device, large.** The showpiece in step 4 is built *from* the motif, at a scale that dominates the first screen, and it shows real content: the actual figures, the actual items. A motif tucked into a logo or a small strip has been wasted.
4. **Echo it three times, small:** in chart marks, progress bars, dividers, the empty state, the wordmark, a button state.
5. **Commit the palette to it.** A neutral base, one dominant colour used in large confident fields, and one hot accent for the thing that matters most. Take the colours from the motif's world. If items come in kinds, give them tints of one or two hues, not a rainbow.
6. **Give the type a voice.** The single most important figure or line is by far the largest thing on the screen (often 64 to 120px on desktop), in a face with character, with small quiet labels around it. Dramatic contrast of scale, not six sizes close together.
7. **Rank the screen.** Decide the first, second and third thing the eye should hit, and give them clearly different size and weight. A screen of equal cards has no idea.

Then choose the finish. Read `references/art-directions.md`: it is a library of finish kits (type pairing, shape and depth language, atmosphere, token structure). Shortlist the three that suit the idea and audience, and let the script deal one so the choice does not default to habit:

```bash
node <this-skill-dir>/scripts/deal.cjs "<product name>" <id> <id> <id>
```

Use the kit for its craft and **replace its colours and devices with your idea's**. The colours printed in the library are placeholders; shipping them unchanged is what makes a page look like a template. Write the result as CSS custom properties at the top of the stylesheet, with a comment stating the idea in one phrase, the motif, and the kit. Then use only those tokens.

Commit fully. An idea applied timidly (a motif in the logo, a nice palette on the same three boxes) produces exactly the bland middle this skill exists to avoid.

## 4. Design the showpiece first

Every strong shot has one thing that makes people stop: a showpiece. It is where your idea from step 3 becomes visible. Decide what it is before laying out anything else, and give it a third or more of your effort.

- **Landing page:** the hero visual. Almost always the product itself, drawn in convincing detail in HTML/CSS/SVG (a real app window with navigation, rows, figures and a chart), with two to four detail cards lifted out and floating over its edges, set in an atmosphere (glow, grid, rings).
- **Dashboard or admin:** a full app shell with one hero module (the main chart or the key figure on a feature card) and supporting tiles that each carry a small visual of their own.
- **Mobile-first tool or app:** one focal object that carries the idea and the key figure, at about twice the size that feels sufficient, with a custom control that has a satisfying state change. Few other modules.
- **Showcase site:** one dominant image interlocked with one enormous line of type.

`references/showpiece.md` explains how to build these in code: product mocks, floating cards, charts, avatars, thumbnails, icons, illustration, device frames and atmospheres. Read it before you start; do not improvise a grey rectangle.

Then compose the rest of the screen around the showpiece, using the patterns for your register. Read the one that applies:

- `references/marketing.md` for landing and pricing pages.
- `references/product-ui.md` for dashboards, admin, apps and mobile tools.
- `references/editorial.md` for showcase sites. Read it before `showpiece.md` and `polish.md`; where they disagree, it wins.

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
node <this-skill-dir>/scripts/audit.cjs index.html --register showcase           # portfolio, studio, restaurant
```

The script screenshots the page at 375, 768 and 1440px and prints an inventory plus measured problems: overflow, contrast, focus, tap targets, clipped text, uneven phone gutters, near-miss alignment, awkward wraps, repeated graphics, and a warning when a screen is visually thin. Tall pages are saved as several parts so that details stay legible: open every part, not just the first screen. Fix everything under BROKEN and ACCESSIBILITY, and resolve what is under CRAFT and RICHNESS: each line there is something a demanding reviewer would mark the work down for (text hidden under a floating card, a half-empty tile, clipped strings, uneven margins, cards that almost align). Keep going until the report is clean or each remaining line is a decision you can defend. For apps, pass `--setup` with a few lines of JS that seed realistic data, because an empty app shows nothing. (No browser available? Say so in the handoff and review the source against `references/critique.md`.)

Then **open the screenshots and critique them as an art director would**, using `references/critique.md`. It has the rubric (art direction, showpiece, richness, depth and finish, colour, typography, composition, phone) with what a 5, a 7 and a 9 look like, and the usual fixes for each gap.

- **Get an independent review.** If you have any tool that starts a subagent (Task, Agent or similar), use it for this: it is the single most effective step in the skill, and skipping it is the usual reason work stops one notch short. Give the reviewer the brief at the end of `references/critique.md` with the screenshot paths filled in, and nothing about your intentions. A reviewer who did not build the page sees what is there, not what was meant. Only if you truly cannot spawn one, score it yourself, as harshly as a stranger would, and say so in the handoff.
- Any dimension under 8 is unfinished. Fix the reviewer's gaps in order. They are usually: the showpiece is not detailed enough, overlapping elements hide content, sections after the first go flat, imagery is generic or repeated, tiles are half empty, and depth is timid.
- Render again, run the audit again, and ask a **fresh** reviewer. **Do at least two full review rounds.** Three is normal for work that reaches the bar. The later rounds are where a competent page becomes a striking one.

Delete the audit folder when you are done unless the user wants it.

## 7. Hand off plainly

Tell the user, briefly: the direction you chose and how you tuned it, the assumptions you made, and what is placeholder or not wired up (sample data, fictional proof to replace, links that go nowhere). No adjectives about the result; they can see it.

## Ways this goes wrong

- **No idea.** Well-made cards in a pleasant palette that could belong to any product in the category. Polished and forgettable. Go back to step 3.
- **Timid execution.** A nice palette on a page that is still heading, paragraph, three boxes. The idea has to reach the composition, the visuals and the details.
- **An empty hero.** Headline, two buttons and a gradient is not a hero. Build the showpiece.
- **Shallow visuals.** A product mock made of five grey bars, a chart with no grid, axis or highlighted point. Fill visuals with believable, specific content at real density.
- **Text on a bare page.** Rows and tables sitting directly on the background with hairlines read as a document. Put content on surfaces, in a shell, with imagery.
- **No imagery.** Lists without thumbnails, people without avatars, features without illustrations, items without icons. Every repeated item should carry a small visual.
- **One good screen, then filler.** Each section after the first needs its own visual idea.
- **Sameness within the page.** Identical tiles of equal weight, one shadow, one radius, one text size below the headline.
- **A rainbow.** A different pastel on every tile and a different hue on every item. Commit to a base, one dominant colour and one hot accent.
- **Decoration that fights the content.** Glow behind body text, low-contrast text on a gradient, animation on everything. Richness goes into visuals and surfaces; text stays effortless to read.
- **Stopping after the first render.** The first render is a draft.
