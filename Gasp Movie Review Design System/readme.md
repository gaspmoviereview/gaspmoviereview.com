# Gasp Movie Review — Design System (v2 · cinematic dark)

> **v2 redesign (Oct 2026).** This replaces the original bone/navy blog look. The live site at time of writing still uses v1. Kept from v1: the navy, the Gasp Factor face/drops icons, the logo PNG and the voice. The rest is new.

**Gasp Movie Review** (gaspmoviereview.com) is an independent horror & thriller review blog by writer and film fanatic **Ania Twardowska**, launched April 2024. Tagline: *"Find films and tv-shows that will make you gasp."* Each review scores a film with the signature **Gasp Factor**: an average rating (e.g. 8.03) built from three percentages: **suspense**, **scariness** and **bloodiness**. Reviews are tagged by genre (Action, Dark Comedy, Drama, Horror, Mystery, Thriller, Sci-Fi) and list content **Triggers**. Built with Next.js + Strapi CMS (api.gaspmoviereview.com) by Paul Singh.

**Product surface:** one: the public website (mobile-first blog). Pages: Home, Reviews, Review detail, Genre, About, Contact, Author.

## Sources
- Live site: https://www.gaspmoviereview.com/ (copy read via fetch; CSS not accessible)
- User-uploaded 2× mobile screenshots: `uploads/shots-1792180942209-h172.png` (Home), `uploads/shots-1792180964583-ir73.png` (His House review)
- Logos + images: Strapi uploads at https://api.gaspmoviereview.com/uploads/…
- No codebase, Figma or font files were provided. All measurements are read from the screenshots (halved from 2×) and are approximate.

## Index
- `styles.css` — entry point (imports only) → `tokens/fonts.css, icons.css, colors.css, typography.css, spacing.css, base.css`
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand)
- `components/` — React primitives (below), one `*.card.html` per directory
- `ui_kits/website/` — responsive click-through (Home → Review)
- `assets/` — `logo-light.png` (white, primary), `logo-dark.png` (navy), `logo-dark-thumb.png`, `hero-scream.jpg`, `author-ania.jpg`, `reviews/*` (stills; most cropped from screenshots)
- `SKILL.md` — Agent Skill wrapper · `thumbnail.html` — homepage tile

## Components
- **Logo** (brand) — PNG wordmark; white is the default
- **Button** (actions) — primary (glowing red pill), ghost (glass), link
- **GaspFactor** (rating) — `badge` / `compact` / `full` (serif score + glowing meters)
- **GenreTag** (tags) — outlined pill; `active` = navy glow
- **ReviewCard** (reviews) — image-led 16:10 card with badge and compact stats
- **AuthorByline** (reviews) — avatar · name · role · mono meta
- **SiteHeader**, **SiteFooter**, **SocialButton** (navigation)
- **TextField** (forms) — dark input/textarea with mono label, hint/error line, navy focus glow
- **Hero** (layout) — featured-review hero over a full-bleed still

Intentional additions vs. the live site: **TextField**, the Contact form fields restyled for v2. **Button**, which v2 needs for explicit primary actions. The live site only had a text link.

## CONTENT FUNDAMENTALS
- **Voice:** wry, conversational, slyly dark. Reviews open with a rhetorical hook: *"Wouldn’t it be fun to invite a secret lover to a hunting retreat with mates? Said no one ever…"*, *"So… what could be so scary about this horror?"*
- **Person:** the site speaks as **we/our** and addresses **you**. The author and social copy is first-person ("Follow me").
- **Spelling:** British (neighbourhood, honour, whilst).
- **Casing:** sentence case everywhere in v2, including headings ("Latest reviews", "Related reviews", "Useful links"). "Gasp Factor" is the one Title Case proper noun. Mono eyebrows are UPPERCASE via CSS only. Review titles are always **"Title (Year)"**, and in display type the year is set in italic, muted.
- **Punctuation:** ellipses (…) for suspense, curly quotes, film titles in italics.
- **Microcopy:** "Read review", "All reviews", "Latest review", "You might also like:", "Writer and film enthusiast".
- **Emoji:** never. Exclamation marks: rarely.

## VISUAL FOUNDATIONS
- **Mood:** a dark screening room. The film still is the light source; the UI recedes.
- **Colour:** navy-tinted near-blacks (**Ink 950 #05080D** page → 900 cards → 850 panels). Text is warm **Bone #F4EFEA**, with Bone 300/500 for secondary and meta text. **Gasp Red #FF4433** is the single hot accent: primary buttons, the score signal, stat percentages, the active nav underline and eyebrows. **Gasp Navy #0D3A67** (kept from v1) carries ambient glows (footer, Gasp panel) and selected states (active genre chip). Hairlines are white at 8% and 16%.
- **Type:** **Instrument Serif** (regular + italic) for all display: hero, titles, standfirsts, the Gasp score. **Geist** for UI and body (300 for long reading, 400–500 for UI). **Geist Mono** for data: eyebrows (11px, +0.14em, uppercase), dates and stat percentages.
- **Backgrounds:** flat ink. Images are full-bleed with protection scrims (bottom fade to ink, plus a left fade on the hero). Soft radial navy glows sit behind the footer and the Gasp panel. No patterns, no grain, and no decorative gradients beyond scrims and glows.
- **Imagery:** real film stills in untreated full colour, cropped 16:10 on cards and full-bleed in heroes.
- **Glow:** light comes from accents, not drop shadows. Red glows (box-shadow / text-shadow at 45% red) appear only on the score, primary button, meters and active underline. Navy glow marks selection.
- **Cards:** Ink 900, a 14px radius, a 1px white-8% inset ring and a deep soft shadow. Image on top with a card scrim, Gasp badge top-right, serif title, a 3-line excerpt, then a hairline and a footer with compact stats + ↗.
- **Radii:** 6 / 10 / 14 (card) / 20 (panel) / pill (buttons, chips, badges, social).
- **Transparency & blur:** the header and badges are glass (ink at 66–72% + 14px blur). Use it only over imagery or a scrolling surface.
- **Hover:** cards lift to Ink 850 with a brighter ring and the image zooms to 1.04 over 700ms. Buttons brighten and their glow grows. Links go bone → red. Arrows nudge 3px. Easing is cubic-bezier(.2,.7,.2,1) at 160ms (UI) and 320–700ms (surfaces).
- **Press:** no shrink; colour change only.
- **Layout:** 1240 container, fluid gutter clamp(20–48px), 680px reading measure, auto-fill card grids (minmax 280px), and generous section rhythm (96–128px). The header is sticky and 64px tall. Below 760px the nav collapses to a hamburger and a full-width serif menu.

## ICONOGRAPHY
The Gasp Factor icons from v1 are kept: grimacing face (suspense), surprised face (scariness), droplets (bloodiness). UI glyphs come from Tabler: `arrow-right`, `arrow-up-right`, `menu-2`, `x`, `brand-instagram`. Icons are regular or outline weight, never filled, and inherit the text colour. On the full Gasp panel they're bone; red is reserved for the numbers.
- Font Awesome 6 Free regular: `fa-regular fa-face-grimace`, `fa-regular fa-face-surprise`
- Tabler Icons webfont: `ti ti-droplets` and the UI glyphs above
Both load from CDN via `tokens/icons.css`. **These are substitutes**: the live site's own icon source was not available. No emoji, no unicode icons. The logo is a PNG; never redraw it.

## Fonts
All from Google Fonts (`tokens/fonts.css`): Instrument Serif, Geist, Geist Mono. v1 used Work Sans, Courier Prime and a brush display face; v2 retires those.
