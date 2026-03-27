import { LoggedUser } from "@domain/models/LoggedUser";

export interface CreatePairTokens {
    create(userId: CreatePairTokens.UserId, sessionId: CreatePairTokens.SessionId, secret?: CreatePairTokens.Secret): Promise<CreatePairTokens.Result>
}

export namespace CreatePairTokens {
    export type UserId = number
    export type SessionId = string
    export type Secret = string
    export type Result = {
        user: LoggedUser
        accessToken: string
        refreshToken: string
    }
}