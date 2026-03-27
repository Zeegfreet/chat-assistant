import { ServerError } from "./server-error";

export class ValidationError extends ServerError {
    constructor(message: string){
        super();
        this.message = message;
        this.errorCode = "VALIDATION_ERROR";
        this.statusCode = 400;
    }
}