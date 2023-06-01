// @ts-strict

import '../../../sass/ns.sass'

import {
	createElement,
	hideElement,
	showElement,
} from './repositories/NanosplashRepository'
import type { NanosplashInterface } from './interfaces/NanosplashInterface'
import type { GUIDString } from '../../types/Alias'
import { guid } from '../../util/Guid'

/**
 * # Nanosplash
 * Nanosplash is a small splash screen that can be used to indicate that a
 * process is running.
 * @author Isak K. Hauge <isakhauge@icloud.com>
 */
class Nanosplash implements NanosplashInterface {
	public static readonly nsClassName = 'ns'
	public static readonly nsHostClassName = Nanosplash.nsClassName + '-host'

	private readonly id: GUIDString
	private element?: HTMLDivElement

	public constructor() {
		this.element = createElement()
		this.element.id = this.id = guid()
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

export default Nanosplash
