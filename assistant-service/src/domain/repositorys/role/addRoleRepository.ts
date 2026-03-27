import { Role } from "@domain/models/Role";

export interface AddRoleRepository {
    add(payload: AddRoleRepository.Params): Promise<AddRoleRepository.Result>
}

export namespace AddRoleRepository {
    export type Params = {
        role: string,
        description: string,
        isActive?: boolean,
        isDefault?: boolean,
        permissions?: { id: number }[]
    }
    export type Result = Role
}