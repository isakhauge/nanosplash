# Usage

```js{2,5,8,11,15,18}
// Fullscreen spinning wheel
ns.show()

// Fullscreen spinning wheel with text
ns.show('Loading')

// Display inside an element
ns.show('Fetching data', '#my-table')

// Hide the first created loading screen (FIFO)
ns.hide()

// Hide specific loading screen
const id = ns.show('Loading')
ns.hide(id)

// Hide all loading screens
ns.hide('*')
```
