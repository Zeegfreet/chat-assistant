import { Role } from "@domain/models/Role";
import { User } from "@domain/models/User";

export interface AddUser {
    add(payload: AddUser.Params): Promise<AddUser.Result>;
}

export namespace AddUser {
    export type Params = {
        name: string;
        email: string;
        password: string;
        isActive?: boolean;
        isAdmin?: boolean;
        isBlocked?: boolean;
        isVerified?: boolean;
        roles?: Pick<Role, "id">[];
    }
    export type Result = Omit<User, 
    | "password"
    | "deletedAt"
    | "isDeleted">
}