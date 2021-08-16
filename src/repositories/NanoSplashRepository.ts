import { BlurMode, SplashAnimation } from 'nanosplash'
import { create, display } from '../utilities/dom'

export class NanoSplashRepository {
	public static readonly DEFAULT = {
		DESTINATION_NODE: document.body,
		TEXT: 'Loading ...',
		TEXT_FONT: '"Arial", sans-serif',
		TEXT_WEIGHT: 'medium',
		TEXT_COLOR: '#555',
		TEXT_SIZE: '26px',
		SPLASH_SOURCE: 'favicon.svg',
		SPLASH_WIDTH: '100px',
		SPLASH_HEIGHT: 'auto',
		SPLASH_ANIMATION: 'pulse' as SplashAnimation,
		BACKGROUND_COLOR: 'rgba(255, 255, 255, 0.90)',
		BACKGROUND_BLUR: 'light' as BlurMode,
	}

	/**
	 * Make Main Element
	 */
	public static makeMainElement(): HTMLDivElement {
		const mainElement = create('div', {
			className: 'nanosplash-container',
			attributes: [
				{
					key: 'data-splash-animation',
					value: this.DEFAULT.SPLASH_ANIMATION,
				},
			],
		}) as HTMLDivElement
		mainElement.style.backgroundColor = this.DEFAULT.BACKGROUND_COLOR
		return mainElement
	}

	/**
	 * Make Splash Element
	 */
	public static makeSplashElement(): HTMLImageElement {
		const splashElement = create('img', {
			className: 'nanosplash-img',
			attributes: [
				{ key: 'src', value: this.DEFAULT.SPLASH_SOURCE },
				{ key: 'alt', value: 'NanoSplash indicator' },
			],
		}) as HTMLImageElement
		display(splashElement, false)
		return splashElement
	}

	/**
	 * Make Text Element
	 */
	public static makeTextElement(): HTMLDivElement {
		return create('div', {
			className: 'nanosplash-text',
			content: this.DEFAULT.TEXT,
		}) as HTMLDivElement
	}
}
