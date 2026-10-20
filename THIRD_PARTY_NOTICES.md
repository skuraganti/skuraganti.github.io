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

## Lucide Sun And Moon

The theme button embeds Sun and Moon SVG output from lucide-react 1.53.0,
https://lucide.dev/, without a runtime dependency or external request.

ISC License

Copyright (c) 2026 Lucide Icons and Contributors

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

Moon is derived from Feather and additionally carries this notice:

MIT License

Copyright (c) 2013-present Cole Bemis

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
