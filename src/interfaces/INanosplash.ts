import type { ElementRef } from '@/types/dom.ts'
import type { int } from '@/types/semantic/number.ts'

/**
 * # Nanosplash
 * @author Isak Hauge <isakhauge@icloud.com>
 */
export interface INanosplash {
  /**
   * # Show
   * Display Nanosplash inside the window.
   * @param {string | null | undefined} text Optional text. Pass falsy to display spinner only.
   * @param {string | Element | undefined} inside Optional element reference
   * @returns {number | null} The internal ID of the created Nanosplash.
   * @example
   * // Show spinner only
   * ns.show()
   * @example
   * // Show spinner and text
   * ns.show('Loading ...')
   * @example
   * // Show spinner and text inside element
   * const div = document.createElement('div')
   * div.id = 'my-div'
   * document.body.append(div)
   *
   * // Alternative 1: Using node
   * ns.show('Loading ...', div)
   *
   * // Alternative 2: Using selector
   * ns.show('Loading ...', '#my-div')
   * @example
   * // Show spinner only, inside element
   * const div = document.createElement('div')
   * div.id = 'my-div'
   * document.body.append(div)
   *
   * // Alternative 1: Using node
   * ns.show(null, div)
   *
   * // Alternative 2: Using selector
   * ns.show(null, '#my-div')
   */
  show(
    text?: string | null | undefined,
    inside?: ElementRef | HTMLElement
  ): int | null
  /**
   * # Hide
   * Remove Nanosplash in multiple ways depending on the passed argument.
   * - Pass ID: Remove specific.
   * - Pass '*': Remove all in window.
   * - Pass nothing: Remove in FIFO order.
   * @param id The internal ID, an asterisk, or nothing.
   * @example
   * // Remove the first Nanosplash in the queue (FIFO)
   * ns.hide()
   * @example
   * // Remove specific Nanosplash in case you have multiple
   * const idA: number = ns.show(null, '#div-a') // 1700000000000
   * const idB: number = ns.show(null, '#div-b') // 1800000000000
   * ns.hide(idB) // Only hides Nanosplash inside the element with ID div-b
   * @example
   * // Hide all Nanosplash elements in the DOM
   * ns.hide('*')
   */
  hide(id?: int | '*'): void
  /**
   * # Version
   * The current version of Nanosplash.
   */
  version: string
}
