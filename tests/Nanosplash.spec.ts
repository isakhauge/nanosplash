import { describe, it, test, expect, beforeEach } from 'vitest'
import { useNs } from '../src/ts/Nanosplash'
import { JSDOM } from 'jsdom'

let ns

beforeEach(() => {
	const dom = new JSDOM()
	// @ts-ignore
	globalThis.window = dom.window
	globalThis.document = window.document
	globalThis.window.ns = ns = useNs()
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

	it('should have the "hideAll" method', () => {
		expect(window.ns.hideAll).toBeDefined()
	})

	it('should have the global instance', () => {
		expect(window.ns).toBe(ns)
	})
})
