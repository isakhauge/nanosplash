import { NanoSplash } from "./NanoSplash";

const windowExists = window && window instanceof Window
if (windowExists) {
    NanoSplash.injectInstanceIntoGlobalScope(new NanoSplash());
}