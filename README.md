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

# Getting started

## Import via CDN (recommended)

```html
<script src="https://unpkg.com/nanosplash/dist/iife/nanosplash.iife.js"></script>
```
```js
// Install Nanosplash in the browser
window.installNanosplash()
// Display your first Nanosplash
window.ns.show('Hello world')
```

## Install (advanced)
```bash
yarn add nanosplash
```

### Modules

When including either ES or CJS modules, you need the CSS in the dist folder, whereas in the IIFE variant, everything is included. If you are using a modern bundler e.g Vite, NextJS, NuxtJS, you can import the CSS directly into your code.

```js
import 'nanosplash/dist/module/style.css'
```

> ### Location of the stylesheet
>
> Full: `node_modules/nanosplash/dist/module/style.css`<br>
> Relative: `nanosplash/dist/module/style.css`

#### ESM (ES modules)

```js
import { Nanosplash } from 'nanosplash'
```

#### CJS (CommonJS)

```js
const Nanosplash = require('nanosplash')
```

### Inject Nanosplash into global scope
#### Using CDN
```js
const nsOptions = {
    spinner: true,
    fontSize: '18px',
}
window.installNanosplash(nsOptions)
```
#### Using modules
```js
const nsOptions = {
    spinner: true,
    fontSize: '18px',
}
window.ns = new Nanosplash(nsOptions)
```

## Basic usage

### Display the loading screen

```js
ns.show('Loading the good stuff')
```

### Hide the loading screen

```js
// Hide one at a time
ns.hide()

// Hide all
ns.hideAll()
```

## Advanced usage

### Display the loading screen inside an element

```js
// Use CSS selector string
ns.show('Loading component').inside('#my-element')

// Use HTMLElement objects directly
ns.show('Loading component').inside(document.getElementById('my-element'))
```

### Combine Nanosplash with async tasks

```js
const task1 = new Promise(r => setTimeout(r, 3000))
const task2 = async () => await getDataFromApi()

ns.while(task1).show('Loading resources')
ns.while(task2).show('Fetching table data').inside('#my-table')

ns.progress(
    [task1, 'Loading data from API'],
    [task2, 'Processing data']
).inside('#my-table')
```

<hr>

## If you like it, give it a star! ⭐️
