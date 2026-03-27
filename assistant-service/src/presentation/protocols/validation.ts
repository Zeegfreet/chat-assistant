import { HttpRequest } from "../../presentation/protocols/http";

export interface Validation{
    validate(input: HttpRequest): Promise<Error | void>
}