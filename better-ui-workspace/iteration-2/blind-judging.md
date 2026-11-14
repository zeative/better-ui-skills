# Blind judging, iteration 2

Same method as iteration 1, with three new reviewer agents and the A/B labels re-randomised.
The baseline pages are the same files as in iteration 1; the skill pages are fresh runs with the
revised skill. Same limits apply: reviewers share a model family with the builders, judged still
images only, and it is one run per configuration.

| Case | A was | B was | Winner | Margin | Overall score (skill vs baseline) | Iteration 1 |
|---|---|---|---|---|---|---|
| saas-landing-page | baseline | with skill | with skill | moderate | 8 vs 7 | narrow, 8 vs 7 |
| store-admin-dashboard | with skill | baseline | with skill | moderate | 8 vs 6 | moderate, 8 vs 6 |
| habit-tracker-app | with skill | baseline | with skill | moderate | 7 vs 6 | moderate, 7.5 vs 6 |

Per-criterion scores (skill / baseline):

| Case | Specificity | Content or usefulness | Hierarchy | Craft | Phone |
|---|---|---|---|---|---|
| saas-landing-page | 8 / 6 | 9 / 6 | 7 / 7 | 7 / 7 | 8 / 6 |
| store-admin-dashboard | 8 / 5 | 9 / 5 | 7 / 6 | 7 / 7 | 8 / 5 |
| habit-tracker-app | 7 / 5 | 8 / 7 | 6 / 7 | 7 / 6 | 7 / 6 |

## What the reviewers said, in their words

**Landing page.** "B shows the product doing its job: a real reminder email, a dated follow-up
timeline, and a ledger whose figures add up [...] A is the warmer and more immediately attractive
page, with a well-staged hero, but past the hero it falls back on a familiar kit (bento cards,
three tiers with a 'Most popular' badge, monthly/yearly toggle) and several of its illustrations
carry no information. [...] B's weakness is tonal monotony; it is disciplined rather than
delightful, which is why the gap is moderate and not clear. A design-literate client would
probably pick A on a five-second glance and B after reading."

**Dashboard.** "A is built around what the owner does in the afternoon: a 'Perlu dikerjakan'
block [...] order filters with counts, and a per-row 'Tandai dikemas' action. B is the standard
admin skeleton (sidebar, four KPI cards, chart, ranked list, table) in a warm cream skin; it is
tidy but only displays [...] The gap is not larger because A is visually austere, with an
oversized heavy chart and a few craft slips, while B's desktop looks more 'finished' at first
glance."

**Habit tracker.** "A is built around the thing the user asked to see: the streak count is the
largest element in each row [...] and the week is drawn as a linked chain whose last link is
today's tick button. B is a competent but familiar card list [...] B wins on one important point:
it is more obvious what to tap and which habits are still pending. The gap is moderate, not clear,
because A's saturated blue slabs flatten its own hierarchy and its pending action is the quietest
thing in the row."

## Would a design-literate person guess it was AI-generated?

- Baseline landing page: "Yes, very likely." Skill: "Possibly, but less obviously; it could pass
  for a small in-house team's work."
- Baseline dashboard: "Yes, likely [...] the current default 'warm, tasteful dashboard'
  composition." Skill: "Probably not at first glance [...] not a recognisable template."
- Baseline habit tracker: "Yes, likely [...] the median habit-tracker layout." Skill: "Probably
  not at first glance [...] 'developer with framework defaults' or 'possibly AI, restrained'."

## What this does and does not show

Across both rounds the skill version was preferred in six of six blind comparisons, always by a
narrow or moderate margin and never a clear one. The advantage is consistent and comes from the
same places each time: content that is specific and reconciles, layouts built around the user's
actual task, honest handling of proof and partial data, and phone layouts that are redesigned
rather than narrowed.

The reviewers were equally consistent about where the skill versions are still weak. They are
austere. Two of three reviewers in this round said the baseline looks more attractive or more
finished at first glance, and the skill versions were described as "disciplined rather than
delightful". Iteration 2 reduced this (the landing page gained a dark sign-up band, a figures
section and a shared grid, and its margin went from narrow to moderate) but did not remove it.

One defect was found by measurement, not by the reviewers: the iteration 2 dashboard overflows
horizontally by 140px at 375px wide, because of a visually hidden data table. The audit script
missed it at build time: under phone emulation an overflowing page widens the browser's layout
viewport, and the script compared against that instead of the width it had asked for. The script
is fixed and every run in both iterations was regraded with the fixed version.
