import Nanosplash from "./Core/Nanosplash";
import {SplashInstance} from "./Core/SplashInstance";
import {ShowInterface} from "./Interfaces/ShowInterface";
import {ContextualAPIInterface} from "./Interfaces/ContextualAPIInterface";
import {NanosplashInterface} from "./Interfaces/NanosplashInterface";

declare global {
	interface Window {
		Nanosplash: typeof Nanosplash
		installNanosplash: (options?: NanosplashOptions) => void
		ns: Nanosplash
	}
}

export type Destination = Node | string
export type SplashJob = [Promise<any>, string]

/**
 * @internal
 */
export type ElementTag = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap

/**
 * @internal
 */
type CSSProperty = keyof CSSStyleDeclaration

export type ShowFunction = (text: string) => ContextualAPIObject
export type ProgressFunction = (...[]: SplashJob[]) => ContextualAPIObject
export type WhileFunction = (asyncTask: Promise<any>) => ShowInterface
export type StrategyObject = {
    show: ShowFunction,
    progress: ProgressFunction,
    while: WhileFunction
}

export type InsideFunction = (selector: string) => ContextualAPIInterface

export type ContextualAPIObject = {
	getId: () => string,
	inside?: InsideFunction,
	remove: () => void
	moveTo: (selector: string) => void,
	getText: () => string,
	setText: (text: string) => SplashInstance,
	getImgSrc: () => string | undefined,
	setImgSrc: (src?: string) => SplashInstance
}

export type InstanceIterationCallback = (id: string, splashInstance: SplashInstance, i: number) => boolean

export type NanosplashOptions = {
	imgSrc?: string,
	spinner?: boolean,
	fontSize?: string
}

export default Nanosplash
