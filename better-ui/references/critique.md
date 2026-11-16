# Critique: would this pass as a real product?

Use this to review rendered screenshots, your own or as an independent reviewer. The bar is the popular interface work on Dribbble and the products good teams ship. A designer scrolling past gives a shot about two seconds and asks two things: does it look professionally made, and does it look natural, like a real product rather than a costume or a template?

Contents: what the bar looks like · the two failures · how to review · the checklist · finishing pass · brief for an independent reviewer

## What the bar looks like

**Mobile apps.** A native-feeling screen: a header with a greeting or title and an avatar or icon buttons; a neutral summary card that leads by size, with the key figure and one clean chart or ring; one or two sections of rows or tiles on white cards, each row with a soft-tinted icon chip, a name, a grey secondary line and a control or figure; a bottom tab bar. One clean sans-serif. A light grey canvas, white cards, one brand colour, soft tints for categories. Real names and numbers. Nothing themed.

**Dashboards.** A sidebar with icons and a clear active item (often a dark sidebar), a top bar with search, notifications and an avatar, a row of four to six KPI tiles (icon chip, label, figure, delta pill), a main chart, then tables with product thumbnails or avatars and status pills, and a few secondary modules. Dense, aligned, even gutters. One brand colour plus semantic colours.

**Landing pages.** A clean nav; a centred or split hero with a two-line headline in a sans at 40 to 56px, one line of subcopy, two buttons; a product screenshot or app mock in a clean frame (sometimes with two or three small floating cards); a logo strip; feature sections with small interface previews; testimonials with avatars; pricing; FAQ; a closing call to action; a footer. Generous whitespace, light backgrounds, one accent.

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
