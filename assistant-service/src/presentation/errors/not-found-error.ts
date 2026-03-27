import { ServerError } from "./server-error";

export class NotFoundError extends ServerError {
    constructor(message: string){
        super();
        this.message = `Not found: ${message}` ;
        this.errorCode = "NOT_FOUND_ERROR";
        this.statusCode = 404;
    }
}