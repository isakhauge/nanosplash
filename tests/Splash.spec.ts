import { describe, it, expect, beforeEach } from 'vitest'
import { Splash } from '../src/ts/core/Splash'
import { resetDOM } from './TestUtilities'

resetDOM()

describe('Splash', () => {
	// Reset the DOM before each test
	beforeEach(() => {
		resetDOM()
	})

	it('Should be a valid Splash element', () => {
		const ns = new Splash()
		const element = ns.getElement() as HTMLElement

		// The element should be a valid HTMLDivElement
		expect(element).not.toBeUndefined()
		expect(element).toBeInstanceOf(HTMLDivElement)

		// The element and the splash instance should have the same ID
		expect(element.id).toBe(ns.getId())

		// The element should have the main Nanosplash CSS class
		expect(element.classList.contains(Splash.NSClass)).toBe(true)

		// The element should have the correct, inner structure
		const textSelector = '.nsc > .nst'
		const spinnerSelector = '.nsc > .nss'
		const textElement = element.querySelector(textSelector)
		const spinnerElement = element.querySelector(spinnerSelector)
		expect(textElement).not.toBeNull()
		expect(spinnerElement).not.toBeNull()
	})

	it('Should be able to set text', () => {
		const ns = new Splash()
		const text = 'Hello World!'
		ns.setText(text)
		expect(ns.getTextElement().innerText).toBe(text)
	})

	it('Should be able to hide text', () => {
		const ns = new Splash()
		ns.hideText()
		expect(ns.getTextElement().style.display).toBe('none')
	})

	it('Should be able to show text', () => {
		const ns = new Splash()
		ns.setText('Hello World!')
		ns.hideText()
		ns.showText()
		expect(ns.getTextElement().style.display).toBe('flex')
	})

	it('Should be able to remove itself from DOM', () => {
		const ns = new Splash()
		const deleteResult = ns.delete()
		const element = ns.getElement()
		expect(deleteResult).toBe(true)
		expect(element).toBeNull()
	})
})
