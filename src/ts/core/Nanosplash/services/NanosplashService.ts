// @ts-strict

import Nanosplash from '../Nanosplash'
import Stack from '../../../util/Stack'
import NanosplashRepository from '../repositories/NanosplashRepository'
import type { Destination, DestinationNode } from '../../../types/Nanosplash'
import type { GUIDString } from '../../../types/Alias'

class NanosplashService {
	private static readonly WindowAccessorKey = 'ns2'
	private static instance: NanosplashService

	public readonly nsStack: Stack<Nanosplash>

	private constructor() {
		this.nsStack = new Stack<Nanosplash>()
	}

	/**
	 * # Get Instance
	 * Singleton instance accessor
	 */
	public static getInstance(): NanosplashService {
		if (!NanosplashService.instance) {
			NanosplashService.instance = new NanosplashService()
		}
		return NanosplashService.instance
	}

	/**
	 * # Assign To Window
	 * Assign Nanosplash service instance to Window object.
	 * @private
	 */
	private static assignToWindow(): void {
		Object.defineProperty(window, NanosplashService.WindowAccessorKey, {
			value: NanosplashService.getInstance(),
			writable: false,
		})
	}

	/**
	 * # Start
	 * Initialize Nanosplash Service instance in Window when it's loaded.
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
	 * # Create Nanosplash Instance
	 * Return new Nanosplash instance.
	 * @param text Text to display
	 * @private
	 */
	private static createNSInstance(text?: string): Nanosplash {
		const ns = new Nanosplash()
		const nss = NanosplashService.getInstance()
		ns.setText(text || '')
		nss.nsStack.push(ns)
		return ns
	}

	/**
	 * # Get Nanosplash Instance
	 * Reuse existing instance inside target element if it exists.
	 * @param destinationNode Target element
	 */
	public static getNSInstance(destinationNode: DestinationNode): Nanosplash {
		const firstChild: Element | null = <Element>destinationNode.firstChild
		const hasChild: boolean = firstChild !== null
		const destinationAlreadyHasNS: boolean =
			hasChild && NanosplashRepository.elementIsNS(firstChild)

		if (destinationAlreadyHasNS) {
			firstChild.remove() // Remove from DOM
			const id: GUIDString = firstChild.id
			return <Nanosplash>NanosplashService.fromStackId(id)
		}

		return NanosplashService.createNSInstance()
	}

	/**
	 * # From Stack ID
	 * Return Nanosplash instance from the stack by its ID.
	 * @param id Nanosplash ID
	 */
	public static fromStackId(id: GUIDString): Nanosplash | undefined {
		const nss = NanosplashService.getInstance()
		return nss.nsStack.items.find((ns: Nanosplash) => ns.getId() === id)
	}

	/**
	 * # Show
	 * Present a Nanosplash in the browser window displaying the given text.
	 * @param text Text to display
	 * @returns {GUIDString} GUID of Nanosplash instance
	 */
	public show(text?: string): GUIDString {
		const ns = NanosplashService.getNSInstance(document.body)
		ns.setText(text || '')
		NanosplashRepository.move(ns.getNSElement(), document.body)
		return ns.getId()
	}

	/**
	 * # Show Inside
	 * Present a Nanosplash over the given element displaying the given text.
	 * @param destination Target element
	 * @param text Text to display
	 * @returns {GUIDString} GUID of Nanosplash instance
	 */
	public showInside(
		destination: Destination,
		text?: string
	): GUIDString | null {
		const destinationNode: DestinationNode | null =
			NanosplashRepository.nodeFrom(destination)
		if (destinationNode) {
			const ns: Nanosplash = NanosplashService.getNSInstance(destinationNode)
			ns.setText(text || '')
			NanosplashRepository.move(ns.getNSElement(), <Element>destinationNode)
			return ns.getId()
		}

		return null
	}

	/**
	 * # Clean And Remove
	 * Remove Nanosplash from DOM and clean its parent.
	 * @param ns Nanosplash instance
	 */
	private static cleanAndRemove(ns: Nanosplash): void {
		NanosplashRepository.cleanNSParentOf(ns)
		ns.remove()
	}

	/**
	 * # Hide
	 * Remove the last Nanosplash instance from the stack.
	 * @returns {GUIDString} GUID of Nanosplash instance
	 */
	public hide(): GUIDString | null {
		let id: GUIDString | null = null
		const nss = NanosplashService.getInstance()
		let ns = nss.nsStack.pop()
		if (ns) {
			id = ns.getId()
			NanosplashService.cleanAndRemove(ns)
			ns = undefined
		}
		return id
	}

	/**
	 * # Stack At
	 * Return Nanosplash instance from the stack by its index.
	 * @param index Index of Nanosplash instance
	 * @returns Nanosplash instance or undefined
	 */
	private static stackAt(index: number): Nanosplash | undefined {
		const nss = NanosplashService.getInstance()
		return nss.nsStack.items.at(index)
	}

	/**
	 * # Stack Delete At
	 * Remove Nanosplash instance from the stack by its index.
	 * @param index	Index of Nanosplash instance in the stack
	 */
	private stackDeleteAt(index: number): GUIDString | null {
		const ns = NanosplashService.stackAt(index)
		if (!ns) return null
		const nss = NanosplashService.getInstance()
		nss.nsStack.items.splice(index, 1)
		const id: GUIDString = ns.getId()
		ns.remove()
		return id
	}

	/**
	 * # Hide ID
	 * Hide Nanosplash by its ID.
	 * @param id Nanosplash ID
	 */
	public hideId(id: GUIDString): void {
		const nss = NanosplashService.getInstance()
		const index = nss.nsStack.items.findIndex(
			(ns: Nanosplash) => '' + ns.getId() === id
		)
		if (index > -1) {
			const ns = NanosplashService.stackAt(index)
			if (ns) {
				NanosplashService.cleanAndRemove(ns)
			}
			this.stackDeleteAt(index)
		}
	}

	/**
	 * # Hide Inside
	 * Hide Nanosplash inside the given element if it exists.
	 * @param destination Target element
	 */
	public hideInside(destination: Destination): GUIDString | null {
		let id: GUIDString | null = null
		const node = NanosplashRepository.nodeFrom(destination)
		if (!node) {
			return id
		}
		const nss = NanosplashService.getInstance()
		const index = nss.nsStack.items.findIndex(
			(ns: Nanosplash) => ns.getNSElement().parentElement === node
		)
		if (index > -1) {
			const ns = NanosplashService.stackAt(index)
			if (ns) {
				id = ns.getId()
				NanosplashService.cleanAndRemove(ns)
			}
			this.stackDeleteAt(index)
		}
		return id
	}
}

export default NanosplashService
