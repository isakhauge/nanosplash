// @ts-strict

import NanosplashService from './ts/core/Nanosplash/NanosplashService'
try {
	NanosplashService.start()
} catch (e) {
	console.warn(e)
}
