import { Permission } from "@domain/models/Permission";

export interface FindPermissionByPk {
    findById(id: FindPermissionByPk.Id): Promise<FindPermissionByPk.Result>
}

export namespace FindPermissionByPk{
    export type Id = number
    export type Result = Permission
}