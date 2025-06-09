# Nanosplash

**The tiny loading screen for web artisans**

[![CI Production: Build, Test, Publish](https://github.com/isakhauge/nanosplash/actions/workflows/ci.prod.push.yml/badge.svg)](https://github.com/isakhauge/nanosplash/actions/workflows/ci.prod.push.yml)
[![Coverage Status](https://coveralls.io/repos/github/isakhauge/nanosplash/badge.svg?branch=production)](https://coveralls.io/github/isakhauge/nanosplash?branch=production)

---

### Nanosplash is the ultra-lightweight JavaScript library that makes adding a polished loading experience to your web app effortless. Weighing in at just 3KB and with zero dependencies, it’s designed to be blazingly fast and beautifully simple. Whether you need a fullscreen spinner or a branded loading message within a specific container, Nanosplash’s dead-simple 2-function API (show and hide) and full CSS customization make it the perfect tool for any modern web project. Try it today and elevate your app’s loading experience with zero fuss!

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

```txt
show(text?: string, target?: string | Element): number
```

#### Parameters

| Parameter | Type                             | Description                                                 |
|-----------|----------------------------------|-------------------------------------------------------------|
| `text`    | `string \| undefined`            | Optional. Text to display alongside the spinner.            |
| `target`  | `string \| Element \| undefined` | Optional. CSS selector or an element to contain the splash. |

#### Examples:

- **Fullscreen spinner only:**

  ```js
  ns.show()
  ```

- **Fullscreen text and spinner:**

  ```js
  ns.show('Loading...')
  ```

- **Spinner only within a specific element:**

  ```js
  ns.show(null, '#my-div')
  ```

- **Text and spinner within a specific element:**

  ```js
  ns.show('Please wait', '#my-div')
  ```

### Hide

The hide function removes one or more Nanosplash loading indicators from your page.
By default, it removes the oldest fullscreen splash (FIFO). If you want to remove a specific splash, you can pass its ID (returned by show).
You can also remove all splashes at once by passing the wildcard '*'.

```txt
hide(id?: number | '*'): void
```
#### Arguments

| Parameter | Type                  | Description                                                |
|-----------|-----------------------|------------------------------------------------------------|
| `id`      | `number \| undefined` | Optional. The ID of the Nanosplash to remove.              |

#### Examples:

- **Remove the oldest (FIFO) fullscreen Nanosplash:**

  ```js
  ns.hide()
  ```

- **Remove a specific Nanosplash by ID:**

  ```js
  const id = ns.show() // 1700000000000
  ns.hide(id)
  ```

- **Remove all Nanosplashes:**

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