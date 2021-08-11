import Exception from "./Exception";

class InvalidDestinationException extends Exception {
    public constructor(message?: string) {
        super(message);
    }
}

export default InvalidDestinationException
