import Exception from "./Exception";
declare class InvalidDestinationException extends Exception {
    constructor(message?: string);
}
export default InvalidDestinationException;
