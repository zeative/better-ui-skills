# The floor

Richness sits on top of these. A page that fails them looks careless or is unusable, whatever its art direction. The audit script measures most of them.

Contents: readability · type scale · layout · states · accessibility · CSS base · checklist without a browser

## Readability

- **Contrast:** 4.5:1 for text under 24px (under 18.66px if bold), 3:1 for larger text and for control boundaries. Muted text still has to pass. The usual failures are secondary text on tinted or dark surfaces and text over gradients, glass or imagery: give such text a solid enough panel or a darker tone.
- **Size:** 16px for reading text and anything on a phone; 13 to 14px for dense UI labels on desktop; nothing under 11px, and under 12px only for labels inside illustrative product mocks. Inputs on phones are 16px or iOS zooms the page.
- **Line length:** 45 to 75 characters for paragraphs. Line height 1.5 to 1.6 for body, 1.0 to 1.15 for display.
- Left-align paragraphs. Centre only short blocks.

## Type scale

Define the sizes once and use only those: 6 to 9 sizes on a marketing page, 5 to 7 in product UI (text inside an illustrative mock may add one or two small sizes). Sizes that differ by a pixel look like mistakes. Two families at most, plus an optional mono. Two or three weights per family.

## Layout

- **No horizontal scroll** at 320, 375, 768, 1024 or 1440px. Absolutely positioned decoration and floating cards are the usual cause on phones: clip them with `overflow: clip` on the section or reposition them. A visually hidden `table` must be wrapped in a hidden block, because a table ignores `overflow: hidden` on itself.
- **One grid** for the page; column edges recur from section to section. Edges that nearly align look worse than edges that clearly differ.
- **Rows of like items** align internally: titles, values and buttons at the same height in each item.
- **Radii:** a scale of three or four values, nested concentrically.
- **Wrapping:** `text-wrap: balance` on headings, `pretty` on paragraphs. No single word or unit alone on a line; no single chip alone on a wrapped row.
- Images and illustrations have dimensions so nothing jumps while loading.

## States

Every interactive element has hover, `:focus-visible`, pressed and disabled styles. Every data view has empty, loading, populated, overflowing and error states. Controls on screen do something. User data persists when a person would expect it to.

## Accessibility

- Semantic HTML: `button` for actions, `a` for navigation, `label` for every field, one `h1`, headings in order, landmarks (`header`, `nav`, `main`, `footer`), `lang` on `<html>`, a viewport meta tag.
- Everything works by keyboard with a visible focus ring. Dialogs trap focus and close on Escape.
- Icon-only buttons have `aria-label`. Decorative SVG and images are `aria-hidden` or have empty `alt`. Charts have an accessible name stating the takeaway.
- Nothing is conveyed by colour alone.
- Targets at least 24×24px everywhere and 44×44px for touch.
- `prefers-reduced-motion` removes movement.

## CSS base

```css
* { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }
body { margin: 0; line-height: 1.55; -webkit-font-smoothing: antialiased; background: var(--bg); color: var(--ink); }
h1, h2, h3 { text-wrap: balance; margin: 0; }
p { text-wrap: pretty; margin: 0; }
img, svg, video { display: block; max-width: 100%; }
button, input, select, textarea { font: inherit; color: inherit; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
}
```

Useful: `clamp()` for fluid type and spacing, `min-height: 100dvh` on phones, `env(safe-area-inset-*)` for fixed bars, container queries for components used at several widths, `color-mix()` for tints, `subgrid` for aligned card internals.

## Checklist without a browser

1. List every `font-size`, `border-radius` and `box-shadow`. Do they come from a small scale?
2. For each text colour and the surface it sits on, compute contrast, starting with muted text and text on tinted or dark surfaces.
3. At 375px, add up fixed widths, paddings and absolutely positioned elements in each section. Does anything exceed the viewport?
4. Does every interactive element have hover, focus and pressed styles, and a handler?
5. Do lists of people, places or products show their real image (a photo, an avatar), while stat tiles stay a label, a figure and its change, and sections carry content rather than decoration?
6. Is there a viewport tag, a `lang`, one `h1`, a label for every input?
7. Score the page against `critique.md` from the source, imagining each screen.
