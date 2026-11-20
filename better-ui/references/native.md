# Native: phone apps that feel like they belong on the phone

The most elegant phone apps (Apple Health, Wallet, Settings, Mail, Reminders, Things, Apple Store) do not look "designed". They look **native**: the platform's own type, lists, bars and sheets, executed exactly, with the product's colour used sparingly and the content arranged by typography. That restraint is what reads as professional. The generated look is the opposite: a saturated hero card, a row of icon tiles, coloured chips on every row, pills, big radii and shadows everywhere.

This is one direction among others, not a default: use it when the brief calls for a calm, native feel, or as one of the three directions to compare. For Android-first products, use Material 3 with the same discipline (its type scale, list items, top app bar and navigation bar).

## The rules that make it native

1. **Typography carries the hierarchy**, not boxes. A large title, then grouped content with small section headers, then rows. Sizes and weights do the work; colour and containers stay quiet.
2. **Grouped lists, not card piles.** Content sits in inset grouped sections (white cells on the grouped grey background, separated by hairlines), the way Settings and Health do it. One card that is truly special (a ticket, a summary) may stand out; everything else is a list.
3. **One accent colour**, used for interactive things (links, the selected tab, toggles, the primary button) and nothing else. Status colours only where they mean status.
4. **Hairlines and space, not shadows.** Separators at 0.5px, no shadows on cells; depth comes from the grouped background behind white cells and from materials (blur) on bars.
5. **Standard components, exactly:** navigation bar with a large title that collapses, tab bar, segmented control, switches, disclosure chevrons, sheets with a grabber, swipe actions. Do not invent new ones for flavour.

## Values (iOS)

Type (SF Pro; on the web use `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", system-ui, sans-serif`; with Inter, tighten large sizes by about -0.02em):

| Style | Size / line height | Weight |
|:---|:---|:---|
| Large title | 34 / 41 | 700 |
| Title 1 · Title 2 · Title 3 | 28/34 · 22/28 · 20/25 | 400 to 700 by role |
| Headline | 17 / 22 | 600 |
| Body | 17 / 22 | 400 |
| Callout | 16 / 21 | 400 |
| Subheadline | 15 / 20 | 400 |
| Footnote (section headers and footers) | 13 / 18 | 400 |
| Caption 1 · Caption 2 | 12/16 · 11/13 | 400 |

Colour (light; dark in brackets):

| Role | Value |
|:---|:---|
| Grouped background | #F2F2F7 (#000000) |
| Cell / grouped surface | #FFFFFF (#1C1C1E) |
| Label | #000000 (#FFFFFF) |
| Secondary label | rgba(60,60,67,.60) (rgba(235,235,245,.60)) |
| Tertiary label | rgba(60,60,67,.30) (rgba(235,235,245,.30)) |
| Separator | rgba(60,60,67,.29) at 0.5px (rgba(84,84,88,.6)) |
| Fill for controls (segmented track, search field) | rgba(118,118,128,.12) (rgba(118,118,128,.24)) |
| Accent | the brand colour, or system blue #007AFF; green #34C759, orange #FF9500, red #FF3B30 for status |

Layout:

| Element | Value |
|:---|:---|
| Status bar | 54 (Dynamic Island phones) |
| Navigation bar | 44, plus 52 for the large title |
| Screen margin / inset grouped section margin | 16 (20 on larger phones) |
| Cell | min 44 tall; 11 vertical padding, 16 horizontal; leading glyph 22 to 28 wide |
| Section header | footnote, secondary label, 16 left, 6 below; 35 above a section |
| Inset grouped corner radius | 10 to 12; a special card 16 to 22 |
| Separator inset | starts at the text, not at the screen edge (after the leading icon) |
| Tab bar | 49 plus the 34 home indicator; icons 25 to 28, labels caption 2 at 500 |
| Touch targets | 44 × 44 |

Current iOS draws the tab bar and floating controls in a translucent **glass material**: `background: rgba(255,255,255,.72); backdrop-filter: blur(20px) saturate(180%); border: 0.5px solid rgba(255,255,255,.6)`, a capsule floating above the content with a soft shadow, the selected tab in the accent. Use it on bars and floating controls only, never on content.

## Icons

SF Symbols are Apple's; for prototypes use **Framework7 Icons** (`f7:` in `scripts/icons.cjs`, MIT), drawn to match them: `f7:house-fill`, `f7:calendar`, `f7:doc-text`, `f7:person-crop-circle`, `f7:qrcode`, `f7:bell`, `f7:chevron-right`, `f7:heart-fill`, `f7:bandage`, `f7:lab-flask`, `f7:capsule`. Glyphs sit plain beside text, in the accent or the secondary label colour, sized to the text (about 22px beside body). Coloured rounded-square tiles (29px, radius 7) belong to Settings-style lists only, never above headings or in rows of content.

## Composition patterns from Apple's own apps

- **Health Summary:** large title, then "Pinned" or "Highlights" as white rounded cells: a small coloured category label with its glyph (semibold, 15), the value large (28 to 34, 600) with its unit small and grey, a one-line explanation. No icon tiles, no gradients.
- **Wallet pass** for anything ticket-like (an appointment, a queue number, a booking): one card in the brand colour or white, with fields as small secondary labels over values, a barcode or QR at the bottom, generous margins. It is the one special object on the screen.
- **Settings / Mail lists** for actions and navigation: rows with a glyph, a title, an optional detail value in secondary label on the right, and a chevron.
- **Reminders / Fitness** for counts and progress: few numbers, large, with a plain label; rings only where progress is the point.

## What breaks the native feel

- A saturated full-width hero card with white text and a white pill button, as the default answer to "home".
- A row of four or five rounded-square icon tiles as "quick actions" (use a list section, or a few plain glyph buttons).
- Initials in a coloured circle plus a bell in a circle as the header (use a large title and, if needed, a plain bell glyph or the profile photo).
- Coloured icon chips on every list row; status pills with dots on everything.
- Cards with shadows on a grey canvas, cards inside cards, every corner at 20px or more.
- Web fonts with character where the platform face belongs; many weights; centred text in lists.
- Gradients on surfaces, glass on content.
