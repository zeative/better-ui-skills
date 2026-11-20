# Commerce: product pages, listings and the bag

Shops are the one kind of web page where the conventional pattern is a feature: people buy faster on a page that works the way every good shop works. The difference between a generated shop and a good one is not the layout but the **photography, the buy box done precisely, and a brand voice carried around it**. Aesop, Allbirds, Glossier, Teenage Engineering, Arc'teryx, Kith, SSENSE and Apple all use the same anatomy and look nothing alike. Use the anatomy below as the checklist; take the visual treatment from the references (`references.md`).

Contents: the product page · imagery · the buy box · below the fold · listings · the bag · direction · what reads as generated

## The product page

Desktop, the modern standard:

- **Gallery left, about 60% of the width; buy box right, about 40%, sticky** (`position: sticky; top: 96px`) while the gallery scrolls past as a **vertical stack of large images** (two columns of images is fine for apparel). Thumbnail strips and a single small carousel read as dated.
- Gallery images edge to edge in their column, no card, no border, all one aspect ratio (4:5 for apparel and shoes, 1:1 for objects), on the same neutral ground (a warm or cool grey a step off the canvas), with a short caption or angle label only if useful.
- A breadcrumb above, small. The announcement bar (delivery, returns) at most one line.

Phone: the gallery as a full-width swipe with a dot or count indicator (1 / 6), then the buy box, with the add-to-bag button sticky at the bottom once the main one scrolls away.

## Imagery

Product photographs are the page. Without them a shop looks like a wireframe.

- Use real photographs from Unsplash: choose shots **without a visible real brand logo**, on plain or simple grounds, in one consistent light and colour across the gallery and the listing. Several angles of one product are rarely available, so combine one hero shot of the product, a close detail, a shot in use (worn, on a desk, in a kitchen), and a material or texture close-up; say in the handoff which images are stand-ins.
- Never a drawn SVG of the product as the main image, and never an emoji. A rendered illustration is the fallback only without a network.
- Colour swatches show the product in that colour (a small image or a two-tone chip), not a plain dot when the product has several colours on it.

## The buy box

In this order, each part exact:

1. Small category or collection label (caption size), the **product name** (title size, in the page's display face if it has one), and the **price** at the same weight or one step down, tabular; sale price with the old price struck through in text-2.
2. Rating as stars plus a count that links to the reviews ("4.6 · 212 reviews").
3. One or two lines that say what it is and why ("A 1978 trainer rebuilt for all-day wear: suede overlays, recycled mesh, a gum rubber sole").
4. **Colour:** the chosen colour named ("Colour: Chalk / Moss"), swatches as images.
5. **Size:** a grid of equal buttons (44 tall at least), the selected one filled, sold-out sizes struck through and disabled, low stock noted under the size ("2 left"); a size-guide link and a fit note from reviews ("Runs true to size").
6. **Add to bag:** one full-width primary button (52 tall on phones, 48 on desktop) that says the price when a size is chosen ("Add to bag · $128"); a wishlist icon button beside it. Choosing no size and pressing it shows an inline message at the size grid, not an alert.
7. **Delivery and returns** as two or three short lines with small icons: the delivery date for this postcode ("Arrives Thu 16 May"), free returns, warranty.
8. Optional: pay-in-4 line, pickup in store.

## Below the fold

- **The story:** one editorial section, a large image beside two or three short paragraphs about the material, the making or the idea. This is where the brand's voice lives.
- **Details:** materials, care, dimensions and fit as an accordion or a two-column spec table with hairlines, not a wall of bullets.
- **Reviews:** a summary with the average, the count, a distribution bar per star and a fit slider (small · true · large); then real-sounding reviews with name, size bought, date and a short title. Filter chips (with photos, by size) when there are many.
- **Pairs well with / complete the look:** a horizontal scroll-snap rail of four to eight products, each card the image, name and price, with the same image ground as the gallery.

## Listings (category pages)

- A grid of product cards: image (same ratio and ground for all), name, price, colour count or swatches; a second image on hover. Three or four columns on desktop, two on phones. No borders, no shadows, no "Add to cart" button on every card.
- Filters in a left column on desktop (or a filter bar with dropdowns), a sheet on phones; active filters as removable chips above the grid; sort on the right; the count of results.
- An editorial tile or a campaign image every few rows breaks the grid without becoming an ad.

## The bag and checkout

- The bag as a side sheet on desktop and a full sheet on phones: line items with image, name, colour and size, quantity stepper, price; a free-delivery progress line ("$22 away from free delivery"); subtotal; one primary checkout button; payment marks small.
- Checkout as few steps as possible on one page (contact, delivery, payment) with an order summary column; express pay buttons at the top.

## Direction

The anatomy above is the default checklist; the look comes from the references. Choose a direction with the method in `SKILL.md` that fits the brand and carry it through the header, the type, the image ground, the story section and the footer:

- **Editorial serif** for beauty, fashion, home and food (Aesop): serif product names, warm paper ground, long story sections.
- **Swiss catalogue** for hardware, audio, furniture and tools (Teenage Engineering): mono labels, numbered specs, cut-out products on grey, one signal colour.
- **Clean and bright** for sport and everyday (Allbirds, Nike): a big sans, white or one tint, energetic photography.
- **Dark precision** for tech and audio: near-black, products lit on dark, hairline specs.

## What reads as a generated shop

- A drawn or emoji product image; thumbnails on the left of a small carousel.
- Every card with a border, a shadow and its own "Add to cart" button.
- Sizes as a dropdown; colours as plain dots; no stock or fit information.
- A buy box with no delivery date and no returns line.
- Reviews as three cards with five stars and no summary.
- "You may also like" as a static grid of four identical cards.
- The page identical to every other shop: no story section, no voice.
