import { User } from "@domain/models/User";

export interface FindUserByEmailRepository {
    findByEmail(email: FindUserByEmailRepository.Params): Promise<FindUserByEmailRepository.Result>;
    findByEmailWithRoles(email: FindUserByEmailRepository.Params): Promise<FindUserByEmailRepository.ResultWithRoles>
}

export namespace FindUserByEmailRepository {
    export type Params = string
    export type Result = Omit<User, 
    | "deletedAt"
    | "roles"
    | "isDeleted"> | null
    export type ResultWithRoles = Omit<User, 
    | "deletedAt"
    | "isDeleted">
}