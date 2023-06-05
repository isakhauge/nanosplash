// @ts-strict

import {
	FindCallback,
	GUIDString,
	NanosplashServiceInterface,
	Reference,
} from 'nanosplash'
import Stack from '../../util/Stack'
import {
	cleanNSParentOf,
	getRecycledNS,
	move,
	elementFrom,
} from './DOMUtilities'
import { Nanosplash } from './Nanosplash'

/**
 * # Nanosplash Service
 * A service class that handles Nanosplash instances.
 * It's a singleton class and it's instance resides in the Window object and
 * serves the public API of the Nanosplash library.
 * @see Nanosplash
 * @author Isak K. Hauge <isakhauge@icloud.com>
 */
export class NanosplashService implements NanosplashServiceInterface {
	/**
	 * # Window Accessor Key
	 * Key to access NanosplashService instance in the Window object.
	 */
	private static readonly WindowAccessorKey = 'ns'

	/**
	 * # Instance
	 * Singleton instance of NanosplashService.
	 */
	private static instance: NanosplashService

	/**
	 * # Nanosplash Stack
	 * For each Nanosplash instance created, it's pushed to the stack.
	 * When a Nanosplash instance is removed, it's removed from the stack.
	 * @see Stack
	 * @see Nanosplash
	 */
	public readonly nsStack: Stack<Nanosplash>

	/**
	 * # Constructor
	 * Private constructor to prevent multiple instances.
	 * @private
	 */
	private constructor() {
		this.nsStack = new Stack<Nanosplash>()
	}

	/**
	 * # Find Index
	 * Find Nanosplash stack index by callback.
	 * @param callback Callback function that returns a boolean.
	 * @returns {number} Index of Nanosplash instance in the stack or -1.
	 */
	private findIndex(callback: FindCallback): number | -1 {
		return this.nsStack.items.findIndex(callback)
	}

	/**
	 * # Find
	 * Find Nanosplash in the stack by callback.
	 * @param callback Callback function that returns a boolean.
	 * @returns {Nanosplash | undefined} Nanosplash instance or undefined
	 */
	private find(callback: FindCallback): Nanosplash | undefined {
		return this.nsStack.items.find(callback)
	}

	/**
	 * # Get Instance
	 * Singleton instance accessor
	 * @returns {NanosplashService} NanosplashService instance
	 */
	public static getInstance(): NanosplashService {
		if (!NanosplashService.instance) {
			NanosplashService.instance = new NanosplashService()
		}
		return NanosplashService.instance
	}

	/**
	 * # Assign To Window
	 * Assign a NanosplashService instance to the Window object.
	 * The NanosplashService instance can be accessed in the window object
	 * using the key window accessor key.
	 * @see WindowAccessorKey
	 */
	private static assignToWindow(): void {
		Object.defineProperty(window, NanosplashService.WindowAccessorKey, {
			value: NanosplashService.getInstance(),
			writable: false,
		})
	}

	/**
	 * # Start
	 * Initialize and attach a NanosplashService instance in the Window object.
	 */
	public static start(): void {
		NanosplashService.assignToWindow()
		window.addEventListener('load', () => {
			const nss = window[NanosplashService.WindowAccessorKey]
			const nssAssigned = nss instanceof NanosplashService
			if (!nssAssigned) {
				NanosplashService.assignToWindow()
			}
		})
	}

	/**
	 * # Create Nanosplash
	 * Return new Nanosplash instance and push it to the stack.
	 * @param text Text to display.
	 * @returns {Nanosplash} Nanosplash instance.
	 */
	private createNS(text?: string): Nanosplash {
		const ns = new Nanosplash()
		ns.setText(text || '')
		this.nsStack.push(ns)
		return ns
	}

	/**
	 * # Clean And Remove
	 * Remove Nanosplash from DOM and clean its parent.
	 * @param ns Nanosplash instance.
	 * @returns {GUIDString} Nanosplash ID.
	 */
	private cleanAndRemove(ns: Nanosplash): GUIDString {
		cleanNSParentOf(ns)
		ns.remove()
		return ns.getId()
	}

	/**
	 * # Stack Delete
	 * Remove Nanosplash instance from the stack.
	 * @param ns Nanosplash instance.
	 * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
	 */
	private stackDelete(ns: Nanosplash): GUIDString | null {
		let index = this.findIndex((o: Nanosplash) => o.getId() === ns.getId())
		if (index < 0) return null
		this.nsStack.items.splice(index, 1)
		return ns.getId()
	}

	/**
	 * # Delete NS
	 * Remove Nanosplash instance from both the stack and the DOM.
	 * @param callback Callback function.
	 * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
	 */
	private deleteNS(callback: FindCallback): GUIDString | null {
		const ns = this.find(callback)
		if (ns) {
			this.cleanAndRemove(ns)
			return this.stackDelete(ns)
		}
		return null
	}

	/**
	 * @inheritDoc
	 */
	public show(text?: string): GUIDString {
		let ns = getRecycledNS(document.body)
		if (!ns) {
			ns = this.createNS()
			move(ns.getNSElement(), document.body)
		}
		ns.setText(text || '')
		return ns.getId()
	}

	/**
	 * @inheritDoc
	 */
	public showInside(ref: Reference, text?: string): GUIDString | null {
		const destinationNode: Element | null = elementFrom(ref)
		if (destinationNode) {
			let ns = getRecycledNS(destinationNode)
			if (!ns) {
				ns = this.createNS()
			}
			ns.setText(text || '')
			move(ns.getNSElement(), <Element>destinationNode)
			return ns.getId()
		}

		return null
	}

	/**
	 * @inheritDoc
	 */
	public hideAll(): void {
		this.nsStack.items.forEach((ns: Nanosplash) => {
			this.cleanAndRemove(ns)
		})
		this.nsStack.clear()
	}

	/**
	 * @inheritDoc
	 */
	public hide(): GUIDString | null {
		const ns = this.nsStack.pop()
		return ns ? this.cleanAndRemove(ns) : null
	}

	/**
	 * @inheritDoc
	 */
	public hideId(id: GUIDString): GUIDString | null {
		return this.deleteNS((ns: Nanosplash) => ns.getId() === id)
	}

	/**
	 * @inheritDoc
	 */
	public hideInside(ref: Reference): GUIDString | null {
		const node = elementFrom(ref)
		const cb = (ns: Nanosplash) => ns.getNSElement().parentElement === node
		return node ? this.deleteNS(cb) : null
	}
}

export default NanosplashService
