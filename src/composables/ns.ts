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

export const useNs: Func<INanosplash> = (): INanosplash => {
  /**
   * Retrieve all NS elements from the DOM
   */
  const getAllNs: Func<INSElement[]> = () =>
    all(doc(), Selectors.ns) as INSElement[]

  /**
   * Create an NS element
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
   * Get all NS elements from DOM in a FIFO sequence
   */
  const nsQueue: Func<INSElement[]> = () =>
    getAllNs().sort((a, b) => a.nsId - b.nsId)

  /**
   * Peek at the first NS element in the queue
   */
  const peekNsQueue: Func<INSElement | null> = () => nsQueue()[0] ?? null

  /**
   * Set the text of the NS element.
   * @param ns Nanosplash element.
   * @param text The text to display adjacent to the spinner.
   */
  const setNsText = (ns: INSElement, text?: string): void => {
    first(ns, Selectors.nsText)?.remove()
    if (!text) return
    const newNsText: Element = div(ClassNames.nsText, text)
    ns.insertBefore(newNsText, ns.firstChild)
  }

  /**
   * Set the parent element of the NS element.
   * @param ns Nanosplash element.
   * @param parent An element to be a parent of the Nanosplash element.
   */
  const setNsParent = (ns: INSElement, parent: Element): void => {
    const child = parent.firstElementChild
    if (child) parent.insertBefore(ns, child)
    parent.append(ns)
    parent.classList.add(ClassNames.nsHost)
  }

  const getNsInside = (parent: Element): INSElement | undefined => {
    const children = toArray(parent.children) as INSElement[]
    return children.find((v: Element): boolean =>
      v.classList.contains(ClassNames.ns)
    )
  }

  /**
   * Show the Nanosplash in the window
   * @param text The text that will appear adjacent to the spinner. Enter false to only show the spinner.
   * @param inside Element or selector to an element wherein the Nanosplash element should reside.
   */
  const show = (text?: string, inside?: ElementRef): int | null => {
    const parent: Element = inside ? (parseRef(inside) ?? bod()) : bod()
    let ns: INSElement
    const recycled = getNsInside(parent)
    if (recycled) {
      ns = recycled as INSElement
    } else {
      ns = makeNs()
      setNsParent(ns, parent)
    }
    setNsText(ns, text ?? '')
    if (parent === bod()) {
      const top: string = scrollY + 'px'
      bod().style.setProperty('--ns-top', top)
    }
    return ns.nsId
  }

  /**
   * Remove a Nanosplash element from the DOM
   * @param ns The Nanosplash element
   */
  const removeNs = (ns?: Element | INSElement | null): void => {
    ns?.parentElement?.classList.remove(ClassNames.nsHost)
    ns?.remove()
  }

  /**
   * Find a Nanosplash element with a given ID
   * @param id The Nanosplash ID
   */
  const findNs = (id: int): INSElement | null =>
    getAllNs().find(x => x.nsId === id) ?? null

  /**
   * Hide agnostically in FIFO order, specifically by ID, or all, by the asterisk symbol.
   * The latter will delete all Nanosplash elements in the DOM.
   * @param id Optional ID of a Nanosplash element or '*'.
   */
  const hide = (id?: int | '*'): void => {
    const selectAll = id === '*'
    if (selectAll) getAllNs().forEach(removeNs)
    else removeNs(typeof id === 'number' ? findNs(id) : peekNsQueue())
  }

  /**
   * Remove old Nanosplash styles and insert new ones.
   */
  const injectStyle = () => {
    first(doc(), '#ns')?.remove()
    const styleElement: HTMLStyleElement = parseHtml(
      `<style id="ns">${style}</style>`
    )
    bod().append(styleElement)
  }

  injectStyle() // Run everytime the hook is invoked.

  return {
    show,
    hide,
    version,
  }
}
