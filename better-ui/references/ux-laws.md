# Laws of perception and UX, applied

Taste varies; how people perceive and scan a screen does not. These principles come from perception psychology and usability research (Gestalt psychology, Fitts, Hick, Miller, von Restorff, Nielsen, and Jon Yablonski's Laws of UX, which collects them). Each one is written as a rule you can apply and a way to check it. Use them to design, and to review: a screen that obeys them reads as clear and calm to almost everyone, whatever their taste.

Contents: perception and grouping · attention and hierarchy · choice and memory · action · trust and feeling · the review method

## Perception and grouping (Gestalt)

| Principle | Rule | Check |
|:---|:---|:---|
| **Proximity**: things close together are seen as a group | Space inside a group is about half the space between groups (8 inside, 16 to 24 between items, 32 to 48 between sections) | Squint: do the groups you meant appear as blobs, and nothing else? |
| **Common region**: things inside one boundary belong together | Use a card or panel only for a group that must read as one object; never a card around one line or a card inside a card | Count boundaries; each one should hold a real group |
| **Similarity**: things that look alike are read as alike | Same kind of thing, same treatment: one style for every primary button, every status, every link | List the treatments of each kind; more than one is a bug |
| **Figure and ground**: the eye separates objects from their background | Two or three surface levels, separated by a quiet step in tone; content never on a busy ground | Can you say instantly what is foreground on every part of the screen? |
| **Prägnanz** (simplicity): people perceive the simplest form | Prefer one clear shape per element: one radius scale, aligned edges, no decorative outlines | Follow each column edge down the screen; every break needs a reason |
| **Continuity and alignment**: the eye follows lines | Put related items on a shared edge or baseline; numbers on one right edge | Alignment pass |

## Attention and hierarchy

| Principle | Rule | Check |
|:---|:---|:---|
| **Visual weight**: size, weight, contrast and saturation pull the eye, in that order | Decide one primary, two to four secondary, the rest tertiary; give each level one treatment, and make the primary clearly heaviest | The audit's predicted gaze order: its first item is your primary, and the first two are not near-equal |
| **Von Restorff (isolation) effect**: the one thing that differs is remembered | Spend the accent colour on one thing per region (the primary action, the current value); everything else neutral | Count accent-coloured elements on the first screen; more than three dilutes it |
| **Scanning patterns**: screens of data are scanned in an F, sparse pages in a Z | Put the summary and the most important figure top-left; the primary action where the scan ends (top right on a page header, bottom of a sheet) | Is the most important thing in the first band of the scan? |
| **Serial position effect**: first and last items are remembered best | Put the most-used navigation items first and last; key information at the start of a list or a sentence | Read the navigation and the first list: are the important items at the ends? |
| **Selective attention / banner blindness**: things that look like ads or decoration are ignored | Do not style important information as a coloured promo block; use the same calm cards as the content | Anything important inside a loud, banner-like block? |
| **Aesthetic-usability effect**: people judge a well-made screen as easier | Finish matters: consistent spacing, aligned edges, real content; it is not decoration | The craft checks in the audit |

## Choice and memory

| Principle | Rule | Check |
|:---|:---|:---|
| **Hick's law**: decision time grows with the number of choices | Few options at once: five to seven navigation items, one primary action per view, rare actions in a menu | Count the choices visible at once in each region |
| **Miller's law / chunking**: working memory holds a handful of chunks | Group long lists and numbers into chunks (sections, card groups, `4821 0000 1234`); five to seven KPIs at most | Any list or row of more than about seven equal items without grouping? |
| **Jakob's law**: people expect your screen to work like the others they use | Use the conventional pattern for the kind of screen (tab bar, sidebar, listing page); put things where people look for them | Would a first-time user find search, settings and the main action without looking? |
| **Cognitive load / Tesler's law**: complexity has to live somewhere; keep it off the user | Show the essential first and the rest on demand (details in a sheet, advanced filters folded) | Is anything on the first screen there "just in case"? |

## Action

| Principle | Rule | Check |
|:---|:---|:---|
| **Fitts's law**: targets that are large and near are fast | Primary actions large and within reach (thumb zone on phones, near the content on desktop); 44px touch targets; destructive actions away from primary ones | The audit's tap-target check; where is the primary action relative to the thumb? |
| **Goal-gradient effect**: people speed up near a goal | Show progress toward the goal (3 of 5, a progress bar, steps) | Is progress visible wherever there is a goal? |
| **Doherty threshold**: responses under about 400ms keep people engaged | Immediate feedback on every action (pressed state, optimistic update, skeleton while loading) | Click every control: does something change at once? |
| **Postel's law**: be liberal in what you accept | Forgiving inputs (accept "1.200" and "1200"), helpful errors next to the field | Try odd but valid input |

## Trust and feeling

| Principle | Rule | Check |
|:---|:---|:---|
| **Peak-end rule**: experiences are judged by their peak and their end | Make the key moment and the confirmation feel finished (a clear success state, a calm summary) | Look at the success and empty states, not only the main screen |
| **Zeigarnik effect**: unfinished tasks are remembered | Show what is pending ("2 tasks due today") without nagging | Is pending work visible but quiet? |
| **Colour psychology**: hue carries meaning before it is read | Semantic colours keep their meaning (green good, red bad, amber attention); never use red for a neutral brand action next to errors | Scan for colour used against its meaning |

## The review method

Review every render with this method, in order, instead of asking whether you like it:

1. **Predicted gaze order.** Run the audit and read its gaze order: the first item must be the screen's primary thing, and the first two must not be near-equal. If they are wrong, change weight (size, weight, contrast), not colour.
2. **Squint test.** Blur the screenshot (or view it small). You should see the primary, then the groups you intended, and nothing else.
3. **Five-second test.** Look for five seconds, then say what the screen is for and what its main number or action is. If you cannot, the hierarchy is not doing its job.
4. **Grouping and alignment.** Check proximity, common region and similarity against the tables above.
5. **Heuristic pass** (Nielsen): visibility of system status; match with the real world (the user's words); user control (undo, back, cancel); consistency; error prevention; recognition rather than recall; flexibility (shortcuts for experts); minimal design (nothing irrelevant); helpful errors; help where needed.

Fix in this order. A screen that passes all five reads as clear to almost anyone, which is the part of "good" that does not depend on taste.
