# Nanosplash

**The tiny loading screen for web artisans**

[![CI Production: Build, Test](https://github.com/isakhauge/nanosplash/actions/workflows/ci.yml/badge.svg)](https://github.com/isakhauge/nanosplash/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/isakhauge/nanosplash/badge.svg?branch=main)](https://coveralls.io/github/isakhauge/nanosplash?branch=main)

![Nanosplash features: tiny 3kb gzipped, high performance, zero dependencies, minimalistic design, exports ES/CJS/IIFE, 3 function API](https://raw.githubusercontent.com/isakhauge/nanosplash/main/assets/feature-grid.svg)

```js
// Anti-flicker: appear only if slower than 150 ms, stay at least 400 ms
const ns = useNs({ showDelay: 150, minDuration: 400 })

// Fullscreen
ns.show('Loading')

// Specific element
ns.show('Loading', '#my-div')

// Hide
ns.hide()

// Run a job under a splash: shows before the job starts, hides when settled
const data = await ns.show(['Loading', () => fetchData()])

// Run labeled jobs sequentially under one splash — label updates per step,
// results come back as a typed tuple in order
const [user, posts] = await ns.show([
  ['Loading user', () => fetchUser()],
  ['Loading posts', () => fetchPosts()],
])
```

Still just two functions. Accessible out of the box (`role="status"`, `aria-live="polite"`, `aria-busy`, `prefers-reduced-motion`) and themeable via `--ns-*` CSS custom properties.

## Installation

```bash
npm install nanosplash
```

```html
<script src="https://unpkg.com/nanosplash/dist/iife/ns.iife.js"></script>
```

## Documentation

[Read the full docs here](./docs.md)
