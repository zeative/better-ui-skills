# Colour with depth

A screen looks flat when every surface is the same untinted grey or white, the brand colour appears only on one button, and nothing between those two extremes exists. Well-made products (Linear, Stripe, Revolut, Robinhood, Apple's own apps) are not more colourful; they use a full scale of one hue, tinted neutrals, quiet surface steps and tinted shadows. This file is how to do that. The values come from `scripts/palette.cjs`, which turns one brand colour into the whole system.

Contents: the scale and its jobs · neutrals that belong to the brand · surfaces and depth · where the brand tint goes · gradients that work · charts · dark themes · the area budget · what makes colour look cheap · checks

Sources: Radix Colors (12-step scales and the job of each step), Material 3 (tonal palettes and surface tones), Apple HIG (system colours and dark mode), Refactoring UI (tinted greys, more shades than you think, depth with shadows), Josh Comeau (layered, colour-matched shadows), Practical UI (contrast and colour roles), Datawrapper and Tufte (colour in charts), OKLCH colour space (perceptually even lightness).

## 1. Generate the scale, never pick shades by eye

```bash
node <this-skill-dir>/scripts/palette.cjs "<brand hex>"            # light, plus a dark block
node <this-skill-dir>/scripts/palette.cjs "<brand hex>" --dark     # a dark-first product
node <this-skill-dir>/scripts/palette.cjs "<brand hex>" --tint 0.006   # crisper, almost neutral greys
node <this-skill-dir>/scripts/palette.cjs "<brand hex>" --tint 0.018   # warmer, richer greys (food, hospitality, wellness)
```

Paste the output at the top of the stylesheet, above `assets/tokens.css`. It gives `--b1`…`--b12` (brand), `--n1`…`--n12` (neutrals tinted toward the brand hue), soft and solid semantic colours, role tokens and tinted shadows, and prints the contrast of each text role so you can see they pass.

Each step has one job. Use steps only for their job:

| Step | Job | Typical use |
|:---|:---|:---|
| b1, b2 | barely-there brand backgrounds | a callout or a highlighted row (`--callout`), the top of a hero gradient |
| b3 | tinted background | selected row, active nav item, badge, icon chip behind a brand icon (`--tint`) |
| b4, b5 | hover and pressed on b3 | `--tint-hover`, `--tint-pressed` |
| b6 | tinted border | border of a callout or a selected card (`--tint-line`) |
| b7, b8 | strong tinted border, focus halo, chart secondary series | |
| b9 | the solid brand colour | primary button, active tab icon, the main chart line, switches, progress (`--brand`) |
| b10 | hover on b9 | `--brand-hover` |
| b11 | brand-coloured text and icons on light backgrounds | links, an icon on a b3 chip, the label of a selected item (`--brand-text`) |
| b12 | high-contrast brand text | a title inside a b2 callout |

The neutrals follow the same jobs: n1–n2 canvas, n3 wells and insets, n4–n5 hover and pressed, n6 lines, n7 input borders, n8 strong borders and comparison series, n9 placeholders and axis labels, n11 secondary text, n12 primary text.

## 2. Neutrals that belong to the brand

Pure greys (#F5F5F5, #888) look dead next to a coloured brand. Tint every grey slightly toward the brand hue (OKLCH chroma 0.004 to 0.015): a blue product gets cool greys, an orange or food product warm ones. Nobody sees the tint; everyone sees that the screen looks like one piece. `palette.cjs` does this. Never use `#000`, `#333`, `#666` or `#999` for text; use `--text-1`, `--text-2`, `--text-3`.

## 3. Surfaces and depth

Depth comes from three things together: a step in lightness, a hairline, and a shadow tinted with the surface hue.

| Layer | Light | Dark |
|:---|:---|:---|
| Canvas | `--canvas` (n2) | `--canvas` (n1) |
| Well, inset, segmented track, search field | `--well` (n3), no shadow | `--well` (n1), inset |
| Card, panel | `--surface` (white), 1px `--line`, `--shadow-card` | `--surface` (n2), 1px `--line`, no shadow |
| Raised: active segment, popover, menu, floating bar | white, `--shadow-pop`, `--highlight` | `--surface-raised` (n3), `--highlight`, 1px `--line` |
| Sheet, modal | white, `--shadow-sheet` | n3, 1px `--line` |

- Steps between layers are small (0.02 to 0.04 in OKLCH lightness). A large jump looks like a hole; none looks flat.
- Shadows are two layers (a tight one for the edge, a soft one for the lift) and tinted with the hue (`oklch(0.30 0.03 <hue> / α)`), never `rgba(0,0,0,.25)`.
- Raised elements get `--highlight`, a 1px inner light along the top edge. On dark themes it is the main depth cue, since shadows barely show.
- A primary button can carry the same: `background: linear-gradient(to bottom, color-mix(in oklch, var(--b9), white 6%), var(--b9)); box-shadow: var(--highlight), var(--shadow-brand);`. The gradient is one hue and barely visible; it reads as a pressable object rather than a flat rectangle. Use it on one primary button per view, never on cards.

## 4. Where the brand tint goes

Flat screens use the brand on one button and grey everywhere else. Screens with depth use the brand at several strengths, each small:

- **Selected and active states:** the active nav item and selected rows on `--tint` with the label in `--brand-text` (not a solid b9 pill). The active tab icon in b9.
- **Icon chips for the product's own features** (quick actions, onboarding steps, a settings section): `--tint` background with the icon in `--brand-text`. Items that are the user's content (merchants, categories, people) stay on neutral `--well` chips, so the brand stays special.
- **Badges and status:** soft backgrounds with dark text of the same hue: `--ok-3` with `--ok-11`, `--warn-3` with `--warn-11`, `--bad-3` with `--bad-11`, `--tint` with `--brand-text` for a neutral "New" or "Pro". Never a saturated badge with white text in a list.
- **Callouts and tips:** `--callout` (b2) with a 1px `--tint-line` (b6) border and the title in b12. One per screen.
- **Focus:** a 2px `--focus` ring with 2px offset.
- **Progress and meters:** the fill in b9 on a `--well` track.
- **Links:** `--brand-text`.

## 5. Gradients that work

- **One hue only,** in OKLCH, with a small lightness change: `linear-gradient(180deg, var(--b2), var(--surface))` behind a hero figure, or `color-mix` of the surface with 4 to 8% brand at the top of a summary card. ΔL at most 0.04 on surfaces.
- **Hero bands and showpiece objects** (a payment card, a landing hero visual) may span up to 30° of hue, for example from b9 toward a neighbouring hue, and use a radial highlight. Never across the colour wheel (purple to orange), never on product chrome.
- **Dark heroes:** the canvas plus one soft radial glow of b9 at 10 to 16% opacity behind the main figure or object, not a full gradient fill.
- **Area charts:** b9 from 20% to 0% opacity, top to bottom (`--chart-area`).

## 6. Charts

- The series that matters in b9, 2px, with the area fill above. The comparison (last period, benchmark) in n8, 1.5px, dashed. Other series in neutrals; colour only what the reader should look at.
- Gridlines in n4 or none; axis labels in `--text-3` mono meta. Never a rainbow of category colours when one series is the point.
- Categories that must be told apart (spend by category, a donut): the brand steps b9, b7, b5 plus n8, or at most four distinct hues of equal lightness. Label them directly instead of a legend where possible.
- Up and down only on changes: `--up` and `--down`, which are step 11 of green and red, readable as text.

## 7. Dark themes

- Canvas n1 (not #000), cards n2, raised n3; elevation by lightness, a 1px `--line`, and `--highlight`, not shadows.
- The brand stays b9 for solid controls; brand text and icons use dark-theme b11, which is lighter and less saturated so it does not vibrate.
- Text-1 is n12 (about #EDEDED, not pure white); body copy at n11.
- A neon look: one bright b9 on the main chart and primary action only; every other accent is a tint (b3) or brand text (b11).

## 8. The area budget

Measure the first screen by area:

| Colour | Share of the screen |
|:---|:---|
| Neutrals (canvas, surfaces, text) | 85 to 90% |
| Brand tints and soft semantic backgrounds (b2–b6, ok-3…) | up to 10% |
| Solid brand (b9) and other saturated fills | up to 3 to 5% |

That is the 60-30-10 idea scaled for interfaces: almost everything neutral, so the few tinted and solid things are what the eye finds first (the isolation effect).

## 9. What makes colour look cheap

- Untinted greys next to a saturated brand; pure black text; `rgba(0,0,0,.x)` shadows.
- The brand used at one strength only, either nowhere (flat) or everywhere (loud).
- Saturated fills on large areas: a whole card, a hero band or a tab bar in b9.
- Pastel canvases or several pastel card colours (every hue at the same light step).
- Gradients across hues on product UI, coloured glows on chrome, gradient text.
- Semantic colours used against their meaning (red for a neutral action next to errors), or green and red for anything that is not a change.
- White text on a light brand colour (yellow, lime, light orange, sky): `palette.cjs` chooses `--brand-ink` for you.

## 10. Checks

- `--text-2` and `--text-1` reach 4.5:1 on canvas and surface; `--text-3` only on axis labels and placeholders (3:1). The palette prints these.
- Squint at the grayscale screenshot from the audit: surfaces should separate by lightness alone, and the primary element should still lead.
- Count brand appearances on the first screen: one solid primary, plus tinted states and icons; nothing large in b9 except the main chart line and the primary action.
