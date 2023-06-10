

declare global {
    interface Window {
        ns: Service;
    }
}
export type GUIDString = string;
export type CSSSelector = string;
export type FindCallback<T> = (item: T, index: number) => boolean;
export type NSFinder = FindCallback<Splash>;
export type Reference = CSSSelector | Element;


/**
 * # Generate GUID
 * @returns {GUIDString} A GUID string.
 */
export declare function generateGUID(): GUIDString;

/**
 * A stack data structure.
 * @template T The type of item stored in the stack.
 * @author Isak K. Hauge <isakhauge@icloud.com>
 */
declare class Stack<T> {
    private _items;
    /**
     * Constructs a new stack.
     */
    constructor();
    /**
     * Returns the items in the stack.
     */
    get items(): T[];
    /**
     * Adds an item to the top of the stack.
     * @param item The item to add to the stack.
     */
    push(item: T): void;
    /**
     * Removes and returns the item at the top of the stack.
     * @returns The item at the top of the stack, or undefined if the stack is empty.
     */
    pop(): T | undefined;
    /**
     * Returns the item at the top of the stack without removing it.
     * @returns The item at the top of the stack, or undefined if the stack is empty.
     */
    peek(): T | undefined;
    /**
     * Returns true if the stack is empty, false otherwise.
     * @returns True if the stack is empty, false otherwise.
     */
    isEmpty(): boolean;
    /**
     * Returns the number of items in the stack.
     * @returns The number of items in the stack.
     */
    size(): number;
    /**
     * Removes all items from the stack.
     */
    clear(): void;
}
export default Stack;



/**
 * # DOM Utilities
 * A collection of functions that are used by the Nanosplash classes.
 * @see Splash
 * @see Service
 * @author Isak K. Hauge <isakhauge@icloud.com>
 */
/**
 * # Create Element
 * Return the main Nanosplash element.
 */
export declare function createElement(): HTMLDivElement;
/**
 * # Inject	as First Child
 * Insert element into the target element as its first child.
 * @param element Element to inject.
 * @param targetElement Element in which the first element is to be injected.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/children
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
 * @see https://developer.mozilla.org/docs/Web/API/NodeList/item
 */
export declare function injectAsFirstChild(element: Element, targetElement: Element): void;
/**
 * # Set NS Host Class
 * Add or remove the `nsHostClassName` class to the `element`.
 * @param element Element to which the `nsHostClassName` class will be added or removed.
 * @param action Action to perform ('add' or 'remove').
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/add
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/remove
 */
export declare function setNSHostClass(element: Element | null, action: 'add' | 'remove'): void;
/**
 * # Prepare Parent Of
 * Add the `nsHostClassName` class to the parent of the `ns` element.
 * @param ns Nanosplash instance.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/parentElement
 */
export declare function prepareParentOf(ns: Splash): void;
/**
 * # Clean NS Parent Of
 * Remove the `nsHostClassName` class from the parent of the `ns` element.
 * @param ns Nanosplash instance.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/parentElement
 */
export declare function cleanNSParentOf(ns: Splash): void;
/**
 * # Show Element
 * Set the `display` property of the `element` to `flex`.
 * @param element Element to show.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/display
 */
export declare function showElement(element: HTMLElement): void;
/**
 * # Hide Element
 * Set the `display` property of the `element` to `none`.
 * @param element Element to hide.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/display
 */
export declare function hideElement(element: HTMLElement): void;
/**
 * # Element From
 * Convert the element reference to an element.
 * @param ref Reference to an element.
 * @returns { Element | null } Element or null.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Node
 */
export declare function elementFrom(ref: Reference): Element | null;
/**
 * # Element Is NS
 * Check if the element is a Nanosplash element.
 * This is determined by the presence of the `ns` class on the element.
 * @param element Element to check.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/contains
 */
export declare function elementIsNS(element: Element): boolean;
/**
 * # Move
 * Move an Element to another Element.
 * @param element Element to move
 * @param targetElement Target element
 */
export declare function move(element: Element, targetElement: Element): void;
/**
 * # Get Recycled NS
 * Return the Nanosplash instance inside the target element if it exists.
 * @param targetElement Element wherein the Nanosplash instance is to reside.
 * @returns { Nanosplash | null } Nanosplash instance or null.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/firstElementChild
 */
export declare function getRecycledNS(targetElement: Element): Splash | null;





/**
 * # Service
 * A service class that handles Nanosplash instances.
 * It's a singleton class and it's instance resides in the Window object and
 * serves the public API of the Nanosplash library.
 * @see Splash
 * @author Isak K. Hauge <isakhauge@icloud.com>
 */
export declare class Service {
    /**
     * # Window Accessor Key
     * Key to access NanosplashService instance in the Window object.
     */
    static readonly WindowAccessorKey = "ns";
    /**
     * # Instance
     * Singleton instance of NanosplashService.
     */
    private static instance;
    /**
     * # Nanosplash Stack
     * For each Nanosplash instance created, it's pushed to the stack.
     * When a Nanosplash instance is removed, it's removed from the stack.
     * @see Stack
     * @see Splash
     */
    readonly nsStack: Stack<Splash>;
    /**
     * # Constructor
     * Private constructor to prevent multiple instances.
     * @private
     */
    private constructor();
    /**
     * # Find Index
     * Find Nanosplash stack index by callback.
     * @param callback Callback function that returns a boolean.
     * @returns {number} Index of Nanosplash instance in the stack or -1.
     */
    private findIndex;
    /**
     * # Find
     * Find Nanosplash in the stack by callback.
     * @param callback Callback function that returns a boolean.
     * @returns {Splash | undefined} Nanosplash instance or undefined
     */
    private find;
    /**
     * # Get Instance
     * Singleton instance accessor
     * @returns {Service} NanosplashService instance
     */
    static getInstance(): Service;
    /**
     * # Assign To Window
     * Assign a NanosplashService instance to the Window object.
     * The NanosplashService instance can be accessed in the window object
     * using the key window accessor key.
     * @see WindowAccessorKey
     */
    private static assignToWindow;
    /**
     * # Start
     * Initialize and attach a Nanosplash Service instance to the Window object.
     */
    static start(): void;
    /**
     * # Create Nanosplash
     * Return new Nanosplash instance and push it to the stack.
     * @param text Text to display.
     * @returns {Splash} Nanosplash instance.
     */
    private createNS;
    /**
     * # Clean And Remove
     * Remove Nanosplash from DOM and clean its parent.
     * @param ns Nanosplash instance.
     * @returns {GUIDString} Nanosplash ID.
     */
    private cleanAndRemove;
    /**
     * # Stack Delete
     * Remove Nanosplash instance from the stack.
     * @param ns Nanosplash instance.
     * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
     */
    private stackDelete;
    /**
     * # Delete NS
     * Remove Nanosplash instance from both the stack and the DOM.
     * @param callback Callback function.
     * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
     */
    private deleteNS;
    /**
     * # Show
     * Present a Nanosplash in the browser window displaying the given text.
     * @param text Text to display.
     * @returns {GUIDString} Nanosplash ID.
     */
    show(text?: string): GUIDString;
    /**
     * # Show Inside
     * Present a Nanosplash over the given element displaying the given text.
     * @param ref Reference an element.
     * @param text Text to display.
     * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
     */
    showInside(ref: Reference, text?: string): GUIDString | null;
    /**
     * # Hide
     * Hide the last created Nanosplash.
     * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
     */
    hide(): GUIDString | null;
    /**
     * # Hide All
     * Hide all Nanosplashes.
     */
    hideAll(): void;
    /**
     * # Hide ID
     * Hide Nanosplash by its ID.
     * @param id Nanosplash ID.
     * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
     */
    hideId(id: GUIDString): GUIDString | null;
    /**
     * # Hide Inside
     * Hide Nanosplash inside the given element if it exists.
     * @param ref Reference an element.
     * @returns {GUIDString | null} Nanosplash ID or null if it doesn't exist.
     */
    hideInside(ref: Reference): GUIDString | null;
}


/**
 * # Splash
 * Small splash screen that can be used to indicate that a process
 * is running.
 * @author Isak K. Hauge <isakhauge@icloud.com>
 */
export declare class Splash {
    /**
     * # CSS Class Name
     * The main CSS class name of the root element of a Nanosplash component.
     */
    static readonly NSClass = "ns";
    /**
     * # Host CSS Class Name
     * The CSS class name of the host element of a Nanosplash component.
     * The host element is the element that the Nanosplash is attached to.
     */
    static readonly NSHostClass = "nsh";
    /**
     * # ID
     * Each Nanosplash instance is given a unique GUID.
     */
    private readonly id;
    /**
     * # Element
     * The root element of the Nanosplash component.
     */
    private element?;
    /**
     * # Constructor
     * Creates a new Nanosplash instance.
     */
    constructor();
    /**
     * # Get NS Content Element
     * Returns the content element of the Nanosplash.
     */
    getNSContentElement(): HTMLDivElement;
    /**
     * # Get NS Text Element
     * Returns the text element of the Nanosplash.
     */
    getNSTextElement(): HTMLDivElement;
    /**
     * # Get ID
     * Return Nanosplash instance GUID.
     */
    getId(): GUIDString;
    /**
     * # Get NS Element
     * Return Nanosplash instance HTMLDivElement.
     */
    getNSElement(): HTMLDivElement;
    /**
     * # Set Text
     * @param text The text that will be visible inside the splash.
     */
    setText(text: string): Splash;
    /**
     * # Show Text
     * Display text element.
     */
    showText(): Splash;
    /**
     * # Hide Text
     * Hide the text element.
     */
    hideText(): Splash;
    /**
     * # Remove
     * Delete all
     */
    remove(): Splash;
}
