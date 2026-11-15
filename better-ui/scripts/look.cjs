#!/usr/bin/env node
// Pick a look for a new product so the choice does not default to the same indigo or emerald
// that every generated app uses. Deterministic: the same product name always gets the same pick.
//
// usage: node look.cjs "<product name>" <category> [--not <n>]
//   category: finance | fitness | habits | wellness | productivity | commerce | saas | health | food | travel | other
//   --not <n> skips the nth option (to re-deal if the first does not suit the brief)
//
// Prints the look, canvas, brand colour, accent and font. Treat it as the starting point for
// system.md's tokens; adjust shades for contrast, keep the character.

const LOOKS = {
  finance: [
    { look: 'monochrome', canvas: '#F4F4F2', brand: '#111111', accent: '#C6F432', font: 'Manrope', note: 'black cards and buttons, lime only for positive figures and the active state' },
    { look: 'fresh gradient', canvas: '#F3F6FB', brand: '#1F4BFF', accent: '#7DD3FC', font: 'Plus Jakarta Sans', note: 'deep blue payment card with a soft sky gradient, white glassy cards' },
    { look: 'dark with one neon', canvas: '#0E0F12', brand: '#B6F09C', accent: '#FFFFFF', font: 'Onest', note: 'near-black, dark grey cards, mint for balances and the primary action' },
    { look: 'soft tint', canvas: '#F5F1EA', brand: '#1C3A2E', accent: '#F2B880', font: 'DM Sans', note: 'warm sand canvas, deep forest cards and buttons, apricot highlights' },
  ],
  fitness: [
    { look: 'dark with one neon', canvas: '#0B0B0D', brand: '#D4FF3A', accent: '#FFFFFF', font: 'Sora', note: 'near-black, lime for the progress ring, current bar and start button' },
    { look: 'soft tint', canvas: '#F1EEFB', brand: '#141414', accent: '#C9F158', font: 'Plus Jakarta Sans', note: 'lilac canvas, black controls and tab bar, lime highlights' },
    { look: 'bright and clean', canvas: '#F6F6F4', brand: '#FF5A1F', accent: '#141414', font: 'Manrope', note: 'orange for progress and actions, one black stat card' },
    { look: 'colour blocks', canvas: '#F5F5F0', brand: '#111111', accent: '#FF7A45', font: 'Outfit', note: 'lime, lilac and peach stat cards, black hero card' },
    { look: 'fresh gradient', canvas: '#EEF4FF', brand: '#2E5BFF', accent: '#FF8A3D', font: 'Onest', note: 'blue-to-sky gradient on the hero, white cards' },
  ],
  habits: [
    { look: 'soft tint', canvas: '#EEF3EC', brand: '#1F2A24', accent: '#7BD389', font: 'Plus Jakarta Sans', note: 'sage canvas, deep green-black summary card, mint completion' },
    { look: 'colour blocks', canvas: '#F7F5F0', brand: '#111111', accent: '#FFC94A', font: 'Outfit', note: 'each habit a soft colour block, black summary card' },
    { look: 'dark with one neon', canvas: '#0F0F12', brand: '#FF8A3D', accent: '#FFFFFF', font: 'Sora', note: 'dark rows, each habit its own tint, orange for today' },
    { look: 'bright and clean', canvas: '#F6F7FB', brand: '#FF6B4A', accent: '#2B2D42', font: 'Figtree', note: 'coral for progress and actions, ink summary card' },
    { look: 'soft tint', canvas: '#FBF1EC', brand: '#2D1E2F', accent: '#FF9F7A', font: 'Urbanist', note: 'peach canvas, aubergine controls, apricot rings' },
  ],
  wellness: 'habits', health: [
    { look: 'bright and clean', canvas: '#F4F7F8', brand: '#0E9F9A', accent: '#2F6FEB', font: 'Plus Jakarta Sans', note: 'teal for care actions, blue for data' },
    { look: 'fresh gradient', canvas: '#EEF5FF', brand: '#2F6FEB', accent: '#6EE7B7', font: 'Onest', note: 'blue gradient header card, mint for good results' },
    { look: 'soft tint', canvas: '#F3F1FA', brand: '#3B2F6B', accent: '#8FD3C4', font: 'DM Sans', note: 'calm lavender canvas, deep indigo-ink text, sea-green accents' },
  ],
  productivity: [
    { look: 'monochrome', canvas: '#F7F7F7', brand: '#111111', accent: '#FF5C35', font: 'Geist', note: 'black and white with one tomato accent' },
    { look: 'bright and clean', canvas: '#F5F6F8', brand: '#2563EB', accent: '#F59E0B', font: 'Inter', note: 'blue for actions and selection' },
    { look: 'soft tint', canvas: '#F2F0EB', brand: '#1E1B4B', accent: '#A3E635', font: 'Manrope', note: 'paper canvas, ink controls, lime highlights' },
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
    { look: 'colour blocks', canvas: '#FBF7F0', brand: '#1F1F1F', accent: '#FF7043', font: 'Outfit', note: 'warm cream, tomato accents, colour-blocked categories' },
    { look: 'bright and clean', canvas: '#F7F7F5', brand: '#E4572E', accent: '#2E7D32', font: 'Plus Jakarta Sans', note: 'paprika actions, herb green for healthy tags' },
  ],
  travel: [
    { look: 'fresh gradient', canvas: '#EFF6FF', brand: '#0B63F6', accent: '#FFB703', font: 'Plus Jakarta Sans', note: 'sky gradient, sunshine accents, photo-led cards' },
    { look: 'monochrome', canvas: '#F5F5F4', brand: '#111111', accent: '#F97316', font: 'Manrope', note: 'black and white with sunset orange' },
  ],
  other: [
    { look: 'bright and clean', canvas: '#F6F7F9', brand: '#2563EB', accent: '#F59E0B', font: 'Plus Jakarta Sans', note: 'blue for actions' },
    { look: 'monochrome', canvas: '#F5F5F5', brand: '#111111', accent: '#FF5C35', font: 'Geist', note: 'black and white, one hot accent' },
    { look: 'soft tint', canvas: '#F1F0EC', brand: '#1F2A24', accent: '#C6F432', font: 'Manrope', note: 'stone canvas, dark controls, lime highlights' },
  ],
};

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
  how:     ${p.note}
Use these as the starting tokens in system.md. Keep the character; adjust shades only for contrast.`);
