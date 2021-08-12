declare module 'nanosplash' {
  /**
   * NanoSplash
   *
   * @author Isak K. Hauge
   * @version 2.0
   */
  class NanoSplash {
    constructor(config?: Config);

    /**
     * Configure
     *
     * @param {Config} config
     */
    configure(config: Config): NanoSplash;

    /**
     * Show
     *
     * @param {string} text
     */
    show(text?: string): DestinationController;

    /**
     * Hide
     */
    hide(): void;

    /**
     * Inject Instance Into Global Scope
     *
     * @param {NanoSplash} instance
     * @private
     * @static
     */
    static injectInstanceIntoGlobalScope(instance: NanoSplash): void;
  }

  type SplashAnimation = "none" | "pulse" | "spin";
  
  type DefaultOptions = {
    destination?: Destination;
    text?: string;
  };
  
  type TextOptions = {
    family?: string;
    color?: string;
    size?: string;
  };
  
  type SplashOptions = {
    src?: string;
    width?: string;
    animation?: SplashAnimation;
  };
  
  type BackgroundOptions = {
    color?: string;
    blur?: boolean;
  };
  
  type Destination = Node | Element | DestinationCallback | string;
  
  type DestinationCallback = () => Element;
  
  type Config = {
    default?: DefaultOptions;
    text?: TextOptions;
    splash?: SplashOptions;
    background?: BackgroundOptions;
  };
  
  type DestinationController = {
    inside: (destination: Destination) => void;
  };

  type MakeOptions = {
      id?: string
      className?: string
      attributes?: {key: string, value: string | null}[]
      eventListeners?: {event: keyof HTMLElementEventMap, handler: EventListener}[],
      content?: Node | Element | HTMLElement | string
  }
}