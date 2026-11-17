# Marketing pages: landing, product, pricing

A landing page has to stop a stranger, show them the product, and make the case. At the bar, every section has something worth looking at, and the page gets more convincing as it goes.

Contents: the argument · the hero · the sections · proof · pricing · the closing band and footer · writing · rhythm · phone

## The argument

Before layout, write the case in five or six plain sentences: who this is for, what goes wrong for them today, what the product does about it concretely, why that is believable, what it costs and what to do next. Each section makes one of those sentences land. The visuals are how you make them land: show, do not list.

## The hero

The first screen is the shot. It needs all of these:

- **Navigation** with a designed wordmark (name in the UI sans at weight 600 plus a small glyph), four or five links, and a primary button. Often a floating pill or a glass bar.
- **An eyebrow** when it carries real information (what is new, who it is for).
- **A headline** of four to eight words that says what the product does or what the visitor gets, set large and tight, with one phrase emphasised. Cover the logo: would a stranger know what is being sold?
- **A subhead** of one or two lines adding the next most important fact.
- **Actions:** one primary button and one quiet secondary, with a line of reassurance beneath (free tier, no card, time to set up).
- **A proof line** near the actions when you have one: an avatar stack with a count, a rating badge. Fictional placeholders are flagged in the handoff.
- **The showpiece:** the product visual from `showpiece.md`, large, detailed, with floating cards and atmosphere. It may sit beside the copy (split hero) or beneath it at full width (centred hero), and should bleed into the next section.

A hero without a detailed product visual is the single most common reason a landing page looks cheap.

**When there is no software product** (a conference, festival, exhibition, concert, venue, course or community), the showpiece is not a product mock but **a poster**: the page should look like the event's own printed poster. Choose one idea and commit to it at full scale: the name or the dates set as an oversized wordmark that fills the width; two or three bold geometric shapes in the brand colours; a strong photograph cropped full bleed with the type over it; a grid of speaker portraits as the composition. A large colour field is allowed here (the 15% fill budget is for product UI), and the display face may be expressive. A conference page laid out like a SaaS landing page (centred headline, two buttons, a stock photo of a stage) is a miss. Audit such pages with `--register showcase`.

**Avoid the stock AI hero recipe.** Generated landing pages all share one hero: two blurred colour blobs behind the copy, a "New · feature" pill above a headline whose second line is grey or in the brand colour, three checkmark reassurances under the buttons, an avatar stack with five stars, and a browser-chrome mock with a toast. Each piece is fine on its own; all of them together read as a template. Use at most two of them, and give the hero one decision of its own instead: a strong single colour field behind the product, a product shot cropped and angled with intent, a real piece of the product's content as the headline's proof (an invoice, a receipt, a schedule), or an unusual but legible composition such as the product filling the right half edge to edge. Backgrounds behind a hero are a solid field, a subtle grid, or one soft wash, not scattered blobs.

## The sections

Use what the argument needs, and give each a visual idea. A strong page usually has five to eight of these:

- **Logo strip** directly under the hero: five or six fictional wordmarks in muted ink.
- **Feature bento:** a grid of tiles in mixed sizes. Each tile has a short title, one line of copy and its own miniature interface or illustration filling the rest of the tile, cropped at the tile edge: a notification stack, a mini chart with a tooltip, a row of avatars with cursors, a toggle panel, a currency switcher, a calendar strip. One tile is dark or accent-filled. Never a tile with only an icon and text.
- **Large demonstration:** one capability shown big, as a split section with a framed visual on one side and three short points with icon chips on the other. Alternate sides between consecutive sections.
- **How it works:** three steps, each with its own small visual and a connecting line. Only when the steps are real.
- **Stat band:** three or four big figures with labels on a contrast surface. Only figures you can stand behind, or clearly marked as examples.
- **Testimonials:** cards of mixed sizes with quotes, portraits and roles, one of them featured large, perhaps with a result figure.
- **Integrations or ecosystem:** chips or tiles arranged on orbit rings or a grid around the product mark.
- **Comparison:** before and after, or this product against the old way, as two contrasting panels.
- **Pricing** (below).
- **FAQ:** an accordion with real buyer questions, in a two-column layout with a short intro or a contact card.
- **Closing band** (below).

Give unequal things unequal space, and give the page a calm rhythm of backgrounds so it has shape when seen as a thumbnail:

- **Most sections sit on the page canvas.** Space and the section headers separate them; no rules or dividers between sections, and no section wrapped in its own rounded card.
- **One tinted band** (the canvas one step darker or warmer, full width) for a section that should read as a group, such as logos and testimonials or the feature grid. At most one every two or three sections.
- **One dark band at most**, for the peak of the page: the main demonstration, the stat band or the closing call to action. A footer may share it.
- **Bands run full width with the content inside at the page's one content width.** Never a band inside a band, or a card inside a card inside a band.
- **Section headers follow one pattern** across the page (optional eyebrow, a 32 to 40px title, a one-line lede at 17 to 18px in the secondary tone), aligned the same way, left for most pages.
- Section padding 96 to 128px on desktop, 64 to 80px on phones; a tinted or dark band uses the same padding so the rhythm holds.

Vary the recipe too. If every section is "small label, headline on the left, paragraph on the right, row of cards", the page reads as stacked blocks. Centre some section headers, run one visual at full width, split another, and let the rhythm of spacing change: closer together where sections belong to one thought, further apart at a change of subject. Avoid stretches of more than about 120px of empty ground between sections.

Size each tile's visual to fill its tile. A mini interface floating in a half-empty card, or clipped awkwardly at the edge, looks unfinished; let tiles have different heights if their content differs.

## Proof

Show the product working, state specifics, and use placeholder social proof honestly: fictional names and companies, never real logos or real people, and a clear note in the handoff of what to replace. Put that note in the handoff, not on the page: labels such as "sample customer" printed in the design weaken it and are not what the user will ship. Specific claims persuade ("backed up every 15 minutes, kept for 30 days"); vague ones do not ("smart automated backups").

## Pricing

A pricing page is read by someone who already half wants the product and is now doing arithmetic. The generated default (three identical cards, "Most popular" pill on the middle one, ten checkmarks each, an FAQ accordion) answers none of their questions. Answer them, in this order, and let the page's art direction (`web-directions.md`) carry through it like any other page.

**1. What will I pay?** Make the price concrete for this visitor:
- A **calculator** when the price depends on usage or seats: a slider or stepper (editors, seats, invoices, GB) that updates every plan's total live, with the per-unit price and the yearly total in currency ("$1,152 a year for 8 editors"). This is the strongest single move on a pricing page.
- A billing toggle that really changes the figures and states the saving in currency, not only as a percentage.
- Prices large, in the display face or at the title size, tabular figures, with the period and the unit in small text beside them.

**2. Which plan is mine?** Help the choice, do not just list:
- Each plan names who it is for in its first line ("For one designer", "For product teams"), and its button says what happens ("Start free", "Start 14-day trial", "Talk to sales").
- The featured plan is set apart by **one bold choice that fits the direction**: a dark or brand-coloured column, a larger column, a column that breaks the grid, or the only plan with a filled button. Not a pill on an otherwise identical card.
- Plans can be **columns of one table** (shared rows, aligned features, hairlines) rather than separate floating cards; that is how most well-made pricing pages read now (Linear, Vercel, Figma).
- Features listed as the few that differ between plans ("Everything in Free, plus"), five or six per plan, not ten checkmarks that repeat.

**3. What exactly is included?** A full comparison table below the plans: grouped rows with group headings, a sticky header row with the plan names and buttons, values rather than only ticks ("3 projects", "Unlimited", "90 days"), and a dash for "not included". On phones, plan tabs above the table instead of a sideways scroll.

**4. What if...?** Objections answered in place: the trial, cancelling, what counts as a seat, discounts for students and non-profits, payment methods, invoices, security. A two-column FAQ (questions on the left, answers open on the right) reads better than a stack of closed accordions.

**5. Proof and a way out.** A quote from a customer on the plan they chose, logos as one quiet row, and an enterprise or custom band ("Over 100 editors? Talk to us") with one button.

Avoid: three equal cards as the whole page; a "Most popular" pill as the only difference; prices without a unit; a toggle that changes nothing; "Contact us" as the only price.

## The closing band and footer

End on a visual, not a form on a blank strip. A full-width band on a contrast surface with atmosphere, a short headline, the primary action (or a compact email form with its states), and a product visual or motif from the hero bleeding in from one side. Then a designed footer: wordmark, three or four link columns, a small locale or status line, legal text.

## Writing

- Second person, the visitor's own words for their problem, concrete nouns and numbers.
- Headings carry the argument: someone who reads only the headings should still get the case.
- Short blocks: two or three lines of body copy per block.
- Buttons say what happens ("Start a free workspace").
- No vocabulary that fits every product: seamless, powerful, effortless, elevate, unlock, supercharge, all-in-one, next-generation.

## Rhythm

- Section padding `clamp(64px, 9vw, 128px)`; one content width (1120 to 1200px) for every section; one grid.
- A peak every one or two screens: the hero, the main demonstration, pricing, the closing band.
- Let visuals overlap section boundaries so the page feels continuous.
- No large empty areas: if a column is short, enlarge its visual or rebalance.

## Phone

The hero stacks: headline, actions, then the showpiece recomposed for a narrow screen and still large. Bento tiles become a single column with their mini visuals intact. Pricing shows the featured plan first. Navigation collapses to the wordmark, a menu button and the primary action. Check that floating cards do not cause horizontal scroll.
