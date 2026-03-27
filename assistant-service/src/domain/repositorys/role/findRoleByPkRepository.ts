import { Role } from "@domain/models/Role";

export interface FindRoleByPkRepository {
    findById(id: FindRoleByPkRepository.Id): Promise<FindRoleByPkRepository.Result>
}

export namespace FindRoleByPkRepository{
    export type Id = number
    export type Result = Role | null
}