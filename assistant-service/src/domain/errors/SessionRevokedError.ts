import { DomainError } from "./DomainError";

export class SessionRevokedError extends DomainError {
    constructor(){
        super();
        this.message = "The received credentials is revoked, please signIn again";
        this.errorCode = "SESSION_REVOKED_ERROR";
        this.statusCode = 403;

    }
};