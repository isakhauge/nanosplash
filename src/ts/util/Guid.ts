import { GUIDString } from '../types/Alias'

/**
 * # Generate GUID
 * @returns {GUIDString} A GUID string.
 */
export function generateGUID(): GUIDString {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
		const r = (Math.random() * 16) | 0
		const v = c === 'x' ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
}
