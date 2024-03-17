# Show Nanosplash

## Show

This function display NS in fullscreen and returns the internal ID.

```ts
ns.show(text?: string): number
```

If you enter no text, it will display the spinning wheel only.

```js
ns.show(): number
```

If you enter text, it will display the spinning wheel adjacent to the text.

```js
ns.show('Loading'): number
```

## Show inside

This function display NS inside another element and returns the internal ID,
or `null` if the reference argument does not match any node inside the DOM.

```ts
ns.show(text?: string, ref?: Element | string): number | null
```

```js
// DOM selector
const selector: string = '#my-table'
ns.show('Loading', selector)

// Element
const element: HTMLElement = document.getElementById('my-table')
ns.show('Loading', element)
```

::: tip
A host element can only contain one Nanosplash element at a time. If
you try to show a splash inside an element that already contains a splash,
the existing splash will be overwritten.
:::
