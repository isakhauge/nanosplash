// @ts-strict

import { GUIDString } from '../types/Types'
import { Splash } from './Splash'

export interface SplashInterface {
	/**
	 * # Get NS Content Element
	 * Returns the content element of the Nanosplash.
	 */
	getNSContentElement(): HTMLDivElement

	/**
	 * # Get NS Text Element
	 * Returns the text element of the Nanosplash.
	 */
	getNSTextElement(): HTMLDivElement

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
	 * # Remove
	 * Delete all
	 */
	remove(): Splash
}
