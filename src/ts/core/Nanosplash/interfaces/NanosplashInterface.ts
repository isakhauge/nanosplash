// @ts-strict

import type { GUIDString } from '../../../types/Alias'
import type Nanosplash from '../Nanosplash'

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
