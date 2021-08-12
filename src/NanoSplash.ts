import InvalidDestinationException from "./Exceptions/InvalidDestinationException";
import {
  appendFirst,
  display,
  fitParentDimensions,
  get,
  mk,
  move,
  setAttribute,
} from "./util/dom";
import "./style.sass";
import { SplashAnimation, Config, DestinationController, Destination } from "nanosplash";

declare global {
  interface Window {
    attachEvent: Function;
  }
}

/**
 * NanoSplash
 *
 * @author Isak K. Hauge
 * @version 2.0
 */
export class NanoSplash {
  // Instance members
  private defaultDestination: Element;
  private defaultText: string;
  private readonly mainElement: HTMLDivElement;
  private readonly splashElement: HTMLImageElement;
  private readonly textElement: HTMLDivElement;

  // Static class defaults
  private static readonly DEFAULT_TEXT: string = "Loading ...";
  private static readonly DEFAULT_TEXT_FONT: string = '"Arial", sans-serif';
  private static readonly DEFAULT_TEXT_COLOR: string = "#555";
  private static readonly DEFAULT_TEXT_SIZE: string = "1.5rem";
  private static readonly DEFAULT_SPLASH_SOURCE = null;
  private static readonly DEFAULT_SPLASH_WIDTH: string = "100px";
  private static readonly DEFAULT_SPLASH_ANIMATION: SplashAnimation = "pulse";
  private static readonly DEFAULT_DESTINATION: Element = document.body;
  private static readonly DEFAULT_BACKGROUND_COLOR: string =
    "rgba(255, 255, 255, 0.75)";
  private static readonly DEFAULT_BACKGROUND_BLUR: boolean = true;

  public constructor(config?: Config) {
    this.defaultText = NanoSplash.DEFAULT_TEXT;
    this.defaultDestination = NanoSplash.DEFAULT_DESTINATION;

    // Build UI elements
    this.mainElement = NanoSplash.makeMainElement();
    this.splashElement = NanoSplash.makeSplashElement();
    this.textElement = NanoSplash.makeTextElement();

    // Assemble UI elements
    NanoSplash.assembleElements(
      this.mainElement,
      this.splashElement,
      this.textElement
    );

    // Insert loader into destination element
    appendFirst(NanoSplash.DEFAULT_DESTINATION, this.mainElement);
    display(this.mainElement, false);
    fitParentDimensions(this.mainElement);

    // Set default configuration
    this.setDefaultStyles();

    if (config) {
      this.configure(config)
    }
  }

  /**
   * Configure
   *
   * @param {Config} config
   */
  public configure(config: Config): NanoSplash {
    if (config?.default?.destination) {
      this.defaultDestination = NanoSplash.getDestinationElement(
        config.default.destination
      );
    }

    this.defaultText ||= config.default?.text as string;

    // Text:
    if (config.text?.family) {
      this.setTextFontFamily(config.text.family);
    }
    if (config.text?.color) {
      this.setTextColor(config.text.color);
    }
    if (config.text?.size) {
      this.setTextSize(config.text.size);
    }

    // Background:
    if (config.background?.color) {
      this.setBackgroundColor(config.background.color);
    }
    if (config.background?.blur !== undefined) {
      this.setBackgroundBlur(config.background.blur);
    }

    // Splash:
    if (config.splash) {
      if (config.splash?.src) {
        this.setSplashSource(config.splash.src);
      }
      if (config.splash?.width) {
        this.setSplashWidth(config.splash.width);
      }
      if (config.splash?.animation) {
        this.setSplashAnimation(config.splash.animation);
      }
    } else {
      display(this.splashElement, false);
    }

    return this;
  }

  /**
   * Set Default Styles
   * @private
   */
  private setDefaultStyles(): void {
    this.setTextFontFamily(NanoSplash.DEFAULT_TEXT_FONT);
    this.setTextColor(NanoSplash.DEFAULT_TEXT_COLOR);
    this.setTextSize(NanoSplash.DEFAULT_TEXT_SIZE);
    this.setSplashWidth(NanoSplash.DEFAULT_SPLASH_WIDTH);
    this.setSplashAnimation(NanoSplash.DEFAULT_SPLASH_ANIMATION);
    this.setBackgroundColor(NanoSplash.DEFAULT_BACKGROUND_COLOR);
    this.setBackgroundBlur(NanoSplash.DEFAULT_BACKGROUND_BLUR);
  }

  /**
   * Show
   *
   * @param {string} text
   */
  public show(text?: string): DestinationController {
    this.setText(text ?? NanoSplash.DEFAULT_TEXT);
    display(this.mainElement, true);

    const parent = this.mainElement.parentNode
    if (parent && parent !== document.body) {
      fitParentDimensions(this.mainElement)
    }

    return {
      inside: (destination: Destination) => this.moveTo(destination),
    };
  }

  /**
   * Hide
   */
  public hide(): void {
    display(this.mainElement, false);
    this.setText(this.defaultText);
    this.moveTo(this.defaultDestination);
  }

  /**
   * Move To
   *
   * @param destination
   * @private
   */
  private moveTo(destination: Destination): void {
    const destinationNode = NanoSplash.getDestinationElement(destination);
    const parentNode = this.mainElement.parentNode;
    if (parentNode) {
      move(this.mainElement, destinationNode);
    } else {
      appendFirst(destinationNode, this.mainElement);
    }
    fitParentDimensions(this.mainElement);
  }

  /**
   * Make Main Element
   *
   * @private
   */
  private static makeMainElement(): HTMLDivElement {
    const mainElement = mk("div", {
      className: "nanosplash-container",
      attributes: [
        { key: "data-blur", value: String(NanoSplash.DEFAULT_BACKGROUND_BLUR) },
        {
          key: "data-splash-animation",
          value: NanoSplash.DEFAULT_SPLASH_ANIMATION,
        },
      ],
    }) as HTMLDivElement;
    mainElement.style.backgroundColor = NanoSplash.DEFAULT_BACKGROUND_COLOR;
    return mainElement;
  }

  /**
   * Make Splash Element
   *
   * @private
   */
  private static makeSplashElement(): HTMLImageElement {
    const splashElement = mk("img", {
      className: "nanosplash-img",
      attributes: [
        { key: "src", value: NanoSplash.DEFAULT_SPLASH_SOURCE },
        { key: "alt", value: "NanoSplash indicator" },
      ],
    }) as HTMLImageElement;
    display(splashElement, false);
    return splashElement;
  }

  /**
   * Make Text Element
   *
   * @private
   */
  private static makeTextElement(): HTMLDivElement {
    return mk("div", {
      className: "nanosplash-text",
      content: NanoSplash.DEFAULT_TEXT,
    }) as HTMLDivElement;
  }

  /**
   * Assemble Elements
   *
   * @param containerElement
   * @param splashElement
   * @param textElement
   * @private
   * @static
   */
  private static assembleElements(
    containerElement: Node,
    splashElement: Node | null,
    textElement: Node
  ): void {
    if (splashElement) {
      containerElement.appendChild(splashElement);
    }
    containerElement.appendChild(textElement);
  }

  /**
   * Set Text
   *
   * @param {string} text
   * @private
   */
  private setText(text: string) {
    this.textElement.innerText = text;
  }

  /**
   * Set Text Font Family
   *
   * @param {string} fontFamily
   * @private
   */
  private setTextFontFamily(fontFamily: string): void {
    this.textElement.style.fontFamily = fontFamily;
  }

  /**
   * Set Text Color
   *
   * @param {string} color
   * @private
   */
  private setTextColor(color: string): void {
    this.textElement.style.color = color;
  }

  /**
   * Set Text Size
   *
   * @param {string} fontSize
   * @private
   */
  private setTextSize(fontSize: string): void {
    this.textElement.style.fontSize = fontSize;
  }

  /**
   * Set Splash Source
   *
   * @param {string} src
   * @private
   */
  private setSplashSource(src: string): void {
    this.splashElement.src = src;
    display(this.splashElement, true);
  }

  /**
   * Set Splash Width
   *
   * @param {string} width
   * @private
   */
  private setSplashWidth(width: string): void {
    this.splashElement.style.width = width;
  }

  /**
   * Set Splash Animation
   *
   * @param {SplashAnimation} animation
   * @private
   */
  private setSplashAnimation(animation: SplashAnimation): void {
    setAttribute(this.mainElement, "data-splash-animation", animation);
  }

  /**
   * Set Background Color
   *
   * @param color
   * @private
   */
  private setBackgroundColor(color: string): void {
    this.mainElement.style.backgroundColor = color;
  }

  /**
   * Set Background Blur
   *
   * @param {boolean} enable
   * @private
   */
  private setBackgroundBlur(enable: boolean): void {
    setAttribute(this.mainElement, "data-blur", String(enable));
  }

  /**
   * @throws InvalidDestinationException
   * @private
   */
  private static getDestinationElement(destination: Destination): Element {
    const isString = typeof destination === "string";
    if (isString) {
      const destinationObject = get(destination as string);
      if (NanoSplash.isElementOrNode(destinationObject)) {
        return destinationObject as Element;
      }
      throw new InvalidDestinationException(
        "The DOM selector does not point to an Element"
      );
    } else if (NanoSplash.isFunction(destination)) {
      const destinationObject = (destination as Function)();
      if (NanoSplash.isElementOrNode(destinationObject)) {
        return destinationObject;
      }
      throw new InvalidDestinationException(
        "The destination callback returned an invalid value"
      );
    } else if (NanoSplash.isElementOrNode(destination)) {
      return destination as Element;
    }
    throw new InvalidDestinationException();
  }

  /**
   * Is Element or Node
   *
   * @param {any} value
   * @private
   * @static
   */
  private static isElementOrNode(value: any): boolean {
    return value instanceof Element || value instanceof Node;
  }

  /**
   * Is Function
   *
   * @param value
   * @private
   * @static
   */
  private static isFunction(value: any): boolean {
    return value && {}.toString.call(value) === "[object Function]";
  }

  /**
   * Inject Instance Into Global Scope
   *
   * @param {NanoSplash} instance
   * @private
   * @static
   */
  public static injectInstanceIntoGlobalScope(instance: NanoSplash): void {
    Object.defineProperty(window, "splash", {
      value: instance,
      writable: false,
    });
    NanoSplash.adaptSizeOnResize(instance.mainElement);
  }

  private static adaptSizeOnResize(node: HTMLElement): void {
    if (window.attachEvent) {
      window.attachEvent("onresize", function () {
        fitParentDimensions(node);
      });
    } else if (window.addEventListener) {
      window.addEventListener(
        "resize",
        function () {
          fitParentDimensions(node);
        },
        true
      );
    }
  }
}