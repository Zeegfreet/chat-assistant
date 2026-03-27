
export interface DeleteUserRepository {
    delete(id: DeleteUserRepository.Params): Promise<DeleteUserRepository.Result>
}

export namespace DeleteUserRepository {
    export type Params = number
    export type Result = Error | void
}