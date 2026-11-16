# The system

Professional interfaces get their quality from a small, strict system applied everywhere. Write these tokens as CSS custom properties at the top of the stylesheet and use nothing else.

Contents: choose a look · type · colour · brand colour by category · surfaces and depth · radius and spacing · icons · imagery · starting tokens

## Choose a look

A clean system with no point of view reads as a component-library template. Popular shots each have one recognisable, contemporary *look*: a palette and surface treatment, not a theme. Pick the one that suits the product and audience, and apply it consistently. These are styles, not concepts: nothing about the product's world is drawn into the interface.

- **Bright and clean:** white or very light grey canvas, white cards, one saturated brand colour on the summary card, buttons and active states. The safe default for finance, productivity and admin.
- **Soft tint:** a pale tinted canvas (lilac, periwinkle, mint or peach at 4 to 8% saturation), large white cards with generous radius (24 to 28), a black or deep brand colour for primary buttons and the tab bar, and one fresh accent (lime, coral). Common in wellness, habits and lifestyle.
- **Colour blocks:** a light canvas where three or four cards are filled with soft colours from one family (lime, lilac, sky, peach), black text on them, one card in black. Common in fitness, habits and personal dashboards.
- **Dark with one neon:** near-black canvas, dark grey cards, white text, one vivid accent (lime `#C6F432`, orange `#FF6A2B`, electric blue) for the hero figure, chart and primary control. Common in fitness, crypto, music.
- **Monochrome:** black, white and greys with one small accent; strong type; crisp hairlines. Common in fintech and SaaS.
- **Fresh gradient:** a soft blue or sky gradient behind the hero or summary card, glass-like white cards with a light blur. Common in banking and SaaS landing pages.

Write the choice as one line in a comment at the top of the stylesheet ("Look: soft tint, lilac canvas, black controls, lime accent").

## Type

- **One sans-serif family** with a little character: Plus Jakarta Sans, Manrope, Outfit, Urbanist, Sora, DM Sans, Figtree, Onest, Geist or Inter, or the system stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`). Load from Google Fonts with `display=swap`, with the system stack as fallback. A second family only for a mono partner or when the brand already has a display face.
- **A mono partner for meta** (Geist Mono, JetBrains Mono, IBM Plex Mono, DM Mono) is one of the cheapest ways to make a dashboard or tool look made: use it for the change and its comparison ("+12% vs last month"), axis labels, counts in navigation, section labels, invoice and card numbers, keycaps and timestamps. Never for headings, body or buttons.
- **Two-tone titles.** A page title can carry its context in a quieter tone: "October" in primary and "2026" in tertiary, or "Revenue" with the period muted beside it.
- **Weights 400, 500 and 600.** 700 sparingly for the largest figure. No 800/900 on UI.
- **A compact scale.** 12 (captions, tab labels), 13, 14 (secondary text, table cells), 16 (body, row titles), 18, 20 (card titles), 24 (section and page titles), 32 (hero figures in apps and dashboards). Landing hero headlines 40 to 56px; never above 64px.
- **Letter-spacing:** -0.01em to -0.02em on 20px and above; 0 on body; small uppercase labels are rare and lightly tracked (0.04em), not a recurring style.
- **Numbers:** `font-variant-numeric: tabular-nums` wherever figures align or change. Currency and units smaller or lighter than the figure when the figure is large ("$2,147" with ".60" in the muted grey is a common, good touch).
- **Line height** 1.5 for body, 1.2 to 1.3 for headings. Sentence case for headings and buttons.

## Colour

- **Canvas:** a light neutral, slightly cool or warm: `#F5F6F8`, `#F4F5F7`, `#F7F7F5`, `#F2F4F7`. White canvas with light grey cards also works. For a dark app use graphite, not blue-black or purple-black: `#0E0E0F` to `#141415` canvas, `#18181A` to `#1C1C1E` surfaces, `#232326` raised, borders `rgba(255,255,255,.07)`.
- **Surfaces:** white (`#FFFFFF`) cards on the canvas; an inner panel one step darker than the card (`#F6F7F9`).
- **Text:** primary `#0F172A`-ish (near-black, not pure), secondary `#64748B`-ish, tertiary for placeholders `#94A3B8`. Hairlines `#E9ECF1`.
- **One brand colour** (see below), used for: the primary button, the active tab and nav item, links, the main chart series, selected states, and at most one large filled card (a summary card) per screen. A soft tint of it (8 to 12% opacity on the canvas) for chips and selected backgrounds.
- **Semantic colours:** success green, warning amber, danger red, in soft-tint pill form (`#E8F7EE` background, `#15803D` text) for statuses and deltas.
- **Category colours** (habits, spending categories, muscle groups): a set of five or six soft tints, each with a stronger tone for its icon. Used only on small chips, icon backgrounds and chart series, never as card backgrounds across the page.
- A dark surface (a near-black card or a dark sidebar) is a good single contrast element on a light screen.

## Brand colour by category

Pick one that fits, then vary its exact hue so it is not a stock value. Avoid the default indigo-to-violet (`#6366F1` → `#8B5CF6`) gradient card: it is the single most recognisable AI-generated look. If the brand is purple, use a solid fill or a gradient within one hue.

- Finance, banking: deep green `#0F7B5F`, blue `#2563EB`, indigo `#4F46E5`, near-black with lime `#C6F432`.
- Health, fitness, workout: orange `#FF5A1F`, coral `#F25C54`, lime on dark, electric blue.
- Habits, productivity, to-do: violet `#6D5DFC`, blue, green `#22A06B`, orange.
- Commerce, admin: blue, green, violet, black.
- Clinical, health care: teal `#0E9F9A`, blue `#2F6FEB`.
- SaaS landing: violet, blue, black with one accent, green.

## Surfaces and depth

- **Cards:** white, radius 16 to 24 on mobile and 12 to 16 on desktop, padding 16 to 20 (mobile) or 20 to 24 (desktop).
- **Depth:** either a hairline border (`1px solid #EEF0F3`) or a soft shadow, usually not both strongly. A good soft shadow: `0 1px 2px rgba(16,24,40,.04), 0 8px 24px -12px rgba(16,24,40,.10)`. Floating elements (tab bar, sheets, popovers): `0 12px 32px -8px rgba(16,24,40,.18)`.
- **Material, quietly.** What makes a well-made surface feel physical is small: a tone shift inside one neutral (the top of a card 2 to 4% lighter than the bottom), a 1px highlight along the top edge (`inset 0 1px 0 rgba(255,255,255,.05)` on dark, `rgba(255,255,255,.8)` on light), a hairline border, and on light themes a small soft shadow. The active navigation item is a raised step of the same material, not a coloured pill. Recipes are in `showpiece.md` (Surfaces with material).
- **No** textures, noise, paper, heavy bevels, coloured glows on chrome, coloured offset shadows, gradient borders, or gradients from one hue to another on product UI.

## Radius and spacing

- Radius scale: 6 (small chips), 10 or 12 (buttons, inputs, icon chips), 16 to 24 (cards), 999 (pills, avatars). Inner radius = outer radius minus padding.
- Spacing on a 4px grid: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64. Gaps between cards 12 to 16 on mobile, 16 to 24 on desktop. Page gutters 16 to 20 on mobile.

## Icons

- One line-icon set at one stroke width (1.5 to 2px), drawn as inline SVG in the Lucide/Feather style: home, chart, calendar, user, plus, bell, search, settings, chevrons.
- Icon chips: a 36 to 44px rounded square or circle in a soft tint with the icon in the stronger tone.
- In consumer apps, items (habits, categories, exercises) may use native emoji in a tinted chip instead. Pick one approach per app.

## Imagery

Popular shots always have something to look at besides text: 3D icons, avatars, product pictures, a chart. Draw on these, and keep one style per screen.

- **No emoji in finance, banking, admin, SaaS or productivity tools.** Their categories, merchants and accounts use a drawn line-icon set in tinted chips (or merchant logos drawn as simple letter marks); emoji tiles there read as a template.
- **3D icons, in moderation, for personal consumer apps** (habits, wellness, food, hobbies). Use them where the emoji is the natural picture of the thing (water 💧, a book 📚, coffee ☕, a house 🏠, a trophy 🏆), and only for one kind of item per screen. Where no emoji fits naturally (exercises, accounts, merchants, settings), use line icons in tinted chips instead; a leg emoji standing for squats looks like a stock kit. A screen where every icon is a 3D emoji reads as a template.
- **3D icons for items** in consumer apps (habits, categories, exercises, rewards, empty states): Microsoft's Fluent 3D emoji, MIT licensed, served from a pinned CDN. Put each in a soft tinted chip, 40 to 48px, the image at about 60% of the chip. Fall back to the native emoji if the image fails:
  ```js
  const emoji3d = (e) => 'https://cdn.jsdelivr.net/npm/@lobehub/fluent-emoji-3d@1.1.0/assets/' +
    [...e].map((c) => c.codePointAt(0).toString(16)).join('-') + '.webp';
  // <img src="${emoji3d('💧')}" alt="" width="28" height="28" onerror="this.replaceWith('💧')">
  ```
  Use the emoji's exact code points: `🏋️` is `1f3cb-fe0f`, `☕` is `2615`. A larger one (96 to 140px) makes a good empty-state or onboarding image.
- **Avatars:** never initials for the signed-in user or in consumer apps. Use illustrated avatars from DiceBear's `notionists` or `lorelei` styles (`https://api.dicebear.com/9.x/notionists/svg?seed=<name>&backgroundColor=<hex>`), each on a different soft background, or simple SVG portraits. Initials on a tint are acceptable in dense admin tables.
- **Products and places:** a 3D emoji (`🎧`, `👟`, `☕`, `🏠`) on a tinted rounded square works as a product thumbnail in dashboards and lists. Never a grey box.
- **Charts:** clean and minimal (see `showpiece.md`).
- If the network may be unavailable where the page is used, keep the fallbacks: the layout must hold with native emoji and initials.

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
