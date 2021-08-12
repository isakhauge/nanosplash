import "./style.sass";
declare global {
    interface Window {
        attachEvent: Function;
    }
}
/**
 * NanoSplash
 *
 * @author Isak K. Hauge
 * @version 2.0
 */
export declare class NanoSplash {
    private defaultDestination;
    private defaultText;
    private readonly mainElement;
    private readonly splashElement;
    private readonly textElement;
    private static readonly DEFAULT_TEXT;
    private static readonly DEFAULT_TEXT_FONT;
    private static readonly DEFAULT_TEXT_COLOR;
    private static readonly DEFAULT_TEXT_SIZE;
    private static readonly DEFAULT_SPLASH_SOURCE;
    private static readonly DEFAULT_SPLASH_WIDTH;
    private static readonly DEFAULT_SPLASH_ANIMATION;
    private static readonly DEFAULT_DESTINATION;
    private static readonly DEFAULT_BACKGROUND_COLOR;
    private static readonly DEFAULT_BACKGROUND_BLUR;
    constructor();
    /**
     * Configure
     *
     * @param {Config} config
     */
    config(config: Config): NanoSplash;
    /**
     * Set Default Styles
     * @private
     */
    private setDefaultStyles;
    /**
     * Show
     *
     * @param {string} text
     */
    show(text?: string): DestinationController;
    /**
     * Hide
     */
    hide(): void;
    /**
     * Move To
     *
     * @param destination
     * @private
     */
    private moveTo;
    /**
     * Make Main Element
     *
     * @private
     */
    private static makeMainElement;
    /**
     * Make Splash Element
     *
     * @private
     */
    private static makeSplashElement;
    /**
     * Make Text Element
     *
     * @private
     */
    private static makeTextElement;
    /**
     * Assemble Elements
     *
     * @param containerElement
     * @param splashElement
     * @param textElement
     * @private
     * @static
     */
    private static assembleElements;
    /**
     * Set Text
     *
     * @param {string} text
     * @private
     */
    private setText;
    /**
     * Set Text Font Family
     *
     * @param {string} fontFamily
     * @private
     */
    private setTextFontFamily;
    /**
     * Set Text Color
     *
     * @param {string} color
     * @private
     */
    private setTextColor;
    /**
     * Set Text Size
     *
     * @param {string} fontSize
     * @private
     */
    private setTextSize;
    /**
     * Set Splash Source
     *
     * @param {string} src
     * @private
     */
    private setSplashSource;
    /**
     * Set Splash Width
     *
     * @param {string} width
     * @private
     */
    private setSplashWidth;
    /**
     * Set Splash Animation
     *
     * @param {SplashAnimation} animation
     * @private
     */
    private setSplashAnimation;
    /**
     * Set Background Color
     *
     * @param color
     * @private
     */
    private setBackgroundColor;
    /**
     * Set Background Blur
     *
     * @param {boolean} enable
     * @private
     */
    private setBackgroundBlur;
    /**
     * @throws InvalidDestinationException
     * @private
     */
    private static getDestinationElement;
    /**
     * Is Element or Node
     *
     * @param {any} value
     * @private
     * @static
     */
    private static isElementOrNode;
    /**
     * Is Function
     *
     * @param value
     * @private
     * @static
     */
    private static isFunction;
    /**
     * Inject Instance Into Global Scope
     *
     * @param {NanoSplash} instance
     * @private
     * @static
     */
    static injectInstanceIntoGlobalScope(instance: NanoSplash): void;
    private static adaptSizeOnResize;
}
/**
 * Types and interfaces
 */
export declare type SplashAnimation = "none" | "pulse" | "spin";
export declare type DefaultOptions = {
    destination?: Destination;
    text?: string;
};
export declare type TextOptions = {
    family?: string;
    color?: string;
    size?: string;
};
export declare type SplashOptions = {
    src?: string;
    width?: string;
    animation?: SplashAnimation;
};
export declare type BackgroundOptions = {
    color?: string;
    blur?: boolean;
};
export declare type Destination = Node | Element | DestinationCallback | string;
export declare type DestinationCallback = () => Element;
export declare type Config = {
    default?: DefaultOptions;
    text?: TextOptions;
    splash?: SplashOptions;
    background?: BackgroundOptions;
};
export declare type DestinationController = {
    inside: (destination: Destination) => void;
};
