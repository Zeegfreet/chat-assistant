import { Permission } from "@domain/models/Permission";

export interface UpdatePermission {
    update(id: UpdatePermission.Id, payload: UpdatePermission.Payload): Promise<UpdatePermission.Result>
}

export namespace UpdatePermission{
    export type Id = number
    export type Payload = Omit<Permission, "id" | "createdAt" | "updatedAt">
    export type Result = Permission
}