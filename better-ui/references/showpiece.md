# Building the showpiece and rich visuals in code

Everything here is made with HTML, CSS and inline SVG, so it needs no image files and stays sharp at any size. The recipes are starting points: adapt colours to your tokens and fill them with this product's content.

Contents: keep it real · the rule of detail · surfaces with material · a rendered object · the app summary card · product mock · floating detail cards · atmosphere · charts · avatars and people · product thumbnails · icons and icon chips · empty-state illustration · logos and proof · frames · on a phone

## Keep it real

Every visual here should look like something a real product would show. No invented props, metaphor objects or textures: the visual moments come from the product's own content (its figures, its items, its interface) drawn cleanly. The one exception is a rendered object that *is* the thing a figure counts (see below). Atmosphere belongs on landing pages, not inside product UI.

## The rule of detail

A visual reads as real when it has the density of a real thing. Count the distinct designed pieces in your showpiece: a navigation with an active item, a title, a control row, four figures with deltas, a chart with grid, axis and a highlighted point, five table rows each with an avatar, a name, a figure and a status pill. That is thirty-plus pieces, and that is the level to work at. Five grey bars is a wireframe.

Use the product's real nouns and plausible numbers. Vary the content: different names, different lengths, different statuses.

## Surfaces with material

The difference between a flat template and a screen that looks made is often a few quiet layers on each surface. Use them on cards, the sidebar, inputs and the active navigation item, all from one neutral:

```css
/* dark, graphite */
.card { background: linear-gradient(180deg, #1b1b1d, #161618); border: 1px solid rgba(255,255,255,.07);
  border-radius: 16px; box-shadow: inset 0 1px 0 rgba(255,255,255,.05); }
.nav a[aria-current] { background: linear-gradient(180deg, #2a2a2d, #222225); border: 1px solid rgba(255,255,255,.08);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.07), 0 1px 2px rgba(0,0,0,.4); border-radius: 10px; }
.kbd { font: 500 11px/1 var(--mono); padding: 4px 6px; border-radius: 6px; background: #232326;
  border: 1px solid rgba(255,255,255,.08); box-shadow: inset 0 -1px 0 rgba(0,0,0,.5); }
/* light */
.card { background: linear-gradient(180deg, #fff, #fcfcfb); border: 1px solid #ebebe8;
  box-shadow: inset 0 1px 0 #fff, 0 1px 2px rgba(20,20,20,.04), 0 6px 16px -8px rgba(20,20,20,.08); }
```

- Give the screen room: card padding 24 to 32 on desktop, navigation rows 36 to 40px with 16 to 18px icons, a page title of 28 to 40px. Generous, even padding is most of what reads as quality in a close-up.
- Section labels in the navigation ("Navigation", "Plans") in the mono, muted, sentence case. Counts right-aligned in the mono.
- One material for everything. Do not mix a glossy card with a flat one.

## A rendered object

When a figure counts a physical thing, an object drawn in CSS inside that figure's card is the strongest single moment a dashboard can have: payment cards beside spend or paid revenue, a receipt beside paid invoices, a ticket beside bookings, a parcel label beside shipments. Only for the thing the number counts, at most one per screen, and never as a sticker on an unrelated card.

```html
<article class="kpi">                 <!-- position: relative; overflow: hidden -->
  <p class="label">Paid this month</p><p class="fig">$48,210</p><p class="meta">+12% vs last month</p>
  <div class="obj" aria-hidden="true"><div class="pcard back"></div><div class="pcard"><i class="chip"></i><span class="num">•••• 4821</span></div></div>
</article>
```

```css
.obj { position: absolute; right: -28px; top: 50%; width: 190px; height: 120px; transform: translateY(-50%) rotate(-9deg); }
.pcard { position: absolute; inset: 0; border-radius: 14px;
  background: linear-gradient(135deg, #3b3b3f 0%, #1c1c1f 48%, #2b2b2f 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.16), inset 0 -1px 0 rgba(0,0,0,.5), 0 20px 30px -14px rgba(0,0,0,.7); }
.pcard::after { content: ""; position: absolute; inset: 0; border-radius: inherit;
  background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,.09) 46%, transparent 62%); }   /* sheen */
.pcard.back { transform: translate(26px, -24px) rotate(8deg); filter: brightness(.75); }
.chip { position: absolute; left: 18px; top: 40px; width: 30px; height: 22px; border-radius: 5px;
  background: linear-gradient(135deg, #e4e4e4, #9b9b9b); }
.num { position: absolute; right: 18px; bottom: 16px; font: 500 11px/1 var(--mono); letter-spacing: .1em; color: rgba(255,255,255,.7); }
```

- The card's own edge crops the object, so it reads as sitting in the card, and the text keeps the left 55 to 60% clear. Check that the object covers nothing written. Keep it to about 40% of the card's width; most of it visible, one corner cut by the edge.
- Make it out of a real material, not the brand colour: graphite or black metal, brushed silver, frosted white plastic, kraft paper. A flat purple or blue rectangle reads as a sticker however it is rotated, and that holds on a brand-coloured card too: put a black or silver object on it, never one in the card's own colour. The brand can appear as a small mark on the object. Real material is several layers: a base gradient with a light and a dark side, a diagonal sheen, a 1px light edge on top and a dark edge below, and a soft shadow that falls away from the light.
- Light, shadow and a slight rotation are what make it real; a flat rectangle is a sticker. Draw details as shapes (a chip, a masked number, a network mark of two circles), never real brand logos.
- A receipt: off-white paper with a zigzag or perforated edge (`clip-path` polygon), mono lines for items and total, a small "Paid" mark, a soft shadow, rotated 3 to 6 degrees.

## The app summary card

The main visual moment of most mobile apps and many dashboards: one card near the top that summarises today or this period.

- **A neutral surface, not a block of colour.** A white card on a light canvas (or the raised surface on a dark one), radius 20 to 24, padding 20 to 24. It leads by size and content: a small label ("Total balance", "Today"), the key figure at 32 to 40px weight 600, a secondary line or a delta pill.
- One clean visual inside it, and that is where the colour goes: a progress ring, an area chart, a row of seven day dots or a segmented progress bar drawn in the brand colour. The colour sits in the data, not under the text.
- A card filled with the brand colour or near-black is allowed only when it is compact (a pill-sized status card, a small tile, a payment card object), never for a block taking a third of the screen. Large saturated or dark blocks on a light screen are what makes a screen feel loud.
- Optionally two or three quick actions as round icon buttons along the bottom (Send, Add, Transfer), or a pair of mini stats separated by a hairline.
- A subtle radial gradient or a few large, faint circles in the corner of the fill are common and fine; no textures or illustrations.
- One such card per screen. The rest of the screen is the same neutral cards on the canvas.

## Product mock

The standard hero visual: the product's own interface, built for real.

```html
<div class="mock">
  <div class="mock-bar"><span class="dots"><i></i><i></i><i></i></span><span class="mock-url">app.product.com/overview</span></div>
  <div class="mock-body">
    <aside class="mock-nav"> …logo, 5-6 nav items with icons, one active… </aside>
    <main class="mock-main"> …header row, KPI tiles, chart, table… </main>
  </div>
</div>
```

```css
.mock { border-radius: var(--r-lg); background: var(--surface); border: 1px solid var(--line); overflow: hidden;
  box-shadow: 0 1px 1px rgba(16,24,40,.04), 0 12px 24px -8px rgba(16,24,40,.10), 0 40px 80px -24px rgba(16,24,40,.22); }
.mock-bar { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-bottom: 1px solid var(--line); background: var(--surface-2); }
.dots i { display: inline-block; width: 9px; height: 9px; border-radius: 50%; background: var(--line); margin-right: 5px; }
.mock-body { display: grid; grid-template-columns: 180px 1fr; min-height: 420px; }
.mock-main { padding: 18px; display: grid; gap: 14px; font-size: 12px; }
```

- **Size it generously.** On desktop the mock should be at least 560px wide, and is often the widest thing on the page. Type inside it can be 11 to 13px; it is an illustration of an interface, and density makes it convincing.
- **Let it bleed.** Crop the mock at the bottom of the hero or let it overlap into the next section, and fade the cut edge: `mask-image: linear-gradient(#000 70%, transparent)`.
- **Give it an angle only if the direction wants it.** A slight tilt (`transform: perspective(2000px) rotateX(6deg)`) can add drama; flat and frontal is usually cleaner.
- **Show the best moment**, the result the buyer wants: the delivered order, the full board, the finished report. Not the settings page.
- Not every product is a dashboard. A document, a message thread, a card, a ticket, a player, a map or a receipt can be the mock. Build the thing the product is about.

## Floating detail cards

Two to four small cards lifted out of the product, overlapping the mock's edges. They add depth and let you spotlight the most persuasive details.

```css
.hero-visual { position: relative; }
.float { position: absolute; background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-md); padding: 12px 14px;
  box-shadow: 0 2px 4px rgba(16,24,40,.06), 0 18px 40px -12px rgba(16,24,40,.25); }
.float.a { left: -36px; top: 22%; transform: rotate(-2deg); }
.float.b { right: -28px; bottom: 16%; transform: rotate(1.5deg); }
```

- Each card carries real micro-content: a notification with an avatar and a time, a figure with a sparkline and a delta badge, an avatar stack with a count, a status change, a toggle, a tiny progress ring.
- Offset them clearly past the edge of the mock (24 to 48px) so the overlap reads as intentional. Rotate by at most 3 degrees. Give them a stronger shadow than the mock.
- **Overlap margins, not content.** A floating card, a stamp or a second object may sit over an empty corner, a border, or a low-information strip. It must never cover the names, figures or chart marks that make the visual convincing. After rendering, look at each overlap: can you still read everything underneath that matters?
- Different sizes and shapes. Three identical floating cards look like a template.
- A thin connecting line or a dot on the mock where the card "comes from" ties them together.

## Atmosphere

The space behind the showpiece is designed, not a flat fill. Combine two or three of these, tuned to the direction:

```css
/* colour blooms */
.atmo::before { content: ""; position: absolute; inset: -20% -10% auto; height: 80%; z-index: -1; pointer-events: none;
  background: radial-gradient(40% 50% at 25% 35%, var(--bloom-1), transparent 70%),
              radial-gradient(35% 45% at 75% 25%, var(--bloom-2), transparent 70%),
              radial-gradient(30% 40% at 55% 70%, var(--bloom-3), transparent 70%); filter: blur(10px); }
/* grid that fades out */
.grid-bg { background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 48px 48px; mask-image: radial-gradient(60% 60% at 50% 30%, #000, transparent); }
/* concentric rings */
.rings { background: repeating-radial-gradient(circle at 50% 60%, transparent 0 119px, var(--line) 119px 120px);
  mask-image: radial-gradient(55% 55% at 50% 60%, #000 30%, transparent); }
/* dot grid */
.dots-bg { background-image: radial-gradient(var(--line) 1px, transparent 1.5px); background-size: 20px 20px; }
/* glow under an object */
.glow { box-shadow: 0 60px 120px -40px color-mix(in srgb, var(--accent) 55%, transparent); }
```

Keep atmosphere behind visuals and headings, never under paragraphs of body text. On dark directions add a vignette so edges fall away.

Make it strong enough to see. An atmosphere at 3% opacity is a flat fill. The showpiece should visibly sit in light: a bloom you can point at behind it, and a clear difference between the stage and the plain page around it. The product visual itself should stand off the ground (a lighter or darker chrome than the page, a crisp edge, a deep shadow), not dissolve into it.

## Charts

Charts are showpieces in dashboards and strong supporting visuals everywhere else. Draw them in SVG with `viewBox` and `preserveAspectRatio="none"` for the plot, HTML for labels.

**Area or line chart.** Smooth the path with cubic curves, fill with a vertical gradient, add dashed grid lines, y-axis ticks, x labels, and one highlighted point with a tooltip.

```html
<svg viewBox="0 0 600 220" class="chart">
  <defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="var(--accent)" stop-opacity=".28"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs>
  <g stroke="var(--line)" stroke-dasharray="3 5"><path d="M0 40H600M0 100H600M0 160H600"/></g>
  <path d="M0 150 C 60 140, 80 90, 140 100 S 240 150, 300 110 S 420 40, 480 60 S 560 90, 600 50 L600 220 L0 220Z" fill="url(#fill)"/>
  <path d="M0 150 C 60 140, 80 90, 140 100 S 240 150, 300 110 S 420 40, 480 60 S 560 90, 600 50" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="480" y1="60" x2="480" y2="220" stroke="var(--accent)" stroke-dasharray="2 4"/>
  <circle cx="480" cy="60" r="5" fill="var(--surface)" stroke="var(--accent)" stroke-width="2.5"/>
</svg>
```

Position the tooltip as an HTML element over the highlighted point: a small dark or white card with the value, the label and a delta.

**Bar chart.** Rounded tops (`rx`), generous gaps, muted bars with one highlighted bar in the accent (or a gradient or hatch pattern), value labels, faint grid. A second series can be a lighter tone behind.

**Donut and ring.** `stroke-dasharray` on a circle: `r=42`, circumference ≈ 264; a segment of 68% is `stroke-dasharray="180 264"`. Rotate -90 degrees to start at the top, use `stroke-linecap="round"`, put the big number in the centre.

**Sparkline.** A 80×28 polyline with no axes, coloured by direction, placed in a watchlist or table row where the trend is the point; not added to every KPI tile.

**Heatmap or calendar grid.** A CSS grid of small rounded squares in four or five tints of one hue.

Compute coordinates from your real sample data (a few lines of JS, or by hand) so the chart, the totals and the table agree. One main chart leads the screen; anything else that shows data is smaller and different in kind.

### Choosing the main chart

Decide by the data, not by habit:

- **A time series with more than seven points** (days of a month, weeks of a quarter): a smooth line or area, never bars. Compare it with the previous period as a dashed line, or mirror the previous period below the axis.
- **Seven or fewer discrete periods in a small chart** (days of a week in a tile): bars, with the previous period as ghost bars and the one that matters highlighted.
- **A split by category over time** (revenue by plan, traffic by channel): one smooth line per category in its own colour, with the same colour as a dot beside each category in the list or navigation.
- **A share right now:** a segmented bar or a ranked list with thin bars, not a donut.

Whatever the form, the main chart carries a comparison (previous period, target or average), one highlighted point with a tooltip, and mono axis labels.

A small helper draws smooth curves and the mirrored comparison from your data:

```js
// smooth path through [x, y] points (Catmull-Rom turned into cubic Bezier segments)
const smooth = (pts) => pts.reduce((d, p, i) => {
  if (i === 0) return `M${p}`;
  const p0 = pts[i - 2] || pts[i - 1], p1 = pts[i - 1], p3 = pts[i + 1] || p;
  const c1 = [p1[0] + (p[0] - p0[0]) / 6, p1[1] + (p[1] - p0[1]) / 6];
  const c2 = [p[0] - (p3[0] - p1[0]) / 6, p[1] - (p3[1] - p1[1]) / 6];
  return `${d} C${c1} ${c2} ${p}`;
}, '');

// this period above a centre axis, the previous one mirrored below it
function mirrored(svg, cur, prev, { w = 720, h = 320, pad = 16 } = {}) {
  const mid = h / 2, max = Math.max(...cur, ...prev);
  const x = (i, n) => (i * w) / (n - 1), y = (v) => (v / max) * (mid - pad);
  const up = cur.map((v, i) => [x(i, cur.length), mid - y(v)]);
  const down = prev.map((v, i) => [x(i, prev.length), mid + y(v)]);
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  svg.innerHTML = `
    <defs><linearGradient id="upFill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="var(--accent)" stop-opacity=".22"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs>
    <line x1="0" x2="${w}" y1="${mid}" y2="${mid}" stroke="var(--line)"/>
    <path d="${smooth(up)} L${w},${mid} L0,${mid} Z" fill="url(#upFill)"/>
    <path d="${smooth(up)}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/>
    <path d="${smooth(down)}" fill="none" stroke="var(--text-3)" stroke-width="1.5" stroke-linecap="round" opacity=".8"/>`;
}
```

Label the two halves in the mono ("Nov 1–16" above, "Oct 1–16" below) and put y-axis values on both sides of the axis. For categories, call `smooth` once per series and stroke each in its colour.

### Chart ideas that read as designed

Pick the form from the question the chart answers, then draw it with care. These are the forms good product shots use instead of the library default:

- **Mirrored comparison** (this period against the last): the current period above a centre axis in colour, the previous one mirrored below it in neutral greys, both with smooth curves and mono axis labels on each side. One glance shows growth and shape.
- **Series that match a legend elsewhere.** When the chart splits by category (plans, channels, regions), give each a colour and show the same colour as a dot beside that category in the navigation or the list next to it, so the screen explains the chart without a separate legend.
- **Ghost bars:** each current bar with the previous period as a neutral bar or outline behind it, the bar that matters in the accent with a value chip.
- **Bullet or target:** a bar against a target tick ("$48k of $60k goal"), for one figure with a goal.
- **Slope chart** for how a ranking or share moved between two dates; **small multiples** (the same tiny chart per category on one scale) instead of one chart with eight tangled lines.
- **Segmented bar** for share right now; **calendar heatmap** for daily activity; **waterfall** for how a total was built.

Drawing it well: smooth curves with cubic segments (Catmull-Rom or monotone), 2px strokes with round caps, a faint grid, mono labels in the tertiary tone, the leading series a little brighter or thicker. On dark themes a very soft bloom on the lines of the main chart only (`filter: drop-shadow(0 0 6px color-mix(in srgb, currentColor 40%, transparent))`) is fine; never on chrome.

A landing page's product mock should contain at least one chart.

## Avatars and people

Real products show people as small circular avatars. Simple illustrated portraits look best in a showcase; initials on a light grey are also normal in real products. Pick one style per page.

- **Illustrated portrait** (works from 28px to 96px): a tinted circle, shoulders, a head, and a hair shape. Vary background hue, skin tone, hair colour and hair shape per person so no two match.
  ```html
  <svg viewBox="0 0 40 40" class="av" style="--bg:#DCEEFF;--skin:#E8B894;--hair:#2B2118;--top:#2F6FED">
    <defs><clipPath id="c"><circle cx="20" cy="20" r="20"/></clipPath></defs>
    <g clip-path="url(#c)"><rect width="40" height="40" fill="var(--bg)"/>
      <path d="M6 42c0-9 6-13 14-13s14 4 14 13z" fill="var(--top)"/><rect x="17" y="23" width="6" height="7" rx="3" fill="var(--skin)"/>
      <circle cx="20" cy="17" r="7.5" fill="var(--skin)"/>
      <path d="M12 17c-.5-6 3-10 8-10s8.5 3.5 8 9c-2-3-5-4.5-8-4.5s-6 2-8 5.5z" fill="var(--hair)"/></g></svg>
  ```
  Swap the last path for other hair shapes (a bob reaching the jaw, a top knot, a side sweep, a cap, a headscarf drawn as a path around the face) and reuse one `clipPath` for all avatars. Skin tones: `#F2D0B5 #E8B894 #C98E62 #A56E44 #7A4A2B`.
- **Avatar stack:** give each avatar a 2px ring in the surface colour and overlap by a quarter of its width (`margin-left: -8px` at 32px). Nothing inside may be clipped by its neighbour. End with a "+12" chip.
- Do not hotlink photos of real people.

## Product thumbnails

Lists of products, files, places or items need thumbnails. Draw small objects in SVG: three or four shapes, two tones of one hue plus a highlight, on a tinted rounded square.

```html
<!-- a bottle, 48×48 -->
<svg viewBox="0 0 48 48" class="thumb"><rect width="48" height="48" rx="12" fill="var(--t-bg,#DCEEFF)"/>
  <rect x="20" y="8" width="8" height="6" rx="1.5" fill="var(--t-2,#1A4F91)"/><path d="M18 18c0-3 2-4 2-4h8s2 1 2 4v20a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3z" fill="var(--t-1,#2F6FED)"/>
  <rect x="18" y="24" width="12" height="9" fill="#fff" fill-opacity=".9"/><path d="M21 17v22" stroke="#fff" stroke-opacity=".3" stroke-width="2" stroke-linecap="round"/></svg>
```

Every item gets a visibly different thumbnail. Changing only the tint of one repeated glyph reads as a placeholder, so vary the object too: its shape, its label design, a stripe, a cap, a size, a pattern. Five products should look like five products. Make thumbnails big enough to read (44 to 64px in lists, larger in feature spots). The same approach works for pouches, boxes, books, shoes, plants, documents, devices, playlists and map pins.

If the project already has real product photos or the user supplies images, use those instead: real imagery beats illustration. The same holds if your environment has an image-generation tool: product shots, portraits and hero scenes made with it, saved as files and graded to the palette, close the one gap that drawn vectors cannot (the top shots in every category use photographs, renders or bespoke illustration). Say in the handoff which images were generated.

**When imagery is the product** (a photographer's portfolio, food, travel, property, fashion), the design depends on photographs you do not have. Build every picture as a real image slot (`<img>` or a background with fixed aspect ratio, `object-fit: cover`, and alt text) and fill it with a real photograph of the subject from Unsplash (see `editorial.md`, When you have no photographs), falling back to an art-directed placeholder only without a network. Design the frames, crops, captions and sequencing as a picture editor would, and tell the user in the handoff which images are stand-ins and at what sizes to replace them. Never take photographs from other websites; Unsplash is the exception because its licence allows it.

## Icons and icon chips

- Use one inline SVG set: 24×24 viewBox, `fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"`. Draw the dozen you need; keep them simple and consistent.
- An **icon chip** is the workhorse of rich UI: a 36 to 44px rounded square in a neutral grey, with the icon in the text colour or its category colour.
  ```css
  .chip-ic { width: 40px; aspect-ratio: 1; border-radius: 12px; display: grid; place-items: center;
             background: color-mix(in srgb, var(--c) 14%, var(--surface)); color: var(--c); }
  ```
- Give categories different hues (`--c`) on the icon or a small dot so a list is easy to scan; the chip itself stays neutral. No pastel square behind every item.
- In consumer apps, a native or 3D emoji on the same neutral chip is a common, friendly alternative for item icons (habits, categories, exercises). One approach per app.
- Navigation items, KPI tiles, feature rows, list items and empty states all take an icon.

## Empty-state illustration

One simple, flat spot illustration (120 to 180px) for an empty state or onboarding: a few rounded shapes in the brand colour and its tints, plus one or two neutral shapes. No characters with faces, no scenes on the main screen.

## Logos and proof

- A brand wordmark for the product: the name in the UI font at weight 600 with a small glyph (a simple geometric mark in the accent) beside it. A plain-text name in the corner is a missing logo.
- A "trusted by" strip, when the page calls for one: five or six fictional company wordmarks drawn as type plus a simple glyph, all in `--ink-3` at one height, evenly spaced. Never real brand logos.
- Testimonials: a card with a quote, an illustrated portrait or gradient avatar, a fictional name and role, perhaps a small result figure. Mix sizes; make one of them large.
- Ratings and counts: a badge with stars or an avatar stack and a number. Mark all of these as placeholder in your handoff.

## Frames

- **Phone frame** for app visuals on a marketing page:
  ```css
  .phone { width: 280px; aspect-ratio: 9/19.5; border-radius: 44px; padding: 10px; background: #0b0b0f;
           box-shadow: inset 0 0 0 2px #2a2a33, 0 40px 80px -30px rgba(0,0,0,.5); }
  .phone > .screen { height: 100%; border-radius: 34px; overflow: hidden; background: var(--bg); position: relative; }
  .phone > .screen::before { content: ""; position: absolute; left: 50%; top: 8px; width: 34%; height: 22px; border-radius: 12px; background: #0b0b0f; transform: translateX(-50%); z-index: 2; }
  ```
- **Browser frame**: see the product mock above.

## On a phone

Recompose, do not scale down. Options: show a cropped, full-width slice of the mock with one floating card over it; swap a wide app window for a phone-shaped view of the same product; stack the floating cards as a short horizontal row beneath. Type inside visuals must stay legible (10px minimum). The showpiece should still be the most striking thing on the first two screens.
