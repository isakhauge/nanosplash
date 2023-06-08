// @ts-strict

import { Service } from './core/Nanosplash/Service'

try {
	Service.start()
} catch (e) {
	console.warn(e)
}
