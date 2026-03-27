
export interface DeletePermissionRepository {
    delete(id: DeletePermissionRepository.Id): Promise<DeletePermissionRepository.Result>
}

export namespace DeletePermissionRepository{
    export type Id = number
    export type Result = Error | void
}