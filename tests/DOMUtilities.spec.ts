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
	elementFrom,
	elementIsNS,
	getRecycledNS,
} from '../src/ts/core/Nanosplash/DOMUtilities'
import { Splash } from '../src/ts/core/Nanosplash/Splash'
import { Service } from '../src/ts/core/Nanosplash/Service'

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
		expect(getClass(contentElement)).toBe('nsc')
		expect(getClass(textElement)).toBe('nst')
		expect(getClass(spinnerElement)).toBe('nss')
	})

	it('Should be able to inject a Nanosplash component', () => {
		const elementA = createElement()
		const elementB = createElement()
		const destinationElement = document.createElement('div')
		injectAsFirstChild(elementA, destinationElement)
		expect(destinationElement.firstElementChild).toBe(elementA)
		injectAsFirstChild(elementB, destinationElement)
		expect(destinationElement.firstElementChild).toBe(elementB)
	})

	it('Should be able to prepare the parent of a Nanosplash component', () => {
		const ns = new Splash()
		const parent = document.createElement('div')
		parent.appendChild(ns.getNSElement())
		prepareParentOf(ns)
		expect(parent.classList.contains(Splash.NSHostClass)).toBe(true)
	})

	it('Should be able to clean the parent of a Nanosplash component', () => {
		const ns = new Splash()
		const parent = document.createElement('div')
		parent.appendChild(ns.getNSElement())
		parent.classList.add(Splash.NSClass)
		cleanNSParentOf(ns)
		expect(parent.classList.contains(Splash.NSHostClass)).toBe(false)
	})

	it('Should be able to convert an element reference to an element', () => {
		const element = document.createElement('div')
		document.body.appendChild(element)
		element.id = 'test-id'
		element.classList.add('test-class')
		element.setAttribute('data-test', 'test')
		expect(elementFrom('#test-id')).toBe(element)
		expect(elementFrom('.test-class')).toBe(element)
		expect(elementFrom('div[data-test="test"]')).toBe(element)
		expect(elementFrom(element)).toBe(element)
	})

	it('Should be able to check if an element is a Nanosplash element', () => {
		const elementA = new Splash().getNSElement()
		const elementB = document.createElement('div')
		expect(elementIsNS(elementA)).toBe(true)
		expect(elementIsNS(elementB)).toBe(false)
	})

	it('Should be able to recycle a Nanosplash component', () => {
		const destination = document.createElement('div')
		document.body.appendChild(destination)
		const nss = Service.getInstance()
		const id = nss.showInside(destination, 'Hello World!')
		const recycled = getRecycledNS(destination)
		expect(recycled?.getId()).toBe(id)
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
		expect(div.classList.contains(Splash.NSHostClass)).toBe(true)
		setNSHostClass(div, 'remove')
		expect(div.classList.contains(Splash.NSHostClass)).toBe(false)
	})

	it('Should be able to move a Nanosplash component', () => {
		const ns = new Splash()
		const destination = document.createElement('div')
		move(ns.getNSElement(), destination)
		expect(destination.firstElementChild).toBe(ns.getNSElement())
	})
})
