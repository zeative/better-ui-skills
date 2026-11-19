# Web pages: explore, then commit to a direction

Product UI wins by doing the conventional layout precisely. Web pages (landing, marketing, event, restaurant, hotel, property, portfolio, studio) win the opposite way: they are compared with the best of Awwwards, siteinspire and Httpster, where **art direction is the point** and the conventional layout reads as a template. A generated web page is almost always correct and forgettable: centred headline, two buttons, a screenshot or stock photo, rows of three cards. This file is how to do better.

The rest of the skill still applies as a **floor**: legible type, contrast, spacing from the scale, 44px targets, no overflow at any width, real content. It is not a ceiling. A direction may bring its own display face, display sizes up to about 160px (or a wordmark that fills the width), colour fields, full-bleed imagery, zero radius, unusual grids and motion.

Contents: the method · twelve directions · sections that read as designed · motion · what reads as generated · checks

Sources: Awwwards Sites of the Day and annual winners 2025–2026, siteinspire, Httpster, Linear, Vercel, Raycast, Apple, Aesop, Teenage Engineering, Nothing; trend reviews by Bubble, Figma, DesignRush, StudioMeyer and KOTA; web.dev and WebKit on scroll-driven animation.

## 1. The method

1. **Read the brief.** Who visits, the one thing the page must make them do, three concrete brand words, and the content you really have (product UI, photographs, a menu, listings, speakers, prices).
2. **Find references first** (`references.md`): the strongest current examples of this kind of page; let them suggest the directions. Then **write three one-line concepts from different families** below: one restrained (1, 2, 3), one expressive (4, 5, 9, 10, 11), one built from the content (6, 7, 8, 12). Each line names the kit (`kits.md`), the signature move and the hero composition. Example: *"Editorial kit: asymmetric 12-column spread, the photograph bleeding off the right edge, numbered captions, the menu as a typographic list."*
3. **Score each 1 to 5** on: fit to the audience and brand; whether the content can carry it (no photographs means no cinematic direction); distinctiveness against section 5; buildable in the target stack with good accessibility.
4. **Pick the highest. On a tie, take the bolder.** Say in one sentence why the others lost, and name the direction in the handoff.
5. **Choose the kit** (`kits.md`) that fits the direction: a poster in `swiss`, an editorial spread in `editorial`, cinematic photography in `editorial` or `showroom`, a dark product in `precision-dark`, a live demo in `precision`. The direction decides composition; the kit decides type, colour, radius and depth.
6. **Write a mini spec before code:** the grid, the image treatment, one signature motion, and which section pattern from section 3 replaces each default section. Type, colour, radius and depth come from the reference spec, starting from the kit.
7. **Carry it through.** The signature move appears in at least three places (hero, a mid-page section, the footer), so it reads as a system and not a hero trick. A bold hero followed by template sections is the most common way this fails.
8. **Audit** with `--register showcase`, check the result against section 5, and check 375px, reduced motion and contrast.

## 2. Twelve directions

Each: what it is, where it fits, and the moves that make it work.

### 1. Barely-there precision (dark product)
Near-black canvas, 1px hairlines at low opacity, one typeface, one accent; the hero is real product UI. **Fits** developer tools, SaaS, AI. **Not** hospitality, food, kids. *linear.app, vercel.com, raycast.com.*
- A tight grotesk at 56 to 72px, tracking −0.03em; body text in grey on #08090A.
- Sections divided by hairlines (`rgba(255,255,255,.08)`), not cards.
- One radial glow behind the product shot; numbered captions ("Fig 0.1"); mono for meta.
```css
.hero { background: radial-gradient(60% 50% at 50% 0%, oklch(.45 .12 var(--hue) / .35), transparent 70%), #08090a; }
.shot { border: 1px solid #ffffff14; border-radius: 12px; box-shadow: 0 0 0 1px #000, 0 40px 120px -20px #000; }
```

### 2. Editorial serif
A magazine spread: a high-contrast serif display, asymmetric columns, small captions, warm paper ground. **Fits** hospitality, restaurants, wine, beauty, architecture, property. **Not** dense B2B. *aesop.com, ossa.wine.*
- Serif display at 80 to 140px, light weight, italic for one accent phrase (Fraunces, Newsreader, Instrument Serif, Cormorant).
- 12-column grid: text in columns 2 to 6, image in 7 to 12 bleeding off the edge.
- Paper (#F4EFE6) and ink (#1D1B17), no accent or one muted one; photographs with captions and figure numbers; a pull quote in italic.
```css
.spread { display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; }
.spread h1 { grid-column: 2 / 8; font: 300 clamp(56px, 9vw, 144px)/.92 "Fraunces", serif; letter-spacing: -0.02em; }
.spread figure { grid-column: 8 / -1; margin-right: calc(-1 * var(--gutter)); }
```

### 3. Swiss catalogue / industrial
A product catalogue: a visible grid, hairline rules, a numbered index, objects on flat grey, tiny type against one huge element. **Fits** hardware, furniture, design studios, architecture, tools. *teenage.engineering, nothing.tech.*
- 11 to 13px uppercase mono labels against one very large element; numbered rows (001, 002).
- 1px rules everywhere, no cards, no shadows; monochrome plus one signal colour (red or orange); products cut out on #E8E8E8.
```css
.index li { display: grid; grid-template-columns: 4ch 1fr auto; border-top: 1px solid currentColor; padding: 12px 0; font: 500 12px/1.2 var(--mono); text-transform: uppercase; }
```

### 4. Typographic poster / giant wordmark
Type is the hero: a name, date or one sentence spans the viewport. **Fits** events, conferences, festivals, agencies, portfolios, fashion, launches. *locomotive.ca, a24films.com.*
- Size with `clamp()` to fill the width; leading 0.8 to 0.9; a condensed or wide display face (Archivo, Anton, Bricolage Grotesque, Familjen Grotesk, Instrument Serif).
- Small supporting text pinned to the corners; one or two bold shapes or a colour field may join the type.
- Kinetic type only in the hero, with the real text kept in the DOM.
```css
.mark { font: 800 clamp(64px, 19vw, 320px)/.82 "Archivo", sans-serif; letter-spacing: -0.05em; white-space: nowrap; }
```

### 5. Colour field
Each section one saturated flat colour, big flat type, a product or mascot. **Fits** consumer brands, drinks, events, kids, creator tools. **Not** finance, legal, health. *arc.net, liquiddeath.com.*
- Two or three loud colours as full-bleed blocks, with paired contrast (deep ink on the field, never grey); a heavy rounded or grotesk sans; sticker-like badges; the background changes per section.
```css
.band-a { background: var(--b9); color: var(--brand-ink); }
.band-b { background: var(--accent); color: #1a1400; }
```

### 6. Bento with an anchor
Tiles of different sizes, one large tile carrying the story; every tile is real content. **Fits** feature overviews, devices, food and drink. *apple.com product pages.* Plan the phone reading order first.
```css
.bento { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 220px; gap: 12px;
         grid-template-areas: "a a b c" "a a d d" "e f f g"; }
.bento > :first-child { grid-area: a; }
@media (max-width: 700px) { .bento { grid-template-areas: none; grid-template-columns: 1fr; } }
```

### 7. Sticky scroll story
Media pinned while text steps past and changes it. **Fits** product launches, explainers, drinks, property walkthroughs. *Apple product pages.*
```css
.story { display: grid; grid-template-columns: 1fr 1fr; }
.story .media { position: sticky; top: 0; height: 100svh; }
.story .step { min-height: 90svh; display: grid; align-content: center; }
```
Swap the media with an IntersectionObserver on `.step` setting `data-active`. On phones, stack each step with its own image.

### 8. Cinematic full bleed
An edge-to-edge photograph (or video) with sparse UI and type over the image. **Fits** hotels, villas, restaurants, property, automotive, travel, film.
- A 100svh hero; thin navigation; type over the image with a bottom scrim or `mix-blend-mode: difference`; a slow scale-in on load; the booking or enquiry action fixed in a corner.
- Use real photographs (Unsplash, see `editorial.md`); if there are none, choose another direction.
```css
.hero { height: 100svh; background: linear-gradient(to top, #0009, #0000 50%), url(photo.jpg) center/cover; }
```

### 9. Tactile / natural
Earth tones, paper, soft organic shapes, a warm serif or soft grotesk. **Fits** food, farms, wellness, skincare, craft. *graza.co, seed.com.* (On web pages a quiet grain is acceptable here; on product UI it is not.)
```css
body::after { content: ""; position: fixed; inset: 0; pointer-events: none; opacity: .06;
  background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"); }
```

### 10. Raw / brutalist mono
Zero radius, monospace, 1px black borders, overlapping windows, hard offset shadows, blue links. **Fits** indie tools, music, zines, galleries, developer side projects. **Not** luxury, health, finance.
```css
* { border-radius: 0 !important; }
body { font: 14px/1.5 "JetBrains Mono", monospace; background: #fff; color: #000; }
.win { border: 1px solid; box-shadow: 4px 4px 0 #000; }
```

### 11. Collage
Cut-out photographs, rotated stickers, tape, overlapping layers, hand lettering used sparingly. **Fits** cafés, events, community organisations, youth brands. *oatly.com.*
```css
.cut { position: absolute; rotate: -4deg; filter: drop-shadow(0 6px 0 #0002); }
.cut:nth-child(2n) { rotate: 3deg; }
```

### 12. Live product demo
The hero is a small working slice of the product (a command bar, a calendar, a search, a calculator) built in real HTML, pre-filled or typing itself, which the visitor can use. **Fits** apps, developer tools, AI products, fintech, property (a mortgage calculator). *raycast.com, notion.com/calendar.*

Also for portfolios and studios: **the index list**, a typographic list of projects with an image preview that follows the cursor on hover.

Directions mix: a cinematic hero with editorial sections, a poster hero with a Swiss schedule, a bento with a live demo tile. Keep one dominant voice.

## 3. Sections that read as designed

- **Features:** numbered chapters ("01", "Fig 0.2") each with a one-line claim and a real crop of the product; a sticky heading on the left with a scrolling list on the right; tabs that swap a live preview. Not identical icon cards.
- **Instead of three cards:** a numbered hairline list (01 / 02 / 03 with rules); a bento with one anchor tile; a horizontal scroll-snap rail; an accordion that swaps an image; one large statement with a two-column list of small print.
- **Proof:** one large figure inside a sentence ("used by 50,000 product teams"); a dated changelog as evidence of momentum; one large pull quote with name and role instead of six avatar cards; logos as one monochrome row or a slow marquee.
- **Pricing:** a hairline comparison table, or two plans plus "talk to us"; tabular figures; the price large. Hospitality uses a menu-style price list, not tiers.
- **Schedules, menus, listings:** a typographic table with rules and times in mono, not cards.
- **Footer as a destination:** an oversized wordmark, the full site map, address and hours, a newsletter field.
- **Rhythm:** alternate dense and airy sections; a full-bleed break (image or colour field) every two or three sections; vary section heights rather than one padding everywhere; change the ground at chapter boundaries; end on one strong statement and one action.

## 4. Motion that is cheap and good

- **One orchestrated entrance** on the hero (`animation-delay: calc(var(--i) * 60ms)`), not fades scattered over every section.
- **Scroll-driven reveals** in CSS, supported in current Chrome, Safari and Firefox; `animation-timeline` goes after the `animation` shorthand:
  ```css
  @media (prefers-reduced-motion: no-preference) { @supports (animation-timeline: view()) {
    .reveal { animation: up linear both; animation-timeline: view(); animation-range: entry 0% entry 60%; } } }
  @keyframes up { from { opacity: 0; translate: 0 40px; } }
  ```
- **Sticky** media or headings; a **scroll progress** bar (`animation-timeline: scroll()` on a scaleX bar).
- **Marquee** for logos or a ticker: duplicate the track, `aria-hidden` the copy, pause on hover.
  ```css
  .track { display: flex; width: max-content; animation: m 40s linear infinite; }
  .marquee:hover .track { animation-play-state: paused; }
  @keyframes m { to { translate: -50%; } }
  ```
- **Hover:** an image preview that follows the cursor on list rows; an underline that draws in; a 2 to 4px lift on tiles; colour inversion on brutalist buttons.
- **Guardrails:** non-essential motion only inside `prefers-reduced-motion: no-preference`; content visible without JavaScript (never default to `opacity: 0`); animate only transform and opacity; no scroll-jacking or smooth-scroll libraries; a pause control on anything that loops longer than five seconds.

## 5. What reads as a generated page

- Inter or the system font with an indigo or violet gradient on white.
- A centred hero with a "✨ New" pill, two buttons, then a "Trusted by" row of grey logos.
- Three icon cards for features; rounded corners and soft shadows on everything; glass cards.
- Blurred gradient blobs behind the hero.
- Every section fading up, every section with the same padding.
- Vague copy ("Supercharge your workflow"), invented stats ("10x faster"), four counters.
- Stock or AI images with a yellow cast; emoji or generic line icons as illustration.
- Three pricing tiers with "Most popular" on the middle one when the brief had no tiers.
- Six testimonial cards with avatars and five stars.
- A footer of four link columns and nothing else.

- And the new defaults that appear once agents learn the directions above: an oversized wordmark in every footer, a "Fig. 01" caption on everything, a giant serif on every page whatever the brand. A move belongs to its direction; use it where the direction calls for it, not as a habit.

Any of these on the page needs a reason, or it goes.

## 6. Checks

- Could this page belong to a competitor with the name swapped? If yes, the direction is not committed.
- Does the signature move appear in at least three places?
- Is any section the default pattern from section 5? Replace it with one from section 3.
- At 375px: the display type still fits (clamp), the grid stacks in reading order, the fixed actions do not cover content.
- Contrast of text over images and colour fields: 4.5:1 for body, 3:1 for large display type.
