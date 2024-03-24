import { describe, it, expect, beforeEach } from 'vitest'
import { useNs } from '../src/ts/Nanosplash'

const ns = (window.ns = useNs(window))

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
