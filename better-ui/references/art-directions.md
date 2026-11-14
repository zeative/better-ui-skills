# Finish kits

A library of finish kits: each one is a coherent set of surface decisions (type pairing, shape and depth language, background atmosphere, token structure). A kit is **not** the design. The design is the one idea you found in SKILL.md step 3; the kit is how that idea gets finished. Shortlist three that fit the idea, let `scripts/deal.cjs` pick one, then replace its placeholder colours and devices with your idea's.

Used unchanged, any of these reads as a template. Reviewers recognise the stock versions immediately (a violet-to-pink gradient card, pastel tiles in five hues, a dark page with a green glow, cream with a serif headline).

Contents: how to choose · how to tune · the directions (`aurora`, `midnight`, `citrus`, `pastel`, `graphite`, `ivory`, `glass`, `mono`, `roast`, `candy`, `clinic`, `sunset`) · building your own

## How to choose

Match on audience and mood first, category second. A booking tool for a small studio can be `ivory`, `clinic`, `midnight` or `citrus` depending on whether it should feel premium, trustworthy, sharp or friendly. Shortlist three, with at least one that a competitor in the category would not pick, and deal. `aurora` and `ivory` are the two looks people most often recognise as machine-made (the blue-violet tech page, the cream page with a serif headline), so put at most one of them in a shortlist, and if it is dealt, tune it hard:

```bash
node scripts/deal.cjs "Product name" ivory clinic citrus
```

| Direction | Feels like | Strong for | Weak for |
|---|---|---|---|
| `aurora` | bright, modern, optimistic tech | SaaS, AI, productivity, B2B | craft, food, anything earthy |
| `midnight` | sharp, technical, nocturnal | fintech, developer tools, security, crypto | children, wellness, food |
| `citrus` | friendly, loud, energetic | consumer apps, habits, food delivery, creators | banking, legal, clinical |
| `pastel` | soft, organised, approachable | dashboards, education, wellness, personal tools | hard-edged pro tools |
| `graphite` | precise, dense, professional | analytics, dev tools, admin for power users | consumer marketing |
| `ivory` | editorial, premium, human | finance for individuals, lifestyle, publishing, hospitality | dense data tools |
| `glass` | airy, luminous, atmospheric | dashboards, travel, weather, music, smart home | text-heavy pages |
| `mono` | bold, graphic, confident | agencies, portfolios, fashion, events, statements | data-dense admin |
| `roast` | warm, tactile, crafted | food and drink, craft commerce, hospitality, farms | enterprise SaaS |
| `candy` | playful, vivid, rewarding | mobile consumer apps, fitness, habits, kids, Gen Z finance | B2B, legal |
| `clinic` | calm, clean, trustworthy | health, banking, insurance, B2B operations | entertainment |
| `sunset` | moody, expressive, warm-dark | music, creator tools, events, gaming, nightlife | clinical, enterprise |

## How to tune

A kit is a starting system. Make it this product's:

1. **Accent and lead surface.** Take the colours from the subject's world (an ingredient, a material, a signal colour the trade uses) and from the product's own name and idea, keeping the direction's saturation and lightness so contrast still holds. If the product is called Ember, its lead surface is dark with a warm glow, not the library's default gradient. The colours printed in each direction below are placeholders that prove the system works; shipping them unchanged is what makes a page look like a template.
2. **Showpiece.** Build the hero visual from your motif, showing what this product really does (see `showpiece.md`).
3. **The motif, large and then echoed.** The kit's listed devices are examples of the kind of thing that works with its surfaces. Replace them with your motif: once as the hero device, then two or three small echoes (the perforated edge of a ticket, a route line, a dotted intensity scale, a waveform, a stamp).
4. **Palette discipline.** Whatever the kit lists, end up with a neutral base, one dominant colour in large fields, and one hot accent. Where a kit offers several tile colours or gradients, choose one as the lead and at most one as counter; use the rest only as small marks, or not at all.
5. **Voice in type.** Keep the pairing or swap the display face for one that suits the idea better, and push the scale: the key line or figure far larger than anything else.
6. Write the tuned tokens at the top of the stylesheet with a comment: `/* Idea: doses as a dotted scale. Kit: clinic. Lead: pharmacy green, accent: signal orange */`.

All font families below are on Google Fonts. Load at most two families plus an optional mono, only the weights you use, with `display=swap` and a fallback stack.

---

## `aurora` — Aurora Light

Bright, cool white with soft colour blooms. The mainstream of modern product design; it only works when the detail is deep.

```css
--bg:#F6F7FB; --surface:#FFFFFF; --surface-2:#F0F2F9; --ink:#0B1020; --ink-2:#4B5268; --ink-3:#8990A6;
--line:rgba(11,16,32,.08); --accent:#4F46E5; --accent-ink:#FFFFFF; --accent-soft:#ECEEFF; --accent-2:#06B6D4;
--bloom-1:rgba(99,102,241,.20); --bloom-2:rgba(56,189,248,.18); --bloom-3:rgba(236,72,153,.12);
--r-sm:10px; --r-md:16px; --r-lg:24px; --r-pill:999px;
```

- **Type:** `Geist` (or `Inter Tight`) 400/500/600. Display 600 at `-0.03em`, line-height 1.05. Optional `Geist Mono` for figures.
- **Depth:** white cards on the tinted ground, soft cool layered shadows, 1px line borders.
- **Atmosphere:** three large blurred blooms behind the hero (`radial-gradient` at different corners), plus faint concentric rings or a dot grid fading out with a mask.
- **Devices:** a pill badge with a gradient hairline border above the headline; integration or feature chips sitting on orbit rings around the product; a glow under the product mock; buttons in solid ink with the accent used for highlights and charts.

## `midnight` — Midnight Emerald

Near-black green with luminous accents. Sharp and technical.

```css
--bg:#06100C; --surface:#0C1813; --surface-2:#11221B; --ink:#EAF5EF; --ink-2:#9BB3A8; --ink-3:#5E766B;
--line:rgba(234,245,239,.09); --accent:#34E29B; --accent-ink:#04130C; --accent-soft:rgba(52,226,155,.12); --accent-2:#B6F36B;
--r-sm:8px; --r-md:14px; --r-lg:22px; --r-pill:999px;
```

- **Type:** `Manrope` 500/600/700 (or `Sora` for display), `Geist Mono` for numbers and labels. Display 600 at `-0.03em`.
- **Depth:** surfaces one step lighter than the ground with a 1px light top edge (`inset 0 1px 0 rgba(255,255,255,.06)`) and a deep soft drop. Borders do most of the separation.
- **Atmosphere:** a fine grid (1px lines every 48px at 5% white) masked to a radial fade, with one large accent bloom at the top centre and a vignette.
- **Devices:** the primary button glows (`box-shadow: 0 0 0 1px accent, 0 8px 30px -6px accent at 50%`); white product cards on the dark ground for contrast; small mono labels; thin accent lines connecting floating cards.

## `citrus` — Citrus Pop

Warm white, one loud citrus accent, black ink, chunky friendly shapes with hard shadows.

```css
--bg:#FFFAF2; --surface:#FFFFFF; --surface-2:#FFF1DD; --ink:#19130E; --ink-2:#5F5348; --ink-3:#9A8D80;
--line:rgba(25,19,14,.12); --accent:#FF5A1F; --accent-ink:#FFFFFF; --accent-soft:#FFE6DA; --accent-2:#FFC83D; --accent-3:#2F6BFF;
--r-sm:12px; --r-md:20px; --r-lg:28px; --r-pill:999px; --hard:0 4px 0 var(--ink);
```

- **Type:** `Bricolage Grotesque` 600/700/800 for display at `-0.03em`, `DM Sans` 400/500/700 for text.
- **Depth:** two kinds, used together on purpose: soft shadows for content cards, and a hard offset shadow with a 1.5px ink border for buttons, badges and the featured card.
- **Atmosphere:** flat warm ground with big soft colour shapes (a circle of `accent-2`, a blob of `accent-soft`) peeking from behind the showpiece; a few small sparkle or squiggle SVGs.
- **Devices:** sticker badges rotated 3 to 8 degrees; a hand-drawn underline or circle (SVG path) under one headline word; pill buttons that press down (`translateY(4px)` and lose the hard shadow); emoji-scale illustrated icons.

## `pastel` — Pastel Bento

Off-white ground, tiles in different pastels, each with ink of the same hue. Organised and soft.

```css
--bg:#F5F4EF; --surface:#FFFFFF; --ink:#1B1A21; --ink-2:#5C5A66; --ink-3:#9896A3; --line:rgba(27,26,33,.08);
--mint:#DCF3E3; --mint-ink:#1C6842; --peach:#FFE2D1; --peach-ink:#A2421A; --lilac:#E7E0FB; --lilac-ink:#4A35A6;
--sky:#DAECFF; --sky-ink:#18569F; --butter:#FFF0BA; --butter-ink:#775800; --rose:#FFDDE6; --rose-ink:#A3284B;
--accent:#1B1A21; --accent-ink:#FFFFFF; --r-sm:12px; --r-md:20px; --r-lg:28px; --r-pill:999px;
```

- **Type:** `Plus Jakarta Sans` 500/600/700/800. Big numerals at 700 to 800, `-0.03em`.
- **Depth:** very soft shadows; pastel tiles are flat fills with no border; white tiles get a hairline. Large radii.
- **Atmosphere:** none needed. The colour is in the tiles.
- **Devices:** every tile has its own pastel and an icon chip in the darker same-hue ink; the primary button is a black pill; one dark tile (`--ink` with white text) anchors the grid; charts use the pastel inks; avatars and small illustrations sit in tile corners.

## `graphite` — Graphite Pro

Dark graphite, dense, crisp. For people who live in the tool.

```css
--bg:#0D0E11; --surface:#14161B; --surface-2:#1B1E25; --surface-3:#232733; --ink:#F1F2F4; --ink-2:#A1A6B2; --ink-3:#676D7B;
--line:rgba(255,255,255,.07); --line-2:rgba(255,255,255,.12); --accent:#7C5CFF; --accent-ink:#FFFFFF; --accent-soft:rgba(124,92,255,.16);
--ok:#3DD68C; --warn:#F5A524; --bad:#F2555A; --r-sm:6px; --r-md:10px; --r-lg:14px; --r-pill:999px;
```

- **Type:** `Geist` or `Inter` 400/500/600 at 13 to 14px for UI, `Geist Mono` for figures. Display 600 at `-0.03em`.
- **Depth:** stacked surface steps, each with `inset 0 1px 0 rgba(255,255,255,.05)` and a hairline border; popovers get a deep shadow. Small radii.
- **Atmosphere:** a faint top-centre accent glow behind the header, a 2 to 3% noise overlay, an optional 1px gradient line along the top of feature cards.
- **Devices:** keyboard hints (`⌘K` in small bordered keys); a command bar; status dots; dense tables with row hover; charts with thin glowing lines and gradient area fills; one accent used sparingly.

## `ivory` — Ivory Editorial

Warm paper, a large elegant serif, fine rules, objects photographed or drawn. Premium and human. This look is common, so it must be executed with real imagery and detail to work.

```css
--bg:#EFE9DB; --surface:#FDFBF5; --surface-2:#E6DFCF; --ink:#161412; --ink-2:#5A534A; --ink-3:#8E867A;
--line:rgba(22,20,18,.14); --accent:#B4410E; --accent-ink:#FFFFFF; --accent-soft:#F3DDCF; --deep:#1F2B22;
--r-sm:6px; --r-md:14px; --r-lg:22px; --r-pill:999px;
```

- **Type:** `Instrument Serif` 400 (regular and italic) for display, set large at `-0.02em`, line-height 1.0; `Instrument Sans` 400/500/600 for text. Optional `IBM Plex Mono` for small labels.
- **Depth:** paper cards with a warm soft shadow and hairline; one deep dark block (`--deep`) for contrast.
- **Atmosphere:** a subtle paper grain (SVG noise at 4 to 6% opacity, `mix-blend-mode: multiply`), large quiet margins.
- **Devices:** an italic word in the headline; objects at slight angles with real shadows (a card, a document, a product); thin rules with small caps labels; a wax-seal or stamp motif; round arrow buttons.

## `glass` — Glass Sky

A colourful blurred backdrop with frosted panels floating over it.

```css
--bg-1:#CFE4FF; --bg-2:#E6DCFF; --bg-3:#FFE3D6; --panel:rgba(255,255,255,.62); --panel-strong:rgba(255,255,255,.82);
--panel-line:rgba(255,255,255,.75); --ink:#0F172A; --ink-2:#475569; --ink-3:#8492A6; --line:rgba(15,23,42,.08);
--accent:#2563EB; --accent-ink:#FFFFFF; --accent-soft:rgba(37,99,235,.12); --accent-2:#FF4D6D;
--r-sm:12px; --r-md:20px; --r-lg:28px; --r-pill:999px;
```

- **Type:** `Urbanist` or `Outfit` 500/600/700. Display 600 at `-0.02em`.
- **Depth:** panels are `background: var(--panel); backdrop-filter: blur(24px) saturate(1.4); border: 1px solid var(--panel-line)` with a soft wide shadow. Inner cards use `--panel-strong`. Things overlap.
- **Atmosphere:** the page background is a fixed multi-stop gradient across the three `--bg` colours with three or four large blurred colour orbs. This backdrop is the direction; without it the glass is just grey.
- **Devices:** floating cards that overlap panel edges; pill navigation; soft coloured glows under key cards; charts with gradient area fills; text always on a strong enough panel to stay readable.

## `mono` — Mono Bold

Black, white and one colour block. Giant type does the work.

```css
--bg:#FFFFFF; --surface:#F3F3F1; --ink:#0A0A0A; --ink-2:#4D4D4D; --ink-3:#8C8C8C; --line:#0A0A0A;
--block:#D6FF3D; --block-ink:#0A0A0A; --accent:#0A0A0A; --accent-ink:#FFFFFF;
--r-sm:0px; --r-md:0px; --r-lg:28px; --r-pill:999px;
```

- **Type:** `Archivo` 500/800/900 (use the 900 for display, uppercase optional) at `-0.04em`, line-height 0.92, set very large (`clamp(56px, 11vw, 160px)`). Text in `Archivo` 400/500 or `Inter`.
- **Depth:** almost none. Contrast comes from scale and colour blocks. Thick 2px rules. Mix square blocks with full pills for tension.
- **Atmosphere:** full-bleed colour-block sections, alternating white, black and `--block`.
- **Devices:** a marquee strip of repeated words; oversized numerals; arrows; a headline that breaks the grid or crops at the edge; photographs or product visuals in hard-edged frames; one tilted pill sticker.

## `roast` — Earth Craft

Cream, deep brown and forest with one warm accent. Tactile and made by hand.

```css
--bg:#EDE3D0; --surface:#FDF9F0; --surface-2:#E4D8C1; --ink:#2A1C13; --ink-2:#6A5544; --ink-3:#9B8672;
--line:rgba(42,28,19,.14); --accent:#B8502A; --accent-ink:#FFF8EE; --accent-soft:#F1D9C8; --deep:#2A1C13; --forest:#28412F; --gold:#D9A441;
--r-sm:10px; --r-md:16px; --r-lg:24px; --r-pill:999px;
```

- **Type:** `Fraunces` 500/600 (soft, optical size auto) for display at `-0.02em`; `Figtree` 400/500/600/700 for text.
- **Depth:** warm brown-tinted layered shadows; a dark `--deep` feature surface with cream text for the hero module; cream cards on the tan ground.
- **Atmosphere:** paper grain overlay; a soft warm bloom behind the showpiece.
- **Devices:** illustrated products (jars, loaves, bottles, boxes drawn in SVG with a label and a highlight); stamp and seal badges; small origin or process tags; dotted scales (intensity, sweetness); charts in terracotta and forest with a gold highlight.

## `candy` — Candy Gradient

White ground, vivid gradient cards, big radii, rewards everywhere. Made for thumbs.

```css
--bg:#FAF9FF; --surface:#FFFFFF; --surface-2:#F1EEFB; --ink:#17132B; --ink-2:#5B5672; --ink-3:#9A96AE; --line:rgba(23,19,43,.08);
--g-lead:linear-gradient(135deg,#F97316,#E11D48); /* the screen's identity: choose it from the subject, see below */
--g-blue:linear-gradient(135deg,#2563EB,#22D3EE); --g-sun:linear-gradient(135deg,#F59E0B,#FACC15); --g-leaf:linear-gradient(135deg,#10B981,#A3E635); --g-violet:linear-gradient(135deg,#7C3AED,#C026D3);
--violet:#7C3AED; --blue:#2563EB; --sun:#F97316; --leaf:#10B981; --rose:#E11D48;
--accent:#E11D48; --accent-ink:#FFFFFF; --r-sm:14px; --r-md:22px; --r-lg:30px; --r-pill:999px;
```

- **Type:** `Outfit` 500/600/700/800. Big friendly numerals at 700, `-0.02em`.
- **Depth:** soft coloured shadows under gradient cards (the card's own hue at 35% opacity, blurred 24px, offset 12px); white cards with soft neutral shadows.
- **Atmosphere:** clean ground; the gradients live in the cards.
- **Devices:** one gradient hero card with white text, a progress ring and an illustrated object; items carry dimensional illustrated objects, each in its own hue, while buttons and navigation stay in the single accent; a floating pill tab bar; confetti or sparkle marks on achievements; chunky toggles and check buttons that fill with colour. Choose `--g-lead` from the subject and the product's name: sunrise orange for a morning routine, deep sea blues for a water tracker, leaf greens for a plant app. A violet-to-pink gradient is the stock answer and reads as a template unless the subject truly calls for it. One counter-accent; the other hues appear only as small marks.

## `clinic` — Clean Clinical

Cool white and blue-grey, teal accent, immaculate order.

```css
--bg:#F3F6F9; --surface:#FFFFFF; --surface-2:#E9EFF4; --ink:#0D1B2A; --ink-2:#4F6072; --ink-3:#8A99A8;
--line:rgba(13,27,42,.08); --accent:#0D9488; --accent-ink:#FFFFFF; --accent-soft:#DDF4F1; --accent-2:#2F6FED; --accent-2-soft:#E3ECFF;
--ok:#16A34A; --warn:#D97706; --bad:#DC2626; --r-sm:8px; --r-md:14px; --r-lg:20px; --r-pill:999px;
```

- **Type:** `Onest` or `Hanken Grotesk` 400/500/600/700. Display 600 at `-0.025em`.
- **Depth:** white cards on the blue-grey canvas with soft cool shadows and hairlines; a dark navy sidebar or feature card for anchor.
- **Atmosphere:** a faint dotted grid on the canvas; soft teal bloom behind the showpiece on marketing pages.
- **Devices:** icon chips in `--accent-soft`; precise data cards with sparklines; segmented controls; status pills; rounded progress bars; friendly avatars; generous whitespace with strict alignment.

## `sunset` — Sunset Dark

Deep plum with warm orange-to-pink light. Moody and expressive.

```css
--bg:#130E1D; --surface:#1C152C; --surface-2:#261D3A; --ink:#F6F1FF; --ink-2:#B5A9CE; --ink-3:#7A6F94;
--line:rgba(246,241,255,.09); --g-warm:linear-gradient(120deg,#FF7A59,#FF3D81 55%,#8B5CF6); --accent:#FF5C7A; --accent-ink:#1A0B14;
--accent-soft:rgba(255,92,122,.14); --accent-2:#FFB86B; --r-sm:12px; --r-md:18px; --r-lg:26px; --r-pill:999px;
```

- **Type:** `Sora` 500/600/700 for display at `-0.03em`, `DM Sans` 400/500/700 for text.
- **Depth:** surfaces with a light top edge and deep drops; key cards carry a warm glow (`0 20px 60px -20px rgba(255,61,129,.45)`).
- **Atmosphere:** two or three large warm blooms (orange, pink, violet) blurred heavily in the upper half, a noise overlay, and a vignette.
- **Devices:** `--g-warm` on the primary button and one headline phrase (and nowhere else); glass cards over the blooms; waveforms, rings and progress arcs drawn in the gradient; rounded image tiles.

---

## Building your own

When the user supplies a brand or none of the above fits, build a direction with the same parts: a ground and two surface steps; three ink levels; a line colour; an accent with its ink, a soft tint and a second accent; a radius set; a type pairing with display settings; a depth recipe; an atmosphere; and three signature devices. Write them as tokens before any component.
