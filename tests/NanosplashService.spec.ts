// @ts-strict

import { JSDOM } from 'jsdom'
import { beforeEach, describe, expect, it } from 'vitest'
import NanosplashService from '../src/ts/core/Nanosplash/services/NanosplashService'
import Nanosplash from '../src/ts/core/Nanosplash/Nanosplash'

describe('NanosplashService', () => {
	// Reset the DOM before each test
	beforeEach(() => {
		const dom = new JSDOM()
		// @ts-ignore
		globalThis.window = dom.window
		globalThis.document = dom.window.document
		globalThis.DOMParser = dom.window.DOMParser
	})

	it('Should be able to create an instance', () => {
		const nss = NanosplashService.getInstance()
		expect(nss).toBeInstanceOf(NanosplashService)
	})

	it('Should be able to get the same singleton instance', () => {
		const nss1 = NanosplashService.getInstance()
		const nss2 = NanosplashService.getInstance()
		expect(nss1).toBe(nss2)
	})

	it('Should be able to start the service', () => {
		NanosplashService.start()
		expect(window.ns2).toBeInstanceOf(NanosplashService)
	})

	it('Should be able to retrieve an existing Nanosplash instance from a destination node', () => {
		const destinationNode = document.createElement('div')
		document.body.appendChild(destinationNode)
		destinationNode.id = 'test-id'
		const nsInstance1 = NanosplashService.getNSInstance(destinationNode)
		expect(nsInstance1).toBeInstanceOf(Nanosplash)
		const nss = NanosplashService.getInstance()
		let nsId = nss.showInside('erroneous-selector', 'Hello World!')
		expect(nsId).toBeNull()
		nsId = nss.showInside('div[id="test-id"]', 'Hello World!')
		const nsInstance2 = NanosplashService.getNSInstance(destinationNode)
		expect(nsInstance2.getId()).toBe(nsId)
		expect(nsInstance2).toBeInstanceOf(Nanosplash)
	})

	it('Should be able to show a Nanosplash in the browser window', () => {
		const nss = NanosplashService.getInstance()
		const text = 'Hello World!'
		const nsId = nss.show(text)
		const element = document.getElementById(nsId)
		const ns = NanosplashService.fromStackId(nsId)
		const nsText = ns?.getNSTextElement().innerText
		expect(element).toBe(ns?.getNSElement())
		expect(nsText).toBe(text)
	})

	it('Should be able to show a Nanosplash over a given element', () => {
		const nss = NanosplashService.getInstance()
		const text = 'Hello World!'
		const destination = document.createElement('div')
		destination.id = 'test-id'
		document.body.appendChild(destination)
		const nsId = <string>nss.showInside('#test-id', text)
		const element = document.getElementById(nsId)
		const ns = NanosplashService.fromStackId(nsId)
		const nsText = ns?.getNSTextElement().innerText
		expect(element).toBe(ns?.getNSElement())
		expect(nsText).toBe(text)
	})

	it('Should be able to hide a Nanosplash', () => {
		const nss = NanosplashService.getInstance()
		const nsId = nss.show()
		nss.hide()
		const ns = NanosplashService.fromStackId(nsId)
		expect(ns?.getNSElement()).toBeUndefined()
	})

	it('Should be able to hide a Nanosplash based on its ID', () => {
		const nss = NanosplashService.getInstance()
		const nsId = nss.show()
		nss.hideId(nsId)
		const ns = NanosplashService.fromStackId(nsId)
		expect(ns?.getNSElement()).toBeUndefined()
	})

	it('Should be able to hide a Nanosplash residing inside a given element', () => {
		const nss = NanosplashService.getInstance()
		const destination = document.createElement('div')
		destination.id = 'test-id'
		document.body.appendChild(destination)
		let nsId = nss.showInside('#test-id')
		nsId = nss.hideInside('erroneous-selector')
		expect(nsId).toBeNull()
		nsId = <string>nss.hideInside('#test-id')
		const ns = NanosplashService.fromStackId(nsId)
		expect(ns?.getNSElement()).toBeUndefined()
	})
})
