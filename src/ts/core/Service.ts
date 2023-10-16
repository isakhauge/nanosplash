import { version } from '../../../package.json'

import { Reference, GUIDString } from '../types/Types'
import {
	getRecycledSplash,
	move,
	elementFrom,
	render,
	removeNSHostClass,
} from './DomUtilities'
import { ServiceInterface } from './ServiceInterface'
import { Splash } from './Splash'
import css from '../../style/ns.sass?inline'
import { SplashQueue } from './SplashQueue'

/**
 * # Service
 * A service class that handles Nanosplash instances.
 * It's a singleton class and its instance resides in the Window object and
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
	 * @private
	 */
	private static instance: Service

	/**
	 * # Version
	 */
	public readonly version: string

	/**
	 * @inheritdoc
	 */
	public readonly nsQueue: SplashQueue

	/**
	 * # Constructor
	 * Private constructor to prevent multiple instances.
	 * @private
	 */
	private constructor() {
		this.version = version
		this.nsQueue = new SplashQueue()
		Service.addStyle()
	}

	/**e
	 * # Add Style
	 * Add Nanosplash CSS to the DOM.
	 */
	private static addStyle(): void {
		const style = render(`<style>${css}</style>`) as HTMLStyleElement
		document.body.append(style)
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
	 * @private
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
	 * @private
	 */
	private createNS(text?: string): Splash {
		const ns = new Splash()
		ns.setText(text || '')
		this.nsQueue.enqueue(ns)
		return ns
	}

	/**
	 * # Clean And Remove From DOM
	 * Remove Nanosplash from DOM and clean its parent.
	 * @param ns Nanosplash instance.
	 * @returns True if Nanosplash was removed from DOM.
	 * @private
	 */
	private cleanAndRemoveFromDOM(ns: Splash | null): boolean {
		if (ns) {
			const parent = ns.getElement()?.parentElement ?? null
			if (parent) {
				removeNSHostClass(parent)
			}
			return ns.delete()
		}
		return false
	}

	/**
	 * # Delete NS
	 * Remove Nanosplash instance from both the stack and the
	 * @param guid Nanosplash ID.
	 * @returns True if Nanosplash was removed from DOM.
	 * @private
	 */
	private deleteNS(guid: GUIDString): boolean {
		const ns = this.nsQueue.delete(guid)
		if (!ns) return false
		return this.cleanAndRemoveFromDOM(ns)
	}

	/**
	 * @inheritdoc
	 */
	public show(text?: string): GUIDString | null {
		return this.showInside(document.body, text)
	}

	/**
	 * @inheritdoc
	 */
	public showInside(ref: Reference, text?: string): GUIDString | null {
		const destinationNode: Element | null = elementFrom(ref)
		if (destinationNode) {
			let ns = getRecycledSplash(destinationNode)
			if (!ns) {
				ns = this.createNS()
			}
			const nsElement = ns.getElement()
			if (nsElement) {
				move(nsElement, destinationNode)
			}
			return ns.setText(String(text)).getId()
		}
		return null
	}

	/**
	 * @inheritdoc
	 */
	public hide(): GUIDString | null {
		const ns = this.nsQueue.dequeue()
		if (!ns) return null
		this.cleanAndRemoveFromDOM(ns)
		return ns.getId()
	}

	/**
	 * @inheritdoc
	 */
	public hideAll(): void {
		let ns = this.nsQueue.dequeue()
		while (ns) {
			this.cleanAndRemoveFromDOM(ns)
			ns = this.nsQueue.dequeue()
		}
	}

	/**
	 * @inheritdoc
	 */
	public hideId(id: GUIDString): GUIDString | null {
		const ns = this.nsQueue.has(id)
		if (!ns) return null
		return this.deleteNS(id) ? id : null
	}

	/**
	 * @inheritdoc
	 */
	public hideInside(ref: Reference): GUIDString | null {
		const node = elementFrom(ref)
		if (!node) return null
		const ns = getRecycledSplash(node)
		if (!ns) return null
		const guid = ns.getId()
		if (!guid) return null
		return this.deleteNS(guid) ? guid : null
	}
}

export default { Service }
