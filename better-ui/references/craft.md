# Craft floor

Concrete rules for execution. They are the floor, not the design: a page can pass all of them and still be generic, and a page that fails them looks careless no matter how good the idea is. Each rule states when it applies, because the right number for a marketing headline is wrong for a data table.

Contents: typography · colour · spacing and layout · surfaces · icons and images · states · motion · writing · accessibility · CSS that does the work for you · checklist without a browser

## Typography

- **Scale.** Define the sizes once and use only those. Product UI: 5 to 6 sizes, neighbours about 1.125 to 1.2 apart (for example 12, 13, 14, 16, 20, 24). Marketing: 6 to 8 sizes with bigger jumps, at least 1.25 apart, and a display size that is clearly a different order of magnitude from body. Sizes that differ by half a pixel or one pixel look like mistakes.
- **Body size.** 16px minimum for reading text and for anything on a phone. Dense product UI may use 13 to 14px for table cells and secondary labels on desktop. Nothing below 12px, ever. Inputs on mobile need 16px or iOS zooms the page on focus.
- **Line height.** Body 1.45 to 1.6. Dense UI text 1.3 to 1.45. Headings 1.05 to 1.25; the larger the type, the tighter. Set it unitless.
- **Line length.** 45 to 75 characters for paragraphs (`max-width: 65ch`). A full-width paragraph on a desktop screen is the most common readability failure.
- **Weight.** Two or three weights. Build hierarchy with size and colour first, weight second. Avoid light weights below 400 for body text; they fail contrast on most screens.
- **Tracking.** Large display type: tighten slightly, -0.01 to -0.03em. Body: leave alone. Uppercase labels: open up, +0.04 to +0.08em, and keep them short.
- **Alignment.** Left-align paragraphs. Centre only short things: a headline, a one-line subhead. More than three centred lines is hard to read.
- **Numbers.** `font-variant-numeric: tabular-nums` wherever numbers are compared or change in place (tables, prices, timers, stats). Right-align numeric columns. Use the locale's separators and currency format.
- **Wrapping.** `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs. Check that no heading leaves one word alone on a line. Keep a number with its unit and the last two words of a label together with non-breaking spaces or `white-space: nowrap`. In a wrapping row of chips or links, avoid a single item alone on the last line: change the gap, the wording or the count.
- **Details.** Real quotation marks and apostrophes (’ “ ”), a real ellipsis (…), × for dimensions, a non-breaking space between a number and its unit.
- **Case.** Sentence case for headings, buttons and labels. Pick one convention and keep it.

## Colour

- **Roles, not names.** `--surface`, `--surface-raised`, `--ink`, `--ink-muted`, `--border`, `--accent`, `--accent-ink`, `--danger`. Components reference roles only, so the palette can change in one place and dark mode is a second set of values.
- **Proportion.** Most of the screen is neutral. The accent is rare, which is what makes it work. When everything is coloured, nothing is emphasised.
- **Contrast.** 4.5:1 for text under 24px (under 18.66px if bold), 3:1 for larger text and for the boundaries of controls. Secondary text still has to pass: muted does not mean illegible. Do not put grey text on a coloured surface; use a darker or lighter tint of that surface's hue.
- **Text is never pure black on pure white** for long reading; a very dark tinted ink on a very slightly tinted ground is easier on the eye. For dense data UI, high contrast is correct.
- **Status.** Success, warning, danger and info each get one colour used only for that meaning, always with a word or icon alongside.
- **Not everything good is green.** A change indicator is only "good" if the direction is good for that metric. Do not colour neutral facts.
- **Dark mode**, when you offer it: surfaces get lighter as they come forward, saturation comes down, shadows mostly disappear, borders do more work. Set `color-scheme` so form controls and scrollbars follow.

## Spacing and layout

- **One scale**, 4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96. Every margin, padding and gap comes from it.
- **Proximity is the main grouping tool.** Space inside a group is clearly smaller than space between groups (aim for a 2:1 ratio or more). A heading sits closer to the content it introduces than to what came before it.
- **Space before boxes.** Reach for distance first, a rule second, a background tint third, and a bordered or shadowed card last. Cards are for things that are objects (a draggable item, a selectable option, a self-contained record), not for every section.
- **Do not nest cards.** A box inside a box inside a box is a sign the grouping was never decided.
- **Alignment.** Pick a small number of vertical edges and put everything on them. Text aligns with text: when a container has padding, its neighbours' text should line up with its text, not its border.
- **One grid per page.** Define the columns once (12 columns with a fixed gutter is the usual choice) and build every section from spans of it, so that a two-column section, a three-column section and a four-column section all share edges. Two edges 30px apart in neighbouring sections look like a mistake.
- **Rows of like items.** When similar items sit side by side (stats, plans, feature blurbs, cards), their internal parts align across the row: titles on one line, values on one baseline, buttons at one height. Use `grid` with `subgrid`, or fixed heights for the variable part, so one long label does not knock its item out of step.
- **Balance.** Side-by-side columns should end at roughly the same height. A short column beside a long one leaves a hole.
- **Width.** Content has a maximum width (roughly 1100 to 1280px for a page, 65ch for prose). Side gutters at least 16px on phones, 24px or more above that.
- **Responsive.** Design the narrow layout as its own thing: stack, reorder, collapse navigation, turn tables into something readable. Use fluid sizes (`clamp()`) for display type and section spacing. Test 320, 375, 768, 1024, 1440. No horizontal scroll at any of them, except inside a deliberately scrollable region such as a wide table.
- **Asymmetry is allowed.** Equal columns and centred stacks are the default; a layout that gives the important thing more room usually communicates better.

## Surfaces

- **Radius.** Two or three values (for example 4 for small controls, 8 for containers, full for pills). When one rounded shape sits inside another, inner radius = outer radius − the padding between them, or the corners look pinched.
- **Elevation.** Choose one approach per interface: flat with rules, or bordered surfaces, or shadows. If shadows, a scale of two or three, each made of two layers (a tight one and a soft one), low opacity, tinted with the ink colour, offset downward. A hairline border plus a large blurry shadow on the same element is a tell.
- **Borders** are quieter than you think they need to be. A border that is visible at a glance is usually too dark.

## Icons and images

- One icon set, one stroke weight, one size per context. Match the stroke to the text weight beside it.
- An icon beside a label must add recognition speed. An icon alone must be universally understood (close, search, menu) and have an accessible name.
- Do not use emoji as interface icons: they render differently on every platform and cannot be styled.
- Images need dimensions (`width`/`height` or `aspect-ratio`) so the layout does not jump, and `alt` text (empty if decorative).
- When there is no real imagery, do not fake it with abstract blobs. Show the product (build the real interface fragment in HTML), show the data, or use typography.

## States

Every interactive element: default, hover, focus-visible, active/pressed, disabled, and loading if it triggers work.

Every view that shows data: loading, empty, one item, many items, error, and the too-long case (a 60-character name, a seven-digit number).

- Hover and pressed states are a real change (background, border, slight shade), not just `opacity: 0.8`. Gate hover styles with `@media (hover: hover)` so they do not stick on touch.
- Focus: a clear ring using `:focus-visible`, at least 2px, offset from the element, 3:1 against its surroundings. Never remove the outline without replacing it.
- Disabled elements look disabled and say why when it is not obvious.
- Loading: for waits under about 300ms show nothing; after that show a skeleton shaped like the content or a spinner on the control that was pressed. Keep the layout stable.
- Empty states say what will appear here and offer the action that fills it. They are often the first thing a new user sees, so they deserve design.
- Errors say what happened and what to do next, next to where it happened. Never only a red border.

## Motion

Motion is for explaining change: where something came from, where it went, that the press registered. If it does not explain anything, leave it out.

- **Duration.** Press feedback 100 to 150ms. Small state changes, tooltips, menus 150 to 250ms. Larger panels and dialogs 200 to 350ms. Anything longer feels slow by the tenth time.
- **Easing.** Ease-out for things entering or responding to the user; ease-in-out for things moving on screen. No bounce or elastic in tools.
- **Properties.** Animate `transform` and `opacity`. Name the properties; never `transition: all`.
- **Frequency test.** The more often an action happens, the less it should animate. Things triggered by keyboard or done dozens of times a day get no animation at all.
- **No entrance choreography by default.** Fading every section up as it scrolls into view explains nothing and delays the content. At most one orchestrated moment on a marketing page, if it earns its place.
- **Reduced motion.** Under `prefers-reduced-motion: reduce`, remove movement and keep at most a quick fade.

## Writing

- Name things the way the user does, and use the same word everywhere for the same thing.
- Headings state the point, not the category. "Backups run every 15 minutes" beats "Features".
- Buttons: verb plus object. The confirmation uses the same verb ("Archive" then "Archived").
- No filler adjectives and no vocabulary that fits every product equally: seamless, powerful, effortless, elevate, unlock, supercharge, all-in-one, next-generation.
- One idea per sentence. Cut the subtitle if it only restates the title.
- Do not narrate the interface ("Here you can see your orders"). Do not leave instructions to yourself or references to the brief in the UI.
- Use the content's language consistently, including dates, numbers and currency.

## Accessibility

- Semantic HTML first: `button` for actions, `a` for navigation, `label` for every field, `table` for tabular data, headings in order with one `h1`, landmarks (`header`, `nav`, `main`, `footer`).
- `lang` on `<html>`, a meaningful `<title>`, a viewport meta tag.
- Everything works with the keyboard alone, in a sensible order, with visible focus. Dialogs trap focus and close on Escape.
- Icon-only buttons have `aria-label`. Decorative images and icons are hidden from assistive tech.
- When you hide content visually for screen readers (a data table behind a chart, for instance), wrap it in a hidden block element. A `table` ignores `overflow: hidden` on itself and will silently widen the page on phones.
- Do not convey anything by colour alone. Do not rely on placeholder text as a label.
- Targets at least 24×24px everywhere, 44×44px for touch. Expand the hit area with padding rather than making the visual bigger.
- Announce dynamic changes that matter (`aria-live` for toasts and inline validation).

## CSS that does the work for you

```css
:root { color-scheme: light dark; }
* { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }
body { margin: 0; line-height: 1.5; -webkit-font-smoothing: antialiased; }
h1, h2, h3 { text-wrap: balance; }
p { text-wrap: pretty; max-width: 65ch; }
img, svg, video { display: block; max-width: 100%; }
button, input, select, textarea { font: inherit; color: inherit; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
}
```

Also useful: `clamp()` for fluid type and spacing; `min-height: 100dvh` rather than `100vh` on mobile; `env(safe-area-inset-*)` for fixed bars on phones; container queries for components that live in different widths; `scrollbar-gutter: stable` to stop layout shift; logical properties (`padding-inline`, `margin-block`) for anything that might be translated.

## Checklist without a browser

If you cannot render the page, walk the source with these questions.

1. List every `font-size` in the file. More than 8 distinct values, or values 1px apart? Consolidate.
2. List every `border-radius` and every `box-shadow`. More than 3 of each? Consolidate.
3. List every colour. Is each one a token? Compute contrast for each text and background pair, starting with the muted text colour.
4. For each interactive element: is there a hover rule, a `:focus-visible` rule, a disabled style?
5. For each data view: where is the empty state, and the error state?
6. At 375px wide: add up the fixed widths and paddings in each row. Does anything exceed the viewport? Are tap targets 44px?
7. Is there a `<meta name="viewport">`, a `lang`, exactly one `h1`, a label for every input?
8. Search the copy for the filler words in the Writing section and for any invented numbers or testimonials.
