import { Role } from "@domain/models/Role";
import { User } from "@domain/models/User";

export interface AddUserRepository {
    add(userData: AddUserRepository.Params): Promise<AddUserRepository.Result>;
}

export namespace AddUserRepository {
    export type Params = {
        name: string;
        email: string;
        password: string;
        isActive?: boolean;
        isAdmin?: boolean;
        isBlocked?: boolean;
        roles?: Pick<Role, "id">[];
    }
    export type Result = Omit<User, 
    | "password"
    | "deletedAt"
    | "isDeleted"
    >
}