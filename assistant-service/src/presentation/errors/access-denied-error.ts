import { ServerError } from "./server-error";

export class AccessDeniedError extends ServerError {
    constructor(){
        super();
        this.message = "Access denied";
        this.errorCode = "ACCESS_DENIED_ERROR";
        this.statusCode = 401;
    }
}