# nanosplash 🍩

![npm](https://img.shields.io/npm/v/nanosplash)
![Minified+gzip size](https://badgen.net/bundlephobia/minzip/nanosplash)
![Minified size](https://badgen.net/bundlephobia/dependency-count/nanosplash)
![Tree shaking](https://badgen.net/bundlephobia/tree-shaking/nanosplash)

![npm maintenance score](https://img.shields.io/npms-io/maintenance-score/nanosplash)
![npm quality score](https://img.shields.io/npms-io/quality-score/nanosplash)
![npm final score](https://img.shields.io/npms-io/final-score/nanosplash)
![npm popularity score](https://img.shields.io/npms-io/popularity-score/nanosplash)

<strong>The simple, 2KB loading screen</strong>

> <em>No dependencies, pure JS</em>

## Getting started

### Install nanosplash

```bash
# Yarn
yarn add nanosplash

# NPM
npm install nanosplash
```

### Import modules

```js
// Import ESM module
import { NanoSplash } from 'nanosplash'

// Import CJS module
const NanoSplash = require('nanosplash')

// Install (browser)
new NanoSplash().install()
```

### Import via CDN

When you import the IIFE script there is no need to invoke the `install` function.

```html
<script src="https://unpkg.com/nanosplash/dist/iife/nanosplash.iife.js">
```

## Basic usage

```js
// Covers entire screen
window.loading('Some text')

// Displays inside specific element
window.loading('Some text').inside('.some-class-or-id')
```

## Documentation

[Documentation](https://boostnote.io/shared/c5ccbfe5-a127-49d8-910c-cd2769c2b4d8)
