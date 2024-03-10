import { DOMSelector, UTCInteger } from './Types'

export interface NanosplashInterface {
	show(text?: string, inside?: DOMSelector | HTMLElement): UTCInteger | null
	hide(id?: UTCInteger): void
	hideAll(): void
}
