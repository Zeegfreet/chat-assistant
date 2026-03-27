import { User } from "@domain/models/User";

export interface ListUsers {
    list(): Promise<ListUsers.Result[]>
}

export namespace ListUsers {
    export type Result = Omit<User, "password" | "deletedAt" | "roles" | "isDeleted">
}