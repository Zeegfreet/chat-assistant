import { Permission } from "@domain/models/Permission";

export interface LoadAuthUserByPkRepository {
    loadByPk(id: LoadAuthUserByPkRepository.UserID): Promise<LoadAuthUserByPkRepository.AuthUser>
}

export namespace LoadAuthUserByPkRepository {
    export type UserID = number
    export type AuthUser = {
        id: number,
        name: string,
        email: string
        isAdmin: boolean,
        isActive: boolean,
        isBlocked: boolean,
        isVerified: boolean,
        roles: string[],
        permissions: Pick<Permission, "resource" | "method">[]
    } | null
}