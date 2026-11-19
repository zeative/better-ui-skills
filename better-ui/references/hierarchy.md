# Hierarchy and sizing data

What separates a designed interface from a decorated one is mostly invisible: the reader always knows where to look first, related things sit together, and every number is sized and aligned so it can be read and compared at a glance. These are the working rules behind that, with numbers. They come from long-standing practice (Gestalt grouping, Tufte's data-ink, Stephen Few's dashboard design, Fitts's and Hick's laws, the type ramps of Apple's and Google's design systems) and apply to every kind of screen. The references' measured sizes win over the ratios here where they differ; the levels and grouping rules always apply.

Contents: decide the levels · the type ramp · grouping and spacing · numbers · tables · charts · dashboards · controls · checks

## Decide the levels before styling

- For each screen, write down the **one primary thing** (the answer the screen gives: the balance, today's workout, the board), **two to four secondary things** (the figures and actions that support it) and treat **everything else as tertiary** (navigation, meta, help). Each level gets one treatment, used everywhere on the screen.
- Hierarchy comes from, in order of strength: **size, weight, contrast (primary or secondary text tone), position** (top-left is read first in left-to-right languages) and **space around**. Hue and fills come last. Use the fewest needed: a heading that is bigger, bolder and coloured is shouting.
- **Quieten the rest instead of raising the main thing.** Secondary text in the secondary tone and a size smaller usually does more than making the headline larger.
- One primary per region. Two equally loud things side by side cancel each other out.

## The type ramp

- Four or five sizes per screen, not more. Adjacent levels differ by a ratio of about 1.2 to 1.33 (12, 14, 16, 20, 24, 32).
- **A figure and its label:** the figure is 2 to 2.5 times the label (13px label, 28 to 32px figure in a stat tile; 12px label, 20 to 24px figure in a compact one). Below 1.6 times, the number does not lead.
- **Label above value,** label in the secondary tone, value in primary. Units, currency signs and decimals smaller or quieter than the figure.
- **Page title** about 1.5 to 2 times a section title. Section titles 16 to 20px weight 600; card titles 14 to 16px weight 500 to 600.
- Body text 14 to 16px with lines of 45 to 75 characters; captions and meta 12 to 13px, never below 11px.

## Grouping and spacing

- **Proximity does the grouping.** Space inside a group is about half the space between groups: 8 between a label and its value, 16 to 24 between items, 24 to 32 between cards, 48 to 64 between page sections. When everything is spaced the same, nothing is grouped.
- **Enclose only when proximity cannot do it.** A card is for a group that must read as one object (a tile, a panel). Cards inside cards, or a card around every heading, flatten the hierarchy.
- **One left edge per column.** Labels, values and icons share their edges down a list; numbers share a right edge. A value that starts 3px off its neighbours reads as a mistake.
- **Equal things are equal.** Rows in one list share one height; tiles in one row share one padding and one baseline for their figures.

## Numbers

- **Tabular figures** (`font-variant-numeric: tabular-nums`) anywhere numbers change or line up.
- **Right-align numbers in columns** and keep one precision per column (all `12.4%`, not `12%` beside `12.45%`), so digits of the same order sit under each other. Text columns align left.
- **Round for reading, full for checking.** Tiles show two or three significant figures with consistent abbreviations ($1.2M, 48.2k); tables and tooltips show full values.
- **Every figure has its frame:** unit, period and comparison ("+8.2% vs last month"). Signed changes coloured by meaning, not by sign: a falling cost is good.
- Negative numbers with a real minus sign (−) and the same format everywhere.

## Tables

- **Row height by density:** 28 to 32px for professional tools, 40px by default, 48 to 56px with avatars or two lines. One height per table.
- **Columns sized to content,** the identifying column first and widest, numeric columns right-aligned with right-aligned headers. About seven to nine columns fit a desktop table before it needs to scroll; on narrow screens the first column stays sticky.
- **Header** 12px in the secondary tone, weight 500, sentence case. Hairline row separators or zebra, not both.
- **States read apart:** hover, selected and keyboard focus each have their own treatment.

## Charts

- **Size the chart to what it shows.** A main chart 240 to 360px tall on desktop, a supporting chart 120 to 180px; seven bars do not need 400px. Line charts read best at about 2:1 to 3:1, width to height.
- **Bars** start at zero; bar width about equal to or twice the gap; four to six y-axis ticks at round values.
- **Label directly** when there are five series or fewer (the value or name at the end of the line) instead of a separate legend; otherwise keep the legend next to the chart, in the same order as the series.
- **Data-ink:** every mark should carry data or help read it. Faint gridlines, no 3D, no shadows or gradients on bars, no double encoding without a reason. Axis labels in the tertiary tone and the mono.
- **One accent per chart,** on the thing that matters; everything else in neutral steps.

## Dashboards

- A dashboard answers "how is it going, and is anything wrong?" at a glance and fits the question on one screen.
- The most important figure top-left; five to seven key figures at most in the first row; supporting detail below and to the right.
- Group modules by the question they answer, not by the type of widget.
- Each figure appears once. A second tile restating the same number in another form is noise.

## Controls

- **Fitts's law:** the primary action is large and close to where attention already is; destructive actions are away from it. Targets are at least 44px on touch screens; dense desktop tools can go to 28 to 32px rows when the whole row is clickable.
- **Hick's law:** fewer choices at once. Group options, choose good defaults, put rare actions in a menu.
- **A button's weight follows its scope,** not the importance its author feels:
  - *Page action* (the one thing this screen is for: "New invoice", "Add habit"): the filled brand button, 36 to 40px tall in apps, 44 to 48px in a landing hero. One per screen.
  - *Panel or section action* (in a card or table header: "Add position", "Export"): a quiet button, outline or a neutral fill, 28 to 32px tall, 10 to 12px side padding, 12 to 13px text, an icon only if it helps. It must not outweigh the panel's own title.
  - *Row or item action* ("Edit", "Remind"): an icon button or a text link, shown on hover in dense tables.
  - In professional tools the brand fill is rarer still: often only the global primary action, or none, with selection and focus carrying the accent.
- Buttons in one row share one height with the icon buttons beside them. A filled button in a header that is taller or brighter than everything else in that header is the most common way a tidy screen starts to shout.

## Checks

- **Squint test:** blur the screenshot (or look from a distance). The primary thing should still stand out, then the secondary groups. If it is an even grey texture there is no hierarchy; if five things pop there is too much.
- **Five-second test:** someone who sees the screen for five seconds can say what it is for and what the main number or action is.
- **Alignment pass:** follow each column edge down the screen; every break should have a reason.
