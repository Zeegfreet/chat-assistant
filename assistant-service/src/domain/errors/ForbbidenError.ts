import { DomainError } from "./DomainError";

export class ForbiddenError extends DomainError {
    constructor(message: string){
        super();
        this.message = message;
        this.errorCode = "FORBIDDEN_ERROR";
        this.statusCode = 403;

    }
};