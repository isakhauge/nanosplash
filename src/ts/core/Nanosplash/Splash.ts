// @ts-strict

import { GUIDString } from '../../../types/vite-env'
import { generateGUID } from '../../util/Guid'
import { createElement, showElement, hideElement } from './DOMUtilities'

/**
 * # Splash
 * Small splash screen that can be used to indicate that a process
 * is running.
 * @author Isak K. Hauge <isakhauge@icloud.com>
 */
export class Splash {
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
	 * # Get ID
	 * Return Nanosplash instance GUID.
	 */
	public getId(): GUIDString {
		return this.id
	}

	/**
	 * # Get NS Element
	 * Return Nanosplash instance HTMLDivElement.
	 */
	public getNSElement(): HTMLDivElement {
		return <HTMLDivElement>this.element
	}

	/**
	 * # Set Text
	 * @param text The text that will be visible inside the splash.
	 */
	public setText(text: string): Splash {
		this.getNSTextElement().innerText = text
		text.length > 0 ? this.showText() : this.hideText()
		return this
	}

	/**
	 * # Show Text
	 * Display text element.
	 */
	public showText(): Splash {
		showElement(this.getNSTextElement())
		return this
	}

	/**
	 * # Hide Text
	 * Hide the text element.
	 */
	public hideText(): Splash {
		hideElement(this.getNSTextElement())
		return this
	}

	/**
	 * # Remove
	 * Delete all
	 */
	public remove(): Splash {
		if (this.element) {
			this.element.parentElement?.removeChild(this.element)
			delete this.element
		}
		return this
	}
}
