# Spec: fixed values

Every size, space, radius and colour role here is a single value, chosen from Apple's and Google's platform guidelines, Refactoring UI, Practical UI, Learn UI Design and Nielsen Norman Group research. They are the **defaults**: with a reference spec (`references.md`), the values measured from the references win for sizes, spacing, radii, type and colour; these fill whatever the references do not show. Do not interpolate between them or invent values that are in neither. Where another file in this skill gives a range, this file decides the default.

**Floors that nothing overrides:** text contrast 4.5:1 (3:1 for 24px and up); touch targets 44px (the hit area: an invisible `::after` around a smaller control counts); text inside inputs 16px on phones; no text under 11px; no horizontal overflow or overlapping text at any width. Body text is 16px on phones and 14px on desktop by default, and the reference's body size when it shows one (often 14 or 15).

Start every build by copying `assets/tokens.css` and then the chosen kit from `assets/kits/` (`kits.md`) into the stylesheet, with its variables set to the reference spec. On web pages the kit's or the references' type scale replaces the landing ramp below. Build only from those tokens.

Contents: spacing · phone app · desktop app and dashboard · professional data tool · landing page · colour roles and budget · radius, borders and depth · motion · budgets per screen

## Spacing

The default spacing scale: **0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128** px. Do not use other values by habit (10, 14, 18, 28, 36); use them only when the reference spec measured them (rounded to 2px).

Default grouping:

| Relationship | Space |
|:---|:---|
| Label to its value, title to its meta line | 4 |
| Icon to its text | 12 |
| Label to its input | 8 |
| Item to item inside a group (rows, fields, chips) | 12 |
| Group to group inside a section | 24 |
| Section title to its content | 16 |
| Section to section | 40 on phone, 48 on desktop app, 128 on landing (80 on phone) |

## Phone app (375 to 430px wide)

**Frame**

| Element | Value |
|:---|:---|
| Screen gutter (left and right) | 20 |
| Header | 56 tall; brand mark 28, product name 16/24 weight 600; icon buttons 40 (24 icon) |
| Content top, under the header | 8 |
| Tab bar | 64 tall plus the safe area; 4 or 5 items; icon 24; label 11/13 weight 500; active item in the brand colour |
| Space kept free above a bottom bar or dock | dock height plus 24 |

**Type ramp** (size/line height, weight, tracking). The default is five sizes (44, 28, 20, 16, 13) plus the tab label; the reference spec's sizes replace them.

| Role | Value |
|:---|:---|
| Display (the one hero figure) | 44/48, 600, −0.02em, tabular figures; cents or currency at the title size 28/34 in text-2 |
| Title (page title when there is no hero figure) | 28/34, 600, −0.015em |
| Headline (section titles, card titles) | 20/26, 600, −0.01em |
| Body (list item titles, paragraphs, inputs) | 16/24, 400 |
| Body strong (values in rows, list item titles that lead) | 16/24, 500 |
| Caption (meta, secondary lines) | 13/18, 400, text-2 |
| Mono meta (changes with their comparison, axis labels, codes) | 13/18, 500, mono (the caption size, in the mono); never for prices or amounts, which stay in the sans with tabular figures; consumer apps (food, travel, shopping, wellness) may skip the mono entirely |
| Tab label | 11/13, 500 |

Each step is at least about 25% larger than the one below it (44, 28, 20, 16, 13), so every level reads as a different level; sizes one or two pixels apart look like mistakes.

A greeting is a caption (13/18 text-2) above the title or the hero, never a title of its own.

**The hero (unboxed)**

| Element | Value |
|:---|:---|
| Placement | by default directly on the canvas, not in a card |
| Top space | 24 |
| Label above the figure | caption 13/18 text-2, 4 above the figure |
| Change line under the figure | mono meta, 8 below the figure, up colour or down colour on the change only |
| Main chart | 200 tall, full screen width (0 gutter), 24 below the change line; one series in the brand colour 2px, the comparison 1.5px text-3 dashed; by default no gridlines and no box |
| Range control under the chart | 16 below the chart; segmented control 36 tall, segments 32 tall, mono meta 13/18 |
| Quick actions | 24 below; round buttons 56 (icon 24), label caption 13/18, 8 between button and label; 3 or 4 actions |

**Dashboards and data screens on a phone**: one hero metric at display size with the main chart (unboxed, as above); the other figures in a 2-column grid below it, each a caption label, the figure at headline 20/26 weight 600 tabular, and its change in mono meta. By default never four equal tiles at the top: on a phone one number leads.

**Components**

| Component | Value |
|:---|:---|
| List row | 64 tall; leading visual 40 (radius 12 neutral chip, or a 40 avatar, or a 40 photo); title body strong 16/24 and caption 13/18 under it; trailing value body strong, tabular; separator hairline inset 72 from the left |
| List grouping | rows sit on the canvas, or in one grouped surface (radius 16); never one card per row |
| Card (for peer groups of mixed content only) | padding 16, radius 16, 12 between cards; no card around the hero or around a list of same-type items |
| Primary button | 52 tall, radius 14, 16/24 weight 600, full width inside a sheet or dock |
| Secondary button | 44 tall, radius 12, 16/24 weight 500, outline or surface-2 fill |
| Compact button (panel or section action) | 32 tall, radius 8, 13/18 weight 500, 12 side padding, outline |
| Icon button | 40 (24 icon), target 44 |
| Chip | 32 tall, radius full, 13/18 weight 500, 12 side padding |
| Input | 48 tall, radius 12, 16px text, 16 side padding; label caption 13/18 weight 500 above, 8 gap |
| Sheet | radius 24 top corners, 24 padding, grabber 36×4 |
| Icon | 20 in content, 24 in navigation; stroke 1.75 (style and stroke from the references when there are any) |
| Avatar | 32 in rows of people, 40 in the header |
| Small chart or sparkline | 72×32 |

## Desktop app and dashboard (1280 to 1440px)

| Element | Value |
|:---|:---|
| Sidebar | 240 wide; nav row 36 tall, 2 between rows, icon 18, label 14/20 weight 500; group label 12/16 weight 500 text-3, 24 above and 8 below |
| Top bar | 56 tall |
| Content padding | 32; max content width 1280 |
| Grid gap between cards | 24 |
| Card | padding 24, radius 12, 1px line border, no shadow |
| Type ramp | default five sizes: 32 (KPI figures), 24 (page title), 18 (card and section titles), 14 (body, table cells, buttons, inputs), 12 (captions, table headers, mono meta) |
| Page title | 24/32, 600, −0.015em |
| Card or section title | 18/24, 600, −0.01em |
| Body | 14/20, 400 |
| Caption | 12/16, 400, text-2 |
| Mono meta | 12/16, 500 |
| KPI figure | 32/40, 600, −0.02em, tabular; the lead KPI is first and gets the brand-coloured chart, not a bigger size |
| KPI tile | at most 4 in a row; label caption above, figure, change mono meta with its comparison; no icon chip, no sparkline unless the trend is the point |
| Main chart | 320 tall, full card width |
| Supporting chart | 160 tall |
| Table | row 48; header 12/16 weight 500 text-2; cell 14/20; 16 side padding per cell; numbers right-aligned, tabular |
| Primary button | 36 tall, radius 8, 14/20 weight 500, 16 side padding |
| Secondary button | 36 tall, outline |
| Compact button | 32 tall, 12/16 weight 500, 12 side padding |
| Input | 36 tall, radius 8, 14px text |
| Icon | 16 in tables and buttons, 18 in navigation |

## Professional data tool (terminals, screeners, consoles)

| Element | Value |
|:---|:---|
| Table row | 28 |
| Text | 12/16, tabular |
| Panel padding | 12 |
| Panel gaps | 1px divider, no gap |
| Toolbar | 32 tall, text tabs 12/16 weight 500 |
| Buttons | 28 tall, radius 6, 12/16 weight 500, 8 side padding |
| Page title | 16/20, 600 |

## Landing page

These are the defaults for a landing page. A direction chosen from `web-directions.md` may replace the display sizes (one display size up to 160px, set with `clamp()`), the headline face and the colour budget, because on web pages art direction is the point; spacing, body sizes, contrast and the button and input sizes still hold.

| Element | Desktop | Phone |
|:---|:---|:---|
| Content width | 1200 max | gutter 20 |
| Type ramp | default five sizes: 64, 40, 20, 16, 13 | exactly five: 40, 28, 18, 16, 13 |
| Navigation | 72 tall; links 16/24 weight 500 | 64 tall, one menu button |
| Section padding (top and bottom) | 128 | 80 |
| Hero headline | 64/68, 600, −0.03em | 40/44, 600, −0.025em |
| Hero lede | 20/30, text-2, max 560 wide | 18/28 |
| Hero buttons | 52 tall, radius 12, 16/24 weight 600, 24 side padding; one primary, one secondary | same, full width |
| Section title | 40/44, 600, −0.025em | 28/34 |
| Section lede | 20/30, text-2, max 640 wide | 18/28 |
| Card title | 20/28, 600 | 18/24 |
| Card body and body text | 16/26, text-2 for card body | 16/26 |
| Eyebrow, caption, meta | 13/18, 500 | 13/18 |
| Card | padding 32, radius 20, 24 between cards | padding 24 |
| Headline face | the UI sans; for hospitality, food, travel, culture and editorial pages the display serif of the references or the kit (`editorial`: Newsreader 400; `warm`: Fraunces 600), or Instrument Serif or Newsreader at 400, for the hero and section titles only | same |

## Colour roles and budget

Every colour comes from `scripts/palette.cjs`, run with the brand colour (the exact command is printed by `look.cjs`). It builds a 12-step brand scale and a 12-step neutral scale tinted toward the brand hue, in OKLCH, and the roles below. Without a reference spec, never write a hex for a grey or a brand shade by hand; with one, use its measured neutrals and accent, or tune `palette.cjs --tint` until they match. How to use the steps so the screen has depth is in `color.md`.

| Role | Token | Light | Dark |
|:---|:---|:---|:---|
| canvas | `--canvas` | n2 | n1 |
| card, panel | `--surface` | white | n2 |
| raised (popover, active segment, floating bar) | `--surface-raised` | white + shadow | n3 |
| well, inset, segmented track, search field | `--well` | n3 | n1 |
| hairline | `--line` | n6 | n6 |
| input border | `--line-input` | n7 | n7 |
| text-1 (titles, figures) | `--text-1` | n12 | n12 |
| text-2 (body, secondary) | `--text-2` | n11 | n11 |
| text-3 (axis labels, placeholders only) | `--text-3` | n9 | n9 |
| solid brand (primary button, active tab icon, main chart line, progress) | `--brand` | b9 | b9 |
| text on the solid brand | `--brand-ink` | white or n12, chosen for 4.5:1 | same |
| brand text and icons (links, icon on a tint) | `--brand-text` | b11 | b11 |
| tinted background (selected, active nav, badge, feature icon chip) | `--tint` | b3 | b3 |
| callout background and its border | `--callout`, `--tint-line` | b2, b6 | b2, b6 |
| focus ring | `--focus` | 2px b9, 2px offset | same |
| up, down, warning (changes and status text) | `--up`, `--down`, `--warning` | green, red, amber step 11 | same |
| soft status badge | `--ok-3` + `--ok-11` (and warn, bad) | | |
| chart: main series, comparison, grid, area | `--chart-1`, `--chart-compare`, `--chart-grid`, `--chart-area` | b9 2px, n8 1.5px dashed, n4, b9 20%→0% | same |

**Budget per screen, by area:** neutrals 85 to 90%; tints and soft status backgrounds (b2 to b6, ok-3…) up to 10%; solid brand and other saturated fills up to 3 to 5%. At most three solid-brand elements on the first screen besides the chart. No pastel canvases or pastel cards. Up and down colours only on changes.

**Never flat (by default):** unless the references are deliberately monochrome or flat, the brand appears at more than one strength on every screen: solid on the primary action, tinted on the selected or active state and the product's own feature icons, as text on links. Surfaces separate by a lightness step plus either a hairline or a soft tinted shadow, as the references or the kit do it (the desktop default is a hairline and no shadow; `color.md`, section 3).

## Radius, borders and depth

| Element | Radius |
|:---|:---|
| Badge, small tag | 6 |
| Compact button, desktop input and button | 8 |
| Phone input, icon chip, secondary button | 12 |
| Phone primary button | 14 |
| Card, grouped list | 16 (desktop card 12) |
| Landing card | 20 |
| Sheet, modal | 24 |
| Chip, pill, avatar | full |

Borders: 1px `--line`. Depth on light themes: cards `--shadow-card` with the hairline; popovers, floating bars and active segments `--shadow-pop` plus `--highlight`; sheets and modals `--shadow-sheet`. All shadows are the tinted two-layer values from `palette.cjs`, never `rgba(0,0,0,…)`. On dark themes: no shadows; elevation by surface step (n1 canvas, n2 card, n3 raised), a 1px `--line` and `--highlight` on raised elements. One primary button per view may carry a one-hue top-to-bottom gradient with `--highlight` and `--shadow-brand` (recipe in `color.md`).

## Motion

Hover and press 150ms; entering and leaving 240ms; easing `cubic-bezier(.2,.8,.2,1)`; press scale 0.98. Respect `prefers-reduced-motion`.

## Budgets per screen

| Thing | Default maximum (the reference spec may differ; say so in the handoff) |
|:---|:---|
| Font sizes on one screen (besides tab labels, mono meta included) | 5 |
| Font weights | 400, 500, 600 |
| Large elements (display figure, main chart, hero image) | 2 |
| Filled (brand or dark) buttons visible at once | 1, at most 2 |
| Blocks on the first phone screen | 3 (for example: hero with chart, quick actions, start of a list) |
| KPI tiles in a row | 4 |
| Tab bar items | 5 |
| Brand-coloured elements on the first screen besides the chart | 3 |
| Lines of body text in a phone card | 2 |
