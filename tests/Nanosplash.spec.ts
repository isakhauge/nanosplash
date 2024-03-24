import { describe, it, expect } from 'vitest'
import { useNs } from '../src/ts/Nanosplash'
import { NSElement } from '../src/ts/types/Types'

const ns = (window.ns = useNs())
const allNs = () => Array.from(document.querySelectorAll('.ns')) as NSElement[]
const nsCount = () => allNs().length

const div = (id: string) => {
	const node = document.createElement('div')
	node.id = id
	return node
}

describe('Nanosplash API in Window', () => {
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

describe.sequential('Nanosplash API Functionality', () => {
	describe.sequential('show / hide cleanup', () => {
		it('should make the body host', () => {
			const id = ns.show()
			const bod = document.body
			const bodyIsHost = bod.classList.contains('nsh')
			expect(bodyIsHost).toBe(true)
			ns.hide(id as number)
		})

		it('should create a Nanosplash element', () => {
			const id = ns.show()
			const nsElement = document.querySelector('body > .ns') as NSElement
			expect(nsElement).toBeInstanceOf(HTMLDivElement)
			ns.hide(id as number)
		})

		it('should have the correct internal ID', () => {
			const id = ns.show()
			const nsElement = document.querySelector('body > .ns') as NSElement
			expect(id).toBe(nsElement.nsId)
			ns.hide(id as number)
		})

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
		})

		it('should remove the Nanosplash element from DOM', () => {
			const id = ns.show()
			const nsElement = document.querySelector('body > .ns') as NSElement
			ns.hide(id as number)
			expect(nsElement?.isConnected).toBe(false)
		})
	})

	describe('show()', () => {
		it('should inject a Nanosplash in the body element', () => {
			const id = ns.show()
			const elements = allNs() as NSElement[]
			const element = elements.find((v: NSElement) => v.nsId === id)
			expect(element).toBeInstanceOf(HTMLDivElement)
			ns.hide(id as number)
		})

		it('should only display a spinner', () => {
			const id = ns.show()
			const nst = document.querySelector('.ns > .nst')
			const nss = document.querySelector('.ns > .nss')
			expect(nst).toBeNull()
			expect(nss).toBeInstanceOf(HTMLDivElement)
			ns.hide(id as number)
		})
	})

	describe('hide()', () => {
		it('should hide in FIFO order', () => {
			document.body.append(div('a'), div('b'), div('c'), div('d'))

			ns.show(null, '#a')
			ns.show(null, '#b')
			ns.show(null, '#c')
			ns.show(null, '#d')

			const theseExist = (...ids: string[]) =>
				ids.every(id => document.querySelector(id))

			expect(theseExist('#a', '#b', '#c', '#d')).toBe(true)
			ns.hide()
			expect(theseExist('#b', '#c', '#d')).toBe(true)
			ns.hide()
			expect(theseExist('#c', '#d')).toBe(true)
			ns.hide()
			expect(theseExist('#d')).toBe(true)
			ns.hide()

			expect(nsCount()).toBe(0)
			document.querySelectorAll('#a, #b, #c, #d').forEach(node => node.remove())
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
			a.remove()
			b.remove()
			ns.hide()
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

			document.querySelectorAll('#a, #b, #c').forEach(node => node.remove())
		})
	})
})
