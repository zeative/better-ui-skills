# Design kits: one coherent decision instead of ten loose ones

Pages look "off" when type, colour, radius, shadow and shape are each chosen separately: an editorial serif with pill buttons, soft shadows with hairline-sharp cards, a bright green button on a muted heritage palette. Each choice is defensible; together they do not speak one language. Professional teams avoid this by working inside one system where those decisions were made together.

A **kit** is that system: fonts, palette, radius, shadow, borders, buttons, inputs, links and the type scale, already tuned to each other. The files are in `assets/kits/`. Each was rendered and checked as a whole.

| Kit | Character | Fits | Shape and depth |
|:---|:---|:---|:---|
| `precision` | sharp, monochrome, technical | SaaS, developer tools, B2B, AI, docs, dashboards | radius 6/8/12, hairlines, almost no shadow, Geist |
| `precision-dark` | near-black, quiet, one luminous accent | developer tools, AI, productivity, crypto, music | radius 8/12, 8% white hairlines, top highlights, a glow, Inter |
| `editorial` | a magazine on warm paper | hotels, villas, restaurants, architecture, culture, beauty, portfolios, heritage cities | radius 0–2, warm hairlines, no shadow, Newsreader serif at 400 with Inter |
| `swiss` | grid, rules, numbers, one signal colour | hardware, studios, conferences, data and transparency pages | radius 0, black rules, no shadow, Inter Tight with JetBrains Mono |
| `soft` | friendly, rounded, tactile | consumer apps, food delivery, wellness, habits, education, personal finance | radius 12/20/28, soft tinted shadows, pill buttons, Plus Jakarta Sans |
| `civic` | plain, trustworthy, accessible | government, agencies, public hospitals, utilities, NGOs | radius 0–4, colour bands, underlined links, yellow focus, Public Sans at 19px |
| `showroom` | large, calm, product-first | hardware, consumer tech, premium products, product pages, fintech marketing | borderless grey tiles at radius 24, no shadow, pill buttons, big Inter headlines |
| `warm` | inviting, crafted, local | cafés, bakeries, boutique hotels, farm brands, crafts, tourism villages | radius 8/12, no borders on photos, Fraunces with DM Sans |

## How to use a kit

1. **Choose one** from the table by the product's kind and the character you wrote in step 2. `look.cjs` suggests two for the category. An existing product (`improve.md`) gets the kit closest to its current character, with its own brand colour.
2. **Copy the kit file verbatim** into the stylesheet (and its `<link>` for the fonts), after `tokens.css`. Its variables (`--canvas`, `--surface`, `--ink`, `--ink-2`, `--line`, `--brand`, `--r-card`, `--shadow-card`…) and classes (`.display`, `.h1`, `.h2`, `.h3`, `.lead`, `.small`, `.label`, `.btn .btn-primary .btn-secondary`, `.card`, `.input`, `.link`) are the vocabulary for the page.
3. **Customise only the brand:** set `--brand` (and `--brand-ink` for text on it) to the brand colour, and `--accent` if the kit uses a separate link or highlight colour. For tints and states of the brand, run `palette.cjs` with the same colour and use its `--b*` steps. Keep the kit's neutrals, fonts, radii and shadows.
4. **Stay inside its shape language.** Every new element takes the kit's radius, border and shadow rules: no pill badge in `editorial`, `swiss` or `civic`; no hairline-sharp card in `soft`; no drop shadow in `precision-dark`; no rounded photo in `editorial`. If an element does not exist in the kit, build it from the kit's variables.
5. **Never mix two kits** on one page, and never add a second display face.

## Kits and the rest of the skill

- On **web pages**, the kit's type scale replaces the landing ramp in `spec.md`; spacing still comes from the scale in `tokens.css`. The art direction from `web-directions.md` is composed with the kit (a poster direction in `swiss`, a cinematic one in `editorial` or `showroom`, a live demo in `precision`), not instead of it.
- In **product UI** (apps, dashboards, tools), use the kit for fonts, colour, radius and depth, and keep the sizes in `spec.md`. `precision`, `precision-dark`, `soft` and `civic` suit product UI; `editorial`, `swiss`, `showroom` and `warm` are for web pages.
- For **government** sites, `civic` is the default; `editorial` suits a heritage city's tourism-led site, `swiss` a transparency or data portal.

## Check

Look at the render and ask of each element: does its corner, its border, its shadow and its type belong to the kit? A single pill, gradient or soft shadow from another language is what makes a page look assembled rather than designed.
