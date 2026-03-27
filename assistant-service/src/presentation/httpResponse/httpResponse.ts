import { DomainError } from "@domain/errors/DomainError";
import { ServerError } from "@presentation/errors";
import { HttpResponseCode } from "@presentation/protocols/enums/httpResponseCode";
import { HttpResponse } from "@presentation/protocols/http";

export const signed = (body: HttpResponse.Body, cookies?: HttpResponse.Cookies): HttpResponse => ({
    statusCode: HttpResponseCode.SUCCESS,
    body: body,
    cookies: cookies
});

export const onCreate = (body: HttpResponse.Body): HttpResponse => ({
    statusCode: HttpResponseCode.SUCCESS_CREATED,
    body: body
});

export const onSuccessNoBody = (): HttpResponse => ({
    statusCode: HttpResponseCode.SUCCESS_NO_CONTENT
});

export const onSearch = (data: HttpResponse.Body): HttpResponse => ({
    statusCode: HttpResponseCode.SUCCESS,
    body: data
});

export const onSuccess = (data: HttpResponse.Body): HttpResponse => ({
    statusCode: HttpResponseCode.SUCCESS,
    body: data
});

export const errorHandler = (error: Error): HttpResponse => {

    if(error instanceof ServerError || error instanceof DomainError){
        return {
            statusCode: error.statusCode,
            errorCode: error.errorCode,
            message: error.message,
            primitiveError: JSON.stringify(error)
        };
    }

    return {
        statusCode: 500,
        errorCode:  "UNKNOWN_ERROR",
        message: "Internal Server Error",
        primitiveError: error.message
    };
};