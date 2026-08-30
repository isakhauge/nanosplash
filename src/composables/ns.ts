import style from '@/style/ns.css?inline'
import type {
  INanosplash,
  NsLabel,
  NsLabeledJob,
  NsOptions,
  NsShowInput,
} from '@/types/interfaces/INanosplash'
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

let nextNsId = 1

/**
 * Narrow a `show()` input to a single labeled job.
 *
 * An array of labeled jobs never matches: its second element is another
 * labeled job (or `undefined`), not a function.
 */
const isLabeledJob = (input?: NsShowInput): input is NsLabeledJob<unknown> =>
  Array.isArray(input) && typeof input[1] === 'function'

/**
 * Create the Nanosplash (NS) API.
 *
 * Nanosplash is a lightweight, non-blocking loading indicator shown globally
 * or inside specific containers, with an optional label.
 *
 * @param options - Anti-flicker timing applied to every splash shown through
 *                  this instance
 */
export const useNs = (options?: NsOptions): INanosplash => {
  /**
   * Get all Nanosplash elements currently in the DOM.
   */
  const getAllNs: Func<INSElement[]> = () =>
    all(doc(), Selectors.ns) as INSElement[]

  /**
   * Create a new Nanosplash element (spinner plus empty text slot) with a
   * unique monotonic `nsId`.
   */
  const makeNs: Func<INSElement> = () => {
    const circle: HTMLString =
      '<circle class=path cx=25 cy=25 r=20 fill=none />'
    const svg = parseHtml(`<svg viewBox="0 0 50 50">${circle}</svg>`) as Element

    svg.setAttribute('aria-hidden', 'true')

    const node = div(
      ClassNames.ns,
      div(ClassNames.nsText),
      div(ClassNames.nsSpinner, svg),
    ) as INSElement

    node.setAttribute('role', 'status')
    node.setAttribute('aria-live', 'polite')
    node.nsId = nextNsId++
    return node
  }

  /**
   * Get the active Nanosplash elements (excluding those pending removal), oldest first.
   */
  const nsQueue: Func<INSElement[]> = () =>
    getAllNs()
      .filter((x) => x.nsHideTimer === undefined)
      .sort((a, b) => a.nsId - b.nsId)

  /**
   * Get the oldest active Nanosplash element, or `null` if none exist.
   */
  const peekNsQueue: Func<INSElement | null> = () => nsQueue()[0] ?? null

  /**
   * Set a Nanosplash element's text, or remove it when `text` is falsy.
   */
  const setNsText = (ns: INSElement, text?: string): void => {
    first(ns, Selectors.nsText)?.remove()
    if (!text) return

    const newNsText = div(ClassNames.nsText, text)
    ns.insertBefore(newNsText, ns.firstChild)
  }

  /**
   * Insert the Nanosplash above the parent's children and mark the parent
   * as a busy host (class + `aria-busy`).
   */
  const mountNs = (ns: INSElement, parent: Element): void => {
    const child = parent.firstElementChild
    if (child) {
      parent.insertBefore(ns, child)
    } else {
      parent.append(ns)
    }
    parent.classList.add(ClassNames.nsHost)
    parent.setAttribute('aria-busy', 'true')
  }

  /**
   * Stamp the timing state on a Nanosplash element and expose the show
   * delay to CSS via `--ns-show-delay` on the host.
   */
  const applyTiming = (ns: INSElement, parent: Element): void => {
    ns.nsShownAt = performance.now()
    ns.nsShowDelay = options?.showDelay ?? 0
    ns.nsMinDuration = options?.minDuration ?? 0
    ;(parent as HTMLElement).style.setProperty(
      '--ns-show-delay',
      ns.nsShowDelay + 'ms',
    )
  }

  /**
   * Get the Nanosplash element directly inside `parent`, if any.
   */
  const getNsInside = (parent: Element): INSElement | undefined => {
    const children = toArray(parent.children) as INSElement[]
    return children.find((v) => v.classList.contains(ClassNames.ns))
  }

  /**
   * Show a splash, recycling any existing one in the same container.
   *
   * @param label - Label beside the spinner; falsy shows the spinner only
   * @param inside - Target container; the document body when omitted
   * @returns The splash's `nsId`, or `null` if `inside` could not be resolved
   */
  const showPlain = (label?: NsLabel, inside?: ElementRef): int | null => {
    const parent = inside ? parseRef(inside) : bod()
    if (!parent) return null

    ensureStyle()
    let ns: INSElement

    const recycled = getNsInside(parent)
    if (recycled) {
      ns = recycled
      clearTimeout(ns.nsHideTimer)
      ns.nsHideTimer = undefined
    } else {
      ns = makeNs()
      mountNs(ns, parent)
    }

    applyTiming(ns, parent)
    setNsText(ns, label ?? '')

    // Position body-level splash at current scroll position
    if (parent === bod()) {
      const top: string = scrollY + 'px'
      bod().style.setProperty('--ns-top', top)
    }

    return ns.nsId
  }

  /**
   * Remove a Nanosplash from the DOM immediately and clear its host's
   * class, `aria-busy`, and `--ns-show-delay`.
   */
  const removeNsNow = (ns: INSElement): void => {
    const host = ns.parentElement
    if (host) {
      host.classList.remove(ClassNames.nsHost)
      host.removeAttribute('aria-busy')
      host.style.removeProperty('--ns-show-delay')
    }
    ns.remove()
  }

  /**
   * Remove a Nanosplash element, honoring its timing state.
   *
   * - Nothing to remove, or removal already pending → do nothing
   * - Still inside its `showDelay` window (never visible) → remove now
   * - Visible for less than `minDuration` → defer removal until it has
   *   been visible long enough
   * - Otherwise → remove now
   */
  const removeNs = (ns?: INSElement | null): void => {
    if (!ns) return
    if (ns.nsHideTimer !== undefined) return

    const showDelay = ns.nsShowDelay ?? 0
    const visibleFor = performance.now() - ((ns.nsShownAt ?? 0) + showDelay)
    const stillHidden = showDelay > 0 && visibleFor < 0
    const wait = (ns.nsMinDuration ?? 0) - visibleFor

    if (!stillHidden && wait > 0) {
      ns.nsHideTimer = setTimeout(() => removeNsNow(ns), wait)
      return
    }

    removeNsNow(ns)
  }

  /**
   * Find the Nanosplash element with the given `nsId`; `null` if not found.
   */
  const findNs = (id: int): INSElement | null =>
    getAllNs().find((x) => x.nsId === id) ?? null

  /**
   * Hide one or more Nanosplash elements.
   *
   * - Omitted → hide the oldest active splash (FIFO)
   * - `number` → hide the splash with that `nsId`
   * - `'*'` → hide every splash in the DOM
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
   * Build the Nanosplash `<style>` element.
   */
  const injectStyle = (): HTMLStyleElement =>
    parseHtml(`<style id="ns">${style}</style>`) as HTMLStyleElement

  /**
   * Inject the stylesheet on first render; replace it when stale.
   */
  const ensureStyle = (): void => {
    const existing = first(doc(), '#ns') as HTMLStyleElement | null
    // Compare against a fresh element so `style` has a single textual use;
    // the minifier would otherwise inline the full CSS string at every site.
    const fresh = injectStyle()

    if (!existing) {
      doc().head.append(fresh)
      return
    }

    if (existing.textContent !== fresh.textContent) {
      existing.replaceWith(fresh)
    }
  }

  /**
   * Run labeled jobs sequentially under one splash, updating the label as
   * each job starts. Fail fast: the first rejection hides the splash,
   * propagates, and skips the remaining jobs. Hide the splash once the
   * sequence settles either way.
   *
   * @returns Each job's resolved value, in input order
   */
  const runJobs = async (
    jobs: readonly NsLabeledJob<unknown>[],
    inside?: ElementRef,
  ): Promise<unknown[]> => {
    if (jobs.length === 0) return []

    const results: unknown[] = []
    let id: int | null = null

    try {
      for (const [label, job] of jobs) {
        id = showPlain(label, inside)
        results.push(await job())
      }
    } finally {
      if (id !== null) hide(id)
    }

    return results
  }

  /**
   * Show a splash, or run jobs under one.
   *
   * - Label (or nothing) → show a splash, return its `nsId`
   * - One labeled job → show a splash for the job's lifetime, resolve with its result
   * - Array of labeled jobs → run sequential jobs under one splash, resolve
   *   with their results in order
   */
  const show = ((input?: NsShowInput, inside?: ElementRef) => {
    if (isLabeledJob(input)) {
      return runJobs([input], inside).then((results) => results[0])
    }
    if (Array.isArray(input)) {
      return runJobs(input as readonly NsLabeledJob<unknown>[], inside)
    }
    return showPlain(input as NsLabel, inside)
  }) as INanosplash['show']

  return {
    show,
    hide,
    version,
  }
}
