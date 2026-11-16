# Typography

Type is most of what a screen is made of, and most of what makes it read as elegant or cheap. Elegance here is not a fancy face: it is a good family, few sizes, restrained weights, tracking and leading set per size, and details that a default stylesheet never sets.

Contents: choosing a face · pairing · weights · size, tracking and leading · details that make it look set · what makes type look cheap · loading

## Choosing a face

Choose by the character in the brief and by how much text the screen carries. All of these are on Google Fonts.

| Face | Character | Good for |
|:---|:---|:---|
| **Inter** (with `opsz`) | neutral, precise, very legible | dense tools, dashboards, anything with many numbers |
| **Inter Tight** | Inter tightened for headings | large headings over Inter body |
| **Geist** + **Geist Mono** | technical, crisp, modern | developer tools, SaaS, finance |
| **Instrument Sans** | refined, slightly narrow, calm | SaaS, editorial product pages, premium apps |
| **Manrope** | soft geometric, friendly but adult | consumer apps, fintech |
| **DM Sans** (with `opsz`) | clean low-contrast geometric | apps and landing pages that want warmth |
| **Hanken Grotesk** | classic grotesk, quiet | dashboards, admin, documentation |
| **Schibsted Grotesk** | sturdy, newspaper-like grotesk | media, data-heavy reading |
| **Figtree**, **Onest** | friendly, open | consumer apps, education |
| **Plus Jakarta Sans** | wide, polished | consumer and fintech apps (lighter weights only) |
| **IBM Plex Sans** + **IBM Plex Mono** | engineered, serious | enterprise, data, terminals |

For a landing headline only, when the direction wants it: **Instrument Serif** or **Newsreader** at display sizes over a sans body; **Bricolage Grotesque** for a confident, slightly quirky voice. Never for product UI.

Avoid as the main face unless the brand already uses it: Poppins, Montserrat, Raleway, Nunito and Space Grotesk read as template defaults; Outfit, Urbanist and Sora get heavy and toy-like above weight 500.

## Pairing

- **One family for the interface.** Hierarchy comes from size, weight and tone within it.
- **Plus a mono partner** for meta (changes and their comparison, axis labels, counts, IDs, keycaps): Geist Mono, JetBrains Mono, IBM Plex Mono or DM Mono. Its x-height should sit close to the sans; set it 1px smaller than the text beside it if it looks bigger.
- **Plus, on landing pages only, an optional display face** for the hero headline and section titles.
- Never two sans families. Never more than three families in total.

## Weights

- **Body and labels 400,** emphasis and buttons 500, titles 600. Large display text (40px and above) often looks most elegant at 500, not 600 or 700, because size already carries it.
- **No 700 to 900 on UI text,** except a single key figure where the face looks thin at 600.
- On dark backgrounds text looks bolder: drop one step (500 for titles), and set `-webkit-font-smoothing: antialiased`.
- Use a variable font or load only the weights you use (usually 400, 500, 600).

## Size, tracking and leading

Set tracking and line height by size. Defaults are tuned for body text; at display sizes they look loose and amateur.

| Size | Use | Letter-spacing | Line height |
|:---|:---|:---|:---|
| 11–12px | captions, meta, table headers | +0.01em | 1.4 |
| 13–14px | secondary text, table cells, labels | 0 | 1.45 |
| 15–16px | body, row titles | 0 to −0.005em | 1.5–1.6 |
| 18–20px | card and section titles | −0.01em | 1.35 |
| 24–32px | page titles, key figures | −0.015 to −0.02em | 1.2 |
| 40–56px | landing headlines | −0.025em | 1.05–1.1 |
| 64px+ | display only | −0.03 to −0.04em | 1.0 |

Mono and uppercase labels never get negative tracking; a small uppercase label, if used at all, gets +0.04 to +0.06em.

## Details that make it look set

- `font-variant-numeric: tabular-nums` on figures that align or change; `font-optical-sizing: auto` on faces with an `opsz` axis (Inter, DM Sans), so small text is sturdier and large text finer.
- Nicer alternates where the face has them: Inter `font-feature-settings: "cv11", "ss01"` (single-storey a and open digits) or `"ss03"`; DM Sans and Manrope `"ss01"`. Try them and keep what reads better.
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs, so no line ends with one word.
- Currency signs, units and decimals a step smaller or in the secondary tone beside a large figure: <span>$</span>48,210<span>.40</span>.
- Real punctuation: curly quotes, an en dash for ranges (Nov 1–16), a true minus (−) for negative numbers, a thin space before units where the style wants it.
- Body copy in the secondary text tone is often more elegant than black; keep headings and figures in primary.
- Align text to a baseline rhythm: line heights that resolve to multiples of 4px (14px × 1.43 ≈ 20px, 16px × 1.5 = 24px).

## What makes type look cheap

- Bold everywhere, or headings at 700 to 800.
- Default letter-spacing on 32px and larger, and line height 1.5 on headlines.
- More than five sizes on a screen, or sizes that differ by one or two pixels.
- Centred paragraphs longer than two lines; body lines longer than 75 characters.
- Uppercase tracked labels as a recurring style, italics for emphasis, gradient or outlined text.
- A display face on buttons, labels or numbers.

## Loading

- Google Fonts with `display=swap` and only the weights used, or one variable range (`wght@400..600`).
- A fallback stack with similar metrics (`ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`), so the layout does not jump when the font arrives.
