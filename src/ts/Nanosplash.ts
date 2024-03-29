import style from '../style/ns.sass?inline'
import { NanosplashInterface } from './types/NanosplashInterface'
import { ElementReference, NSElement } from './types/Types'
import { version } from '../../package.json'

/**
 * # Use Nanosplash
 * @returns Nanosplash API.
 */
export const useNs = (): NanosplashInterface => {
	const doc = window.document
	const bod = doc.body

	const toArray = <T>(iter: Iterable<T> | ArrayLike<T>) => Array.from(iter)
	const all = (node: ParentNode, ref: string) =>
		toArray(node.querySelectorAll(ref))
	const first = (node: ParentNode, ref: string) => all(node, ref)[0] ?? null

	/**
	 * # Get All Nanosplashes
	 * @returns An array of all Nanosplash elements in the DOM.
	 */
	const getAllNs = (): NSElement[] => all(doc, '.ns') as NSElement[]

	/**
	 * # Parse Ref
	 * @param ref Element reference which could be a selector or an Element.
	 * @returns The Element node or null.
	 */
	const parseRef = (ref: ElementReference): Element | null =>
		ref instanceof Element ? ref : first(doc, ref)

	/**
	 * # Create HTMLDivElement
	 * @param className Optional string containing class names.
	 * @param children Optional list of Nodes or strings.
	 * @returns The newly created HTMLDivElement.
	 */
	const div = (
		className?: string,
		...children: (Node | string)[]
	): HTMLDivElement => {
		const node: HTMLDivElement = doc.createElement('div')
		if (className) node.classList.add(className)
		node.append(...children)
		return node
	}

	/**
	 * # Parse
	 * @param html HTML string.
	 * @returns Parsed node.
	 */
	const parse = (html: string): Node => {
		const node: HTMLDivElement = div()
		node.innerHTML = html
		return node.firstChild as Node
	}

	/**
	 * # Make Nanosplash Element
	 * @returns Nanpslash DOM element.
	 */
	const makeNs = (): NSElement => {
		const circle: string = '<circle class=path cx=25 cy=25 r=20 fill=none />'
		const svg = parse(`<svg viewBox="0 0 50 50">${circle}</svg>`) as Element
		const node = div('ns', div('nst'), div('nss', svg)) as NSElement
		node.nsId = Date.now()
		return node
	}

	/**
	 * # Peek Nanosplash Queue
	 * Collect all Nanosplash elements in the DOM, sort them by their NS ID
	 * in ascending order, and return the first element.
	 * @returns The front of the queue.
	 */
	const peekNsQueue = (): NSElement | null =>
		getAllNs().sort((a: NSElement, b: NSElement) => a.nsId - b.nsId)[0] ?? null

	/**
	 * # Set Nanosplash Text
	 * Replace the text node to trigger the animation which in turn is invoked
	 * by the connected callback in the DOM.
	 * @param ns Nanosplash element.
	 * @param text Text to display adjacent to spinner.
	 */
	const setNsText = (ns: NSElement, text: string): void => {
		const oldNsText = first(ns, '.nst') as Element | null
		if (!text) return oldNsText?.remove()
		const newNsText = div('nst', text)
		if (oldNsText) {
			oldNsText.replaceWith(newNsText)
		} else {
			ns.insertBefore(newNsText, ns.firstChild)
		}
	}

	/**
	 * # Set Nanosplash Parent
	 * Define where inside the DOM to spawn the Nansoplash.
	 * @param ns Nanosplash element.
	 * @param parent NS element's parent to be.
	 */
	const setNsParent = (ns: NSElement, parent: Element): void => {
		const child = parent.firstElementChild
		if (child) {
			parent.insertBefore(ns, child)
		}
		parent.append(ns)
		parent.classList.add('nsh')
	}

	/**
	 * # Show Nanosplash
	 * @param text Text to display adjacent to spinner.
	 * @param inside Selector or element in which the NS element will be spawned.
	 * @returns The ID if the NS element — which is a UTC integer.
	 */
	const show = (text?: string, inside?: string | Element): number | null => {
		const parent: Element = (inside ? parseRef(inside) ?? bod : bod) as Element
		let ns: NSElement
		const recycled: Element | undefined = toArray(parent.children)
			.filter(node => node.classList.contains('ns'))
			.at(0)
		const isNs = recycled?.classList.contains('ns')
		if (isNs) {
			ns = recycled as NSElement
		} else {
			ns = makeNs()
			setNsParent(ns, parent as Element)
		}
		setNsText(ns, text ?? '')
		const top: string = scrollY + 'px'
		bod.style.setProperty('--ns-top', top)
		return ns.nsId
	}

	/**
	 * # Remove Nanosplash
	 * @param ns Nanosplash elememnt.
	 */
	const removeNs = (ns?: Element | null): void => {
		ns?.parentElement?.classList.remove('nsh')
		ns?.remove()
	}

	/**
	 * # Find Nanosplash
	 * @param id The UTC integer returned from the `show` function.
	 * @returns Null or the corresponding Nanosplash element.
	 */
	const findNs = (id: number) => getAllNs().find(v => v.nsId === id) ?? null

	/**
	 * # Hide Nanosplash
	 * Hide agnostically in FIFO order, specifically by ID, or all by the asterisk
	 * which will delete all Nanosplashes.
	 * @param id Optional ID of a Nanosplash element or '*' .
	 */
	const hide = (id?: number | '*'): void => {
		if (id === '*') all(doc, '.ns').forEach(removeNs)
		else removeNs(typeof id === 'number' ? findNs(id) : peekNsQueue())
	}

	// Add CSS to window
	first(doc, '#ns')?.remove()
	bod.append(parse(`<style id="ns">${style}</style>`))

	return {
		show,
		hide,
		version,
	}
}
