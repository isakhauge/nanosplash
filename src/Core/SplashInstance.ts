import {Destination} from "../types";
import {Nanosplash} from "./Nanosplash";
import {addClass, mk, move, setAttr} from "../utilities/dom";
import {IdentityInterface} from "../Interfaces/IdentityInterface";
import {NanosplashRepository} from "../repositories/NanosplashRepository";

export class SplashInstance implements IdentityInterface {
    private readonly id: string
    private imgSrc: string | undefined
    private readonly nsInstance: Nanosplash
    private destinationNode: HTMLElement | undefined
    private readonly nsRootElement: HTMLDivElement = mk('div') as HTMLDivElement
    private readonly nsTextElement: HTMLDivElement = mk('div') as HTMLDivElement
    private readonly nsWindowElement: HTMLDivElement = mk('div') as HTMLDivElement
    private readonly nsWrapperElement: HTMLDivElement = mk('div') as HTMLDivElement
    private readonly nsContentElement: HTMLDivElement = mk('div') as HTMLDivElement
    private readonly nsImageElement: HTMLImageElement = mk('img') as HTMLImageElement

    public constructor(ns: Nanosplash, text: string, imgSrc?: string) {
        this.id = Math.random().toString(36).substring(2)
        this.nsInstance = ns
        this.nsTextElement.innerText = text

        this.imgSrc = imgSrc
        this.nsImageElement.src = this.imgSrc ?? ''
        this.nsImageElement.alt = Nanosplash.APP_NAME

        this.assembleNSComponent()
        this.setImgSrc(imgSrc)
    }

    private assignCSSClasses(): void
    {
        addClass(this.nsContentElement, 'ns-container')
        addClass(this.nsWrapperElement, 'ns-blur')
        addClass(this.nsImageElement, 'ns-img')
        addClass(this.nsTextElement, 'ns-text')
        addClass(this.nsWindowElement, 'ns', 'ns-window')
        addClass(this.nsRootElement, 'ns-wrapper')
    }

    private assembleElementStructure(): void
    {
        this.nsContentElement.append(this.nsImageElement, this.nsTextElement)
        this.nsWindowElement.append(this.nsContentElement)
        this.nsRootElement.append(this.nsWrapperElement, this.nsWindowElement)
    }

    private assembleNSComponent(): void {
        this.nsRootElement.id = this.getId()
        setAttr(this.nsRootElement, 'data-ctx', 'nanosplash')
        this.assembleElementStructure()
        this.assignCSSClasses()
    }

    public getId(): string
    {
        return this.id
    }

    public getText(): string
    {
        return this.nsTextElement.innerText
    }

    public setText(text: string): SplashInstance {
        this.nsTextElement.innerText = text
        return this
    }

    public getImgSrc(): string | undefined
    {
        return this.imgSrc
    }

    public setImgSrc(src?: string): SplashInstance
    {
        this.nsImageElement.src = src ?? ''
        this.nsImageElement.style.display = src ? 'block' : 'none'
        this.assembleElementStructure()
        return this
    }

    public getDestination(): HTMLElement | undefined
    {
        return this.destinationNode
    }

    private cleanAndRestore(): void
    {
        const currentParent = this.nsRootElement.parentElement
        if (currentParent) {
            this.restoreDOMStructure(currentParent)
        }
    }

    private resetFullscreenAttributes(): void
    {
        setAttr(this.nsRootElement, 'style', '')
        this.nsRootElement.classList.remove('ns-fs')
    }

    private moveWithRegularStrategy(targetNode: Node): void
    {
        const targetParentNode = targetNode.parentNode
        if (targetParentNode) {
            this.restoreDOMStructure(targetParentNode)
            targetParentNode.replaceChild(this.nsRootElement, targetNode)
            this.nsWrapperElement.appendChild(targetNode)
        }
    }

    private moveWithFullscreenStrategy(): void
    {
        this.nsRootElement.classList.add('ns-fs')
        move(this.nsRootElement, document.body, true)
    }

    private replaceSplashInstancesHavingSameDestination(destinationNode: HTMLElement): void
    {
        const fnNotSameInstance = (v: SplashInstance) => v.getId() !== this.getId()
        const fnDelete = (v: SplashInstance) => v.delete()
        this.nsInstance.getSplashesWithDestinationNode(destinationNode).filter(fnNotSameInstance).forEach(fnDelete)
    }

    public moveTo(destination: Destination): void
    {
        // Clean up and restore previous location if any.
        this.cleanAndRestore()

        // Convert the destination into a DOM Node
        this.destinationNode = NanosplashRepository.destinationToNode(destination)

        // Replace splash instances having the same destination node
        this.replaceSplashInstancesHavingSameDestination(this.destinationNode)

        // Assess whether the destination node is the Document body or not
        const targetIsBody = this.destinationNode === document.body


        if (targetIsBody) {
            this.moveWithFullscreenStrategy()
        } else {
            this.resetFullscreenAttributes()
            this.moveWithRegularStrategy(this.destinationNode)
        }

        // Assemble the Nanosplash component
        this.assembleNSComponent()
    }

    private forEachWrappedNode(callback: (node: Node) => void): void
    {
        Array.from(this.nsWrapperElement.childNodes).forEach(callback)
    }

    private restoreDOMStructure(parentNode: Node): void
    {
        this.forEachWrappedNode((child: Node) => parentNode.insertBefore(child, this.nsRootElement))
    }

    private removeElementsFromDOM(): void
    {
        [
            this.nsTextElement,
            this.nsImageElement,
            this.nsContentElement,
            this.nsWrapperElement,
            this.nsWindowElement,
            this.nsRootElement
        ].forEach(v => v.remove())
    }

    public delete(): void {
        this.cleanAndRestore()
        this.removeElementsFromDOM()
        this.nsInstance.delete(this)
    }
}
