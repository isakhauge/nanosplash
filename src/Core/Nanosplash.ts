import '../style.sass'
import {get} from "../Utilities/dom";
import {SplashInstance} from "./SplashInstance";
import {ShowInterface} from "../Interfaces/ShowInterface";
import {NanosplashFactory} from "../Factory/NanosplashFactory";
import {NanosplashInterface} from "../Interfaces/NanosplashInterface";
import {
    ContextualAPIObject,
    Destination,
    InstanceIterationCallback,
    NanosplashOptions,
    SplashJob,
} from "../types";
import Exception from "../Exceptions/Exception";
import IllegalArgumentException from "../Exceptions/IllegalArgumentException";

/**
 * # Nanosplash
 * @author Isak K. Hauge <isakhauge@gmail.com>
 */
class Nanosplash implements NanosplashInterface {
    public static APP_NAME = 'Nanosplash'
    private static SPINNER_DEFAULT_VISIBILITY = true
    private static DEBUG = true
    public debug: boolean
    private imgSrc: string | undefined
    private spinner: boolean
    private fontSize: string
    public readonly instances: Map<string, SplashInstance>

    /**
     * Options passed to the constructor will persist in the instance.
     * @param {NanosplashOptions | undefined} options Nanosplash options object.
     */
    public constructor(options?: NanosplashOptions) {
        this.debug = ((options?.debug === undefined)
            ? Nanosplash.DEBUG
            : options.debug) as boolean
        this.imgSrc = options?.imgSrc
        this.spinner = (options?.spinner === undefined)
            ? Nanosplash.SPINNER_DEFAULT_VISIBILITY
            : options.spinner
        this.fontSize = options?.fontSize ?? '18px'
        this.instances = new Map<string, SplashInstance>()
    }

    /**
     * # Set Image Source
     * Set the value as undefined to display no image.
     * @param {string | undefined} value
     * @return Nanosplash
     */
    public setImgSrc(value: string | undefined): Nanosplash {
        this.imgSrc = value
        return this
    }

    /**
     * # Set Spinner
     * Control spinner visibility.
     * @param {boolean} value
     * @return Nanosplash
     */
    public showSpinner(value: boolean): Nanosplash {
        this.spinner = value
        return this
    }

    /**
     * # Set Font Size
     * @param {string} value Use CSS compatible values.
     * @return Nanosplash
     */
    public setFontSize(value: string): Nanosplash {
        this.fontSize = value
        return this
    }

    /**
     * # Get Image Source
     * @return string | undefined
     */
    public getImgSrc(): string | undefined {
        return this.imgSrc
    }

    /**
     * # Spinner Is Visible
     * @return boolean
     */
    public spinnerIsVisible(): boolean {
        return this.spinner
    }

    /**
     * # Get Font Size
     * @return string
     */
    public getFontSize(): string {
        return this.fontSize
    }

    /**
     * # Show
     * @param {string} text
     */
    public show(text: string): ContextualAPIObject {
        return NanosplashFactory.createShowFunction(this, new SplashInstance(this, text, this.imgSrc))(text)
    }

    /**
     * # Progress
     * @param {SplashJob[]} jobs An array or list of Splash jobs.
     */
    public progress(...jobs: SplashJob[]): ContextualAPIObject {
        return NanosplashFactory.createProgressFunction(this, new SplashInstance(this, '', this.imgSrc))(...jobs)
    }

    /**
     * # While
     * @param {Promise<any>} asyncTask An asynchronous function or Promise.
     */
    public while(asyncTask: Promise<any>): ShowInterface {
        return NanosplashFactory.createWhileFunction(this, new SplashInstance(this, '', this.imgSrc))(asyncTask)
    }

    /**
     * # LIFO Iterate
     * This function will iterate through the splash instances in a LIFO (last in, first out) manner, invoke the
     * callback for each instance and pass the instance as an argument.
     * @param {InstanceIterationCallback} callback This callback will be invoked for each instance.
     * @private
     */
    private lifoIterate(callback: InstanceIterationCallback): void {
        const n = this.instances.size
        const instances = Array.from(this.instances.values())
        for (let i = n - 1; i >= 0; i--) {
            const instance = instances[i]
            const id = instance.getId()
            if (!callback(id, instance, i)) {
                break
            }
        }
    }

    /**
     * # Delete
     * @param {SplashInstance} splashInstance
     */
    public delete(splashInstance: SplashInstance): void {
        this.instances.delete(splashInstance.getId())
    }

    /**
     * # Hide All
     * Delete all Splash instances.
     */
    public hideAll(): void
    {
        this.instances.forEach((instance: SplashInstance) => instance.delete())
    }

    /**
     * # Hide
     * Delete specific Splash instance or the latest one. There are three different ways of using this function.
     *
     * ## Use SplashInstance IDs
     * Every new splash instance is given a unique, randomized ID. This ID is easily retrieved by using the getId
     * method.
     * <br>
     * <code>
     *     const splashInstance = ns.show('Loading');<br>
     *     ns.hide(splashInstance.getId());
     * </code>
     * <br>
     *
     * ## Use CSS Selector
     * Pass the selector referring to the element in which the splash instance resides.
     * <br>
     * <code>
     *     ns.show('Loading').inside('#my-div');<br>
     *     ns.hide('#my-div');
     * </code>
     * <br>
     *
     * ## Pass no argument
     * When calling the hide method without passing arguments, it will delete the latest splash instance added to the
     * DOM, in other words, in a LIFO fashion.<br>
     * <code>
     *     ns.show('Loading');<br>
     *     ns.hide();
     * </code>
     * <br>
     * @param ref This can either be a SplashInstance ID or a CSS selector referring to the element in which
     * the instance is residing.
     */
    public hide(ref?: Destination): void {
        try {
            if (ref) {
                const isString = typeof ref === 'string'
                const isNode = ref instanceof Node
                const deleteInstancesWhereDestination = (destination: Destination) => {
                    Array.from(this.instances.values())
                        .filter((v: SplashInstance) => v.getDestination() === destination)
                        .forEach((v: SplashInstance) => v.delete())
                }

                if (isString) {
                    const splashInstance = this.instances.get(ref)
                    if (splashInstance) {
                        splashInstance.delete()
                        return
                    } else {
                        const element = get<HTMLElement>(ref)
                        if (element) {
                            deleteInstancesWhereDestination(element)
                        }
                        throw new Exception(`The CSS selector (${ref}) points to a non-existing DOM element.`)
                    }
                } else if (isNode) {
                    deleteInstancesWhereDestination(ref)
                } else {
                    throw new IllegalArgumentException(
                        'The ref argument must be either a string or Node',
                        ref
                    )
                }
            } else {
                const n = this.instances.size
                this.lifoIterate((_: string, splashInstance: SplashInstance, i: number) => {
                    const remove = i === n - 1
                    if (remove) {
                        splashInstance.delete()
                    }
                    return remove
                })
            }
        } catch (e) {
            if (this.debug) {
                console.warn(e)
            }
        }
    }

    /**
     * # Get From Destination Node
     * Returns Splash instances having the given destination node.
     * @param {HTMLElement} node
     */
    public getFromDestinationNode(node: HTMLElement): SplashInstance[]
    {
        const fnSameDestinationNode = (v: SplashInstance) => v.getDestination() === node
        return Array.from(this.instances.values()).filter(fnSameDestinationNode)
    }
}

export default Nanosplash
