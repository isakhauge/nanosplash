import style from '@/style/ns.css?inline'
import type { INanosplash } from '@/types/interfaces/INanosplash'
import type { Func } from '@/types/generic/function.ts'
import type { INSElement } from '@/types/interfaces/INSElement'
import {
  all,
  bod,
  div,
  doc,
  first,
  parseHtml,
  parseRef,
  toArray,
} from '@/utils/dom-utils.ts'
import { ClassNames, Selectors } from '@/constants/ns.ts'
import type { HTMLString } from '@/types/semantic/string.ts'
import type { ElementRef } from '@/types/dom.ts'
import type { int } from '@/types/semantic/number.ts'
import { version } from '@/../package.json'

/**
 * Creates and returns the Nanosplash (NS) API.
 *
 * Nanosplash is a lightweight, non-blocking loading indicator that can be shown
 * globally or inside specific containers, with optional text.
 */
export const useNs: Func<INanosplash> = (): INanosplash => {
  /**
   * Retrieves all Nanosplash elements currently in the DOM.
   *
   * @returns Array of all `INSElement` instances
   */
  const getAllNs: Func<INSElement[]> = () =>
    all(doc(), Selectors.ns) as INSElement[]

  /**
   * Creates a new Nanosplash element with spinner and optional text container.
   *
   * The element is assigned a unique `nsId` based on the current timestamp.
   *
   * @returns A new `INSElement` ready to be inserted into the DOM
   */
  const makeNs: Func<INSElement> = () => {
    const circle: HTMLString =
      '<circle class=path cx=25 cy=25 r=20 fill=none />'
    const svg = parseHtml(`<svg viewBox="0 0 50 50">${circle}</svg>`) as Element

    const node = div(
      ClassNames.ns,
      div(ClassNames.nsText),
      div(ClassNames.nsSpinner, svg)
    ) as INSElement

    node.nsId = Date.now()
    return node
  }

  /**
   * Returns all Nanosplash elements sorted in FIFO order (oldest first)
   * based on their `nsId`.
   *
   * @returns Nanosplash elements in creation order
   */
  const nsQueue: Func<INSElement[]> = () =>
    getAllNs().sort((a, b) => a.nsId - b.nsId)

  /**
   * Returns the oldest Nanosplash element without removing it (peek operation).
   *
   * @returns The first (oldest) Nanosplash element, or `null` if none exist
   */
  const peekNsQueue: Func<INSElement | null> = () => nsQueue()[0] ?? null

  /**
   * Sets or clears the text content of a Nanosplash element.
   *
   * @param ns - The target Nanosplash element
   * @param text - Text to display next to the spinner. Pass `undefined`, `null`, or empty string to hide text.
   */
  const setNsText = (ns: INSElement, text?: string): void => {
    first(ns, Selectors.nsText)?.remove()
    if (!text) return

    const newNsText = div(ClassNames.nsText, text)
    ns.insertBefore(newNsText, ns.firstChild)
  }

  /**
   * Sets the parent container for a Nanosplash element and marks it as a host.
   *
   * If the parent already has children, the Nanosplash is inserted before the first child
   * to ensure it appears on top.
   *
   * @param ns - The Nanosplash element to position
   * @param parent - The container element that will hold the Nanosplash
   */
  const setNsParent = (ns: INSElement, parent: Element): void => {
    const child = parent.firstElementChild
    if (child) {
      parent.insertBefore(ns, child)
    } else {
      parent.append(ns)
    }
    parent.classList.add(ClassNames.nsHost)
  }

  /**
   * Finds an existing Nanosplash element inside a given parent.
   *
   * @param parent - The container to search within
   * @returns The Nanosplash element if found, otherwise `undefined`
   */
  const getNsInside = (parent: Element): INSElement | undefined => {
    const children = toArray(parent.children) as INSElement[]
    return children.find(v => v.classList.contains(ClassNames.ns))
  }

  /**
   * Displays a Nanosplash loading indicator.
   *
   * If a Nanosplash already exists inside the target container, it will be reused
   * (recycled) instead of creating a new one.
   *
   * @param text - Optional text to display next to the spinner.
   *               Pass `false`, `undefined`, or empty string to show only the spinner.
   * @param inside - Optional target container (Element, selector string, or ref).
   *                 If omitted, the Nanosplash is shown on the document body.
   * @returns The unique `nsId` of the shown Nanosplash, or `null` if failed
   */
  const show = (text?: string, inside?: ElementRef): int | null => {
    const parent: Element = inside ? (parseRef(inside) ?? bod()) : bod()
    let ns: INSElement

    const recycled = getNsInside(parent)
    if (recycled) {
      ns = recycled
    } else {
      ns = makeNs()
      setNsParent(ns, parent)
    }

    setNsText(ns, text ?? '')

    // Position body-level splash at current scroll position
    if (parent === bod()) {
      const top: string = scrollY + 'px'
      bod().style.setProperty('--ns-top', top)
    }

    return ns.nsId
  }

  /**
   * Removes a Nanosplash element from the DOM and cleans up its host class.
   *
   * @param ns - The Nanosplash element to remove (can be `null` or `undefined`)
   */
  const removeNs = (ns?: Element | INSElement | null): void => {
    if (!ns) return
    ns.parentElement?.classList.remove(ClassNames.nsHost)
    ns.remove()
  }

  /**
   * Finds a Nanosplash element by its unique ID.
   *
   * @param id - The `nsId` of the Nanosplash to find
   * @returns The matching Nanosplash element, or `null` if not found
   */
  const findNs = (id: int): INSElement | null =>
    getAllNs().find(x => x.nsId === id) ?? null

  /**
   * Hides one or more Nanosplash elements.
   *
   * Behavior depends on the argument:
   * - `undefined` or omitted → hides the oldest Nanosplash (FIFO)
   * - `number` → hides the Nanosplash with the matching `nsId`
   * - `'*'` → hides **all** Nanosplash elements in the DOM
   *
   * @param id - ID of specific Nanosplash, `'*'` for all, or omitted for oldest
   */
  const hide = (id?: int | '*'): void => {
    const selectAll = id === '*'

    if (selectAll) {
      getAllNs().forEach(removeNs)
    } else if (typeof id === 'number') {
      removeNs(findNs(id))
    } else {
      removeNs(peekNsQueue())
    }
  }

  /**
   * Injects the latest Nanosplash CSS styles into the document.
   *
   * Removes any previously injected styles first to ensure updates take effect.
   */
  const injectStyle = () => {
    first(doc(), '#ns')?.remove()

    const styleElement: HTMLStyleElement = parseHtml(
      `<style id="ns">${style}</style>`
    ) as HTMLStyleElement

    bod().append(styleElement)
  }

  // Inject styles every time `useNs` is called (supports HMR / style updates)
  injectStyle()

  return {
    show,
    hide,
    version,
  }
}
