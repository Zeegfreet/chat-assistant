import { DomainError } from "./DomainError";

export class NotFoundError extends DomainError {
    constructor(message: string){
        super();
        this.message = `${message}` ;
        this.errorCode = "NOT_FOUND_ERROR";
        this.statusCode = 404;
    }
}