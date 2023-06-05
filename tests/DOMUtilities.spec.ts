// @ts-strict

import { JSDOM } from 'jsdom'
import { beforeEach, describe, expect, it } from 'vitest'
import {
	createElement,
	injectAsFirstChild,
	prepareParentOf,
	cleanNSParentOf,
	showElement,
	hideElement,
	setNSHostClass,
	move,
} from '../src/ts/core/Nanosplash/DOMUtilities'
import { Nanosplash } from '../src/ts/core/Nanosplash/Nanosplash'

describe('DOMUtilities', () => {
	// Reset the DOM before each test
	beforeEach(() => {
		const dom = new JSDOM()
		// @ts-ignore
		globalThis.window = dom.window
		globalThis.document = dom.window.document
		globalThis.DOMParser = dom.window.DOMParser
		globalThis.Element = dom.window.Element
	})

	it('Should be able to create a Nanosplash component', () => {
		const getClass = (element: Element) => element.classList[0]
		const element = createElement()
		const contentElement = <Element>element.firstElementChild
		const textElement = <Element>contentElement.firstElementChild
		const spinnerElement = <Element>textElement.nextElementSibling

		expect(getClass(element)).toBe('ns')
		expect(getClass(contentElement)).toBe('ns-content')
		expect(getClass(textElement)).toBe('ns-text')
		expect(getClass(spinnerElement)).toBe('ns-spinner')
	})

	it('Should be able to inject a Nanosplash component', () => {
		const element = createElement()
		const destinationElement = document.createElement('div')
		injectAsFirstChild(element, destinationElement)
		expect(destinationElement.firstElementChild).toBe(element)
	})

	it('Should be able to prepare the parent of a Nanosplash component', () => {
		const ns = new Nanosplash()
		const parent = document.createElement('div')
		parent.appendChild(ns.getNSElement())
		prepareParentOf(ns)
		expect(parent.classList.contains(Nanosplash.HostCSSClassName)).toBe(true)
	})

	it('Should be able to clean the parent of a Nanosplash component', () => {
		const ns = new Nanosplash()
		const parent = document.createElement('div')
		parent.appendChild(ns.getNSElement())
		parent.classList.add(Nanosplash.CSSClassName)
		cleanNSParentOf(ns)
		expect(parent.classList.contains(Nanosplash.HostCSSClassName)).toBe(false)
	})

	it('Should be able to show an element', () => {
		const element = document.createElement('div')
		showElement(element)
		expect(element.style.display).toBe('flex')
	})

	it('Should be able to hide an element', () => {
		const element = document.createElement('div')
		hideElement(element)
		expect(element.style.display).toBe('none')
	})

	it('Should be able to alter the class of a Nanosplash host', () => {
		const div = document.createElement('div')
		setNSHostClass(div, 'add')
		expect(div.classList.contains(Nanosplash.HostCSSClassName)).toBe(true)
		setNSHostClass(div, 'remove')
		expect(div.classList.contains(Nanosplash.HostCSSClassName)).toBe(false)
	})

	it('Should be able to move a Nanosplash component', () => {
		const ns = new Nanosplash()
		const destination = document.createElement('div')
		move(ns.getNSElement(), destination)
		expect(destination.firstElementChild).toBe(ns.getNSElement())
	})
})
