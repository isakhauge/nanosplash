import { describe, it, test, expect, beforeEach } from 'vitest'
import { useNs } from '../src/ts/Nanosplash'
import { JSDOM } from 'jsdom'
import { NanosplashInterface } from '../src/ts/types/NanosplashInterface'

let document: Document | null = null
let ns: NanosplashInterface | null = null

beforeEach(() => {
	const dom = new JSDOM()
	// @ts-ignore
	globalThis.window = dom.window
	document = globalThis.document = dom.window.document
	ns = globalThis.window.ns = useNs()
})

describe('Nanosplash API', () => {
	it('should be defined', () => {
		expect(window.ns).toBeDefined()
	})

	it('should have the "show" method', () => {
		expect(window.ns.show).toBeDefined()
	})

	it('should have the "hide" method', () => {
		expect(window.ns.hide).toBeDefined()
	})

	it('should have the global instance', () => {
		expect(window.ns).toBe(ns)
	})
})
