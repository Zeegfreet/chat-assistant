import { Permission } from "@domain/models/Permission";

export interface LoadAuthUserByEmailRepository {
    loadByEmail(email: LoadAuthUserByEmailRepository.Email): Promise<LoadAuthUserByEmailRepository.AuthUser>
}

export namespace LoadAuthUserByEmailRepository {
    export type Email = string
    export type AuthUser = {
        id: number,
        name: string,
        email: string
        password: string,
        isAdmin: boolean,
        isActive: boolean,
        isBlocked: boolean,
        isVerified: boolean,
        roles: string[],
        permissions: Pick<Permission, "resource" | "method">[]
    } | null
}