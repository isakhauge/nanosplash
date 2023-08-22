// @ts-strict

import '../../sass/ns.sass'

import { NSFinder, GUIDString, Reference } from '../types/Types'
import { cleanNSParentOf, getRecycledNS, move, elementFrom } from './Dom'
import { ServiceInterface } from './ServiceInterface'
import { Splash } from './Splash'

/**
 * # Service
 * A service class that handles Nanosplash instances.
 * It's a singleton class and it's instance resides in the Window object and
 * serves the public API of the Nanosplash library.
 * @see Splash
 * @author Isak K. Hauge <isakhauge@icloud.com>
 */
export class Service implements ServiceInterface {
	/**
	 * # Window Accessor Key
	 * Key to access NanosplashService instance in the Window object.
	 */
	public static readonly WindowAccessorKey = 'ns'

	/**
	 * # Instance
	 * Singleton instance of NanosplashService.
	 */
	private static instance: Service

	/**
	 * @inheritdoc
	 */
	public nsStack: Splash[]

	/**
	 * # Constructor
	 * Private constructor to prevent multiple instances.
	 * @private
	 */
	private constructor() {
		this.nsStack = []
	}

	/**
	 * # Find Index
	 * Find Nanosplash stack index by callback.
	 * @param callback Callback function that returns a boolean.
	 * @returns {number} Index of Nanosplash instance in the stack or -1.
	 */
	private findIndex(callback: NSFinder): number | -1 {
		return this.nsStack.findIndex(callback)
	}

	/**
	 * # Find
	 * Find Nanosplash in the stack by callback.
	 * @param callback Callback function that returns a boolean.
	 * @returns {Splash | undefined} Nanosplash instance or undefined
	 */
	private find(callback: NSFinder): Splash | undefined {
		return this.nsStack.find(callback)
	}

	/**
	 * # Get Instance
	 * Singleton instance accessor
	 * @returns {Service} NanosplashService instance
	 */
	public static getInstance(): Service {
		if (!Service.instance) {
			Service.instance = new Service()
		}
		return Service.instance
	}

	/**
	 * # Assign To Window
	 * Assign a NanosplashService instance to the Window object.
	 * The NanosplashService instance can be accessed in the window object
	 * using the key window accessor key.
	 * @see WindowAccessorKey
	 */
	private static assignToWindow(): void {
		Object.defineProperty(window, Service.WindowAccessorKey, {
			value: Service.getInstance(),
			writable: false,
		})
	}

	/**
	 * # Start
	 * Initialize and attach a Nanosplash Service instance to the Window object.
	 */
	public static start(): void {
		Service.assignToWindow()
		window.addEventListener('load', () => {
			const nss = window[Service.WindowAccessorKey]
			const nssAssigned = nss instanceof Service
			if (!nssAssigned) {
				Service.assignToWindow()
			}
		})
	}

	/**
	 * # Create Nanosplash
	 * Return new Nanosplash instance and push it to the stack.
	 * @param text Text to display.
	 * @returns {Splash} Nanosplash instance.
	 */
	private createNS(text?: string): Splash {
		const ns = new Splash()
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
	private cleanAndRemove(ns: Splash): GUIDString {
		cleanNSParentOf(ns)
		return ns.remove().getId()
	}

	/**
	 * # Stack Delete
	 * Remove Nanosplash instance from the stack.
	 * @param ns Nanosplash instance.
	 * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
	 */
	private stackDelete(ns: Splash): GUIDString | null {
		let index = this.findIndex((o: Splash) => o.getId() === ns.getId())
		if (index < 0) return null
		this.nsStack.splice(index, 1)
		return ns.getId()
	}

	/**
	 * # Delete NS
	 * Remove Nanosplash instance from both the stack and the
	 * @param callback Callback function.
	 * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
	 */
	private deleteNS(callback: NSFinder): GUIDString | null {
		const ns = this.find(callback)
		if (ns) {
			this.cleanAndRemove(ns)
			return this.stackDelete(ns)
		}
		return null
	}

	/**
	 * @inheritdoc
	 */
	public show(text?: string): GUIDString {
		let ns = getRecycledNS(document.body)
		if (!ns) {
			ns = this.createNS()
			move(ns.getNSElement(), document.body)
		}
		return ns.setText(text || '').getId()
	}

	/**
	 * @inheritdoc
	 */
	public showInside(ref: Reference, text?: string): GUIDString | null {
		const destinationNode: Element | null = elementFrom(ref)
		if (destinationNode) {
			let ns = getRecycledNS(destinationNode)
			if (!ns) {
				ns = this.createNS()
			}
			move(ns.getNSElement(), <Element>destinationNode)
			return ns.setText(text || '').getId()
		}

		return null
	}

	/**
	 * @inheritdoc
	 */
	public hide(): GUIDString | null {
		const ns = this.nsStack.pop()
		return ns ? this.cleanAndRemove(ns) : null
	}

	/**
	 * @inheritdoc
	 */
	public hideAll(): void {
		this.nsStack.forEach(this.cleanAndRemove)
		this.nsStack = []
	}

	/**
	 * @inheritdoc
	 */
	public hideId(id: GUIDString): GUIDString | null {
		return this.deleteNS((ns: Splash) => ns.getId() === id)
	}

	/**
	 * @inheritdoc
	 */
	public hideInside(ref: Reference): GUIDString | null {
		const node = elementFrom(ref)
		const cb = (ns: Splash) => ns.getNSElement().parentElement === node
		return node ? this.deleteNS(cb) : null
	}
}
