# Nanosplash

> Tiny loading screen for web artisans

## Get started

Always get the latest version.

```html
<script src="https://unpkg.com/nanosplash/dist/ns.iife.js">
```

## Display loading screen

Display spinning wheel only.

```js
ns.show()
```

Display with text.

```js
ns.show('Loading assets')
```

Display inside another element.

```js
ns.showInside('Loading table', '#my-table')
```

## Hide loading screen

Hide the last loading screen (LIFO).

```js
ns.hide()
```

Hide loading screen inside another element.

```js
ns.hideInside('#my-table')
```

Hide all loading screens.

```js
ns.hideAll()
```
