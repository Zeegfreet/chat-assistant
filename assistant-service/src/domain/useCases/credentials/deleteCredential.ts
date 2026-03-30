
export interface DeleteCredential {
    delete(id: DeleteCredential.Id): Promise<DeleteCredential.Result>
}

export namespace DeleteCredential{
    export type Id = number
    export type Result = void
}