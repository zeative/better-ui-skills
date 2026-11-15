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

Give unequal things unequal space, and change the surface between sections so the page has shape when seen as a thumbnail. This is required, not optional: a dark page needs at least one fully light section and a light page at least one dark one, plus a tinted band. A long page in one tone from navigation to footer is monotone however good each section is.

Vary the recipe too. If every section is "small label, headline on the left, paragraph on the right, row of cards", the page reads as stacked blocks. Centre some section headers, run one visual at full width, split another, and let the rhythm of spacing change: closer together where sections belong to one thought, further apart at a change of subject. Avoid stretches of more than about 120px of empty ground between sections.

Size each tile's visual to fill its tile. A mini interface floating in a half-empty card, or clipped awkwardly at the edge, looks unfinished; let tiles have different heights if their content differs.

## Proof

Show the product working, state specifics, and use placeholder social proof honestly: fictional names and companies, never real logos or real people, and a clear note in the handoff of what to replace. Put that note in the handoff, not on the page: labels such as "sample customer" printed in the design weaken it and are not what the user will ship. Specific claims persuade ("backed up every 15 minutes, kept for 30 days"); vague ones do not ("smart automated backups").

## Pricing

- Cards on a tinted or contrasting section, as many plans as the business has.
- One **featured plan** made unmistakable: a dark or accent fill, a gradient border, a larger size or a lift, and a small label saying who it is for.
- Each card: plan name, a one-line "for whom", a large price with period, the main button, and a short list of what is included with check icons. Higher plans list what they add.
- A billing toggle that really changes the figures and states the saving.
- The reassurance line (trial, cancellation, card) under the buttons.

## The closing band and footer

End on a visual, not a form on a blank strip. A full-width band on a contrast surface with atmosphere, a short headline, the primary action (or a compact email form with its states), and a product visual or motif from the hero bleeding in from one side. Then a designed footer: wordmark, three or four link columns, a small locale or status line, legal text.

## Writing

- Second person, the visitor's own words for their problem, concrete nouns and numbers.
- Headings carry the argument: someone who reads only the headings should still get the case.
- Short blocks: two or three lines of body copy per block.
- Buttons say what happens ("Start a free workspace").
- No vocabulary that fits every product: seamless, powerful, effortless, elevate, unlock, supercharge, all-in-one, next-generation.

## Rhythm

- Section padding `clamp(72px, 10vw, 140px)`; consistent content width; one grid.
- A peak every one or two screens: the hero, the main demonstration, pricing, the closing band.
- Let visuals overlap section boundaries so the page feels continuous.
- No large empty areas: if a column is short, enlarge its visual or rebalance.

## Phone

The hero stacks: headline, actions, then the showpiece recomposed for a narrow screen and still large. Bento tiles become a single column with their mini visuals intact. Pricing shows the featured plan first. Navigation collapses to the wordmark, a menu button and the primary action. Check that floating cards do not cause horizontal scroll.
