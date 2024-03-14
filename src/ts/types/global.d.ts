import { NanosplashInterface } from './NanosplashInterface'

interface IWindow {
	ns: NanosplashInterface
}

declare global {
	interface Window extends IWindow {}
	interface window extends IWindow {}
	interface globalThis extends globalThis {
		Window: IWindow
		window: IWindow
	}
}
