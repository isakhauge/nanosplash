import {addClass, get, mk} from "../utilities/dom";
import {SplashInstance} from "../Core/SplashInstance";
import {ContextualAPIObject, Destination} from "../types";

export class NanosplashRepository {
    /**
     * # Destination To Node
     * Converts a Destination type into an HTMLElement.
     * @param {Destination} destination Either a node or a CSS selector.
     */
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

    /**
     * # Create Contextual API Object
     * Creates an object containing props that adhere to the ns API.
     * @param {SplashInstance} splash
     */
    public static createContextualApiObject(splash: SplashInstance): ContextualAPIObject
    {
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

    /**
     * # Create Nanosplash Spinner Element
     * Returns a DIV element wrapping an SVG element.
     */
    public static createNanosplashSpinnerElement(): HTMLDivElement
    {
        const div = mk('div') as HTMLDivElement
        addClass(div, 'ns-spinner')
        div.innerHTML = `
            <svg viewBox="0 0 50 50">
                <circle class="path" cx="25" cy="25" r="20" fill="none"></circle>
            </svg>
        `
        return div
    }
}
