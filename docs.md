# Nanosplash API Documentation

Nanosplash is a lightweight, non-blocking loading indicator. It can be displayed globally over the document body or scoped inside any specific container element. Multiple instances can exist simultaneously, each tracked by a unique ID.

---

## `useNs()`

The sole entry point for the Nanosplash API. Call this function to obtain an API object exposing `show`, `hide`, and `version`.

```ts
const ns = useNs()
```

**Returns:** `INanosplash`

---

## API Reference

### `show(text?, inside?)`

Displays a loading indicator, optionally with a text label and optionally scoped to a specific container.

If the target container already contains a Nanosplash instance, that instance is **recycled** — its text is updated rather than creating a duplicate. If no container is specified, the indicator is rendered over the document body and automatically positioned at the current scroll offset.

**Signature**

```ts
show(text?: string, inside?: ElementRef): int | null
```

**Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | No | Label text rendered beside the spinner. Pass `undefined`, `null`, or an empty string to show only the spinner with no text. |
| `inside` | `ElementRef` | No | The target container. Accepts an `Element`, a CSS selector string, or an element ref. Omit to target the document body. |

**Returns**

The numeric `nsId` of the displayed instance, or `null` if the element could not be resolved. Store this value to later target this specific instance with `hide()`.

**Examples**

```ts
// Full-page spinner with no text
ns.show()

// Full-page spinner with a label
ns.show('Loading…')

// Scoped to a container element via CSS selector
ns.show('Fetching data…', '#dashboard')

// Scoped to a container element via Element reference
const container = document.querySelector('.card')
ns.show('Please wait', container)

// Store the ID to hide this specific instance later
const id = ns.show('Saving…', '#form-panel')
```

---

### `hide(id?)`

Removes one or all active Nanosplash instances from the DOM and cleans up any host class applied to their parent containers.

**Signature**

```ts
hide(id?: int | '*'): void
```

**Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `int` \| `'*'` | No | Controls which instance to remove. See behaviour table below. |

**Behaviour by argument**

| Value | Effect |
|-------|--------|
| Omitted / `undefined` | Removes the **oldest** active instance (FIFO order). |
| `number` | Removes the instance whose `nsId` matches the provided value. |
| `'*'` | Removes **all** active instances from the DOM. |

**Examples**

```ts
// Remove the oldest active instance
ns.hide()

// Remove a specific instance by the ID returned from show()
const id = ns.show('Processing…')
ns.hide(id)

// Remove all active instances at once
ns.hide('*')
```

---

### `version`

A read-only string containing the current Nanosplash version, derived from `package.json` at build time.

**Type:** `string`

```ts
console.log(ns.version) // e.g. "1.4.2"
```

---

## Concepts

### Instance IDs

Every call to `show()` that creates a new instance assigns it a unique numeric ID (`nsId`) based on `Date.now()`. This ID is returned by `show()` and can be passed to `hide()` to remove that exact instance, which is especially useful when multiple loaders are active simultaneously.

```ts
const pageId   = ns.show('Loading page…')
const widgetId = ns.show('Refreshing widget…', '#widget')

// Hide only the widget loader, leave the page loader active
ns.hide(widgetId)

// Hide the page loader when done
ns.hide(pageId)
```

### Instance Recycling

When `show()` is called with a container that already holds an active Nanosplash, a new element is **not** created. Instead, the existing instance is reused and its text is updated. This prevents stacking duplicate spinners inside the same container.

```ts
ns.show('Step 1…', '#panel')
ns.show('Step 2…', '#panel') // Updates the text; does not create a second spinner
```

### FIFO Queue

All active instances are internally ordered by their creation timestamp. When `hide()` is called without arguments, it always removes the oldest instance first, enabling a natural first-in, first-out dismissal pattern for sequenced operations.

### Body-Level Positioning

When no container is provided, Nanosplash attaches to the document body and sets a `--ns-top` CSS custom property equal to the current `window.scrollY`. This keeps the overlay anchored to the visible viewport even on scrolled pages.

### Host Class

Whenever a Nanosplash is mounted inside a container, a CSS host class is added to that container. This class is automatically removed when the instance is hidden, enabling scoped overlay styling without leaving residual state.