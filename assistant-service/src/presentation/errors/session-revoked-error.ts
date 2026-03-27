import { ServerError } from "./server-error";

export class SessionRevokedError extends ServerError {
    constructor(){
        super();
        this.message = "Currently session is revoked";
        this.errorCode = "SESSION_REVOKED_ERROR";
        this.statusCode = 401;
    }
}