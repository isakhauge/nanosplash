import { describe, it, expect, beforeEach } from 'vitest'
import {useNs} from "@/composables/ns";
import type {INSElement} from "@/types/interfaces/INSElement";
import {Selectors} from "@/constants/ns";

const get = (selector: string) => document.querySelector(selector)
const getAll = (selector: string) => document.querySelectorAll(selector)
const div = (id?: string) => {
    const element: HTMLDivElement = document.createElement("div")
    if (id) {
        element.id = id
    }
    return element
}

describe('useNs', () => {
    let ns: ReturnType<typeof useNs>

    beforeEach(() => {
        // Reset DOM
        document.body.innerHTML = ''
        ns = useNs()
    })

    describe('show', () => {
        it('creates a new Nanosplash with text', () => {
            const id = ns.show('Loading...')
            const nsElement = get(Selectors.ns)
            const textElement = nsElement?.querySelector(Selectors.nsText)
            const spinnerElement = nsElement?.querySelector(Selectors.nsSpinner)

            expect(nsElement).toBeTruthy()
            expect(textElement?.textContent).toBe('Loading...')
            expect(spinnerElement).toBeTruthy()
            expect(typeof id).toBe('number')
        })

        it('creates a new Nanosplash without text', () => {
            const id = ns.show()
            const nsElement = get(Selectors.ns)
            const textElement = nsElement?.querySelector(Selectors.nsText)
            expect(nsElement).toBeTruthy()
            expect(textElement?.textContent).toBe(undefined)
            expect(typeof id).toBe('number')
        })

        it('places Nanosplash inside a specified element', () => {
            const container = div('container')
            document.body.append(container)

            ns.show('Inside', '#container')
            const hostElement = container.querySelector(Selectors.ns)
            expect(hostElement).toBeTruthy()
        })

        it('reuses an existing Nanosplash in the same container', () => {
            ns.show('A')
            const firstElement = get(Selectors.ns) as INSElement
            const firstId = firstElement.nsId

            ns.show('B')
            const secondElement = get(Selectors.ns) as INSElement
            const secondId = secondElement.nsId
            
            const nsElements = getAll(Selectors.ns)
            expect(firstId).toBe(secondId)
            expect(nsElements.length).toBe(1)
        })
    })

    describe('hide', () => {
        it('removes the oldest Nanosplash element (FIFO)', () => {
            document.body.append(div('a'), div('b'))
            ns.show('A', '#a')
            ns.show('B', '#b')
            expect(getAll(Selectors.ns).length).toBe(2)
            ns.hide()
            expect(getAll(Selectors.ns).length).toBe(1)
            expect(get(Selectors.nsText)?.textContent).toBe('B')
        })

        it('removes a specific Nanosplash by ID', () => {
            document.body.append(div('a'), div('b'))
            const idA = ns.show('A', '#a') as number
            ns.show('B', '#b')
            expect(getAll(Selectors.ns).length).toBe(2)
            ns.hide(idA)
            expect(getAll(Selectors.ns).length).toBe(1)
            expect(get(Selectors.nsText)?.textContent).toBe('B')
        })

        it('removes all Nanosplash elements when given "*"', () => {
            ns.show('One')
            ns.show('Two')
            ns.hide('*')
            expect(getAll(Selectors.ns).length).toBe(0)
        })
    })

    describe('style injection', () => {
        it('injects the style element into the document', () => {
            const styleElement = get('style#ns')
            expect(styleElement).toBeTruthy()
            expect(styleElement).toBeInstanceOf(HTMLStyleElement)
        })

        it('replaces an existing style element when re-invoked', () => {
            const oldStyleElement = get('style#ns') as HTMLElement
            useNs()
            const newStyleElement = get('style#ns') as HTMLElement

            expect(newStyleElement).toBeTruthy()
            expect(newStyleElement).not.toBe(oldStyleElement)
        })
    })

    describe('version', () => {
        it('exposes the version from package.json', () => {
            expect(typeof ns.version).toBe('string')
            expect(ns.version).toMatch(/^\d+\.\d+\.\d+/)
        })
    })
})