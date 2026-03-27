import { Role } from "@domain/models/Role";

export interface UpdateRole {
    update(id: UpdateRole.Id, payload: UpdateRole.Payload): Promise<UpdateRole.Result>
}

export namespace UpdateRole{
    export type Id = number
    export type Payload = Partial<Omit<Role, "id" | "createdAt" | "updatedAt">>
    export type Result = Role
}