# Portfolio Presentation

October 20, 2026: a project-led, neutral presentation based on shadcn/ui's
control hierarchy, supported by UI/UX Pro Max and design-taste-frontend review.
The implementation remains static HTML/CSS/JavaScript, not React/shadcn runtime
components. No new framework, hosted service, tracking or network dependency.

The coordinated acceptance checklist lives in the job-search repository's
docs/implementation-plan.md, Phase 11. The two sites remain independently built
and deployed. This file records design decisions, not a second project plan.

## Decisions

- Neutral white/zinc surfaces, cyan links, compact sans type and 44px controls.
- Name and discipline lead directly into inspectable projects, with the real
  screenshots, demo/source links and native case-study disclosures preserved.
- Selected work precedes About. Project filtering and theme persistence retain
  progressive enhancement; all content remains readable without JavaScript.
- The anti-slop direction was Quiet Instrument, seed 732230220. Its empty-space,
  stock-photo, motion-quota and dark-wall hero suggestions were not appropriate
  for this existing factual engineering portfolio. Three real project images
  are preferable to invented imagery; useful feedback replaces ornamental motion.
- No oversized/split hero, gradient, glass, decorative 3D, false metrics or new
  experience claims. System fonts avoid remote requests and font-loading shifts.
- The taste inspector's picture/motion/hero-size quotas are intentionally not
  applied: this portfolio has three genuine screenshots, useful static content
  and a restrained intro. Its eyebrow heuristic mislabels the real View work
  navigation button; project category labels sit below their project headings.
  Actual overflow, contrast, clipped content and broken assets remain failures.
- Sun/Moon use the existing project's Lucide source; notices are retained in
  THIRD_PARTY_NOTICES.md. Shadcn is a visual reference here, not a copied library.

## Protected Surfaces

Project screenshots, privacy/application/use pages under job-search-automation/,
SEO URLs, employment/education, demo limitations and contact details are retained.
The bundled project-image fingerprints are unchanged. Site source fingerprints
must be updated only after verification; they are not evidence of browser QA.

## Verification

Run python3 tools/check.py, node --check script.js and
node --test tests/theme-filter.test.cjs. Independent browser checks cover both
themes at 1440/768/390/320px, text contrast, images, project filtering, disclosure
keyboard behavior, theme persistence, visible focus and no-script content.
At 200% text size, controls reflow rather than overlapping at narrow widths.
Release completion and live checks are recorded on the release pull request.
