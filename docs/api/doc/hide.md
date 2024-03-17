# Hide Nanosplash

## Hide

Hides the oldest Nanosplash (FIFO).

```ts
ns.hide(): void
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
If you have multiple Nanosplashes open at the same time, I would recommend
that you hide specific elements based on their ID.
See [Hide by ID](#hide-by-id) for more information.
:::

## Hide by ID

Hides a Nanosplash by its ID.

```ts
ns.hide(id: number): number | null
```

The show method returns the Nanosplash ID. This identifier can be
used to hide a specific Nanosplash at a later time.

```js
const id = ns.show('Loading')
ns.hide(id)
```

## Hide all

Hides all Nanosplashes in the `window`.

```ts
ns.hide('*'): void
```
