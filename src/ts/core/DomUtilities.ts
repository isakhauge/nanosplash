import { Reference } from '../types/Types'
import { Service } from './Service'
import { Splash } from './Splash'

/**
 * # Render
 * @param html HTML string to render.
 * @returns Rendered HTML element.
 */
export function render(html: string): HTMLElement {
	return (div =>
		// @ts-ignore
		(() => div.firstChild as HTMLElement)((div.innerHTML = html)))(
		document.createElement('div')
	)
}

/**
 * # DOM Utilities
 * A collection of functions that are used by the Nanosplash classes.
 * @see Splash
 * @see Service
 * @author Isak K. Hauge <isakhauge@icloud.com>
 */

/**
 * # Create Element
 * Return the main Nanosplash element.
 */
export function createElement(): HTMLDivElement {
	return render(
		'<div class=ns><div class=nsc><div class=nst></div><div class=nss><svg viewBox="0 0 50 50"><circle class=path cx=25 cy=25 r=20 fill=none></circle></svg></div></div></div>'
	) as HTMLDivElement
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
 * # Add NS Host Class
 * Add the `nsHostClassName` class to the `element`.
 * @param element Element to which the `nsHostClassName` class will be added.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/add
 */
export function addNSHostClass(element: Element | null): void {
	element?.classList.add(Splash.NSHostClass)
}

/**
 * # Remove NS Host Class
 * Remove the `nsHostClassName` class from the `element`.
 * @param element Element from which the `nsHostClassName` class will be removed.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/remove
 */
export function removeNSHostClass(element: Element | null): void {
	element?.classList.remove(Splash.NSHostClass)
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
	switch (typeof ref) {
		case 'object':
			const isBody = ref === document.body
			const isElement = ref instanceof Element
			if (isBody || isElement) {
				return ref
			}
			throw new Error(
				'Reference is an object but not an Element instance.'
			)
		case 'string':
			return document.querySelector(ref)
		default:
			throw new Error('Reference is not an object or a string.')
	}
}

/**
 * # Move
 * Move an Element to another Element.
 * @param element Element to move
 * @param targetElement Target element
 */
export function move(element: Element, targetElement: Element): void {
	// Clean the current NS host element.
	removeNSHostClass(element.parentElement)
	// Assign new NS host element.
	addNSHostClass(targetElement)
	injectAsFirstChild(element, targetElement)
}

/**
 * # Get Recycled NS
 * Return the Nanosplash instance inside the target element if it exists.
 * @param targetElement Element wherein the Nanosplash instance is to reside.
 * @returns { Nanosplash | null } Nanosplash instance or null.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/firstElementChild
 */
export function getRecycledSplash(targetElement: Element): Splash | null {
	const children = Array.from(targetElement.children || [])
	const nss = Service.getInstance()
	let splash: Splash | null = null
	const n = children.length
	for (let i = 0; i < n; i++) {
		const child = children[i]
		if (child.classList.contains(Splash.NSClass)) {
			splash = nss.nsQueue.get(child.id) ?? null
			break
		}
	}
	return splash
}
