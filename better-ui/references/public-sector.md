# Government and public-service sites

Local government, ministries, agencies, public hospitals, universities' public pages, utilities. Two jobs at once: **get a resident to the right service in seconds**, and **feel like this place** (official, trustworthy, and recognisably Garut rather than "any kabupaten"). Generated redesigns fail both the same way: one template for every region (a dark photo hero, "Layanan dan informasi publik Kabupaten X", a search box with chips) followed by a link farm of thirty equal cards in 13px text. The best public sites say no to most links and carry identity in one or two strong elements. Use the structure below as the checklist for what a public homepage must contain; take the visual treatment from references of excellent public sites (`references.md`: gov.uk, amsterdam.nl, hel.fi and the strongest of the region).

Contents: the homepage, in order · avoiding the link farm · identity · directions · writing · trust and Indonesian channels · what looks dated · checks

Sources: GOV.UK and its writing standards; Amsterdam (Edenspiekermann, Thonik, Amsterdam Design System); Helsinki brand and HDS; Vienna CD-Manual; Barcelona; Boston brand; Canada.ca "Most requested"; LifeSG and myGov life events; USWDS official banner; Singapore SGDS; Gerry McGovern's Top Tasks; Nielsen Norman Group on government sites, carousels and plain language.

## 1. The homepage, in order

Amsterdam's homepage is a hero, eight "Direct naar" tasks, three news items and a footer. GOV.UK is search, six popular links and sixteen topics. Most traffic on a council site goes to a few dozen pages; news is not a top task ("the more news a council publishes, the less of it gets read"). Build in this order and give each block the space shown:

| # | Block | Contents | Space |
|:---|:---|:---|:---|
| 0 | Official strip | "Situs resmi Pemerintah Kabupaten X · alamat resmi berakhiran .go.id" with a "Cara mengenali" disclosure | 32 to 40px |
| 1 | Header | Lambang plus a **regional wordmark** set in the display face, search, language (ID / bahasa daerah / EN), "Masuk" if there is an account | 64 to 72px; no social icons here |
| 2 | Task-first hero | One headline in a regional voice, a large search ("Cari layanan atau ketik pertanyaan…") with four or five **real** popular searches as suggestions | 360 to 480px on desktop, not a full-screen photo; on phones hero, search and the first tasks fit about one screen |
| 3 | Top tasks | **Six to eight** verb-led tasks chosen from what residents do most (KTP, KK, akta, PBB, pajak kendaraan, izin usaha, BPJS/puskesmas, lapor). Each with one line of "what you need" or "how long" | The largest type after the H1: 18 to 20px labels, a list or two columns |
| 4 | Hari ini | One slim band of live facts: Mal Pelayanan Publik hours and queue, a road closure, PBB due date, harga bahan pokok, weather warning | One band |
| 5 | Life events | Six to eight situations: Punya bayi, Pindah rumah, Menikah, Kehilangan anggota keluarga, Mulai usaha, Mencari kerja, Sekolah, Lansia. Each names the two or three services inside it | Medium |
| 6 | All services | One link to "Semua layanan A–Z", grouped by topic. This is where the other sixty links live | One line |
| 7 | Report a problem | "Laporkan masalah" with LAPOR!, the official WhatsApp number and a short form (photo, location) | One band |
| 8 | News | One lead story and three items, dated. Never a grid of twelve | Medium |
| 9 | Transparency | APBD in one bar with realisation %, complaints resolved this month, "Minta informasi publik (PPID)" | One band; can be the data moment |
| 10 | Leaders | Bupati and wakil as a small row with names and roles, linking to the profile | Small; never in the hero |
| 11 | Regional profile | Three or four figures (population, kecamatan, desa, area) and one landmark photograph with caption and credit | Medium; often the visual moment |
| 12 | Near you | "Pilih kecamatan" showing the kantor camat, puskesmas and schedules | Small |
| 13 | Contact and emergency | 112, damkar, ambulans/PMI, office hours, call centre, WhatsApp | Top of footer |
| 14 | Footer | Perangkat daerah (OPD) directory, JDIH, LPSE, PPID, accessibility statement, social links | Dense is fine here |

A ministry or agency (Dukcapil, BPJS, a hospital) follows the same order with its own tasks, and puts its document requirements and status checks ("Cek status pengajuan") inside the tasks.

## 2. Avoiding the link farm

- **A hard cap of eight tasks** on the homepage. Everything else moves to "Semua layanan A–Z". A redesign keeps the old site's content by moving it, not by showing all of it on one page.
- **Group by topic or life event, never by dinas.** People do not know which agency runs a service (LifeSG found people failed to book a barbecue pit because they had to know the agency first). Never by audience ("Warga / Investor / Wisatawan").
- **One list per view.** Never three grids of equal cards in a row; vary the pattern between sections (a list, a band, a lead story, a figure strip).
- **Search shows real queries,** not category chips.
- **Tasks are a list, not cards:** the verb in the text size of a title, one line of detail, a chevron, hairlines between. No tinted icon square on each task, no bordered card per task (`critique.md`, "What reads as generated").
- **External subdomains** (sigenduk.x.go.id, spse) are the destination, not the label: write the task, show the domain only in the footer directory or on hover.

## 3. Identity without hurting usability

Excellent city sites carry identity in a few disciplined moves (Helsinki: flat colours at full strength, one motif per view, the wordmark and the crest never together; Amsterdam: white, black and one red, two weights of one typeface; Vienna: its own typeface and an expressive coat of arms; France: the State's mark beside the entity's own logo):

1. **Colour from the lambang or the flag.** Sample one or two colours from the official emblem (Garut's green and yellow, Kebumen's, Purwakarta's), run `palette.cjs` on the main one, and use it as **large flat fields**: the hero band, the task band, the footer. Flat, not gradients. Darken it for text. Never use it for error or success.
2. **Lambang plus regional wordmark.** The official emblem beside the region's name set large in the display face ("Garut", "Kebumen"), both at least 40px tall. Not five logos in the header.
3. **A typeface with character** for the wordmark and headlines (Plus Jakarta Sans was made for Jakarta's city brand; a confident grotesk, or a serif for a heritage region) and a highly readable body at 18 to 19px (the `civic` kit uses 19px, as GOV.UK does).
4. **One local motif per view,** taken from the region's textile or architecture (batik Garutan, tenun, a Sundanese or Javanese ornament, the outline of a landmark), drawn as a 12 to 24px border, a section edge or a divider. Never behind text, never a full pattern background.
5. **Landmark photography** of real places with caption and credit (Situ Buleud for Purwakarta, the Karangsambung geopark for Kebumen, Gunung Papandayan for Garut), from Unsplash or the site's own photos. Not a stock city skyline, not an official-photo collage.
6. **A regional voice** in the headline, and optionally a greeting in bahasa daerah (with its script via Noto Sans Sundanese or Javanese) as decoration, never as a task label.

Five regions redesigned with this skill must look like five different places. The usual failure is one composition for all of them (a flat colour band with the headline and search on the left and a task card on the right). Choose the hero from the region's own strongest asset: a landmark photograph full bleed with the task panel over it (a region known for its landscape), a typographic hero with the wordmark large (a region with a strong name or brand), a map of the kecamatan beside the tasks (a large rural regency), an editorial spread (a heritage city), a plain search column (an agency). Two regions with the same emblem colour still differ in typeface, motif, photograph and composition. If the headlines, colours and heroes could be swapped between them, the identity work is not done.

## 4. Directions

Build on the `civic` kit (`kits.md`) unless the direction says otherwise: `editorial` for a heritage or tourism-led city, `swiss` for a transparency or data portal. The emblem colour goes into `--brand`.


Choose one (see the method in `web-directions.md`) and carry it through:

1. **Layanan-first calm** (GOV.UK, Amsterdam). For agencies with many transactions (Dukcapil). A large search and a plain list of eight tasks with chevrons; white, ink, one emblem colour for links and the strip; a single 720 to 840px column above the fold; nothing decorative.
2. **Civic editorial** (Boston, Vienna). For cities with a story (heritage, tourism). A serif headline in a regional voice, one large captioned photograph, news as a lead story with three items, a resident's quote; paper, ink, one accent.
3. **Bold flat colour** (Helsinki). For a region with a strong emblem colour. Full-bleed flat bands of that colour separated by **one** shaped edge taken from the emblem or motif; tasks in white on the band (check 4.5:1); heavy grotesk headlines, no all-caps.
4. **Data-forward transparency.** For governments that lead with reform. Tasks first, then a strip of four figures (APBD realisation, complaints resolved, average response time, open datasets) in tabular figures, bars only.
5. **Wastra.** For regions whose textile is part of who they are. The motif as a border or hero edge in its own colours (sogan, indigo, cream), once per view; a humanist sans with a serif wordmark.
6. **Life-event journey** (LifeSG, myGov). For civil registration and social services. The hero asks "Apa yang sedang Anda urus?" above six life-event tiles, each listing its services and documents.
7. **Kecamatan first.** For large rural regencies. "Pilih kecamatan Anda" with a simplified outline map of the region beside the tasks.
8. **Low-bandwidth.** For areas with weak connections. Text first, under 200KB, system fonts, an SVG emblem, no hero photograph, a sticky bottom bar on phones (Cari · Layanan · Lapor · WhatsApp).

## 5. Writing

- **Tasks start with a verb, in the resident's words:** "Urus KTP-el", "Buat akta kelahiran", "Pindah domisili", "Bayar PBB", "Cek pajak kendaraan", "Daftar berobat di puskesmas", "Cari lowongan kerja", "Urus izin usaha (NIB)", "Laporkan jalan rusak", "Minta informasi publik (PPID)". Not "Layanan Perpajakan", "Administrasi Kependudukan" or "E-Health".
- **Plain words first, acronym after,** sentence case, titles under about 65 characters.
- **One line of what you need** under each task ("Bawa KK asli · selesai 1 hari").
- **Headlines say something only this place could say,** then invite action: "Garut, urus semuanya dari ponsel", "Lamongan: bayar, daftar, lapor tanpa antre". Never "Selamat datang di website resmi…" and never "Layanan dan informasi publik Kabupaten X".

## 6. Trust and Indonesian channels

- The official strip (like the US "An official website…" and Singapore's banner): "Situs resmi Pemerintah Kabupaten X — alamat resmi berakhiran .go.id", which also protects against look-alike scams.
- WCAG 2.2 AA built in: native contrast and text size controls, not an overlay toolbar or a "pembaca teks" popup.
- WhatsApp is the channel most residents use: show the official number and how to recognise it. SP4N-LAPOR! (lapor.go.id, SMS 1708). PPID with its four categories and a request form.
- Bandwidth: responsive images, a hero image under about 120KB, no autoplay video.

## 7. What looks dated or untrustworthy

- Auto-rotating sliders and carousels (they hide most of their content), running-text marquees.
- Greeting popups, anniversary splash screens, banners of officials over the content.
- Visitor counters, clocks, weather widgets.
- Clip-art or 3D icons, a different icon style per tile, "CLICK HERE" buttons.
- ALL-CAPS headings; "Selamat Datang di Website Resmi…" as the H1.
- Collages of officials' photos in the hero.
- Several logos competing in the header; social icons in the header.
- News without dates, twelve-item news grids, duplicated feeds.
- Thirty equal cards linking to dinas subdomains.

## 8. Checks

- Count the tasks above the fold: six to eight, each a verb, the largest type after the H1.
- Could the headline, colour and hero be moved to another region's site unchanged? Then the identity is missing.
- Is any section a grid of more than eight equal cards? Move it to the A–Z page.
- Is the lambang shown with the regional wordmark, and is the colour taken from the emblem?
- At 375px: the search and the first four tasks visible on the first screen.
