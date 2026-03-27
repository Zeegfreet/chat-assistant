import { User } from "@domain/models/User";

export interface ListUsersRepository {
    list(): Promise<ListUsersRepository.Result[]>
}

export namespace ListUsersRepository {
    export type Result = Omit<User, 
    | "password"
    | "deletedAt"
    | "isDeleted"
    | "roles">
}