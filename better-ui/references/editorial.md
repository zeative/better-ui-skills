# Showcase sites: portfolios, studios, restaurants, fashion, events, personal sites

Some sites exist to present work or a mood, not to sell software or run a task. Their bar is different, and almost the opposite of a product page: the best ones have very little interface. Applying landing-page furniture to them (pill navigation, feature tiles, three pricing cards, an accordion, rounded cards with glows) is the fastest way to miss. Take the composition from the strongest references of the kind (`references.md`); the rules below are the defaults.

Contents: what the bar looks like · the image leads · typography · composition · colour and finish · sections, re-set · when you have no photographs · phone

## What the bar looks like

- **The work is the design.** One or two large, art-directed images lead each screen, full-bleed or nearly so, and the interface exists to frame them.
- **Editorial typography with extreme scale or contrast:** display type as wide as the viewport, or a refined high-contrast serif, usually with one counter-voice (a script, an italic, tiny mono or caps labels).
- **A near-monochrome interface** (white, black or a deep dark) so the imagery carries the colour. At most one small accent.
- **Very little chrome:** no card stacks, heavy radii or glows. Structure comes from hairlines, crop marks, bracketed or numbered labels and generous white space.
- **Sparse, confident composition:** few elements per screen, asymmetric placement, type overlapping or interlocking with imagery, one clear focal point.
- **Depth from the images themselves** (light, blur, grain), not from drop shadows.
- **A signature detail used once, sparingly.** A scale bar, a seating chart, a set of coordinates, a stamp. Repeated on every tile it becomes a gimmick.

## The image leads

- Open with one dominant image and one typographic gesture. Not a split layout of headline, paragraph, two buttons and a row of trust widgets.
- Show fewer, larger pieces. A work index of six images at different sizes, some full-bleed and some with wide margins, beats twelve equal tiles with borders, pills and captions.
- Vary the crop and scale deliberately: a full-width landscape, then two portraits side by side, then a small detail with a lot of space.
- Captions are tiny and quiet: a title, a place, a year, set in small caps or mono.
- Sequence like a picture editor: wide, close, detail, pause.

## Typography

- Let one line be enormous: `font-size: clamp(64px, 14vw, 240px)`, tight tracking, set as wide as the page or cropped at its edge. Let it overlap the lead image where the image is calm.
- Pair it with a counter-voice used once or twice: an italic serif word, a script signature, a line of small mono caps.
- Everything else is small and calm: 14 to 17px text, 11 to 12px labels.
- Vary the headline treatment between sections. The same two-line formula with the last word in the accent, repeated six times, reads as a template.

## Composition

- Asymmetry and air. Leave large areas empty on purpose; place elements off-centre; let an image run off one edge.
- A simple, strict grid (12 columns, hairline gutters you can sense) and then one or two things that break it.
- Navigation is minimal: a name or mark, three or four words, maybe an index number. No pill bars, no primary button shouting in the corner. A quiet "Enquire" is enough.
- One idea per screen. If a screen has more than about four elements, remove some.

## Colour and finish

- Interface colours: paper white or near-black, ink, one mid grey, and one accent used in small touches. Large fields of saturated colour compete with the work.
- Square or barely eased corners. Hairlines instead of boxes. No glows, no gradient washes behind content, no shadowed cards.
- Texture can come from grain over images, a paper tone, a fine rule, registration or crop marks.
- Hover and transitions are slow and soft: an image easing in scale by 2 to 3%, a caption sliding in, a cursor label. Nothing bouncy.

## Sections, re-set

Use what the site needs, but set it as editorial content, not as product-page components:

- **Work index:** large images with tiny captions; or a typographic list of project names where each reveals its image.
- **About:** a portrait, three or four sentences in a narrow column, a few facts as a ruled list (based in, since, shoots with, languages).
- **Services or packages:** a simple ruled table or price lines ("Tasting menu · seven courses · 85"), not three tiered cards with tick lists and a highlighted plan.
- **Process or a day in the life:** a horizontal sequence of images with times, used once.
- **Words from clients:** one or two quotes set large in the serif or italic voice, with a name. No star rows, no avatar stacks.
- **Questions:** a plain numbered list of questions and answers, all visible, in two columns. Not an accordion of rounded chips.
- **Contact:** an email address set large, a short form with underlined fields, availability stated as a sentence.
- **Footer:** the name once more, large; location and coordinates; social links as words.

## When you have no photographs

For a photographer, a restaurant, a fashion label or a property, the design depends on images you were not given. Do not let that turn the page into an illustrated product page.

Use real photographs from Unsplash, whose licence allows free use and serving straight from its CDN: `https://images.unsplash.com/photo-<id>?w=1600&q=75&auto=format&fit=crop` (a smaller `w` for thumbnails). Choose pictures of the actual subject (the rice terrace, the pool at dusk, the plated dish), one consistent light and grade across the page, and no identifiable people presented as real guests or customers. After rendering, open the screenshots and check that every image loaded and shows what its caption says; replace any that fail or show the wrong thing. In the handoff, say the photos are stand-ins from Unsplash to be replaced with the client's own.

Only when no network is available, fall back to placeholders:

- Build every picture as a real image slot (`<img>` or a background with a fixed aspect ratio and `object-fit: cover`, with alt text) so the layout is true to the final thing.
- Fill each slot with a quiet, art-directed placeholder in the palette: a tonal gradient with grain suggesting light and horizon, or a restrained drawn scene. Keep placeholders subordinate and consistent; they stand in for photographs, they are not the showpiece.
- Put the design effort where it will survive the swap: the crops and sizes, the sequence, the typography interlocking with the image, the captions.
- In the handoff, list each slot with its aspect ratio and suggested content, and say plainly that the page will not reach its intended quality until real photographs are in.
- Use the user's own images whenever they are provided. Never take photographs from other websites; Unsplash is the exception because its licence allows it.

## Phone

Images go full width, one per screen, with captions beneath. The giant line of type stays giant: let it wrap to two or three lines at the width of the screen. Navigation becomes the name and a single "Menu" word. Keep the air: do not compress the spacing to fit more in.
