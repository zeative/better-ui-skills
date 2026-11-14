# better-ui

An agent skill that makes AI coding agents build interfaces that are specific to the product, restrained, and finished, instead of the generic look people now recognise as AI-made.

It is a process plus a measuring tool, not a style. It does not tell the agent which fonts or colours to use.

## Why it works this way

Research into what developers and designers say about AI-generated UI (sources at the end) kept returning to four points:

1. **Generic output comes from nobody deciding.** At every choice the most common answer is the easiest to produce, and a page made of most-common answers looks like every other page.
2. **Banning a look only moves the problem.** Tell a model to avoid the purple gradient and it lands on the next most common look: cream background, serif headline with one italic word, earthy accent. The baseline runs in this repo show exactly that, on three unrelated products.
3. **A model cannot see what it built.** Layout problems are invisible in source code. It has to render the page and look.
4. **A model reviewing its own work shares its own blind spots.** Measurements do not.

So the skill has the agent:

1. Check whether a design already exists, and fit into it if so.
2. Write down who the screen is for and the one job it has.
3. Write the real content and data before any layout, with no invented proof.
4. Choose a direction on purpose: name its default, collect material from the product's own world, draft three different directions, pick one, and test whether the result would fit a different product just as well.
5. Build from a small set of tokens, with every state, every width, and keyboard access.
6. Render the page, run the audit script, read the screenshots in a fixed order, fix, and repeat.
7. Hand off plainly, stating assumptions and anything that is mocked.

## What is in the folder

```
better-ui/
├── SKILL.md                  the process (about 140 lines)
├── references/
│   ├── direction.md          how to arrive at a design that belongs to its product
│   ├── craft.md              numeric rules for type, colour, spacing, states, motion, accessibility
│   ├── product-ui.md         apps, dashboards, tables, forms, charts
│   └── marketing.md          landing and pricing pages
├── scripts/
│   └── audit.cjs             renders a page, screenshots it, reports measured problems
└── evals/                    the three test cases used below
```

## Install

Copy the `better-ui` folder into a skills directory:

```bash
cp -r better-ui ~/.claude/skills/
```

or, for one project only:

```bash
mkdir -p .claude/skills && cp -r better-ui .claude/skills/
```

The agent picks it up on its own when a request involves building or restyling something visible. You can also ask for it by name.

## The audit script

```bash
node better-ui/scripts/audit.cjs path/to/index.html --out .ui-audit
```

It needs Node and a Chromium that Playwright or Puppeteer can drive. Without one it says so and exits, and the skill falls back to a manual checklist.

It renders at 375, 768 and 1440px, saves screenshots, and prints:

- **An inventory** of every font size, family, weight, colour, radius and shadow actually in use.
- **Broken:** horizontal overflow, console errors, failed requests, broken images, missing viewport tag.
- **Accessibility:** text below WCAG AA contrast, controls with no visible keyboard focus, unlabelled fields, unnamed buttons, tap targets that are too small, heading order.
- **Craft:** too many font sizes or radii, lines too long to read, columns in different sections that nearly align, values in a row that sit at different heights, text that wraps leaving a stub, a lone item on a wrapped row.
- **Reflexes:** gradient text, backdrop blur, emoji as icons, an indigo-to-violet accent, and similar defaults that usually arrive without being chosen. These are reported as questions, not errors.

Useful options: `--setup seed.js` runs a script in the page first (to seed data or open a dialog), `--dark` renders the dark scheme, `--widths 320,1024` changes the widths, `--json` prints raw measurements.

## Does it work?

Three prompts were each built twice by separate headless agent sessions, each in its own empty folder with no knowledge of this project. The prompts and tool permissions were identical. The only difference was whether the skill was installed in that session's folder. Nothing in the prompt mentioned the skill; in every skill session the agent chose to load it as its first action.

The prompts:

- *"Build a landing page for Ledgerly, an invoicing tool for freelancers…"*
- *"Bikin halaman dashboard admin untuk toko online kecil yang jualan biji kopi…"*
- *"make me a habit tracker web app…"*

Results were then judged two ways.

**Blind review.** A separate reviewer agent per case saw only screenshots labelled A and B and the original prompt. Labels were randomised and re-randomised between rounds.

| Case | Round 1 (skill v1) | Round 2 (skill v2) |
|---|---|---|
| Landing page | skill, narrow (8 vs 7) | skill, moderate (8 vs 7) |
| Store dashboard | skill, moderate (8 vs 6) | skill, moderate (8 vs 6) |
| Habit tracker | skill, moderate (7.5 vs 6) | skill, moderate (7 vs 6) |

**Measured checks.** Nine assertions computed by the audit script (overflow, contrast, type scale, radii, keyboard focus, tap targets, document basics, labels, runtime errors).

| | With skill | Without |
|---|---|---|
| Iteration 1 | 27 of 27 | 18 of 27 |
| Iteration 2 | 24 of 27 | 18 of 27 |

**Cost.** Skill runs took about twice as long (around 4.5 minutes against 2.5) and cost about 1.6 times as much per page.

### What the reviewers credited

- Content that is specific and adds up. The skill landing page shows the actual reminder email and a ledger whose totals reconcile; the baseline has an invented "Most popular" badge and an unlabelled chart.
- Layouts built around the task. The skill dashboard opens with what needs doing before the courier arrives; the baseline opens with four equal stat cards and a sidebar of links that go nowhere.
- A real idea where one fits. In the skill habit tracker, consecutive days join into one bar, so a streak is a shape you see before you read a number.
- Phone layouts that are redesigned. The baseline dashboard's order table is cut off at phone width with status and total off screen.
- Every baseline page was called likely AI-generated on sight. The skill pages mostly were not.

### What it does not fix

Stated plainly, because it matters for whether this skill suits you:

- **The skill pages are austere.** Reviewers called them "disciplined rather than delightful". Two of three in round 2 said the baseline looks more attractive or more finished at a five-second glance, and that the skill version wins once you read it. If first-glance appeal is what you need most, this skill does not yet deliver it.
- **Margins were never large.** Six of six blind comparisons went to the skill, none by a clear margin.
- **The evidence is thin.** One run per configuration, three prompts, and reviewers from the same model family as the builders, who may share its taste. No human designer has judged these yet.
- **The measured checks favour the skill by construction**, since the skill ships the script that computes them.
- **Bugs still get through.** The iteration 2 dashboard overflows by 140px on a phone. The audit script missed it because of a measurement bug, which is now fixed; whether the fixed script leads the agent to catch such cases has not been re-tested.
- **Only single-file HTML was tested.** Work inside an existing codebase with its own design system, which the skill has instructions for, was not evaluated.

Full details, including every reviewer's reasoning and each page's weaknesses, are in `better-ui-workspace/`:

- `iteration-1/blind-judging.md` and `iteration-2/blind-judging.md`
- `iteration-N/review.html`: open in a browser to see all outputs side by side with the measured grades
- `iteration-N/<case>/<with_skill|without_skill>/outputs/`: the pages themselves and their screenshots
- `tools/`: the scripts that ran and graded the sessions

## Sources

Community descriptions of the problem:

- Adrian Krebs, [design slop analysis of 1,590 Show HN pages](https://www.adriankrebs.ch/blog/design-slop/) and [ai-design-checker](https://github.com/AdrianKrebs/ai-design-checker)
- Kosta Canatselis, [Spot the slop: a UI designer's guide to fixing AI defaults](https://world.hey.com/kostac/spot-the-slop-a-ui-designer-s-guide-to-fixing-ai-defaults-4c448c9c)
- The Fountain Institute, [signs of a vibe-coded UI](https://www.thefountaininstitute.com/blog/signs-vibe-coded-ui)
- codemyspec, [why vibe-coded websites look the same](https://codemyspec.com/blog/vibe-coded-websites-look-the-same)
- prg.sh, [Why your AI keeps building the same purple gradient website](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)
- Aaron Ross, [The eyes have it: closing the agentic design loop](https://dev.to/ashmortar/the-eyes-have-it-closing-the-agentic-design-loop-3819)
- Hacker News threads [47864393](https://news.ycombinator.com/item?id=47864393), [49290499](https://news.ycombinator.com/item?id=49290499), [49867038](https://news.ycombinator.com/item?id=49867038)

Existing skills and guidelines this one learned from:

- Anthropic, [frontend-design skill](https://github.com/anthropics/skills/tree/main/skills/frontend-design) and [Improving frontend design through Skills](https://claude.com/resources/articles/improving-frontend-design-through-skills)
- Paul Bakaus, [Impeccable](https://github.com/pbakaus/impeccable)
- Vercel, [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines)
- Emil Kowalski, [design engineering skill](https://github.com/emilkowalski/skills)
- Jakub Krehel, [make-interfaces-feel-better](https://github.com/jakubkrehel/make-interfaces-feel-better)
- [taste-skill](https://github.com/Leonxlnx/taste-skill) and [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
- Matthew Butterick, [Practical Typography: summary of key rules](https://practicaltypography.com/summary-of-key-rules.html)
- Evil Martians, [OKLCH in CSS](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)

What this skill does that those mostly do not: it treats extending an existing product as the first case, covers dense product UI as well as landing pages, gives a fixed order for looking at a rendered page, and ships a measuring script that needs nothing beyond a browser the agent probably already has.
