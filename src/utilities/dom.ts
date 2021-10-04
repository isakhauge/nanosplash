import {
	CSSProperty,
	HTMLElementTag,
	MakeOptions,
	TargetNodeObject,
} from 'nanosplash'

/**
 * Ref (reference)
 *
 * @param {string} cssSelector
 * @return {Element | null}
 *
 * @description Returns the instance reference of whatever element in the DOM
 * that matches the CSS selector string.
 */
export const ref = (cssSelector: string): Element | null =>
	document.querySelector(cssSelector)

/**
 * Create
 *
 * @param {HTMLElementTag} tag Valid HTML element tag name
 * @param {MakeOptions} options Make options
 * @returns {HTMLElement}
 *
 * @description Creates any HTML element that corresponds with the given tag.
 * Additionally, if options are defined, it can mutate the element by adding
 * class names, attributes, and content.
 */
export const create = (
	tag: HTMLElementTag,
	options?: MakeOptions
): HTMLElement => {
	const element = document.createElement(tag)
	if (options) {
		// Element ID
		element.id ||= options.id + ''

		// Element class names
		element.className ||= options.className + ''

		// Element attributes
		options.attributes
			?.filter(v => v.value)
			.forEach(({ key, value }) => setAttribute(element, key, value as string))

		// Element content
		if (options.content) {
			if (typeof options.content === 'string') {
				element.innerText = options.content
			} else {
				element.append(options.content)
			}
		}
	}
	return element
}

/**
 * Display
 *
 * @param {HTMLElement} node The HTML element.
 * @param {boolean} show A boolean value that decides the node's visibility.
 */
export const display = (node: HTMLElement, show: boolean): void => {
	node.hidden = !show
	if (show) {
		removeAttribute(node, 'hidden')
	} else {
		setAttribute(node, 'hidden', 'true')
	}
}

/**
 * Move
 *
 * @param {Node} node The node to append to another, as its child.
 * @returns An object with a target node controller function. Said function
 * will append the given node to a yet to be defined target node.
 *
 * @description This function will in turn append the node to another node.
 * If the child node already is a reference to another node in the
 * DOM, it will be moved to its new position by removing the current reference
 * before creating the new one.
 *
 * @example move(node).to(targetNode) // Regular append
 * @example mode(child).to(parent, true) // Append as first child
 */
export const move = (node: Node): TargetNodeObject<Node> => ({
	/**
	 * @param {Node} targetNode The node in which the new node shall reside.
	 * @param {boolean} asFirstChild Whether or not the new node shall be the
	 * first child of the target node.
	 */
	to: (targetNode: Node, asFirstChild?: boolean): void => {
		const children = Array.from(targetNode.childNodes)
		const noChildren = children.length < 1
		if (noChildren || !asFirstChild) {
			targetNode.appendChild<Node>(node)
			return
		}
		const firstChild = children[0]
		targetNode.insertBefore(node, firstChild)
	},
})

/**
 * Fit Parent Dimensions
 *
 * @param {HTMLElement} node The HTML element of which style to change.
 *
 * @description Transforms the node's dimensions and document position in order
 * to match its parent node.
 */
export const fitToParent = (node: HTMLElement): void => {
	const parent = node.parentNode as HTMLElement
	if (parent) {
		;((domRect: DOMRect) => {
			parent.style.position = 'relative' // Set parent as relative
			const unit = 'px'
			const parentIsBody = parent === document.body
			let left, top, width, height

			// Set distance from left
			if (parentIsBody) {
				left = scrollX + unit
			} else {
				left = 0 + unit
			}

			// Set distance from top
			if (parentIsBody) {
				top = scrollY + unit
			} else {
				top = 0 + unit
			}

			// Set width from parent
			if (parentIsBody) {
				width = '100%'
			} else {
				width = domRect.width + unit
			}

			// Set height from parent
			if (parentIsBody) {
				height = '100vh'
			} else {
				height = domRect.height + unit
			}

			setStyle(parent, 'position', 'relative')
			setStyle(node, 'left', left)
			setStyle(node, 'top', top)
			setStyle(node, 'width', width)
			setStyle(node, 'height', height)
		})(parent.getBoundingClientRect())
	}
}

declare global {
	interface Window {
		attachEvent: Function
	}
	interface Node {
		attachEvent: Function
	}
}

/**
 * Invoke On
 *
 * @param {Window | Node} dispatcher The node in which the given events
 * are captured.
 * @param {() => void} handler A function to be invoked when one of the given
 * events are captured.
 * @param {keyof WindowEventMap} events		An array of event names.
 *
 * @example invokeOn(window, () => alert('Scroll'), ['scroll'])
 */
export const invokeOn = (
	dispatcher: Window | Node,
	handler: () => void,
	events: Array<keyof WindowEventMap>
): void =>
	(([addEventListenerLegacy, addEventListener]) => {
		events.forEach(event => {
			if (addEventListenerLegacy) {
				addEventListenerLegacy(`on${event}`, handler)
			} else {
				addEventListener(event, handler, true)
			}
		})
	})([dispatcher.attachEvent, dispatcher.addEventListener])

/**
 * Is Element or Node
 *
 * @param {any} value A value of any type.
 * @returns {boolean}
 */
export const isElementOrNode = (value: any): boolean => {
	return value instanceof Element || value instanceof Node
}

/**
 * Is Function
 *
 * @param {any} value A value of any type.
 * @returns {boolean}
 */
export const isFunction = (value: any): boolean => {
	return value && {}.toString.call(value) === '[object Function]'
}

/**
 * Set Style
 *
 * @param {HTMLElement} node An HTML element.
 * @param {CSSProperty} prop A CSS property.
 * @param {string} value A CSS value.
 *
 * @description Sets a CSS declaration on an HTML element.
 *
 * @example setStyle(divElement, 'color', '#FF0000')
 */
export const setStyle = (
	node: HTMLElement,
	prop: CSSProperty,
	value: any
): void => {
	node.style[prop as any] = value
}

/**
 * Set Attribute
 *
 * @param {Element} node An element.
 * @param {string} key The attribute name.
 * @param {string} value The attribute value.
 */
export const setAttribute = (node: Element, key: string, value: string) => {
	node.setAttribute(key, value)
}

/**
 * Remove Attribute
 *
 * @param {Element} node An element.
 * @param {string} key The attribute name.
 */
export const removeAttribute = (node: Element, key: string) => {
	node.removeAttribute(key)
}
