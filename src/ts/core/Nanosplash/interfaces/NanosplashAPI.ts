import { GUIDString } from '../../../types/Alias'
import { Destination } from '../../../types/Nanosplash'

export interface NanosplashAPI {
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
	 * @param destination Target element.
	 * @param text Text to display.
	 * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
	 */
	showInside(destination: Destination, text?: string): GUIDString | null

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
	 * @param destination Target element.
	 * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
	 */
	hideInside(destination: Destination): GUIDString | null
}
