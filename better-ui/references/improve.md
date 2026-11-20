# Improving a UI that already exists

Most people already have a page or an app and ask to make it better ("bikin lebih bagus", "rapikan", "redesign"). The result must look clearly better **and** still be their product: the same brand, content and promises, the same links and forms, working in the same codebase. A redesign that breaks a form or loses a link is worse than no redesign.

## 1. Look before touching anything

- Run the page (open the file, or start the dev server) and take screenshots: `node <this-skill-dir>/scripts/audit.cjs <file or url> --widths 390,1440 --out .ui-audit/before`.
- Write two short lists: what is wrong (hierarchy, type, colour, spacing, components, mobile, copy, imagery, each with where it is) and what is **good** and must stay (the logo, a colour people know, a strong photograph, a clear headline, a section that works).

## 2. Read the code

- **Stack:** framework, styling (Tailwind config, CSS modules, a component library such as shadcn/ui or MUI), how fonts and images load.
- **Existing tokens:** brand colours, fonts, radii and spacing in the config or CSS variables. They are the starting point.
- **What depends on the markup:** IDs, classes and `data-` attributes used by scripts, analytics or tests; form field names; anchors other pages link to.

## 3. Choose the scope

| The request | Scope |
|:---|:---|
| "rapikan", "polish", "fix the spacing" | **Polish:** fix the listed problems in place; keep layout, palette and type |
| "bikin lebih bagus", "more modern", "more premium" | **Refresh:** a new visual system (type, colour, spacing, components, imagery) on the same structure; re-compose sections only where the structure itself is the problem |
| "redesign total", "rombak total", "from scratch" | **Rebuild:** a new layout and direction, with the same content, brand and functions |

Say which scope you chose and why in one line. For a refresh or a rebuild, run the method in `SKILL.md` (brief, three directions, tokens, one screen first, look and fix), with the brand as a fixed input.

## 4. Carry the brand

- **The logo** stays as it is.
- **The brand colour** stays recognisable. It can be used at a deeper or quieter step for large areas (`palette.cjs "<hex>"` gives the scale), with the exact colour on the logo and the primary action.
- **Fonts:** keep the brand's font if it is decent; replace only a template default, and say why.
- **Their imagery:** reuse their photographs and screenshots, cropped and placed better, before adding stock images.
- **Their voice:** keep their tone; tighten, do not rebrand.

## 5. What must not break

- **Content and promises:** every fact, price, limit, legal line, name and figure. Rewrite for clarity, never change a fact; new claims are suggestions, not additions.
- **Links and anchors:** every `href`, route and `#anchor` target.
- **Forms:** field `name`s, `action`, `method`, required fields, hidden inputs, submit handlers.
- **SEO and sharing:** title, meta description, canonical, Open Graph tags, structured data, one H1, `alt` text, `lang`.
- **Scripts and integrations:** analytics, tag managers, chat widgets, payment and booking embeds, and every ID or class they use.

## 6. Work in the stack

- Edit in place; do not rewrite the project into one HTML file, switch framework or add dependencies it does not need.
- Tailwind: put the tokens into the theme (or CSS variables referenced from it) and use those classes, not arbitrary values everywhere.
- Component libraries: restyle through their tokens and variants.
- Shared components first: a better button, card, header and footer improve every page at once.
- Run the project's build, type-check and lint afterwards and fix what you broke.

## 7. Prove it

- Screenshots again with the same widths (`--out .ui-audit/after`), before and after side by side at phone and desktop width: the after must be clearly better at both.
- Diff links, form names and meta tags against the original and say in the handoff that you did.
- Hand off: the scope, the direction, what changed by area, what was deliberately kept, the checks from section 5, and recommendations beyond the scope.
