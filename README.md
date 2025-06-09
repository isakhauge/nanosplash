# Nanosplash

**The tiny loading screen for web artisans**

[![CI Production: Build, Test, Publish](https://github.com/isakhauge/nanosplash/actions/workflows/ci.prod.push.yml/badge.svg)](https://github.com/isakhauge/nanosplash/actions/workflows/ci.prod.yml)
[![Coverage Status](https://coveralls.io/repos/github/isakhauge/nanosplash/badge.svg?branch=production)](https://coveralls.io/github/isakhauge/nanosplash?branch=production)

---

## 🚀 Introduction

Nanosplash provides a lightweight and customizable loading screen for your web applications. Whether you want a simple spinner or a fully branded loading experience, Nanosplash makes it easy to implement and customize.

---

## ✨ Features

- 🔬 Tiny size: Only 3KB – ideal for lean, fast applications.
- ⚡ High performance: Engineered for speed and responsiveness.
- ✅ Zero dependencies: No extra baggage – pure JavaScript!
- 🎨 Minimalistic design: Easily integrates with other designs.
- 🚚 Exports in multiple formats: Supports ESM, CJS, and IIFE.
- 📘 TypeScript support: Fully typed. Better DX.
- ✌️ 2 Function API: Small, simple – just what you need.

---

## 📦 Installation

Include Nanosplash in your project via your preferred method (e.g., CDN, module bundler). Example:

```html
<script src="https://unpkg.com/nanosplash/dist/iife/ns.iife.js"></script>
```

or

```bash
npm install nanosplash
```

---

## 🎯 API Documentation

### `ns.show(text?, target?)`

Displays a Nanosplash.

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

---

### `ns.hide(id?)`

Hides or removes a Nanosplash.

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

---

## 🎨 Customization

Nanosplash is designed to be fully customizable with CSS. You can style its key parts using these selectors:

| Selector        | Description                              |
|------------------|------------------------------------------|
| `.nsh::before`  | Backdrop                                  |
| `.ns`           | Main wrapper for the splash               |
| `.nst`          | Text element                              |
| `.nss`          | Spinner element                           |

---

## 🛠️ Examples

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

---

## 💖 Contributing & Feedback

Found a bug or have a feature request? Visit the [GitHub repository](https://github.com/isakhauge/nanosplash) and open an issue or pull request!

---