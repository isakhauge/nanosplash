# Hide Nanosplash

## Hide

Hides the oldest loading screen (FIFO) and returns the GUID of the loading screen that was removed, or `null` if no loading screen was found.

```ts
ns.hide(): GUIDString | null
```

```js
ns.show('a')
ns.show('b')
ns.show('c')
ns.hide() // Hides 'a'
ns.hide() // Hides 'b'
ns.hide() // Hides 'c'
```

::: tip
If you have multiple loading screens open at the same time, I would recommend that you hide specific elements based on their GUID or host element. See [`hideId`](#hide-by-id) and [`hideInside`](#hide-inside) for more information.
:::

## Hide by ID

Hides the Nanosplash loading screen with the given GUID. If a loading screen matching the GUID is found, it will be removed and the same GUID will be returned. If no loading screen is found, `null` will be returned.

```ts
ns.hideId(guid: GUIDString): GUIDString | null
```

The show methods always retrun a GUID. This identifier can be used to hide specific loading screens.

```js
const id = ns.show('Loading')
ns.hideId(id)
```

## Hide inside

Hides the Nanosplash loading screen inside another element — if any — that corresponds with the given element reference. Returns the GUID string of the loading screen that was hidden, or `null` if no loading screen was found inside.

```ts
ns.hideInside(ref: Reference): GUIDString | null
```

This method works almost the same way as `hideId`, but instead of using the GUID string as the identifier, it uses the host element as the identifier.

```js
const selector = '#my-table'
ns.showInside(selector, 'Loading')
ns.hideInside(selector)
```

You can also use the `Element` type as the reference.

```js
const element = document.getElementById('my-table')
ns.showInside(element, 'Loading')
ns.hideInside(element)
```

## Hide all

Hides all Nanosplash loading screens.

```ts
ns.hideAll(): void
```
