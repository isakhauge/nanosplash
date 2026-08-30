import {
  describe,
  it,
  expect,
  expectTypeOf,
  beforeEach,
  afterEach,
  vi,
} from 'vite-plus/test'
import { useNs } from '@/composables/ns'
import type { INSElement } from '@/types/interfaces/INSElement'
import { ClassNames, Selectors } from '@/constants/ns'

const get = (selector: string) => document.querySelector(selector)
const getAll = (selector: string) => document.querySelectorAll(selector)
const div = (id?: string) => {
  const element: HTMLDivElement = document.createElement('div')
  if (id) {
    element.id = id
  }
  return element
}

describe('useNs', () => {
  let ns: ReturnType<typeof useNs>

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = ''
    document.querySelector('style#ns')?.remove()
    ns = useNs()
  })

  describe('show', () => {
    it('returns null when the target container cannot be resolved', () => {
      const id = ns.show('Missing', '#does-not-exist')

      expect(id).toBeNull()
      expect(get(Selectors.ns)).toBeNull()
    })

    it('creates a new Nanosplash with text', () => {
      const id = ns.show('Loading...')
      const nsElement = get(Selectors.ns)
      const textElement = nsElement?.querySelector(Selectors.nsText)
      const spinnerElement = nsElement?.querySelector(Selectors.nsSpinner)

      expect(nsElement).toBeTruthy()
      expect(textElement?.textContent).toBe('Loading...')
      expect(spinnerElement).toBeTruthy()
      expect(typeof id).toBe('number')
    })

    it('creates a new Nanosplash without text', () => {
      const id = ns.show()
      const nsElement = get(Selectors.ns)
      const textElement = nsElement?.querySelector(Selectors.nsText)
      expect(nsElement).toBeTruthy()
      expect(textElement?.textContent).toBe(undefined)
      expect(typeof id).toBe('number')
    })

    it('places Nanosplash inside a specified element', () => {
      const container = div('container')
      document.body.append(container)

      ns.show('Inside', '#container')
      const hostElement = container.querySelector(Selectors.ns)
      expect(hostElement).toBeTruthy()
    })

    it('reuses an existing Nanosplash in the same container', () => {
      ns.show('A')
      const firstElement = get(Selectors.ns) as INSElement
      const firstId = firstElement.nsId

      ns.show('B')
      const secondElement = get(Selectors.ns) as INSElement
      const secondId = secondElement.nsId

      const nsElements = getAll(Selectors.ns)
      expect(firstId).toBe(secondId)
      expect(nsElements.length).toBe(1)
    })

    it('inserts the Nanosplash before existing children so it renders on top', () => {
      const container = div('container')
      const existingChild = div('existing')
      container.append(existingChild)
      document.body.append(container)

      ns.show('On top', '#container')

      expect(
        container.firstElementChild?.classList.contains(ClassNames.ns),
      ).toBe(true)
      expect(container.lastElementChild).toBe(existingChild)
    })

    it('assigns unique ids even when calls happen within the same timestamp', () => {
      const nowSpy = vi.spyOn(Date, 'now').mockReturnValue(123)

      const idA = ns.show('A')
      const idB = ns.show('B', document.createElement('div'))

      expect(idA).not.toBeNull()
      expect(idB).not.toBeNull()
      expect(idA).not.toBe(idB)

      nowSpy.mockRestore()
    })
  })

  describe('hide', () => {
    it('removes the oldest Nanosplash element (FIFO)', () => {
      document.body.append(div('a'), div('b'))
      ns.show('A', '#a')
      ns.show('B', '#b')
      expect(getAll(Selectors.ns).length).toBe(2)
      ns.hide()
      expect(getAll(Selectors.ns).length).toBe(1)
      expect(get(Selectors.nsText)?.textContent).toBe('B')
    })

    it('removes a specific Nanosplash by ID', () => {
      document.body.append(div('a'), div('b'))
      const idA = ns.show('A', '#a') as number
      ns.show('B', '#b')
      expect(getAll(Selectors.ns).length).toBe(2)
      ns.hide(idA)
      expect(getAll(Selectors.ns).length).toBe(1)
      expect(get(Selectors.nsText)?.textContent).toBe('B')
    })

    it('removes all Nanosplash elements when given "*"', () => {
      ns.show('One')
      ns.show('Two')
      ns.hide('*')
      expect(getAll(Selectors.ns).length).toBe(0)
    })

    it('does nothing when given an unknown ID', () => {
      ns.show('Only one')
      ns.hide(999999)
      expect(getAll(Selectors.ns).length).toBe(1)
    })

    it('does nothing when hiding with an empty queue', () => {
      expect(() => ns.hide()).not.toThrow()
      expect(getAll(Selectors.ns).length).toBe(0)
    })

    it('removes the host class when hiding a scoped instance', () => {
      const container = div('container')
      document.body.append(container)

      const id = ns.show('Inside', '#container') as number
      expect(container.classList.contains(ClassNames.nsHost)).toBe(true)

      ns.hide(id)

      expect(container.classList.contains(ClassNames.nsHost)).toBe(false)
    })
  })

  describe('style injection', () => {
    it('injects the style element when rendering for the first time', () => {
      expect(get('style#ns')).toBeNull()

      ns.show('Loading...')

      const styleElement = get('style#ns')
      expect(styleElement).toBeTruthy()
      expect(styleElement).toBeInstanceOf(HTMLStyleElement)
      expect(styleElement?.parentElement).toBe(document.head)
    })

    it('does not inject the style element just by creating the API', () => {
      expect(get('style#ns')).toBeNull()
    })

    it('does not duplicate style tags across multiple show calls', () => {
      ns.show('Loading...')
      ns.show('Loading again')

      expect(getAll('style#ns').length).toBe(1)
    })

    it('replaces stale style content if an old ns style exists', () => {
      ns.show('Loading...')
      const oldStyle = get('style#ns') as HTMLStyleElement
      oldStyle.textContent = '/* stale */'

      ns.show('Fresh load')
      const replacedStyle = get('style#ns') as HTMLStyleElement

      expect(replacedStyle).toBeTruthy()
      expect(replacedStyle.textContent).not.toBe('/* stale */')
      expect(replacedStyle).not.toBe(oldStyle)
    })
  })

  describe('timing', () => {
    beforeEach(() => {
      vi.useFakeTimers({
        toFake: ['setTimeout', 'clearTimeout', 'performance'],
      })
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('sets the show delay custom property on the host', () => {
      useNs({ showDelay: 150 }).show('Wait')
      expect(document.body.style.getPropertyValue('--ns-show-delay')).toBe(
        '150ms',
      )
    })

    it('defaults the show delay to 0ms without timing options', () => {
      ns.show('Now')
      expect(document.body.style.getPropertyValue('--ns-show-delay')).toBe(
        '0ms',
      )
    })

    it('removes immediately when hidden within the show delay window', () => {
      const tns = useNs({ showDelay: 200, minDuration: 500 })
      const id = tns.show('Fast') as number
      vi.advanceTimersByTime(100)

      tns.hide(id)

      expect(getAll(Selectors.ns).length).toBe(0)
      expect(document.body.style.getPropertyValue('--ns-show-delay')).toBe('')
    })

    it('hides immediately after the delay window when no minDuration is set', () => {
      const tns = useNs({ showDelay: 100 })
      const id = tns.show('Slowish') as number
      vi.advanceTimersByTime(200)

      tns.hide(id)

      expect(getAll(Selectors.ns).length).toBe(0)
    })

    it('defers removal until minDuration has elapsed', () => {
      const tns = useNs({ minDuration: 500 })
      const id = tns.show('Sticky') as number
      vi.advanceTimersByTime(100)

      tns.hide(id)
      expect(getAll(Selectors.ns).length).toBe(1)

      vi.advanceTimersByTime(400)
      expect(getAll(Selectors.ns).length).toBe(0)
    })

    it('removes immediately when minDuration has already passed', () => {
      const tns = useNs({ minDuration: 100 })
      const id = tns.show('Done') as number
      vi.advanceTimersByTime(200)

      tns.hide(id)

      expect(getAll(Selectors.ns).length).toBe(0)
    })

    it('ignores a second hide while removal is pending', () => {
      const tns = useNs({ minDuration: 500 })
      const id = tns.show('Sticky') as number

      tns.hide(id)
      tns.hide(id)
      expect(getAll(Selectors.ns).length).toBe(1)

      vi.advanceTimersByTime(500)
      expect(getAll(Selectors.ns).length).toBe(0)
    })

    it('FIFO hide skips instances pending removal', () => {
      document.body.append(div('a'), div('b'))
      useNs({ minDuration: 500 }).show('A', '#a')
      ns.show('B', '#b')

      ns.hide() // A (oldest), deferred
      ns.hide() // must target B, not A again

      expect(get('#b ' + Selectors.ns)).toBeNull()
      expect(get('#a ' + Selectors.ns)).toBeTruthy()

      vi.advanceTimersByTime(500)
      expect(getAll(Selectors.ns).length).toBe(0)
    })

    it('re-show cancels a pending removal and recycles the element', () => {
      const tns = useNs({ minDuration: 500 })
      const id = tns.show('First') as number
      tns.hide(id)

      const recycledId = tns.show('Again')
      vi.advanceTimersByTime(1000)

      expect(getAll(Selectors.ns).length).toBe(1)
      expect(recycledId).toBe(id)
    })

    it('handles the splash being detached externally before deferred removal fires', () => {
      const tns = useNs({ minDuration: 500 })
      const id = tns.show('X') as number
      tns.hide(id)

      get(Selectors.ns)?.remove() // external DOM mutation

      expect(() => vi.advanceTimersByTime(500)).not.toThrow()
      expect(getAll(Selectors.ns).length).toBe(0)
    })
  })

  describe('job pairs', () => {
    it('shows before the job starts and resolves with its result', async () => {
      let resolve!: (value: string) => void
      const promise = new Promise<string>((r) => {
        resolve = r
      })

      const pending = ns.show(['Working…', () => promise])
      expect(getAll(Selectors.ns).length).toBe(1)
      expect(get(Selectors.nsText)?.textContent).toBe('Working…')

      resolve('done')
      await expect(pending).resolves.toBe('done')
      expect(getAll(Selectors.ns).length).toBe(0)
    })

    it('hides and rethrows when the job rejects', async () => {
      const failing = ns.show([
        'Working…',
        () => Promise.reject(new Error('boom')),
      ])

      await expect(failing).rejects.toThrow('boom')
      expect(getAll(Selectors.ns).length).toBe(0)
    })

    it('runs an array of pairs sequentially, updating the label per job', async () => {
      const labels: (string | undefined)[] = []
      const currentLabel = () => get(Selectors.nsText)?.textContent ?? undefined

      const results = await ns.show([
        [
          'Step one',
          async () => {
            labels.push(currentLabel())
            return 1
          },
        ],
        [
          'Step two',
          async () => {
            labels.push(currentLabel())
            return 'two'
          },
        ],
        [
          'Step three',
          async () => {
            labels.push(currentLabel())
            return true
          },
        ],
      ])

      expect(results).toEqual([1, 'two', true])
      expect(labels).toEqual(['Step one', 'Step two', 'Step three'])
      expect(getAll(Selectors.ns).length).toBe(0)
      expectTypeOf(results).toEqualTypeOf<[number, string, boolean]>()
    })

    it('reuses a single splash element across the sequence', async () => {
      let firstElement: Element | null = null
      let secondElement: Element | null = null

      await ns.show([
        [
          'A',
          async () => {
            firstElement = get(Selectors.ns)
          },
        ],
        [
          'B',
          async () => {
            secondElement = get(Selectors.ns)
          },
        ],
      ])

      expect(firstElement).toBeTruthy()
      expect(firstElement).toBe(secondElement)
    })

    it('fails fast: later jobs never start after a rejection', async () => {
      const ran: string[] = []

      const failing = ns.show([
        [
          'One',
          async () => {
            ran.push('one')
            return 1
          },
        ],
        [
          'Two',
          async () => {
            ran.push('two')
            throw new Error('boom')
          },
        ],
        [
          'Three',
          async () => {
            ran.push('three')
            return 3
          },
        ],
      ])

      await expect(failing).rejects.toThrow('boom')
      expect(ran).toEqual(['one', 'two'])
      expect(getAll(Selectors.ns).length).toBe(0)
    })

    it('shows spinner only when a pair has empty text', async () => {
      const seenText: (boolean | null)[] = []
      const textVisible = () => get(Selectors.nsText) !== null

      await ns.show([
        null,
        async () => {
          seenText.push(textVisible())
        },
      ])
      await ns.show([
        '',
        async () => {
          seenText.push(textVisible())
        },
      ])
      await ns.show([
        undefined,
        async () => {
          seenText.push(textVisible())
        },
      ])

      expect(seenText).toEqual([false, false, false])
    })

    it('drops the text mid-sequence when a later pair has empty text', async () => {
      const states: boolean[] = []
      const textVisible = () => get(Selectors.nsText) !== null

      await ns.show([
        [
          'Step one',
          async () => {
            states.push(textVisible())
          },
        ],
        [
          null,
          async () => {
            states.push(textVisible())
          },
        ],
      ])

      expect(states).toEqual([true, false])
    })

    it('resolves an empty array without showing a splash', async () => {
      await expect(ns.show([])).resolves.toEqual([])
      expect(getAll(Selectors.ns).length).toBe(0)
    })

    it('still runs jobs when the container cannot be resolved', async () => {
      const result = await ns.show(['X', async () => 42], '#missing')

      expect(result).toBe(42)
      expect(getAll(Selectors.ns).length).toBe(0)
    })
  })

  describe('accessibility', () => {
    it('marks the splash as a polite live status region', () => {
      ns.show('Loading…')
      const element = get(Selectors.ns) as HTMLElement

      expect(element.getAttribute('role')).toBe('status')
      expect(element.getAttribute('aria-live')).toBe('polite')
      expect(element.querySelector('svg')?.getAttribute('aria-hidden')).toBe(
        'true',
      )
    })

    it('toggles aria-busy on the host element', () => {
      const container = div('container')
      document.body.append(container)

      const id = ns.show('Inside', '#container') as number
      expect(container.getAttribute('aria-busy')).toBe('true')

      ns.hide(id)
      expect(container.hasAttribute('aria-busy')).toBe(false)
    })
  })

  describe('theming', () => {
    it('exposes public --ns-* theming hooks in the injected stylesheet', () => {
      ns.show('Themed')
      const css = get('style#ns')?.textContent ?? ''

      for (const hook of [
        '--ns-color',
        '--ns-size',
        '--ns-font',
        '--ns-weight',
        '--ns-bg',
        '--ns-z-index',
        '--ns-blur',
      ]) {
        expect(css).toContain(hook)
      }
    })

    it('respects prefers-reduced-motion in the stylesheet', () => {
      ns.show('Calm')
      const css = get('style#ns')?.textContent ?? ''
      expect(css).toContain('prefers-reduced-motion')
    })
  })

  describe('robustness', () => {
    it('safely removes foreign .ns elements it did not create', () => {
      const rogue = document.createElement('div')
      rogue.className = ClassNames.ns
      document.body.append(rogue)

      expect(() => ns.hide('*')).not.toThrow()
      expect(getAll(Selectors.ns).length).toBe(0)
    })
  })

  describe('version', () => {
    it('exposes the version from package.json', () => {
      expect(typeof ns.version).toBe('string')
      expect(ns.version).toMatch(/^\d+\.\d+\.\d+/)
    })
  })
})
