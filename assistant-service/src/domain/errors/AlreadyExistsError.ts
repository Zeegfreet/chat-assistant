import { DomainError } from "./DomainError";

export class AlreadyExistsError extends DomainError {
    constructor(message: string = "The received data already exists."){
        super();
        this.message = message;
        this.errorCode = "ALREADY_EXISTS_ERROR";
        this.statusCode = 409;

    }
};