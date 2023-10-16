# Usage

```js{2,5,8,11,14,18,21}
// Fullscreen spinning wheel
ns.show()

// Fullscreen spinning wheel with text
ns.show('Loading')

// Display inside an element
ns.showInside('#my-table', 'Fetching data')

// Hide the first created loading screen (FIFO)
ns.hide()

// Hide loading screen inside an element
ns.hideInside('#my-table')

// Hide specific loading screen
const id = ns.show('Loading')
ns.hideId(id)

// Hide all loading screens
ns.hideAll()
```
