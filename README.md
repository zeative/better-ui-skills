# better-ui

An agent skill that makes AI coding agents design and build interfaces at the level of popular Dribbble shots, instead of the flat, generic look people recognise as AI-made.

It is a process, a small design system, craft references and a measuring tool.

## How it works

Popular interface work on Dribbble is not exotic. It is familiar patterns executed with precision: a clean sans-serif, a light neutral canvas, white cards, one brand colour, real content, small consistent icons, and nothing out of place. AI-built interfaces miss that bar in two opposite ways: **too plain** (it reads as rendered HTML) or **too much** (an invented theme, textures and display fonts that read as a costume). The skill aims at the narrow professional middle:

1. **Check whose design it is.** In an existing product, fit into its system.
2. **Understand the job and write the real content** in plain product language.
3. **Set up the system:** one sans family, a compact type scale, a light canvas, white surfaces, one brand colour chosen for the category, one radius and shadow scale, one icon style.
4. **Use the conventional layout for the kind of screen** (native app anatomy, dashboard shell, landing page sections), with one or two designed visual moments such as a brand summary card or a product screenshot.
5. **Build it properly:** every width, every state, the accessibility floor, the finish.
6. **Render, audit, review against real products, fix.** The audit script screenshots the page and measures problems, including textures, serif display faces and oversized type. A fresh reviewer agent then asks whether it would pass as a real, professionally made product.
7. **Hand off plainly.**

## What is in the folder

```
better-ui/
├── SKILL.md                    the process
├── references/
│   ├── system.md               type, colour, brand colour by category, surfaces, radius, icons, starting tokens
│   ├── product-ui.md           mobile apps, dashboards, admin
│   ├── marketing.md            landing and pricing pages
│   ├── editorial.md            portfolios, studios, restaurants and other image-led sites
│   ├── showpiece.md            summary cards, product mocks, charts, avatars, icons in code
│   ├── polish.md               surfaces, shadows, type, colour, controls, motion
│   ├── critique.md             what the bar looks like, the two failures, the reviewer's brief
│   └── craft.md                the floor: contrast, type scale, layout, states, accessibility
├── scripts/
│   └── audit.cjs               renders a page, screenshots it, reports measured problems
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
- **Richness:** a first screen with no substantial visual, screens with nothing to look at but text, text sitting on a bare page, a pastel rainbow.
- **Craft:** textures and noise filters, a serif display face or a second text family on product UI, oversized type, clipped strings, half-empty cards, cards that nearly align, uneven phone margins, text wrapping to a stub, too many type sizes or radii.

Options: `--setup seed.js` runs a script in the page first (seed data, open a dialog), `--register showcase` drops the checks that ask for cards and shadows on image-led sites, `--dark`, `--widths`, `--json`.


## Does it work?

Every test page is built by a separate headless agent session in its own empty folder, from a one-line prompt that never mentions the skill.

**How it is tested: the line-up.** The page is presented the way Dribbble presents a design (phone screens in device frames, or a browser window), then shuffled among eight real popular shots of its category. A judge is told only that some shots may be AI-made fakes that tend to look overdesigned, ranks all nine and flags the fakes. A page passes when it is not flagged and ranks in the top half. Tools: `better-ui-workspace/tools/shot.cjs` and `lineup.py`.

This test replaced an earlier one in which AI judges scored pages against the references on a rubric that rewarded "one ownable idea". Under that rubric the skill reached 8/10 with themed concepts (a habit tracker as postal stamps, a budget as an abacus) that a human reviewer found forced and unprofessional. The line-up test agrees with that human judgement:

| Earlier build | Old rubric score | Line-up rank of 9 | Line-up verdict |
|---|---|---|---|
| Habit tracker, postal theme | 8 | 8th | likely fake: "costume, not function" |
| Finance app, abacus theme | 7 | 8th | likely fake: "a theme forced onto every element" |
| Habit tracker, no skill | 4 | 8th | likely fake: "looks like rendered HTML or a template" |

Results for the current method are recorded in `better-ui-workspace/dribbble-bar.md` as they come in.

### Limits

- **The judges are AI models, not designers.** The line-up was checked against one person's judgement on three pages.
- **It is slower and costs more** than building without it: several minutes of rendering and review per page.
- **Proof on marketing pages is placeholder.** Testimonials, logos and statistics use fictional names and must be replaced before publishing.
- **Only single-file HTML was tested.** Work inside an existing codebase was not evaluated.

### Where the evidence is

- `better-ui-workspace/dribbble-bar.md`: every method tried, every score, what each round taught.
- `better-ui-workspace/iteration-N/<case>/`: each page and its screenshots.
- `better-ui-workspace/tools/`: the scripts that ran, collected, presented and judged the sessions.

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
