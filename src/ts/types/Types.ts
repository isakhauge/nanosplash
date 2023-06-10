import { Service } from '../core/Nanosplash/Service'
import { Splash } from '../core/Nanosplash/Splash'

declare global {
	interface Window {
		ns: Service
	}
}

export type GUIDString = string

export type CSSSelector = string

export type FindCallback<T> = (item: T, index: number) => boolean
export type NSFinder = FindCallback<Splash>

export type Reference = CSSSelector | Element
