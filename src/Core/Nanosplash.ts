import '../style.sass'
import {SplashInstance} from "./SplashInstance";
import {SplashJob, StrategyObject} from "../types";
import {ShowInterface} from "../Interfaces/ShowInterface";
import {NanosplashFactory} from "../Factory/NanosplashFactory";
import {NanosplashInterface} from "../Interfaces/NanosplashInterface";
import {ContextualAPIInterface} from "../Interfaces/ContextualAPIInterface";

export class Nanosplash implements NanosplashInterface {
    public static APP_NAME = 'Nanosplash'
    public readonly instances: Map<string, SplashInstance>

    public constructor() {
        this.instances = new Map<string, SplashInstance>()
    }

    public img(src: string): StrategyObject {
        return NanosplashFactory.createImgFunction(this, new SplashInstance(this, '', src))(src)
    }

    public show(text: string): ContextualAPIInterface {
        return NanosplashFactory.createShowFunction(this, new SplashInstance(this, text))(text)
    }

    public progress(...jobs: SplashJob[]): ContextualAPIInterface {
        return NanosplashFactory.createProgressFunction(this, new SplashInstance(this, ''))(...jobs)
    }

    public while(asyncTask: Promise<any>): ShowInterface {
        return NanosplashFactory.createWhileFunction(this, new SplashInstance(this, ''))(asyncTask)
    }

    private fifoIterate(callback: (id: string, splashInstance: SplashInstance, i: number) => boolean): void {
        let i = 0
        const instanceEntries = this.instances.entries()
        for (const [id, splashInstance] of instanceEntries) {
            if (!callback(id, splashInstance, i++)) {
                break
            }
        }
    }

    public delete(splashInstance: SplashInstance): void {
        this.instances.delete(splashInstance.getId())
    }

    public hideAll(): void
    {
        this.instances.forEach(
            (instance: SplashInstance) => instance.delete()
        )
    }

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
            this.fifoIterate((_: string, splashInstance: SplashInstance, i: number) => {
                const remove = i === 0
                if (remove) {
                    splashInstance.delete()
                }
                return remove
            })
        }
    }

    public getSplashesWithDestinationNode(node: HTMLElement): SplashInstance[]
    {
        const fnSameDestinationNode = (v: SplashInstance) => v.getDestination() === node
        return Array.from(this.instances.values()).filter(fnSameDestinationNode)
    }
}
