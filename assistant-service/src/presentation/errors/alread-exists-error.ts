import { ServerError } from "./server-error";

export class AlreadExistsError extends ServerError {
    constructor(message: string){
        super();
        this.message = message;
        this.errorCode = "ALREAD_EXISTS_ERROR";
        this.statusCode = 409;

    }
};