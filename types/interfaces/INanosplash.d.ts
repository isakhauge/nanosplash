import type { ElementRef } from '../dom'
import type { int } from '../semantic/number'

/**
 * # Options
 * Configuration for `useNs()`. Applies to every splash shown through the
 * returned API instance, keeping visual behavior consistent.
 */
export interface NsOptions {
  /**
   * Milliseconds to keep the splash invisible after `show()`.
   * If it is hidden before the delay elapses, it never becomes visible.
   * Prevents a flash of spinner on fast operations.
   */
  showDelay?: int
  /**
   * Minimum milliseconds the splash stays visible once shown.
   * A `hide()` call arriving earlier is deferred until the minimum has passed.
   * Prevents a barely-visible blink.
   */
  minDuration?: int
}

/**
 * # Job
 * An async unit of work tracked by a Nanosplash. The splash is guaranteed
 * to be visible before the job is invoked.
 */
export type NsJob<T> = () => Promise<T>

/**
 * # Label
 * The text displayed beside the spinner, or falsy for spinner only.
 */
export type NsLabel = string | null | undefined

/**
 * # Labeled job
 * A job with a label. While the job runs, the splash shows the label.
 */
export type NsLabeledJob<T> = [NsLabel, NsJob<T>]

/**
 * # Show input
 * Everything `show()` accepts as its first argument.
 */
export type NsShowInput =
  | NsLabel
  | NsLabeledJob<unknown>
  | readonly NsLabeledJob<unknown>[]

/**
 * # Job results
 * Maps a tuple of labeled jobs to a tuple of each job's resolved return value.
 */
export type NsJobResults<Jobs extends readonly NsLabeledJob<unknown>[]> = {
  -readonly [K in keyof Jobs]: Jobs[K] extends NsLabeledJob<infer R>
    ? Awaited<R>
    : never
}

/**
 * # Nanosplash
 * @author Isak Hauge <isakhauge@icloud.com>
 */
export interface INanosplash {
  /**
   * # Show
   * Display a splash, globally or inside a container.
   * @param label Optional label. Pass falsy to display the spinner only.
   * @param inside Optional container: an `Element` or a CSS selector.
   * Omit to target the document body.
   * @returns The splash's ID, or `null` if `inside` could not be resolved.
   * @example
   * ns.show()                       // spinner only
   * ns.show('Loading…')             // spinner and label
   * ns.show('Loading…', '#my-div')  // inside a container (selector)
   * ns.show(null, myElement)        // inside a container (element), no label
   */
  show(label?: NsLabel, inside?: ElementRef | HTMLElement): int | null
  /**
   * # Show (single job)
   * Display a splash for the lifetime of one job: show it with the label
   * before the job starts and hide it when the job settles (resolve or
   * reject). Pass the job's result through.
   * @param job A `[label, job]` pair.
   * @param inside Optional container: an `Element` or a CSS selector.
   * @returns The job's resolved value.
   * @example
   * const user = await ns.show(['Loading user…', () => fetchUser()])
   */
  show<T>(
    job: NsLabeledJob<T>,
    inside?: ElementRef | HTMLElement
  ): Promise<Awaited<T>>
  /**
   * # Show (job sequence)
   * Display one splash across sequential labeled jobs, updating the label as
   * each job starts. Resolve with the jobs' results as a typed tuple, in
   * input order. Fail fast: the first rejection hides the splash,
   * propagates, and skips the remaining jobs.
   * @param jobs An array of `[label, job]` pairs.
   * @param inside Optional container: an `Element` or a CSS selector.
   * @returns The jobs' resolved values, in input order.
   * @example
   * const [user, posts] = await ns.show([
   *   ['Loading user…', () => fetchUser()],
   *   ['Loading posts…', () => fetchPosts()],
   * ])
   */
  show<Jobs extends readonly NsLabeledJob<unknown>[]>(
    jobs: readonly [...Jobs],
    inside?: ElementRef | HTMLElement
  ): Promise<NsJobResults<Jobs>>
  /**
   * # Hide
   * Remove one or more splashes.
   * - Pass an ID: remove that splash.
   * - Pass `'*'`: remove every splash.
   * - Pass nothing: remove the oldest splash (FIFO).
   * @param id A splash ID, `'*'`, or nothing.
   * @example
   * ns.hide()      // oldest splash
   * ns.hide(id)    // specific splash, using the ID returned by show()
   * ns.hide('*')   // every splash
   */
  hide(id?: int | '*'): void
  /**
   * # Version
   * The current version of Nanosplash.
   */
  version: string
}
