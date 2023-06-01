# Nanosplash

### Tiny loading screen for web artisans

<br>

[![Build](https://github.com/isakhauge/nanosplash/actions/workflows/ci.yml/badge.svg?branch=production)](https://github.com/isakhauge/nanosplash/actions/workflows/ci.yml) [![Build Status](https://github.com/isakhauge/nanosplash/workflows/CI/badge.svg?branch=production)](https://github.com/isakhauge/nanosplash/actions?query=workflow%3ACI) [![Coverage](https://img.shields.io/badge/Coverage-98.5%25-brightgreen.svg?style=flat)](https://your-coverage-report-url) [![TypeScript](https://badges.frapsoft.com/typescript/version/typescript-next.svg?v=101)](https://github.com/ellerbrock/typescript-badges/) [![Last Commit](https://img.shields.io/github/last-commit/isakhauge/nanosplash)](https://github.com/isakhauge/nanosplash/commits/production)

<br>

## Get started

Always get the latest version.

```html
<script src="https://unpkg.com/nanosplash/dist/ns.iife.js">
```

## Display loading screen

Display spinning wheel only.

```js
ns.show()
```

Display with text.

```js
ns.show('Loading assets')
```

Display inside another element.

```js
ns.showInside('Loading table', '#my-table')
```

## Hide loading screen

Hide the last loading screen (LIFO).

```js
ns.hide()
```

Hide loading screen inside another element.

```js
ns.hideInside('#my-table')
```

Hide all loading screens.

```js
ns.hideAll()
```
