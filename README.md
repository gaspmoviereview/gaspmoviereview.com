# Gasp Movie Review on WordPress

Replaces the Strapi API and Next.js site with one WordPress install on the cPanel host. The old Strapi + Next.js code is in git history under the tag `legacy-strapi-next`.

```
.
├── plugin/gasp-reviews/              Content model: Review post type, Genres, Gasp Factor, triggers, related reviews, author fields, contact form
├── theme/gasp/                       Theme built from the design system (v2, cinematic dark)
├── migrate/                          One-off Strapi → WordPress import
├── dev/mu-plugins/                   Local-only helpers (logs email to wp-content/mail.log); never deployed
├── Gasp Movie Review Design System/  Source of the theme's tokens, components and assets
└── .wp-env.json                      Local WordPress in Docker
```

## Local WordPress

Needs Docker running.

```sh
npm install
npm run wp:start      # http://localhost:8888/wp-admin (admin / password)
npm run wp:cli -- plugin list   # any WP-CLI command
npm run wp:stop
```

## The content model (`plugin/gasp-reviews`)

| Old (Strapi) | WordPress |
|---|---|
| Review | `review` post type at `/reviews/{slug}`, archive at `/reviews` |
| description | Excerpt |
| featuredImage | Featured image ("Film still") |
| Genre | `genre` taxonomy at `/genre/{slug}` |
| gaspFactor | Meta `gasp_suspense`, `gasp_scariness`, `gasp_bloodiness` (1–100), edited with sliders in the editor sidebar |
| (derived) | `gasp_score` = mean ÷ 10 to 2 dp, stored on every change so lists can sort by it; read-only `gasp_score` REST field |
| triggers | Meta `gasp_triggers` |
| relatedReviews | Meta `gasp_related` (ordered review IDs), picked in the editor sidebar |
| Author | WordPress users at `/authors/{slug}`; bio = Biographical Info, plus `gasp_tagline` and `gasp_image` on the profile screen |
| Page | Pages; description → excerpt, `isContact` → meta `gasp_is_contact` |

Helpers for the theme: `gasp_reviews_get_gasp_factor( $post )`, `gasp_reviews_get_related( $post )`, `gasp_reviews_get_author_profile( $user_id )`.

The plugin also handles the contact form (`includes/contact-form.php`): nonce, honeypot, minimum fill time, 5 messages per hour per IP. Messages go to **Settings → General → Contact form recipient** (falls back to the admin email), with Reply-To set to the sender.

## The theme (`theme/gasp`)

A classic PHP theme with a `theme.json`, not a full-site-editing block theme. The design's dynamic parts (Gasp panels, filter/sort bar, related reviews) are much simpler as PHP templates. `theme.json` still gives the block editor the brand palette, fonts and dark canvas, so writing a review looks like reading one.

| Design system | Theme |
|---|---|
| `tokens/*.css` | `assets/css/tokens.css` (copied verbatim; update both together) |
| Components (GaspFactor, ReviewCard, GenreTag, Button, Hero, AuthorByline, …) | PHP functions in `inc/components.php`, styled in `assets/css/main.css` |
| Fonts (Google Fonts) | Self-hosted woff2 in `assets/fonts/`, declared in `theme.json` |
| Icons (Font Awesome + Tabler CDNs) | The 11 SVGs used, inlined from `assets/icons/` |
| Screens | `front-page.php`, `archive-review.php` / `taxonomy-genre.php` (shared `template-parts/review-list.php`), `single-review.php`, `page-about.php`, `author.php`, `page.php` + `template-parts/contact.php` |

What stays editable in the admin:

- **Home intro:** the content of Pages → Home. The hero is always the latest review.
- **About:** the excerpt is the italic intro. Content before the first heading (or bold-only line) is the body; content after it fills the "What is the Gasp Factor?" panel.
- **Contact:** the page title, plus the excerpt as the lede.
- **Menus:** Appearance → Menus ("Header", "Footer: useful links"). With no menu assigned, the theme uses Reviews / About / Author / Contact.
- **Instagram link:** Appearance → Customize → Social.
- **Footer tagline:** Settings → General → Tagline.

Reviews and genre pages sort with `?sort=score|suspense|scariness|bloodiness` (default: latest). Without an SEO plugin, the theme outputs meta descriptions, Open Graph tags and schema.org `Review` data (Gasp Factor out of 10). It steps aside if Yoast, Rank Math or SEOPress is active.

## Deploying to cPanel

1. `npm run package` builds `dist/gasp-reviews.zip` and `dist/gasp.zip`.
2. Install WordPress from cPanel (Softaculous), then in WP Admin:
   - Settings → Permalinks → **Post name**.
   - Plugins → Add New → Upload `gasp-reviews.zip` → Activate.
   - Appearance → Themes → Upload `gasp.zip` → Activate. This sets Pages → Home as the front page once it exists.
3. Run the migration against the live site (`WP_URL=https://…`, with an application password made under Users → Profile).
4. Only if you migrated before activating the theme: regenerate image sizes (WP-CLI `wp media regenerate`, or the "Regenerate Thumbnails" plugin) so the card and hero sizes exist.
5. Settings → General: Site Title "Gasp Movie Review", Tagline, Contact form recipient.
6. Send a test message from the contact page. cPanel's PHP mail normally works for a same-domain address. If messages land in spam, add an SMTP plugin (e.g. WP Mail SMTP) using the cPanel mailbox.

To update later, re-upload the zip (WordPress offers "Replace current with uploaded"), or deploy `plugin/gasp-reviews` and `theme/gasp` over SFTP/Git.

## Migrating content from Strapi

1. Create a Strapi API token with read access (Strapi admin → Settings → API Tokens), or reuse the Next.js app's `CMS_ACCESS_TOKEN`.
2. Create a WordPress application password for the importing admin:
   `npm run wp:cli -- user application-password create admin migrate --porcelain`
   (on the live site: Users → Profile → Application Passwords).
3. Optional: copy real author emails into `migrate/authors.json`, e.g. `{ "ania-twardowska": "ania@example.com" }`. Without it, authors get `{slug}@gaspmoviereview.com` and log in via "Lost your password?".
4. Run it:

```sh
STRAPI_TOKEN=… npm run migrate -- --dry-run      # read Strapi only, write nothing
STRAPI_TOKEN=… WP_APP_PASSWORD="…" npm run migrate
```

| Variable | Default |
|---|---|
| `STRAPI_URL` | `https://api.gaspmoviereview.com` |
| `STRAPI_TOKEN` | required |
| `WP_URL` | `http://localhost:8888` |
| `WP_USER` | `admin` |
| `WP_APP_PASSWORD` | required (except `--dry-run`) |
| `AUTHOR_ROLE` | `editor` |
| `AUTHOR_EMAIL_DOMAIN` | `gaspmoviereview.com` |

Original publish and last-updated dates are kept. The plugin's `includes/migration-support.php` applies the updated date, which the REST API can't set on its own.

Re-running is safe: everything is matched by slug and updated. Uploaded images are remembered per target site in `migrate/.state.<host>.json`. Delete that file if you reset the WordPress database, or images won't be re-uploaded.

Tests for the rich-text converter: `npm test`.
