import Exception from './Exception'

class MissingResourceException extends Exception {
	public constructor(message?: string) {
		super(message)
	}
}

export default MissingResourceException
