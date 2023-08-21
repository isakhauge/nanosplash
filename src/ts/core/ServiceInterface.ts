// @ts-strict

import { GUIDString, Reference } from '../types/Types'
import { Splash } from './Splash'

export interface ServiceInterface {
	/**
	 * # Nanosplash Stack
	 * For each Nanosplash instance created, it's pushed to the stack.
	 * When a Nanosplash instance is removed, it's removed from the stack.
	 * @see Splash
	 */
	readonly nsStack: Splash[]

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
