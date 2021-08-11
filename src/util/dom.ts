export function get(domString: string): Element | null {
    return document.querySelector(domString)
}

export type MakeOptions = {
    id?: string
    className?: string
    attributes?: {key: string, value: string | null}[]
    eventListeners?: {event: keyof HTMLElementEventMap, handler: EventListener}[],
    content?: Node | Element | HTMLElement | string
}

export function mk(tag: keyof HTMLElementTagNameMap, options?: MakeOptions): HTMLElement {
    const element = document.createElement(tag)
    if (options) {
        if (options.id) {
            element.id = options.id
        }
        if (options.className) {
            element.className = options.className
        }
        if (options.attributes) {
            options.attributes
                .filter(v => v.value)
                .forEach(({key, value}) => element.setAttribute(key, value as string))
        }
        if (options.eventListeners) {
            options.eventListeners.forEach(
                ({event, handler}) => element.addEventListener(event, handler)
            )
        }
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

export function setAttribute(node: HTMLElement, key: string, value: string): void {
    node.setAttribute(key, value)
}

export function removeAttribute(node: HTMLElement, key: string): void {
    node.removeAttribute(key)
}

export function getAttribute(node: HTMLElement, key: string): string | null {
    return node.getAttribute(key)
}

function showElement(node: HTMLElement): void {
    node.hidden = false
    removeAttribute(node, 'hidden')
}

function hideElement(node: HTMLElement): void {
    node.hidden = true
    setAttribute(node, 'hidden', 'true')
}

export function display(node: HTMLElement, show: boolean): void {
    if (show) {
        showElement(node)
    } else {
        hideElement(node)
    }
}

export function parentOf(node: Node): Node | null {
    return node.parentNode
}

export function appendFirst(destinationNode: Node, node: Node): void {
    const children = Array.from(destinationNode.childNodes)
    const noChildren = children.length < 1
    if (noChildren) {
        destinationNode.appendChild<Node>(node)
        return
    }
    const firstChild = children[0]
    destinationNode.insertBefore(node, firstChild)
}

export function move(targetNode: Node, destinationNode: Node): void {
    const parentOfTarget = parentOf(targetNode)
    parentOfTarget?.removeChild(targetNode)
    appendFirst(destinationNode, targetNode)
}

export function fitParentDimensions(node: HTMLElement): void {
    const parent = parentOf(node) as HTMLElement
    const {top, left} = parent.getBoundingClientRect()
    node.style.width = parent.offsetWidth + 'px'
    node.style.height = parent.offsetHeight + 'px'
    node.style.top = top + 'px'
    node.style.left = left + 'px'
}

