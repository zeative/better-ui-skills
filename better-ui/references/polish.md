# Polish system

Finish is a system, applied everywhere from the start. These recipes assume the tokens in `system.md`.

Contents: surfaces, not bare pages · shadows · borders and edges · surfaces and glass · type finishing · colour finishing · buttons and controls · micro-details · spacing rhythm · variety within sets · motion · dark directions

## Surfaces, not bare pages

Content sits on surfaces: cards, panels, tiles, a shell. A page of text rows separated by hairlines directly on the background reads as a document, however good the typography. Establish at least three levels: the **ground** (page background, usually tinted), the **surface** (cards, clearly lighter or darker than the ground), and the **raised** level (popovers, floating cards, the featured item). Add one **contrast surface** per screen: a dark or accent-filled card that anchors the composition.

## Shadows

One blur at one opacity looks flat and dated. Use layered shadows: a tight one for the contact edge and one or two wide soft ones for the ambient lift, tinted toward the ink colour, always offset downward.

```css
--sh-1: 0 1px 2px rgba(16,24,40,.06), 0 1px 1px rgba(16,24,40,.04);
--sh-2: 0 1px 2px rgba(16,24,40,.05), 0 6px 14px -4px rgba(16,24,40,.10);
--sh-3: 0 2px 4px rgba(16,24,40,.05), 0 14px 30px -8px rgba(16,24,40,.14), 0 30px 60px -20px rgba(16,24,40,.12);
--sh-4: 0 4px 8px rgba(16,24,40,.06), 0 24px 48px -12px rgba(16,24,40,.22), 0 60px 110px -30px rgba(16,24,40,.25);
```

- Tint the shadow colour to the direction: cool navy for cool palettes, warm brown for warm ones, the card's own hue under coloured cards.
- Use the scale with intent: `--sh-1` for resting cards, `--sh-2` on hover, `--sh-3` for floating cards, `--sh-4` for the showpiece.
- Add a light top edge to raised surfaces: `box-shadow: inset 0 1px 0 rgba(255,255,255,.7), var(--sh-2)`. On dark surfaces use `rgba(255,255,255,.06)`.
- **One shadow language:** soft, low-opacity layered shadows, or hairline borders with almost no shadow. No hard offset shadows, no heavy outlines, no grain.
- Depth must not be uniform. If every card has the same border and the same blur, the page is flat again. Resting cards are quiet; the focal card, primary buttons and anything floating are clearly lifted, with a brighter top edge and a deeper, wider shadow.
- Ground and surface need visible separation: a surface that is nearly the same value as the ground disappears. Deepen the ground or brighten the surface until cards read at a glance.

## Borders and edges

- Hairlines are translucent ink (`--line`), not a solid grey, so they adapt to whatever is behind.
- Pair a hairline with a shadow on light cards for a crisp edge.
- **Gradient border** for featured items and badges:
  ```css
  .gb { border: 1px solid transparent; border-radius: var(--r-md);
        background: linear-gradient(var(--surface), var(--surface)) padding-box,
                    linear-gradient(135deg, var(--accent), var(--accent-2), transparent 70%) border-box; }
  ```
- **Concentric radii:** inner radius = outer radius − padding. A 24px card with 8px padding holds 16px children.
- Use the radius scale deliberately: small for controls, medium for cards, large for the showpiece and sections, pill for chips and buttons where the direction wants it.

## Surfaces and glass

- A barely visible vertical gradient makes a card feel lit: `background: linear-gradient(180deg, var(--surface), color-mix(in srgb, var(--surface) 94%, var(--ink)))`.
- Tinted cards: `color-mix(in srgb, var(--accent) 8%, var(--surface))` with ink text and an accent icon chip.
- Glass needs something colourful behind it: `background: rgba(255,255,255,.62); backdrop-filter: blur(24px) saturate(1.4); border: 1px solid rgba(255,255,255,.7);` with a soft shadow. Body text on glass needs a strong enough panel to pass contrast.
- Insets (search fields, code, wells) go one step darker than their card with an inner shadow: `box-shadow: inset 0 1px 2px rgba(16,24,40,.06)`.

## Type finishing

- **Landing headlines:** `font-size: clamp(36px, 5vw, 56px); line-height: 1.1; letter-spacing: -0.02em; text-wrap: balance;` in the UI sans at weight 600. Six to ten words over two lines. Product UI titles are 20 to 24px.
- **Emphasis**, if any: one word or phrase of a landing headline in the brand colour or in the muted grey. Nothing on product UI.
- **Eyebrow pill** above a headline when it carries information: a small pill with a dot or icon and a short label.
- **Scale:** use the compact scale in `system.md`. Hierarchy comes from weight (400/500/600) and colour (text vs. muted grey) as much as size. The key figure in an app or dashboard is 28 to 36px; KPI figures 22 to 28px; labels 12 to 13px in muted grey.
- **Key numerals:** weight 600, slight negative tracking, decimals and currency signs smaller or muted, tabular figures.
- **One family.** Everything in the UI sans. No display serif, no mono labels, no condensed headings on product UI.
- **Small labels:** 12 to 13px, weight 500, sentence case, muted grey. Uppercase tracked labels are rare.
- `font-variant-numeric: tabular-nums` on all figures; `font-feature-settings: "ss01", "cv11"` where the face has nicer alternates.
- Body text stays calm: 15 to 17px, line-height 1.55, max 65ch, muted ink for secondary copy, and always above 4.5:1 contrast.

## Colour finishing

- Roughly 60% ground and surfaces, 30% ink and neutrals, 10% accent. The accent is concentrated in a few strong places (primary button, key chart, active state, one feature card), not sprinkled.
- Derive tints with `color-mix` instead of inventing new colours: 8 to 14% accent on surface for soft fills, 20 to 30% for borders of tinted elements.
- A **category palette** for things that come in kinds (item types, statuses, team members): four to six hues at matched lightness and saturation, each with a soft tint. Use it in small doses: the item's object or icon tile and its own data marks. Do not also tint the whole card, its border and its button, or the screen turns into a rainbow and loses its identity.
- **One brand colour** defines the screen. Viewed as a thumbnail, the page reads as a neutral base with one colour, plus category tints as small sparks.
- **One filled card per screen at most** (the summary card) in the brand colour or near-black. The rest are white cards. Do not tint every tile a different pastel.
- **Dark apps** use near-black ground, slightly lighter surfaces, white text, and the brand colour on the primary control, active states and chart series.
- Status colours are separate and always paired with a label or icon.
- Gradients are subtle and rare: a gentle one on the summary card or the landing hero background. Within about 30 degrees of hue.
- Never grey text on a coloured fill: use white, ink, or a darker tone of that colour.

## Buttons and controls

```css
.btn { display: inline-flex; align-items: center; gap: 8px; height: 44px; padding: 0 18px; border-radius: var(--r-pill); font-weight: 600; font-size: 15px;
  background: var(--accent); color: var(--accent-ink); border: 0; cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.25), 0 1px 2px rgba(16,24,40,.2), 0 6px 16px -6px color-mix(in srgb, var(--accent) 70%, transparent);
  transition: transform .15s ease-out, box-shadow .15s ease-out, background-color .15s ease-out; }
@media (hover: hover) { .btn:hover { transform: translateY(-1px); box-shadow: inset 0 1px 0 rgba(255,255,255,.25), 0 2px 4px rgba(16,24,40,.2), 0 12px 24px -8px color-mix(in srgb, var(--accent) 80%, transparent); } }
.btn:active { transform: translateY(0) scale(.98); }
.btn .arrow { transition: transform .15s ease-out; } .btn:hover .arrow { transform: translateX(3px); }
.btn-ghost { background: var(--surface); color: var(--ink); border: 1px solid var(--line); box-shadow: var(--sh-1); }
```

- One primary style, one secondary, one quiet text style. A trailing arrow or icon on the primary action.
- Inputs: 44px high, surface or inset fill, hairline border, a clear focus ring in the accent (`box-shadow: 0 0 0 4px var(--accent-soft)` plus a border colour change), an icon or label inside where useful.
- Segmented controls and tabs as pill groups with a sliding or filled active state.
- Checkboxes, toggles and radio buttons styled to the direction, with a satisfying checked state (fill, icon draw, small scale bounce).
- `:focus-visible` rings on everything interactive.

## Micro-details

These are what make a screen look designed. Use many, each with a reason:

- **Pills and badges:** status pills with a dot, delta badges (`▲ 12.4%` in a soft green pill), "New" tags, counts in nav items.
- **Icon chips** beside labels and in tiles (see `showpiece.md`).
- **Avatars and avatar stacks** wherever a person is implied.
- **Thumbnails** in every list of items.
- **Sparklines and mini progress** inside tiles and rows.
- **Key hints** (`⌘K`, `Enter`) in small bordered keys.
- **Dividers** as hairlines, dotted leaders between a label and a value, or a small centred ornament.
- **Meta rows:** a small icon plus text for dates, locations, durations.
- **Kickers and captions** in the mono or small-caps style.
- **A designed footer:** columns of links, the wordmark, a small status or locale control, a closing line.

## Spacing rhythm

- 4px base scale: 4, 8, 12, 16, 20, 24, 32, 48, 64, 96, 128.
- Section padding on marketing pages: `clamp(72px, 10vw, 140px)` top and bottom. Card padding 20 to 28px. Grid gaps 16 to 24px. Tight inside groups, generous between them.
- Content width 1120 to 1240px with at least 20px side gutters on phones, and a few elements allowed to break out to full bleed.
- One grid for the whole page so column edges recur down the page.
- Align the parts of sibling cards (title, value, button) with `grid` and `subgrid` or fixed heights.

## Variety within sets

Sets of similar things must not be clones, and no region of the page should be a column of same-weight white cards.

- **Every column or region has a heavy tile:** a dark or saturated contrast tile, or one markedly larger than its neighbours.
- **Fill each card.** Content should occupy its card with intent. A wide card holding a title and a small widget in one corner looks unfinished: enlarge the visual, add a secondary element, or make the card smaller.
- **Break the grid once or twice:** let an element overlap the edge of its card or section (a floating chip, an object that pokes out, a card that straddles two surfaces).

- **Bento grids:** mix tile sizes (one spans two columns, one is tall), and give tiles different treatments: one dark, one accent-filled, one with a big figure, one with a mini chart, one with an illustration.
- **KPI rows:** different icon chip hues, different mini-visuals (sparkline, ring, bar, avatar stack).
- **Feature sections:** alternate the side of the visual, the kind of visual, and the surface.
- **Lists:** vary content length, status and thumbnail colour.

## Motion

- Hover: cards lift 2px with a larger shadow; buttons lift and their arrow moves; rows tint.
- Press: scale to .98.
- Showpiece entrance, once on load: the mock fades and rises 16px over 600ms with `cubic-bezier(.2,.8,.2,1)`, floating cards follow staggered by 80ms. Optional gentle float on the cards (`translateY(±4px)` over 6s).
- Numbers may count up once; charts may draw once. Nothing loops attention-seekingly, nothing blocks reading.
- Animate only `transform` and `opacity` (and `box-shadow` on hover). Name the properties; never `transition: all`.
- `@media (prefers-reduced-motion: reduce)` removes movement.

## Dark directions

- The ground is not pure black; surfaces step up in lightness.
- Shadows are less visible, so use hairline borders and slightly lighter surfaces.
- Lower the saturation of large fills, keep accents vivid in small areas.
- Check contrast of muted text: it is the usual failure.
