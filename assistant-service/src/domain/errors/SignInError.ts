import { DomainError } from "./DomainError";

export class SignInError extends DomainError {
    constructor(message: string = "The received credentials are inválid"){
        super();
        this.message = message;
        this.errorCode = "INVALID_CREDENTIALS_ERROR";
        this.statusCode = 401;

    }
};