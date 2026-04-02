import { ServerError } from "./server-error";

export class SessionExpiredError extends ServerError {
    constructor(message: string = "The received credentials is expired, refresh u'r session."){
        super();
        this.message = message;
        this.errorCode = "SESSION_EXPIRED_ERROR";
        this.statusCode = 401;

    }
};