import { JSDOM } from 'jsdom'
import { Service } from '../src/ts/core/Service'

export function resetDOM() {
	const dom = new JSDOM()
	// @ts-ignore
	globalThis.window = dom.window
	globalThis.document = dom.window.document
	globalThis.DOMParser = dom.window.DOMParser
	globalThis.Node = dom.window.Node
	globalThis.Element = dom.window.Element
	globalThis.HTMLElement = dom.window.HTMLElement
	globalThis.HTMLDivElement = dom.window.HTMLDivElement
	Service.getInstance().hideAll()
}

export function div(id: string): HTMLDivElement {
	const div = document.createElement('div')
	div.id = id
	return div
}

export const ExpectedParsedValues = {
	numValues: {
		raw: 123,
		parsed: '123',
	},
	arrValues: {
		raw: [1, 2, 3],
		parsed: '1,2,3',
	},
	objValues: {
		raw: {},
		parsed: '[object Object]',
	},
	boolValues: {
		raw: true,
		parsed: 'true',
	},
	nullValues: {
		raw: null,
		parsed: '',
	},
	undefValues: {
		raw: undefined,
		parsed: '',
	},
}
