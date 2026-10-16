# Verification

Prepublication checks for this static portfolio:

- Two HTML pages passed asset, fragment, heading, canonical, metadata and public-content checks. Browser JavaScript passed Node's syntax check.
- Five Node tests execute the actual script against isolated DOM/storage fixtures: denied storage, theme persistence/system fallback, invalid saved theme, filter counts/reset and an injected unmatched category.
- Chrome rendering was checked at 1440×900, 390×844 and 320×812. A separate local HTTP fixture enlarged root text to 200%; 768, 390 and 320px layouts stayed within the viewport after the header fix.
- Native keyboard navigation exercised Tab, Shift+Tab, Enter and Space, including skip-to-main and case-study disclosure. Theme choice survived reload. All/Data/AI filters showed 7/3/4 projects.
- A script-free HTTP fixture kept all seven projects and approved contacts readable, with native disclosures working and enhancement controls hidden. This removes the site's scripts; it does not disable browser extensions.
- All 18 text/button palette pairs measured at least 4.65:1 contrast. This is a targeted check, not a full accessibility certification.
- The three project screenshots match their pinned SHA-256 digests. Their acquisition script pins source revisions as well as content hashes.
- Factual content, project modes and third-party notices received separate source reviews. No private resume, Evidence Library, phone number or private project is included.

The complete source has no runtime dependencies, build service or model calls. There is no generated coverage percentage or performance score. Postdeployment checks compare the published files with the accepted source and verify the actual Pages build and browser behavior.
