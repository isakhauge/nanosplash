import type { int } from '../semantic/number'

export interface INSElement extends HTMLDivElement {
  nsId: int
  /** `performance.now()` timestamp of the last `show()` call targeting this element. */
  nsShownAt?: number
  /** Milliseconds the splash stays invisible after `show()` (anti-flicker). */
  nsShowDelay?: int
  /** Minimum milliseconds the splash stays visible once shown (anti-flicker). */
  nsMinDuration?: int
  /** Pending deferred-removal timer, set while a `hide()` waits out `minDuration`. */
  nsHideTimer?: ReturnType<typeof setTimeout>
}
