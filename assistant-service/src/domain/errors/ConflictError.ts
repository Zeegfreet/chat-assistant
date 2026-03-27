import { DomainError } from "./DomainError";

export class ConflictError extends DomainError {
    constructor(message: string){
        super();
        this.message = message;
        this.errorCode = "CONFLICT_ERROR";
        this.statusCode = 409;

    }
};