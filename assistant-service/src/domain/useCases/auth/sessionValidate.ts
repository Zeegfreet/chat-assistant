import { LoggedUser } from "@domain/models/LoggedUser";

export interface SessionValidate {
    validate(userId: SessionValidate.UserId, sessionId: SessionValidate.SessionId): Promise<SessionValidate.Response>
}

export namespace SessionValidate {
    export type UserId = number
    export type SessionId = string
    export type Response = LoggedUser
}