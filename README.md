# Nanosplash

### Tiny loading screen for web artisans

<br>

[![Build](https://github.com/isakhauge/nanosplash/actions/workflows/ci.yml/badge.svg?branch=production)](https://github.com/isakhauge/nanosplash/actions/workflows/ci.yml) [![Build Status](https://github.com/isakhauge/nanosplash/workflows/CI/badge.svg?branch=production)](https://github.com/isakhauge/nanosplash/actions?query=workflow%3ACI) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/nanosplash) [![Coverage](https://img.shields.io/badge/Coverage-98.5%25-brightgreen.svg?style=flat)](https://your-coverage-report-url) [![TypeScript](https://badges.frapsoft.com/typescript/version/typescript-next.svg?v=101)](https://github.com/ellerbrock/typescript-badges/) [![Last Commit](https://img.shields.io/github/last-commit/isakhauge/nanosplash)](https://github.com/isakhauge/nanosplash/commits/production)

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
ns.showInside('#my-table', 'Loading table')
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

## API Documentation

### Show

This method displays a loading screen and returns a GUID string.

```ts
ns.show(text?: string): GUIDString
```

### Show inside

This method displays a loading screen inside another element and returns a GUID string.

The `Reference` type is a union type of `string | Element | () => Element`. The `string` type is a CSS selector string. The `Element` type is a DOM element. The `() => Element` type is a function that returns a DOM element.

```ts
ns.showInside(ref: Reference, text?: string): GUIDString | null
```

### Hide

Hides the last created loading screen (LIFO).

```ts
ns.hide(): GUIDString | null
```

### Hide by ID

Hides the Nanosplash loading screen with the given GUID string.

```ts
ns.hideId(guid: GUIDString): GUIDString | null
```

### Hide inside

Hides the Nanosplash loading screen inside another element — if any — that corresponds with the given element reference. Returns the GUID string of the loading screen that was hidden.

```ts
ns.hideInside(ref: Reference): GUIDString | null
```

### Hide all

Hide all Nanosplash loading screens.

```ts
ns.hideAll(): void
```
