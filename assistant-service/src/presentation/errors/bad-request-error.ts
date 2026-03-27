import { ServerError } from "./server-error";

export class BadRequestError extends ServerError {
    constructor(message: string){
        super();
        this.message = message;
        this.errorCode = "BAD_REQUEST_ERROR";
        this.statusCode = 400;

    }
};