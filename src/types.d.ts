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
		 * @return {DisplayController} An object with a function that controls the
		 * visibility and destination of the loading screen.
		 *
		 * @description Shows the loading screen. Invoking the inside function will
		 * display the loading screen within the constraints of the defined
		 * destination.
		 *
		 * Basic usage.
		 * @example
		 * ```js
		 * // Basic usage.
		 * loading.show(text)
		 * ```
		 *
		 * Display Nanosplash inside other DOM elements.
		 * @example
		 * ```js
		 * // Show loading screen within another element using CSS selector.
		 * loading.show(text).inside('#my-element')
		 * // Use DOM element reference.
		 * loading.show(text).inside(document.getElementById(id))
		 * // Use function that returns a DOM element reference.
		 * loading.show(text).inside(() => getDomReference())
		 * ```
		 *
		 * Display Nanosplash while an asynchronous task is resolving.
		 * @example
		 * ```js
		 * // Define an asynchronous task.
		 * const task = async () => await getDataFromApi()
		 * // Show loading screen while the task is running.
		 * loading.show(text).during(task)
		 * loading.show(text).inside('#my-element').during(task)
		 * ```
		 */
		show(text?: string): DisplayController

		/**
		 * Hide
		 *
		 * @description Hides the loading screen and moves to its default destination.
		 * If no custom default destination is defined, it will move to the document
		 * body.
		 *
		 * @example
		 * ```js
		 * // Basic usage
		 * loading.hide()
		 * // Use with async functions
		 * loading.show('Loading ...')
		 * await fetchStuffFromApi()
		 * loading.hide()
		 * ```
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
	type TaskController<T> = (task: Promise<T>) => Promise<void>

	type DisplayController = {
		during: (task: Promise<any>) => Promise<void>
		inside: (destination: Destination) => {
			during: (task: Promise<any>) => Promise<void>
		}
	}

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
