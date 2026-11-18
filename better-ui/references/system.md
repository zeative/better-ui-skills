# The system

Professional interfaces get their quality from a small, strict system applied everywhere. Write these tokens as CSS custom properties at the top of the stylesheet and use nothing else.

Contents: choose a look · type · colour · brand colour by category · surfaces and depth · radius and spacing · icons · imagery · starting tokens

## Choose a look

A clean system with no point of view reads as a component-library template. Popular shots each have one recognisable, contemporary *look*: a palette and surface treatment, not a theme. Pick the one that suits the product and audience, and apply it consistently. These are styles, not concepts: nothing about the product's world is drawn into the interface.

- **Bright and clean:** white or very light grey canvas, white cards, one saturated brand colour in the main chart, buttons and active states. The safe default for finance, productivity and admin.
- **Dark with one neon:** near-black canvas, dark grey cards, white text, one vivid accent (lime `#C6F432`, orange `#FF6A2B`, electric blue) for the hero figure, chart and primary control. Common in fitness, crypto, music.
- **Monochrome:** black, white and greys with one small accent; strong type; crisp hairlines. Common in fintech and SaaS.
- **Fresh gradient:** a soft blue or sky gradient behind the hero or summary card, glass-like white cards with a light blur. Common in banking and SaaS landing pages.

Write the choice as one line in a comment at the top of the stylesheet ("Look: monochrome, off-white canvas, black controls, lime accent").

**No pastels.** Pale tinted canvases (lilac, peach, mint, sage, periwinkle), cards filled with soft candy colours, and a different pastel chip behind every item are the most recognisable palette of generated interfaces. Canvases are neutral (white, off-white, light grey, graphite, near-black); colour comes from one saturated or deep brand colour, its accent, photographs and artwork, and data. Tints of the brand are for small things (a selected row, a focus ring, a chart fill), at 6 to 10%, never for whole cards or regions.

## Type

- **Read `typography.md`** for choosing and pairing faces, weights, and tracking and leading per size. In short:
- **One sans-serif family** chosen for the character: Inter, Inter Tight, Geist, Instrument Sans, Manrope, DM Sans, Hanken Grotesk, Schibsted Grotesk, Figtree, Onest, Plus Jakarta Sans or IBM Plex Sans, or the system stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`). Load from Google Fonts with `display=swap`, with the system stack as fallback. A second family only for a mono partner or when the brand already has a display face.
- **A mono partner for meta** (Geist Mono, JetBrains Mono, IBM Plex Mono, DM Mono) in dashboards and tools: the change and its comparison ("+12% vs last month"), axis labels, invoice and card numbers, keycaps, timestamps. Never for headings, body or buttons. **On web pages, use it for one purpose at most** (a schedule's times, code, a spec table) or not at all; mono labels, URLs and captions sprinkled over a marketing or public page read as generated.
- **Two-tone titles.** A page title can carry its context in a quieter tone: "October" in primary and "2026" in tertiary, or "Revenue" with the period muted beside it.
- **Weights 400, 500 and 600.** 700 sparingly for the largest figure. No 800/900 on UI.
- **A compact scale.** 12 (captions, tab labels), 13, 14 (secondary text, table cells), 16 (body, row titles), 18, 20 (card titles), 24 (section and page titles), 32 (hero figures in apps and dashboards). Landing hero headlines 40 to 56px; never above 64px.
- **Letter-spacing:** -0.01em to -0.02em on 20px and above; 0 on body; small uppercase labels are rare and lightly tracked (0.04em), not a recurring style.
- **Numbers:** `font-variant-numeric: tabular-nums` wherever figures align or change. Currency and units smaller or lighter than the figure when the figure is large ("$2,147" with ".60" in the muted grey is a common, good touch).
- **Line height** 1.5 for body, 1.2 to 1.3 for headings. Sentence case for headings and buttons.

## Colour

- **Canvas:** a light neutral tinted toward the brand hue (`--canvas` from `palette.cjs`, cool for a blue brand, warm for an orange one). White canvas with light grey cards also works. For a dark app use graphite, not blue-black or purple-black: `#0E0E0F` to `#141415` canvas, `#18181A` to `#1C1C1E` surfaces, `#232326` raised, borders `rgba(255,255,255,.07)`.
- **Surfaces:** white (`#FFFFFF`) cards on the canvas; an inner panel one step darker than the card (`#F6F7F9`).
- **Text:** primary `#0F172A`-ish (near-black, not pure), secondary `#64748B`-ish, tertiary for placeholders `#94A3B8`. Hairlines `#E9ECF1`.
- **One brand colour** (see below), used for: the primary button, the active tab and nav item, links, the main chart series, selected states, and small filled elements (a status pill, a small tile). Not large filled cards: big blocks of brand colour or black are loud. A light tint of it (6 to 10% opacity on the canvas) for chips and selected backgrounds.
- **Semantic colours:** success green, warning amber, danger red, as coloured text with a dot or a very light pill (`#ECF7F0` background, `#15803D` text) for statuses and deltas. Never as large fills.
- **Category colours** (habits, spending categories, muscle groups): five or six clear, mid-saturation hues used only as small marks: a dot, an icon's stroke, a chart series, a thin bar. Icon chips sit on a neutral grey (`#F2F2F0` on light, `#232326` on dark) with the icon in the category colour, not on a pastel square. Never as card backgrounds.
- **Colour by area:** on a light screen, saturated or dark fills cover no more than about 10 to 15% of the first screen in total (buttons, pills, small tiles, a payment card object, a dark sidebar in a desktop shell). The rest is neutral, so the colour that is there reads as intentional.

## Brand colour by category

Pick one that fits, then vary its exact hue so it is not a stock value. Avoid the default indigo-to-violet (`#6366F1` → `#8B5CF6`) gradient card: it is the single most recognisable AI-generated look. If the brand is purple, use a solid fill or a gradient within one hue.

- Finance, banking: deep green `#0F7B5F`, blue `#2563EB`, indigo `#4F46E5`, near-black with lime `#C6F432`.
- Health, fitness, workout: orange `#FF5A1F`, coral `#F25C54`, lime on dark, electric blue.
- Habits, productivity, to-do: violet `#6D5DFC`, blue, green `#22A06B`, orange.
- Commerce, admin: blue, green, violet, black.
- Clinical, health care: teal `#0E9F9A`, blue `#2F6FEB`.
- SaaS landing: violet, blue, black with one accent, green.

## Surfaces and depth

- **Cards:** white, radius 16 to 24 on mobile and 12 to 16 on desktop, padding 16 to 20 (mobile) or 20 to 24 (desktop).
- **Depth:** a lightness step, a hairline (`--line`) and a quiet shadow tinted with the brand hue (`--shadow-card`), together and each small. Floating elements (tab bar, sheets, popovers) use `--shadow-pop` or `--shadow-sheet` with `--highlight`. All from `palette.cjs`; see `color.md`.
- **Material, quietly.** What makes a well-made surface feel physical is small: a tone shift inside one neutral (the top of a card 2 to 4% lighter than the bottom), a 1px highlight along the top edge (`inset 0 1px 0 rgba(255,255,255,.05)` on dark, `rgba(255,255,255,.8)` on light), a hairline border, and on light themes a small soft shadow. The active navigation item is a raised step of the same material, not a coloured pill. Recipes are in `showpiece.md` (Surfaces with material).
- **No** textures, noise, paper, heavy bevels, coloured glows on chrome, coloured offset shadows, gradient borders, or gradients from one hue to another on product UI. Web pages follow their chosen direction in `web-directions.md` instead.

## Surface levels in product UI

- **Three levels at most:** the canvas, the surface (cards, panels, the sidebar if it is set apart) and a raised level (menus, popovers, the active item). A fourth tone is almost always one too many.
- **Separate canvas and surface clearly but quietly:** a light canvas 2 to 4% darker than white cards (`#F6F6F4` canvas, `#FFFFFF` cards), or a white canvas with hairline-bordered cards. White cards on a white canvas with no border have no edges; grey cards on a grey canvas have no contrast.
- **The sidebar** is either the canvas itself (divided by a hairline) or one deliberate contrast (a dark sidebar beside a light canvas). Not a third shade of grey.
- **Insets** (search fields, wells, code) one step darker than the surface they sit on.
- **Colour fills** are for the one summary card, not for whole regions. Section backgrounds inside an app stay on the canvas.

## Radius and spacing

- Radius scale: 6 (small chips), 10 or 12 (buttons, inputs, icon chips), 16 to 24 (cards), 999 (pills, avatars). Inner radius = outer radius minus padding.
- Spacing on a 4px grid: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64. Gaps between cards 12 to 16 on mobile, 16 to 24 on desktop. Page gutters 16 to 20 on mobile.

## Icons

- One line-icon set at one stroke width (1.5 to 2px), drawn as inline SVG in the Lucide/Feather style: home, chart, calendar, user, plus, bell, search, settings, chevrons.
- Icon chips: 40px, radius 12. The product's own features and actions (quick actions, onboarding steps, a settings group) use `--tint` with the icon in `--brand-text`; the user's items (merchants, categories, people) use the neutral `--well` with the icon in `--text-1` or the item's category colour. One treatment per kind of item.
- In consumer apps, items (habits, categories, exercises) may use native emoji on a neutral chip instead. Pick one approach per app.

## Imagery

Popular shots always have something to look at besides text: 3D icons, avatars, product pictures, a chart. Draw on these, and keep one style per screen.

- **No emoji in finance, banking, admin, SaaS or productivity tools.** Their categories, merchants and accounts use a drawn line-icon set on neutral chips (or merchant logos drawn as simple letter marks); emoji tiles there read as a template.
- **3D icons, in moderation, for personal consumer apps** (habits, wellness, food, hobbies). Use them where the emoji is the natural picture of the thing (water 💧, a book 📚, coffee ☕, a house 🏠, a trophy 🏆), and only for one kind of item per screen. Where no emoji fits naturally (exercises, accounts, merchants, settings), use line icons in tinted chips instead; a leg emoji standing for squats looks like a stock kit. A screen where every icon is a 3D emoji reads as a template.
- **3D icons for items** in consumer apps (habits, categories, exercises, rewards, empty states): Microsoft's Fluent 3D emoji, MIT licensed, served from a pinned CDN. Put each on a neutral grey chip, 40 to 48px, the image at about 60% of the chip. Fall back to the native emoji if the image fails:
  ```js
  const emoji3d = (e) => 'https://cdn.jsdelivr.net/npm/@lobehub/fluent-emoji-3d@1.1.0/assets/' +
    [...e].map((c) => c.codePointAt(0).toString(16)).join('-') + '.webp';
  // <img src="${emoji3d('💧')}" alt="" width="28" height="28" onerror="this.replaceWith('💧')">
  ```
  Use the emoji's exact code points: `🏋️` is `1f3cb-fe0f`, `☕` is `2615`. A larger one (96 to 140px) makes a good empty-state or onboarding image.
- **Avatars:** never initials for the signed-in user or in consumer apps. Use illustrated avatars from DiceBear's `notionists` or `lorelei` styles (`https://api.dicebear.com/9.x/notionists/svg?seed=<name>&backgroundColor=<hex>`), each on a different soft background, or simple SVG portraits. Initials on a tint are acceptable in dense admin tables.
- **Products, food, drinks and places:** a real photograph from Unsplash by default (see `editorial.md`): a menu item, a hotel, a dish, a product, a destination. A 3D emoji on a neutral rounded square is the fallback only without a network, or for abstract items that have no photograph. Never an empty grey box, and never emoji where a photograph of the real thing exists.
- **Maps:** a real map, never a drawn grid with pins. Leaflet 1.9.4 from cdnjs with CARTO's basemaps (`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png`, `dark_all` for dark themes) and their attribution ("© OpenStreetMap contributors © CARTO"); disable the zoom control and scroll-zoom in small previews, draw the route as a 3px `--brand` polyline and the stops as numbered markers in the brand colour. Give the map a fixed height (160 to 200 on phones) and radius 16. A drawn map is the fallback only without a network.
- **Charts:** clean and minimal (see `showpiece.md`).
- If the network may be unavailable where the page is used, keep the fallbacks: the layout must hold with native emoji and initials.

## Starting tokens

Colours come from `scripts/palette.cjs` (the command is printed by `look.cjs`), everything else from `assets/tokens.css`; values in `spec.md`, colour usage in `color.md`. Do not start from a hand-written palette.
