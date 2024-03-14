import { NanosplashInterface } from './NanosplashInterface'

export type UTCInteger = number
export type DOMSelector = string
export type ElementReference = DOMSelector | Element

export interface ScopedSelectors {
	/**
	 * @param selector Selector to match with a DOM element.
	 * @returns An array of elements matching with the selector.
	 */
	all: (selector: DOMSelector) => Element[]
	/**
	 * @param selector Selector to match with a DOM element.
	 * @returns Null or the first element in the DOM to match the selector.
	 */
	first: (selector: DOMSelector) => Element | null
}

export interface NSElement extends HTMLDivElement {
	nsId: number
}

declare global {
	interface Window {
		ns: NanosplashInterface
	}
}
