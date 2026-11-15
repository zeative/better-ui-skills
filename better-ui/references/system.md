# The system

Professional interfaces get their quality from a small, strict system applied everywhere. Write these tokens as CSS custom properties at the top of the stylesheet and use nothing else.

Contents: type · colour · brand colour by category · surfaces and depth · radius and spacing · icons · imagery · starting tokens

## Type

- **One sans-serif family.** Inter, Plus Jakarta Sans, Manrope, DM Sans, Geist, Figtree, or the system stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`). Load from Google Fonts with `display=swap`, with the system stack as fallback. A second family only for code (a mono) or when the brand already has a display face.
- **Weights 400, 500 and 600.** 700 sparingly for the largest figure. No 800/900 on UI.
- **A compact scale.** 12 (captions, tab labels), 13, 14 (secondary text, table cells), 16 (body, row titles), 18, 20 (card titles), 24 (section and page titles), 32 (hero figures in apps and dashboards). Landing hero headlines 40 to 56px; never above 64px.
- **Letter-spacing:** -0.01em to -0.02em on 20px and above; 0 on body; small uppercase labels are rare and lightly tracked (0.04em), not a recurring style.
- **Numbers:** `font-variant-numeric: tabular-nums` wherever figures align or change. Currency and units smaller or lighter than the figure when the figure is large ("$2,147" with ".60" in the muted grey is a common, good touch).
- **Line height** 1.5 for body, 1.2 to 1.3 for headings. Sentence case for headings and buttons.

## Colour

- **Canvas:** a light neutral, slightly cool or warm: `#F5F6F8`, `#F4F5F7`, `#F7F7F5`, `#F2F4F7`. White canvas with light grey cards also works. For a dark app: `#0B0B0F` to `#141418` canvas, `#1C1C22` surfaces.
- **Surfaces:** white (`#FFFFFF`) cards on the canvas; an inner panel one step darker than the card (`#F6F7F9`).
- **Text:** primary `#0F172A`-ish (near-black, not pure), secondary `#64748B`-ish, tertiary for placeholders `#94A3B8`. Hairlines `#E9ECF1`.
- **One brand colour** (see below), used for: the primary button, the active tab and nav item, links, the main chart series, selected states, and at most one large filled card (a summary card) per screen. A soft tint of it (8 to 12% opacity on the canvas) for chips and selected backgrounds.
- **Semantic colours:** success green, warning amber, danger red, in soft-tint pill form (`#E8F7EE` background, `#15803D` text) for statuses and deltas.
- **Category colours** (habits, spending categories, muscle groups): a set of five or six soft tints, each with a stronger tone for its icon. Used only on small chips, icon backgrounds and chart series, never as card backgrounds across the page.
- A dark surface (a near-black card or a dark sidebar) is a good single contrast element on a light screen.

## Brand colour by category

Pick one that fits, then vary its exact hue so it is not a stock value:

- Finance, banking: deep green `#0F7B5F`, blue `#2563EB`, indigo `#4F46E5`, near-black with lime `#C6F432`.
- Health, fitness, workout: orange `#FF5A1F`, coral `#F25C54`, lime on dark, electric blue.
- Habits, productivity, to-do: violet `#6D5DFC`, blue, green `#22A06B`, orange.
- Commerce, admin: blue, green, violet, black.
- Clinical, health care: teal `#0E9F9A`, blue `#2F6FEB`.
- SaaS landing: violet, blue, black with one accent, green.

## Surfaces and depth

- **Cards:** white, radius 16 to 24 on mobile and 12 to 16 on desktop, padding 16 to 20 (mobile) or 20 to 24 (desktop).
- **Depth:** either a hairline border (`1px solid #EEF0F3`) or a soft shadow, usually not both strongly. A good soft shadow: `0 1px 2px rgba(16,24,40,.04), 0 8px 24px -12px rgba(16,24,40,.10)`. Floating elements (tab bar, sheets, popovers): `0 12px 32px -8px rgba(16,24,40,.18)`.
- **No** textures, noise, paper, bevels, inner glows, coloured offset shadows, or gradient borders on product UI. A gentle gradient on one summary card or a landing hero background is fine.

## Radius and spacing

- Radius scale: 6 (small chips), 10 or 12 (buttons, inputs, icon chips), 16 to 24 (cards), 999 (pills, avatars). Inner radius = outer radius minus padding.
- Spacing on a 4px grid: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64. Gaps between cards 12 to 16 on mobile, 16 to 24 on desktop. Page gutters 16 to 20 on mobile.

## Icons

- One line-icon set at one stroke width (1.5 to 2px), drawn as inline SVG in the Lucide/Feather style: home, chart, calendar, user, plus, bell, search, settings, chevrons.
- Icon chips: a 36 to 44px rounded square or circle in a soft tint with the icon in the stronger tone.
- In consumer apps, items (habits, categories, exercises) may use native emoji in a tinted chip instead. Pick one approach per app.

## Imagery

- **People:** avatars as small circles. Simple illustrated avatars drawn in SVG (head, hair, shoulders, flat colours) or initials on a soft tint are both normal in real products; keep one style.
- **Products and places:** thumbnails as rounded squares; draw simple product shapes in SVG or use a tinted chip with an icon. Never a grey box.
- **Charts:** clean and minimal (see `showpiece.md`).
- **Illustration:** at most one simple, flat spot illustration in an empty state or onboarding. Not on the main screen of a product UI.

## Starting tokens

```css
:root {
  --font: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --canvas: #F5F6F8; --surface: #FFFFFF; --surface-2: #F6F7F9; --line: #ECEEF2;
  --text: #0F172A; --text-2: #64748B; --text-3: #94A3B8;
  --brand: #4F46E5; --brand-tint: #EEF0FF; --on-brand: #FFFFFF;
  --ok: #16A34A; --ok-tint: #E8F7EE; --warn: #D97706; --warn-tint: #FEF4E2; --bad: #DC2626; --bad-tint: #FDECEC;
  --r-sm: 10px; --r-md: 16px; --r-lg: 24px; --r-full: 999px;
  --shadow: 0 1px 2px rgba(16,24,40,.04), 0 8px 24px -12px rgba(16,24,40,.10);
  --shadow-float: 0 12px 32px -8px rgba(16,24,40,.18);
}
```

Change the brand colour and canvas tone to suit the product; keep the structure.
