import { Service } from '../core/Nanosplash/Service'

declare module nanosplash {
	export { Service }
}

declare global {
	interface Window {
		ns: Service
	}
}
