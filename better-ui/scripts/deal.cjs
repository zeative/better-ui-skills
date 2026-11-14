#!/usr/bin/env node
/*
 * Deal one art direction from a shortlist, so the choice does not default to habit.
 *
 *   node deal.cjs "<product name>" <id> <id> <id>
 *
 * The pick is a stable function of the product name: the same product always gets
 * the same direction, and different products spread across the shortlist.
 * Pass --not <id> to exclude a direction the user already rejected.
 */
const KNOWN = ['aurora', 'midnight', 'citrus', 'pastel', 'graphite', 'ivory', 'glass', 'mono', 'roast', 'candy', 'clinic', 'sunset'];
const args = process.argv.slice(2);
const not = [];
for (let i = args.indexOf('--not'); i !== -1; i = args.indexOf('--not')) not.push(...args.splice(i, 2).slice(1));
const [name, ...ids] = args;
if (!name || ids.length < 2) {
  console.error('usage: node deal.cjs "<product name>" <id> <id> [<id> ...] [--not <id>]\nids: ' + KNOWN.join(', '));
  process.exit(2);
}
const unknown = ids.filter((i) => !KNOWN.includes(i));
if (unknown.length) { console.error(`unknown direction(s): ${unknown.join(', ')}\nknown: ${KNOWN.join(', ')}`); process.exit(2); }
const pool = [...new Set(ids)].filter((i) => !not.includes(i)).sort();
if (!pool.length) { console.error('nothing left to deal after exclusions'); process.exit(2); }
// FNV-1a over the lower-cased name
let h = 0x811c9dc5;
for (const ch of name.trim().toLowerCase()) { h ^= ch.codePointAt(0); h = Math.imul(h, 0x01000193) >>> 0; }
const pick = pool[h % pool.length];
console.log(`Direction for "${name}": ${pick}`);
console.log(`(dealt from: ${pool.join(', ')})`);
console.log('Now tune it: shift the accent toward the subject, choose the showpiece from what the product does, add one device of its own. Commit to it fully.');
