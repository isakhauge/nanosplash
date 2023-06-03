// @ts-strict

/**
 * # DOM Utilities
 * A collection of functions that are used by the Nanosplash classes.
 * @see Nanosplash
 * @see NanosplashService
 * @author Isak K. Hauge <isakhauge@icloud.com>
 */

import { GUIDString } from '../../types/Alias'
import type { Reference } from '../../types/Nanosplash'
import Nanosplash from './Nanosplash'
import NanosplashService from './NanosplashService'

/**
 * # Create Element
 * Return the main Nanosplash element.
 */
export function createElement(): HTMLDivElement {
	return new DOMParser().parseFromString(
		'<div class=ns><div class=ns-content><div class=ns-text></div><div class=ns-spinner><svg viewBox="0 0 50 50"><circle class=path cx=25 cy=25 r=20 fill=none></circle></svg></div></div></div>',
		'text/html'
	).body.firstChild as HTMLDivElement
}

/**
 * # Inject	as First Child
 * Insert element into the target element as its first child.
 * @param element Element to inject.
 * @param targetElement Element in which the first element is to be injected.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/children
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
 * @see https://developer.mozilla.org/docs/Web/API/NodeList/item
 */
export function injectAsFirstChild(
	element: Element,
	targetElement: Element
): void {
	const targetHasChild = targetElement.children.length > 0
	if (targetHasChild) {
		targetElement.insertBefore(element, targetElement.children.item(0))
	} else {
		targetElement.append(element)
	}
}

/**
 * # Set NS Host Class
 * Add or remove the `nsHostClassName` class to the `element`.
 * @param element Element to which the `nsHostClassName` class will be added or removed.
 * @param action Action to perform ('add' or 'remove').
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/add
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/remove
 */
export function setNSHostClass(
	element: Element | null,
	action: 'add' | 'remove'
): void {
	element?.classList[action](Nanosplash.HostCSSClassName)
}

/**
 * # Prepare Parent Of
 * Add the `nsHostClassName` class to the parent of the `ns` element.
 * @param ns Nanosplash instance.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/parentElement
 */
export function prepareParentOf(ns: Nanosplash): void {
	setNSHostClass(ns.getNSElement().parentElement, 'add')
}

/**
 * # Clean NS Parent Of
 * Remove the `nsHostClassName` class from the parent of the `ns` element.
 * @param ns Nanosplash instance.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/parentElement
 */
export function cleanNSParentOf(ns: Nanosplash): void {
	setNSHostClass(ns.getNSElement().parentElement, 'remove')
}

/**
 * # Show Element
 * Set the `display` property of the `element` to `flex`.
 * @param element Element to show.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/display
 */
export function showElement(element: HTMLElement): void {
	element.style.display = 'flex'
}

/**
 * # Hide Element
 * Set the `display` property of the `element` to `none`.
 * @param element Element to hide.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/display
 */
export function hideElement(element: HTMLElement): void {
	element.style.display = 'none'
}

/**
 * # Element From
 * Convert the element reference to an element.
 * @param ref Reference to an element.
 * @returns { Element | null } Element or null.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Node
 */
export function elementFrom(ref: Reference): Element | null {
	let elem: Element | null

	if (typeof ref === 'string') {
		elem = document.querySelector(ref)
	} else if (ref instanceof Element) {
		return ref
	} else if (typeof ref === 'function') {
		elem = <Element>ref()
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
 * Check if the element is a Nanosplash element.
 * This is determined by the presence of the `ns` class on the element.
 * @param element Element to check.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/contains
 */
export function elementIsNS(element: Element): boolean {
	return element?.classList?.contains('ns')
}

/**
 * # Move
 * Move an Element to another Element.
 * @param element Element to move
 * @param targetElement Target element
 */
export function move(element: Element, targetElement: Element): void {
	// Clean the current NS host element.
	setNSHostClass(element.parentElement, 'remove')
	// Assign new NS host element.
	setNSHostClass(targetElement, 'add')
	injectAsFirstChild(element, targetElement)
}

/**
 * # Get Recycled NS
 * Return the Nanosplash instance inside the target element if it exists.
 * @param targetElement Element wherein the Nanosplash instance is to reside.
 * @returns { Nanosplash | null } Nanosplash instance or null.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/firstElementChild
 */
export function getRecycledNS(targetElement: Element): Nanosplash | null {
	const firstChild = targetElement.firstElementChild
	const hasChild = firstChild !== null
	const targetAlreadyHasNS = hasChild && elementIsNS(firstChild)
	if (targetAlreadyHasNS) {
		const id: GUIDString = firstChild.id
		const nss = NanosplashService.getInstance()
		return nss.nsStack.items.find((ns: Nanosplash) => ns.getId() === id) ?? null
	}

	return null
}
