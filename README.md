<h1 align="center">Nanosplash</h1>

<p align="center"><strong>The tiny loading screen for web artisans</strong></p>

<p align="center">
  <a href="https://www.npmjs.com/package/nanosplash"><img src="https://img.shields.io/npm/v/nanosplash?color=cb3837&label=npm" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/nanosplash"><img src="https://img.shields.io/npm/dw/nanosplash?color=cb3837" alt="npm downloads per week"></a>
  <a href="https://bundlephobia.com/package/nanosplash"><img src="https://img.shields.io/bundlephobia/minzip/nanosplash?label=gzipped" alt="bundle size, minified and gzipped"></a>
  <a href="https://github.com/isakhauge/nanosplash/actions/workflows/ci.yml"><img src="https://github.com/isakhauge/nanosplash/actions/workflows/ci.yml/badge.svg" alt="CI status"></a>
  <a href="https://coveralls.io/github/isakhauge/nanosplash?branch=main"><img src="https://coveralls.io/repos/github/isakhauge/nanosplash/badge.svg?branch=main" alt="Coverage status"></a>
  <a href="./types/global.d.ts"><img src="https://img.shields.io/badge/TypeScript-ready-3178c6?logo=typescript&logoColor=white" alt="TypeScript ready"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/npm/l/nanosplash?color=green" alt="MIT license"></a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/isakhauge/nanosplash/main/assets/demo.svg" width="720" alt="Nanosplash demo: a translucent overlay with a spinner and the labels 'Loading user' and 'Loading posts' appears over a page, then fades away">
</p>

<p align="center">
  <a href="https://raw.githack.com/isakhauge/nanosplash/main/docs/index.html"><strong>Live demo</strong></a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="./docs.md"><strong>Full documentation</strong></a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="./CHANGELOG.md"><strong>Changelog</strong></a>
</p>

## Why Nanosplash

- **~2.7 kB gzipped.** Smaller than most icons. Nothing else to ship.
- **Zero dependencies.** Plain TypeScript, plain CSS, injected once on first use.
- **Framework-agnostic.** Works in vanilla JS, React, Vue, Svelte, Angular, or any plain `<script>` tag.
- **Three-call API.** `show()`, `hide()`, `version`. Nothing to learn, nothing to configure.
- **Fullscreen or scoped.** Overlay the whole page or any element you pass in, by selector or reference.
- **Labeled async jobs.** Hand `show()` your promises. The label updates per step and the splash hides itself when done.
- **Anti-flicker timing.** Optional `showDelay` and `minDuration` so fast requests never blink a spinner.
- **Accessible and themeable.** `role="status"`, `aria-live`, reduced-motion support, automatic dark mode, and `--ns-*` CSS custom properties.
- **ESM, CJS, and IIFE builds** with bundled TypeScript types.

## Install

```bash
npm install nanosplash
```

Or drop it in from a CDN with no build step. This exposes a global `useNs`:

```html
<script src="https://unpkg.com/nanosplash/dist/iife/ns.iife.js"></script>
```

## Quick start

```js
import { useNs } from 'nanosplash'

const ns = useNs()

ns.show('Loading')
// ...do work...
ns.hide()
```

## Usage

### Fullscreen or scoped to an element

```js
ns.show() // fullscreen spinner, no text
ns.show('Loading') // fullscreen spinner with a label
ns.show('Fetching data', '#dashboard') // inside an element, by CSS selector
ns.show('Please wait', document.querySelector('.card')) // by element reference
```

Calling `show()` again on the same container updates the label instead of stacking a second spinner. The fullscreen splash never touches the page's scroll position.

### Run work under a splash

Pass a `[label, job]` pair and the splash lives exactly as long as the job. Pass several pairs and they run in order under one splash, with the label updating as each step starts. Results come back as a typed tuple.

```js
const user = await ns.show(['Loading user', () => fetchUser()])

const [profile, posts] = await ns.show([
  ['Loading user', () => fetchUser()],
  ['Loading posts', () => fetchPosts()],
])
```

Rejections propagate after the splash is hidden, so a normal `try`/`catch` works.

### Hide

```js
ns.hide() // hide the oldest active splash
ns.hide(id) // hide one specific splash, using the id returned by show()
ns.hide('*') // hide every active splash
```

### Anti-flicker timing

Configure once and every splash from that instance follows the same rules. The splash stays invisible for `showDelay` ms and, once visible, stays for at least `minDuration` ms. Requests that finish inside the delay never show a spinner at all.

```js
const ns = useNs({ showDelay: 150, minDuration: 400 })
```

## Theming

Nanosplash ships light and dark defaults that follow `prefers-color-scheme`, with a `data-theme="light|dark"` attribute on the root element as an override. All defaults are declared at zero specificity, so any rule of yours wins regardless of load order.

```css
:root {
  --ns-color: tomato;
  --ns-size: 24px;
  --ns-bg: rgba(0, 0, 0, 0.8);
}

/* Theme only the loaders inside one panel */
#dashboard {
  --ns-color: white;
  --ns-bg: rgba(0, 0, 0, 0.6);
}
```

| Property            | Default                         | Controls                              |
| ------------------- | ------------------------------- | ------------------------------------- |
| `--ns-color`        | `DarkSlateGray`                 | Spinner and text color                |
| `--ns-size`         | `20px`                          | Base size; the spinner scales from it |
| `--ns-font`         | `'Inter', 'Helvetica', 'Arial'` | Label font stack                      |
| `--ns-weight`       | `400`                           | Label font weight                     |
| `--ns-bg`           | `rgba(255, 255, 255, 0.9)`      | Overlay background                    |
| `--ns-blur`         | `blur(5px)`                     | Backdrop blur                         |
| `--ns-shadow-color` | `rgba(0, 0, 0, 0.25)`           | Text and spinner shadow               |
| `--ns-z-index`      | `9999999999`                    | Overlay z-index                       |

## Accessibility

- The splash has `role="status"` and `aria-live="polite"`, so the label is announced when it appears or changes.
- The host container gets `aria-busy="true"` while a splash is active and loses it on hide.
- Under `prefers-reduced-motion: reduce`, fades and entrance animations are disabled and the spinner rotates slowly with a static arc.

## API at a glance

| Call                               | Returns                   | Description                                                                 |
| ---------------------------------- | ------------------------- | --------------------------------------------------------------------------- |
| `useNs(options?)`                  | `{ show, hide, version }` | Create an API instance. `options` sets `showDelay` and `minDuration`.       |
| `show(label?, inside?)`            | `number \| null`          | Show a splash. Returns its id, or `null` if `inside` could not be resolved. |
| `show([label, job], inside?)`      | `Promise<T>`              | Run one job under a splash and resolve with its result.                     |
| `show([[label, job], …], inside?)` | `Promise<[T1, T2, …]>`    | Run jobs sequentially under one splash and resolve with a tuple.            |
| `hide(id?)`                        | `void`                    | Hide the oldest splash, a specific id, or all with `'*'`.                   |
| `version`                          | `string`                  | The installed Nanosplash version.                                           |

`inside` accepts an `Element` or a CSS selector string. See the [full documentation](./docs.md) for every detail, including instance recycling, FIFO ordering, and host classes.

## Module formats

| Format | Entry                  | Use                                                   |
| ------ | ---------------------- | ----------------------------------------------------- |
| ESM    | `dist/es/ns.es.js`     | `import { useNs } from 'nanosplash'`                  |
| CJS    | `dist/cjs/ns.cjs.js`   | `const { useNs } = require('nanosplash')`             |
| IIFE   | `dist/iife/ns.iife.js` | `<script>` tag from unpkg or jsDelivr, global `useNs` |

Types ship in the package, so editors pick them up automatically.

## Contributing

Found a bug or want a feature? [Open an issue](https://github.com/isakhauge/nanosplash/issues) or send a pull request.

## License

[MIT](./LICENSE) © Isak Hauge
