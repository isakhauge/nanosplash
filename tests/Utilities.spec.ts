// @ts-strict

import { describe, expect, it } from 'vitest'
import { guid } from '../src/ts/util/Utilities'

describe('GUID', () => {
	it('Should generate a valid GUID', () => {
		const guidRegex =
			/^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/
		const value = guid()
		expect(value).toMatch(guidRegex)
	})
})
