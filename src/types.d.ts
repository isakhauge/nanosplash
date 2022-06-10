import {Nanosplash} from "./Core/Nanosplash";
import {SplashInstance} from "./Core/SplashInstance";
import {ShowInterface} from "./Interfaces/ShowInterface";
import {ContextualAPIInterface} from "./Interfaces/ContextualAPIInterface";

declare global {
	interface Window {
		Nanosplash: typeof Nanosplash
		installNanosplash: (options?: NanosplashOptions) => void
		ns: Nanosplash
	}
}

type Destination = Node | string
type SplashJob = [Promise<any>, string]

/**
 * @internal
 */
export type ElementTag = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap

/**
 * @internal
 */
type CSSProperty = keyof CSSStyleDeclaration

type ShowFunction = (text: string) => ContextualAPIInterface
type ProgressFunction = (...[]: SplashJob[]) => ContextualAPIInterface
type WhileFunction = (asyncTask: Promise<any>) => ShowInterface
type StrategyObject = {
    show: ShowFunction,
    progress: ProgressFunction,
    while: WhileFunction
}
type ImgFunction = (src: string) => StrategyObject
type InsideFunction = (selector: string) => ContextualAPIInterface
type ContextualAPIObject = {
	getId: () => string,
	inside?: InsideFunction,
	remove: () => void
	moveTo: (selector: string) => void,
	getText: () => string,
	setText: (text: string) => SplashInstance,
	getImgSrc: () => string | undefined,
	setImgSrc: (src?: string) => SplashInstance
}
type InstanceIterationCallback = (id: string, splashInstance: SplashInstance, i: number) => boolean

type NanosplashOptions = {
	imgSrc?: string,
	spinner?: boolean,
	fontSize?: string
}
