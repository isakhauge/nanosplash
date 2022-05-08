import {ContextualAPIInterface} from "./ContextualAPIInterface";

export interface InsideInterface extends ContextualAPIInterface {
    inside: (selector: string) => ContextualAPIInterface
}
