# better-ui

An agent skill that makes AI coding agents design and build interfaces at the level of popular Dribbble shots, instead of the flat, generic look people recognise as AI-made.

It is a process, a set of craft references and a measuring tool. It does not hand the agent a style.

## How it works

A great shot and generic AI output often use the same ingredients: cards, gradients, rounded corners, a product screenshot. What separates them is one ownable idea and the depth of its execution. The skill forces both:

1. **Check whose design it is.** In an existing product, fit into its system.
2. **Understand the job, write the real content.** The register (product page, app, showcase site, reading) decides what "rich" means.
3. **Find one idea and commit to it.** A motif from the product's own world, made the hero of the screen at large scale and carrying real content, echoed in three details, with a committed palette (neutral base, one dominant colour, one hot accent) and dramatic type scale. A finish kit is then dealt from a library by script, and its placeholder colours are replaced.
4. **Build the showpiece first**, in real detail: a product mock with believable content, floating detail cards, atmosphere, charts, distinct illustrated objects and portraits.
5. **Build with depth and finish:** content on surfaces, layered shadows, variety within sets, every width and state.
6. **Render, measure, get an independent review, fix.** The audit script screenshots the page and reports what a demanding reviewer would mark down. A second agent that did not build the page then scores the screenshots against a rubric. At least two rounds.
7. **Hand off plainly:** the idea, the assumptions, what is placeholder.

## What is in the folder

```
better-ui/
├── SKILL.md                    the process
├── references/
│   ├── art-directions.md       twelve finish kits with tokens, and how to tune them
│   ├── showpiece.md            building product mocks, charts, objects, portraits, atmospheres in code
│   ├── polish.md               surfaces, shadows, type, colour, controls, motion
│   ├── critique.md             what the bar looks like per category, the rubric, the reviewer's brief
│   ├── marketing.md            landing and pricing pages
│   ├── product-ui.md           dashboards, admin, apps, mobile-first tools
│   ├── editorial.md            portfolios, studios, restaurants and other image-led sites
│   └── craft.md                the floor: contrast, type scale, layout, states, accessibility
├── scripts/
│   ├── audit.cjs               renders a page, screenshots it, reports measured problems
│   └── deal.cjs                deals one finish kit from a shortlist
└── evals/                      three test cases
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

A packaged copy is in `dist/better-ui.skill`. The agent picks the skill up on its own when a request involves building or restyling something visible.

## The audit script

```bash
node better-ui/scripts/audit.cjs path/to/index.html --out .ui-audit
```

It needs Node and a Chromium that Playwright or Puppeteer can drive. It renders at 375, 768 and 1440px, saves screenshots cut into parts that stay legible (plus a whole-page thumbnail), and prints an inventory and a list of measured problems:

- **Broken:** horizontal overflow, console errors, failed requests, text covered by another element, content hidden under fixed bars, words that run together.
- **Accessibility:** text below WCAG AA contrast, no visible keyboard focus, unlabelled fields, unnamed buttons, small targets, heading order.
- **Richness:** a first screen with no substantial visual, screens with nothing to look at but text, text sitting on a bare page, one drawing recoloured for every item, people shown as initials, flat single-blur shadows, a small hero visual, a page held in one tone, timid type scale, cards of equal weight, a pastel rainbow, no confident field of colour.
- **Craft:** clipped strings, half-empty cards, cards that nearly align, uneven phone margins, columns that nearly align, values at different heights in a row, text wrapping to a stub, too many type sizes or radii.

Options: `--setup seed.js` runs a script in the page first (seed data, open a dialog), `--register showcase` drops the checks that ask for cards and shadows on image-led sites, `--dark`, `--widths`, `--json`.

Each check exists because a reviewer marked real output down for that fault.

## Does it work?

Every test page was built by a separate headless agent session in its own empty folder, from a one-line prompt that never mentions the skill. In each session the agent chose to load the skill itself.

Pages are judged against real Dribbble shots: eight from the first page of results for the category, read by a fresh reviewer agent together with the candidate's screenshots. A parity score of 8 means a Dribbble audience would not notice a quality gap; that is the pass mark.

| Method | Landing page | Dashboard | Habit tracker |
|---|---|---|---|
| No skill | 5-6 | 4-5 | 4 |
| First version of the skill: restraint and measured craft | 4 | 3 | 4 |
| Method B: finish library, showpiece, polish | 7 | 7 | 7 |
| Method B with measured finish | 8 | 7-8 | 7 |
| Method C, the current skill: one ownable idea first | **8** | **8** | **8** |

Prompts never used while designing the skill, first attempt each: a POS landing page in Indonesian scored **8**, a personal finance app 7, a photographer's portfolio 7.

The history of what failed and why is in `better-ui-workspace/dribbble-bar.md`. The short version:

- The first version asked for restraint. Against the Dribbble bar it scored below no skill at all: honest, useful pages that reviewers called a wireframe next to the references.
- A library of directions plus a detailed showpiece moved everything to 7. Turning each recurring finishing complaint into a measurement moved landing pages to 8.
- What kept app screens at 7 was not finish but the lack of a single ownable idea. Rebuilding the art-direction step around a concept from the product's own world moved all three training prompts to 8, with art direction scored 9.

### What it does not do

- **Nothing has scored 9 or 10.** Reviewers name one gap code does not close: the references use real product photography and real faces, and these pages use vector illustration.
- **Two kinds of screen are still at 7:** personal mobile-first apps and sites whose product is photography. Changes for both are in the skill; their effect is still being tested.
- **The judges are AI models, not designers.** The same page moves about a point between reviewers. No human designer has scored these.
- **One run per configuration.** Results vary from run to run with the same skill.
- **It is slower and costs more:** 10 to 30 minutes and roughly 4 to 12 dollars per page, against 2 to 3 minutes and about 1.3 dollars without the skill.
- **Proof on marketing pages is placeholder.** The skill designs testimonial, logo and statistic sections with fictional names and tells the user to replace them; they must not be published as they are.
- **Only single-file HTML was tested.** Work inside an existing codebase with its own design system, which the skill has instructions for, was not evaluated.

### Where the evidence is

- `better-ui-workspace/dribbble-bar.md`: the judging method, every score, what each round taught.
- `better-ui-workspace/iteration-N/<case>/with_skill/outputs/`: each page and its screenshots. Iterations 1 and 2 are the first version of the skill (with `blind-judging.md` and `review.html`), 3 to 5 are Method B, 6 onward Method C.
- `better-ui-workspace/tools/`: the scripts that ran, collected and graded the sessions.

## Sources

Community descriptions of the problem:

- Adrian Krebs, [design slop analysis of 1,590 Show HN pages](https://www.adriankrebs.ch/blog/design-slop/) and [ai-design-checker](https://github.com/AdrianKrebs/ai-design-checker)
- Kosta Canatselis, [Spot the slop: a UI designer's guide to fixing AI defaults](https://world.hey.com/kostac/spot-the-slop-a-ui-designer-s-guide-to-fixing-ai-defaults-4c448c9c)
- The Fountain Institute, [signs of a vibe-coded UI](https://www.thefountaininstitute.com/blog/signs-vibe-coded-ui)
- codemyspec, [why vibe-coded websites look the same](https://codemyspec.com/blog/vibe-coded-websites-look-the-same)
- Aaron Ross, [The eyes have it: closing the agentic design loop](https://dev.to/ashmortar/the-eyes-have-it-closing-the-agentic-design-loop-3819)
- Hacker News threads [47864393](https://news.ycombinator.com/item?id=47864393), [49290499](https://news.ycombinator.com/item?id=49290499), [49867038](https://news.ycombinator.com/item?id=49867038)

Existing skills and writing this one learned from:

- Anthropic, [frontend-design skill](https://github.com/anthropics/skills/tree/main/skills/frontend-design), [Improving frontend design through Skills](https://claude.com/resources/articles/improving-frontend-design-through-skills) and [Harness design for long-running apps](https://www.anthropic.com/engineering/harness-design-long-running-apps)
- Paul Bakaus, [Impeccable](https://github.com/pbakaus/impeccable)
- [taste-skill](https://github.com/Leonxlnx/taste-skill) and [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
- Vercel, [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines)
- Emil Kowalski, [design engineering skill](https://github.com/emilkowalski/skills); Jakub Krehel, [make-interfaces-feel-better](https://github.com/jakubkrehel/make-interfaces-feel-better)
- Matthew Butterick, [Practical Typography](https://practicaltypography.com/summary-of-key-rules.html); Evil Martians, [OKLCH in CSS](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)

The reference shots used for judging came from Dribbble search results and are not stored in this repository.
