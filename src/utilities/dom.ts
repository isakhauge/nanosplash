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

const showElement = (node: HTMLElement): void => {
	node.hidden = false
	node.removeAttribute('hidden')
}

const hideElement = (node: HTMLElement): void => {
	node.hidden = true
	node.setAttribute('hidden', 'true')
}

export const display = (node: HTMLElement, show: boolean): void => {
	if (show) {
		showElement(node)
	} else {
		hideElement(node)
	}
}

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
		targetNode.parentNode?.removeChild(targetNode)
		appendFirst(destinationNode, targetNode)
	},
})

export const fitParentDimensions = (node: HTMLElement): void => {
	const parent = node.parentNode as HTMLElement
	if (parent) {
		;((v: DOMRect) => {
			const parentIsBody = parent === document.body
			let top: string
			let height: string
			if (parentIsBody) {
				top = window.pageYOffset + 'px'
				height = '100vh'
			} else {
				top = v.y + window.pageYOffset + 'px'
				height = v.height + 'px'
			}
			node.style.top = top
			node.style.left = v.x + window.pageXOffset + 'px'
			node.style.width = v.width + 'px'
			node.style.height = height
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
		b('scroll', handler, true)
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

export const setAttribute = (node: Element, key: string, value: string) => {
	node.setAttribute(key, value)
}
