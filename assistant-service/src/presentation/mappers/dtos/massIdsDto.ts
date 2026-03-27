
export interface MassIdsDtoMapper {
    to_dto(data: MassIdsDtoMapper.Raw): MassIdsDtoMapper.Result
}

export namespace MassIdsDtoMapper {
    export type Raw = any
    export type Result = number[]
}