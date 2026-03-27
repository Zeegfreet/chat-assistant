import { LoggedUser } from "@domain/models/LoggedUser";

export interface RefreshSession {
    refresh(refreshToken: RefreshSession.RefreshToken): Promise<RefreshSession.Result>
}

export namespace RefreshSession {
    export type RefreshToken = string
    export type Result = {
            user: LoggedUser
            accessToken: string
            refreshToken: string
        }
}