# Blind judging, iteration 1

Three separate reviewer agents, one per test case, each with a fresh context. Each saw only
screenshots of two versions labelled A and B (desktop slices at 1440px, phone sheets at 375px,
and for the habit tracker a first-run screenshot) plus the original prompt. They were not told a
skill existed, which label was which, or what either builder had been given. Source files were
withheld because the skill version carries a design-decision comment that would reveal it.

Limits worth knowing: the reviewers are the same model family as the builders, so they may share
its taste; they judged still images, so nothing interactive was exercised; and it is one run per
configuration.

| Case | A was | B was | Winner | Margin | Overall score (skill vs baseline) |
|---|---|---|---|---|---|
| saas-landing-page | with skill | baseline | with skill | narrow | 8 vs 7 |
| store-admin-dashboard | baseline | with skill | with skill | moderate | 8 vs 6 |
| habit-tracker-app | baseline | with skill | with skill | moderate | 7.5 vs 6 |

Per-criterion scores (skill / baseline):

| Case | Specificity | Content or usefulness | Hierarchy | Craft | Phone |
|---|---|---|---|---|---|
| saas-landing-page | 8 / 6 | 9 / 6 | 7 / 8 | 7 / 7 | 8 / 7 |
| store-admin-dashboard | 8 / 5 | 9 / 6 | 7 / 6 | 6 / 7 | 8 / 5 |
| habit-tracker-app | 8 / 5 | 8 / 7 | 7 / 6 | 7 / 6 | 6 / 7 |

## What the reviewers said, in their words

**Landing page.** "A shows the product working through real artefacts (a reminder log, the actual
email the client got, a status table with totals, pre-filled defaults), and every number and
weekday checks out [...] B has the stronger first impression and better section rhythm, but its
look is the stock cream-serif-bento SaaS template, and its content has an invented 'Most popular'
badge, a self-contradicting payment story and a chart with no data. A's faults are visual (flat,
monotone, loose alignment); B's are about credibility and sameness. [...] the gap is narrow
because A is plain enough that a client could reasonably call it under-designed next to B."

**Dashboard.** "B is built around what the owner must do at 4pm [...] Its dummy data holds up
under arithmetic: the 9 paid orders sum to exactly Rp 2.974.000 [...] A is the tidier and more
conventionally polished page, but it is the standard admin template (sidebar, four KPI cards with
green arrows, chart, list, table) with coffee content poured in [...] A's phone version also hides
the order status and total off-screen. The gap is moderate, not clear, because B's visual finish
is rougher than A's: wrapping, misaligned stat values, an under-sized chart and almost no brand
presence."

**Habit tracker.** "B has one real idea and builds the screen on it: consecutive done days fuse
into a single yellow bar, so a streak is a shape you see before you read anything [...] A is a
competent but familiar soft-card list where the streak is a 14px line of text with a flame emoji
[...] A wins on one thing that matters: its today tick is a 48px circle you cannot miss, while B's
is a small open ring at the far right of the row. That keeps the gap moderate, not clear."

## Would a design-literate person guess it was AI-generated?

- Baseline landing page: "Yes, with high confidence" (cream background, editorial serif with a
  coloured italic word in every headline, mono eyebrows, bento grid, three tiers with a "Most
  popular" pill, rounded call-to-action band).
- Skill landing page: "Probably not at first glance; it reads as engineer-led or strict-system work."
- Baseline dashboard: "Yes, very likely" (cream and terracotta, serif headline, four identical KPI
  cards with green arrows, soft-shadow cards, six-item sidebar).
- Skill dashboard: "Less likely; it reads more like an opinionated hand-built internal tool."
- Baseline habit tracker: "Yes" (white rounded cards on warm off-white, safe green, flame emoji).
- Skill habit tracker: "Probably not at first glance."

## Weaknesses of the skill versions that fed iteration 2

All three reviewers pointed at the same thing: the skill versions won on substance and lost
points on finish.

- Flat lower halves and no page-level hierarchy; the landing page "reads like well-set
  documentation rather than a landing page"; pricing and final sign-up were the plainest blocks.
- Columns in different sections starting at nearly but not exactly the same x.
- Awkward wraps: units stranded on a second line, one chip alone on a row, a wrapped label
  pushing a figure off its neighbours' baseline.
- The main action under-signalled (the habit tracker's "tick today" was a small ring) and
  tappable things that did not look tappable.
- The largest text on a screen spent on a date instead of the useful number.

Each became either a change to the skill's text or a new measurement in the audit script.
