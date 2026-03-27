import { ServerError } from "./server-error";

export class ConstraintError extends ServerError {
    constructor(){
        super();
        this.message = "Any unique";
        this.errorCode = "ACCESS_DENIED_ERROR";
        this.statusCode = 401;
    }
}