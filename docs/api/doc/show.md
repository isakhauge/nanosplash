# Show Nanosplash

## Show

This method displays a fullscreen loading screen and returns a GUID string.

```ts
ns.show(text?: string): GUIDString
```

If you enter no text, it will display the spinning wheel only.

```js
ns.show()
```

If you enter text, it will display the spinning wheel adjacent to the text.

```js
ns.show('Loading')
```

## Show inside

This method displays a loading screen inside an element and returns a GUID
string. The `Reference` type is a union type of `string | Element`. A reference
can be both a CSS selector `string` or an `Element`.

```ts
ns.showInside(ref: Reference, text?: string): GUIDString | null
```

```js
// CSS selector
const selector = '#my-table'
ns.showInside(selector, 'Loading')

// Element
const element = document.getElementById('my-table')
ns.showInside(element, 'Loading')
```

::: tip
A host element can only contain one Nanosplash element at a time. If
you try to show a splash inside an element that already contains a splash,
the existing splash will be overwritten.
:::
