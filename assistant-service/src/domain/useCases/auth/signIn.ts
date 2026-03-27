import { LoggedUser } from "@domain/models/LoggedUser";

export interface SignIn {
    login(payload: SignIn.Params): Promise<SignIn.Result>
}

export namespace SignIn {
    export type Params = {
        email: string,
        password: string,
    }
    export type Result = {
        user: LoggedUser
        accessToken: string,
        refreshToken: string
    }
}