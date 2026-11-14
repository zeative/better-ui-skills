# Marketing pages: landing, product, pricing

For pages that have to convince someone who arrived with little attention and no obligation to stay. The page is an argument. Design it as one.

Contents: the argument comes first · the first screen · show the thing · structure from the argument · proof, honestly · pricing · calls to action · writing · visual rhythm · motion and performance

## The argument comes first

Before any layout, write the case in five or six plain sentences, the way you would explain it to a friend who has the problem:

1. Who this is for and the situation they are in.
2. What goes wrong for them today.
3. What this product does about it, concretely.
4. Why that is believable.
5. What it costs and what they should do next.

Those sentences are the page. Each section exists to make one of them land, in that order. If a section does not advance the argument, it does not belong, however standard it is.

## The first screen

A visitor decides in a few seconds whether this is for them. Above the fold they need to be able to answer: what is it, who is it for, and what should I do?

- The headline says what the product does or what the visitor gets, in words they would use. A clever line that needs the subhead to explain it is a wasted headline. Test: cover the logo and read the headline alone. Would a stranger know what is being sold?
- The subhead adds the next most important fact (how, for whom, or the main objection answered). It does not repeat the headline in more words.
- One primary action. A second, quieter one is fine if it serves people who are not ready ("See how it works").
- Something that shows the product. See the next section.
- The label-above-headline, the announcement pill, and the row of trust statistics are optional furniture. Include one only when it carries real information.

## Show the thing

The most persuasive visual is the product doing its job. In a prototype with no screenshots available, build a faithful fragment of the real interface in HTML and CSS, populated with believable content, showing the single most valuable moment (the result, not the settings page). That is far stronger than abstract shapes, stock illustration or a generic dashboard collage.

- Show one moment clearly rather than three overlapping windows.
- Keep it honest: only depict what the product does.
- Let it be the page's signature. A well-made depiction of the central artefact gives the page an identity no palette can.
- It must stay legible on a phone: recompose or crop it, do not just scale it down until the text is unreadable.

## Structure from the argument

There is a standard running order (hero, three features, social proof, pricing, FAQ, call to action, footer) and it is the reason these pages blur together. Use the sections your argument needs, in the order it needs them.

- Features are claims. State each as a benefit with its evidence next to it: a concrete example, a picture of it working, a number you can stand behind. A grid of icon, title and one line of description says almost nothing; three well-shown capabilities beat nine listed ones.
- Give unequal things unequal space. The capability that matters most gets a full-width treatment; minor ones can be a compact list. A bento grid of equal tiles asserts that everything is equally important.
- Vary the form of sections because their content differs (a comparison, a sequence, a demonstration, a quote), not to keep things lively.
- A "how it works" sequence is worth including only if the steps are real and specific to this product.
- FAQ sections are for questions buyers genuinely ask before purchasing (data, cancellation, limits). If you cannot name the real objections, leave it out.
- End with the next step restated simply. It does not need a giant coloured block to be noticed.

## Proof, honestly

Proof is the part most often fabricated, and fabricated proof is the fastest way to lose a visitor's trust and the client's.

- Do not invent testimonials, names, companies, logos, star ratings, user counts or outcome statistics. If you were not given real ones, do not include that section. If the page clearly needs it, leave a visibly marked placeholder and tell the user what to supply.
- Proof you can always provide without inventing anything: showing the product working, explaining specifically how it does what it claims, clear pricing, a clear policy (free tier limits, cancellation, where data lives).
- Specific claims persuade; vague ones do not. "Backed up every 15 minutes, kept for 30 days" is better than "smart automated backups".

## Pricing

- Lead with what the buyer pays and what they get, per plan, in their currency and billing period. Say what happens at the limits.
- Use as many plans as the business has, not three by reflex. One plan is fine.
- If one plan is recommended, say who it is for instead of just labelling it popular (which is an invented claim unless you have the data).
- Make plan differences scannable: list what is added at each step up rather than repeating the full feature list in every column.
- A monthly and yearly toggle must change the numbers and state the saving accurately.
- Put the answer to the obvious worry (trial, card required, cancellation) next to the button.

## Calls to action

- One primary action for the page, worded as what the visitor gets or does ("Start a free workspace"), repeated at natural decision points, always the same wording and style.
- If there is a form, ask for the minimum. An email field with a button is a commitment; label it, say what happens next, and handle the invalid and submitted states.
- Navigation on a landing page is short. Every extra link is an exit.

## Writing

- Write to one person, in the second person, in the words they use for their own problem.
- Concrete nouns and numbers over adjectives. Delete any sentence that would be equally true of a competitor.
- Short paragraphs, at most two or three lines of body text per block on a landing page. If a section needs more, it probably needs a picture or a list.
- Headings carry the argument on their own: someone who reads only the headings should still get the case.
- No hype vocabulary, no rhetorical questions as headlines, no "we believe" or mission statements where a fact should be.

## Visual rhythm

A landing page has to hold attention as someone scrolls, and it does that through contrast between sections, not decoration inside them. A page of honest, specific content set as one even column of heading, paragraph and bordered panel on one background reads as documentation, and loses to a shallower page that has shape.

- Decide the peaks: usually the opening, the strongest demonstration, the price, and the final ask. Give each a visibly different weight from what surrounds it: much larger type, a full-width treatment, a change of surface (a tinted or inverted band), or noticeably more room.
- Use contrast of scale. Somewhere on the page something should be big: the headline, a key number, the product depiction. If the largest and smallest sections differ only slightly, raise the high point rather than adding ornaments.
- Use contrast of density. Follow a dense, detailed block with an open one. Tight data next to generous space is rhythm; the same medium density everywhere is monotony.
- Use surface changes sparingly and with purpose: two or three across a page, each marking a real change in the kind of content, is plenty.
- The price and the final call to action are decision points and deserve presence. They should be among the strongest-looking parts of the page, never the plainest.
- The brand needs a presence: a wordmark with some character in its type, and one colour or device that recurs. Plain body-font text in the corner is a missing logo.
- One dominant element per screenful. If two things are the same size and weight, decide which leads.
- Put every section on the same column grid, so their edges line up down the page, then let one or two elements break it deliberately for emphasis.
- Fill the layout you chose. A two-column section whose text column ends far above its neighbour leaves a hole; rebalance the columns, add to the short side, or stack them.
- Body text stays in a readable column even when the page is wide.
- The footer is part of the design: real links, real legal lines, nothing that leads nowhere.

## Motion and performance

- A marketing page may have one composed moment, usually in the first screen, if it helps show what the product does. Everything else stays still. No scroll-triggered fade-ins on every block, no parallax, no scroll hijacking, no cursor effects.
- The page should be readable before any script runs and should not shift as fonts and images load. Set image dimensions, limit font files, and avoid heavy libraries for small effects.
- Check the page at phone width as carefully as on desktop: most first visits happen there.
