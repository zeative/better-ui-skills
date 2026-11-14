# Product UI: apps, dashboards, admin, tools

For interfaces people work in. The measure of success is how quickly and confidently someone gets their task done on the hundredth visit, not how the first screenshot looks.

Contents: what changes in this register · decide what the screen is for · hierarchy in dense screens · navigation · dashboards and numbers · charts · tables and lists · forms · feedback and safety · states are the product · small screens · sample data

## What changes in this register

- Familiarity is a feature. Controls should look and behave like the controls people already know. Spend originality on how well the product fits its task, not on reinventing a dropdown.
- Density is welcome. People doing real work want to see more at once and scroll less. Tight, well-aligned and well-grouped beats airy.
- Personality is small and concentrated: the type choice, one accent, the tone of empty states and messages, and at most one signature in how the core object is shown.
- Decoration costs attention every single day. Remove it.

## Decide what the screen is for

Before laying anything out, answer: what question does a person open this screen to answer, or what action do they come to take? Rank the content by how directly it serves that. The top item gets the most prominent position and the most visual weight. Things that are rarely needed go behind a click.

A dashboard is not a place to show everything you have data for. It is the answer to "do I need to do anything right now, and if so what?" Lead with what needs attention (work waiting, something failing, a threshold crossed), then how things are going, then detail.

## Hierarchy in dense screens

- Three levels of text emphasis are usually enough: primary (ink), secondary (muted), and tertiary for metadata. Get there with colour and size before weight.
- De-emphasise labels, emphasise values. In "Open tickets  42" the number is the content; the label is quiet.
- One primary button per view. Other actions are secondary (outlined or tonal) or tertiary (text). If everything is a filled button, nothing is primary.
- The action people perform most on this screen is the easiest thing to find and hit: the biggest target, the strongest contrast, in the natural place for a thumb or cursor. If today's task is a small outline at the edge of a row, the design has its priorities backwards.
- The largest text on the screen is the most useful fact on the screen. A date, a page name or a greeting set bigger than the number the person came for is misplaced emphasis.
- Things that can be pressed look pressable (a boundary, a fill, an icon, a change on hover) and things at risk look at risk. Do not rely on a line of instructions to reveal what is interactive.
- Density still needs peaks. After the lead item, keep at least two clearly different levels below it (section headings versus rows, for example) so the lower half of a long screen does not dissolve into text of one weight.
- Do not give every group a card. Sections on a page are separated by space and a heading; reserve bordered containers for things that are objects.
- Align numbers on the right, text on the left, and keep column edges consistent down the page.

## Navigation

- Show where the person is, at every level.
- Name items with the user's nouns, not internal ones.
- Order by frequency of use, not alphabetically or by org chart.
- Do not add navigation items for sections that do not exist. A sidebar full of dead links is worse than a short honest one. If the task is one screen, build one screen.
- On phones, primary destinations go in a bottom bar within thumb reach or behind one clearly labelled menu; never a sidebar squeezed to a strip.

## Dashboards and numbers

- Every number needs a unit, a time frame and something to compare it with (yesterday, last week, target). A bare number is not information.
- Choose the comparison that supports a decision. "12% up on yesterday" matters less than "4 tickets are past their deadline".
- The row of four equal stat tiles is the default dashboard opening. Use it only if those four numbers really are equally important. Usually one or two matter most and deserve to be bigger, and the others can be a compact line.
- Up is not always green. Colour a change by whether it is good for that metric, and leave neutral facts uncoloured.
- Use the locale's formats: thousand separators, currency symbol and placement, date order, 24-hour or 12-hour time.
- Round sensibly. Three significant digits is usually enough at a glance; exact values belong in the table or a tooltip.
- In a row of figures, the values share a baseline. Keep labels to one line, or reserve the same label height in every item, so one long label cannot push its number out of line.
- Name each thing once and use that name everywhere. The same product or person spelled two ways in two panels reads as two things.

## Charts

- Pick the form from the question: change over time is a line (or bars for few discrete periods); comparing categories is horizontal bars sorted by value; part of a whole is a single stacked bar or just numbers. Pie charts and gauges rarely beat a sorted list with bars.
- Label directly on the chart where possible instead of a separate legend. Always label axes or values so the chart can be read without hovering.
- One colour for the series, a stronger one for the point you want noticed (today, the selected item). Colour by meaning, not by position.
- Start bar charts at zero. Keep gridlines faint and few.
- Provide the same data as text or a table for people who cannot see the chart, and give the chart an accessible name that states the takeaway.
- A hand-built SVG or CSS chart is often cleaner than a library for a small fixed dataset, and removes a dependency. Use a library when you need real interaction or many series.
- Tooltips and hover states are extras. The chart must make sense without them, especially on touch.

## Tables and lists

- Left-align text, right-align numbers, and use tabular figures. Align headers with their column content.
- Size columns to their content. A column too narrow for its typical value wraps most rows onto a second line, leaves units stranded, and makes row heights ragged; give it room, shorten the content, or drop a less important column.
- Row height 40 to 48px for comfortable scanning, 32 to 36px for dense data. Separate rows with a faint rule or generous spacing, not heavy zebra stripes and borders together.
- Make the whole row the target when a row opens a detail view, and show it on hover and focus.
- Put the identifying column first and make it the strongest. Truncate long text with an ellipsis and keep the full value reachable.
- Status is a word plus a colour, in a small set of statuses with consistent meaning. If every row has a different coloured pill, the colours stop helping.
- Decide the sort and say so. If the list is filtered, show how many of how many.
- Handle zero rows, one row, a thousand rows (pagination or virtualisation), and a failed load.
- On phones, a table with more than three columns becomes a list of stacked records with the key fields visible, or scrolls horizontally inside its own region with the first column pinned.

## Forms

- A visible label above every field. Placeholders are examples, never labels.
- Group related fields, order them the way people think about the task, and ask for nothing you do not need.
- Size fields to their expected content: a postcode field is short.
- Use the right input type and `autocomplete`, `inputmode` and `enterkeyhint` attributes so phones show the right keyboard and browsers can fill.
- Validate when the person leaves a field or submits, not while they are still typing. Put the message next to the field, say how to fix it, keep what they typed, and move focus to the first problem.
- Mark optional fields rather than required ones when most are required.
- The submit button says what will happen, shows progress while it happens, and cannot be triggered twice.
- Enter submits single-field forms. Do not block paste.

## Feedback and safety

- Every action gets a response within about 100ms: a pressed state, then the result or a progress indicator.
- Confirm success where the user is looking. Use toasts for results of actions whose effect is off screen, and keep them short and dismissible.
- Destructive actions: prefer undo over a confirmation dialog for things that are easy to reverse; use a confirmation that names the thing being destroyed for things that are not.
- Never lose the user's input. Persist drafts and state across reloads when a person would expect it (a to-do list that forgets everything on refresh is broken, not minimal).
- Optimistic updates are good; roll back visibly if the request fails.

## States are the product

In a tool, people spend most of their time in states the happy-path mock never shows. Build each of these for every data view, and look at each one rendered:

| State | What it needs |
|---|---|
| First run / empty | Say what goes here, show an example or a starter, offer the action |
| Loading | Skeleton in the shape of the content, no layout jump |
| Partial | Some data, some still loading or failed |
| Populated | The normal case, with realistic volume |
| Overflowing | Long names, big numbers, many items |
| Error | What failed, whether data is safe, how to retry |
| Success | Confirmation that does not block the next action |
| Offline or stale | When the data is from, and that it may be out of date |

Use the audit script's `--setup` option to put the app into several of these and screenshot each.

## Small screens

- Decide what the phone user came to do. It is usually a subset of the desktop task: check, tick off, reply. Put that first.
- Primary actions near the bottom, within reach of a thumb. Respect safe areas.
- Inputs at 16px or larger. Tap targets 44px. Enough space between adjacent targets to avoid mis-taps.
- Replace hover-only affordances with something visible.
- Test with the on-screen keyboard open: is the field being typed into still visible?

## Sample data

Placeholder content shapes the design, so make it honest.

- Use names, products, places and prices that fit the domain and country.
- Make the numbers reconcile: line items sum to totals, percentages match their bases, the chart matches the table.
- Include variety and edge cases: a long name, a cancelled item, a zero, something overdue.
- Keep dates relative to today so the mock does not look stale.
- State once, discreetly, that the data is sample data. Do not invent metrics that imply a real business result.
