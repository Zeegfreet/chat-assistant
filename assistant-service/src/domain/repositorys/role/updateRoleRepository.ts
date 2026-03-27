import { Role } from "@domain/models/Role";

export interface UpdateRoleRepository {
    update(id: UpdateRoleRepository.Id, payload: UpdateRoleRepository.Payload): Promise<UpdateRoleRepository.Result>
}

export namespace UpdateRoleRepository{
    export type Id = number
    export type Payload = Partial<Omit<Role, "id" | "createdAt" | "updatedAt">>
    export type Result = Role
}