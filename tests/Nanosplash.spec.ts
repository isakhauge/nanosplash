import { describe, it, expect } from 'vitest'
import { useNs } from '../src/ts/Nanosplash'
import { NSElement } from '../src/ts/types/Types'

const ns = (window.ns = useNs())
const get = (selector: string) => document.querySelector(selector)
const getAll = (selector: string) =>
	Array.from(document.querySelectorAll(selector))
const allNs = () => getAll('.ns') as NSElement[]
const nsCount = () => allNs().length

const div = (id: string) => {
	const node = document.createElement('div')
	node.id = id
	return node
}

describe('Global access', () => {
	it('should have "ns"', () => {
		expect(window.ns).toBeDefined()
		expect(window.ns).toBe(ns)
	})

	it('should have the "ns.show" function', () => {
		expect(window.ns.show).toBeDefined()
		expect(window.ns.show).toBeTypeOf('function')
	})

	it('should have the "ns.hide" function', () => {
		expect(window.ns.hide).toBeDefined()
		expect(window.ns.hide).toBeTypeOf('function')
	})
})

describe('useNs hook', () => {
	it('should return the Nanosplash API', () => {
		const instance = useNs()
		expect(instance.show).toBeTypeOf('function')
		expect(instance.hide).toBeTypeOf('function')
	})
})

describe('Nanosplash API', () => {
	describe('show / hide cleanup', () => {
		describe('show', () => {
			it('should make the body host', () => {
				const id = ns.show()
				const bod = document.body
				const bodyIsHost = bod.classList.contains('nsh')
				expect(bodyIsHost).toBe(true)
				ns.hide(id as number)
				expect(nsCount()).toBe(0)
			})

			it('should create a Nanosplash element', () => {
				const id = ns.show()
				const nsElement = get('body > .ns') as NSElement
				expect(nsElement).toBeInstanceOf(HTMLDivElement)
				ns.hide(id as number)
				expect(nsCount()).toBe(0)
			})

			it('should have the correct internal ID', () => {
				const id = ns.show()
				const nsElement = get('body > .ns') as NSElement
				expect(id).toBe(nsElement.nsId)
				ns.hide(id as number)
				expect(nsCount()).toBe(0)
			})
		})

		describe('hide', () => {
			it('should be able to hide the element', () => {
				const id = ns.show()
				expect(nsCount()).toBeGreaterThan(0)
				ns.hide(id as number)
				expect(nsCount()).toBe(0)
			})

			it('should undo body as host', () => {
				const id = ns.show()
				ns.hide(id as number)
				const bodyIsNoLongerHost = document.body.classList.contains('nsh')
				expect(bodyIsNoLongerHost).toBe(false)
				expect(nsCount()).toBe(0)
			})

			it('should remove the Nanosplash element from DOM', () => {
				const id = ns.show()
				const nsElement = get('body > .ns') as NSElement
				ns.hide(id as number)
				expect(nsElement?.isConnected).toBe(false)
				expect(nsCount()).toBe(0)
			})
		})
	})

	describe('show()', () => {
		it('should inject a Nanosplash in the body element', () => {
			const id = ns.show()
			const elements = allNs() as NSElement[]
			const element = elements.find((v: NSElement) => v.nsId === id)
			expect(element).toBeInstanceOf(HTMLDivElement)
			ns.hide(id as number)
			expect(nsCount()).toBe(0)
		})

		it('should only display a spinner', () => {
			const id = ns.show()
			const nst = get('.ns > .nst')
			const nss = get('.ns > .nss')
			expect(nst).toBeNull()
			expect(nss).toBeInstanceOf(HTMLDivElement)
			ns.hide(id as number)
			expect(nsCount()).toBe(0)
		})

		it('should recycle elements', () => {
			const idFirst = ns.show()
			const idSecond = ns.show()
			expect(nsCount()).toBe(1)
			expect(idFirst).toBe(idSecond)
			ns.hide()
			ns.hide()
			expect(nsCount()).toBe(0)
		})
	})

	describe('show("foo", "#bar")', () => {
		it('should display text inside #bar', () => {
			const bar = div('bar')
			document.body.append(bar)
			const id = ns.show('foo', '#bar')
			expect(nsCount()).toBe(1)
			const selector = '#bar.nsh > .ns > .nst'
			const nst = get(selector)
			expect(nst).toBeInstanceOf(HTMLDivElement)
			expect((nst as HTMLDivElement).innerHTML).toBe('foo')
			ns.hide(id as number)
			bar.remove()
			expect(nsCount()).toBe(0)
		})
	})

	describe('hide()', () => {
		it('should hide in FIFO order', () => {
			document.body.append(div('a'), div('b'), div('c'), div('d'))

			ns.show(null, '#a')
			ns.show(null, '#b')
			ns.show(null, '#c')
			ns.show(null, '#d')

			const theseExist = (...ids: string[]) => ids.every(id => get(id))

			expect(theseExist('#a', '#b', '#c', '#d')).toBe(true)
			ns.hide()
			expect(theseExist('#b', '#c', '#d')).toBe(true)
			ns.hide()
			expect(theseExist('#c', '#d')).toBe(true)
			ns.hide()
			expect(theseExist('#d')).toBe(true)
			ns.hide()

			expect(nsCount()).toBe(0)
			getAll('#a, #b, #c, #d').forEach(node => node.remove())
			expect(nsCount()).toBe(0)
		})
	})

	describe('hide(id)', () => {
		it('should delete a specific Nanosplash', () => {
			const a = div('a')
			const b = div('b')
			document.body.append(a, b)
			const idA = ns.show(null, '#a')
			const idB = ns.show(null, '#b')
			const bothExist = allNs().every(node => [idA, idB].includes(node.nsId))
			expect(bothExist).toBe(true)
			expect(nsCount()).toBe(2)
			ns.hide(idB as number)
			expect(nsCount()).toBe(1)
			expect(allNs()[0].nsId).toBe(idA)
			ns.hide(idA as number)
			a.remove()
			b.remove()
			expect(nsCount()).toBe(0)
		})
	})

	describe('hide(*)', () => {
		it('should hide all Nanosplashes', () => {
			document.body.append(div('a'), div('b'), div('c'))

			ns.show(null, '#a')
			ns.show(null, '#b')
			ns.show(null, '#c')

			expect(nsCount()).toBe(3)
			ns.hide('*')
			expect(nsCount()).toBe(0)

			getAll('#a, #b, #c').forEach(node => node.remove())
			expect(nsCount()).toBe(0)
		})
	})
})
