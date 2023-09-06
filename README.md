# Nanosplash

### The tiny loading screen for web artisans

<br>

[![Build](https://github.com/isakhauge/nanosplash/actions/workflows/ci.yml/badge.svg?branch=production)](https://github.com/isakhauge/nanosplash/actions/workflows/ci.yml) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/nanosplash) [![Coverage](https://img.shields.io/badge/Coverage-99%25-brightgreen)](./coverage/index.html) [![TypeScript](https://badges.frapsoft.com/typescript/version/typescript-next.svg?v=101)](https://github.com/ellerbrock/typescript-badges/) [![Last Commit](https://img.shields.io/github/last-commit/isakhauge/nanosplash)](https://github.com/isakhauge/nanosplash/commits/production)

<br>

## Get started

### Install via CDN

When installing via CDN, you will always get the latest version, and CSS is included inside the bundle.

```html
<script src="https://unpkg.com/nanosplash/dist/latest/iife/ns.iife.js">
```

Pros:

- Easy to get started.
- Always get the latest version.
- CSS is included inside the bundle.

Cons:

- Always get the latest version.

### Install via NPM

```bash
yarn add nanosplash
```

```js
import { Service } from 'nanosplash'
Service.start()
```

The CSS file is located in the following path:

```text
node_modules/nanosplash/dist/latest/es/style.css
```

### Example usage

It's so simple to use.

```js
// Display a fullscreen loading screen
ns.show('Loading')

axios.get('/api/users')
    .then((response) => /* Do something */ )
    .finally(() => {
        // Hide it when you're done
        ns.hide()
    })
```

### TLDR

```js
// Fullscreen spinning wheel
ns.show()

// Fullscreen spinning wheel with text
ns.show('Loading')

// Display inside an element
ns.showInside('#my-table', 'Fetching data')

// Hide the last created loading screen (LIFO)
ns.hide()

// Hide loading screen inside an element
ns.hideInside('#my-table')

// Hide specific loading screen
const id = ns.show('Loading')
ns.hideId(id)

// Hide all loading screens
ns.hideAll()
```

## API Documentation

### Show

This method displays a fullscreen loading screen and returns a GUID string.

```ts
ns.show(text?: string): GUIDString
```

If you enter no text, it will display the spinning wheel only.

```js
ns.show() // Spinner only
ns.show('Loading') // Spinner with text
```

### Show inside

This method displays a fullscreen loading screen inside an element and returns a GUID string.

```ts
ns.showInside(ref: Reference, text?: string): GUIDString | null
```

The `Reference` type is a union type of `string | Element`. The `string` type is a CSS selector string. The `Element` type is a DOM element.

```js
// Both works
const selector = '#my-table'
const element = document.getElementById('my-table')
ns.showInside(selector, 'Loading')
ns.showInside(element, 'Loading')
```

### Hide

Hides the last created loading screen (LIFO).

```ts
ns.hide(): GUIDString | null
```

The reason why the hide function works in a LIFO (last in first out) manner is because you should always see the loading screen that you want to hide, which will always be the last one you created.

```js
ns.show('a')
ns.show('b')
ns.show('c')
ns.hide() // Hides 'c'
ns.hide() // Hides 'b'
ns.hide() // Hides 'a'
```

> 💡 **PRO Tip:** If you have multiple loading screens open at the same time, I would recommend that you hide specific elements based on their GUID or host element. See `hideId` and `hideInside` for more information.

### Hide by ID

Hides the Nanosplash loading screen with the given GUID string.

```ts
ns.hideId(guid: GUIDString): GUIDString | null
```

The show methods always retrun a GUID. This identifier can be used to hide specific loading screens.

```js
const id = ns.show('Loading')
ns.hideId(id)
```

### Hide inside

Hides the Nanosplash loading screen inside another element — if any — that corresponds with the given element reference. Returns the GUID string of the loading screen that was hidden, or null if no loading screen was found inside.

```ts
ns.hideInside(ref: Reference): GUIDString | null
```

This method works almost the same way as `hideId`, but instead of using the GUID string as the identifier, it uses the host element as the identifier.

```js
const selector = '#my-table'
ns.showInside(selector, 'Loading')
ns.hideInside(selector)
```

You can also use the `Element` type as the reference.

```js
const element = document.getElementById('my-table')
ns.showInside(element, 'Loading')
ns.hideInside(element)
```

### Hide all

Hide all Nanosplash loading screens.

```ts
ns.hideAll(): void
```
