import { DomainError } from "./DomainError";

export class ValidationError extends DomainError {
    constructor(message: string){
        super();
        this.message = message;
        this.errorCode = "VALIDATION_ERROR";
        this.statusCode = 400;

    }
};