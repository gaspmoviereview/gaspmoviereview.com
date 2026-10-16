# Website UI kit (v2, cinematic dark)

Responsive redesign of gaspmoviereview.com (mobile → desktop), composed entirely from the DS components.

- `index.html` — router for all screens (route persisted in localStorage). Header: Reviews / About / Author / Contact. Footer genre links open genre pages. Genre pills on review pages link to their genre.
- `HomeScreen.jsx` — hero (lead review), intro, latest grid, "All reviews" → Reviews.
- `ReviewsScreen.jsx` — All reviews **and** genre pages (`genre` prop). Sticky glass filter bar with genre chips (with counts; empty genres hidden) and mood sort: Latest, Highest Gasp, Most suspense, Scariest, Bloodiest.
- `ReviewScreen.jsx` — review detail.
- `AboutScreen.jsx` — Get Out still hero, real About copy, "What is the Gasp Factor?" panel with stat definitions + a live example.
- `ContactScreen.jsx` — Contact form (Name, Email, Subject, Message) with the live site's validation rules ("Minimum 3 letters", "Must be a valid email"), success state, and an Instagram aside.
- `AuthorScreen.jsx` — portrait, bio (real copy), reviews by Ania.
- `PageIntro.jsx` — shared eyebrow + serif title + lede header.
- `data.js` — 6 reviews with real genre membership (fetched from the live genre pages), About and Author copy.

Gaps: **Companion (2025)** exists on the live site (Thriller, Sci-Fi) but its still couldn't be fetched, so it's omitted. The Dark Comedy genre page failed to load, so it shows no films and its chip is hidden. Only His House has full review body copy. The stat definitions on About ("How long it keeps you on the edge of your seat…") are new copy written for the redesign.