# Choosing a direction

How to arrive at a design that belongs to its product, when nobody has handed you one.

Contents: why the first idea is generic · the clusters to recognise · material from the subject · the axes that are real choices · three candidates · the signature · type · colour · when quiet is right

## Why the first idea is generic

A model's first answer to a design question is the centre of everything it has seen. Safe choices dominate what has been published, so the centre is safe, and identical for everyone who asks. That is why unrelated products end up wearing the same clothes.

A list of banned styles does not help. Ban the most common look and you get the second most common, with the same lack of thought behind it. The only thing that works is changing where the answer comes from: out of the product's own world instead of out of the average of all websites.

## The clusters to recognise

These are the places unchosen designs currently land. Learn to recognise them so you notice when you have arrived at one without deciding to. None is forbidden. Each can be right when the subject calls for it. What matters is whether you can say why.

- **SaaS indigo.** White or slate-dark ground, indigo-to-violet accent or gradient, Inter, centred hero with a pill badge above the headline, three icon cards, gradient headline text, glass panels, glowing blobs.
- **Warm editorial.** Cream or parchment ground (around `#F4F1EA`), a high-contrast serif headline with one word in italic and coloured, terracotta or forest-green accent, small monospace uppercase labels above each section, pill buttons. This is what comes out when the first cluster is avoided, and it is now just as recognisable.
- **Dark acid.** Near-black ground, one neon accent (lime, vermilion, cyan), monospace details, terminal flavour. Popular for anything "developer".
- **Broadsheet.** Hairline rules, zero radius, numbered sections ("01 / Introduction"), oversized grotesque type, newspaper columns.
- **The component kit**, which appears on top of any of the above: a stat banner ("10k+ users · 99.9% uptime"), a row of muted customer logos, a bento grid of feature cards, three pricing tiers with the middle one raised and labelled "Most popular", an FAQ accordion, a full-width coloured call-to-action block before the footer, cards with a coloured left stripe, tinted rounded squares holding line icons, emoji standing in for icons.

A quick check at any point: describe your design in one sentence. If the sentence matches one of these and you did not choose it for a reason tied to the product, you have the default.

## Material from the subject

Before thinking about colours or fonts, collect raw material. Spend a minute on each of these and write down what you find; this list is what you will design from.

- **Artefacts.** What physical or digital objects do these users already handle in this domain? A bank statement, a receipt roll, a boarding pass, a prescription label, a seed packet, a score sheet, a shipping manifest, a lab notebook, a mixing desk. Artefacts carry decades of solved design: what is emphasised, how numbers are set, what is ruled or boxed.
- **Setting.** Where is the screen, and what else is going on? One-handed on a phone in a kitchen; a second monitor glanced at all day; a tablet on a shop counter in bright light; a laptop at midnight. The setting decides size, contrast, density and whether dark or light is right far better than preference does.
- **Stakes and mood.** What does the task feel like? Money wants exactness and calm. Health wants clarity without alarm. A hobby can be playful. A creative tool should get out of the way of the work. A page for sceptical buyers has to earn trust before it earns delight.
- **Local conventions.** What do the tools these people already trust look like, and why? Accounting software is dense and tabular because accountants compare columns. Following a convention users rely on is a choice, not a failure of imagination.
- **The name and voice**, if the product has them. A name often implies a material, a place or an attitude.

## The axes that are real choices

Each of these is a decision with more than one good answer. Decide them from the material, not from habit.

| Axis | Range |
|---|---|
| Ground | pure white · tinted light · mid-tone · dark |
| Temperature | cool · neutral · warm |
| Contrast | soft and low · crisp and high |
| Type | grotesque sans · humanist sans · geometric sans · old-style serif · modern serif · slab · monospace |
| Density | airy · balanced · dense |
| Corners | square · slightly eased · soft · fully round |
| Depth | flat with rules · bordered surfaces · shadows and layers |
| Colour load | one ink and one accent · two-colour · many colours with assigned meanings |
| Imagery | none · the product itself · data · illustration · photography |
| Motion | none · functional only · expressive in one place |

## Three candidates

Write three one-line directions drawn from your material. They must differ from each other on at least three axes, so that you are comparing real alternatives rather than three shades of one idea. Then write your default next to them. Choose by asking which one a member of this audience would recognise as being *for them*, and which best supports the one job.

Example of the reasoning, for a parcel-tracking page for a regional courier:

- Default: white page, blue accent, rounded cards, a progress bar with circular step icons.
- A. *Shipping label*: white ground, black condensed grotesque, heavy rules, the tracking number set large in monospace like a waybill, one signal colour for status. Dense, high contrast, square.
- B. *Route map*: pale cool ground, the journey drawn as a single line with stops, humanist sans, soft corners, colour only on the line.
- C. *Departure board*: dark ground, tabular rows of events with times aligned, amber status text, no cards at all.

A person checking a parcel wants one answer (where is it, when does it arrive) on a phone, often outdoors. A wins on legibility in daylight and makes the number they are holding the hero; C is striking but hurts readability in sun. Choose A and borrow B's single route line as the signature.

That example is there to show the reasoning. Do not reuse its answers.

## The signature

One element that could only belong to this product, drawn from the subject, carrying real content. It is usually structural (how the main content is presented), not ornamental (something added on top).

Shapes it often takes: the product's central artefact rendered faithfully as the main visual; a domain-specific way of showing the key quantity; a layout borrowed from a real object the audience knows; a typographic treatment of the one thing users care about most.

Test: remove it. If the page is merely plainer, it was decoration. If the page loses its way of explaining itself, it was a signature.

Everything else should be quiet. Distinctiveness spent in five places reads as noise and competes with the content.

## Type

Type does most of the work of making a page feel like something, so choose it early and for reasons.

- Pick by role and classification, from the axes above: what classification suits the subject and setting, and does it stay legible at the sizes you need?
- At most two families. One family with good weights is often better than a pairing. If you pair, pair for contrast of classification (a serif with a sans), never two similar faces.
- For anything numeric (prices, tables, dashboards, times), check that the face has tabular figures and set `font-variant-numeric: tabular-nums`.
- Check language coverage for the content's language and any names in the sample data.
- A system font stack is a legitimate choice for tools: it is fast, familiar and native. Choose it deliberately for utilities and internal tools; do not fall into it on a page that needs a voice.
- Loading: at most two families and four files, `font-display: swap`, a fallback stack of the same classification. Sources that are generally reachable: Google Fonts, Bunny Fonts, Fontshare. If the environment is offline, use a considered system stack rather than a webfont that will fail.
- The faces everyone reaches for first change every year. If the family you are about to use is the first one that came to mind, look at three others of the same classification before committing.

## Colour

- Start with the neutrals, since they cover most of the screen. Tint them slightly toward the brand hue so they belong to the palette; pure grey beside a coloured accent looks unrelated.
- Build each ramp in OKLCH by stepping lightness at a constant hue, so steps look even. Check the result in sRGB.
- One accent, with a job written down (primary action and current selection, for example). If the accent appears on things that are not that job, it stops meaning anything.
- Status colours (success, warning, danger, info) are a separate set, used only for status, and always paired with text or an icon, because colour alone is invisible to many people.
- Take the accent from the subject when you can: a material, a product, a place. A hue chosen because it is pleasant belongs to no one.
- Dark mode is a second palette, not an inversion: lower the saturation, lift surfaces with lightness instead of shadow, and re-check contrast.
- Verify contrast on every text and background pair you actually use. Muted secondary text is the usual failure.

## When quiet is right

Not every interface needs a point of view. An internal admin tool, a settings page, a utility used fifty times a day: here the best design is the one people stop noticing. Choose a neutral ground, a system or workhorse sans, one restrained accent and no signature at all, and put every bit of effort into hierarchy, density, states and speed. That is a direction too. What makes it designed rather than default is that the spacing is consistent, the hierarchy is clear, the states are all there, and you can say why each choice suits the people using it.
