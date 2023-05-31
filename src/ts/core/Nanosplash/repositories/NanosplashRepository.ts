// @ts-strict

import type { Destination, DestinationNode } from '../../../types/Nanosplash'
import Nanosplash from '../Nanosplash'

class NanosplashRepository {
	/**
	 * # Create
	 * Return the main Nanosplash element.
	 */
	public static createElement(): HTMLDivElement {
		return new DOMParser().parseFromString(
			'<div class=ns><div class=ns-content><div class=ns-text></div><div class=ns-spinner><svg viewBox="0 0 50 50"><circle class=path cx=25 cy=25 r=20 fill=none></circle></svg></div></div></div>',
			'text/html'
		).body.firstChild as HTMLDivElement
	}

	/**
	 * # Inject
	 * Insert the `node` into the `destinationNode` as its first child.
	 * @param node Node to inject.
	 * @param destinationNode Node in which the first node is to be injected.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
	 * @see https://developer.mozilla.org/docs/Web/API/NodeList/item
	 */
	public static inject(node: Element, destinationNode: Element): void {
		const destinationNodeHasChildren = destinationNode.childNodes.length > 0
		if (destinationNodeHasChildren) {
			destinationNode.insertBefore(node, destinationNode.childNodes.item(0))
		} else {
			destinationNode.appendChild(node)
		}
	}

	/**
	 * # Set NS Host Class
	 * Add or remove the `nsHostClassName` class to the `element`.
	 * @param element Element to which the `nsHostClassName` class will be added or removed.
	 * @param action Action to perform ('add' or 'remove').
	 */
	public static setNSHostClass(
		element: Element | null,
		action: 'add' | 'remove'
	): void {
		element?.classList[action](Nanosplash.nsHostClassName)
	}

	/**
	 * # Prepare Parent
	 * Add the `nsHostClassName` class to the parent of the `ns` element.
	 * @param ns Nanosplash instance.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/parentElement
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/add
	 */
	public static prepareParentOf(ns: Nanosplash): void {
		NanosplashRepository.setNSHostClass(ns.getNSElement().parentElement, 'add')
	}

	/**
	 * # Clean Parent
	 * Remove the `nsHostClassName` class from the parent of the `ns` element.
	 * @param ns Nanosplash instance.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/parentElement
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/remove
	 */
	public static cleanNSParentOf(ns: Nanosplash): void {
		NanosplashRepository.setNSHostClass(
			ns.getNSElement().parentElement,
			'remove'
		)
	}

	/**
	 * # Show Element
	 * Set the `display` property of the `element` to `flex`.
	 * @param element Element to show.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/display
	 */
	public static showElement(element: HTMLElement): void {
		element.style.display = 'flex'
	}

	/**
	 * # Hide Element
	 * Set the `display` property of the `element` to `none`.
	 * @param element Element to hide.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/display
	 */
	public static hideElement(element: HTMLElement): void {
		element.style.display = 'none'
	}

	/**
	 * # Node From
	 * Convert the `destination` to a HTMLElement, Element, Node or null.
	 * @param destination Destination of the node.
	 * @returns Node from the `destination`.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Node
	 */
	public static nodeFrom(destination: Destination): DestinationNode | null {
		let elem: HTMLElement | null

		if (typeof destination === 'string') {
			elem = document.querySelector(destination)
		} else if (destination instanceof Node) {
			return destination
		} else if (typeof destination === 'function') {
			elem = <HTMLElement>destination()
			if (!(elem instanceof Node)) {
				return null
			}
		} else {
			elem = null
		}

		return elem
	}

	/**
	 * # Element Is NS
	 * Check if the element is Nanosplash element.
	 * This is determined by the presence of the `ns` class on the element.
	 * @param element Element to check.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/contains
	 */
	public static elementIsNS(element: Element): boolean {
		return element?.classList?.contains('ns')
	}

	/**
	 * # Move
	 * Move an Element to another Element.
	 * @param element Element to move
	 * @param destinationElement Target element
	 */
	public static move(element: Element, destinationElement: Element): void {
		// Clean the current NS host element.
		NanosplashRepository.setNSHostClass(element.parentElement, 'remove')
		// Assign new NS host element.
		NanosplashRepository.setNSHostClass(destinationElement, 'add')
		NanosplashRepository.inject(element, destinationElement)
	}
}

export default NanosplashRepository
