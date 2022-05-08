import {HTMLElementTag} from "../types";

export function get<T>(selector: string): HTMLElement | T | null {
    return document.querySelector(selector) as HTMLElement | T | null
}

export function move(source: Node, destination: Node, asFirstChild: boolean = false): void
{
    if (source && destination) {
        (destination.hasChildNodes() && asFirstChild)
            ? destination.insertBefore(source, destination.firstChild)
            : destination.appendChild(source)
    }
}

export const mk = (tag: HTMLElementTag) => document.createElement(tag)

export function addClass(node: HTMLElement, ...classes: string[]): void
{
    node.classList.add(...classes)
}

export function setAttr(node: HTMLElement, attribute: string, value: string): void
{
    node.setAttribute(attribute, value)
}
