
export interface VerifySessionIsInBlackListRepository {
    verify(sessionId:  VerifySessionIsInBlackListRepository.SessionId): Promise<VerifySessionIsInBlackListRepository.Response>
}

export namespace VerifySessionIsInBlackListRepository {
    export type SessionId = string
    export type Response = boolean
}