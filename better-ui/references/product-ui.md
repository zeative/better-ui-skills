# Product UI: dashboards, admin, apps and mobile tools

At the bar, product UI is both a pleasure to look at and genuinely useful. The look comes from a full shell, content on surfaces, imagery in every list and data drawn beautifully. The usefulness comes from leading with what the person needs to do.

Contents: the shell · lead with what matters · modules · tiles and figures · charts · lists and tables · forms and controls · small apps and mobile-first tools · states · sample data · phone and desktop

## The shell

A dashboard or admin screen lives in an app shell, on a tinted canvas:

- **Sidebar:** the wordmark with a glyph, grouped navigation items each with an icon, a clear active state (filled pill or accent bar plus tint), counts where useful, and a user or workspace card with an avatar at the bottom. A dark or tinted sidebar often anchors the composition. Full height.
- **Top bar:** page title with a date or breadcrumb, a search field with a key hint, a date-range or filter control, a notifications button, a primary action, an avatar.
- **Canvas:** the tinted ground, with all content in cards arranged on a grid (12 columns works), with consistent gaps.

Navigation items for areas that are not built are part of the picture, but should not pretend: give them hover states and keep the current page marked. On phones the sidebar becomes a bottom tab bar or a menu.

## Lead with what matters

Design for the question the person opens this screen to answer. A dashboard is the answer to "how is it going, and do I need to do anything right now?" Put a module near the top that says what needs attention (work waiting, something low, a deadline) with direct actions, alongside the headline figure. This is what separates a useful dashboard from a pretty one, and it is rare in showcase work, so it stands out.

## Modules

A rich dashboard has ten or more distinct modules. Draw from these and vary them:

- A **hero module:** the key figure on a contrast surface (dark or accent card) with a delta badge, a sparkline or mini area chart, and a comparison line.
- A row of **KPI tiles** (below).
- The **main chart** with a range control, legend and tooltip.
- A **secondary chart** of a different form (donut by category, bars by channel, a goal gauge, a heatmap).
- A **needs-attention** list with counts, icon chips and action buttons.
- A **table or list** of recent items with thumbnails, avatars and status pills.
- A **ranked list** with thumbnails, a bar for share, and a secondary fact (stock, trend).
- **Activity or timeline**, **people** (avatars with roles or status), **goal progress** rings, a **calendar strip**, a **promo or tip card** with an illustration, a **quick actions** panel.

Arrange them in a grid with mixed spans so the layout has a clear focal area, not uniform rows. Balance the columns so they end together, leave no empty band in the sidebar (fill it with a compact widget: a status card, a goal, a promo), and size each chart to what it shows: seven bars do not need 400px of height.

## Tiles and figures

A KPI tile has: an icon chip in its own hue, a small label, a large figure (28 to 40px, weight 600 to 700, tabular), a delta badge in a soft pill coloured by whether the change is good, and a mini visual (sparkline, bar, ring). Give each tile in a row a different hue and a different mini visual.

- Every number has a unit, a period and a comparison.
- Use the locale's formats for currency, thousands and dates.
- Up is not always good: colour deltas by meaning.
- If one figure matters most, make it the hero module and let the others be smaller.
- Values in a row share a baseline; labels stay on one line.

## Charts

See `showpiece.md` for how to draw them. In product UI:

- Choose the form from the question: change over time is a line or area (bars for few periods); comparison is sorted horizontal bars; share is a donut or a single stacked bar.
- Always include grid lines, axis labels, direct value labels or a tooltip on a highlighted point, and a legend when there is more than one series.
- Use the accent for the series or point that matters and a muted tone for the rest; category palettes for categories.
- Show an incomplete period honestly (a lighter or hatched bar, a note).
- Three or more chart forms across a dashboard.
- The chart, the totals and the tables are computed from the same sample data.

## Lists and tables

- A thumbnail or portrait in the first column of every row, each one visibly different from the others. Name in strong ink, a secondary line in muted ink beneath.
- No truncated strings. Size columns and shorten metadata so every name, place and code is shown whole.
- Status as a pill with a dot, from a small consistent set.
- Right-aligned tabular figures; row height 52 to 64px with thumbnails; hairline separators or soft zebra; row hover; a row action (button or menu).
- Columns sized to their content so rows do not wrap raggedly.
- Filter chips or tabs with counts above the table; a "view all" control as a chip with an arrow.
- On phones a table becomes stacked cards with the key fields and the action.

## Forms and controls

Labels above fields, the right input types, validation with helpful messages beside the field, a primary button that shows progress. Style every control to the direction: inputs, selects, toggles, segmented controls, checkboxes.

## Small apps and mobile-first tools

For a tracker, a to-do, a timer, a calculator, a wallet or any personal tool. These are judged differently from dashboards: the strongest ones show **few things with a lot of air and one focal object per screen**. Do not turn a personal app into an admin grid.

- **Open alive.** The first thing anyone sees must be the idea working, not waiting. Ship the app with believable sample data in a mid-use state (some things done, some pending, a week of history), so the hero device is full, coloured and finished on first load. Mark it once as sample data and give a clear way to start fresh. A hero made of empty outlines and zeros reads as a wireframe, however good the concept. The true empty state still gets designed; it is just not the opening view.
- **One focal object.** The device that carries your idea is the hero, at about twice the size that feels sufficient, and it holds the key figure. Everything else on the screen is clearly secondary: fewer modules, smaller, quieter. If a module repeats information the hero already shows, cut it.
- **On desktop, stay an app.** Widen into two or three well-spaced columns with the hero still dominant and composed for the width (a phone card dropped into a desktop grid looks lost); three to six modules in view, not ten. Lists collapse to their first four or five rows with a way to see more. One continuous backdrop from top to footer.
- **No stock modules.** The transaction list, the category breakdown and the trend chart are where personal apps fall back to defaults. Draw each one in the idea's language: rows with a designed mark instead of a generic glyph, a breakdown that uses the motif instead of a plain donut, a chart with the same material as the hero. Do not show the same data twice in two forms.

- **A person in the picture.** For consumer apps, put one figure or scene illustration at hero scale (see `showpiece.md`): the references in these categories almost all lead with an illustrated character or a photograph, and a screen of objects and numbers alone reads as cooler than the set.
- **Colour that fills surfaces.** A clean neutral base with two, at most three, accents, each used on whole surfaces: a filled hero card, a tinted panel, a coloured primary button, accent-coloured data. One accent used only on small marks looks timid in this category; six tints on six tiles looks like a rainbow. Two or three, used boldly.
- **Soft, layered surfaces.** Big-radius cards on a pale or dark ground, nested tinted panels, circular icon buttons, pill chips, a floating pill tab bar, layered shadows with a light top edge.
- **A header with identity:** a wordmark or greeting, the date, an avatar or settings button.
- **A hero card** on a contrast surface summarising today: a progress ring or big figure, a short encouraging line, perhaps a week strip.
- **Items with character:** each item on its own card with a dimensional illustrated object of its own (see `showpiece.md`), a clear name, a secondary line, and the main control. An item may carry its own hue, in small doses (the object and its data marks), while the screen keeps one dominant accent.
- **Dense, filled cards:** an item card uses its width. On desktop that can mean the name and control on the left and a full-width history strip with day labels on the right; never a wide card with a small widget in one corner.
- **The main action is unmistakable:** the thing people do every day is the largest, most colourful control on each item, with a satisfying checked state (fill, icon, small bounce), and visibly different from history or decoration.
- **The key quantity as a designed object:** a count or a run as a large numeral with a badge and a "best" chip; a balance as a big figure with a trend; progress as a ring.
- **History as a visual:** a week strip of day pills, a month heatmap, a bar chart of the week.
- **Adding is inviting:** a floating or prominent add button opening a sheet or inline form, with suggestion chips that have icons.
- **Navigation:** a floating pill tab bar or bottom bar on phones.
- **First run:** an illustration, a line of encouragement, starter suggestions as tappable chips, and the primary action.
- **Rewards:** a small celebration on completing something (a burst, a badge, a changed card state).
- Data persists across reloads.

## States

Build and look at each: first run or empty (designed, with illustration and an action), loading (skeletons in the shape of the content), populated with realistic volume, overflowing (long names, big numbers), error (what failed, how to retry), success. Use the audit script's `--setup` option to seed data and screenshot the populated state.

## Sample data

Use names, products, places and prices that fit the domain and country. Make numbers reconcile across tiles, charts and tables. Include variety and edge cases. Keep dates relative to today. Say once, discreetly, that the data is sample data.

## Phone and desktop

- **Phone:** bottom navigation, the hero module first, tiles in a two-column grid or a horizontal scroller with snap, charts at full width, tables as cards, primary actions within thumb reach, 44px targets, 16px inputs.
- **Desktop:** use the width. A small tool that is a single column on a phone becomes a composed layout on desktop: the main list beside a side column of stats, calendar and chart, inside a shell or a framed app container on an atmospheric ground. A phone-width column floating in an empty page is unfinished.
