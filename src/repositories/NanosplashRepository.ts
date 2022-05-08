import {get} from "../utilities/dom";
import {SplashInstance} from "../Core/SplashInstance";
import {ContextualAPIObject, Destination} from "../types";

export class NanosplashRepository {
    public static destinationToNode(destination: Destination): HTMLElement
    {
        if (typeof destination === 'string') {
            const element = get<HTMLElement>(destination)
            if (!element) {
                throw new Error(`No match with ${destination}`)
            }
            return element
        } else if (destination instanceof Node) {
            return destination as HTMLElement
        }
        throw new Error('Destination argument must string or Node')
    }

    public static createContextualApiObject(splash: SplashInstance): ContextualAPIObject {
        const ctx = {
            getId: () => splash.getId(),
            remove: () => splash.delete(),
            moveTo: (selector: string) => splash.moveTo(selector),
            getText: () => splash.getText(),
            setText: (text: string) => splash.setText(text),
            getImgSrc: () => splash.getImgSrc(),
            setImgSrc: (src?: string) => splash.setImgSrc(src)
        }
        return {
            ...ctx,
            inside: (selector: string) => {
                splash.moveTo(selector)
                return ctx
            },
        }
    }
}
