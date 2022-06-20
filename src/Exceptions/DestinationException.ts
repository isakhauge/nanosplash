import Exception from "./Exception";
import {Destination} from "../types";

class DestinationException extends Exception {
    public destination: Destination
    public constructor(message: string, destination: Destination, cause: Exception) {
        super(message);
        this.destination = destination
        this.cause = cause
    }
}

export default DestinationException
