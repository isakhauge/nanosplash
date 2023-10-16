import { beforeEach, describe, expect, it } from 'vitest'
import { JSDOM } from 'jsdom'
import { Splash } from '../src/ts/core/Splash'

const rgx = /^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/

describe('Guid', () => {
	// Reset the DOM before each test
	beforeEach(() => {
		const dom = new JSDOM()
		// @ts-ignore
		globalThis.window = dom.window
		globalThis.document = dom.window.document
		globalThis.DOMParser = dom.window.DOMParser
	})

	it('Should generate a valid GUID', () => {
		const value = new Splash().getId()
		expect(value).toMatch(rgx)
	})
})
