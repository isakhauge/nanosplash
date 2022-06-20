import Nanosplash from "../Core/Nanosplash";
import {SplashInstance} from "../Core/SplashInstance";
import {NanosplashRepository} from "../Repositories/NanosplashRepository";
import {ContextualAPIObject, ProgressFunction, ShowFunction, SplashJob, WhileFunction} from "../types";
import {ShowInterface} from "../Interfaces/ShowInterface";

/**
 * # Nanosplash Factory
 * @author Isak K. Hauge
 */
export class NanosplashFactory {
    /**
     * # Ensure Instance
     * Returns and modifies the splash instance, or creates a new one.
     * @param {SplashInstance | null} splash Splash instance
     * @param {Nanosplash} ns Nanosplash instance
     * @param {string} text Splash text
     * @param {string | undefined} imgSrc Splash image URL
     * @private
     */
    private static ensureInstance(
        splash: SplashInstance | null,
        ns: Nanosplash,
        text: string,
        imgSrc?: string
    ): SplashInstance
    {
        if (!splash) {
            splash = new SplashInstance(ns, text, imgSrc)
        }
        return splash.setText(text).setImgSrc(splash.getImgSrc() ?? imgSrc)
    }

    /**
     * # Create Show Function
     * @param ns
     * @param splash
     * @return {ShowFunction} A curried function made for a specific splash instance.
     */
    public static createShowFunction(ns: Nanosplash, splash: SplashInstance | null): ShowFunction
    {
        return (text: string): ContextualAPIObject => {
            splash = NanosplashFactory.ensureInstance(splash, ns, text)
            ns.instances.set(splash.getId(), splash)
            splash.moveTo(document.body)
            return NanosplashRepository.createContextualApiObject(splash)
        }
    }

    /**
     * # Create Progress Function
     * @param ns
     * @param splash
     * @return {ProgressFunction} A curried API function made for a specific splash instance.
     */
    public static createProgressFunction(ns: Nanosplash, splash: SplashInstance | null): ProgressFunction
    {
        return (...jobs: SplashJob[]) => {
            splash = NanosplashFactory.ensureInstance(splash, ns, '')
            splash.moveTo(document.body)
            ;(async () => {
                for (const [_, [job, text]] of jobs.entries()) {
                    splash.setText(text)
                    await job
                }
                splash.delete()
            })()
            return NanosplashRepository.createContextualApiObject(splash)
        }
    }

    /**
     * # Create While Function
     * @param ns
     * @param splash
     * @return {ProgressFunction} A curried API function made for a specific splash instance.
     */
    public static createWhileFunction(ns: Nanosplash, splash: SplashInstance): WhileFunction
    {
        return (asyncTask: Promise<any>): ShowInterface => {
            splash = NanosplashFactory.ensureInstance(splash, ns, '')
            return {
                show(text: string) {
                    ns.instances.set(splash.getId(), splash)
                    splash.moveTo(document.body)
                    splash.setText(text)
                    asyncTask.finally(() => (splash as SplashInstance).delete())
                    return NanosplashRepository.createContextualApiObject(splash)
                }
            }
        }
    }
}
