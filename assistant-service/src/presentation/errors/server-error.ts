export class ServerError extends Error {
    statusCode: number;
    errorCode?: string;
    constructor(message: string = "Internal Server Error", statusCode: number = 500){
        super();
        this.message = message;
        this.errorCode = "UNKNOWN_ERROR";
        this.statusCode = statusCode;
    }
};