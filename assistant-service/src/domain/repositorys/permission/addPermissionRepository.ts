import { Permission } from "@domain/models/Permission";

export interface AddPermissionRepository {
    add(permission: AddPermissionRepository.Params): Promise<AddPermissionRepository.Result>
}

export namespace AddPermissionRepository {
    export type Params = {
        resource: string
        method: string
    }

    export type Result = Permission
}