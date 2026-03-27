import { ServerError } from "./server-error";

export class EmailInUseError extends ServerError{
    constructor(){
        super();
        this.message = "The received email is already in use";
        this.errorCode = "BUSY_EMAIL_ERROR";
        this.statusCode = 400;
    }
}