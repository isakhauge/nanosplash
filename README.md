# nanosplash

<strong>The tiny splash screen</strong>

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
import {NanoSplash} from 'nanosplash'

// Import CJS module
const nanosplash = require('nanosplash')
```

### Import IIFE
```html
<script src="<path-or-url>/dist/iife/nanosplash.iife.js">
```
## Documentation
### Basic example
```js
// Show
window.splash.show('Loading ...')

// Hide
window.splash.hide()
```
### Display splash inside specified element
```js
// Alternative 1:
window.splash.show('Loading fancy things ...').inside('#some-id')

// Alternative 2:
window.splash.show('Loading fancy things ...').inside(document.getElementById('some-id'))

// Alternative 3:
window.splash.show('Loading fancy things ...').inside(() => document.querySelector('#some-id'))
```
The `inside` function takes three types of arguments:
1. DOMString selector.
2. `Element`.
3. A function that returns `Element`.

### Vue + nanosplash = 💖

You can display `nanosplash` inside a vue component eg.

```js
window.splash.show('Loading component ...').inside(this.$refs.myComponent)
```
