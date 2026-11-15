# Against the Dribbble bar

From iteration 3 on, the target is no longer "better than no skill" but parity with popular
Dribbble shots in the same category.

## How it is judged

For each test case, eight shots were taken from the first page of Dribbble's search results for
that category (for example "saas landing page", "ecommerce admin dashboard", "habit tracker
app"). They are used as a reference set for reviewers only and are not stored in this repository.

A fresh reviewer agent per case reads the eight references, then the candidate screenshots
(desktop slices at 1440px and phone sheets at 375px), and gives a parity score:

- 10: would be one of the best shots in the reference set
- 8-9: belongs in the set; a Dribbble audience would not notice a quality gap
- 6-7: close, but a trained eye sees it is a notch below
- 4-5: clearly a level below: competent but plain, generic or under-designed
- 1-3: far below

It also scores art direction, richness, depth and polish, colour, typography and composition,
and lists the six most damaging gaps. Each round includes an earlier candidate as an anchor.

The pass mark is 8 on every case.

Limits: the reviewers are AI models, not designers; scores move by about a point between
reviewers for the same page (the no-skill baseline was scored 6 and 5 on the landing page, 5 and
4 on the dashboard); one run per configuration; reviewers see still images, so interaction is
not judged.

## Scores so far

Training prompts (used while designing the skill):

| Method | Landing page | Dashboard | Habit tracker |
|---|---|---|---|
| No skill (baseline) | 5-6 | 4-5 | 4 |
| Skill v2: restraint, measured craft | 4 | 3 | 4 |
| Method B: finish library, showpiece, polish, critique loop | 7 | 7 | 7 |
| Method B.1: illustrated objects and portraits, colour discipline, finishing pass | 7 | **8** (8 again from two later reviewers) | 7 (6 from a second reviewer) |
| Method B.2: the finish a reviewer marks down is measured by the audit | **8** (8 again from a later reviewer) | 7 | 7 |
| Method C: one ownable idea first, required independent review | **8** (art direction 9) | **8** (art direction 9) | **8** (art direction 9) |

Held-out prompts (never used while designing the skill when first run):

| Prompt | Method | Score | Reviewer's summary |
|---|---|---|---|
| POS landing page (Indonesian) | B.2 | **8** (art direction 9) | "would pass [...] on the strength of its warung-specific identity" |
| Dental clinic dashboard (Indonesian) | C.1 | **8** (art direction 9) | "the dental-arch appointment hero [...] more distinctive than most of the set" |
| Personal finance app | B.2 | 7, later 6 | "a generic pastel fintech dashboard template with no ownable visual idea" |
| Personal finance app | C (abacus) | 7, 8, 7.5 from three reviewers | "the abacus concept is as distinctive as the best references" |
| Personal finance app | C.1 (till receipt) | 7 | "dense, evenly weighted three-column layout with flat hard-shadow cards" |
| Personal finance app | C.2 (banknote), four review rounds | 7 | "the idea is confined to the top two cards and the rest is a plain white dashboard" |
| Workout tracker app | C.1 | 7 (art direction 8) | "a stronger concept than most of the set", but "a dark, nearly colourless empty state" |
| Photographer portfolio | C | 7, later 6 | "built from SaaS landing-page components rather than a photo-led editorial layout" |
| Photographer portfolio | C.1, showcase register | 7 (typography 9) | "would nearly pass [...] illustrated stand-ins replace the real photography" |

By kind of screen: landing pages and dashboards reach 8 on both training and held-out prompts.
Personal, mobile-first apps sit at 7 to 8 (the training habit tracker at 8, two held-out apps at
7 to 8). Image-led sites stop at 7 for want of real photographs.

No candidate has scored 9 or 10. Reviewers name one gap that code alone does not close: the
references use real product photography and real faces, and these pages use vector illustration.

## What each round taught

**Skill v2 scored below the baseline.** It asked for restraint and removed decoration, which
produced honest, useful pages that reviewers called a wireframe or a printed report next to the
references: no app shell, no imagery, no depth. Against this bar the method was wrong, so it was
replaced rather than adjusted.

**Method B** made the largest single jump, three to four points per case. The mechanisms: a
complete direction with tokens (so palette, type, shape and atmosphere arrive together), a
showpiece built in detail before anything else, content on surfaces in a shell, and a critique
rubric with a floor of two rounds. Reviewers' remaining complaints were generic thumbnails
and initials for avatars, a rainbow of category colours, same-weight secondary cards, floating
cards hiding the mock's data, pages in one tone from top to bottom, and small finishing faults.

**Method B.1** added illustrated portraits and dimensional objects, one dominant accent with a
counter-accent, and a finishing checklist. The dashboard reached 8 ("would pass as a popular
Dribbble shot in this category on desktop"), with art direction scored 9. The landing page and
the habit tracker stayed at 7: their art direction, colour and typography were scored 7 to 8, and
what held them back was finish (a paper invoice covering the table's client names, half-empty
bento tiles, pricing cards a few pixels out of line, clipped day pills, a title wrapping to three
lines) and, on the habit tracker, a lead gradient straight from the library.

**Method B.2** turns each recurring finishing complaint into something the audit script
measures, so it is found before a reviewer sees it: text covered by another element, content
under fixed bars, half-empty cards, cards that nearly align, single-blur shadows, a hero visual
that is too small, clipped strings, words that run together, uneven phone margins, repeated
graphics, and a page held in one tone. Both landing pages reached 8, including the held-out one
on its first attempt ("would pass as a popular Dribbble shot in this category, on the strength of
its warung-specific identity"). The dashboard run scored 7 this time because that build fell
back to initials for avatars and one bag glyph recoloured for every product, which the audit did
not yet measure. The two app-type screens stayed at 7.

At 7, the reviewers' complaint about the app screens was no longer finish. It was the same four
things each time: no single ownable visual idea, cards of equal weight, a pastel rainbow, and
timid type. The dashboard that scored 8 to 9 on art direction got there because its identity
came out of its subject (roast stamps, kraft bags), not out of the library.

**Method C** rebuilds the art-direction step around that: find one concept in the
product's own world, make it the hero device at large scale carrying real content, echo it in the
details, commit the palette to a base, one dominant colour and one hot accent, and give the type
dramatic scale. The library is demoted to finish kits whose colours are placeholders. An
independent reviewer becomes a required step. The audit additionally measures initials avatars,
recoloured repeated drawings, timid type scale, equal-weight cards, rainbow fills and a first
screen with no confident field of colour.

All three training prompts reached 8 with art direction scored 9: "the yellow-and-black
chain-link identity is distinctive and consistently executed" (habit tracker), "the huge serif
total, bean target meter and canister bars give it a stronger identity than most of the set"
(dashboard), "a distinctive ledger-paper identity and unusually rich product vignettes" (landing
page). The earlier builds of the same prompts were marked down by the same reviewers as "a
generic blue-gradient SaaS art direction with no signature visual idea".

The two held-out prompts run under Method C scored 7. The finance app's reviewer wrote that "the
abacus concept is as distinctive as the best references" and that it was held back by dashboard
density, emoji-style icons in a different visual language from the beads and wood, and an
under-finished balance card. The photographer portfolio "has a real concept (contact sheet, film
rebate, grease pencil)" but contains no photographs and is built from product-landing components
where the references are photo-led and almost free of interface.

**Method C.1** (running) responds to both: objects, icons and secondary surfaces must be drawn in
the idea's own material and line; one shadow language per design; personal apps keep one focal
object with few modules; and a showcase register (`references/editorial.md`) covers image-led
sites, with the audit's surface and card checks switched off for it.

**After C.1.** The clinic dashboard, a new prompt, scored 8 on its first attempt. The showcase
register lifted the portfolio's structure (typography scored 9) but not its score, because the
pictures are still drawn. A look at the build transcripts showed that the in-skill reviewers are
well calibrated (second-round overall scores of 6.5 to 7.5, matching the external reviewers) and
that builders were stopping at the two-round minimum regardless.

**Method C.2** requires review rounds to continue until a fresh reviewer gives 8 overall. The
first build under it ran four rounds (7, 7, 7, 7.5) and scored 7 externally: more rounds alone
did not move it, because each round patched details while the lower half of the page stayed a
stock list and donut.

**Method C.3** (running) therefore requires the idea to reach every module, forbids stock
modules in personal apps, and names supplied or generated imagery as the way to close the gap to
photographic references.


**Method C.4** adds a figure or scene illustration to consumer apps, lets two or three accents
fill whole surfaces, and caps review at three rounds, the third a rebuild. Its first workout
build scored 6.

**Phone-first judging.** The app references are phone screens, while the candidates had been
shown mostly as 1440px desktop slices with small phone sheets. The app cases were re-judged with
the phone at 2x as the primary design (`tools/phonehd.cjs`, `judge_prompt.py --phone-first`).
From this point the judges, and the builders, run on a different model than before, because of
a usage limit; earlier and later scores are not strictly comparable.

| Case | Build | Phone-first parity |
|---|---|---|
| Habit tracker | C (Unbroken, chain links) | 7 |
| Habit tracker | C.4 (Daymark, postmark stamp card), cut off mid-review | **8** (art direction 9, typography 8) |
| Finance app | B.2 | 6 |
| Finance app | C.2 banknote | 7 |
| Finance app | C.3 abacus, cut off mid-review | 7 (richness 8, depth 8) |
| Workout app | C.2 Loaded | 7 |
| Workout app | C.4 | 6 |

The phone view did not lift app scores across the board, so the gap is in the design, not the
capture. The three judges described one fault from two sides: the idea stops after the hero
(banknote: "everything below falls back to generic white list cards and a stock donut"), or it is
repeated without relief (abacus: "six identical category rods, a days rod, a money rod and a bead
timeline"; workout: "the exercise list repeats one template six times"). The references show one
hero with one clean number, then two or three modules of different shapes, with the motif carried
as material rather than as copies of the object, inactive items collapsed to slim rows, and the
accent kept for one meaning.

**Method C.5** (running) writes that down: step 4 becomes "carry it as a language, not a copy",
two new failure modes ("the idea repeated without relief", "one colour meaning everything"), and
product-ui gains screen rhythm, collapsed lists and a different ink per item.

## Reset: Method D (professional, natural)

The user looked at the Method C outputs and judged them overdone and strange: forced, unnatural,
unprofessional, not like Dribbble. The AI judges had scored the same pages 7 to 8 because their
rubric rewarded "one ownable idea".

**A new test that agrees with the user: the line-up.** Each build is presented the way a Dribbble
shot presents a design (phone screens in device frames on a soft backdrop, or a browser window),
shuffled among the eight real reference shots for its category, and shown to a judge who is told
only that some shots may be AI-made fakes that tend to look overdesigned. The judge ranks all
nine and flags fakes. Pass: not flagged, ranked in the top half. (`tools/shot.cjs`,
`tools/lineup.py`)

Calibration on earlier builds:

| Build | Rank of 9 | Verdict |
|---|---|---|
| Habit C.4 "Daymark" (old judge: 8) | 8th | likely fake: "the postal metaphor is costume, not function" |
| Finance C.3 abacus (old judge: 7) | 8th | likely fake: "an invented abacus theme forced onto every element" |
| Habit, no skill | 8th | likely fake: "looks like rendered HTML or a template" |

The test catches both failures, overdesign and underdesign, the way the user does. Looking at the
references again with that in mind, they are conventional: one sans-serif, a light grey canvas,
white cards, one brand colour, standard anatomy (header, summary card, rows with icon chips, tab
bar; sidebar, KPI row, chart, tables; nav, centred hero, product screenshot, logo strip), real
content, and nothing themed.

**Method D** rewrites the skill around that: set up a strict system (`references/system.md`), use
the conventional layout for the kind of screen, add one or two designed visual moments (a brand
summary card, a product screenshot), write plain product copy, and review against "would this
pass as a real product". The finish-kit library and the dealer are removed; the illustrated
objects and figure guidance are gone; the audit drops the checks that pushed toward decoration
and adds checks for textures, serif display faces, extra font families and oversized type.
