import { User } from "@domain/models/User";

export interface SignUp {
    add(payload: SignUp.Params): Promise<SignUp.Result>;
}

export namespace SignUp {
    export type Params = {
        name: string,
        email: string,
        password: string,
    }
    export type Result = Omit<User, 
        | "password"
        | "deletedAt"
        | "isDeleted"
        | "isVerified"
        | "isBlocked"
        | "isAdmin"
        | "isActive">
}