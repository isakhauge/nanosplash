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

The `Reference` type is a union type of `string | Element | () => Element`.

```ts
ns.showInside(ref: Reference, text?: string): GUIDString | null
```

### Hide

```ts
ns.hide(): GUIDString | null
```

### Hide by ID

```ts
ns.hideId(guid: GUIDString): GUIDString | null
```

### Hide inside

```ts
ns.hideInside(ref: Reference): GUIDString | null
```

### Hide all

```ts
ns.hideAll(): void
```
