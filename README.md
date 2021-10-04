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

## Import via CDN (recommended)

When you import the IIFE script there is no need to invoke the `install` function.

```html
<script src="https://unpkg.com/nanosplash/dist/iife/nanosplash.iife.js">
```

## Modules

When including either ES or CJS modules, you need the CSS in the dist folder, whereas in the IIFE variant, everything is included. If you are using a modern bundler e.g Vite, NextJS, NuxtJS, you can import the CSS directly into your code.

```js
import 'nanosplash/dist/module/style.css'
```

> ### Location of the stylesheet
>
> Full: `node_modules/nanosplash/dist/module/style.css`<br>
> Relative: `nanosplash/dist/module/style.css`

### ESM (ES modules)

```js
import { Nanosplash } from 'nanosplash'
```

### CJS (CommonJS)

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

## Advanced usage

### Combine Nanosplash with async tasks

```js
const task1 = new Promise(r => setTimeout(() => r(), 3000))
const task2 = async () => await getDataFromApi()

loading.show('Loading resources ...').during(task1)
loading.show('Fetching table data ...').inside('#my-table').during(task2)
```

<hr>

## If you like it, give it a star! ⭐️
