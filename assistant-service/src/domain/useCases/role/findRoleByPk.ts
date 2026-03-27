import { Role } from "@domain/models/Role";

export interface FindRoleByPk {
    findById(id: FindRoleByPk.Id): Promise<FindRoleByPk.Result>
}

export namespace FindRoleByPk{
    export type Id = number
    export type Result = Role
}