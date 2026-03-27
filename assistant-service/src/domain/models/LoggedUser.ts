import { Permission } from "./Permission";

export interface LoggedUser {
    id: number,
    sessionId?: string,
    name: string,
    email: string,
    isAdmin: boolean,
    roles: string[],
    permissions: Pick<Permission, "resource" | "method">[]
}