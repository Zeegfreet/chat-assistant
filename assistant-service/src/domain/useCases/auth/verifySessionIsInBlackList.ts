
export interface VerifySessionIsInBlackList {
    verify(sessionId: VerifySessionIsInBlackList.SessionId): Promise<VerifySessionIsInBlackList.Result>
}

export namespace VerifySessionIsInBlackList {
    export type SessionId = string
    export type Result = boolean
}