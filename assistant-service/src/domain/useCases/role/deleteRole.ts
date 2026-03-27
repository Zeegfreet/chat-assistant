
export interface DeleteRole {
    delete(id: DeleteRole.Id): Promise<DeleteRole.Result>
}

export namespace DeleteRole{
    export type Id = number
    export type Result = Error | void
}