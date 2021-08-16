import { MakeOptions } from 'nanosplash'

export const get = (domString: string): Element | null =>
	document.querySelector(domString)

export const create = (
	tag: keyof HTMLElementTagNameMap,
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
			.forEach(({ key, value }) => element.setAttribute(key, value as string))

		// Element event listeners
		options.eventListeners?.forEach(({ event, handler }) =>
			element.addEventListener(event, handler)
		)

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

export const setAttribute = (
	node: HTMLElement,
	key: string,
	value: string
): void => {
	node.setAttribute(key, value)
}

export const removeAttribute = (node: Element, key: string): void => {
	node.removeAttribute(key)
}

export const getAttribute = (node: Element, key: string): string | null => {
	return node.getAttribute(key)
}

const showElement = (node: HTMLElement): void => {
	node.hidden = false
	removeAttribute(node, 'hidden')
}

const hideElement = (node: HTMLElement): void => {
	node.hidden = true
	setAttribute(node, 'hidden', 'true')
}

export const display = (node: HTMLElement, show: boolean): void => {
	if (show) {
		showElement(node)
	} else {
		hideElement(node)
	}
}

export const parentOf = (node: Node): Node | null => node.parentNode

export const appendFirst = (destinationNode: Node, node: Node): void => {
	const children = Array.from(destinationNode.childNodes)
	const noChildren = children.length < 1
	if (noChildren) {
		destinationNode.appendChild<Node>(node)
		return
	}
	const firstChild = children[0]
	destinationNode.insertBefore(node, firstChild)
}

export const move = (targetNode: Node) => ({
	to: (destinationNode: Node) => {
		parentOf(targetNode)?.removeChild(targetNode)
		appendFirst(destinationNode, targetNode)
	},
})

export const fitParentDimensions = (node: HTMLElement): void => {
	const parent = parentOf(node) as HTMLElement
	if (parent) {
		;((v: DOMRect) => {
			node.style.width = v.width + 'px'
			node.style.height = v.height + 'px'
			node.style.top = v.top + 'px'
			node.style.left = v.left + 'px'
		})(parent.getBoundingClientRect())
	}
}

declare global {
	interface Window {
		attachEvent: Function
	}
}

export const fitParentDimensionsOnResize = (node: HTMLElement) => {
	const handler = () => fitParentDimensions(node)
	;(([a, b]) => {
		if (a) a('onresize', handler)
		else if (b) b('resize', handler, true)
	})([window.attachEvent, window.addEventListener])
}

export const isElementOrNode = (value: any): boolean => {
	return value instanceof Element || value instanceof Node
}

export const isFunction = (value: any): boolean => {
	return value && {}.toString.call(value) === '[object Function]'
}

export const setStyle = (node: HTMLElement, prop: string, value: any) => {
	node.style[prop as any] = value
}
