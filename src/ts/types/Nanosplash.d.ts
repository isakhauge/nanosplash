import type NanosplashService from '../core/Nanosplash/NanosplashService'

export type CSSSelector = string

export type ElementCallback = () =>
	| DestinationElement
	| Promise<DestinationElement>

export type Reference = CSSSelector | Element | ElementCallback

declare global {
	interface Window {
		ns: NanosplashService
	}
}
