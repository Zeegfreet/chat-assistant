import { DomainError } from "./DomainError";

export class SessionExpiredError extends DomainError {
    constructor(message: string = "The received credentials is expired, re-create u`r session."){
        super();
        this.message = message;
        this.errorCode = "SESSION_EXPIRED_ERROR";
        this.statusCode = 401;

    }
};