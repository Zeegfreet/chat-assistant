
export interface DeleteRoleRepository {
    delete(id: DeleteRoleRepository.Id): Promise<DeleteRoleRepository.Result>
}

export namespace DeleteRoleRepository{
    export type Id = number
    export type Result = Error | void
}