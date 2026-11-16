#!/usr/bin/env node
// Pick a look for a new product so the choice does not default to the same indigo or emerald
// that every generated app uses. Deterministic: the same product name always gets the same pick.
//
// usage: node look.cjs "<product name>" <category> [--not <n>]
//   category: finance | crypto | fitness | habits | wellness | sleep | health | productivity | commerce | saas | food | travel | media | other
//   --not <n> skips the nth option (to re-deal if the first does not suit the brief)
//
// Prints the look, canvas, brand colour, accent, font and its mono partner. Treat it as the starting point for
// system.md's tokens; adjust shades for contrast, keep the character.

const LOOKS = {
  finance: [
    { look: 'monochrome', canvas: '#F4F4F2', brand: '#111111', accent: '#C6F432', font: 'Manrope', note: 'black cards and buttons, lime only for positive figures and the active state' },
    { look: 'fresh gradient', canvas: '#F3F6FB', brand: '#1F4BFF', accent: '#7DD3FC', font: 'Plus Jakarta Sans', note: 'deep blue payment card with a soft sky gradient, white glassy cards' },
    { look: 'dark with one neon', canvas: '#0E0F12', brand: '#B6F09C', accent: '#FFFFFF', font: 'Onest', note: 'near-black, dark grey cards, mint for balances and the primary action' },
    { look: 'bright and clean', canvas: '#F6F6F4', brand: '#1C3A2E', accent: '#E0892E', font: 'DM Sans', note: 'neutral off-white, deep forest cards and buttons, amber highlights' },
  ],
  fitness: [
    { look: 'dark with one neon', canvas: '#0B0B0D', brand: '#D4FF3A', accent: '#FFFFFF', font: 'Geist', note: 'near-black, lime for the progress ring, current bar and start button' },
    { look: 'monochrome', canvas: '#F4F4F2', brand: '#141414', accent: '#C9F158', font: 'Plus Jakarta Sans', note: 'off-white canvas, black controls and tab bar, lime highlights' },
    { look: 'bright and clean', canvas: '#F6F6F4', brand: '#FF5A1F', accent: '#141414', font: 'Manrope', note: 'orange for progress and actions, one black stat card' },
    { look: 'bright and clean', canvas: '#F5F5F3', brand: '#111111', accent: '#FF6A3D', font: 'Instrument Sans', note: 'black hero card, white cards, tomato for progress and actions' },
    { look: 'fresh gradient', canvas: '#EEF4FF', brand: '#2E5BFF', accent: '#FF8A3D', font: 'Onest', note: 'blue-to-sky gradient on the hero, white cards' },
  ],
  habits: [
    { look: 'bright and clean', canvas: '#F5F6F4', brand: '#1F2A24', accent: '#22A060', font: 'Plus Jakarta Sans', note: 'neutral canvas, deep green-black summary card, green completion' },
    { look: 'monochrome', canvas: '#F6F6F4', brand: '#111111', accent: '#FFB020', font: 'Instrument Sans', note: 'white rows, black summary card, amber for today' },
    { look: 'dark with one neon', canvas: '#0F0F12', brand: '#FF8A3D', accent: '#FFFFFF', font: 'Geist', note: 'dark rows, orange for today, one colour per habit only on its small check' },
    { look: 'bright and clean', canvas: '#F6F7FB', brand: '#FF6B4A', accent: '#2B2D42', font: 'Figtree', note: 'coral for progress and actions, ink summary card' },
    { look: 'bright and clean', canvas: '#F7F6F4', brand: '#2D1E2F', accent: '#F26B3A', font: 'Figtree', note: 'warm off-white, aubergine controls, orange rings' },
  ],
  wellness: 'habits', health: [
    { look: 'bright and clean', canvas: '#F4F7F8', brand: '#0E9F9A', accent: '#2F6FEB', font: 'Plus Jakarta Sans', note: 'teal for care actions, blue for data' },
    { look: 'fresh gradient', canvas: '#EEF5FF', brand: '#2F6FEB', accent: '#6EE7B7', font: 'Onest', note: 'blue gradient header card, mint for good results' },
    { look: 'bright and clean', canvas: '#F5F6F8', brand: '#2E2A5C', accent: '#0FA89A', font: 'DM Sans', note: 'neutral canvas, deep indigo, teal accents' },
  ],
  productivity: [
    { look: 'monochrome', canvas: '#F7F7F7', brand: '#111111', accent: '#FF5C35', font: 'Geist', note: 'black and white with one tomato accent' },
    { look: 'bright and clean', canvas: '#F5F6F8', brand: '#2563EB', accent: '#F59E0B', font: 'Inter', note: 'blue for actions and selection' },
    { look: 'monochrome', canvas: '#F5F5F4', brand: '#1E1B4B', accent: '#84CC16', font: 'Manrope', note: 'off-white canvas, ink controls, lime highlights' },
  ],
  commerce: [
    { look: 'bright and clean', canvas: '#F5F6F8', brand: '#0F766E', accent: '#F97316', font: 'Plus Jakarta Sans', note: 'teal for actions, orange for alerts; dark sidebar' },
    { look: 'monochrome', canvas: '#F4F4F5', brand: '#18181B', accent: '#22C55E', font: 'Geist', note: 'black sidebar and buttons, green for revenue' },
    { look: 'fresh gradient', canvas: '#F3F6FF', brand: '#3B5BFD', accent: '#FFB020', font: 'Figtree', note: 'blue gradient hero KPI, white cards' },
  ],
  saas: [
    { look: 'monochrome', canvas: '#FFFFFF', brand: '#0A0A0A', accent: '#3B82F6', font: 'Geist', note: 'white page, black buttons, blue in the product shot' },
    { look: 'fresh gradient', canvas: '#F7F8FC', brand: '#4338CA', accent: '#22D3EE', font: 'Plus Jakarta Sans', note: 'soft blue-violet glow behind the hero product shot' },
    { look: 'bright and clean', canvas: '#FBFBF9', brand: '#0F7B5F', accent: '#F59E0B', font: 'Manrope', note: 'green brand, warm off-white page' },
    { look: 'dark with one neon', canvas: '#0B0D10', brand: '#A3E635', accent: '#FFFFFF', font: 'Onest', note: 'dark page, lime CTA and highlights' },
  ],
  food: [
    { look: 'bright and clean', canvas: '#F8F7F5', brand: '#1F1F1F', accent: '#F0532B', font: 'Instrument Sans', note: 'warm white, tomato accents, photo-led cards' },
    { look: 'bright and clean', canvas: '#F7F7F5', brand: '#E4572E', accent: '#2E7D32', font: 'Plus Jakarta Sans', note: 'paprika actions, herb green for healthy tags' },
  ],
  travel: [
    { look: 'fresh gradient', canvas: '#EFF6FF', brand: '#0B63F6', accent: '#FFB703', font: 'Plus Jakarta Sans', note: 'sky gradient, sunshine accents, photo-led cards' },
    { look: 'monochrome', canvas: '#F5F5F4', brand: '#111111', accent: '#F97316', font: 'Manrope', note: 'black and white with sunset orange' },
  ],
  // categories whose products are usually dark: the content (artwork, charts, calm) glows on a dark ground
  media: [
    { look: 'dark with one neon', canvas: '#0B0B0E', brand: '#1ED760', accent: '#FFFFFF', font: 'Geist', note: 'near-black, album art carries the colour, green for play and the active tab' },
    { look: 'dark with one neon', canvas: '#101014', brand: '#FF5A5F', accent: '#FFFFFF', font: 'Inter', note: 'dark graphite, coral for play and progress, artwork large' },
    { look: 'dark with one neon', canvas: '#0E0D12', brand: '#B4A1FF', accent: '#FFD166', font: 'Manrope', note: 'deep ink, lavender for the active state, warm yellow for highlights' },
    { look: 'monochrome', canvas: '#F4F4F2', brand: '#111111', accent: '#FF4D2E', font: 'Instrument Sans', note: 'white and black, artwork as the only colour, one hot accent' },
  ],
  crypto: [
    { look: 'dark with one neon', canvas: '#0B0D10', brand: '#3DDC97', accent: '#FFFFFF', font: 'Geist', note: 'near-black, mint for gains and the primary action, large area chart' },
    { look: 'dark with one neon', canvas: '#0D0E12', brand: '#C6F432', accent: '#FFFFFF', font: 'Inter', note: 'graphite, lime for the chart line and actions' },
    { look: 'dark with one neon', canvas: '#0F1016', brand: '#7C8CFF', accent: '#3DDC97', font: 'Manrope', note: 'deep navy-black, periwinkle actions, mint for gains' },
    { look: 'monochrome', canvas: '#F5F5F3', brand: '#111111', accent: '#16A34A', font: 'Geist', note: 'white page, black cards and buttons, green only for gains' },
  ],
  sleep: [
    { look: 'dark with one neon', canvas: '#0E1020', brand: '#9C8CFF', accent: '#FFD9A0', font: 'Figtree', note: 'night-blue canvas, soft violet for the session, warm moonlight accent' },
    { look: 'dark with one neon', canvas: '#121018', brand: '#FF9F7A', accent: '#FFFFFF', font: 'DM Sans', note: 'deep plum-black, apricot for play and the streak' },
    { look: 'dark with one neon', canvas: '#0C0D10', brand: '#7DD3C0', accent: '#FFFFFF', font: 'DM Sans', note: 'graphite night, sea-green for the session and streak' },
  ],
  other: [
    { look: 'bright and clean', canvas: '#F6F7F9', brand: '#2563EB', accent: '#F59E0B', font: 'Plus Jakarta Sans', note: 'blue for actions' },
    { look: 'monochrome', canvas: '#F5F5F5', brand: '#111111', accent: '#FF5C35', font: 'Geist', note: 'black and white, one hot accent' },
    { look: 'monochrome', canvas: '#F4F4F2', brand: '#1F2A24', accent: '#A3D900', font: 'Manrope', note: 'off-white canvas, dark controls, lime highlights' },
  ],
};

const MONO = {"Inter": "JetBrains Mono", "Geist": "Geist Mono", "Manrope": "DM Mono", "Plus Jakarta Sans": "DM Mono", "DM Sans": "DM Mono", "Onest": "JetBrains Mono", "Figtree": "DM Mono", "Instrument Sans": "Geist Mono"};

const args = process.argv.slice(2);
const name = args[0];
let cat = (args[1] || 'other').toLowerCase();
const notIdx = args.indexOf('--not');
const skip = notIdx >= 0 ? Number(args[notIdx + 1]) : -1;
if (!name) { console.error('usage: node look.cjs "<product name>" <category> [--not <n>]'); process.exit(1); }
if (typeof LOOKS[cat] === 'string') cat = LOOKS[cat];
const list = LOOKS[cat] || LOOKS.other;
let h = 0x811c9dc5; for (const ch of name.toLowerCase()) { h ^= ch.codePointAt(0); h = Math.imul(h, 0x01000193) >>> 0; }
let i = h % list.length; if (i === skip) i = (i + 1) % list.length;
const p = list[i];
console.log(`Look for "${name}" (${cat}, option ${i} of ${list.length}):
  look:    ${p.look}
  canvas:  ${p.canvas}
  brand:   ${p.brand}
  accent:  ${p.accent}
  font:    ${p.font}
  mono:    ${MONO[p.font] || 'JetBrains Mono'} (meta, axis labels, counts)
  how:     ${p.note}
Use these as the starting tokens in system.md, and set the type per typography.md (weights 400/500/600, tracking and leading by size). Keep the character; adjust shades only for contrast.`);
