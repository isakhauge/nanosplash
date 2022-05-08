import {SplashInstance} from "../Core/SplashInstance";

export interface ContextualAPIInterface {
    getId: () => string
    remove: () => void
    moveTo: (selector: string) => void,
    setText: (text: string) => SplashInstance
}
