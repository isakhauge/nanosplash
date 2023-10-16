import { beforeEach, expect, describe, it } from 'vitest'
import { Service } from '../src/ts/core/Service'
import { Splash } from '../src/ts/core/Splash'
import { GUIDString } from '../src/ts/types/Types'
import { ExpectedParsedValues, div, resetDOM } from './TestUtilities'

resetDOM()

declare global {
	interface Window {
		ns: Service
	}
}

describe('NanosplashService', () => {
	// Reset the DOM before each test
	beforeEach(() => {
		resetDOM()
	})

	it('Should be able to create an instance', () => {
		const nss = Service.getInstance()
		expect(nss).toBeInstanceOf(Service)
	})

	it('Should be a valid singleton instance', () => {
		const nss1 = Service.getInstance()
		const nss2 = Service.getInstance()
		expect(nss1).toBe(nss2)
	})

	it('Should be able to start the service and attach it to Window', () => {
		Service.start()
		const nss = Service.getInstance()
		expect(nss).toBe(window.ns)
	})

	it('Should be able to show a Nanosplash in the browser window', () => {
		const text = 'Hello World!'
		const nss = Service.getInstance()
		const nsId = <GUIDString>nss.show(text)

		// Compare the elements:
		const element = document.getElementById(nsId)
		const splash = nss.nsQueue.get(nsId)
		expect(element).toBe(splash?.getElement())

		// Compare the text:
		const nsText = splash?.getTextElement().innerText
		expect(nsText).toBe(text)
	})

	it('Should be able to show a Nanosplash over a given element', () => {
		const id = 'test-id'
		const text = 'Hello World!'
		const destination = document.createElement('div')

		// Assign ID and append to DOM
		destination.id = id
		document.body.appendChild(destination)

		const nss = Service.getInstance()

		// Show Splash inside element
		const nsId = nss.showInside(`#${id}`, text)

		// Get element from DOM with the same ID
		const element = document.getElementById(<string>nsId)

		// Get Splash instance from NS Service with the same ID
		const ns = nss.nsQueue.get(<string>nsId)

		// Compare the two
		expect(element).toBe(ns?.getElement())

		// Compare the text
		const nsText = ns?.getTextElement().innerText
		expect(nsText).toBe(text)
	})

	it('Should be able to hide a Splash', () => {
		const nss = Service.getInstance()
		const nsId = <GUIDString>nss.show()
		nss.hide()
		const splash = nss.nsQueue.get(nsId)
		expect(splash).toBeUndefined()
	})

	it('Should be able to hide multiple Splashes in FIFO-order', () => {
		document.body.append(div('a'), div('b'), div('c'))

		const nss = Service.getInstance()
		const a = nss.showInside('#a', 'A')
		const b = nss.showInside('#b', 'B')
		const c = nss.showInside('#c', 'C')

		expect(nss.nsQueue.size).toBe(3)

		nss.hide()
		expect(nss.nsQueue.size).toBe(2)
		expect(nss.nsQueue.get(a as string)).toBeUndefined()
		expect(nss.nsQueue.get(b as string)).toBeInstanceOf(Splash)
		expect(nss.nsQueue.get(c as string)).toBeInstanceOf(Splash)

		nss.hide()
		expect(nss.nsQueue.size).toBe(1)
		expect(nss.nsQueue.get(a as string)).toBeUndefined()
		expect(nss.nsQueue.get(b as string)).toBeUndefined()
		expect(nss.nsQueue.get(c as string)).toBeInstanceOf(Splash)

		nss.hide()
		expect(nss.nsQueue.size).toBe(0)
		expect(nss.nsQueue.get(a as string)).toBeUndefined()
		expect(nss.nsQueue.get(b as string)).toBeUndefined()
		expect(nss.nsQueue.get(c as string)).toBeUndefined()
	})

	it('Should be able to hide all Nanosplashes', () => {
		document.body.append(div('a'), div('b'), div('c'))

		const nss = Service.getInstance()

		nss.hideAll() // Reset the queue
		expect(nss.nsQueue.size).toBe(0)

		// Add three Nanosplashes to the queue
		nss.showInside('#a', 'A')
		nss.showInside('#b', 'B')
		nss.showInside('#c', 'C')

		// Expect the queue to have three items
		expect(nss.nsQueue.size).toBe(3)

		// Hide all Nanosplashes
		nss.hideAll()

		// Expect the queue to be empty
		expect(nss.nsQueue.size).toBe(0)
	})

	it('Should be able to hide a Nanosplash based on its ID', () => {
		const nss = Service.getInstance()
		const nsId = <GUIDString>nss.show()
		nss.hideId(nsId)
		const splash = nss.nsQueue.get(nsId)
		expect(splash).toBeUndefined()
	})

	it('Should be able to hide a Nanosplash residing inside a given element', () => {
		const id = 'test-id'
		const parent = document.createElement('div')
		parent.id = id
		document.body.appendChild(parent)

		const nss = Service.getInstance()
		const nsId = <GUIDString>nss.showInside(`#${id}`)

		// Confirm existence.
		const element = document.getElementById(<string>nsId)
		expect(element?.parentElement).toBe(parent)

		// Hide using API.
		nss.hideInside(`#${id}`)

		// Confirm non-existence.
		expect(element?.isConnected).toBe(false)
		expect(nss.nsQueue.get(nsId)).toBeUndefined()
	})

	it('Should take any argument as text without breaking', () => {
		const nss = Service.getInstance()

		// Destructure the expected values
		const {
			numValues,
			arrValues,
			objValues,
			boolValues,
			nullValues,
			undefValues,
		} = ExpectedParsedValues

		// Create functions to test the values
		const testValues = (raw: any, parsed: any) => {
			const id = <GUIDString>nss.show(raw)
			const value = nss.nsQueue.get(id)?.getTextElement().innerText
			expect(value).toBe(parsed)
		}

		// Test the values
		testValues(numValues.raw, numValues.parsed)
		testValues(arrValues.raw, arrValues.parsed)
		testValues(objValues.raw, objValues.parsed)
		testValues(boolValues.raw, boolValues.parsed)
		testValues(nullValues.raw, nullValues.parsed)
		testValues(undefValues.raw, undefValues.parsed)
	})
})
