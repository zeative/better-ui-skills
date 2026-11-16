# Copy that fits the layout

Words are part of the layout. A headline's length decides its size and how many lines it takes; a card's body decides whether a row of cards ends level; a button label decides the button's width. Write the copy for the space it will sit in, and when it does not fit, rewrite it shorter rather than shrinking the type.

Contents: lengths by element · siblings match · voice · language and locale · fit checks

## Lengths by element

| Element | Length | Lines |
|:---|:---|:---|
| Landing headline | 6 to 10 words | 2 at hero width, never 4 |
| Lede under it | 15 to 25 words | 2 to 3 |
| Section title | 3 to 8 words | 1, at most 2 |
| Section lede | one sentence, up to about 20 words | 1 to 2 |
| Card or feature title | 2 to 5 words | 1 |
| Card or feature body | 12 to 25 words (about 80 to 140 characters) | 2 to 3 |
| Button | 1 to 3 words, starting with a verb ("Start free trial", "Add habit") | 1, never wraps |
| Navigation item, tab, chip | 1 to 2 words | 1 |
| Stat label | 1 to 3 words plus the period ("Paid this month") | 1 |
| Table header | 1 to 2 words | 1 |
| Tooltip or helper text | one short sentence | 1 to 2 |
| Empty state | a title of 3 to 6 words, one line of what to do, one action | |

Headlines and titles take `text-wrap: balance`; paragraphs take `text-wrap: pretty`, so no line ends with a single word.

## Siblings match

Things shown side by side are read as a set, so write them as one:

- **Same form:** all noun phrases ("Invoices", "Clients", "Reports") or all verb phrases ("Send invoices", "Track payments"), never a mix.
- **Same length class:** the three feature cards in a row have titles within a word or two of each other and bodies within about 20% in length, so the cards end level without fixed heights.
- **Same structure:** if one plan lists "5 projects", the others list projects the same way, in the same order.
- **Same capitalisation:** sentence case everywhere, including buttons and navigation.

## Voice

- Plain and specific, the way a good product talks to the person using it: "3 of 5 done today", "$595 left this month", "Paid on 14 Nov".
- Headlines say what the product does for whom with its own nouns. If the headline still fits after swapping in a competitor's name, rewrite it.
- No exclamation marks, hype words or filler adjectives; no captions that explain the interface; no trailing periods on labels, buttons and titles.
- Actions say what happens ("Send reminder", "Export CSV"), and their result says it was done ("Reminder sent").

## Language and locale

- **One language per interface.** If the product is in Indonesian, every label, button, empty state and date is in Indonesian; product names and established loanwords stay as they are.
- **Natural local phrasing,** not translated English: "Lihat semua" rather than "Lihat Semua Data", "Tambah kebiasaan" rather than "Tambahkan Kebiasaan Baru".
- **Plan for length.** Indonesian and German strings run about 20 to 35% longer than English; give buttons and labels room, or choose shorter words.
- Dates, times, numbers and currency in the locale's format: "Sen, 16 Nov", "Rp48.210", "14.30".

## Fit checks

After rendering, at 375 and 1440px:

- No button, tab, chip, stat label or table header wraps or is truncated.
- No heading leaves one word alone on its last line.
- Cards in a row end level, or their difference is deliberate.
- Names, places and codes are shown whole; shorten the surrounding meta instead of truncating them.
