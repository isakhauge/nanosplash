import {ProgressFunction, ShowFunction, SplashJob, WhileFunction} from "../types";
import {Nanosplash} from "../Core/Nanosplash";
import {SplashInstance} from "../Core/SplashInstance";
import {NanosplashRepository} from "../repositories/NanosplashRepository";

export class NanosplashFactory {
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

    public static createShowFunction(ns: Nanosplash, splash: SplashInstance | null): ShowFunction
    {
        return (text: string) => {
            splash = NanosplashFactory.ensureInstance(splash, ns, text)
            ns.instances.set(splash.getId(), splash)
            splash.moveTo(document.body)
            return NanosplashRepository.createContextualApiObject(splash)
        }
    }

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

    public static createWhileFunction(ns: Nanosplash, splash: SplashInstance): WhileFunction
    {
        return (asyncTask: Promise<any>) => {
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
