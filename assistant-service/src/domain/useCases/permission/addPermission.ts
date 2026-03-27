import { Permission } from "@domain/models/Permission";

export interface AddPermission {
    add(payload: AddPermission.Params): Promise<AddPermission.Result>
}

export namespace AddPermission {
    export type Params = {
        resource: string,
        method: string
    }
    export type Result = Permission
}