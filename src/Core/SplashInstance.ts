import {Destination} from "../types";
import Nanosplash from "./Nanosplash";
import {addClass, mk, move, setAttr} from "../Utilities/dom";
import {IdentityInterface} from "../Interfaces/IdentityInterface";
import {NanosplashRepository} from "../Repositories/NanosplashRepository";

/**
 * SplashInstance
 * @author Isak K. Hauge <isakhauge@gmail.com>
 */
export class SplashInstance implements IdentityInterface {
    private readonly id: string
    private imgSrc: string | undefined
    private readonly nsInstance: Nanosplash
    private destinationNode: HTMLElement | undefined
    private readonly nsRootElement: HTMLDivElement = mk('div') as HTMLDivElement
    private readonly nsTextElement: HTMLDivElement = mk('div') as HTMLDivElement
    private readonly nsTextContainerElement: HTMLDivElement = mk('div') as HTMLDivElement
    private readonly nsSpinnerElement: HTMLDivElement = NanosplashRepository.createNanosplashSpinnerElement()
    private readonly nsWindowElement: HTMLDivElement = mk('div') as HTMLDivElement
    private readonly nsWrapperElement: HTMLDivElement = mk('div') as HTMLDivElement
    private readonly nsContentElement: HTMLDivElement = mk('div') as HTMLDivElement
    private readonly nsImageElement: HTMLImageElement = mk('img') as HTMLImageElement

    /**
     * @param {Nanosplash} ns Nanosplash instance
     * @param {string} text Text
     * @param {string|undefined} imgSrc Image source URL
     */
    public constructor(ns: Nanosplash, text: string, imgSrc?: string) {
        this.id = Math.random().toString(36).substring(2)
        this.nsInstance = ns
        this.nsTextElement.innerText = text

        this.imgSrc = imgSrc
        this.nsImageElement.src = this.imgSrc ?? ''
        this.nsImageElement.alt = Nanosplash.APP_NAME

        this.nsRootElement.style.fontSize = ns.getFontSize()
        this.nsSpinnerElement.style.display = ns.spinnerIsVisible() ? 'flex' : 'none'

        this.assembleNSComponent()
        this.setImgSrc(imgSrc)
    }

    /**
     * # Assign CSS Classes
     * Assigns CSS class names to all elements connected to this splash instance.
     * @private
     */
    private assignCSSClasses(): void
    {
        addClass(this.nsContentElement, 'ns-container')
        addClass(this.nsWrapperElement, 'ns-blur')
        addClass(this.nsImageElement, 'ns-img')
        addClass(this.nsTextElement, 'ns-text')
        addClass(this.nsTextContainerElement, 'ns-text-container')
        addClass(this.nsSpinnerElement, 'ns-spinner')
        addClass(this.nsWindowElement, 'ns', 'ns-window')
        addClass(this.nsRootElement, 'ns-wrapper')
    }

    /**
     * # Assemble Element Structure
     * Assembles all elements connected to this splash instance in a fixed structure.
     * @private
     */
    private assembleElementStructure(): void
    {
        this.nsTextContainerElement.append(this.nsTextElement, this.nsSpinnerElement)
        this.nsContentElement.append(this.nsImageElement, this.nsTextContainerElement)
        this.nsWindowElement.append(this.nsContentElement)
        this.nsRootElement.append(this.nsWrapperElement, this.nsWindowElement)
    }

    /**
     * # Assemble Nanosplash Component
     * Assembles all elements into one component that represents the Nanosplash component.
     * @private
     */
    private assembleNSComponent(): void {
        this.nsRootElement.id = this.getId()
        setAttr(this.nsRootElement, 'data-ctx', 'nanosplash')
        this.assembleElementStructure()
        this.assignCSSClasses()
    }

    /**
     * # Get ID
     * @return string
     */
    public getId(): string
    {
        return this.id
    }

    /**
     * Get Text
     * @return string
     */
    public getText(): string
    {
        return this.nsTextElement.innerText
    }

    /**
     * # Set Text
     * @param {string} text Text
     * @return SplashInstance
     */
    public setText(text: string): SplashInstance {
        this.nsTextElement.innerText = text
        return this
    }

    /**
     * # Get Image Source
     * @return string | undefined
     */
    public getImgSrc(): string | undefined
    {
        return this.imgSrc
    }

    /**
     * # Set Image Source
     * @param {string|undefined} src Source URL
     * @return SplashInstance
     */
    public setImgSrc(src?: string): SplashInstance
    {
        this.nsImageElement.src = src ?? ''
        this.nsImageElement.style.display = src ? 'block' : 'none'
        this.assembleElementStructure()
        return this
    }

    /**
     * # Get Destination
     * @return HTMLElement | undefined
     */
    public getDestination(): HTMLElement | undefined
    {
        return this.destinationNode
    }

    /**
     * # Clean And Restore
     * Cleans and restore the DOM structure.
     * @private
     */
    private cleanAndRestore(): void
    {
        const currentParent = this.nsRootElement.parentElement
        if (currentParent) {
            this.restoreDOMStructure(currentParent)
        }
    }

    /**
     * # Reset Fullscreen Attributes
     * Removes the fullscreen attributes and CSS class names.
     * @private
     */
    private resetFullscreenAttributes(): void
    {
        setAttr(this.nsRootElement, 'style', '')
        this.nsRootElement.classList.remove('ns-fs')
    }

    /**
     * # Move With Regular Strategy
     * Moves the Nanosplash root element to the target node's position and essentially wraps the target node with the
     * Nanosplash root element.
     * @param {Node} targetNode
     * @private
     */
    private moveWithRegularStrategy(targetNode: Node): void
    {
        const targetParentNode = targetNode.parentNode
        if (targetParentNode) {
            this.restoreDOMStructure(targetParentNode)
            targetParentNode.replaceChild(this.nsRootElement, targetNode)
            this.nsWrapperElement.appendChild(targetNode)
        }
    }

    /**
     * # Move With Fullscreen Strategy
     * Moves the Nanosplash root element inside the body element.
     * @private
     */
    private moveWithFullscreenStrategy(): void
    {
        this.nsRootElement.classList.add('ns-fs')
        move(this.nsRootElement, document.body, true)
    }

    /**
     * # Replace Splash Instances Having Same Destination
     * Delete all Splash instances residing inside the same destination node.
     * @param {HTMLElement} destinationNode
     * @private
     */
    private replaceSplashInstancesHavingSameDestination(destinationNode: HTMLElement): void
    {
        const fnNotSameInstance = (v: SplashInstance) => v.getId() !== this.getId()
        const fnDelete = (v: SplashInstance) => v.delete()
        this.nsInstance.getFromDestinationNode(destinationNode).filter(fnNotSameInstance).forEach(fnDelete)
    }

    /**
     * # Move To
     * This function moves the Nanosplash root element to a destination.
     * @param {Destination} destination
     */
    public moveTo(destination: Destination): void
    {
        try {
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
        } catch (e) {
            console.warn(e)
        }
    }

    /**
     * # For Each Wrapped Node
     * Invokes a callback for each wrapped node.
     * @param {(node: Node) => void} callback
     * @private
     */
    private forEachWrappedNode(callback: (node: Node) => void): void
    {
        Array.from(this.nsWrapperElement.childNodes).forEach(callback)
    }

    /**
     * # Restore DOM Structure
     * Undo the node wrapping and restore the wrapped nodes' original DOM position.
     * @param {Node} parentNode
     * @private
     */
    private restoreDOMStructure(parentNode: Node): void
    {
        this.forEachWrappedNode((child: Node) => parentNode.insertBefore(child, this.nsRootElement))
    }

    /**
     * # Remove Elements From DOM
     * @private
     */
    private removeElementsFromDOM(): void
    {
        [
            this.nsTextElement,
            this.nsSpinnerElement,
            this.nsTextContainerElement,
            this.nsImageElement,
            this.nsContentElement,
            this.nsWrapperElement,
            this.nsWindowElement,
            this.nsRootElement
        ].forEach(v => v.remove())
    }

    /**
     * # Delete
     * Gracefully delete Splash instance and connected elements from DOM.
     */
    public delete(): void {
        this.cleanAndRestore()
        this.removeElementsFromDOM()
        this.nsInstance.delete(this)
    }
}
