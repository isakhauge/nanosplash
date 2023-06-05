/// <reference types="vite/client" />

declare module 'nanosplash' {
	export type GUIDString = string

	export type CSSSelector = string

	export type FindCallback = (ns: Nanosplash, index: number) => boolean

	export type ElementCallback = () => Element | Promise<Element>

	export type Reference = CSSSelector | Element | ElementCallback

	export interface NanosplashInterface {
		/**
		 * # Get ID
		 * Return Nanosplash instance GUID.
		 */
		getId(): GUIDString

		/**
		 * # Get NS Element
		 * Return Nanosplash instance HTMLDivElement.
		 */
		getNSElement(): HTMLDivElement

		/**
		 * # Set Text
		 * @param text The text that will be visible inside the splash.
		 */
		setText(text: string): Nanosplash

		/**
		 * # Show Text
		 * Display text element.
		 */
		showText(): Nanosplash

		/**
		 * # Hide Text
		 * Hide the text element.
		 */
		hideText(): Nanosplash

		/**
		 * # Remove
		 * Delete all
		 */
		remove(): void
	}

	export interface NanosplashServiceInterface {
		/**
		 * # Show
		 * Present a Nanosplash in the browser window displaying the given text.
		 * @param text Text to display.
		 * @returns {GUIDString} Nanosplash ID.
		 */
		show(text?: string): GUIDString

		/**
		 * # Show Inside
		 * Present a Nanosplash over the given element displaying the given text.
		 * @param ref Reference an element.
		 * @param text Text to display.
		 * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
		 */
		showInside(ref: Reference, text?: string): GUIDString | null

		/**
		 * # Hide
		 * Hide the last created Nanosplash.
		 * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
		 */
		hide(): GUIDString | null

		/**
		 * # Hide All
		 * Hide all Nanosplashes.
		 */
		hideAll(): void

		/**
		 * # Hide ID
		 * Hide Nanosplash by its ID.
		 * @param id Nanosplash ID.
		 * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
		 */
		hideId(id: GUIDString): GUIDString | null

		/**
		 * # Hide Inside
		 * Hide Nanosplash inside the given element if it exists.
		 * @param ref Reference an element.
		 * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
		 */
		hideInside(ref: Reference): GUIDString | null
	}

	declare global {
		interface Window {
			ns: NanosplashService
		}
	}
}
