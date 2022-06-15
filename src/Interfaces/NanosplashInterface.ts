import {StrategyObject} from "../types";
import {SplashInstance} from "../Core/SplashInstance";

export interface NanosplashInterface extends StrategyObject {
    delete(splashInstance: SplashInstance): void
    hideAll(): void
    hide(id?: string): void
}
