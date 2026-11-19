---
name: better-ui
description: Design and build user interfaces that look like real, professional products - the clean, polished, well-made work that is popular on Dribbble - instead of flat, generic "AI-looking" output or overdesigned, gimmicky output. Use this whenever you create, restyle or review anything a person will look at in a browser or app - landing pages, marketing sites, dashboards, admin panels, web apps, mobile screens, components, forms, HTML prototypes, React/Vue/Svelte/Tailwind UI - including when the user only says "build me a page/app/site/dashboard for X" and never mentions design, and when they ask to make an existing UI look better, more premium, more modern, more polished or less generic. Skip it only for work with no visible result (backend, scripts, pure logic).
license: MIT
---

# Better UI

The bar is the interface work that is popular in the design galleries, and the products good teams actually ship. Look at that work closely and it is not exotic. It is **familiar patterns executed with precision**: the standard layout of its kind, real-looking content, consistent sizes and spacing, a restrained palette, and not one element out of place. This skill reaches that bar by starting from that work: for every task it finds the strongest references of the same kind, measures them, and builds to their numbers.

AI-built interfaces miss this bar in two opposite ways, and both are instantly recognisable:

- **Too plain.** A page of text and default components. No brand, no hierarchy, no visual moment, nothing a designer drew. It reads as "rendered HTML".
- **Too much.** An invented theme or metaphor pushed onto the interface (stamps, tickets, beads, paper, chalkboards), skeuomorphic textures, decorative display fonts, clever copy, every surface styled. It reads as a costume, and no real product team would ship it.

The professional middle is narrow and specific: **the layout the best references of this kind use, done with their precision, with one or two well-made visual moments and real content.** That is what this skill builds.

Two things are non-negotiable throughout: the interface must work (real states, responsive, readable contrast), and the content must be specific and honest.

**Web pages are judged differently.** Landing pages, marketing sites, event pages, restaurants, portfolios and other sites people visit rather than use all day are compared with the best of Awwwards and Godly, where art direction wins and the conventional layout looks like a template. For these, find references of the strongest current sites of the kind, then commit to one bold direction they support (`references/web-directions.md`). The defaults, budgets and audit in this skill are a **floor** (hierarchy, legibility, spacing, accessibility, no broken layout), **not a ceiling on creativity**: a chosen direction may bring its own display face and sizes, colour fields, full-bleed imagery, unusual grids and motion, as long as it stays legible, consistent and right for the brand.

## The process you always follow

Every task, new or redesign, app or website, goes through these four steps. Skipping one is the most common reason the result looks generic:

1. **References.** Search for this exact topic and kind with `scripts/refs.cjs` and choose two or three strong references (step 3, `references/references.md`).
2. **Map and measure.** Run `scripts/match.cjs map` on the main reference with the brand colour: it gives the target image in the brand's colours, the tokens (`ref-map.css`: colours by role, padding, gaps, type sizes, block heights) and the slice list. Then complete the reference spec: paddings, gaps, heights, radii, type sizes and weights, typeface, borders, shadows, gradients and overlays, icon style and containers, colours and their areas, read with `match.cjs grid` and `palette` and `scripts/icons.cjs board`.
3. **Build from the numbers**, inside the existing product's identity when there is one (`improve.md`).
4. **Compare** each main screen with its reference using `scripts/match.cjs compare --brand <hex>` until it prints **PASS** (or each remaining FAIL is required by a floor, the user or the content), then check by eye what it cannot measure: typeface, icon style, shadows, gradients. One round is never enough. Then audit (step 7).

The handoff shows the reference links, the slice list, the spec table and the final comparison result. If you cannot produce them, a step was skipped: go back and do it. Only without a network do you continue with the kits alone, and you say so.

## Order of authority

When two instructions disagree, the higher one wins:

1. **The user's explicit direction, and the existing product's identity and function:** its brand, logo, content, links, forms and data (`improve.md`).
2. **The floors**, which nothing overrides: contrast 4.5:1 for text, 44px touch targets, 16px inputs on phones, no overflow or overlap at any width, every state working (`craft.md`, the floors in `spec.md`). Meet them without changing what is seen: a 44px hit area around a 34px control, 16px for the text inside fields only, a deeper text colour rather than larger text (`references.md`).
3. **The reference spec:** what was measured from the chosen references (the slice list of blocks, sizes, spacing, radii, typeface and weights, borders, shadows, gradients and overlays, icon style, colours and their areas, texture, signature components). These win over every default below.
4. **This skill's defaults:** the kits, the values in `spec.md`, the colour budgets in `color.md`, the type rules in `typography.md`, the anatomies in `product-ui.md`, `marketing.md`, `commerce.md` and `public-sector.md`, the directions, chart forms and visual moments. Use them where the references are silent, to choose between references, and when there is no network.

The filters in `critique.md` ("What reads as generated") and the audit apply at every level: a reference that has the generated look is a bad reference, not a licence.

## 1. Find out whose design this is

**Improving something that already exists** ("make it better", "bikin lebih bagus", "rapikan", "redesign" of a page, component or app you were given): read `references/improve.md` first and follow it, together with the references step: a redesign is measured against the best current examples of its kind, not only against its old self. It measures the page before and after, chooses the scope from the request and the audit, keeps the content, links, forms, SEO and brand intact, and works inside the existing stack instead of rewriting it.

- **An existing product** (styles, components, tokens, a Tailwind theme, a brand guide, screenshots): read the tokens and a few screens and work inside that system. Do not add a second font, accent or component style. Apply the craft in this skill within it.
- **A redesign of a live product**, even "redesign everything" or "rombak total": its users should still recognise it. Keep the logo, the brand colour, the character of the type (a mono or tabular face stays) and, above all, the **density** and the information on each screen. Change what is actually wrong: hierarchy, alignment, inconsistent components, missing states, cramped or broken mobile layouts, empty screens. Before building, write down what the current design does well and keep it. A redesign that swaps a product's identity for this skill's defaults is a downgrade, however polished. Density means the *working* screens of a tool; a dated public website whose problem is too much (thirty link cards, sliders, popups, banners of officials) keeps its information **reachable** (a top-tasks list, an A–Z page, the footer directory), not all on the homepage, and keeps its identity through the emblem's colours and the region's character, not through its old layout.
- **Size the change to the problem.** Before changing an existing screen, audit it: render it, then list every problem you see with where it is (the checklist in `references/critique.md`). Then decide honestly. *Many problems* across colour, type, spacing and copy: rebuild it with this skill. *A few*: polish only those, keeping the palette, type, layout and visuals, and offer bigger ideas as suggestions. *None that matter*: say so and suggest two or three small refinements (the only case that skips building; every other scope still uses references for what it touches). Never change a good screen just to make it look different, and never replace removed decoration with new decoration. Keep its content: the same sections, figures and modules, with no invented customers, tables or features. A better way to show the data that is already there (a mirrored comparison instead of plain bars, a rendered object beside the figure it counts) is the redesign; new modules are suggestions in the handoff.
- **A direction from the user** (a reference, a brand, "make it look like X"): that wins over the defaults below.
- **A blank slate**: continue.

## 2. Understand the job and write the content

Note for yourself: what the product is, who uses it and where (phone on the go, desktop at work), the one job of this screen, and its kind:

- *Mobile-first app* (tracker, wallet, workout, to-do, booking): looks like a native app.
- *Dashboard or admin*: an app shell with data.
- *Professional or data-dense tool* (trading terminal, market data, analytics workbench, ops console, developer tool): people use it for hours and read it like a table; density is the feature. Read "Dense professional tools" in `references/product-ui.md` first: most of the dashboard advice does not apply.
- *Landing or marketing page*: sells a product.
- *Shop* (product page, category listing, bag, checkout): read `references/commerce.md`.
- *Government or public service* (local government, ministry, agency, public hospital, utility): read `references/public-sector.md`. Usability first, and a regional identity that makes it recognisably this place.
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

## 3. Find references and break them down

**Before designing anything, find references** (`references/references.md`). Search the design galleries for this exact topic and kind, pick the two or three strongest, and write down how they are built: layout, type sizes and weights, colour proportions, radii and shadows, signature components. Then build by **slicing**: re-create those decisions, measured from the images, with this product's content. A screen built from strong references is far better than one built from rules alone.

```bash
node <this-skill-dir>/scripts/refs.cjs "<topic> app" "<topic> <main screen>" "<hardest component>" --n 12 --out .refs
node <this-skill-dir>/scripts/refs.cjs --site <an exemplary live site of this kind> --out .refs
```

Open each `board.png`, then the full images you choose. **Measure the main reference of each screen**: its slice list with `scripts/match.cjs blocks`, then a reference spec (paddings, gaps, heights, radii, typeface, type sizes and weights, borders, shadows, gradients and overlays, icon style and containers with `scripts/icons.cjs board`, colours and their areas) with `match.cjs grid` and `palette`; build from it; then run `match.cjs compare` until it prints PASS and no visible difference remains. References are the measure of the result, not decoration. Never copy logos, illustrations, photographs or text; credit the references in the handoff. Without a network, say so and continue with the kits.

## 4. Set up the system: tokens from the references, or a kit

**Turn the reference spec into tokens.** Start from the kit closest to the references (`references/kits.md`) and set its variables (fonts, sizes, radii, borders, shadows, neutrals, accent) to the measured values, so every element uses the same ones. A kit is fonts, palette, radius, shadow, borders, buttons, inputs and type scale already tuned to each other: `precision`, `precision-dark`, `editorial`, `swiss`, `soft`, `civic`, `showroom` or `warm`. With no usable references, use the kit as it is: pages look assembled, not designed, when these are chosen one by one, and a kit makes them one decision. For a new product with no brand colour, `look.cjs` suggests one and two kits for the category:

```bash
node <this-skill-dir>/scripts/look.cjs "<product name>" <finance|crypto|fitness|habits|wellness|sleep|health|productivity|commerce|saas|food|travel|media|government|other>
```

Then, in this order at the top of the stylesheet: `assets/tokens.css` (spacing scale, motion), then the kit file from `assets/kits/` with its font `<link>`, its variables set to the reference spec (or, without references, only `--brand`, `--brand-ink` and `--accent` set to the brand). Run `palette.cjs` with the brand colour when you need tints and states of it (`--b1`…`--b12`). An existing product (`improve.md`) keeps its brand colour, logo and fonts if they are good.

One shape language per product: every element takes the same radius, border, shadow and type rules, the ones in the reference spec or the kit. Never mix two kits, never add a pill, gradient or soft shadow that neither the references nor the kit have, never a second display face.

- **Sizes and spacing:** the reference spec first. `references/spec.md` gives the defaults (phone 44/28/20/16/13, desktop 32/24/18/14/12, spacing on a 4px scale) for whatever the references do not show, and its floors always hold. Do not invent values that are in neither.
- **Type details:** `references/typography.md` for tracking, leading, figures and what makes type look cheap.
- **Colour use:** `references/color.md`: the brand at more than one strength, 85 to 90% neutral by area, semantic colours for meaning only.
- **Icons and imagery:** the references' icon style (outline, bold, filled or duotone, with their containers), from the set `scripts/icons.cjs board` shows closest, inlined as a sprite; without references, one line-icon set at text size; real Unsplash photographs for food, products, hotels and places; a real map (Leaflet with CARTO tiles) wherever there is a location; 3D icons only for items in consumer apps (`system.md`).

## 5. Layout: the references' composition, checked against the anatomy

Popular shots are not novel layouts; they are the standard layout of their kind, filled with real content and finished. Compose each screen like its main reference. Then read the anatomy for your kind as a checklist of what the screen must contain (states, navigation, the parts people look for), and fill any gap the references leave:

- `references/product-ui.md` for mobile-first apps, dashboards and admin.
- `references/web-directions.md` first for any web page (landing, marketing, event, showcase): choose and commit to a direction. Then `references/marketing.md` for landing and pricing pages (an event, conference, festival or venue page takes its poster hero, "When there is no software product").
- `references/editorial.md` for showcase sites.
- `references/commerce.md` for shops: product pages, listings, the bag and checkout.
- `references/public-sector.md` for government and public-service sites: top tasks, life events, an A–Z page instead of a link farm, identity from the emblem.

Where a screen has a main chart, draw it the way the references draw theirs; if they show none worth slicing, use a **signature chart**: the main chart in a form that current shots use rather than the library default. This period mirrored against the last (colour above the axis, grey below); series coloured to match dots shown beside their categories elsewhere on the screen; a hatched or striped bar for the current period among plain ones; ghost bars for the previous period; pill-shaped bars with a value chip above the highlighted one; a category breakdown as proportional bubbles or a segmented pill bar instead of a donut; radial segments; a single gradient-highlighted bar with a tooltip. Plain lines and plain donuts read as a template.

In a dashboard or app home without a stronger lead from the references, the two moments are, by default: **a rendered object** in the card of any figure that counts a physical thing (payments or spend: a payment card; paid invoices: a receipt; bookings: a ticket; shipments: a label), and **the main chart in a designed form** (a mirrored comparison, ghost bars, series matching a legend). If a figure qualifies and the screen has no object, add it; if the main chart is a plain line or plain bars, redraw it. A large chart of plain bars is not a moment, however much space it fills. The bigger the main chart, the richer its form should be: when it takes a large part of the screen, draw this period mirrored against the last with smooth curves, or the series split by category in colours that match dots shown beside those categories; keep ghost bars and single highlighted bars for smaller charts.

Every screen still needs a clear first, second and third thing to look at. Read `references/hierarchy.md` for every screen: it sets out how to decide those levels and how to size and align figures, tables and charts (figure to label ratios, spacing inside and between groups, number alignment, chart sizes). It also needs **one or two visual moments** that a designer clearly made: a summary card that leads by size with a well-drawn chart in the brand colour, a product screenshot in a clean frame, a ring, a photo, a set of friendly item icons. `references/showpiece.md` explains how to draw these well in HTML, CSS and SVG. One or two, not ten: the rest of the screen stays calm so those moments carry.

## 6. Build it properly

- **Every width.** A mobile-first app is designed at 375px first and looks like a native app there: safe-area top padding, a header, content, a bottom tab bar. On desktop it becomes a sensible layout (a centred app column with side panels, or a proper shell), not a stretched phone.
- **Every state** a person will meet: hover, focus, pressed, selected, empty, loading, error, long content. Controls on screen work. Data persists if the app stores anything.
- **Restraint in motion:** quick hover and press feedback, a subtle state change on completion. Respect `prefers-reduced-motion`.
- **The floor** in `references/craft.md`: contrast, focus, labels, 44px tap targets, one grid, no overflow.
- **Finish:** `references/polish.md` covers alignment, spacing, shadows, type details and the small things that separate shipped work from a draft.

## 7. Render, audit, review against real products, fix

You cannot judge a design from its source. Render it:

```bash
node <this-skill-dir>/scripts/audit.cjs path/to/index.html --out .ui-audit
node <this-skill-dir>/scripts/audit.cjs http://localhost:5173/ --setup seed.js   # app with state
node <this-skill-dir>/scripts/audit.cjs screener.html --register dense            # professional data tool
node <this-skill-dir>/scripts/audit.cjs mail.html --widths 1280,1440              # a brief that says desktop only
node <this-skill-dir>/scripts/audit.cjs site.html --register showcase             # a web page with an art direction (poster, editorial, colour field)
```

The script screenshots the page at 375, 768 and 1440px and prints measured problems: overflow, contrast, focus, tap targets, clipped text, uneven gutters, near-miss alignment, awkward wraps. Fix everything under BROKEN and ACCESSIBILITY. Fix every spec item under CRAFT (spacing off the scale, more than five font sizes, a boxed main chart, colour blocks, pastel fills, squeezed text) unless the value comes from the reference spec, in which case say so in the handoff. Then resolve the rest. Open every screenshot part, the phone ones included.

For a site with several pages, audit **every page after the last change**, not a sample, and do not hand off while any page still has a BROKEN item. If subagents build pages, each one audits its own pages, and you run the audit again on all pages at the end, because later fixes to shared CSS break pages that passed earlier. Overlapping text in a tab row or toolbar on a phone is the usual casualty: make such rows scroll sideways with `flex: none` items and `white-space: nowrap`.

Then review with a method, not with taste: follow "The review method" in `references/ux-laws.md` (the audit's predicted gaze order, the squint test, the five-second test, grouping and alignment, a heuristic pass). Its laws of perception (Gestalt, visual weight, von Restorff, Hick, Miller, Fitts, Jakob) are what make a screen clear to almost everyone. Then review the screenshots with `references/critique.md`. The test is the one a designer applies when scrolling Dribbble: **would this pass as a real, professionally made product, among the popular shots of its category?** If you can start a subagent (Task, Agent or similar), have a fresh one review it with the brief at the end of `critique.md` and nothing about your intentions. Fix what it flags in order, render again, and review once more with a fresh reviewer. Two rounds is usually enough; stop after three.

Delete the audit folder when you are done unless the user wants it.

## 8. Hand off plainly

Tell the user briefly: what you built, the references it was sliced from (with links), the assumptions you made, and what is placeholder (sample data, fictional names, links that go nowhere). No adjectives about the result.

## Ways this goes wrong

- **A theme instead of a product.** The habit tracker becomes a stamp card, the budget an abacus, the workout a barbell. Real products use the standard pattern (a list, a ring, a progress bar) and get their character from colour, type, icons and finish. Drop the metaphor.
- **Costume finishes on product UI.** Paper texture, grain, wood, brass, ticket notches, postmarks, chalk, neon glows, heavy offset shadows that no reference has. (A pattern, gradient or translucency the references use is part of the spec: build it as they do. A web page whose chosen direction is tactile or brutalist may use its finish deliberately and consistently.)
- **Display fonts on product UI.** A serif or condensed display face for app headings and numbers when the references do not use one. Use the one sans family; let size and weight do the work.
- **Clever copy.** Puns, metaphors and narrative labels ("Two to go", "postmark", "links closed"), or text that explains the design to the viewer. Write what a shipped app says.
- **Too plain.** No brand mark, no header, no tab bar, rows of identical default cards, one colour used for everything, nothing a designer drew. Compare with the references: they have the chrome and a clear visual moment; slice both.
- **A component-library default.** Inter, grey-100 cards, an indigo-to-violet gradient card, emoji tiles for every category: correct but with no point of view. It is what you get without references; slice from strong ones instead.
- **Everything styled.** Every card a different colour or treatment, gradients on everything, five accent colours. One brand colour, quiet surfaces, colour where it means something.
- **Dribbble-izing a professional tool.** A trading terminal or data tool turned into a consumer dashboard: a gradient hero card with a glow, a sparkline in every tile, letter-badge "logos" on every ticker, an "insights" card with coloured icon chips, half the rows it used to show. It looks like every generated fintech template and is worse to use. Pro tools stay dense, flat and tabular, and their main table or chart runs edge to edge instead of sitting inside a padded card.
- **Oversized type in product UI.** A 96px number on a phone. Hero figures in apps are 28 to 44px. (On web pages, oversized type is a legitimate direction when it is the idea of the page.)
- **The safe web page.** Centred headline, two buttons, a screenshot or stock photo, then rows of three cards: correct, and indistinguishable from every generated landing page. Slice from the strongest references of the kind and carry their direction through every section, not only the hero (`references/web-directions.md`).
- **Browser defaults showing.** A native date picker, select arrow or checkbox inside an app screen. Style every control.
- **Wireframe content.** "Item 1", lorem ipsum, a grey box labelled "chart". Real names, figures and a real chart.
- **Decoration as filler.** A sparkline, icon chip and different hue on every stat tile, "New" badges, a promo card in the sidebar, a bento grid where each tile has its own gimmick. A stat tile is a label, a figure and its change; richness goes into one or two real moments, not spread over the chrome.
- **Component confetti.** Rounded bordered cards around everything (often cards inside cards), a tinted icon square on every item, pills and status dots, mono captions, a small label above every section title. Each is fine once; together they are the most recognisable generated look. Set content on the page with type, space and hairlines, and keep boxes, icons, pills and mono for where they mean something (`critique.md`, "What reads as generated").
- **References as decoration.** Searching for references, then building from habit anyway: no spec table, no comparison, a result that looks nothing like them. The references are the measure; compare and fix until the difference is gone.
- **Stopping after the first render.** The first render is a draft.
