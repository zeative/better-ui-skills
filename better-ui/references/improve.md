# Improving a UI that already exists

Most people who install this skill already have a page: a landing page, a dashboard, an app. They ask to make it better ("bikin lebih bagus", "rapikan", "make it look more premium", "redesign"). The result must look clearly better **and** still be their product: the same brand, the same content and promises, the same links and forms, working in the same codebase. A redesign that breaks a form, loses the SEO tags, rewrites a React app into one HTML file, or replaces the brand with this skill's defaults is a failure however good it looks.

Contents: 1 baseline · 2 read the code · 3 choose the scope · 4 what must not break · 5 carry the brand · 6 work in the stack · 7 build · 8 prove it

## 1. Baseline: measure before you touch anything

- Run the page (open the file, or start the dev server: `npm run dev` and use its URL) and audit it:
  ```bash
  node <this-skill-dir>/scripts/audit.cjs http://localhost:5173/ --out .ui-audit/before
  ```
- Open every screenshot. Write a short list of what is wrong, by area (hierarchy, type, colour, spacing, components, mobile, copy, imagery), each with where it is. Note the audit's counts: broken items, font sizes on the first screen, spacing off the scale, contrast failures.
- Write what is **good** and must stay: the logo, a colour people know, a strong photograph, a clear headline, a section that works.

## 2. Read the code before designing

- **Stack:** framework (Next, Vite/React, Vue, Svelte, Astro, plain HTML), styling (Tailwind and its config, CSS modules, styled-components, plain CSS, a component library such as shadcn/ui, MUI or Chakra), fonts and how they load, images and where they live.
- **Existing tokens:** brand colours, fonts, radii, spacing in the config or CSS variables. These are the starting point, not something to throw away.
- **Structure:** routes and pages, shared components (header, footer, button, card), and which ones every page uses.
- **What other code depends on:** IDs, classes and `data-` attributes used by scripts, analytics or tests; form field names and actions; anchors other pages link to.

## 3. Choose the scope from the request and the audit

| The request | The audit | Scope |
|:---|:---|:---|
| "rapikan", "polish", "fix the spacing" | any | **Polish:** fix the listed problems in place; keep layout, palette and type |
| "bikin lebih bagus", "more modern", "more premium" | a few problems | **Refresh:** a new visual system (type, colour, spacing, components, imagery) on the same structure and sections |
| "bikin lebih bagus" | many problems across areas | **Refresh plus:** the visual system, and re-composed sections where the structure itself is the problem (a hero with no visual, three equal cards, a link farm) |
| "redesign total", "rombak total", "from scratch" | any | **Rebuild:** a new layout and art direction (`web-directions.md` for web pages), with the same content, brand and functions |

Say which scope you chose and why in one line before building. When the request and the audit disagree (a "small polish" of a page with a broken mobile layout), do the requested scope and list the rest as recommendations.

## 4. What must not break

Keep, unless the user asks otherwise:

- **Content and promises:** every headline's meaning, prices, plan limits, legal text, claims, testimonials, names and figures. Rewrite for clarity and length (`copy.md`), never change a fact. New sections or claims are suggestions, not additions.
- **Links and anchors:** every `href`, route and `#anchor` target, so navigation, ads and other pages still land.
- **Forms:** field `name`s, `action`, `method`, required fields, hidden inputs, and the submit handler.
- **SEO and sharing:** `<title>`, meta description, canonical, Open Graph and Twitter tags, structured data, heading meaning (one H1), `alt` text, `lang`.
- **Scripts and integrations:** analytics, tag managers, chat widgets, payment and booking embeds, cookie banners, and every ID or class they use.
- **Accessibility that already works:** labels, focus order, skip links.
- **Language and locale** of the copy.

After building, check each of these against the original (a quick diff of links, form names and meta tags), and say in the handoff that you did.

## 5. Carry the brand

- **The logo** stays as it is. If it is poor quality, say so and suggest a redraw; do not invent a new one.
- **The kit:** choose the kit in `kits.md` closest to the existing character (a sharp SaaS page → `precision`; a rounded consumer page → `soft`; a hotel → `editorial` or `warm`), so the improvement has one coherent language instead of patches on the old styles.
- **The brand colour** goes into the kit's `--brand`, and into `palette.cjs` (`node <this-skill-dir>/scripts/palette.cjs "<their hex>"`), so the new system is built from their colour. If the brand colour fails contrast, the palette adjusts the solid step; keep the hue.
- **Fonts:** keep the brand's font if it is decent and pair it properly (`typography.md`); replace only a template default (Poppins, Montserrat, a system stack) and say why.
- **Their imagery:** reuse their photographs and product screenshots, cropped and placed better, before adding stock images.
- **Their voice:** keep their tone; tighten, do not rebrand.

## 6. Work in the stack

- **Edit in place.** Change the existing files and components; do not rewrite the project into a single HTML file, switch framework, or add a dependency the page does not need.
- **Tailwind:** put the spec values and palette roles into the theme (`theme.extend.colors`, `fontFamily`, `spacing`, `borderRadius`, or CSS variables referenced from the config) and use those classes; avoid arbitrary values like `p-[18px]` and long inline style strings.
- **Component libraries (shadcn/ui, MUI, Chakra):** restyle through their tokens and variants (CSS variables, theme overrides), not by fighting each instance.
- **Plain CSS:** add the palette and `tokens.css` custom properties at the top of the main stylesheet and refactor the rules to use them.
- **Shared components first:** a better button, card, header and footer improve every page at once.
- **Keep the build green:** run the project's build, type-check and lint after the change, and fix what you broke.

## 7. Build

Follow the rest of `SKILL.md` within the chosen scope: the spec and palette (step 3), the anatomy or direction (step 4, `web-directions.md` for landing pages, chosen to fit the existing brand), the finish (step 5). For a landing page that is safe and forgettable, the art direction is usually the biggest improvement; for a product screen, hierarchy, spacing and states usually are.

## 8. Prove it

- Audit again with the same widths: `--out .ui-audit/after`.
- Compare: broken items, font sizes, spacing off the scale, contrast failures, and the audit's **Generated** line (boxes, nested boxes, icon chips, pills, dots, mono, eyebrows), before and after. An improvement lowers those counts; if your version has more boxes, chips and pills than the original, it looks more generated, not more designed.
- Look at before and after screenshots side by side at 375 and 1440px; the after must be clearly better at both.
- Hand off: the scope you chose, what changed (by area), what was deliberately kept, the measured before and after, the checks from section 4, and recommendations beyond the scope.
