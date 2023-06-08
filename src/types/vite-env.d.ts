/// <reference types="vite/client" />

import type Service from '../ts/core/Nanosplash/Service'

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

declare module 'nanosplash' {
	declare global {
		interface Window {
			ns: Service
		}
	}

	/**
	 * # Service
	 * A service class that handles Nanosplash instances.
	 * It's a singleton class and it's instance resides in the Window object and
	 * serves the public API of the Nanosplash library.
	 * @see Splash
	 * @author Isak K. Hauge <isakhauge@icloud.com>
	 */
	export class Service {
		/**
		 * # Window Accessor Key
		 * Key to access NanosplashService instance in the Window object.
		 * @public
		 */
		public static readonly WindowAccessorKey: 'ns'

		/**
		 * # Nanosplash Stack
		 * For each Nanosplash instance created, it's pushed to the stack.
		 * When a Nanosplash instance is removed, it's removed from the stack.
		 * @see Stack
		 * @see Splash
		 * @public
		 */
		public readonly nsStack: Stack<Splash>

		/**
		 * # Constructor
		 * Private constructor to prevent multiple instances.
		 * @private
		 */
		private constructor()

		/**
		 * # Get Instance
		 * Singleton instance accessor
		 * @returns {Service} NanosplashService instance.
		 * @public
		 */
		public static getInstance(): Service

		/**
		 * # Start
		 * Initialize and attach a Nanosplash Service instance to the Window object.
		 * @public
		 */
		public static start(): void

		/**
		 * # Show
		 * Present a Nanosplash in the browser window displaying the given text.
		 * @param text Text to display.
		 * @returns {GUIDString} Nanosplash ID.
		 * @public
		 */
		public show(text?: string): GUIDString

		/**
		 * # Show Inside
		 * Present a Nanosplash over the given element displaying the given text.
		 * @param ref Reference to an element.
		 * @param text Text to display.
		 * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
		 * @public
		 */
		public showInside(ref: Reference, text?: string): GUIDString | null

		/**
		 * # Hide
		 * Hide the last created Nanosplash.
		 * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
		 * @public
		 */
		public hide(): GUIDString | null

		/**
		 * # Hide All
		 * Hide all Nanosplashes.
		 * @public
		 */
		public hideAll(): void

		/**
		 * # Hide ID
		 * Hide Nanosplash by its ID.
		 * @param id Nanosplash ID.
		 * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
		 * @public
		 */
		public hideId(id: GUIDString): GUIDString | null

		/**
		 * # Hide Inside
		 * Hide Nanosplash inside the given element if it exists.
		 * @param ref Reference to an element.
		 * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
		 * @public
		 */
		public hideInside(ref: Reference): GUIDString | null
	}
}
