
export interface MassDeletePermission {
    delete(ids: MassDeletePermission.Id[]): Promise<MassDeletePermission.Result[]>
}

export namespace MassDeletePermission{
    export type Id = number
    export type Result = number
}