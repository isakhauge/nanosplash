import {
	BlurMode,
	Config,
	Destination,
	DestinationController,
	SplashAnimation,
} from 'nanosplash'
import InvalidDestinationException from './exceptions/InvalidDestinationException'
import { NanoSplashRepository } from './repositories/NanoSplashRepository'
import './style.sass'
import {
	appendFirst,
	display,
	fitParentDimensions,
	fitParentDimensionsOnResize,
	get,
	isElementOrNode,
	isFunction,
	move,
	setAttribute,
	setStyle,
} from './utilities/dom'

/**
 * NanoSplash
 *
 * @author Isak K. Hauge
 */
export class NanoSplash {
	private defaultDestination: Element
	private defaultText: string
	private readonly mainElement: HTMLDivElement
	private readonly splashElement: HTMLImageElement
	private readonly textElement: HTMLDivElement

	public constructor(config?: Config) {
		this.defaultText = NanoSplashRepository.DEFAULT.TEXT
		this.defaultDestination = NanoSplashRepository.DEFAULT.DESTINATION_NODE

		// Build UI elements
		this.mainElement = NanoSplashRepository.makeMainElement()
		this.splashElement = NanoSplashRepository.makeSplashElement()
		this.textElement = NanoSplashRepository.makeTextElement()

		// Assemble UI elements
		this.mainElement.append(this.splashElement, this.textElement)

		// Insert loader into destination element
		appendFirst(this.defaultDestination, this.mainElement)
		display(this.mainElement, false)
		fitParentDimensions(this.mainElement)

		// Set default configuration
		this.setDefaultStyles()

		if (config) {
			this.configure(config)
		}
	}

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
	public install(): void {
		Object.defineProperty(window, 'loading', {
			value: this,
			writable: false,
		})
		fitParentDimensionsOnResize(this.mainElement)
	}

	/**
	 * Configure
	 *
	 * @param {Config} config
	 */
	public configure(config: Config): NanoSplash {
		if (config?.default?.destination) {
			this.defaultDestination = NanoSplash.getDestinationElement(
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
	 * @param {string} text
	 */
	public show(text?: string): DestinationController {
		this.setText(text ?? NanoSplashRepository.DEFAULT.TEXT)
		display(this.mainElement, true)

		const parent = this.mainElement.parentNode
		if (parent && parent !== document.body) {
			fitParentDimensions(this.mainElement)
		}

		return {
			inside: (destination: Destination) => this.moveTo(destination),
		}
	}

	/**
	 * Hide
	 */
	public hide(): void {
		display(this.mainElement, false)
		this.setText(this.defaultText)
		this.moveTo(this.defaultDestination)
	}

	/**
	 * Set Default Styles
	 * @private
	 */
	private setDefaultStyles(): void {
		this.setTextFontFamily(NanoSplashRepository.DEFAULT.TEXT_FONT)
		this.setTextWeight(NanoSplashRepository.DEFAULT.TEXT_WEIGHT)
		this.setTextColor(NanoSplashRepository.DEFAULT.TEXT_COLOR)
		this.setTextSize(NanoSplashRepository.DEFAULT.TEXT_SIZE)
		this.setSplashSource(NanoSplashRepository.DEFAULT.SPLASH_SOURCE)
		this.setSplashWidth(NanoSplashRepository.DEFAULT.SPLASH_WIDTH)
		this.setSplashHeight(NanoSplashRepository.DEFAULT.SPLASH_HEIGHT)
		this.setSplashAnimation(NanoSplashRepository.DEFAULT.SPLASH_ANIMATION)
		this.setBackgroundColor(NanoSplashRepository.DEFAULT.BACKGROUND_COLOR)
		this.setBackgroundBlur(NanoSplashRepository.DEFAULT.BACKGROUND_BLUR)
	}

	/**
	 * Move To
	 *
	 * @param destination
	 * @private
	 */
	private moveTo(destination: Destination): void {
		const destinationNode = NanoSplash.getDestinationElement(destination)
		const parentNode = this.mainElement.parentNode
		if (parentNode) {
			move(this.mainElement).to(destinationNode)
		} else {
			appendFirst(destinationNode, this.mainElement)
		}
		fitParentDimensions(this.mainElement)
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
		setStyle(this.mainElement, 'background-color', color)
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
		if (isString) {
			const destinationObject = get(destination as string)
			if (isElementOrNode(destinationObject)) {
				return destinationObject as Element
			}
			throw new InvalidDestinationException(
				'The DOM selector does not point to an Element'
			)
		} else if (isFunction(destination)) {
			const destinationObject = (destination as Function)()
			if (isElementOrNode(destinationObject)) {
				return destinationObject
			}
			throw new InvalidDestinationException(
				'The destination callback returned an invalid value'
			)
		} else if (isElementOrNode(destination)) {
			return destination as Element
		}
		throw new InvalidDestinationException()
	}
}
