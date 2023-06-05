/// <reference types="vite/client" />

declare module 'nanosplash' {
	export type GUIDString = string

	export type CSSSelector = string

	export type FindCallback = (...args: any[]) => boolean

	export type ElementCallback = () => Element | Promise<Element>

	export type Reference = CSSSelector | Element | ElementCallback

	export class Nanosplash {
		getId(): GUIDString
		getNSElement(): HTMLDivElement
		setText(text: string): Nanosplash
		showText(): Nanosplash
		hideText(): Nanosplash
		remove(): void
	}

	export class NanosplashService {
		show(text?: string): GUIDString
		showInside(ref: Reference, text?: string): GUIDString | null
		hide(): GUIDString | null
		hideAll(): void
		hideId(id: GUIDString): GUIDString | null
		hideInside(ref: Reference): GUIDString | null
	}

	declare global {
		interface Window {
			ns: NanosplashService
		}
	}
}
