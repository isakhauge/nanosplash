// @ts-strict
import style from '../style/ns.sass?inline'
import { NanosplashInterface } from './types/NanosplashInterface'
import {
	DOMSelector,
	ElementReference,
	NSElement,
	ScopedSelectors,
} from './types/Types'

const StyleID: string = 'nscss'

/**
 *
 * @param node Node to query.
 * @returns An object containing two, slightly different functions that
 * retrieves elements from the DOM.
 */
const scope = (node: ParentNode): ScopedSelectors => {
	const all = (ref: string) => Array.from(node.querySelectorAll(ref))
	return {
		all,
		first: (ref: string) => all(ref)[0] ?? null,
	}
}

/**
 * # Get all
 * @param selector CSS selector used to match nodes in the DOM.
 * @returns An array of Element nodes.
 */
const getAll = (selector: DOMSelector): Element[] =>
	scope(document).all(selector)

/**
 * # Get
 * @param selector CSS selector used to match nodes in the DOM.
 * @returns Firs Element node from the DOM matching the selector.
 */
const get = (selector: DOMSelector): Element | null =>
	scope(document).first(selector)

/**
 * # Get All NS
 * @returns An array of all Nanosplash elements in the DOM.
 */
const getAllNS = (): NSElement[] => getAll('.ns') as NSElement[]

/**
 * # Parse Ref
 * @param ref Element reference which could be a selector or an Element.
 * @returns The Element node or null.
 */
const parseRef = (ref: ElementReference): Element => {
	if (ref instanceof Element) return ref
	const element = get(ref)
	if (!element) throw new Error(`Selector (${ref}) returned null`)
	return element
}

/**
 * # Div
 * @param className Optional string containing class names.
 * @param children Optional list of Nodes or strings.
 * @returns The newly created HTMLDivElement.
 */
const div = (
	className?: string,
	...children: (Node | string)[]
): HTMLDivElement => {
	const el = document.createElement('div')
	if (className) el.classList.add(className)
	el.append(...children)
	return el
}

/**
 * # Parse
 * @param html HTML string.
 * @returns Parsed node.
 */
const parse = (html: string): Node => {
	const el: HTMLDivElement = div()
	el.innerHTML = html
	return el.firstChild as Node
}

/**
 * # Create NS
 * TODO: Investigate the possibility of inheritence.
 * @returns Nanpslash DOM element.
 */
const createNS = (): NSElement => {
	const circle: string = '<circle class=path cx=25 cy=25 r=20 fill=none />'
	const svg = parse(`<svg viewBox="0 0 50 50">${circle}</svg>`) as Element
	const el = div('ns', div('nsc', div('nst'), div('nss', svg))) as NSElement
	el.nsId = Date.now()
	return el
}

/**
 * # Peek
 * Collect all Nanosplash elements in the DOM, sort them by their NS ID
 * in ascending order, and return the first element.
 * @returns The front of the queue.
 */
const peek = (): NSElement | null =>
	getAllNS().sort((a: NSElement, b: NSElement) => a.nsId - b.nsId)[0] ?? null

/**
 * # Set NS Text
 * Replace the text node to trigger the animation which in turn is invoked
 * by the connected callback in the DOM.
 * @param ns Nanosplash element.
 * @param text Text to display adjacent to spinner.
 */
const setNSText = (ns: NSElement, text: string): void => {
	const nsScope = scope(ns)
	const oldNst = nsScope.first('.nst') as Element | null
	if (!text) return oldNst?.remove()
	const newNst = div('nst', text)
	if (oldNst) {
		oldNst.replaceWith(newNst)
	} else {
		const nsc = nsScope.first('.nsc') as Element
		nsc.insertBefore(newNst, nsc.firstChild)
	}
}

/**
 * # Set NS Parent
 * Define where inside the DOM to spawn the Nansoplash.
 * @param ns Nanosplash element.
 * @param parent NS element's parent to be.
 */
const setNSParent = (ns: NSElement, parent: Element): void => {
	const child = parent.firstElementChild
	if (child) {
		parent.insertBefore(ns, child)
	}
	parent.append(ns)
	parent.classList.add('nsh')
}

/**
 * # Show
 * @param text Text to display adjacent to spinner.
 * @param inside Selector or element in which the NS element will be spawned.
 * @returns The ID if the NS element — which is a UTC integer.
 */
const show = (text?: string, inside?: string | Element): number | null => {
	const parent: Element = inside ? parseRef(inside) : document.body
	let ns: NSElement
	const recycledNs = scope(parent).first('& > .ns')
	if (recycledNs) {
		ns = recycledNs as NSElement
	} else {
		ns = createNS()
		setNSParent(ns, parent as Element)
	}
	setNSText(ns, text ?? '')
	const top: string = window.scrollY + 'px'
	window.document.body.style.setProperty('--ns-top', top)
	return ns.nsId
}

/**
 * # Delete NS
 * @param ns Nanosplash elememnt.
 */
const deleteNS = (ns?: Element | null): void => {
	ns?.parentElement?.classList.remove('nsh')
	ns?.remove()
}

/**
 * # Find NS
 * @param id The UTC integer returned from the `show` function.
 * @returns Null or the corresponding Nanosplash element.
 */
const findNS = (id: number) => getAllNS().find(v => v.nsId === id) ?? null

/**
 * # Hide
 * @param id Optional ID of a Nanosplash element.
 */
const hide = (id?: number): void => {
	const ns: NSElement | null = id ? findNS(id) : peek()
	deleteNS(ns)
}

/**
 * # Hide All
 */
const hideAll = (): void => getAll('.ns').forEach(deleteNS)

/**
 * # Add style
 */
const addStyle = (): void => {
	get('#nscss')?.remove()
	const html: string = `<style id=${StyleID}>${style}</style>`
	document.body.append(parse(html))
}

/**
 * # Use NS
 * @returns Nanosplash API.
 */
export const useNs = (): NanosplashInterface => {
	addStyle()
	return (window.ns = Object.freeze({
		show,
		hide,
		hideAll,
	}))
}
