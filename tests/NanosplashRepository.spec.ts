// @ts-strict

import { JSDOM } from 'jsdom'
import { beforeEach, describe, expect, it } from 'vitest'
import NanosplashRepository from '../src/ts/core/Nanosplash/repositories/NanosplashRepository'
import Nanosplash from '../src/ts/core/Nanosplash/Nanosplash'
import { mk } from '../src/ts/util/Utilities'

describe('NanosplashRepository', () => {
	// Reset the DOM before each test
	beforeEach(() => {
		const dom = new JSDOM()
		// @ts-ignore
		globalThis.window = dom.window
		globalThis.document = dom.window.document
		globalThis.DOMParser = dom.window.DOMParser
	})

	it('Should be able to create a Nanosplash component', () => {
		const getClass = (element: Element) => element.classList[0]
		const element = NanosplashRepository.createElement()
		const contentElement = <Element>element.firstElementChild
		const textElement = <Element>contentElement.firstElementChild
		const spinnerElement = <Element>textElement.nextElementSibling

		expect(getClass(element)).toBe('ns')
		expect(getClass(contentElement)).toBe('ns-content')
		expect(getClass(textElement)).toBe('ns-text')
		expect(getClass(spinnerElement)).toBe('ns-spinner')
	})

	it('Should be able to inject a Nanosplash component', () => {
		const element = NanosplashRepository.createElement()
		const destinationElement = document.createElement('div')
		NanosplashRepository.inject(element, destinationElement)
		expect(destinationElement.firstElementChild).toBe(element)
	})

	it('Should be able to prepare the parent of a Nanosplash component', () => {
		const ns = new Nanosplash()
		const parent = document.createElement('div')
		parent.appendChild(ns.getNSElement())
		NanosplashRepository.prepareParentOf(ns)
		expect(parent.classList.contains(Nanosplash.nsHostClassName)).toBe(true)
	})

	it('Should be able to clean the parent of a Nanosplash component', () => {
		const ns = new Nanosplash()
		const parent = document.createElement('div')
		parent.appendChild(ns.getNSElement())
		parent.classList.add(Nanosplash.nsHostClassName)
		NanosplashRepository.cleanNSParentOf(ns)
		expect(parent.classList.contains(Nanosplash.nsHostClassName)).toBe(false)
	})

	it('Should be able to show an element', () => {
		const element = document.createElement('div')
		NanosplashRepository.showElement(element)
		expect(element.style.display).toBe('flex')
	})

	it('Should be able to hide an element', () => {
		const element = document.createElement('div')
		NanosplashRepository.hideElement(element)
		expect(element.style.display).toBe('none')
	})

	it('Should be able to alter the class of a Nanosplash host', () => {
		const div = mk('div')
		NanosplashRepository.setNSHostClass(div, 'add')
		expect(div.classList.contains(Nanosplash.nsHostClassName)).toBe(true)
		NanosplashRepository.setNSHostClass(div, 'remove')
		expect(div.classList.contains(Nanosplash.nsHostClassName)).toBe(false)
	})

	it('Should be able to move a Nanosplash component', () => {
		const ns = new Nanosplash()
		const destination = document.createElement('div')
		NanosplashRepository.move(ns.getNSElement(), destination)
		expect(destination.firstElementChild).toBe(ns.getNSElement())
	})
})
