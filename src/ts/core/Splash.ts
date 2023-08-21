// @ts-strict

import { GUIDString } from '../types/Types'
import { createElement, showElement, hideElement } from './DOMUtilities'
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
	private readonly id: GUIDString

	/**
	 * # Element
	 * The root element of the Nanosplash component.
	 */
	private element?: HTMLDivElement

	/**
	 * # Generate GUID
	 * @returns {GUIDString} A GUID string.
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
	public getNSContentElement(): HTMLDivElement {
		return <HTMLDivElement>this.getNSElement().firstElementChild
	}

	/**
	 * @inheritdoc
	 */
	public getNSTextElement(): HTMLDivElement {
		return <HTMLDivElement>this.getNSContentElement().firstElementChild
	}

	/**
	 * @inheritdoc
	 */
	public getId(): GUIDString {
		return this.id
	}

	/**
	 * @inheritdoc
	 */
	public getNSElement(): HTMLDivElement {
		return <HTMLDivElement>this.element
	}

	/**
	 * @inheritdoc
	 */
	public setText(text: string): Splash {
		this.getNSTextElement().innerText = text
		text.length > 0 ? this.showText() : this.hideText()
		return this
	}

	/**
	 * @inheritdoc
	 */
	public showText(): Splash {
		showElement(this.getNSTextElement())
		return this
	}

	/**
	 * @inheritdoc
	 */
	public hideText(): Splash {
		hideElement(this.getNSTextElement())
		return this
	}

	/**
	 * @inheritdoc
	 */
	public remove(): Splash {
		if (this.element) {
			this.element.parentElement?.removeChild(this.element)
			delete this.element
		}
		return this
	}
}
