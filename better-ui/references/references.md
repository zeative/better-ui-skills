# Start from references, then slice

Designers do not start from a blank file. They collect references for the exact thing they are making (a clinic queue screen, a pricing table for an API product, a hotel booking hero), pick the two or three best, study how they are built, and then build their own screen to that standard. That last step is **slicing**: re-creating the composition, proportions, spacing rhythm, type scale and component shapes of the chosen references, piece by piece, for this product's content. A design built this way inherits decisions that a strong designer already made and tested; a design built from rules alone is only as good as the rules.

This is step 3 of `SKILL.md`, for every new screen, page or redesign, before any tokens or layout. It replaces guessing.

## 1. Search

Write two or three queries that name the **topic + kind + component**, the way the gallery's designers title their work: `clinic app queue`, `patient booking app`, `hospital dashboard`; `api landing page`, `developer pricing page`; `villa booking website`, `hotel landing page`. One broad, one specific to the main screen, one for the hardest component.

```bash
node <this-skill-dir>/scripts/refs.cjs "clinic app" "patient booking app" "hospital queue dashboard" --n 12 --out .refs
node <this-skill-dir>/scripts/refs.cjs --site https://linear.app --site https://stripe.com/payments --out .refs   # real sites as web references
```

Each query saves the twelve most popular Dribbble shots for those words, an `index.md` with their titles and links, and a `board.png` contact sheet. `--site` saves a live site's first screen and full page.

Where to look by kind (open these with `--site` to capture a gallery page, then follow the strongest entries with `--site` again):

| Kind | Galleries that work without a login | Exemplary live sites |
|:---|:---|:---|
| Phone apps | Dribbble (the script), mobbin.com (public pages) | the market leader of the category (for example the bank, ride or delivery app people already use) |
| Dashboards and SaaS product UI | Dribbble, saasframe.io | linear.app, vercel.com/dashboard marketing pages, stripe.com |
| Landing and marketing pages | godly.website, onepagelove.com, httpster.net, saaslandingpage.com | linear.app, vercel.com, stripe.com, raycast.com |
| Hospitality, editorial, portfolios | godly.website, httpster.net, onepagelove.com | aesop.com, the best hotel or restaurant site of the region |
| Government and public service | — | gov.uk, amsterdam.nl, hel.fi, designsystem.digital.gov |

If the network is unavailable, say so and fall back to the kits and directions in this skill.

## 2. Choose

Open `board.png` for each query, then open the full images that look strongest. Choose **two or three** references using these tests, in order:

1. **Same kind of thing.** A phone app for a phone app, a dashboard for a dashboard; same density and roughly the same content.
2. **Would rank among the popular shots of its category** in craft: clean alignment, a clear hierarchy, few sizes, restrained colour, real-looking content. Skip shots that rely on 3D clay figures, glassy blobs, fake device angles or a different product's photography; skip anything with the generated look (`critique.md`).
3. **Fits the brand and the people who use it.** A government clinic app is calm and legible, not a dental marketing poster.
4. **Different strengths.** One for the overall layout and type, one for the key component (the queue card, the booking flow, the stock list), one for colour and surface treatment.

Write one line per pick: what you take from it.

## 3. Measure them: the reference spec

A reference only helps if its numbers end up in the build. For the main reference of each screen (and the component references), crop the one screen you are using and measure it:

```bash
node <this-skill-dir>/scripts/match.cjs blocks .refs/<query>/07.webp --crop x,y,w,h            # the layout: bands, cards and sections top to bottom
node <this-skill-dir>/scripts/match.cjs grid .refs/<query>/07.webp --crop x,y,w,h --step 20   # a pixel grid to read sizes from
node <this-skill-dir>/scripts/match.cjs palette .refs/<query>/07.webp --crop x,y,w,h          # colours and their share of the area
node <this-skill-dir>/scripts/icons.cjs board --color <brand hex>                              # icon styles to hold beside the reference's icons
```

Start with the **slice list**: from `blocks`, write every block of the screen top to bottom, what it holds and its height ("0–393 teal header with a wave pattern: greeting row, active-queue card in translucent white with a white inner card; 393–445 search field overlapping the header edge; 455–505 teal banner; 520–610 five plain icons with two-line labels; …"). The build has the same blocks, in the same order, at the same heights, filled with this product's content. A reference block with no content to match gets the product's nearest equivalent (a search field becomes "Cari dokter atau poli", an event rail becomes health articles); drop one only when the product truly has nothing like it, and say so.

Convert pixels to CSS px with the scale (the screen's width in the image ÷ 375 for a phone, ÷ 1440 for a desktop page) and write a **reference spec** table before writing any CSS. Every row is a number, never an adjective:

| Measure | Reference | Build |
|:---|:---|:---|
| Screen side padding | 20 | |
| Header height, title size / weight | 56, 20/600 | |
| Card padding, radius, border, shadow | 16, 20, none, 0 8 24 rgba(…, .08) | |
| Gap between cards / between sections | 12 / 28 | |
| List row height, avatar size | 64, 44 | |
| Key figure size / weight | 40/600 | |
| Body / caption sizes | 15 / 13 | |
| Button height, radius, label size | 52, 26 (pill), 16/600 | |
| Chip height, radius | 36, 18 | |
| Icon size and stroke | 22, 1.75 | |
| Canvas, surface, text, accent colours and their area | #F7F7F5 55%, #FFFFFF 30%, #16181D, #D9F99D 4% | |
| Texture: surface treatment | flat white cards on a tinted canvas, no borders | |
| Gradient and shading | header #0A6A84 → #03566A top to bottom, a faint wave line pattern at 8% white; cards flat | |
| Overlays and translucency | active card white at 14% with a 1px white 20% border, inner card solid white | |
| Shadow per elevation | cards 0 4 16 teal-900 at 6%; search field 0 6 20 at 8%; nav none | |
| Typeface and character | geometric sans, round single-storey a (Poppins or a close match) | |
| Weights and case by role | greeting 600 / sub 400; section titles 600; labels 500; nothing in caps | |
| Text colours | white 100% / 70% on the header; #1B1F24 titles, #6B7280 secondary | |
| Icon style | outline, 1.75 stroke, round ends, in the accent colour; clinics duotone on a tinted circle 52 | |
| Icon containers | quick actions none; categories circle 52 at accent 8% | |

Read every row from the image, not from habit:

- **Gradient and shading:** run `palette` on a thin crop at the top and at the bottom of each coloured band to get its stops, and note the direction. Note any pattern (waves, rings, noise, a photo behind a tint) and how strong it is. A flat band stays flat; a gradient band gets the same stops with the brand's hue.
- **Shadow:** zoom into the edge under a card: how far the shadow reaches (blur), how far it is offset down, and whether it is grey or tinted with the hue. Cards that separate only by a lighter fill have no shadow; do not add one.
- **Typeface:** name the character (geometric with round letters: Poppins, Urbanist, Outfit; neo-grotesk: Inter, which also stands in for SF Pro; humanist or rounded: Nunito Sans, Manrope, DM Sans; display serif: Fraunces, Playfair) and pick the closest Google Font. Dribbble shots often use SF Pro, Gilroy, Satoshi or Circular, which are not free: use Inter for SF Pro, Plus Jakarta Sans or Urbanist for Gilroy, Manrope or Outfit for Satoshi, DM Sans for Circular. Match the weights by role, not one weight everywhere; a product with its own font keeps it at the reference's weights and sizes.
- **Icons:** the style (outline, bold, filled, duotone, two-tone, 3D), stroke weight, round or sharp ends, colour, and the container (none, tinted circle, rounded square, solid). Put `icons.cjs board` beside the reference and pick the closest set; get the icons with `icons.cjs find` and `icons.cjs sprite`. One style per role, as in the reference (navigation icons and category icons are often different styles).

Then fill the **Build** column with the values you will use: the reference's, with the brand colour in the accent's place and the accessibility minimums from `spec.md` (44px targets, 16px inputs, 4.5:1 text) where the reference falls below them.

## 4. Slice

Build each screen from the reference spec, not from memory:

- **Use the measured values** for paddings, gaps, heights, radii, type sizes and weights, borders and shadows. Put them in the tokens (the kit's variables or the project's theme) so every screen uses the same ones.
- **Match the colour proportions and tone:** the canvas, surfaces and accent at roughly the reference's shares of the area. The brand replaces the reference's accent at the same area **and the same tone**: if the reference's header is a deep, muted teal (L38, low chroma), the build's header is a deep, muted version of the brand (the `palette.cjs` step closest in lightness, with less chroma), not the bright brand blue. The exact brand colour stays on the logo and the primary button. `compare` checks the lightness and strength.
- **Match the layout:** the blocks of the slice list, in order and at their heights; overlaps as in the reference (a search field across the header edge, a card half over a band).
- **Match the texture:** if the reference has flat white cards on a tinted canvas with no borders, so does the build; if it has hairline lists and no cards, so does the build. Gradients, patterns, translucency and shadows as in the spec, not added and not dropped.
- **Match the type and icons:** the chosen typeface at the reference's weights, sizes and colours per role; the icon set whose style matches, in the reference's containers.
- **Re-create the signature components** in code, with real data, at the reference's size.
- Mix references by role (layout from one, a component from another), never by averaging them; each screen has one main reference.
- Never copy logos, illustrations, photographs, icons drawn by the designer, or the reference's text and brand.

## 5. Compare and iterate

Compare every main screen with its reference, side by side and by numbers:

```bash
node <this-skill-dir>/scripts/match.cjs compare .refs/<query>/07.webp index.html --crop x,y,w,h --width 375   # or --width 1440 for a page
```

It renders your screen beside the reference at the same width and compares colour (neutrals must match; the brand replaces the reference's accent at about the same area), layout (where the reference has a coloured band, card or section and yours does not, in px), gradients, and density (lines of content in the same height). It prints **RESULT: PASS** or **FAIL** with each difference and exits 1 on FAIL. Pass a screenshot of one screen with `--crop2` when your page shows several screens in device frames.

The screen is not done until:

- `compare` prints **PASS**, or every remaining FAIL line is required by a floor (`spec.md`: 44px targets, 16px inputs, 4.5:1 contrast), the user's direction or the product's content, and is listed with that reason in the handoff. "The skill's default is 20" is not a reason; the reference's value wins over defaults;
- looking at the comparison image, you can list **no visible difference** in what the numbers cannot see: typeface character and weights, icon style and containers, shadow softness and tint, gradients, patterns and translucency, padding, radius and border. Write the differences as a list ("icons outline 1.5 vs the reference's duotone", "shadow grey vs teal-tinted", "title 600 vs 700"), fix them, and compare again. Two or three rounds is normal; one round is never enough.

In the handoff, include the slice list, the reference spec table, the final `compare` result and image for the main screen, any deviations with their reasons, and the references' links.
