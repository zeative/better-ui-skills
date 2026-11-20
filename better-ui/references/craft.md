# Craft: what professionals do that generated UI does not

Collected from video tutorials by working designers (Kole Jain, Sajid, Michal Malewicz, Gary Simon, UXPeak), Refactoring UI, Erik Kennedy (Learn UI Design), Practical UI, Apple's HIG and WWDC design talks, Material 3, Rauno Freiberg, Emil Kowalski, Jakub Krehel, Josh Comeau, Vercel's interface guidelines, Linear's redesign notes, NN/g, and designers' teardowns of AI-generated interfaces. These are habits of good work, not a style: they hold in any direction.

## Hierarchy

- **Emphasise by de-emphasising.** Before making the key thing louder, make its competitors quieter: lighter text colour, smaller, lighter icons. Only one element per screen is fully loud (big, bold, high contrast); every other emphasised thing pairs one loud trait with one quiet one (big but regular weight in a muted colour; small but semibold).
- **Three text tones do most of the work:** primary, secondary (about 60% contrast), tertiary (about 30 to 40%). Most good screens use three or four sizes (title, body, secondary, caption) and get hierarchy from weight, tone and position.
- **Labels are a last resort.** Drop the label when the value explains itself (a date, a price, a phone number); merge label and value ("3 orang di depan Anda", not "Antrean di depan: 3"). Keep labels where people scan for them (spec sheets, forms).
- **One primary action per view.** One or two prominent buttons at most; the rest are secondary or text actions. Show preference by style, not by size.
- **Hover or selected states never change size or weight**; change colour, background or a 1px lift.

## Typography

- One family is enough for product UI; regular to semibold (400 to 600), never light weights for UI text.
- **Tracking falls as size grows** (Inter-like faces): 11 to 12px about 0 to +0.01em, 14px −0.006em, 16px −0.011em, 20px −0.017em, 24px and up −0.02em, display 48px+ −0.03em. ALL-CAPS labels, if any, get +0.04 to +0.08em.
- **Line height falls as size grows:** body 1.45 to 1.5; single-line UI labels 1.25 to 1.35; headings 1.1 to 1.2; display 1.0 to 1.05.
- Line length 45 to 75 characters. `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.
- `font-variant-numeric: tabular-nums` on times, prices, counters and anything in columns. Units smaller than their number (a 2:1 ratio reads well): "38 °C", "Rp 49.000".
- Real typographic characters: curly quotes, the ellipsis "…", a non-breaking space between number and unit.

## Colour

- **Colour belongs to content, not chrome.** Bars, backgrounds and most controls stay neutral; colour marks the one primary action, the current selection, state and data. Do not use one colour for two meanings (if the accent means "tappable", static text is never in the accent).
- **A neutral ladder carries the screen:** a background a step off white (about 98%), white for cards, edges at about 85% instead of a dark border, headings around 10% lightness, body 15 to 20%, subtext 35 to 45%. In dark mode the steps double and nothing is pure black or white.
- **Icons are colourless unless they show state.** The brand colour goes to the main button, links, focus and the selected item; destructive stays red.
- **Greys are tinted** toward the brand hue (or cool, like #F2F2F7); never pure grey next to a coloured brand. Text on a coloured surface is a tint of that surface, not grey.
- **Every colour maps to one state, used consistently.** If nothing changes state, there is no status dot and no badge.
- Shades are designed, not computed with lighten/darken: darker shades lose brightness and gain saturation; lighter shades gain brightness and lose saturation.
- Contrast 4.5:1 for text (aim higher on small text), 3:1 for UI shapes.

## Spacing and layout

- **Start with too much space and remove it.** Generated UI is usually cramped inside and loose between, or the same everywhere.
- **No ambiguous spacing:** the gap between groups is clearly larger than the gap within a group (a label hugs its value; sections breathe).
- A 4px base scale (4, 8, 12, 16, 20, 24, 32, 40, 48), used in tiers: about 8 inside a group, 16 as the default, 24 to 32 between groups and sections. Uniform spacing everywhere is the beginner's tell.
- **Inner spacing is never larger than outer spacing:** the icon-to-text gap is smaller than the button padding; a card's padding is smaller than the gap around the card's group. Horizontal button padding is larger than vertical.
- **The receipt model:** left-align text, right-align numbers, and give every element at least two edges it shares with something else. Merge boxes inside boxes into one surface with sections.
- Padding inside a control is about equal to its text height.
- **Group with space first, then a background shift, then a hairline; a box is the last resort.** Cards are for items that act independently; NN/g: cards are less scannable than lists for items of the same kind.
- Left-align anything longer than two lines; align everything to a few strong edges; hang icons and bullets outside the text edge.
- **Concentric radii:** inner radius = outer radius − padding (a 20px card with 8px padding holds a 12px child). Capsules are height ÷ 2. Radius follows role, not one value everywhere.

## Depth

- **Fewer borders.** Separate with space, a background step or a shadow; keep real borders for inputs, dividers and focus.
- Shadows have one light source above: offset down, two parts (a tight, darker contact shadow and a soft wide ambient one), low opacity, tinted with the surface hue on coloured backgrounds. A border can be a shadow: `0 0 0 1px rgba(0,0,0,.06), 0 1px 2px -1px rgba(0,0,0,.06), 0 2px 4px rgba(0,0,0,.04)`.
- Hairlines: 1px, or 0.5px on high-density screens. Images get a faint inner outline (`outline: 1px solid rgba(0,0,0,.1); outline-offset: -1px`).
- Blur and translucency only for a real layer over content (a bar over a scrolling list, a sheet over a map), never on static cards.

## Icons

- One family, one stroke weight, matched to the text weight beside it (about 1.5px next to regular text, 2px next to semibold). Outline by default, filled for the active tab.
- **Smaller than you think,** and in the text colour or secondary tone. No coloured rounded-square behind each icon unless it is a settings list.
- Standard glyphs for standard jobs: back chevron, close ×, share, more "…", search. Text when a glyph would be ambiguous.

## Composition of an app home screen

What the best products put first (NN/g, NHS App, Doctolib, MyChart, Apple's own apps): **the next action and its state** (the appointment and check-in, the order on its way, the balance and the bill due), then **what needs attention** (results ready, a form due), then **everything else as a plain list**. Booking or creating is one clear button or a toolbar "+", not a tab and not a tile grid. Show the essential few fields; details open on tap.

The common generated home is the opposite: "Good morning, [Name]" with an initials circle and a bell circle, a saturated hero card, a 4 or 5 tile quick-action grid, a stat strip of equal tiles, coloured chips on every row.

## Motion and interaction

- Animate by frequency: things used hundreds of times a day do not animate; occasional things (sheets, toasts) do; rare moments may delight.
- Ease-out for entering (`cubic-bezier(0.23, 1, 0.32, 1)`), never ease-in; press 100 to 160ms (`:active { transform: scale(.97) }`), menus 150 to 250ms, sheets and modals 200 to 400ms; exits faster than entrances. Never animate from `scale(0)`; start at 0.95 with opacity 0. Animate only transform and opacity; never `transition: all`.
- Focus ring with `:focus-visible`, as two shadows (`0 0 0 2px var(--bg), 0 0 0 4px var(--focus)`).
- Skeletons match the final layout; wait about 200ms before showing one.
- Phones: safe-area padding (`max(16px, env(safe-area-inset-bottom))`), 44px hit areas, 16px input text, `touch-action: manipulation`, your own `:active` state instead of the grey tap highlight.

## Judging your own work honestly

You cannot see your own defaults; that is why they are defaults. Use tests that do not depend on your taste:

- **The fresh-eyes reviewer.** Give the screenshot to a reviewer that has not seen your reasoning (a new subagent or session) and ask: "Was this made by an AI app builder? Name every element that gives it away, harshly. Then list the three changes a senior product designer would make." Believe it over yourself.
- **The gold-standard comparison.** Put the screenshot beside a real, excellent product of the same kind at the same size, with similar content. Ask which one looks designed, and why, in specifics.
- **The swap test.** Put a competitor's name and logo on it. If it still works, it has no identity.
- **The removal test.** For each element, ask what information, state or action it carries. If removing it does not hurt, remove it.
- **Squint or greyscale.** The one thing that matters should still lead; if everything has equal weight, there is no hierarchy.
- **The template test.** If someone could name the UI kit or the AI tool at a glance, the components need an opinion.
