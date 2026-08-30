import type { Func } from '@/types/generic/function.ts'
import type { HTMLString, NodeSelector } from '@/types/semantic/string.ts'
import type { ElementRef } from '@/types/dom.ts'

/**
 * Get the document.
 */
export const doc: Func<Document> = (): Document => globalThis.document

/**
 * Get the document body.
 */
export const bod: Func<HTMLElement> = (): HTMLElement =>
  globalThis.document.body

/**
 * Convert an iterable or array-like into an array.
 */
export const toArray = <T>(x: Iterable<T> | ArrayLike<T>) => Array.from(x)

/**
 * Get all descendants of `scope` matching `selector`.
 */
export const all = (scope: ParentNode, selector: NodeSelector) =>
  toArray(scope.querySelectorAll(selector))

/**
 * Get the first descendant of `scope` matching `selector`, or `null`.
 */
export const first = (
  scope: ParentNode,
  selector: NodeSelector
): Element | null => all(scope, selector)[0] ?? null

/**
 * Resolve an element-or-selector reference to an element, or `null`.
 */
export const parseRef = <T extends Element>(ref: ElementRef): T | null =>
  ref instanceof Element ? (ref as T) : (first(doc(), ref) as T)

/**
 * Create a `<div>` with an optional class and children.
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
 * Parse an HTML string and return its first element.
 */
export const parseHtml = <T extends HTMLElement>(html: HTMLString): T => {
  const node: HTMLDivElement = div()
  node.innerHTML = html
  return node.firstChild as T
}
