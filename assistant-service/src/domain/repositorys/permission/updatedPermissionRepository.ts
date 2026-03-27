import { Permission } from "@domain/models/Permission";

export interface UpdatePermissionRepository {
    update(id: UpdatePermissionRepository.Id, payload: UpdatePermissionRepository.Payload): Promise<UpdatePermissionRepository.Result>
}

export namespace UpdatePermissionRepository{
    export type Id = number
    export type Payload = Partial<Omit<Permission, "id" | "createdAt" | "updatedAt">>
    export type Result = Permission
}