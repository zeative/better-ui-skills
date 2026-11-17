---
name: better-ui
description: Design and build user interfaces that look like real, professional products - the clean, polished, well-made work that is popular on Dribbble - instead of flat, generic "AI-looking" output or overdesigned, gimmicky output. Use this whenever you create, restyle or review anything a person will look at in a browser or app - landing pages, marketing sites, dashboards, admin panels, web apps, mobile screens, components, forms, HTML prototypes, React/Vue/Svelte/Tailwind UI - including when the user only says "build me a page/app/site/dashboard for X" and never mentions design, and when they ask to make an existing UI look better, more premium, more modern, more polished or less generic. Skip it only for work with no visible result (backend, scripts, pure logic).
license: MIT
---

# Better UI

The bar is the interface work that is popular on Dribbble, and the products good teams actually ship. Look at that work closely and it is not exotic. It is **familiar patterns executed with precision**: a clean sans-serif, a light neutral canvas, white cards, one brand colour, real-looking content, small consistent icons, generous but even spacing, and not one element out of place.

AI-built interfaces miss this bar in two opposite ways, and both are instantly recognisable:

- **Too plain.** A page of text and default components. No brand, no hierarchy, no visual moment, nothing a designer drew. It reads as "rendered HTML".
- **Too much.** An invented theme or metaphor pushed onto the interface (stamps, tickets, beads, paper, chalkboards), skeuomorphic textures, decorative display fonts, clever copy, every surface styled. It reads as a costume, and no real product team would ship it.

The professional middle is narrow and specific: **the conventional layout for this kind of screen, done carefully, with one or two well-made visual moments and real content.** That is what this skill builds.

Two things are non-negotiable throughout: the interface must work (real states, responsive, readable contrast), and the content must be specific and honest.

**Web pages are judged differently.** Landing pages, marketing sites, event pages, restaurants, portfolios and other sites people visit rather than use all day are compared with the best of Awwwards and Godly, where art direction wins and the conventional layout looks like a template. For these, explore before you build and commit to one bold direction (`references/web-directions.md`). The fixed values, budgets and audit in this skill are a **floor** (hierarchy, legibility, spacing, accessibility, no broken layout), **not a ceiling on creativity**: a chosen direction may bring its own display face and sizes, colour fields, full-bleed imagery, unusual grids and motion, as long as it stays legible, consistent and right for the brand.

## 1. Find out whose design this is

- **An existing product** (styles, components, tokens, a Tailwind theme, a brand guide, screenshots): read the tokens and a few screens and work inside that system. Do not add a second font, accent or component style. Apply the craft in this skill within it.
- **A redesign of a live product**, even "redesign everything" or "rombak total": its users should still recognise it. Keep the logo, the brand colour, the character of the type (a mono or tabular face stays) and, above all, the **density** and the information on each screen. Change what is actually wrong: hierarchy, alignment, inconsistent components, missing states, cramped or broken mobile layouts, empty screens. Before building, write down what the current design does well and keep it. A redesign that swaps a product's identity for this skill's defaults is a downgrade, however polished.
- **Size the change to the problem.** Before changing an existing screen, audit it: render it, then list every problem you see with where it is (the checklist in `references/critique.md`). Then decide honestly. *Many problems* across colour, type, spacing and copy: rebuild it with this skill. *A few*: polish only those, keeping the palette, type, layout and visuals, and offer bigger ideas as suggestions. *None that matter*: say so and suggest two or three small refinements. Never change a good screen just to make it look different, and never replace removed decoration with new decoration. Keep its content: the same sections, figures and modules, with no invented customers, tables or features. A better way to show the data that is already there (a mirrored comparison instead of plain bars, a rendered object beside the figure it counts) is the redesign; new modules are suggestions in the handoff.
- **A direction from the user** (a reference, a brand, "make it look like X"): that wins over the defaults below.
- **A blank slate**: continue.

## 2. Understand the job and write the content

Note for yourself: what the product is, who uses it and where (phone on the go, desktop at work), the one job of this screen, and its kind:

- *Mobile-first app* (tracker, wallet, workout, to-do, booking): looks like a native app.
- *Dashboard or admin*: an app shell with data.
- *Professional or data-dense tool* (trading terminal, market data, analytics workbench, ops console, developer tool): people use it for hours and read it like a table; density is the feature. Read "Dense professional tools" in `references/product-ui.md` first: most of the dashboard advice does not apply.
- *Landing or marketing page*: sells a product.
- *Showcase site* (portfolio, studio, restaurant, event): imagery and type; read `references/editorial.md`.
- *Docs or reading*: typography and calm.

Then write two more lines for yourself:

- **Character:** two or three concrete words for how it should feel ("calm, exact, a little warm"; "fast, technical"). Not clean, modern, sleek, minimal or premium: those describe every template.
- **Signature:** one small detail only this product would have, used consistently where it belongs (a live status dot for a monitoring tool, keycaps for a developer tool, a route line for a delivery app). One, not five.

Then write the real content before any layout: a product name, the headline, labels, numbers, names, dates. Plain product language, the way a good team's app talks: "3 of 5 done today", "$595 left this month", "Best streak 12 days". No metaphors in the copy, no jokes, no notes that describe the interface to the viewer. Sample data is plausible, internally consistent and right for the locale, and it reads like real life: transactions from familiar kinds of merchants with ordinary names (a supermarket, a coffee chain, a streaming service, a fuel station; well-known merchant names as transaction text are fine, logos are not), people with ordinary names, habits people actually keep. Invented-sounding filler ("Northwind Studio", "Juniper Café", "Kite Mobile") gives a mock-up away. So does the set every generated finance app reaches for (Blue Bottle Coffee, Trader Joe's, Whole Foods, Starbucks, Chipotle, Uber), and so does hyper-local trivia that reads as researched: mix a few well-known national names with plain descriptive ones ("Corner bakery", "Rent – May", "Electric bill").

Write each string for the space it will sit in: `references/copy.md` gives lengths by element (a 6 to 10 word headline over two lines, 1 to 3 word buttons that never wrap, card bodies within about 20% of each other), how siblings match in form and length, and one natural language per interface. If a string does not fit, rewrite it shorter; do not shrink the type.

Copy that gives a mock-up away, and that real products never ship:
- **Captions that explain the interface** ("Dashed line shows your daily average", "Tap the circle to complete a habit", "Days over $400 are capped"). Labels, legends and axis values do that job; delete the sentence.
- **Numbers that disagree.** A streak of 0 next to a workout done today, a ring at 60% beside "2 of 5". Derive every count, streak, percentage and total from the same sample data in code.
- **Contradictions** between parts of a screen ("Rest day" above a button saying "Train leg day today"). Read each screen top to bottom once as a user would.
- **Developer phrasing** ("Saved on this device", "Remove the example habits", "Sample data").
- **Changes without a reference.** "+12%" says nothing; "+12% vs last month" does.
- **Shouting and filler.** No exclamation marks, no hype words (seamless, supercharge, unlock, magic), no "New ✨" or "AI-powered" badges, no trailing periods on labels, buttons and headings, sentence case rather than uppercase tracked labels. In work tools and dashboards the title names the page or period ("October 2026"), not a greeting; personal consumer apps may greet the user.

Never show a note about sample data on the main screens. Put "Clear sample data" or "Start fresh" in a settings screen or menu, and mention it in the handoff.

When the brief is thin, assume specifically, build, and list your assumptions at the end. Never use real company logos, real people's names or faces, or invented claims about real results; fictional names and example figures are fine.

## 3. Set up the system

Read `references/spec.md` first: it fixes every size, space, radius, type style and colour role as one value for phone apps, desktop apps and dashboards, professional data tools and landing pages, chosen from Apple's and Google's guidelines, Refactoring UI, Practical UI and Nielsen Norman Group research. Run the palette command that `look.cjs` prints and paste its output at the top of the stylesheet, copy `assets/tokens.css` verbatim below it, and build only from those tokens; never interpolate or invent a value. Where any other file gives a range, `spec.md` decides. Then read `references/system.md` for the look. In short:

- **A look:** one contemporary look (bright and clean, dark with one neon, monochrome, fresh gradient) on a neutral canvas; no pastel canvases or candy-coloured cards: a palette and surface treatment, not a theme. On a blank slate, deal it rather than choosing by habit, because habit lands on the same indigo or emerald every generated app uses:
  ```bash
  node <this-skill-dir>/scripts/look.cjs "<product name>" <finance|crypto|fitness|habits|wellness|sleep|health|productivity|commerce|saas|food|travel|media|other>
  ```
  Pick the closest category: `media` for music, video, podcasts and games; `crypto` for crypto, trading and investing; `sleep` for meditation and sleep. These lean dark, because their content (artwork, charts, calm) reads best on a dark ground. It prints a look, brand colour, accent, font, mono and a `palette.cjs` command that turns the brand into the full colour system (a 12-step brand scale, neutrals tinted toward it, roles, tinted shadows) for light and dark. Re-deal with `--not <n>` only if the result clearly does not suit the brief.
- **Type:** read `references/typography.md`. One sans-serif family chosen for the character (Inter, Geist, Instrument Sans, Manrope, DM Sans, Hanken Grotesk and others listed there) plus a mono partner for meta, weights 400/500/600, tracking and line height set per size (large headings tighter and closer), tabular figures for numbers. Exactly five sizes per context, fixed in `spec.md` (phone 44/28/20/16/13, desktop 32/24/18/14/12, landing 64/40/20/16/13). Serif or display faces only for showcase sites or when the brand already has one.
- **Colour:** read `references/color.md`. All colour comes from the palette: neutrals tinted toward the brand hue, surfaces that separate by a lightness step plus a hairline plus a tinted shadow, and the brand used at several strengths (solid on the primary action and main chart, tinted on selected states, badges and feature icon chips, as text on links), never at one strength only, which looks flat. By area: 85 to 90% neutral, up to 10% tints, up to 3 to 5% solid. Category colours, if needed, are small marks, never pastel fills.
- **Shape and depth:** one radius scale (for example 8, 12, 16, 24, full), hairline borders or a soft two-layer shadow, never both heavy. Surfaces get a quiet material (a tone shift inside one neutral, a 1px top highlight, a hairline); no textures, grain, paper, heavy bevels or glows behind text. A mono partner font for meta (changes with their comparison, axis labels, counts, keycaps) makes tools and dashboards look made.
- **Icons and imagery:** one line-icon set at one stroke width for navigation and controls; 3D icons (Fluent 3D emoji from a pinned CDN, see `system.md`) in soft chips for items in consumer apps; illustrated avatars for people; real Unsplash photographs for food, products, hotels and places, and a real map (Leaflet with CARTO tiles) wherever there is a location. A screen of text and line icons alone looks unfinished.

## 4. Use the conventional layout for this kind of screen

Popular shots are not novel layouts; they are the standard layout of their kind, filled with real content and finished. Read the reference for your kind and follow its anatomy:

- `references/product-ui.md` for mobile-first apps, dashboards and admin.
- `references/web-directions.md` first for any web page (landing, marketing, event, showcase): choose and commit to a direction. Then `references/marketing.md` for landing and pricing pages (an event, conference, festival or venue page takes its poster hero, "When there is no software product").
- `references/editorial.md` for showcase sites.

Every screen also needs **one signature chart**: the main chart drawn in a form that current shots use rather than the library default. This period mirrored against the last (colour above the axis, grey below); series coloured to match dots shown beside their categories elsewhere on the screen; a hatched or striped bar for the current period among plain ones; ghost bars for the previous period; pill-shaped bars with a value chip above the highlighted one; a category breakdown as proportional bubbles or a segmented pill bar instead of a donut; radial segments; a single gradient-highlighted bar with a tooltip. Plain lines and plain donuts read as a template.

In a dashboard or app home the two moments are, by default: **a rendered object** in the card of any figure that counts a physical thing (payments or spend: a payment card; paid invoices: a receipt; bookings: a ticket; shipments: a label), and **the main chart in a designed form** (a mirrored comparison, ghost bars, series matching a legend). If a figure qualifies and the screen has no object, add it; if the main chart is a plain line or plain bars, redraw it. A large chart of plain bars is not a moment, however much space it fills. The bigger the main chart, the richer its form should be: when it takes a large part of the screen, draw this period mirrored against the last with smooth curves, or the series split by category in colours that match dots shown beside those categories; keep ghost bars and single highlighted bars for smaller charts.

Every screen still needs a clear first, second and third thing to look at. Read `references/hierarchy.md` for every screen: it sets out how to decide those levels and how to size and align figures, tables and charts (figure to label ratios, spacing inside and between groups, number alignment, chart sizes). It also needs **one or two visual moments** that a designer clearly made: a summary card that leads by size with a well-drawn chart in the brand colour, a product screenshot in a clean frame, a ring, a photo, a set of friendly item icons. `references/showpiece.md` explains how to draw these well in HTML, CSS and SVG. One or two, not ten: the rest of the screen stays calm so those moments carry.

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
node <this-skill-dir>/scripts/audit.cjs screener.html --register dense            # professional data tool
node <this-skill-dir>/scripts/audit.cjs mail.html --widths 1280,1440              # a brief that says desktop only
node <this-skill-dir>/scripts/audit.cjs site.html --register showcase             # a web page with an art direction (poster, editorial, colour field)
```

The script screenshots the page at 375, 768 and 1440px and prints measured problems: overflow, contrast, focus, tap targets, clipped text, uneven gutters, near-miss alignment, awkward wraps. Fix everything under BROKEN and ACCESSIBILITY, and every spec item under CRAFT (spacing off the scale, more than five font sizes, a boxed main chart, colour blocks, pastel fills, squeezed text): those are measured breaches of `spec.md`, not suggestions. Then resolve the rest. Open every screenshot part, the phone ones included.

For a site with several pages, audit **every page after the last change**, not a sample, and do not hand off while any page still has a BROKEN item. If subagents build pages, each one audits its own pages, and you run the audit again on all pages at the end, because later fixes to shared CSS break pages that passed earlier. Overlapping text in a tab row or toolbar on a phone is the usual casualty: make such rows scroll sideways with `flex: none` items and `white-space: nowrap`.

Then review with a method, not with taste: follow "The review method" in `references/ux-laws.md` (the audit's predicted gaze order, the squint test, the five-second test, grouping and alignment, a heuristic pass). Its laws of perception (Gestalt, visual weight, von Restorff, Hick, Miller, Fitts, Jakob) are what make a screen clear to almost everyone. Then review the screenshots with `references/critique.md`. The test is the one a designer applies when scrolling Dribbble: **would this pass as a real, professionally made product, among the popular shots of its category?** If you can start a subagent (Task, Agent or similar), have a fresh one review it with the brief at the end of `critique.md` and nothing about your intentions. Fix what it flags in order, render again, and review once more with a fresh reviewer. Two rounds is usually enough; stop after three.

Delete the audit folder when you are done unless the user wants it.

## 7. Hand off plainly

Tell the user briefly: what you built, the assumptions you made, and what is placeholder (sample data, fictional names, links that go nowhere). No adjectives about the result.

## Ways this goes wrong

- **A theme instead of a product.** The habit tracker becomes a stamp card, the budget an abacus, the workout a barbell. Real products use the standard pattern (a list, a ring, a progress bar) and get their character from colour, type, icons and finish. Drop the metaphor.
- **Costume finishes.** Paper texture, grain, wood, brass, ticket notches, postmarks, chalk, neon glows, heavy offset shadows. Flat, clean surfaces.
- **Display fonts on product UI.** A serif or condensed display face for app headings and numbers. Use the one sans family; let size and weight do the work.
- **Clever copy.** Puns, metaphors and narrative labels ("Two to go", "postmark", "links closed"), or text that explains the design to the viewer. Write what a shipped app says.
- **Too plain.** No brand mark, no header, no tab bar, rows of identical default cards, one colour used for everything, nothing a designer drew. Add the app chrome, a summary card, item icons and one clear visual moment.
- **A component-library default.** Inter, grey-100 cards, an indigo-to-violet gradient card, emoji tiles for every category: correct but with no point of view. Choose a look, a font with a little character, and 3D icons or avatars, so the screen is recognisably designed.
- **Everything styled.** Every card a different colour or treatment, gradients on everything, five accent colours. One brand colour, quiet surfaces, colour where it means something.
- **Dribbble-izing a professional tool.** A trading terminal or data tool turned into a consumer dashboard: a gradient hero card with a glow, a sparkline in every tile, letter-badge "logos" on every ticker, an "insights" card with coloured icon chips, half the rows it used to show. It looks like every generated fintech template and is worse to use. Pro tools stay dense, flat and tabular, and their main table or chart runs edge to edge instead of sitting inside a padded card.
- **Oversized type in product UI.** A 96px number on a phone. Hero figures in apps are 28 to 44px. (On web pages, oversized type is a legitimate direction when it is the idea of the page.)
- **The safe web page.** Centred headline, two buttons, a screenshot or stock photo, then rows of three cards: correct, and indistinguishable from every generated landing page. Pick a direction from `references/web-directions.md` and carry it through every section, not only the hero.
- **Browser defaults showing.** A native date picker, select arrow or checkbox inside an app screen. Style every control.
- **Wireframe content.** "Item 1", lorem ipsum, a grey box labelled "chart". Real names, figures and a real chart.
- **Decoration as filler.** A sparkline, icon chip and different hue on every stat tile, "New" badges, a promo card in the sidebar, a bento grid where each tile has its own gimmick. A stat tile is a label, a figure and its change; richness goes into one or two real moments, not spread over the chrome.
- **Stopping after the first render.** The first render is a draft.
