# Nanosplash

### The tiny loading screen for web artisans

<br>

[![Build](https://github.com/isakhauge/nanosplash/actions/workflows/ci.yml/badge.svg?branch=production)](https://github.com/isakhauge/nanosplash/actions/workflows/ci.yml) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/nanosplash) [![Coverage](https://img.shields.io/badge/Coverage-99%25-brightgreen)](./coverage/index.html) [![TypeScript](https://badges.frapsoft.com/typescript/version/typescript-next.svg?v=101)](https://github.com/ellerbrock/typescript-badges/) [![Last Commit](https://img.shields.io/github/last-commit/isakhauge/nanosplash)](https://github.com/isakhauge/nanosplash/commits/production)

<br>

> 📣 **New in 3.0.2**
> - CSS is included inside the ES and CJS bundles 🎉
> - The `ns.hide` method will now delete splash screens in a FIFO sequence.

## Get started 🚀

### Install via CDN
```html
<script src="https://unpkg.com/nanosplash@3.0.2/dist/iife/ns.iife.js">
```

### Install via NPM

```bash
yarn add nanosplash
```

```js
import { Service } from 'nanosplash'
Service.start()
```

The start function will inject a singleton instance into the global Window 
object. You can simply access the Nanosplash service by using the `ns` 
variable like the example below.

```js
ns.show('Hello world')
```

### Example usage

It's so simple to use.

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

## API Documentation 📚

### Show

This method displays a fullscreen loading screen and returns a GUID string.

```ts
ns.show(text?: string): GUIDString
```

If you enter no text, it will display the spinning wheel only.

```js
ns.show()
```

If you enter text, it will display the spinning wheel and the text.

```js
ns.show('Loading')
```

### Show inside

This method displays a loading screen inside an element and returns a GUID 
string. The `Reference` type is a union type of `string | Element`. A reference
can be both a CSS selector `string or an `Element`.

```ts
ns.showInside(ref: Reference, text?: string): GUIDString | null
```

```js
// CSS selector
const selector = '#my-table'
ns.showInside(selector, 'Loading')

// Element
const element = document.getElementById('my-table')
ns.showInside(element, 'Loading')
```

> ℹ️ A host element can only contain one Nanosplash element at a time. If 
> you try to show a splash inside an element that already contains a splash, 
> the existing splash will be overwritten. 

### Hide

Hides the oldest splash screen (FIFO).

```ts
ns.hide(): GUIDString | null
```

```js
ns.show('a')
ns.show('b')
ns.show('c')
ns.hide() // Hides 'a'
ns.hide() // Hides 'b'
ns.hide() // Hides 'c'
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
