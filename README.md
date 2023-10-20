# Nanosplash

### The tiny loading screen for web artisans

<br>

[![Build](https://github.com/isakhauge/nanosplash/actions/workflows/ci.yml/badge.svg?branch=production)](https://github.com/isakhauge/nanosplash/actions/workflows/ci.yml) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/nanosplash) [![Coverage](https://img.shields.io/badge/Coverage-99%25-brightgreen)](./coverage/index.html) [![TypeScript](https://badges.frapsoft.com/typescript/version/typescript-next.svg?v=101)](https://github.com/ellerbrock/typescript-badges/) [![Last Commit](https://img.shields.io/github/last-commit/isakhauge/nanosplash)](https://github.com/isakhauge/nanosplash/commits/production)

<br>

> 📣 **New in 3.0.3**
>
> -   CSS is included inside the ES and CJS bundles 🎉
> -   The `ns.hide` method will now delete splash screens in a FIFO sequence.

## Usage

```js
// Fullscreen splash screen
ns.show('Loading')
ns.hide()

// Splash screen inside a DOM element
ns.showInside('#my-div', 'Loading')
ns.hide()
```

## Documentation

[isakhauge.github.io/nanosplash/](https://isakhauge.github.io/nanosplash/)
