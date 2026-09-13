# Changelog

All notable changes to Nanosplash are documented here.

## [4.1.4] — 2026-09-03

### Fixed

- **Spinner wobble in Chrome on Windows.** The rotating spinner `<svg>` inherited an integer-snapped compositing layer from its filtered (`drop-shadow`) ancestor. On fractional-DPR displays (e.g. Windows 125%/150% scaling), the unsnapped rotation origin flipped between neighboring snapped pixels each frame, causing a visible oscillating wobble in Chromium. The spinner now gets its own compositing layer with an explicit center transform-origin, decoupling it from the ancestor's snapped bounds. ([#52](https://github.com/isakhauge/nanosplash/issues/52))

### Changed

- **README simplified.** Trimmed to title, badges, feature-grid image, install/usage snippets, and links to the live demo and full docs — all timing/accessibility/theming detail already lived in `docs.md`. `docs.md` gained an Installation section (npm + CDN).

## [4.1.3] — 2026-08-30

### Added

- **Theme-aware splash styling.** Nanosplash now ships light and dark defaults itself: `--ns-bg`, `--ns-color`, and the new public `--ns-shadow-color` follow `prefers-color-scheme`, with a `data-theme="light|dark"` root-attribute override. All defaults are declared at zero specificity via `:where()`, so any consumer override still wins.
- White glow shadow in dark mode (`rgba(255, 255, 255, 0.35)`); text shadow and drop-shadow filters now derive from `var(--ns-shadow-color)`.

### Fixed

- `backdrop-filter` no longer disappears from production builds: the handwritten `-webkit-backdrop-filter` declaration made lightningcss dedupe the prefixed pair last-wins and drop the standard property. A single standard declaration now auto-prefixes correctly.

### Changed

- Docs/demo build pipeline: the demo page source lives in `docs/index.template.html`; `bun run build:docs` builds a dedicated IIFE bundle (exposing the `useNs` factory) and inlines it into a fully self-contained `docs/index.html` via `scripts/build-docs.ts` (TypeScript, run with Bun).
- `tsconfig.json` now includes `tests/` and `types/`, so IDEs resolve `@/` path aliases in spec files.
- npm tarball no longer ships the demo-only bundle (`dist/docs/`) — only `dist/es`, `dist/cjs`, and `dist/iife`.
- Dropped unused `postcss`/`cssnano` dependencies and vite plugin config.

## [4.1.2] — 2026-08-30

### Fixed

- **Scroll jump on full-page splash.** Showing a full-page splash made `body` itself `position: fixed`, collapsing the document's scrollable height and snapping `window.scrollY` to 0. Now only the overlay pieces (the `::before` backdrop and `.ns` element) are pinned to the viewport; the page's layout and scroll position are never touched.
- Removed the now-unnecessary `--ns-top` custom property and the JS that read/wrote it on every `show()` (small bundle-size win).

### Added

- **Interactive demo page** (`docs/index.html`): exercises every feature — show/hide, scoped containers, labeled jobs, anti-flicker timing, theming, accessibility — against the real, freshly built library. Self-contained, no build step, works opened locally or hosted; linked from the README.

## [4.1.1] and earlier

See the [GitHub releases](https://github.com/isakhauge/nanosplash/releases).

[4.1.4]: https://github.com/isakhauge/nanosplash/compare/v4.1.3...v4.1.4
[4.1.3]: https://github.com/isakhauge/nanosplash/compare/v4.1.1...v4.1.3
[4.1.2]: https://github.com/isakhauge/nanosplash/commit/b9d9f8a
