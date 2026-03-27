
export interface DeleteUser {
    delete(payload: DeleteUser.Params, requesterId: DeleteUser.RequesterId): Promise<DeleteUser.Result>
}

export namespace DeleteUser {
    export type Params = {
        id: number
    }
    export type RequesterId = number
    export type Result = void
}