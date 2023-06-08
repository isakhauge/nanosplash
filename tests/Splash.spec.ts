// @ts-strict

import { describe, it, expect, beforeEach } from 'vitest'
import { JSDOM } from 'jsdom'
import { Splash } from '../src/ts/core/Nanosplash/Splash'

describe('Splash', () => {
	// Reset the DOM before each test
	beforeEach(() => {
		const dom = new JSDOM()
		// @ts-ignore
		globalThis.window = dom.window
		globalThis.document = dom.window.document
		globalThis.DOMParser = dom.window.DOMParser
	})

	it('Should be a valid Splash', () => {
		const ns = new Splash()
		const element = ns.getNSElement()

		expect(element).not.toBeUndefined()
		expect(element.id).toBe(ns.getId())
		expect(element.classList.contains(Splash.NSClass)).toBe(true)

		const contentElement = ns.getNSContentElement()
		expect(contentElement).not.toBeUndefined()

		const textElement = ns.getNSTextElement()
		expect(textElement).not.toBeUndefined()

		const spinnerElement = <HTMLElement>textElement.nextElementSibling
		expect(spinnerElement).not.toBeUndefined()

		const spinnerSVGElement = <HTMLElement>spinnerElement.firstElementChild
		expect(spinnerSVGElement).not.toBeUndefined()
	})

	it('Should be able to set text', () => {
		const ns = new Splash()
		const text = 'Hello World!'
		ns.setText(text)
		expect(ns.getNSTextElement().innerText).toBe(text)
	})

	it('Should be able to hide text', () => {
		const ns = new Splash()
		ns.hideText()
		expect(ns.getNSTextElement().style.display).toBe('none')
	})

	it('Should be able to show text', () => {
		const ns = new Splash()
		ns.setText('Hello World!')
		ns.hideText()
		ns.showText()
		expect(ns.getNSTextElement().style.display).toBe('flex')
	})

	it('Should be able to remove itself from DOM', () => {
		const ns = new Splash()
		ns.remove()
		expect(ns.getNSElement()).toBeUndefined()
	})
})
