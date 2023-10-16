import { GUIDString } from '../types/Types'
import { Splash } from './Splash'

export interface SplashInterface {
	/**
	 * # Get ID
	 * Return Nanosplash instance GUID.
	 */
	getId(): GUIDString | null

	/**
	 * # Get Element
	 * Return Nanosplash instance HTMLDivElement.
	 */
	getElement(): HTMLDivElement | null

	/**
	 * # Get Text Element
	 * Returns the text element of the Nanosplash.
	 */
	getTextElement(): HTMLDivElement | null

	/**
	 * # Set Text
	 * @param text The text that will be visible inside the splash.
	 */
	setText(text: string): Splash

	/**
	 * # Show Text
	 * Display text element.
	 */
	showText(): Splash

	/**
	 * # Hide Text
	 * Hide the text element.
	 */
	hideText(): Splash

	/**
	 * # Delete
	 * Remove from DOM and delete internal data.
	 */
	delete(): boolean
}
