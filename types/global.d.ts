import type { INanosplash, NsOptions } from './interfaces/INanosplash.ts'

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
 * Create the Nanosplash API. `useNs` is the sole entry point; styles inject
 * lazily on the first `show()`.
 * We recommend adding Nanosplash to the Window.
 * @param options Anti-flicker timing applied to every splash shown through
 * this instance.
 * @returns Instance of Nanosplash API
 * @example The short and easy way.
 * window.ns = useNs()
 * @example The safe way.
 * window.addEventListener('load', function() {
 *     this.ns = useNs()
 * })
 * @example With anti-flicker timing.
 * const ns = useNs({ showDelay: 150, minDuration: 400 })
 * @author Isak Hauge <https://www.linkedin.com/in/isakhauge/>
 */
export const useNs: (options?: NsOptions) => INanosplash
