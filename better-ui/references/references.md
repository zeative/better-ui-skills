# Start from references, then slice

Designers do not start from a blank file. They collect references for the exact thing they are making (a clinic queue screen, a pricing table for an API product, a hotel booking hero), pick the two or three best, study how they are built, and then build their own screen to that standard. That last step is **slicing**: re-creating the composition, proportions, spacing rhythm, type scale and component shapes of the chosen references, piece by piece, for this product's content. A design built this way inherits decisions that a strong designer already made and tested; a design built from rules alone is only as good as the rules.

Do this before step 4 for every new screen, page or redesign. It replaces guessing.

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
node <this-skill-dir>/scripts/match.cjs grid .refs/<query>/07.webp --crop x,y,w,h --step 20   # a pixel grid to read sizes from
node <this-skill-dir>/scripts/match.cjs palette .refs/<query>/07.webp --crop x,y,w,h          # colours and their share of the area
```

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

Then fill the **Build** column with the values you will use: the reference's, with the brand colour in the accent's place and the accessibility minimums from `spec.md` (44px targets, 16px inputs, 4.5:1 text) where the reference falls below them.

## 4. Slice

Build each screen from the reference spec, not from memory:

- **Use the measured values** for paddings, gaps, heights, radii, type sizes and weights, borders and shadows. Put them in the tokens (the kit's variables or the project's theme) so every screen uses the same ones.
- **Match the colour proportions:** the canvas, surfaces and accent at roughly the reference's shares of the area; the brand colour replaces the reference's accent at the same strength and area.
- **Match the texture:** if the reference has flat white cards on a tinted canvas with no borders, so does the build; if it has hairline lists and no cards, so does the build.
- **Re-create the signature components** in code, with real data, at the reference's size.
- Mix references by role (layout from one, a component from another), never by averaging them; each screen has one main reference.
- Never copy logos, illustrations, photographs, icons drawn by the designer, or the reference's text and brand.

## 5. Compare and iterate

Compare every main screen with its reference, side by side and by numbers:

```bash
node <this-skill-dir>/scripts/match.cjs compare .refs/<query>/07.webp index.html --crop x,y,w,h --width 375   # or --width 1440 for a page
```

It renders your screen beside the reference at the same height and compares the palettes. The screen is not done until:

- every reference colour with 1.5% of the area or more is **match** or **close** in your build (or deliberately replaced by the brand colour at the same area), and no colour of yours covers 3% or more that the reference does not have, unless it is the brand;
- looking at the comparison image, you can list **no visible difference** in padding, gap, size, weight, radius, border, shadow or colour area. Write the differences you see as a list with numbers ("card padding 24 vs 16", "title 600 vs 700"), fix them, and compare again. Two or three rounds is normal.

In the handoff, include the reference spec table, the final comparison image for the main screen, and the references' links.
