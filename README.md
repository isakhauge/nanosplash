# Nanosplash

**The tiny loading screen for web artisans**

[![CI Production: Build, Test, Publish](https://github.com/isakhauge/nanosplash/actions/workflows/ci.prod.push.yml/badge.svg)](https://github.com/isakhauge/nanosplash/actions/workflows/ci.prod.push.yml)
[![Coverage Status](https://coveralls.io/repos/github/isakhauge/nanosplash/badge.svg?branch=production)](https://coveralls.io/github/isakhauge/nanosplash?branch=production)

---

### Nanosplash is a 3KB zero-dependency library for effortless loading screens. Its 2-function API lets you add fullscreen or container-based spinners in seconds, fully customizable with CSS. Fast, beautiful, and simple—Nanosplash makes loading states a breeze.

```js
// Display spinner fullscreen
show('Loading')

// Display spinner in target
show('Loading', '#my-div')

// Hide spinner
hide()
```

## Features

- **Tiny**: Only 3KB
- **Performance**: Created to be fast.
- **Zero dependencies**: Pure JS.
- **Beautiful**: Good and generic design.
- **Modules**: Supports ESM, CJS, and IIFE.
- **TypeScript support**: Fully typed.
- **2 Function API**: Easy to use.

## Installation

Include Nanosplash in your project via your preferred method (e.g., CDN, module bundler). Example:

```html
<script src="https://unpkg.com/nanosplash/dist/iife/ns.iife.js"></script>
```

or

```bash
npm install nanosplash
```

## API Documentation

### Show

The show function displays a Nanosplash loading indicator on your page.
You can pass in optional text to display with the spinner, and an optional target element (or CSS selector) to control where it appears.
If no target is provided, Nanosplash will create a fullscreen splash covering the entire viewport.

```ts
show(text?: string, target?: string | Element): number
```

#### Examples:

**Fullscreen spinner only:**

  ```js
  ns.show()
  ```

**Fullscreen text and spinner:**

  ```js
  ns.show('Loading...')
  ```

**Spinner only within a specific element:**

  ```js
  ns.show(null, '#my-div')
  ```

**Text and spinner within a specific element:**

  ```js
  ns.show('Please wait', '#my-div')
  ```

### Hide

The hide function removes one or more Nanosplash loading indicators from your page.
By default, it removes the oldest fullscreen splash (FIFO). If you want to remove a specific splash, you can pass its ID (returned by show).
You can also remove all splashes at once by passing the wildcard '*'.

```ts
hide(id?: number | '*'): void
```
#### Examples:

**Remove the oldest (FIFO) fullscreen Nanosplash:**

  ```js
  ns.hide()
  ```

**Remove a specific Nanosplash by ID:**

  ```js
  const id = ns.show() // 1700000000000
  ns.hide(id)
  ```

**Remove all Nanosplashes:**

  ```js
  ns.hide('*')
  ```

## Customization

Nanosplash is designed to be fully customizable with CSS. You can style its key parts using these selectors:

| Selector        | Description                              |
|------------------|------------------------------------------|
| `.nsh::before`  | Backdrop                                  |
| `.ns`           | Main wrapper for the splash               |
| `.nst`          | Text element                              |
| `.nss`          | Spinner element                           |

## Examples

Here’s a quick snippet to show a loading indicator while fetching data:

```html
<div id="my-div"></div>

<script>
  // Show a splash while loading
  ns.show('Fetching data...', '#my-div')

  fetch('/api/data')
    .then(res => res.json())
    .then(data => {
      // Process data
    })
    .finally(() => {
      // Hide splash
      ns.hide()
    })
</script>
```

## 💖 Contributing & Feedback

Found a bug or have a feature request? Visit the [GitHub repository](https://github.com/isakhauge/nanosplash) and open an issue or pull request!