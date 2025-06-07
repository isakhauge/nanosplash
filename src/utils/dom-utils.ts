import type { Func } from '@/types/generic/function.ts'
import type { HTMLString, NodeSelector } from '@/types/semantic/string.ts'
import type { ElementRef } from '@/types/dom.ts'

/**
 * Shortened Document getter
 */
export const doc: Func<Document> = (): Document => globalThis.document

/**
 * Shortened Body getter
 */
export const bod: Func<HTMLElement> = (): HTMLElement =>
  globalThis.document.body

/**
 * Convert iterables and array-like structures into an array
 * @param x
 */
export const toArray = <T>(x: Iterable<T> | ArrayLike<T>) => Array.from(x)

/**
 * Scoped node selector
 * @param node Current scope
 * @param ref Selector
 */
export const all = (node: ParentNode, ref: NodeSelector) =>
  toArray(node.querySelectorAll(ref))

/**
 * Scoped node selector returning the first match
 * @param node Current scope
 * @param ref Selector
 */
export const first = (node: ParentNode, ref: NodeSelector): Element | null =>
  all(node, ref)[0] ?? null

/**
 * Parse an ambiguous element reference into an actual element
 * @param ref Element reference
 */
export const parseRef = <T extends Element>(ref: ElementRef): T | null =>
  ref instanceof Element ? (ref as T) : (first(doc(), ref) as T)

/**
 * Create div
 * @param className Optional CSS class name
 * @param children Optional children
 */
export const div = (
  className?: string,
  ...children: (Node | HTMLString)[]
): HTMLDivElement => {
  const node: HTMLDivElement = doc().createElement('div')
  if (className) node.classList.add(className)
  node.append(...children)
  return node
}

/**
 * Parse HTML code into HTML elements
 * @param html
 */
export const parseHtml = <T extends HTMLElement>(html: HTMLString): T => {
  const node: HTMLDivElement = div()
  node.innerHTML = html
  return node.firstChild as T
}
