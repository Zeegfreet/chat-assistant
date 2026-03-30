
export interface DeleteCredentialRepository {
    delete(id: DeleteCredentialRepository.Id): Promise<DeleteCredentialRepository.Result>
}

export namespace DeleteCredentialRepository{
    export type Id = number
    export type Result = void
}