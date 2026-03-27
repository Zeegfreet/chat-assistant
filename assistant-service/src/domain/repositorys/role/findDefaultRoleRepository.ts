import { Role } from "@domain/models/Role";

export interface FindDefaultRoleRepository {
    find(): Promise<FindDefaultRoleRepository.Result>
}

export namespace FindDefaultRoleRepository{
    export type Result = Role[]
}