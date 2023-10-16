import { GUIDString } from '../types/Types'
import { createElement, showElement, hideElement } from './DomUtilities'
import { SplashInterface } from './SplashInterface'

/**
 * # Splash
 * Small splash screen that can be used to indicate that a process
 * is running.
 * @author Isak K. Hauge <isakhauge@icloud.com>
 */
export class Splash implements SplashInterface {
	/**
	 * # CSS Class Name
	 * The main CSS class name of the root element of a Nanosplash component.
	 */
	public static readonly NSClass = 'ns'

	/**
	 * # Host CSS Class Name
	 * The CSS class name of the host element of a Nanosplash component.
	 * The host element is the element that the Nanosplash is attached to.
	 */
	public static readonly NSHostClass = 'nsh'

	/**
	 * # ID
	 * Each Nanosplash instance is given a unique GUID.
	 */
	private id: GUIDString | null

	/**
	 * # Element
	 * The root element of the Nanosplash component.
	 */
	private element: HTMLDivElement | null

	/**
	 * # Generate GUID
	 * @returns {GUIDString} A GUID string.
	 * @private
	 */
	private static generateGUID(): GUIDString {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
			const r = (Math.random() * 16) | 0
			const v = c === 'x' ? r : (r & 0x3) | 0x8
			return v.toString(16)
		})
	}

	/**
	 * # Constructor
	 * Creates a new Nanosplash instance.
	 */
	public constructor() {
		this.element = createElement()
		this.element.id = this.id = Splash.generateGUID()
	}

	/**
	 * @inheritdoc
	 */
	public getTextElement(): HTMLDivElement {
		return (
			<HTMLDivElement>(
				this.getElement()?.firstElementChild?.firstElementChild
			) ?? null
		)
	}

	/**
	 * @inheritdoc
	 */
	public getId(): GUIDString | null {
		return this.id
	}

	/**
	 * @inheritdoc
	 */
	public getElement(): HTMLDivElement | null {
		return <HTMLDivElement>this.element
	}

	/**
	 * @inheritdoc
	 */
	public setText(text: string): Splash {
		this.getTextElement().innerText = text
		text.length > 0 ? this.showText() : this.hideText()
		return this
	}

	/**
	 * @inheritdoc
	 */
	public showText(): Splash {
		showElement(this.getTextElement())
		return this
	}

	/**
	 * @inheritdoc
	 */
	public hideText(): Splash {
		hideElement(this.getTextElement())
		return this
	}

	/**
	 * @inheritdoc
	 */
	public delete(): boolean {
		this.id = null
		if (this.element !== null) {
			this.element.innerHTML = ''
			this.element.remove()
			this.element = null
		}
		return this.element === null
	}
}
