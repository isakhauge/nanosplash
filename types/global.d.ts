import type { INanosplash } from './interfaces/INanosplash.ts'

declare global {
  interface Window {
    ns: INanosplash
  }
}

/**
 * # Nanosplash
 *
 * **The tiny loading screen for web artisans**
 *
 * `useNs` is the main hook, which will inject the style into the DOM and return
 * an instance of the Nanosplash API.
 * We recommend that you add Nanosplash to the Window.
 * @returns Instance of Nanosplash API
 * @example The short and easy way.
 * window.ns = useNs()
 * @example The safe way.
 * window.addEventListener('load', function() {
 *     this.ns = useNs()
 * })
 * @author Isak Hauge <https://www.linkedin.com/in/isakhauge/>
 */
export const useNs: () => INanosplash
