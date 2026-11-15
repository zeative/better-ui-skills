# Product UI: dashboards, admin, apps and mobile tools

At the bar, product UI is both a pleasure to look at and genuinely useful. The look comes from a full shell, content on surfaces, imagery in every list and data drawn beautifully. The usefulness comes from leading with what the person needs to do.

Contents: the shell · lead with what matters · dense professional tools · modules · tiles and figures · charts · lists and tables · forms and controls · small apps and mobile-first tools · states · sample data · phone and desktop

## The shell

A dashboard or admin screen lives in an app shell, on a tinted canvas:

- **Sidebar:** the wordmark with a glyph, grouped navigation items each with an icon, a clear active state (filled pill or accent bar plus tint), counts where useful, and a user or workspace card with an avatar at the bottom. A dark or tinted sidebar often anchors the composition. Full height.
- **Top bar:** page title with a date or breadcrumb, a search field with a key hint, a date-range or filter control, a notifications button, a primary action, an avatar.
- **Canvas:** the tinted ground, with all content in cards arranged on a grid (12 columns works), with consistent gaps.

Navigation items for areas that are not built are part of the picture, but should not pretend: give them hover states and keep the current page marked. On phones the sidebar becomes a bottom tab bar or a menu.

## Lead with what matters

Design for the question the person opens this screen to answer. A dashboard is the answer to "how is it going, and do I need to do anything right now?" Put a module near the top that says what needs attention (work waiting, something low, a deadline) with direct actions, alongside the headline figure. This is what separates a useful dashboard from a pretty one, and it is rare in showcase work, so it stands out.

## Dense professional tools

Trading terminals, market data sites, screeners, analytics workbenches, ops consoles, logs, developer tools. Their users are experts who scan, compare and act, often for hours. The best of them (Bloomberg-style terminals, TradingView, Linear, Datadog, Vercel's dashboard) look good because they are **precise, quiet and dense**, not because they are decorated. Everything above about hero modules, ten modules, colourful tiles and imagery is for overview dashboards of business tools; here it produces a template.

- **Density first.** Keep at least as many rows, columns and figures per screen as the product had. Rows 28 to 36px, table text 12 to 13px, panels separated by hairlines or 1px gaps rather than floating rounded cards with big gaps. Whitespace is spent on alignment, not padding.
- **Tables and lists are the main surface.** Right-aligned tabular or mono figures, sticky headers, sortable columns, compact filter chips. No thumbnails: a ticker or symbol is plain text in strong ink, optionally with the real logo if the product already has one. Never invent letter-badge "logos" for companies, coins or tickers.
- **Colour means direction or state only.** Green and red for up and down (in the market's convention), one brand accent for selection and focus, everything else neutral. No tinted icon chips, no per-tile hues, no gradient cards, no glows.
- **One look across the product, dark or light as the product already is.** Flat surfaces in two or three close greys, 4 to 8px radius, no shadows on a dark canvas.
- **Charts are the domain's own** (candlesticks with volume, depth, yield curves, treemaps, correlation matrices), drawn crisply with proper axes, crosshair and readouts. A sparkline belongs in a table row or watchlist, not decorating every tile.
- **Summary lines, not insight cards.** If the screen states what stands out, it is a compact text line or a small table, not a stack of cards with coloured icon chips.
- **Headers stay small.** A page title of 16 to 20px with a one-line context, then data. No hero figure at 40px unless the product's identity is that figure (a price on a detail page).
- **Phones:** keep the data; collapse columns into two-line rows (symbol and name left, price and change right) and use horizontal scroll for wide tables inside their own container.

Test: put a screenshot beside the real tool it competes with. If yours shows less, or looks more like a template than a terminal, it is wrong.

## Modules

A rich overview dashboard for a business tool (not a professional data tool, see above) has ten or more distinct modules. Draw from these and vary them:

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

- In consumer and business lists (not professional data tables), a thumbnail or portrait in the first column of every row, each one visibly different from the others. Name in strong ink, a secondary line in muted ink beneath.
- No truncated strings. Size columns and shorten metadata so every name, place and code is shown whole.
- Status as a pill with a dot, from a small consistent set.
- Right-aligned tabular figures; row height 52 to 64px with thumbnails; hairline separators or soft zebra; row hover; a row action (button or menu).
- Columns sized to their content so rows do not wrap raggedly.
- Filter chips or tabs with counts above the table; a "view all" control as a chip with an arrow.
- On phones a table becomes stacked cards with the key fields and the action.

## Forms and controls

Labels above fields, the right input types, validation with helpful messages beside the field, a primary button that shows progress. Style every control to the direction: inputs, selects, toggles, segmented controls, checkboxes.

## Small apps and mobile-first tools

For a tracker, to-do, wallet, workout log, timer or any personal tool. At the bar these look exactly like a well-made native iOS or Android app: familiar structure, clean surfaces, one brand colour, friendly item icons, real data. Design at 375px first.

**Anatomy of the main screen, top to bottom:**

1. **Safe area and header, with the brand.** The product's mark and name are visible on the home screen (in the header, or as the wordmark above the greeting): a product with no name on its main screen reads as a template. 12 to 16px top padding (plus `env(safe-area-inset-top)`). A header row: either a greeting ("Good morning, Sam" at 20 to 24px with the date in grey above or below) with a circular avatar or icon button on the right, or a page title with one or two round icon buttons (search, notifications, add). A small brand mark if there is no greeting.
2. **Optional date or filter strip.** A horizontal week strip (seven day pills with the day letter and number, today filled with the brand colour), or segmented tabs (Today / Week / Month) in a pill control.
3. **The summary card** (see `showpiece.md`): the brand-filled or dark card with the key figure (28 to 36px), a short line of context, and one clean visual (ring, mini chart, day dots, progress bar).
4. **One or two sections**, each with a title row (16 to 18px, weight 600) and a "See all" link on the right:
   - **A list of items** in white cards or one grouped white card with hairline separators. A row: a 40 to 44px icon chip (line icon or emoji in a soft tint), the name (15 to 16px, weight 500) with one line of secondary text (13 to 14px grey), and on the right the main control or figure: a round check button, a value, a chevron, a small progress ring. Row height 56 to 72px.
   - **A small stats grid** of two or three tiles (an icon chip, a label, a figure, a tiny bar or sparkline), or **one chart card** (weekly bars with the current day in the brand colour, a clean line chart).
5. **Bottom tab bar.** Four or five tabs with line icons and 11 to 12px labels, the active one in the brand colour, on a white bar with a top hairline or a floating rounded bar with a soft shadow. Often a central round add button in the brand colour. Leave enough bottom padding in the content so the bar never covers the last row. Content scrolls under the bar, so the bar needs something behind it: a solid white bar with a top hairline, or, for a floating bar, a fade from the canvas colour to transparent (about 24px tall) behind it. Rows peeking through a gap around a floating bar look like a collision in every screenshot.

**Each category has a signature moment** that popular shots almost always include. Build the one for your product as the summary card or right beneath it, drawn with care:
- *Finance and banking (personal budgeting too):* a designed payment card. If it stands for one account, it can be the balance card itself (that account's balance, its masked number, a chip). If the top figure is a total across accounts, keep the total card plain and show the cards as a small stack or carousel beneath it; never put a chip on a total (brand gradient or deep solid colour, a subtle pattern or large soft shapes, chip, network mark drawn as simple circles, masked number, name), often slightly stacked over a second card; quick actions as round buttons below it; a category breakdown drawn as something other than a default donut (proportional bubbles, a segmented bar with labels, stacked pills).
- *Finance stays restrained:* deep, calm colour (black, forest, navy, ink) with one accent; no candy pastels across the account tiles and no 3D objects stuck onto cards. A 3D object only belongs in an empty state or onboarding.
- *Fitness and workout:* a large progress visual for today (ring or arc with the key figure), a weekly bar chart with the current bar highlighted, and an activity card with a small route map or a session timeline.
- *Habits and wellness:* a week strip with per-day completion rings, colour-coded habit rows, and a streak or consistency chart.
- *Dashboards:* the KPI row and one large chart with a highlighted point and tooltip.

**Character comes from:** the brand colour on the summary card and active states, soft tints on item chips, friendly icons or emoji per item, a good sans at clean sizes, and real names and figures. Not from themes, metaphors, textures or decorative fonts.

**Rules:**

- **Open with data.** Ship believable sample data in a mid-use state (some done, some pending, a week of history) so the first view is full. Offer "Clear sample data" in a settings screen or menu; never put a sample-data note on the main screens. Design the empty state too.
- **Keep it calm.** One summary card, then white cards. Three to five things on the first screen, not ten. No module repeats information another already shows.
- **Transaction rows lead with a clear mark:** a line icon for the category in a soft chip, or a person's avatar for transfers. Keep one style for every row.
- **Every item has its own icon.** Two different exercises, categories or accounts never share the same glyph; draw or pick a distinct one for each.
- **Lists stay compact.** One row per item; details (a full history, settings) belong in a detail view or a bottom sheet opened by tapping the row.
- **The main action is obvious.** The daily action (tick, log, add) is a clear round control on each row, with a satisfying checked state (fill with the brand or item colour, a check icon, a short scale animation). Completed items stay readable; do not grey them out heavily.
- **Adding** uses a bottom sheet or a modal with a title, fields, suggestion chips with icons, and a full-width primary button.
- **No native-looking controls.** A browser date input with its calendar glyph, a default select arrow or a default checkbox instantly reads as an HTML page. Use chips ("Today", "Yesterday", "Pick a date"), segmented controls, a custom-styled select (`appearance: none` with your own chevron, same height and radius as the inputs) and custom checkboxes and toggles.
- **Settings is a real settings screen:** profile and account at the top, then reminders and notifications, appearance, units, privacy, help; data management (export, clear data) last, in plain words.
- **Every tab is a real screen.** The tabs in the tab bar open designed screens (stats with a chart, a calendar, a profile or settings list), not empty placeholders, because they will be looked at.
- **Streaks, progress and history** are shown the standard ways: a small flame or trophy icon with "12 days", a progress ring, a row of seven day dots, a monthly heatmap of small rounded squares, a weekly bar chart.
- **On desktop, stay an app.** A centred column of 420 to 560px with a side panel for stats or a calendar, or a simple two-column layout inside a light shell with a left nav. Never a stretched phone layout and never a phone column alone in empty space.
- **Data persists** across reloads.

## States

Build and look at each: first run or empty (designed, with illustration and an action), loading (skeletons in the shape of the content), populated with realistic volume, overflowing (long names, big numbers), error (what failed, how to retry), success. Use the audit script's `--setup` option to seed data and screenshot the populated state.

## Sample data

Use names, products, places and prices that fit the domain and country. Series behind charts vary naturally from point to point (no long flat runs, no sudden cliff at the end unless the story is about it), as real data does. Make numbers reconcile across tiles, charts and tables. Include variety and edge cases. Keep dates relative to today. Say once, discreetly, that the data is sample data.

## Phone and desktop

- **Phone:** bottom navigation, the hero module first, tiles in a two-column grid or a horizontal scroller with snap, charts at full width, tables as cards, primary actions within thumb reach, 44px targets, 16px inputs.
- **Desktop:** use the width. A small tool that is a single column on a phone becomes a composed layout on desktop: the main list beside a side column of stats, calendar and chart, inside a shell or a framed app container on an atmospheric ground. A phone-width column floating in an empty page is unfinished.
