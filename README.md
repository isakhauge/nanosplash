# Nanosplash

### The tiny loading screen for web artisans

<br>

[![Build](https://github.com/isakhauge/nanosplash/actions/workflows/ci.yml/badge.svg?branch=production)](https://github.com/isakhauge/nanosplash/actions/workflows/ci.yml)

## Documentation

[isakhauge.github.io/nanosplash/](https://isakhauge.github.io/nanosplash/)

## Usage

### Show

#### Spinner only

Fullscreen Nanosplash with spinner only.

```js
ns.show()
```

Nanosplash inside the given element with spinner only.

```js
ns.show(null, '#my-div')
```

#### Text and spinner

Fullscreen Nanosplash with text and spinner.

```js
ns.show('Hi')
```

Nanosplash inside the given element with text and spinner.

```js
ns.show('Hi', '#my-div')
```

### Hide

#### Agnostic (FIFO)

Remove the oldest Nanosplash residing inside the window body.

```js
ns.hide()
```

#### Specific

Remove a specific Nanosplash by its ID.

```js
ns.hide(id)
```

#### All

Remove all Nanosplashes.

```js
ns.hide('*')
```
