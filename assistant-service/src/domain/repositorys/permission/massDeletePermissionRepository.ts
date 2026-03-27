
export interface MassDeletePermissionRepository {
    delete(ids: MassDeletePermissionRepository.Id[]): Promise<MassDeletePermissionRepository.Result>
}

export namespace MassDeletePermissionRepository{
    export type Id =  number
    export type Result =  number
}