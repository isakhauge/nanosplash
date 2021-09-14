# nanosplash 🍩

![npm](https://img.shields.io/npm/v/nanosplash)
![Minified+gzip size](https://badgen.net/bundlephobia/minzip/nanosplash)
![Minified size](https://badgen.net/bundlephobia/dependency-count/nanosplash)
![Tree shaking](https://badgen.net/bundlephobia/tree-shaking/nanosplash)

![npm maintenance score](https://img.shields.io/npms-io/maintenance-score/nanosplash)
![npm quality score](https://img.shields.io/npms-io/quality-score/nanosplash)
![npm final score](https://img.shields.io/npms-io/final-score/nanosplash)
![npm popularity score](https://img.shields.io/npms-io/popularity-score/nanosplash)

<strong>The simple, tiny loading screen</strong>

> <em>No dependencies, pure JS</em>

# Installation

## Yarn

```bash
yarn add nanosplash
```

## NPM

```bash
npm install nanosplash
```

# Import

## Import via CDN

When you import the IIFE script there is no need to invoke the `install` function.

```html
<script src="https://unpkg.com/nanosplash/dist/iife/nanosplash.iife.js">
```

## ESM (ES modules)

```js
import { Nanosplash } from 'nanosplash'
```

## CJS (CommonJS)

```js
const Nanosplash = require('nanosplash')
```

# Getting started

## Basic usage (CDN)

When imported through the CDN, the instance is already injected into the `Window` object and accessible through the global variable `loading`.

### Display the loading screen

```js
loading.show('Loading the good stuff ...')
```

### Hide the loading screen

```js
loading.hide()
```

### Display the loading screen inside an element

```js
loading.show('Loading component ...').inside('#my-element')
```

## Advanced usage (modules)

**⚠️ Always import the CSS file when importing modules manually**

```js
import { Nanosplash } from 'nanosplash'
import 'nanosplash/dist/module/style.css'
```

# Demo site
```
https://unpkg.com/nanosplash/dist/site/index.html
```

# Documentation

[Nanosplash API]('https://isakhauge.github.io/nanosplash/')
