
export interface DeletePermission {
    delete(id: DeletePermission.Id): Promise<DeletePermission.Result>
}

export namespace DeletePermission{
    export type Id = number
    export type Result = Error | void
}