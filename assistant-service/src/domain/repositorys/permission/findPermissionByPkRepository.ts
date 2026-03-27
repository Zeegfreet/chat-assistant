import { Permission } from "@domain/models/Permission";

export interface FindPermissionByPkRepository {
    findById(id: FindPermissionByPkRepository.Id): Promise<FindPermissionByPkRepository.Result>
}

export namespace FindPermissionByPkRepository{
    export type Id = number
    export type Result = Permission | null
}