// @ts-strict

import { Service } from './core/Service'

try {
	Service.start()
} catch (e) {
	console.warn(e)
}
