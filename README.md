# nanosplash 🍩
![npm](https://img.shields.io/npm/v/nanosplash)
![Minified+gzip size](https://badgen.net/bundlephobia/minzip/nanosplash)
![Minified size](https://badgen.net/bundlephobia/dependency-count/nanosplash)
![Minified size](https://badgen.net/bundlephobia/tree-shaking/nanosplash)
<br>

![npm maintenance score](https://img.shields.io/npms-io/maintenance-score/nanosplash)
![npm quality score](https://img.shields.io/npms-io/quality-score/nanosplash)
![npm final score](https://img.shields.io/npms-io/final-score/nanosplash)
![npm popularity score](https://img.shields.io/npms-io/popularity-score/nanosplash)

<strong>The simple, 2KB splash screen</strong>
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
const nanosplash = require('nanosplash')
```

### Import via CDN
```html
<script src="https://unpkg.com/nanosplash/dist/iife/nanosplash.iife.js">
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

### Config
Example config object
```js
const config = {
    default: {
        destination: document.body // Default,
        text: 'Loading ...' // Default
    };
    text: {
        family: '"Arial", sans-serif',
        color: '#333',
        size: '1.5rem'
    };
    splash: {
        src: 'yourURL',
        width: '100px',
        animation: 'pulse' // 'none' | 'pulse' (default) | 'spin'
    };
    background: {
        color: 'rgba(255, 255, 255, 0.75)', // Default
        blur: true // Default
    };
}
```
### Types
```ts
type Config = {
    default?: DefaultOptions;
    text?: TextOptions;
    splash?: SplashOptions;
    background?: BackgroundOptions;
};

type DefaultOptions = {
    destination?: Destination;
    text?: string;
};

type Destination = Node | Element | DestinationCallback | string;

type DestinationCallback = () => Element;

type TextOptions = {
    family?: string;
    color?: string;
    size?: string;
};

type SplashOptions = {
    src?: string;
    width?: string;
    animation?: SplashAnimation;
};

type SplashAnimation = "none" | "pulse" | "spin";

type BackgroundOptions = {
    color?: string;
    blur?: boolean;
};
```
