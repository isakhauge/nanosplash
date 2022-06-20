import {ElementTag} from "../types";

/**
 * # Get
 * Helper function to get Elements from the DOM using CSS selector.
 * @param {string} selector CSS Selector.
 */
export function get<T>(selector: string): HTMLElement | T | null {
    return document.querySelector(selector) as HTMLElement | T | null
}

/**
 * # Move
 * Helper function that can move a node inside another node.
 * @param {Node} source The node to be moved.
 * @param {Node} destination The destination node.
 * @param {boolean} asFirstChild Append or prepend the new node inside the child list.
 */
export function move(source: Node, destination: Node, asFirstChild: boolean = false): void
{
    if (source && destination) {
        (destination.hasChildNodes() && asFirstChild)
            ? destination.insertBefore(source, destination.firstChild)
            : destination.appendChild(source)
    }
}

/**
 * # Make
 * Short hand helper function that creates Nodes.
 * @param {ElementTag} tag
 */
export const mk = (tag: ElementTag) => document.createElement(tag)

/**
 * # Add Class
 * Helper class that easily adds classes to an element.
 * @param {HTMLElement} node The node
 * @param {...string[]} classes
 */
export function addClass(node: HTMLElement, ...classes: string[]): void
{
    node.classList.add(...classes)
}

export function setAttr(node: HTMLElement, attribute: string, value: string): void
{
    node.setAttribute(attribute, value)
}
