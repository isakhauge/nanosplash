import Exception from "./Exception";

class IllegalArgumentException extends Exception {
    public constructor(message?: string) {
        super(message);
    }
}

export default IllegalArgumentException
