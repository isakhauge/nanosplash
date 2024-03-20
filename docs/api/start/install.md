<script setup>
import Card from '../../.vitepress/theme/vue/Card.vue'
</script>

# Installation

Nanosplash can be installed either via CDN or NPM. Installing via CDN is easier and requires less configuration, but installing via NPM is more flexible and allows you to controll the imports and initialization of the Nanosplash service running in your application.

## CSS

CSS is included inside the JS bundle. 🎉

## Install via CDN

Add the following script tag inside of the `<body>` tag:

```html
<script src="https://unpkg.com/nanosplash/dist/iife/ns.iife.js"></script>
```

### Example

```html{6}
<html>
	<head>
		<title>My awesome application 🚀</title>
	</head>
	<body>
		<script src="https://unpkg.com/nanosplash/dist/iife/ns.iife.js"></script>
	</body>
</html>
```

Now you can easily start using Nanosplash by simply calling `ns.show`.

```ts
ns.show('It works!')
```

## Install via NPM

Install Nanosplash via NPM by running the following command:

```bash
yarn add nanosplash
```

To import and start the Nanosplash service in your application, you need to import the Service class and start it.

```js{2,3}
import { useNs } from 'nanosplash'
const ns = useNs()
ns.show('It works!')
```

For ease of use, add it to the window object for global access.

```js{2}
import { useNs } from 'nanosplash'
window.ns = useNs()
```
