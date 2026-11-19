# Critique: would this pass as a real product?

Use this to review rendered screenshots, your own or as an independent reviewer. The bar is the popular interface work on Dribbble and the products good teams ship. A designer scrolling past gives a shot about two seconds and asks two things: does it look professionally made, and does it look natural, like a real product rather than a costume or a template? Start every review by putting the screen beside its main reference (`match.cjs compare`): a screen that is visibly weaker than its reference fails, whatever the checklist says.

Contents: what the bar looks like · the two failures · how to review · the checklist · finishing pass · brief for an independent reviewer

## What the bar looks like

**Mobile apps.** A native-feeling screen: a header with the title (a greeting, if any, as a small caption) and an avatar or icon buttons; the summary leading by size, directly on the canvas on a phone, with the key figure and one clean chart or ring; one or two sections of rows, each with the item's real image or a neutral icon chip for the user's items, a name, a secondary line and a control or figure; a bottom tab bar. One family, sizes and spacing as measured from the references. Real names and numbers. Nothing themed.

**Dashboards.** A sidebar with icons and a clear active item (often a dark sidebar), a top bar with search, notifications and an avatar, up to four KPI tiles (a label, a figure, its change with what it compares to), a main chart, then tables with real thumbnails or avatars where there are people or products and status as plain text or one quiet pill, and a few secondary modules. Dense, aligned, even gutters. One brand colour plus semantic colours.

**Landing pages.** One committed direction (`web-directions.md`), taken from the strongest references of the kind and carried from the hero through every section to the footer: the product shown large and real, sections of different shapes (a list, a full-bleed image, a large quote, a table), proof, pricing that answers questions, a closing call to action. Not the centred-hero-plus-three-cards template.

## The two failures

**Too much (reads as AI concept art or a costume):**
- An invented theme or metaphor applied to the interface: stamps, tickets, beads, paper, chalk, equipment drawn as the UI, postal or vintage motifs.
- Textures and materials: grain, paper, wood, brass, bevels, glows, heavy outlines with offset shadows.
- A serif, condensed or decorative display font on product UI; numbers at 64px or more on a phone.
- Clever or narrative copy ("Two to go", "Today's postmark"), and notes that explain the design.
- Too many colours, every card styled differently, gradients everywhere.

**Too little (reads as rendered HTML or a template):**
- No brand mark, no header, no tab bar or navigation: a web page in a phone frame.
- Identical default cards in a column, one colour used for everything, greyed-out text for done items.
- No summary card or visual moment; no icons on items; a thin progress bar as the only graphic.
- Stiff copy, orphaned words, long labels wrapping to two lines.

The target is between them: the standard layout of its kind, carefully made, with one or two designed visual moments.

## How to review

1. Look at the phone screenshot (for apps) or the desktop first screen (for web) for two seconds. Does it look like a real product from a good team? If anything looks themed, decorative or odd, that is the first finding. If it looks like a default web page, that is the first finding.
2. Check the structure against "What the bar looks like" for its kind. What standard piece is missing (header, summary card, tab bar, icons, KPI row, product screenshot)?
3. Check the system: one font, a compact type scale, one brand colour, consistent radii and shadows, one icon style.
4. Read every string: plain product language, no orphans, nothing clipped.
5. Look at the desktop and phone versions both.

## The checklist

Score each 1 to 10 against the bar.

| Dimension | 5 | 7 | 9 |
|---|---|---|---|
| **Professional** | Default components or obvious template | Clean but missing some standard pieces or finish | Indistinguishable from a shipped product by a good team |
| **Natural** | Themed, decorative or costume-like; or lifeless | Mostly conventional with one odd choice | Nothing forced; every choice is what a real product would do |
| **Fit** | A redesign that dropped the product's identity or density; a pro data tool dressed as a consumer dashboard (gradient hero, glow, sparkline tiles, letter-badge logos), or its main table boxed in a padded card so it shows less than the original | Mostly right, a few template habits | Recognisably the same product, as dense or denser, cleaner and more consistent |
| **Moments** | No object and a plain chart: the screen is clean but nothing was drawn | One moment, or two weak ones | A rendered object in the card whose figure it counts, and a main chart in a designed form |
| **Type** | Default tracking on large headings, bold everywhere, a template face, more than five sizes | Decent face, a few rough sizes | A face chosen for the character, weights 400 to 600, tracking and leading set per size, a mono for meta (`typography.md`) |
| **Surfaces** | Four or more background tones, sections boxed in cards, a band inside a band | Mostly calm | Canvas, one tinted band and at most one dark band; in apps canvas, surface and one raised level |
| **Copy fit** | Buttons or labels that wrap, cards of very different text lengths, mixed languages | Mostly fits | Every string written for its space, siblings parallel, one natural language (`copy.md`) |
| **Direction (web pages)** | Centred headline, two buttons, a screenshot or stock photo, three cards, four-column footer: the generated default | A bold hero, then template sections | One direction from `web-directions.md`, chosen over two others, carried through hero, a mid-page section and the footer |
| **Specific** | Swap the product name for a competitor's and the screen still fits: generic headline, stock palette, no signature detail | Partly specific | Copy, visual and one signature detail only this product would have |
| **Structure** | Missing the standard anatomy (no header, no nav, no summary) | Standard anatomy, some parts thin | Complete, familiar anatomy, clear first/second/third thing |
| **Visual system** | Mixed fonts, sizes and colours | Mostly consistent | One font, compact scale, one brand colour, consistent radii, shadows and icons |
| **Content** | Placeholder or stiff | Plausible | Specific, realistic, plain, well-fitted text |
| **Finish** | Misalignments, clipping, awkward wraps | A few rough spots | Pixel-tidy at every width |

## Finishing pass

On both the phone and the desktop screenshot:

- **Clipped or wrapped text.** No ellipses on names, no orphaned last words, no labels wrapping awkwardly. Shorten the text or widen the column.
- **Collisions.** A floating bar or button covering content; labels running together.
- **Gutters.** Equal page margins on the phone; cards do not touch the edge.
- **Alignment.** Rows, icons and figures line up; columns end together.
- **Empty bands.** A half-empty card, a column that ends far above its neighbour.
- **Consistency.** Same radius, padding and shadow for cards of the same kind; one icon style.
- **Colour meaning.** The brand colour means action or selection; green, amber and red mean status.

## What reads as generated

A page can pass every rule in this skill and still look machine-made, because generated pages over-use the same small components. The audit counts them (the "Generated" line). Professional pages are made of **type, space, alignment and a few real images**; components appear only where they are the thing itself.

| Generated | Professional |
|:---|:---|
| Everything in a rounded bordered card; cards inside cards (a mock inside a card inside a section card) | Content set directly on the page, separated by space and hairlines; a box only around a real object (a product screenshot, a pricing plan, a form, a photo) and never a box inside a box |
| A tinted icon square at the top of every card and link | No icon, or an inline icon at text size where it helps scanning; a real image where there is one |
| Pills, badges and status dots everywhere ("New", "Live ●", "Popular", "Wilujeng sumping") | One status pill where state really changes; labels as plain text |
| Mono text for URLs, times, captions and labels on a marketing or public page | The UI sans for everything; mono only for code, data tables or one deliberate use |
| A small coloured label above every section title, then a generic grey lede | A title, alone; the label only where it numbers or names something, the lede only where it adds a fact |
| Every section the same shape (label, title, lede, grid of three or four cards) | Sections of different shapes: a list, a full-bleed image, a large quote, a table, a split |
| A hand-built mini interface in every tile, each with its own borders and pills | One real product view, large and flat, shown once or twice |
| 1200px centred container all the way down | Full-bleed moments, asymmetric splits, text measured to about 65 characters |
| Many small type sizes at similar weights | Fewer sizes with real contrast: a large title, a comfortable 17 to 18px body, quiet small text |

The test: **remove a third of the elements** (boxes, icons, pills, labels, ledes) and look again. If the page got better, keep going. The audit flags the page when two or more of these appear at once.

## Brief for an independent reviewer

A builder misses what a stranger sees in seconds. Hand the reviewer the screenshots and this brief, and nothing about your intentions:

> You are a senior product designer who has spent years on Dribbble and knows what genuinely good, professional interface work looks like. Review a design built for this brief: "[the user's request, one line]".
>
> Screenshots, all of which you must open with your image-reading tool: [every file from the audit output].
>
> Read `[absolute path]/references/critique.md` first: what the bar looks like for this kind of screen, the two failures, and the checklist.
>
> Then return as plain text: (1) your two-second impression: would this pass among popular Dribbble shots of its category as a real, professionally made product? Name anything that looks forced, themed, decorative or AI-made, and anything that looks like a default template; (2) a 1 to 10 score for each checklist dimension and overall; (3) the six most important changes, most important first, each specific about what and where; (4) every finishing fault you can see.
>
> Be direct. Do not praise. Do not change the product's scope.

Act on the list in order, render again, and ask a fresh reviewer. Aim for no "forced" or "template" findings, nothing under 7, and an overall 8 or higher. Two rounds is usually enough; stop after three.
