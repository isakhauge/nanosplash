import Exception from "./Exception";

class IllegalArgumentException extends Exception {
    public argument: any
    public constructor(message: string, argument: any) {
        super(message);
        this.argument = argument
    }
}

export default IllegalArgumentException
