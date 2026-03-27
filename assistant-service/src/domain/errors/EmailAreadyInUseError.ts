import { DomainError } from "./DomainError";

export class EmailAlreadyExistsError extends DomainError {
    constructor(message: string = "The received email already exists"){
        super();
        this.message = message;
        this.errorCode = "EMAIL_ALREADY_EXISTS_ERROR";
        this.statusCode = 409;

    }
};