declare module 'nanosplash' {
	/**
	 * NanoSplash
	 *
	 * @author Isak K. Hauge
	 * @version 2.0
	 */
	class NanoSplash {
		/**
		 * Constructor
		 *
		 * @param {Config | undefined} config
		 */
		constructor(config?: Config)

		/**
		 * Configure
		 *
		 * @param {Config} config
		 */
		configure(config: Config): NanoSplash

		/**
		 * Show
		 *
		 * @param {string} text
		 */
		show(text?: string): DestinationController

		/**
		 * Hide
		 */
		hide(): void

		/**
		 * Install
		 *
		 * @description Assigns itself to the Window object.
		 * The instance is reachable through the property "loading".
		 *
		 * @example
		 * // Access the instance globally
		 * loading.show('Some text')
		 */
		public install(): void
	}

	type SplashAnimation = 'none' | 'pulse' | 'spin'

	type DefaultOptions = {
		destination?: Destination
		text?: string
	}

	type TextOptions = {
		family?: string
		weight?: string
		color?: string
		size?: string
	}

	type SplashOptions = {
		src?: string
		width?: string
		height?: string
		animation?: SplashAnimation
	}

	type BlurMode = 'none' | 'light' | 'medium' | 'heavy'

	type BackgroundOptions = {
		color?: string
		blur?: BlurMode
	}

	type Destination = Node | Element | DestinationCallback | string

	type DestinationCallback = () => Element

	type Config = {
		default?: DefaultOptions
		text?: TextOptions
		splash?: SplashOptions
		background?: BackgroundOptions
	}

	type DestinationController = {
		inside: (destination: Destination) => void
	}

	type MakeOptions = {
		id?: string
		className?: string
		attributes?: { key: string; value: string | null }[]
		eventListeners?: {
			event: keyof HTMLElementEventMap
			handler: EventListener
		}[]
		content?: Node | Element | HTMLElement | string
	}
}
