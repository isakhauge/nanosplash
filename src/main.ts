// @ts-strict

import './sass/ns.sass'
import NanosplashService from './ts/core/Nanosplash/services/NanosplashService'
try {
	NanosplashService.start()
} catch (e) {
	console.warn(e)
}
