import { DomainError } from "./DomainError";

export class AccessDeniedError extends DomainError {
    constructor(message: string = "Access denied"){
        super();
        this.message = message;
        this.errorCode = "ACCESS_DENIED_ERROR";
        this.statusCode = 401;
    }
}