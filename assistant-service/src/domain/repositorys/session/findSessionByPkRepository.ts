import { Session } from "@domain/models/Session";

export interface FindSessionByPkRepository {
    findByPk(sessionId: FindSessionByPkRepository.SessionId): Promise<FindSessionByPkRepository.Result>
}

export namespace FindSessionByPkRepository{
    export type SessionId = string
    export type Result = Omit<Session, "user"> | null
}