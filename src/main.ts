import {Nanosplash} from "./Core/Nanosplash";
import {NanosplashOptions} from "./types";
window.addEventListener('load', () => {
    window.Nanosplash = Nanosplash
    window.installNanosplash = (options?: NanosplashOptions) => {
        window.ns = new Nanosplash(options)
    }
})
