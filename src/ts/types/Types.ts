import { NanosplashInterface } from './NanosplashInterface'

export type Integer = number
export type UTCInteger = Integer
export type DOMSelector = string
export type ElementReference = DOMSelector | Element

export interface NSElement extends HTMLDivElement {
	nsId: number
}

declare global {
	interface Window {
		ns: NanosplashInterface
	}
}
