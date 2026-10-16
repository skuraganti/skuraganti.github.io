# Third-party notices

## opensourceui (MIT)

Source: https://github.com/bidyut10/opensourceui
Pinned commit: 892f486fdf0d46a44b21ddf3fa32a41a3a71173a

The selected React/Tailwind layouts were adapted to semantic HTML and plain CSS in `index.html` and `styles.css`:

- `components/profile/contact-profile-card.tsx` (ContactProfileCard): the placard layout, small catalog label, serif name, and label/value contact rows. Used for the Contact card (`.card`, `.card-rows`). Demo contacts, fixed width, very small labels and the Next.js `Link` import were removed. Rows are full-width links with 44px targets that wrap on narrow screens.
- `components/resources/resource-links-panel.tsx` (ResourceLinksPanel): the simple "name / description / domain" link-row idea. Used for the contact rows (label, readable URL). Demo items, logo and image imports, truncation and forced new tabs were removed.
- `components/mockups/browser-mockup-card.tsx` (BrowserMockupCard): the general idea of a browser frame around a screenshot (`.shot`, `.shot-bar`). The browser-frame layout was adapted to responsive plain HTML and CSS; decoration is not interactive.

License text as published in that repository:

```
MIT License

Copyright (c) 2026 Bidyut Kundu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Project screenshots

`assets/relay-demo.png`, `assets/folio-demo.png` and `assets/contour-demo.png` are unmodified copies of screenshots from Sashank Kuraganti's own public repositories (`data-pipeline-monitor`, `private-ai-knowledge-engine`, `ai-codebase-explorer`, file `assets/*-demo.png` at revisions pinned in the acquisition script), fetched by `tools/vendor_screenshots.py`.
