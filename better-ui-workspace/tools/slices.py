#!/usr/bin/env python3
"""Cut a run's screenshots into pieces a reviewer can read at full size.
usage: slices.py <outputs_dir> <dest_dir>
desktop.png -> desktop-N.png (1440x1200 slices); phone.png -> phone-sheet-N.png (columns of 1400px)."""
import os, shutil, sys
from PIL import Image
src, out = sys.argv[1], sys.argv[2]
shutil.rmtree(out, ignore_errors=True); os.makedirs(out)
d = Image.open(f'{src}/desktop.png').convert('RGB'); n = 0
for y in range(0, d.height, 1150):
    if d.height - y < 150 and n > 0: break
    n += 1; d.crop((0, y, d.width, min(d.height, y + 1200))).save(f'{out}/desktop-{n}.png')
p = Image.open(f'{src}/phone.png').convert('RGB'); w = p.width
segs = [p.crop((0, y, w, min(p.height, y + 1400))) for y in range(0, p.height, 1400)]
for i in range(0, len(segs), 4):
    row = segs[i:i + 4]; sheet = Image.new('RGB', (len(row) * (w + 20) + 20, 1440), (120, 120, 120))
    for j, s in enumerate(row): sheet.paste(s, (20 + j * (w + 20), 20))
    sheet.save(f'{out}/phone-sheet-{i // 4 + 1}.png')
if os.path.exists(f'{src}/phone-empty.png'): shutil.copy(f'{src}/phone-empty.png', f'{out}/phone-first-run.png')
print(out, sorted(os.listdir(out)))
