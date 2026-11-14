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

| Method | Landing page | Dashboard | Habit tracker |
|---|---|---|---|
| No skill (baseline) | 5-6 | 4-5 | 4 |
| Skill v2: restraint, measured craft | 4 | 3 | 4 |
| Method B: art direction library, showpiece, polish, critique loop | 7 | 7 | 7 |
| Method B.1: illustrated objects and portraits, colour discipline, finishing pass | 7 | **8** | 7 |

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

**Method B.2** (running) turns each recurring finishing complaint into something the audit
script measures, so it is found before a reviewer sees it: text covered by another element,
content under fixed bars, half-empty cards, cards that nearly align, single-blur shadows, a hero
visual that is too small, clipped strings, words that run together, uneven phone margins,
repeated graphics, and a page held in one tone. Palettes must be derived from the product's own
name and world.
