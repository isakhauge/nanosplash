import {
	BlurMode,
	Config,
	Destination,
	DisplayController,
	SplashAnimation,
} from 'nanosplash'
import Exception from './Exceptions/Exception'
import IllegalArgumentException from './Exceptions/IllegalArgumentException'
import InvalidDestinationException from './Exceptions/InvalidDestinationException'
import MissingResourceException from './Exceptions/MissingResourceException'
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
	refAll,
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
	private cache = {
		parentPosition: '',
	}

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
		this.defaultText =
			config?.default?.text ?? NanosplashRepository.DEFAULT.TEXT
		this.defaultDestination = Nanosplash.getDestinationElement(
			config?.default?.destination ??
				NanosplashRepository.DEFAULT.DESTINATION_NODE
		)

		// Build UI elements
		this.mainElement = NanosplashRepository.makeMainElement()
		this.splashElement = NanosplashRepository.makeSplashElement()
		this.textElement = NanosplashRepository.makeTextElement()

		// Set default configuration
		this.setDefaultStyles()

		// Assemble UI elements
		const splashSrc = config?.splash?.src
		if (splashSrc) {
			this.setSplashSource(splashSrc)
			move(this.splashElement).to(this.mainElement)
		}
		move(this.textElement).to(this.mainElement)

		// Insert loader into destination element
		move(this.mainElement).to(this.defaultDestination, true)
		display(this.mainElement, false) // Hide by default
		fitToParent(this.mainElement)

		// Apply custom configuration
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
	 * // Install
	 * (new Nanosplash()).install()
	 *
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
		try {
			Nanosplash.checkStyleResources()
		} catch (exception) {
			console.error(exception as Exception)
		}
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
		if (config.splash) {
			if (config.splash?.src) {
				const hasSplashElement = this.mainElement.contains(this.splashElement)
				if (!hasSplashElement) {
					move(this.splashElement).to(this.mainElement, true)
				}
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
	public show(text?: string): DisplayController {
		this.setText(text ?? NanosplashRepository.DEFAULT.TEXT)
		display(this.mainElement, true)

		// Async task handler
		const during = (task: Promise<any>) => {
			return task.finally(() => this.hide())
		}

		// Returns a
		return {
			inside: (destination: Destination) => {
				this.restoreParentPosition()
				const element = Nanosplash.getDestinationElement(destination)
				move(this.mainElement).to(element, true)
				fitToParent(this.mainElement)
				this.setParentPositionToRelative()
				return { during }
			},
			during,
		}
	}

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
	public hide(): void {
		this.restoreParentPosition()
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
		this.setSplashWidth(NanosplashRepository.DEFAULT.SPLASH_WIDTH)
		this.setSplashHeight(NanosplashRepository.DEFAULT.SPLASH_HEIGHT)
		this.setSplashAnimation(NanosplashRepository.DEFAULT.SPLASH_ANIMATION)
		this.setBackgroundColor(NanosplashRepository.DEFAULT.BACKGROUND_COLOR)
		this.setBackgroundBlur(NanosplashRepository.DEFAULT.BACKGROUND_BLUR)
	}

	private doIfParentExist(callback: (parent: HTMLElement) => any): void {
		;(parent => {
			if (parent) {
				callback(parent)
			}
		})(this.mainElement.parentElement as HTMLElement)
	}

	private setParentPosition(position: string): void {
		this.doIfParentExist(parent => {
			setStyle(parent, 'position', position)
		})
	}

	private cacheParentPosition(): void {
		this.doIfParentExist(parent => {
			this.cache.parentPosition = parent.style.position
		})
	}

	private restoreParentPosition(): void {
		this.setParentPosition(this.cache.parentPosition)
	}

	private setParentPositionToRelative(): void {
		this.cacheParentPosition()
		this.setParentPosition('relative')
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
	 * @throws {MissingResourceException}
	 * @description Throws an exception if the CSS is missing from the browser.
	 */
	private static checkStyleResources(): void {
		window.addEventListener('load', async function () {
			const hrefElements = refAll('link[href*="nanosplash"]')
			const nanosplashFilter = (v: HTMLElement) =>
				/\.nanosplash/.test(v.innerText)
			const styleElements = refAll('style').filter(nanosplashFilter)
			const hasRequiredCss = hrefElements.length > 0 || styleElements.length > 0
			if (!hasRequiredCss) {
				throw new MissingResourceException('Missing the Nanosplash CSS')
			}
		})
	}

	/**
	 * @throws InvalidDestinationException
	 * @throws IllegalArgumentException
	 * @private
	 */
	private static getDestinationElement(destination: Destination): HTMLElement {
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
			throw new IllegalArgumentException()
		}

		if (!destinationNode) {
			throw new InvalidDestinationException('Destination element is falsy')
		}

		return destinationNode as HTMLElement
	}
}
