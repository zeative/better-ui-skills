---
name: better-ui
description: Design and build interfaces that look like the work of a strong product designer instead of generic "AI-looking" output - for apps, mobile screens, dashboards, admin panels, landing pages, marketing sites, shops, components, forms and HTML prototypes in any stack (HTML, React, Vue, Svelte, Tailwind, Flutter mockups). Use it whenever you create, restyle, redesign or review anything a person will look at, including when the user only says "build me a page/app/site/dashboard for X" and never mentions design, and when they ask to make an existing UI better, more premium, more modern or less generic. Skip it only for work with no visible result.
license: MIT
---

# Better UI

You already know how to design well. What goes wrong is not missing knowledge but **defaults**: an underspecified brief makes you sample the average of everything you have seen, and the average looks generated. This skill is a working method that replaces defaults with decisions: a sharp brief, several directions, concrete tokens, one screen built to a finished standard, then looking at it like an art director and fixing what you see.

Work as the design lead of a studio known for interfaces that are clear, precise and unmistakably made for their product. The client has rejected proposals that felt templated.

## The method

### 1. Understand the product and the person

Before any pixels, answer in a few lines:

- **What is it and who uses it, where?** "A clinic app for government employees and their families, opened in a waiting room on a mid-range Android phone." The subject's world (its materials, vocabulary, artefacts, the way the people talk) is where distinctive choices come from.
- **The one job of this screen.** What must the person see or do in the first three seconds?
- **What already exists.** Redesigning or improving an existing product: keep its identity and everything it does (brand colour, logo, name, content, links, forms, data) and read `references/improve.md`. The old look is evidence of what the product is, not a template to polish.
- **What the user pinned.** A colour, font, reference, era or mood the user names wins over everything in this file.

### 2. Write the brief yourself

Even when the user wrote one line, write a brief of at most 150 words before designing:

- **Audience and scene** (from step 1).
- **Mood in three words**, each with its opposite so it means something: "calm, not clinical; trustworthy, not bureaucratic; quick, not busy".
- **The one memorable thing**: the single element this screen will be remembered by (the next-visit ticket, the live queue number, a photograph, a chart, a headline). Spend boldness there and keep everything around it quiet.
- **Sections in order**, each with its job.
- **The bar**: "good enough to be featured among the best apps of its category" (or "a site featured on Muzli Picks / Awwwards" for a web page).
- **Constraints**: phone width 390 first; reduced motion respected; contrast and target sizes (step 8).

### 3. Propose three directions, then choose

Write three genuinely different directions, each in four lines:

```
A. <name>: background #hex, accent #hex, ink #hex · typeface(s) · layout idea in one sentence · the memorable thing
B. ...
C. ...
```

Make them differ on more than colour: light vs dark vs tinted, a grotesk vs a humanist sans vs a serif, a big hero card vs an editorial list vs a dense dashboard. Then check each against **Defaults to avoid** below; if one is the generic answer you would give any similar brief, replace it. Choose the direction that best serves the brief and say why in one line. When the user is present and the choice is a matter of taste, show the three and let them pick.

### 4. Fix the tokens: these and nothing else

Turn the chosen direction into a compact system and use only these values everywhere:

- **Colour:** 4 to 6 named hex values with roles (canvas, surface, ink, muted ink, line, accent, plus semantic success/warning/danger). Tint the greys toward the brand hue. `scripts/palette.cjs "<brand hex>"` builds a full tonal scale from one colour when you need more steps.
- **Type:** one family for product UI (two only if clearly distinct, for a page with a display voice), loaded from Google Fonts or the product's own. A scale with clear steps (product UI: ratio 1.2 to 1.25, e.g. 12, 14, 16, 20, 24, 32; web display: larger jumps). Weights by role, tabular figures for numbers.
- **Shape:** one radius family (small for controls, larger for cards), one spacing base (4px), one or two shadow levels (soft, offset, tinted with the hue).
- **Icons:** one real icon set in one weight, chosen to fit the direction: `scripts/icons.cjs board --words "<the product's own items>"` shows sets side by side (outline, bold, duotone, filled; Healthicons for medicine); `icons.cjs sprite` inlines them. Never emoji or Unicode glyphs as icons.

Write the tokens as CSS variables at the top of the stylesheet.

### 5. One screen first, finished

Build the most important screen (the home, the main dashboard, the hero of the page) to a finished standard before touching the others. When a task has many screens, the rest are built from the same tokens and components once the first one is right, and each of them is still looked at (step 7). Fifteen screens built at once are fifteen drafts.

### 6. Build with real content

- Real copy in the product's language and voice, real-looking data that adds up across screens (if the badge says 3, the list has 3).
- Real imagery where the subject has pictures (food, places, products, people, doctors): photographs from Unsplash (`https://images.unsplash.com/photo-<id>?w=800&q=80`), consistent in light and colour. Abstract products get a meaningful visual instead (a chart, a ticket, a map, a product screenshot), never a decorative blob.
- Every interactive thing works and has its states: hover, pressed, focus-visible, disabled, loading, empty, error.
- Motion only to show what changed (150 to 250ms in product UI); on a web page, at most one orchestrated moment. Respect `prefers-reduced-motion`.

### 7. Look at it, criticise it, fix it: two or three rounds

Render and look; never judge from the code.

```bash
node <this-skill-dir>/scripts/audit.cjs index.html --widths 390,1440   # screenshots + anything broken or inaccessible
```

Open the screenshots at phone width (and desktop for web). Review them as a senior art director would, in writing:

1. **The three weakest things**, each with a specific fix in numbers or names: "the header takes 40% of the first screen: halve it", "two weights compete in the card title: drop the date to 400 and the muted ink", "the five quick actions are the same weight as the main card: make them plain icons with labels, no tiles". Not "make it pop".
2. **Did anything from Defaults to avoid creep in?** Name it and replace it.
3. **Does the memorable thing lead?** Squint: the eye should land on it first.

Fix only those, render again, repeat. Two or three rounds is normal; stop when the remaining notes are matters of taste rather than flaws.

### 8. The floor: build it in, do not announce it

- Text contrast 4.5:1 (3:1 for text 24px and up); secondary text on a coloured surface is tinted from that surface, not grey.
- Touch targets 44px (the hit area: padding or an invisible `::after` around a smaller visual is fine).
- Text inside inputs 16px on phones; no text under 11px.
- No horizontal overflow or clipped text at 360px; layouts reflow up to desktop.
- Visible keyboard focus; labels on every field; buttons named by their action.

The audit reports breaks of this floor; fix every BROKEN and ACCESSIBILITY line. Its other observations (`--all`) are hints, not rules.

### 9. Hand off

Say what you built, the direction and why, the tokens, which content is sample data, and what you did not do. Show the final screenshot.

## Modes: how bold to be

- **Product UI (apps, dashboards, admin, tools, settings): precision and restraint.** The person is doing a task; the interface should feel instantly familiar and trustworthy. Standard patterns (tab bar, top bar, lists, sheets, tables) executed exactly. One well-tuned sans carries everything. The accent marks actions, the current selection and state, not decoration. Brand lives in the details: the colour of a selected row, the shape of the main card, a precise icon set. Density is fine when people need it. The memorable thing is usually the one card or figure that answers the screen's question.
- **Persuasion (landing, marketing, pricing, events, shops): full commitment.** One bold idea carried through: a distinctive display face used decisively, real photography or a real product shot as the hero, one orchestrated motion moment, a layout that comes from the subject rather than the template (hero, three cards, testimonials, CTA).
- **Reading (docs, articles, help):** measure 60 to 75 characters, generous line height, clear hierarchy, quiet chrome.

## Defaults to avoid

These are what you produce when no decision was made. Any of them is fine when the brief asks for it; none of them is fine as a reflex. Replace each with a decision from the brief.

- **The house style:** warm cream background (~#F4F1EA) with a serif display and a terracotta or amber accent; or near-black with one acid-green or neon accent; or a broadsheet of hairline rules and zero radius.
- **The SaaS card kit:** everything chopped into identical rounded cards with the same soft grey shadow, cards inside cards, a tinted rounded-square icon tile above every heading, gradient washes as decoration.
- **Template chrome:** a tracked ALL-CAPS eyebrow above every heading; one word of the headline in the accent colour or italics ("Selamat **pagi**"); meta joined with middle dots everywhere; monospace for small labels with no reason; `→` appended to every button; numbered 01 / 02 / 03 markers on content that is not a sequence.
- **The hero-metric template:** big number, small label, three supporting stats, an accent gradient, as the answer to every dashboard.
- **Generic fonts as the voice:** Inter, Roboto, Arial or the system font as the display face of a page that should have character (in product UI a well-tuned sans, Inter included, is fine). Space Grotesk as the "creative" fallback.
- **Purple-to-blue gradients**, gradient text, glows and glassmorphism as decoration.
- **A coloured bar down one side** of a card or alert.
- **Progress rings, sparklines and badges** standing in for content; pills on everything.
- **Equal weight everywhere:** every section the same size, nothing leads.

A ban alone only moves you to the next default. Name what replaces it: "no eyebrows: the heading carries itself at 20/600", "no icon tiles: plain 22px icons in the ink colour".

## Writing in the interface

Words are part of the design. Write from the user's side in plain language ("Hasil lab", not "Modul Laboratorium"); buttons say what happens ("Simpan perubahan", not "Submit") and the same action keeps its name through the flow; errors say what went wrong and how to fix it, without apology; empty screens invite the next action. Sentence case, no filler, one job per line. `references/copy.md` has more.

## When the user gives references

If the user supplies screenshots or links to match, or asks you to find references, read `references/references.md`: it covers finding them (`scripts/refs.cjs`) and measuring and comparing against them (`scripts/match.cjs`). Use references to learn how good work of the kind is built, then make decisions for this product; do not trace someone else's screen.

## Other files

- `references/improve.md`: improving or redesigning an existing UI without breaking it.
- `references/copy.md`: interface writing.
- `references/commerce.md`, `references/public-sector.md`: what a shop or a government service page must contain (content, not looks).
- `references/references.md`: working from given references.
- `scripts/audit.cjs` (screenshots, floor checks), `scripts/icons.cjs` (icon sets), `scripts/palette.cjs` (colour scales), `scripts/refs.cjs` and `scripts/match.cjs` (references).
