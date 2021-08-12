export declare function get(domString: string): Element | null;
export declare type MakeOptions = {
    id?: string;
    className?: string;
    attributes?: {
        key: string;
        value: string | null;
    }[];
    eventListeners?: {
        event: keyof HTMLElementEventMap;
        handler: EventListener;
    }[];
    content?: Node | Element | HTMLElement | string;
};
export declare function mk(tag: keyof HTMLElementTagNameMap, options?: MakeOptions): HTMLElement;
export declare function setAttribute(node: HTMLElement, key: string, value: string): void;
export declare function removeAttribute(node: HTMLElement, key: string): void;
export declare function getAttribute(node: HTMLElement, key: string): string | null;
export declare function display(node: HTMLElement, show: boolean): void;
export declare function parentOf(node: Node): Node | null;
export declare function appendFirst(destinationNode: Node, node: Node): void;
export declare function move(targetNode: Node, destinationNode: Node): void;
export declare function fitParentDimensions(node: HTMLElement): void;
