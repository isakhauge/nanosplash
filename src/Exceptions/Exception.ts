class Exception extends Error {
    public constructor(message?: string) {
        super(message);
    }

    public getName(): string {
        return this.constructor.name
    }
}

export default Exception
