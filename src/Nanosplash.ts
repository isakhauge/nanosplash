import {
	BlurMode,
	Config,
	Destination,
	DestinationObject,
	SplashAnimation,
} from 'nanosplash'
import InvalidDestinationException from './exceptions/InvalidDestinationException'
import { NanosplashRepository } from './repositories/NanosplashRepository'
import './style.sass'
import {
	display,
	fitToParent,
	invokeOn,
	isElementOrNode,
	isFunction,
	move,
	ref,
	setAttribute,
	setStyle,
} from './utilities/dom'

/**
 * Nanosplash
 *
 * @author Isak K. Hauge
 */
export class Nanosplash {
	private defaultDestination: Element
	private defaultText: string
	private readonly mainElement: HTMLDivElement
	private readonly splashElement: HTMLImageElement
	private readonly textElement: HTMLDivElement

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
	public constructor(config?: Config) {
		this.defaultText = NanosplashRepository.DEFAULT.TEXT
		this.defaultDestination = NanosplashRepository.DEFAULT.DESTINATION_NODE

		// Build UI elements
		this.mainElement = NanosplashRepository.makeMainElement()
		this.splashElement = NanosplashRepository.makeSplashElement()
		this.textElement = NanosplashRepository.makeTextElement()

		// Assemble UI elements
		move(this.splashElement).to(this.mainElement)
		move(this.textElement).to(this.mainElement)

		// Insert loader into destination element
		move(this.mainElement).to(this.defaultDestination, true)
		display(this.mainElement, false) // Hide by default
		fitToParent(this.mainElement)

		// Set default configuration
		this.setDefaultStyles()

		if (config) {
			this.configure(config)
		}
	}

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
	public install(): void {
		Object.defineProperty(window, 'loading', {
			value: this,
			writable: false,
		})
		invokeOn(window, () => fitToParent(this.mainElement), ['resize', 'scroll'])
	}

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
	public configure(config: Config): Nanosplash {
		if (config?.default?.destination) {
			this.defaultDestination = Nanosplash.getDestinationElement(
				config.default.destination
			)
		}

		this.defaultText ||= config.default?.text as string

		// Text:
		if (config.text?.family) {
			this.setTextFontFamily(config.text.family)
		}
		if (config.text?.weight) {
			this.setTextWeight(config.text.weight)
		}
		if (config.text?.color) {
			this.setTextColor(config.text.color)
		}
		if (config.text?.size) {
			this.setTextSize(config.text.size)
		}

		// Background:
		if (config.background?.color) {
			this.setBackgroundColor(config.background.color)
		}
		if (config.background?.blur) {
			this.setBackgroundBlur(config.background.blur)
		}

		// Splash:
		// TODO: Fix logical error here.
		if (config.splash) {
			if (config.splash?.src) {
				this.setSplashSource(config.splash.src)
			}
			if (config.splash?.width) {
				this.setSplashWidth(config.splash.width)
			}
			if (config.splash?.height) {
				this.setSplashHeight(config.splash.height)
			}
			if (config.splash?.animation) {
				this.setSplashAnimation(config.splash.animation)
			}
		} else {
			display(this.splashElement, false)
		}

		return this
	}

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
	public show(text?: string, task?: Promise<any>): DestinationObject {
		this.setText(text ?? NanosplashRepository.DEFAULT.TEXT)
		display(this.mainElement, true)

		const parent = this.mainElement.parentNode
		if (parent && parent !== document.body) {
			fitToParent(this.mainElement)
		}

		if (task?.then) {
			task.then(this.hide)
		}

		return {
			/**
			 * @param {Destination} destination The destination argument can be any
			 * of the following:
			 * * A CSS selector.
			 * * Any DOM element e.g. Node or Element.
			 * * A synchronous function that returns any DOM element.
			 */
			inside: (destination: Destination) => {
				const element = Nanosplash.getDestinationElement(destination)
				move(this.mainElement).to(element, true)
				fitToParent(this.mainElement)
			},
		}
	}

	/**
	 * Hide
	 */
	public hide(): void {
		display(this.mainElement, false)
		this.setText(this.defaultText)
		move(this.mainElement).to(this.defaultDestination, true)
		fitToParent(this.mainElement)
	}

	/**
	 * Set Default Styles
	 * @private
	 */
	private setDefaultStyles(): void {
		this.setTextFontFamily(NanosplashRepository.DEFAULT.TEXT_FONT)
		this.setTextWeight(NanosplashRepository.DEFAULT.TEXT_WEIGHT)
		this.setTextColor(NanosplashRepository.DEFAULT.TEXT_COLOR)
		this.setTextSize(NanosplashRepository.DEFAULT.TEXT_SIZE)
		this.setSplashSource(NanosplashRepository.DEFAULT.SPLASH_SOURCE)
		this.setSplashWidth(NanosplashRepository.DEFAULT.SPLASH_WIDTH)
		this.setSplashHeight(NanosplashRepository.DEFAULT.SPLASH_HEIGHT)
		this.setSplashAnimation(NanosplashRepository.DEFAULT.SPLASH_ANIMATION)
		this.setBackgroundColor(NanosplashRepository.DEFAULT.BACKGROUND_COLOR)
		this.setBackgroundBlur(NanosplashRepository.DEFAULT.BACKGROUND_BLUR)
	}

	/**
	 * Set Text
	 *
	 * @param {string} text
	 * @private
	 */
	private setText(text: string) {
		this.textElement.innerText = text
	}

	/**
	 * Set Text Font Family
	 *
	 * @param {string} fontFamily
	 * @private
	 */
	private setTextFontFamily(fontFamily: string): void {
		setStyle(this.textElement, 'fontFamily', fontFamily)
	}

	/**
	 * Set Text Font Weight
	 *
	 * @param {string} fontWeight
	 * @private
	 */
	private setTextWeight(fontWeight: string): void {
		setStyle(this.textElement, 'fontWeight', fontWeight)
	}

	/**
	 * Set Text Color
	 *
	 * @param {string} color
	 * @private
	 */
	private setTextColor(color: string): void {
		setStyle(this.textElement, 'color', color)
	}

	/**
	 * Set Text Size
	 *
	 * @param {string} fontSize
	 * @private
	 */
	private setTextSize(fontSize: string): void {
		setStyle(this.textElement, 'fontSize', fontSize)
	}

	/**
	 * Set Splash Source
	 *
	 * @param {string} src
	 * @private
	 */
	private setSplashSource(src: string): void {
		this.splashElement.src = src
		display(this.splashElement, true)
	}

	/**
	 * Set Splash Width
	 *
	 * @param {string} width
	 * @private
	 */
	private setSplashWidth(width: string): void {
		setStyle(this.splashElement, 'width', width)
	}

	/**
	 * Set Splash Height
	 *
	 * @param {string} height
	 * @private
	 */
	private setSplashHeight(height: string): void {
		setStyle(this.splashElement, 'height', height)
	}

	/**
	 * Set Splash Animation
	 *
	 * @param {SplashAnimation} animation
	 * @private
	 */
	private setSplashAnimation(animation: SplashAnimation): void {
		setAttribute(this.mainElement, 'data-splash-animation', animation)
	}

	/**
	 * Set Background Color
	 *
	 * @param color
	 * @private
	 */
	private setBackgroundColor(color: string): void {
		setStyle(this.mainElement, 'backgroundColor', color)
	}

	/**
	 * Set Background Blur
	 *
	 * @param {BlurMode} blurMode
	 * @private
	 */
	private setBackgroundBlur(blurMode: BlurMode): void {
		setAttribute(this.mainElement, 'data-blur', blurMode)
	}

	/**
	 * @throws InvalidDestinationException
	 * @private
	 */
	private static getDestinationElement(destination: Destination): Element {
		const isString = typeof destination === 'string'
		const isCallback = isFunction(destination)
		const isElement = isElementOrNode(destination)

		let destinationNode: HTMLElement | null

		if (isString) {
			destinationNode = ref(destination as string) as HTMLElement
		} else if (isCallback) {
			destinationNode = (destination as Function)() as HTMLElement
		} else if (isElement) {
			destinationNode = destination as HTMLElement
		} else {
			throw new InvalidDestinationException()
		}

		return destinationNode as Element
	}
}
