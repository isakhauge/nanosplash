class Exception extends Error {
	public constructor(message?: string) {
		super(message)
		this.name = this.constructor.name
	}

	public getName(): string {
		return this.constructor.name
	}
}

export default Exception
