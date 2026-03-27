import { Role } from "@domain/models/Role";

export interface AddRole {
    add(payload: AddRole.Params): Promise<AddRole.Result>
}

export namespace AddRole {
    export type Params = {
        role: string,
        description: string,
        isActive?: boolean,
        isDefault?: boolean,
        permissions?: { id: number }[]
    }
    export type Result = Role
}