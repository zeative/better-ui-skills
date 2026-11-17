#!/usr/bin/env node
// Generate the colour system from one brand colour: a 12-step brand scale, a 12-step neutral scale
// tinted toward the brand hue, semantic scales, and role tokens, as CSS custom properties.
//
// usage: node palette.cjs "#2F6BFF" [--dark] [--tint 0.012] [--solid "#111111"]
//   --dark        print the dark theme on :root (default prints light on :root and dark under .theme-dark)
//   --solid <hex> monochrome looks: buttons and controls in this near-black (or near-white) colour, while the
//                 scale (tints, chart, progress, active states) comes from the first colour
//   --tint <c>    neutral tint chroma: 0.006 crisp, 0.012 default, 0.018 warm and rich
//
// Steps follow Radix Colors' roles (1 app background ... 12 high-contrast text); lightness and chroma
// curves are averaged from Radix scales measured in OKLCH, checked against Material 3 and Apple's system
// colours. Colours are reduced in chroma until they fit sRGB; lightness and hue never move.

const args = process.argv.slice(2);
const hex = args.find((a, i) => /^#?[0-9a-f]{6}$/i.test(a) && args[i - 1] !== '--solid');
if (!hex) { console.error('usage: node palette.cjs "#RRGGBB" [--dark] [--tint 0.012]'); process.exit(1); }
const ti = args.indexOf('--tint'); const T = ti >= 0 ? Number(args[ti + 1]) : 0.012;
const darkOnRoot = args.includes('--dark');
const si = args.indexOf('--solid'); const solid = si >= 0 ? args[si + 1].replace('#', '').toUpperCase() : null;

// --- colour maths (OKLab / OKLCH <-> linear sRGB)
const toLin = (u) => (u <= 0.04045 ? u / 12.92 : ((u + 0.055) / 1.055) ** 2.4);
const fromLin = (x) => { x = Math.min(Math.max(x, 0), 1); return x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055; };
function hexToOklch(h) {
  h = h.replace('#', ''); const [r, g, b] = [0, 2, 4].map((i) => toLin(parseInt(h.slice(i, i + 2), 16) / 255));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return [L, Math.hypot(A, B), ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360];
}
function oklchToLin(L, C, H) {
  const a = C * Math.cos((H * Math.PI) / 180), b = C * Math.sin((H * Math.PI) / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3, m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3, s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
}
const inGamut = (L, C, H) => oklchToLin(L, C, H).every((x) => x >= -1e-4 && x <= 1 + 1e-4);
const fit = (L, C, H) => { while (C > 0 && !inGamut(L, C, H)) C -= 0.002; return Math.max(C, 0); };
const toHex = (L, C, H) => '#' + oklchToLin(L, C, H).map((x) => Math.round(fromLin(x) * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
const lum = (L, C, H) => { const [r, g, b] = oklchToLin(L, C, H).map((x) => Math.min(Math.max(x, 0), 1)); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const contrast = (p, q) => { const a = lum(...p), b = lum(...q); return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05); };

// --- curves (L and chroma factor per step)
const BL = [0.993, 0.982, 0.960, 0.935, 0.904, 0.862, 0.807, 0.730, null, null, 0.520, 0.320];
const BC = [0.02, 0.06, 0.12, 0.20, 0.28, 0.38, 0.48, 0.64, 1.0, 0.97, 0.85, 0.50];
const DL = [0.190, 0.215, 0.270, 0.315, 0.360, 0.405, 0.460, 0.525, null, null, 0.775, 0.910];
const DC = [0.12, 0.16, 0.36, 0.50, 0.56, 0.60, 0.65, 0.74, 1.0, 0.93, 0.65, 0.25];
const NL = [0.991, 0.982, 0.956, 0.932, 0.909, 0.887, 0.853, 0.794, 0.645, 0.611, 0.502, 0.241];
const ND = [0.179, 0.213, 0.252, 0.284, 0.312, 0.348, 0.400, 0.489, 0.537, 0.583, 0.769, 0.949];
const NK = [0.25, 0.35, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.0, 1.0, 0.95, 0.8];
const NKD = [0.35, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.0, 1.0, 0.75, 0.3];

function scale(L9, C9, H, dark) {
  L9 = Math.min(Math.max(L9, 0.45), 0.80); C9 = Math.min(Math.max(C9, 0.10), 0.26);
  return Array.from({ length: 12 }, (_, i) => {
    const L = dark ? (DL[i] ?? (i === 8 ? L9 : L9 + 0.04)) : (BL[i] ?? (i === 8 ? L9 : L9 - 0.03));
    return [L, fit(L, C9 * (dark ? DC : BC)[i], H), H];
  });
}
const neutral = (H, dark) => Array.from({ length: 12 }, (_, i) => { const L = (dark ? ND : NL)[i]; return [L, fit(L, T * (dark ? NKD : NK)[i], H), H]; });

const [Lin, C0, H] = hexToOklch(hex);
// The solid step carries white text when it can. A mid-tone brand (L up to 0.68) is darkened just enough
// for 4.5:1 with white (at most 0.10 in L, so it stays recognisably the brand); a light brand (yellow,
// lime, bright orange) keeps its lightness and gets dark text instead.
let L0 = Lin, whiteInk = false;
for (let L = Lin; L >= Lin - 0.10 && Lin <= 0.68; L -= 0.005) {
  if (contrast([1, 0, 0], [L, fit(L, C0, H), H]) >= 4.5) { L0 = L; whiteInk = true; break; }
}
const exact = L0 === Lin; // keep the brand's own hex for step 9 when it was not adjusted
function block(dark) {
  const b = scale(L0, C0, H, dark), n = neutral(H, dark);
  b[8] = [L0, fit(L0, C0, H), H];
  const lifted = dark && L0 < 0.5; // a deep brand would vanish on a dark canvas: lift it for the dark theme
  if (lifted) { b[8] = [0.68, fit(0.68, Math.max(C0, 0.12), H), H]; b[9] = [0.72, fit(0.72, Math.max(C0, 0.12), H), H]; }
  const sem = (h) => scale(0.60, 0.16, h, dark);
  const ok = sem(150), warn = sem(75), bad = sem(25);
  const ink = whiteInk && !lifted ? '#FFFFFF' : toHex(...neutral(H, false)[11]);
  const lines = [];
  b.forEach((c, i) => lines.push(`--b${i + 1}: ${i === 8 && exact && !lifted ? '#' + hex.replace('#', '').toUpperCase() : toHex(...c)};`));
  n.forEach((c, i) => lines.push(`--n${i + 1}: ${toHex(...c)};`));
  lines.push(`--ok-3: ${toHex(...ok[2])}; --ok-9: ${toHex(...ok[8])}; --ok-11: ${toHex(...ok[10])};`);
  lines.push(`--warn-3: ${toHex(...warn[2])}; --warn-9: ${toHex(...warn[8])}; --warn-11: ${toHex(...warn[10])};`);
  lines.push(`--bad-3: ${toHex(...bad[2])}; --bad-9: ${toHex(...bad[8])}; --bad-11: ${toHex(...bad[10])};`);
  lines.push(`--hue: ${H.toFixed(1)}; /* brand hue, for tinted shadows: oklch(0.30 0.03 var(--hue) / .08) */`);
  lines.push('/* roles */');
  if (dark) {
    lines.push('--canvas: var(--n1); --surface: var(--n2); --surface-raised: var(--n3); --well: var(--n1);');
  } else {
    lines.push('--canvas: var(--n2); --surface: #FFFFFF; --surface-raised: #FFFFFF; --well: var(--n3);');
  }
  lines.push('--line: var(--n6); --line-input: var(--n7); --line-strong: var(--n8);');
  lines.push('--text-1: var(--n12); --text-2: var(--n11); --text-3: var(--n9);');
  if (solid) {
    // a near-black solid becomes near-white on a dark theme (and the reverse), so controls stay visible
    const sc = hexToOklch(solid); let light = sc[0] > 0.6, sol = '#' + solid;
    if (dark && !light) { sol = toHex(...n[11]); light = true; } else if (!dark && light && sc[1] < 0.03) { sol = toHex(...n[11]); light = false; }
    lines.push(`--brand: ${sol}; --brand-hover: color-mix(in oklch, ${sol}, ${light ? 'black' : 'white'} 10%); --brand-ink: ${light ? toHex(...n[dark ? 0 : 11]) : '#FFFFFF'}; --brand-text: var(--b11);`);
  } else lines.push(`--brand: var(--b9); --brand-hover: var(--b10); --brand-ink: ${ink}; --brand-text: var(--b11);`);
  lines.push('--tint: var(--b3); --tint-hover: var(--b4); --tint-pressed: var(--b5); --tint-line: var(--b6); --callout: var(--b2);');
  lines.push('--focus: var(--b9);');
  lines.push('--up: var(--ok-11); --down: var(--bad-11); --warning: var(--warn-11);');
  lines.push('--chart-1: var(--b9); --chart-compare: var(--n8); --chart-grid: var(--n4);');
  lines.push('--chart-area: linear-gradient(to bottom, color-mix(in oklch, var(--b9) 20%, transparent), transparent);');
  const r = (p, q) => contrast(p, q).toFixed(1);
  const canvas = dark ? n[0] : n[1], surf = dark ? n[1] : [1, 0, 0];
  lines.push(`/* contrast: text-1 ${r(n[11], canvas)}, text-2 ${r(n[10], surf)}, text-3 ${r(n[8], surf)}, brand-text on tint ${r(b[10], b[2])}, brand-ink on brand ${solid ? 'see --solid' : whiteInk ? r([1, 0, 0], b[8]) : r(neutral(H, false)[11], b[8])} */`);
  const sh = `${(0.30).toFixed(2)} 0.03 ${H.toFixed(1)}`;
  if (dark) {
    lines.push('--shadow-pop: 0 0 0 1px var(--n6); --shadow-sheet: 0 0 0 1px var(--n6);');
    lines.push('--highlight: inset 0 1px 0 oklch(1 0 0 / 0.08);');
  } else {
    lines.push(`--shadow-card: 0 1px 2px oklch(${sh} / 0.06), 0 2px 4px oklch(${sh} / 0.04);`);
    lines.push(`--shadow-pop: 0 2px 4px oklch(${sh} / 0.06), 0 8px 16px oklch(${sh} / 0.08);`);
    lines.push(`--shadow-sheet: 0 4px 8px oklch(${sh} / 0.06), 0 16px 32px oklch(${sh} / 0.10);`);
    lines.push('--shadow-brand: 0 4px 12px color-mix(in oklch, var(--brand) 28%, transparent);');
    lines.push('--highlight: inset 0 1px 0 oklch(1 0 0 / 0.7);');
  }
  return lines.map((l) => '  ' + l).join('\n');
}

const head = `/* palette for ${hex.toUpperCase()}${solid ? ' with solid #' + solid : ''} (OKLCH ${L0.toFixed(3)} ${C0.toFixed(3)} ${H.toFixed(1)}), neutral tint ${T}. Generated by palette.cjs; do not edit by hand. */`;
if (darkOnRoot) console.log(`${head}\n:root {\n  color-scheme: dark;\n${block(true)}\n}`);
else console.log(`${head}\n:root {\n${block(false)}\n}\n.theme-dark, :root[data-theme="dark"] {\n  color-scheme: dark;\n${block(true)}\n}`);
