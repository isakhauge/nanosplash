# Nanosplash API Documentation

Nanosplash is a lightweight, non-blocking loading indicator. It can be displayed globally over the document body or scoped inside any specific container element. Multiple instances can exist simultaneously, each tracked by a unique ID.

---

## `useNs(options?)`

The sole entry point for the Nanosplash API. Call this function to obtain an API object exposing `show`, `hide`, and `version`.

Creating the API does not modify the DOM. Styles are injected lazily the first time `show()` renders an instance.

Anti-flicker timing is configured here — once, for the whole API instance — so every splash behaves consistently. See [Anti-Flicker Timing](#anti-flicker-timing).

```ts
const ns = useNs()

// With anti-flicker timing applied to every splash
const ns = useNs({ showDelay: 150, minDuration: 400 })
```

**Parameters**

| Parameter | Type        | Required | Description                                                                              |
| --------- | ----------- | -------- | ---------------------------------------------------------------------------------------- |
| `options` | `NsOptions` | No       | Configuration (anti-flicker timing) applied to every splash shown through this instance. |

**Returns:** `INanosplash`

---

## API Reference

### `show(text?, inside?)`

Displays a loading indicator — or runs async **jobs** under one. The behavior depends on the first argument:

| First argument          | Behavior                                                                                | Returns                                         |
| ----------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------- |
| Plain text (or nothing) | Shows a splash; hide it yourself.                                                       | `int \| null` (the `nsId`)                      |
| One `[label, job]` pair | Shows a splash with the label, runs the job, auto-hides when it settles.                | `Promise` of the job's result                   |
| Array of pairs          | Runs the jobs **sequentially** under one splash, updating the label as each job starts. | `Promise` of a typed tuple of results, in order |

A **job** is a thunk returning a promise — `() => Promise<T>` — so the splash is guaranteed to be visible before the work starts.

If the target container already contains a Nanosplash instance, that instance is **recycled** — its text is updated rather than creating a duplicate. If no container is specified, the indicator overlays the whole viewport without disturbing the page's scroll position.

**Signatures**

```ts
show(label?: NsLabel, inside?: ElementRef): int | null
show<T>(job: NsLabeledJob<T>, inside?: ElementRef): Promise<Awaited<T>>
show<Jobs extends readonly NsLabeledJob<unknown>[]>(
  jobs: readonly [...Jobs],
  inside?: ElementRef
): Promise<NsJobResults<Jobs>> // tuple of each job's result, in order
```

**Parameters**

| Parameter                | Type          | Required | Description                                                                                                             |
| ------------------------ | ------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `label` / `job` / `jobs` | `NsShowInput` | No       | A label (falsy for spinner only), a `[label, job]` labeled job, or an array of labeled jobs.                            |
| `inside`                 | `ElementRef`  | No       | The target container. Accepts an `Element`, a CSS selector string, or an element ref. Omit to target the document body. |

**Returns**

Plain text: the numeric `nsId` of the displayed instance, or `null` if the supplied container reference could not be resolved. Store this value to later target this specific instance with `hide()`.

Job overloads: a promise resolving with the job result(s). Rejections propagate after the splash is hidden. If the container cannot be resolved, the jobs still run — just without a splash.

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

// One job: splash lives exactly as long as the work
const user = await ns.show(['Loading user…', () => fetchUser()])

// A sequence of labeled jobs under one splash — label updates per step,
// results come back as a typed tuple in order: [User, Post[], boolean]
const [user, posts, ok] = await ns.show(
  [
    ['Loading user…', () => fetchUser()],
    ['Loading posts…', () => fetchPosts()],
    ['Verifying…', () => verify()],
  ],
  '#dashboard',
)
```

**Job sequence semantics**

- Jobs run one at a time, in the given order; the splash label updates as each job starts.
- One splash element is reused for the whole sequence (no flicker between steps).
- **Fail fast:** on the first rejection the splash is hidden, the error propagates, and later jobs never start.
- A pair with empty text (`''`, `null`, `undefined`) shows the spinner only — standard Nanosplash behavior.
- An empty array resolves `[]` without showing a splash.
- Hook-level anti-flicker timing (`showDelay`, `minDuration`) applies to job splashes like any other.

---

### `hide(id?)`

Removes one or all active Nanosplash instances from the DOM and cleans up any host class applied to their parent containers.

**Signature**

```ts
hide(id?: int | '*'): void
```

**Parameters**

| Parameter | Type           | Required | Description                                                   |
| --------- | -------------- | -------- | ------------------------------------------------------------- |
| `id`      | `int` \| `'*'` | No       | Controls which instance to remove. See behaviour table below. |

**Behaviour by argument**

| Value                 | Effect                                                        |
| --------------------- | ------------------------------------------------------------- |
| Omitted / `undefined` | Removes the **oldest** active instance (FIFO order).          |
| `number`              | Removes the instance whose `nsId` matches the provided value. |
| `'*'`                 | Removes **all** active instances from the DOM.                |

If the target instance was shown with `minDuration` and has not been visible long enough, removal is deferred until the minimum has elapsed. An instance still inside its `showDelay` window is removed immediately and never becomes visible.

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

Every call to `show()` that creates a new instance assigns it a unique numeric ID (`nsId`) from an internal monotonic counter. This ID is returned by `show()` and can be passed to `hide()` to remove that exact instance, which is especially useful when multiple loaders are active simultaneously.

```ts
const pageId = ns.show('Loading page…')
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

When no container is provided, Nanosplash attaches to the document body, but the overlay itself is pinned to the viewport (`position: fixed`) rather than the document. `body` is never taken out of normal flow, so showing or hiding a full-page splash never disturbs `window.scrollY`.

### Host Class

Whenever a Nanosplash is mounted inside a container, a CSS host class is added to that container. This class is automatically removed when the instance is hidden, enabling scoped overlay styling without leaving residual state.

### Anti-Flicker Timing

`useNs()` accepts an optional `NsOptions` object. It applies to **every** splash shown through the returned API instance, so visual behavior stays consistent across your app:

```ts
interface NsOptions {
  showDelay?: number // ms to stay invisible after show()
  minDuration?: number // minimum ms visible once shown
}
```

- **`showDelay`** — the splash is inserted immediately (IDs, recycling, and FIFO behave as usual) but stays invisible for the given number of milliseconds via CSS `animation-delay`. If it is hidden before the delay elapses, it is removed without ever becoming visible. This prevents a flash of spinner on operations that finish quickly.
- **`minDuration`** — once visible, the splash stays on screen at least this long. A `hide()` call arriving earlier is deferred until the minimum has passed. This prevents a barely-visible blink.

Combining both gives the classic anti-flicker pattern:

```ts
const ns = useNs({ showDelay: 150, minDuration: 400 })
ns.show('Loading…') // every splash now uses the same timing
```

### Accessibility

Every Nanosplash element is announced politely to assistive technology:

- The splash element has `role="status"` and `aria-live="polite"`, so the text label is read aloud when it appears or changes.
- The spinner SVG is `aria-hidden="true"`.
- The host container gets `aria-busy="true"` while a splash is active, removed on hide.
- Under `prefers-reduced-motion: reduce`, fades and entrance animations are disabled and the spinner rotates slowly and steadily with a static arc.

### Theming

The injected stylesheet defines its theming defaults on `:where(:root)` — zero specificity — so any rule of yours wins, regardless of stylesheet load order. Override globally on `:root` or per container:

```css
:root {
  --ns-color: tomato; /* spinner + text color (default: DarkSlateGray) */
  --ns-size: 24px; /* base size; spinner scales from it (default: 20px) */
  --ns-font: 'Inter', 'Helvetica'; /* text font stack */
  --ns-weight: 500; /* text font weight (default: 400) */
  --ns-bg: rgba(
    0,
    0,
    0,
    0.8
  ); /* overlay background (default: rgba(255,255,255,0.9)) */
  --ns-z-index: 100; /* overlay z-index (default: 9999999999) */
  --ns-blur: blur(2px); /* backdrop blur (default: blur(5px)) */
}

/* Scoped: theme only the loaders inside one panel */
#dashboard {
  --ns-color: white;
  --ns-bg: rgba(0, 0, 0, 0.6);
}
```
