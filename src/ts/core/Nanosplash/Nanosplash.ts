// @ts-strict

import { NanosplashInterface, GUIDString } from 'nanosplash'
import '../../../sass/ns.sass'
import { generateGUID } from '../../util/Guid'
import { createElement, hideElement, showElement } from './DOMUtilities'

/**
 * # Nanosplash
 * Nanosplash is a small splash screen that can be used to indicate that a
 * process is running.
 * @author Isak K. Hauge <isakhauge@icloud.com>
 */
export class Nanosplash implements NanosplashInterface {
	/**
	 * # CSS Class Name
	 * The main CSS class name of the root element of a Nanosplash component.
	 */
	public static readonly CSSClassName = 'ns'

	/**
	 * # Host CSS Class Name
	 * The CSS class name of the host element of a Nanosplash component.
	 * The host element is the element that the Nanosplash is attached to.
	 */
	public static readonly HostCSSClassName = 'ns-host'

	/**
	 * # ID
	 * Each Nanosplash instance is given a unique GUID.
	 */
	private readonly id: GUIDString

	/**
	 * # Element
	 * The root element of the Nanosplash component.
	 */
	private element?: HTMLDivElement

	/**
	 * # Constructor
	 * Creates a new Nanosplash instance.
	 */
	public constructor() {
		this.element = createElement()
		this.element.id = this.id = generateGUID()
	}

	/**
	 * # Get NS Content Element
	 * Returns the content element of the Nanosplash.
	 */
	public getNSContentElement(): HTMLDivElement {
		return <HTMLDivElement>this.getNSElement().firstElementChild
	}

	/**
	 * # Get NS Text Element
	 * Returns the text element of the Nanosplash.
	 */
	public getNSTextElement(): HTMLDivElement {
		return <HTMLDivElement>this.getNSContentElement().firstElementChild
	}

	/**
	 * @inheritDoc
	 */
	public getId(): GUIDString {
		return this.id
	}

	/**
	 * @inheritDoc
	 */
	public getNSElement(): HTMLDivElement {
		return <HTMLDivElement>this.element
	}

	/**
	 * @inheritDoc
	 */
	public hideText(): Nanosplash {
		hideElement(this.getNSTextElement())
		return this
	}

	/**
	 * @inheritDoc
	 */
	public setText(text: string): Nanosplash {
		this.getNSTextElement().innerText = text
		text.length > 0 ? this.showText() : this.hideText()
		return this
	}

	/**
	 * @inheritDoc
	 */
	public showText(): Nanosplash {
		showElement(this.getNSTextElement())
		return this
	}

	/**
	 * @inheritDoc
	 */
	public remove(): void {
		if (!this.element) return
		this.element.parentElement?.removeChild(this.element)
		delete this.element
	}
}
