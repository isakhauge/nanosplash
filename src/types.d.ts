declare module 'nanosplash' {
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

    export type MakeOptions = {
        id?: string
        className?: string
        attributes?: {key: string, value: string | null}[]
        eventListeners?: {event: keyof HTMLElementEventMap, handler: EventListener}[],
        content?: Node | Element | HTMLElement | string
    }
}