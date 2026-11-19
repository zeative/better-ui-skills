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

## 3. Break them down

For each chosen reference, write a short breakdown you will build from:

- **Layout:** grid, margins, how the first screen is divided, what leads.
- **Type:** the faces (or the closest Google Fonts), the sizes and weights of title, body and small text, the line heights and tracking.
- **Colour:** canvas, surfaces, text tones, the accent and where it is used, how much of the screen it covers.
- **Shape and depth:** radii, borders, shadows, how cards and lists are separated.
- **Signature components:** the two or three pieces that make it look made (a large queue number, a segmented progress, a chart style, a bottom sheet).

## 4. Slice

Build each screen by re-creating those decisions with this product's content:

- Match the reference's **proportions and spacing rhythm** closely: the hero's height, the gutter, the gap between groups, the size of the key figure relative to the screen. Measure them from the image instead of approximating.
- Match the **type scale and weights**, the **radius and shadow** language and the **colour proportions**; put the product's own brand colour where the reference put its accent.
- Re-create the **signature components** in code, with real data.
- Mix references by role (layout from one, a component from another), never by averaging them.
- The design tokens follow the references: set the kit's variables (fonts, radii, shadows, neutrals) to the values you measured, or start from the closest kit in `kits.md` and adjust it. The spec in `spec.md` still holds for accessibility minimums (tap targets, body size, contrast).

What is never copied: logos, illustrations, photographs, icons drawn by the designer, the reference's text and its brand name. The result must be this product's screen built to the reference's standard, not a clone of someone else's shot.

## 5. Compare and iterate

Render your screen and put it beside the references (open both). Ask:

- Does it sit among them, or is it visibly weaker? Name the exact difference: a size, a spacing, a weight, a radius, a colour proportion, a missing detail.
- Fix the differences in that order and render again. Two or three rounds is normal.

In the handoff, list the references used with their links and what each contributed.
