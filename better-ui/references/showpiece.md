# Building the showpiece and rich visuals in code

Everything here is made with HTML, CSS and inline SVG, so it needs no image files and stays sharp at any size. The recipes are starting points: adapt colours to your tokens and fill them with this product's content.

Contents: the rule of detail · product mock · floating detail cards · atmosphere · charts · avatars and people · product thumbnails and objects · icons and icon chips · illustrated objects · illustration · logos and proof · frames · on a phone

## The rule of detail

A visual reads as real when it has the density of a real thing. Count the distinct designed pieces in your showpiece: a navigation with an active item, a title, a control row, four figures with deltas, a chart with grid, axis and a highlighted point, five table rows each with an avatar, a name, a figure and a status pill. That is thirty-plus pieces, and that is the level to work at. Five grey bars is a wireframe.

Use the product's real nouns and plausible numbers. Vary the content: different names, different lengths, different statuses.

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
/* grain: put on a fixed full-page pseudo-element */
.grain::after { content: ""; position: fixed; inset: 0; pointer-events: none; opacity: .05; mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
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

**Sparkline.** A 80×28 polyline with no axes, coloured by direction, placed in the corner of a KPI tile.

**Heatmap or calendar grid.** A CSS grid of small rounded squares in four or five tints of one hue.

Compute coordinates from your real sample data (a few lines of JS, or by hand) so the chart, the totals and the table agree. A dashboard should show at least three different chart forms; a landing page's product mock should contain at least one.

## Avatars and people

Initials on a coloured disc are the weakest avatar; a screen full of them looks unfinished next to work that uses portraits. Draw people.

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
- Initials are acceptable only as a fallback at very small sizes, each in a different hue.
- Do not hotlink photos of real people.

## Product thumbnails and objects

Lists of products, files, places or items need thumbnails. Draw small objects in SVG: three or four shapes, two tones of one hue plus a highlight, on a tinted rounded square.

```html
<!-- a bottle, 48×48 -->
<svg viewBox="0 0 48 48" class="thumb"><rect width="48" height="48" rx="12" fill="var(--t-bg,#DCEEFF)"/>
  <rect x="20" y="8" width="8" height="6" rx="1.5" fill="var(--t-2,#1A4F91)"/><path d="M18 18c0-3 2-4 2-4h8s2 1 2 4v20a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3z" fill="var(--t-1,#2F6FED)"/>
  <rect x="18" y="24" width="12" height="9" fill="#fff" fill-opacity=".9"/><path d="M21 17v22" stroke="#fff" stroke-opacity=".3" stroke-width="2" stroke-linecap="round"/></svg>
```

Every item gets a visibly different thumbnail. Changing only the tint of one repeated glyph reads as a placeholder, so vary the object too: its shape, its label design, a stripe, a cap, a size, a pattern. Five products should look like five products. Make thumbnails big enough to read (44 to 64px in lists, larger in feature spots). The same approach works for pouches, boxes, books, shoes, plants, documents, devices, playlists and map pins.

If the project already has real product photos or the user supplies images, use those instead: real imagery beats illustration.

**When imagery is the product** (a photographer's portfolio, food, travel, property, fashion), the design depends on photographs you do not have. Build every picture as a real image slot (`<img>` or a background with fixed aspect ratio, `object-fit: cover`, and alt text) and fill it with an art-directed placeholder scene in the page's palette, so the layout is true to the final thing. Design the frames, crops, captions and sequencing as a picture editor would, and tell the user in the handoff exactly which files to drop in and at what sizes. Never hotlink someone else's photographs.

## Icons and icon chips

- Use one inline SVG set: 24×24 viewBox, `fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"`. Draw the dozen you need; keep them simple and consistent.
- An **icon chip** is the workhorse of rich UI: a 36 to 44px rounded square in a tint, with the icon in the darker tone of the same hue.
  ```css
  .chip-ic { width: 40px; aspect-ratio: 1; border-radius: 12px; display: grid; place-items: center;
             background: color-mix(in srgb, var(--c) 14%, var(--surface)); color: var(--c); }
  ```
- Give categories different hues (`--c`) so a column of tiles or a list of habits is colourful with meaning.
- Navigation items, KPI tiles, feature rows, list items and empty states all take an icon.

## Illustrated objects

Thin line icons on tinted squares are the minimum. Where an item deserves presence (a category, a feature, an achievement, an empty state), draw a small **object** with some body to it instead.

**Draw it in the language of your idea.** This matters more than the technique. If the design is flat with thick outlines, the objects are flat with thick outlines. If it is lacquer, brass and wood, they are lacquer, brass and wood. If it is paper and ink, they are stamped or engraved. Glossy emoji-style stickers dropped into a design that has its own material are the most common thing that makes a strong concept look assembled from stock parts. One style, one lighting direction, one level of detail across every icon, object, avatar and chart on the screen.

Where the idea has no particular material, a soft dimensional style works: a filled shape with a gradient, a darker underside, a soft highlight and a contact shadow.

```html
<!-- an open book, 56×56, built from filled shapes -->
<svg viewBox="0 0 56 56" class="obj">
  <defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#E9E4F7"/></linearGradient>
        <linearGradient id="cv" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8B5CF6"/><stop offset="1" stop-color="#5B21B6"/></linearGradient></defs>
  <ellipse cx="28" cy="47" rx="19" ry="3.5" fill="#000" opacity=".12"/>
  <path d="M6 16c8-3 15-2 22 2 7-4 14-5 22-2v26c-8-3-15-2-22 2-7-4-14-5-22-2z" fill="url(#cv)"/>
  <path d="M9 14c7-2.5 13-1.5 19 2v25c-6-3.5-12-4.5-19-2z" fill="url(#pg)"/><path d="M47 14c-7-2.5-13-1.5-19 2v25c6-3.5 12-4.5 19-2z" fill="url(#pg)"/>
  <path d="M13 20c4-1 8-.5 11 1M13 25c4-1 8-.5 11 1M32 21c3-1.5 7-2 11-1" stroke="#B9AEDD" stroke-width="1.6" stroke-linecap="round" fill="none"/>
  <path d="M11 15.5c5-1.5 10-1 15 1.5" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".8" fill="none"/></svg>
```

- Four to eight shapes per object: body, underside or side, a detail or label, a highlight, a contact shadow.
- Every object in a set is a different thing (a book, a shoe, a droplet, a moon, a dumbbell, a leaf), not one glyph recoloured.
- Keep one lighting direction (top-left highlight, bottom shadow) across the set.
- Give the secondary surfaces the same finish as the hero device. A beautifully rendered centrepiece next to a flat gradient card with a default line chart looks half done: carry the material (its sheen, grain, edge, way of marking data) onto the other cards and charts.
- Use these at 40 to 72px on item cards and tiles, and larger (120 to 200px) as the centre of a hero card or empty state.
- Keep the simple stroke icons for navigation and small controls.

## Illustration

When a section needs more than UI:

- Compose with the product's own objects (see thumbnails) at a larger size, overlapping, with soft shadows, on a tinted panel with an atmosphere behind.
- Build "3D-ish" forms from gradients: a base gradient, a darker edge, a soft white highlight, a drop shadow.
- Abstract compositions must still mean something: a route with stops, a stack of documents, a network of nodes for integrations, rings for progress.
- For empty states and onboarding, one centred illustration (120 to 200px) plus a heading and an action.
- Emoji may add warmth as content in playful consumer directions, but they render differently on every platform; do not use them as the interface's icon system or as the only illustration.

## Logos and proof

- A brand wordmark for the product: the name in the display face with a small glyph (a simple geometric mark in the accent) beside it. A plain-text name in the corner is a missing logo.
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
- **Paper or card objects**: a slight rotation, a paper-toned fill, a warm layered shadow, and a second sheet peeking out behind.

## On a phone

Recompose, do not scale down. Options: show a cropped, full-width slice of the mock with one floating card over it; swap a wide app window for a phone-shaped view of the same product; stack the floating cards as a short horizontal row beneath. Type inside visuals must stay legible (10px minimum). The showpiece should still be the most striking thing on the first two screens.
