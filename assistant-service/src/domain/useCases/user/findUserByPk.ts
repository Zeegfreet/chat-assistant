import { User } from "@domain/models/User";

export interface FindUserByPk {
    find(id: FindUserByPk.Params): Promise<FindUserByPk.Result>
}

export namespace FindUserByPk {
    export type Params = number
    export type Result = Omit<User, 
    | "password"
    | "isDeleted"
    | "deletedAt">
}