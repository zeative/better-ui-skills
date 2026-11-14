// Shared sample history, so both versions are photographed with the same data.
const pad = (n) => String(n).padStart(2, '0');
const key = (back) => { const n = new Date(); const d = new Date(n.getFullYear(), n.getMonth(), n.getDate() - back); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const days = (list) => Object.fromEntries(list.map((b) => [key(b), true]));
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const HABITS = [
  ['Read 20 pages', range(0, 11)],
  ['Morning run', [...range(1, 5), 8, 9, 10]],
  ['Practice guitar for at least fifteen minutes', [0, 2, 3, 6, 7, 9]],
  ['No phone after 10 pm', [2, 3, 4, 12, 13]],
  ['Take vitamins', range(0, 33)],
];
const ICON=['book','shoe','leaf','moon','drop'];
localStorage.setItem('daychain.v1', JSON.stringify({ habits: HABITS.map(([name, d], i) => ({ id: 'h' + i, name, icon: ICON[i], created: key(40), done: days(d) })) })); setTimeout(() => location.reload(), 0);
