class Exception extends Error {
    public constructor(message?: string, cause?: Exception) {
        super(message);
        this.name = this.constructor.name
        this.cause = cause
    }
}

export default Exception
