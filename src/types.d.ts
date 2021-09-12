declare module 'nanosplash' {
	/**
	 * Nanosplash
	 *
	 * @author Isak K. Hauge
	 */
	class Nanosplash {
		/**
		 * Constructor
		 *
		 * @public
		 * @constructor
		 * @param {Config | undefined} config The configuration object.
		 *
		 * @example
		 * ```js
		 * // Instantiatie without config object.
		 * new Nanosplash()
		 * ```
		 *
		 * @example
		 * ```js
		 * // Instantiate with config object.
		 * new Nanosplash(config)
		 * ```
		 */
		constructor(config?: Config)

		/**
		 * Configure
		 *
		 * @param {Config} config The config object.
		 * @return {Nanosplash} The updated instance.
		 *
		 * @description Mutates the existing configuration and returns the updated
		 * instance.
		 *
		 * @example
		 * ```js
		 * nanosplash.configure(config)
		 * ```
		 *
		 * @example
		 * ```js
		 * window.loading.configure(config).show(text)
		 * ```
		 */
		configure(config: Config): Nanosplash

		/**
		 * Show
		 *
		 * @param {string | undefined} text The text that will be shown in the
		 * loading screen. If undefined, Nanosplash will use the default text.
		 * @param {Promise<any> | undefined} task An asynchronous function that
		 * contains any given workload that shall compute while the loading screen is
		 * visible. If undefined, you will have to manually invoke the hide function
		 * in order to hide the loading screen.
		 * @return {DestinationObject} An object with a function that controls the
		 * destination of the loading screen.
		 *
		 * @description Shows the loading screen. Invoking the inside function will
		 * display the loading screen within the constraints of the defined
		 * destination.
		 *
		 * @example
		 * ```js
		 * // Basic usage.
		 * loading.show(text)
		 * ```
		 *
		 * @example
		 * ```js
		 * // Show loading screen within another element using CSS selector.
		 * loading.show(text).inside('#my-element')
		 * ```
		 *
		 * @example
		 * ```js
		 * // Use DOM element reference.
		 * loading.show(text).inside(document.getElementById(id))
		 * ```
		 *
		 * @example
		 * ```js
		 * // Use function that returns a DOM element reference.
		 * loading.show(text).inside(() => getDomReference())
		 * ```
		 *
		 * @example
		 * ```js
		 * // Define an asynchronous task.
		 * const task = async () => getDataFromApi()
		 * // Show loading screen while the task is not yet resolved.
		 * loading.show(text, task).inside(document.body)
		 * ```
		 */
		show(text?: string): DestinationObject

		/**
		 * Hide
		 */
		hide(): void

		/**
		 * Install
		 *
		 * @description Assigns itself to the Window object and sets essential event
		 * listeners that responds to changes in the browser. The instance is
		 * globally accessible through the property "loading".
		 *
		 * @example
		 * ```js
		 * // Access the instance globally
		 * loading.show('Some text')
		 * ```
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

	type TargetNodeController<T> = (target: T, asFirstChild?: boolean) => void

	type TargetNodeObject<T> = {
		[key: string]: TargetNodeController<T>
	}

	type DestinationController = TargetNodeController<Destination>
	type DestinationObject = TargetNodeObject<Destination>

	/**
	 * @internal
	 */
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

	/**
	 * @internal
	 */
	type HTMLElementTag = keyof HTMLElementTagNameMap

	/**
	 * @internal
	 */
	type CSSProperty = keyof CSSStyleDeclaration
}
