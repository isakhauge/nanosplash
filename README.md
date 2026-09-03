# Nanosplash

**The tiny loading screen for web artisans**

[![CI Production: Build, Test](https://github.com/isakhauge/nanosplash/actions/workflows/ci.yml/badge.svg)](https://github.com/isakhauge/nanosplash/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/isakhauge/nanosplash/badge.svg?branch=main)](https://coveralls.io/github/isakhauge/nanosplash?branch=main)

![Nanosplash features: tiny 3kb gzipped, high performance, zero dependencies, minimalistic design, exports ES/CJS/IIFE, 3 function API](https://raw.githubusercontent.com/isakhauge/nanosplash/main/assets/feature-grid.svg)

```js
const ns = useNs()

ns.show('Loading')
ns.show('Loading', '#my-div')
ns.hide()

const data = await ns.show(['Loading', () => fetchData()])
```

**[Try it live →](https://raw.githack.com/isakhauge/nanosplash/main/docs/index.html)**

```bash
npm install nanosplash
```

```html
<script src="https://unpkg.com/nanosplash/dist/iife/ns.iife.js"></script>
```

[Full docs →](./docs.md)
