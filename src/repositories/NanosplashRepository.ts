import {addClass, get, mk} from "../Utilities/dom";
import {SplashInstance} from "../Core/SplashInstance";
import {ContextualAPIObject, Destination} from "../types";
import DestinationException from "../Exceptions/DestinationException";
import Exception from "../Exceptions/Exception";
import IllegalArgumentException from "../Exceptions/IllegalArgumentException";

export class NanosplashRepository {
    /**
     * # Destination To Node
     * Converts a Destination type into an HTMLElement.
     * @param {Destination} destination Either a node or a CSS selector.
     * @throws DestinationException
     * @throws IllegalArgumentException
     */
    public static destinationToNode(destination: Destination): HTMLElement
    {
        if (typeof destination === 'string') {
            try {
                const element = get<HTMLElement>(destination)
                if (!element) {
                    throw new Exception(`No DOM match with ${destination}`)
                }
                return element
            } catch (e) {
                throw new DestinationException(
                    `Destination (${destination}) is either invalid or non-existing in DOM`,
                    destination,
                    e as Exception
                )
            }
        } else if (destination instanceof Node) {
            return destination as HTMLElement
        }

        throw new IllegalArgumentException(
            `Destination (${destination}) must be either a Node or a CSS selector`,
            destination
        )
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
