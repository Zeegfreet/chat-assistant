
export interface SignOut {
    logout(sessionId: SignOut.SessionId): Promise<void>
}

export namespace SignOut {
    export type SessionId = string;
    export type Result = void
}