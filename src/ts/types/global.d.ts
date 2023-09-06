import NS from '../core/Service'
import { ServiceInterface } from '../core/ServiceInterface'

export class Service extends NS.Service {}

declare global {
	export const ns: ServiceInterface
	export interface Window {
		ns: ServiceInterface
	}
	export interface window {
		ns: ServiceInterface
	}
}
