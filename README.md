# skuraganti.github.io

Single-page portfolio for Sashank Kuraganti. Plain HTML, CSS and a small script. No build step or runtime dependencies. The browser makes no automatic third-party requests.

## Files

- `index.html`: the page. All content is readable without JavaScript.
- `styles.css`: light and dark themes, layout, print styles.
- `script.js`: progressive enhancement only (theme toggle, project filter).
- `404.html`, `robots.txt`, `sitemap.xml`, `favicon.svg`, `.nojekyll`
- `assets/`: monogram and social image. The three project screenshots are fetched by `tools/vendor_screenshots.py`.
- `tools/check.py`: static checks (links, assets, metadata, headings, private-content patterns; only the one public email is allowed).

## Screenshots (one-time step)

```sh
python3 tools/vendor_screenshots.py
```

This downloads `relay-demo.png`, `folio-demo.png` and `contour-demo.png` from pinned revisions of the matching public repositories into `assets/` and refuses any file whose SHA-256 differs from the pinned value. Until it runs, `tools/check.py` reports them as missing. The PNGs total about 570 KB and load lazily. To shrink them you can convert to WebP and update the three `src` values in `index.html`.

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000/
```

The 404 page uses root-relative paths, so serve from the site root.

## Check

```sh
python3 tools/check.py
```

Optional interaction unit checks use Node.js built-ins (no packages):

```sh
node --test tests/theme-filter.test.cjs
```

These five checks run the actual browser script against DOM/storage fixtures. They cover denied storage, theme persistence/system fallback, filter counts and recoverable empty state. They complement rendered browser checks; they are not a screen-reader or full-browser audit.

## Publish

Push these files to the root of the default branch of a public repository named `skuraganti.github.io`, then set Settings → Pages → Source to "Deploy from a branch", branch root. No Actions workflow is needed.

## Notices

See `LICENSING.md` and `THIRD_PARTY_NOTICES.md`.
