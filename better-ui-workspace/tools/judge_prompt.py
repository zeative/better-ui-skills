#!/usr/bin/env python3
"""Print the Dribbble-bar judge prompt for one case. usage: judge_prompt.py <case> <cand_dir> [<cand_dir2> ...]"""
import sys, os, json
SP=os.path.dirname(os.path.abspath(__file__))
args=[a for a in sys.argv[1:] if a!='--phone-first']; phone_first='--phone-first' in sys.argv
case=args[0]; cands=args[1:]
info={
 'saas-landing-page':('landing','a landing page','"Build a landing page for Ledgerly, an invoicing tool for freelancers. It needs a hero, a features section, pricing, and a signup call to action. Put everything in a single index.html."'),
 'store-admin-dashboard':('dashboard','an admin dashboard','"Bikin halaman dashboard admin untuk toko online kecil yang jualan biji kopi. Tampilkan ringkasan penjualan hari ini, grafik penjualan 7 hari terakhir, pesanan terbaru, dan produk terlaris. Datanya dummy aja. Satu file index.html." (Indonesian: an admin dashboard for a small online coffee-bean shop: today\'s sales summary, a 7-day sales chart, recent orders, best sellers; dummy data)'),
 'pos-landing-page':('pos','a landing page for a point-of-sale (cashier) product','"Bikin landing page buat Warungku, aplikasi kasir (POS) buat warung dan UMKM. Satu file index.html." (Indonesian: a landing page for Warungku, a cashier/POS app for small shops and small businesses)'),
 'finance-app':('finance','a personal finance app','"build a personal finance app: balance, recent transactions, spending by category and a monthly budget. single index.html, mobile first but should look good on desktop too"'),
 'photographer-portfolio':('portfolio','a photographer portfolio website','"I need a portfolio website for a freelance wedding and portrait photographer called Raka Aditya, based in Bandung. One index.html."'),
 'workout-app':('workout','a workout tracker app','"make a workout tracker app. today\'s workout with exercises, sets and reps i can tick off, and my progress for the week. single index.html, mobile first"'),
 'clinic-dashboard':('clinic','a clinic or healthcare admin dashboard','"Buatkan dashboard untuk klinik gigi kecil: jadwal janji temu hari ini, pasien yang sedang menunggu, dokter yang bertugas, dan pendapatan minggu ini. Data dummy. Satu file index.html." (Indonesian: a dashboard for a small dental clinic: today\'s appointments, patients waiting, dentists on duty, this week\'s revenue; dummy data)'),
 'habit-tracker-app':('habit','a habit tracker app','"make me a habit tracker web app. i want to add habits, tick them off each day and see my streaks. single index.html file, and it should work on my phone too"'),
}[case]
refdir=f'{SP}/refs/{info[0]}'
labels='XYZW'
lines=[]
for i,c in enumerate(cands):
    files=sorted(f for f in os.listdir(c) if f.endswith('.png'))
    if phone_first:
        lines.append(f'- Candidate {labels[i]}: folder {c}/ with files: {", ".join(files)}. phone-hd-N.png show the app on a 375pt-wide phone at 2x resolution, cut into columns that read left to right: THIS IS THE PRIMARY DESIGN. desktop-N.png are slices of the same app in a 1440px desktop window, a secondary adaptation.')
    else:
        lines.append(f'- Candidate {labels[i]}: folder {c}/ with files: {", ".join(files)}. desktop-N.png are consecutive slices of the page at 1440px wide, top to bottom; phone-sheet-N.png shows it at 375px wide cut into columns that read left to right' + ('; phone-first-run.png is the empty first-run state.' if 'phone-first-run.png' in files else '.'))
PHONE_NOTE = ("The brief is mobile-first and the reference shots are phone screens, so judge the phone view as the design: base the parity score and sub-scores on the phone images, and mention the desktop adaptation only in the gaps if it has problems. " if phone_first else "")
print(f"""You are a senior visual designer who knows Dribbble well: you have posted there for years and you know what the popular shots in each category look like and why they get attention. Your job is to judge how close some candidate designs come to that bar on VISUAL DESIGN QUALITY.

Reference set: eight currently popular Dribbble shots for {info[1]}, in {refdir}/ref-1.png … ref-8.png (1200×900 each). Read all eight first and form a clear picture of the bar: the art direction, the richness and detail of the visuals, depth and lighting, colour, typography, composition, density of designed detail, and overall polish. Ignore pure presentation tricks in the references that are not part of the interface itself (device mockups, photos of desks, tilted perspective, the backdrop behind the artboard).

Candidates: real, working pages built from this brief: {info[2]}
{chr(10).join(lines)}
{PHONE_NOTE}Read every candidate image with the Read tool. Do not read anything outside the folders named here. The candidate screenshots are full-page captures, so an element that is fixed to the screen in the live page (a floating tab bar, a sticky header) can appear once in the middle of a tall capture; treat that as a capture artefact, not a layout bug.

For each candidate give a PARITY score from 1 to 10 for visual design quality against the reference set, using this scale strictly:
10 = would be one of the best shots in this reference set
8-9 = belongs in the set; a Dribbble audience would not notice a quality gap
6-7 = close, but a trained eye sees it is a notch below the set (say which notch)
4-5 = clearly a level below: competent but plain, generic, or under-designed next to the set
1-3 = far below

Also score each candidate 1-10 on these sub-dimensions, judged against the references: art direction (a distinct, confident visual identity), visual richness (imagery, illustration, product visuals, designed detail), depth and polish (shadows, layering, surfaces, finish), colour, typography, composition and hierarchy.

Be demanding and concrete. Honest, useful, specific content counts for a little, but this is a visual bar: a plain page with excellent copy does not reach parity. Equally, do not reward decoration that is sloppy, generic or obviously templated; the references are rich AND well executed.

Then, for each candidate, list the 6 most important concrete changes that would close the gap to the reference set, most impactful first. Be specific about what and where (for example: "the hero has no product visual; the references all lead with a detailed UI mock with floating detail cards" or "shadows are a single flat blur; references use soft layered shadows with a light top edge").

Return plain text in exactly this shape:
BAR: 4-6 bullets describing what the reference set has in common visually
""" + "\n".join(f"CANDIDATE {labels[i]}: parity=?, art_direction=?, richness=?, depth_polish=?, colour=?, typography=?, composition=?\nGAPS {labels[i]}: six numbered changes" for i in range(len(cands))) + "\nVERDICT: one sentence per candidate on whether it would pass as a popular Dribbble shot in this category, and if not, the single biggest reason.")
