import { ServerError } from "./server-error";

export class SignInError extends ServerError {
    constructor(message: string = "email or password invalid."){
        super();
        this.message = message;
        this.errorCode = "SIGNIN_ERROR";
        this.statusCode = 401;
    }
}