import { DOMSelector, UTCInteger } from './Types'

export interface NanosplashInterface {
	/**
	 * # Show
	 * Display Nanosplash inside the window.
	 * @param {string | null | undefined} text Optional text. Pass falsy to display spinner only.
	 * @param {string | Element | undefined} inside Optional element reference
	 * @returns {number | null} The internal ID of the created Nanosplash.
	 */
	show(
		text?: string | null | undefined,
		inside?: DOMSelector | HTMLElement
	): UTCInteger | null
	/**
	 * # Hide
	 * Remove Nanosplash in multiple ways depending on the passed argument.
	 * - Pass ID: Remove specific.
	 * - Pass '*': Remove all in window.
	 * - Pass nothing: Remove in FIFO order.
	 * @param id The internal ID, an asterisk, or nothing.
	 */
	hide(id?: UTCInteger | '*'): void
	/**
	 * # Version
	 * The current version of Nanosplash.
	 */
	version: string
}
