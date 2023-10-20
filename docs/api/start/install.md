<script setup>
import Card from '../../.vitepress/theme/vue/Card.vue'
</script>

# Installation

Nanosplash can be installed either via CDN or NPM. Installing via CDN is easier and requires less configuration, but installing via NPM is more flexible and allows you to controll the imports and initialization of the Nanosplash service running in your application.

## CSS

Since version 3.0.3, CSS is included inside the JS bundle. 🎉

## Install via CDN

Add the following script tag to the `<head>` of your HTML document:

```html
<script src="https://unpkg.com/nanosplash@3.0.3/dist/iife/ns.iife.js"></script>
```

```html{5}
<html>
	<head>
		<meta charset="UTF-8" />
		<title>My awesome application 🚀</title>
		<script src="https://unpkg.com/nanosplash@3.0.3/dist/iife/ns.iife.js"></script>
	</head>
	...
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

```js{2}
import { Service } from 'nanosplash'
Service.start()
```

The service will inject an instance of itself inside the global `window` object. You can now start using Nanosplash by simply calling `ns.show`.
