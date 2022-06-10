import '../style.sass'
import {SplashInstance} from "./SplashInstance";
import {InstanceIterationCallback, NanosplashOptions, SplashJob} from "../types";
import {ShowInterface} from "../Interfaces/ShowInterface";
import {NanosplashFactory} from "../Factory/NanosplashFactory";
import {NanosplashInterface} from "../Interfaces/NanosplashInterface";
import {ContextualAPIInterface} from "../Interfaces/ContextualAPIInterface";

/**
 * # Nanosplash
 * @author Isak K. Hauge <isakhauge@gmail.com>
 */
export class Nanosplash implements NanosplashInterface {
    public static APP_NAME = 'Nanosplash'
    public imgSrc: string | undefined
    public showSpinner: boolean
    public fontSize: string
    public readonly instances: Map<string, SplashInstance>

    /**
     * Options passed to the constructor will persist in the instance.
     * @param {NanosplashOptions | undefined} options Nanosplash options object.
     */
    public constructor(options?: NanosplashOptions) {
        this.imgSrc = options?.imgSrc ?? undefined
        this.showSpinner = options?.spinner ?? false
        this.fontSize = options?.fontSize ?? '18px'
        this.instances = new Map<string, SplashInstance>()
    }

    /**
     * # Show
     * @param {string} text
     */
    public show(text: string): ContextualAPIInterface {
        return NanosplashFactory.createShowFunction(this, new SplashInstance(this, text, this.imgSrc))(text)
    }

    /**
     * # Progress
     * @param {SplashJob[]} jobs An array or list of Splash jobs.
     * @return ContextualAPIInterface
     */
    public progress(...jobs: SplashJob[]): ContextualAPIInterface {
        return NanosplashFactory.createProgressFunction(this, new SplashInstance(this, '', this.imgSrc))(...jobs)
    }

    /**
     * # While
     * @param {Promise<any>} asyncTask An asynchronous function or Promise.
     * @return ContextualAPIInterface
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
            console.log({
                size: n,
                lastIdx: n - 1,
                currentIdx: i
            })
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
     * Delete specific Splash instance or the latest one.
     * @param id
     */
    public hide(id?: string): void {
        if (id) {
            const splashInstance = this.instances.get(id)
            if (splashInstance) {
                splashInstance.delete()
            } else {
                throw new Error(
                    `Could not find element with id: ${id}`
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
    }

    /**
     * # Get Splashes With Destination Node
     * Returns Splash instances having the given destination node.
     * @param {HTMLElement} node
     */
    public getSplashesWithDestinationNode(node: HTMLElement): SplashInstance[]
    {
        const fnSameDestinationNode = (v: SplashInstance) => v.getDestination() === node
        return Array.from(this.instances.values()).filter(fnSameDestinationNode)
    }
}
